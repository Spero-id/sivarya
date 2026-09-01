import { Eye, Pencil, Trash2, MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import RowMenu from './RowMenu.jsx';
import { iconBtn } from './styles.js';

function RowActions({ item, onDelete, onClose }) {
  return (
    <>
      <a role="menuitem" href="/admin/portfolio-detail" onClick={onClose}
        className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1A2E4C]">
        <Eye className="h-4 w-4 text-slate-400" aria-hidden="true" /> Lihat
      </a>
      <a role="menuitem" href={`/admin/add-portfolio?id=${item.id}`} onClick={onClose}
        className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1A2E4C]">
        <Pencil className="h-4 w-4 text-slate-400" aria-hidden="true" /> Edit
      </a>
      <button type="button" role="menuitem" onClick={() => { onClose(); onDelete(item); }}
        className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
        <Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus
      </button>
    </>
  );
}

export function PortfolioTableRow({ item, formatCompact, formatDate, menuOpen, onToggleMenu, onCloseMenu, onDelete, buttonRef }) {
  return (
    <tr className="group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
      <td className="py-3 pl-6">
        <img src={item.image} alt="" className="h-10 w-14 rounded-md border border-slate-200 object-cover" />
      </td>
      <td className="py-3 pl-2">
        <a href="/admin/portfolio-detail" className="block max-w-full truncate font-semibold text-[#1A2E4C] hover:text-[#D87939]">
          {item.title}
        </a>
        <p className="mt-0.5 max-w-full truncate text-xs text-slate-400">{item.client}</p>
      </td>
      <td className="py-3"><StatusBadge status={item.status} /></td>
      <td className="py-3 text-xs font-medium text-slate-600">{formatCompact(item.views)}</td>
      <td className="py-3 text-xs text-slate-500">{formatDate(item.updatedAt)}</td>
      <td className="relative py-3 pr-6 text-right">
        <button type="button" ref={buttonRef} aria-label={`Aksi untuk ${item.title}`}
          aria-haspopup="menu" aria-expanded={menuOpen}
          onClick={e => { e.stopPropagation(); onToggleMenu(item.id); }}
          className={iconBtn}>
          <MoreVertical className="h-4 w-4" aria-hidden="true" />
        </button>
        {menuOpen && (
          <RowMenu anchorEl={buttonRef.current} onClose={onCloseMenu}>
            <RowActions item={item} onDelete={onDelete} onClose={onCloseMenu} />
          </RowMenu>
        )}
      </td>
    </tr>
  );
}

export function PortfolioMobileCard({ item, formatCompact, onView, onDelete }) {
  return (
    <li className="flex items-center gap-3 p-4">
      <img src={item.image} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-slate-200 object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1A2E4C]">{item.title}</p>
        <p className="mt-0.5 truncate text-xs text-slate-400">{item.categoryName.id}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <StatusBadge status={item.status} />
          <span className="text-xs text-slate-400">{formatCompact(item.views)} lihat</span>
        </div>
      </div>
      <div className="flex shrink-0 gap-1">
        <a href="/admin/portfolio-detail" aria-label={`Lihat ${item.title}`} className={`${iconBtn} h-8 w-8`}>
          <Eye className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href={`/admin/add-portfolio?id=${item.id}`} aria-label={`Edit ${item.title}`} className={`${iconBtn} h-8 w-8`}>
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </a>
        <button type="button" aria-label={`Hapus ${item.title}`} onClick={() => onDelete(item)}
          className={`${iconBtn} h-8 w-8 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}