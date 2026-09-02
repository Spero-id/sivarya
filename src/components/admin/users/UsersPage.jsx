import { useEffect, useMemo, useState } from 'react';
import { Plus, Inbox, Search } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout.jsx';
import PageHeader from '../ui/PageHeader.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ConfirmDialog from '../ui/ConfirmDialog.jsx';
import Toast from '../ui/Toast.jsx';
import { btnPrimary, cardCls } from '../ui/styles.js';
import UsersToolbar from './UsersToolbar.jsx';
import UsersTable, { UsersTableSkeleton } from './UsersTable.jsx';
import UsersMobileList from './UsersMobileList.jsx';
import UserFormDialog from './UserFormDialog.jsx';

const EMPTY_FORM = { name: '', username: '', email: '', password: '', role: 'editor' };

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
    if ((!editing || form.password) && (!form.password || form.password.length < 6)) {
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

      <div className="mb-4">
        <UsersToolbar search={search} onSearch={setSearch} />
      </div>

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
            <UsersTableSkeleton />
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
            <UsersTable
              items={visibleItems}
              menuFor={menuFor}
              onToggleMenu={setMenuFor}
              onEdit={item => { setMenuFor(null); openEdit(item); }}
              onDelete={item => { setMenuFor(null); setDeleteTarget(item); }}
            />
            <UsersMobileList
              items={visibleItems}
              onEdit={openEdit}
              onDelete={item => setDeleteTarget(item)}
            />
          </>
        )}
      </div>

      <UserFormDialog
        open={modalOpen}
        editing={editing}
        form={form}
        errors={errors}
        saving={saving}
        onChange={setForm}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />

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