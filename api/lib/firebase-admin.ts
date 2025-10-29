import * as admin from "firebase-admin";

// Get credentials from environment variables
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
// Format the private key
const PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error("Firebase Admin credentials (GCP) are not set!");
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: PROJECT_ID,
          clientEmail: CLIENT_EMAIL,
          privateKey: PRIVATE_KEY,
        }),
      });
      console.log("Firebase Admin initialized.");
    } catch (e) {
      console.error("Firebase Admin initialization error:", e);
    }
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
