// ── DIAGNOSTIC VIEW ──
// Cost Optimization workspace under the Diagnostic tab.
//
// Each task is tagged with one of three application interfaces:
//   - chat          → conversational interface (may inline artifacts)
//   - list-builder  → chat + tabular grid with tabs (data enrichment / curation)
//   - artifact      → focused report or document
//
// Add new tasks by extending DIAGNOSTIC_TASK_GROUPS. Add rich preview
// content by extending TASK_PREVIEWS keyed by task id.

const DIAGNOSTIC_APP_TYPES = {
  "chat":         { label: "Chat",         badge: "bg-blue-50 text-blue-700 border-blue-100",       icon: "MessageSquare" },
  "list-builder": { label: "List Builder", badge: "bg-purple-50 text-purple-700 border-purple-100", icon: "Grid" },
  "artifact":     { label: "Artifact",     badge: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: "FileText" },
  "dashboard":    { label: "Dashboard",    badge: "bg-rose-50 text-rose-700 border-rose-100",       icon: "Grid" },
};

// Methodology lifecycle: Data → Taxonomy → Cost Allocation →
// Opportunities → Initiatives → Reporting.
const DIAGNOSTIC_TASK_GROUPS = [
  { name: "Data Foundation", tasks: [
    { id: "file_manager",   label: "File Manager",                   appType: "artifact",     icon: "Package",  badge: "2", description: "Ingest TB, GL, vendor, census, and operating data files." },
    { id: "data_cleansing", label: "AI Data Cleansing & Enrichment", appType: "chat",         icon: "Sparkles",            description: "Conversational AI cleansing, normalization, and enrichment of ingested data." },
    { id: "ontology",       label: "Ontology",                        appType: "list-builder", icon: "Layers",              description: "Entity and attribute taxonomy used across the engagement." },
    { id: "drl_management", label: "DRL Management",                  appType: "list-builder", icon: "Grid",                description: "Data Reference Library — curated lists used in mappings and validations." },
  ]},
  { name: "Process & Activity Taxonomy", tasks: [
    { id: "process_mapping",  label: "Process Mapping",            appType: "artifact", icon: "Layers",   description: "End-to-end value chain — visually shape the map in natural language." },
    { id: "activity_mapping", label: "Activity & Driver Mapping",  appType: "dashboard", icon: "Activity", description: "Bottom-up discovery of activities and drivers from real records — vendor lines, HRIS, SOPs." },
  ]},
  { name: "Cost Allocation", tasks: [
    { id: "cost_classification",       label: "Cost Classification",         appType: "dashboard", icon: "Calculator",  description: "Every line item classified Non-discretionary / Discretionary / Strategic — AI-suggested with consultant sign-off + reason." },
    { id: "cost_driver",                label: "Cost Driver Analysis",        appType: "artifact",  icon: "Activity",    description: "Pick a driver. See how one unit ripples through every function — cost shadow + region comparison." },
    { id: "opportunity_prioritization", label: "Opportunity Prioritization",  appType: "artifact",  icon: "Target",      description: "Distil 200+ activities into a shortlist of 5–10 priority zones using cost · variance · discretionary share · owner type." },
  ]},
  { name: "Levers Identification", tasks: [
    { id: "redesign_opps",   label: "AI-VSM", appType: "artifact", icon: "Target",        description: "Curated opportunities across redesign, automation, and AI." },
    { id: "margin_leakage",  label: "Margin Leakage Detection",            appType: "chat",     icon: "AlertTriangle", description: "AI-surfaced leakage from estimating, pricing, rework, scoping." },
    { id: "anomaly_redflag", label: "Anomaly & Red-Flag Spend",            appType: "chat",     icon: "Shield",         description: "Anomalies and red-flag spend identified with A&M experts." },
  ]},
  { name: "PMO & Initiative Sizing", tasks: [
    { id: "initiative_sizing", label: "Initiative Sizing & Business Case", appType: "artifact",     icon: "Calculator", description: "Quantified savings tied to productivity, cycle time, margin, scalability." },
    { id: "pmo_tracker",       label: "AI PMO Tracker",                     appType: "list-builder", icon: "Grid",        description: "Initiative pipeline with status, owner, savings, and progress." },
  ]},
  { name: "Cost Transparency & Reporting", tasks: [
    { id: "cost_reporting", label: "Repeatable Cost Reporting", appType: "artifact", icon: "BarChart3",     description: "Repeatable reporting templates and dashboards." },
    { id: "project_chat",   label: "Project Chat",               appType: "chat",     icon: "MessageSquare", description: "Free-form project conversation across all artifacts." },
  ]},
];

