import type { VercelRequest, VercelResponse } from "@vercel/node";
import twilio from "twilio";

// Initialize Twilio
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, body } = req.body;

  if (!to || !body) {
    return res.status(400).json({ error: "Missing required fields: to, body" });
  }
  if (!accountSid || !authToken || !twilioNumber) {
    console.error("Twilio env vars not set");
    return res.status(500).json({ error: "SMS service not configured" });
  }

  try {
    const message = await client.messages.create({
      body: body,
      from: twilioNumber,
      to: to, // Assumes 'to' is a valid E.164 number
    });

    console.log("Twilio response:", message.sid);
    res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
}
