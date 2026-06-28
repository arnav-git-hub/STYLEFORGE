import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, Eye, EyeOff, Sparkles, Send, Loader2, RefreshCw, 
  HelpCircle, Check, Copy, Sliders, Scissors, Award 
} from "lucide-react";
import { Fabric, DesignLayer, ChatMessage } from "../types";

interface StudioViewProps {
  fabrics: Fabric[];
  activeStudioFabricIds: string[];
  onSelectFabricForStudio: (fabric: Fabric) => void;
}

export default function StudioView({ 
  fabrics, 
  activeStudioFabricIds, 
  onSelectFabricForStudio 
}: StudioViewProps) {
  // Collection conceptual title
  const [conceptTitle, setConceptTitle] = useState("Vaporous Avant-Garde 2026");
  
  // Layer definitions
  const [layers, setLayers] = useState<DesignLayer[]>([
    { id: "layer-1", name: "Base Silhouette", type: "silhouette", opacity: 0.85, visible: true },
    { id: "layer-2", name: "Body Panel (Silk)", type: "base_fabric", opacity: 0.8, visible: true, fabricId: "emerald-silk" },
    { id: "layer-3", name: "Collar Accent (Velvet)", type: "accent", opacity: 0.75, visible: true, fabricId: "ruby-velvet" },
    { id: "layer-4", name: "Lace Embellishment", type: "embellishment", opacity: 0.4, visible: false, fabricId: "chantilly-lace" }
  ]);
  
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-2");

  // Filter fabrics that are loaded into the active studio
  const activeFabrics = fabrics.filter(f => activeStudioFabricIds.includes(f.id));

  // Chat/Studio Muse State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      role: "model",
      content: "Salutations, designer. I am **Studio Muse**, your AI creative strategist. I have analyzed your active layers. Your combination of high-gloss **Emerald Silk** body panels with deep, light-absorbing **Ruby Velvet** accents creates a stunning tactile contrast. How shall we expand this silhouette?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(layers.map(l => l.id === layerId ? { ...l, visible: !l.visible } : l));
  };

  const handleOpacityChange = (layerId: string, opacity: number) => {
    setLayers(layers.map(l => l.id === layerId ? { ...l, opacity } : l));
  };

  const assignFabricToLayer = (layerId: string, fabricId: string) => {
    setLayers(layers.map(l => l.id === layerId ? { ...l, fabricId } : l));
  };

  // Call the server-side /api/chat endpoint to talk to Studio Muse
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsChatLoading(true);

    // Build the active context to send to the server
    const workspaceContext = {
      activeConcept: conceptTitle,
      selectedFabrics: activeFabrics.map(f => ({ name: f.name, type: f.type, colors: f.colors })),
      layers: layers.map(l => ({
        name: l.name,
        type: l.type,
        opacity: l.opacity,
        visible: l.visible,
        fabric: fabrics.find(f => f.id === l.fabricId)?.name || "None"
      }))
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatMessages.concat(userMsg).map(m => ({ role: m.role, content: m.content })),
          workspaceContext
        })
      });

      if (!response.ok) {
        throw new Error("Studio Muse server was unable to weave advice.");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, {
        id: `muse-${Date.now()}`,
        role: "model",
        content: data.reply,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        id: `muse-err-${Date.now()}`,
        role: "model",
        content: "My apology, designer. The creative thread was broken momentarily. Let us re-weave that concept.",
        timestamp: new Date()
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Helper to extract active layer fabric colors/visual properties
  const getLayerColor = (layerType: "silhouette" | "base_fabric" | "accent" | "embellishment") => {
    const layer = layers.find(l => l.type === layerType);
    if (!layer || !layer.visible) return "transparent";
    const fabric = fabrics.find(f => f.id === layer.fabricId);
    return fabric ? fabric.colors[0] : "#ffffff";
  };

  const getLayerOpacity = (layerType: "silhouette" | "base_fabric" | "accent" | "embellishment") => {
    const layer = layers.find(l => l.type === layerType);
    return layer && layer.visible ? layer.opacity : 0;
  };

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div id="studio-view" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Concept Title Editor Banner */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-high border-2 border-on-surface rounded-xl p-4 relative">
        {/* Washi Tape Ribbon */}
        <div className="absolute top-[-10px] left-8">
          <span className="washi-tape px-4 py-0.5 font-headline font-bold text-[10px] text-white uppercase">
            ACTIVE PROJECT
          </span>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Award className="w-5 h-5 text-primary" />
          <input 
            type="text" 
            value={conceptTitle} 
            onChange={(e) => setConceptTitle(e.target.value)}
            className="font-display font-black text-xl uppercase tracking-tight text-on-surface bg-transparent border-b border-dashed border-on-surface/40 focus:border-primary focus:outline-none w-full md:w-[320px] pb-0.5"
            placeholder="Name your concept..."
          />
        </div>
        <div className="flex gap-2 text-xs uppercase font-extrabold text-on-surface-variant tracking-wider">
          <span>COUTURE EDITION 0.1</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT COLUMN: LAYERS & FABRICS (COUTURIER TOOLKIT) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Section: Layer Stack */}
          <div className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-5 relative">
            <h3 className="font-display text-lg uppercase font-black text-on-surface mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Layer Stack
            </h3>

            <div className="space-y-3 mb-6">
              {layers.map((layer) => {
                const assignedFabric = fabrics.find(f => f.id === layer.fabricId);
                const isSelected = selectedLayerId === layer.id;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`p-3 border-2 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-surface border-primary shadow-sm" 
                        : "bg-surface-container-lowest border-on-surface/20 hover:border-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Swatch indicator circle */}
                      <div 
                        className="w-5 h-5 rounded-full border border-on-surface/25 flex-shrink-0"
                        style={{ backgroundColor: assignedFabric ? assignedFabric.colors[0] : "#e3e2e1" }}
                      />
                      <div>
                        <span className="block text-xs font-bold text-on-surface uppercase truncate max-w-[140px]">
                          {layer.name}
                        </span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-medium">
                          {assignedFabric ? assignedFabric.name : "No Fabric Attached"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* Visibility Eye Toggle */}
                      <button 
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-on-surface/10 hover:bg-surface-container transition-all cursor-pointer"
                      >
                        {layer.visible ? (
                          <Eye className="w-4 h-4 text-on-surface" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-on-surface-variant/40" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opacity Control for selected layer */}
            {selectedLayer && (
              <div className="pt-4 border-t border-on-surface/10">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] uppercase font-extrabold text-on-surface tracking-wider">
                    {selectedLayer.name} Opacity
                  </span>
                  <span className="text-xs font-mono font-bold text-on-surface-variant">
                    {Math.round(selectedLayer.opacity * 100)}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={selectedLayer.opacity * 100} 
                  onChange={(e) => handleOpacityChange(selectedLayer.id, Number(e.target.value) / 100)}
                  className="w-full accent-primary bg-surface-container rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Section: Session Materials Swatches */}
          <div className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-5">
            <h3 className="font-display text-lg uppercase font-black text-on-surface mb-4 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-secondary" /> Studio Materials
            </h3>

            {activeFabrics.length === 0 ? (
              <div className="text-center py-6 bg-surface border border-dashed border-on-surface/20 rounded-xl px-4">
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  No custom swatches loaded into this session.
                </p>
                <span className="text-[10px] uppercase font-bold text-primary mt-1.5 block">
                  Browse material wall to add swatches!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {activeFabrics.map((fabric) => (
                  <div
                    key={fabric.id}
                    onClick={() => selectedLayer && assignFabricToLayer(selectedLayer.id, fabric.id)}
                    className="bg-surface border-2 border-on-surface/20 hover:border-on-surface rounded-xl overflow-hidden cursor-pointer transition-all p-2 flex flex-col justify-between hover:scale-102"
                  >
                    <div className="aspect-square w-full rounded-lg bg-surface-container relative overflow-hidden mb-2 border border-on-surface/10">
                      {fabric.svgPattern ? (
                        <div 
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: fabric.svgPattern }}
                        />
                      ) : fabric.imageUrl ? (
                        <img 
                          src={fabric.imageUrl} 
                          alt={fabric.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full" style={{ backgroundColor: fabric.colors[0] }} />
                      )}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-on-surface uppercase truncate leading-tight">
                        {fabric.name}
                      </span>
                      <span className="block text-[8px] uppercase font-bold text-on-surface-variant/70 mt-0.5">
                        {fabric.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= CENTER COLUMN: LARGE STAGE DISPLAY (THE MANNEQUIN) ================= */}
        <div className="lg:col-span-5 bg-surface border-2 border-on-surface rounded-2xl p-6 flex flex-col justify-between items-center relative min-h-[500px]">
          {/* Tape details */}
          <div className="absolute top-0 left-0 w-full opacity-10">
            <div className="measuring-tape"></div>
          </div>

          <div className="flex justify-between items-center w-full z-10 mb-4">
            <div className="bg-surface border border-on-surface/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant shadow-sm">
              <Scissors className="w-3.5 h-3.5 text-primary" />
              Active Drapery Stage
            </div>
          </div>

          {/* DYNAMIC MANNEQUIN OVERLAY GRAPHIC */}
          <div className="relative w-full max-w-[280px] aspect-[2/3] my-6 flex items-center justify-center">
            {/* 1. Backdrop Glow based on active layer colors */}
            <div 
              className="absolute w-44 h-44 rounded-full blur-[48px] opacity-25 mix-blend-multiply transition-all duration-500"
              style={{ backgroundColor: getLayerColor("base_fabric") }}
            />

            {/* Mannequin stand hanger silhouette */}
            <svg 
              viewBox="0 0 100 150" 
              className="w-full h-full filter drop-shadow-xl select-none"
            >
              <defs>
                {/* SVG pattern overlay derived from selected base fabric */}
                <pattern id="emerald-silk-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#022c22" />
                  <circle cx="10" cy="10" r="4" fill="#0f766e" opacity="0.4" />
                </pattern>
                <pattern id="ruby-velvet-pat" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#4c0519" />
                  <line x1="0" y1="0" x2="16" y2="16" stroke="#881337" strokeWidth="1.5" opacity="0.3" />
                </pattern>
                <pattern id="chantilly-lace-pat" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#fafaf9" />
                  <circle cx="6" cy="6" r="3" fill="none" stroke="#e7e5e4" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Mannequin wooden stand */}
              <line x1="50" y1="10" x2="50" y2="145" stroke="#1a1c1c" strokeWidth="1.5" />
              <line x1="35" y1="145" x2="65" y2="145" stroke="#1a1c1c" strokeWidth="3" />

              {/* Gown layer paths styled dynamically with reactive colors/gradients */}
              
              {/* Silhouette back shadows */}
              <path 
                d="M30,30 L70,30 L65,70 L80,140 L20,140 L35,70 Z" 
                fill="#eeeeed" 
                stroke="#1a1c1c" 
                strokeWidth="0.5" 
                opacity="0.1" 
              />

              {/* LAYER 2: Body Panel (Gown Base) */}
              <path 
                d="M30,30 L70,30 L65,70 L80,140 L20,140 L35,70 Z" 
                fill={getLayerColor("base_fabric") === "#022c22" ? "url(#emerald-silk-pat)" : getLayerColor("base_fabric")} 
                opacity={getLayerOpacity("base_fabric")}
                transition="all 0.5s"
              />

              {/* LAYER 3: Collar / Vest / Accent Details */}
              <path 
                d="M30,30 L70,30 L65,55 L35,55 Z" 
                fill={getLayerColor("accent") === "#4c0519" || getLayerColor("accent") === "#7f1d1d" ? "url(#ruby-velvet-pat)" : getLayerColor("accent")} 
                opacity={getLayerOpacity("accent")}
                transition="all 0.5s"
              />

              {/* LAYER 4: Embellishment / Lace Overlays */}
              <path 
                d="M35,70 L65,70 L75,135 L25,135 Z" 
                fill={getLayerColor("embellishment") === "#fafaf9" ? "url(#chantilly-lace-pat)" : getLayerColor("embellishment")} 
                opacity={getLayerOpacity("embellishment")}
                transition="all 0.5s"
              />

              {/* High couture design line outlines representing direct sketching overlay */}
              <path 
                d="M30,30 L70,30 L65,70 L80,140 L20,140 L35,70 Z" 
                fill="none" 
                stroke="#1a1c1c" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              {/* Drapery fold lines */}
              <path d="M48,32 Q45,70 30,130" fill="none" stroke="#1a1c1c" strokeWidth="1" opacity="0.65" />
              <path d="M52,32 Q55,70 70,130" fill="none" stroke="#1a1c1c" strokeWidth="1" opacity="0.65" />
              <path d="M35,55 Q50,65 65,55" fill="none" stroke="#1a1c1c" strokeWidth="1.5" opacity="0.75" />
            </svg>
          </div>

          <div className="w-full text-center bg-surface-container-low border border-on-surface/15 p-3 rounded-xl z-10">
            <span className="block text-[10px] uppercase font-bold text-on-surface-variant mb-1">
              Live Rendering Mix
            </span>
            <div className="flex justify-center gap-2">
              {layers.map(l => {
                const assigned = fabrics.find(f => f.id === l.fabricId);
                if (!l.visible || !assigned) return null;
                return (
                  <div key={l.id} className="flex items-center gap-1 bg-surface border border-on-surface/10 px-1.5 py-0.5 rounded text-[9px] font-bold text-on-surface uppercase">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: assigned.colors[0] }} />
                    <span>{assigned.name.split(" ")[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: STUDIO MUSE AI CHAT INTERACTION ================= */}
        <div className="lg:col-span-3 bg-surface-container-low border-2 border-on-surface rounded-2xl p-5 flex flex-col justify-between h-[500px] relative">
          <div className="absolute top-[-10px] right-6">
            <span className="washi-tape px-4 py-0.5 font-headline font-bold text-[10px] text-white uppercase bg-secondary-container">
              AI CREATIVE ASSISTANT
            </span>
          </div>

          {/* Chat Header */}
          <div className="border-b border-on-surface/15 pb-3 mb-3 flex items-center gap-2 mt-2">
            <Sparkles className="w-4.5 h-4.5 text-secondary animate-pulse" />
            <h4 className="font-display font-black text-sm uppercase tracking-tight text-on-surface">
              Studio Muse
            </h4>
          </div>

          {/* Chat message scrolling list */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 scrollbar-none text-xs">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div 
                  className={`p-3 rounded-xl leading-relaxed max-w-[90%] font-medium ${
                    msg.role === "user" 
                      ? "bg-on-surface text-surface rounded-tr-none" 
                      : "bg-surface border border-on-surface/15 text-on-surface rounded-tl-none font-sans"
                  }`}
                >
                  {/* Handle markdown bold formatting nicely */}
                  <p 
                    dangerouslySetInnerHTML={{ 
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} 
                  />
                </div>
                <span className="text-[8px] text-on-surface-variant/50 mt-1 uppercase font-bold tracking-wider px-1">
                  {msg.role === "user" ? "You" : "Muse"}
                </span>
              </div>
            ))}
            
            {isChatLoading && (
              <div className="flex items-center gap-2 text-on-surface-variant p-2 bg-surface/50 border border-on-surface/5 rounded-xl w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Weaving concepts...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSendChatMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Brainstorm with Muse..."
              className="flex-1 bg-surface border-2 border-on-surface rounded-lg px-2.5 py-2 text-xs font-semibold text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary"
            />
            <button
              type="submit"
              disabled={isChatLoading || !inputMessage.trim()}
              className="bg-primary hover:bg-primary-container text-on-primary border-2 border-on-surface w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