// ── PREVIEW CONTENT ──
// Rich double-click previews for marquee tasks. Other tasks fall back to a
// generic mockup of their app type.
const TASK_PREVIEWS = {
  vendor_spend: {
    chat: [
      { role: "user",      text: "update rows 11-25 in the dataset based on the grid data" },
      { role: "assistant", text: "Before I proceed, I want to flag a limitation with the dataset write tool — it only supports **append** (adds new rows) or **full replace** (overwrites all rows). It does not support updating specific rows in place." },
      { role: "assistant", text: "**Options**\n\n• Append 15 rows — creates 15 duplicate rows in the dataset.\n• Full replace — clean, but overwrites any enrichment not yet reflected in the grid (rows 161–223 are null in the grid).\n• Wait — cleanest. Do one full replace at the end after all rows are enriched." },
      { role: "assistant", text: "**My recommendation:** Since rows 161–223 are still unenriched in the grid, doing a full replace now would overwrite enrichment already in the dataset. The safest approach is to **wait** until all rows are enriched, then do a single clean full replace." },
    ],
    grid: {
      title: "Indirect SG&A Vendor Enrichment",
      tabs: [
        { name: "Master",                                count: 412, active: true },
        { name: "HR — Outside Advisory",                 count: 24 },
        { name: "IT — Outside Services",                  count: 18 },
        { name: "Legal — Outside Counsel",                count: 16 },
        { name: "Marketing — Agency Fees",                count: 12 },
        { name: "Column Mapping",                         count: 14 },
      ],
      columns: ["row_number", "supplier_region", "supplier_number", "supplier_name", "cost_center_code", "cost_center_desc", "functional_area"],
      rows: [
        [1, "North America", "2017552", "Greenfield Advisory",     "14001", "CORP HR ADVISORY",     "SG&A · HR"        ],
        [2, "North America", "2020565", "Pinnacle Counsel LLP",    "14012", "NA LEGAL",              "SG&A · Legal"     ],
        [3, "North America", "2022479", "Brightlane Media",         "14207", "GLOBAL MARKETING",      "SG&A · Marketing" ],
        [4, "EMEA",          "2019199", "Stratus Cloud Services",   "14108", "IT — APP OPERATIONS",   "SG&A · IT"        ],
        [5, "North America", "2019229", "Meridian Tax Partners",    "14304", "TAX ADVISORY",          "SG&A · Tax"       ],
        [6, "North America", "2019514", "Coastline Office Services","14411", "ADMIN & FACILITIES",    "SG&A · Admin"     ],
      ],
    }
  },
  data_cleansing: {
    conversations: [
      { name: "NA Legal — GL Code Analysis", active: true },
      { name: "Cost Elements by Sub-Function" },
      { name: "Consulting Spend by Function" },
      { name: "Vendor Spend Scatter — Indirect" },
      { name: "Marketing Stack Decomposition" },
      { name: "Regional SG&A Variance Pull" },
      { name: "HR Outside Services — May" },
      { name: "Conversation 1196" },
    ],
    chat: [
      { role: "assistant",
        artifact: {
          title: "NA Legal — GL Code Analysis",
          intro: "Here is the activity decomposition of **Cost Center 14012 — North America Legal**, mapping the ~$5.2M non-labor pool to activity and driver:",
          sections: [
            { heading: "Function Overview",
              body: "NA Legal is one of 16 Legal cost centers globally. Non-labor decomposes cleanly by activity. The headline finding is that **Contract Preparation & Review**, the highest-volume activity in the function, shows up as one of the smallest non-labor lines — meaning the real cost is sitting in paralegal and counsel labor that has never been priced per driver unit." },
            { bullets: [
              "**Litigation & Claims** (~$2.7M): outside counsel for active disputes, settlements, and pre-litigation diligence.",
              "**Compliance / Investigations / Privacy** (~$1.8M): regulatory monitoring, internal investigations, privacy reviews — heavy outside-counsel and SOP-driven advisory.",
              "**Procurement Legal Work** (~$1.2M): vendor master-agreement support, sourcing-event legal, supplier dispute escalation.",
              "**Contract Preparation & Review** (~$0.4M): strikingly small non-labor — first-pass NDAs, vendor contracts, customer contracts handled almost entirely by paralegal labor.",
            ]},
            { heading: "Summary Table — Non-Labor by Activity", table: {
              cols: ["Activity", "Driver", "Non-Labor Spend"],
              rows: [
                ["Litigation & Claims",                   "Active matters",          "~$2,700,000"],
                ["Compliance / Investigations / Privacy", "Audits + investigations", "~$1,800,000"],
                ["Procurement Legal Work",                 "Sourcing events",         "~$1,200,000"],
                ["Contract Preparation & Review",          "NDAs + contracts",        "~$400,000"],
              ]
            }},
          ]
        }
      }
    ]
  },
  process_mapping: {
    artifact: {
      type: "process_map",
      title: "NorthStar Frozen Foods — End-to-End Value Chain",
      subtitle: "Operations chevrons · activity tiles annotated with cost intensity and decision rights · SG&A band runs underneath",
      source: "Source: client TB + interviews, FY25–26",
      decisionRights: [
        { id: "function", label: "Function-led",       letter: "F", description: "Global SOP — function owns the playbook (e.g., Legal, IT, Finance)" },
        { id: "bu",       label: "BU-led",             letter: "B", description: "P&L owner makes the call (e.g., Potato BU, Appetizers BU)" },
        { id: "country",  label: "Country/Region-led", letter: "C", description: "Local market or plant decides (e.g., regulatory, site ops)" },
      ],
      sgaBand: [
        { name: "Sales",     icon: "TrendingUp", costIntensity: "$$",  subFns: ["Key acct development", "Prospect & pipeline", "Trade promo & deals",  "Order management",   "After-sales & service"] },
        { name: "Marketing", icon: "Sparkles",   costIntensity: "$$",  subFns: ["Sourcing PR",          "Brand R&D",           "Brand specs",          "Trade promo",        "Demand gen"] },
        { name: "Legal",     icon: "FileText",   costIntensity: "$",   subFns: ["Procurement legal",    "Plant compliance",    "IP / trademark",       "Regulatory",         "Customer contracts"] },
        { name: "Finance",   icon: "Calculator", costIntensity: "$$",  subFns: ["Cost accounting",      "Plant P&L",           "Pack costing",         "Inv. accounting",    "Customer billing"] },
        { name: "HR",        icon: "Users",      costIntensity: "$$",  subFns: ["Field workforce",      "Plant labor",         "Pack labor",           "DC labor",           "Logistics labor"] },
        { name: "IT",        icon: "Activity",   costIntensity: "$$$", subFns: ["Agronomy systems",     "MES / SCADA",         "Pack systems",         "WMS",                "TMS / ERP"] },
      ],
      steps: [
        { name: "Agronomy & Sourcing",   color: "#3b82f6", activities: [
          { name: "Crop Forecasting",         cost: "$$",  decision: "country" },
          { name: "Grower Network Mgmt.",      cost: "$$",  decision: "country" },
          { name: "Procurement Contracts",     cost: "$$$", decision: "function" },
          { name: "Inbound QA",                cost: "$",   decision: "country" },
        ]},
        { name: "Raw Intake & Processing", color: "#2563eb", activities: [
          { name: "Cutting & Blanching",       cost: "$$",  decision: "bu" },
          { name: "Frying",                    cost: "$$$", decision: "bu" },
          { name: "Freezing Lines",            cost: "$$$", decision: "bu" },
          { name: "Plant Ops & QC",            cost: "$$",  decision: "country" },
        ]},
        { name: "Packaging",              color: "#1d4ed8", activities: [
          { name: "Pack Engineering",          cost: "$",   decision: "function" },
          { name: "Materials Procurement",     cost: "$$$", decision: "function" },
          { name: "Brand Specs & Artwork",     cost: "$",   decision: "bu" },
          { name: "Labeling & Compliance",     cost: "$",   decision: "country" },
        ]},
        { name: "Cold-Chain Warehousing", color: "#1e40af", activities: [
          { name: "Inventory Management",      cost: "$$",  decision: "function" },
          { name: "Cold Storage Ops",          cost: "$$$", decision: "country" },
          { name: "Distribution Planning",     cost: "$$",  decision: "function" },
          { name: "Compliance & Audits",       cost: "$",   decision: "country" },
        ]},
        { name: "Outbound Logistics",      color: "#1e3a8a", activities: [
          { name: "Carrier Management",        cost: "$$$", decision: "function" },
          { name: "Route Optimization",        cost: "$",   decision: "function" },
          { name: "Customer Delivery",         cost: "$$",  decision: "country" },
          { name: "Returns & Reverse Logist.", cost: "$",   decision: "country" },
        ]},
      ],
      chatLog: [
        { role: "assistant", style: "neutral",  text: "This is the **end-to-end value chain**. Five operational stages run left to right; every activity tile shows two things — t-shirt cost intensity (**$ / $$ / $$$**) and the decision-rights badge (**F**unction · **B**U · **C**ountry). The **SG&A engine runs underneath**, with one bar per support function spanning every stage." },
        { role: "assistant", style: "finding",  text: "**Six $$$ activities carry the bulk of operational spend** — Procurement Contracts, Frying, Freezing Lines, Materials Procurement, Cold Storage Ops, and Carrier Management — together ~80% of fully-loaded operating cost." },
        { role: "assistant", style: "variance", text: "Of those six, **four sit at F (function-led)** — fast to standardize. **Cold Storage Ops and Customer Delivery** sit at **C (country-led)** — energy tariffs and last-mile economics need a regional playbook. **Frying and Freezing** are **B (BU-led)** — process choices owned by the Potato and Appetizers BUs." },
        { role: "assistant", style: "question", text: "The SG&A bars expose **where each support function touches the chain**. The cleanest cost-takeout wedges sit where F-led activities meet **Legal** (Procurement Contracts, Customer Contracts) and **IT/Finance** (Inventory Management, Distribution Planning). Want to pivot to Activity & Driver Mapping for a per-function decomposition?" },
      ],
      suggestions: [
        { label: "Highlight the F-led $$$ activities" },
        { label: "Where do the SG&A bars carry the most cost?" },
        { label: "Open Legal in Activity & Driver Mapping" },
      ]
    }
  },
  activity_mapping: {
    chat: [
      { role: "assistant", style: "neutral",  text: "**What activities exist?** Discovered **218 activities across 11 functions** — bottom-up from **~12,400 vendor lines**, **4,180 HRIS records**, and **355 SOPs**. No pre-baked taxonomy; the activity list is what the data actually shows." },
      { role: "assistant", style: "finding",  text: "**Who does them?** **4,180 indirect FTEs** globally. By function: Selling **1,080** · Marketing **820** · IT **620** · HR **510** · Finance **460** · Legal **312**. The Spend Highlights card on the right breaks each function into sub-functions." },
      { role: "assistant", style: "variance", text: "**What drives them?** **9 driver families** inferred from real records — NDAs by prospect, vendor contracts by supplier base, customer contracts by active accounts, employment agreements by hires, headcount, journal entries, applications, briefs, accounts. Driver coverage is strong on Legal, Finance, IT, HR — **Marketing has 14 activities flagged amber** with drivers inferred from media-buy patterns." },
      { role: "assistant", style: "question", text: "**How much do they cost?** **$1.8B SG&A total**, split ~50/50: ~$850M labor / ~$940M non-labor. Three pools: A&E **$1.12B** · Selling **$380M** · Marketing **$295M**. **Largest variance:** India A&E runs **3.1× SEA** on cost-per-employee — the convergence wedge worth opening first." },
    ],
    suggestions: [
      { label: "Open Legal — biggest variance" },
      { label: "Compare A&E across regions" },
      { label: "Show low-confidence drivers" },
    ],
    artifact: {
      type: "dashboard",
      title: "Activity & Driver Mapping — Bottom-up Discovery",
      subtitle: "Activities and drivers generated from real records (vendor lines, HRIS, SOPs) — never imposed from a pre-baked taxonomy",
      source: "Source: vendor master + HRIS + GL · last refreshed 4 min ago",
      // Top tabs: 5 value chain stages + SG&A. SG&A is the default view.
      tabs: [
        { id: "agronomy",   label: "Agronomy",   color: "#3b82f6" },
        { id: "processing", label: "Processing", color: "#2563eb" },
        { id: "packaging",  label: "Packaging",  color: "#1d4ed8" },
        { id: "coldchain",  label: "Cold-Chain", color: "#1e40af" },
        { id: "outbound",   label: "Outbound",   color: "#1e3a8a" },
        { id: "sga",        label: "SG&A",       color: "#6366f1", default: true },
      ],
      sga: { functions: [
        { id: "legal", name: "Legal", lastRefreshed: "4 min ago", confidence: "high",
          totalSpendNum: 46.2,
          railSummary: "$46.2M · 312 FTE · 14 activities",
          ingested: "1,247 vendor lines · 312 HRIS records · 84 SOPs · 16 cost centers",
          stats: [
            { label: "Total spend",          value: "$46.2M", sub: "labor $35.1M · non-labor $11.1M" },
            { label: "FTE equivalent",       value: "312",     sub: "across 9 regions" },
            { label: "Activities found",     value: "14",      sub: "3 flagged low confidence" },
            { label: "Drivers inferred",     value: "9",       sub: "prospects, vendors, SKUs…" },
            { label: "Regional cost variance", value: "5.2x",  sub: "NA vs UK, per contract" },
          ],
          synthesis: "78% of activity volume is contract-related. Contract review sits in labor, not non-labor — the driver lens reveals where the cost actually lives.",
          highlights: {
            headerSubtitle: "Contracts dominate Legal spend, accounting for the majority of activity volume",
            cards: [
              { name: "Contracts",         spend: "$15.9M", driver: "# of Contracts",  color: "#1d4ed8" },
              { name: "Disputes",          spend: "$7.9M",  driver: "Open Matters",     color: "#f97316" },
              { name: "Compliance",        spend: "$5.6M",  driver: "Headcount",         color: "#8b5cf6" },
              { name: "Procurement Legal", spend: "$3.5M",  driver: "RFPs",              color: "#10b981" },
              { name: "IP / Trademark",    spend: "$2.0M",  driver: "SKU Count",          color: "#3b82f6" },
              { name: "All Other Sub-fns", spend: "$11.3M", driver: "Corp / HR / Misc",  color: "#94a3b8" },
            ],
            keyTakeaways: [
              "**Contracts** represent the dominant cost driver at **$15.9M** — nearly 2× the next largest sub-function (Disputes at $7.9M).",
              "AI first-pass NDA + vendor-contract review reduces the Contracts pool by an estimated **~$2.5M annualized**.",
              "**NA cost-per-contract runs 5–6× UK** on a normalized basis — regional convergence opportunity worth ~$5M.",
            ]
          },
          combined: {
            footer: "7 of 14 activities shown · click any row to see vendors and roles that rolled up · *low-confidence driver, see chat",
            activities: [
              { name: "Vendor contract review",        subFn: "Contracts",   labor: "$8.4M", nonLabor: "$0.2M", driver: "Vendors",        volume: "3,120",  unitCost: "$2,756",  conf: "High" },
              { name: "Customer contract review",      subFn: "Contracts",   labor: "$6.1M", nonLabor: "$0.1M", driver: "Active accts",   volume: "1,840",  unitCost: "$3,370",  conf: "High" },
              { name: "NDA execution",                  subFn: "Contracts",   labor: "$1.4M", nonLabor: "$0.0M", driver: "Prospects",      volume: "412",    unitCost: "$3,398",  conf: "High" },
              { name: "Litigation & claims",            subFn: "Disputes",    labor: "$5.2M", nonLabor: "$2.7M", driver: "Open matters",   volume: "87",     unitCost: "$90,805", conf: "High" },
              { name: "Compliance & investigations",    subFn: "Compliance",  labor: "$3.8M", nonLabor: "$1.8M", driver: "Headcount",      volume: "22,000", unitCost: "$254",    conf: "High" },
              { name: "Trademark renewals",             subFn: "IP",          labor: "$0.9M", nonLabor: "$1.1M", driver: "SKU count",     volume: "2,400",  unitCost: "$833",    conf: "Low",  lowConf: true },
              { name: "Procurement legal support",     subFn: "Procurement", labor: "$2.3M", nonLabor: "$1.2M", driver: "RFPs",            volume: "186",    unitCost: "$18,817", conf: "Med" },
            ],
          },
          vendor: {
            footer: "6 of 84 vendors shown · the Cost Center, GL Code, and Cost Element are the enrichment fields AI uses to classify each vendor into an activity",
            rows: [
              { number: "2018821", name: "Pinnacle Counsel LLP",        costCenter: "14012 — NA Legal · Litigation", glCode: "626100", costElement: "Outside Counsel",       spend: "$5.2M", activity: "Litigation & claims",      conf: "High" },
              { number: "2018824", name: "Bridgewater Legal Partners",  costCenter: "14048 — UK Legal · Disputes",   glCode: "626100", costElement: "Outside Counsel",       spend: "$2.1M", activity: "Litigation & claims",      conf: "High" },
              { number: "2018830", name: "Apex Trademark Services",     costCenter: "14080 — Global Legal · IP",     glCode: "626120", costElement: "IP Services",            spend: "$1.1M", activity: "Trademark renewals",       conf: "Med"  },
              { number: "2018841", name: "ContractFlow SaaS",           costCenter: "14012 — NA Legal · Contracts",  glCode: "626300", costElement: "Software Licenses",      spend: "$0.4M", activity: "Vendor contract review",   conf: "High" },
              { number: "2018852", name: "RegulaWatch Compliance",      costCenter: "14025 — NA Legal · Compliance", glCode: "626140", costElement: "Compliance Advisory",    spend: "$0.8M", activity: "Compliance & investigations", conf: "High" },
              { number: "2018863", name: "Sourcewell Procurement Legal",costCenter: "14012 — NA Legal · Procurement",glCode: "626100", costElement: "Outside Counsel",       spend: "$0.6M", activity: "Procurement legal support", conf: "High" },
            ],
          },
          fte: {
            footer: "6 of 312 HRIS records shown · Cost Center + Job Family are the enrichment fields AI uses to estimate the primary activity for each role",
            rows: [
              { id: "EMP-04812", role: "Senior Counsel",     jobFamily: "Legal · Counsel",    costCenter: "14012 — NA Legal · Contracts",  region: "NA",     fte: "1.0", loaded: "$410K", primaryActivity: "Vendor contract review",      conf: "High" },
              { id: "EMP-04901", role: "Paralegal II",        jobFamily: "Legal · Paralegal",  costCenter: "14012 — NA Legal · Contracts",  region: "NA",     fte: "1.0", loaded: "$145K", primaryActivity: "Vendor contract review",      conf: "High" },
              { id: "EMP-05122", role: "Senior Counsel",     jobFamily: "Legal · Counsel",    costCenter: "14048 — UK Legal · Contracts",  region: "UK",     fte: "1.0", loaded: "$295K", primaryActivity: "Customer contract review",    conf: "High" },
              { id: "EMP-05308", role: "Compliance Manager", jobFamily: "Legal · Compliance", costCenter: "14025 — NA Legal · Compliance", region: "NA",     fte: "1.0", loaded: "$215K", primaryActivity: "Compliance & investigations", conf: "High" },
              { id: "EMP-05412", role: "IP Specialist",       jobFamily: "Legal · IP",         costCenter: "14080 — Global Legal · IP",     region: "Global", fte: "0.5", loaded: "$185K", primaryActivity: "Trademark renewals",          conf: "Med"  },
              { id: "EMP-05521", role: "Procurement Counsel",jobFamily: "Legal · Counsel",    costCenter: "14012 — NA Legal · Procurement",region: "NA",     fte: "1.0", loaded: "$235K", primaryActivity: "Procurement legal support",   conf: "High" },
            ],
          },
        },

        { id: "marketing", name: "Marketing & Media", lastRefreshed: "12 min ago", confidence: "med",
          totalSpendNum: 295,
          railSummary: "$295M · 820 FTE · 42 activities",
          ingested: "2,840 vendor lines · 820 HRIS records · 32 SOPs · 47 cost centers",
          stats: [
            { label: "Total spend",          value: "$295M", sub: "labor $145M · non-labor $150M" },
            { label: "FTE equivalent",       value: "820",   sub: "across 9 regions" },
            { label: "Activities found",     value: "42",    sub: "14 flagged low confidence" },
            { label: "Drivers inferred",     value: "8",     sub: "campaigns, brands, regions…" },
            { label: "Regional cost variance", value: "2.8x",sub: "EU vs SEA, per campaign" },
          ],
          synthesis: "40+ regional cost centers run duplicated workflows. Brief drafting, competitive scans, and post-campaign synthesis are AI-replaceable today.",
          highlights: {
            headerSubtitle: "Media buying dominates non-labor; brand-management labor pool is the AI-replaceable opportunity",
            cards: [
              { name: "Media Buying",      spend: "$116M", driver: "Markets",          color: "#1d4ed8" },
              { name: "Trade Marketing",   spend: "$58M",  driver: "Active accounts",   color: "#f97316" },
              { name: "Brand Management",  spend: "$23M",  driver: "Briefs / yr",       color: "#8b5cf6" },
              { name: "Insights",          spend: "$20M",  driver: "Brands / campaigns",color: "#10b981" },
              { name: "All Other Sub-fns", spend: "$78M",  driver: "Regional duplication", color: "#94a3b8" },
            ],
            keyTakeaways: [
              "**Media** at $116M is the largest non-labor pool — concentration risk + agency-fee compression opportunity.",
              "Brand management labor has **40+ duplicated regional cost centers** running the same workflows — consolidation worth ~$50M.",
              "Brief drafting, competitive scans, and post-campaign synthesis are **AI-replaceable today**.",
            ]
          },
          combined: { activities: [
            { name: "Brief drafting",            subFn: "Brand",        labor: "$22M", nonLabor: "$1M",  driver: "Briefs/yr",      volume: "1,840", unitCost: "$12,500", conf: "Med", lowConf: true },
            { name: "Competitive scans",          subFn: "Insights",     labor: "$9M",  nonLabor: "$0.4M",driver: "Brands",          volume: "32",   unitCost: "$293,750", conf: "Low", lowConf: true },
            { name: "Post-campaign synthesis",    subFn: "Insights",     labor: "$11M", nonLabor: "$0.3M",driver: "Campaigns",       volume: "640",  unitCost: "$17,656",  conf: "Med" },
            { name: "Media buying",                subFn: "Media",        labor: "$18M", nonLabor: "$98M", driver: "Markets",          volume: "9",    unitCost: "$12.9M",  conf: "High" },
            { name: "Trade marketing",            subFn: "Trade",        labor: "$26M", nonLabor: "$32M", driver: "Active accounts", volume: "4,200",unitCost: "$13,810", conf: "High" },
          ]},
          vendor: { rows: [] },
          fte:    { rows: [] },
        },

        { id: "hr", name: "HR", lastRefreshed: "8 min ago", confidence: "high",
          totalSpendNum: 280,
          railSummary: "$280M · 510 FTE · 28 activities",
          ingested: "1,560 vendor lines · 510 HRIS records · 56 SOPs · 22 cost centers",
          stats: [
            { label: "Total spend",          value: "$280M", sub: "labor $190M · non-labor $90M" },
            { label: "FTE equivalent",       value: "510",   sub: "across 9 regions" },
            { label: "Activities found",     value: "28",    sub: "4 flagged low confidence" },
            { label: "Drivers inferred",     value: "10",    sub: "employees, hires, training events" },
            { label: "Regional cost variance", value: "3.2x",sub: "India vs SEA, per FTE" },
          ],
          synthesis: "$24M of HR consulting ≈ the fully-loaded cost of 200 HR FTEs. Token-replaceable analyst and advisory work running alongside an internal HR team.",
          highlights: {
            headerSubtitle: "Outside HR consulting at $24M = ~200 HR FTEs — the cleanest in-sourcing target",
            cards: [
              { name: "Outside HR Consulting", spend: "$24M", driver: "SOPs",       color: "#f97316" },
              { name: "Talent Acquisition",     spend: "$58M", driver: "Hires",       color: "#1d4ed8" },
              { name: "Comp & Benefits",         spend: "$72M", driver: "Headcount",   color: "#8b5cf6" },
              { name: "Learning & Development",  spend: "$36M", driver: "Training events", color: "#10b981" },
              { name: "Employee Services",       spend: "$48M", driver: "Tickets",     color: "#3b82f6" },
              { name: "All Other Sub-fns",       spend: "$42M", driver: "Various",     color: "#94a3b8" },
            ],
            keyTakeaways: [
              "**$24M of outside HR consulting ≈ 200 HR FTEs** — most of the work is SOP-driven analyst content.",
              "India HR runs at **3.2× SEA** on cost-per-FTE — convergence + standardization opportunity.",
              "Self-service HR portals are deployed in 4 of 9 regions — expanding to 9 lifts deflection ~30%.",
            ]
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "it", name: "IT", lastRefreshed: "16 min ago", confidence: "high",
          totalSpendNum: 310,
          railSummary: "$310M · 620 FTE · 38 activities",
          ingested: "2,180 vendor lines · 620 HRIS records · 78 SOPs · 38 cost centers",
          stats: [
            { label: "Total spend",          value: "$310M", sub: "labor $180M · non-labor $130M" },
            { label: "FTE equivalent",       value: "620",   sub: "across 9 regions" },
            { label: "Activities found",     value: "38",    sub: "5 flagged low confidence" },
            { label: "Drivers inferred",     value: "14",    sub: "users, applications, infra units" },
            { label: "Regional cost variance", value: "2.9x",sub: "NA vs APAC, per app" },
          ],
          synthesis: "InfoSec ($7M), SAP/Digital ($7M), and Application Operations ($6M) are the three largest consulting concentrations — all candidates for in-sourcing.",
          highlights: {
            headerSubtitle: "Application operations and infra dominate; consulting concentration is the in-sourcing wedge",
            cards: [
              { name: "Application Operations", spend: "$96M", driver: "Applications",  color: "#1d4ed8" },
              { name: "Infrastructure",          spend: "$84M", driver: "Compute units",  color: "#f97316" },
              { name: "Information Security",    spend: "$42M", driver: "Endpoints",      color: "#8b5cf6" },
              { name: "SAP / Digital",            spend: "$38M", driver: "Modules",         color: "#10b981" },
              { name: "Outside Consulting",      spend: "$25M", driver: "SOWs",            color: "#ef4444" },
              { name: "All Other Sub-fns",        spend: "$25M", driver: "Various",        color: "#94a3b8" },
            ],
            keyTakeaways: [
              "**Outside Consulting at $25M** spans InfoSec ($7M), SAP/Digital ($7M), App Ops ($6M) — all in-sourceable to AI agents.",
              "Application portfolio rationalisation is the second-largest lever — 38% of apps have <100 monthly active users.",
              "Endpoint security spend has scaled **2.9× NA vs APAC** — standardisation opportunity.",
            ]
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "finance", name: "Finance", lastRefreshed: "9 min ago", confidence: "high",
          totalSpendNum: 170,
          railSummary: "$170M · 460 FTE · 24 activities",
          ingested: "920 vendor lines · 460 HRIS records · 64 SOPs · 18 cost centers",
          stats: [
            { label: "Total spend",          value: "$170M", sub: "labor $115M · non-labor $55M" },
            { label: "FTE equivalent",       value: "460",   sub: "across 9 regions" },
            { label: "Activities found",     value: "24",    sub: "2 flagged low confidence" },
            { label: "Drivers inferred",     value: "9",     sub: "transactions, journal entries…" },
            { label: "Regional cost variance", value: "2.1x",sub: "across the 9-region close" },
          ],
          synthesis: "Close-cycle activities are highly standardized but still 2.1× variance — process consolidation and shared-service opportunity.",
          highlights: {
            headerSubtitle: "Close-cycle and FP&A absorb the bulk of Finance labor — shared-service candidates",
            cards: [
              { name: "Close & Reporting", spend: "$52M", driver: "Journal entries", color: "#1d4ed8" },
              { name: "FP&A",              spend: "$38M", driver: "Forecast cycles",  color: "#f97316" },
              { name: "Treasury",          spend: "$22M", driver: "Cash positions",   color: "#8b5cf6" },
              { name: "Tax",                spend: "$28M", driver: "Filings",          color: "#10b981" },
              { name: "Audit & Controls",   spend: "$18M", driver: "Audits",           color: "#3b82f6" },
              { name: "All Other Sub-fns",  spend: "$12M", driver: "Various",          color: "#94a3b8" },
            ],
            keyTakeaways: [
              "Close & Reporting at $52M runs **2.1× variance** across the 9-region close — shared-service centre lifts efficiency.",
              "Tax includes **~$5M outside advisory** — token-replaceable research with an in-house AI agent.",
              "FP&A forecasting cycle ~14 days — AI-assisted forecasting can compress to 4–5 days.",
            ]
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "selling", name: "Selling", lastRefreshed: "11 min ago", confidence: "high",
          totalSpendNum: 380,
          railSummary: "$380M · 1,080 FTE · 22 activities",
          ingested: "1,420 vendor lines · 1,080 HRIS records · 41 SOPs · 28 cost centers",
          stats: [
            { label: "Total spend",          value: "$380M", sub: "labor $230M · non-labor $150M" },
            { label: "FTE equivalent",       value: "1,080", sub: "across 9 regions" },
            { label: "Activities found",     value: "22",    sub: "3 flagged low confidence" },
            { label: "Drivers inferred",     value: "8",     sub: "accounts, customers, deals" },
            { label: "Regional cost variance", value: "2.4x",sub: "across the 9-region book" },
          ],
          synthesis: "Sales-ops onboarding and customer support are 70% manual across all regions — automation runway is significant.",
          highlights: {
            headerSubtitle: "Field sales and account management absorb the bulk; sales-ops is the automation wedge",
            cards: [
              { name: "Field Sales",        spend: "$182M", driver: "Reps",            color: "#1d4ed8" },
              { name: "Account Management", spend: "$94M",  driver: "Active accounts",  color: "#f97316" },
              { name: "Sales Operations",   spend: "$48M",  driver: "Orders",           color: "#8b5cf6" },
              { name: "Customer Service",   spend: "$36M",  driver: "Tickets",          color: "#10b981" },
              { name: "Trade Funds Admin",  spend: "$14M",  driver: "Promo events",     color: "#3b82f6" },
              { name: "All Other Sub-fns",  spend: "$6M",   driver: "Various",          color: "#94a3b8" },
            ],
            keyTakeaways: [
              "Sales-ops onboarding and customer support are **70% manual** across all 9 regions — automation runway is significant.",
              "Customer service ticket deflection via AI lifts capacity ~30% with no headcount change.",
              "Field sales coverage varies **2.4× across regions** — coverage modelling is overdue.",
            ]
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },
      ]},

      // Stage tabs for the value chain — light placeholders for now; the
      // SG&A tab is the marquee. Each stage will get its own widget grid as
      // discovery completes.
      valueChain: {
        agronomy:   { headline: "Agronomy & Sourcing — discovery in progress", note: "Procurement Contracts (~$$$) is the dominant cost driver from the value-chain side. Full activity pull lands next refresh." },
        processing: { headline: "Raw Intake & Processing — discovery in progress", note: "Frying and Freezing Lines carry the bulk of plant operating spend. BU-led decision rights." },
        packaging:  { headline: "Packaging — discovery in progress", note: "Materials Procurement is the dominant non-labor line; Brand Specs is small but BU-led." },
        coldchain:  { headline: "Cold-Chain Warehousing — discovery in progress", note: "Cold Storage Ops is the heavy line — energy + facilities. Country-led decisions." },
        outbound:   { headline: "Outbound Logistics — discovery in progress", note: "Carrier Management is the heavy line — procurement-led across regions." },
      },
    }
  },

  cost_classification: {
    chat: [
      { role: "assistant", style: "neutral",  text: "**Cost Classification** sorts every line item into one of three buckets: **Non-discretionary** (required to operate or comply), **Discretionary** (could cut, defer, or scale), and **Strategic** (discretionary tied to growth or competitive priority). AI ZBO suggests the bucket from SOPs + vendor descriptions + activity context, **but the consultant signs off**. Every row carries an AI suggestion + confirmed status + reason field — without the reason, the classification doesn't survive a CFO meeting." },
      { role: "assistant", style: "finding",  text: "**Legal mix:** Non-discretionary **$23.7M (51%)** — Customer contracts, Litigation, Compliance. Discretionary **$18.5M (40%)** — Vendor contracts, NDAs, Procurement legal. Strategic **$4.0M (9%)** — Trademark renewals." },
      { role: "assistant", style: "variance", text: "**Statutory auto-flags** — 3 items carry an explicit regulatory citation: **Customer contracts (SOX)** and **Compliance & investigations (GDPR · Food Safety)**. These auto-classify as Non-discretionary with the citation in the reason field — not as a judgment call." },
      { role: "assistant", style: "question", text: "The **discretionary pool is the cost-takeout pool**. Vendor contract review at $8.6M is the cleanest wedge — AI first-pass review removes ~40% of paralegal hours. **78% of Legal items are confirmed by Priya** today; the 22% pending sign-off includes the strategic Trademark line. Want to walk those?" },
    ],
    suggestions: [
      { label: "Show items pending sign-off" },
      { label: "Open Vendor contract review — biggest discretionary line" },
      { label: "List the statutory auto-flags" },
    ],
    artifact: {
      type: "dashboard",
      summaryMode: "classification",
      title: "Cost Classification — Non-discretionary · Discretionary · Strategic",
      subtitle: "AI-suggested classification on every line · consultant sign-off + reason field on every row · statutory items auto-flagged with regulatory citation",
      source: "Source: GL + SOPs + vendor descriptions · last refreshed 4 min ago",
      tabs: [
        { id: "agronomy",   label: "Agronomy",   color: "#3b82f6" },
        { id: "processing", label: "Processing", color: "#2563eb" },
        { id: "packaging",  label: "Packaging",  color: "#1d4ed8" },
        { id: "coldchain",  label: "Cold-Chain", color: "#1e40af" },
        { id: "outbound",   label: "Outbound",   color: "#1e3a8a" },
        { id: "sga",        label: "SG&A",       color: "#6366f1", default: true },
      ],
      sga: { functions: [
        { id: "legal", name: "Legal", lastRefreshed: "4 min ago",
          totalSpendNum: 46.2,
          railSummary: "$46.2M · 14 activities · 78% confirmed",
          ingested: "1,247 vendor lines · 312 HRIS records · 84 SOPs · 16 cost centers",
          stats: [
            { label: "Total spend",          value: "$46.2M", sub: "labor $35.1M · non-labor $11.1M" },
            { label: "FTE equivalent",       value: "312",     sub: "across 9 regions" },
            { label: "Activities found",     value: "14",      sub: "3 flagged low confidence" },
            { label: "Drivers inferred",     value: "9",       sub: "prospects, vendors, SKUs…" },
            { label: "Regional cost variance", value: "5.2x",  sub: "NA vs UK, per contract" },
          ],
          synthesis: "Non-discretionary anchors at 51% — Customer contracts, Litigation, Compliance are SOX/GDPR-protected. Discretionary at 40% is the cost-takeout pool.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$23.7M", pct: 51, count: 5, color: "#dc2626", desc: "Required to operate or comply" },
              { id: "disc",      label: "Discretionary",      spend: "$18.5M", pct: 40, count: 7, color: "#f59e0b", desc: "Could cut, defer, or scale" },
              { id: "strategic", label: "Strategic",           spend: "$4.0M",  pct: 9,  count: 2, color: "#10b981", desc: "Tied to growth — protect, don't cut" },
            ],
            confirmedRate: 78,
            pendingCount: 22,
            statutoryCount: 3,
            // Sub-function totals (in $M) split across the 3 classifications.
            bySubFn: [
              { name: "Contracts",   nonDisc: 6.2, disc: 10.0, strategic: 0   },
              { name: "Disputes",    nonDisc: 7.9, disc: 0,    strategic: 0   },
              { name: "Compliance",  nonDisc: 5.6, disc: 0,    strategic: 0   },
              { name: "Procurement", nonDisc: 0,   disc: 3.5,  strategic: 0   },
              { name: "IP",          nonDisc: 0,   disc: 0,    strategic: 2.0 },
              { name: "All Other",   nonDisc: 4.0, disc: 5.0,  strategic: 2.0 },
            ],
            keyTakeaways: [
              "**Non-discretionary $23.7M (51%)** — Customer contracts, Litigation, Compliance are SOX/GDPR-protected. Cannot cut without breaking the law.",
              "**Discretionary $18.5M (40%)** is the cost-takeout pool — Vendor contract review and NDA execution are AI-replaceable today.",
              "**Strategic $4.0M (9%)** sits in IP / Trademark — protect, don't cut. Cutting these has long-term brand consequences.",
            ],
          },
          combined: {
            footer: "7 of 14 activities shown · AI-suggested fields are highlighted · click any row to see vendors and roles · consultant must confirm + add a reason for the classification to land",
            activities: [
              { name: "Vendor contract review",        subFn: "Contracts",   spend: "$8.6M", aiClass: "discretionary",    confirmed: true,  reason: "Volume-driven; AI first-pass review removes ~40% of paralegal hours" },
              { name: "Customer contract review",      subFn: "Contracts",   spend: "$6.2M", aiClass: "non-discretionary", confirmed: true,  reason: "Required for revenue capture; SOX-flagged for material contracts", statutory: "SOX" },
              { name: "NDA execution",                  subFn: "Contracts",   spend: "$1.4M", aiClass: "discretionary",    confirmed: true,  reason: "Tied to prospect volume; AI-automatable end-to-end" },
              { name: "Litigation & claims",            subFn: "Disputes",    spend: "$7.9M", aiClass: "non-discretionary", confirmed: true,  reason: "Active matters; cannot defer or scale down" },
              { name: "Compliance & investigations",    subFn: "Compliance",  spend: "$5.6M", aiClass: "non-discretionary", confirmed: true,  reason: "GDPR + food-safety filings — auto-flagged statutory", statutory: "GDPR · Food Safety" },
              { name: "Trademark renewals",             subFn: "IP",          spend: "$2.0M", aiClass: "strategic",         confirmed: false, reason: "Brand portfolio protection — strategic to growth markets" },
              { name: "Procurement legal support",     subFn: "Procurement", spend: "$3.5M", aiClass: "discretionary",    confirmed: true,  reason: "RFP-driven; AI-assistable on master agreements" },
            ],
          },
          vendor: {
            footer: "6 of 84 vendors shown · AI-suggested classification + linked activity are visually called out · consultant sign-off captured against each row",
            rows: [
              { number: "2018821", name: "Pinnacle Counsel LLP",        costCenter: "14012 — NA Legal · Litigation", glCode: "626100", costElement: "Outside Counsel",       spend: "$5.2M", activity: "Litigation & claims",       aiClass: "non-discretionary", confirmed: true,  reason: "Active matters",                       conf: "High" },
              { number: "2018824", name: "Bridgewater Legal Partners",  costCenter: "14048 — UK Legal · Disputes",   glCode: "626100", costElement: "Outside Counsel",       spend: "$2.1M", activity: "Litigation & claims",       aiClass: "non-discretionary", confirmed: true,  reason: "Active matters",                       conf: "High" },
              { number: "2018830", name: "Apex Trademark Services",     costCenter: "14080 — Global Legal · IP",     glCode: "626120", costElement: "IP Services",            spend: "$1.1M", activity: "Trademark renewals",        aiClass: "strategic",          confirmed: false, reason: "Growth-tied — protect",                conf: "Med"  },
              { number: "2018841", name: "ContractFlow SaaS",           costCenter: "14012 — NA Legal · Contracts",  glCode: "626300", costElement: "Software Licenses",      spend: "$0.4M", activity: "Vendor contract review",    aiClass: "discretionary",      confirmed: true,  reason: "Tooling — defer-able",                  conf: "High" },
              { number: "2018852", name: "RegulaWatch Compliance",      costCenter: "14025 — NA Legal · Compliance", glCode: "626140", costElement: "Compliance Advisory",    spend: "$0.8M", activity: "Compliance & investigations",aiClass: "non-discretionary", confirmed: true,  reason: "GDPR + food-safety advisory",          statutory: "GDPR · Food Safety", conf: "High" },
              { number: "2018863", name: "Sourcewell Procurement Legal",costCenter: "14012 — NA Legal · Procurement",glCode: "626100", costElement: "Outside Counsel",       spend: "$0.6M", activity: "Procurement legal support", aiClass: "discretionary",      confirmed: true,  reason: "RFP-driven advisory",                  conf: "High" },
            ],
          },
          fte: {
            footer: "6 of 312 HRIS records shown · AI-suggested classification + reason captured per role · consultant sign-off pending where italicised",
            rows: [
              { id: "EMP-04812", role: "Senior Counsel",     jobFamily: "Legal · Counsel",    costCenter: "14012 — NA Legal · Contracts",  region: "NA",     fte: "1.0", loaded: "$410K", primaryActivity: "Vendor contract review",       aiClass: "discretionary",    confirmed: true,  reason: "Volume-driven; AI-assistable",   conf: "High" },
              { id: "EMP-04901", role: "Paralegal II",        jobFamily: "Legal · Paralegal",  costCenter: "14012 — NA Legal · Contracts",  region: "NA",     fte: "1.0", loaded: "$145K", primaryActivity: "Vendor contract review",       aiClass: "discretionary",    confirmed: true,  reason: "First-pass review pool",         conf: "High" },
              { id: "EMP-05122", role: "Senior Counsel",     jobFamily: "Legal · Counsel",    costCenter: "14048 — UK Legal · Contracts",  region: "UK",     fte: "1.0", loaded: "$295K", primaryActivity: "Customer contract review",     aiClass: "non-discretionary",confirmed: true,  reason: "SOX-material contracts",         statutory: "SOX", conf: "High" },
              { id: "EMP-05308", role: "Compliance Manager", jobFamily: "Legal · Compliance", costCenter: "14025 — NA Legal · Compliance", region: "NA",     fte: "1.0", loaded: "$215K", primaryActivity: "Compliance & investigations",  aiClass: "non-discretionary",confirmed: true,  reason: "GDPR + food-safety scope",       statutory: "GDPR · Food Safety", conf: "High" },
              { id: "EMP-05412", role: "IP Specialist",       jobFamily: "Legal · IP",         costCenter: "14080 — Global Legal · IP",     region: "Global", fte: "0.5", loaded: "$185K", primaryActivity: "Trademark renewals",           aiClass: "strategic",         confirmed: false, reason: "Growth-tied — sign-off pending", conf: "Med"  },
              { id: "EMP-05521", role: "Procurement Counsel",jobFamily: "Legal · Counsel",    costCenter: "14012 — NA Legal · Procurement",region: "NA",     fte: "1.0", loaded: "$235K", primaryActivity: "Procurement legal support",    aiClass: "discretionary",    confirmed: true,  reason: "RFP-driven",                     conf: "High" },
            ],
          },
        },

        { id: "marketing", name: "Marketing & Media", lastRefreshed: "12 min ago",
          totalSpendNum: 295,
          railSummary: "$295M · 820 FTE · 42 activities · 64% confirmed",
          synthesis: "Discretionary dominates — media buying, agency fees, brand spend above minimum. The $50M consolidation opportunity is entirely inside the discretionary pool.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$30M",  pct: 10, count: 3,  color: "#dc2626" },
              { id: "disc",      label: "Discretionary",      spend: "$240M", pct: 81, count: 32, color: "#f59e0b" },
              { id: "strategic", label: "Strategic",           spend: "$25M",  pct: 9,  count: 7,  color: "#10b981" },
            ],
            confirmedRate: 64, pendingCount: 36, statutoryCount: 1,
            bySubFn: [
              { name: "Media",   nonDisc: 0,  disc: 116, strategic: 0  },
              { name: "Trade",   nonDisc: 0,  disc: 58,  strategic: 0  },
              { name: "Brand",   nonDisc: 0,  disc: 18,  strategic: 5  },
              { name: "Insights",nonDisc: 0,  disc: 12,  strategic: 8  },
              { name: "Compliance / Labelling", nonDisc: 30, disc: 0, strategic: 0 },
              { name: "All Other", nonDisc: 0, disc: 36, strategic: 12 },
            ],
            keyTakeaways: [
              "**Discretionary $240M (81%)** — entire media + trade + brand stack. Agency fees and brand creative are the cleanest cuts.",
              "**Strategic $25M (9%)** — new market entry and capability builds. Cutting these compresses growth runway.",
              "Compliance / Labelling (~$30M) auto-flags as Non-discretionary — packaging compliance is statutory.",
            ],
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "hr", name: "HR", lastRefreshed: "8 min ago",
          totalSpendNum: 280,
          railSummary: "$280M · 510 FTE · 28 activities · 81% confirmed",
          synthesis: "Payroll, benefits admin, and statutory employment compliance are non-discretionary. The $24M outside HR consulting is fully discretionary — clean cost-takeout target.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$120M", pct: 43, count: 9,  color: "#dc2626" },
              { id: "disc",      label: "Discretionary",      spend: "$130M", pct: 46, count: 16, color: "#f59e0b" },
              { id: "strategic", label: "Strategic",           spend: "$30M",  pct: 11, count: 3,  color: "#10b981" },
            ],
            confirmedRate: 81, pendingCount: 19, statutoryCount: 2,
            bySubFn: [
              { name: "Payroll & Benefits Admin", nonDisc: 72, disc: 0,   strategic: 0 },
              { name: "Talent Acquisition",       nonDisc: 0,  disc: 58,  strategic: 0 },
              { name: "Outside HR Consulting",    nonDisc: 0,  disc: 24,  strategic: 0 },
              { name: "Learning & Development",    nonDisc: 0,  disc: 26,  strategic: 10 },
              { name: "Employment Compliance",    nonDisc: 48, disc: 0,   strategic: 0 },
              { name: "Capability Builds",         nonDisc: 0,  disc: 22,  strategic: 20 },
            ],
            keyTakeaways: [
              "**$24M outside HR consulting** is fully discretionary — token-replaceable analyst work running alongside an internal HR team.",
              "Payroll + Employment compliance ($120M) is **statutorily protected** — automation lifts efficiency but the spend stays.",
              "Capability builds are tagged **Strategic** — cutting these compresses leadership pipeline.",
            ],
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "it", name: "IT", lastRefreshed: "16 min ago",
          totalSpendNum: 310,
          railSummary: "$310M · 620 FTE · 38 activities · 71% confirmed",
          synthesis: "Core infra and SOX/GDPR-mandated InfoSec are non-discretionary. Outside consulting ($25M) and digital transformation ($35M strategic) are the discretionary + protected halves.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$180M", pct: 58, count: 14, color: "#dc2626" },
              { id: "disc",      label: "Discretionary",      spend: "$95M",  pct: 31, count: 17, color: "#f59e0b" },
              { id: "strategic", label: "Strategic",           spend: "$35M",  pct: 11, count: 7,  color: "#10b981" },
            ],
            confirmedRate: 71, pendingCount: 29, statutoryCount: 4,
            bySubFn: [
              { name: "Core Infra & ERP",   nonDisc: 84, disc: 0,   strategic: 0  },
              { name: "Information Security", nonDisc: 35, disc: 7,   strategic: 0  },
              { name: "Application Operations", nonDisc: 38, disc: 6,   strategic: 0  },
              { name: "Outside Consulting",   nonDisc: 0,  disc: 25,  strategic: 0  },
              { name: "Digital Transformation",nonDisc: 0,  disc: 12,  strategic: 35 },
              { name: "All Other",             nonDisc: 23, disc: 45,  strategic: 0  },
            ],
            keyTakeaways: [
              "**SOX-mandated InfoSec + ERP** anchors the non-discretionary base — automation lifts efficiency, not spend.",
              "**$25M outside consulting** is fully discretionary — InfoSec, SAP/Digital, App Ops are all in-sourceable to AI agents.",
              "**Digital Transformation $35M** sits **Strategic** — capability build for the next platform.",
            ],
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "finance", name: "Finance", lastRefreshed: "9 min ago",
          totalSpendNum: 170,
          railSummary: "$170M · 460 FTE · 24 activities · 86% confirmed",
          synthesis: "Statutory audit, tax filings, and close are non-discretionary. Tax advisory ($5M) and external benchmarking are the small discretionary pool.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$100M", pct: 59, count: 12, color: "#dc2626" },
              { id: "disc",      label: "Discretionary",      spend: "$50M",  pct: 29, count: 9,  color: "#f59e0b" },
              { id: "strategic", label: "Strategic",           spend: "$20M",  pct: 12, count: 3,  color: "#10b981" },
            ],
            confirmedRate: 86, pendingCount: 14, statutoryCount: 5,
            bySubFn: [
              { name: "Close & Reporting",    nonDisc: 52, disc: 0,  strategic: 0  },
              { name: "Tax",                   nonDisc: 23, disc: 5,  strategic: 0  },
              { name: "Treasury",              nonDisc: 22, disc: 0,  strategic: 0  },
              { name: "FP&A",                  nonDisc: 0,  disc: 28, strategic: 10 },
              { name: "Audit & Controls",      nonDisc: 18, disc: 0,  strategic: 0  },
              { name: "M&A Capability",        nonDisc: 0,  disc: 4,  strategic: 8  },
            ],
            keyTakeaways: [
              "**Statutory audit + close + tax filings** = $100M anchored as Non-discretionary. SOX coverage on every line.",
              "**FP&A modernization** carries Strategic spend ($10M) — AI-assisted forecasting capability build.",
              "Tax advisory ($5M) is the only meaningful Discretionary line — token-replaceable.",
            ],
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },

        { id: "selling", name: "Selling", lastRefreshed: "11 min ago",
          totalSpendNum: 380,
          railSummary: "$380M · 1,080 FTE · 22 activities · 73% confirmed",
          synthesis: "Field sales coverage and customer service are non-discretionary at minimum. Account mgmt above minimum and T&E are the discretionary pool.",
          classification: {
            mix: [
              { id: "non-disc",  label: "Non-discretionary", spend: "$240M", pct: 63, count: 12, color: "#dc2626" },
              { id: "disc",      label: "Discretionary",      spend: "$120M", pct: 32, count: 8,  color: "#f59e0b" },
              { id: "strategic", label: "Strategic",           spend: "$20M",  pct: 5,  count: 2,  color: "#10b981" },
            ],
            confirmedRate: 73, pendingCount: 27, statutoryCount: 0,
            bySubFn: [
              { name: "Field Sales (min coverage)", nonDisc: 152, disc: 30,  strategic: 0  },
              { name: "Account Management",         nonDisc: 0,   disc: 94,  strategic: 0  },
              { name: "Customer Service",            nonDisc: 36,  disc: 0,   strategic: 0  },
              { name: "Sales Operations",            nonDisc: 28,  disc: 20,  strategic: 0  },
              { name: "Trade Funds Admin",           nonDisc: 14,  disc: 0,   strategic: 0  },
              { name: "New Market Entry",            nonDisc: 10,  disc: 0,   strategic: 20 },
            ],
            keyTakeaways: [
              "**Field sales minimum coverage** ($152M) is Non-discretionary — go-to-market floor.",
              "**Account Management $94M** is fully Discretionary — coverage modelling can compress this 15–20%.",
              "**$20M Strategic** is new-market entry investment — protect.",
            ],
          },
          combined: { activities: [] }, vendor: { rows: [] }, fte: { rows: [] },
        },
      ]},

      valueChain: {
        agronomy:   { headline: "Agronomy & Sourcing — discovery in progress", note: "Procurement Contracts is largely Non-discretionary (commodity hedging and crop contracts) — classification pull lands next refresh." },
        processing: { headline: "Raw Intake & Processing — discovery in progress", note: "Plant operating cost is split: minimum-spec running is Non-discretionary; line-extension capacity is Discretionary." },
        packaging:  { headline: "Packaging — discovery in progress", note: "Materials Procurement and Labeling are largely Non-discretionary; brand creative and pack engineering above minimum are Discretionary." },
        coldchain:  { headline: "Cold-Chain Warehousing — discovery in progress", note: "Cold storage minimum capacity is Non-discretionary; over-build and 3PL premium services are Discretionary." },
        outbound:   { headline: "Outbound Logistics — discovery in progress", note: "Carrier minimum is Non-discretionary; premium service tiers and consulting fees on routing are Discretionary." },
      },
    }
  },

  cost_driver: {
    chat: [
      { role: "assistant", style: "neutral",  text: "**$4,050 / yr per SMB customer** · touches **12 process steps across 38 activities**. **Selling & managing the account is 34%** of the cost — the dominant step, and the one that varies most by region." },
      { role: "assistant", style: "finding",  text: "**Handling service requests at 16%** — 3.4× what an Enterprise customer absorbs proportionally. The SMB model carries more service overhead than the order volume justifies." },
      { role: "assistant", style: "variance", text: "**Reviewing & executing contracts hits the SMB shadow at $185 / yr (5%)** — MSAs, NDAs, customer-contract review, AR escalation. **NA runs 5.2× UK** on per-contract basis (echoes the Cost Classification view)." },
      { role: "assistant", style: "question", text: "**India at 1.76× global** — selling overhead + manual collections drive the gap. **UK at $2,800 is the lean benchmark.** If every region matched UK's cost shape across the **1,840-account base**, that's an indicative **~$2.3M annualised recoverable** on this driver alone. Want to overlay Enterprise customer?" },
    ],
    suggestions: [
      { label: "Overlay Enterprise customer" },
      { label: "Why is India 1.76×?" },
      { label: "Show activities behind Sales" },
    ],
    artifact: {
      type: "cost_driver",
      title: "How does one SMB customer ripple through the company?",
      subtitle: "Pick a driver. Pick a region. See every function it touches and how the cost shape changes.",
      badge: "illustrative · 218 activities · 9 drivers · $1.79B SG&A allocated",
      drivers: [
        { id: "smb",        label: "SMB customer",        active: true },
        { id: "enterprise", label: "Enterprise customer" },
        { id: "qsr",        label: "QSR customer" },
        { id: "newsku",     label: "New SKU" },
        { id: "litigation", label: "Litigation matter" },
        { id: "newplant",   label: "New plant" },
        { id: "newemp",     label: "New employee" },
        { id: "newvendor",  label: "New vendor" },
        { id: "promo",      label: "Promotional event" },
      ],
      driversMore: 12,
      activeDriver: {
        id: "smb",
        label: "SMB customer",
        unit: "per year",
        globalAvg: 4050,
        globalAvgLabel: "$4,050",
        summary: { functions: 12, activities: 38, costCenters: 62, vendors: 14, accounts: 1840 },
        // Treemap data — activity name, value ($/yr per customer), pct, color
        functions: [
          { name: "Sell & manage account",      value: 1380, pct: 34, color: "#1e3a8a" },
          { name: "Handle service requests",    value: 640,  pct: 16, color: "#1d4ed8" },
          { name: "Fulfill & ship orders",      value: 400,  pct: 10, color: "#2563eb" },
          { name: "Invoice & collect AR",       value: 380,  pct: 9,  color: "#3b82f6" },
          { name: "Run campaigns & promos",     value: 290,  pct: 7,  color: "#10b981" },
          { name: "Execute trade funds",        value: 250,  pct: 6,  color: "#f59e0b" },
          { name: "Review & execute contracts", value: 185,  pct: 5,  color: "#8b5cf6" },
          { name: "Forecast & plan supply",     value: 180,  pct: 4,  color: "#06b6d4" },
          { name: "Maintain order systems",     value: 130,  pct: 3,  color: "#ef4444" },
          { name: "Staff & support field",      value: 90,   pct: 2,  color: "#ec4899" },
          { name: "Apply tax & file",           value: 75,   pct: 2,  color: "#14b8a6" },
          { name: "Validate compliance",        value: 50,   pct: 1,  color: "#a855f7" },
        ],
        regions: [
          { id: "all",   label: "All regions", value: 4050, multiplier: "1.00×", isCurrent: true },
          { id: "na",    label: "NA",          value: 4180, multiplier: "1.03×" },
          { id: "uk",    label: "UK",          value: 2800, multiplier: "0.69×", isBenchmark: true },
          { id: "ceu",   label: "CEU",         value: 3420, multiplier: "0.84×" },
          { id: "latam", label: "LatAm",       value: 4910, multiplier: "1.21×" },
          { id: "anz",   label: "ANZ",         value: 3140, multiplier: "0.78×" },
          { id: "saf",   label: "SAF",         value: 3140, multiplier: "0.78×" },
          { id: "india", label: "India",       value: 7100, multiplier: "1.76×" },
          { id: "sea",   label: "SEAsia",      value: 3820, multiplier: "0.94×" },
          { id: "china", label: "China",       value: 3820, multiplier: "0.94×" },
        ],
        recoverable: "If every region moved to UK's cost shape, fully-loaded SMB cost would drop **~38%** across the **1,840-account base** — an indicative **$2.3M annualised recoverable** on this driver alone.",
      }
    }
  },

  opportunity_prioritization: {
    chat: [
      { role: "assistant", style: "neutral",  text: "**Opportunity Prioritization** turns the diagnostic into a workplan. Activities become **actionable process-level zones** — \"Automate first-pass contract review — NA Legal ($8M, discretionary, F-led)\" is a target; \"Legal\" is not. The deliverable is a shortlist of 5–10 priority zones." },
      { role: "assistant", style: "finding",  text: "**7 criteria** weight every zone: pool size · discretionary share · regional/BU variance · standardization gap · confidence · implementation feasibility (F-led faster than C-led) · strategic risk (warning, not a deprioritization)." },
      { role: "assistant", style: "variance", text: "**Top 10 zones surface up to ~$240M of run-rate opportunity at the upper bound.** Anything below the 10th line is deprioritized with a reason. The view is interactive — filters re-rank by region · BU · function." },
      { role: "assistant", style: "question", text: "**Deprioritized rollup:** $410M across 38 non-discretionary process steps (statutory + ops floor) and $98M across 14 strategic steps (growth-tied). The strategic items carry a warning flag in the shortlist. Want to walk the top 10 or filter by region first?" },
    ],
    suggestions: [
      { label: "Filter to NA only" },
      { label: "Show F-led zones first" },
      { label: "Why is Compliance & investigations deprioritized?" },
    ],
    artifact: {
      type: "prioritization",
      title: "Opportunity Prioritization — Where to go after the cost",
      subtitle: "5–10 priority zones distilled from 218 activities · interact with the criteria, not the line items",
      source: "Source: Cost Classification + Activity & Driver Mapping · last refreshed 4 min ago",
      filters: {
        regions:  ["All", "NA", "EU", "UK", "APAC", "LATAM"],
        bus:      ["All", "Corporate", "Potato BU", "Appetizers BU", "Multiple"],
        functions:["All", "Legal", "HR", "IT", "Finance", "Marketing", "Selling", "Operations", "A&E"],
      },
      // Top-10 priority zones. cost in $M (numeric) · variance multiplier · discretionaryShare % · owner F/B/C.
      zones: [
        { id: "z1",  rank: 1,  name: "Restructure India admin & executive operating model",          function: "A&E",       region: "APAC",   bu: "Multiple",  cost: 80.0, costLabel: "$80M",  discretionaryShare: 60,  variance: 3.1, confidence: "Med",  owner: "bu",       sizingRange: "$50M – $80M", strategicRisk: false, rationale: "India runs 3.1× SEA on cost-per-employee; redesign org model and converge to SEA benchmark over 18 months." },
        { id: "z2",  rank: 2,  name: "Consolidate duplicated marketing brief & media-buying workflows", function: "Marketing", region: "Global", bu: "Corporate", cost: 50.0, costLabel: "$50M",  discretionaryShare: 95,  variance: 2.8, confidence: "Med",  owner: "function", sizingRange: "$30M – $45M", strategicRisk: false, rationale: "40+ regional cost centers running the same briefs and media buys with no shared template — AI brief drafting + agency-fee compression." },
        { id: "z3",  rank: 3,  name: "Redesign sales coverage model across 9 regions",               function: "Selling",   region: "Global", bu: "Multiple",  cost: 94.0, costLabel: "$94M",  discretionaryShare: 100, variance: 2.4, confidence: "Med",  owner: "function", sizingRange: "$20M – $35M", strategicRisk: false, rationale: "Account coverage varies 2.4× across regions with no shared model or rep-productivity standard; 15–20% compression realistic." },
        { id: "z4",  rank: 4,  name: "In-source InfoSec, SAP & app-ops advisory to AI agent pool",   function: "IT",        region: "Global", bu: "Corporate", cost: 25.0, costLabel: "$25M",  discretionaryShare: 100, variance: 2.1, confidence: "High", owner: "function", sizingRange: "$14M – $20M", strategicRisk: false, rationale: "InfoSec ($7M) · SAP/Digital ($7M) · App Ops ($6M) — all SOP-driven advisory work in-sourceable to AI agents." },
        { id: "z5",  rank: 5,  name: "Replace HR advisory SOPs with AI-assisted internal workflows", function: "HR",        region: "Global", bu: "Corporate", cost: 24.0, costLabel: "$24M",  discretionaryShare: 100, variance: 1.8, confidence: "High", owner: "function", sizingRange: "$15M – $22M", strategicRisk: false, rationale: "$24M of outside advisory ≈ 200 HR FTE equivalent — content is SOP-driven and token-replaceable with an internal AI agent." },
        { id: "z6",  rank: 6,  name: "Standardise cold-storage SLAs & energy vendor contracts",      function: "Operations",region: "Global", bu: "Multiple",  cost: 18.0, costLabel: "$18M",  discretionaryShare: 30,  variance: 3.2, confidence: "Med",  owner: "country",  sizingRange: "$8M – $14M",  strategicRisk: false, rationale: "Country-led procurement with no cross-regional SLA floor — energy tariff hedging + cold-storage contract standardization." },
        { id: "z7",  rank: 7,  name: "Automate customer onboarding & order management workflows",    function: "Selling",   region: "Global", bu: "Multiple",  cost: 11.0, costLabel: "$11M",  discretionaryShare: 70,  variance: 2.4, confidence: "Med",  owner: "function", sizingRange: "$5M – $9M",   strategicRisk: false, rationale: "70% of onboarding steps are manual across all 9 regions with no shared SOP — AI workflow + agent escalation." },
        { id: "z8",  rank: 8,  name: "Automate first-pass contract review — NA Legal pool",          function: "Legal",     region: "NA",     bu: "Corporate", cost: 8.0,  costLabel: "$8.0M", discretionaryShare: 100, variance: 5.2, confidence: "High", owner: "function", sizingRange: "$3M – $5M",   strategicRisk: false, rationale: "AI first-pass NDA + vendor-contract review removes ~40% of paralegal hours; NA runs 5.2× UK per contract." },
        { id: "z9",  rank: 9,  name: "Replace outside tax research advisory with AI agent",          function: "Finance",   region: "Global", bu: "Corporate", cost: 5.0,  costLabel: "$5.0M", discretionaryShare: 100, variance: 1.7, confidence: "High", owner: "function", sizingRange: "$2M – $3.5M", strategicRisk: false, rationale: "Tax research is SOP-driven and token-replaceable; AI agent handles first pass, counsel reviews edge cases." },
        { id: "z10", rank: 10, name: "Centralise brand trademark monitoring & renewal filing",       function: "Legal",     region: "Global", bu: "Corporate", cost: 2.0,  costLabel: "$2.0M", discretionaryShare: 100, variance: 1.4, confidence: "Med",  owner: "function", sizingRange: "$0.5M – $1M", strategicRisk: true,  rationale: "Brand portfolio protection is strategic to growth markets — centralise filing ops but treat with care." },
      ],
      // What was looked at and ruled out — with reason.
      deprioritized: [
        { id: "d1", reason: "Non-discretionary",                category: "Statutory + ops floor — cannot cut",       spend: "$410M", count: 38, color: "#dc2626" },
        { id: "d2", reason: "Strategic — growth-tied",           category: "Protected; cutting compresses growth",     spend: "$98M",  count: 14, color: "#10b981" },
        { id: "d3", reason: "Low confidence — needs enrichment", category: "AI flagged amber; consultant not signed-off", spend: "$62M",  count: 22, color: "#f59e0b" },
      ],
    }
  },

  // ── AI-VSM ──
  // Picks up where Opportunity Prioritization left off: the priority zones
  // become the priority processes here. For each process we map the value
  // stream (sub-processes), score AI suitability per criterion (Harvey balls),
  // type the intervention (Auto / Aug / Exc / N/S), and walk the activity
  // deep-dive that ties each AI lever to an EBITDA lever and labor pool.
  redesign_opps: {
    chat: [
      { role: "assistant", style: "neutral", text: "**AI-VSM** decomposes each priority zone into its value stream and asks one question per sub-process: *what's the AI lever?* Inputs are the 5–10 zones from Opportunity Prioritization — outputs are a typed recommendation (**AI Only · AI + Reviewer · AI Enabled · N/A**) with named AI inputs, AI outputs, and human roles in the future state." },
      { role: "assistant", style: "finding", text: "**Suitability scored on 5 criteria** — margin impact · volume & repetition · data availability · error tolerance · adoption readiness. A composite score plus a disqualifier flag (broken upstream data or fragmented ownership) gates each row." },
      { role: "assistant", style: "variance", text: "**Six processes are loaded.** Customer onboarding (Selling · ranks #7 in the shortlist) is open by default — 10 activities across 5 sub-processes; **3 AI Only · 4 AI + Reviewer · 2 AI Enabled · 1 N/A**. The intervention design tab and the activity deep dive carry the same data into named AI inputs/outputs and the EBITDA lever each row sits under." },
      { role: "assistant", style: "question", text: "Want to walk the customer onboarding stream, switch to the NA Legal contract review (5.2× variance, mostly AI Only / AI + Reviewer), or filter to a specific recommendation type?" },
    ],
    suggestions: [
      { label: "Open NA Legal contract review" },
      { label: "Show only AI Only interventions" },
      { label: "Walk the activity deep dive" },
    ],
    artifact: {
      type: "ai_vsm",
      title: "AI-VSM — Where AI takes the value back",
      subtitle: "From the priority zones in Opportunity Prioritization, decompose each value stream and identify AI levers · recommendations are typed AI Only · AI + Reviewer · AI Enabled · N/A",
      source: "Source: Opportunity Prioritization · Activity & Driver Mapping · last refreshed 6 min ago",
      interventionKey: [
        { id: "auto", short: "Auto", label: "Full automation",  color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
        { id: "aug",  short: "Aug",  label: "AI augmentation",  color: "#3b82f6", bg: "bg-blue-50",     text: "text-blue-700",     border: "border-blue-200" },
        { id: "exc",  short: "Exc",  label: "Exception handle", color: "#f97316", bg: "bg-orange-50",   text: "text-orange-700",   border: "border-orange-200" },
        { id: "ns",   short: "N/S",  label: "Not suitable",     color: "#9ca3af", bg: "bg-gray-100",    text: "text-gray-600",     border: "border-gray-200" },
      ],
      processes: [
        // ── #7 Customer onboarding & order management (z7 in prioritization) ──
        {
          id: "z7",
          rank: 7,
          name: "Customer onboarding & order management",
          function: "Selling · Finance",
          costIntensity: "$$",
          poolSize: "$11M",
          variance: "2.4×",
          ebitdaLever: "Selling efficiency",
          verdictCounts: { auto: 3, aug: 4, exc: 2, ns: 1 },
          metrics: [
            { label: "Total cycle time",   value: "14.5 days", tone: "warn" },
            { label: "Value-add time",      value: "3.2 days",  tone: "good" },
            { label: "Waste ratio",          value: "78%",        tone: "bad"  },
            { label: "Volume / month",       value: "~40 accounts" },
            { label: "FTEs involved",        value: "6 (Sales, Fin, Ops)" },
          ],
          painPoints: [
            { name: "Manual data re-entry",       severity: "High",        tone: "bad"  },
            { name: "Credit approval lag",         severity: "Avg 4 days",  tone: "warn" },
            { name: "Contract version conflicts",  severity: "Frequent",    tone: "warn" },
            { name: "ERP setup errors",             severity: "−18% accts", tone: "bad"  },
            { name: "First-order delay rate",       severity: "32%",         tone: "warn" },
          ],
          variations: [
            { name: "Standard accounts",       share: "−60%" },
            { name: "Credit-hold required",     share: "−25%" },
            { name: "Custom contract terms",    share: "−15%" },
            { name: "Multi-site setup",         share: "−20%" },
            { name: "EDI integration req.",     share: "−30%" },
          ],
          subProcesses: [
            { id: "intake",   name: "Application intake", cycle: 1.5, value: 0.3, waste: 80,
              verdict: "auto", score: 12, scoreOf: 15,
              ai: { margin: 88, volume: 95, data: 82, error: 90, adoption: 80 },
              intervention: {
                type: "Full automation",
                aiInput:  "Inbound intake form (PDF / email) + customer master record",
                aiOutput: "Validated CRM record · missing-field flags · duplicate alerts",
                humanRole: "Sales rep approves only flagged exceptions (≤ 5% of intakes).",
                exception: "Ambiguous customer match → routed to AE for confirmation.",
              } },
            { id: "credit",   name: "Credit & risk", cycle: 4.0, value: 0.8, waste: 80,
              verdict: "aug", score: 11, scoreOf: 15,
              ai: { margin: 82, volume: 88, data: 78, error: 50, adoption: 72 },
              intervention: {
                type: "AI augmentation",
                aiInput:  "Credit bureau + 24-mo payment history + segment risk model",
                aiOutput: "Risk score · recommended limit · draft credit memo",
                humanRole: "Credit analyst signs off; AI auto-approves below $250K limit.",
                exception: "Multi-entity / sovereign exposure → credit committee.",
              } },
            { id: "contract", name: "Contract setup", cycle: 3.0, value: 0.7, waste: 77,
              verdict: "aug", score: 10, scoreOf: 15,
              ai: { margin: 78, volume: 80, data: 70, error: 45, adoption: 70 },
              intervention: {
                type: "AI augmentation",
                aiInput:  "Standard MSA template + customer redlines + clause library",
                aiOutput: "First-pass redline · clause-deviation log · risk summary",
                humanRole: "Counsel reviews only flagged deviations from the playbook.",
                exception: "Non-standard liability or IP terms → counsel-led negotiation.",
              } },
            { id: "erp",      name: "ERP & system setup", cycle: 4.0, value: 1.4, waste: 65,
              verdict: "auto", score: 13, scoreOf: 15,
              ai: { margin: 92, volume: 90, data: 90, error: 85, adoption: 78 },
              intervention: {
                type: "Full automation",
                aiInput:  "Approved CRM record · pricing schedule · tax + EDI metadata",
                aiOutput: "ERP customer + ship-to + EDI partner records (transactional)",
                humanRole: "Master-data team spot-checks 10% of automated postings.",
                exception: "EDI integration handshake failure → IT integration team.",
              } },
            { id: "first",    name: "First order enable", cycle: 2.0, value: 1.0, waste: 50,
              verdict: "exc", score: 8, scoreOf: 15,
              ai: { margin: 60, volume: 65, data: 55, error: 30, adoption: 60 },
              intervention: {
                type: "Exception handle",
                aiInput:  "First-order PO · live inventory · ship route + carrier ETA",
                aiOutput: "Exception triage memo · recommended substitution · escalation path",
                humanRole: "Ops lead handles edge cases; AI does triage + memo.",
                exception: "Allocation shortfall or lane outage → ops + planning huddle.",
              } },
          ],
          activities: [
            { name: "Intake form parsing",          subProcess: "Application intake",    cycleTime: "0.4d", waste: 85, volume: "~40/mo", painPoint: "Manual transcription",          owner: "Human",   verdict: "auto", score: 12, intervention: "AI extracts fields → CRM API · spot-check on amber rows.", lever: "Indirect labor", laborPool: "$0.6M", effort: "Low",   impact: "High" },
            { name: "Duplicate-account check",       subProcess: "Application intake",    cycleTime: "0.2d", waste: 80, volume: "~40/mo", painPoint: "Master-data fragmentation",     owner: "System",  verdict: "auto", score: 13, intervention: "AI similarity match against customer master.",          lever: "Master data",     laborPool: "$0.2M", effort: "Low",   impact: "Med"  },
            { name: "Credit memo drafting",          subProcess: "Credit & risk",         cycleTime: "1.5d", waste: 70, volume: "~40/mo", painPoint: "Repetitive boilerplate",        owner: "Human",   verdict: "aug",  score: 11, intervention: "AI drafts memo from bureau + history; analyst reviews.", lever: "Working capital", laborPool: "$1.4M", effort: "Med",   impact: "High" },
            { name: "Risk-rule scoring",              subProcess: "Credit & risk",         cycleTime: "0.5d", waste: 50, volume: "~40/mo", painPoint: "Inconsistent risk thresholds",  owner: "Hybrid",  verdict: "aug",  score: 11, intervention: "AI applies segment risk model; analyst confirms.",       lever: "Working capital", laborPool: "$0.5M", effort: "Low",   impact: "Med"  },
            { name: "MSA redline first pass",        subProcess: "Contract setup",        cycleTime: "1.2d", waste: 75, volume: "~12/mo", painPoint: "Repeat clause negotiation",     owner: "Human",   verdict: "aug",  score: 10, intervention: "AI flags deviations vs library; counsel signs off.",     lever: "Legal labor",     laborPool: "$0.9M", effort: "Med",   impact: "High" },
            { name: "Clause approval routing",        subProcess: "Contract setup",        cycleTime: "0.8d", waste: 70, volume: "~12/mo", painPoint: "Approval chain drift",          owner: "Human",   verdict: "aug",  score: 10, intervention: "AI routes by policy; reminders on idle approvals.",       lever: "Cycle time",       laborPool: "$0.3M", effort: "Low",   impact: "Med"  },
            { name: "ERP customer creation",          subProcess: "ERP & system setup",    cycleTime: "0.6d", waste: 60, volume: "~40/mo", painPoint: "Master-data entry errors",      owner: "Hybrid",  verdict: "auto", score: 13, intervention: "AI fills ERP from approved CRM record · audit log.",      lever: "Indirect labor",   laborPool: "$1.1M", effort: "Low",   impact: "High" },
            { name: "EDI partner provisioning",       subProcess: "ERP & system setup",    cycleTime: "1.2d", waste: 55, volume: "~12/mo", painPoint: "Manual handshake config",       owner: "System",  verdict: "exc",  score: 9,  intervention: "AI proposes config; IT confirms handshake.",              lever: "Order capture",    laborPool: "$0.4M", effort: "Med",   impact: "Med"  },
            { name: "First-order exception triage",   subProcess: "First order enable",    cycleTime: "0.5d", waste: 45, volume: "~12/mo", painPoint: "Inventory / ship conflicts",    owner: "Human",   verdict: "exc",  score: 8,  intervention: "AI triages; ops handles edge cases.",                     lever: "Operations",        laborPool: "$0.6M", effort: "Med",   impact: "Med"  },
            { name: "Strategic-account exception",    subProcess: "First order enable",    cycleTime: "0.8d", waste: 30, volume: "~3/mo",  painPoint: "Bespoke onboarding asks",       owner: "Human",   verdict: "ns",   score: 5,  intervention: "Out of scope — relationship-led; AI ingests notes only.", lever: "Relationship",      laborPool: "$0.3M", effort: "High",  impact: "Low"  },
          ],
        },

        // ── #8 NA Legal first-pass contract review (z8) ──
        {
          id: "z8",
          rank: 8,
          name: "First-pass contract review — NA Legal",
          function: "Legal & Compliance",
          costIntensity: "$$",
          poolSize: "$8M",
          variance: "5.2×",
          ebitdaLever: "Legal labor pricing",
          verdictCounts: { auto: 3, aug: 4, exc: 1, ns: 0 },
          metrics: [
            { label: "Total cycle time",   value: "8.1 days",   tone: "warn" },
            { label: "Value-add time",      value: "1.6 days",   tone: "good" },
            { label: "Waste ratio",          value: "80%",         tone: "bad"  },
            { label: "Volume / month",       value: "~4,000",      sub: "NDAs + vendor + customer" },
            { label: "FTEs involved",        value: "22 (paralegal + counsel)" },
          ],
          painPoints: [
            { name: "Repeat NDA boilerplate",      severity: "High",       tone: "bad"  },
            { name: "Vendor MSA queue depth",       severity: "12-day lag", tone: "warn" },
            { name: "Counsel time on low-risk",     severity: "62%",         tone: "bad"  },
            { name: "Clause library out of date",   severity: "Q-old",       tone: "warn" },
          ],
          variations: [
            { name: "NDA / mutual",                share: "+40%" },
            { name: "Vendor MSA",                   share: "+30%" },
            { name: "Customer contract",            share: "+15%" },
            { name: "Employment agreement",         share: "+10%" },
            { name: "Non-standard / regulated",     share: "+5%"  },
          ],
          subProcesses: [
            { id: "intake",  name: "Contract intake",       cycle: 0.5, value: 0.1, waste: 80,
              verdict: "auto", score: 13, scoreOf: 15,
              ai: { margin: 88, volume: 95, data: 90, error: 92, adoption: 85 },
              intervention: { type: "Full automation", aiInput: "Inbound contract (email / portal) + metadata", aiOutput: "Routed queue · contract type · counterparty match", humanRole: "Paralegal touches < 5%.", exception: "Unmatched counterparty → AE." } },
            { id: "triage",  name: "Risk triage",            cycle: 1.0, value: 0.2, waste: 80,
              verdict: "aug", score: 11, scoreOf: 15,
              ai: { margin: 80, volume: 85, data: 80, error: 60, adoption: 75 },
              intervention: { type: "AI augmentation", aiInput: "Contract text + risk model (jurisdiction, dollar value, regulated flags)", aiOutput: "Risk tier (1-3) · escalation reasons", humanRole: "Counsel approves Tier 3 routing only.", exception: "Litigation-tied clauses → litigation lead." } },
            { id: "redline", name: "First-pass redline",     cycle: 3.5, value: 0.6, waste: 83,
              verdict: "aug", score: 12, scoreOf: 15,
              ai: { margin: 88, volume: 92, data: 80, error: 55, adoption: 78 },
              intervention: { type: "AI augmentation", aiInput: "Counterparty redlines + clause library + playbook", aiOutput: "Marked-up contract · deviation log · suggested fallbacks", humanRole: "Paralegal validates ~20% sample; counsel reviews Tier 2-3.", exception: "IP / liability deviations → counsel-led." } },
            { id: "approve", name: "Approval routing",       cycle: 1.6, value: 0.4, waste: 75,
              verdict: "auto", score: 12, scoreOf: 15,
              ai: { margin: 78, volume: 88, data: 85, error: 80, adoption: 80 },
              intervention: { type: "Full automation", aiInput: "Risk tier + signature matrix + jurisdiction", aiOutput: "Routed approval chain + reminders", humanRole: "Approvers click through.", exception: "Off-policy approver → ops review." } },
            { id: "execute", name: "Execution & filing",     cycle: 1.5, value: 0.3, waste: 80,
              verdict: "exc", score: 9,  scoreOf: 15,
              ai: { margin: 65, volume: 70, data: 60, error: 35, adoption: 60 },
              intervention: { type: "Exception handle", aiInput: "Signed contract + obligations extract", aiOutput: "CLM record + obligation calendar", humanRole: "Paralegal handles non-standard filings.", exception: "Regulated jurisdictions → local counsel." } },
          ],
          activities: [
            { name: "NDA classification",          subProcess: "Contract intake",   cycleTime: "0.1d", waste: 85, volume: "~2,200/mo", painPoint: "Manual triage",         owner: "Human",  verdict: "auto", score: 13, intervention: "AI classifies and routes inbound NDAs.", lever: "Legal labor", laborPool: "$0.7M", effort: "Low", impact: "High" },
            { name: "Counterparty match",           subProcess: "Contract intake",   cycleTime: "0.2d", waste: 75, volume: "~4,000/mo", painPoint: "Master-data drift",     owner: "System", verdict: "auto", score: 12, intervention: "AI matches to vendor master.",            lever: "Master data", laborPool: "$0.2M", effort: "Low", impact: "Med"  },
            { name: "Risk-tier scoring",            subProcess: "Risk triage",        cycleTime: "0.4d", waste: 70, volume: "~4,000/mo", painPoint: "Inconsistent triage",  owner: "Hybrid", verdict: "aug",  score: 11, intervention: "Risk model + counsel signs off Tier 3.",  lever: "Legal labor", laborPool: "$0.6M", effort: "Med", impact: "High" },
            { name: "Vendor MSA redline",            subProcess: "First-pass redline", cycleTime: "1.2d", waste: 80, volume: "~1,200/mo", painPoint: "Repeat clauses",       owner: "Human",  verdict: "aug",  score: 12, intervention: "AI redlines vs playbook; paralegal validates.", lever: "Legal labor", laborPool: "$1.6M", effort: "Med", impact: "High" },
            { name: "Customer contract redline",     subProcess: "First-pass redline", cycleTime: "1.6d", waste: 85, volume: "~600/mo",   painPoint: "Negotiation drift",    owner: "Human",  verdict: "aug",  score: 12, intervention: "AI flags deviations + suggested fallbacks.", lever: "Legal labor", laborPool: "$1.1M", effort: "Med", impact: "High" },
            { name: "Clause-library refresh",        subProcess: "First-pass redline", cycleTime: "0.4d", waste: 60, volume: "~ongoing",   painPoint: "Out-of-date library",  owner: "Hybrid", verdict: "aug",  score: 10, intervention: "AI surfaces deviation patterns → library updates.", lever: "Knowledge ops", laborPool: "$0.2M", effort: "Med", impact: "Med"  },
            { name: "Approval routing",              subProcess: "Approval routing",   cycleTime: "0.6d", waste: 70, volume: "~4,000/mo", painPoint: "Approval drift",        owner: "Hybrid", verdict: "auto", score: 12, intervention: "AI routes by signature matrix.",          lever: "Cycle time",   laborPool: "$0.3M", effort: "Low", impact: "Med"  },
            { name: "Obligations extract",           subProcess: "Execution & filing", cycleTime: "0.5d", waste: 70, volume: "~4,000/mo", painPoint: "Manual entry",          owner: "Human",  verdict: "exc",  score: 9,  intervention: "AI extracts; paralegal reviews regulated filings.", lever: "Compliance", laborPool: "$0.4M", effort: "Med", impact: "Med"  },
          ],
        },

        // ── #4 IT advisory in-sourcing (z4) — light data ──
        {
          id: "z4",
          rank: 4,
          name: "IT advisory — InfoSec · SAP · App Ops",
          function: "IT",
          costIntensity: "$$$",
          poolSize: "$25M",
          variance: "2.1×",
          ebitdaLever: "Outside services",
          verdictCounts: { auto: 2, aug: 2, exc: 1, ns: 0 },
          metrics: [
            { label: "Total cycle time",  value: "11.0 days",  tone: "warn" },
            { label: "Value-add time",     value: "3.0 days",    tone: "good" },
            { label: "Waste ratio",         value: "73%",          tone: "bad"  },
            { label: "Volume / month",      value: "~150 advisory tickets" },
            { label: "FTEs involved",       value: "12 (vendor) + 8 (internal)" },
          ],
          painPoints: [
            { name: "SOP-driven advisory",    severity: "High",  tone: "bad"  },
            { name: "Vendor PO sprawl",        severity: "$25M",   tone: "bad"  },
            { name: "Slow internal escalation", severity: "Med",  tone: "warn" },
          ],
          variations: [
            { name: "InfoSec advisory",   share: "$7M" },
            { name: "SAP / Digital",       share: "$7M" },
            { name: "App Ops",             share: "$6M" },
            { name: "Cloud / FinOps",      share: "$3M" },
            { name: "Other",               share: "$2M" },
          ],
          subProcesses: [
            { id: "intake",  name: "Ticket intake",         cycle: 0.5, value: 0.2, waste: 60, verdict: "auto", score: 13, scoreOf: 15, ai: { margin: 88, volume: 92, data: 88, error: 90, adoption: 80 },
              intervention: { type: "Full automation", aiInput: "Service request + system context", aiOutput: "Routed ticket + suggested SOP", humanRole: "Spot-check 5%.", exception: "P1 incident → on-call." } },
            { id: "triage",  name: "Triage & SOP match",    cycle: 1.0, value: 0.3, waste: 70, verdict: "aug",  score: 11, scoreOf: 15, ai: { margin: 80, volume: 85, data: 75, error: 60, adoption: 70 },
              intervention: { type: "AI augmentation", aiInput: "Ticket + SOP library", aiOutput: "Matched SOP + likelihood score", humanRole: "Engineer confirms when < 80%.", exception: "Novel issue → senior engineer." } },
            { id: "advisory", name: "Advisory drafting",     cycle: 5.0, value: 1.5, waste: 70, verdict: "aug",  score: 12, scoreOf: 15, ai: { margin: 88, volume: 80, data: 78, error: 55, adoption: 72 },
              intervention: { type: "AI augmentation", aiInput: "Ticket + SOP + system metadata + risk model", aiOutput: "Draft advisory + recommended actions", humanRole: "Engineer signs off.", exception: "Cross-system change → architecture review." } },
            { id: "deploy",   name: "Change deployment",     cycle: 3.0, value: 0.8, waste: 73, verdict: "exc",  score: 9,  scoreOf: 15, ai: { margin: 65, volume: 70, data: 60, error: 35, adoption: 60 },
              intervention: { type: "Exception handle", aiInput: "Approved change + rollout plan", aiOutput: "Deployment runbook + monitoring hooks", humanRole: "SRE handles change.", exception: "Production rollback → incident commander." } },
            { id: "review",   name: "Post-change review",    cycle: 1.5, value: 0.2, waste: 87, verdict: "auto", score: 12, scoreOf: 15, ai: { margin: 78, volume: 85, data: 82, error: 80, adoption: 78 },
              intervention: { type: "Full automation", aiInput: "Change + monitoring + ticket trail", aiOutput: "Post-change report + SOP delta", humanRole: "Engineer approves SOP delta.", exception: "Repeat incidents → root-cause review." } },
          ],
          activities: [
            { name: "Ticket routing",         subProcess: "Ticket intake",      cycleTime: "0.3d", waste: 60, volume: "~150/mo", painPoint: "Manual routing",     owner: "Human",  verdict: "auto", score: 13, intervention: "AI routes by intent + system.",       lever: "Outside services", laborPool: "$0.5M", effort: "Low",  impact: "High" },
            { name: "SOP matching",            subProcess: "Triage & SOP match",  cycleTime: "0.6d", waste: 70, volume: "~150/mo", painPoint: "Stale SOPs",          owner: "Hybrid", verdict: "aug",  score: 11, intervention: "AI matches SOP; engineer confirms.",   lever: "Outside services", laborPool: "$1.6M", effort: "Med",  impact: "High" },
            { name: "Advisory draft",           subProcess: "Advisory drafting",   cycleTime: "2.0d", waste: 70, volume: "~150/mo", painPoint: "Vendor markup",       owner: "Human",  verdict: "aug",  score: 12, intervention: "AI drafts advisory; in-source from vendor.", lever: "Outside services", laborPool: "$8.0M", effort: "Med",  impact: "High" },
            { name: "Change deployment",        subProcess: "Change deployment",   cycleTime: "1.5d", waste: 73, volume: "~80/mo",   painPoint: "Coordination",         owner: "Human",  verdict: "exc",  score: 9,  intervention: "AI generates runbook; SRE deploys.",   lever: "Operations",        laborPool: "$1.4M", effort: "Med",  impact: "Med"  },
            { name: "Post-change report",       subProcess: "Post-change review",  cycleTime: "0.5d", waste: 87, volume: "~80/mo",   painPoint: "Manual reports",      owner: "Hybrid", verdict: "auto", score: 12, intervention: "AI assembles report from trail.",      lever: "Indirect labor",     laborPool: "$0.6M", effort: "Low",  impact: "Med"  },
          ],
        },

        // ── #5 HR advisory in-sourcing (z5) — light data ──
        {
          id: "z5",
          rank: 5,
          name: "HR advisory — policy · benefits · employee questions",
          function: "HR",
          costIntensity: "$$$",
          poolSize: "$24M",
          variance: "1.8×",
          ebitdaLever: "Outside services",
          verdictCounts: { auto: 3, aug: 1, exc: 1, ns: 0 },
          metrics: [
            { label: "Total cycle time",  value: "5.5 days",  tone: "warn" },
            { label: "Value-add time",     value: "1.4 days",   tone: "good" },
            { label: "Waste ratio",         value: "75%",         tone: "bad"  },
            { label: "Volume / month",      value: "~3,200 cases" },
            { label: "FTEs involved",       value: "≈ 200 FTE-equivalent (vendor)" },
          ],
          painPoints: [
            { name: "Repetitive policy lookups", severity: "High", tone: "bad" },
            { name: "Outside vendor markup",      severity: "$24M", tone: "bad" },
            { name: "Inconsistent answers",        severity: "Med",  tone: "warn" },
          ],
          variations: [
            { name: "Benefits questions",      share: "+40%" },
            { name: "Policy lookups",          share: "+30%" },
            { name: "Compensation queries",    share: "+15%" },
            { name: "Leave / time off",         share: "+10%" },
            { name: "Manager escalations",      share: "+5%"  },
          ],
          subProcesses: [
            { id: "intake",   name: "Question intake",     cycle: 0.2, value: 0.1, waste: 50, verdict: "auto", score: 13, scoreOf: 15, ai: { margin: 88, volume: 95, data: 90, error: 92, adoption: 85 }, intervention: { type: "Full automation", aiInput: "Question text + employee context", aiOutput: "Routed case + intent label", humanRole: "Spot-check.", exception: "Hostile / sensitive → HRBP." } },
            { id: "answer",   name: "First-pass answer",   cycle: 1.5, value: 0.4, waste: 73, verdict: "auto", score: 12, scoreOf: 15, ai: { margin: 90, volume: 92, data: 88, error: 70, adoption: 80 }, intervention: { type: "Full automation", aiInput: "Policy library + benefits + location", aiOutput: "Drafted answer + sources", humanRole: "Sample audit weekly.", exception: "Policy gap → HRBP." } },
            { id: "verify",   name: "Verification & send", cycle: 1.0, value: 0.4, waste: 60, verdict: "aug",  score: 11, scoreOf: 15, ai: { margin: 80, volume: 85, data: 78, error: 65, adoption: 75 }, intervention: { type: "AI augmentation", aiInput: "Drafted answer + employee record", aiOutput: "Verified answer + tone check", humanRole: "Coordinator approves.", exception: "Sensitive case → HRBP." } },
            { id: "escalate", name: "Escalation handling", cycle: 1.8, value: 0.4, waste: 78, verdict: "exc",  score: 8,  scoreOf: 15, ai: { margin: 60, volume: 65, data: 55, error: 30, adoption: 60 }, intervention: { type: "Exception handle", aiInput: "Case context + history", aiOutput: "Triage memo for HRBP", humanRole: "HRBP handles.", exception: "ER / legal → labor counsel." } },
            { id: "close",    name: "Close & SOP update",  cycle: 1.0, value: 0.1, waste: 90, verdict: "auto", score: 12, scoreOf: 15, ai: { margin: 78, volume: 88, data: 82, error: 80, adoption: 80 }, intervention: { type: "Full automation", aiInput: "Resolved case + answer + tags", aiOutput: "Case close + SOP delta proposal", humanRole: "HRBP signs SOP delta.", exception: "Trend → policy review." } },
          ],
          activities: [
            { name: "Question routing",       subProcess: "Question intake",     cycleTime: "0.1d", waste: 50, volume: "~3,200/mo", painPoint: "Manual triage",      owner: "Human",  verdict: "auto", score: 13, intervention: "AI routes by intent.",                lever: "Outside services", laborPool: "$0.4M", effort: "Low", impact: "High" },
            { name: "Policy answer draft",     subProcess: "First-pass answer",   cycleTime: "0.6d", waste: 73, volume: "~3,200/mo", painPoint: "Vendor markup",      owner: "Human",  verdict: "auto", score: 12, intervention: "AI drafts from policy library.",       lever: "Outside services", laborPool: "$15.0M", effort: "Med", impact: "High" },
            { name: "Coordinator verification", subProcess: "Verification & send", cycleTime: "0.4d", waste: 60, volume: "~3,200/mo", painPoint: "Sample audit",       owner: "Hybrid", verdict: "aug",  score: 11, intervention: "AI verifies tone + accuracy.",          lever: "Indirect labor",    laborPool: "$2.0M",  effort: "Low", impact: "Med"  },
            { name: "Manager escalation",       subProcess: "Escalation handling", cycleTime: "0.6d", waste: 70, volume: "~160/mo",   painPoint: "Sensitive cases",    owner: "Human",  verdict: "exc",  score: 8,  intervention: "AI triages; HRBP handles.",            lever: "Risk",              laborPool: "$0.8M",  effort: "Med", impact: "Med"  },
            { name: "SOP delta proposal",        subProcess: "Close & SOP update",  cycleTime: "0.2d", waste: 90, volume: "~ongoing",   painPoint: "Stale SOP",         owner: "Hybrid", verdict: "auto", score: 12, intervention: "AI proposes SOP updates from patterns.", lever: "Knowledge ops",     laborPool: "$0.3M",  effort: "Low", impact: "Med"  },
          ],
        },

        // ── #2 Marketing brief & media buying (z2) — light data ──
        {
          id: "z2",
          rank: 2,
          name: "Marketing brief & media buying workflow",
          function: "Marketing & Media",
          costIntensity: "$$$",
          poolSize: "$50M",
          variance: "2.8×",
          ebitdaLever: "Marketing efficiency",
          verdictCounts: { auto: 1, aug: 3, exc: 1, ns: 0 },
          metrics: [
            { label: "Total cycle time",  value: "21 days", tone: "warn" },
            { label: "Value-add time",     value: "5.2 days", tone: "good" },
            { label: "Waste ratio",         value: "75%",       tone: "bad"  },
            { label: "Volume / month",      value: "~120 briefs · 40 buys" },
            { label: "FTEs involved",       value: "180 brand managers" },
          ],
          painPoints: [
            { name: "40+ duplicated cost centers", severity: "High",   tone: "bad"  },
            { name: "Agency-fee compression",      severity: "$50M",   tone: "bad"  },
            { name: "Brief drafting time",          severity: "5d avg", tone: "warn" },
            { name: "Post-campaign synthesis lag", severity: "14d",    tone: "warn" },
          ],
          variations: [
            { name: "Always-on digital",      share: "+45%" },
            { name: "Major campaign launch",  share: "+25%" },
            { name: "Trade promotion",         share: "+15%" },
            { name: "Sponsorship",             share: "+10%" },
            { name: "Local activation",        share: "+5%"  },
          ],
          subProcesses: [
            { id: "scan",     name: "Competitive scan",     cycle: 4.0, value: 1.0, waste: 75, verdict: "aug",  score: 11, scoreOf: 15, ai: { margin: 80, volume: 80, data: 75, error: 65, adoption: 70 }, intervention: { type: "AI augmentation", aiInput: "Market signals + share data + creative library", aiOutput: "Competitive memo + opportunity map", humanRole: "Brand manager approves.", exception: "New market entry → strategy lead." } },
            { id: "brief",    name: "Brief drafting",       cycle: 5.0, value: 1.2, waste: 76, verdict: "aug",  score: 12, scoreOf: 15, ai: { margin: 88, volume: 92, data: 80, error: 60, adoption: 75 }, intervention: { type: "AI augmentation", aiInput: "Strategy + brand guidelines + competitive memo", aiOutput: "Brief draft + KPI framework", humanRole: "Brand manager refines.", exception: "Brand-defining work → CMO." } },
            { id: "media",    name: "Media planning",       cycle: 4.5, value: 1.4, waste: 69, verdict: "aug",  score: 11, scoreOf: 15, ai: { margin: 80, volume: 78, data: 72, error: 50, adoption: 68 }, intervention: { type: "AI augmentation", aiInput: "Brief + media stack + audience model", aiOutput: "Media plan + flight schedule", humanRole: "Brand + agency partner approve.", exception: "Sponsorship → custom plan." } },
            { id: "buy",      name: "Buy execution",         cycle: 4.0, value: 0.8, waste: 80, verdict: "exc",  score: 9,  scoreOf: 15, ai: { margin: 65, volume: 70, data: 65, error: 35, adoption: 60 }, intervention: { type: "Exception handle", aiInput: "Approved plan + rate cards", aiOutput: "Buy orders + invoice match", humanRole: "Agency + finance handle.", exception: "Premium inventory → manual." } },
            { id: "synth",    name: "Post-campaign synthesis", cycle: 3.5, value: 0.8, waste: 77, verdict: "auto", score: 12, scoreOf: 15, ai: { margin: 88, volume: 90, data: 85, error: 80, adoption: 75 }, intervention: { type: "Full automation", aiInput: "Campaign data + KPIs + creative", aiOutput: "Synthesis report + learnings", humanRole: "Brand approves.", exception: "Strategic learning → portfolio review." } },
          ],
          activities: [
            { name: "Competitive scan",      subProcess: "Competitive scan",     cycleTime: "1.5d", waste: 75, volume: "~120/mo", painPoint: "Manual desk research", owner: "Human",  verdict: "aug",  score: 11, intervention: "AI synthesizes market signals.",          lever: "Brand labor",         laborPool: "$2.4M", effort: "Med", impact: "High" },
            { name: "Brief drafting",         subProcess: "Brief drafting",        cycleTime: "2.0d", waste: 76, volume: "~120/mo", painPoint: "Repeat structure",    owner: "Human",  verdict: "aug",  score: 12, intervention: "AI drafts; brand refines.",                lever: "Brand labor",         laborPool: "$3.2M", effort: "Med", impact: "High" },
            { name: "Audience modeling",       subProcess: "Media planning",        cycleTime: "1.0d", waste: 60, volume: "~120/mo", painPoint: "Disconnected data",   owner: "Hybrid", verdict: "aug",  score: 11, intervention: "AI builds audience model.",                lever: "Media efficiency",    laborPool: "$1.8M", effort: "Med", impact: "High" },
            { name: "Buy execution",           subProcess: "Buy execution",          cycleTime: "1.5d", waste: 80, volume: "~40/mo",   painPoint: "Premium inventory",   owner: "Human",  verdict: "exc",  score: 9,  intervention: "AI checks plan; agency executes.",         lever: "Media efficiency",    laborPool: "$1.0M", effort: "Med", impact: "Med"  },
            { name: "Post-campaign report",     subProcess: "Post-campaign synthesis", cycleTime: "1.5d", waste: 77, volume: "~120/mo", painPoint: "Manual synthesis",    owner: "Human",  verdict: "auto", score: 12, intervention: "AI assembles synthesis report.",           lever: "Brand labor",         laborPool: "$2.8M", effort: "Low", impact: "High" },
          ],
        },

        // ── #9 Tax research advisory (z9) — light data ──
        {
          id: "z9",
          rank: 9,
          name: "Tax research advisory — first-pass",
          function: "Finance · Tax",
          costIntensity: "$",
          poolSize: "$5M",
          variance: "1.7×",
          ebitdaLever: "Outside services",
          verdictCounts: { auto: 2, aug: 2, exc: 1, ns: 0 },
          metrics: [
            { label: "Total cycle time",  value: "9.0 days", tone: "warn" },
            { label: "Value-add time",     value: "2.1 days", tone: "good" },
            { label: "Waste ratio",         value: "77%",       tone: "bad"  },
            { label: "Volume / month",      value: "~85 inquiries" },
            { label: "FTEs involved",       value: "Outside vendor + 4 internal" },
          ],
          painPoints: [
            { name: "SOP-driven research",       severity: "High",  tone: "bad"  },
            { name: "Outside vendor markup",      severity: "$5M",   tone: "bad"  },
            { name: "Counsel review queue",       severity: "Med",   tone: "warn" },
          ],
          variations: [
            { name: "Indirect tax",         share: "+35%" },
            { name: "Transfer pricing",      share: "+25%" },
            { name: "Income tax",            share: "+20%" },
            { name: "Customs / duties",      share: "+15%" },
            { name: "Other",                 share: "+5%"  },
          ],
          subProcesses: [
            { id: "intake",  name: "Inquiry intake",        cycle: 0.5, value: 0.1, waste: 80, verdict: "auto", score: 12, scoreOf: 15, ai: { margin: 85, volume: 90, data: 85, error: 88, adoption: 80 }, intervention: { type: "Full automation", aiInput: "Question + entity + jurisdiction", aiOutput: "Routed case + tax-area label", humanRole: "Spot-check.", exception: "Litigation tied → counsel." } },
            { id: "research", name: "Research drafting",     cycle: 4.0, value: 1.0, waste: 75, verdict: "aug",  score: 12, scoreOf: 15, ai: { margin: 90, volume: 80, data: 78, error: 60, adoption: 70 }, intervention: { type: "AI augmentation", aiInput: "Tax code + rulings + entity facts", aiOutput: "Draft research memo with citations", humanRole: "Counsel signs off.", exception: "Cross-border restructure → senior counsel." } },
            { id: "memo",     name: "Memo finalization",     cycle: 2.0, value: 0.6, waste: 70, verdict: "aug",  score: 11, scoreOf: 15, ai: { margin: 80, volume: 78, data: 75, error: 55, adoption: 70 }, intervention: { type: "AI augmentation", aiInput: "Draft memo + counsel comments", aiOutput: "Polished memo + risk callouts", humanRole: "Counsel finalizes.", exception: "Material exposure → CFO review." } },
            { id: "filing",   name: "Filing / advice issue", cycle: 2.0, value: 0.3, waste: 85, verdict: "exc",  score: 8,  scoreOf: 15, ai: { margin: 60, volume: 70, data: 55, error: 30, adoption: 60 }, intervention: { type: "Exception handle", aiInput: "Final memo + filing requirements", aiOutput: "Draft filing + checklist", humanRole: "Tax ops files.", exception: "Regulated jurisdiction → local counsel." } },
            { id: "archive",  name: "Archive & SOP update",  cycle: 0.5, value: 0.1, waste: 80, verdict: "auto", score: 11, scoreOf: 15, ai: { margin: 75, volume: 85, data: 80, error: 78, adoption: 75 }, intervention: { type: "Full automation", aiInput: "Memo + outcome", aiOutput: "Archive + SOP delta", humanRole: "Tax counsel signs SOP delta.", exception: "New ruling → policy review." } },
          ],
          activities: [
            { name: "Inquiry routing",      subProcess: "Inquiry intake",        cycleTime: "0.3d", waste: 80, volume: "~85/mo", painPoint: "Manual triage",     owner: "Human",  verdict: "auto", score: 12, intervention: "AI routes by tax area + entity.",  lever: "Outside services", laborPool: "$0.2M", effort: "Low", impact: "Med"  },
            { name: "Tax research draft",    subProcess: "Research drafting",     cycleTime: "1.5d", waste: 75, volume: "~85/mo", painPoint: "Vendor markup",     owner: "Human",  verdict: "aug",  score: 12, intervention: "AI drafts; counsel signs off.",     lever: "Outside services", laborPool: "$3.6M", effort: "Med", impact: "High" },
            { name: "Memo polish",            subProcess: "Memo finalization",     cycleTime: "0.8d", waste: 70, volume: "~85/mo", painPoint: "Repeat edits",      owner: "Hybrid", verdict: "aug",  score: 11, intervention: "AI applies counsel comments.",       lever: "Tax labor",        laborPool: "$0.5M", effort: "Low", impact: "Med"  },
            { name: "Filing draft",           subProcess: "Filing / advice issue",  cycleTime: "0.8d", waste: 85, volume: "~50/mo", painPoint: "Manual prep",        owner: "Human",  verdict: "exc",  score: 8,  intervention: "AI prepares filing checklist.",      lever: "Compliance",        laborPool: "$0.3M", effort: "Med", impact: "Med"  },
            { name: "Archive update",         subProcess: "Archive & SOP update",  cycleTime: "0.2d", waste: 80, volume: "~85/mo", painPoint: "Stale archive",     owner: "System", verdict: "auto", score: 11, intervention: "AI archives + tags rulings.",         lever: "Knowledge ops",     laborPool: "$0.1M", effort: "Low", impact: "Low"  },
          ],
        },
      ],
    }
  }
};

