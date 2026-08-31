import React from 'react';
import { Code2, Lightbulb, Megaphone, Presentation, CheckCircle, Sparkles } from 'lucide-react';
import { WHY_SPONSOR_POINTS } from '../data/sponsorshipData';

interface WhySponsorSectionProps {
  onRegisterClick: () => void;
}

export const WhySponsorSection: React.FC<WhySponsorSectionProps> = ({ onRegisterClick }) => {
  const getCardIcon = (iconName: string, accent: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-indigo-400" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-purple-400" />;
      case 'Presentation':
        return <Presentation className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getBorderColor = (idx: number) => {
    switch (idx) {
      case 0:
        return 'hover:border-cyan-500/60 hover:shadow-cyan-500/15';
      case 1:
        return 'hover:border-indigo-500/60 hover:shadow-indigo-500/15';
      case 2:
        return 'hover:border-purple-500/60 hover:shadow-purple-500/15';
      case 3:
        return 'hover:border-emerald-500/60 hover:shadow-emerald-500/15';
      default:
        return 'hover:border-indigo-500/60';
    }
  };

  const getBadgeStyle = (idx: number) => {
    switch (idx) {
      case 0:
        return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
      case 1:
        return 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300';
      case 2:
        return 'bg-purple-950/60 border-purple-500/40 text-purple-300';
      case 3:
        return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';
      default:
        return 'bg-slate-900 border-slate-700 text-slate-300';
    }
  };

  return (
    <section id="why-sponsor" className="py-20 lg:py-28 relative z-10 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNERSHIP VALUE</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            WHY SPONSOR <span className="ai-gradient-text">AiTHON?</span>
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Turn sponsorship into innovation, visibility and talent discovery.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {WHY_SPONSOR_POINTS.map((card, idx) => (
            <div
              key={card.id}
              id={`why-sponsor-card-${card.id}`}
              className={`ai-glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-2 shadow-xl ${getBorderColor(
                idx
              )}`}
            >
              <div>
                {/* Header Icon & Step Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {getCardIcon(card.iconName, card.accentColor)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                    0{idx + 1}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  "{card.shortDesc}"
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 mb-6">
                  {card.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small Badge at Bottom */}
              <div className="pt-4 mt-auto border-t border-slate-800/80 flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getBadgeStyle(idx)}`}>
                  {card.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {card.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
