import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Loader2, Layers, Tag, Check, Download, Info } from "lucide-react";
import { Fabric } from "../types";

interface FabricsViewProps {
  fabrics: Fabric[];
  onAddFabric: (fabric: Fabric) => void;
  onSelectFabricForStudio: (fabric: Fabric) => void;
  activeStudioFabricIds: string[];
}

export default function FabricsView({ 
  fabrics, 
  onAddFabric, 
  onSelectFabricForStudio,
  activeStudioFabricIds 
}: FabricsViewProps) {
  const [prompt, setPrompt] = useState("");
  const [baseType, setBaseType] = useState("Silk");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-texture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, baseType })
      });

      if (!response.ok) {
        throw new Error("Failed to weave dynamic textile texture.");
      }

      const newFabricData = await response.json();
      
      const uniqueId = `gen-${Date.now()}`;
      const generatedFabric: Fabric = {
        id: uniqueId,
        name: newFabricData.name || "AI Couture Fabric",
        type: newFabricData.type || baseType,
        colors: newFabricData.colors || ["#ff0080", "#821dda"],
        description: newFabricData.description || "A beautiful custom woven material made by AI.",
        svgPattern: newFabricData.svgPattern,
        tags: ["AI-Generated", ...(newFabricData.colors ? ["Custom Palette"] : [])],
        drapeFactor: "Medium",
        weight: "Medium",
        designer: "DesignAlchemy AI"
      };

      onAddFabric(generatedFabric);
      setSelectedFabric(generatedFabric);
      setPrompt("");
    } catch (err: any) {
      console.error(err);
      setError("Weaving failed. Please check your connections.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="fabrics-view" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-on-surface pb-6">
        <div>
          <h2 className="font-display text-3xl md:text-5xl uppercase font-black tracking-tight text-on-surface">
            Material Texture Wall
          </h2>
          <p className="font-headline text-on-surface-variant font-medium mt-1">
            Browse high-fashion textile swatches or weave custom materials using the generative AI panel.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg border-2 border-on-surface font-semibold text-xs uppercase sticker-shadow">
          <Layers className="w-4 h-4 text-secondary animate-pulse" />
          {fabrics.length} Textures Available
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Fabric Generator Panel */}
        <div className="lg:col-span-4 bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 h-fit relative">
          <div className="absolute top-[-14px] left-[20px]">
            <span className="washi-tape px-4 py-1 font-headline font-bold text-xs text-white uppercase shadow">
              DESIGN CO-CREATION
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4 mt-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl uppercase font-extrabold text-on-surface">
              Weave New Fabric
            </h3>
          </div>

          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Specify pattern cues, drape feelings, or metallic finishes, and let DesignAlchemy construct a custom vector weave preview.
          </p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-extrabold text-on-surface mb-1.5 tracking-wider">
                Base Texture Style
              </label>
              <select 
                value={baseType}
                onChange={(e) => setBaseType(e.target.value)}
                className="w-full px-3 py-2 bg-surface border-2 border-on-surface rounded-lg text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Silk">Mulberry Silk (Fluid, Glossy)</option>
                <option value="Linen">Flax Linen (Natural, Creased)</option>
                <option value="Denim">Selvedge Denim (Coarse, Heavy)</option>
                <option value="Velvet">Silk Velvet (Deep, Shaded)</option>
                <option value="Leather">Full-Grain Leather (Supple, Tailored)</option>
                <option value="Lace">Chantilly Lace (Intricate Mesh)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-extrabold text-on-surface mb-1.5 tracking-wider">
                Aesthetic Prompt
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. glowing iridescent liquid-silver tech wave pattern with deep fuschia laser line intersections"
                className="w-full px-3 py-2 bg-surface border-2 border-on-surface rounded-lg text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:outline-none h-28 resize-none font-medium"
              />
            </div>

            {error && (
              <div className="text-xs text-error font-semibold bg-error-container/20 p-2.5 rounded border border-error">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg uppercase tracking-wider text-sm flex items-center justify-center gap-2 border-2 border-on-surface hover:bg-primary-container active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none hard-shadow-black cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Weaving Material...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  Weave Fabric Swatch
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Swatches Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {fabrics.map((fabric) => {
              const isActiveInStudio = activeStudioFabricIds.includes(fabric.id);
              
              return (
                <motion.div
                  key={fabric.id}
                  id={`fabric-card-${fabric.id}`}
                  className={`bg-surface border-2 border-on-surface rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between hover:-translate-y-1 ${
                    selectedFabric?.id === fabric.id ? "ring-4 ring-primary hard-shadow-pink" : "hover:hard-shadow-purple"
                  }`}
                  onClick={() => setSelectedFabric(fabric)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Swatch Image or Vector Preview */}
                  <div className="aspect-square relative w-full border-b-2 border-on-surface bg-surface-container overflow-hidden">
                    {fabric.svgPattern ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: fabric.svgPattern }}
                      />
                    ) : fabric.imageUrl ? (
                      <img 
                        src={fabric.imageUrl} 
                        alt={fabric.name} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-wrap" style={{ backgroundColor: fabric.colors[0] }}>
                        {fabric.colors.map((c, i) => (
                          <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    )}

                    {/* Active in Studio Indicator */}
                    {isActiveInStudio && (
                      <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 border border-white">
                        <Check className="w-3 h-3" /> Active
                      </div>
                    )}
                  </div>

                  {/* Info Label */}
                  <div className="p-3 bg-surface-container-low">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-display font-black text-sm uppercase text-on-surface truncate">
                        {fabric.name}
                      </h4>
                      <span className="text-[10px] bg-surface-variant font-bold text-on-surface px-1.5 py-0.5 rounded uppercase">
                        {fabric.type}
                      </span>
                    </div>

                    {/* Paint Palette Dots */}
                    <div className="flex gap-1.5 mt-2">
                      {fabric.colors.slice(0, 4).map((color, i) => (
                        <div 
                          key={i} 
                          className="paint-dab w-3.5 h-3.5 border border-on-surface/30 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ACTIVE SWATCH DETAIL PANEL */}
          <AnimatePresence mode="wait">
            {selectedFabric && (
              <motion.div 
                id="selected-fabric-detail"
                className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
              >
                {/* Washi tape accent */}
                <div className="absolute top-[-8px] right-8">
                  <span className="washi-tape px-6 py-1 font-headline font-bold text-xs text-white uppercase shadow">
                    MATERIAL DOSSIER
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
                  {/* Swatch visual large */}
                  <div className="md:col-span-4 aspect-square rounded-xl border-2 border-on-surface bg-surface overflow-hidden relative">
                    {selectedFabric.svgPattern ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: selectedFabric.svgPattern }}
                      />
                    ) : selectedFabric.imageUrl ? (
                      <img 
                        src={selectedFabric.imageUrl} 
                        alt={selectedFabric.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-wrap" style={{ backgroundColor: selectedFabric.colors[0] }}>
                        {selectedFabric.colors.map((c, i) => (
                          <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Swatch detail specs */}
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <h3 className="font-display text-2xl uppercase font-black tracking-tight text-on-surface">
                          {selectedFabric.name}
                        </h3>
                        <span className="bg-primary text-on-primary font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-on-surface">
                          {selectedFabric.type}
                        </span>
                      </div>

                      <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-4">
                        {selectedFabric.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-surface border border-on-surface/25 p-2 rounded-lg text-center">
                          <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 tracking-wider">Drape Feel</span>
                          <span className="font-bold text-xs uppercase text-on-surface">{selectedFabric.drapeFactor || "Fluid"}</span>
                        </div>
                        <div className="bg-surface border border-on-surface/25 p-2 rounded-lg text-center">
                          <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 tracking-wider">Weight class</span>
                          <span className="font-bold text-xs uppercase text-on-surface">{selectedFabric.weight || "Medium"}</span>
                        </div>
                        <div className="bg-surface border border-on-surface/25 p-2 rounded-lg text-center col-span-2">
                          <span className="block text-[9px] uppercase font-bold text-on-surface-variant/60 tracking-wider">Woven Atelier</span>
                          <span className="font-bold text-xs text-on-surface truncate block">{selectedFabric.designer || "Design Labs"}</span>
                        </div>
                      </div>

                      {/* Palette details */}
                      <div className="mb-6">
                        <span className="block text-xs uppercase font-extrabold text-on-surface mb-2 tracking-wider">
                          Hex Chromatics ({selectedFabric.colors.length})
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedFabric.colors.map((color, i) => (
                            <div key={i} className="flex items-center gap-1 bg-surface border border-on-surface/20 px-2 py-1 rounded-md">
                              <div className="w-4 h-4 rounded-full border border-on-surface/20" style={{ backgroundColor: color }} />
                              <span className="font-mono text-[10px] font-bold text-on-surface-variant uppercase">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Swatch Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => onSelectFabricForStudio(selectedFabric)}
                        className={`flex-1 py-3 font-extrabold uppercase text-xs tracking-wider border-2 border-on-surface rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                          activeStudioFabricIds.includes(selectedFabric.id)
                            ? "bg-secondary text-white hover:bg-on-secondary-fixed shadow-md"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high hard-shadow-purple"
                        }`}
                      >
                        {activeStudioFabricIds.includes(selectedFabric.id) ? (
                          <>
                            <Check className="w-4 h-4 text-white" /> Selected for Studio
                          </>
                        ) : (
                          <>
                            <Layers className="w-4 h-4 text-secondary" /> load into active workspace
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