// ── PREVIEW COMPONENTS ──

function AppTypeBadge({ type, size = "sm" }) {
  const meta = DIAGNOSTIC_APP_TYPES[type];
  if (!meta) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${meta.badge}`}>
      {getIcon(meta.icon, { size: 10 })} {meta.label}
    </span>
  );
}

// ── SHARED MARKDOWN-LITE RENDERER ──
const renderInlineMd = (str) => (str || "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

// ── ARTIFACT BLOCK (sections / bullets / tables) ──
function ArtifactBlock({ artifact, inline = false }) {
  return (
    <div className={inline ? "mt-3 border border-gray-200 rounded-xl p-5 bg-white" : ""}>
      {artifact.title && <h2 className="text-xl font-bold text-gray-900 mb-1">{artifact.title}</h2>}
      {artifact.subtitle && <div className="text-xs text-gray-500 mb-4">{artifact.subtitle}</div>}
      {artifact.intro && <p className="text-sm text-gray-700 mb-5" dangerouslySetInnerHTML={{ __html: renderInlineMd(artifact.intro) }} />}
      {(artifact.sections || []).map((s, i) => (
        <div key={i} className={i > 0 ? "mt-5" : ""}>
          {s.heading && <h3 className="text-sm font-semibold text-gray-900 mb-2 border-t border-gray-100 pt-4">{s.heading}</h3>}
          {s.body && <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInlineMd(s.body) }} />}
          {s.bullets && (
            <ul className="text-sm text-gray-700 leading-relaxed space-y-1 list-disc pl-5">
              {s.bullets.map((b, bi) => (
                <li key={bi} dangerouslySetInnerHTML={{ __html: renderInlineMd(b) }} />
              ))}
            </ul>
          )}
          {s.table && (
            <table className="w-full text-xs mt-2 border border-gray-200 rounded">
              <thead className="bg-gray-50">
                <tr>{s.table.cols.map((c, ci) => <th key={ci} className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">{c}</th>)}</tr>
              </thead>
              <tbody>
                {s.table.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-gray-100 last:border-0">
                    {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-gray-800">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

// ── PROCESS MAP ARTIFACT (chevron value chain) ──
// Convert a #hex to an rgba() with a given alpha — used to tint support
// function bar cells with the chevron colour above (very faint).
const hexToRgba = (hex, alpha) => {
  const h = (hex || "#000000").replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Cost intensity is t-shirt sized — $$$ / $$ / $. Glyph stays black for a
// clean read; weight differentiates intensity so the eye still lands on $$$
// first (bold), then $$ (semibold), then $ (normal).
const PROCESS_MAP_COST_STYLES = {
  "$$$": "text-gray-900 font-bold",
  "$$":  "text-gray-900 font-semibold",
  "$":   "text-gray-900 font-normal",
};

// Decision rights govern who owns the call on each activity. The badge is a
// small letter in the top-right corner of every activity tile, colour-coded
// for second-pass scanning.
const PROCESS_MAP_DECISION_STYLES = {
  function: { letter: "F", bg: "bg-blue-100",    text: "text-blue-700",    border: "border-blue-200",    label: "Function-led" },
  bu:       { letter: "B", bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", label: "BU-led" },
  country:  { letter: "C", bg: "bg-orange-100",  text: "text-orange-700",  border: "border-orange-200",  label: "Country/Region-led" },
};

// `embedded` skips any internal NL pane — use it when the artifact is rendered
// next to an external chat panel (the standard workspace layout).
function ProcessMapArtifact({ map, embedded = false }) {
  const cols = map.steps.length;
  const colCls = cols >= 6 ? "grid-cols-6" : cols === 5 ? "grid-cols-5" : "grid-cols-4";
  const decisions = map.decisionRights || Object.keys(PROCESS_MAP_DECISION_STYLES).map(k => ({ id: k, ...PROCESS_MAP_DECISION_STYLES[k] }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900">{map.title}</h2>
          {map.subtitle && <p className="text-xs text-gray-500 mt-1">{map.subtitle}</p>}
        </div>

        {/* Legend block — Decision Rights + Cost Intensity (right-aligned) */}
        <div className="flex flex-col items-end gap-2.5">
          <div className="flex flex-col items-end gap-1">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Decision Rights</div>
            <div className="flex items-center gap-3 flex-wrap text-[11px]">
              {decisions.map((d) => {
                const meta = PROCESS_MAP_DECISION_STYLES[d.id] || PROCESS_MAP_DECISION_STYLES.function;
                return (
                  <span key={d.id} className="inline-flex items-center gap-1.5" title={d.description || meta.label}>
                    <span className={`w-5 h-5 rounded-full border ${meta.bg} ${meta.text} ${meta.border} flex items-center justify-center text-[10px] font-bold`}>{meta.letter}</span>
                    <span className="text-gray-600">{d.label || meta.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Cost Intensity</div>
            <div className="flex items-center gap-3 text-[11px]">
              {[["$", "Low"], ["$$", "Medium"], ["$$$", "High"]].map(([sym, label]) => (
                <span key={sym} className="inline-flex items-center gap-1">
                  <span className="font-bold text-gray-800 tracking-tight">{sym}</span>
                  <span className="text-gray-500">{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUE CHAIN ── */}
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className="w-1 h-3 rounded-full bg-blue-500"></span>
        <span className="text-blue-600">Value Chain</span>
        <span className="text-gray-400 normal-case font-medium">— operations from farm to freezer</span>
      </div>

      {/* Chevron flow */}
      <div className="flex items-stretch mb-3 -ml-2">
        {map.steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === map.steps.length - 1;
          const clip = isFirst
            ? "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)"
            : isLast
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%)"
              : "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)";
          return (
            <div key={i} className="flex-1 -ml-3 first:ml-0">
              <div
                className="h-12 px-5 text-white text-[13px] font-semibold flex items-center justify-center text-center leading-tight shadow-sm"
                style={{ clipPath: clip, background: step.color }}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-activity grid — cost intensity + decision badge per tile */}
      <div className={`grid ${colCls} gap-3 mb-6`}>
        {map.steps.map((step, i) => (
          <div key={i} className="space-y-2">
            {step.activities.map((a, ai) => {
              const costCls = PROCESS_MAP_COST_STYLES[a.cost] || PROCESS_MAP_COST_STYLES["$"];
              const dMeta = PROCESS_MAP_DECISION_STYLES[a.decision] || PROCESS_MAP_DECISION_STYLES.function;
              return (
                <div
                  key={ai}
                  className="relative bg-white border border-gray-200 rounded-md px-2.5 py-2 pr-7 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                  style={{ borderTopWidth: 2, borderTopColor: step.color }}
                >
                  {/* Decision letter badge — top-right corner */}
                  <span
                    className={`absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full border ${dMeta.bg} ${dMeta.text} ${dMeta.border} flex items-center justify-center text-[10px] font-bold leading-none`}
                    title={dMeta.label}
                  >
                    {dMeta.letter}
                  </span>
                  <div className="text-xs font-medium text-gray-800 leading-snug">{a.name}</div>
                  {a.cost && (
                    <div className={`mt-1 text-sm tracking-tight leading-none ${costCls}`}>{a.cost}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── SUPPORT FUNCTIONS ── visually distinct: own tinted container, dashed
          divider above, indigo accent vs the value chain's blue accent. Each
          function is its own horizontal bar; the bar is segmented to echo the
          chevron stages above so it visually reads as "this function spans the
          full value chain". */}
      {map.sgaBand && map.sgaBand.length > 0 && (
        <div className="bg-gradient-to-b from-indigo-50/50 to-transparent border border-indigo-100 rounded-xl p-4 mb-5 mt-2 border-t-2 border-t-dashed border-t-indigo-200">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 flex-wrap">
            <span className="w-1 h-3 rounded-full bg-indigo-500"></span>
            <span className="text-indigo-700">Support Functions</span>
            <span className="text-gray-500 normal-case font-medium">— SG&amp;A operates across every stage of the value chain</span>
          </div>

          <div className="space-y-1.5">
            {map.sgaBand.map((fn, fi) => (
              <div key={fi} className="flex items-stretch gap-3">
                {/* Function label — name + cost intensity */}
                <div className="w-36 flex-shrink-0 flex items-center gap-1.5 px-1">
                  {getIcon(fn.icon || "Briefcase", { size: 13, className: "text-indigo-600" })}
                  <span className="text-xs font-semibold text-gray-800">{fn.name}</span>
                  {fn.costIntensity && (
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight">{fn.costIntensity}</span>
                  )}
                </div>
                <div className="flex-1 flex items-stretch rounded-md overflow-hidden bg-white border border-gray-200 shadow-sm">
                  {map.steps.map((step, si) => (
                    <div
                      key={si}
                      className="flex-1 border-r border-white last:border-r-0 transition-all hover:brightness-95 cursor-pointer min-h-[28px] flex items-center justify-center px-2 py-1.5"
                      style={{ background: hexToRgba(step.color, 0.16) }}
                      title={`${fn.name} — ${step.name}`}
                    >
                      <span className="text-[10px] text-gray-700 font-medium leading-tight text-center truncate" title={fn.subFns?.[si] || ""}>
                        {fn.subFns?.[si] || ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer source attribution */}
      {map.source && (
        <div className="text-[11px] text-gray-400 italic mt-2 border-t border-gray-100 pt-3">
          {map.source}
        </div>
      )}
    </div>
  );
}

// ── FUNCTION DISCOVERY ARTIFACT (Activity & Driver Mapping) ──
// Bottom-up discovery: every activity is generated from real records (vendor
// lines, HRIS, SOPs) — never from a pre-baked taxonomy. Two view modes:
//   1. Function discovery — process-map carry-over + grid of function cards
//   2. Function deep dive — list builder with 3 tabs (Combined / Vendor / FTE)

const CONFIDENCE_STYLES = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Med:  "bg-amber-50 text-amber-700 border-amber-100",
  Low:  "bg-red-50 text-red-700 border-red-100",
};

function MiniChevronStrip({ steps }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="flex items-stretch -ml-1 mb-4">
      {steps.map((step, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;
        const clip = isFirst
          ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
          : isLast
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)"
            : "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)";
        return (
          <div key={i} className="flex-1 -ml-2 first:ml-0">
            <div
              className="h-7 px-3 text-white text-[11px] font-semibold flex items-center justify-center text-center leading-tight"
              style={{ clipPath: clip, background: step.color, opacity: 0.85 }}
            >
              {step.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FunctionCard({ fn, onOpen, compact = false }) {
  return (
    <div
      onClick={onOpen ? () => onOpen(fn) : undefined}
      className={`bg-white border border-gray-200 rounded-xl p-5 transition-all ${onOpen ? "hover:border-blue-300 hover:shadow-md cursor-pointer" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-900">{fn.name} — discovery synthesis</h3>
          <p className="text-xs text-gray-500 mt-0.5">{fn.ingested}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {fn.lastRefreshed && (
            <span className="text-[10px] text-gray-400 whitespace-nowrap">last refreshed {fn.lastRefreshed}</span>
          )}
          {onOpen && !compact && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(fn); }}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              Open list builder {getIcon("ArrowUpRight", { size: 12 })}
            </button>
          )}
        </div>
      </div>

      {/* Stat boxes */}
      {fn.stats && fn.stats.length > 0 && (
        <div className={`grid gap-2 mb-3 ${fn.stats.length === 5 ? "grid-cols-5" : fn.stats.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
          {fn.stats.map((s, i) => (
            <div key={i} className="bg-amber-50/40 border border-amber-100 rounded-lg p-2.5">
              <div className="text-[10px] text-gray-500 mb-0.5">{s.label}</div>
              <div className="text-lg font-bold text-gray-900 leading-tight">{s.value}</div>
              {s.sub && <div className="text-[10px] text-gray-500 mt-1 leading-tight">{s.sub}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Synthesis line */}
      {fn.synthesis && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
          <div className="text-xs text-blue-900 leading-relaxed">
            <span className="font-semibold">Synthesis: </span>{fn.synthesis}
          </div>
        </div>
      )}
    </div>
  );
}

// Deep dive — opens when a function card is clicked. List builder with three
// tabs that share the discovery synthesis card on top.
function FunctionDeepDive({ fn, onBack, mode = "spend" }) {
  const isClass = mode === "classification";
  const [activeTab, setActiveTab] = React.useState("master");
  const [selectedCell, setSelectedCell] = React.useState(null);

  // Vendor rows
  const vendorRows = (fn.vendor?.rows || []).map((r, i) => ({
    rowNum: i + 1,
    cells: isClass
      ? [r.number, r.name, r.costCenter, r.glCode, r.costElement, r.spend, r.activity, r.aiClass || "—", r.confirmed ? "Confirmed" : "Pending", r.statutory || "—"]
      : [r.number, r.name, r.costCenter, r.glCode, r.costElement, r.spend, r.activity, r.conf],
  }));
  const vendorCols = isClass
    ? ["Supplier #", "Vendor Name", "Cost Center", "GL Code", "Cost Element", "Spend ($)", "→ Activity", "AI Class", "Status", "Statutory"]
    : ["Supplier #", "Vendor Name", "Cost Center", "GL Code", "Cost Element", "Spend Amount ($)", "Vendor Description"];

  // HRIS rows
  const hrisRows = (fn.fte?.rows || []).map((r, i) => ({
    rowNum: i + 1,
    cells: isClass
      ? [r.id, r.role, r.jobFamily, r.costCenter, r.region, r.fte, r.loaded, r.primaryActivity, r.aiClass || "—", r.confirmed ? "Confirmed" : "Pending", r.statutory || "—"]
      : [r.id, r.role, r.jobFamily, r.costCenter, r.region, r.fte, r.loaded, r.primaryActivity, r.conf],
  }));
  const hrisCols = isClass
    ? ["Employee ID", "Role", "Job Family", "Cost Center", "Region", "FTE", "Loaded $", "→ Primary Activity", "AI Class", "Status", "Statutory"]
    : ["Employee ID", "Role", "Job Family", "Cost Center", "Region", "FTE", "Loaded $", "→ Primary Activity", "Conf"];

  // Activity rows
  const activityRows = (fn.combined?.activities || []).map((a, i) => ({
    rowNum: i + 1,
    cells: isClass
      ? [a.name, a.subFn, a.spend || `${a.labor} + ${a.nonLabor}`, a.aiClass || "—", a.confirmed ? "Confirmed" : "Pending", a.reason || "—", a.statutory || "—"]
      : [a.name, a.subFn, a.labor, a.nonLabor, a.driver, a.volume, a.unitCost, a.conf],
  }));
  const activityCols = isClass
    ? ["Activity", "Sub-fn", "Spend", "AI Class", "Status", "Reason", "Statutory"]
    : ["Activity", "Sub-fn", "Labor $", "Non-labor $", "Driver", "Volume", "Unit $", "Conf"];

  // Extract total counts from footer strings ("6 of 84 vendors shown" → "84")
  const vendorTotal  = (fn.vendor?.footer || "").match(/of (\d+)/)?.[1] || vendorRows.length;
  const hrisTotal    = (fn.fte?.footer    || "").match(/of (\d+)/)?.[1] || hrisRows.length;
  const activityStat = (fn.stats || []).find(s => s.label === "Activities found");
  const activityTotal = activityStat ? activityStat.value : activityRows.length;

  const sheetTabs = [
    { id: "master",     label: "Master",              count: vendorTotal,    rows: vendorRows,   cols: vendorCols   },
    { id: "hris",       label: "HRIS Records",         count: hrisTotal,      rows: hrisRows,     cols: hrisCols     },
    { id: "activities", label: "Activities",            count: activityTotal,  rows: activityRows, cols: activityCols },
    { id: "spend-cc",   label: "Spend by Cost Center", count: "—",            rows: [],           cols: []           },
    { id: "col-map",    label: "Column Mapping",        count: "16",           rows: [],           cols: []           },
  ];

  const currentTab = sheetTabs.find(t => t.id === activeTab) || sheetTabs[0];
  const rows = currentTab.rows || [];
  const cols = currentTab.cols || vendorCols;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Top bar */}
      <div className="px-5 py-2.5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors flex-shrink-0">
            {getIcon("ChevronUp", { size: 12, className: "rotate-[-90deg]" })} Back
          </button>
          <span className="text-gray-300">|</span>
          <div className="text-sm font-semibold text-gray-900 truncate">
            {fn.name} — {isClass ? "Cost Classification" : "Vendor Enrichment"}
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-600 transition-colors">
          {getIcon("ArrowDownRight", { size: 14 })}
        </button>
      </div>

      {/* Formula bar */}
      <div className="px-3 py-1.5 border-b border-gray-200 flex items-center gap-2 bg-gray-50 flex-shrink-0">
        <div className="w-14 border border-gray-300 rounded px-2 py-0.5 text-xs text-gray-600 font-mono bg-white text-center select-none">--</div>
        <span className="text-gray-300 select-none text-sm">|</span>
        <span className="text-xs text-gray-500 font-mono select-none">fx</span>
        <div className="flex-1 border border-gray-300 rounded px-3 py-0.5 text-xs bg-white leading-5 truncate select-none text-gray-400">
          {selectedCell !== null ? String(selectedCell) : "Select a cell to see its value"}
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">{getIcon("ChevronDown", { size: 13 })}</button>
        <button onClick={() => setSelectedCell(null)} className="text-gray-400 hover:text-gray-600 transition-colors">{getIcon("X", { size: 13 })}</button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        {rows.length > 0 ? (
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="w-8 px-2 py-2 border-r border-gray-200 font-normal text-gray-400 text-center" />
                {cols.map((col, i) => (
                  <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600 border-r border-gray-100 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 hover:bg-blue-50/20 transition-colors">
                  <td className="w-8 px-2 py-2 text-right text-[10px] text-gray-400 border-r border-gray-200 bg-gray-50 select-none">
                    {row.rowNum}
                  </td>
                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      onClick={() => setSelectedCell(cell)}
                      className={`px-3 py-2 border-r border-gray-100 whitespace-nowrap cursor-default transition-colors ${
                        selectedCell === cell ? "bg-blue-50 text-blue-900" : "text-gray-800"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-4 py-12 text-center text-xs text-gray-400 italic">
            No records loaded for this view yet.
          </div>
        )}
      </div>

      {/* Footer: sheet nav arrows + tabs */}
      <div className="border-t border-gray-200 flex items-stretch flex-shrink-0 bg-gray-50 min-h-[34px]">
        <div className="flex items-center gap-0 px-1.5 border-r border-gray-200">
          {["◄◄", "◄", "►", "►►"].map((arrow, i) => (
            <button key={i} className="w-6 h-6 flex items-center justify-center text-[11px] text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors">
              {arrow}
            </button>
          ))}
        </div>
        <div className="flex items-stretch overflow-x-auto flex-1 scrollbar-thin">
          {sheetTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-shrink-0 text-xs px-4 border-r border-gray-200 transition-colors whitespace-nowrap flex items-center gap-1 ${
                activeTab === t.id
                  ? "bg-white text-blue-700 font-semibold border-t-2 border-t-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {t.label}
              <span className="text-gray-400 font-normal">({t.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Small visual helpers used in the classification list views — sparkles +
// tint signal "this column was AI-enriched"; classification badge colours
// the row by Non-discretionary / Discretionary / Strategic.
function AiHeader({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-blue-600">
      {getIcon("Sparkles", { size: 9 })} {children}
    </span>
  );
}
function ClassificationBadge({ value }) {
  const meta = CLASSIFICATION_STYLES[value] || { tone: "bg-gray-50 text-gray-600 border-gray-200", label: value };
  return <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${meta.tone}`}>{meta.label}</span>;
}
function ConfirmedPill({ confirmed }) {
  return confirmed
    ? <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700">{getIcon("CheckCircle", { size: 11 })} Confirmed</span>
    : <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 italic">{getIcon("Clock", { size: 11 })} Pending</span>;
}
function StatutoryChip({ value }) {
  if (!value) return <span className="text-gray-300">—</span>;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">
      {getIcon("Shield", { size: 10 })} {value}
    </span>
  );
}

function FunctionCombinedTab({ fn, mode = "spend" }) {
  const data = fn.combined || { activities: [] };
  const isClass = mode === "classification";
  // AI-enriched columns get a subtle blue tint header so the row reads as
  // "this is what the AI proposed" — the rest stays neutral.
  const aiTint = "bg-blue-50/60";
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">{isClass ? "Activity-level classification" : "Activity grid"}</div>
        {isClass ? (
          <div className="text-[11px] text-blue-600 inline-flex items-center gap-1">
            {getIcon("Sparkles", { size: 11 })} AI-suggested fields are tinted; reason field carries the consultant's rationale
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {["Grid", "Bubble", "Driver flow"].map((v, i) => (
              <button key={v} className={`text-[11px] px-2 py-1 rounded-md ${i === 0 ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-500 hover:bg-gray-50"}`}>{v}</button>
            ))}
          </div>
        )}
      </div>
      {data.activities.length > 0 ? (
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            {isClass ? (
              <tr className="border-b border-gray-200 text-[10px] text-gray-500 uppercase">
                <th className="text-left  px-3 py-2 font-medium">Activity</th>
                <th className="text-left  px-3 py-2 font-medium">Sub-fn</th>
                <th className="text-right px-3 py-2 font-medium">Spend</th>
                <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>AI Class</AiHeader></th>
                <th className="text-left  px-3 py-2 font-medium">Status</th>
                <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>Reason</AiHeader></th>
                <th className="text-left  px-3 py-2 font-medium">Statutory</th>
              </tr>
            ) : (
              <tr className="border-b border-gray-200 text-[10px] text-gray-500 uppercase">
                <th className="text-left  px-3 py-2 font-medium">Activity</th>
                <th className="text-left  px-3 py-2 font-medium">Sub-fn</th>
                <th className="text-right px-3 py-2 font-medium">Labor $</th>
                <th className="text-right px-3 py-2 font-medium">Non-labor $</th>
                <th className="text-left  px-3 py-2 font-medium">Driver</th>
                <th className="text-right px-3 py-2 font-medium">Volume</th>
                <th className="text-right px-3 py-2 font-medium">Unit $</th>
                <th className="text-center px-3 py-2 font-medium">Conf</th>
              </tr>
            )}
          </thead>
          <tbody>
            {data.activities.map((a, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 cursor-pointer">
                <td className="px-3 py-2.5 font-medium text-gray-900">{a.name}</td>
                <td className="px-3 py-2.5 text-gray-700">{a.subFn}</td>
                {isClass ? (
                  <>
                    <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.spend}</td>
                    <td className={`px-3 py-2.5 ${aiTint}`}><ClassificationBadge value={a.aiClass} /></td>
                    <td className="px-3 py-2.5"><ConfirmedPill confirmed={a.confirmed} /></td>
                    <td className={`px-3 py-2.5 text-gray-700 ${aiTint}`}><span className="block max-w-[260px] leading-snug" title={a.reason}>{a.reason || <span className="text-amber-700 italic">Reason required</span>}</span></td>
                    <td className="px-3 py-2.5"><StatutoryChip value={a.statutory} /></td>
                  </>
                ) : (
                  <>
                    <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.labor}</td>
                    <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.nonLabor}</td>
                    <td className="px-3 py-2.5 text-gray-700">{a.driver}{a.lowConf ? "*" : ""}</td>
                    <td className="px-3 py-2.5 text-right text-gray-800">{a.volume}</td>
                    <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.unitCost}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[a.conf] || CONFIDENCE_STYLES.Med}`}>{a.conf}</span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-4 py-10 text-center text-xs text-gray-400">
          {isClass
            ? `No classifications yet for ${fn.name}. Ask AI ZBO on the left to run a first pass; consultant signs off.`
            : `Activity grid not yet populated for this function. Ask AI ZBO on the left to run discovery.`}
        </div>
      )}
      {data.footer && (
        <div className="px-4 py-2 border-t border-gray-100 text-[11px] text-gray-500">{data.footer}</div>
      )}
    </div>
  );
}

function FunctionVendorTab({ fn, mode = "spend" }) {
  const data = fn.vendor || { rows: [] };
  const isClass = mode === "classification";
  const aiTint = "bg-blue-50/60";
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Vendor enrichment → activity assignment</div>
        <div className="text-[11px] text-blue-600 inline-flex items-center gap-1">
          {getIcon("Sparkles", { size: 11 })} AI-suggested fields tinted · Cost Center · GL Code · Cost Element drive the inference
        </div>
      </div>
      {data.rows.length > 0 ? (
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-[10px] text-gray-500 uppercase">
              <th className="text-left  px-3 py-2 font-medium">Vendor #</th>
              <th className="text-left  px-3 py-2 font-medium">Vendor Name</th>
              <th className="text-left  px-3 py-2 font-medium">Cost Center</th>
              <th className="text-left  px-3 py-2 font-medium">GL Code</th>
              <th className="text-left  px-3 py-2 font-medium">Cost Element</th>
              <th className="text-right px-3 py-2 font-medium">Spend</th>
              <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>→ Activity</AiHeader></th>
              {isClass && <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>AI Class</AiHeader></th>}
              {isClass && <th className="text-left px-3 py-2 font-medium">Status</th>}
              {isClass && <th className="text-left px-3 py-2 font-medium">Statutory</th>}
              {!isClass && <th className="text-center px-3 py-2 font-medium">Conf</th>}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 cursor-pointer">
                <td className="px-3 py-2.5 text-gray-500 font-mono">{r.number}</td>
                <td className="px-3 py-2.5 font-medium text-gray-900">{r.name}</td>
                <td className="px-3 py-2.5 text-gray-700">{r.costCenter || r.region}</td>
                <td className="px-3 py-2.5 text-gray-500 font-mono">{r.glCode || "—"}</td>
                <td className="px-3 py-2.5 text-gray-700">{r.costElement || r.classification || "—"}</td>
                <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{r.spend}</td>
                <td className={`px-3 py-2.5 text-blue-700 font-medium ${aiTint}`}>{r.activity}</td>
                {isClass && <td className={`px-3 py-2.5 ${aiTint}`}><ClassificationBadge value={r.aiClass} /></td>}
                {isClass && <td className="px-3 py-2.5"><ConfirmedPill confirmed={r.confirmed} /></td>}
                {isClass && <td className="px-3 py-2.5"><StatutoryChip value={r.statutory} /></td>}
                {!isClass && (
                  <td className="px-3 py-2.5 text-center">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[r.conf] || CONFIDENCE_STYLES.Med}`}>{r.conf}</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-4 py-10 text-center text-xs text-gray-400">
          Vendor records ingested but not yet enriched. Ask AI ZBO to classify the {fn.name} vendor pool.
        </div>
      )}
      {data.footer && (
        <div className="px-4 py-2 border-t border-gray-100 text-[11px] text-gray-500">{data.footer}</div>
      )}
    </div>
  );
}

