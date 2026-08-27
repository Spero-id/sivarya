import { useState, useEffect } from 'react';
import {
  Code,
  Video,
  Mic,
  Share2,
  Calendar,
  Gift,
  Compass,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';
import { ui, langPath } from '../i18n/ui.js';

const serviceMeta = [
  { slug: 'digital-infra', icon: Code },
  { slug: 'audiovisual', icon: Video },
  { slug: 'podcast', icon: Mic },
  { slug: 'social-media', icon: Share2 },
  { slug: 'event-management', icon: Calendar },
  { slug: 'merchandise', icon: Gift },
  { slug: 'travel-management', icon: Compass }
];

export default function Navbar({ transparent = false, lang = 'id' }) {
  const t = ui[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLangHref = () => {
    if (lang === 'id') return `/en${currentPath === '/' ? '/' : currentPath}`;
    return currentPath.replace(/^\/en/, '') || '/';
  };

  const isWhite = transparent ? scrolled : true;
  const navText = isWhite ? 'text-[#1A2E4C]' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isWhite
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
        : 'bg-transparent py-5'
      }`}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src="/sivarya_logo.png" alt="Sivarya Logo" className={`w-full h-12
              ${isWhite
              ? 'w-full h-12'
              : 'bg-white rounded-md'
            }
              `} />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          <a href={langPath(lang, '/#home')} className={`${navText} font-semibold text-sm hover:text-[#D87939] transition-colors`}>
            {t.nav.home}
          </a>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            onKeyDown={(e) => { if (e.key === 'Escape') setDropdownOpen(false); }}
          >
            <a
              href={langPath(lang, '/#expertise')}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className={`${navText} font-semibold text-sm flex items-center gap-1 hover:text-[#D87939] transition-colors py-1`}
              onClick={() => setDropdownOpen(false)}
            >
              <span>{t.nav.expertise}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-[#D87939]' : ''}`} />
            </a>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 transition-all duration-300 ease-out origin-top ${dropdownOpen
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-3 scale-[0.97] invisible pointer-events-none'
                }`}
            >
              <div className="w-[640px] max-w-[calc(100vw-3rem)] bg-white rounded-md shadow-2xl shadow-[#1A2E4C]/15 border border-slate-200/80 overflow-hidden">

                <div className="relative bg-[#1A2E4C] px-7 py-5 overflow-hidden">
                  <div className="relative flex items-center justify-center gap-4">
                    <h3 className="font-heading font-extrabold text-lg text-white leading-none">{t.nav.dropdownTitle}</h3>
                  </div>
                </div>

                <div className="p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {t.navServices.map((service, idx) => {
                    const Icon = serviceMeta[idx].icon;
                    return (
                      <a
                        key={idx}
                        href={`/#expertise`} 
                        className={`group/item flex items-start gap-3 p-3 rounded-xl hover:bg-[#D87939]/[0.06] transition-all duration-300 ${dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          }`}
                        style={{ transitionDelay: dropdownOpen ? `${80 + idx * 30}ms` : '0ms' }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="font-semibold text-[11px] text-[#D87939]/50 group-hover/item:text-[#D87939] transition-colors pt-0.5 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        <div className="flex-1 min-w-xl">
                          <span className="flex items-center gap-2 mb-0.5">
                            <Icon className="w-3.5 h-3.5 text-[#1A2E4C]/60 group-hover/item:text-[#D87939] transition-colors shrink-0" />
                            <span className="text-[13px] font-bold text-[#1A2E4C] leading-snug group-hover/item:text-[#C26527] transition-colors">
                              {service.title}
                            </span>
                          </span>
                          <span className="block text-[11px] text-black leading-relaxed">{service.desc}</span>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-[#D87939] opacity-0 -translate-x-1 translate-y-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 transition-all duration-300 mt-0.5 shrink-0" />
                      </a>
                    );
                  })}


                </div>
              </div>
            </div>
          </div>

          <a href={langPath(lang, '/#works')} className={`${navText} font-semibold text-sm hover:text-[#D87939] transition-colors`}>
            {t.nav.works}
          </a>

          <a href={langPath(lang, '/#ecosystem')} className={`${navText} font-semibold text-sm hover:text-[#D87939] transition-colors`}>
            {t.nav.ecosystem}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className={`flex items-center rounded-full border text-xs font-bold overflow-hidden ${isWhite ? 'border-[#1A2E4C]/20' : 'border-white/40'}`}>
            {['id', 'en'].map((l) => (
              <a
                key={l}
                href={l === lang ? '#' : (l === 'en'
                  ? `/en${currentPath === '/' ? '/' : currentPath}`
                  : currentPath.replace(/^\/en/, '') || '/')}
                onClick={l === lang ? (e) => e.preventDefault() : undefined}
                aria-current={l === lang ? 'true' : undefined}
                className={`px-2.5 py-1.5 transition-colors ${
                  l === lang
                    ? `bg-[#D87939] text-white`
                    : `${isWhite ? 'text-[#1A2E4C] hover:bg-[#D87939]/10 hover:text-[#D87939]' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
                }`}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>

          <a
            href={langPath(lang, '/contact')}
            className={`hidden sm:inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 ${isWhite
                ? 'bg-[#1A2E4C] text-white hover:bg-[#1A2E4C] hover:text-white'
                : 'bg-white text-black hover:bg-[#1A2E4C] hover:text-white'
              }`}
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            className={`lg:hidden p-1 transition-colors ${isWhite ? 'text-[#1A2E4C] hover:text-[#D87939]' : 'text-white hover:text-[#D87939]'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-[#1A2E4C]/40 backdrop-blur-sm z-50 flex justify-end lg:hidden">
          <div className="w-4/5 max-w-sm h-full bg-white p-6 flex flex-col gap-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-heading font-black text-xl text-[#1A2E4C]">SIVARYA</span>
              <button onClick={() => setMobileOpen(false)} className="text-[#1A2E4C] p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <a href={langPath(lang, '/#home')} onClick={() => setMobileOpen(false)} className="text-[#1A2E4C] font-bold text-lg hover:text-[#D87939]">
                {t.nav.home}
              </a>

              <div>
                <span className="font-mono text-xs font-bold text-[#D87939] uppercase block mb-2">{t.nav.mobileServicesLabel}</span>
                <div className="flex flex-col gap-2 pl-3 border-l-2 border-[#D87939]">
                  {t.navServices.map((s, i) => (
                    <a key={i} href={langPath(lang, `/expertise#${serviceMeta[i].slug}`)} onClick={() => setMobileOpen(false)} className="flex items-baseline gap-2 text-slate-600 font-medium text-sm hover:text-[#1A2E4C] transition-colors">
                      <span className="font-mono text-[10px] font-bold text-[#D87939]/60">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>

              <a href={langPath(lang, '/works')} onClick={() => setMobileOpen(false)} className="text-[#1A2E4C] font-bold text-lg hover:text-[#D87939]">
                {t.nav.mobileWorks}
              </a>

              <a href={langPath(lang, '/ecosystem')} onClick={() => setMobileOpen(false)} className="text-[#1A2E4C] font-bold text-lg hover:text-[#D87939]">
                {t.nav.ecosystem}
              </a>

              <div className="flex items-center gap-2 mt-2">
                {['id', 'en'].map((l) => (
                  <a
                    key={l}
                    href={l === lang ? '#' : switchLangHref()}
                    onClick={(e) => { if (l === lang) e.preventDefault(); else setMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      l === lang
                        ? 'bg-[#D87939] text-white border-[#D87939]'
                        : 'border-slate-200 text-slate-600 hover:border-[#D87939] hover:text-[#D87939]'
                    }`}
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>

              <a href={langPath(lang, '/contact')} onClick={() => setMobileOpen(false)} className="w-full bg-[#D87933] text-white font-semibold text-center py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#D87939]/25 mt-4">
                <span>{t.nav.letsTalk}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
