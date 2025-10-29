import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth, adminDb } from "./firebase-admin";

const STAFF_ROLES = { ADMIN: "admin" };

type ApiHandler = (
  req: VercelRequest,
  res: VercelResponse,
  admin: { uid: string; email: string; profile: any }
) => Promise<void>;

/**
 * A middleware function to protect API routes,
 * ensuring the caller is an authenticated admin.
 */
export const withAdminAuth = (handler: ApiHandler) => {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "No authorization header" });
      }

      const token = authHeader.split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
      }

      // 1. Verify Firebase Auth token
      const decodedToken = await adminAuth.verifyIdToken(token);
      const { uid, email } = decodedToken;

      // 2. Get user's profile from Firestore to check role
      const userDoc = await adminDb.collection("users").doc(uid).get();

      if (!userDoc.exists) {
        return res.status(403).json({ error: "User profile not found" });
      }

      const userProfile = userDoc.data();

      // 3. Check if role is 'admin'
      if (userProfile.role !== STAFF_ROLES.ADMIN) {
        return res
          .status(403)
          .json({ error: "Forbidden: User is not an admin" });
      }

      // User is an admin, proceed to the actual API handler
      const adminPayload = { uid, email, profile: userProfile };
      return handler(req, res, adminPayload);
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};
