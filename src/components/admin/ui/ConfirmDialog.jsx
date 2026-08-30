import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { btnSecondary, btnDanger, btnPrimary } from './styles.js';

export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Hapus',
  tone = 'danger',
  onCancel,
  onConfirm,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        className="fixed inset-0 z-[70] bg-[#1A2E4C]/40 backdrop-blur-[2px]"
        onClick={onCancel}
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-[80] w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-4">
          <span
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              tone === 'danger' ? 'bg-red-50 text-red-600' : 'bg-[#D87939]/10 text-[#D87939]'
            }`}
          >
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-base font-bold text-[#1A2E4C]">{title}</h3>
            {body && <p className="mt-1 text-sm leading-relaxed text-slate-500">{body}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className={btnSecondary} onClick={onCancel} ref={confirmRef}>
            Batal
          </button>
          <button type="button" className={tone === 'danger' ? btnDanger : btnPrimary} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}