// ── DATA ──
const COMPANY = { name: "Mereon Assessment Group", type: "Education Testing Services", tagline: "Harnessing AI to Advance Measurement, Power Progress", products: 8, regions: 24, employees: 4200, annualRevenue: "$980M", revenueTrend: "−6.4% YoY" };

const PROCESS_AREAS = ["Item Development", "Test Delivery", "Scoring Operations", "Score Reporting"];

// Cost-efficacy KPIs vs targets. Revenue is dropping (−6.4% YoY) so cost lines must come down in step.
const KPI_CARDS = [
  { label: "Cost per Test Delivered", value: "$42.30", change: "+$2.10", changePeriod: "vs Q3", changeUp: false, color: "#ef4444", target: "$34.00", gap: "+$8.30", gapGood: false, progress: 80,
    breakdown: [
      { cat: "Item Development",   value: "$8.40",  change: "+$0.40", changePeriod: "vs Q3", target: "$6.50",  gap: "+$1.90", gapGood: false, changeUp: false, progress: 77 },
      { cat: "Test Delivery",      value: "$18.60", change: "+$1.20", changePeriod: "vs Q3", target: "$14.50", gap: "+$4.10", gapGood: false, changeUp: false, progress: 78 },
      { cat: "Scoring Operations", value: "$11.20", change: "+$0.30", changePeriod: "vs Q3", target: "$8.50",  gap: "+$2.70", gapGood: false, changeUp: false, progress: 76 },
      { cat: "Score Reporting",    value: "$4.10",  change: "+$0.20", changePeriod: "vs Q3", target: "$4.50",  gap: "−$0.40", gapGood: true,  changeUp: false, progress: 100 },
    ]},
  { label: "Cost-to-Revenue Ratio", value: "68.4%", change: "+4.1pp", changePeriod: "vs Q3", changeUp: false, color: "#f97316", target: "58.0%", gap: "+10.4pp", gapGood: false, progress: 85,
    breakdown: [
      { cat: "Item Development",   value: "12.8%", change: "+0.8pp", changePeriod: "vs Q3", target: "10.0%", gap: "+2.8pp", gapGood: false, changeUp: false, progress: 78 },
      { cat: "Test Delivery",      value: "26.2%", change: "+2.4pp", changePeriod: "vs Q3", target: "22.0%", gap: "+4.2pp", gapGood: false, changeUp: false, progress: 84 },
      { cat: "Scoring Operations", value: "19.6%", change: "+1.0pp", changePeriod: "vs Q3", target: "16.0%", gap: "+3.6pp", gapGood: false, changeUp: false, progress: 82 },
      { cat: "Score Reporting",    value: "9.8%",  change: "−0.1pp", changePeriod: "vs Q3", target: "10.0%", gap: "On target", gapGood: true, changeUp: true, progress: 100 },
    ]},
  { label: "AI Automation Rate", value: "34%", change: "+3.0pp", changePeriod: "vs Q3", changeUp: true, color: "#3b82f6", target: "65%", gap: "−31pp", gapGood: false, progress: 52,
    breakdown: [
      { cat: "Item Development",   value: "28%", change: "+5.0pp", changePeriod: "vs Q3", target: "60%", gap: "−32pp", gapGood: false, changeUp: true,  progress: 47 },
      { cat: "Test Delivery",      value: "41%", change: "+2.0pp", changePeriod: "vs Q3", target: "70%", gap: "−29pp", gapGood: false, changeUp: true,  progress: 59 },
      { cat: "Scoring Operations", value: "46%", change: "+4.0pp", changePeriod: "vs Q3", target: "75%", gap: "−29pp", gapGood: false, changeUp: true,  progress: 61 },
      { cat: "Score Reporting",    value: "21%", change: "+1.0pp", changePeriod: "vs Q3", target: "55%", gap: "−34pp", gapGood: false, changeUp: true,  progress: 38 },
    ]},
  { label: "Item Development Cost / Item", value: "$4,250", change: "+$180", changePeriod: "MTD", changeUp: false, color: "#a855f7", target: "$2,800", gap: "+$1,450", gapGood: false, progress: 66,
    breakdown: [
      { cat: "Item Development",   value: "$4,250", change: "+$180", changePeriod: "MTD", target: "$2,800", gap: "+$1,450", gapGood: false, changeUp: false, progress: 66 },
      { cat: "Test Delivery",      value: "—",     change: "—",     changePeriod: "—",   target: "—",     gap: "n/a",     gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Scoring Operations", value: "—",     change: "—",     changePeriod: "—",   target: "—",     gap: "n/a",     gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Score Reporting",    value: "—",     change: "—",     changePeriod: "—",   target: "—",     gap: "n/a",     gapGood: true,  changeUp: true,  progress: 100 },
    ]},
  { label: "Scoring Cost per Response", value: "$1.85", change: "−$0.05", changePeriod: "vs Q3", changeUp: true, color: "#10b981", target: "$1.10", gap: "+$0.75", gapGood: false, progress: 59,
    breakdown: [
      { cat: "Item Development",   value: "—",     change: "—",      changePeriod: "—",   target: "—",     gap: "n/a",     gapGood: true,  changeUp: true,  progress: 100 },
      { cat: "Test Delivery",      value: "$0.42", change: "−$0.02", changePeriod: "vs Q3", target: "$0.30", gap: "+$0.12", gapGood: false, changeUp: true,  progress: 71 },
      { cat: "Scoring Operations", value: "$1.85", change: "−$0.05", changePeriod: "vs Q3", target: "$1.10", gap: "+$0.75", gapGood: false, changeUp: true,  progress: 59 },
      { cat: "Score Reporting",    value: "—",     change: "—",      changePeriod: "—",   target: "—",     gap: "n/a",     gapGood: true,  changeUp: true,  progress: 100 },
    ]},
  { label: "Vendor & Infra Spend", value: "$142M", change: "+$11M", changePeriod: "YTD", changeUp: false, color: "#6366f1", target: "$115M", gap: "+$27M", gapGood: false, progress: 81,
    breakdown: [
      { cat: "Item Development",   value: "$22M", change: "+$1M",  changePeriod: "YTD", target: "$18M", gap: "+$4M",  gapGood: false, changeUp: false, progress: 82 },
      { cat: "Test Delivery",      value: "$74M", change: "+$7M",  changePeriod: "YTD", target: "$58M", gap: "+$16M", gapGood: false, changeUp: false, progress: 78 },
      { cat: "Scoring Operations", value: "$31M", change: "+$2M",  changePeriod: "YTD", target: "$26M", gap: "+$5M",  gapGood: false, changeUp: false, progress: 84 },
      { cat: "Score Reporting",    value: "$15M", change: "+$1M",  changePeriod: "YTD", target: "$13M", gap: "+$2M",  gapGood: false, changeUp: false, progress: 87 },
    ]},
];

