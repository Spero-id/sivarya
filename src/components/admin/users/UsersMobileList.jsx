import { Pencil, Trash2, ShieldCheck, Shield } from 'lucide-react';
import { iconBtn } from '../ui/styles.js';
import { getInitials } from '../ui/format.js';

function RoleBadge({ role }) {
  const isAdmin = role === 'admin';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
        isAdmin ? 'bg-[#D87939]/10 text-[#C26527]' : 'bg-slate-100 text-slate-500'
      }`}
    >
      {isAdmin ? <ShieldCheck className="h-3 w-3" aria-hidden="true" /> : <Shield className="h-3 w-3" aria-hidden="true" />}
      {isAdmin ? 'Admin' : 'Editor'}
    </span>
  );
}

export default function UsersMobileList({ items, onEdit, onDelete }) {
  return (
    <ul className="divide-y divide-slate-100 md:hidden">
      {items.map(item => (
        <li key={item.id} className="flex items-center gap-3 p-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold uppercase text-white">
            {getInitials(item.name || '?', '?')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#1A2E4C]">{item.name}</p>
            <p className="mt-0.5 truncate text-xs text-slate-400">@{item.username} · {item.email}</p>
            <div className="mt-1.5"><RoleBadge role={item.role} /></div>
          </div>
          <div className="flex shrink-0 gap-1">
            <button type="button" aria-label={`Edit ${item.name}`} onClick={() => onEdit(item)} className={`${iconBtn} h-8 w-8`}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Hapus ${item.name}`}
              onClick={() => onDelete(item)}
              className={`${iconBtn} h-8 w-8 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}