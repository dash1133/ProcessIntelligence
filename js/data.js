// ── DATA ──
const COMPANY = {
  name: "NorthStar Frozen Foods",
  type: "Frozen & Prepared Foods Manufacturer",
  tagline: "Farm-to-Freezer at Global Scale",
  regions: 9,                      // NA, UK, Cont. EU, LATAM, ANZ, S. Africa, India, SEA, Greater China
  annualTonnage: "~5.0M tonnes",
  employees: 22000,
  annualRevenue: "$16.0B",
  sgaSpend: "$1.8B",
  sgaIntensity: "11.2%",           // of net sales
  sgaLaborSpend: "~$850M",         // ~47% of SG&A — balanced indirect engine
  sgaNonLaborSpend: "~$940M",      // ~53% of SG&A
  regionalIntensityRange: "5.5%–17.5%",  // SEA best · India worst · 3.2× spread
};

const PROCESS_AREAS = ["Administrative & Executive", "Selling", "Marketing & Media", "Legal & Compliance"];

// SG&A cost-takeout KPIs. NorthStar's $1.8B SG&A is split ~50/50 between
// labor (~$850M) and non-labor (~$940M); KPIs are oriented to bringing the
// balanced indirect engine down to a peer-benchmark target.
const KPI_CARDS = [
  { label: "SG&A % of Net Sales", value: "11.2%", change: "+0.4pp", changePeriod: "vs LY", changeUp: false, color: "#ef4444", target: "9.0%", gap: "+2.2pp", gapGood: false, progress: 80,
    breakdown: [
      { cat: "Administrative & Executive", value: "7.0%", change: "+0.3pp", changePeriod: "vs LY", target: "5.5%", gap: "+1.5pp", gapGood: false, changeUp: false, progress: 79 },
      { cat: "Selling",                     value: "2.4%", change: "+0.0pp", changePeriod: "vs LY", target: "2.0%", gap: "+0.4pp", gapGood: false, changeUp: false, progress: 83 },
      { cat: "Marketing & Media",           value: "1.8%", change: "+0.1pp", changePeriod: "vs LY", target: "1.4%", gap: "+0.4pp", gapGood: false, changeUp: false, progress: 78 },
      { cat: "Legal & Compliance",          value: "0.3%", change: "+0.0pp", changePeriod: "vs LY", target: "0.2%", gap: "+0.1pp", gapGood: false, changeUp: false, progress: 67 },
    ]},
  { label: "Consulting & Outside Services", value: "$150M", change: "+$12M", changePeriod: "YTD", changeUp: false, color: "#f97316", target: "$100M", gap: "+$50M", gapGood: false, progress: 67,
    breakdown: [
      { cat: "Administrative & Executive", value: "$96M", change: "+$8M", changePeriod: "YTD", target: "$60M", gap: "+$36M", gapGood: false, changeUp: false, progress: 63 },
      { cat: "Selling",                     value: "$26M", change: "+$2M", changePeriod: "YTD", target: "$18M", gap: "+$8M",  gapGood: false, changeUp: false, progress: 69 },
      { cat: "Marketing & Media",           value: "$20M", change: "+$1M", changePeriod: "YTD", target: "$14M", gap: "+$6M",  gapGood: false, changeUp: false, progress: 70 },
      { cat: "Legal & Compliance",          value: "$8M",  change: "+$1M", changePeriod: "YTD", target: "$6M",  gap: "+$2M",  gapGood: false, changeUp: false, progress: 75 },
    ]},
  { label: "AI Automation Rate", value: "22%", change: "+4.0pp", changePeriod: "vs LY", changeUp: true, color: "#3b82f6", target: "60%", gap: "−38pp", gapGood: false, progress: 37,
    breakdown: [
      { cat: "Administrative & Executive", value: "18%", change: "+3.0pp", changePeriod: "vs LY", target: "55%", gap: "−37pp", gapGood: false, changeUp: true, progress: 33 },
      { cat: "Selling",                     value: "28%", change: "+5.0pp", changePeriod: "vs LY", target: "65%", gap: "−37pp", gapGood: false, changeUp: true, progress: 43 },
      { cat: "Marketing & Media",           value: "25%", change: "+4.0pp", changePeriod: "vs LY", target: "65%", gap: "−40pp", gapGood: false, changeUp: true, progress: 38 },
      { cat: "Legal & Compliance",          value: "12%", change: "+1.0pp", changePeriod: "vs LY", target: "70%", gap: "−58pp", gapGood: false, changeUp: true, progress: 17 },
    ]},
  { label: "Activity Unit Cost vs Benchmark", value: "1.62x", change: "+0.05x", changePeriod: "vs LY", changeUp: false, color: "#a855f7", target: "1.10x", gap: "+0.52x", gapGood: false, progress: 68,
    breakdown: [
      { cat: "Administrative & Executive", value: "1.55x", change: "+0.04x", changePeriod: "vs LY", target: "1.10x", gap: "+0.45x", gapGood: false, changeUp: false, progress: 71 },
      { cat: "Selling",                     value: "1.30x", change: "+0.02x", changePeriod: "vs LY", target: "1.10x", gap: "+0.20x", gapGood: false, changeUp: false, progress: 85 },
      { cat: "Marketing & Media",           value: "1.45x", change: "+0.06x", changePeriod: "vs LY", target: "1.10x", gap: "+0.35x", gapGood: false, changeUp: false, progress: 76 },
      { cat: "Legal & Compliance",          value: "2.30x", change: "+0.10x", changePeriod: "vs LY", target: "1.20x", gap: "+1.10x", gapGood: false, changeUp: false, progress: 52 },
    ]},
  { label: "Indirect Labor Cost / FTE", value: "$205K", change: "+$6K", changePeriod: "vs LY", changeUp: false, color: "#10b981", target: "$165K", gap: "+$40K", gapGood: false, progress: 80,
    breakdown: [
      { cat: "Administrative & Executive", value: "$185K", change: "+$5K", changePeriod: "vs LY", target: "$145K", gap: "+$40K", gapGood: false, changeUp: false, progress: 78 },
      { cat: "Selling",                     value: "$225K", change: "+$7K", changePeriod: "vs LY", target: "$185K", gap: "+$40K", gapGood: false, changeUp: false, progress: 82 },
      { cat: "Marketing & Media",           value: "$245K", change: "+$8K", changePeriod: "vs LY", target: "$200K", gap: "+$45K", gapGood: false, changeUp: false, progress: 82 },
      { cat: "Legal & Compliance",          value: "$260K", change: "+$5K", changePeriod: "vs LY", target: "$200K", gap: "+$60K", gapGood: false, changeUp: false, progress: 77 },
    ]},
  { label: "Regional SG&A Variance", value: "3.2x", change: "+0.1x", changePeriod: "vs LY", changeUp: false, color: "#6366f1", target: "1.8x", gap: "+1.4x", gapGood: false, progress: 56,
    breakdown: [
      { cat: "Administrative & Executive", value: "3.5x", change: "+0.1x", changePeriod: "vs LY", target: "1.8x", gap: "+1.7x", gapGood: false, changeUp: false, progress: 51 },
      { cat: "Selling",                     value: "2.4x", change: "+0.1x", changePeriod: "vs LY", target: "1.6x", gap: "+0.8x", gapGood: false, changeUp: false, progress: 67 },
      { cat: "Marketing & Media",           value: "2.8x", change: "+0.2x", changePeriod: "vs LY", target: "1.8x", gap: "+1.0x", gapGood: false, changeUp: false, progress: 64 },
      { cat: "Legal & Compliance",          value: "4.1x", change: "+0.2x", changePeriod: "vs LY", target: "2.0x", gap: "+2.1x", gapGood: false, changeUp: false, progress: 49 },
    ]},
];