const RECENT_TASKS = [
  { name: "FY26 Cost-to-Revenue Plan",            date: "Apr 28, 2026", type: "Plan",       status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "AI Scoring Pilot — ROI Memo",          date: "Apr 26, 2026", type: "Memo",       status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "Test Delivery Vendor Consolidation",   date: "Apr 25, 2026", type: "Initiative", status: "In Progress",assignedBy: "You", statusColor: "amber"   },
  { name: "Item Bank Rationalization — TOEFL-eq", date: "Apr 23, 2026", type: "Analysis",   status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "Score Reporting Infra Cost Review",    date: "Apr 22, 2026", type: "Review",     status: "Completed",  assignedBy: "You", statusColor: "emerald" },
  { name: "AI-Assisted Item Generation Sim",      date: "Apr 20, 2026", type: "Simulation", status: "In Review",  assignedBy: "You", statusColor: "blue"    },
];

const ALERTS = [
  { id: 1, type: "item_quality", priority: "high", category: "Item Bank Quality",
    title: "Item Attrition Outpacing Replenishment — Linguara Reading & Listening",
    detail: "Across Linguara Reading & Listening, 1,840 items were retired in the last 90 days against 612 net-new validated items added — a 3:1 attrition gap. Item exposure rates on remaining live forms have crossed the 0.18 risk threshold for 4 of 6 forms. Without replenishment, two forms must be pulled from the May–July test window, which would trigger emergency form rebuild and external psychometric review.",
    metric: "1,228 net-item shortfall", impact: "Form retirement risk · ~$1.4M emergency rebuild exposure",
    action: "Activate AI-assisted item generation for Reading & Listening — pilot data shows 62% of AI drafts pass psychometric review on first attempt vs. 71% for human-only at 4× the cost. Estimated $2,800 → $1,150 unit cost.",
    categories: ["Item Development"],
    dateGenerated: "Apr 28, 2026 · 7:00 AM", audience: "Item Development Leads", audienceType: "group", frequency: "Weekly", schedule: "Every Monday, 7:00 AM" },

  { id: 2, type: "customer_risk", priority: "critical", category: "Customer Risk",
    title: "B2B Renewal at Risk — Northstar University System (GradPath)",
    detail: "Northstar University System (47 campuses, 8.2% of GradPath B2B revenue) flagged the upcoming renewal as at-risk in their Q1 review. Stated reasons: per-test pricing 14% above peer benchmark and slow score-release SLA (4.2 days vs. competitor 2.5 days). Procurement has requested a re-bid by May 30 with a 3-vendor shortlist. Internal scoring shows 38% retention probability at current terms.",
    metric: "$8.4M ACV at risk", impact: "Account churn + signal effect on 6 similar accounts in re-bid cycle",
    action: "Convene retention squad — bring per-test cost down via AI scoring mix (70% AI, 30% human review) for an effective $1.85 → $1.20 per response and a 2.0-day SLA. Counter-bid by May 22.",
    categories: ["Test Delivery", "Scoring Operations"],
    dateGenerated: "Apr 28, 2026 · 9:14 AM", audience: "Daniel Reyes", audienceType: "user", frequency: "Real-time", schedule: "Triggered on flagged renewals > $5M ACV" },

  { id: 3, type: "process_health", priority: "high", category: "Process Health",
    title: "Scoring SLA Breach Risk — 4.2-Day Backlog in Constructed-Response Queue",
    detail: "Human-rater scoring queue for constructed-response items reached a 4.2-day backlog (SLA: 2.0 days) on Apr 26. Root cause: a 22% drop in active rater pool over the past quarter combined with a 14% volume spike from corporate-window test cycles. Current trajectory breaches contractual SLA for 6 enterprise accounts within 9 days.",
    metric: "4.2 days vs 2.0-day SLA", impact: "$320K in SLA penalties · NPS hit on 6 enterprise accounts",
    action: "Route 60% of straightforward CR responses through AI scoring with human spot-check at 5% sample. This clears the backlog inside 5 days and cuts the structural cost per response by ~$0.65 going forward.",
    categories: ["Scoring Operations"],
    dateGenerated: "Apr 28, 2026 · 7:00 AM", audience: "Scoring Ops Leads", audienceType: "group", frequency: "Weekly", schedule: "Every Monday, 7:00 AM" },

  { id: 4, type: "cost_overrun", priority: "critical", category: "Cost Overrun",
    title: "Test Delivery Vendor Cost Spike — +18% MoM (ProctorOne)",
    detail: "ProctorOne (live online proctoring vendor, 64% of online delivery volume) issued a 14% rate increase effective May 1 plus a new $0.42/test infrastructure surcharge — net effect ~+18% MoM at current volumes. Contract auto-renews June 30 unless renegotiated. Two competing vendors have presented bids 9–12% below current ProctorOne pricing on equivalent SLAs.",
    metric: "+18% MoM · ~$2.1M annualized", impact: "Direct hit to Cost-to-Revenue ratio (+0.6pp) at a time when revenue is already −6.4% YoY",
    action: "Trigger competitive RFP — issue invitations to ExamGuard and SecureProctor by May 5. Parallel-track an internal AI-proctoring proof of concept that could absorb 25–30% of volume in 9 months at ~40% lower unit cost.",
    categories: ["Test Delivery"],
    dateGenerated: "Apr 28, 2026 · 6:02 AM", audience: "Daniel Reyes", audienceType: "user", frequency: "Real-time", schedule: "Triggered on vendor rate movement > 5% MoM" },

  { id: 5, type: "capacity_risk", priority: "critical", category: "Capacity Risk",
    title: "Test Center Capacity Shortfall — APAC Region · Linguara Peak Window",
    detail: "Across the APAC test center network, 14 of 38 centers are running above 92% seat utilization for the May 12–26 Linguara peak window. Demand forecast exceeds confirmed seat capacity by 3,840 sessions. Lead time to add brick-and-mortar capacity is 60+ days; over-flow to home-based delivery is constrained by current proctoring license caps.",
    metric: "3,840 sessions short · ~$1.2M revenue at risk", impact: "Test-taker rebooking · brand impact in 4 priority markets",
    action: "Approve emergency uplift of online-proctored capacity (ProctorOne or contingency vendor) for APAC peak — estimated incremental cost $480K, recovers $1.2M in revenue and protects May–July window.",
    categories: ["Test Delivery"],
    dateGenerated: "Apr 28, 2026 · 11:38 AM", audience: "Daniel Reyes", audienceType: "user", frequency: "Real-time", schedule: "Triggered when forecast utilization > 90% for any center" },
];

