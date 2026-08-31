// Deployment trigger
import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Trash2,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet,
  Lock,
  KeyRound,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SponsorLead, TierType } from '../types';

interface OrganizerLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: SponsorLead[];
  onUpdateStatus: (id: string, status: SponsorLead['status']) => void;
  onDeleteLead: (id: string) => void;
  onRefresh: () => void;
}

export const OrganizerLeadsModal: React.FC<OrganizerLeadsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onDeleteLead,
  onRefresh,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aithon_organizer_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<SponsorLead | null>(null);

  // If new leads arrive and a lead was selected, keep selectedLead in sync
  useEffect(() => {
    if (selectedLead) {
      const updated = leads.find((l) => l.id === selectedLead.id);
      if (updated) setSelectedLead(updated);
    }
  }, [leads]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for the AI & DS AVCOE organizing committee
    if (pinInput === '2026' || pinInput === 'aithon' || pinInput === 'admin' || pinInput === 'aithon2026') {
      setIsAuthenticated(true);
      localStorage.setItem('aithon_organizer_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aithon_organizer_auth');
    setPinInput('');
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile.includes(searchTerm);

    const matchesTier = selectedTier === 'ALL' || lead.tier === selectedTier;

    return matchesSearch && matchesTier;
  });

  const totalPledged = leads.reduce((sum, lead) => sum + (Number(lead.amount) || 0), 0);
  const problemStatementsCount = leads.filter((l) => l.hasProblemStatement).length;

  const handleExportCSV = () => {
    window.location.href = '/api/sponsors/export/csv';
  };

  const getTierBadge = (tier: TierType) => {
    switch (tier) {
      case 'Title':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'Gold':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'Silver':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Associate':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      default:
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800';
    }
  };

  const getStatusBadge = (status: SponsorLead['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'In Discussion':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'Follow-up':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      default:
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  AiTHON 2.0 Organizing Committee Desk
                </h3>
                {isAuthenticated && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                    {leads.length} Registered Sponsors
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Department of AI &amp; DS, AVCOE Sangamner • Internal Sponsor Registrations &amp; Problem Statements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={onRefresh}
                  title="Refresh leads list"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  id="export-leads-csv-btn"
                  onClick={handleExportCSV}
                  title="Download CSV of all registered sponsor submissions"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  onClick={handleLogout}
                  title="Lock console"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Lock</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if Not Authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/20">
              <KeyRound className="w-8 h-8" />
            </div>

            <h4 className="font-heading text-xl font-bold text-white mb-2">
              Organizer Passcode Required
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              This area is restricted to the AiTHON 2.0 Organizing Committee (Dept. of AI &amp; DS, AVCOE) to review incoming sponsor submissions.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="placeholder="Enter Committee PIN""
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  autoFocus
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-center text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-heading text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                Unlock Organizer Console
              </button>
            </form>
           
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-slate-950/40 border-b border-slate-800/80">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Pledged</span>
                <span className="text-base sm:text-lg font-bold text-cyan-300 font-heading">
                  ₹{totalPledged.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Sponsor Applications</span>
                <span className="text-base sm:text-lg font-bold text-white font-heading">
                  {leads.length} Companies
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Problem Statements</span>
                <span className="text-base sm:text-lg font-bold text-indigo-300 font-heading">
                  {problemStatementsCount} Received
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Title &amp; Gold Partners</span>
                <span className="text-base sm:text-lg font-bold text-purple-300 font-heading">
                  {leads.filter((l) => l.tier === 'Title' || l.tier === 'Gold').length} Priority
                </span>
              </div>
            </div>

            {/* Filters & Search Toolbar */}
            <div className="p-4 sm:p-5 bg-slate-900/70 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search company, name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Tier Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['ALL', 'Title', 'Gold', 'Silver', 'Associate', 'Custom'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTier(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTier === t
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Body: Table + Preview Sidebar */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Leads Table */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-800/60">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 px-4 text-slate-400 max-w-md mx-auto">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <h5 className="font-heading font-bold text-slate-200 text-base mb-1">
                      {leads.length === 0 ? 'No Sponsor Registrations Yet' : 'No Matching Sponsors Found'}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {leads.length === 0
                        ? 'Inbound sponsor submissions from the public website registration form will automatically be collected and displayed here in real-time.'
                        : 'Try adjusting your search criteria or tier filters above.'}
                    </p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`py-3.5 px-4 rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-950/40 border border-indigo-500/50'
                            : 'hover:bg-slate-950/60 border border-transparent'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-slate-400">{lead.id}</span>
                            <h4 className="text-sm font-bold text-white">{lead.companyName}</h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getTierBadge(
                                lead.tier
                              )}`}
                            >
                              {lead.tier}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                                lead.status
                              )}`}
                            >
                              {lead.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                            <span className="flex items-center gap-1 text-slate-300">
                              <span className="text-slate-400">Rep:</span> {lead.contactPerson}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <a
                                href={`tel:${lead.mobile}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-cyan-300 underline"
                              >
                                {lead.mobile}
                              </a>
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <a
                                href={`mailto:${lead.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-cyan-300 underline"
                              >
                                {lead.email}
                              </a>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <div className="text-right">
                            <div className="text-sm font-bold text-cyan-300 font-mono">
                              ₹{Number(lead.amount).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {lead.hasProblemStatement ? (
                                <span className="text-indigo-300 font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                  Problem Statement
                                </span>
                              ) : (
                                'Package Only'
                              )}
                            </div>
                          </div>

                          {/* Status quick select */}
                          <select
                            value={lead.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              onUpdateStatus(lead.id, e.target.value as SponsorLead['status'])
                            }
                            className="text-xs bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Follow-up">Follow-up</option>
                          </select>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete lead entry for ${lead.companyName}?`)) {
                                onDeleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Detail Inspect Sidebar (when a lead is selected) */}
              {selectedLead && (
                <div className="w-full lg:w-96 p-5 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {selectedLead.id}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(
                        selectedLead.status
                      )}`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedLead.companyName}</h4>
                    <p className="text-xs text-indigo-300 font-semibold mt-0.5">
                      {selectedLead.tier} Partner Package (₹{Number(selectedLead.amount).toLocaleString('en-IN')})
                    </p>
                  </div>

                  <div className="space-y-2 text-xs bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Contact Person:</span>
                      <span className="font-semibold text-white">{selectedLead.contactPerson}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone Number:</span>
                      <a
                        href={`tel:${selectedLead.mobile}`}
                        className="text-cyan-400 underline font-semibold"
                      >
                        +91 {selectedLead.mobile}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email:</span>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-cyan-400 underline font-semibold"
                      >
                        {selectedLead.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Submitted On:</span>
                      <span className="text-slate-300">
                        {new Date(selectedLead.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Problem Statement Detail */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                    <span className="font-bold text-indigo-300 block mb-1">
                      Problem Statement Proposal:
                    </span>
                    {selectedLead.hasProblemStatement && selectedLead.problemStatement ? (
                      <p className="text-slate-200 italic leading-relaxed whitespace-pre-wrap">
                        "{selectedLead.problemStatement}"
                      </p>
                    ) : (
                      <p className="text-slate-500">No problem statement submitted by sponsor.</p>
                    )}
                  </div>

                  {/* Message */}
                  {selectedLead.message && (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="font-bold text-slate-300 block mb-1">
                        Special Requirements / Message:
                      </span>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.message}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`mailto:${selectedLead.email}?subject=AiTHON%202.0%20Sponsorship%20-%20${encodeURIComponent(
                        selectedLead.companyName
                      )}&body=Dear%20${encodeURIComponent(
                        selectedLead.contactPerson
                      )},%0D%0A%0D%0AThank%20you%20for%20registering%20as%20a%20${encodeURIComponent(
                        selectedLead.tier
                      )}%20Partner%20for%20AiTHON%202.0%20at%20Amrutvahini%20College%20of%20Engineering,%20Sangamner.`}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Sponsor Representative</span>
                    </a>
                    <a
                      href={`tel:${selectedLead.mobile}`}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call +91 {selectedLead.mobile}</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
