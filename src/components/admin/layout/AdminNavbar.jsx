import { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut, Globe } from 'lucide-react';
import { notifications } from '../../../data/adminData.js';
import { authClient } from '../../../lib/auth-client';
import { focusRingVisible } from '../ui/styles.js';
import { getInitials } from '../ui/format.js';

export default function AdminNavbar({ title, onMenu }) {
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unread, setUnread] = useState(notifications.length);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const displayName = user?.name || 'Admin Sivarya';
  const displayUsername = user?.username || user?.email?.split('@')[0] || '';
  const roleLabel = user?.role === 'editor' ? 'Editor' : 'Admin';
  const initials = getInitials(user?.name, 'AD');

  const closeAll = () => {
    setBellOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#1A2E4C] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            aria-label="Buka menu navigasi"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden ${focusRingVisible}`}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
         
          <span className="truncate font-semibold text-[#1A2E4C] sm:hidden">{title}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="/"
            title="Lihat situs"
            className={`hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-white transition-colors hover:bg-[#D87939] hover:text-white md:inline-flex ${focusRingVisible}`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            Lihat Situs
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setBellOpen(false);
                setProfileOpen(prev => !prev);
              }}
              aria-label="Menu profil admin"
              className={`flex items-center gap-2 rounded-lg p-1 pr-1 transition-colors hover:bg-[#D87939] sm:pr-2 ${focusRingVisible}`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white font-heading text-xs font-bold text-[#1A2E4C] sm:h-9 sm:w-9">
                {initials}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-white sm:block" aria-hidden="true" />
            </button>
            {profileOpen && (
              <>
                <button type="button" aria-label="Tutup" className="fixed inset-0 z-40 cursor-default" onClick={closeAll} tabIndex={-1} />
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-[#1A2E4C]">{displayName}</p>
                    <p className="text-xs text-slate-400">{roleLabel}</p>
                  </div>
                  <ul className="p-1.5">
                    <li>
                      <a
                        href="/admin/dashboard"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
                        onClick={closeAll}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C]"
                        onClick={closeAll}
                      >
                        Lihat Situs
                      </a>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={async () => {
                          closeAll();
                          await authClient.signOut();
                          window.location.href = '/admin/login';
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Keluar
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}