function FunctionFteTab({ fn, mode = "spend" }) {
  const data = fn.fte || { rows: [] };
  const isClass = mode === "classification";
  const aiTint = "bg-blue-50/60";
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">HRIS census → activity estimate</div>
        <div className="text-[11px] text-blue-600 inline-flex items-center gap-1">
          {getIcon("Sparkles", { size: 11 })} AI-suggested fields tinted · Job Family + Cost Center drive the inference
        </div>
      </div>
      {data.rows.length > 0 ? (
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-[10px] text-gray-500 uppercase">
              <th className="text-left  px-3 py-2 font-medium">Employee ID</th>
              <th className="text-left  px-3 py-2 font-medium">Role</th>
              <th className="text-left  px-3 py-2 font-medium">Job Family</th>
              <th className="text-left  px-3 py-2 font-medium">Cost Center</th>
              <th className="text-left  px-3 py-2 font-medium">Region</th>
              <th className="text-right px-3 py-2 font-medium">FTE</th>
              <th className="text-right px-3 py-2 font-medium">Loaded $</th>
              <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>→ Primary Activity</AiHeader></th>
              {isClass && <th className={`text-left px-3 py-2 font-medium ${aiTint}`}><AiHeader>AI Class</AiHeader></th>}
              {isClass && <th className="text-left px-3 py-2 font-medium">Status</th>}
              {isClass && <th className="text-left px-3 py-2 font-medium">Statutory</th>}
              {!isClass && <th className="text-center px-3 py-2 font-medium">Conf</th>}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 cursor-pointer">
                <td className="px-3 py-2.5 text-gray-500 font-mono">{r.id}</td>
                <td className="px-3 py-2.5 font-medium text-gray-900">{r.role}</td>
                <td className="px-3 py-2.5 text-gray-700">{r.jobFamily || "—"}</td>
                <td className="px-3 py-2.5 text-gray-700">{r.costCenter || "—"}</td>
                <td className="px-3 py-2.5 text-gray-700">{r.region}</td>
                <td className="px-3 py-2.5 text-right text-gray-800">{r.fte}</td>
                <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{r.loaded}</td>
                <td className={`px-3 py-2.5 text-blue-700 font-medium ${aiTint}`}>{r.primaryActivity}</td>
                {isClass && <td className={`px-3 py-2.5 ${aiTint}`}><ClassificationBadge value={r.aiClass} /></td>}
                {isClass && <td className="px-3 py-2.5"><ConfirmedPill confirmed={r.confirmed} /></td>}
                {isClass && <td className="px-3 py-2.5"><StatutoryChip value={r.statutory} /></td>}
                {!isClass && (
                  <td className="px-3 py-2.5 text-center">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[r.conf] || CONFIDENCE_STYLES.Med}`}>{r.conf}</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-4 py-10 text-center text-xs text-gray-400">
          HRIS records ingested but not yet enriched. Ask AI ZBO to estimate activity allocation for {fn.name}.
        </div>
      )}
      {data.footer && (
        <div className="px-4 py-2 border-t border-gray-100 text-[11px] text-gray-500">{data.footer}</div>
      )}
    </div>
  );
}

function FunctionDiscoveryArtifact({ data }) {
  const [selectedFn, setSelectedFn] = React.useState(null);

  if (selectedFn) {
    // Deep dive uses the full pane; ContentPanel container already gives us flex
    return <FunctionDeepDive fn={selectedFn} onBack={() => setSelectedFn(null)} />;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
      <div className="p-6">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
          {data.subtitle && <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>}
        </div>

        {/* Process map carry-over — value-chain context above the function cards */}
        {data.chevronStrip && <MiniChevronStrip steps={data.chevronStrip} />}

        {/* Function cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {(data.functions || []).map((fn) => (
            <FunctionCard key={fn.id} fn={fn} onOpen={setSelectedFn} />
          ))}
        </div>

        {/* Footer source */}
        {data.source && (
          <div className="text-[11px] text-gray-400 italic mt-4 border-t border-gray-100 pt-3">{data.source}</div>
        )}
      </div>
    </div>
  );
}

// ── DASHBOARD ARTIFACT ──
// A new app type: a series of widgets laid out together. Top tabs select a
// pivot (e.g., value-chain stage or SG&A); within a tab, widgets render and
// "More" on a widget routes into a chat / artifact / list workspace. This
// implementation drives Activity & Driver Mapping with five value-chain
// stages and an SG&A tab (the marquee).

function MetricCard({ card }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-1 w-full" style={{ background: card.color || "#3b82f6" }} />
      <div className="p-3">
        <div className="text-xs font-semibold text-gray-500">{card.name}</div>
        <div className="text-2xl font-bold text-gray-900 mt-1 leading-none">{card.spend}</div>
        {card.driver && (
          <div className="text-[11px] text-gray-500 mt-1.5 leading-tight">
            <span className="font-semibold text-gray-700">{card.driver}</span> <span className="text-gray-400">Activity Driver</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SpendHighlightsCard({ title, headerSubtitle, cards = [], keyTakeaways = [], onMore }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {onMore && (
          <button onClick={onMore} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 flex-shrink-0">
            Open list builder {getIcon("ArrowUpRight", { size: 12 })}
          </button>
        )}
      </div>
      <div className="border-b-2 border-blue-500 w-full mb-3" />
      {headerSubtitle && (
        <div className="text-sm text-gray-600 mb-4">{headerSubtitle}</div>
      )}

      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {cards.map((c, i) => <MetricCard key={i} card={c} />)}
        </div>
      )}

      {keyTakeaways.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-sm font-semibold text-gray-900 mb-2">Key Takeaways</div>
          <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-4">
            {keyTakeaways.map((t, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: renderInlineMd(t) }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Classification mix → CSS class for the small dot before the label.
const CLASSIFICATION_STYLES = {
  "non-discretionary": { dot: "#dc2626", label: "Non-discretionary", tone: "bg-red-50 text-red-700 border-red-200" },
  "discretionary":     { dot: "#f59e0b", label: "Discretionary",     tone: "bg-amber-50 text-amber-700 border-amber-200" },
  "strategic":         { dot: "#10b981", label: "Strategic",          tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

// Classification summary card. Three large mix tiles, a per-sub-function
// stacked bar, a status row (% confirmed · statutory auto-flags), and key
// takeaways. Renders inside SgaTabContent when summaryMode === "classification".
function ClassificationSummaryCard({ fn, onMore }) {
  const c = fn.classification || { mix: [], bySubFn: [], keyTakeaways: [] };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-bold text-gray-900">Cost Classification — {fn.name}</h3>
        {onMore && (
          <button onClick={onMore} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 flex-shrink-0">
            Open list builder {getIcon("ArrowUpRight", { size: 12 })}
          </button>
        )}
      </div>
      <div className="border-b-2 border-blue-500 w-full mb-4" />

      {/* Mix tiles — three big classification cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {c.mix.map((m, i) => (
          <div key={i} className="bg-white border-2 rounded-lg p-3" style={{ borderColor: m.color }}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide truncate">{m.label}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 leading-none">{m.spend}</div>
            <div className="text-[11px] text-gray-500 mt-1">{m.pct}% · {m.count} item{m.count === 1 ? "" : "s"}</div>
            {m.desc && <div className="text-[10px] text-gray-400 mt-1.5 leading-tight">{m.desc}</div>}
          </div>
        ))}
      </div>

      {/* Stacked bar by sub-function */}
      {c.bySubFn && c.bySubFn.length > 0 && (
        <div className="mb-5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Mix by sub-function</div>
          <div className="space-y-1.5">
            {c.bySubFn.map((sf, i) => {
              const total = (sf.nonDisc || 0) + (sf.disc || 0) + (sf.strategic || 0);
              if (total === 0) return null;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-32 text-xs text-gray-700 truncate flex-shrink-0" title={sf.name}>{sf.name}</div>
                  <div className="flex-1 flex h-5 rounded overflow-hidden border border-gray-200 bg-gray-100">
                    {sf.nonDisc  > 0 && <div style={{ width: `${(sf.nonDisc  / total) * 100}%`, background: c.mix[0]?.color || "#dc2626" }} title={`Non-discretionary $${sf.nonDisc.toFixed(1)}M`} />}
                    {sf.disc     > 0 && <div style={{ width: `${(sf.disc     / total) * 100}%`, background: c.mix[1]?.color || "#f59e0b" }} title={`Discretionary $${sf.disc.toFixed(1)}M`} />}
                    {sf.strategic> 0 && <div style={{ width: `${(sf.strategic/ total) * 100}%`, background: c.mix[2]?.color || "#10b981" }} title={`Strategic $${sf.strategic.toFixed(1)}M`} />}
                  </div>
                  <div className="w-14 text-right text-xs text-gray-700 flex-shrink-0 font-medium">${total.toFixed(1)}M</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status row */}
      <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs flex-wrap">
        <span className="text-gray-700">
          <span className="font-semibold text-emerald-700">{c.confirmedRate}%</span> human-confirmed
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-700">
          <span className="font-semibold text-amber-700">{c.pendingCount ?? (100 - (c.confirmedRate || 0))}%</span> pending sign-off
        </span>
        <span className="text-gray-300">·</span>
        <span className="inline-flex items-center gap-1 text-gray-700">
          <span className="font-semibold text-red-700">{c.statutoryCount || 0}</span> statutory auto-flag{(c.statutoryCount || 0) === 1 ? "" : "s"}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-blue-600">
          {getIcon("Sparkles", { size: 11 })} AI suggestions on every row
        </span>
      </div>

      {c.keyTakeaways && c.keyTakeaways.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-sm font-semibold text-gray-900 mb-2">Key Takeaways</div>
          <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-4">
            {c.keyTakeaways.map((t, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: renderInlineMd(t) }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DashboardTabBar({ tabs, active, onSelect }) {
  return (
    <div className="flex items-center gap-1 border-b border-gray-200 mb-5 overflow-x-auto scrollbar-thin">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              isActive
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
            style={isActive ? { borderBottomColor: t.color || "#2563eb" } : undefined}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function SgaTabContent({ sga, onOpenFn, summaryMode = "spend" }) {
  // Sort the rail by total spend (largest first). Legal is the marquee on
  // entry across both Activity & Driver Mapping and Cost Classification.
  const sorted = [...(sga.functions || [])].sort((a, b) => (b.totalSpendNum || 0) - (a.totalSpendNum || 0));
  const [activeId, setActiveId] = React.useState("legal");
  const active = sga.functions.find(f => f.id === activeId) || sorted[0];

  if (!active) return null;

  return (
    <div className="flex gap-4">
      {/* Left rail — function boxes stacked, sorted by spend */}
      <div className="w-56 flex-shrink-0 space-y-2">
        {sorted.map((fn) => {
          const isActive = activeId === fn.id;
          return (
            <button
              key={fn.id}
              onClick={() => setActiveId(fn.id)}
              className={`w-full text-left bg-white border rounded-lg px-3 py-2.5 transition-all ${
                isActive
                  ? "border-blue-500 shadow-sm bg-blue-50/40"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className={`text-sm font-semibold ${isActive ? "text-blue-700" : "text-gray-900"}`}>{fn.name}</div>
              <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{fn.railSummary || ""}</div>
            </button>
          );
        })}
      </div>

      {/* Right detail — card switches on summaryMode */}
      <div className="flex-1 min-w-0">
        {summaryMode === "classification" ? (
          <ClassificationSummaryCard fn={active} onMore={() => onOpenFn(active)} />
        ) : (
          <FunctionCard fn={active} onOpen={() => onOpenFn(active)} />
        )}
      </div>
    </div>
  );
}