// Process-lens metrics: Develop → Deliver → Score → Report
const METRICS = {
  input: [
    { id: "items_in_dev",    label: "Items in Development", value: "8,420",  unit: "active",   trend: -3.2, target: "12,000", icon: "Layers",   status: "warning"  },
    { id: "tests_scheduled", label: "Tests Scheduled",      value: "1.42M",  unit: "/quarter", trend: -6.4, target: "1.55M",  icon: "Activity", status: "warning"  },
    { id: "registrations",   label: "Candidate Registrations", value: "486K", unit: "/quarter", trend: -7.1, target: "540K",  icon: "Users",    status: "critical" },
  ],
  conversion: [
    { id: "ai_pass_rate",      label: "AI-Drafted Item Pass Rate", value: "62%", unit: "",  trend: 4.1, target: "75%", icon: "Sparkles",   status: "warning" },
    { id: "completion_rate",   label: "Test Completion Rate",      value: "94%", unit: "",  trend: 0.4, target: "96%", icon: "CheckCircle", status: "good" },
    { id: "ai_scoring_share",  label: "AI Scoring Share",          value: "34%", unit: "",  trend: 3.0, target: "65%", icon: "Brain",       status: "critical" },
  ],
  productivity: [
    { id: "items_per_author",  label: "Validated Items / Author / Mo", value: "4.8",     unit: "",      trend: 0.3, target: "8.0",    icon: "Layers",      status: "warning"  },
    { id: "scoring_throughput",label: "Responses / Rater / Day",        value: "118",     unit: "",      trend: -4.2, target: "180",    icon: "Activity",    status: "critical" },
    { id: "cycle_time",        label: "Item → Live Cycle Time",         value: "94",      unit: "days",  trend: -1.8, target: "60 days", icon: "Clock",       status: "warning"  },
    { id: "score_release_sla", label: "Score Release SLA",              value: "4.2",     unit: "days",  trend: 0.8, target: "2.0 days", icon: "Clock",       status: "critical" },
  ],
  output: [
    { id: "revenue",       label: "Quarterly Revenue",     value: "$238M", unit: "",  trend: -6.4, target: "$262M",  icon: "DollarSign", status: "critical" },
    { id: "cost_to_rev",   label: "Cost-to-Revenue",       value: "68.4%", unit: "",  trend: 4.1, target: "58%",     icon: "TrendingUp", status: "critical" },
    { id: "cost_per_test", label: "Cost per Test Delivered", value: "$42.30", unit: "", trend: 5.2, target: "$34.00", icon: "BarChart3",  status: "critical" },
    { id: "nps",           label: "Test-Taker NPS",        value: "58",    unit: "",  trend: -2,  target: "70",      icon: "Star",       status: "warning" },
  ],
};

