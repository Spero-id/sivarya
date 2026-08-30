import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Inbox,
  LayoutGrid,
} from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import PageHeader from './ui/PageHeader.jsx';
import StatusBadge from './ui/StatusBadge.jsx';
import EmptyState from './ui/EmptyState.jsx';
import ConfirmDialog from './ui/ConfirmDialog.jsx';
import Toast from './ui/Toast.jsx';
import { portfolioItems, formatCompact } from '../../data/adminData.js';
import { categories } from '../../data/projects.js';
import {
  btnPrimary,
  inputCls,
  cardCls,
  iconBtn,
  focusRingVisible,
} from './ui/styles.js';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const SORT_OPTIONS = [
  { value: 'updated', label: 'Diperbarui terbaru' },
  { value: 'title', label: 'Judul (A-Z)' },
  { value: 'category', label: 'Tampilan terbanyak' },
];

export default function PortfolioPage() {
  const [items, setItems] = useState(portfolioItems);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('updated');
  const [menuFor, setMenuFor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onDoc = () => setMenuFor(null);
    window.addEventListener('click', onDoc);
    return () => window.removeEventListener('click', onDoc);
  }, []);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = items.filter(item => {
      const matchCategory = category === 'all' || item.category === category;
      const matchStatus = status === 'all' || item.status === status;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.categoryName.id.toLowerCase().includes(q);
      return matchCategory && matchStatus && matchSearch;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'category') return b.category - a.category;
      return b.updatedAt.localeCompare(a.updatedAt);
    });

    return result;
  }, [items, search, category, status, sort]);

  const handleDelete = () => {
    setItems(prev => prev.filter(item => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    setToast({ type: 'success', message: `\u201C${deleteTarget.title}\u201D telah dihapus.` });
  };

  const toolbar = (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1 lg:max-w-xs">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari judul, klien, kategori..."
          aria-label="Cari portfolio"
          className={`${inputCls} pl-10`}
        />
      </div>
      <div className="flex items-center gap-3">
        <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter kategori" className={inputCls}>
          <option value="all">Semua kategori</option>
          {categories.filter(c => c.id !== 'all').map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter status" className={inputCls}>
          {STATUS_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Urutkan" className={`${inputCls} lg:w-48`}>
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const tableSkeleton = (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100 last:border-0">
          <td className="py-4 pl-6"><div className="h-10 w-14 animate-pulse rounded-md bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-48 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4"><div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-16 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-24 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4 pr-6"><div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" /></td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <AdminLayout active="portfolio" title="Portfolio">
      <PageHeader
        title="Portfolio"
        description="Kelola dan organisasikan proyek portfolio Sivarya."
        actions={
          <a href="/admin/add-portfolio" className={btnPrimary}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah Portfolio
          </a>
        }
      />

      <div className="mb-4 flex items-center justify-between">
        {toolbar}
      </div>

      <div className={`${cardCls} overflow-hidden`}>
        <div className="flex items-center justify-start border-b border-slate-100 px-6 py-3">
          <p className="text-sm font-medium text-slate-500">
            {loading ? 'Memuat...' : `${visibleItems.length} proyek ditampilkan`}
          </p>
        </div>

        {loading ? (
          <table className="w-full table-fixed text-left text-sm">
            <caption className="sr-only">Memuat portfolio</caption>
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th scope="col" className="w-[80px] py-3 pl-6 font-semibold">Cover</th>
                <th scope="col" className="py-3 font-semibold">Proyek</th>
                <th scope="col" className="w-[110px] py-3 font-semibold">Status</th>
                <th scope="col" className="w-[100px] py-3 font-semibold">Category</th>
                <th scope="col" className="w-[120px] py-3 font-semibold">Diperbarui</th>
                <th scope="col" className="w-[60px] py-3 pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            {tableSkeleton}
          </table>
        ) : visibleItems.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Tidak ada hasil"
            description={search || category !== 'all' || status !== 'all'
              ? 'Tidak ada proyek yang cocok dengan filter saat ini. Coba ubah kata kunci atau filter.'
              : 'Belum ada proyek portfolio. Mulai tambahkan proyek pertama Anda.'}
            action={
              <a href="/admin/add-portfolio" className={btnPrimary}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Tambah Portfolio
              </a>
            }
          />
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-fixed text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                    <th scope="col" className="w-[80px] py-3 pl-6 font-semibold">Cover</th>
                    <th scope="col" className="py-3 font-semibold">Proyek</th>
                    <th scope="col" className="w-[110px] py-3 font-semibold">Status</th>
                    <th scope="col" className="w-[100px] py-3 font-semibold">Category</th>
                    <th scope="col" className="w-[120px] py-3 font-semibold">Diperbarui</th>
                    <th scope="col" className="w-[60px] py-3 pr-6">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.map(item => (
                    <tr key={item.id} className="group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
                      <td className="py-3 pl-6">
                        <img src={item.image} alt="" className="h-10 w-14 rounded-md border border-slate-200 object-cover" />
                      </td>
                      <td className="py-3 pl-2">
                        <a href={`/admin/portfolio-detail`} className="block max-w-full truncate font-semibold text-[#1A2E4C] transition-colors hover:text-[#D87939]">
                          {item.title}
                        </a>
                        <p className="mt-0.5 max-w-full truncate text-xs text-slate-400">
                          {item.client}
                        </p>
                      </td>
                      <td className="py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-3 font-medium text-slate-600 text-xs">{formatCompact(item.category)}</td>
                      <td className="py-3 text-xs text-slate-500">{item.updatedAt}</td>
                      <td className="relative py-3 pr-6 text-right">
                        <button
                          type="button"
                          aria-label={`Aksi untuk ${item.title}`}
                          aria-haspopup="menu"
                          aria-expanded={menuFor === item.id}
                          onClick={e => {
                            e.stopPropagation();
                            setMenuFor(current => (current === item.id ? null : item.id));
                          }}
                          className={iconBtn}
                        >
                          <MoreVertical className="h-4 w-4" aria-hidden="true" />
                        </button>
                        {menuFor === item.id && (
                          <div
                            role="menu"
                            className="absolute right-6 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
                          >
                            <a
                              role="menuitem"
                              href="/admin/portfolio-detail"
                              className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
                              onClick={e => e.stopPropagation()}
                            >
                              <Eye className="h-4 w-4 text-slate-400" aria-hidden="true" />
                              Lihat
                            </a>
                            <a
                              role="menuitem"
                              href="/admin/add-portfolio"
                              className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
                              onClick={e => e.stopPropagation()}
                            >
                              <Pencil className="h-4 w-4 text-slate-400" aria-hidden="true" />
                              Edit
                            </a>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={e => {
                                e.stopPropagation();
                                setMenuFor(null);
                                setDeleteTarget(item);
                              }}
                              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              Hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-slate-100 md:hidden">
              {visibleItems.map(item => (
                <li key={item.id} className="flex items-center gap-3 p-4">
                  <img src={item.image} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-slate-200 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1A2E4C]">{item.title}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{item.categoryName.id}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <StatusBadge status={item.status} />
                      <span className="text-xs text-slate-400">{formatCompact(item.category)} lihat</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <a
                      href="/admin/portfolio-detail"
                      aria-label={`Lihat ${item.title}`}
                      className={`${iconBtn} h-8 w-8`}
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="/admin/add-portfolio"
                      aria-label={`Edit ${item.title}`}
                      className={`${iconBtn} h-8 w-8`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      aria-label={`Hapus ${item.title}`}
                      onClick={() => setDeleteTarget(item)}
                      className={`${iconBtn} h-8 w-8 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus portfolio ini?"
        body={deleteTarget ? `\u201C${deleteTarget.title}\u201D akan dihapus permanen dan tidak dapat dikembalikan.` : ''}
        confirmLabel="Hapus"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <Toast
        show={Boolean(toast)}
        type={toast?.type}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
    </AdminLayout>
  );
}