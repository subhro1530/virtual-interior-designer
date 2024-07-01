import axios from "axios";

export default async function handler(req, res) {
  const { preferences, dimensions } = req.body;
    
  try {
    const response = await axios.post(
      "https://api.vansh.one/api/",
      {
        model: "Vision",
        tools: ["Brush"],
        messages: [
          {
            role: "user",
            type: "text",
            content: `Generate furniture suggestions for a room with preferences: ${preferences} and dimensions: ${dimensions}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          AuthKey: process.env.NEXT_PUBLIC_VISION_API_KEY,
        },
      }
    );

    res.status(200).json({ suggestions: response.data.response[0].content });
  } catch (error) {
    console.error("Error generating furniture suggestions:", error);
    res.status(500).json({ error: "Failed to generate furniture suggestions" });
  }
}
