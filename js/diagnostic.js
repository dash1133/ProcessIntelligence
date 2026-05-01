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
      title: "Cost of Sales Vendor Enrichment",
      tabs: [
        { name: "Master",                        count: 223, active: true },
        { name: "SAP DT — Consulting Services",    count: 7 },
        { name: "Sensory UX — Outside Services",  count: 15 },
        { name: "Spend by Cost Center & Cost Element", count: 82 },
        { name: "Column Mapping",                 count: 16 },
      ],
      columns: ["row_number", "supplier_region", "supplier_number", "supplier_name", "cost_center_code", "cost_center_desc", "functional_area"],
      rows: [
        [1, "North America", "1017552", "Anderson Electric", "102345", "RGNL FACILITY MGT",   "Cost of Sales Other"],
        [2, "North America", "1020565", "Marks Commercial",   "102345", "RGNL FACILITY MGT",   "Cost of Sales Other"],
        [3, "North America", "1022479", "Tk Elevator",         "102345", "RGNL FACILITY MGT",   "Cost of Sales Other"],
        [4, "North America", "1019199", "Federal Express",     "102492", "R & M HANGAR",        "Cost of Sales Other"],
        [5, "North America", "1019229", "Fisher Scientific",   "103071", "SENSORY UX & ANALYTI","Cost of Sales Other"],
        [6, "North America", "1019514", "Grand And Toy",       "102641", "SAP DT",               "Cost of Sales Other"],
      ],
    }
  },
  data_cleansing: {
    conversations: [
      { name: "Mereon GL Code Analysis", active: true },
      { name: "Cost Elements by Sub-F…" },
      { name: "Mereon Spend by Cat…" },
      { name: "Vendor Spend Scatter b…" },
      { name: "R&D Spend Combo Chart" },
      { name: "Spend Type by Function …" },
      { name: "Conversation 1197" },
      { name: "Conversation 1196" },
    ],
    chat: [
      { role: "assistant",
        artifact: {
          title: "Mereon GL Code Analysis",
          intro: "Here is the full breakdown of **Cost Center 103071 — Sensory UX & Analytics** by function and sub-function:",
          sections: [
            { heading: "Function Overview",
              body: "The cost center is dominated by **Research & Development**, which accounts for the vast majority of spend. There are three functions present in this cost center:" },
            { bullets: [
              "**Research & Development** — primary function, split across two sub-functions:",
              "**Sensory & Consumer Testing** (~$2.10M): largest sub-function, covering external research vendors such as Sam Sensory and Consumer Research ($805K), MMR Research ($591K combined), Peryam & Kroll ($332K), and Blackstraw ($220K).",
              "**Food Science & Innovation** (~$254K): innovation-oriented spend, primarily Lux Research ($188K) and Peryam & Kroll Research GL ($66K).",
              "**Information Technology** — small allocation (~$4.8K) under Sensory & Consumer Testing.",
              "**Manufacturing** — minor allocation (~$388) under Health & Safety.",
            ]},
            { heading: "Summary Table", table: {
              cols: ["Function", "Sub-Function", "Total Spend"],
              rows: [
                ["Research & Development", "Sensory & Consumer Testing", "~$2,096,282"],
                ["Research & Development", "Food Science & Innovation",  "~$254,146"],
                ["Information Technology", "Sensory & Consumer Testing", "$4,757"],
                ["Manufacturing",          "Health & Safety",             "$388"],
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
      title: "Mereon Assessment Group — End-to-End Process Map",
      subtitle: "Top-level value chain · click any activity for detail · ask AI ZBO to reshape",
      steps: [
        { name: "Item Development",  color: "#3b82f6", activities: [
          { name: "Item Authoring",        tags: ["Manual"] },
          { name: "AI-Assisted Drafting",  tags: ["AI"] },
          { name: "Psychometric Review",   tags: ["Manual"] },
          { name: "Content QA",            tags: ["Manual"] },
        ]},
        { name: "Form Assembly",     color: "#6366f1", activities: [
          { name: "Form Blueprint",        tags: ["Manual"] },
          { name: "Item Selection",        tags: ["Manual"] },
          { name: "Exposure Control",      tags: ["Automated"] },
          { name: "Form Publish",          tags: ["Automated"] },
        ]},
        { name: "Test Delivery",     color: "#8b5cf6", activities: [
          { name: "Registration",          tags: ["Automated"] },
          { name: "Scheduling",            tags: ["Automated"] },
          { name: "Proctoring",            tags: ["Vendor"] },
          { name: "Test Administration",   tags: ["Vendor"] },
        ]},
        { name: "Scoring",           color: "#a855f7", activities: [
          { name: "AI Scoring",            tags: ["AI"] },
          { name: "Human Rater Scoring",   tags: ["Manual"] },
          { name: "Drift Monitoring",      tags: ["Automated"] },
          { name: "Score Validation",      tags: ["Manual"] },
        ]},
        { name: "Score Reporting",   color: "#d946ef", activities: [
          { name: "Score Generation",      tags: ["Automated"] },
          { name: "Report Templating",     tags: ["Automated"] },
          { name: "AI-Narrated Insights",  tags: ["AI"] },
          { name: "Score Release",         tags: ["Automated"] },
        ]},
        { name: "Customer & Renewals", color: "#ec4899", activities: [
          { name: "Test-Taker Support",    tags: ["Manual"] },
          { name: "Institutional Support", tags: ["Manual"] },
          { name: "Renewal Management",    tags: ["Manual"] },
          { name: "B2B Account Mgmt.",     tags: ["Manual"] },
        ]},
      ],
      chatLog: [
        { role: "user",      text: "Highlight every activity where AI is the dominant lever today and where it could be tomorrow." },
        { role: "assistant", text: "Today AI is the dominant lever in 3 activities: **AI-Assisted Drafting**, **AI Scoring**, and **AI-Narrated Insights**. Untapped opportunities sit in **Content QA**, **Item Selection**, **Drift Monitoring**, and **Test-Taker Support** — moving these to AI / automation lifts AI Automation Rate from 34% → 58% and structurally cuts cost-per-test by ~$5.10. Want me to add a 'next-gen' overlay to the map showing recommended target states?" },
      ]
    }
  },
  cost_to_serve: {
    artifact: {
      title: "Cost-to-Serve Analytics",
      subtitle: "Mereon Assessment Group · Q1 FY26",
      sections: [
        { heading: "Headline",
          body: "Cost-to-serve is concentrated in three product lines (Linguara Speaking & Writing, Mereon Skills Index, and Mereon AcademicEnglish) and two regions (APAC and EMEA). Together they account for 38% of revenue but 54% of fully-allocated cost." },
        { heading: "By Product Line", table: {
          cols: ["Product Line", "Revenue Share", "Cost Share", "Index"],
          rows: [
            ["Linguara — Reading & Listening",   "31%", "24%", "0.77 ✓"],
            ["GradPath",                          "22%", "20%", "0.91 ✓"],
            ["Linguara — Speaking & Writing",     "14%", "21%", "1.50 ✗"],
            ["Mereon Skills Index",               "8%",  "13%", "1.63 ✗"],
            ["Mereon AcademicEnglish",            "6%",  "11%", "1.83 ✗"],
            ["WorkLingua — Corporate",            "12%", "8%",  "0.67 ✓"],
            ["Other",                             "7%",  "3%",  "0.43 ✓"],
          ]
        }},
        { heading: "By Geography", table: {
          cols: ["Region", "Revenue Share", "Cost Share", "Index"],
          rows: [
            ["North America", "44%", "36%", "0.82 ✓"],
            ["EMEA",          "26%", "30%", "1.15 ✗"],
            ["APAC",          "22%", "28%", "1.27 ✗"],
            ["LATAM",         "8%",  "6%",  "0.75 ✓"],
          ]
        }},
        { heading: "Recommendation",
          body: "Three of the top cost-to-serve indices sit in product lines with the lowest AI scoring share (Linguara Speaking & Writing 38% AI, Mereon Skills Index 18%, Mereon AcademicEnglish 22%). Sequencing the AI scoring rollout into these lines and the APAC region first lifts blended cost-to-serve back inside target. See Initiative Sizing & Business Case for a quantified plan." },
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

function PreviewShell({ task, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 flex items-stretch justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[1200px] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0">
              {getIcon("ChevronUp", { size: 14, className: "rotate-[-90deg] text-gray-600" })}
            </button>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{task.label}</div>
              <div className="text-xs text-gray-500 truncate">{task.description}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <AppTypeBadge type={task.appType} />
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
              {getIcon("X", { size: 14 })}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-gray-50">{children}</div>
      </div>
    </div>
  );
}

// List Builder preview — chat panel + tabular grid with tabs (matches the
// Vendor Spend Analysis frame).
function ListBuilderPreview({ task }) {
  const data = TASK_PREVIEWS[task.id]?.grid;
  const chat = TASK_PREVIEWS[task.id]?.chat || [
    { role: "assistant", text: `This is a List Builder workspace for **${task.label}**. The chat on the left drives transformations on the grid on the right. Multiple tabs at the bottom hold related sheets (mapping tables, raw extracts, derived views).` }
  ];
  const grid = data || {
    title: task.label,
    tabs: [{ name: "Master", count: 0, active: true }],
    columns: ["id", "name", "value", "status"],
    rows: [["—", "—", "—", "—"]],
  };

  return (
    <div className="h-full flex">
      {/* Chat panel */}
      <div className="w-[420px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">AI</span>
            <span className="text-sm font-semibold text-gray-900">{task.label}</span>
          </div>
          <button className="text-xs text-gray-400 hover:text-blue-600">View template</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {chat.map((m, i) => (
            <div key={i} className={`text-xs leading-relaxed ${m.role === "user" ? "ml-auto bg-blue-600 text-white px-3 py-2 rounded-lg max-w-[85%]" : "bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg"}`}>
              {m.text.split("\n").map((line, li) => (
                <p key={li} className={li > 0 ? "mt-1" : ""} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
              ))}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <input className="flex-1 bg-transparent text-xs outline-none" placeholder="Ask your questions / select 'Files'…" />
            <button className="p-1 rounded bg-blue-600 text-white">{getIcon("Send", { size: 12 })}</button>
          </div>
        </div>
      </div>

      {/* Grid panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0">
          <div className="text-sm font-semibold text-gray-900">{grid.title}</div>
          <button className="text-gray-400 hover:text-blue-600">{getIcon("ArrowDownRight", { size: 14 })}</button>
        </div>
        <div className="flex-1 overflow-auto bg-white">
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
        <div className="px-5 py-2 border-t border-gray-200 bg-white flex items-center gap-4 flex-shrink-0 overflow-x-auto">
          {grid.tabs.map((t, i) => (
            <button key={i} className={`text-xs whitespace-nowrap pb-1 border-b-2 ${t.active ? "border-blue-600 text-blue-700 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
              {t.name} <span className="text-gray-400">({t.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Chat preview — conversation list + chat thread, may inline an artifact.
function ChatPreview({ task }) {
  const preview = TASK_PREVIEWS[task.id] || {};
  const conversations = preview.conversations || [
    { name: `${task.label} session`, active: true },
    { name: "Earlier session" },
  ];
  const messages = preview.chat || [
    { role: "assistant", text: `This is a Chat workspace for **${task.label}**. Conversations live in the left pane; the assistant produces inline artifacts on the right.` }
  ];

  return (
    <div className="h-full flex">
      {/* Conversation sidebar */}
      <div className="w-[260px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-100 flex-shrink-0">
          <div className="text-xs font-semibold text-gray-500 mb-2">Conversation</div>
          <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium border border-gray-200 rounded-lg py-1.5 hover:border-blue-300 hover:text-blue-600">
            {getIcon("MessageSquare", { size: 12 })} New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin">
          {conversations.map((c, i) => (
            <div key={i} className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs cursor-pointer ${c.active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
              <span className="truncate">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat / artifact area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-6 py-5 max-w-[900px] mx-auto">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-gray-900 mb-1">AI ZBO</div>
                {m.text && <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />}
                {m.artifact && <ArtifactBlock artifact={m.artifact} inline />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Artifact preview — focused report view. Dispatches to a specialized
// component when the artifact has a recognized `type`.
function ArtifactPreview({ task }) {
  const artifact = TASK_PREVIEWS[task.id]?.artifact || {
    title: task.label,
    subtitle: "Mereon Assessment Group",
    sections: [
      { heading: "Overview", body: `This is the **${task.label}** artifact. Artifacts are focused, shareable reports generated from the data foundation and analyses upstream.` },
      { heading: "What goes here", body: "Sections, tables, charts, and call-outs that summarize the finding. Each artifact is regenerable from its source data." },
    ],
  };
  if (artifact.type === "process_map") {
    return (
      <div className="h-full overflow-y-auto bg-white scrollbar-thin">
        <div className="px-8 py-8">
          <ProcessMapArtifact map={artifact} />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full overflow-y-auto bg-white scrollbar-thin">
      <div className="max-w-[900px] mx-auto px-8 py-8">
        <ArtifactBlock artifact={artifact} />
      </div>
    </div>
  );
}

// Visually-enriched, conversationally-shapeable artifact: chevron-based
// process map with sub-activity cards, tag legend, and a natural-language
// pane to ask AI ZBO to reshape it.
const PROCESS_MAP_TAG_STYLES = {
  AI:        "bg-blue-50 text-blue-700 border-blue-100",
  Automated: "bg-purple-50 text-purple-700 border-purple-100",
  Manual:    "bg-amber-50 text-amber-700 border-amber-100",
  Vendor:    "bg-emerald-50 text-emerald-700 border-emerald-100",
};

function ProcessMapArtifact({ map }) {
  const [draft, setDraft] = React.useState("");
  const [log, setLog] = React.useState(map.chatLog || []);
  const submit = () => {
    if (!draft.trim()) return;
    setLog([...log, { role: "user", text: draft.trim() }, { role: "assistant", text: "Got it — reshaping the map. (Demo: edits are applied conceptually; in production this would update the artifact in place.)" }]);
    setDraft("");
  };

  const cols = map.steps.length;
  const colCls = cols === 6 ? "grid-cols-6" : cols === 5 ? "grid-cols-5" : "grid-cols-4";

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{map.title}</h2>
          <p className="text-xs text-gray-500 mt-1">{map.subtitle}</p>
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
      <div className={`grid ${colCls} gap-3 mb-8`}>
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

      {/* Natural-language shaping pane */}
      <div className="border-t border-gray-200 pt-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</span>
          <span className="text-sm font-semibold text-gray-900">Shape this map with AI ZBO</span>
        </div>
        <div className="space-y-2 mb-3">
          {log.map((m, i) => (
            <div key={i} className={m.role === "user"
              ? "ml-auto bg-blue-600 text-white text-xs px-3 py-2 rounded-lg max-w-[80%]"
              : "bg-gray-50 border border-gray-200 text-xs text-gray-700 px-3 py-2 rounded-lg max-w-[90%] leading-relaxed"
            } dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <span className="text-gray-300">{getIcon("Sparkles", { size: 14 })}</span>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") submit(); }}
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
            placeholder="e.g. Highlight target-state AI lanes, or collapse Test Delivery into a single bar…"
          />
          <button onClick={submit} className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">{getIcon("Send", { size: 12 })}</button>
        </div>
      </div>
    </div>
  );
}

function ArtifactBlock({ artifact, inline = false }) {
  return (
    <div className={inline ? "mt-3 border border-gray-200 rounded-xl p-5 bg-white" : ""}>
      {artifact.title && <h2 className="text-xl font-bold text-gray-900 mb-1">{artifact.title}</h2>}
      {artifact.subtitle && <div className="text-xs text-gray-500 mb-4">{artifact.subtitle}</div>}
      {artifact.intro && <p className="text-sm text-gray-700 mb-5" dangerouslySetInnerHTML={{ __html: artifact.intro.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />}
      {(artifact.sections || []).map((s, i) => (
        <div key={i} className={i > 0 ? "mt-5" : ""}>
          {s.heading && <h3 className="text-sm font-semibold text-gray-900 mb-2 border-t border-gray-100 pt-4">{s.heading}</h3>}
          {s.body && <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />}
          {s.bullets && (
            <ul className="text-sm text-gray-700 leading-relaxed space-y-1 list-disc pl-5">
              {s.bullets.map((b, bi) => (
                <li key={bi} dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
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

function TaskPreview({ task, onClose }) {
  if (!task) return null;
  return (
    <PreviewShell task={task} onClose={onClose}>
      {task.appType === "list-builder" && <ListBuilderPreview task={task} />}
      {task.appType === "chat" && <ChatPreview task={task} />}
      {task.appType === "artifact" && <ArtifactPreview task={task} />}
    </PreviewShell>
  );
}

// ── TASK TILE ──

function TaskTile({ task, onOpen }) {
  return (
    <div
      onDoubleClick={() => onOpen(task)}
      className="flex items-center justify-between gap-2 bg-white border border-blue-100 rounded-lg px-3 py-2.5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
      title="Double-click to open preview"
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
    <div className="overflow-y-auto h-full scrollbar-thin" style={{ background: "#f5f7fa" }}>
      {/* Sub-header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm">
          {getIcon("Home", { size: 14, className: "text-gray-400" })}
          <span className="text-gray-500">Cost optimization</span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">Mereon Assessment Group</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-sm">
            {getIcon("Shield", { size: 14, className: "text-white" })}
            COST OPTIMIZATION
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            {getIcon("Package", { size: 14, className: "text-gray-500" })}
            SUPPLY CHAIN
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Client info card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">Mereon Assessment Group</h1>
                <span className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-semibold">i</span>
              </div>
              <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-xs">
                {[
                  { icon: "Briefcase", label: "Target Company", value: "Mereon Assessment Group" },
                  { icon: "Layers",    label: "Industry",       value: "Education" },
                  { icon: "FileText",  label: "Sub Industry",   value: "Testing & Assessment" },
                  { icon: "Users",     label: "Users",          value: "10" },
                  { icon: "Clock",     label: "Last Updated",   value: "4/30/2026" },
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
                  <span className="font-medium text-gray-800">ci+mereon_assessment@agpm.ai</span>
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
          <span className="text-gray-400">· double-click any task to preview</span>
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
                {g.tasks.map((t) => <TaskTile key={t.id} task={t} onOpen={setOpenTask} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {openTask && <TaskPreview task={openTask} onClose={() => setOpenTask(null)} />}
    </div>
  );
}
