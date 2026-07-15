# StyleForge (DesignAlchemy) ── An Avant-Garde Digital Couture Studio

**StyleForge** (DesignAlchemy) is a colorful, freeform digital fashion design studio and moodboard suite. It is powered by Gemini 2.0 Flash to prototype fabric textures, structure silhouette layers, and co-create with a cognitive AI fashion strategist, **Studio Muse**.

This project is submitted for the **Edge Hack 2026** hackathon.

---

## 📽️ Interactive Walkthrough & Demo Video

![Walkthrough Demo](./artifacts/designalchemy_walkthrough.webp)

---

## ✨ Features
*   **Generative Textile Wall**: Weave customized fabric textures on-demand from simple text prompts (e.g., *'Cyberpunk Gold Foil'*). The app interfaces with Gemini to generate fabric swatches.
*   **Silhouette Layering Canvas**: A modular digital workspace supporting multi-layer compositions (Base Silhouette, Body Panel, Collar Accents, Lace Embellishments) with precise opacity controls.
*   **Interactive Studio Muse Co-pilot**: An elite AI design strategist directly connected to the canvas state. It reads the current active swatches, opacity levels, and structural layers to provide contextual couture recommendations.
*   **Offline Fallback Simulation**: Built-in mock modes to ensure uninterrupted workflow when API keys are not locally configured.
*   **Freeform Canvas & Pattern Tools**: Apply textures, fabrics, and custom patterns without templates or limits.
*   **Community Marketplace**: Share, remix, and collaborate on fashion ideas.

---

## 📁 Submission Assets & Deliverables

1.  **Presentation Slides (PPTX)**: [edge_hack_presentation.pptx](./edge_hack_presentation.pptx) (A beautifully styled PowerPoint presentation in dark theme summarizing the project).
2.  **Demo Video / WebP Walkthrough**: [designalchemy_walkthrough.webp](./artifacts/designalchemy_walkthrough.webp) (An interactive, step-by-step recording of the workspace actions).
3.  **Source Code & Vercel Functions**: [GitHub Repository](https://github.com/arnav-git-hub/STYLEFORGE) containing the React app + server-side API proxy.

---

## 🛠️ Technology Stack

*   **Core**: React 19, TypeScript, Vite, TailwindCSS / Vanilla CSS
*   **Animations**: `motion/react` (Framer Motion)
*   **Icons**: Lucide React
*   **API & Server**: Express backend, serverless ready on Vercel (`vercel.json`)
*   **Cognitive AI**: `@google/genai` (Gemini 2.0 Flash model)

---

## 🚀 Running Locally

### Prerequisites
*   Node.js (v18+)
*   Python (optional, for PPTX generator script)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Environment Variables
Create or edit your `.env.local` file and add:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### Step 3: Start the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🧪 Slide Generator Script
The presentation slides can be programmatically re-generated using Python and the `python-pptx` package:
```bash
pip install python-pptx
python make_presentation.py arnav-git-hub
```
