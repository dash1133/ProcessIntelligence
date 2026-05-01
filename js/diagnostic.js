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
    { id: "process_mapping",  label: "Process Mapping",            appType: "artifact",     icon: "Layers",   description: "End-to-end value chain — visually shape the map in natural language." },
    { id: "activity_mapping", label: "Activity & Driver Mapping",  appType: "list-builder", icon: "Activity", description: "Activities and the cost drivers that scale them." },
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
      subtitle: "Farm-to-freezer ops with the SG&A indirect engine on top · ask AI ZBO to reshape",
      steps: [
        { name: "Agronomy & Sourcing",   color: "#3b82f6", activities: [
          { name: "Crop Forecasting",        tags: ["Manual"] },
          { name: "Grower Network Mgmt.",     tags: ["Manual"] },
          { name: "Procurement Contracts",    tags: ["Manual"] },
          { name: "Inbound QA",               tags: ["Vendor"] },
        ]},
        { name: "Raw Intake & Processing", color: "#6366f1", activities: [
          { name: "Cutting & Blanching",      tags: ["Automated"] },
          { name: "Frying",                   tags: ["Automated"] },
          { name: "Freezing Lines",           tags: ["Automated"] },
          { name: "Plant Ops & QC",           tags: ["Manual"] },
        ]},
        { name: "Packaging",              color: "#8b5cf6", activities: [
          { name: "Pack Engineering",         tags: ["Manual"] },
          { name: "Materials Procurement",    tags: ["Vendor"] },
          { name: "Brand Specs & Artwork",    tags: ["Manual"] },
          { name: "Labeling & Compliance",    tags: ["Automated"] },
        ]},
        { name: "Cold-Chain Warehousing", color: "#a855f7", activities: [
          { name: "Inventory Management",     tags: ["Automated"] },
          { name: "Cold Storage Ops",         tags: ["Vendor"] },
          { name: "Distribution Planning",    tags: ["Manual"] },
          { name: "Compliance & Audits",      tags: ["Manual"] },
        ]},
        { name: "Outbound Logistics",      color: "#d946ef", activities: [
          { name: "Carrier Management",       tags: ["Vendor"] },
          { name: "Route Optimization",       tags: ["Automated"] },
          { name: "Customer Delivery",        tags: ["Vendor"] },
          { name: "Returns & Reverse Logist.",tags: ["Manual"] },
        ]},
        { name: "Customer (QSR / Foodservice / Retail)", color: "#ec4899", activities: [
          { name: "Sales & Account Mgmt.",    tags: ["Manual"] },
          { name: "Competitive Scans",        tags: ["Manual"] },
          { name: "Brief Drafting",           tags: ["Manual"] },
          { name: "Post-Campaign Synthesis",  tags: ["Manual"] },
          { name: "Customer Contracts",       tags: ["Manual"] },
          { name: "Demand Planning",          tags: ["Manual"] },
        ]},
      ],
      chatLog: [
        { role: "user",      text: "Where on this map is AI the dominant lever today, and where is the biggest near-term opportunity on the SG&A side?" },
        { role: "assistant", text: "Today AI is the dominant lever in only a narrow set of activities: **Route Optimization**, **Labeling & Compliance**, and **Inventory Management** — each at the operational layer. The biggest near-term SG&A opportunities sit in activities that look operational on the chevron but actually live inside the indirect engine: **Customer Contracts** (Legal first-pass review), **Trade Marketing** (brief drafting and post-campaign synthesis), **Brand Specs & Artwork** (concept generation), and **Procurement Contracts** (NDA + vendor review). Moving these four lifts AI Automation Rate from **22% → 48%** and unlocks ~$155M in run-rate against the $1.8B SG&A base. Want me to overlay the SG&A engine on top of the chevron, with each activity mapped to its labor and non-labor pool?" },
      ]
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
const PROCESS_MAP_TAG_STYLES = {
  AI:        "bg-blue-50 text-blue-700 border-blue-100",
  Automated: "bg-purple-50 text-purple-700 border-purple-100",
  Manual:    "bg-amber-50 text-amber-700 border-amber-100",
  Vendor:    "bg-emerald-50 text-emerald-700 border-emerald-100",
};

