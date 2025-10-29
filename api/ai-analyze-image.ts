import type { VercelRequest, VercelResponse } from "@vercel/node";
import { VertexAI } from "@google-cloud/aiplatform";
import { getStorage, ref, getBytes } from "firebase/storage";
import { initializeApp, getApp, getApps } from "firebase/app";

// AI Config
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n");
const LOCATION = "us-central1";
const MODEL_ID = "gemini-1.5-flash-001";

// Firebase Client SDK Config (to download image from storage)
// This is needed because the API receives a URL, not the file bytes.
// We use the *client* config here.
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize client app (if not already)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: PROJECT_ID,
  location: LOCATION,
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
});

const generativeModel = vertexAI.getGenerativeModel({
  model: MODEL_ID,
});

const buildPrompt = () => `
  You are an expert 311 issue identifier. Analyze the attached image.
  Return a JSON object with:
  1. "issueType": A brief name for the issue (e.g., "Pothole", "Fallen Tree", "Graffiti").
  2. "severity": One of ["Low", "Medium", "High"].
  3. "repairRecommendation": A 1-2 sentence suggested action (e.g., "Standard asphalt patch required.").
`;

// Helper to get image bytes from a Firebase Storage URL
async function getImageBytes(imageUrl: string) {
  const storage = getStorage();
  // Create a storage reference from the URL
  const storageRef = ref(storage, imageUrl);
  const bytes = await getBytes(storageRef);
  return Buffer.from(bytes).toString("base64");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return res.status(500).json({ error: "AI service not configured" });
  }

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: "Missing imageUrl" });
  }

  try {
    // 1. Get image bytes from Firebase Storage
    const imageBase64 = await getImageBytes(imageUrl);

    // 2. Prepare request for Vertex AI
    const prompt = buildPrompt();
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg", // Assuming jpeg, adjust if needed
      },
    };
    const textPart = { text: prompt };

    const request = {
      contents: [{ role: "user", parts: [imagePart, textPart] }],
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    };

    // 3. Call Vertex AI
    const result = await generativeModel.generateContent(request);
    const jsonResponse = result.response.candidates[0].content.parts[0].text;
    const analysis = JSON.parse(jsonResponse);

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error calling Vertex AI for image:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
}
