import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Sliders, Scissors, RefreshCw, Layers, Copy, Check } from "lucide-react";

interface Motif {
  id: string;
  name: string;
  path: string;
  viewBox: string;
}

const MOTIFS: Motif[] = [
  {
    id: "retro-flower",
    name: "Couture Blossom",
    viewBox: "0 0 24 24",
    path: "M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm-6-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM8.5 5a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1-2.8 2.8L8.5 7.8A2 2 0 0 1 8.5 5zm5.6 5.6a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1-2.8 2.8l-1.4-1.4a2 2 0 0 1 0-2.8z"
  },
  {
    id: "geometric-star",
    name: "Prism Starburst",
    viewBox: "0 0 24 24",
    path: "M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9Z"
  },
  {
    id: "butterfly",
    name: "Monarch Outline",
    viewBox: "0 0 24 24",
    path: "M12 5C11.5 3 9 2 7 3.5C5 5 5.5 8 7.5 10C5.5 11 5 13 6 15C7 17 10 16 11 14C11 17 11.5 21 12 21C12.5 21 13 17 13 14C14 16 17 17 18 15C19 13 18.5 11 16.5 10C18.5 8 19 5 17 3.5C15 2 12.5 3 12 5Z"
  },
  {
    id: "retro-wave",
    name: "Avant-Garde Wave",
    viewBox: "0 0 24 24",
    path: "M3 12C3 4.5 10.5 4.5 12 12C13.5 19.5 21 19.5 21 12"
  }
];

const TEMPLATES = [
  { id: "gown", name: "Structured Slip Gown", viewBox: "0 0 100 150", path: "M30,30 L70,30 L65,70 L80,140 L20,140 L35,70 Z" },
  { id: "kimono", name: "Couture Robe", viewBox: "0 0 100 150", path: "M20,25 L80,25 L80,50 L70,50 L70,140 L30,140 L30,50 L20,50 Z" },
  { id: "puffer", name: "Cocoon Jacket", viewBox: "0 0 100 150", path: "M25,35 Q50,25 75,35 L80,85 L70,90 L68,135 L32,135 L30,90 L20,85 Z" }
];