// Per-product cost-efficacy comparison (analog of brand benchmarking)
const COMPARISONS = [
  { brand: "Linguara — Reading & Listening", region: "Global",      tier: "A", revPerTech: "$28.40", callCapture: "94%", membershipRate: "71% AI", nps: 64, jobs: 8.2 },
  { brand: "Linguara — Speaking & Writing",  region: "Global",      tier: "B", revPerTech: "$48.10", callCapture: "92%", membershipRate: "38% AI", nps: 61, jobs: 4.6 },
  { brand: "GradPath",                       region: "Global",      tier: "A", revPerTech: "$36.20", callCapture: "91%", membershipRate: "58% AI", nps: 66, jobs: 6.8 },
  { brand: "EduCert — Educator Licensing",   region: "North Am.",   tier: "B", revPerTech: "$44.90", callCapture: "88%", membershipRate: "29% AI", nps: 60, jobs: 3.9 },
  { brand: "WorkLingua — Corporate",         region: "EMEA / APAC", tier: "B", revPerTech: "$31.80", callCapture: "89%", membershipRate: "47% AI", nps: 63, jobs: 5.4 },
  { brand: "Mereon Skills Index",            region: "Global",      tier: "C", revPerTech: "$58.40", callCapture: "82%", membershipRate: "18% AI", nps: 51, jobs: 2.6 },
  { brand: "QuantitativeReason",             region: "North Am.",   tier: "B", revPerTech: "$33.10", callCapture: "90%", membershipRate: "44% AI", nps: 64, jobs: 5.1 },
  { brand: "Mereon AcademicEnglish",         region: "APAC",        tier: "C", revPerTech: "$52.70", callCapture: "84%", membershipRate: "22% AI", nps: 55, jobs: 3.0 },
];

