import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

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

  const { messages, workspaceContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  const ai = getGeminiClient();
  const contextString = workspaceContext
    ? `The user is currently in the active design workspace. Active concept: "${workspaceContext.activeConcept || "None"}". Selected fabrics: ${JSON.stringify(workspaceContext.selectedFabrics || [])}. Selected sketches/layers: ${JSON.stringify(workspaceContext.layers || [])}.`
    : "The user is browsing the digital fashion studio.";

  const systemInstruction = `You are "Studio Muse", a world-class elite digital couture assistant, avant-garde designer, and creative strategist.
Your tone is highly creative, knowledgeable, inspirational, and professional. You use elegant, design-centric language.
You help fashion designers brainstorm collections, match fabrics, suggest garment structures, propose style extensions, and refine their concepts.
Always provide rich, structured, and visually stunning advice. You can use markdown for headings, bullet points, and italic accents.

Current workspace context:
${contextString}

Give highly tailored design-oriented answers, suggesting specific fabrics, silhouettes, or embellishments when relevant. Keep responses under 250 words.`;

  try {
    if (ai) {
      const contents = messages.map((msg: any) => {
        const parts: any[] = [];
        if (msg.content) {
          parts.push({ text: msg.content });
        }
        if (msg.image) {
          const matches = msg.image.match(/^data:(image\/\w+);base64,(.+)$/);
          if (matches) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2]
              }
            });
          }
        }
        if (parts.length === 0) {
          parts.push({ text: "" });
        }
        return {
          role: msg.role === "user" ? "user" as const : "model" as const,
          parts,
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
        config: { systemInstruction, temperature: 0.85 },
      });

      return res.json({ reply: response.text || "I was unable to weave a response. Could you refine your prompt?" });
    } else {
      const fallbacks = [
        "That concept is absolutely mesmerizing! The contrast of material textures would look stunning in a structural silhouette. Consider layering metallic textures with organic cotton or high-drape silks.",
        "Fascinating direction! I suggest utilizing structural framing elements—like high-definition pleats or custom panels—paired with fluid silk and velvet accents.",
        "A breathtaking aesthetic. We should introduce deep charcoal or neon pink elements to create a powerful visual contrast. Let's play with volume and asymmetrical lines.",
        "This silhouette feels highly couture. I recommend pairing it with structured organza or liquid silver lamé to achieve pure futuristic elegance.",
      ];
      return res.json({
        reply: `*[Studio Muse is running in offline mode]*\n\n${fallbacks[Math.floor(Math.random() * fallbacks.length)]}`,
        simulated: true,
      });
    }
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate design advice", details: error.message });
  }
}
