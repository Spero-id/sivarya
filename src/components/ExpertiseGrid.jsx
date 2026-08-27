import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ui, langPath } from '../i18n/ui.js';

const services = [
  {
    id: "digital-infra",
    title: { id: "Infrastruktur Digital", en: "Digital Infrastructure" },
    desc: {
      id: "Bangun presensi digital yang scalable dan responsif.",
      en: "Build a scalable and responsive digital presence.",
    },
    longDesc: {
      id: "Kami bantu bisnis Anda untuk go digital dengan bikin aplikasi, website, dan sistem toko online yang canggih tapi tetap gampang dipakai oleh siapa saja.",
      en: "We design robust UI/UX architecture and backend systems for websites and applications, ensuring your brand delivers a seamless digital experience to users anywhere.",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M6 8h.01" />
        <path d="M10 8h.01" />
        <path d="M14 8h.01" />
      </svg>
    ),
  },
  {
    id: "audiovisual",
    title: { id: "Produksi & Editing Vidio/Foto", en: "Production & Editing Vidio/Foto" },
    desc: {
      id: "Butuh video profil, iklan, atau dokumentasi?",
      en: "Need a profile video, advertisement, or documentation?",
    },
    longDesc: {
      id: "Kami siap layani dari syuting hingga post-produksi (efek visual, warna, suara). Hasil dijamin hidup, profesional, dan nggak ngebosenin!",
      en: "We're ready to serve you from filming to post-production (visual effects, color, sound). The results are guaranteed to be vibrant, professional, and engaging!",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: "merchandise",
    title: { id: "Souvenir & Promosi", en: "Souvenir & Promotion" },
    desc: {
      id: "Butuh merchandise custom seperti seragam atau suvenir?",
      en: "Need custom merchandise such as uniforms or souvenirs?",
    },
    longDesc: {
      id: "Kami siap produksi dengan material berkualitas dan desain menarik agar brand Anda makin berkesan bagi klien dan tim!",
      en: "We are ready to produce with quality materials and attractive designs to make your brand more memorable for clients and teams!",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" x2="12" y1="22" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: "marketing",
    title: { id: "Digital Marketing", en: "Digital Marketing" },
    desc: {
      id: "Kuasai thought leadership di industri Anda melalui audio.",
      en: "Master thought leadership in your industry through audio.",
    },
    longDesc: {
      id: "Biar bisnis Anda makin dikenal banyak orang, kami bantu ngelolain akun media sosial, ngebangun image merek, sampai jalanin iklan strategis di Google dan Instagram.",
      en: "To make your business more widely known, we help manage social media accounts, build brand image, and run strategic advertising on Google and Instagram.",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  
  {
    id: "event-management",
    title: { id: "Penyelenggaraan Acara", en: "Event Management" },
    desc: {
      id: "Ciptakan momen yang tak terlupakan.",
      en: "Create unforgettable moments.",
    },
    longDesc: {
      id: "Mulai dari cari ide, persiapan, sampai hari H di lapangan, kami yang urus semuanya. Mau bikin seminar, live streaming, atau launching produk? Anda tinggal duduk manis dan terima beres!",
      en: "From idea generation and preparation to the actual event itself, we take care of everything. Whether you're planning a seminar, livestream, or product launch, just sit back and relax!",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
  },
  
  {
    id: "travel-management",
    title: { id: "Trip Bisnis & Perjalanan", en: "Business Travel & Tourism" },
    desc: {
      id: "Hadirkan pengalaman perjalanan yang dirancang khusus untuk setiap audiens.",
      en: "Deliver travel experiences tailored to each audience.",
    },
    longDesc: {
      id: "Kami juga bisa bantu urusin urusan tiket, pesen akomodasi hotel, dan nyusun jadwal lengkap buat perjalanan dinas atau reward trip santai buat tim di perusahaan Anda.",
      en: "We can also help you with ticketing, hotel bookings, and create a complete itinerary for business trips or a relaxing reward trip for your company team.",
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const MAX_LINES = 5;

function ServiceCard({ item, idx, lang = 'id' }) {
  const t = ui[lang];
  const [open, setOpen] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const measureRef = useRef(null);
  const fullDesc = `${item.desc[lang]} ${item.longDesc[lang]}`;

  useEffect(() => {
    if (!overlayMounted) return;
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, [overlayMounted]);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;


    const measure = () => {
      const cs = getComputedStyle(el);
      const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.6;
      const maxH = lineHeight * MAX_LINES + 2;

      el.textContent = fullDesc;
      setOverflows(el.scrollHeight > maxH + 1);
    };

    measure();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(measure);
      }
      return () => ro.disconnect();
    }
  }, [fullDesc]);

  const truncated = !open && overflows;

  const headerBlock = (
    <>
      <div className="text-[#1A2E4C] mb-4">
        {item.icon}
      </div>
      <h3 className="font-heading font-bold text-sm text-[#1A2E4C] leading-snug mb-2">
        <a href={langPath(lang, `/expertise#${item.id}`)} className="hover:text-[#D87939] transition-colors">
          {item.title[lang]}
        </a>
      </h3>
    </>
  );

  const detailLink = (
    <a
      href={langPath(lang, `/expertise#${item.id}`)}
      aria-label={`Lihat halaman ${item.title[lang]}`}
      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1A2E4C] uppercase tracking-wider hover:text-[#D87939] transition-colors"
    >
      <span>{t.expertise.detail}</span>
      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );

  return (
    <div
      className={`relative border-b sm:border-b-0 border-slate-200 ${
        idx > 0 ? 'sm:border-l border-slate-200' : ''
      }`}
    >
      <div
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute top-0 left-6 right-6 lg:left-5 lg:right-5 pointer-events-none text-slate-500 text-xs leading-relaxed"
      />

      <div className="group h-full flex flex-col py-8 px-6 lg:px-5 transition-colors duration-300 hover:bg-slate-50/50">
        {headerBlock}

        <p
          className={`text-slate-500 text-xs leading-relaxed mb-3 ${
            truncated ? 'line-clamp-5' : ''
          }`}
        >
          {fullDesc}
        </p>

        <div className="mt-auto flex flex-col items-end gap-1 pt-1">
          {truncated && (
            <button
              type="button"
              onClick={() => setOverlayMounted(true)}
              className="border-0 p-0 m-0 text-xs leading-relaxed font-bold text-[#D87939] hover:text-[#C26527] hover:underline cursor-pointer"
            >
              {t.expertise.readMore}
            </button>
          )}
          {detailLink}
        </div>
      </div>

      {overlayMounted && (
        <div
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && !open) setOverlayMounted(false);
          }}
          className={`group absolute inset-x-0 top-0 z-20 flex flex-col py-8 px-6 lg:px-5 bg-white shadow-[0_12px_32px_rgba(26,46,76,0.14)] transition-all duration-300 ease-out ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {headerBlock}

          <p className="text-slate-500 text-xs leading-relaxed mb-3">
            {fullDesc}
          </p>

          <div className="mt-auto flex flex-col items-end gap-1 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-0 p-0 m-0 text-xs leading-relaxed font-bold text-[#D87939] hover:text-[#C26527] hover:underline cursor-pointer"
            >
              {t.expertise.close}
            </button>
            {detailLink}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExpertiseGrid({ lang = 'id' }) {
  const t = ui[lang];
  return (
    <section className="py-14 bg-white relative" id="expertise">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1A2E4C] mt-3 mb-4">
            {t.expertise.heading}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t.expertise.sub}
          </p>
        </div>

        <div className="border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {services.map((item, idx) => (
              <ServiceCard key={idx} item={item} idx={idx} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
