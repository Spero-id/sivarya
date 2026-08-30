const TONES = {
  published: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  draft: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  featured: 'bg-[#D87939]/10 text-[#C26527] ring-[#D87939]/25',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  error: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

const LABELS = {
  published: 'Published',
  draft: 'Draft',
};

export default function StatusBadge({ status = 'neutral', label }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${TONES[status] || TONES.neutral}`}
    >
      {label || LABELS[status] || status}
    </span>
  );
}