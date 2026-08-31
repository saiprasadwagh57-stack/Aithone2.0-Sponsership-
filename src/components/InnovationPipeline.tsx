import React from 'react';
import { Target, Users, Brain, Code2, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { INNOVATION_PIPELINE_NODES } from '../data/sponsorshipData';

export const InnovationPipeline: React.FC = () => {
  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-rose-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'Code':
        return <Code2 className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="pipeline" className="py-16 relative z-10 border-y border-slate-900 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Innovation Lifecycle</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase">
            WHERE TALENT MEETS OPPORTUNITY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            From industry problem definition to production-grade AI code handover in 36 continuous hours.
          </p>
        </div>

        {/* Desktop / Tablet Horizontal Pipeline */}
        <div className="hidden md:flex items-center justify-between relative">
          
          {/* Glowing Connecting Line Across Background */}
          <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[2px] bg-gradient-to-r from-rose-500/40 via-cyan-500/50 through-indigo-500/50 to-emerald-500/40 z-0 pointer-events-none" />

          {/* Flowing animated stream effect */}
          <svg className="absolute top-1/2 left-8 right-8 -translate-y-1/2 w-[calc(100%-64px)] h-4 z-0 pointer-events-none">
            <line
              x1="0"
              y1="8"
              x2="100%"
              y2="8"
              stroke="rgba(56, 189, 248, 0.8)"
              strokeWidth="2"
              className="animate-data-stream"
            />
          </svg>

          {INNOVATION_PIPELINE_NODES.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div className="relative z-10 flex flex-col items-center group">
                
                {/* Hexagonal / Circular Futuristic Glass Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[1.5px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 group-hover:from-cyan-400 group-hover:to-purple-500 shadow-xl transition-all duration-300 group-hover:scale-110">
                  <div className="w-full h-full rounded-[15px] bg-slate-950/90 backdrop-blur-md flex items-center justify-center border border-slate-800/80 group-hover:border-transparent">
                    {getNodeIcon(node.icon)}
                  </div>
                  
                  {/* Step index badge */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                </div>

                {/* Node Title & Subtitle */}
                <div className="mt-3 text-center">
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-white tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                    {node.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5 max-w-[120px] leading-tight">
                    {node.subtitle}
                  </span>
                </div>
              </div>

              {/* Arrow separator (except last node) */}
              {idx < INNOVATION_PIPELINE_NODES.length - 1 && (
                <div className="relative z-10 text-cyan-400/80 animate-pulse">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Vertical Timeline Layout */}
        <div className="md:hidden space-y-4 relative">
          <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-500 via-indigo-500 to-emerald-500 z-0" />
          
          {INNOVATION_PIPELINE_NODES.map((node, idx) => (
            <div key={node.id} className="relative z-10 flex items-center gap-4 pl-2">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg">
                {getNodeIcon(node.icon)}
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xs font-bold text-white uppercase">
                    {node.title}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                    STEP 0{idx + 1}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {node.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
