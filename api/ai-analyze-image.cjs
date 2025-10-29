import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage, ref, getBytes } from 'firebase/storage';
import { initializeApp, getApp, getApps } from 'firebase/app';
import * as admin from 'firebase-admin'; // Keep this, though unused directly here

// --- 1. Import VertexAI using require() for stability ---
// This resolves the 'VertexAI is not a constructor' TypeError.
// @ts-ignore: We use require for stability in Vercel.
const { VertexAI } = require('@google-cloud/aiplatform');

// --- 2. Configuration & Constants ---
// Google Cloud credentials (Set in Vercel Environment Variables)
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n");
const LOCATION = "us-central1";
const MODEL_ID = "gemini-1.5-flash-001";

// Firebase Client SDK Config (to download image from storage)
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

// --- 3. Initialize Vertex AI Client ---
if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error("GCP service account credentials are not set.");
}
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

// --- 4. Helper Functions ---

const buildPrompt = () => `
  You are an expert 311 issue identifier. Analyze the attached image.
  Return a JSON object with:
  1. "issueType": A brief name for the issue (e.g., "Pothole", "Fallen Tree", "Graffiti").
  2. "severity": One of ["Low", "Medium", "High", "Critical"].
  3. "repairRecommendation": A 1-2 sentence suggested action (e.g., "Standard asphalt patch required.").
`;

// Helper to get image bytes from a Firebase Storage URL
async function getImagePart(imageUrl: string) {
  const storage = getStorage();
  const storageRef = ref(storage, imageUrl);
  const bytes = await getBytes(storageRef);
  const buffer = Buffer.from(bytes);
  
  // FIX: More robust MIME type determination based on magic numbers.
  let mimeType = 'application/octet-stream';
  const hexSignature = buffer.toString('hex', 0, 8); // Read a larger signature for better detection

  if (hexSignature.startsWith('ffd8')) {
    mimeType = 'image/jpeg'; // JPEG signature (ffd8)
  } else if (hexSignature.startsWith('89504e47')) {
    mimeType = 'image/png'; // PNG signature (89504e47)
  } else if (hexSignature.startsWith('47494638')) {
    mimeType = 'image/gif'; // GIF signature (47494638)
  }
  
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType: mimeType,
    },
  };
}


// --- 5. Handler Function ---
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return res.status(500).json({ error: 'AI service not configured: Missing GCP credentials' });
  }

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl' });
  }

  try {
    // 1. Get image data
    const imagePart = await getImagePart(imageUrl);

    // 2. Prepare and call Vertex AI
    const prompt = buildPrompt();

    const request = {
      contents: [{ role: 'user', parts: [imagePart, { text: prompt }] }],
      generationConfig: {
          maxOutputTokens: 256,
          temperature: 0.2,
          responseMimeType: 'application/json',
      },
    };

    const result = await generativeModel.generateContent(request);
    const jsonResponse = result.response.candidates[0].content.parts[0].text;
    const analysis = JSON.parse(jsonResponse);

    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error calling Vertex AI for Photo Analysis:', error);
    res.status(500).json({ error: 'Failed to analyze image with Google AI', details: error.message });
  }
}