const RECENT_TASKS = [
  { name: "FY26 SG&A Cost-Takeout Plan",            date: "Apr 30, 2026", type: "Plan",       status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "Legal Function Activity Decomposition",  date: "Apr 28, 2026", type: "Analysis",   status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "Consulting Spend In-Sourcing Plan",      date: "Apr 26, 2026", type: "Initiative", status: "In Progress",assignedBy: "You", statusColor: "amber"   },
  { name: "Regional SG&A Variance Memo",            date: "Apr 24, 2026", type: "Memo",       status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "Marketing Workflow Consolidation Brief", date: "Apr 22, 2026", type: "Review",     status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "AI Agent Pilot — Contract Review",       date: "Apr 20, 2026", type: "Simulation", status: "In Review",  assignedBy: "You", statusColor: "blue"    },
];

const ALERTS = [
  { id: 1, type: "consulting_overrun", priority: "critical", category: "Consulting Spend",
    title: "Outside Consulting Pacing $50M Over Plan",
    detail: "Consulting & Outside Services tracking $150M YTD vs $100M plan. Concentration: Corporate HR ~$24M — roughly the fully-loaded cost of 200 HR FTEs — IT-adjacent ~$25M (InfoSec $7M, SAP/Digital $7M, App Ops $6M), Global Commercial ~$8M, Tax ~$5M, Global Marketing ~$4.5M. Same scopes are largely SOP-driven analyst, advisory, and content work, sitting alongside the ~$850M internal SG&A labor base doing closely related activities. High token-replaceability.",
    metric: "+$50M vs plan", impact: "0.3pp drag on SG&A intensity",
    action: "Stand up an in-house AI agent pool for HR analyst, IT advisory, and Tax research scopes. Cap external POs > $250K pending review. Redeploy freed indirect labor capacity to higher-leverage roles.",
    categories: ["Administrative & Executive"],
    dateGenerated: "May 1 · 7:02 AM", audience: "Marcus Hale", audienceType: "user", frequency: "Real-time", schedule: "On YTD vendor spend > 110% of plan" },

  { id: 2, type: "regional_variance", priority: "critical", category: "Regional Variance",
    title: "India SG&A at 17.5% of Sales — 3.2× SEA Benchmark",
    detail: "India region runs SG&A at 17.5% of net sales vs Southeast Asia at 5.5% — a 3.2× spread that holds even after adjusting for scale, mix, and growth-stage investment. Largest variance lines: Admin & Executive, Legal & Compliance, and Marketing & Media. Activity-and-driver decomposition shows ~$80M of unexplained delta.",
    metric: "17.5% vs 5.5% peer", impact: "~$80M opportunity if India trends to 12.0%",
    action: "Anchor SEA as the internal target operating model. Run activity-level normalization (NDAs/prospect, vendor contracts/supplier, FTE/coordinator workload) and converge India to a 12.0% intensity over 18 months.",
    categories: ["Administrative & Executive", "Legal & Compliance"],
    dateGenerated: "May 1 · 9:14 AM", audience: "Marcus Hale", audienceType: "user", frequency: "Real-time", schedule: "On regional variance > 2.5× target" },

  { id: 3, type: "legal_unit_cost", priority: "high", category: "Legal Unit Cost",
    title: "Cost-per-Contract: NA Legal at 5–6× UK",
    detail: "Legal runs across 16 cost centers in 9 regions: ~$11M non-labor (NA $5.2M, UK $2.1M, France $0.8M, country outposts $10K–$20K) + ~$35–40M labor. The non-labor decomposes by activity into Litigation & Claims ~$2.7M, Compliance/Investigations/Privacy ~$1.8M, Procurement legal ~$1.2M, and — strikingly — Contract Preparation & Review at only ~$0.4M. That last number is the tell: contract review is the highest-volume, most repeatable activity in the function, yet it shows up as one of the smallest non-labor lines because the real cost is sitting in paralegal and counsel labor that has never been priced per driver unit. Apply the driver lens (NDAs/prospect, vendor contracts/supplier base, customer contracts/account, employment agreements/hire) and NA Legal runs 5–6× UK.",
    metric: "$1,840/contract NA · $320 UK", impact: "Reframes Legal from 'labor is what it is' to 'labor is mispriced because we never measured what it does'",
    action: "Pilot AI first-pass NDA and vendor-contract review with 10% paralegal spot-check in NA. Re-base cost-per-contract; reallocate paralegal capacity to higher-judgment work.",
    categories: ["Legal & Compliance"],
    dateGenerated: "May 1 · 7:00 AM", audience: "Legal & Procurement Leads", audienceType: "group", frequency: "Weekly", schedule: "On regional cost-per-contract variance > 3×" },
];

