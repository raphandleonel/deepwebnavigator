import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, message } = req.body;

    try {
      const newSubmission = await client.create({
        _type: "contactUs",
        email,
        message,
        createdAt: new Date().toISOString(),
        viewed: false,
      });
      console.log("New submission created:", newSubmission);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ success: false, error: "Failed to submit form." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed." });
  }
}
