import React, { useState, useEffect } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InnovationPipeline } from './components/InnovationPipeline';
import { WhySponsorSection } from './components/WhySponsorSection';
import { ImpactStatsStrip } from './components/ImpactStatsStrip';
import { SponsorshipTiersSection } from './components/SponsorshipTiersSection';
import { RealWorldProblemSection } from './components/RealWorldProblemSection';
import { SponsorRegistrationForm } from './components/SponsorRegistrationForm';
import { FinalCtaSection } from './components/FinalCtaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrganizerLeadsModal } from './components/OrganizerLeadsModal';
import { BrochureModal } from './components/BrochureModal';
import { SponsorLead, TierType } from './types';

export default function App() {
  const [selectedTier, setSelectedTier] = useState<TierType>('Title');
  const [selectedAmount, setSelectedAmount] = useState<number | string>(85000);
  const [leads, setLeads] = useState<SponsorLead[]>([]);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  // Fetch initial sponsor leads from server API
  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/sponsors');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setLeads(json.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch leads from server:', err);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Check if URL contains secret admin hash #admin or #organizer or #leads
    const checkAdminHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#organizer' || hash === '#leads') {
        setIsOrganizerOpen(true);
      }
    };

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);

    // Keyboard shortcut for organizers: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsOrganizerOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseOrganizer = () => {
    setIsOrganizerOpen(false);
    if (window.location.hash.includes('admin') || window.location.hash.includes('organizer') || window.location.hash.includes('leads')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleSelectTier = (tier: TierType, amount?: number) => {
    setSelectedTier(tier);
    if (amount) setSelectedAmount(amount);

    const formElement = document.getElementById('register');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmissionSuccess = (newLead: SponsorLead) => {
    setLeads((prev) => [newLead, ...prev.filter((l) => l.id !== newLead.id)]);
  };

  const handleUpdateStatus = async (id: string, status: SponsorLead['status']) => {
    try {
      const res = await fetch(`/api/sponsors/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/sponsors/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 relative w-full max-w-full overflow-x-hidden">
      {/* 1. Interactive Neural Network & Particle Mesh Canvas */}
      <NeuralBackground />

      {/* 2. Custom Glowing Cyber Cursor */}
      <CustomCursor />

      {/* 3. Top Navigation Command Bar (Strictly Sponsor-Facing) */}
      <Navbar
        onRegisterClick={() => scrollToSection('register')}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      <main className="flex-grow relative z-10 w-full max-w-full overflow-x-hidden">
        {/* 4. Cinematic Hero Section: Humanoid AI Robot + Hologram + Floating Stats */}
        <HeroSection
          onExploreTiers={() => scrollToSection('tiers')}
          onRegisterClick={() => scrollToSection('register')}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* 5. Innovation Pipeline: 5 Nodes (Problem -> Talent -> AI -> Prototype -> Impact) */}
        <InnovationPipeline />

        {/* 6. Why Sponsor Section (4 High-Tech Cards) */}
        <WhySponsorSection
          onRegisterClick={() => scrollToSection('register')}
        />

        {/* 7. Impact Statistics Strip (1000+ Innovators, 50+ Projects, 20+ Mentors, National Level) */}
        <ImpactStatsStrip />

        {/* 8. Sponsorship Tiers (5 AI Access Cards + Comparison Matrix) */}
        <SponsorshipTiersSection
          onSelectTier={handleSelectTier}
        />

        {/* 9. Real-World Problem Track: Enterprise Innovation Flow */}
        <RealWorldProblemSection
          onRegisterClick={() => scrollToSection('register')}
        />

        {/* 10. Sponsor Registration Console & Application Portal */}
        <SponsorRegistrationForm
          initialTier={selectedTier}
          initialAmount={selectedAmount}
          onSubmissionSuccess={handleSubmissionSuccess}
        />

        {/* 11. Final High-Impact CTA Section */}
        <FinalCtaSection
          onRegisterClick={() => scrollToSection('register')}
          onExploreTiers={() => scrollToSection('tiers')}
        />

        {/* 12. Sponsorship FAQ Section */}
        <FaqSection />
      </main>

      {/* 13. 4-Column Structured Footer (Strictly Sponsor-Facing) */}
      <Footer
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenSecretAdmin={() => setIsOrganizerOpen(true)}
      />

      {/* Organizer Leads Console (Accessed via #admin or Ctrl+Shift+A) */}
      <OrganizerLeadsModal
        isOpen={isOrganizerOpen}
        onClose={handleCloseOrganizer}
        leads={leads}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
        onRefresh={fetchLeads}
      />

      {/* Sponsorship Prospectus Brochure Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        onSelectTier={handleSelectTier}
      />
    </div>
  );
}
