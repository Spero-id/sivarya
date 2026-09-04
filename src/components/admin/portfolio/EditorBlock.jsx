export default function EditorBlock({ label, hint, children, id }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <div>
        <h2 id={id} className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
          {label}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
      </div>
      {children}
    </section>
  );
}