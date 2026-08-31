import React from 'react';
import { Users, Code2, Network, Globe } from 'lucide-react';
import { IMPACT_STATS } from '../data/sponsorshipData';

export const ImpactStatsStrip: React.FC = () => {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-purple-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-400" />;
      default:
        return <Users className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="ai-glass-card rounded-2xl p-5 sm:p-6 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getStatIcon(stat.icon)}
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  METRIC_0{idx + 1}
                </span>
              </div>

              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