// `embedded` skips the internal NL pane — use it when the artifact is rendered
// next to an external chat panel (the standard workspace layout).
function ProcessMapArtifact({ map, embedded = false }) {
  const cols = map.steps.length;
  const colCls = cols >= 6 ? "grid-cols-6" : cols === 5 ? "grid-cols-5" : "grid-cols-4";

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{map.title}</h2>
          {map.subtitle && <p className="text-xs text-gray-500 mt-1">{map.subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <span className="text-gray-500">Legend:</span>
          {Object.keys(PROCESS_MAP_TAG_STYLES).map(t => (
            <span key={t} className={`inline-flex items-center px-2 py-0.5 rounded border font-medium ${PROCESS_MAP_TAG_STYLES[t]}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Chevron flow */}
      <div className="flex items-stretch mb-6 -ml-2">
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

      {/* Sub-activity columns */}
      <div className={`grid ${colCls} gap-3 mb-2`}>
        {map.steps.map((step, i) => (
          <div key={i} className="space-y-2">
            {step.activities.map((a, ai) => (
              <div
                key={ai}
                className="bg-white border border-gray-200 rounded-md px-2.5 py-2 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                style={{ borderTopWidth: 2, borderTopColor: step.color }}
              >
                <div className="text-xs font-medium text-gray-800 leading-snug">{a.name}</div>
                {a.tags && a.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mt-1.5">
                    {a.tags.map(t => (
                      <span key={t} className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${PROCESS_MAP_TAG_STYLES[t] || "bg-gray-50 text-gray-600 border-gray-200"}`}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Inline NL pane is skipped when embedded — the workspace's left panel
          already provides the chat. Kept for any standalone usage. */}
      {!embedded && (
        <div className="border-t border-gray-200 pt-5 mt-6 text-xs text-gray-400 italic">
          Open in workspace to shape this map with AI ZBO.
        </div>
      )}
    </div>
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

  const submit = () => {
    const t = draft.trim();
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
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {log.map((m, i) => (
          <div
            key={i}
            className={m.role === "user"
              ? "ml-auto bg-blue-600 text-white text-xs px-3 py-2 rounded-lg max-w-[85%] leading-relaxed"
              : "bg-gray-50 border border-gray-200 text-xs text-gray-700 px-3 py-2 rounded-lg leading-relaxed"
            }
            dangerouslySetInnerHTML={{ __html: renderInlineMd(m.text).split("\n").join("<br/>") }}
          />
        ))}
        <div ref={endRef} />
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
          <button onClick={submit} className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700">{getIcon("Send", { size: 12 })}</button>
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

function DiagnosticView() {
  const [openTask, setOpenTask] = React.useState(null);

  return (
    <div className="flex flex-col h-full" style={{ background: "#f5f7fa" }}>
      {/* Static breadcrumb header — always visible, updates with the open task. */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2 text-sm flex-shrink-0">
        {getIcon("Home", { size: 14, className: "text-gray-400" })}
        <span className="text-gray-500">Cost optimization</span>
        <span className="text-gray-300">›</span>
        <button
          onClick={() => setOpenTask(null)}
          className={openTask ? "text-gray-500 hover:text-blue-600 transition-colors" : "font-semibold text-gray-900 cursor-default"}
        >
          NorthStar Frozen Foods
        </button>
        {openTask && (
          <>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-gray-900 truncate">{openTask.label}</span>
            <span className="ml-1 flex-shrink-0"><AppTypeBadge type={openTask.appType} /></span>
          </>
        )}
      </div>

      {/* Body — task list when no task is open, full workspace when one is. */}
      {openTask ? <TaskWorkspace task={openTask} /> : <DiagnosticHome onOpenTask={setOpenTask} />}
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
