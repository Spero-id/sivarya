import { Sparkles, Image as ImageIcon } from 'lucide-react';

export default function PortfolioPreviewCard({ title, description, categoryName, cover, status }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Preview *
        </span>
        {status === 'published' ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-amber-600">
            Draft
          </span>
        )}
      </div>

      <div style={{ aspectRatio: '4/5' }} className="relative w-full overflow-hidden bg-slate-100">
        {cover ? (
          <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-slate-300">
            <ImageIcon className="h-9 w-9" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="rounded-xs bg-[#D87939] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white">
          {categoryName || 'Kategori'}
        </span>
        <p className="mt-2 font-heading text-base font-bold leading-snug text-[#1A2E4C]">
          {title.trim() || <span className="text-slate-300">Judul proyek Anda</span>}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          {description.trim() || 'Deskripsi ringkas akan tampil di sini.'}
        </p>
      </div>
    </div>
  );
}