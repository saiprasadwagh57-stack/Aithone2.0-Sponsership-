import { SponsorshipTierInfo } from '../types';

export const EVENT_DETAILS = {
  name: 'AiTHON 2.0',
  edition: '2026 Edition',
  type: 'National Level AI Hackathon',
  organizerDepartment: 'Department of Artificial Intelligence & Data Science',
  collegeName: 'Amrutvahini College of Engineering, Sangamner',
  collegeShort: 'AVCOE Sangamner',
  association: 'AIESA (AI & Data Science Engineering Student Association)',
  tagline: 'Where Ideas, Intelligence & Impact Converge.',
  shortIntro: "AiTHON 2.0 brings together India's brightest student innovators to build AI-powered solutions for real-world challenges.",
  fullIntro: "Hosted by Amrutvahini College of Engineering, Sangamner, in association with AIESA, AiTHON 2.0 provides an unparalleled platform for industry leaders to discover top AI talent, source cutting-edge prototypes for proprietary problem statements, and build massive campus brand resonance.",
  contactEmail: 'sponsors@aithon.example',
  contactPhone: '+91 XXXXX XXXXX',
  address: 'Department of AI & DS, Amrutvahini College of Engineering, Sangamner, Maharashtra, India',
  website: 'www.aithon.example',
};

export const INNOVATION_PIPELINE_NODES = [
  {
    id: 'problem',
    title: 'PROBLEM',
    subtitle: 'Real-world challenge definition',
    icon: 'Target',
    color: 'from-rose-500 to-amber-500',
  },
  {
    id: 'talent',
    title: 'STUDENT TALENT',
    subtitle: 'Top 1000+ shortlisted minds',
    icon: 'Users',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'innovation',
    title: 'AI INNOVATION',
    subtitle: 'GenAI, LLMs, Computer Vision',
    icon: 'Brain',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'prototype',
    title: 'WORKING PROTOTYPE',
    subtitle: '36-hour sprint code handover',
    icon: 'Code',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'impact',
    title: 'REAL-WORLD IMPACT',
    subtitle: 'Enterprise deployment & scaling',
    icon: 'TrendingUp',
    color: 'from-emerald-500 to-teal-500',
  },
];

export const WHY_SPONSOR_POINTS = [
  {
    id: 'talent',
    title: 'Hire Talent in Action',
    shortDesc: 'Watch talented student developers solve real problems under pressure and discover the next generation of innovators.',
    badge: 'Talent Discovery',
    iconName: 'Code2',
    accentColor: 'cyan',
    benefits: [
      'Direct access to curated candidate resume repository',
      'Conduct fast-track technical interviews on-site',
      'Observe real-time problem-solving & live coding skills',
      'Reduce recruitment cycle cost & hiring turnaround'
    ],
    metric: '1,000+ Innovators',
    metricLabel: 'Screened nationwide'
  },
  {
    id: 'prototypes',
    title: 'Free Working Prototypes',
    shortDesc: 'Bring your real-world challenge and let student teams build AI-powered prototype solutions for you.',
    badge: 'Innovation Partner',
    iconName: 'Lightbulb',
    accentColor: 'indigo',
    benefits: [
      'Dedicated Problem Statement slot in your enterprise domain',
      'Multiple independent AI architectures tackling your pain point',
      'Full intellectual handover & code repository review',
      'Zero initial R&D expenditure for experimental AI workflows'
    ],
    metric: '50+ AI Projects',
    metricLabel: 'Delivered in GenAI & Vision'
  },
  {
    id: 'visibility',
    title: 'Brand Visibility',
    shortDesc: 'Put your brand everywhere — digital, on-ground, workshops, socials, and across the event platform.',
    badge: 'Maximum Exposure',
    iconName: 'Megaphone',
    accentColor: 'purple',
    benefits: [
      'Logo on main stage LED backdrops, photo booths & entry arches',
      'Branding on participant badges, t-shirts, kit bags & certificates',
      'Prominent placement on official registration portals & social media',
      'Press release & regional media publications mention'
    ],
    metric: '50,000+ Reach',
    metricLabel: 'Across engineering student network'
  },
  {
    id: 'engagement',
    title: 'On-Ground Engagement',
    shortDesc: 'Engage directly with participants through booth, networking and stage mentions.',
    badge: 'Direct Engagement',
    iconName: 'Presentation',
    accentColor: 'emerald',
    benefits: [
      'Dedicated exhibition booth / tech lounge in prime campus venue',
      'Keynote stage address & speaker slot during inaugural ceremony',
      'Seat on the grand finale technical jury evaluation panel',
      'VIP networking session with college leadership and AI faculty'
    ],
    metric: '36 Hours',
    metricLabel: 'Continuous on-ground interaction'
  }
];