function ValueChainTabContent({ stage }) {
  if (!stage) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
        Discovery in progress for this stage.
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="text-base font-bold text-gray-900 mb-1">{stage.headline}</div>
      <div className="border-b-2 border-blue-500 w-full mb-3" />
      <div className="text-sm text-gray-600 mb-4">{stage.note}</div>
      {stage.cards && stage.cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stage.cards.map((c, i) => <MetricCard key={i} card={c} />)}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-6 text-center text-xs text-gray-400">
          Activity grid will render here once the bottom-up pull completes for this stage.
        </div>
      )}
    </div>
  );
}

function DashboardArtifact({ data }) {
  const [openFn, setOpenFn] = React.useState(null);
  const defaultTab = (data.tabs || []).find((t) => t.default)?.id || (data.tabs && data.tabs[0]?.id) || "sga";
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const summaryMode = data.summaryMode || "spend";

  if (openFn) {
    return <FunctionDeepDive fn={openFn} onBack={() => setOpenFn(null)} mode={summaryMode} />;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
      <div className="p-6">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
          {data.subtitle && <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>}
        </div>

        <DashboardTabBar tabs={data.tabs || []} active={activeTab} onSelect={setActiveTab} />

        {activeTab === "sga"
          ? <SgaTabContent sga={data.sga || { functions: [] }} onOpenFn={setOpenFn} summaryMode={summaryMode} />
          : <ValueChainTabContent stage={(data.valueChain || {})[activeTab]} />}

        {data.source && (
          <div className="text-[11px] text-gray-400 italic mt-5 border-t border-gray-100 pt-3">{data.source}</div>
        )}
      </div>
    </div>
  );
}

