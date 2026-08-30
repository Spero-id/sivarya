import { TrendingUp, TrendingDown } from 'lucide-react';

const TONES = {
  default: 'bg-slate-100 text-slate-600',
  brand: 'bg-[#D87939]/10 text-[#D87939]',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
};

export default function StatCard({ icon: Icon, label, value, hint, tone = 'default', trend }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${TONES[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              trend.dir === 'down' ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            {trend.dir === 'down' ? (
              <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {trend.text}
          </span>
        )}
      </div>
      <p className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-[#1A2E4C]">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-700">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}