import React from 'react';
import { Brain, MapPin, Globe, Linkedin, Instagram } from 'lucide-react';
import { EVENT_DETAILS } from '../data/sponsorshipData';

interface FooterProps {
  onOpenBrochure: () => void;
  onOpenSecretAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrochure, onOpenSecretAdmin }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand and Overview */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                  Ai<span className="ai-gradient-text">THON</span>
                </span>
                <span className="font-heading font-black text-sm px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  2.0
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {EVENT_DETAILS.tagline}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              {EVENT_DETAILS.shortIntro}
            </p>

            {/* College Social & Official Web Portals */}
            <div className="flex items-center gap-3 text-slate-400">
              {/* 1. College LinkedIn Page */}
              <a
                href="https://www.linkedin.com/school/avcoe/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amrutvahini College of Engineering LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 hover:scale-105 transition-all shadow-sm group"
                title="AVCOE Official LinkedIn"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* 2. College Instagram Page */}
              <a
                href="https://www.instagram.com/avcoeofficial?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amrutvahini College of Engineering Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-500/50 hover:bg-slate-850 hover:scale-105 transition-all shadow-sm group"
                title="AVCOE Official Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* 3. College Official Website */}
              <a
                href="https://share.google/CXoPXjeOfK4gHUMh5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amrutvahini College of Engineering Official Website"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-850 hover:scale-105 transition-all shadow-sm group"
                title="AVCOE Official Website"
              >
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pipeline')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Innovation Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-sponsor')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Why Sponsor
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tiers')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Sponsorship Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('problem-track')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Problem Statement Track
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('register')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Sponsor Registration Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Organizing Body */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4">
              Organized By
            </h4>
            <div className="text-xs text-slate-300 space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  Department
                </span>
                <p className="font-semibold text-white">
                  {EVENT_DETAILS.organizerDepartment}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  Institution
                </span>
                <p className="text-slate-200">
                  {EVENT_DETAILS.collegeName}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  In Association With
                </span>
                <p className="text-indigo-300 font-semibold">
                  AIESA
                </p>
                <p className="text-slate-400 text-[11px]">
                  (AI &amp; Data Science Engineering Student Association)
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBrochure}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline"
                >
                  Download Sponsorship Prospectus (PDF/Print)
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Venue */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4">
              Venue
            </h4>
            <div className="text-xs text-slate-400 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-slate-300">
                  Department of AI &amp; DS, Amrutvahini College of Engineering, Sangamner, Dist. Ahmednagar, Maharashtra, India.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; 2026 {EVENT_DETAILS.name} &bull; {EVENT_DETAILS.collegeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-slate-400">Terms of Partnership</a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-slate-400">Code of Conduct</a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-slate-400">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
