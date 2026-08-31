import React from 'react';
import { Building2, FileText, Brain, Users, Code2, TrendingUp, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface RealWorldProblemSectionProps {
  onRegisterClick: () => void;
}

export const RealWorldProblemSection: React.FC<RealWorldProblemSectionProps> = ({ onRegisterClick }) => {
  const steps = [
    { title: 'COMPANY', icon: <Building2 className="w-5 h-5 text-cyan-400" /> },
    { title: 'PROBLEM STATEMENT', icon: <FileText className="w-5 h-5 text-indigo-400" /> },
    { title: 'AI HACKATHON', icon: <Brain className="w-5 h-5 text-purple-400" /> },
    { title: 'STUDENT TEAMS', icon: <Users className="w-5 h-5 text-pink-400" /> },
    { title: 'PROTOTYPE', icon: <Code2 className="w-5 h-5 text-amber-400" /> },
    { title: 'BUSINESS IMPACT', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <section id="problem-track" className="py-20 lg:py-28 relative z-10 border-t border-slate-900 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Text and CTA */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HAVE A REAL-WORLD PROBLEM?</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Let India's next generation <br className="hidden sm:inline" />
              <span className="ai-gradient-text">of AI builders solve it.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Organizations can submit real-world challenges and invite participating teams to explore AI-powered solutions with full code repository handover and prototype ownership.
            </p>

            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-heading text-sm sm:text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Submit Your Problem Statement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-slate-400 mt-3 text-center lg:text-left">
              Available for eligible sponsorship partnerships.
            </p>
          </div>

          {/* Right Side: Futuristic Process Diagram */}
          <div className="lg:col-span-7 ai-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  PIPELINE: ENTERPRISE_INNOVATION_FLOW
                </span>
                <span className="text-[10px] text-slate-400 font-mono">STEP_COUNT: 06</span>
              </div>

              {/* Steps Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold mb-1">
                      0{idx + 1}
                    </span>
                    <h4 className="font-heading text-xs font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {s.title}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Bottom Flow Caption */}
              <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-xs text-slate-400">
                <span className="text-slate-300 font-semibold">Real-Time Prototype Generation:</span> Multiple independent student teams explore parallel AI architectures for your exact business use case.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
