import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy initializer for Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiAvailable: !!getGeminiClient() });
});

// 1. Studio Muse AI Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages, workspaceContext } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  const ai = getGeminiClient();
  const lastMessage = messages[messages.length - 1]?.content || "";

  // Dynamic context generation
  const contextString = workspaceContext 
    ? `The user is currently in the active design workspace. Active concept: "${workspaceContext.activeConcept || "None"}". Selected fabrics: ${JSON.stringify(workspaceContext.selectedFabrics || [])}. Selected sketches/layers: ${JSON.stringify(workspaceContext.layers || [])}.`
    : "The user is browsing the digital fashion studio.";

  const systemInstruction = `You are "Studio Muse", a world-class elite digital couture assistant, avant-garde designer, and creative strategist.
Your tone is highly creative, knowledgeable, inspirational, and professional. You use elegant, design-centric language (e.g., drape, silhouette, texture contrast, materiality, conceptual design).
You help fashion designers brainstorm collections, match fabrics, suggest garment structures, propose style extensions, and refine their concepts.
Always provide rich, structured, and visually stunning advice. You can use markdown to write beautiful headings, bullet points, and italic accents.

Current workspace context:
${contextString}

Give highly tailored design-oriented answers, suggesting specific fabrics, silhouettes, or embellishments when relevant. Keep your responses engaging and concise (under 250 words).`;

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
        config: {
          systemInstruction,
          temperature: 0.85,
        }
      });

      const reply = response.text || "I was unable to weave a response for that. Could you refine your prompt?";
      return res.json({ reply });
    } else {
      // Elegant simulated fallback if Gemini API key is not active
      const fallbacks = [
        `That concept is absolutely mesmerizing! The contrast of material textures would look stunning in a structural silhouette. Consider layering metallic textures with organic cotton or high-drape silks to create a gorgeous dynamic flow.`,
        `Fascinating direction! To ground this design, I suggest utilizing structural framing elements—like high-definition pleats or custom panels—paired with fluid silk and velvet accents to elevate the sensory tactile experience.`,
        `A breathtaking aesthetic. We should introduce deep charcoal or neon pink elements to create a powerful visual contrast. Let's play with volume, asymmetrical lines, and architectural hems.`,
        `This silhouette feels highly couture. I recommend pairing it with structured organza or liquid silver lamé to achieve a state of pure futuristic elegance.`
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      return res.json({ 
        reply: `*[Note: Studio Muse is running in offline moodboard mode] *\n\n${randomFallback}`,
        simulated: true 
      });
    }
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Failed to generate design advice", details: error.message });
  }
});

// 2. Dynamic SVG Texture Generator Endpoint
app.post("/api/generate-texture", async (req, res) => {
  const { prompt, baseType } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required to weave texture" });
  }

  const ai = getGeminiClient();

  const systemInstruction = `You are an expert material and textile designer specializing in generating vector pattern textures.
Your task is to design a gorgeous, seamless, highly fashionable seamless pattern or vector graphic, representing a fabric design, and return it in structured JSON format.

You MUST strictly output JSON matching this schema:
{
  "name": "Creative Haute Couture Name for the Fabric",
  "type": "Material type (e.g., Silk, Linen, Brocade, Denim, Tech-Fiber)",
  "colors": ["Hex1", "Hex2", "Hex3"],
  "description": "Sensory, elegant description of the fabric's drape, finish, weight, and inspiration.",
  "svgPattern": "Raw SVG code containing only a single <svg> element. The SVG must be responsive (width='100%' height='100%'), utilize beautiful shapes, gradients, paths, repeating loops, or patterns, and look incredibly high-end, premium, and stylish. Use the colors from the palette to style it. The SVG should have a solid or beautiful background gradient so it renders perfectly as a preview card."
}

Do not include any markdown backticks in your output outside of the requested JSON.`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Create a gorgeous, high-fashion fabric texture pattern based on this idea: "${prompt}". Base material texture type preferred: ${baseType || "Unspecified"}.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              colors: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              description: { type: Type.STRING },
              svgPattern: { type: Type.STRING },
            },
            required: ["name", "type", "colors", "description", "svgPattern"],
          },
          temperature: 0.9,
        }
      });

      const resultText = response.text?.trim() || "{}";
      const fabricData = JSON.parse(resultText);
      return res.json(fabricData);
    } else {
      // Simulated custom SVG patterns as high-quality fallbacks when key is offline
      const simulatedFabricNames = ["Prism Selvedge", "Solar Brocade", "Aero Silk", "Onyx Hex-Mesh"];
      const randomName = simulatedFabricNames[Math.floor(Math.random() * simulatedFabricNames.length)];
      
      const simulatedColorPalettes = [
        ["#1a1c1c", "#b40065", "#ffe16d"],
        ["#821dda", "#ffd9e3", "#705d00"],
        ["#00b4a1", "#0f172a", "#38bdf8"],
        ["#f43f5e", "#fda4af", "#e11d48"]
      ];
      const selectedColors = simulatedColorPalettes[Math.floor(Math.random() * simulatedColorPalettes.length)];

      const customSvgPatterns = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${selectedColors[1]}" />
              <stop offset="100%" stop-color="${selectedColors[0]}" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grad1)" />
          <path d="M 0 50 Q 25 25 50 50 T 100 50 T 150 50" fill="none" stroke="${selectedColors[2]}" stroke-width="2" opacity="0.4" />
          <path d="M 0 70 Q 25 45 50 70 T 100 70 T 150 70" fill="none" stroke="${selectedColors[2]}" stroke-width="1" opacity="0.2" />
          <circle cx="20" cy="20" r="1.5" fill="${selectedColors[2]}" opacity="0.6" />
          <circle cx="80" cy="80" r="1.5" fill="${selectedColors[2]}" opacity="0.6" />
          <circle cx="50" cy="20" r="3" fill="none" stroke="${selectedColors[1]}" stroke-width="0.5" />
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 80">
          <rect width="80" height="80" fill="${selectedColors[0]}" />
          <g stroke="${selectedColors[1]}" stroke-width="1" fill="none" opacity="0.5">
            <path d="M0,0 L80,80 M80,0 L0,80" />
            <circle cx="40" cy="40" r="25" stroke="${selectedColors[2]}" stroke-width="1.5" />
            <rect x="25" y="25" width="30" height="30" stroke="${selectedColors[2]}" stroke-dasharray="2,2" />
          </g>
        </svg>`
      ];
      const selectedSvg = customSvgPatterns[Math.floor(Math.random() * customSvgPatterns.length)];

      return res.json({
        name: `${randomName} (${prompt.slice(0, 15)})`,
        type: baseType || "Tech-Fiber",
        colors: selectedColors,
        description: `An avant-garde fabric textured with digital vectors and high-contrast styling cues. Engineered offline for perfect aesthetic drape and color vibrancy.`,
        svgPattern: selectedSvg,
        simulated: true
      });
    }
  } catch (error: any) {
    console.error("Gemini Generator Error:", error);
    res.status(500).json({ error: "Failed to weave digital textile", details: error.message });
  }
});

// Start express server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DesignAlchemy Server booted successfully on http://localhost:${PORT}`);
  });
}

startServer();
