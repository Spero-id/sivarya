import { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut, Globe, ChevronRight } from 'lucide-react';
import { notifications } from '../../../data/adminData.js';
import { focusRingVisible } from '../ui/styles.js';

export default function AdminNavbar({ title, onMenu }) {
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unread, setUnread] = useState(notifications.length);

  const closeAll = () => {
    setBellOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
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
          <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
            <span className="font-medium text-slate-400">Admin</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
            <span className="truncate font-semibold text-[#1A2E4C]">{title}</span>
          </nav>
          <span className="truncate font-semibold text-[#1A2E4C] sm:hidden">{title}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="/"
            title="Lihat situs"
            className={`hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#1A2E4C] md:inline-flex ${focusRingVisible}`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            Lihat Situs
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen(false);
                setBellOpen(prev => !prev);
              }}
              aria-label={`Notifikasi${unread ? `, ${unread} belum dibaca` : ''}`}
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#1A2E4C] ${focusRingVisible}`}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D87939] ring-2 ring-white" aria-hidden="true" />
              )}
            </button>
            {bellOpen && (
              <>
                <button type="button" aria-label="Tutup" className="fixed inset-0 z-40 cursor-default" onClick={closeAll} tabIndex={-1} />
                <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-[#1A2E4C]">Notifikasi</p>
                    {unread > 0 && (
                      <button
                        type="button"
                        onClick={() => setUnread(0)}
                        className="text-xs font-medium text-[#D87939] transition-colors hover:text-[#C26527]"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <li key={n.id}>
                        <button
                          type="button"
                          className="block w-full px-4 py-3 text-left transition-colors hover:bg-slate-50"
                          onClick={closeAll}
                        >
                          <p className="text-sm font-medium leading-snug text-[#1A2E4C]">{n.title}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setBellOpen(false);
                setProfileOpen(prev => !prev);
              }}
              aria-label="Menu profil admin"
              className={`flex items-center gap-2 rounded-lg p-1 pr-1 transition-colors hover:bg-slate-100 sm:pr-2 ${focusRingVisible}`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold text-white">
                SA
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" aria-hidden="true" />
            </button>
            {profileOpen && (
              <>
                <button type="button" aria-label="Tutup" className="fixed inset-0 z-40 cursor-default" onClick={closeAll} tabIndex={-1} />
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-[#1A2E4C]">Admin Sivarya</p>
                    <p className="text-xs text-slate-400">Super Admin</p>
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
                      <a
                        href="/admin/login"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        onClick={closeAll}
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Keluar
                      </a>
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