const SIMULATIONS = [
  { id: "ai_item_gen",     title: "AI-Assisted Item Generation at Scale",                 description: "Move Item Development from human-only authoring to a human-in-the-loop AI generation workflow with psychometric review automation.",                  baseline: { itemUnitCost: "$4,250", itemsPerAuthor: "4.8/mo", cycleTime: "94 days" },     projected: { itemUnitCost: "$1,150", itemsPerAuthor: "14.2/mo", cycleTime: "38 days" },   investment: "$3.4M", roi: "420%", confidence: 88, timeline: "6 months", variables: [{ name: "AI Draft Pass Rate",     min: 40, max: 85, default: 62, unit: "%" }, { name: "Author Adoption", min: 20, max: 100, default: 70, unit: "%" }, { name: "Product Lines Included", min: 1, max: 8, default: 5, unit: " lines" }] },
  { id: "ai_scoring_mix",  title: "AI + Human Constructed-Response Scoring Mix",         description: "Shift constructed-response scoring to a 70% AI / 30% human-review mix with drift monitoring and fairness checks.",                                  baseline: { costPerResponse: "$1.85", scoreSLA: "4.2 days", agreement: "0.94" },         projected: { costPerResponse: "$1.20", scoreSLA: "2.0 days", agreement: "0.93" },         investment: "$2.1M", roi: "510%", confidence: 86, timeline: "4 months", variables: [{ name: "AI Share of Volume",      min: 30, max: 90, default: 70, unit: "%" }, { name: "Human Review Sample", min: 1, max: 25, default: 5, unit: "%" }, { name: "Product Lines Included", min: 1, max: 8, default: 6, unit: " lines" }] },
  { id: "vendor_consol",   title: "Test Delivery Vendor Consolidation",                  description: "Replace single-vendor proctoring (ProctorOne) with a 2-vendor split + internal AI proctoring lane absorbing 25–30% of volume.",                       baseline: { vendorRate: "$11.20/test", utilization: "78%", spendYTD: "$74M" },         projected: { vendorRate: "$8.40/test", utilization: "86%", spendYTD: "$54M" },         investment: "$1.8M", roi: "340%", confidence: 84, timeline: "9 months", variables: [{ name: "Internal AI Proctor Volume", min: 0, max: 50, default: 28, unit: "%" }, { name: "Vendor Rate Reduction", min: 5, max: 20, default: 12, unit: "%" }, { name: "Regions In-Scope", min: 1, max: 5, default: 4, unit: " regions" }] },
  { id: "score_report_ai", title: "AI-Personalized Score Reporting & Insights",          description: "Replace static score reports with AI-narrated, candidate-personalized insight reports that lower support-ticket volume and lift B2B perceived value.", baseline: { reportingCost: "$4.10/test", supportTickets: "8.4K/qtr", b2bRetention: "84%" }, projected: { reportingCost: "$2.80/test", supportTickets: "3.1K/qtr", b2bRetention: "91%" }, investment: "$900K", roi: "380%", confidence: 81, timeline: "5 months", variables: [{ name: "AI Narrative Adoption",   min: 20, max: 100, default: 75, unit: "%" }, { name: "Ticket Deflection",   min: 30, max: 80, default: 60, unit: "%" }, { name: "Product Lines Included", min: 1, max: 8, default: 4, unit: " lines" }] },
];