// ── PRIORITIZATION ARTIFACT (Opportunity Prioritization) ──
// Distils the diagnostic into a shortlist of priority zones. Three primitives
// drive the page: a scatter plot (cost × variance, sized by discretionary
// share, coloured by owner), a ranked shortlist with sizing ranges, and a
// deprioritized rollup at the bottom with a reason category. Filters re-rank
// the visible set without changing the underlying data.

const OWNER_COLORS = {
  function: { fill: "#3b82f6", label: "F-led",          tone: "bg-blue-50 text-blue-700 border-blue-200" },
  bu:       { fill: "#10b981", label: "BU-led",          tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  country:  { fill: "#f97316", label: "Country/Region",  tone: "bg-orange-50 text-orange-700 border-orange-200" },
};

function FilterBar({ filters, options, onChange }) {
  const dropdown = (label, key, opts) => (
    <label className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 uppercase tracking-wider text-[10px] font-semibold">{label}</span>
      <select
        value={filters[key]}
        onChange={(e) => onChange({ ...filters, [key]: e.target.value })}
        className="bg-white border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
  return (
    <div className="flex items-center gap-3 flex-wrap mb-4 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
      <span className="text-[11px] text-gray-500">Filters</span>
      {dropdown("Region",   "region",   options.regions)}
      {dropdown("BU",       "bu",       options.bus)}
      {dropdown("Function", "function", options.functions)}
      <div className="ml-auto text-[11px] text-gray-500 italic">Filters re-rank the shortlist; underlying data does not change.</div>
    </div>
  );
}

// Scatter plot: cost ($M) × variance multiplier · bubble size = discretionary
// share · bubble fill = owner type. Hover tooltip is plain title text so it
// works without extra JS state.
function PriorityScatter({ zones, hoverId, onHover }) {
  const W = 560, H = 320;
  const padL = 56, padR = 18, padT = 16, padB = 42;
  const pw = W - padL - padR;
  const ph = H - padT - padB;
  const xMax = 100;        // $M axis upper bound
  const yMin = 1, yMax = 6; // variance range
  const xTo = (v) => padL + Math.min(v, xMax) / xMax * pw;
  const yTo = (v) => padT + ph - (Math.min(Math.max(v, yMin), yMax) - yMin) / (yMax - yMin) * ph;
  const rOf = (pct) => 6 + (pct / 100) * 14;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-sm font-semibold text-gray-900">Cost × Variance</div>
          <div className="text-[11px] text-gray-500">Bubble size = discretionary share · colour = owner type</div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {Object.entries(OWNER_COLORS).map(([k, m]) => (
            <span key={k} className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.fill }} />
              <span className="text-gray-600">{m.label}</span>
            </span>
          ))}
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="select-none">
        {/* Y-axis grid + labels (variance) */}
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <g key={v}>
            <line x1={padL} y1={yTo(v)} x2={W - padR} y2={yTo(v)} stroke="#f3f4f6" strokeWidth="1" />
            <text x={padL - 8} y={yTo(v) + 3} fontSize="10" textAnchor="end" fill="#9ca3af">{v}×</text>
          </g>
        ))}
        {/* X-axis grid + labels (cost $M) */}
        {[0, 20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1={xTo(v)} y1={padT} x2={xTo(v)} y2={H - padB} stroke="#f9fafb" strokeWidth="1" />
            <text x={xTo(v)} y={H - padB + 14} fontSize="10" textAnchor="middle" fill="#9ca3af">${v}M</text>
          </g>
        ))}
        {/* Axis titles */}
        <text x={padL + pw / 2} y={H - 6} fontSize="10" textAnchor="middle" fill="#6b7280" fontWeight="600">Pool size ($M)</text>
        <text x={14} y={padT + ph / 2} fontSize="10" textAnchor="middle" fill="#6b7280" fontWeight="600" transform={`rotate(-90, 14, ${padT + ph / 2})`}>Variance (×)</text>
        {/* Bubbles */}
        {zones.map((z) => {
          const m = OWNER_COLORS[z.owner] || OWNER_COLORS.function;
          const r = rOf(z.discretionaryShare);
          const isHover = hoverId === z.id;
          return (
            <g
              key={z.id}
              onMouseEnter={() => onHover && onHover(z.id)}
              onMouseLeave={() => onHover && onHover(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={xTo(z.cost)} cy={yTo(z.variance)} r={r}
                fill={m.fill}
                fillOpacity={isHover ? 0.95 : 0.55}
                stroke={z.strategicRisk ? "#dc2626" : m.fill}
                strokeWidth={z.strategicRisk ? 2 : 1}
              />
              <title>{`#${z.rank} ${z.name} — ${z.costLabel} · ${z.variance}× · ${z.discretionaryShare}% disc · ${m.label}${z.strategicRisk ? " · Strategic warning" : ""}`}</title>
              <text x={xTo(z.cost)} y={yTo(z.variance) + 3} fontSize="10" fontWeight="700" textAnchor="middle" fill="white">{z.rank}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RankedShortlist({ zones, hoverId, onHover }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Top {zones.length} priority zones</div>
        <div className="text-[11px] text-gray-500">ranked by composite score · sized in $M</div>
      </div>
      {zones.length === 0 ? (
        <div className="px-4 py-10 text-center text-xs text-gray-400">No zones match the current filter.</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {zones.map((z) => {
            const m = OWNER_COLORS[z.owner] || OWNER_COLORS.function;
            return (
              <div
                key={z.id}
                onMouseEnter={() => onHover && onHover(z.id)}
                onMouseLeave={() => onHover && onHover(null)}
                className={`px-4 py-3 transition-colors cursor-pointer ${hoverId === z.id ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{z.rank}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{z.name}</span>
                      {z.strategicRisk && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">
                          {getIcon("AlertTriangle", { size: 10 })} Strategic — cut with care
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-[11px] text-gray-500 mt-0.5">
                      <span>{z.function}</span>
                      <span className="text-gray-300">·</span>
                      <span>{z.region}</span>
                      <span className="text-gray-300">·</span>
                      <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border ${m.tone}`}>{m.label}</span>
                      <span className="text-gray-300">·</span>
                      <span><span className="font-semibold text-gray-700">{z.variance}×</span> variance</span>
                      <span className="text-gray-300">·</span>
                      <span><span className="font-semibold text-gray-700">{z.discretionaryShare}%</span> disc</span>
                    </div>
                    <div className="text-[12px] text-gray-700 mt-1.5 leading-snug">{z.rationale}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-bold text-gray-900">{z.costLabel}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">→ {z.sizingRange}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DeprioritizedRollup({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-4">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Deprioritized — looked at, ruled out</div>
        <div className="text-[11px] text-gray-500">grouped by reason</div>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((d) => (
          <div key={d.id} className="px-4 py-2.5 flex items-center gap-3">
            <span className="w-2 h-8 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-gray-900">{d.reason}</div>
              <div className="text-[11px] text-gray-500">{d.category}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-gray-900">{d.spend}</div>
              <div className="text-[10px] text-gray-500">{d.count} zones</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrioritizationArtifact({ data }) {
  const [filters, setFilters] = React.useState({ region: "All", bu: "All", function: "All" });
  const [hoverId, setHoverId] = React.useState(null);

  const visible = (data.zones || []).filter((z) =>
    (filters.region   === "All" || z.region   === filters.region) &&
    (filters.bu       === "All" || z.bu       === filters.bu) &&
    (filters.function === "All" || z.function === filters.function)
  );

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
      <div className="p-6">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
          {data.subtitle && <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>}
        </div>

        {data.filters && <FilterBar filters={filters} options={data.filters} onChange={setFilters} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <PriorityScatter zones={visible} hoverId={hoverId} onHover={setHoverId} />
          <RankedShortlist zones={visible} hoverId={hoverId} onHover={setHoverId} />
        </div>

        <DeprioritizedRollup items={data.deprioritized} />

        {data.source && (
          <div className="text-[11px] text-gray-400 italic mt-4 border-t border-gray-100 pt-3">{data.source}</div>
        )}
      </div>
    </div>
  );
}

// ── COST DRIVER ARTIFACT (cost shadow per driver) ──
// "How does one X ripple through the company?" — pick a driver, see every
// function it touches, see how the cost shape changes by region. The user
// interacts with the chips/filters; the underlying data is read-only.

function CostDriverChips({ chips, active, onSelect, more = 0 }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect && onSelect(c.id)}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            {c.label}
          </button>
        );
      })}
      {more > 0 && <span className="text-xs text-gray-500 px-2 py-1.5">+{more} more</span>}
    </div>
  );
}

function CostDriverRegionRow({ regions, active, onSelect }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-4">
      <span className="text-[11px] text-gray-500 font-medium">Region:</span>
      <div className="flex flex-wrap gap-1">
        {regions.map((r) => {
          const isActive = active === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelect && onSelect(r.id)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
      <span className="text-[10px] text-gray-400 italic ml-1">click to refilter</span>
    </div>
  );
}

function CostDriverStatBox({ driver, active }) {
  const value = active.value;
  const sub = active.id === "all" ? "global avg · /year" : `${active.label} · /year`;
  return (
    <div className="bg-blue-700 text-white rounded-lg p-4 h-full flex flex-col">
      <div className="text-[10px] uppercase tracking-widest opacity-80 mb-1">1 {driver.label.toUpperCase()} · {active.label.toUpperCase()}</div>
      <div className="text-3xl font-bold leading-none mt-2">${value.toLocaleString()}</div>
      <div className="text-[11px] opacity-80 mt-1">{sub}</div>
      <div className="border-t border-white/20 mt-4 pt-3 space-y-1.5 text-xs">
        <div className="flex items-center justify-between"><span className="opacity-80">Functions</span><span className="font-semibold">{driver.summary.functions}</span></div>
        <div className="flex items-center justify-between"><span className="opacity-80">Activities</span><span className="font-semibold">{driver.summary.activities}</span></div>
        <div className="flex items-center justify-between"><span className="opacity-80">Cost centers</span><span className="font-semibold">{driver.summary.costCenters}</span></div>
        <div className="flex items-center justify-between"><span className="opacity-80">Vendors</span><span className="font-semibold">{driver.summary.vendors}</span></div>
      </div>
    </div>
  );
}

// Treemap — Sales takes a full-height left tile; everything else stacks in
// a two-row right panel sized proportionally to value within each row.
function CostDriverTreemap({ functions, highlight }) {
  if (!functions || functions.length === 0) return null;
  const sorted = [...functions].sort((a, b) => b.value - a.value);
  const big = sorted[0];
  const rest = sorted.slice(1);
  const restTotal = rest.reduce((s, f) => s + f.value, 0);
  const rowATopN = 3;
  const rowA = rest.slice(0, rowATopN);
  const rowB = rest.slice(rowATopN);
  const rowATotal = rowA.reduce((s, f) => s + f.value, 0);
  const rowBTotal = restTotal - rowATotal;

  const Tile = ({ f, dense }) => {
    const isHi = highlight && highlight === f.name;
    return (
      <div
        className="text-white rounded flex flex-col justify-between p-2 transition-all"
        style={{
          flex: f.value,
          background: f.color,
          outline: isHi ? "2px solid #fbbf24" : "none",
        }}
        title={`${f.name} · $${f.value.toLocaleString()} · ${f.pct}%`}
      >
        <div className={`${dense ? "text-[10px]" : "text-[11px]"} font-medium opacity-90 leading-tight truncate`}>{f.name}</div>
        <div className="leading-tight">
          <div className={`${dense ? "text-xs" : "text-sm"} font-bold`}>${f.value.toLocaleString()}</div>
          {f.pct >= 4 && <div className="text-[10px] opacity-80">{f.pct}%</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-72 gap-1">
      {/* Big left tile */}
      <div className="flex" style={{ flex: big.value }}>
        <Tile f={big} />
      </div>
      {/* Right side — two rows */}
      <div className="flex flex-col gap-1" style={{ flex: restTotal }}>
        <div className="flex gap-1" style={{ flex: rowATotal }}>
          {rowA.map((f) => <Tile key={f.name} f={f} />)}
        </div>
        <div className="flex gap-1" style={{ flex: rowBTotal }}>
          {rowB.map((f) => <Tile key={f.name} f={f} dense />)}
        </div>
      </div>
    </div>
  );
}

function CostDriverFunctionsLegend({ functions }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-gray-600">
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Functions</span>
      {functions.map((f) => (
        <span key={f.name} className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: f.color }} />
          <span>{f.name}</span>
        </span>
      ))}
    </div>
  );
}

function CostDriverByRegionBars({ regions, activeId, onSelect }) {
  const max = Math.max(...regions.map((r) => r.value));
  return (
    <div className="flex items-end gap-2 h-44 px-2 pt-3 pb-1">
      {regions.map((r) => {
        const h = (r.value / max) * 100;
        const isActive = r.id === activeId;
        const isBenchmark = r.isBenchmark;
        const fill = isBenchmark ? "#10b981" : isActive ? "#1d4ed8" : "#3b82f6";
        return (
          <button
            key={r.id}
            onClick={() => onSelect && onSelect(r.id)}
            className="flex-1 flex flex-col items-center justify-end h-full group"
            title={`${r.label} · $${r.value.toLocaleString()} · ${r.multiplier}`}
          >
            <div className="text-[10px] font-semibold text-gray-700 mb-1">${r.value.toLocaleString()}</div>
            <div className="text-[9px] text-gray-400 mb-0.5">{r.multiplier}</div>
            <div
              className="w-full rounded-t transition-all"
              style={{
                height: `${h}%`,
                background: fill,
                opacity: isActive ? 1 : 0.85,
              }}
            />
            <div className={`text-[10px] mt-1.5 ${isActive ? "text-blue-700 font-semibold" : "text-gray-500"}`}>
              {r.label}{r.isBenchmark ? " · benchmark" : ""}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CostDriverRecoverable({ text }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mt-2 text-sm text-blue-900 flex items-start gap-2">
      <span className="text-blue-500 flex-shrink-0 mt-0.5">{getIcon("Sparkles", { size: 13 })}</span>
      <span dangerouslySetInnerHTML={{ __html: renderInlineMd(text) }} />
    </div>
  );
}

function CostDriverArtifact({ data }) {
  const initialDriver = data.drivers.find((d) => d.active)?.id || data.drivers[0].id;
  const [driverId, setDriverId] = React.useState(initialDriver);
  const [view, setView] = React.useState("Treemap");
  const [regionId, setRegionId] = React.useState("all");
  const driver = data.activeDriver; // Only one driver is fully populated in the seed.
  const region = (driver.regions || []).find((r) => r.id === regionId) || driver.regions[0];

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
      <div className="p-6">
        {/* Top header: title + meta badge */}
        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              How does <span className="text-blue-600">one {driver.label}</span> ripple through the company?
            </h2>
            <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>
          </div>
          <div className="text-[11px] text-gray-400 italic">{data.badge}</div>
        </div>

        {/* Driver chips */}
        <CostDriverChips chips={data.drivers} active={driverId} onSelect={setDriverId} more={data.driversMore || 0} />

        {/* Cost shadow main panel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
            <div>
              <div className="text-base font-bold text-gray-900">Cost shadow · per {driver.label} · per year</div>
              <div className="text-[11px] text-gray-500">tile area = share of fully-loaded cost · tile color = function</div>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-md p-0.5">
              {["Treemap", "Anatomy", "Sankey"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-xs px-2.5 py-1 rounded transition-colors ${view === v ? "bg-white text-gray-900 font-semibold shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Region row */}
          <CostDriverRegionRow regions={driver.regions} active={regionId} onSelect={setRegionId} />

          {/* Two-column: stat box + treemap */}
          <div className="flex gap-4">
            <div className="w-56 flex-shrink-0">
              <CostDriverStatBox driver={driver} active={region} />
            </div>
            <div className="flex-1 min-w-0">
              {view === "Treemap" ? (
                <>
                  <CostDriverTreemap functions={driver.functions} />
                  <CostDriverFunctionsLegend functions={driver.functions} />
                </>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg h-72 flex items-center justify-center text-xs text-gray-400 px-6 text-center">
                  {view} view not yet wired up — Treemap above carries the same data.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* By-region panel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <div>
              <div className="text-base font-bold text-gray-900">Same {driver.label} · cost by region</div>
              <div className="text-[11px] text-gray-500">2.5× spread · UK is the internal benchmark · click any bar to refilter the treemap</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">currently viewing</div>
              <div className="text-sm font-semibold text-blue-600">{region.label}</div>
            </div>
          </div>

          <CostDriverByRegionBars regions={driver.regions} activeId={regionId} onSelect={setRegionId} />

          {driver.recoverable && <CostDriverRecoverable text={driver.recoverable} />}
        </div>

        {data.source && (
          <div className="text-[11px] text-gray-400 italic mt-4 border-t border-gray-100 pt-3">{data.source}</div>
        )}
      </div>
    </div>
  );
}

// Style → background mapping for the styled "What I noticed" messages.
// Each style hits a different visual register so multiple discoveries can
// stack without blending together.
const CHAT_BUBBLE_STYLES = {
  neutral:  "bg-gray-100 border border-gray-200 text-gray-800",
  finding:  "bg-amber-50/60 border border-amber-100 text-gray-800",
  variance: "bg-blue-50 border border-blue-100 text-blue-900",
  question: "bg-orange-50 border border-orange-100 text-orange-900",
  default:  "bg-gray-50 border border-gray-200 text-gray-700",
};

function ChatBubble({ message }) {
  if (message.role === "user") {
    return (
      <div
        className="ml-auto bg-blue-600 text-white text-xs px-3 py-2 rounded-lg max-w-[85%] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderInlineMd(message.text || "").split("\n").join("<br/>") }}
      />
    );
  }
  const cls = CHAT_BUBBLE_STYLES[message.style] || CHAT_BUBBLE_STYLES.default;
  return (
    <div
      className={`text-xs px-3 py-2 rounded-lg leading-relaxed ${cls}`}
      dangerouslySetInnerHTML={{ __html: renderInlineMd(message.text || "").split("\n").join("<br/>") }}
    />
  );
}

// ── AI ZBO CHAT PANEL (universal left side of every task workspace) ──
function AIChatPanel({ task }) {
  // Pull seed messages from the task's preview content. Process maps store
  // their seeded exchanges under `chatLog` on the artifact; chat-type previews
  // store them under `chat`. List Builder previews also use `chat`.
  const preview = TASK_PREVIEWS[task.id] || {};
  const seedFromMap = preview.artifact?.chatLog;
  const seedFromChat = preview.chat;
  const seed = (seedFromMap || seedFromChat || [
    { role: "assistant", text: `This is the **${task.label}** workspace. I can shape the ${task.appType === "list-builder" ? "grid" : task.appType === "artifact" ? "artifact" : "output"} on the right via natural language. Ask a question or give an instruction to start.` }
  ]).map(m => m.text || (m.artifact ? { artifactRef: m.artifact.title } : null) ? m : { ...m, text: m.text || (m.artifact ? `Drafted **${m.artifact.title}** in the workspace on the right.` : "") });

  const [log, setLog] = React.useState(seed);
  const [draft, setDraft] = React.useState("");
  const endRef = React.useRef(null);
  React.useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [log]);

  const suggestions = preview.suggestions || preview.artifact?.suggestions || [];
  // Show "What I noticed" header when the seeded log starts with styled
  // discovery messages (style field present) — characteristic of the
  // bottom-up Activity & Driver Mapping experience.
  const hasStyledIntro = seed.length > 0 && seed.some((m) => m.style);

  const submit = (text) => {
    const t = (text ?? draft).trim();
    if (!t) return;
    setLog((cur) => [
      ...cur,
      { role: "user", text: t },
      { role: "assistant", text: "Got it — I've reflected the change in the workspace on the right. (Demo: edits applied conceptually; in production this is a live transformation.)" },
    ]);
    setDraft("");
  };

  return (
    <div className="w-[380px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-900 truncate">AI ZBO</div>
          <div className="text-[10px] text-gray-500 truncate">Shaping {task.label}</div>
        </div>
        <AppTypeBadge type={task.appType} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
        {hasStyledIntro && (
          <div className="text-xs font-semibold text-gray-700 mb-2">What I noticed</div>
        )}
        <div className="space-y-2.5">
          {log.map((m, i) => (
            <ChatBubble key={i} message={m} />
          ))}
          <div ref={endRef} />
        </div>
        {suggestions.length > 0 && (
          <div className="mt-5">
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Try</div>
            <div className="space-y-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => submit(s.label)}
                  className="w-full flex items-center justify-between gap-2 text-xs text-left bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <span className="truncate">{s.label}</span>
                  {getIcon("ArrowUpRight", { size: 11, className: "text-gray-400 flex-shrink-0" })}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <span className="text-gray-300">{getIcon("Sparkles", { size: 14 })}</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            className="flex-1 bg-transparent text-xs outline-none placeholder-gray-400"
            placeholder="Ask AI ZBO to shape the workspace…"
          />
          <button onClick={() => submit()} className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700">{getIcon("Send", { size: 12 })}</button>
        </div>
      </div>
    </div>
  );
}

// ── RIGHT-PANEL CONTENT (one component per app type) ──

// List Builder right panel: tabular grid + tabs.
function GridContent({ task }) {
  const grid = TASK_PREVIEWS[task.id]?.grid || {
    title: task.label,
    tabs: [{ name: "Master", count: 0, active: true }],
    columns: ["id", "name", "value", "status"],
    rows: [["—", "—", "—", "—"]],
  };
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="text-sm font-semibold text-gray-900">{grid.title}</div>
        <button className="text-gray-400 hover:text-blue-600">{getIcon("ArrowDownRight", { size: 14 })}</button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="border-b border-gray-200">
              {grid.columns.map((c, i) => (
                <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 bg-emerald-50/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-gray-800 whitespace-nowrap">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-2 border-t border-gray-200 flex items-center gap-4 flex-shrink-0 overflow-x-auto">
        {grid.tabs.map((t, i) => (
          <button key={i} className={`text-xs whitespace-nowrap pb-1 border-b-2 ${t.active ? "border-blue-600 text-blue-700 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
            {t.name} <span className="text-gray-400">({t.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── AI-VSM ARTIFACT ──
// Picks up where Opportunity Prioritization left off. Each priority zone
// becomes a process here; each process decomposes into sub-processes (the
// VSM swim lane), which decompose into activities (the deep dive). A Harvey
// ball per AI-suitability criterion shows the score, and an intervention
// type (Auto / Aug / Exc / N/S) is the lever.

// Map verdict id → meta (color, label, classes). Single source of truth so
// the rail, the flow, the scoring table, and the activity grid all read the
// same thing.
const VERDICT_META = {
  auto: { short: "AI Only",       label: "End-to-End AI Automation", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", flowFill: "#10b981", flowSoft: "#d1fae5" },
  aug:  { short: "AI + Reviewer", label: "AI Does, Staff Review",     color: "#3b82f6", bg: "bg-blue-50",     text: "text-blue-700",     border: "border-blue-200",     flowFill: "#3b82f6", flowSoft: "#dbeafe" },
  exc:  { short: "AI Enabled",    label: "Staff Does, AI Assists",    color: "#f97316", bg: "bg-orange-50",   text: "text-orange-700",   border: "border-orange-200",   flowFill: "#f97316", flowSoft: "#ffedd5" },
  ns:   { short: "N/A",            label: "Not Suitable",               color: "#9ca3af", bg: "bg-gray-100",    text: "text-gray-600",     border: "border-gray-200",     flowFill: "#9ca3af", flowSoft: "#f3f4f6" },
};

// Harvey ball — arc-fill SVG with the score value rendered in the center.
// Color binds to score band so the eye picks up high/low at a glance:
//   ≥80 emerald · 50–79 blue · 20–49 amber · <20 red
function HarveyBall({ score = 0, size = 30, label }) {
  const r = (size - 5) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, score)) / 100) * c;
  const color = score >= 80 ? "#10b981" : score >= 50 ? "#3b82f6" : score >= 20 ? "#f59e0b" : "#ef4444";
  const cx = size / 2;
  return (
    <div className="relative inline-block" style={{ width: size, height: size }} title={label ? `${label} · ${score}` : String(score)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cx} r={r} fill="white" stroke="#e5e7eb" strokeWidth={2.5} />
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-bold tabular-nums"
        style={{ color, fontSize: size <= 24 ? 9 : 10 }}
      >
        {score}
      </div>
    </div>
  );
}

function VerdictPill({ verdict, size = "sm" }) {
  const m = VERDICT_META[verdict] || VERDICT_META.ns;
  const cls = size === "xs"
    ? "text-[10px] px-1.5 py-0.5"
    : "text-[11px] px-2 py-0.5";
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border font-semibold ${m.bg} ${m.text} ${m.border} ${cls}`}>{m.short}</span>
  );
}

function VerdictCountStrip({ counts }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Object.entries(VERDICT_META).map(([k, m]) => {
        const n = counts?.[k] ?? 0;
        if (n === 0) return null;
        return (
          <span key={k} className={`inline-flex items-center gap-1 text-[11px] font-semibold rounded-md border px-1.5 py-0.5 ${m.bg} ${m.text} ${m.border}`}>
            <span className="tabular-nums">{n}</span> {m.short}
          </span>
        );
      })}
    </div>
  );
}

function AiVsmRail({ processes, activeId, onSelect }) {
  return (
    <div className="w-[200px] flex-shrink-0 border-r border-gray-200 bg-gray-50/50 overflow-y-auto scrollbar-thin">
      <div className="px-3 py-3 border-b border-gray-200">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Priority Processes</div>
        <div className="text-[10px] text-gray-400 mt-0.5">From Opportunity Prioritization</div>
      </div>
      <div className="py-1">
        {processes.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`w-full text-left px-3 py-2.5 border-l-[3px] transition-colors ${
                isActive
                  ? "bg-blue-50 border-blue-600"
                  : "border-transparent hover:bg-gray-100"
              }`}
            >
              <div className="flex items-baseline gap-1.5">
                <span className={`text-[10px] font-bold tabular-nums flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`}>#{p.rank}</span>
                <div className={`text-[12px] font-semibold leading-snug ${isActive ? "text-blue-900" : "text-gray-800"}`}>
                  {p.name}
                </div>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5 truncate">{p.function}</div>
            </button>
          );
        })}
      </div>
      <div className="px-3 py-3 border-t border-gray-200 mt-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Recommendation key</div>
        <div className="space-y-2">
          {Object.entries(VERDICT_META).map(([k, m]) => (
            <div key={k} className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: m.color }} />
              <div className="min-w-0">
                <div className={`text-[11px] font-semibold leading-tight ${m.text}`}>{m.short}</div>
                <div className="text-[10px] text-gray-500 leading-tight">{m.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TONE_TINTS = {
  bad:  "text-red-600",
  warn: "text-amber-600",
  good: "text-emerald-600",
};

function ProcessMetricsCard({ metrics }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5">Process Metrics</div>
      <div className="space-y-1.5">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-baseline justify-between gap-2 text-[11px]">
            <span className="text-gray-600 leading-tight">{m.label}</span>
            <span className={`font-semibold tabular-nums ${TONE_TINTS[m.tone] || "text-gray-900"}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PainPointsCard({ painPoints }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5">Pain Points</div>
      <div className="space-y-1.5">
        {painPoints.map((p, i) => (
          <div key={i} className="flex items-baseline justify-between gap-2 text-[11px]">
            <span className="text-gray-700 leading-tight">{p.name}</span>
            <span className={`font-semibold ${TONE_TINTS[p.tone] || "text-gray-900"}`}>{p.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessVariationsCard({ variations }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5">Process Variations</div>
      <div className="space-y-1.5">
        {variations.map((v, i) => (
          <div key={i} className="flex items-baseline justify-between gap-2 text-[11px]">
            <span className="text-gray-700 leading-tight">{v.name}</span>
            <span className="font-semibold text-gray-900 tabular-nums">{v.share}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-process flow: each sub-process is a column with a stacked bar
// showing cycle time (light) with value-add time (dark) overlaid, plus
// the waste % under the bar. Color is the verdict's flow tint so the
// scoring story carries into the swim lane.
function SubProcessFlow({ subProcesses }) {
  const maxCycle = Math.max(...subProcesses.map((s) => s.cycle), 1);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Sub-process flow — cycle time vs value time</div>
        <div className="text-[10px] text-gray-400 italic">cycle (d) / value (d) · waste %</div>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${subProcesses.length}, minmax(0, 1fr))` }}>
        {subProcesses.map((sp) => {
          const m = VERDICT_META[sp.verdict] || VERDICT_META.ns;
          const cyclePct = (sp.cycle / maxCycle) * 100;
          const valuePctOfBar = (sp.value / sp.cycle) * 100;
          return (
            <div key={sp.id} className="flex flex-col">
              <div className="text-[11px] font-semibold text-gray-800 leading-tight mb-1.5 min-h-[28px]">{sp.name}</div>
              <div className="relative h-14 bg-gray-50 border border-gray-100 rounded overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: `${cyclePct}%`, background: m.flowSoft }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: `${cyclePct * valuePctOfBar / 100}%`, background: m.flowFill }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-800 tabular-nums">
                  {sp.cycle}d / {sp.value}d
                </div>
              </div>
              <div className="text-[10px] text-gray-500 mt-1 text-center">
                <span className={sp.waste >= 75 ? "text-red-600 font-semibold" : sp.waste >= 60 ? "text-amber-600 font-semibold" : "text-emerald-700 font-semibold"}>{sp.waste}%</span> waste
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-blue-200"></span>Cycle time bar</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-blue-500"></span>Value-add fill</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-red-300"></span>High waste</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-emerald-300"></span>Lower waste</span>
      </div>
    </div>
  );
}

// AI suitability scoring — sub-process rows × five scoring criteria with a
// Harvey ball per cell, then a composite score and verdict pill. Mirrors the
// reference image; numbers in the centre of each ball read at a glance.
const AI_SCORING_CRITERIA = [
  { id: "margin",   label: "Margin impact" },
  { id: "volume",   label: "Volume & repetition" },
  { id: "data",     label: "Data availability" },
  { id: "error",    label: "Error tolerance" },
  { id: "adoption", label: "Adoption readiness" },
];

function AiSuitabilityTable({ subProcesses }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 pt-3.5 pb-2 flex items-baseline justify-between">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">AI suitability — sub-process scoring</div>
        <div className="text-[10px] text-gray-400 italic">Harvey ball score 0–100 per criterion · composite is /15</div>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-gray-50 border-y border-gray-200">
          <tr className="text-[10px] uppercase text-gray-500">
            <th className="text-left px-3 py-2 font-semibold w-[34%]">Sub-process</th>
            {AI_SCORING_CRITERIA.map((c) => (
              <th key={c.id} className="px-1 py-2 font-semibold text-center">
                <span className="block leading-tight">{c.label}</span>
              </th>
            ))}
            <th className="px-2 py-2 font-semibold text-center">Score</th>
            <th className="px-2 py-2 font-semibold text-center">Recommend</th>
          </tr>
        </thead>
        <tbody>
          {subProcesses.map((sp) => (
            <tr key={sp.id} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/20 transition-colors">
              <td className="px-3 py-2.5">
                <div className="text-[12px] font-semibold text-gray-900">{sp.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 tabular-nums">{sp.cycle}d cycle · {sp.waste}% waste</div>
              </td>
              {AI_SCORING_CRITERIA.map((c) => (
                <td key={c.id} className="px-1 py-2 text-center">
                  <HarveyBall score={sp.ai?.[c.id] ?? 0} size={26} label={c.label} />
                </td>
              ))}
              <td className="px-2 py-2 text-center">
                <span className="inline-block min-w-[34px] text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">
                  {sp.score}
                </span>
              </td>
              <td className="px-2 py-2 text-center">
                <VerdictPill verdict={sp.verdict} size="xs" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InterventionDesignPanel({ subProcesses }) {
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
        Intervention design — what does the AI consume and produce
        <span className="text-gray-400 normal-case font-medium">· future-state human role + exception path per sub-process</span>
      </div>
      {subProcesses.map((sp) => {
        const m = VERDICT_META[sp.verdict] || VERDICT_META.ns;
        return (
          <div key={sp.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 flex items-baseline gap-3 border-b border-gray-100" style={{ background: m.flowSoft + "80" }}>
              <div className="text-[12px] font-bold text-gray-900 flex-1 truncate">{sp.name}</div>
              <span className="text-[10px] text-gray-500 tabular-nums whitespace-nowrap">{sp.cycle}d cycle · {sp.waste}% waste</span>
              <VerdictPill verdict={sp.verdict} size="xs" />
              <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{sp.intervention.type}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 px-4 py-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">AI input</div>
                <div className="text-[11px] text-gray-800 leading-snug">{sp.intervention.aiInput}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">AI output</div>
                <div className="text-[11px] text-gray-800 leading-snug">{sp.intervention.aiOutput}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">Human role (future state)</div>
                <div className="text-[11px] text-gray-800 leading-snug">{sp.intervention.humanRole}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-1">Exception path</div>
                <div className="text-[11px] text-gray-800 leading-snug">{sp.intervention.exception}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const EFFORT_IMPACT_TONE = {
  Low:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Med:  "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

const OWNER_TONE = {
  Human:  "bg-amber-50 text-amber-700 border-amber-200",
  System: "bg-blue-50 text-blue-700 border-blue-200",
  Hybrid: "bg-purple-50 text-purple-700 border-purple-200",
};

function ActivityDeepDive({ activities, ebitdaLever }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100 flex items-baseline justify-between flex-wrap gap-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Activity deep dive — AI lever & value linkage</div>
        <div className="text-[10px] text-gray-500">EBITDA lever: <span className="font-semibold text-gray-700">{ebitdaLever}</span></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr className="text-[10px] uppercase text-gray-500 border-b border-gray-200">
              <th className="text-left  px-3 py-2 font-semibold">Activity</th>
              <th className="text-left  px-3 py-2 font-semibold">Sub-process</th>
              <th className="text-right px-3 py-2 font-semibold">Cycle</th>
              <th className="text-right px-3 py-2 font-semibold">Waste</th>
              <th className="text-right px-3 py-2 font-semibold">Volume</th>
              <th className="text-left  px-3 py-2 font-semibold">Pain point</th>
              <th className="text-center px-3 py-2 font-semibold">Owner</th>
              <th className="text-center px-3 py-2 font-semibold">Recommend</th>
              <th className="text-center px-3 py-2 font-semibold">Score</th>
              <th className="text-left  px-3 py-2 font-semibold bg-blue-50/60">{getIcon("Sparkles", { size: 9, className: "inline-block text-blue-600 mr-1" })}AI intervention</th>
              <th className="text-left  px-3 py-2 font-semibold">EBITDA lever</th>
              <th className="text-right px-3 py-2 font-semibold">Labor pool</th>
              <th className="text-center px-3 py-2 font-semibold">Effort</th>
              <th className="text-center px-3 py-2 font-semibold">Impact</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/20">
                <td className="px-3 py-2 font-semibold text-gray-900">{a.name}</td>
                <td className="px-3 py-2 text-gray-700">{a.subProcess}</td>
                <td className="px-3 py-2 text-right tabular-nums text-gray-800">{a.cycleTime}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  <span className={a.waste >= 75 ? "text-red-600 font-semibold" : a.waste >= 60 ? "text-amber-600 font-semibold" : "text-emerald-700 font-semibold"}>{a.waste}%</span>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-gray-700">{a.volume}</td>
                <td className="px-3 py-2 text-gray-700 max-w-[180px] truncate" title={a.painPoint}>{a.painPoint}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${OWNER_TONE[a.owner] || "bg-gray-50 text-gray-600 border-gray-200"}`}>{a.owner}</span>
                </td>
                <td className="px-3 py-2 text-center"><VerdictPill verdict={a.verdict} size="xs" /></td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-block min-w-[28px] text-[10px] font-bold tabular-nums px-1 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">{a.score}</span>
                </td>
                <td className="px-3 py-2 text-gray-800 bg-blue-50/30 max-w-[260px]"><span className="leading-snug block">{a.intervention}</span></td>
                <td className="px-3 py-2 text-gray-700">{a.lever}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-gray-900">{a.laborPool}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${EFFORT_IMPACT_TONE[a.effort] || ""}`}>{a.effort}</span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${EFFORT_IMPACT_TONE[a.impact] || ""}`}>{a.impact}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AiVsmArtifact({ data }) {
  const [activeId, setActiveId] = React.useState(data.processes[0]?.id);
  const [tab, setTab] = React.useState("vsm");
  const active = data.processes.find((p) => p.id === activeId) || data.processes[0];

  const TABS = [
    { id: "vsm",      label: "VSM + AI suitability" },
    { id: "design",   label: "Intervention design" },
    { id: "activity", label: "Activity deep dive" },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-white flex flex-col">
      {/* Top header — title + source */}
      <div className="px-5 py-3 border-b border-gray-200 flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-gray-900 truncate">{data.title}</h2>
          {data.subtitle && <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{data.subtitle}</p>}
        </div>
        {data.source && <div className="text-[10px] text-gray-400 italic whitespace-nowrap">{data.source}</div>}
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left rail */}
        <AiVsmRail processes={data.processes} activeId={activeId} onSelect={setActiveId} />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Process header */}
          <div className="px-5 pt-4 pb-2 border-b border-gray-100 flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[10px] font-bold tabular-nums text-blue-600">PRIORITY #{active.rank}</span>
                <span className="text-gray-300">·</span>
                <span className="text-[11px] font-semibold text-gray-700">{active.poolSize} pool</span>
                <span className="text-gray-300">·</span>
                <span className="text-[11px] text-gray-600">variance {active.variance}</span>
                <span className="text-gray-300">·</span>
                <span className="text-[11px] text-gray-600">EBITDA lever: <span className="font-semibold text-gray-800">{active.ebitdaLever}</span></span>
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-tight mt-1">{active.name}</h3>
              <div className="text-[11px] text-gray-500">{active.function} · cost intensity <span className="font-bold tracking-tight text-gray-800">{active.costIntensity}</span></div>
            </div>
            <VerdictCountStrip counts={active.verdictCounts} />
          </div>

          {/* Tab bar */}
          <div className="px-5 border-b border-gray-200 flex items-center gap-1">
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`text-[12px] px-3 py-2 border-b-2 transition-colors -mb-px ${
                    isActive
                      ? "border-blue-600 text-blue-700 font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-4 space-y-4">
              {tab === "vsm" && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <ProcessMetricsCard metrics={active.metrics} />
                    <PainPointsCard painPoints={active.painPoints} />
                    <ProcessVariationsCard variations={active.variations} />
                  </div>
                  <SubProcessFlow subProcesses={active.subProcesses} />
                  <AiSuitabilityTable subProcesses={active.subProcesses} />
                </>
              )}
              {tab === "design" && (
                <InterventionDesignPanel subProcesses={active.subProcesses} />
              )}
              {tab === "activity" && (
                <ActivityDeepDive activities={active.activities} ebitdaLever={active.ebitdaLever} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Artifact right panel: dispatches to ProcessMapArtifact for visual artifacts,
// falls back to ArtifactBlock for sectioned reports.
function ArtifactContent({ task }) {
  const artifact = TASK_PREVIEWS[task.id]?.artifact || {
    title: task.label,
    subtitle: "NorthStar Frozen Foods",
    sections: [
      { heading: "Overview", body: `This is the **${task.label}** artifact. Artifacts are focused, shareable reports generated from the data foundation and analyses upstream.` },
      { heading: "What goes here", body: "Sections, tables, charts, and call-outs that summarize the finding. Each artifact is regenerable from its source data." },
    ],
  };
  if (artifact.type === "process_map") {
    return (
      <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
        <div className="p-6"><ProcessMapArtifact map={artifact} embedded /></div>
      </div>
    );
  }
  if (artifact.type === "function_discovery") {
    // FunctionDiscoveryArtifact owns its own scroll container so that the
    // deep-dive (list-builder) view can take over the full pane height.
    return <FunctionDiscoveryArtifact data={artifact} />;
  }
  if (artifact.type === "dashboard") {
    // Dashboard owns its own scroll container; deep-dive into a function
    // list builder takes over the full pane.
    return <DashboardArtifact data={artifact} />;
  }
  if (artifact.type === "prioritization") {
    return <PrioritizationArtifact data={artifact} />;
  }
  if (artifact.type === "cost_driver") {
    return <CostDriverArtifact data={artifact} />;
  }
  if (artifact.type === "ai_vsm") {
    return <AiVsmArtifact data={artifact} />;
  }
  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
      <div className="max-w-[900px] mx-auto px-8 py-8">
        <ArtifactBlock artifact={artifact} />
      </div>
    </div>
  );
}

// Chat right panel: surfaces the most-recent inline artifact produced in the
// conversation (which lives on the left). When no artifact is present, shows
// a friendly placeholder.
function ChatArtifactContent({ task }) {
  const messages = TASK_PREVIEWS[task.id]?.chat || [];
  const latestArtifact = [...messages].reverse().find((m) => m.artifact)?.artifact;
  if (latestArtifact) {
    return (
      <div className="flex-1 overflow-y-auto bg-white scrollbar-thin">
        <div className="max-w-[900px] mx-auto px-8 py-8">
          <ArtifactBlock artifact={latestArtifact} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex items-center justify-center bg-white text-sm text-gray-400 px-8 text-center">
      Output artifacts will render here. Ask AI ZBO a question on the left to begin.
    </div>
  );
}

function ContentPanel({ task }) {
  if (task.appType === "list-builder") return <GridContent task={task} />;
  if (task.appType === "chat")          return <ChatArtifactContent task={task} />;
  return <ArtifactContent task={task} />;
}

// ── TASK WORKSPACE — chat (left) + content (right), no modal ──
function TaskWorkspace({ task }) {
  return (
    <div className="flex-1 flex h-full overflow-hidden">
      <AIChatPanel task={task} />
      <ContentPanel task={task} />
    </div>
  );
}

// ── TASK TILE ──

function TaskTile({ task, onOpen }) {
  return (
    <div
      onClick={() => onOpen(task)}
      className="flex items-center justify-between gap-2 bg-white border border-blue-100 rounded-lg px-3 py-2.5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
      title="Open workspace"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100">
          {getIcon(task.icon || "FileText", { size: 12, className: "text-blue-500" })}
        </span>
        <span className="text-[13px] text-gray-800 truncate flex-1">{task.label}</span>
        <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[9px] font-semibold leading-none">i</span>
      </div>
      <AppTypeBadge type={task.appType} />
      {task.badge && (
        <span className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
          {getIcon("FileText", { size: 10, className: "text-emerald-600" })} {task.badge}
        </span>
      )}
    </div>
  );
}

// ── MAIN VIEW ──

// DiagnosticView accepts openTask + setOpenTask from App so the top-header
// breadcrumb (which lives outside this component) can read and clear them.
// The inner sub-header breadcrumb has been removed — the top header is now
// the single source of truth for navigation context.
function DiagnosticView({ openTask, setOpenTask }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#f5f7fa" }}>
      {openTask
        ? <TaskWorkspace task={openTask} />
        : <DiagnosticHome onOpenTask={setOpenTask} />}
    </div>
  );
}

function DiagnosticHome({ onOpenTask }) {
  return (
    <div className="overflow-y-auto flex-1 scrollbar-thin">
      <div className="p-6">
        {/* Client info card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">NorthStar Frozen Foods</h1>
                <span className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-semibold">i</span>
              </div>
              <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-xs">
                {[
                  { icon: "Briefcase", label: "Target Company", value: "NorthStar Frozen Foods" },
                  { icon: "Layers",    label: "Industry",       value: "Frozen & Prepared Foods" },
                  { icon: "FileText",  label: "Sub Industry",   value: "Multi-Region Manufacturing" },
                  { icon: "Users",     label: "Users",          value: "12" },
                  { icon: "Clock",     label: "Last Updated",   value: "5/01/2026" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {getIcon(m.icon, { size: 13, className: "text-gray-400" })}
                    <span className="text-gray-500">{m.label}:</span>
                    <span className="font-medium text-gray-800">{m.value}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  {getIcon("MessageCircle", { size: 13, className: "text-gray-400" })}
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium text-gray-800">ci+northstar_frozen@agpm.ai</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button className="flex items-center gap-2 text-sm bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors">
                {getIcon("Package", { size: 14, className: "text-gray-500" })}
                Cost Optimization Files
              </button>
            </div>
          </div>
        </div>

        {/* AGENTS */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 tracking-widest uppercase mb-3">Agents</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-3 bg-white border-2 border-blue-500 rounded-xl px-4 py-2.5 shadow-sm cursor-pointer min-w-[200px]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</div>
              <span className="text-sm font-semibold text-gray-900 flex-1">AI ZBO</span>
              <span className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
                {getIcon("MessageSquare", { size: 14, className: "text-blue-600" })}
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 flex-wrap mb-4 text-[11px] text-gray-500">
          <span>Tasks open in one of three interfaces:</span>
          <AppTypeBadge type="chat" />
          <AppTypeBadge type="list-builder" />
          <AppTypeBadge type="artifact" />
          <span className="text-gray-400">· click any task to open its workspace</span>
        </div>

        {/* Task groupings */}
        <div>
          {DIAGNOSTIC_TASK_GROUPS.map((g, gi) => (
            <div key={g.name} className={gi > 0 ? "border-t border-gray-200 pt-5 mt-5" : ""}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{g.name}</h3>
                <span className="text-xs text-blue-600 font-medium">{g.tasks.length} task{g.tasks.length === 1 ? "" : "s"}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {g.tasks.map((t) => <TaskTile key={t.id} task={t} onOpen={onOpenTask} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
