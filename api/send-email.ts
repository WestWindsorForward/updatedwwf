import type { VercelRequest, VercelResponse } from "@vercel/node";
import Mailgun from "mailgun.js";
import formData from "form-data";

// Initialize Mailgun
const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";
const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || "";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!API_KEY || !DOMAIN || !FROM_EMAIL) {
    console.error("Mailgun env vars not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const msg = await mg.messages.create(DOMAIN, {
      from: `West Windsor 311 <${FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      text: body,
    });

    console.log("Mailgun response:", msg);
    res.status(200).json({ success: true, id: msg.id });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
