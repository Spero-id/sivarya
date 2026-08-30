import { LayoutDashboard, FolderKanban, PlusSquare, Eye, LogOut, PanelLeftClose, PanelLeftOpen, ArrowLeft } from 'lucide-react';
import { focusRingVisible } from '../ui/styles.js';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { key: 'portfolio', label: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
  { key: 'add', label: 'Tambah Portfolio', href: '/admin/add-portfolio', icon: PlusSquare },
  { key: 'detail', label: 'Detail Portfolio', href: '/admin/portfolio-detail', icon: Eye },
];

export default function AdminSidebar({ active, collapsed, mobileOpen, onClose, onToggle }) {
  return (
    <aside
      aria-label="Navigation admin"
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-200 ease-out ${
        collapsed ? 'lg:w-[4.25rem]' : 'lg:w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        <a href="/" className="flex min-w-0 items-center gap-3" title="Lihat situs Sivarya">
          <img src="/sivarya_logo.png" alt="Sivarya" className="h-8 w-auto shrink-0" />
        </a>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          className={`hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#1A2E4C] lg:inline-flex ${focusRingVisible}`}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p
          className={`mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 ${
            collapsed ? 'lg:hidden' : ''
          }`}
        >
          Menu
        </p>
        <ul className="space-y-1">
          {NAV.map(item => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <a
                  href={item.href}
                  title={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${focusRingVisible} ${
                    isActive
                      ? 'bg-[#D87939]/10 text-[#C26527]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-[#1A2E4C]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-[#D87939]" aria-hidden="true" />
                  )}
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span className={`whitespace-nowrap ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
            collapsed ? 'lg:flex-col' : ''
          }`}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A2E4C] font-heading text-xs font-bold text-white">
            SA
          </span>
          <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
            <p className="truncate text-sm font-semibold text-[#1A2E4C]">Admin Sivarya</p>
            <p className="truncate text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
        <div className={`mt-2 space-y-1 ${collapsed ? 'lg:text-center' : ''}`}>
          <a
            href="/"
            title="Kembali ke situs"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#1A2E4C] ${focusRingVisible} ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
          >
            <ArrowLeft className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span className={`whitespace-nowrap ${collapsed ? 'lg:hidden' : ''}`}>Lihat Situs</span>
          </a>
          <a
            href="/admin/login"
            title="Keluar"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 ${focusRingVisible} ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span className={`whitespace-nowrap ${collapsed ? 'lg:hidden' : ''}`}>Keluar</span>
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup menu"
        className="absolute right-[-2.75rem] top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#1A2E4C] shadow-md ring-1 ring-slate-200 lg:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}