export default function PatternsView() {
  const [selectedTemplate, setSelectedTemplate] = useState("gown");
  const [selectedMotif, setSelectedMotif] = useState("retro-flower");
  
  // Custom Slider States
  const [scale, setScale] = useState(30);
  const [rotation, setRotation] = useState(0);
  const [density, setDensity] = useState(12);
  const [accentColor, setAccentColor] = useState("#b40065");
  const [bgColor, setBgColor] = useState("#faf9f8");
  const [copied, setCopied] = useState(false);

  const activeTemplate = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];
  const activeMotif = MOTIFS.find(m => m.id === selectedMotif) || MOTIFS[0];

  // Generate pattern SVG as a string representation
  const handleCopySvg = () => {
    const rawPatternSvg = `<pattern id="custom-pattern" width="${scale}" height="${scale}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rotation})">
  <rect width="100%" height="100%" fill="${bgColor}" />
  <path d="${activeMotif.path}" fill="${accentColor}" transform="scale(${scale / 24})" />
</pattern>`;
    navigator.clipboard.writeText(rawPatternSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="patterns-view" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-on-surface pb-6">
        <div>
          <h2 className="font-display text-3xl md:text-5xl uppercase font-black tracking-tight text-on-surface">
            Infinite Patterns
          </h2>
          <p className="font-headline text-on-surface-variant font-medium mt-1">
            Design interactive repeating motifs overlaying high-fashion silhouettes in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls Panel */}
        <div className="lg:col-span-4 bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 h-fit relative space-y-6">
          <div className="absolute top-[-14px] left-[20px]">
            <span className="washi-tape px-4 py-1 font-headline font-bold text-xs text-white uppercase shadow">
              PATTERN ENGINE
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2 mt-2">
            <Sliders className="w-5 h-5 text-secondary" />
            <h3 className="font-display text-xl uppercase font-extrabold text-on-surface">
              Design Controls
            </h3>
          </div>

          {/* 1. Garment Template Selector */}
          <div>
            <label className="block text-xs uppercase font-extrabold text-on-surface mb-2 tracking-wider">
              1. Garment Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map(temp => (
                <button
                  key={temp.id}
                  onClick={() => setSelectedTemplate(temp.id)}
                  className={`py-2 px-1 text-xs font-bold border-2 border-on-surface rounded-lg uppercase tracking-wider transition-all ${
                    selectedTemplate === temp.id 
                      ? "bg-primary text-on-primary" 
                      : "bg-surface text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {temp.id}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Motif Selector */}
          <div>
            <label className="block text-xs uppercase font-extrabold text-on-surface mb-2 tracking-wider">
              2. Decorative Motif
            </label>
            <div className="grid grid-cols-2 gap-3">
              {MOTIFS.map(motif => (
                <button
                  key={motif.id}
                  onClick={() => setSelectedMotif(motif.id)}
                  className={`p-3 border-2 border-on-surface rounded-xl flex flex-col items-center gap-1.5 transition-all text-center ${
                    selectedMotif === motif.id 
                      ? "bg-secondary-fixed text-on-secondary-fixed ring-2 ring-secondary" 
                      : "bg-surface text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <svg className="w-6 h-6 stroke-2" fill="currentColor" viewBox={motif.viewBox}>
                    <path d={motif.path} />
                  </svg>
                  <span className="text-[10px] font-bold uppercase truncate max-w-full">{motif.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sliders */}
          <div className="space-y-4 pt-2 border-t border-on-surface/10">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase font-extrabold text-on-surface tracking-wider">Motif Scale</span>
                <span className="text-xs font-mono font-bold text-on-surface-variant">{scale}px</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="80" 
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-primary bg-surface-container rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase font-extrabold text-on-surface tracking-wider">Rotation Angle</span>
                <span className="text-xs font-mono font-bold text-on-surface-variant">{rotation}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={rotation} 
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-secondary bg-surface-container rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase font-extrabold text-on-surface tracking-wider">Spacing / Density</span>
                <span className="text-xs font-mono font-bold text-on-surface-variant">{density} units</span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="24" 
                value={density} 
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-tertiary bg-surface-container rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Swatches */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[10px] uppercase font-extrabold text-on-surface mb-1.5 tracking-wider">
                Motif Accent
              </label>
              <div className="flex gap-2">
                {["#b40065", "#821dda", "#705d00", "#115e59", "#1a1c1c"].map(c => (
                  <button 
                    key={c}
                    className={`w-6 h-6 rounded-full border-2 ${accentColor === c ? "border-on-surface ring-2 ring-offset-2 ring-primary" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setAccentColor(c)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-extrabold text-on-surface mb-1.5 tracking-wider">
                Base Surface
              </label>
              <div className="flex gap-2">
                {["#faf9f8", "#ffd9e3", "#efdbff", "#f4f3f2", "#09090b"].map(c => (
                  <button 
                    key={c}
                    className={`w-6 h-6 rounded-full border-2 ${bgColor === c ? "border-on-surface ring-2 ring-offset-2 ring-secondary" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setBgColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Canvas Preview */}
        <div className="lg:col-span-8 bg-surface border-2 border-on-surface rounded-2xl p-8 relative flex flex-col justify-between items-center min-h-[480px]">
          {/* Measuring tape detail */}
          <div className="absolute top-0 left-0 w-full opacity-10">
            <div className="measuring-tape"></div>
          </div>

          <div className="flex justify-between w-full z-10">
            <div className="bg-surface border border-on-surface/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant shadow-sm">
              <Scissors className="w-3.5 h-3.5 text-primary" />
              Live Interactive Silhouette
            </div>

            <button 
              onClick={handleCopySvg}
              className="bg-surface-container-lowest border-2 border-on-surface px-4 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:bg-surface-container active:scale-95 transition-all text-on-surface cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Pattern Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Export pattern raw code
                </>
              )}
            </button>
          </div>

          {/* SVG RENDERING AREA */}
          <div className="w-full max-w-sm aspect-[3/4] relative my-6 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 150" 
              className="w-full h-full drop-shadow-2xl filter"
            >
              <defs>
                {/* Dynamic Repeating Pattern */}
                <pattern 
                  id="canvas-custom-pattern" 
                  width={scale} 
                  height={scale} 
                  patternUnits="userSpaceOnUse"
                  patternTransform={`rotate(${rotation})`}
                >
                  <rect width="100%" height="100%" fill={bgColor} />
                  
                  {/* Grid repeat based on density */}
                  <g fill={accentColor}>
                    {/* Centered motif */}
                    <path d={activeMotif.path} transform={`scale(${scale / 32}) translate(${scale / 4}, ${scale / 4})`} />
                    {/* Staggered offsets for beautiful wallpaper effect */}
                    <path d={activeMotif.path} transform={`scale(${scale / 32}) translate(${scale * 1.5}, ${scale * 1.5})`} />
                  </g>
                </pattern>
                
                {/* Backdrop mask filter */}
                <filter id="shadow">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.25"/>
                </filter>
              </defs>

              {/* Garment Shape Overlaying Pattern */}
              <motion.path 
                d={activeTemplate.path} 
                fill="url(#canvas-custom-pattern)" 
                stroke="#1a1c1c" 
                strokeWidth="2.5"
                filter="url(#shadow)"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                key={`${selectedTemplate}-${selectedMotif}`}
              />

              {/* Mannequin/hanger lines representing elegant digital draping context */}
              <line x1="50" y1="10" x2="50" y2="30" stroke="#1a1c1c" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M40,25 C45,20 55,20 60,25" fill="none" stroke="#1a1c1c" strokeWidth="2" />
            </svg>
          </div>

          <div className="text-center max-w-md bg-surface-container-low border border-on-surface/15 p-4 rounded-xl z-10 w-full">
            <h4 className="text-sm font-bold uppercase text-on-surface mb-1">
              Active Weave: {activeMotif.name} x {activeTemplate.name}
            </h4>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              Weaved using a base of <span className="font-bold" style={{ color: accentColor }}>{accentColor}</span> motifs overlaid atop a <span className="font-bold">{bgColor}</span> surface layer. Fully scalable for fabric export.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
