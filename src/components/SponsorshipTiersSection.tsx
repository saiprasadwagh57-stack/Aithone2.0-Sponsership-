import React, { useState } from 'react';
import { Check, Crown, Star, Shield, Award, Sparkles, ArrowRight, Layers, CheckCircle2, X } from 'lucide-react';
import { SPONSORSHIP_TIERS, COMPARISON_MATRIX } from '../data/sponsorshipData';
import { TierType } from '../types';

interface SponsorshipTiersSectionProps {
  onSelectTier: (tier: TierType, amount?: number) => void;
}

export const SponsorshipTiersSection: React.FC<SponsorshipTiersSectionProps> = ({ onSelectTier }) => {
  const [showMatrix, setShowMatrix] = useState(false);

  const getTierIcon = (id: TierType) => {
    switch (id) {
      case 'Title':
        return <Crown className="w-5 h-5 text-indigo-400" />;
      case 'Gold':
        return <Star className="w-5 h-5 text-amber-400 fill-amber-400" />;
      case 'Silver':
        return <Shield className="w-5 h-5 text-slate-300" />;
      case 'Associate':
        return <Award className="w-5 h-5 text-cyan-400" />;
      case 'Custom':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="tiers" className="py-20 lg:py-28 relative z-10 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ACCESS LEVELS</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            CHOOSE YOUR <span className="ai-gradient-text">PARTNERSHIP LEVEL</span>
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Find the partnership that fits your organization's goals.
          </p>

          {/* Quick toggle for comparison matrix */}
          <div className="mt-6 flex flex-col sm:inline-flex sm:flex-row p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto">
            <button
              onClick={() => setShowMatrix(false)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                !showMatrix
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tier Cards (5 Levels)
            </button>
            <button
              onClick={() => setShowMatrix(true)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                showMatrix
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Detailed Comparison Matrix
            </button>
          </div>
        </div>

        {/* 5 Cards Grid */}
        {!showMatrix ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-4 items-stretch">
            {SPONSORSHIP_TIERS.map((tier) => {
              const isTitle = tier.id === 'Title';
              const isGold = tier.id === 'Gold';
              const isSilver = tier.id === 'Silver';
              const isAssociate = tier.id === 'Associate';
              const isCustom = tier.id === 'Custom';

              return (
                <div
                  key={tier.id}
                  id={`tier-card-${tier.id.toLowerCase()}`}
                  className={`ai-glass-card rounded-2xl flex flex-col justify-between transition-all duration-300 relative p-5 sm:p-5 group hover:-translate-y-2 shadow-xl ${
                    isTitle
                      ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/50 bg-slate-900/90'
                      : isGold
                      ? 'border-amber-500/50 hover:border-amber-400/80 shadow-amber-500/10'
                      : isSilver
                      ? 'border-slate-700 hover:border-slate-500'
                      : isAssociate
                      ? 'border-cyan-500/30 hover:border-cyan-400/60'
                      : 'border-purple-500/40 hover:border-purple-400/80'
                  }`}
                >
                  {/* Floating Badge (PREMIUM on Title) */}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md ${
                          isTitle
                            ? 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-white shadow-indigo-500/40 animate-pulse-glow'
                            : isGold
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 border border-slate-700 text-slate-300'
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Header with Icon */}
                    <div className="mt-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-2">
                        {getTierIcon(tier.id)}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {tier.name}
                      </h3>
                      {tier.tagline && (
                        <p className={`text-[11px] mt-0.5 min-h-[28px] ${isGold ? 'text-amber-300/90' : isTitle ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
                          {tier.tagline}
                        </p>
                      )}
                    </div>

                    {/* Price Tag */}
                    <div className="mb-4 pb-4 border-b border-slate-800/80">
                      <div className="flex items-baseline gap-1">
                        <span className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          isGold ? 'text-amber-300' : isTitle ? 'text-white' : isSilver ? 'text-slate-200' : 'text-white'
                        }`}>
                          {tier.priceDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isTitle ? 'text-cyan-400' : isGold ? 'text-amber-400' : 'text-indigo-400'
                          }`} />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-3 mt-auto">
                    <button
                      id={`select-tier-${tier.id.toLowerCase()}-btn`}
                      onClick={() => onSelectTier(tier.id, tier.minAmount)}
                      className={`w-full py-3 sm:py-2.5 px-3 rounded-xl text-xs sm:text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                        isTitle
                          ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-indigo-600/30'
                          : isGold
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-amber-500/20'
                          : isCustom
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span>
                        {isTitle
                          ? 'Become Title Partner'
                          : isGold
                          ? 'Choose Gold'
                          : isSilver
                          ? 'Choose Silver'
                          : isAssociate
                          ? 'Choose Associate'
                          : 'Discuss Custom Partnership'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detailed Comparison Matrix View */
          <div className="ai-glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  AiTHON 2.0 Deliverables Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete feature breakdown across Title, Gold, Silver &amp; Associate tiers
                </p>
              </div>
              <button
                onClick={() => setShowMatrix(false)}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
              >
                ← Back to Card View
              </button>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="sm:hidden px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/40 text-[11px] text-cyan-300 flex items-center justify-center gap-1.5 font-medium">
              <span>Swipe horizontally to view all tiers ↔</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800">
                    <th className="py-4 px-5 font-heading font-bold text-slate-300 w-2/5">
                      Deliverables &amp; Privileges
                    </th>
                    <th className="py-4 px-3 font-heading font-bold text-center text-cyan-300 bg-cyan-950/20">
                      Title Partner
                      <div className="text-[11px] font-normal text-slate-400">₹85,000+</div>
                    </th>
                    <th className="py-4 px-3 font-heading font-bold text-center text-amber-300 bg-amber-950/20">
                      Gold Partner
                      <div className="text-[11px] font-normal text-slate-400">₹50,000+</div>
                    </th>
                    <th className="py-4 px-3 font-heading font-bold text-center text-slate-300">
                      Silver Partner
                      <div className="text-[11px] font-normal text-slate-400">₹25,000+</div>
                    </th>
                    <th className="py-4 px-3 font-heading font-bold text-center text-slate-400">
                      Associate Partner
                      <div className="text-[11px] font-normal text-slate-400">₹10,000+</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {COMPARISON_MATRIX.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="bg-slate-900/40">
                        <td
                          colSpan={5}
                          className="py-2.5 px-5 font-heading text-xs font-bold text-indigo-300 uppercase tracking-wider bg-slate-900/80"
                        >
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item, itemIdx) => (
                        <tr key={itemIdx} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-3 px-5 text-slate-300 font-medium">{item.name}</td>
                          
                          {/* Title column */}
                          <td className="py-3 px-3 text-center bg-cyan-950/10">
                            {typeof item.title === 'boolean' ? (
                              item.title ? (
                                <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="font-semibold text-cyan-300 text-xs">
                                {item.title}
                              </span>
                            )}
                          </td>

                          {/* Gold column */}
                          <td className="py-3 px-3 text-center bg-amber-950/10">
                            {typeof item.gold === 'boolean' ? (
                              item.gold ? (
                                <CheckCircle2 className="w-5 h-5 text-amber-400 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="font-semibold text-amber-300 text-xs">
                                {item.gold}
                              </span>
                            )}
                          </td>

                          {/* Silver column */}
                          <td className="py-3 px-3 text-center">
                            {typeof item.silver === 'boolean' ? (
                              item.silver ? (
                                <CheckCircle2 className="w-5 h-5 text-slate-300 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-300 text-xs">{item.silver}</span>
                            )}
                          </td>

                          {/* Associate column */}
                          <td className="py-3 px-3 text-center">
                            {typeof item.associate === 'boolean' ? (
                              item.associate ? (
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-400 text-xs">{item.associate}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900/90 border-t border-slate-800">
                    <td className="py-4 px-5 font-bold text-slate-300">Choose Tier &amp; Register</td>
                    <td className="py-4 px-3 text-center bg-cyan-950/20">
                      <button
                        onClick={() => onSelectTier('Title', 85000)}
                        className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                      >
                        Select Title
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center bg-amber-950/20">
                      <button
                        onClick={() => onSelectTier('Gold', 50000)}
                        className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs"
                      >
                        Select Gold
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => onSelectTier('Silver', 25000)}
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                      >
                        Select Silver
                      </button>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => onSelectTier('Associate', 10000)}
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                      >
                        Select Associate
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
