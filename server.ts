import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent storage setup in data/sponsors.json
const DATA_DIR = path.join(process.cwd(), 'data');
const SPONSORS_FILE = path.join(DATA_DIR, 'sponsors.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface SponsorLead {
  id: string;
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  tier: 'Title' | 'Gold' | 'Silver' | 'Associate' | 'Custom';
  amount: number;
  hasProblemStatement: boolean;
  problemStatement?: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'In Discussion' | 'Confirmed' | 'Follow-up';
}

function loadSponsors(): SponsorLead[] {
  try {
    if (fs.existsSync(SPONSORS_FILE)) {
      const data = fs.readFileSync(SPONSORS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading sponsors file:', err);
  }
  saveSponsors([]);
  return [];
}

function saveSponsors(sponsors: SponsorLead[]) {
  try {
    fs.writeFileSync(SPONSORS_FILE, JSON.stringify(sponsors, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing sponsors file:', err);
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all sponsor submissions
app.get('/api/sponsors', (req, res) => {
  const sponsors = loadSponsors();
  res.json({
    success: true,
    total: sponsors.length,
    data: sponsors,
  });
});

// POST a new sponsor submission
app.post('/api/sponsors', (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      mobile,
      email,
      tier,
      amount,
      hasProblemStatement,
      problemStatement,
      message,
    } = req.body;

    // Validation
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ success: false, error: 'Company/Organization Name is required' });
    }
    if (!contactPerson || !contactPerson.trim()) {
      return res.status(400).json({ success: false, error: 'Contact Person Name is required' });
    }
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ''))) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit mobile number' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }
    if (!tier) {
      return res.status(400).json({ success: false, error: 'Sponsorship Tier is required' });
    }

    const numericAmount = Number(amount) || 0;
    if (numericAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Please specify a valid sponsorship amount' });
    }

    const sponsors = loadSponsors();
    const newId = `SPON-2026-${String(sponsors.length + 1).padStart(3, '0')}`;

    const newLead: SponsorLead = {
      id: newId,
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      mobile: mobile.replace(/\s+/g, ''),
      email: email.trim().toLowerCase(),
      tier,
      amount: numericAmount,
      hasProblemStatement: Boolean(hasProblemStatement),
      problemStatement: hasProblemStatement && problemStatement ? problemStatement.trim() : '',
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString(),
      status: 'New',
    };

    sponsors.unshift(newLead);
    saveSponsors(sponsors);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Our team will reach out to you shortly to finalize the partnership.',
      lead: newLead,
    });
  } catch (err) {
    console.error('Error saving sponsor:', err);
    return res.status(500).json({ success: false, error: 'Failed to process registration. Please try again.' });
  }
});

// Update sponsor status (organizer action)
app.patch('/api/sponsors/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sponsors = loadSponsors();
  const index = sponsors.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Sponsor lead not found' });
  }

  sponsors[index].status = status;
  saveSponsors(sponsors);
  return res.json({ success: true, lead: sponsors[index] });
});

// Delete a lead (organizer action)
app.delete('/api/sponsors/:id', (req, res) => {
  const { id } = req.params;
  let sponsors = loadSponsors();
  const exists = sponsors.some(s => s.id === id);

  if (!exists) {
    return res.status(404).json({ success: false, error: 'Sponsor lead not found' });
  }

  sponsors = sponsors.filter(s => s.id !== id);
  saveSponsors(sponsors);
  return res.json({ success: true, message: 'Lead deleted successfully' });
});

// Export CSV for organizing team
app.get('/api/sponsors/export/csv', (req, res) => {
  const sponsors = loadSponsors();
  const headers = [
    'Lead ID',
    'Company / Organization',
    'Contact Person',
    'Mobile Number',
    'Email Address',
    'Sponsorship Tier',
    'Amount (INR)',
    'Has Problem Statement',
    'Problem Statement Detail',
    'Additional Message',
    'Status',
    'Submission Date',
  ];

  const escapeCSV = (str: any) => {
    if (str === null || str === undefined) return '""';
    const val = String(str).replace(/"/g, '""');
    return `"${val}"`;
  };

  const rows = sponsors.map(s => [
    escapeCSV(s.id),
    escapeCSV(s.companyName),
    escapeCSV(s.contactPerson),
    escapeCSV(s.mobile),
    escapeCSV(s.email),
    escapeCSV(s.tier),
    escapeCSV(s.amount),
    escapeCSV(s.hasProblemStatement ? 'Yes' : 'No'),
    escapeCSV(s.problemStatement || 'N/A'),
    escapeCSV(s.message || 'N/A'),
    escapeCSV(s.status),
    escapeCSV(new Date(s.createdAt).toLocaleString()),
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="AiTHON_2.0_Sponsor_Leads.csv"');
  res.send(csvContent);
});

// Summary Stats
app.get('/api/stats', (req, res) => {
  const sponsors = loadSponsors();
  const totalPledged = sponsors.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const byTier = {
    Title: sponsors.filter(s => s.tier === 'Title').length,
    Gold: sponsors.filter(s => s.tier === 'Gold').length,
    Silver: sponsors.filter(s => s.tier === 'Silver').length,
    Associate: sponsors.filter(s => s.tier === 'Associate').length,
    Custom: sponsors.filter(s => s.tier === 'Custom').length,
  };
  const problemStatementsCount = sponsors.filter(s => s.hasProblemStatement).length;

  res.json({
    totalLeads: sponsors.length,
    totalPledged,
    byTier,
    problemStatementsCount,
  });
});

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AiTHON 2.0 Sponsorship Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
