import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import { authClient } from '../../../lib/auth-client';

export default function AdminLayout({ active, title, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let timer;

    const check = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data?.session) {
          window.location.href = '/admin/login';
          return;
        }

        const expiresAt = new Date(data.session.expiresAt).getTime();
        const remaining = expiresAt - Date.now();
        if (remaining <= 0) {
          authClient.signOut().finally(() => {
            window.location.href = '/admin/login';
          });
          return;
        }

        timer = setTimeout(check, Math.min(remaining, 60 * 1000));
      } catch {
        timer = setTimeout(check, 60 * 1000);
      }
    };

    check();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/70">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          className="fixed inset-0 z-40 bg-[#1A2E4C]/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          tabIndex={-1}
        />
      )}
      <AdminSidebar
        active={active}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggle={() => setCollapsed(prev => !prev)}
      />
      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-200 ease-out ${
          collapsed ? 'lg:pl-[4.25rem]' : 'lg:pl-64'
        }`}
      >
        <AdminNavbar title={title} onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}