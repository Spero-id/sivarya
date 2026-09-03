import { useEffect, useMemo, useState } from 'react';
import {
  FolderOpen,
  CheckCircle2,
  FileEdit,
  Eye,
  Plus,
  Rocket,
} from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import PageHeader from './ui/PageHeader.jsx';
import StatCard from './ui/StatCard.jsx';
import StatusBadge from './ui/StatusBadge.jsx';
import { btnPrimary, cardCls, focusRingVisible } from './ui/styles.js';
import { formatDate, formatCompact } from './ui/format.js';

const STAT_CARD_META = {
  total: { icon: FolderOpen, tone: 'brand' },
  published: { icon: CheckCircle2, tone: 'emerald' },
  draft: { icon: FileEdit, tone: 'amber' },
  views: { icon: Eye, tone: 'default' },
};

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then(async res => {
        const data = await res.json();
        if (active && res.ok) setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));

    fetch('/api/dashboard')
      .then(async res => {
        const data = await res.json();
        if (active && res.ok && data?.activities) setActivities(data.activities);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = items.length;
    const published = items.filter(p => p.status === 'published').length;
    const draft = items.filter(p => p.status === 'draft').length;
    const views = items.reduce((sum, p) => sum + (Number(p.views) || 0), 0);
    return { total, published, draft, views };
  }, [items]);

  const latest = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      .slice(0, 4);
  }, [items]);

  const dashboardStats = [
    { key: 'total', label: 'Total Portfolio', value: loading ? '—' : stats.total, hint: 'Semua proyek' },
    { key: 'published', label: 'Published', value: loading ? '—' : stats.published, hint: 'Sudah tayang' },
    { key: 'draft', label: 'Draft', value: loading ? '—' : stats.draft, hint: 'Belum tayang' },
    { key: 'views', label: 'Total Dilihat', value: loading ? '—' : formatCompact(stats.views), hint: 'Akumulasi kunjungan' },
  ];

  return (
    <AdminLayout active="dashboard" title="Dashboard">
      <PageHeader
        title="Dashboard"
        description="Ringkasan kinerja portfolio dan aktivitas terbaru ekosistem Sivarya."
        actions={
          <a href="/admin/add-portfolio" className={btnPrimary}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah Portfolio
          </a>
        }
      />

      <section aria-label="Ringkasan" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map(stat => {
          const meta = STAT_CARD_META[stat.key];
          return (
            <StatCard
              key={stat.key}
              icon={meta.icon}
              tone={meta.tone}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
            />
          );
        })}
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section aria-labelledby="recent-projects" className={`${cardCls} p-6 lg:col-span-2`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 id="recent-projects" className="font-heading text-base font-bold text-[#1A2E4C]">
                Portfolio Terbaru
              </h2>
              <p className="text-xs text-slate-400">Proyek yang terakhir diperbarui</p>
            </div>
            <a
              href="/admin/portfolio"
              className={`text-sm font-semibold text-[#D87939] transition-colors hover:text-[#C26527] ${focusRingVisible}`}
            >
              Kelola semua
            </a>
          </div>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Memuat...</p>
          ) : latest.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Belum ada proyek portfolio.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {latest.map(project => (
                <li key={project.id} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                  <img
                    src={project.image}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded-lg border border-slate-200 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1A2E4C]">{project.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {project.categoryName?.id || 'Tanpa kategori'} &middot; Diperbarui {formatDate(project.updatedAt)}
                    </p>
                  </div>
                  <span className="hidden text-xs font-medium text-slate-400 sm:block">
                    {formatCompact(project.views)} dilihat
                  </span>
                  <StatusBadge status={project.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="activity" className={`${cardCls} p-6`}>
          <h2 id="activity" className="font-heading text-base font-bold text-[#1A2E4C]">
            Aktivitas Terbaru
          </h2>
          <p className="text-xs text-slate-400">Perubahan pada portfolio Anda</p>

          {activities.length === 0 ? (
            <p className="mt-5 rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
              Belum ada aktivitas terbaru.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {activities.map(activity => {
                const createdTime = new Date(activity.createdAt || 0).getTime();
                const updatedTime = new Date(activity.updatedAt || 0).getTime();
                const isNew = updatedTime - createdTime < 60 * 1000;
                return (
                  <li key={activity.id} className="flex items-start gap-3">
                    <span
                      className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isNew
                          ? 'bg-[#D87939]/10 text-[#D87939]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isNew ? <Plus className="h-4 w-4" aria-hidden="true" /> : <FileEdit className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={`/admin/add-portfolio?id=${activity.id}`}
                        className="block truncate text-sm font-semibold text-[#1A2E4C] transition-colors hover:text-[#D87939]"
                      >
                        {activity.title}
                      </a>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {isNew ? 'Ditambahkan' : 'Diperbarui'} &middot; {formatDate(activity.updatedAt)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* <section aria-labelledby="quick-actions" className={`${cardCls} mt-6 p-6`}>
        <h2 id="quick-actions" className="font-heading text-base font-bold text-[#1A2E4C]">
          Tindakan Cepat
        </h2>
        <p className="text-xs text-slate-400">Jalur singkat ke tugas yang paling sering dilakukan</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href="/admin/add-portfolio"
            className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#D87939]/40 hover:bg-[#D87939]/5 ${focusRingVisible}`}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#D87939]/10 text-[#D87939]">
              <Plus className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1A2E4C]">Tambah Portfolio</span>
              <span className="block text-xs text-slate-400">Buat proyek baru</span>
            </span>
          </a>
          <a
            href="/admin/portfolio"
            className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#D87939]/40 hover:bg-[#D87939]/5 ${focusRingVisible}`}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <FolderOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1A2E4C]">Kelola Portfolio</span>
              <span className="block text-xs text-slate-400">Lihat & edit proyek</span>
            </span>
          </a>
          <a
            href="/"
            className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#D87939]/40 hover:bg-[#D87939]/5 ${focusRingVisible}`}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Rocket className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1A2E4C]">Lihat Situs</span>
              <span className="block text-xs text-slate-400">Tinjau hasil publikasi</span>
            </span>
          </a>
        </div>
      </section> */}
    </AdminLayout>
  );
}
