import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withAdminAuth } from "../lib/auth-middleware";
import { adminAuth, adminDb } from "../lib/firebase-admin";

async function handler(req: VercelRequest, res: VercelResponse, adminUser) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "Missing user ID (uid)" });
  }

  if (uid === adminUser.uid) {
    return res.status(400).json({ error: "Admin cannot delete themselves" });
  }

  try {
    // 1. Delete user from Firebase Authentication
    await adminAuth.deleteUser(uid);

    // 2. Delete staff profile from Firestore
    const staffDocRef = adminDb.collection("users").doc(uid);
    await staffDocRef.delete();

    // TODO: You may also want to un-assign all requests from this user
    // (This would require a query and batch update)

    res.status(200).json({ success: true, uid: uid });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
}

// Wrap the handler with the auth middleware
export default withAdminAuth(handler);
