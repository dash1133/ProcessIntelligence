// ── DATA ──
const COMPANY = { name: "Agentic PM", type: "Private Markets", brands: 42, states: 18, technicians: 2850, annualRevenue: "$1.2B" };

const KPI_CARDS = [
  { label: "Gross Margin",     value: "22.4%",   change: "−0.9pp",  changePeriod: "vs Q3",       changeUp: false, color: "#10b981", target: "26.0%",   gap: "−3.6pp",   gapGood: false, progress: 86,
    breakdown: [
      { cat: "Fasteners",      value: "26.8%", change: "+0.4pp", changePeriod: "vs Q3", target: "26.0%", gap: "+0.8pp", gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Safety & PPE",   value: "31.0%", change: "+1.2pp", changePeriod: "vs Q3", target: "26.0%", gap: "+5.0pp", gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "PVC & Fittings", value: "19.4%", change: "−1.8pp", changePeriod: "vs Q3", target: "26.0%", gap: "−6.6pp", gapGood: false, changeUp: false, progress: 75  },
      { cat: "Electrical",     value: "15.2%", change: "−2.9pp", changePeriod: "vs Q3", target: "26.0%", gap: "−10.8pp", gapGood: false, changeUp: false, progress: 58  },
    ]},
  { label: "Inventory Turns",  value: "4.2x",    change: "−0.3x",   changePeriod: "vs Q3",       changeUp: false, color: "#f97316", target: "6.0x",    gap: "−1.8x",    gapGood: false, progress: 70,
    breakdown: [
      { cat: "Fasteners",      value: "7.2x", change: "+0.8x", changePeriod: "vs Q3", target: "6.0x", gap: "+1.2x", gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Safety & PPE",   value: "3.1x", change: "−0.6x", changePeriod: "vs Q3", target: "6.0x", gap: "−2.9x", gapGood: false, changeUp: false, progress: 52  },
      { cat: "PVC & Fittings", value: "4.8x", change: "−0.2x", changePeriod: "vs Q3", target: "6.0x", gap: "−1.2x", gapGood: false, changeUp: false, progress: 80  },
      { cat: "Electrical",     value: "2.6x", change: "−0.7x", changePeriod: "vs Q3", target: "6.0x", gap: "−3.4x", gapGood: false, changeUp: false, progress: 43  },
    ]},
  { label: "Order Fill Rate",  value: "87.0%",   change: "−1.4pp",  changePeriod: "vs Last Qtr", changeUp: false, color: "#3b82f6", target: "95.0%",   gap: "−8.0pp",   gapGood: false, progress: 92,
    breakdown: [
      { cat: "Fasteners",      value: "92%", change: "+0.6pp", changePeriod: "vs Last Qtr", target: "95.0%", gap: "−3pp",  gapGood: false, changeUp: true,  progress: 97 },
      { cat: "Safety & PPE",   value: "88%", change: "−1.2pp", changePeriod: "vs Last Qtr", target: "95.0%", gap: "−7pp",  gapGood: false, changeUp: false, progress: 93 },
      { cat: "PVC & Fittings", value: "86%", change: "−1.8pp", changePeriod: "vs Last Qtr", target: "95.0%", gap: "−9pp",  gapGood: false, changeUp: false, progress: 91 },
      { cat: "Electrical",     value: "79%", change: "−3.4pp", changePeriod: "vs Last Qtr", target: "95.0%", gap: "−16pp", gapGood: false, changeUp: false, progress: 83 },
    ]},
  { label: "Active SKUs",      value: "48,200",  change: "+2,400",  changePeriod: "MTD",         changeUp: false, color: "#ef4444", target: "≤42,000", gap: "+6,200",   gapGood: false, progress: 87,
    breakdown: [
      { cat: "Fasteners",      value: "8,420", change: "+620",   changePeriod: "MTD", target: "≤7,900", gap: "+520",   gapGood: false, changeUp: false, progress: 88 },
      { cat: "Safety & PPE",   value: "4,200", change: "+180",   changePeriod: "MTD", target: "≤4,000", gap: "+200",   gapGood: false, changeUp: false, progress: 95 },
      { cat: "PVC & Fittings", value: "6,310", change: "+840",   changePeriod: "MTD", target: "≤5,500", gap: "+810",   gapGood: false, changeUp: false, progress: 85 },
      { cat: "Electrical",     value: "5,940", change: "+760",   changePeriod: "MTD", target: "≤4,800", gap: "+1,140", gapGood: false, changeUp: false, progress: 80 },
    ]},
  { label: "Working Capital",  value: "68 days", change: "+4.2d",   changePeriod: "QoQ",         changeUp: false, color: "#6366f1", target: "55 days", gap: "+13 days", gapGood: false, progress: 81,
    breakdown: [
      { cat: "Fasteners",      value: "51d",  change: "−1.2d", changePeriod: "QoQ", target: "55 days", gap: "On target", gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Safety & PPE",   value: "118d", change: "+8.4d", changePeriod: "QoQ", target: "55 days", gap: "+63d",      gapGood: false, changeUp: false, progress: 47  },
      { cat: "PVC & Fittings", value: "63d",  change: "+2.1d", changePeriod: "QoQ", target: "55 days", gap: "+8d",       gapGood: false, changeUp: false, progress: 87  },
      { cat: "Electrical",     value: "74d",  change: "+4.8d", changePeriod: "QoQ", target: "55 days", gap: "+19d",      gapGood: false, changeUp: false, progress: 74  },
    ]},
  { label: "Supplier On-Time", value: "81%",     change: "−2.6pp",  changePeriod: "MTD",         changeUp: false, color: "#a855f7", target: "92%",     gap: "−11pp",    gapGood: false, progress: 88,
    breakdown: [
      { cat: "Fasteners",      value: "89%", change: "−1.0pp", changePeriod: "MTD", target: "92%", gap: "−3pp",  gapGood: false, changeUp: false, progress: 97 },
      { cat: "Safety & PPE",   value: "76%", change: "−3.8pp", changePeriod: "MTD", target: "92%", gap: "−16pp", gapGood: false, changeUp: false, progress: 83 },
      { cat: "PVC & Fittings", value: "83%", change: "−1.4pp", changePeriod: "MTD", target: "92%", gap: "−9pp",  gapGood: false, changeUp: false, progress: 90 },
      { cat: "Electrical",     value: "72%", change: "−4.2pp", changePeriod: "MTD", target: "92%", gap: "−20pp", gapGood: false, changeUp: false, progress: 78 },
    ]},
];

const RECENT_TASKS = [
  { name: "Sales Pipeline Presentation", date: "Mar 5, 2026", type: "Presentation", status: "Completed", assignedBy: "You", statusColor: "emerald" },
  { name: "Valuation Model — Series B", date: "Mar 4, 2026", type: "Model", status: "Completed", assignedBy: "You", statusColor: "emerald" },
  { name: "Tariff Impact Simulation", date: "Mar 4, 2026", type: "Simulation", status: "In Progress", assignedBy: "You", statusColor: "amber" },
  { name: "Q1 Board Memo", date: "Mar 3, 2026", type: "Memo", status: "Completed", assignedBy: "You", statusColor: "emerald" },
  { name: "Competitive Landscape Brief", date: "Mar 2, 2026", type: "Presentation", status: "Completed", assignedBy: "You", statusColor: "emerald" },
  { name: "Portfolio Risk Model", date: "Mar 1, 2026", type: "Model", status: "In Review", assignedBy: "You", statusColor: "blue" },
];

const ALERTS = [
  { id: 1, type: "data_quality", priority: "high", category: "Data Quality",
    title: "614 SKUs Missing Enrichment Data — Fasteners & Electrical",
    detail: "614 active SKUs across Fasteners (381) and Electrical (233) are missing one or more required fields: vendor part number, unit of measure, hazmat classification, or product image. Gaps are heaviest in items onboarded via bulk import in Q4 2025. Incomplete records block substitution matching and degrade search relevance for buyers.",
    metric: "614 SKUs affected", impact: "Blocks like-for-like substitution and margin uplift opportunities",
    action: "Run AI enrichment job on Fasteners and Electrical — system will pre-populate vendor part numbers and UOM from supplier catalogues. Estimated 85% auto-fill rate.",
    categories: ["Fasteners", "Electrical"],
    dateGenerated: "Apr 21, 2026 · 7:00 AM", audience: "Category Managers", audienceType: "group", frequency: "Weekly", schedule: "Every Monday, 7:00 AM" },

  { id: 2, type: "customer_behavior", priority: "critical", category: "Customer Risk",
    title: "Order Cancellation Spike — Metro Industrial Supply (Fasteners)",
    detail: "Metro Industrial Supply cancelled 34% of open Fasteners orders in the last 7 days vs. a 4-week average of 6.2%. 48 line items cancelled totalling $84K — concentrated in hex bolts and anchor products. Pattern is consistent with a competitor quote win or an internal spend freeze.",
    metric: "$84K in cancellations (7d)", impact: "Revenue at risk + potential account churn in Fasteners",
    action: "Engage account with sales rep — pull competitive pricing comparison for top 10 cancelled SKUs and prepare a retention offer with volume rebate.",
    categories: ["Fasteners"],
    dateGenerated: "Apr 21, 2026 · 9:14 AM", audience: "Carrie Shen", audienceType: "user", frequency: "Real-time", schedule: "Triggered on cancellation threshold breach (>20% of open orders)" },

  { id: 3, type: "inventory", priority: "high", category: "Inventory Health",
    title: "$2.1M Added to Obsolescence Pool — PVC & Fittings, Electrical",
    detail: "242 SKUs totalling $2.1M were reclassified as obsolete in the Apr 14–20 window. Largest contributors: discontinued PVC fittings ($680K, 94 SKUs) and superseded electrical connectors ($490K, 71 SKUs). Most items have had zero movement for 180+ days. Holding costs are accumulating at ~$12K/week.",
    metric: "$2.1M · 242 SKUs", impact: "Working capital erosion · write-down risk at quarter-end",
    action: "Initiate vendor return workflow for PVC and Electrical lines — FastenRight and ABB both have active return programs. Apply 30% clearance pricing on remaining non-returnable items.",
    categories: ["PVC & Fittings", "Electrical"],
    dateGenerated: "Apr 21, 2026 · 7:00 AM", audience: "Category Managers", audienceType: "group", frequency: "Weekly", schedule: "Every Monday, 7:00 AM" },

  { id: 4, type: "margin", priority: "critical", category: "Margin Risk",
    title: "Gross Margin Drop −9.4pp — Acme Industrial (Safety & PPE)",
    detail: "Acme Industrial's Safety & PPE gross margin fell from 24.1% to 14.7% week-over-week. Root cause: 3 large orders for FR workwear and cut-resistant gloves were processed at below-floor pricing — a sales rep override without manager approval. Revenue grew 18% but margin collapsed. This is the second pricing exception for this account in 30 days.",
    metric: "−9.4pp · from 24.1% → 14.7%", impact: "$47K in margin leakage this week alone",
    action: "Review and rescind pricing overrides with VP Sales. Restate Safety & PPE floor prices for Acme Industrial. Flag account for margin monitoring for next 60 days.",
    categories: ["Safety & PPE"],
    dateGenerated: "Apr 21, 2026 · 6:02 AM", audience: "Carrie Shen", audienceType: "user", frequency: "Real-time", schedule: "Triggered on margin drop > 5pp WoW for any account" },

  { id: 5, type: "stockout", priority: "critical", category: "Stockout Risk",
    title: "Stockout Risk — 3/8\" Stainless Bolt (FAS-0041) · Fasteners",
    detail: "SKU FAS-0041 has 840 units on hand against average daily demand of 400 units. At current velocity, stock depletes in 2.1 days. Supplier lead time is 12 days. No open purchase orders exist for this item. FAS-0041 is a top-10 revenue SKU in Fasteners with 14 active customer accounts depending on it.",
    metric: "2.1 days of supply remaining", impact: "$420K/month revenue at risk · 14 accounts affected",
    action: "Raise emergency PO with FastenRight today (12-day lead time). Alternatively, substitute to FAS-0041-X — same spec, 4pp higher margin, available from secondary supplier with 3-day lead.",
    categories: ["Fasteners"],
    dateGenerated: "Apr 21, 2026 · 11:38 AM", audience: "Carrie Shen", audienceType: "user", frequency: "Real-time", schedule: "Triggered when days-of-supply < 3d" },
];

const METRICS = {
  input: [
    { id: "calls", label: "Inbound Calls", value: "14,230", unit: "/week", trend: 5.2, target: "15,000", icon: "Phone", status: "warning" },
    { id: "leads", label: "New Leads", value: "3,840", unit: "/week", trend: 8.1, target: "4,000", icon: "Users", status: "good" },
    { id: "web_bookings", label: "Online Bookings", value: "1,920", unit: "/week", trend: 12.3, target: "2,500", icon: "Activity", status: "good" },
  ],
  conversion: [
    { id: "call_capture", label: "Call Capture Rate", value: "78%", unit: "", trend: -2.1, target: "85%", icon: "Phone", status: "critical" },
    { id: "lead_conversion", label: "Lead-to-Job Rate", value: "42%", unit: "", trend: 1.3, target: "50%", icon: "Target", status: "warning" },
    { id: "membership_attach", label: "Membership Attach", value: "31%", unit: "", trend: 4.2, target: "40%", icon: "Shield", status: "warning" },
  ],
  productivity: [
    { id: "rev_per_tech", label: "Revenue / Technician", value: "$4,820", unit: "/week", trend: 3.1, target: "$5,500", icon: "DollarSign", status: "warning" },
    { id: "jobs_per_tech", label: "Jobs / Tech / Day", value: "3.8", unit: "", trend: -0.4, target: "4.5", icon: "Wrench", status: "warning" },
    { id: "first_fix", label: "First-Time Fix Rate", value: "84%", unit: "", trend: 1.2, target: "90%", icon: "CheckCircle", status: "good" },
    { id: "utilization", label: "Tech Utilization", value: "72%", unit: "", trend: -1.8, target: "82%", icon: "Clock", status: "critical" },
  ],
  output: [
    { id: "revenue", label: "Weekly Revenue", value: "$23.1M", unit: "", trend: 6.4, target: "$25M", icon: "DollarSign", status: "good" },
    { id: "ebitda_margin", label: "EBITDA Margin", value: "18.2%", unit: "", trend: 0.8, target: "22%", icon: "TrendingUp", status: "warning" },
    { id: "avg_ticket", label: "Avg Ticket Size", value: "$485", unit: "", trend: 2.1, target: "$550", icon: "BarChart3", status: "warning" },
    { id: "nps", label: "Net Promoter Score", value: "62", unit: "", trend: 3, target: "70", icon: "Star", status: "good" },
  ],
};

const COMPARISONS = [
  { brand: "ComfortKing FL", region: "Southeast", tier: "A", revPerTech: "$7,240", callCapture: "92%", membershipRate: "47%", nps: 78, jobs: 5.1 },
  { brand: "AirFlow NE", region: "Northeast", tier: "A", revPerTech: "$6,890", callCapture: "88%", membershipRate: "44%", nps: 74, jobs: 4.8 },
  { brand: "TrueTech DAL", region: "South Central", tier: "B", revPerTech: "$4,920", callCapture: "79%", membershipRate: "33%", nps: 65, jobs: 4.0 },
  { brand: "ProServ ATL", region: "Southeast", tier: "B", revPerTech: "$4,650", callCapture: "76%", membershipRate: "30%", nps: 62, jobs: 3.7 },
  { brand: "HomeFirst CHI", region: "Midwest", tier: "C", revPerTech: "$3,210", callCapture: "68%", membershipRate: "22%", nps: 54, jobs: 3.1 },
  { brand: "PrimePipe OH", region: "Midwest", tier: "C", revPerTech: "$2,890", callCapture: "64%", membershipRate: "19%", nps: 49, jobs: 2.8 },
  { brand: "ElectraPro NC", region: "Mid-Atlantic", tier: "B", revPerTech: "$5,100", callCapture: "81%", membershipRate: "35%", nps: 67, jobs: 4.2 },
  { brand: "AllSeason MN", region: "Upper Midwest", tier: "B", revPerTech: "$4,780", callCapture: "77%", membershipRate: "29%", nps: 60, jobs: 3.9 },
];

const SIMULATIONS = [
  { id: "ai_voice", title: "Deploy AI Voice Agents for After-Hours Calls", description: "Replace voicemail with AI voice agents that can triage, book, and dispatch emergency calls 24/7.", baseline: { callCapture: "78%", afterHoursRevenue: "$4.2M/mo", customerSat: "62 NPS" }, projected: { callCapture: "93%", afterHoursRevenue: "$6.8M/mo", customerSat: "71 NPS" }, investment: "$1.2M", roi: "380%", confidence: 91, timeline: "90 days", variables: [{ name: "AI Answer Rate", min: 80, max: 99, default: 92, unit: "%" }, { name: "Booking Conversion", min: 30, max: 70, default: 55, unit: "%" }, { name: "Rollout Brands", min: 5, max: 42, default: 42, unit: " brands" }] },
  { id: "dispatch_ai", title: "AI-Powered Dynamic Dispatch Optimization", description: "Replace manual dispatch with ML-driven routing that optimizes for drive time, skill match, and revenue potential.", baseline: { utilization: "72%", driveTime: "42 min avg", jobsPerDay: "3.8" }, projected: { utilization: "86%", driveTime: "28 min avg", jobsPerDay: "4.6" }, investment: "$2.8M", roi: "290%", confidence: 87, timeline: "6 months", variables: [{ name: "Drive Time Reduction", min: 10, max: 50, default: 33, unit: "%" }, { name: "Utilization Gain", min: 5, max: 20, default: 14, unit: "pp" }, { name: "Rollout Phases", min: 1, max: 4, default: 3, unit: " phases" }] },
  { id: "playbook_clone", title: "Top-Performer Playbook Replication via AI Coaching", description: "Use AI to analyze top-performing brands and create real-time coaching for technicians on pricing, upsell, and customer engagement.", baseline: { avgTicket: "$485", upsellRate: "18%", bottomTierRev: "$2,250/tech/wk" }, projected: { avgTicket: "$620", upsellRate: "32%", bottomTierRev: "$4,100/tech/wk" }, investment: "$1.5M", roi: "520%", confidence: 83, timeline: "4 months", variables: [{ name: "Ticket Size Lift", min: 10, max: 40, default: 28, unit: "%" }, { name: "Upsell Rate Target", min: 20, max: 45, default: 32, unit: "%" }, { name: "Brands Included", min: 10, max: 42, default: 20, unit: " brands" }] },
  { id: "membership_ai", title: "AI-Driven Membership Growth Engine", description: "Automated post-service nurture sequences with AI-personalized offers, follow-up calls, and renewal management.", baseline: { attachRate: "31%", renewalRate: "68%", membershipARR: "$42M" }, projected: { attachRate: "48%", renewalRate: "82%", membershipARR: "$71M" }, investment: "$900K", roi: "610%", confidence: 86, timeline: "3 months", variables: [{ name: "Attach Rate Target", min: 35, max: 55, default: 48, unit: "%" }, { name: "Renewal Improvement", min: 5, max: 20, default: 14, unit: "pp" }, { name: "Avg Membership Value", min: 150, max: 350, default: 240, unit: " $/yr" }] },
];

const INITIAL_MESSAGES = [
  { role: "assistant", content: "Good morning, Carrie. I've run your overnight analysis across Fasteners, Safety & PPE, PVC & Fittings, and Electrical. Here's what's most urgent:\n\n**1. Critical — Stockout (Fasteners):** FAS-0041 (3/8\" Stainless Bolt) has 2.1 days of supply remaining. No open PO. Emergency order or substitution needed today.\n\n**2. Critical — Margin Leak (Safety & PPE):** Acme Industrial's GM dropped 9.4pp WoW due to a pricing override on FR workwear. $47K lost this week alone.\n\n**3. Opportunity — Substitution (Fasteners):** Switching Grainger Bolt M8 → FastenRight M8-X across your top accounts would add ~14pp margin with no spec change. Estimated $380K/year uplift.\n\nYour blended gross margin is at 22.4% vs a 26% target — substitution and pricing discipline are your two highest-leverage moves right now.\n\nWhat would you like to tackle first?", timestamp: "8:02 AM" },
];

const WIDGET_CATALOGUE = [
  { id: "sku_rationalization", name: "SKU Rationalization", icon: "Layers", category: "Inventory", description: "Surfaces dead stock, slow movers, and duplicate SKUs across your catalogue. Ranks rationalization candidates by working capital impact and helps you eliminate SKUs that erode margin without reducing service levels.", promptPlaceholder: "e.g. Focus on Fasteners and Electrical categories. Flag any SKU with 0 turns in 180 days.", color: "#3b82f6" },
  { id: "substitution_opps", name: "Substitution Opportunities", icon: "TrendingUp", category: "Margin", description: "Identifies like-for-like substitution pairs where a higher-margin private-label or preferred vendor SKU can replace a lower-margin branded item. Quantifies margin lift and monthly volume impact per substitution.", promptPlaceholder: "e.g. Prioritize substitutions in Safety and Fasteners with more than 10pp margin lift.", color: "#10b981" },
  { id: "inventory_turns", name: "Inventory Turns by Category", icon: "BarChart3", category: "Inventory", description: "Tracks inventory turn rates across categories with benchmark comparisons. Identifies which categories are over-stocked or under-performing relative to your 6x annual turn target.", promptPlaceholder: "e.g. Show categories below 3x turns. Include HVAC and Plumbing in my view.", color: "#6366f1" },
  { id: "stockout_risk", name: "Stockout Risk Monitor", icon: "AlertTriangle", category: "Supply Risk", description: "Monitors days-of-supply for high-velocity SKUs and flags items approaching stockout thresholds. Accounts for supplier lead times and triggers emergency purchase order recommendations automatically.", promptPlaceholder: "e.g. Alert me when days-of-supply drops below 5 days for A-class items in my categories.", color: "#ef4444" },
  { id: "supplier_fill_rate", name: "Supplier Fill Rate", icon: "CheckCircle", category: "Supplier", description: "Tracks fill rate performance by supplier over rolling 30-, 60-, and 90-day windows. Surfaces underperforming suppliers and calculates lost revenue and margin from unfilled or back-ordered lines.", promptPlaceholder: "e.g. Focus on my top 20 suppliers by spend. Highlight any below 90% fill rate.", color: "#f97316" },
  { id: "gm_by_sku", name: "GM% by SKU", icon: "DollarSign", category: "Margin", description: "Ranks SKUs by gross margin percentage and absolute dollars. Identifies margin outliers — both high-performing and negative-margin items — and flags pricing anomalies, cost creep, or below-floor overrides.", promptPlaceholder: "e.g. Show bottom 100 SKUs by GM%. Exclude items with fewer than 10 orders in 90 days.", color: "#8b5cf6" },
  { id: "item_master", name: "Item Master Completeness", icon: "Package", category: "Data Quality", description: "Audits SKU enrichment completeness across vendor part numbers, unit of measure, hazmat flags, product images, and category taxonomy. Incomplete records degrade substitution matching and search relevance.", promptPlaceholder: "e.g. Show SKUs missing vendor part number or product image in my categories.", color: "#06b6d4" },
  { id: "sku_velocity", name: "SKU Velocity Tracker", icon: "Activity", category: "Inventory", description: "Classifies SKUs into velocity tiers (A/B/C/D) based on order frequency and demand volume. Highlights velocity changes — newly fast-moving items to stock up, and items slowing toward obsolescence.", promptPlaceholder: "e.g. Show me velocity downgrades from B to C or C to D in the last 30 days.", color: "#ec4899" },
  { id: "price_compliance", name: "Price Compliance Tracker", icon: "Shield", category: "Margin", description: "Monitors sales orders for below-floor pricing and unauthorized rep overrides. Surfaces accounts and reps with frequent pricing exceptions and calculates total margin leakage over the selected period.", promptPlaceholder: "e.g. Show accounts with more than 3 pricing exceptions in the last 30 days.", color: "#14b8a6" },
  { id: "working_capital", name: "Working Capital Summary", icon: "Calculator", category: "Finance", description: "Summarizes working capital health across inventory days on hand, accounts receivable days, and payable terms. Tracks trend against DIO targets and highlights categories contributing to excess inventory.", promptPlaceholder: "e.g. Focus on categories contributing most to excess inventory days vs. last quarter.", color: "#f59e0b" },
];

const AM_EXPERTS = {
  "Data Quality":     { name: "Jennifer Walsh",  title: "Director, Data & Analytics",        avatar: "JW", color: "#3b82f6", location: "Chicago, IL",  phone: "+1 (312) 555-0142", email: "j.walsh@alvarezandmarsal.com",   expertise: ["Item master governance", "Product data enrichment", "ERP data migration", "Supplier catalog normalization"] },
  "Customer Risk":    { name: "Marcus Rivera",   title: "Sr. Director, Revenue Operations",   avatar: "MR", color: "#f97316", location: "Dallas, TX",    phone: "+1 (214) 555-0198", email: "m.rivera@alvarezandmarsal.com",  expertise: ["Customer retention strategy", "Account risk analysis", "Pricing competitiveness", "Churn prediction modeling"] },
  "Inventory Health": { name: "Priya Nair",      title: "Managing Director, Supply Chain",    avatar: "PN", color: "#8b5cf6", location: "Chicago, IL",  phone: "+1 (312) 555-0176", email: "p.nair@alvarezandmarsal.com",    expertise: ["Inventory optimization", "Obsolescence management", "Working capital reduction", "Demand forecasting"] },
  "Margin Risk":      { name: "David Chen",      title: "Director, Pricing & Margin",         avatar: "DC", color: "#f59e0b", location: "Chicago, IL",  phone: "+1 (312) 555-0163", email: "d.chen@alvarezandmarsal.com",    expertise: ["Gross margin improvement", "Pricing analytics", "Cost structure optimization", "Sales override controls"] },
  "Stockout Risk":    { name: "Lauren Park",     title: "Sr. Manager, Procurement Advisory",  avatar: "LP", color: "#ef4444", location: "Chicago, IL",  phone: "+1 (312) 555-0187", email: "l.park@alvarezandmarsal.com",    expertise: ["Stockout prevention", "Emergency procurement", "Supplier lead time management", "Safety stock modeling"] },
};
