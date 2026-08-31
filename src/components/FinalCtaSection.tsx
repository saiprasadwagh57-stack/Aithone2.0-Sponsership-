import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onRegisterClick: () => void;
  onExploreTiers: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onRegisterClick,
  onExploreTiers,
}) => {
  return (
    <section className="py-24 lg:py-32 relative z-10 overflow-hidden border-t border-slate-900 bg-slate-950/90">
      
      {/* Background Glowing Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[140px] pointer-events-none opacity-90 animate-pulse-glow" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE INNOVATION FRONTIER</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your Brand.{' '}
          <span className="ai-gradient-text">Their Ideas.</span> <br />
          The Future of AI.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          Partner with AiTHON 2.0 and help turn ambitious student ideas into real-world impact.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-become-sponsor-btn"
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Become a Sponsor</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="final-cta-explore-tiers-btn"
            onClick={onExploreTiers}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-heading text-base font-semibold text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-slate-600 hover:text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore Partnership Levels</span>
          </button>
        </div>

      </div>
    </section>
  );
};
