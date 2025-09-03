export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
