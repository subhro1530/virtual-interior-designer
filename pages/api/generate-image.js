import axios from "axios";

export default async function handler(req, res) {
  const { preferences, dimensions } = req.body;

  try {
    const response = await axios.post(
      "https://api.vansh.one/api/",
      {
        model: "VisionBrush",
        text: `Generate a room layout with preferences: ${preferences} and dimensions: ${dimensions}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          AuthKey: process.env.NEXT_PUBLIC_VISION_API_KEY,
        },
      }
    );

    res.status(200).json({ imageUrl: response.data.response });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
