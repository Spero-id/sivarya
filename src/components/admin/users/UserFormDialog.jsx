import { Users as UsersIcon } from 'lucide-react';
import { btnPrimary, inputCls, labelCls } from '../ui/styles.js';

export default function UserFormDialog({ open, editing, form, errors, saving, onChange, onSubmit, onClose }) {
  if (!open) return null;

  const inputErr = key => (errors[key] ? 'border-red-300 focus:border-red-400 focus:ring-red-300/30' : '');

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        className="fixed inset-0 z-[70] bg-[#1A2E4C]/40 backdrop-blur-[2px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={editing ? 'Edit user' : 'Tambah user'}
        className="relative z-[80] w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D87939]/10 text-[#D87939]">
            <UsersIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1A2E4C]">
              {editing ? 'Edit User' : 'Tambah User'}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">
              {editing ? `Perbarui data akun \u201C${editing.name}\u201D.` : 'Buat akun baru untuk akses admin.'}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="user-name" className={labelCls}>Nama <span className="text-[#D87939]">*</span></label>
            <input
              id="user-name"
              type="text"
              value={form.name}
              onChange={e => onChange({ ...form, name: e.target.value })}
              placeholder="Nama lengkap admin"
              className={`${inputCls} ${inputErr('name')}`}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="user-username" className={labelCls}>Username <span className="text-[#D87939]">*</span></label>
              <input
                id="user-username"
                type="text"
                value={form.username}
                onChange={e => onChange({ ...form, username: e.target.value })}
                placeholder="admin"
                className={`${inputCls} ${inputErr('username')}`}
                aria-invalid={Boolean(errors.username)}
              />
              {errors.username && <p className="mt-1.5 text-xs text-red-600">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="user-role" className={labelCls}>Role <span className="text-[#D87939]">*</span></label>
              <select
                id="user-role"
                value={form.role}
                onChange={e => onChange({ ...form, role: e.target.value })}
                className={`${inputCls} ${inputErr('role')}`}
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="mt-1.5 text-xs text-red-600">{errors.role}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="user-email" className={labelCls}>Email <span className="text-[#D87939]">*</span></label>
            <input
              id="user-email"
              type="email"
              value={form.email}
              onChange={e => onChange({ ...form, email: e.target.value })}
              placeholder="nama@sivarya.id"
              className={`${inputCls} ${inputErr('email')}`}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="user-password" className={labelCls}>
              Password {!editing && <span className="text-[#D87939]">*</span>}
            </label>
            <input
              id="user-password"
              type="password"
              value={form.password}
              onChange={e => onChange({ ...form, password: e.target.value })}
              placeholder={editing ? 'Kosongkan jika tidak diubah' : 'Minimal 6 karakter'}
              className={`${inputCls} ${inputErr('password')}`}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#1A2E4C] transition-colors hover:bg-slate-50" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className={btnPrimary} disabled={saving}>
              {saving ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}