export type TierType = 'Title' | 'Gold' | 'Silver' | 'Associate' | 'Custom';

export interface TierBenefit {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface SponsorshipTierInfo {
  id: TierType;
  name: string;
  priceDisplay: string;
  minAmount: number;
  badge?: string;
  tagline: string;
  accentColor: string;
  gradient: string;
  borderColor: string;
  popular?: boolean;
  features: string[];
}

export interface SponsorFormData {
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  tier: TierType;
  amount: number | string;
  hasProblemStatement: boolean;
  problemStatement: string;
  message: string;
}

export interface FormErrors {
  companyName?: string;
  contactPerson?: string;
  mobile?: string;
  email?: string;
  tier?: string;
  amount?: string;
  problemStatement?: string;
}

export interface SponsorLead {
  id: string;
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  tier: TierType;
  amount: number;
  hasProblemStatement: boolean;
  problemStatement?: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'In Discussion' | 'Confirmed' | 'Follow-up';
}

export interface SponsorStats {
  totalLeads: number;
  totalPledged: number;
  byTier: {
    Title: number;
    Gold: number;
    Silver: number;
    Associate: number;
    Custom: number;
  };
  problemStatementsCount: number;
}
