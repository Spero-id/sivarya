import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Send, Save, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import ImageUpload from './ui/ImageUpload.jsx';
import Toast from './ui/Toast.jsx';
import {
  btnPrimary,
  btnSecondary,
  inputCls,
  labelCls,
  helperCls,
  focusRingVisible,
} from './ui/styles.js';

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

const CONTENT_FIELDS = [
  { key: 'summary', rows: 2, required: true, label: 'Deskripsi', placeholders: { id: 'Tulis ringkasan singkat proyek...', en: 'Write a short project summary...' } },
  { key: 'challenge', rows: 3, label: 'Tantangan (The Challenge)', placeholders: { id: 'Apa tantangan utama klien sebelum proyek dimulai?', en: "What was the client's main challenge before the project?" } },
  { key: 'strategy', rows: 3, label: 'Strategi (Our Strategy)', placeholders: { id: 'Bagaimana pendekatan dan eksekusi yang dilakukan?', en: 'How was the approach and execution carried out?' } },
  { key: 'result', rows: 3, label: 'Hasil (Result)', placeholders: { id: 'Dampak atau metrik keberhasilan proyek.', en: 'Impact or success metrics of the project.' } },
];

function EditorBlock({ label, hint, children, id }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <div>
        <h2 id={id} className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {label}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function SettingsGroup({ title, id, children }) {
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function LangToggle({ lang, onChange }) {
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

function PreviewCard({ title, description, categoryName, cover, status }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-[#D87939]" aria-hidden="true" />
          Preview
        </span>
        {status === 'published' ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Draft
          </span>
        )}
      </div>

      <div style={{ aspectRatio: '4/5' }} className="relative w-full overflow-hidden bg-slate-100">
        {cover ? (
          <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-slate-300">
            <ImageIcon className="h-9 w-9" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="rounded-full bg-[#D87939]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C26527]">
          {categoryName || 'Kategori'}
        </span>
        <p className="mt-2 font-heading text-base font-bold leading-snug text-[#1A2E4C]">
          {title.trim() || <span className="text-slate-300">Judul proyek Anda</span>}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          {description.trim() || 'Deskripsi ringkas akan tampil di sini.'}
        </p>
      </div>
    </div>
  );
}

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

  const categoriesList = useMemo(
    () => categories.map(c => ({ id: c.id, value: c.id, name: c.name.id })),
    [categories]
  );

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
          <div className="space-y-4">
            <section aria-labelledby="hero-title-label" className="space-y-2">
              <label
                id="hero-title-label"
                htmlFor="hero-title"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400"
              >
                Judul Proyek <span className="text-[#D87939]">*</span>
              </label>
              <input
                id="hero-title"
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="Project title goes here..."
                aria-invalid={Boolean(errors.title)}
                className={`w-full border-0 border-b border-slate-200 bg-transparent pb-3 font-heading text-3xl font-extrabold tracking-tight text-[#1A2E4C] placeholder:text-slate-300 transition-colors focus:border-[#D87939] focus:outline-none sm:text-4xl ${errorField('title')}`}
              />
              {errors.title && <p className={`${helperCls} text-red-600`}>{errors.title}</p>}
            </section>

            <section aria-labelledby="lang-toggle-label" className="flex items-center gap-3">
              <span id="lang-toggle-label" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Bahasa konten
              </span>
              <LangToggle lang={lang} onChange={setLang} />
            </section>

            {CONTENT_FIELDS.map(field => (
              <EditorBlock
                key={field.key}
                label={field.required ? `${field.label} *` : field.label}
                hint={
                  field.key === 'summary'
                    ? 'Tampil sebagai deskripsi di card portfolio & halaman detail.'
                    : 'Tampil pada bagian case study di halaman detail.'
                }
                id={`block-${field.key}`}
              >
                <textarea
                  rows={field.rows}
                  value={form[field.key][lang]}
                  onChange={e => setContent(field.key, e.target.value)}
                  placeholder={field.placeholders[lang]}
                  aria-invalid={Boolean(errors[field.key])}
                  className={`${inputCls} resize-none ${errorField(field.key)}`}
                />
                {errors[field.key] && <p className={`${helperCls} text-red-600`}>{errors[field.key]}</p>}
              </EditorBlock>
            ))}

            <EditorBlock label="Cover Image" hint="Gambar utama untuk kartu portfolio — ikuti rasio aspek yang dipilih." id="block-cover">
              <ImageUpload
                key={`cover-${resetKey}`}
                label="Upload cover image"
                onChange={({ status, src }) => setCover(status === 'preview' ? src : null)}
              />
            </EditorBlock>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-24">
            <SettingsGroup title="Penerbitan" id="settings-publishing">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Status</span>
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => set('status', 'draft')}
                    aria-pressed={form.status === 'draft'}
                    className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                      form.status === 'draft'
                        ? 'bg-white text-[#1A2E4C] shadow-sm'
                        : 'text-slate-500 hover:text-[#1A2E4C]'
                    } ${focusRingVisible}`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => set('status', 'published')}
                    aria-pressed={form.status === 'published'}
                    className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                      form.status === 'published'
                        ? 'bg-white text-[#1A2E4C] shadow-sm'
                        : 'text-slate-500 hover:text-[#1A2E4C]'
                    } ${focusRingVisible}`}
                  >
                    Published
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#1A2E4C]">Proyek unggulan</p>
                  <p className="text-xs text-slate-400">Tampil menonjol di case studies</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.featured}
                  aria-label="Jadikan proyek unggulan"
                  onClick={() => set('featured', !form.featured)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${focusRingVisible} ${
                    form.featured ? 'bg-[#D87939]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      form.featured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </SettingsGroup>

            <span className="block border-t border-slate-200" aria-hidden="true" />

            <SettingsGroup title="Detail Proyek" id="settings-details">
              <p className="text-xs leading-relaxed text-slate-400">
                Field ini tampil sebagai metadata pada kartu &amp; halaman detail publik.
              </p>

              <div>
                <label htmlFor="setting-category" className={labelCls}>
                  Kategori <span className="text-[#D87939]">*</span>
                </label>
                <select
                  id="setting-category"
                  value={form.categoryId}
                  onChange={e => set('categoryId', e.target.value)}
                  aria-invalid={Boolean(errors.categoryId)}
                  className={`${inputCls} ${errorField('categoryId')}`}
                >
                  <option value="" disabled>Pilih kategori...</option>
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.value}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className={`${helperCls} text-red-600`}>{errors.categoryId}</p>}
              </div>

              <div>
                <label htmlFor="setting-client" className={labelCls}>
                  Klien <span className="text-[#D87939]">*</span>
                </label>
                <input
                  id="setting-client"
                  type="text"
                  value={form.client}
                  onChange={e => set('client', e.target.value)}
                  placeholder="PT Nama Perusahaan Tbk"
                  aria-invalid={Boolean(errors.client)}
                  className={`${inputCls} ${errorField('client')}`}
                />
                {errors.client && <p className={`${helperCls} text-red-600`}>{errors.client}</p>}
              </div>

            </SettingsGroup>

            <PreviewCard
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
    </AdminLayout>
  );
}