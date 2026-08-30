import { useState } from 'react';
import { ArrowLeft, Pencil, Trash2, Eye, ExternalLink, Calendar, User, Folder, AlignLeft } from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import PageHeader from './ui/PageHeader.jsx';
import StatusBadge from './ui/StatusBadge.jsx';
import ConfirmDialog from './ui/ConfirmDialog.jsx';
import Toast from './ui/Toast.jsx';
import { portfolioItems, formatCompact } from '../../data/adminData.js';
import { btnPrimary, btnSecondary, btnGhost, cardCls, focusRingVisible } from './ui/styles.js';

export default function PortfolioDetailPage() {
  const project = portfolioItems[0];
  const [openDelete, setOpenDelete] = useState(false);
  const [toast, setToast] = useState(null);

  const meta = [
    { icon: User, label: project.client },
    { icon: Folder, label: project.categoryName.id },
    { icon: Calendar, label: String(project.year) },
  ];

  const details = [
    { title: 'Tantangan', body: project.challenge.id },
    { title: 'Strategi', body: project.strategy.id },
    { title: 'Hasil', body: project.result.id },
  ];

  return (
    <AdminLayout active="detail" title="Detail Portfolio">
      <PageHeader
        title="Detail Portfolio"
        description="Tinjau informasi lengkap proyek portfolio yang dipilih."
        actions={
          <>
            <a href="/admin/portfolio" className={btnGhost}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali
            </a>
            <a href="/admin/add-portfolio" className={btnSecondary}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit Proyek
            </a>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={`${cardCls} overflow-hidden lg:col-span-2`}>
          <div className="relative">
            <img src={project.image} alt={project.title} className="aspect-[16/9] w-full object-cover" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <StatusBadge status={project.status} />
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A2E4C]/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Eye className="h-3 w-3" aria-hidden="true" />
                  Unggulan
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-100 pb-5">
              {meta.map((m, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <m.icon className="h-4 w-4 text-[#D87939]" aria-hidden="true" />
                  {m.label}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Eye className="h-4 w-4 text-[#D87939]" aria-hidden="true" />
                {formatCompact(project.views)} tampilan
              </span>
            </div>

            <h2 className="mt-5 font-heading text-xl font-extrabold tracking-tight text-[#1A2E4C]">{project.title}</h2>
            <p className="mt-2 text-slate-600">{project.summary.id}</p>

            <div className="mt-6 space-y-6">
              {details.map(d => (
                <div key={d.title}>
                  <h3 className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D87939]">
                    <AlignLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    {d.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section aria-label="Tindakan" className={cardCls}>
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="font-heading text-sm font-bold text-[#1A2E4C]">Publikasi</p>
            </div>
            <div className="p-6">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Status</dt>
                  <dd><StatusBadge status={project.status} /></dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Unggulan</dt>
                  <dd className="font-semibold text-[#1A2E4C]">{project.featured ? 'Ya' : 'Tidak'}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Terakhir diperbarui</dt>
                  <dd className="font-medium text-[#1A2E4C]">{project.updatedAt}</dd>
                </div>
              </dl>

              <div className="mt-6 space-y-2.5">
                <a href="/" className={`${btnSecondary} w-full`}>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Lihat di situs
                </a>
                <button
                  type="button"
                  onClick={() => setOpenDelete(true)}
                  className={`w-full rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 ${focusRingVisible}`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Hapus Proyek
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section aria-label="Informasi cepat" className={cardCls}>
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="font-heading text-sm font-bold text-[#1A2E4C]">Informasi Cepat</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6">
              <div>
                <p className="font-heading text-xl font-extrabold text-[#1A2E4C]">{project.views}</p>
                <p className="text-xs text-slate-400">Total tampilan</p>
              </div>
              <div>
                <p className="font-heading text-xl font-extrabold text-[#1A2E4C]">{project.year}</p>
                <p className="text-xs text-slate-400">Tahun proyek</p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <a href="/admin/add-portfolio" className={`${btnPrimary} w-full`}>
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit Proyek
              </a>
            </div>
          </section>
        </div>
      </div>

      <ConfirmDialog
        open={openDelete}
        title="Hapus proyek ini?"
        body={`\u201C${project.title}\u201D akan dihapus permanen dari portfolio. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        onCancel={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
          setToast({ type: 'success', message: `\u201C${project.title}\u201D telah dihapus.` });
        }}
      />

      <Toast show={Boolean(toast)} type={toast?.type} message={toast?.message} onClose={() => setToast(null)} />
    </AdminLayout>
  );
}