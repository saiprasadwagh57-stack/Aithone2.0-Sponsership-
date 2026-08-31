import React from 'react';
import { X, Download, Printer, Sparkles, Building2, Award, CheckCircle, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { EVENT_DETAILS, SPONSORSHIP_TIERS, WHY_SPONSOR_POINTS } from '../data/sponsorshipData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: any, amount?: number) => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Toolbar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading text-base sm:text-lg font-bold text-white">
              Official Sponsorship Prospectus — AiTHON 2.0
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-950 text-slate-200 print:bg-white print:text-black">
          
          {/* Header & Institute Banner */}
          <div className="text-center pb-6 border-b border-slate-800 print:border-slate-300">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
              National Level AI Hackathon • 2026
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white print:text-black mt-2">
              AiTHON 2.0
            </h1>
            <p className="font-heading text-lg text-indigo-300 print:text-indigo-700 font-semibold mt-1">
              "{EVENT_DETAILS.tagline}"
            </p>
            <div className="mt-4 text-xs text-slate-400 print:text-slate-700 space-y-0.5">
              <p className="font-bold text-slate-300 print:text-black">{EVENT_DETAILS.organizerDepartment}</p>
              <p className="font-semibold text-slate-200 print:text-black">{EVENT_DETAILS.collegeName}</p>
              <p className="italic text-indigo-400 print:text-indigo-800">in association with {EVENT_DETAILS.association}</p>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-3">
            <h3 className="font-heading text-base font-bold text-cyan-300 print:text-cyan-800 uppercase tracking-wider">
              1. Executive Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              {EVENT_DETAILS.fullIntro} Over 36 non-stop hours, student engineers architect, build, and deploy production-level AI applications using cutting-edge foundational models, computer vision systems, and intelligent agent frameworks.
            </p>
          </div>

          {/* Value to Corporate Partners */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-cyan-300 print:text-cyan-800 uppercase tracking-wider">
              2. Strategic Benefits for Industry Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_SPONSOR_POINTS.map((pt, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <h4 className="font-bold text-sm text-white print:text-black mb-1">{pt.title}</h4>
                  <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">{pt.shortDesc}</p>
                  <div className="mt-2 text-[11px] font-semibold text-cyan-400 print:text-cyan-700">
                    {pt.metric} — {pt.metricLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Tiers Summary */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-cyan-300 print:text-cyan-800 uppercase tracking-wider">
              3. Sponsorship Tiers & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPONSORSHIP_TIERS.map((tier) => (
                <div key={tier.id} className="p-4 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-sm text-white print:text-black">{tier.name}</h4>
                    <span className="font-mono font-bold text-cyan-300 print:text-indigo-800 text-xs">
                      {tier.priceDisplay}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-700">
                    {tier.features.slice(0, 5).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 print:text-cyan-700">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectTier(tier.id, tier.minAmount);
                    }}
                    className="mt-3 w-full py-1.5 rounded-lg bg-indigo-600/30 print:hidden hover:bg-indigo-600 text-white font-bold text-xs border border-indigo-500/40"
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Contact Details */}
          <div className="p-5 rounded-2xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs space-y-2">
            <h4 className="font-bold text-white print:text-black text-sm">Official Convener Desk & Payment Inquiries:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 print:text-slate-700">
              <p><strong>Email:</strong> {EVENT_DETAILS.contactEmail}</p>
              <p><strong>Direct Helpline:</strong> {EVENT_DETAILS.contactPhone}</p>
              <p><strong>Campus Address:</strong> {EVENT_DETAILS.address}</p>
              <p><strong>Account Holder:</strong> Amrutvahini College of Engineering (AiTHON Desk)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
