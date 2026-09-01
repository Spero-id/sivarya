import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Search, Inbox } from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import PageHeader from './ui/PageHeader.jsx';
import EmptyState from './ui/EmptyState.jsx';
import ConfirmDialog from './ui/ConfirmDialog.jsx';
import Toast from './ui/Toast.jsx';
import { PortfolioTableRow, PortfolioMobileCard } from './ui/PortofolioRow.jsx';
import { btnPrimary, inputCls, cardCls } from './ui/styles.js';

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

const formatDate = value => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatCompact = value => {
  value = Number(value) || 0;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace('.', ',')} jt`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace('.', ',')} rb`;
  return String(value);
};

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('updated');
  const [menuFor, setMenuFor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const buttonRefs = useRef(new Map());

  useEffect(() => {
    setLoading(true);
    fetch('/api/portfolio')
      .then(async res => {
        const data = await res.json();
        if (!res.ok) return setToast({ type: 'error', message: data.error || 'Gagal memuat portfolio.' });
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setToast({ type: 'error', message: 'Gagal terhubung ke server.' }))
      .finally(() => setLoading(false));

    fetch('/api/categories').then(res => (res.ok ? res.json() : [])).then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const onDoc = () => setMenuFor(null);
    window.addEventListener('click', onDoc);
    return () => window.removeEventListener('click', onDoc);
  }, []);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = items.filter(item => {
      const matchCategory = category === 'all' || item.categorySlug === category;
      const matchStatus = status === 'all' || item.status === status;
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.client.toLowerCase().includes(q) || (item.categoryName?.id || '').toLowerCase().includes(q);
      return matchCategory && matchStatus && matchSearch;
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'category') return (b.views || 0) - (a.views || 0);
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
  }, [items, search, category, status, sort]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) return setToast({ type: 'error', message: data.error || 'Gagal menghapus proyek.' });
      setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
      setToast({ type: 'success', message: `\u201C${deleteTarget.title}\u201D telah dihapus.` });
    } catch {
      setToast({ type: 'error', message: 'Gagal terhubung ke server.' });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout active="portfolio" title="Portfolio">
      <PageHeader
        title="Portfolio"
        description="Kelola dan organisasikan proyek portfolio Sivarya."
        actions={<a href="/admin/add-portfolio" className={btnPrimary}><Plus className="h-4 w-4" aria-hidden="true" />Tambah Portfolio</a>}
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari judul, klien, kategori..." aria-label="Cari portfolio" className={`${inputCls} pl-10`} />
        </div>
        <div className="flex items-center gap-3">
          <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter kategori" className={inputCls}>
            <option value="all">Semua kategori</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name.id}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter status" className={inputCls}>
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Urutkan" className={`${inputCls} lg:w-48`}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className={`${cardCls} overflow-hidden`}>
        <div className="flex items-center justify-start border-b border-slate-100 px-6 py-3">
          <p className="text-sm font-medium text-slate-500">{loading ? 'Memuat...' : `${visibleItems.length} proyek ditampilkan`}</p>
        </div>

        {loading ? (
          <table className="w-full table-fixed text-left text-sm">
            <caption className="sr-only">Memuat portfolio</caption>
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
          </table>
        ) : visibleItems.length === 0 ? (
          <EmptyState icon={Inbox} title="Tidak ada hasil"
            description={search || category !== 'all' || status !== 'all'
              ? 'Tidak ada proyek yang cocok dengan filter saat ini. Coba ubah kata kunci atau filter.'
              : 'Belum ada proyek portfolio. Mulai tambahkan proyek pertama Anda.'}
            action={<a href="/admin/add-portfolio" className={btnPrimary}><Plus className="h-4 w-4" aria-hidden="true" />Tambah Portfolio</a>} />
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
                  {visibleItems.map(item => {
                    if (!buttonRefs.current.has(item.id)) buttonRefs.current.set(item.id, { current: null });
                    return (
                      <PortfolioTableRow
                        key={item.id}
                        item={item}
                        formatCompact={formatCompact}
                        formatDate={formatDate}
                        menuOpen={menuFor === item.id}
                        onToggleMenu={id => setMenuFor(cur => (cur === id ? null : id))}
                        onCloseMenu={() => setMenuFor(null)}
                        onDelete={setDeleteTarget}
                        buttonRef={buttonRefs.current.get(item.id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-slate-100 md:hidden">
              {visibleItems.map(item => (
                <PortfolioMobileCard key={item.id} item={item} formatCompact={formatCompact} onDelete={setDeleteTarget} />
              ))}
            </ul>
          </>
        )}
      </div>

      <ConfirmDialog open={Boolean(deleteTarget)} title="Hapus portfolio ini?"
        body={deleteTarget ? `\u201C${deleteTarget.title}\u201D akan dihapus permanen dan tidak dapat dikembalikan.` : ''}
        confirmLabel="Hapus" onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />

      <Toast show={Boolean(toast)} type={toast?.type} message={toast?.message} onClose={() => setToast(null)} />
    </AdminLayout>
  );
}