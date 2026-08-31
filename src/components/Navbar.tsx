import React, { useState, useEffect } from 'react';
import {
  Brain,
  Menu,
  X,
  FileDown,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Code2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { EVENT_DETAILS } from '../data/sponsorshipData';

interface NavbarProps {
  onRegisterClick: () => void;
  onOpenBrochure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  onOpenBrochure,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-2.5 sm:py-3'
          : 'bg-slate-950/40 backdrop-blur-sm sm:bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Event Tag */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  Ai<span className="ai-gradient-text">THON</span>
                </span>
                <span className="font-heading font-black text-xs sm:text-sm px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                  2.0
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wider block mt-0.5">
                AVCOE Sangamner
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('pipeline')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Pipeline
            </button>
            <button
              onClick={() => scrollToSection('why-sponsor')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Why Sponsor
            </button>
            <button
              onClick={() => scrollToSection('tiers')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Tiers
            </button>
            <button
              onClick={() => scrollToSection('problem-track')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Problem Track
            </button>
            <button
              onClick={() => scrollToSection('register')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Prospectus Brochure Download */}
            <button
              onClick={onOpenBrochure}
              title="View & Download Official Sponsorship Prospectus"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prospectus</span>
            </button>

            {/* Primary Action */}
            <button
              onClick={onRegisterClick}
              className="px-4 py-2 rounded-xl font-heading text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Become a Sponsor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Action & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onRegisterClick}
              className="sm:hidden px-3 py-1.5 rounded-lg font-heading text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20 active:scale-95 transition-transform"
            >
              Sponsor Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 rounded-2xl bg-slate-950/95 border border-slate-800/90 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Home</span>
              </button>
              <button
                onClick={() => scrollToSection('pipeline')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Pipeline</span>
              </button>
              <button
                onClick={() => scrollToSection('why-sponsor')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Why Sponsor</span>
              </button>
              <button
                onClick={() => scrollToSection('tiers')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Tiers &amp; Pricing</span>
              </button>
              <button
                onClick={() => scrollToSection('problem-track')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Problem Track</span>
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-900/90 rounded-xl flex items-center gap-2 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>FAQ</span>
              </button>
            </div>

            {/* Quick Action Drawer Buttons */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full py-3 rounded-xl font-heading text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <span>Complete Sponsorship Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrochure();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Prospectus (PDF)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
