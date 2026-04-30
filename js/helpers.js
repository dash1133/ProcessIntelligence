// ── HELPERS ──
const StatusDot = ({ status }) => {
  const c = { critical: "bg-red-500", warning: "bg-amber-500", good: "bg-emerald-500" };
  return <span className={`inline-block w-2 h-2 rounded-full ${c[status] || "bg-gray-400"} mr-2`} />;
};
const PriorityBadge = ({ priority }) => {
  const s = { critical: "bg-red-100 text-red-700 border-red-200", high: "bg-amber-100 text-amber-700 border-amber-200", medium: "bg-blue-100 text-blue-700 border-blue-200" };
  return <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${s[priority]}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>;
};
const TierBadge = ({ tier }) => {
  const s = { A: "bg-emerald-100 text-emerald-700", B: "bg-blue-100 text-blue-700", C: "bg-red-100 text-red-700" };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded ${s[tier]}`}>Tier {tier}</span>;
};
const ConfidenceMeter = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${value}%` }} /></div>
    <span className="text-xs text-gray-500">{value}%</span>
  </div>
);