export const SPONSORSHIP_TIERS: SponsorshipTierInfo[] = [
  {
    id: 'Title',
    name: 'Title Partner',
    priceDisplay: '₹85,000+',
    minAmount: 85000,
    badge: 'PREMIUM',
    tagline: 'Powered by [Company]',
    accentColor: 'indigo',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    borderColor: 'border-indigo-500/80 shadow-indigo-500/30',
    popular: true,
    features: [
      'Title association: "AiTHON 2.0 Powered by [Company]"',
      'Full branding across all digital & physical assets',
      'Booth presence: Prime tech lounge on campus',
      'Exclusive VIP networking session with faculty & leaders',
      'Direct unrestricted talent access & resume database',
      'Problem statement slot with dedicated award category',
      'Jury seat on final evaluation panel',
      'Stage recognition & keynote address',
      'Extensive media coverage & press PR release'
    ]
  },
  {
    id: 'Gold',
    name: 'Gold Partner',
    priceDisplay: '₹50,000+',
    minAmount: 50000,
    badge: 'High Impact',
    tagline: 'Co-Branded Innovation Track & Exhibition Presence',
    accentColor: 'amber',
    gradient: 'from-amber-500 via-yellow-500 to-amber-600',
    borderColor: 'border-amber-500/50 shadow-amber-500/20',
    features: [
      'Prominent Brand visibility on banners, badges & portal',
      'Booth presence on campus during 36h hackathon',
      'Exclusive networking session with top student finalists',
      'Talent access & resume repository',
      'Problem statement slot in dedicated track',
      'Jury seat on finale evaluation panel',
      'Stage recognition during inaugural and valedictory',
      'Media coverage across digital channels'
    ]
  },
  {
    id: 'Silver',
    name: 'Silver Partner',
    priceDisplay: '₹25,000+',
    minAmount: 25000,
    badge: 'Core Supporter',
    tagline: 'Ideal for talent acquisition & brand positioning',
    accentColor: 'slate',
    gradient: 'from-slate-400 via-slate-200 to-slate-400',
    borderColor: 'border-slate-500/40 shadow-slate-500/10',
    features: [
      'Brand visibility on event backdrops, portal & certificates',
      'Networking session access with student builders',
      'Curated talent access & candidate directory',
      'Media coverage & social media spotlight feature'
    ]
  },
  {
    id: 'Associate',
    name: 'Associate Partner',
    priceDisplay: '₹10,000+',
    minAmount: 10000,
    badge: 'Starter Tier',
    tagline: 'Community & startup partner visibility',
    accentColor: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-slate-800',
    borderColor: 'border-cyan-500/30',
    features: [
      'Brand visibility on official website footer & booklet',
      'Talent access for campus recruitment drives',
      'Official partnership certificate & media coverage'
    ]
  },
  {
    id: 'Custom',
    name: 'Custom Partnership',
    priceDisplay: 'Flexible',
    minAmount: 15000,
    badge: 'Tailored',
    tagline: "Let's build a partnership that fits your goals.",
    accentColor: 'purple',
    gradient: 'from-purple-600 via-pink-600 to-indigo-600',
    borderColor: 'border-purple-500/40 shadow-purple-500/20',
    features: [
      'Custom prize tracks & domain challenge awards',
      'Cloud credits, GPU tokens, API grants or hardware kit sponsorship',
      'Custom branding activations & workshop mentoring slots',
      'Dedicated hiring lounge or interview rooms'
    ]
  }
];

