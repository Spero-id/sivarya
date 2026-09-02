import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import { iconBtn } from '../ui/styles.js';
import { getInitials } from '../ui/format.js';
import { formatDate } from '../ui/format.js';

export function UsersTableSkeleton({ colSpan = 6 }) {
  const cells = ['pl-6', '', '', '', '', 'pr-6'];
  return (
    <tbody>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100 last:border-0">
          {cells.map((cls, ci) => {
            const wide = ci === 1 || ci === 2 || ci === 4;
            const full = ci === 0 || ci === 5;
            return (
              <td key={ci} className={`py-4 ${cls}`}>
                <div className={`animate-pulse rounded ${full ? 'h-9' : wide ? 'h-4 w-40' : ci === 3 ? 'h-5 w-16 rounded-full bg-slate-200' : ci === 0 ? 'rounded-full bg-slate-200' : ''} bg-slate-200`} />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

function UsersRowMenu({ item, onEdit, onDelete }) {
  return (
    <div
      role="menu"
      className="absolute right-6 top-12 z-20 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
    >
      <button
        type="button"
        role="menuitem"
        onClick={e => { e.stopPropagation(); onEdit(item); }}
        className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
      >
        <Pencil className="h-4 w-4 text-slate-400" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={e => { e.stopPropagation(); onDelete(item); }}
        className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Hapus
      </button>
    </div>
  );
}

export default function UsersTable({ items, menuFor, onToggleMenu, onEdit, onDelete }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full table-fixed text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
            <th scope="col" className="w-[60px] py-3 pl-6 font-semibold">Akun</th>
            <th scope="col" className="py-3 font-semibold">Nama</th>
            <th scope="col" className="py-3 font-semibold">Email</th>
            <th scope="col" className="w-[100px] py-3 font-semibold">Role</th>
            <th scope="col" className="w-[120px] py-3 font-semibold">Terakhir Masuk</th>
            <th scope="col" className="w-[60px] py-3 pr-6">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
              <td className="py-3 pl-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold uppercase text-white">
                  {getInitials(item.name || '?', '?')}
                </span>
              </td>
              <td className="py-3 pl-2">
                <p className="font-semibold text-[#1A2E4C]">{item.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">@{item.username}</p>
              </td>
              <td className="py-3 text-xs text-slate-500">{item.email}</td>
              <td className="py-3">{item.role}</td>
              <td className="py-3 text-xs text-slate-500">{formatDate(item.lastLoginAt)}</td>
              <td className="relative py-3 pr-6 text-right">
                <button
                  type="button"
                  aria-label={`Aksi untuk ${item.name}`}
                  aria-haspopup="menu"
                  aria-expanded={menuFor === item.id}
                  onClick={e => { e.stopPropagation(); onToggleMenu(item.id); }}
                  className={iconBtn}
                >
                  <MoreVertical className="h-4 w-4" aria-hidden="true" />
                </button>
                {menuFor === item.id && (
                  <UsersRowMenu item={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}