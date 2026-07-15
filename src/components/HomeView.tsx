import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Layers, Scissors, Flame } from "lucide-react";
import { ActiveScreen } from "../types";

interface HomeViewProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div id="home-view" className="relative overflow-hidden py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Tape Measure Detail Top */}
      <div className="absolute top-0 left-0 w-full opacity-10">
        <div className="measuring-tape"></div>
      </div>

      {/* Hero Header Section */}
      <div className="text-center mt-12 mb-16 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 border border-primary/20 sticker-border">
          <Sparkles className="w-3 h-3" />
          DESIGN WITHOUT BOUNDARIES
        </div>

        <motion.h1 
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tighter text-on-surface leading-none mb-6 max-w-full break-words"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Design<span className="text-primary font-black">Alchemy</span>
        </motion.h1>

        <motion.p 
          className="font-headline text-lg md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          No Limits. Just Your Imagination. Forge bespoke material patterns, layer structural silhouettes, and co-create with <span className="text-secondary font-bold">Studio Muse</span>, your AI fashion strategist.
        </motion.p>

        {/* CTA Button Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button 
            id="cta-studio"
            onClick={() => onNavigate("studio")}
            className="group px-8 py-4 bg-primary text-on-primary font-bold rounded-lg text-lg flex items-center gap-2 border-2 border-on-surface hover:bg-primary-container transition-all active:scale-95 hard-shadow-black cursor-pointer"
          >
            Enter Design Studio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            id="cta-fabrics"
            onClick={() => onNavigate("fabrics")}
            className="px-8 py-4 bg-surface-container-lowest text-on-surface font-bold rounded-lg text-lg flex items-center gap-2 border-2 border-on-surface hover:bg-surface-container transition-all active:scale-95 hard-shadow-purple cursor-pointer"
          >
            Weave New Fabrics
            <Sparkles className="w-5 h-5 text-secondary" />
          </button>
        </motion.div>
      </div>

      {/* Dynamic Scrolling Marquee Banner */}
      <div className="relative w-screen left-[calc(-50vw+50%)] bg-on-surface text-surface py-3 overflow-hidden rotate-1 transform border-y-2 border-primary mb-16 shadow-lg">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-display uppercase tracking-widest text-sm font-bold">
          <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-primary" /> DIGITAL COUTURE SYNERGY</span>
          <span className="flex items-center gap-2"><Scissors className="w-4 h-4 text-secondary" /> TEXTILE RE-IMAGINED</span>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-tertiary-fixed-dim" /> VECTOR LAYERING ENGINE</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary-fixed" /> AI STUDIO MUSE</span>
          <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-primary" /> DIGITAL COUTURE SYNERGY</span>
          <span className="flex items-center gap-2"><Scissors className="w-4 h-4 text-secondary" /> TEXTILE RE-IMAGINED</span>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-tertiary-fixed-dim" /> VECTOR LAYERING ENGINE</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary-fixed" /> AI STUDIO MUSE</span>
        </div>
      </div>

      {/* Feature Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Card 1: The Studio */}
        <motion.div 
          className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 relative overflow-hidden group hover:hard-shadow-pink transition-all flex flex-col justify-between"
          whileHover={{ y: -4 }}
          onClick={() => onNavigate("studio")}
        >
          <div className="absolute top-4 right-4 bg-primary-fixed text-on-primary-fixed w-10 h-10 rounded-full flex items-center justify-center border border-on-surface">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2 text-on-surface mt-6">Couture Workshop</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              An active workspace where you construct garments digitally. Overlay material swatches, stack layers, and manipulate drapes interactively on our mannequin.
            </p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1Gnkj0wweUlb_SwtaQlsT-JAWLFatl7ZfLWWSR-mBNT4RtV6rIMqVzDdBEJIwy2SI8v18EsWpqO38jE0KaVZuvH04ikojo4UqN6tZVy7eszSzfzdRLC4uIZ633GtGXgLk90AKVWEAcnOfw70CqIReFbBv4fKtsC9bdvktB1o7obtwhu3z1nUB8vkIKn45npJlrpXkI3bSPSG_WJpx6iljDZqF1Wf079pt903jL77WpggOmrUm3sSfTsWIR8O80L1c7fEpJmrYIo" 
            alt="Couture Mannequin" 
            className="w-full h-44 object-cover rounded-lg border-2 border-on-surface mt-auto grayscale group-hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Card 2: Fabric Weaver */}
        <motion.div 
          className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 relative overflow-hidden group hover:hard-shadow-purple transition-all flex flex-col justify-between"
          whileHover={{ y: -4 }}
          onClick={() => onNavigate("fabrics")}
        >
          <div className="absolute top-4 right-4 bg-secondary-fixed text-on-secondary-fixed w-10 h-10 rounded-full flex items-center justify-center border border-on-surface">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2 text-on-surface mt-6">Textile Weaver</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Generate customizable high-fashion vector seamless pattern fabrics by prompting Gemini. View texture walls and export custom colors.
            </p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzq2IefwIRI7w0Fq6MpseDnHsOvVtpepA5DDZ0NBNfZ6yl_MRwnZeleAq0LiXbBmbUJh0GS8ZdrzIxW2JUyIV1HkDbIYmRUpeoZsMXw2PELEAYLvJsJocuTc4dM3X-WjLcRB8RVl3yEevOSLRsqdDXABHtDbvedRc9ivP6fy_LeeRckGYFu468WM7VKEpxe7LEVsZTMovx1ErqSQLiIf0SwV8BNwwhDTzsNR8qK8-t7nXXYg-0zn-QOGemrTcU06W_dSdzmo5b2EQ" 
            alt="Emerald Woven Silk" 
            className="w-full h-44 object-cover rounded-lg border-2 border-on-surface mt-auto grayscale group-hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Card 3: Infinite Patterns */}
        <motion.div 
          className="bg-surface-container-low border-2 border-on-surface rounded-2xl p-6 relative overflow-hidden group hover:hard-shadow-tertiary transition-all flex flex-col justify-between"
          whileHover={{ y: -4 }}
          onClick={() => onNavigate("patterns")}
        >
          <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed w-10 h-10 rounded-full flex items-center justify-center border border-on-surface">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2 text-on-surface mt-6">Infinite Patterns</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Interact with custom floral, star, stripe, and geometric motif layers on active garment templates with simple scaling controls.
            </p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1jS99DlmRbAkW9sY1dcwB3VAASyqHP7DYQuEiLfyjxydLSH-huFgn63awbzZLfFWprjRIhEdwWmLbkjHjn4recgehk9kLvFQ-Lh3S54aw2qn7Qa9mT2XERoLaJSzLkzY11Ipb4FO7lbcpUT6d0mojKPfup4Yp0GtYGZ18Rk90k-3GV-MNFgZIwZAzH9CH-yLnPpZyMvA5Gwsrj-26IIt1dNd0Ab6p0Djpie-SSh-TQqhS4rZZUI9ePEOmjt-vouz6bbYfVCHBZtU" 
            alt="Infinite Patterns Engine" 
            className="w-full h-44 object-cover rounded-lg border-2 border-on-surface mt-auto grayscale group-hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Decorative Washi Tape Accent */}
      <div className="flex justify-center my-8">
        <div className="washi-tape px-10 py-1.5 font-headline font-bold text-sm text-white uppercase text-center sticker-shadow">
          MADE IN DESIGNALCHEMY LABS // 2026 COUTURE
        </div>
      </div>
    </div>
  );
}