// SG&A activity-and-driver metrics: Decompose → Allocate → Benchmark → Size
const METRICS = {
  input: [
    { id: "cost_centers",    label: "Indirect Cost Centers", value: "1,840", unit: "active",     trend: 0.0, target: "—",       icon: "Grid",     status: "good"     },
    { id: "vendor_pos",      label: "Indirect Vendor POs",   value: "12.6K", unit: "/quarter",   trend: -1.8, target: "10K",     icon: "FileText", status: "warning"  },
    { id: "indirect_fte",    label: "Indirect FTEs",         value: "4,180", unit: "global",     trend: 0.4, target: "3,500",   icon: "Users",    status: "warning"  },
  ],
  conversion: [
    { id: "ai_automation",   label: "AI Automation Rate",          value: "22%", unit: "",  trend: 4.0, target: "60%", icon: "Sparkles",  status: "critical" },
    { id: "ai_replaceable",  label: "AI-Replaceable Spend",         value: "31%", unit: "",  trend: 6.0, target: "55%", icon: "Brain",     status: "warning"  },
    { id: "self_service",    label: "Self-Service Workflow Share",  value: "18%", unit: "",  trend: 3.0, target: "45%", icon: "CheckCircle", status: "critical" },
  ],
  productivity: [
    { id: "labor_cost_fte",  label: "Indirect Labor Cost / FTE",      value: "$205K", unit: "",       trend: 3.0, target: "$165K",   icon: "DollarSign", status: "warning"  },
    { id: "spend_fte",       label: "Indirect Spend / FTE",            value: "$82K",  unit: "",       trend: 1.4, target: "$60K",    icon: "Calculator", status: "warning"  },
    { id: "activities_fte",  label: "Activities Owned / FTE",          value: "11.4",  unit: "",       trend: 0.0, target: "16.0",    icon: "Layers",     status: "warning"  },
    { id: "cycle_time",      label: "Avg Activity Cycle Time",         value: "9.4",   unit: "days",   trend: -0.4,target: "5.0 days",icon: "Clock",       status: "warning"  },
  ],
  output: [
    { id: "net_sales",       label: "Net Sales (TTM)",            value: "$16.0B", unit: "",  trend: 1.2, target: "—",     icon: "DollarSign", status: "good"     },
    { id: "sga_intensity",   label: "SG&A % of Net Sales",        value: "11.2%",  unit: "",  trend: 0.4, target: "9.0%",   icon: "TrendingUp", status: "critical" },
    { id: "consulting",      label: "Consulting & Outside Svcs",  value: "$150M",  unit: "YTD", trend: 8.6, target: "$100M", icon: "BarChart3",  status: "critical" },
    { id: "regional_var",    label: "Regional SG&A Variance",      value: "3.2x",   unit: "",  trend: 3.0, target: "1.8x",   icon: "Star",       status: "warning"  },
  ],
};

