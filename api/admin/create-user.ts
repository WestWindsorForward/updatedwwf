import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withAdminAuth } from "../lib/auth-middleware";
import { adminAuth, adminDb } from "../lib/firebase-admin";
import { serverTimestamp } from "firebase-admin/firestore";

async function handler(
  req: VercelRequest,
  res: VercelResponse,
  adminUser // This is the authenticated admin, passed from middleware
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password, name, department, role } = req.body;

  if (!email || !password || !name || !department || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    const newUserId = userRecord.uid;

    // 2. Create staff profile in Firestore
    const staffDocRef = adminDb.collection("users").doc(newUserId);
    const profileData = {
      name: name,
      email: email,
      department: department,
      role: role,
      createdAt: serverTimestamp(),
      createdBy: adminUser.uid, // Log which admin created this user
    };

    await staffDocRef.set(profileData);

    res.status(201).json({ success: true, uid: newUserId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
}

// Wrap the handler with the auth middleware
export default withAdminAuth(handler);
