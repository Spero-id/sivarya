import { focusRingVisible } from '../ui/styles.js';

export default function LangToggle({ lang, onChange }) {
  return (
    <div className="grid w-fit grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange('id')}
        aria-pressed={lang === 'id'}
        className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
          lang === 'id' ? 'bg-white text-[#1A2E4C] shadow-sm' : 'text-slate-500 hover:text-[#1A2E4C]'
        } ${focusRingVisible}`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
          lang === 'en' ? 'bg-white text-[#1A2E4C] shadow-sm' : 'text-slate-500 hover:text-[#1A2E4C]'
        } ${focusRingVisible}`}
      >
        EN
      </button>
    </div>
  );
}