export const COMPARISON_MATRIX = [
  {
    category: 'Branding & Identity',
    items: [
      { name: 'Title Event Association ("Powered by [Company]")', title: true, gold: false, silver: false, associate: false },
      { name: 'Prime Stage LED Backdrop & Banner Logo', title: 'Top Logo', gold: 'Prominent', silver: 'Standard', associate: 'Standard' },
      { name: 'Official Website & Portal Header Logo', title: 'Featured Top', gold: 'Tier 1 Grid', silver: 'Tier 2 Grid', associate: 'Grid Logo' },
      { name: 'Participant Badges, Certificates & Kit Bags', title: true, gold: true, silver: 'Certificates Only', associate: 'Certificates Only' },
      { name: 'Social Media & Regional Press PR Mentions', title: 'Dedicated Release', gold: 'Featured Post', silver: 'Standard Post', associate: 'Group Post' }
    ]
  },
  {
    category: 'Engagement & On-Ground Presence',
    items: [
      { name: 'Dedicated Physical Exhibition Booth on Campus', title: 'Prime Lounge (3x3m)', gold: 'Standard Booth (2x2m)', silver: false, associate: false },
      { name: 'Opening / Closing Keynote Stage Address', title: '15 Mins Keynote', gold: '5 Mins Address', silver: 'Stage Mention', associate: false },
      { name: 'VIP Networking Session with Leaders & Faculty', title: true, gold: true, silver: true, associate: false },
      { name: 'Jury Seat on Final Evaluation Panel', title: '2 Seats', gold: '1 Seat', silver: false, associate: false }
    ]
  },
  {
    category: 'Talent & Problem Statement Slots',
    items: [
      { name: 'Exclusive Industry Problem Statement Track', title: 'Guaranteed Track', gold: 'Guaranteed Track', silver: false, associate: false },
      { name: 'Access to Complete Participant Resumes Database', title: 'Instant & Unrestricted', gold: 'Complete Access', silver: 'Finalists Only', associate: 'Directory' },
      { name: 'Fast-Track Recruitment / Interview Room on Site', title: true, gold: true, silver: false, associate: false },
      { name: 'Access to Working Code Repositories & Prototypes', title: 'All Submissions', gold: 'Track Submissions', silver: 'Public Repos', associate: false }
    ]
  }
];

export const IMPACT_STATS = [
  { label: 'Student Innovators', value: '1000+', icon: 'Users', subtext: 'Top students from 100+ institutes' },
  { label: 'AI Projects', value: '50+', icon: 'Code2', subtext: 'Built live across 36 hours' },
  { label: 'Industry Mentors', value: '20+', icon: 'Network', subtext: 'Guiding and reviewing solutions' },
  { label: 'Colleges Nationwide', value: '50+', icon: 'Globe', subtext: 'National level participation' }
];

export const FAQ_ITEMS = [
  {
    q: 'Can we propose custom sponsorship deliverables or in-kind tech credits?',
    a: 'Absolutely! We welcome cloud credits, AI API tokens, hardware kits, and custom prize tracks. Select "Custom Partnership" in the tier options or note your custom requirements, and our conveners will tailor a package.'
  },
  {
    q: 'How will our Problem Statement be evaluated and assigned?',
    a: 'Title and Gold partners receive a dedicated track. Teams can choose your problem statement, and your nominated jury member will evaluate the live prototype demos during the finale.'
  },
  {
    q: 'What is the payment procedure for confirmed sponsorships?',
    a: 'Once you submit your intent, our faculty coordinator from Amrutvahini College of Engineering will provide the official college invoice and bank transfer details (NEFT/RTGS/Cheque) along with an official sponsorship agreement.'
  },
  {
    q: 'Can our company representatives attend on-site during the hackathon?',
    a: 'Yes, sponsor representatives are invited to campus for the inauguration, mentoring rounds, tech lounge exhibition, networking dinner, and the grand prize distribution ceremony.'
  }
];
