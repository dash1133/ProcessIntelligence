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

// Methodology lifecycle: Data → Taxonomy → Cost Allocation → Cost-to-Serve →
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
  { name: "Cost Allocation & Cost-to-Serve", tasks: [
    { id: "cost_allocation", label: "Cost Allocation by Activity", appType: "list-builder", icon: "Calculator",  description: "Labor and non-labor costs allocated to processes and activities." },
    { id: "vendor_spend",    label: "Vendor Spend Analysis",        appType: "list-builder", icon: "DollarSign", description: "Vendor-level spend decomposition and enrichment." },
    { id: "cost_to_serve",   label: "Cost-to-Serve Analytics",      appType: "artifact",     icon: "BarChart3",   description: "Cost-to-serve patterns by customer, product, geography, and BU." },
  ]},
  { name: "Opportunity Identification", tasks: [
    { id: "redesign_opps",   label: "Process Redesign & AI Opportunities", appType: "artifact", icon: "Target",        description: "Curated opportunities across redesign, automation, and AI." },
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
        { name: "Sales",     icon: "TrendingUp", subFns: ["Demand sensing", "Volume forecast",  "SKU prioritization", "Inventory pos.",   "Account mgmt"] },
        { name: "Marketing", icon: "Sparkles",   subFns: ["Sourcing PR",    "Brand R&D",         "Brand specs",        "Trade promo",       "Demand gen"] },
        { name: "Legal",     icon: "FileText",   subFns: ["Procurement legal","Plant compliance","IP / trademark",     "Regulatory",        "Customer contracts"] },
        { name: "Finance",   icon: "Calculator", subFns: ["Cost accounting","Plant P&L",         "Pack costing",        "Inv. accounting",   "Customer billing"] },
        { name: "HR",        icon: "Users",      subFns: ["Field workforce","Plant labor",       "Pack labor",          "DC labor",          "Logistics labor"] },
        { name: "IT",        icon: "Activity",   subFns: ["Agronomy systems","MES / SCADA",      "Pack systems",        "WMS",               "TMS / ERP"] },
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

  cost_to_serve: {
    artifact: {
      title: "Cost-to-Serve Analytics",
      subtitle: "NorthStar Frozen Foods · Indirect SG&A · TTM",
      sections: [
        { heading: "Headline",
          body: "Cost-to-serve is unevenly distributed across regions and customer channels. India and LATAM together account for **~13% of revenue but ~21% of fully-allocated SG&A**. On the channel side, retail private-label runs at a 1.40× cost-to-serve index — driven by trade-marketing labor and customer-contract overhead." },
        { heading: "By Region", table: {
          cols: ["Region", "Revenue Share", "SG&A Share", "Index"],
          rows: [
            ["Southeast Asia",   "9%",  "4%",  "0.49 ✓"],
            ["Greater China",    "13%", "9%",  "0.71 ✓"],
            ["ANZ",              "6%",  "5%",  "0.85 ✓"],
            ["United Kingdom",   "14%", "13%", "0.92 ✓"],
            ["North America",    "34%", "36%", "1.06"],
            ["Continental EU",   "13%", "14%", "1.10 ✗"],
            ["South Africa",     "3%",  "4%",  "1.31 ✗"],
            ["Latin America",    "5%",  "7%",  "1.41 ✗"],
            ["India",            "3%",  "8%",  "2.62 ✗"],
          ]
        }},
        { heading: "By Customer Channel", table: {
          cols: ["Channel", "Revenue Share", "SG&A Share", "Index"],
          rows: [
            ["QSR (national accounts)",       "38%", "30%", "0.79 ✓"],
            ["Foodservice (distributor)",     "26%", "24%", "0.92 ✓"],
            ["Retail (branded)",               "22%", "26%", "1.18 ✗"],
            ["Retail (private-label)",         "10%", "14%", "1.40 ✗"],
            ["Direct / Other",                  "4%",  "6%",  "1.50 ✗"],
          ]
        }},
        { heading: "Recommendation",
          body: "Three of the four worst-indexed cells (India, Latin America, South Africa) cluster on the same root cause: low AI automation share inside Admin & Executive and Legal, plus duplicated marketing workflows that have never been consolidated. Anchor SEA as the internal target operating model and converge the bottom three regions to a 1.10× index over 18 months. Implied opportunity: ~$95M run-rate against the SG&A base, with the bulk landing inside the $150M consulting line and the $295M marketing stack. See Initiative Sizing & Business Case for the sized plan." },
      ]
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

        {/* Decision Rights legend (right-aligned) */}
        <div className="flex flex-col items-end gap-1.5">
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
                <div className="w-32 flex items-center gap-1.5 flex-shrink-0 px-1">
                  {getIcon(fn.icon || "Briefcase", { size: 13, className: "text-indigo-600" })}
                  <span className="text-xs font-semibold text-gray-800">{fn.name}</span>
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
        {fn.lastRefreshed && (
          <span className="text-[10px] text-gray-400 flex-shrink-0 whitespace-nowrap">last refreshed {fn.lastRefreshed}</span>
        )}
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
function FunctionDeepDive({ fn, onBack }) {
  const [tab, setTab] = React.useState("combined");
  const tabs = [
    { id: "combined", label: "Combined" },
    { id: "vendor",   label: "Vendor" },
    { id: "fte",      label: "FTE" },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
      {/* Sub-header: back + function name + tab switcher */}
      <div className="px-5 py-3 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            {getIcon("ChevronUp", { size: 12, className: "rotate-[-90deg]" })} Back to functions
          </button>
          <span className="text-gray-300">|</span>
          <div className="text-sm font-semibold text-gray-900 truncate">{fn.name}</div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${tab === t.id ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div className="p-5">
          {/* Discovery synthesis card always pinned on top — same card for every tab */}
          <FunctionCard fn={fn} compact />

          {tab === "combined" && <FunctionCombinedTab fn={fn} />}
          {tab === "vendor"   && <FunctionVendorTab   fn={fn} />}
          {tab === "fte"      && <FunctionFteTab      fn={fn} />}
        </div>
      </div>
    </div>
  );
}

function FunctionCombinedTab({ fn }) {
  const data = fn.combined || { activities: [] };
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Activity grid</div>
        <div className="flex items-center gap-1">
          {["Grid", "Bubble", "Driver flow"].map((v, i) => (
            <button key={v} className={`text-[11px] px-2 py-1 rounded-md ${i === 0 ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-500 hover:bg-gray-50"}`}>{v}</button>
          ))}
        </div>
      </div>
      {data.activities.length > 0 ? (
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
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
          </thead>
          <tbody>
            {data.activities.map((a, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 cursor-pointer">
                <td className="px-3 py-2.5 font-medium text-gray-900">{a.name}</td>
                <td className="px-3 py-2.5 text-gray-700">{a.subFn}</td>
                <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.labor}</td>
                <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.nonLabor}</td>
                <td className="px-3 py-2.5 text-gray-700">{a.driver}{a.lowConf ? "*" : ""}</td>
                <td className="px-3 py-2.5 text-right text-gray-800">{a.volume}</td>
                <td className="px-3 py-2.5 text-right text-gray-800 font-medium">{a.unitCost}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[a.conf] || CONFIDENCE_STYLES.Med}`}>{a.conf}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-4 py-10 text-center text-xs text-gray-400">
          Activity grid not yet populated for this function. Ask AI ZBO on the left to run discovery.
        </div>
      )}
      {data.footer && (
        <div className="px-4 py-2 border-t border-gray-100 text-[11px] text-gray-500">{data.footer}</div>
      )}
    </div>
  );
}

function FunctionVendorTab({ fn }) {
  const data = fn.vendor || { rows: [] };
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Vendor enrichment → activity assignment</div>
        <div className="text-[11px] text-gray-500">Cost Center · GL Code · Cost Element are the enrichment fields driving the AI's classification</div>
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
              <th className="text-left  px-3 py-2 font-medium">→ Activity</th>
              <th className="text-center px-3 py-2 font-medium">Conf</th>
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
                <td className="px-3 py-2.5 text-blue-700 font-medium">{r.activity}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[r.conf] || CONFIDENCE_STYLES.Med}`}>{r.conf}</span>
                </td>
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

function FunctionFteTab({ fn }) {
  const data = fn.fte || { rows: [] };
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">HRIS census → activity estimate</div>
        <div className="text-[11px] text-gray-500">Job Family + Cost Center are the enrichment fields driving the AI's primary-activity inference</div>
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
              <th className="text-left  px-3 py-2 font-medium">→ Primary Activity</th>
              <th className="text-center px-3 py-2 font-medium">Conf</th>
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
                <td className="px-3 py-2.5 text-blue-700 font-medium">{r.primaryActivity}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${CONFIDENCE_STYLES[r.conf] || CONFIDENCE_STYLES.Med}`}>{r.conf}</span>
                </td>
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

function SgaTabContent({ sga, onOpenFn }) {
  // Sort the rail by total spend (largest first). Legal sits inside A&E so it
  // shows up below the headline pools — but the user explicitly wanted Legal
  // active on entry, so we anchor on it.
  const sorted = [...(sga.functions || [])].sort((a, b) => (b.totalSpendNum || 0) - (a.totalSpendNum || 0));
  const [activeId, setActiveId] = React.useState("legal"); // Legal is the marquee
  const active = sga.functions.find(f => f.id === activeId) || sorted[0];

  if (!active) return null;
  const h = active.highlights || { cards: [], keyTakeaways: [] };

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

      {/* Right detail — Spend Highlights card */}
      <div className="flex-1 min-w-0">
        <SpendHighlightsCard
          title={`Spend Highlights — ${active.name}`}
          headerSubtitle={h.headerSubtitle}
          cards={h.cards}
          keyTakeaways={h.keyTakeaways}
          onMore={() => onOpenFn(active)}
        />
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
  // If the user clicked into a function (e.g., Legal), open the list-builder
  // deep-dive in place — same workspace, full pane, with Combined / Vendor /
  // FTE tabs. Returning to the dashboard restores the tab state.
  const [openFn, setOpenFn] = React.useState(null);
  const defaultTab = (data.tabs || []).find((t) => t.default)?.id || (data.tabs && data.tabs[0]?.id) || "sga";
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  if (openFn) {
    return <FunctionDeepDive fn={openFn} onBack={() => setOpenFn(null)} />;
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
          ? <SgaTabContent sga={data.sga || { functions: [] }} onOpenFn={setOpenFn} />
          : <ValueChainTabContent stage={(data.valueChain || {})[activeTab]} />}

        {data.source && (
          <div className="text-[11px] text-gray-400 italic mt-5 border-t border-gray-100 pt-3">{data.source}</div>
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
