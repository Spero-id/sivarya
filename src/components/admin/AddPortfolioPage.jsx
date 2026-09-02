import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Send, Save, Loader2 } from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import Toast from './ui/Toast.jsx';
import ConfirmDialog from './ui/ConfirmDialog.jsx';
import { btnPrimary, btnSecondary, focusRingVisible } from './ui/styles.js';
import PortfolioContentFields from './portfolio/PortfolioContentFields.jsx';
import PortfolioPublishingSettings from './portfolio/PortfolioPublishingSettings.jsx';
import PortfolioDetailSettings from './portfolio/PortfolioDetailSettings.jsx';
import PortfolioPreviewCard from './portfolio/PortfolioPreviewCard.jsx';
import SettingsGroup from './portfolio/SettingsGroup.jsx';

const EMPTY_FORM = {
  title: '',
  categoryId: '',
  client: '',
  status: 'draft',
  featured: false,
  summary: { id: '', en: '' },
  challenge: { id: '', en: '' },
  strategy: { id: '', en: '' },
  result: { id: '', en: '' },
};

export default function AddPortfolioPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [lang, setLang] = useState('id');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [enConfirmOpen, setEnConfirmOpen] = useState(false);
  const pendingSubmit = useRef(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => (res.ok ? res.json() : []))
      .then(setCategories)
      .catch(() => setCategories([]));

    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      setEditId(id);
      setLoadingEdit(true);
      fetch(`/api/portfolio/${id}`)
        .then(res => (res.ok ? res.json() : null))
        .then(project => {
          if (project) {
            setForm({
              title: project.title,
              categoryId: String(project.categoryId),
              client: project.client,
              status: project.status,
              featured: project.featured,
              summary: project.summary || { id: '', en: '' },
              challenge: project.challenge || { id: '', en: '' },
              strategy: project.strategy || { id: '', en: '' },
              result: project.result || { id: '', en: '' },
            });
            if (project.image) setCover(project.image);
          }
        })
        .finally(() => setLoadingEdit(false));
    }
  }, []);

  const categoryName = useMemo(
    () => categories.find(c => c.id === Number(form.categoryId))?.name?.id || '',
    [categories, form.categoryId]
  );

  const errorField = key => (errors[key] ? 'border-red-300 focus:border-red-400 focus:ring-red-300/30' : '');

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const setContent = (field, value) => {
    setForm(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    if (field === 'summary') setErrors(prev => ({ ...prev, summary: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Judul proyek wajib diisi.';
    if (!form.summary.id.trim()) next.summary = 'Ringkasan (bahasa Indonesia) wajib diisi.';
    if (!form.categoryId) next.categoryId = 'Pilih salah satu kategori.';
    if (!form.client.trim()) next.client = 'Nama klien wajib diisi.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async mode => {
    if (!validate()) {
      setToast({ type: 'error', message: 'Periksa kembali kolom yang wajib diisi.' });
      return;
    }

    const enEmpty = ['summary', 'challenge', 'strategy', 'result'].some(
      key => !(form[key]?.en || '').trim()
    );
    if (enEmpty) {
      pendingSubmit.current = mode;
      setEnConfirmOpen(true);
      return;
    }

    await doSubmit(mode);
  };

  const doSubmit = async mode => {
    setSaving(true);
    try {
      const res = await fetch(editId ? `/api/portfolio/${editId}` : '/api/portfolio', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          categoryId: Number(form.categoryId),
          status: mode === 'publish' ? 'published' : form.status,
          image: cover || '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: 'error', message: data.error || 'Gagal menyimpan proyek.' });
        return;
      }
      setForm(EMPTY_FORM);
      setResetKey(key => key + 1);
      setCover(null);
      setEditId(null);
      setToast({
        type: 'success',
        message:
          mode === 'publish'
            ? 'Portfolio berhasil diterbitkan. Proyek kini tampil di situs.'
            : editId
              ? 'Perubahan berhasil disimpan.'
              : 'Draft berhasil disimpan. Anda dapat menerbitkannya nanti.',
      });
    } catch {
      setToast({ type: 'error', message: 'Gagal terhubung ke server.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout active="add" title="Tambah Portfolio">
      <a
        href="/admin/portfolio"
        className={`mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-[#D87939] ${focusRingVisible}`}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Portfolio
      </a>

      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#1A2E4C]">
            {editId ? 'Edit Portfolio' : 'Tambah Portfolio'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {editId ? 'Perbarui detail proyek yang sudah ada.' : 'Buat proyek baru untuk portfolio Sivarya.'}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            className={btnSecondary}
            disabled={saving}
            onClick={() => submit('draft')}
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Simpan Draft
          </button>
          <button type="button" className={btnPrimary} disabled={saving} onClick={() => submit('publish')}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Menyimpan...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Terbitkan
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} noValidate className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <PortfolioContentFields
              form={form}
              errors={errors}
              lang={lang}
              onLang={setLang}
              onField={set}
              onContent={setContent}
              onCover={setCover}
              resetKey={resetKey}
              errorField={errorField}
            />
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-24">
            <SettingsGroup title="Penerbitan" id="settings-publishing">
              <PortfolioPublishingSettings
                status={form.status}
                featured={form.featured}
                onChange={set}
              />
            </SettingsGroup>

            <span className="block border-t border-slate-200" aria-hidden="true" />

            <SettingsGroup title="Detail Proyek" id="settings-details">
              <PortfolioDetailSettings
                form={form}
                errors={errors}
                categories={categories}
                onField={set}
                errorField={errorField}
              />
            </SettingsGroup>

            <PortfolioPreviewCard
              title={form.title}
              description={form.summary.id}
              categoryName={categoryName}
              cover={cover}
              status={form.status}
            />
          </div>
        </aside>
      </form>

      <Toast show={Boolean(toast)} type={toast?.type} message={toast?.message} onClose={() => setToast(null)} />

      <ConfirmDialog
        open={enConfirmOpen}
        title="Belum ada konten bahasa Inggris"
        body="Anda belum mengisi konten bahasa Inggris (English), sehingga portfolio ini akan tampil tanpa versi bahasa Inggris. Yakin ingin melanjutkan?"
        confirmLabel="Lanjutkan Tanpa Inggris"
        tone="brand"
        onCancel={() => {
          setEnConfirmOpen(false);
          pendingSubmit.current = null;
        }}
        onConfirm={() => {
          setEnConfirmOpen(false);
          const mode = pendingSubmit.current ?? 'draft';
          pendingSubmit.current = null;
          doSubmit(mode);
        }}
      />
    </AdminLayout>
  );
}