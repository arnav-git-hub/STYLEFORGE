import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Tag, Info, User, Layers, Sparkles, X, Check } from "lucide-react";
import { CommunityDesign, Fabric } from "../types";

interface ShowcaseViewProps {
  designs: CommunityDesign[];
  fabrics: Fabric[];
  onSelectFabricForStudio: (fabric: Fabric) => void;
  activeStudioFabricIds: string[];
}

export default function ShowcaseView({ 
  designs, 
  fabrics, 
  onSelectFabricForStudio, 
  activeStudioFabricIds 
}: ShowcaseViewProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [inspectedDesign, setInspectedDesign] = useState<CommunityDesign | null>(null);

  // Filter labels derived dynamically or declared matching Screenshot 3
  const filters = ["All", "Outerwear", "Knitwear", "Gown", "Sketch"];

  const filteredDesigns = selectedFilter === "All"
    ? designs
    : designs.filter(d => d.tags.some(t => t.toLowerCase() === selectedFilter.toLowerCase()) || d.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card inspect opening on click
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(item => item !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  return (
    <div id="showcase-view" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-on-surface pb-6">
        <div>
          <h2 className="font-display text-3xl md:text-5xl uppercase font-black tracking-tight text-on-surface">
            Community Showcase
          </h2>
          <p className="font-headline text-on-surface-variant font-medium mt-1">
            Explore avant-garde couture combinations curated by global DesignAlchemy creators.
          </p>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-on-surface/10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-on-surface transition-all cursor-pointer ${
              selectedFilter === filter
                ? "bg-primary text-on-primary hard-shadow-black scale-102"
                : "bg-surface text-on-surface hover:bg-surface-container"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of designs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredDesigns.map((design) => {
          const isLiked = likedIds.includes(design.id);
          const likeCount = isLiked ? design.likes + 1 : design.likes;

          return (
            <motion.div
              key={design.id}
              className="bg-surface border-2 border-on-surface rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between hover:hard-shadow-pink transition-all group"
              whileHover={{ y: -4 }}
              onClick={() => setInspectedDesign(design)}
            >
              {/* Product Visual */}
              <div className="aspect-[3/4] relative w-full border-b-2 border-on-surface bg-surface-container overflow-hidden">
                <img
                  src={design.imageUrl}
                  alt={design.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Creator Overlay Banner */}
                <div className="absolute top-3 left-3 bg-on-surface/90 text-surface backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-2 border border-surface/20 text-[10px] font-bold uppercase tracking-wide">
                  <img
                    src={design.avatar}
                    alt={design.designer}
                    className="w-4 h-4 rounded-full border border-surface/30 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {design.designer}
                </div>

                {/* Like Button overlay */}
                <button
                  onClick={(e) => handleLike(design.id, e)}
                  className={`absolute bottom-3 right-3 w-9 h-9 rounded-full border-2 border-on-surface flex items-center justify-center transition-all cursor-pointer sticker-shadow active:scale-90 ${
                    isLiked ? "bg-primary text-white" : "bg-surface text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : ""}`} />
                </button>
              </div>

              {/* Title & Tag details */}
              <div className="p-4 bg-surface-container-low flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {design.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-primary-fixed text-on-primary-fixed font-black uppercase px-2 py-0.5 rounded border border-on-surface/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-black text-lg uppercase text-on-surface leading-tight tracking-tight mb-2 truncate">
                    {design.title}
                  </h3>

                  <p className="text-on-surface-variant text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                    {design.description}
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex justify-between items-center pt-3 border-t border-on-surface/10 mt-auto">
                  <span className="text-[10px] font-extrabold text-on-surface/60 uppercase tracking-widest flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> {likeCount} appreciations
                  </span>
                  
                  <span className="text-[10px] bg-surface-variant text-on-surface font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 border border-on-surface/5">
                    <Layers className="w-3 h-3" /> specs
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* INSPECT MODAL OVERLAY */}
      <AnimatePresence>
        {inspectedDesign && (
          <div className="fixed inset-0 bg-on-surface/65 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              id="inspect-modal"
              className="bg-surface border-3 border-on-surface rounded-2xl w-full max-w-3xl overflow-hidden relative hard-shadow-black"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectedDesign(null)}
                className="absolute top-4 right-4 bg-surface border-2 border-on-surface w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container active:scale-90 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5 text-on-surface" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Image */}
                <div className="aspect-[3/4] md:aspect-auto md:h-[520px] bg-surface-container border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-on-surface overflow-hidden relative">
                  <img
                    src={inspectedDesign.imageUrl}
                    alt={inspectedDesign.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-on-surface text-surface px-3 py-1.5 rounded-lg flex items-center gap-2 border border-surface/20 text-xs font-bold uppercase">
                    <img
                      src={inspectedDesign.avatar}
                      alt={inspectedDesign.designer}
                      className="w-5 h-5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    DESIGNED BY {inspectedDesign.designer}
                  </div>
                </div>

                {/* Specifications content */}
                <div className="p-6 md:p-8 flex flex-col justify-between h-[520px] overflow-y-auto">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {inspectedDesign.tags.map(t => (
                        <span key={t} className="text-[10px] bg-secondary-fixed text-on-secondary-fixed font-black uppercase px-2.5 py-0.5 rounded border border-on-surface/15">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-on-surface leading-tight tracking-tight mb-3">
                      {inspectedDesign.title}
                    </h3>

                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-6">
                      {inspectedDesign.description}
                    </p>

                    {/* Structural Notes */}
                    <div className="bg-surface-container-low border border-on-surface/15 p-4 rounded-xl mb-6">
                      <span className="block text-[10px] uppercase font-extrabold text-on-surface/60 tracking-wider mb-1">
                        SILHOUETTE STRUCTURE
                      </span>
                      <p className="text-xs font-bold text-on-surface uppercase tracking-wide">
                        {inspectedDesign.structure || "Avant-garde volumetric tailoring"}
                      </p>
                    </div>

                    {/* Fabrics utilized */}
                    <div className="mb-6">
                      <span className="block text-[10px] uppercase font-extrabold text-on-surface/60 tracking-wider mb-2.5">
                        FABRICS REQUISITED IN DESIGN
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {inspectedDesign.fabricsUsed.map(fName => {
                          // Try to match the actual Fabric objects
                          const actualFabric = fabrics.find(f => f.name.toLowerCase() === fName.toLowerCase() || f.id.toLowerCase() === fName.toLowerCase().replace(/\s+/g, "-"));
                          const isLoadedInStudio = actualFabric ? activeStudioFabricIds.includes(actualFabric.id) : false;

                          return (
                            <button
                              key={fName}
                              onClick={() => actualFabric && onSelectFabricForStudio(actualFabric)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                                isLoadedInStudio
                                  ? "bg-secondary text-white border-on-surface shadow-sm"
                                  : "bg-surface hover:bg-surface-container border-on-surface/20 text-on-surface"
                              }`}
                            >
                              {actualFabric && (
                                <div className="w-3.5 h-3.5 rounded-full border border-on-surface/15" style={{ backgroundColor: actualFabric.colors[0] }} />
                              )}
                              <span>{fName}</span>
                              {isLoadedInStudio ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <Sparkles className="w-3 h-3 text-secondary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-on-surface/15 flex gap-4">
                    <button
                      onClick={() => handleLike(inspectedDesign.id, {} as any)}
                      className={`px-4 py-2.5 border-2 border-on-surface rounded-lg flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider transition-all cursor-pointer ${
                        likedIds.includes(inspectedDesign.id)
                          ? "bg-primary text-white"
                          : "bg-surface hover:bg-surface-container"
                      }`}
                    >
                      <Heart className="w-4 h-4" /> {likedIds.includes(inspectedDesign.id) ? "Appreciated" : "Appreciate"}
                    </button>
                    
                    <button
                      onClick={() => setInspectedDesign(null)}
                      className="flex-1 py-2.5 bg-on-surface text-surface hover:bg-on-surface-variant font-bold uppercase text-xs tracking-wider rounded-lg border-2 border-on-surface transition-all cursor-pointer text-center"
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
