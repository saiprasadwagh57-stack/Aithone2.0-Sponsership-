import React from 'react';
import { Sparkles, ArrowRight, Brain, Users, Code2, Network, Globe, Layers, CheckCircle2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/sponsorshipData';
import heroRobotImg from '../assets/images/humanoid_ai_robot_1788201120084.jpg';

interface HeroSectionProps {
  onExploreTiers: () => void;
  onRegisterClick: () => void;
  onOpenBrochure: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTiers,
  onRegisterClick,
  onOpenBrochure,
}) => {
  return (
    <section id="hero" className="relative min-h-[88vh] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-80 animate-pulse-glow" />
      <div className="absolute top-1/2 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/15 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Event Details & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1 w-full max-w-full">
            
            {/* 1. Small glowing badge: NATIONAL LEVEL AI HACKATHON */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>NATIONAL LEVEL AI HACKATHON</span>
            </div>

            {/* 2. Main heading: AiTHON 2.0 */}
            <div className="relative mb-2 w-full">
              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                Ai<span className="ai-gradient-text">THON</span>{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                  2.0
                </span>
              </h1>
            </div>

            {/* 3. Tagline: Where Ideas, Intelligence & Impact Converge */}
            <h2 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight mt-2 sm:mt-3 mb-4 sm:mb-6 leading-snug w-full">
              Where Ideas, Intelligence &amp; <br className="hidden sm:inline" />
              <span className="text-cyan-300">Impact Converge.</span>
            </h2>

            {/* 4. Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              {EVENT_DETAILS.shortIntro}
            </p>

            {/* 5. CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10 max-w-md lg:max-w-none mx-auto lg:mx-0">
              <button
                id="hero-become-sponsor-btn"
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-heading text-sm sm:text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-indigo-600/35 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Become a Sponsor</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-tiers-btn"
                onClick={onExploreTiers}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-heading text-sm sm:text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 hover:text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore Sponsorship</span>
              </button>
            </div>

            {/* 6. Organizer Credentials Under Buttons */}
            <div className="pt-4 sm:pt-6 border-t border-slate-800/80 w-full max-w-xl mx-auto lg:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-400">
                <div className="p-3 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0 text-center sm:text-left">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-400 sm:text-slate-400 block font-semibold mb-1">
                    Organized by
                  </span>
                  <p className="font-semibold text-slate-200">
                    {EVENT_DETAILS.organizerDepartment}
                  </p>
                  <p className="text-slate-400 text-[11px] sm:text-xs">
                    {EVENT_DETAILS.collegeName}
                  </p>
                </div>
                <div className="p-3 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0 text-center sm:text-left">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-400 sm:text-slate-400 block font-semibold mb-1">
                    In association with
                  </span>
                  <p className="font-semibold text-indigo-300">
                    AIESA
                  </p>
                  <p className="text-slate-400 text-[11px] sm:text-xs">
                    AI &amp; Data Science Student Association
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Futuristic Humanoid AI Robot Visual & Metrics */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 w-full">
            
            {/* Robot Image Container with Futuristic Holographic Backlight */}
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[490px] aspect-square rounded-3xl p-1 bg-gradient-to-tr from-cyan-500/35 via-indigo-500/25 to-purple-500/35 shadow-2xl shadow-cyan-500/20 group animate-float-slow">
              
              {/* High-Tech Ambient Radial Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-600/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              {/* Inner Glow Behind Robot */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-indigo-950/30 to-slate-950/60 rounded-3xl blur-md" />

              {/* Robot Presentation Visual */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-950/80 border border-cyan-500/30 shadow-inner flex items-center justify-center">
                <img
                  src={heroRobotImg}
                  alt="AiTHON 2.0 Futuristic AI Humanoid Robot Presenting Holographic AI Brain"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05] brightness-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber HUD Overlays */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1.5 px-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-cyan-300 shadow-lg">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    NEURAL_CORE: ACTIVE
                  </span>
                  <span className="text-slate-300 font-semibold tracking-wide">AI VISUAL SYNERGY: 100%</span>
                </div>
              </div>
            </div>

            {/* Desktop-only Floating Cards */}
            <div className="hidden lg:block">
              {/* Card 1: Student Innovators 1000+ (Top Left) */}
              <div
                id="hero-card-innovators"
                className="absolute -top-4 -left-6 ai-glass-card rounded-2xl p-3.5 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 animate-float-slow z-20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Student Innovators</span>
                    <span className="font-heading text-base font-bold text-white">1000+</span>
                  </div>
                </div>
              </div>

              {/* Card 2: AI Projects 50+ (Top Right) */}
              <div
                id="hero-card-projects"
                className="absolute -top-2 -right-6 ai-glass-card rounded-2xl p-3.5 border border-indigo-500/30 shadow-xl shadow-indigo-500/10 animate-float-reverse z-20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">AI Projects</span>
                    <span className="font-heading text-base font-bold text-white">50+</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Industry Mentors 20+ (Bottom Left) */}
              <div
                id="hero-card-mentors"
                className="absolute -bottom-4 -left-6 ai-glass-card rounded-2xl p-3.5 border border-purple-500/30 shadow-xl shadow-purple-500/10 animate-float-reverse z-20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Industry Mentors</span>
                    <span className="font-heading text-base font-bold text-white">20+</span>
                  </div>
                </div>
              </div>

              {/* Card 4: 50+ Colleges / National Reach (Bottom Right) */}
              <div
                id="hero-card-national"
                className="absolute -bottom-2 -right-6 ai-glass-card rounded-2xl p-3.5 border border-emerald-500/30 shadow-xl shadow-emerald-500/10 animate-float-slow z-20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">National Reach</span>
                    <span className="font-heading text-base font-bold text-white">50+ Colleges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only 2x2 Clean Metrics Grid (Avoids overflow & looks ultra crisp) */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[320px] sm:max-w-[400px] mt-4 lg:hidden">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">1000+</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Innovators</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">50+</div>
                  <div className="text-[10px] text-slate-400 leading-tight">AI Teams</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Network className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">20+</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Mentors</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">50+</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Colleges</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
