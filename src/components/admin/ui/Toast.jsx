import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const VARIANTS = {
  success: { icon: CheckCircle2, cls: 'bg-emerald-600' },
  error: { icon: AlertCircle, cls: 'bg-red-600' },
  info: { icon: Info, cls: 'bg-[#D87939]' },
};

export default function Toast({ show, type = 'success', message, onClose }) {
  if (!show) return null;
  const { icon: Icon, cls } = VARIANTS[type] || VARIANTS.success;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[90] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
    >
      <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${cls}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="pt-1.5 text-sm font-medium leading-snug text-[#1A2E4C]">{message}</p>
      <button
        type="button"
        aria-label="Tutup notifikasi"
        onClick={onClose}
        className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}