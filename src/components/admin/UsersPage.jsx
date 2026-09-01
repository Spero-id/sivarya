import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Inbox,
  ShieldCheck,
  Shield,
  Users as UsersIcon,
} from 'lucide-react';
import AdminLayout from './layout/AdminLayout.jsx';
import PageHeader from './ui/PageHeader.jsx';
import EmptyState from './ui/EmptyState.jsx';
import ConfirmDialog from './ui/ConfirmDialog.jsx';
import Toast from './ui/Toast.jsx';
import {
  btnPrimary,
  inputCls,
  labelCls,
  cardCls,
  iconBtn,
  focusRingVisible,
} from './ui/styles.js';

const EMPTY_FORM = { name: '', username: '', email: '', password: '', role: 'editor' };

function RoleBadge({ role }) {
  const isAdmin = role === 'admin';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
        isAdmin ? 'bg-[#D87939]/10 text-[#C26527]' : 'bg-slate-100 text-slate-500'
      }`}
    >
      {isAdmin ? <ShieldCheck className="h-3 w-3" aria-hidden="true" /> : <Shield className="h-3 w-3" aria-hidden="true" />}
      {isAdmin ? 'Admin' : 'Editor'}
    </span>
  );
}

function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [menuFor, setMenuFor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (res.ok) {
        setItems(Array.isArray(data) ? data : []);
      } else {
        setToast({ type: 'error', message: data.error || 'Gagal memuat data user.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Gagal terhubung ke server.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const onDoc = () => setMenuFor(null);
    window.addEventListener('click', onDoc);
    return () => window.removeEventListener('click', onDoc);
  }, []);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      item =>
        item.name?.toLowerCase().includes(q) ||
        item.username?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.role?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = item => {
    setEditing(item);
    setForm({ name: item.name, username: item.username, email: item.email, password: '', role: item.role });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Nama wajib diisi.';
    if (!form.username.trim()) next.username = 'Username wajib diisi.';
    if (!form.email.trim()) next.email = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Format email tidak valid.';
    if (!editing && (!form.password || form.password.length < 6)) {
      next.password = 'Password minimal 6 karakter.';
    } else if (editing && form.password && form.password.length < 6) {
      next.password = 'Password minimal 6 karakter.';
    }
    if (!form.role) next.role = 'Pilih role.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const url = editing ? `/api/users/${editing.id}` : '/api/users';
    const method = editing ? 'PUT' : 'POST';
    const payload = { ...form };
    if (editing && !payload.password) delete payload.password;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: 'error', message: data.error || (editing ? 'Gagal memperbarui user.' : 'Gagal menambahkan user.') });
        return;
      }
      setModalOpen(false);
      setToast({
        type: 'success',
        message: editing ? `User \u201C${data.name}\u201D diperbarui.` : `User \u201C${data.name}\u201D ditambahkan.`,
      });
      await load();
    } catch {
      setToast({ type: 'error', message: 'Gagal terhubung ke server.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: 'error', message: data.error || 'Gagal menghapus user.' });
        return;
      }
      setToast({ type: 'success', message: `User \u201C${deleteTarget.name}\u201D telah dihapus.` });
      await load();
    } catch {
      setToast({ type: 'error', message: 'Gagal terhubung ke server.' });
    } finally {
      setDeleteTarget(null);
    }
  };

  const inputErr = key => (errors[key] ? 'border-red-300 focus:border-red-400 focus:ring-red-300/30' : '');

  const toolbar = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama, username, email..."
          aria-label="Cari user"
          className={`${inputCls} pl-10`}
        />
      </div>
    </div>
  );

  const tableSkeleton = (
    <tbody>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100 last:border-0">
          <td className="py-4 pl-6"><div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-44 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-36 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4"><div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" /></td>
          <td className="py-4"><div className="h-4 w-24 animate-pulse rounded bg-slate-200" /></td>
          <td className="py-4 pr-6"><div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" /></td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <AdminLayout active="users" title="Users">
      <PageHeader
        title="Users"
        description="Kelola akses akun admin dan editor di ekosistem Sivarya."
        actions={
          <button type="button" className={btnPrimary} onClick={openAdd}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tambah User
          </button>
        }
      />

      <div className="mb-4">{toolbar}</div>

      <div className={`${cardCls} overflow-hidden`}>
        <div className="flex items-center justify-start border-b border-slate-100 px-6 py-3">
          <p className="text-sm font-medium text-slate-500">
            {loading ? 'Memuat...' : `${visibleItems.length} user terdaftar`}
          </p>
        </div>

        {loading ? (
          <table className="w-full table-fixed text-left text-sm">
            <caption className="sr-only">Memuat user</caption>
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                <th scope="col" className="w-[60px] py-3 pl-6 font-semibold">Akun</th>
                <th scope="col" className="py-3 font-semibold">Nama</th>
                <th scope="col" className="py-3 font-semibold">Email</th>
                <th scope="col" className="w-[100px] py-3 font-semibold">Role</th>
                <th scope="col" className="w-[120px] py-3 font-semibold">Terakhir Masuk</th>
                <th scope="col" className="w-[60px] py-3 pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            {tableSkeleton}
          </table>
        ) : visibleItems.length === 0 ? (
          <EmptyState
            icon={search ? Search : Inbox}
            title={search ? 'Tidak ada hasil' : 'Belum ada user'}
            description={
              search
                ? 'Tidak ada user yang cocok dengan kata kunci saat ini.'
                : 'Mulai tambahkan user pertama untuk mengelola akun admin & editor.'
            }
            action={
              !search && (
                <button type="button" className={btnPrimary} onClick={openAdd}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Tambah User
                </button>
              )
            }
          />
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-fixed text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                    <th scope="col" className="w-[60px] py-3 pl-6 font-semibold">Akun</th>
                    <th scope="col" className="py-3 font-semibold">Nama</th>
                    <th scope="col" className="py-3 font-semibold">Email</th>
                    <th scope="col" className="w-[100px] py-3 font-semibold">Role</th>
                    <th scope="col" className="w-[120px] py-3 font-semibold">Terakhir Masuk</th>
                    <th scope="col" className="w-[60px] py-3 pr-6">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.map(item => (
                    <tr key={item.id} className="group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
                      <td className="py-3 pl-6">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold uppercase text-white">
                          {(item.name || '?').slice(0, 2)}
                        </span>
                      </td>
                      <td className="py-3 pl-2">
                        <p className="font-semibold text-[#1A2E4C]">{item.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">@{item.username}</p>
                      </td>
                      <td className="py-3 text-xs text-slate-500">{item.email}</td>
                      <td className="py-3"><RoleBadge role={item.role} /></td>
                      <td className="py-3 text-xs text-slate-500">{formatDate(item.lastLoginAt)}</td>
                      <td className="relative py-3 pr-6 text-right">
                        <button
                          type="button"
                          aria-label={`Aksi untuk ${item.name}`}
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
                            className="absolute right-6 top-12 z-20 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              onClick={e => {
                                e.stopPropagation();
                                setMenuFor(null);
                                openEdit(item);
                              }}
                              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
                            >
                              <Pencil className="h-4 w-4 text-slate-400" aria-hidden="true" />
                              Edit
                            </button>
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
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold uppercase text-white">
                    {(item.name || '?').slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1A2E4C]">{item.name}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">@{item.username} · {item.email}</p>
                    <div className="mt-1.5"><RoleBadge role={item.role} /></div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button type="button" aria-label={`Edit ${item.name}`} onClick={() => openEdit(item)} className={`${iconBtn} h-8 w-8`}>
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Hapus ${item.name}`}
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

      {modalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Tutup dialog"
            className="fixed inset-0 z-[70] bg-[#1A2E4C]/40 backdrop-blur-[2px]"
            onClick={() => setModalOpen(false)}
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="user-name" className={labelCls}>Nama <span className="text-[#D87939]">*</span></label>
                <input
                  id="user-name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
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
                    onChange={e => setForm({ ...form, username: e.target.value })}
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
                    onChange={e => setForm({ ...form, role: e.target.value })}
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
                  onChange={e => setForm({ ...form, email: e.target.value })}
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
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder={editing ? 'Kosongkan jika tidak diubah' : 'Minimal 6 karakter'}
                  className={`${inputCls} ${inputErr('password')}`}
                  aria-invalid={Boolean(errors.password)}
                  autoComplete={editing ? 'new-password' : 'new-password'}
                />
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#1A2E4C] transition-colors hover:bg-slate-50" onClick={() => setModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className={btnPrimary} disabled={saving}>
                  {saving ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus user ini?"
        body={deleteTarget ? `Akun \u201C${deleteTarget.name}\u201D akan dihapus permanen dan tidak dapat dikembalikan.` : ''}
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
