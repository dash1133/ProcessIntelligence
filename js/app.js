const { useState, useRef, useEffect } = React;

// ── MAIN APP ──
function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [simValues, setSimValues] = useState({});
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [dashboardTab, setDashboardTab] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showWidgetMaster, setShowWidgetMaster] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [widgetPrompts, setWidgetPrompts] = useState({});
  const [showExpert, setShowExpert] = useState(null);
  const [kpiCategory, setKpiCategory] = useState("all");
  const [initiativeCategory, setInitiativeCategory] = useState("all");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setTimeout(() => {
      let response = "";
      const lower = text.toLowerCase();
      if (lower.includes("scoring") || lower.includes("sla") || lower.includes("backlog")) {
        response = "Here's the read on the constructed-response scoring queue:\n\n**Where the pain is:**\n- Linguara Speaking & Writing — 5.4-day backlog (SLA: 2.0)\n- GradPath Analytical Writing — 4.1-day backlog\n- WorkLingua Corporate — 3.8-day backlog\n\n**Root cause:** Active rater pool is down 22% YoY, while corporate-window volume is up 14%. AI scoring has only been turned on for a narrow set of item types.\n\n**My recommendation:** Move to a 70% AI / 30% human-review mix on Reading and Listening immediately, then ramp to constructed-response over 60 days. Clears the backlog inside a week and structurally drops cost per response from $1.85 → $1.20. Want me to model the rollout?";
      } else if (lower.includes("vendor") || lower.includes("proctor") || lower.includes("delivery")) {
        response = "I've analyzed Test Delivery vendor spend. The shape of the cost line:\n\n**1. Concentration risk** — 64% of online proctoring volume sits with ProctorOne, who just announced +18% MoM rate movement\n**2. Surcharge creep** — new $0.42/test infra surcharge effective May 1\n**3. Available alternatives** — ExamGuard and SecureProctor have bid 9–12% below current rates on equivalent SLAs\n\nA 2-vendor split plus an internal AI-proctoring lane absorbing 25–30% of volume would cut delivery unit cost from $11.20 → $8.40 per test.\n\n**Projected impact:** ~$6.2M annualized savings, ~9-month implementation. Should I open the simulation?";
      } else if (lower.includes("simulate") || lower.includes("what if") || lower.includes("scenario")) {
        response = "Ranked by ROI on cost-out, here are the simulations I'd run:\n\n**Ranked by ROI:**\n1. AI + Human Scoring Mix — 510% ROI ($2.1M invest, $4.8M annual savings)\n2. AI-Assisted Item Generation — 420% ROI ($3.4M invest)\n3. AI-Personalized Score Reporting — 380% ROI ($900K invest)\n4. Test Delivery Vendor Consolidation — 340% ROI ($1.8M invest, $6.2M annual savings)\n\nI can run any of these with custom variables. Which one first, or shall I run all four and compare?";
      } else if (lower.includes("compare") || lower.includes("product") || lower.includes("best") || lower.includes("worst")) {
        response = "Here's the cost-efficacy view across product lines:\n\n**Best (Tier A):**\n- Linguara Reading & Listening — $28.40/test, 71% AI scoring share, 64 NPS\n- GradPath — $36.20/test, 58% AI scoring share, 66 NPS\n\n**Worst (Tier C):**\n- Mereon Skills Index — $58.40/test, 18% AI scoring share, 51 NPS\n- Mereon AcademicEnglish — $52.70/test, 22% AI scoring share, 55 NPS\n\nThe gap is 2.1x on cost per test, and AI scoring share is the dominant explanatory variable. Want me to deep-dive on what's holding AI adoption back in the Tier C lines?";
      } else {
        response = "I've analyzed that against the workspace data. A few things worth flagging right now:\n\n- Cost-to-Revenue is at 68.4% vs 58% target (+10.4pp gap), with revenue −6.4% YoY\n- AI Automation Rate is 34% vs 65% target — biggest single lever on cost-out\n- Northstar University System renewal ($8.4M ACV) closes May 22 and is currently flagged at-risk\n\nI can dig deeper into any area. You can also ask me to run a what-if simulation, compare product lines, or pull any specific cost-efficacy metric.";
      }
      setChatMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1200);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "Home" },
    { id: "alerts", label: "Alerts", icon: "Bell", badge: ALERTS.filter(a => a.priority === "critical").length },
    { id: "chat", label: "My Chat", icon: "MessageSquare" },
    { id: "simulate", label: "Simulations", icon: "Brain" },
  ];

  // ── ROOT CAUSE ANALYSIS PROMPTS ──
  const getRCAPrompt = (alert) => {
    const rcaMap = {
      "Item Bank Quality": `Run a root cause analysis on this alert: "${alert.title}". Identify: 1) which forms and product lines are driving the attrition–replenishment gap, 2) authoring throughput vs. psychometric review pass rates over the last 6 months, 3) likely root cause (author capacity, review bottleneck, or AI-generation pilot under-scaled), and 4) a prioritized remediation plan including AI-assisted item generation rollout with unit-cost projections.`,
      "Customer Risk":     `Run a root cause analysis on this alert: "${alert.title}". Analyze: 1) what is driving the renewal risk — pricing vs. peer benchmark, score-release SLA, or a competitor incumbency, 2) the account's usage history, complaint signals, and stakeholder map, 3) which Mereon process levers (AI scoring mix, vendor consolidation, AI-narrated reporting) most directly close the perceived value gap, and 4) a recommended counter-bid with pricing, SLA commitments, and timing.`,
      "Process Health":    `Run a root cause analysis on this alert: "${alert.title}". Identify: 1) which queues, item types, and product lines are driving the SLA breach risk, 2) capacity vs. volume curves over the past 90 days and whether AI offload has been ramped, 3) likely root cause (rater pool decline, volume spike, AI rollout under-scaled), and 4) a remediation plan that combines short-term human capacity moves with structural AI scoring share increases and the implied unit-cost change.`,
      "Cost Overrun":      `Run a root cause analysis on this alert: "${alert.title}". Identify: 1) which vendors, contracts, and process areas are driving the cost overrun, 2) whether this is rate movement, volume, or scope creep, 3) which alternative sources (competing vendors, internal AI lanes, make-vs-buy) are credibly available within the contract window, and 4) a recommended action sequence: RFP timing, parallel-track AI proof of concept, and contract renegotiation levers.`,
      "Capacity Risk":     `Run a root cause analysis on this alert: "${alert.title}". Analyze: 1) the demand vs. confirmed capacity curve for the affected window, by region and channel, 2) whether the gap is brick-and-mortar, online-proctored, or rater capacity, 3) lead times for each capacity lever (uplift, vendor overflow, internal AI proctoring), and 4) the fastest resolution path with cost, revenue protected, and any SLA exposure.`,
    };
    return rcaMap[alert.category] || `Run a root cause analysis on: "${alert.title}". Context: ${alert.detail}`;
  };

  // ── A&M EXPERT MODAL ──
  const renderExpertModal = () => {
    const ex = showExpert;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(15,23,42,0.55)" }} onClick={() => setShowExpert(null)}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ width: 460, maxWidth: "95vw" }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100" style={{ background: "#0f1f3d" }}>
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold tracking-widest text-white opacity-70">ALVAREZ & MARSAL</div>
              <div className="w-px h-4 bg-white opacity-20"></div>
              <div className="text-xs text-white opacity-50">Expert Connect</div>
            </div>
            <button onClick={() => setShowExpert(null)} className="p-1 rounded-lg text-white opacity-50 hover:opacity-100 transition-opacity">
              {getIcon("X", { size: 16 })}
            </button>
          </div>

          {/* Expert card */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm" style={{ background: ex.color }}>
                {ex.avatar}
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900">{ex.name}</div>
                <div className="text-sm text-gray-500 mb-2">{ex.title}</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  {getIcon("MapPin", { size: 11 })} {ex.location}
                </div>
              </div>
              <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: ex.color + "18", color: ex.color }}>A&M Expert</div>
            </div>

            {/* Expertise tags */}
            <div className="mb-5">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Areas of Expertise</div>
              <div className="flex flex-wrap gap-1.5">
                {ex.expertise.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 bg-gray-50">{tag}</span>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="rounded-xl border border-gray-100 overflow-hidden mb-4">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                {getIcon("MessageCircle", { size: 15, className: "text-gray-400 flex-shrink-0" })}
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400 font-medium">Email</div>
                  <div className="text-sm text-gray-800 font-medium">{ex.email}</div>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">Send</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                {getIcon("Phone", { size: 15, className: "text-gray-400 flex-shrink-0" })}
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400 font-medium">Direct Line</div>
                  <div className="text-sm text-gray-800 font-medium">{ex.phone}</div>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded">Copy</span>
              </div>
            </div>

            <button onClick={() => setShowExpert(null)} className="w-full text-sm text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity" style={{ background: "#0f1f3d" }}>
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── WIDGET PREVIEW MINI-CHARTS ──
  const getWidgetPreview = (id) => {
    const Bars = ({ vals, colors }) => (
      <div className="px-4 pb-4">
        <div className="flex items-end gap-1.5 h-16">
          {vals.map((v, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: v + "%", background: colors[i % colors.length] }}></div>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1">{vals.map((_, i) => <div key={i} className="flex-1 h-0.5 rounded bg-gray-100"></div>)}</div>
      </div>
    );
    const LineChart = ({ points, color }) => {
      const max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
      const h = 55, w = 220;
      const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / range) * (h - 6)}`).join(" ");
      return (
        <div className="px-4 pb-4">
          <svg width="100%" height="65" viewBox={`0 0 ${w} ${h + 8}`} preserveAspectRatio="none">
            <polyline fill={color + "22"} stroke="none" points={`0,${h} ${pts} ${w},${h}`} />
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
          </svg>
        </div>
      );
    };
    if (id === "ai_scoring_adoption") return (
      <div className="px-4 pb-4">
        <div className="flex items-end gap-2 h-16 mb-2">
          {[{ tier: "Reading", pct: 80, color: "#bfdbfe" }, { tier: "Listening", pct: 70, color: "#bfdbfe" }, { tier: "Writing", pct: 35, color: "#fef3c7" }, { tier: "Speaking", pct: 22, color: "#fce7f3" }].map((t, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t" style={{ height: t.pct + "%", background: t.color }}></div>
              <span className="text-[10px] font-semibold text-gray-500">{t.tier}</span>
            </div>
          ))}
        </div>
      </div>
    );
    if (id === "item_bank_coverage") return (
      <div className="px-4 pb-4 space-y-1.5">
        {[{ from: "Linguara Reading Form A", lift: "−312" }, { from: "GradPath Quant Form B", lift: "−180" }, { from: "EduCert Math Form C", lift: "+44" }].map((r, i) => (
          <div key={i} className="flex items-center justify-between bg-emerald-50 rounded-lg px-3 py-1.5">
            <span className="text-xs text-gray-600 truncate">{r.from}</span>
            <span className={`text-xs font-bold ml-2 flex-shrink-0 ${r.lift.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>{r.lift}</span>
          </div>
        ))}
      </div>
    );
    if (id === "vendor_spend") return <Bars vals={[90, 55, 40, 75, 30, 65, 50]} colors={["#fca5a5", "#c7d2fe", "#c7d2fe", "#fca5a5", "#c7d2fe", "#c7d2fe", "#c7d2fe"]} />;
    if (id === "scoring_sla_tracker") return (
      <div className="px-4 pb-4 space-y-1.5">
        {[{ sku: "Linguara · CR Speaking", days: "5.4d", crit: true }, { sku: "GradPath · Analytical Writing", days: "4.1d", crit: true }, { sku: "WorkLingua · CR", days: "3.8d", crit: false }].map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg px-3 py-1.5 border border-gray-100">
            <span className="text-xs font-medium text-gray-700">{r.sku}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.crit ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{r.days}</span>
          </div>
        ))}
      </div>
    );
    if (id === "test_center_utilization") return <Bars vals={[92, 88, 95, 76, 83, 91]} colors={["#fed7aa", "#fed7aa", "#fecaca", "#d1fae5", "#fed7aa", "#fecaca"]} />;
    if (id === "cost_per_test") return <LineChart points={[34, 36, 35, 38, 37, 40, 39, 41, 42, 42.3]} color="#8b5cf6" />;
    if (id === "process_cycle_time") return (
      <div className="px-4 pb-4">
        {[{ label: "Item → Approved", pct: 38 }, { label: "Form Assembly", pct: 72 }, { label: "Delivery → Score", pct: 48 }, { label: "Score → Reported", pct: 92 }].map((r, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between text-xs mb-0.5"><span className="text-gray-500">{r.label}</span><span className="font-semibold text-gray-800">{r.pct}%</span></div>
            <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-1.5 rounded-full transition-all" style={{ width: r.pct + "%", background: r.pct > 80 ? "#06b6d4" : r.pct > 60 ? "#f97316" : "#ef4444" }}></div></div>
          </div>
        ))}
      </div>
    );
    if (id === "renewal_risk") return (
      <div className="px-4 pb-4">
        <div className="flex items-end gap-2 h-16 mb-2">
          {[{ tier: "Safe",   pct: 70, color: "#d1fae5" }, { tier: "Watch", pct: 50, color: "#fef3c7" }, { tier: "At Risk", pct: 35, color: "#fed7aa" }, { tier: "Critical", pct: 15, color: "#fecaca" }].map((t, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t" style={{ height: t.pct + "%", background: t.color }}></div>
              <span className="text-[10px] font-semibold text-gray-500">{t.tier}</span>
            </div>
          ))}
        </div>
      </div>
    );
    if (id === "ai_quality_drift") return <LineChart points={[0.96, 0.95, 0.95, 0.94, 0.94, 0.93, 0.94, 0.93, 0.92, 0.93].map(v => v * 100 - 90)} color="#14b8a6" />;
    if (id === "infra_cost_per_test") return (
      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
        {[{ label: "Cloud",   val: "$2.10", color: "#f59e0b" }, { label: "Engine",  val: "$1.40", color: "#10b981" }, { label: "Reports", val: "$0.60", color: "#6366f1" }].map((m, i) => (
          <div key={i} className="rounded-lg p-2.5 text-center" style={{ background: m.color + "18" }}>
            <div className="text-lg font-bold" style={{ color: m.color }}>{m.val}</div>
            <div className="text-[10px] text-gray-500 mt-0.5 font-medium">{m.label}</div>
          </div>
        ))}
      </div>
    );
    return <Bars vals={[70, 85, 60, 90, 75, 55]} colors={["#dbeafe", "#dbeafe", "#dbeafe", "#dbeafe", "#dbeafe", "#dbeafe"]} />;
  };

  // ── WIDGET MASTER MODAL ──
  const renderWidgetMaster = () => {
    const widgetId = selectedWidget || "ai_scoring_adoption";
    const w = WIDGET_CATALOGUE.find(x => x.id === widgetId) || WIDGET_CATALOGUE[0];
    const catColors = {
      Inventory: "bg-blue-50 text-blue-700", Margin: "bg-emerald-50 text-emerald-700",
      Supplier: "bg-orange-50 text-orange-700", "Data Quality": "bg-cyan-50 text-cyan-700",
      Finance: "bg-amber-50 text-amber-700", "Supply Risk": "bg-red-50 text-red-700",
    };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(15,23,42,0.55)" }} onClick={() => setShowWidgetMaster(false)}>
        <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden" style={{ width: 880, maxWidth: "95vw", height: 580, maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
          {/* Left Pane — Widget List */}
          <div className="w-64 flex-shrink-0 border-r border-gray-100 flex flex-col" style={{ background: "#f8fafc" }}>
            <div className="px-4 py-4 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900">Initiatives Library</div>
              <div className="text-xs text-gray-400 mt-0.5">{WIDGET_CATALOGUE.length} cost-efficacy levers</div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin py-1.5">
              {WIDGET_CATALOGUE.map(wgt => (
                <button key={wgt.id} onClick={() => setSelectedWidget(wgt.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all hover:bg-white ${widgetId === wgt.id ? "bg-white border-r-2 border-blue-500 shadow-sm" : ""}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: wgt.color + "1a" }}>
                    <div style={{ color: wgt.color }}>{getIcon(wgt.icon, { size: 15 })}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-800 truncate">{wgt.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{wgt.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Pane — Preview + Details */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: w.color + "1a" }}>
                  <div style={{ color: w.color }}>{getIcon(w.icon, { size: 18 })}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{w.name}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${catColors[w.category] || "bg-gray-100 text-gray-600"}`}>{w.category}</span>
                </div>
              </div>
              <button onClick={() => setShowWidgetMaster(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                {getIcon("X", { size: 18 })}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-5">
              {/* Widget Preview */}
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Preview</div>
                <div className="rounded-xl border border-gray-200 overflow-hidden" style={{ background: "#f8fafc" }}>
                  <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div style={{ color: w.color }}>{getIcon(w.icon, { size: 12 })}</div>
                      <span className="text-xs font-semibold text-gray-700">{w.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">Live</span>
                  </div>
                  {getWidgetPreview(w.id)}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">About this widget</div>
                <p className="text-sm text-gray-700 leading-relaxed">{w.description}</p>
              </div>

              {/* AI Personalization */}
              <div className="rounded-xl border border-blue-100 p-4" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  {getIcon("Sparkles", { size: 14, className: "text-blue-500" })}
                  <span className="text-xs font-semibold text-blue-800">Personalize with AI</span>
                </div>
                <p className="text-xs text-blue-600 mb-3 leading-relaxed">Tell the widget how to behave for your role, categories, and priorities.</p>
                <textarea
                  className="w-full text-sm bg-white border border-blue-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-800 placeholder-gray-400 resize-none"
                  rows={3}
                  placeholder={w.promptPlaceholder}
                  value={widgetPrompts[w.id] || ""}
                  onChange={e => setWidgetPrompts(p => ({ ...p, [w.id]: e.target.value }))}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-gray-400">Widgets update automatically from live data</span>
              <div className="flex gap-2">
                <button onClick={() => setShowWidgetMaster(false)} className="text-sm bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => setShowWidgetMaster(false)} className="text-sm text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5" style={{ background: "#1e3a6e" }}>
                  {getIcon("Grid", { size: 14, className: "text-white" })} Add to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── DASHBOARD VIEW ──
  const renderDashboard = () => (
    <div className="p-6 overflow-y-auto h-full scrollbar-thin" style={{ background: "#f5f7fa" }}>
      {/* Task Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                {getIcon("Zap", { size: 18, className: "text-white" })}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Good morning, Daniel. Here's where cost is running ahead of revenue.</h2>
            </div>
            <div className="ml-12 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Process lens:</span>
              {["Item Development", "Test Delivery", "Scoring Operations", "Score Reporting"].map((cat, i) => (
                <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">{cat}</span>
              ))}
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-100">Revenue −6.4% YoY</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"></span> Agent Online
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              {getIcon("Bot", { size: 14, className: "text-blue-600" })}
            </div>
            <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                placeholder="e.g. Where can I take cost out of Test Delivery without hurting SLA?"
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                onKeyDown={(e) => { if (e.key === "Enter" && e.target.value.trim()) { setActiveView("chat"); sendMessage(e.target.value); e.target.value = ""; } }}
              />
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                {getIcon("Paperclip", { size: 16 })}
              </button>
              <div className="w-px h-5 bg-gray-200"></div>
              <button className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" onClick={() => setActiveView("chat")}>
                {getIcon("Send", { size: 14 })}
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-3 ml-10 flex-wrap">
            {[
              { label: "Where is cost running ahead of revenue this quarter?", icon: "BarChart3" },
              { label: "Which initiatives close the most cost-to-revenue gap?", icon: "Target" },
              { label: "Show AI scoring readiness across product lines", icon: "Sparkles" },
              { label: "Vendor consolidation savings in Test Delivery", icon: "Layers" },
            ].map((q, i) => (
              <button key={i} onClick={() => { setActiveView("chat"); sendMessage(q.label); }} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all shadow-sm">
                {getIcon(q.icon, { size: 12, className: "text-gray-400" })} {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* My KPIs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">My KPIs</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot inline-block"></span> Live
              </span>
            </div>
            <div className="relative">
              <select
                value={kpiCategory}
                onChange={e => setKpiCategory(e.target.value)}
                className="appearance-none text-xs font-semibold bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-gray-700 hover:border-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm transition-all"
              >
                <option value="all">All Processes</option>
                <option value="Item Development">Item Development</option>
                <option value="Test Delivery">Test Delivery</option>
                <option value="Scoring Operations">Scoring Operations</option>
                <option value="Score Reporting">Score Reporting</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
          <button onClick={() => { setActiveView("chat"); sendMessage("Run a full cost-efficacy analysis across our processes — highlight where I am furthest from target and suggest the highest-leverage cost-out actions."); }} className="text-xs text-gray-500 hover:text-blue-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-blue-200 transition-all flex items-center gap-1.5 shadow-sm">
            {getIcon("Sparkles", { size: 12 })} Ask AI to explain
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {KPI_CARDS.map((kpi, i) => {
            const catData = kpiCategory !== "all" ? kpi.breakdown.find(b => b.cat === kpiCategory) : null;
            const d = catData ? { ...kpi, ...catData } : kpi;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all flex">
                <div className="w-1.5 flex-shrink-0" style={{ background: kpi.color }}></div>
                <div className="flex-1 px-5 py-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</div>
                    {kpiCategory !== "all" && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">{kpiCategory}</span>}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2 leading-none" style={{ letterSpacing: "-0.02em" }}>{d.value}</div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className={`flex items-center gap-0.5 text-xs font-semibold ${d.changeUp ? "text-emerald-600" : "text-red-500"}`}>
                      {d.changeUp
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                      }
                      {d.change}
                    </span>
                    <span className="text-xs text-gray-400">{d.changePeriod}</span>
                  </div>
                  {d.target && (
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Target</span>
                        <span className="text-sm font-bold text-gray-800">{d.target}</span>
                      </div>
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2.5">
                        <div className="absolute inset-y-0 left-0 rounded-full transition-all" style={{ width: d.progress + "%", background: kpi.color, opacity: 0.85 }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Gap to target</span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${d.gapGood ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>{d.gap}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost-Out Initiatives toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-700 mr-1">Cost-Out Initiatives</span>
          {["all", "Item Development", "Test Delivery", "Scoring Operations", "Score Reporting"].map(cat => (
            <button key={cat} onClick={() => setInitiativeCategory(cat)}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition-all border ${initiativeCategory === cat ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"}`}>
              {cat === "all" ? "All Processes" : cat}
            </button>
          ))}
        </div>
        <button onClick={() => { setSelectedWidget(null); setShowWidgetMaster(true); }} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex-shrink-0">
          {getIcon("Settings", { size: 13, className: "text-gray-400" })} Add / Edit
        </button>
      </div>

      {/* Row 1: Cost Reduction Initiatives + Process Automation Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Cost Reduction Initiatives — track progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getIcon("Target", { size: 18, className: "text-blue-500" })}
              <h3 className="text-base font-semibold text-gray-900">Cost Reduction Initiatives</h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">$18.4M committed FY26</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "On Track",   value: "5", sub: "of 9 active",      color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "At Risk",    value: "3", sub: "needs intervention", color: "text-amber-600",   bg: "bg-amber-50" },
              { label: "Off Track",  value: "1", sub: "escalate",          color: "text-red-600",     bg: "bg-red-50" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-lg p-3 text-center`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-600 font-medium mt-0.5">{s.label}</div>
                <div className="text-xs text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            {[
              { cat: "Test Delivery",      name: "Vendor Consolidation (ProctorOne RFP)",    target: "$6.2M", progress: 32, status: "on",  owner: "L. Park"  },
              { cat: "Scoring Operations", name: "AI Scoring Mix — 70/30 Constructed-Resp.", target: "$4.8M", progress: 58, status: "on",  owner: "P. Nair"  },
              { cat: "Item Development",   name: "AI-Assisted Item Generation Rollout",      target: "$3.4M", progress: 24, status: "risk", owner: "J. Walsh" },
              { cat: "Score Reporting",    name: "Reporting Infra Right-Sizing",             target: "$1.8M", progress: 71, status: "on",  owner: "D. Chen"  },
              { cat: "Test Delivery",      name: "Test Center Footprint Optimization",       target: "$1.2M", progress: 12, status: "off", owner: "L. Park"  },
              { cat: "Scoring Operations", name: "Rater Pool Productivity Program",          target: "$0.9M", progress: 44, status: "risk", owner: "P. Nair"  },
            ].filter(r => initiativeCategory === "all" || r.cat === initiativeCategory).map((r, i) => {
              const statusBar = { on: "bg-emerald-500", risk: "bg-amber-500", off: "bg-red-500" };
              const statusBadge = { on: "bg-emerald-50 text-emerald-700", risk: "bg-amber-50 text-amber-700", off: "bg-red-50 text-red-700" };
              const statusLabel = { on: "On Track", risk: "At Risk", off: "Off Track" };
              return (
                <div key={i} className="border border-gray-100 rounded-lg p-2.5 hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-gray-800 truncate">{r.name}</div>
                      <div className="text-[10px] text-gray-400">{r.cat} · {r.owner}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${statusBadge[r.status]}`}>{statusLabel[r.status]}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${statusBar[r.status]}`} style={{ width: `${r.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500 w-8 text-right">{r.progress}%</span>
                    <span className="text-xs font-semibold text-emerald-700 w-12 text-right">{r.target}</span>
                    <button onClick={() => { setActiveView("chat"); sendMessage("Walk me through progress and risks for the " + r.name + " initiative."); }} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors flex-shrink-0">Review</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Automation Opportunities — identify new initiatives */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getIcon("Sparkles", { size: 18, className: "text-emerald-500" })}
              <h3 className="text-base font-semibold text-gray-900">Process Automation Opportunities</h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">+$11.6M potential</span>
          </div>
          <div className="space-y-2.5">
            {[
              { cat: "Item Development",   from: "Manual item authoring",                to: "AI-assisted generation + psych. review",   lift: "−$3,100/item", volume: "8 product lines" },
              { cat: "Scoring Operations", from: "100% human CR scoring",                to: "70% AI / 30% human-review mix",            lift: "−$0.65/resp.", volume: "1.2M responses/qtr" },
              { cat: "Test Delivery",      from: "ProctorOne live online proctoring",     to: "Multi-vendor + internal AI proctoring",   lift: "−$2.80/test",  volume: "640K tests/qtr" },
              { cat: "Score Reporting",    from: "Static templated score reports",        to: "AI-narrated personalized reports",        lift: "−$1.30/test",  volume: "5.3K tickets deflected/qtr" },
            ].filter(s => initiativeCategory === "all" || s.cat === initiativeCategory).map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Today: <span className="text-gray-700 font-medium">{s.from}</span></div>
                    <div className="text-xs text-gray-400">Move to: <span className="text-emerald-700 font-medium">{s.to}</span></div>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{s.lift}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{s.cat} · {s.volume}</span>
                  <button onClick={() => { setActiveView("chat"); sendMessage("Build the business case for moving from \"" + s.from + "\" to \"" + s.to + "\"."); }} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">Build case</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Cost Efficacy by Process + Process Risk Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Cost Efficacy by Process */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon("BarChart3", { size: 18, className: "text-blue-500" })}
              <h3 className="text-base font-semibold text-gray-900">Cost Efficacy by Process</h3>
            </div>
            <span className="text-xs text-gray-400">Target: $34.00 / test</span>
          </div>
          <div className="px-5 pb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 font-medium text-gray-500 text-xs">Process</th>
                  <th className="text-right py-2.5 font-medium text-gray-500 text-xs">Volume / Qtr</th>
                  <th className="text-right py-2.5 font-medium text-gray-500 text-xs">Cost Efficacy</th>
                  <th className="text-right py-2.5 font-medium text-gray-500 text-xs">Cycle Time</th>
                  <th className="text-right py-2.5 font-medium text-gray-500 text-xs">AI Auto.</th>
                  <th className="text-right py-2.5 font-medium text-gray-500 text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Item Development",   managed: true,  volume: "8,420 items",     unitCost: "$4,250 / item",  efficacy: 0.66, cycle: "94 days",   ai: "28%", status: "warning"  },
                  { cat: "Test Delivery",      managed: true,  volume: "640K tests",      unitCost: "$18.60 / test",   efficacy: 0.78, cycle: "—",         ai: "41%", status: "critical" },
                  { cat: "Scoring Operations", managed: true,  volume: "1.2M responses",   unitCost: "$1.85 / resp.",   efficacy: 0.59, cycle: "4.2 days",  ai: "46%", status: "critical" },
                  { cat: "Score Reporting",    managed: true,  volume: "640K reports",     unitCost: "$4.10 / test",    efficacy: 1.00, cycle: "<1 day",    ai: "21%", status: "good"     },
                  { cat: "Customer Support",   managed: false, volume: "8.4K tickets",     unitCost: "$48 / ticket",    efficacy: 0.72, cycle: "1.8 days",  ai: "12%", status: "warning"  },
                  { cat: "Item Translation",   managed: false, volume: "1,200 items",     unitCost: "$1,820 / item",  efficacy: 0.84, cycle: "32 days",   ai: "8%",  status: "warning"  },
                  { cat: "Form Assembly",      managed: false, volume: "184 forms",       unitCost: "$22K / form",     efficacy: 0.92, cycle: "18 days",   ai: "31%", status: "good"     },
                  { cat: "Psychometric Review",managed: false, volume: "2,140 items",     unitCost: "$640 / item",     efficacy: 0.76, cycle: "11 days",   ai: "0%",  status: "warning"  },
                ].filter(r => initiativeCategory === "all" || r.cat === initiativeCategory).map((r, i) => {
                  const statusStyles = { good: "bg-emerald-50 text-emerald-700", warning: "bg-amber-50 text-amber-700", critical: "bg-red-50 text-red-700" };
                  const statusLabels = { good: "On target", warning: "Below target", critical: "Critical" };
                  const barColors = { good: "bg-emerald-500", warning: "bg-amber-500", critical: "bg-red-500" };
                  return (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="py-2.5 font-medium text-gray-900 text-sm">{r.cat}</td>
                      <td className="py-2.5 text-right text-gray-500 text-sm">{r.volume}</td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColors[r.status]}`} style={{ width: `${r.efficacy * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{r.unitCost}</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right text-gray-600 text-sm">{r.cycle}</td>
                      <td className="py-2.5 text-right text-gray-600 text-sm font-medium">{r.ai}</td>
                      <td className="py-2.5 text-right">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[r.status]}`}>{statusLabels[r.status]}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-3 flex justify-end">
              <button onClick={() => { setActiveView("chat"); sendMessage("Run cost-efficacy analysis across processes and identify the highest-leverage cost-out moves."); }} className="text-xs text-gray-500 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">Run AI Analysis</button>
            </div>
          </div>
        </div>

        {/* Process Risk Monitor */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getIcon("AlertTriangle", { size: 18, className: "text-amber-500" })}
              <h3 className="text-base font-semibold text-gray-900">Process Risk Monitor</h3>
            </div>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">8 active risks</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "SLA Breach",         value: "3",      color: "text-red-600",   bg: "bg-red-50"   },
              { label: "Capacity Shortfall", value: "2",      color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Cost at Risk",       value: "$5.4M",  color: "text-gray-800",  bg: "bg-gray-50"  },
              { label: "Revenue at Risk",    value: "$2.6M",  color: "text-gray-800",  bg: "bg-gray-50"  },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-lg p-3`}>
                <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            {[
              { cat: "Test Delivery",      label: "APAC test center capacity — May peak",   metric: "3,840 sessions short", risk: "critical", impact: "$1.2M" },
              { cat: "Scoring Operations", label: "CR scoring queue · 4.2-day SLA breach",  metric: "6 enterprise accts.",  risk: "critical", impact: "$320K" },
              { cat: "Test Delivery",      label: "ProctorOne rate spike +18% MoM",         metric: "Annualized impact",   risk: "critical", impact: "$2.1M" },
              { cat: "Item Development",   label: "Linguara form retirement risk",          metric: "1,228-item shortfall", risk: "high",     impact: "$1.4M" },
              { cat: "Score Reporting",    label: "Reporting infra cost outpacing volume",   metric: "+14% YoY vs +2% vol", risk: "high",     impact: "$0.4M" },
            ].filter(r => initiativeCategory === "all" || r.cat === initiativeCategory).map((r, i) => {
              const riskColors = { critical: "bg-red-100 text-red-700", high: "bg-amber-100 text-amber-700" };
              return (
                <div key={i} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded flex-shrink-0 ${riskColors[r.risk]}`}>{r.risk}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-700 truncate">{r.cat}</div>
                      <div className="text-[10px] text-gray-400 truncate">{r.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 truncate max-w-[120px]" title={r.metric}>{r.metric}</span>
                    <span className="text-xs font-medium text-red-600">{r.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setActiveView("chat"); sendMessage("Build me a mitigation plan for the active process risks across delivery, scoring, and item development."); }} className="mt-4 w-full text-xs bg-amber-50 border border-amber-200 text-amber-700 py-2 rounded-lg hover:bg-amber-100 transition-colors font-medium">Generate Mitigation Plan</button>
        </div>
      </div>

      {/* Row 3: Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            {getIcon("Bell", { size: 18, className: "text-gray-500" })}
            <h3 className="text-base font-semibold text-gray-900">Alerts</h3>
            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium ml-1">{ALERTS.filter(a => a.priority === "critical").length} critical</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Chief Operating Officer · Daniel Reyes</span>
            <button onClick={() => setActiveView("alerts")} className="text-xs text-blue-600 hover:underline font-medium">View all</button>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {ALERTS.map((alert) => {
            const catStyles = {
              "Item Bank Quality":{ badge: "bg-blue-100 text-blue-700",   icon: "bg-blue-100",   iconColor: "text-blue-500"   },
              "Customer Risk":    { badge: "bg-orange-100 text-orange-700", icon: "bg-orange-100", iconColor: "text-orange-500" },
              "Process Health":   { badge: "bg-purple-100 text-purple-700", icon: "bg-purple-100", iconColor: "text-purple-500" },
              "Cost Overrun":     { badge: "bg-amber-100 text-amber-700",  icon: "bg-amber-100",  iconColor: "text-amber-500"  },
              "Capacity Risk":    { badge: "bg-red-100 text-red-700",      icon: "bg-red-100",    iconColor: "text-red-500"    },
            };
            const priStyles = { critical: "bg-red-100 text-red-700 border-red-200", high: "bg-amber-100 text-amber-700 border-amber-200" };
            const audienceIcons = { user: "👤", group: "👥", enterprise: "🏢" };
            const cs = catStyles[alert.category] || catStyles["Item Bank Quality"];
            return (
              <div key={alert.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${cs.icon}`}>
                    {getIcon("AlertTriangle", { size: 15, className: cs.iconColor })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priStyles[alert.priority] || "bg-gray-100 text-gray-600 border-gray-200"}`}>{alert.priority}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cs.badge}`}>{alert.category}</span>
                      {(alert.categories || []).map((cat, ci) => (
                        <span key={ci} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{cat}</span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{alert.title}</p>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{alert.detail}</p>
                    <div className="flex items-start gap-3 bg-blue-50 rounded-lg px-3 py-2 mb-2.5">
                      <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide flex-shrink-0 mt-0.5">Action</span>
                      <span className="text-xs text-blue-800">{alert.action}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <button onClick={() => { setActiveView("chat"); sendMessage(getRCAPrompt(alert)); }} className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        {getIcon("MessageSquare", { size: 12, className: "text-white" })} AI Chat
                      </button>
                      <button onClick={() => setShowExpert(AM_EXPERTS[alert.category] || Object.values(AM_EXPERTS)[0])} className="flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium" style={{ background: "#0f1f3d" }}>
                        {getIcon("Users", { size: 12, className: "text-white" })} Call A&M Expert
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-gray-400">
                      <span>{getIcon("Clock", { size: 10, className: "inline mr-0.5 -mt-0.5" })}{alert.dateGenerated}</span>
                      <span>{audienceIcons[alert.audienceType]} {alert.audience}</span>
                      <span className={`px-1.5 py-0.5 rounded ${alert.frequency === "Real-time" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>{alert.frequency} · {alert.schedule}</span>
                      <span className="text-xs font-semibold" style={{color: alert.priority === "critical" ? "#dc2626" : "#d97706"}}>{alert.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 4: AI & EdTech News — full width, grouped by topic */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon("Sparkles", { size: 18, className: "text-blue-500" })}
            <h3 className="text-base font-semibold text-gray-900">AI &amp; EdTech News</h3>
          </div>
          <span className="text-xs text-gray-400">AI in Assessment · EdTech Industry · Policy &amp; Standards · AI Cost &amp; Tooling</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 divide-x divide-gray-100">
          {[
            { topic: "AI in Assessment", color: "text-blue-700", bg: "bg-blue-50", items: [
              { title: "Frontier Models Cross 0.94 Agreement on Constructed-Response Scoring vs Expert Raters",     time: "3 hours ago", source: "Journal of Educational Measurement",  impact: "AI scoring lever" },
              { title: "Pearson Pilots AI-Generated Reading Items Across Two Live Forms — 64% First-Pass Approval", time: "Yesterday",   source: "EdSurge",                              impact: "Item gen lever" },
              { title: "Open Adaptive-Testing Engine Released by University Consortium — Lower Cost Alternative",   time: "2 days ago", source: "Inside Higher Ed",                     impact: "Industry shift" },
            ]},
            { topic: "EdTech Industry", color: "text-emerald-700", bg: "bg-emerald-50", items: [
              { title: "Global Standardized-Test Volumes Soft −5.8% YoY as AI Skills Shift Hiring Signals",         time: "4 hours ago", source: "HolonIQ",         impact: "Revenue pressure" },
              { title: "Duolingo English Test Crosses 6,000 Accepting Institutions — Pricing 60% Below Peers",      time: "Yesterday",   source: "TechCrunch EDU",  impact: "Competitive risk" },
              { title: "Coursera & Khan Academy Launch AI Tutors That Embed Formative Assessment",                   time: "2 days ago", source: "EdSurge",          impact: "Channel shift" },
            ]},
            { topic: "Policy & Standards", color: "text-amber-700", bg: "bg-amber-50", items: [
              { title: "EU AI Act: Education-Sector AI Scoring Falls Under High-Risk Category — Audit Mandate 2027", time: "Yesterday",   source: "European Commission", impact: "Compliance" },
              { title: "Industry Coalition Publishes Fairness Standards for AI-Scored Constructed Responses",        time: "Yesterday",   source: "AERA",                impact: "Standards" },
              { title: "FERPA Guidance Update: Student-Response Data in LLM Training Pipelines",                     time: "2 days ago", source: "U.S. Dept. of Ed",     impact: "Compliance" },
            ]},
            { topic: "AI Cost & Tooling", color: "text-purple-700", bg: "bg-purple-50", items: [
              { title: "Anthropic Cuts Batch-Inference Pricing 50% — Implications for Large-Scale CR Scoring",      time: "2 hours ago", source: "Anthropic Newsroom",   impact: "Cost lever" },
              { title: "Open-Source 70B Scoring Models Now Match Proprietary on Reading Comprehension Tasks",        time: "Yesterday",   source: "Hugging Face",          impact: "Make-vs-buy" },
              { title: "ProctorOne Raises Live Proctoring Rates 14% + Surcharge — Two Vendors Bid Lower",           time: "Yesterday",   source: "Inside Higher Ed",      impact: "Cost pressure" },
            ]},
          ].map((section, si) => (
            <div key={si} className="p-5">
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${section.bg} ${section.color}`}>
                {section.topic}
              </div>
              <div className="space-y-3">
                {section.items.map((news, ni) => (
                  <div key={ni} className="flex items-start gap-2.5 group cursor-pointer" onClick={() => { setActiveView("chat"); sendMessage("How does this affect our cost-out plan and AI roadmap? News: " + news.title); }}>
                    <div className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full ${section.bg.replace("50","400")}`}></div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">{news.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="text-xs text-gray-400">{news.source}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{news.time}</span>
                        {news.impact && (
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${news.impact === "Positive" ? "bg-emerald-50 text-emerald-600" : news.impact === "Cost pressure" || news.impact === "Margin risk" || news.impact === "Supply risk" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>{news.impact}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── CHAT VIEW ──
  const renderChat = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-6 py-3.5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            {getIcon("Bot", { size: 16, className: "text-white" })}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Agentic PM Assistant</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
            </div>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-thin bg-gray-50/50">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">{getIcon("Bot", { size: 14, className: "text-white" })}</div>}
            <div className={`max-w-2xl rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-800 shadow-sm"}`}>
              <div className="text-sm whitespace-pre-line leading-relaxed">
                {msg.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? <strong key={j} className={msg.role === "user" ? "text-white" : "text-gray-900"}>{part.slice(2, -2)}</strong> : <span key={j}>{part}</span>
                )}
              </div>
              <div className={`text-xs mt-1.5 ${msg.role === "user" ? "text-blue-200" : "text-gray-400"}`}>{msg.timestamp}</div>
            </div>
            {msg.role === "user" && <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">{getIcon("User", { size: 14, className: "text-white" })}</div>}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* Quick Actions */}
      <div className="px-6 pt-3 pb-1 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Where is cost running ahead of revenue?", "Compare cost efficacy across product lines", "Run what-if on AI scoring mix", "Show vendor consolidation plan"].map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)} className="flex-shrink-0 text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors">{q}</button>
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="px-6 pb-5 pt-1 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <input ref={inputRef} type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(chatInput)} placeholder="Type your message..." className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400" />
          <button className="text-gray-300 hover:text-gray-500 transition-colors">
            {getIcon("Paperclip", { size: 16 })}
          </button>
          <button onClick={() => setIsListening(!isListening)} className={`p-1.5 rounded-lg transition-colors ${isListening ? "bg-red-100 text-red-600" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"}`}>
            {isListening ? getIcon("MicOff", { size: 16 }) : getIcon("Mic", { size: 16 })}
          </button>
          <button onClick={() => sendMessage(chatInput)} className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">{getIcon("Send", { size: 14 })}</button>
        </div>
        {isListening && <div className="mt-2 flex items-center gap-2 text-red-500 text-xs"><span className="animate-pulse-dot">.</span> Listening... speak your question</div>}
      </div>
    </div>
  );

  // ── ALERTS VIEW ──
  const renderAlerts = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-lg font-semibold text-gray-900">AI Agent Alerts</h2><p className="text-sm text-gray-500">Monitoring cost efficacy and process risk continuously</p></div>
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">{getIcon("Sparkles", { size: 12 })} AI Confidence Scores</div>
      </div>
      {ALERTS.map((alert) => (
        <div key={alert.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${alert.priority === "critical" ? "border-red-200" : alert.priority === "high" ? "border-amber-200" : "border-gray-200"}`}>
          <button onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)} className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors">
            <div className={`mt-0.5 p-2 rounded-lg ${alert.priority === "critical" ? "bg-red-100" : alert.priority === "high" ? "bg-amber-100" : "bg-blue-100"}`}>
              {getIcon("AlertTriangle", { size: 18, className: alert.priority === "critical" ? "text-red-600" : alert.priority === "high" ? "text-amber-600" : "text-blue-600" })}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1"><PriorityBadge priority={alert.priority} /></div>
              <h3 className="text-sm font-semibold text-gray-900">{alert.title}</h3>
              <div className="text-xs text-gray-400 mt-0.5">{alert.metric}</div>
            </div>
            {expandedAlert === alert.id ? getIcon("ChevronUp", { size: 18, className: "text-gray-400 mt-1" }) : getIcon("ChevronDown", { size: 18, className: "text-gray-400 mt-1" })}
          </button>
          {expandedAlert === alert.id && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="mt-4 space-y-3">
                <div><span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Analysis</span><p className="text-sm text-gray-700 mt-1 leading-relaxed">{alert.detail}</p></div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-blue-50 rounded-lg p-3"><span className="text-xs font-medium text-blue-600 uppercase tracking-wide">AI Recommendation</span><p className="text-sm text-blue-900 mt-1 leading-relaxed">{alert.action}</p></div>
                  <div className="bg-emerald-50 rounded-lg p-3 min-w-fit"><span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Impact</span><p className="text-sm font-semibold text-emerald-900 mt-1">{alert.impact}</p></div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 py-1">
                  <span>{getIcon("Clock", { size: 11, className: "inline mr-0.5" })}{alert.dateGenerated}</span>
                  <span>{alert.audience} · {alert.frequency}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => { setActiveView("chat"); sendMessage(getRCAPrompt(alert)); }} className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 font-medium">
                    {getIcon("MessageSquare", { size: 12 })} AI Chat — Root Cause Analysis
                  </button>
                  <button onClick={() => setShowExpert(AM_EXPERTS[alert.category] || Object.values(AM_EXPERTS)[0])} className="text-xs text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 font-medium" style={{ background: "#0f1f3d" }}>
                    {getIcon("Users", { size: 12, className: "text-white" })} Call A&M Expert
                  </button>
                  <button onClick={() => setActiveView("simulate")} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                    {getIcon("Brain", { size: 12 })} Simulate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── MODELS DATA ──
  const MODELS = [
    { id: "valuation_b", title: "Series B Valuation Model", subtitle: "Acme Corp", icon: "DollarSign", color: "purple", status: "Completed", updated: "Mar 4, 2026",
      description: "DCF and comparable company analysis for Series B round pricing. Includes revenue multiple, EBITDA bridge, and dilution scenarios.",
      inputs: { "Revenue Multiple": "12.4x", "Growth Rate": "38% YoY", "EBITDA Margin": "18.2%", "Discount Rate": "11.5%" },
      outputs: { "Pre-Money": "$142M", "Post-Money": "$168M", "Implied ARR Multiple": "35x", "IRR (5yr)": "28.4%" },
      variables: [{ name: "Revenue Growth", min: 15, max: 60, default: 38, unit: "%" }, { name: "Exit Multiple", min: 8, max: 25, default: 15, unit: "x" }, { name: "Discount Rate", min: 8, max: 18, default: 11.5, unit: "%" }],
      actions: ["Adjust Assumptions", "Export to Excel", "Share with LP"] },
    { id: "warehouse_net", title: "Warehouse Network Optimization", subtitle: "National Logistics", icon: "MapPin", color: "blue", status: "In Progress", updated: "Mar 5, 2026",
      description: "Multi-node warehouse placement model optimizing for delivery speed, cost, and demand coverage across 18 states.",
      inputs: { "Current Nodes": "12 warehouses", "Avg Delivery": "3.2 days", "Fulfillment Cost": "$4.80/unit", "Coverage": "82% next-day" },
      outputs: { "Optimal Nodes": "16 warehouses", "Avg Delivery": "1.8 days", "Fulfillment Cost": "$3.20/unit", "Coverage": "94% next-day" },
      variables: [{ name: "New Nodes", min: 0, max: 8, default: 4, unit: " locations" }, { name: "Budget Cap", min: 5, max: 50, default: 20, unit: "M" }, { name: "Speed Priority", min: 1, max: 10, default: 7, unit: "/10" }],
      actions: ["Adjust Parameters", "View Map", "Run Optimization"] },
    { id: "customer_conc", title: "Customer Concentration Risk", subtitle: "Portfolio-Wide", icon: "Target", color: "red", status: "Completed", updated: "Mar 3, 2026",
      description: "HHI-based concentration analysis across all portfolio companies. Flags revenue dependency risks and models diversification paths.",
      inputs: { "Top 5 Clients": "62% of Revenue", "HHI Index": "1,840", "Churn Risk": "3 accounts", "Renewal Rate": "87%" },
      outputs: { "Risk Rating": "Moderate-High", "Revenue at Risk": "$8.4M", "Diversification Gap": "18%", "Target HHI": "<1,200" },
      variables: [{ name: "Client Acquisition", min: 2, max: 20, default: 8, unit: " new" }, { name: "Pricing Strategy", min: -10, max: 15, default: 5, unit: "% lift" }, { name: "Churn Reduction", min: 0, max: 50, default: 25, unit: "%" }],
      actions: ["Stress Test", "View by Company", "Generate Report"] },
    { id: "unit_econ", title: "Unit Economics Model", subtitle: "SaaS Portfolio", icon: "Calculator", color: "emerald", status: "In Review", updated: "Mar 2, 2026",
      description: "Bottom-up unit economics for SaaS portfolio companies. LTV/CAC analysis with cohort-level payback periods and margin waterfalls.",
      inputs: { "Blended CAC": "$12,400", "Avg ACV": "$48K", "Gross Margin": "72%", "Logo Churn": "8.2% annual" },
      outputs: { "LTV": "$210K", "LTV/CAC": "16.9x", "Payback Period": "6.2 months", "Net Dollar Retention": "118%" },
      variables: [{ name: "ACV Growth", min: 0, max: 30, default: 12, unit: "%" }, { name: "Churn Target", min: 3, max: 12, default: 6, unit: "%" }, { name: "CAC Efficiency", min: -20, max: 20, default: 10, unit: "% improvement" }],
      actions: ["Cohort Deep Dive", "Compare Benchmarks", "Export Model"] },
    { id: "tariff_impact", title: "Tariff Impact Model", subtitle: "Cross-Portfolio", icon: "Shield", color: "amber", status: "Completed", updated: "Mar 1, 2026",
      description: "Quantifies cascading effects of US-China tariff escalations on supply chains, COGS, and margin compression across portfolio.",
      inputs: { "Exposed Revenue": "$340M", "Direct Tariff Cost": "$18M", "Supply Chain %": "42% Asia-sourced", "Current Margin": "34%" },
      outputs: { "Net Impact": "-$24M", "Margin After": "27%", "Mitigation Savings": "$9.2M", "Breakeven Tariff": "22%" },
      variables: [{ name: "Tariff Rate", min: 5, max: 40, default: 15, unit: "%" }, { name: "Reshoring %", min: 0, max: 60, default: 20, unit: "%" }, { name: "Price Pass-Through", min: 0, max: 80, default: 40, unit: "%" }],
      actions: ["Scenario Analysis", "Mitigation Plan", "Board Summary"] },
    { id: "rev_forecast", title: "Revenue Forecast Model", subtitle: "FY 2026-2028", icon: "TrendingUp", color: "indigo", status: "In Progress", updated: "Mar 5, 2026",
      description: "Multi-year revenue projection with bottoms-up segment analysis, seasonal adjustments, and probabilistic range modeling.",
      inputs: { "FY25 Revenue": "$1.2B", "Organic Growth": "12%", "M&A Pipeline": "$180M", "Win Rate": "34%" },
      outputs: { "FY26 Forecast": "$1.48B", "FY27 Forecast": "$1.82B", "FY28 Forecast": "$2.18B", "CAGR": "22%" },
      variables: [{ name: "Organic Growth", min: 5, max: 25, default: 12, unit: "%" }, { name: "Acquisitions", min: 0, max: 5, default: 2, unit: " deals" }, { name: "Market Headwind", min: 0, max: 15, default: 3, unit: "%" }],
      actions: ["Adjust Forecast", "Monte Carlo", "Board Deck Export"] },
  ];

  // ── MODELS VIEW ──
  const [activeModel, setActiveModel] = useState(null);
  const renderKPIs = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-lg font-semibold text-gray-900">Models</h2><p className="text-sm text-gray-500">Interactive data models — valuation, network optimization, risk analysis, and forecasting</p></div>
        <button onClick={() => { setActiveView("chat"); sendMessage("What model should I build next based on current priorities?"); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("Zap", { size: 12 })} Build New Model</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MODELS.map((model) => {
          const colorMap = { purple: "from-purple-500 to-purple-600", blue: "from-blue-500 to-blue-600", red: "from-red-500 to-red-600", emerald: "from-emerald-500 to-emerald-600", amber: "from-amber-500 to-amber-600", indigo: "from-indigo-500 to-indigo-600" };
          const statusColors = { "Completed": "bg-emerald-50 text-emerald-700", "In Progress": "bg-amber-50 text-amber-700", "In Review": "bg-blue-50 text-blue-700" };
          return (
          <div key={model.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[model.color]} flex items-center justify-center shadow-sm`}>
                    {getIcon(model.icon, { size: 18, className: "text-white" })}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{model.title}</h3>
                    <p className="text-xs text-gray-400">{model.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[model.status]}`}>{model.status}</span>
                  <span className="text-[10px] text-gray-400">{model.updated}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{model.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Key Inputs</span>
                  {Object.entries(model.inputs).map(([k, v]) => <div key={k} className="flex justify-between mt-1.5"><span className="text-xs text-gray-500">{k}</span><span className="text-xs font-medium text-gray-700">{v}</span></div>)}
                </div>
                <div className={`bg-${model.color === "red" ? "red" : model.color}-50 rounded-lg p-3`} style={{ backgroundColor: model.color === "purple" ? "#faf5ff" : model.color === "blue" ? "#eff6ff" : model.color === "red" ? "#fef2f2" : model.color === "emerald" ? "#ecfdf5" : model.color === "amber" ? "#fffbeb" : "#eef2ff" }}>
                  <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: model.color === "purple" ? "#7c3aed" : model.color === "blue" ? "#2563eb" : model.color === "red" ? "#dc2626" : model.color === "emerald" ? "#059669" : model.color === "amber" ? "#d97706" : "#4f46e5" }}>Outputs</span>
                  {Object.entries(model.outputs).map(([k, v]) => <div key={k} className="flex justify-between mt-1.5"><span className="text-xs" style={{ color: model.color === "purple" ? "#a78bfa" : model.color === "blue" ? "#93c5fd" : model.color === "red" ? "#fca5a5" : model.color === "emerald" ? "#6ee7b7" : model.color === "amber" ? "#fcd34d" : "#a5b4fc" }}>{k}</span><span className="text-xs font-semibold" style={{ color: model.color === "purple" ? "#6d28d9" : model.color === "blue" ? "#1d4ed8" : model.color === "red" ? "#b91c1c" : model.color === "emerald" ? "#047857" : model.color === "amber" ? "#b45309" : "#4338ca" }}>{v}</span></div>)}
                </div>
              </div>
              {activeModel === model.id && (
                <div className="space-y-3 mb-4 bg-gray-50 rounded-lg p-3">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Adjust Assumptions</span>
                  {model.variables.map((v, i) => {
                    const key = "model_" + model.id + "_" + i;
                    const val = simValues[key] ?? v.default;
                    return (<div key={i}><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">{v.name}</span><span className="font-medium text-gray-700">{val}{v.unit}</span></div><input type="range" min={v.min} max={v.max} value={val} step={v.unit === "%" && v.max <= 20 ? 0.5 : 1} onChange={(e) => setSimValues({...simValues, [key]: Number(e.target.value)})} className="w-full" /></div>);
                  })}
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 px-5 py-3 flex gap-2">
              <button onClick={() => setActiveModel(activeModel === model.id ? null : model.id)} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Calculator", { size: 12 })} {activeModel === model.id ? "Hide Variables" : model.actions[0]}</button>
              <button onClick={() => { setActiveView("chat"); sendMessage("Walk me through the " + model.title + " and key findings."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("MessageSquare", { size: 12 })} Explore Model</button>
              <button className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Maximize", { size: 12 })} {model.actions[2] || "Full View"}</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  // ── MEMOS DATA ──
  const MEMOS = [
    { id: "board_q1", title: "Q1 Board Memo", subtitle: "Quarterly Review", icon: "FileText", color: "blue", status: "Completed", updated: "Mar 3, 2026", audience: "Board of Directors", pages: 12,
      description: "Comprehensive Q1 review covering portfolio performance, market conditions, capital deployment, and strategic priorities for the next quarter.",
      sections: ["Executive Summary", "Portfolio Performance", "Capital Deployment", "Market Outlook", "Strategic Priorities", "Risk Assessment"],
      keyPoints: { "Revenue Growth": "+18% QoQ", "Portfolio MOIC": "2.4x", "Dry Powder": "$240M", "Exits Pipeline": "3 companies" },
      aiSuggestions: ["Add tariff impact analysis section", "Update valuation comps with latest market data", "Include LP co-investment opportunities"] },
    { id: "lp_update", title: "LP Quarterly Update Letter", subtitle: "Investor Relations", icon: "Users", color: "indigo", status: "In Progress", updated: "Mar 5, 2026", audience: "Limited Partners", pages: 8,
      description: "Formal LP communication covering fund performance, notable portfolio events, capital calls, and distribution forecasts.",
      sections: ["Fund Performance", "Portfolio Highlights", "Capital Activity", "Market Commentary", "Outlook & Distributions"],
      keyPoints: { "Net IRR": "24.2%", "DPI": "0.8x", "TVPI": "1.9x", "Capital Called": "$68M this quarter" },
      aiSuggestions: ["Benchmark against peer funds", "Highlight Acme Corp Series B success", "Add ESG metrics per LP request"] },
    { id: "ic_memo", title: "Investment Committee Memo — TechFlow", subtitle: "New Deal", icon: "Target", color: "purple", status: "In Review", updated: "Mar 4, 2026", audience: "Investment Committee", pages: 18,
      description: "Full IC memo for TechFlow acquisition. Covers business overview, financial analysis, due diligence findings, and deal structuring recommendations.",
      sections: ["Business Overview", "Market Analysis", "Financial Deep Dive", "Due Diligence Summary", "Deal Structure", "Risk Factors", "Recommendation"],
      keyPoints: { "Enterprise Value": "$85M", "Revenue Multiple": "8.2x", "Growth Rate": "42% YoY", "Gross Margin": "78%" },
      aiSuggestions: ["Run sensitivity on revenue multiple range", "Add competitive threat analysis", "Cross-reference with portfolio overlap"] },
    { id: "competitive_brief", title: "Competitive Landscape Brief", subtitle: "Market Intelligence", icon: "Shield", color: "amber", status: "Completed", updated: "Mar 2, 2026", audience: "Executive Team", pages: 6,
      description: "Analysis of competitive dynamics across our portfolio sectors. Tracks new entrants, M&A activity, pricing shifts, and market share movements.",
      sections: ["Market Map", "New Entrants", "M&A Activity", "Pricing Trends", "Market Share Shifts"],
      keyPoints: { "New Competitors": "4 identified", "M&A Deals": "12 in sector", "Price Pressure": "-3.2% avg", "Our Market Share": "14.8%" },
      aiSuggestions: ["Add Southeast Asia expansion analysis", "Include AI/automation competitive moat assessment", "Flag customer overlap with new entrants"] },
    { id: "ops_review", title: "Monthly Operations Review", subtitle: "Performance Tracking", icon: "Activity", color: "emerald", status: "Completed", updated: "Mar 1, 2026", audience: "Operating Partners", pages: 10,
      description: "Deep operational analysis across portfolio companies covering KPIs, team performance, tech infrastructure, and operational improvement initiatives.",
      sections: ["KPI Dashboard", "Team & Talent", "Technology & Infrastructure", "Improvement Initiatives", "Next Month Priorities"],
      keyPoints: { "Brands On-Track": "34 of 42", "NPS Avg": "62", "Tech Utilization": "72%", "Improvement ROI": "3.8x" },
      aiSuggestions: ["Highlight brands needing intervention", "Add predictive churn analysis", "Include tech stack consolidation savings"] },
    { id: "risk_memo", title: "Portfolio Risk Assessment", subtitle: "Risk Management", icon: "AlertTriangle", color: "red", status: "In Progress", updated: "Mar 5, 2026", audience: "Risk Committee", pages: 14,
      description: "Quarterly risk review covering concentration risk, market exposure, operational vulnerabilities, and macro headwinds across the full portfolio.",
      sections: ["Risk Heat Map", "Concentration Analysis", "Market Exposure", "Operational Risks", "Macro Headwinds", "Mitigation Actions"],
      keyPoints: { "High Risk Items": "7", "Revenue at Risk": "$24M", "Insurance Gaps": "2 identified", "Mitigation Progress": "68%" },
      aiSuggestions: ["Model recession scenario impact", "Add cybersecurity risk assessment", "Quantify regulatory change exposure"] },
  ];

  const [expandedMemo, setExpandedMemo] = useState(null);
  // ── MEMOS VIEW ──
  const renderCompare = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-lg font-semibold text-gray-900">Memos</h2><p className="text-sm text-gray-500">Board memos, LP updates, IC memos, and strategic briefs — drafted and refined by your AI agent</p></div>
        <button onClick={() => { setActiveView("chat"); sendMessage("Draft a new memo for me."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("FileText", { size: 12 })} Draft New Memo</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MEMOS.map((memo) => {
          const colorMap = { blue: "from-blue-500 to-blue-600", indigo: "from-indigo-500 to-indigo-600", purple: "from-purple-500 to-purple-600", amber: "from-amber-500 to-amber-600", emerald: "from-emerald-500 to-emerald-600", red: "from-red-500 to-red-600" };
          const bgMap = { blue: "#eff6ff", indigo: "#eef2ff", purple: "#faf5ff", amber: "#fffbeb", emerald: "#ecfdf5", red: "#fef2f2" };
          const accentMap = { blue: "#2563eb", indigo: "#4f46e5", purple: "#7c3aed", amber: "#d97706", emerald: "#059669", red: "#dc2626" };
          const statusColors = { "Completed": "bg-emerald-50 text-emerald-700", "In Progress": "bg-amber-50 text-amber-700", "In Review": "bg-blue-50 text-blue-700" };
          return (
          <div key={memo.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[memo.color]} flex items-center justify-center shadow-sm`}>
                    {getIcon(memo.icon, { size: 18, className: "text-white" })}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{memo.title}</h3>
                    <p className="text-xs text-gray-400">{memo.subtitle} · {memo.pages} pages · {memo.audience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[memo.status]}`}>{memo.status}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{memo.description}</p>
              {/* Sections */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Sections</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {memo.sections.map((s, i) => <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{s}</span>)}
                </div>
              </div>
              {/* Key Metrics */}
              <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: bgMap[memo.color] }}>
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accentMap[memo.color] }}>Key Figures</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
                  {Object.entries(memo.keyPoints).map(([k, v]) => <div key={k} className="flex justify-between"><span className="text-xs text-gray-500">{k}</span><span className="text-xs font-semibold" style={{ color: accentMap[memo.color] }}>{v}</span></div>)}
                </div>
              </div>
              {/* AI Suggestions - expandable */}
              {expandedMemo === memo.id && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    {getIcon("Sparkles", { size: 12, className: "text-blue-500" })}
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">AI Suggestions</span>
                  </div>
                  {memo.aiSuggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mt-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0"></span>
                      <span className="text-xs text-blue-700">{s}</span>
                      <button onClick={() => { setActiveView("chat"); sendMessage("For the " + memo.title + ": " + s); }} className="flex-shrink-0 text-[10px] text-blue-500 hover:text-blue-700 font-medium">Apply</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 px-5 py-3 flex gap-2">
              <button onClick={() => setExpandedMemo(expandedMemo === memo.id ? null : memo.id)} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Sparkles", { size: 12 })} {expandedMemo === memo.id ? "Hide Suggestions" : "AI Suggestions"}</button>
              <button onClick={() => { setActiveView("chat"); sendMessage("Review and refine the " + memo.title + ". Show me the executive summary."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("MessageSquare", { size: 12 })} Review with AI</button>
              <button className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Send", { size: 12 })} Share</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  // ── SIMULATOR VIEW ──
  const renderSimulate = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-lg font-semibold text-gray-900">Digital Twin Simulator</h2><p className="text-sm text-gray-500">Ask "what if" questions — your AI twin models the outcomes</p></div>
        <button onClick={() => { setActiveView("chat"); sendMessage("What simulation should I run first based on current priorities?"); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("MessageSquare", { size: 12 })} Ask AI to recommend</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SIMULATIONS.map((sim) => (
          <div key={sim.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">{getIcon("Brain", { size: 16, className: "text-blue-500" })}<h3 className="text-sm font-semibold text-gray-900">{sim.title}</h3></div>
              <p className="text-xs text-gray-500 mb-4">{sim.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current</span>{Object.entries(sim.baseline).map(([k, v]) => <div key={k} className="flex justify-between mt-1"><span className="text-xs text-gray-500">{k.replace(/([A-Z])/g, " $1").trim()}</span><span className="text-xs font-medium text-gray-700">{v}</span></div>)}</div>
                <div className="bg-blue-50 rounded-lg p-3"><span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Projected</span>{Object.entries(sim.projected).map(([k, v]) => <div key={k} className="flex justify-between mt-1"><span className="text-xs text-blue-400">{k.replace(/([A-Z])/g, " $1").trim()}</span><span className="text-xs font-semibold text-blue-700">{v}</span></div>)}</div>
              </div>
              {activeSimulation === sim.id && (
                <div className="space-y-3 mb-4 bg-gray-50 rounded-lg p-3">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Adjust Variables</span>
                  {sim.variables.map((v, i) => {
                    const key = sim.id + "_" + i;
                    const val = simValues[key] ?? v.default;
                    return (<div key={i}><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">{v.name}</span><span className="font-medium text-gray-700">{val}{v.unit}</span></div><input type="range" min={v.min} max={v.max} value={val} onChange={(e) => setSimValues({...simValues, [key]: Number(e.target.value)})} className="w-full" /></div>);
                  })}
                </div>
              )}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-gray-500">{getIcon("DollarSign", { size: 12 })} Invest: {sim.investment}</div>
                <div className="flex items-center gap-1 text-emerald-600 font-semibold">{getIcon("TrendingUp", { size: 12 })} ROI: {sim.roi}</div>
                <div className="flex items-center gap-1 text-gray-500">{getIcon("Clock", { size: 12 })} {sim.timeline}</div>
                <ConfidenceMeter value={sim.confidence} />
              </div>
            </div>
            <div className="border-t border-gray-100 px-5 py-3 flex gap-2">
              <button onClick={() => setActiveSimulation(activeSimulation === sim.id ? null : sim.id)} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Calculator", { size: 12 })} {activeSimulation === sim.id ? "Hide Variables" : "Adjust Variables"}</button>
              <button onClick={() => { setActiveView("chat"); sendMessage("Run full simulation for: " + sim.title + ". Show me the detailed projections."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("Play", { size: 12 })} Run Simulation</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PRESENTATIONS DATA ──
  const PRESENTATIONS = [
    { id: "sales_pipeline", title: "Sales Pipeline Presentation", subtitle: "Revenue Team", icon: "TrendingUp", color: "blue", status: "Completed", updated: "Mar 5, 2026", slides: 24, audience: "Sales Leadership",
      description: "Full pipeline review with deal stage analysis, conversion funnels, and AI-generated forecasts by segment and region.",
      topics: ["Pipeline Overview", "Deal Stage Analysis", "Conversion Funnel", "Regional Breakdown", "AI Forecast", "Action Items"],
      keyMetrics: { "Total Pipeline": "$12.6M", "Win Rate": "34%", "Avg Cycle": "42 days", "Forecast Accuracy": "89%" },
      aiOptions: ["Regenerate charts with latest data", "Add competitive win/loss analysis", "Create executive summary slide"] },
    { id: "board_deck", title: "Q1 Board Deck", subtitle: "Board Meeting", icon: "Briefcase", color: "indigo", status: "In Progress", updated: "Mar 5, 2026", slides: 36, audience: "Board of Directors",
      description: "Comprehensive board presentation covering financials, portfolio updates, market trends, and strategic initiatives for Q1 review.",
      topics: ["Financial Summary", "Portfolio Performance", "Market Conditions", "Strategic Initiatives", "Capital Allocation", "Risk Dashboard", "Q2 Outlook"],
      keyMetrics: { "Revenue": "$1.2B", "EBITDA Margin": "18.2%", "Portfolio MOIC": "2.4x", "Deployable Capital": "$240M" },
      aiOptions: ["Auto-update all financial charts", "Add appendix with detailed comps", "Generate speaker notes"] },
    { id: "lp_annual", title: "LP Annual Meeting Deck", subtitle: "Investor Day", icon: "Users", color: "purple", status: "In Review", updated: "Mar 4, 2026", slides: 48, audience: "Limited Partners",
      description: "Annual LP meeting materials including fund performance, case studies, market outlook, and new fund strategy presentation.",
      topics: ["Fund Overview", "Performance Attribution", "Case Studies", "Market Thesis", "New Fund Strategy", "Q&A Appendix"],
      keyMetrics: { "Net IRR": "24.2%", "DPI": "0.8x", "TVPI": "1.9x", "Quartile Rank": "Top 15%" },
      aiOptions: ["Add peer benchmarking slides", "Create interactive portfolio map", "Generate LP-specific talking points"] },
    { id: "competitive_pres", title: "Competitive Landscape Deck", subtitle: "Strategy Session", icon: "Shield", color: "amber", status: "Completed", updated: "Mar 2, 2026", slides: 18, audience: "Executive Team",
      description: "Visual competitive analysis with market maps, SWOT matrices, and strategic positioning frameworks across portfolio sectors.",
      topics: ["Market Map", "Competitor Profiles", "SWOT Analysis", "Positioning Framework", "Strategic Implications"],
      keyMetrics: { "Competitors Tracked": "28", "Market Share": "14.8%", "Threat Level": "Moderate", "Moat Score": "7.2/10" },
      aiOptions: ["Refresh with latest competitor data", "Add new entrant threat analysis", "Create one-page battle card"] },
    { id: "fundraise_pitch", title: "Fund IV Pitch Deck", subtitle: "Capital Raise", icon: "DollarSign", color: "emerald", status: "In Progress", updated: "Mar 5, 2026", slides: 30, audience: "Prospective LPs",
      description: "Fundraising deck for Fund IV featuring track record, strategy evolution, team bios, and investment thesis for the next vintage.",
      topics: ["Firm Overview", "Track Record", "Strategy Evolution", "Investment Thesis", "Team & Culture", "Fund Terms", "Appendix"],
      keyMetrics: { "Target Size": "$500M", "Track Record IRR": "22%", "Team Size": "32", "Deal Pipeline": "$1.8B" },
      aiOptions: ["Customize for specific LP profile", "Add ESG/impact metrics", "Generate data room index"] },
    { id: "ops_review_pres", title: "Operations Review Slides", subtitle: "Monthly Review", icon: "Activity", color: "red", status: "Completed", updated: "Mar 1, 2026", slides: 22, audience: "Operating Partners",
      description: "Monthly operational deep dive with KPI dashboards, improvement initiative status, and brand-level performance drill-downs.",
      topics: ["KPI Dashboard", "Initiative Tracker", "Brand Performance", "Team Metrics", "Technology Update", "Next Month Plan"],
      keyMetrics: { "Brands On-Track": "34/42", "Initiatives Active": "12", "Cost Savings": "$4.2M YTD", "NPS Trend": "+8 pts" },
      aiOptions: ["Highlight underperforming brands", "Add predictive analytics slides", "Generate action item tracker"] },
  ];

  const [expandedPres, setExpandedPres] = useState(null);
  // ── PRESENTATIONS VIEW ──
  const renderArtifacts = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex items-center justify-between mb-2">
        <div><h2 className="text-lg font-semibold text-gray-900">Presentations</h2><p className="text-sm text-gray-500">Board decks, LP materials, pitch decks, and strategic presentations — AI-generated and editable</p></div>
        <button onClick={() => { setActiveView("chat"); sendMessage("Create a new presentation for me."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("Package", { size: 12 })} Create Presentation</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {PRESENTATIONS.map((pres) => {
          const colorMap = { blue: "from-blue-500 to-blue-600", indigo: "from-indigo-500 to-indigo-600", purple: "from-purple-500 to-purple-600", amber: "from-amber-500 to-amber-600", emerald: "from-emerald-500 to-emerald-600", red: "from-red-500 to-red-600" };
          const bgMap = { blue: "#eff6ff", indigo: "#eef2ff", purple: "#faf5ff", amber: "#fffbeb", emerald: "#ecfdf5", red: "#fef2f2" };
          const accentMap = { blue: "#2563eb", indigo: "#4f46e5", purple: "#7c3aed", amber: "#d97706", emerald: "#059669", red: "#dc2626" };
          const statusColors = { "Completed": "bg-emerald-50 text-emerald-700", "In Progress": "bg-amber-50 text-amber-700", "In Review": "bg-blue-50 text-blue-700" };
          return (
          <div key={pres.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[pres.color]} flex items-center justify-center shadow-sm`}>
                    {getIcon(pres.icon, { size: 18, className: "text-white" })}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{pres.title}</h3>
                    <p className="text-xs text-gray-400">{pres.subtitle} · {pres.slides} slides · {pres.audience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[pres.status]}`}>{pres.status}</span>
                  <span className="text-[10px] text-gray-400">{pres.updated}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{pres.description}</p>
              {/* Slide Topics */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Slide Topics</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {pres.topics.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all">{t}</span>
                  ))}
                </div>
              </div>
              {/* Key Metrics */}
              <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: bgMap[pres.color] }}>
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accentMap[pres.color] }}>Key Figures</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
                  {Object.entries(pres.keyMetrics).map(([k, v]) => <div key={k} className="flex justify-between"><span className="text-xs text-gray-500">{k}</span><span className="text-xs font-semibold" style={{ color: accentMap[pres.color] }}>{v}</span></div>)}
                </div>
              </div>
              {/* AI Options - expandable */}
              {expandedPres === pres.id && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    {getIcon("Sparkles", { size: 12, className: "text-blue-500" })}
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">AI Enhancement Options</span>
                  </div>
                  {pres.aiOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2 mt-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0"></span>
                      <span className="text-xs text-blue-700">{opt}</span>
                      <button onClick={() => { setActiveView("chat"); sendMessage("For " + pres.title + ": " + opt); }} className="flex-shrink-0 text-[10px] text-blue-500 hover:text-blue-700 font-medium">Apply</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 px-5 py-3 flex gap-2">
              <button onClick={() => setExpandedPres(expandedPres === pres.id ? null : pres.id)} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Sparkles", { size: 12 })} {expandedPres === pres.id ? "Hide Options" : "AI Enhance"}</button>
              <button onClick={() => { setActiveView("chat"); sendMessage("Walk me through the " + pres.title + " deck. Show me the key slides."); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">{getIcon("Play", { size: 12 })} Preview Deck</button>
              <button className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">{getIcon("Send", { size: 12 })} Export</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  // ── LAYOUT ──
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background:"#1e3a6e"}}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="0" y="9" width="3.5" height="7" rx="0.5" fill="white"/>
                <rect x="5.5" y="5.5" width="3.5" height="10.5" rx="0.5" fill="white"/>
                <rect x="11" y="2" width="3.5" height="14" rx="0.5" fill="white"/>
                <rect x="16.5" y="0" width="3.5" height="16" rx="0.5" fill="white"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-gray-900" style={{letterSpacing:"-0.01em"}}>Margin Intelligence</div>
              <div className="text-[10px] text-gray-400">by ComOps</div>
            </div>
          </div>
          {/* Breadcrumb */}
          <button onClick={() => setActiveView("dashboard")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            {getIcon("Home", { size: 15, className: "text-gray-400" })}
            <span>Leave Behind</span>
          </button>
        </div>

        {/* Center Tabs */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            {getIcon("Activity", { size: 15, className: "text-gray-500" })}
            Diagnostic
          </button>
          <button onClick={() => setActiveView("dashboard")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {getIcon("Home", { size: 15, className: activeView === "dashboard" ? "text-white" : "text-gray-500" })}
            Leave Behind
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={() => setActiveView("alerts")}>
            {getIcon("Bell", { size: 18, className: "text-gray-400 hover:text-gray-600" })}
          </div>
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{background:"#1e3a6e"}}>D</div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Daniel Reyes</div>
              <div className="text-xs text-gray-400">Chief Operating Officer · Princeton, NJ</div>
            </div>
            {getIcon("ChevronDown", { size: 14, className: "text-gray-400" })}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className={`${sidebarCollapsed ? "w-16" : "w-56"} bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-200`}>
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
            {!sidebarCollapsed && <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</span>}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
              {getIcon("SidebarToggle", { size: 16 })}
            </button>
          </div>
          <div className="p-2 space-y-0.5 flex-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button key={item.id} onClick={() => setActiveView(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`} title={sidebarCollapsed ? item.label : ""}>
                  {getIcon(item.icon, { size: 18, className: isActive ? "text-blue-600" : "text-gray-400" })}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {!sidebarCollapsed && item.badge && <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {activeView === "dashboard" && renderDashboard()}
          {activeView === "chat" && renderChat()}
          {activeView === "alerts" && renderAlerts()}
          {activeView === "kpis" && renderKPIs()}
          {activeView === "compare" && renderCompare()}
          {activeView === "simulate" && renderSimulate()}
          {activeView === "artifacts" && renderArtifacts()}
        </main>
      </div>

      {showWidgetMaster && renderWidgetMaster()}
      {showExpert && renderExpertModal()}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-end flex-shrink-0">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Powered by:</span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="font-semibold" style={{color:"#1e3a6e"}}>Margin Intelligence <span className="font-normal text-gray-400">by ComOps</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
