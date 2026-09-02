export default function SettingsGroup({ title, id, children }) {
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}