// Per-region SG&A benchmarking (Tier A = at/below target, B = within band, C = significant variance)
const COMPARISONS = [
  { brand: "Southeast Asia", region: "APAC",          tier: "A", revPerTech: "$1.45B", callCapture: "5.5%",  membershipRate: "32% AI", nps: 78, jobs: 1.0 },
  { brand: "Greater China",  region: "APAC",          tier: "A", revPerTech: "$2.10B", callCapture: "7.8%",  membershipRate: "28% AI", nps: 71, jobs: 1.4 },
  { brand: "ANZ",            region: "Oceania",       tier: "B", revPerTech: "$0.95B", callCapture: "9.4%",  membershipRate: "24% AI", nps: 66, jobs: 1.7 },
  { brand: "United Kingdom", region: "EMEA",          tier: "B", revPerTech: "$2.30B", callCapture: "10.2%", membershipRate: "26% AI", nps: 64, jobs: 1.9 },
  { brand: "North America",  region: "Americas",      tier: "B", revPerTech: "$5.40B", callCapture: "11.8%", membershipRate: "23% AI", nps: 60, jobs: 2.1 },
  { brand: "Continental EU", region: "EMEA",          tier: "B", revPerTech: "$2.05B", callCapture: "12.4%", membershipRate: "21% AI", nps: 58, jobs: 2.3 },
  { brand: "South Africa",   region: "EMEA",          tier: "C", revPerTech: "$0.45B", callCapture: "13.6%", membershipRate: "16% AI", nps: 54, jobs: 2.5 },
  { brand: "Latin America",  region: "Americas",      tier: "C", revPerTech: "$0.85B", callCapture: "14.2%", membershipRate: "14% AI", nps: 52, jobs: 2.6 },
  { brand: "India",          region: "APAC",          tier: "C", revPerTech: "$0.45B", callCapture: "17.5%", membershipRate: "11% AI", nps: 49, jobs: 3.2 },
];

