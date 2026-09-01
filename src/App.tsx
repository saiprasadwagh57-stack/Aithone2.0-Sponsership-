import React, { useState, useEffect } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InnovationPipeline } from './components/InnovationPipeline';
import { WhySponsorSection } from './components/WhySponsorSection';
import { BudgetImpactPreviewSection } from './components/BudgetImpactPreviewSection';
import { ImpactStatsStrip } from './components/ImpactStatsStrip';
import { SponsorshipTiersSection } from './components/SponsorshipTiersSection';
import { RealWorldProblemSection } from './components/RealWorldProblemSection';
import { SponsorRegistrationForm } from './components/SponsorRegistrationForm';
import { FinalCtaSection } from './components/FinalCtaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrganizerLeadsModal } from './components/OrganizerLeadsModal';
import { BrochureModal } from './components/BrochureModal';
import { EventBudgetPage } from './components/EventBudgetPage';
import { SponsorLead, TierType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'budget'>('home');
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

    // Check if URL contains hash for budget or secret admin
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#organizer' || hash === '#leads') {
        setIsOrganizerOpen(true);
      } else if (hash === '#budget' || hash === '#event-budget' || hash === '#impact') {
        setCurrentPage('budget');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Keyboard shortcut for organizers: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsOrganizerOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseOrganizer = () => {
    setIsOrganizerOpen(false);
    if (window.location.hash.includes('admin') || window.location.hash.includes('organizer') || window.location.hash.includes('leads')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleNavigateToBudget = () => {
    setCurrentPage('budget');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', '#budget');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash === '#budget' || window.location.hash === '#event-budget') {
      history.pushState(null, '', window.location.pathname);
    }
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (tier: TierType, amount?: number) => {
    setSelectedTier(tier);
    if (amount) setSelectedAmount(amount);

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const formElement = document.getElementById('register');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const formElement = document.getElementById('register');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 relative w-full max-w-full overflow-x-hidden">
      {/* 1. Interactive Neural Network & Particle Mesh Canvas */}
      <NeuralBackground />

      {/* 2. Custom Glowing Cyber Cursor */}
      <CustomCursor />

      {/* 3. Top Navigation Command Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
        onNavigateToBudget={handleNavigateToBudget}
        onNavigateToSection={handleNavigateToSection}
        onRegisterClick={() => handleNavigateToSection('register')}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      <main className="flex-grow relative z-10 w-full max-w-full overflow-x-hidden">
        {currentPage === 'budget' ? (
          /* ================= DEDICATED EVENT BUDGET & IMPACT PAGE ================= */
          <EventBudgetPage
            onNavigateHome={handleNavigateHome}
            onNavigateToTiers={() => handleNavigateToSection('tiers')}
            onNavigateToRegister={() => handleNavigateToSection('register')}
            onOpenBrochure={() => setIsBrochureOpen(true)}
          />
        ) : (
          /* ================= MAIN LANDING PAGE ================= */
          <>
            {/* 4. Cinematic Hero Section: Humanoid AI Robot + Hologram + Floating Stats */}
            <HeroSection
              onExploreTiers={() => handleNavigateToSection('tiers')}
              onRegisterClick={() => handleNavigateToSection('register')}
              onOpenBrochure={() => setIsBrochureOpen(true)}
            />

            {/* 5. Innovation Pipeline: 5 Nodes (Problem -> Talent -> AI -> Prototype -> Impact) */}
            <InnovationPipeline />

            {/* 6. Why Sponsor Section (4 High-Tech Cards + See Where Sponsorship Goes) */}
            <WhySponsorSection
              onRegisterClick={() => handleNavigateToSection('register')}
              onExploreBudget={handleNavigateToBudget}
            />

            {/* 7. NEW Preview Section: WHERE DOES YOUR PARTNERSHIP CREATE IMPACT? */}
            <BudgetImpactPreviewSection
              onExploreBudget={handleNavigateToBudget}
            />

            {/* 8. Impact Statistics Strip (1000+ Innovators, 50+ Projects, 20+ Mentors, National Level) */}
            <ImpactStatsStrip />

            {/* 9. Sponsorship Tiers (5 AI Access Cards + Comparison Matrix) */}
            <SponsorshipTiersSection
              onSelectTier={handleSelectTier}
            />

            {/* 10. Real-World Problem Track: Enterprise Innovation Flow */}
            <RealWorldProblemSection
              onRegisterClick={() => handleNavigateToSection('register')}
            />

            {/* 11. Sponsor Registration Console & Application Portal */}
            <SponsorRegistrationForm
              initialTier={selectedTier}
              initialAmount={selectedAmount}
              onSubmissionSuccess={handleSubmissionSuccess}
            />

            {/* 12. Final High-Impact CTA Section */}
            <FinalCtaSection
              onRegisterClick={() => handleNavigateToSection('register')}
              onExploreTiers={() => handleNavigateToSection('tiers')}
            />

            {/* 13. Sponsorship FAQ Section */}
            <FaqSection />
          </>
        )}
      </main>

      {/* 14. 4-Column Structured Footer */}
      <Footer
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenSecretAdmin={() => setIsOrganizerOpen(true)}
        onNavigateToBudget={handleNavigateToBudget}
        onNavigateToSection={handleNavigateToSection}
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
