import ImageUpload from '../ui/ImageUpload.jsx';
import EditorBlock from './EditorBlock.jsx';
import LangToggle from './LangToggle.jsx';
import { inputCls, helperCls, focusRingVisible } from '../ui/styles.js';

const CONTENT_FIELDS = [
  { key: 'summary', rows: 2, required: true, label: 'Deskripsi', placeholders: { id: 'Tulis ringkasan singkat proyek...', en: 'Write a short project summary...' } },
  { key: 'challenge', rows: 3, label: 'Tantangan (The Challenge)', placeholders: { id: 'Apa tantangan utama klien sebelum proyek dimulai?', en: "What was the client's main challenge before the project?" } },
  { key: 'strategy', rows: 3, label: 'Strategi (Our Strategy)', placeholders: { id: 'Bagaimana pendekatan dan eksekusi yang dilakukan?', en: 'How was the approach and execution carried out?' } },
  { key: 'result', rows: 3, label: 'Hasil (Result)', placeholders: { id: 'Dampak atau metrik keberhasilan proyek.', en: 'Impact or success metrics of the project.' } },
];

export default function PortfolioContentFields({ form, errors, lang, onLang, onField, onContent, onCover, resetKey, errorField }) {
  return (
    <div className="space-y-4">
      <section aria-labelledby="hero-title-label" className="space-y-2">
        <label
          id="hero-title-label"
          htmlFor="hero-title"
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-black"
        >
          Judul Proyek <span className="text-[#D87939]">*</span>
        </label>
        <input
          id="hero-title"
          type="text"
          value={form.title}
          onChange={e => onField('title', e.target.value)}
          placeholder="Project title goes here..."
          aria-invalid={Boolean(errors.title)}
          className={`w-full border-0 border-b border-slate-200 bg-transparent pb-3 font-heading text-3xl font-extrabold tracking-tight text-[#1A2E4C] placeholder:text-slate-300 transition-colors focus:border-[#D87939] focus:outline-none sm:text-4xl ${errorField('title')}`}
        />
        {errors.title && <p className={`${helperCls} text-red-600`}>{errors.title}</p>}
      </section>

      <section aria-labelledby="lang-toggle-label" className="flex items-center gap-3">
        <span id="lang-toggle-label" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
          Bahasa konten
        </span>
        <LangToggle lang={lang} onChange={onLang} />
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
            onChange={e => onContent(field.key, e.target.value)}
            placeholder={field.placeholders[lang]}
            aria-invalid={Boolean(errors[field.key])}
            className={`${inputCls} resize-none ${errorField(field.key)}`}
          />
          {errors[field.key] && <p className={`${helperCls} text-red-600`}>{errors[field.key]}</p>}
        </EditorBlock>
      ))}

      <EditorBlock label="Cover Image" hint="Gambar utama untuk kartu portfolio" id="block-cover">
        <ImageUpload
          key={`cover-${resetKey}`}
          label="Upload cover image"
          onChange={({ status, src }) => onCover(status === 'preview' ? src : null)}
        />
      </EditorBlock>
    </div>
  );
}