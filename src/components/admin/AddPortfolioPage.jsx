import { useMemo, useState } from 'react';
import { ArrowLeft, Send, Save, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import ImageUpload from './ui/ImageUpload.jsx';
import GalleryManager from './ui/GalleryManager.jsx';
import Toast from './ui/Toast.jsx';
import { categories } from '../../data/projects.js';
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
  client: '',
  category: '',
  year: new Date().getFullYear(),
  url: '',
  summary: '',
  description: '',
  challenge: '',
  strategy: '',
  result: '',
  status: 'draft',
  featured: false,
};

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

      {cover ? (
        <img src={cover} alt="" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-slate-300">
          <ImageIcon className="h-8 w-8" aria-hidden="true" />
        </div>
      )}

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
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [cover, setCover] = useState(null);

  const categoriesList = useMemo(() => categories.filter(c => c.id !== 'all'), []);

  const categoryName = useMemo(
    () => categoriesList.find(c => c.id === form.category)?.name || '',
    [categoriesList, form.category]
  );

  const errorField = key => (errors[key] ? 'border-red-300 focus:border-red-400 focus:ring-red-300/30' : '');

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Judul proyek wajib diisi.';
    if (!form.summary.trim()) next.summary = 'Ringkasan singkat wajib diisi.';
    if (!form.category) next.category = 'Pilih salah satu kategori.';
    if (!form.client.trim()) next.client = 'Nama klien wajib diisi.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = mode => {
    if (!validate()) {
      setToast({ type: 'error', message: 'Periksa kembali kolom yang wajib diisi.' });
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setForm(EMPTY_FORM);
      setResetKey(key => key + 1);
      setCover(null);
      setToast({
        type: 'success',
        message:
          mode === 'publish'
            ? 'Portfolio berhasil diterbitkan. Proyek kini tampil di situs.'
            : 'Draft berhasil disimpan. Anda dapat menerbitkannya nanti.',
      });
    }, 900);
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
            Tambah Portfolio
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Buat proyek baru untuk portfolio Sivarya.
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
          <div className="space-y-12">
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

            <EditorBlock label="Ringkasan" hint="Satu-dua kalimat untuk kartu portfolio." id="block-summary">
              <textarea
                rows={2}
                value={form.summary}
                onChange={e => set('summary', e.target.value)}
                placeholder="Tulis ringkasan singkat proyek..."
                aria-invalid={Boolean(errors.summary)}
                className={`${inputCls} resize-none ${errorField('summary')}`}
              />
              {errors.summary && <p className={`${helperCls} text-red-600`}>{errors.summary}</p>}
            </EditorBlock>

            <EditorBlock label="Cover Image" hint="Gambar utama yang paling merepresentasikan proyek." id="block-cover">
              <ImageUpload
                key={`cover-${resetKey}`}
                label="Upload cover image"
                onChange={({ status, src }) => setCover(status === 'preview' ? src : null)}
              />
            </EditorBlock>

            <EditorBlock label="Deskripsi Proyek" hint="Cerita lengkap dan konteks di balik proyek." id="block-description">
              <textarea
                rows={7}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Tulis deskripsi project..."
                className={`${inputCls} resize-y text-[15px] leading-relaxed`}
              />
            </EditorBlock>

            <EditorBlock label="Gallery" hint="Gambar pendukung untuk memperkaya case study." id="block-gallery">
              <GalleryManager key={`gallery-${resetKey}`} />
            </EditorBlock>

            <section aria-labelledby="block-casestudy" className="space-y-5">
              <div>
                <h2 id="block-casestudy" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Case Study <span className="ml-1 normal-case tracking-normal text-slate-300">(opsional)</span>
                </h2>
                <p className="mt-0.5 text-xs text-slate-400">Merinci tantangan, strategi, dan hasil untuk halaman detail.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cs-challenge" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Tantangan
                  </label>
                  <textarea
                    id="cs-challenge"
                    rows={3}
                    value={form.challenge}
                    onChange={e => set('challenge', e.target.value)}
                    placeholder="Apa tantangan utama klien sebelum proyek dimulai?"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cs-strategy" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Strategi
                  </label>
                  <textarea
                    id="cs-strategy"
                    rows={3}
                    value={form.strategy}
                    onChange={e => set('strategy', e.target.value)}
                    placeholder="Bagaimana pendekatan dan eksekusi yang dilakukan?"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cs-result" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Hasil
                  </label>
                  <textarea
                    id="cs-result"
                    rows={3}
                    value={form.result}
                    onChange={e => set('result', e.target.value)}
                    placeholder="Dampak atau metrik keberhasilan proyek."
                    className={inputCls}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-24">
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
              <div>
                <label htmlFor="setting-category" className={labelCls}>
                  Kategori <span className="text-[#D87939]">*</span>
                </label>
                <select
                  id="setting-category"
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  aria-invalid={Boolean(errors.category)}
                  className={`${inputCls} ${errorField('category')}`}
                >
                  <option value="" disabled>Pilih kategori...</option>
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.category && <p className={`${helperCls} text-red-600`}>{errors.category}</p>}
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

              <div>
                <label htmlFor="setting-year" className={labelCls}>Tahun</label>
                <input
                  id="setting-year"
                  type="number"
                  min={2000}
                  max={2099}
                  value={form.year}
                  onChange={e => set('year', Number(e.target.value))}
                  className={inputCls}
                />
              </div>
            </SettingsGroup>

            <span className="block border-t border-slate-200" aria-hidden="true" />

            <SettingsGroup title="Link Proyek" id="settings-links">
              <div>
                <label htmlFor="setting-url" className={labelCls}>Project URL</label>
                <input
                  id="setting-url"
                  type="url"
                  value={form.url}
                  onChange={e => set('url', e.target.value)}
                  placeholder="https://..."
                  className={inputCls}
                />
              </div>
            </SettingsGroup>

            <PreviewCard
              title={form.title}
              description={form.summary}
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