const SIMULATIONS = [
  { id: "consulting_insourcing", title: "AI Agent In-Sourcing of Consulting Spend",          description: "Stand up an in-house AI agent pool to absorb the SOP-driven analyst, advisory, and content scopes inside HR ($24M), IT-adjacent ($25M), Tax ($5M), and Marketing ($4.5M) consulting lines.",                                                                                       baseline: { consultingSpend: "$150M", aiAutomation: "22%", indirectFte: "4,180" },          projected: { consultingSpend: "$95M",  aiAutomation: "55%", indirectFte: "3,820" },          investment: "$8.0M", roi: "590%", confidence: 88, timeline: "9 months", variables: [{ name: "Scopes In-Sourced",      min: 20, max: 80, default: 55, unit: "%" }, { name: "Internal AI Adoption", min: 30, max: 90, default: 65, unit: "%" }, { name: "Functions In-Scope", min: 2, max: 8, default: 5, unit: " functions" }] },
  { id: "regional_convergence",  title: "Regional SG&A Convergence to SEA Benchmark",       description: "Anchor Southeast Asia (5.5% SG&A intensity) as the internal target operating model. Run activity-level normalization and converge India, LATAM, and South Africa to a 12.0% intensity over 18 months.",                                                                                          baseline: { sgaIntensity: "11.2%", regionalVariance: "3.2x", indiaIntensity: "17.5%" },     projected: { sgaIntensity: "9.4%",  regionalVariance: "1.9x", indiaIntensity: "12.0%" },     investment: "$6.5M", roi: "440%", confidence: 84, timeline: "18 months", variables: [{ name: "Regions In-Scope",       min: 1, max: 9, default: 4, unit: " regions" }, { name: "Convergence Speed",   min: 50, max: 100, default: 80, unit: "%" }, { name: "Functions In-Scope", min: 2, max: 8, default: 6, unit: " functions" }] },
  { id: "legal_ai_review",       title: "AI First-Pass Contract Review (Legal)",            description: "Pilot AI first-pass NDA, vendor, and customer contract review with a 10% paralegal spot-check. Re-base cost-per-contract and reallocate paralegal capacity to higher-judgment work.",                                                                                                            baseline: { costPerContract: "$980", contractsAnnual: "48K", paralegalFte: "180" },        projected: { costPerContract: "$280", contractsAnnual: "48K", paralegalFte: "120" },        investment: "$1.2M", roi: "520%", confidence: 86, timeline: "5 months", variables: [{ name: "AI Share of First Pass", min: 40, max: 95, default: 80, unit: "%" }, { name: "Human Spot-Check", min: 5, max: 25, default: 10, unit: "%" }, { name: "Regions Rolled Out", min: 1, max: 9, default: 5, unit: " regions" }] },
  { id: "marketing_consolidation", title: "Marketing Workflow Consolidation",                description: "Collapse 40+ regional marketing cost centers onto shared brand-management templates. Free brand-manager time from competitive scans, brief drafting, and post-campaign synthesis with AI agents.",                                                                                                  baseline: { mediaSpend: "$295M", duplicatedCenters: "42", brandMgrAiShare: "8%" },          projected: { mediaSpend: "$245M", duplicatedCenters: "12", brandMgrAiShare: "55%" },          investment: "$2.4M", roi: "470%", confidence: 82, timeline: "6 months", variables: [{ name: "Cost Centers Consolidated", min: 10, max: 40, default: 30, unit: "" }, { name: "AI Adoption (Brand Mgmt)", min: 30, max: 80, default: 55, unit: "%" }, { name: "Regions In-Scope", min: 2, max: 9, default: 7, unit: " regions" }] },
];

