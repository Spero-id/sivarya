import { focusRingVisible } from '../ui/styles.js';

export default function PortfolioPublishingSettings({ status, featured, onChange }) {
  return (
    <>
      <div>
        <span className="mb-1.5 block text-xs font-semibold text-slate-600">Status</span>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => onChange('status', 'draft')}
            aria-pressed={status === 'draft'}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
              status === 'draft'
                ? 'bg-white text-[#1A2E4C] shadow-sm'
                : 'text-slate-500 hover:text-[#1A2E4C]'
            } ${focusRingVisible}`}
          >
            Draft
          </button>
          <button
            type="button"
            onClick={() => onChange('status', 'published')}
            aria-pressed={status === 'published'}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
              status === 'published'
                ? 'bg-white text-[#1A2E4C] shadow-sm'
                : 'text-slate-500 hover:text-[#1A2E4C]'
            } ${focusRingVisible}`}
          >
            Published
          </button>
        </div>
      </div>

      {/* <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#1A2E4C]">Proyek unggulan</p>
          <p className="text-xs text-slate-400">Tampil menonjol di case studies</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={featured}
          aria-label="Jadikan proyek unggulan"
          onClick={() => onChange('featured', !featured)}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${focusRingVisible} ${
            featured ? 'bg-[#D87939]' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
              featured ? 'translate-x-6' : 'translate-x-1'
            }`}
            aria-hidden="true"
          />
        </button>
      </div> */}
    </>
  );
}