const INITIAL_MESSAGES = [
  { role: "assistant", content: "Good morning, Daniel. I've run the overnight cost-efficacy review across Item Development, Test Delivery, Scoring Operations, and Score Reporting. With revenue at −6.4% YoY, the cost line has to come down in step. Here's what's most urgent:\n\n**1. Critical — Cost Overrun (Test Delivery):** ProctorOne notified a +18% MoM rate hike effective May 1. Net annualized impact ~$2.1M and a +0.6pp drag on Cost-to-Revenue. Two competing vendors are 9–12% below current pricing — RFP window is short.\n\n**2. Critical — Customer Risk (GradPath):** Northstar University System ($8.4M ACV, 47 campuses) flagged renewal at-risk citing per-test pricing and 4.2-day score-release SLA. Counter-bid window closes May 22.\n\n**3. Opportunity — AI Scoring Mix (Scoring Operations):** Shifting constructed-response scoring to a 70% AI / 30% human-review mix clears the current 4.2-day backlog and structurally drops cost per response from $1.85 → $1.20. Annualized savings ~$6.8M.\n\nCost-to-Revenue is at **68.4% vs 58% target** (+10.4pp gap). Vendor consolidation in Test Delivery and AI scoring adoption in Scoring Operations are the two highest-leverage moves right now.\n\nWhat would you like to tackle first?", timestamp: "8:02 AM" },
];

const WIDGET_CATALOGUE = [
  { id: "ai_scoring_adoption", name: "AI Scoring Adoption", icon: "Sparkles", category: "Scoring Operations", description: "Tracks AI scoring penetration across product lines and item types. Quantifies cost-per-response delta vs. human-only scoring and flags forms where AI scoring is ready for production rollout based on calibration and drift metrics.", promptPlaceholder: "e.g. Show me AI scoring readiness for Linguara and GradPath constructed-response items.", color: "#3b82f6" },
  { id: "item_bank_coverage", name: "Item Bank Coverage", icon: "Layers", category: "Item Development", description: "Surfaces item attrition, exposure rates, and replenishment gaps across product lines. Ranks forms at risk of retirement and quantifies emergency rebuild exposure if replenishment trails attrition.", promptPlaceholder: "e.g. Flag forms with exposure > 0.18 and net-item shortfall in the next 90 days.", color: "#10b981" },
  { id: "vendor_spend", name: "Vendor Spend Concentration", icon: "BarChart3", category: "Test Delivery", description: "Tracks third-party vendor spend by category (proctoring, scoring, infra) with concentration risk and rate-trend signals. Highlights consolidation opportunities and renegotiation windows ahead of contract auto-renewals.", promptPlaceholder: "e.g. Show top 10 vendors by YTD spend with > 5% rate movement.", color: "#6366f1" },
  { id: "scoring_sla_tracker", name: "Scoring SLA Tracker", icon: "AlertTriangle", category: "Scoring Operations", description: "Monitors human-rater queue depth, throughput, and SLA breach risk per product line. Recommends AI offload thresholds and quantifies penalty exposure when contractual score-release SLAs are at risk.", promptPlaceholder: "e.g. Alert me when CR queue exceeds 3 days for any enterprise account.", color: "#ef4444" },
  { id: "test_center_utilization", name: "Test Center Utilization", icon: "Activity", category: "Test Delivery", description: "Tracks brick-and-mortar and online proctoring utilization by region and peak window. Flags capacity shortfalls and over-build, and recommends online overflow targets.", promptPlaceholder: "e.g. Focus on APAC centers in May–July peak window. Highlight any > 90% forecast utilization.", color: "#f97316" },
  { id: "cost_per_test", name: "Cost per Test Delivered", icon: "DollarSign", category: "Cost Efficacy", description: "Decomposes total cost per delivered test across Item Development, Test Delivery, Scoring, and Reporting. Tracks variance to target and identifies the process areas dragging the blended cost line.", promptPlaceholder: "e.g. Show me cost-per-test variance to target for the last 6 quarters by process area.", color: "#8b5cf6" },
  { id: "process_cycle_time", name: "Process Cycle Time", icon: "Clock", category: "Process Health", description: "Measures end-to-end cycle time from item authoring → form publish → test delivery → score release. Surfaces bottleneck stages and quantifies AI-assisted compression opportunities.", promptPlaceholder: "e.g. Where is cycle time longest in the Linguara pipeline this quarter?", color: "#06b6d4" },
  { id: "renewal_risk", name: "B2B Renewal Risk", icon: "Users", category: "Customer Risk", description: "Scores institutional and corporate accounts on renewal probability using price-vs-benchmark, SLA performance, and engagement signals. Surfaces accounts in re-bid cycles and quantifies ACV at risk.", promptPlaceholder: "e.g. Show all accounts > $5M ACV with renewal probability < 60%.", color: "#ec4899" },
  { id: "ai_quality_drift", name: "AI Quality & Drift Monitor", icon: "Shield", category: "Scoring Operations", description: "Monitors agreement rates between AI scoring and human raters across item types and demographic strata. Flags drift, fairness deltas, and recalibration triggers before they affect score validity.", promptPlaceholder: "e.g. Alert me when AI–human agreement drops below 0.92 for any item type.", color: "#14b8a6" },
  { id: "infra_cost_per_test", name: "Infra Cost per Test", icon: "Calculator", category: "Score Reporting", description: "Summarizes cloud, scoring-engine, and reporting-pipeline infrastructure spend per delivered test. Tracks trend against unit-cost targets and flags categories where infra is scaling faster than volume.", promptPlaceholder: "e.g. Focus on score reporting infra costs scaling above test volume YoY.", color: "#f59e0b" },
];

