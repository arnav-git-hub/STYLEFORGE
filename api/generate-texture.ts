import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, baseType } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const ai = getGeminiClient();

  const systemInstruction = `You are an expert material and textile designer. Generate a gorgeous, seamless, fashionable fabric pattern and return structured JSON matching this schema exactly:
{
  "name": "Creative Haute Couture Name",
  "type": "Material type (e.g. Silk, Linen, Brocade, Denim, Tech-Fiber)",
  "colors": ["Hex1", "Hex2", "Hex3"],
  "description": "Sensory, elegant description of the fabric.",
  "svgPattern": "Raw SVG code with a single <svg> element, responsive (width='100%' height='100%'), beautiful shapes/gradients/paths, high-end premium look."
}
Do not include markdown backticks outside the JSON.`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Create a gorgeous high-fashion fabric texture based on: "${prompt}". Base material: ${baseType || "Unspecified"}.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              colors: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING },
              svgPattern: { type: Type.STRING },
            },
            required: ["name", "type", "colors", "description", "svgPattern"],
          },
          temperature: 0.9,
        },
      });

      const fabricData = JSON.parse(response.text?.trim() || "{}");
      return res.json(fabricData);
    } else {
      const colors = ["#1a1c1c", "#b40065", "#ffe16d"];
      return res.json({
        name: `Prism Selvedge (${prompt.slice(0, 15)})`,
        type: baseType || "Tech-Fiber",
        colors,
        description: "An avant-garde fabric textured with digital vectors and high-contrast styling cues.",
        svgPattern: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${colors[1]}" />
              <stop offset="100%" stop-color="${colors[0]}" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#g1)" />
          <path d="M 0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="${colors[2]}" stroke-width="2" opacity="0.4" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="${colors[2]}" stroke-width="0.5" opacity="0.5" />
        </svg>`,
        simulated: true,
      });
    }
  } catch (error: any) {
    console.error("Texture Error:", error);
    res.status(500).json({ error: "Failed to generate textile", details: error.message });
  }
}
