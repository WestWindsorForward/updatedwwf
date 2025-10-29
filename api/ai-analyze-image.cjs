import type { VercelRequest, VercelResponse } from "@vercel/node";

// --- 1. Import VertexAI using require() for stability ---
// This resolves the 'VertexAI is not a constructor' TypeError.
// @ts-ignore: We use require for stability in Vercel.
const { VertexAI } = require('@google-cloud/aiplatform');

// --- 2. Configuration & Constants ---
// Load environment variables *before* the VertexAI initialization block
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n");
const LOCATION = "us-central1"; 
const MODEL_ID = "gemini-1.5-flash-001";

// Define possible values
const priorities = ["Low", "Medium", "High", "Emergency"];
const departments = [
  "Public Works",
  "Water & Sewer Authority",
  "Health Dept/Animal Control",
  "Police (Non-Emergency)",
  "Code Enforcement",
  "Parks & Recreation",
  "Administration",
];

const generationConfig = {
  maxOutputTokens: 256,
  temperature: 0.2,
  responseMimeType: "application/json",
};

// --- 3. Initialize Vertex AI Client ---
if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error("GCP service account credentials aref not set.");
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

// --- 4. Prompt Logic ---
const buildPrompt = (description: string, category: string) => `
  You are an expert 311 request triager for West Windsor Township.
  Analyze the following request and return a JSON object with:
  1. "suggestedPriority": One of [${priorities.join(", ")}]
  2. "suggestedDepartment": One of [${departments.join(", ")}]
  3. "estimatedResponseTime": A brief string (e.g., "24-48 hours", "3-5 business days")
  4. "reasoning": A 1-2 sentence explanation for your choices.

  Request Category: "${category}"
  Request Description: "${description}"
`;

// --- 5. Handler Function ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return res.status(500).json({ error: "AI service not configured" });
  }

  const { description, category } = req.body;
  if (!description || !category) {
    return res.status(400).json({ error: "Missing description or category" });
  }

  try {
    const prompt = buildPrompt(description, category);
    const request = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    };

    const result = await generativeModel.generateContent(request);
    const jsonResponse = result.response.candidates[0].content.parts[0].text;

    const analysis = JSON.parse(jsonResponse);

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error calling Vertex AI:", error);
    res.status(500).json({ error: "Failed to analyze request" });
  }
}
