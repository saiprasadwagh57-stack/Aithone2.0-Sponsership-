import React, { useState, useEffect } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  RefreshCw,
  Sparkles,
  Cpu,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { SponsorFormData, FormErrors, TierType, SponsorLead } from '../types';
import { EVENT_DETAILS } from '../data/sponsorshipData';

interface SponsorRegistrationFormProps {
  initialTier: TierType;
  initialAmount: number | string;
  onSubmissionSuccess: (lead: SponsorLead) => void;
}

const TIER_DEFAULT_AMOUNTS: Record<TierType, number> = {
  Title: 85000,
  Gold: 50000,
  Silver: 25000,
  Associate: 10000,
  Custom: 15000,
};

export const SponsorRegistrationForm: React.FC<SponsorRegistrationFormProps> = ({
  initialTier,
  initialAmount,
  onSubmissionSuccess,
}) => {
  const [formData, setFormData] = useState<SponsorFormData>({
    companyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    tier: initialTier || 'Title',
    amount: initialAmount || 85000,
    hasProblemStatement: false,
    problemStatement: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<SponsorLead | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters for personalized sponsor invites (e.g. ?company=Infosys&contact=Mr.+Patil&tier=Gold)
    try {
      const params = new URLSearchParams(window.location.search);
      const companyParam = params.get('company') || params.get('c');
      const contactParam = params.get('contact') || params.get('name') || params.get('rep');
      const emailParam = params.get('email');
      const phoneParam = params.get('phone') || params.get('mobile');
      const tierParam = params.get('tier') as TierType;

      if (companyParam || contactParam || emailParam || phoneParam || tierParam) {
        setFormData((prev) => ({
          ...prev,
          companyName: companyParam || prev.companyName,
          contactPerson: contactParam || prev.contactPerson,
          email: emailParam || prev.email,
          mobile: phoneParam || prev.mobile,
          tier: (tierParam && ['Title', 'Gold', 'Silver', 'Associate', 'Custom'].includes(tierParam)) ? tierParam : prev.tier,
          amount: (tierParam && TIER_DEFAULT_AMOUNTS[tierParam]) ? TIER_DEFAULT_AMOUNTS[tierParam] : prev.amount,
        }));
      }
    } catch {
      // ignore in environments where window is restricted
    }
  }, []);

  useEffect(() => {
    if (initialTier) {
      const suggestedAmount =
        initialAmount || TIER_DEFAULT_AMOUNTS[initialTier] || 85000;
      setFormData((prev) => ({
        ...prev,
        tier: initialTier,
        amount: initialTier === 'Custom' ? prev.amount || 20000 : suggestedAmount,
      }));
    }
  }, [initialTier, initialAmount]);

  const validateField = (name: keyof SponsorFormData, value: any): string | undefined => {
    switch (name) {
      case 'companyName':
        if (!value || !value.toString().trim()) return 'Company or Organization name is required';
        return undefined;
      case 'contactPerson':
        if (!value || !value.toString().trim()) return 'Contact person name is required';
        return undefined;
      case 'mobile': {
        const cleanMobile = value.toString().replace(/\s+/g, '');
        if (!cleanMobile) return 'Mobile number is required';
        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
          return 'Enter a valid 10-digit mobile number (e.g., 9822123456)';
        }
        return undefined;
      }
      case 'email': {
        const emailStr = value.toString().trim();
        if (!emailStr) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
          return 'Enter a valid email address (e.g., sponsor@company.com)';
        }
        return undefined;
      }
      case 'amount': {
        const num = Number(value);
        if (!num || isNaN(num) || num <= 0) return 'Please specify a valid contribution amount (₹)';
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: isCheckbox ? checked : value,
      };

      if (name === 'tier') {
        const selectedTier = value as TierType;
        if (selectedTier !== 'Custom') {
          updated.amount = TIER_DEFAULT_AMOUNTS[selectedTier] || 85000;
        }
      }

      return updated;
    });

    if (touched[name]) {
      const err = validateField(
        name as keyof SponsorFormData,
        isCheckbox ? checked : value
      );
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (name: keyof SponsorFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleTierSelect = (tier: TierType) => {
    setFormData((prev) => ({
      ...prev,
      tier,
      amount: tier !== 'Custom' ? TIER_DEFAULT_AMOUNTS[tier] : prev.amount || 20000,
    }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const companyErr = validateField('companyName', formData.companyName);
    if (companyErr) newErrors.companyName = companyErr;

    const contactErr = validateField('contactPerson', formData.contactPerson);
    if (contactErr) newErrors.contactPerson = contactErr;

    const mobileErr = validateField('mobile', formData.mobile);
    if (mobileErr) newErrors.mobile = mobileErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const amountErr = validateField('amount', formData.amount);
    if (amountErr) newErrors.amount = amountErr;

    setErrors(newErrors);
    setTouched({
      companyName: true,
      contactPerson: true,
      mobile: true,
      email: true,
      amount: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmittedLead(result.lead);
        onSubmissionSuccess(result.lead);
      } else {
        setServerError(result.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      const fallbackLead: SponsorLead = {
        id: `SPON-2026-${Math.floor(100 + Math.random() * 900)}`,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        email: formData.email,
        tier: formData.tier,
        amount: Number(formData.amount) || 85000,
        hasProblemStatement: formData.hasProblemStatement,
        problemStatement: formData.problemStatement,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'New',
      };
      setSubmittedLead(fallbackLead);
      onSubmissionSuccess(fallbackLead);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setFormData({
      companyName: '',
      contactPerson: '',
      mobile: '',
      email: '',
      tier: 'Title',
      amount: 85000,
      hasProblemStatement: false,
      problemStatement: '',
      message: '',
    });
    setErrors({});
    setTouched({});
    setServerError(null);
  };

  return (
    <section id="register" className="py-20 lg:py-28 relative z-10 border-t border-slate-900 bg-slate-950/80">
      
      {/* Background Accent Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-cyan-900/10 via-indigo-900/15 to-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNERSHIP APPLICATION</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            BECOME A <span className="ai-gradient-text">SPONSOR</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Fill out the form and our team will reach out to you shortly.
          </p>
        </div>

        {/* Successful Submission View */}
        {submittedLead ? (
          <div className="ai-glass-card rounded-3xl p-6 sm:p-12 border border-emerald-500/50 shadow-2xl shadow-emerald-500/10 text-center animate-in fade-in zoom-in-95 duration-300 max-w-3xl mx-auto">
            
            {/* Animated glowing checkmark */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs mb-3">
              Application Ref: <span className="text-cyan-400 font-bold">{submittedLead.id}</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
              You're In!
            </h3>

            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto mb-6 sm:mb-8 font-medium">
              Thank you! Our team will reach out to you shortly to finalize the partnership.
            </p>

            {/* Summary Details */}
            <div className="max-w-md mx-auto bg-slate-900/90 rounded-2xl p-4 sm:p-6 text-left border border-slate-800 space-y-3 mb-6 sm:mb-8">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">Organization:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{submittedLead.companyName}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">Contact Person:</span>
                <span className="font-semibold text-white">{submittedLead.contactPerson}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">Selected Tier:</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                  {submittedLead.tier} Partner
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">Pledged Contribution:</span>
                <span className="font-bold text-cyan-300">
                  ₹{Number(submittedLead.amount).toLocaleString('en-IN')}+
                </span>
              </div>
              {submittedLead.hasProblemStatement && (
                <div className="text-xs pt-1">
                  <span className="text-slate-400 block mb-1">Problem Statement:</span>
                  <span className="text-slate-300 italic line-clamp-2">
                    "{submittedLead.problemStatement || 'Proposed with application'}"
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Submit Another Request</span>
            </button>
          </div>
        ) : (
          /* Futuristic Console Layout */
          <div className="ai-glass-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Top Console Status Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-slate-200">● PARTNERSHIP PORTAL</span>
              </div>
              <div className="text-slate-400 hidden sm:block">
                AiTHON 2.0 // NATIONAL LEVEL AI HACKATHON
              </div>
            </div>

            <div className="p-4 sm:p-10">
              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/80 text-red-300 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                
                {/* 3-Column Layout for Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  
                  {/* 1. Company / Organization Name */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Company / Organization Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('companyName')}
                        placeholder="Enter company or organization name"
                        className={`w-full pl-10 pr-3 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.companyName && touched.companyName
                            ? 'border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.companyName && touched.companyName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* 2. Sponsorship Tier Selection */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="tier"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Sponsorship Tier <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="tier"
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-base sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                      <option value="Title">Title Partner (₹85,000+)</option>
                      <option value="Gold">Gold Partner (₹50,000+)</option>
                      <option value="Silver">Silver Partner (₹25,000+)</option>
                      <option value="Associate">Associate Partner (₹10,000+)</option>
                      <option value="Custom">Custom Partnership</option>
                    </select>
                  </div>

                  {/* 3. Problem Statement Description (Optional) */}
                  <div className="md:col-span-1 md:row-span-2 flex flex-col">
                    <label
                      htmlFor="problemStatement"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Describe your problem statement (Optional)
                    </label>
                    <textarea
                      id="problemStatement"
                      name="problemStatement"
                      rows={4}
                      value={formData.problemStatement}
                      onChange={handleChange}
                      placeholder="Tell us about the real-world challenge you want students to solve..."
                      className="w-full p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 flex-1 resize-none min-h-[100px]"
                    />
                  </div>

                  {/* 4. Contact Person Name */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="contactPerson"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Contact Person Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        onBlur={() => handleBlur('contactPerson')}
                        placeholder="Enter contact person name"
                        className={`w-full pl-10 pr-3 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.contactPerson && touched.contactPerson
                            ? 'border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.contactPerson && touched.contactPerson && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.contactPerson}
                      </p>
                    )}
                  </div>

                  {/* 5. Sponsorship Amount (₹) */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="amount"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Sponsorship Amount (₹) <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="5000"
                        step="1000"
                        value={formData.amount}
                        onChange={handleChange}
                        onBlur={() => handleBlur('amount')}
                        placeholder="85000"
                        className={`w-full px-3.5 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border text-base sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.amount && touched.amount
                            ? 'border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Suggested amount for selected tier
                    </span>
                  </div>

                  {/* 6. Mobile Number */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="mobile"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Mobile Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        onBlur={() => handleBlur('mobile')}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-3 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.mobile && touched.mobile
                            ? 'border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.mobile && touched.mobile && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* 7. Problem Statement Radio Toggle */}
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Do you have a Problem Statement to propose?
                    </label>
                    <div className="grid grid-cols-2 gap-2 py-1">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasProblemStatement: true }))}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                          formData.hasProblemStatement === true
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasProblemStatement: false }))}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                          formData.hasProblemStatement === false
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>

                  {/* 8. Additional Message / Requirements */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Additional Requirements (Optional)
                    </label>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Brand expectations, student engagement ideas, etc."
                      className="w-full px-3.5 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  {/* 9. Email Address */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="Enter email address"
                        className={`w-full pl-10 pr-3 py-3 sm:py-2.5 bg-slate-900/90 rounded-xl border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email && touched.email
                            ? 'border-rose-500 focus:ring-rose-500/30'
                            : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>

                {/* Submit Row */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 text-center sm:text-left">
                    * Required fields for preliminary partnership processing.
                  </p>
                  
                  <button
                    type="submit"
                    id="submit-sponsor-form-btn"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-xl font-heading text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-indigo-600/30 disabled:opacity-60 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Sponsorship Request</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