const INITIAL_MESSAGES = [
  { role: "assistant", content: "Good morning, Marcus. Overnight pass on the SG&A cost-takeout program is in. The headline holds: $1.8B SG&A is a balanced 50/50 indirect engine — ~$850M labor and ~$940M non-labor — so every meaningful cost line has a paired activity-and-driver story on both sides. Three things rose to the top:\n\n**1. Critical — Consulting Pacing $50M Over Plan:** Consulting & Outside Services at $150M YTD vs $100M plan. Concentration: Corporate HR ~$24M (≈ the fully-loaded cost of 200 HR FTEs), IT-adjacent ~$25M (InfoSec $7M, SAP/Digital $7M, App Ops $6M), Global Commercial ~$8M, Tax ~$5M, Global Marketing ~$4.5M — almost entirely SOP-driven analyst and advisory work. The single most token-replaceable spend pool in the company.\n\n**2. Critical — India SG&A at 17.5% of Sales:** Worst region runs 3.2× the SEA benchmark (5.5%). Activity-level normalization shows ~$80M of unexplained delta — anchor SEA as the internal target operating model and converge India to ~12% over 18 months.\n\n**3. High — Legal Cost-per-Contract: NA at 5–6× UK:** Legal sits across 16 cost centers in 9 regions. Contract Preparation & Review is the highest-volume activity in the function but shows up as only ~$0.4M of non-labor — the cost is hidden inside paralegal and counsel labor that has never been priced per driver unit. First-pass review is AI-replaceable in ~30 seconds.\n\nSG&A intensity sits at **11.2% vs a 9.0% target**. The named initiatives — consulting in-sourcing, regional convergence, marketing workflow consolidation, and Legal AI review — already size to **~$210M run-rate**, and the long tail across the rest of the $1.8B SG&A base is meaningful.\n\nWhich thread do you want to pull first?", timestamp: "8:02 AM" },
];

const WIDGET_CATALOGUE = [
  { id: "consulting_concentration", name: "Consulting Spend Concentration", icon: "DollarSign", category: "Administrative & Executive", description: "Decomposes the $150M Consulting & Outside Services pool by function and scope. Surfaces concentration in HR, IT-adjacent, and Tax — and ranks which scopes are most token-replaceable by an in-house AI agent pool.", promptPlaceholder: "e.g. Show top 20 consulting POs by function with a token-replaceability score.", color: "#3b82f6" },
  { id: "sga_intensity", name: "SG&A Intensity by Region", icon: "BarChart3", category: "Cross-Region", description: "Tracks SG&A as a % of net sales across the nine regions. Flags variance vs the SEA benchmark and quantifies the size of the convergence opportunity by region and function.", promptPlaceholder: "e.g. Where is the largest unexplained variance vs SEA, by function?", color: "#10b981" },
  { id: "vendor_spend", name: "Indirect Vendor Spend Analysis", icon: "Grid", category: "Cross-Function", description: "Cleansed and enriched indirect vendor spend across cost centers. Maps vendors to functions, sub-functions, and activities; flags duplicates, off-contract spend, and AI-replaceable scopes.", promptPlaceholder: "e.g. Surface the top 50 indirect vendors with overlapping scopes across cost centers.", color: "#6366f1" },
  { id: "legal_unit_cost", name: "Legal Cost-per-Contract", icon: "FileText", category: "Legal & Compliance", description: "Normalizes Legal cost across NDAs, vendor contracts, customer contracts, and employment agreements using the natural driver per type. Surfaces the NA vs UK premium and the AI first-pass review opportunity.", promptPlaceholder: "e.g. Show cost-per-contract by region and contract type for the last 4 quarters.", color: "#ef4444" },
  { id: "marketing_duplication", name: "Marketing Workflow Duplication", icon: "Layers", category: "Marketing & Media", description: "Finds duplicated brand-management and media-planning workflows across 40+ regional marketing cost centers. Quantifies the consolidation opportunity and the AI-agent share of brand-manager time on competitive scans, briefs, and post-campaign synthesis.", promptPlaceholder: "e.g. Where are the same workflows running in multiple regional cost centers?", color: "#f97316" },
  { id: "activity_unit_cost", name: "Activity Unit Cost vs Benchmark", icon: "Calculator", category: "Cross-Function", description: "Computes unit cost per activity-driver pair (e.g., NDAs/prospect, customer contracts/account, briefs/campaign) and benchmarks each cell against the best-performing region.", promptPlaceholder: "e.g. Show the 10 activity-driver pairs with the largest variance to best-in-class.", color: "#8b5cf6" },
  { id: "labor_redeployment", name: "Indirect Labor Redeployment", icon: "Users", category: "Cross-Function", description: "Identifies analyst, paralegal, and coordinator capacity freed by AI-agent deployment. Sizes the redeployment opportunity and recommends higher-leverage roles for affected FTEs.", promptPlaceholder: "e.g. Estimate analyst FTE freed if AI takes first-pass NDA review across NA and EMEA.", color: "#06b6d4" },
  { id: "ai_agent_readiness", name: "AI Agent Readiness", icon: "Sparkles", category: "Cross-Function", description: "Scores each activity by AI-agent readiness based on data availability, SOP maturity, and risk profile. Pipelines the activities ready for production deployment vs. those needing enrichment.", promptPlaceholder: "e.g. Which activities are deployment-ready and which need DRL enrichment first?", color: "#ec4899" },
  { id: "regional_benchmark", name: "Regional Benchmark Map", icon: "MapPin", category: "Cross-Region", description: "Visualizes the 9-region spread by function and activity. Anchors SEA as the internal target operating model and shows the convergence path for each lagging region.", promptPlaceholder: "e.g. Show the convergence path from India 17.5% to a 12.0% SG&A intensity.", color: "#14b8a6" },
  { id: "media_stack", name: "Marketing Media Stack", icon: "Activity", category: "Marketing & Media", description: "Decomposes the $295M marketing stack across digital advertising, television, agency fees, promotions, and merchandising — and pairs the non-labor stack with the brand-management labor layer that shapes it.", promptPlaceholder: "e.g. Pair each non-labor media line with the labor pool shaping it.", color: "#f59e0b" },
];

