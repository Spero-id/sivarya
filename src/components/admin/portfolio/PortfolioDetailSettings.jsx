import { inputCls, labelCls, helperCls } from '../ui/styles.js';

export default function PortfolioDetailSettings({ form, errors, categories, onField, errorField }) {
  const categoriesList = categories.map(c => ({ id: c.id, value: c.id, name: c.name.id }));

  return (
    <>
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
          onChange={e => onField('categoryId', e.target.value)}
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
          onChange={e => onField('client', e.target.value)}
          placeholder="PT Nama Perusahaan Tbk"
          aria-invalid={Boolean(errors.client)}
          className={`${inputCls} ${errorField('client')}`}
        />
        {errors.client && <p className={`${helperCls} text-red-600`}>{errors.client}</p>}
      </div>
    </>
  );
}