const AM_EXPERTS = {
  "Item Bank Quality": { name: "Jennifer Walsh", title: "Director, Assessment Science",       avatar: "JW", color: "#3b82f6", location: "Princeton, NJ", phone: "+1 (609) 555-0142", email: "j.walsh@alvarezandmarsal.com", expertise: ["Item bank governance", "AI-assisted item generation", "Psychometric review workflows", "Form assembly & exposure control"] },
  "Customer Risk":     { name: "Marcus Rivera",  title: "Sr. Director, B2B Education",        avatar: "MR", color: "#f97316", location: "Dallas, TX",    phone: "+1 (214) 555-0198", email: "m.rivera@alvarezandmarsal.com", expertise: ["Institutional renewal strategy", "B2B pricing benchmarking", "SLA-driven retention plays", "Re-bid response playbooks"] },
  "Process Health":    { name: "Priya Nair",     title: "Managing Director, Operations",       avatar: "PN", color: "#8b5cf6", location: "Chicago, IL",  phone: "+1 (312) 555-0176", email: "p.nair@alvarezandmarsal.com",  expertise: ["Process cycle-time reduction", "Scoring queue optimization", "Human-AI workflow design", "SLA recovery"] },
  "Cost Overrun":      { name: "David Chen",     title: "Director, Cost Transformation",       avatar: "DC", color: "#f59e0b", location: "Chicago, IL",  phone: "+1 (312) 555-0163", email: "d.chen@alvarezandmarsal.com",   expertise: ["Vendor consolidation", "Cost-to-revenue alignment", "Infrastructure cost optimization", "Make-vs-buy analysis"] },
  "Capacity Risk":     { name: "Lauren Park",    title: "Sr. Manager, Delivery Operations",    avatar: "LP", color: "#ef4444", location: "Chicago, IL",  phone: "+1 (312) 555-0187", email: "l.park@alvarezandmarsal.com",   expertise: ["Test center capacity planning", "Online proctoring scale-up", "Peak window risk modeling", "Multi-vendor delivery design"] },
};