const AM_EXPERTS = {
  "Consulting Spend":   { name: "David Chen",    title: "Director, Cost Transformation",  avatar: "DC", color: "#f59e0b", location: "Chicago, IL",   phone: "+1 (312) 555-0163", email: "d.chen@alvarezandmarsal.com",   expertise: ["Outside-services rationalization", "AI agent in-sourcing", "Function-level make-vs-buy", "Indirect labor redeployment"] },
  "Regional Variance":  { name: "Priya Nair",    title: "Managing Director, Operations",  avatar: "PN", color: "#8b5cf6", location: "Chicago, IL",   phone: "+1 (312) 555-0176", email: "p.nair@alvarezandmarsal.com",   expertise: ["Cross-regional benchmarking", "Target operating model design", "Activity-and-driver decomposition", "SG&A convergence playbooks"] },
  "Legal Unit Cost":    { name: "Jennifer Walsh", title: "Director, Legal Operations",     avatar: "JW", color: "#3b82f6", location: "New York, NY",  phone: "+1 (212) 555-0142", email: "j.walsh@alvarezandmarsal.com",  expertise: ["Contract lifecycle automation", "Legal labor pricing per driver", "AI first-pass review", "Paralegal capacity reallocation"] },
  "Marketing Spend":    { name: "Marcus Rivera",  title: "Sr. Director, Marketing Ops",   avatar: "MR", color: "#f97316", location: "Dallas, TX",    phone: "+1 (214) 555-0198", email: "m.rivera@alvarezandmarsal.com", expertise: ["Brand workflow consolidation", "Agency-fee rationalization", "AI-assisted brand management", "Trade marketing efficiency"] },
  "Process Risk":       { name: "Lauren Park",   title: "Sr. Manager, Process Excellence", avatar: "LP", color: "#ef4444", location: "Chicago, IL",   phone: "+1 (312) 555-0187", email: "l.park@alvarezandmarsal.com",   expertise: ["Process redesign", "Activity-driver mapping", "Anomaly & red-flag spend detection", "Repeatable cost reporting"] },
};
