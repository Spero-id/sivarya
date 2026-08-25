import { ArrowRight } from 'lucide-react';
import { ui, langPath } from '../i18n/ui.js';

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE = import.meta.env.PUBLIC_WHATSAPP_MESSAGE;

export default function CTABanner({ lang = 'id' }) {
  const t = ui[lang];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="bg-[#1A2E4C] py-24 lg:py-32 relative overflow-hidden border-y border-[#D87939]/20">

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <span className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-white/[0.025] text-[16rem] lg:text-[22rem] leading-none whitespace-nowrap">
        SIVARYA
      </span>

      <div className="hidden lg:block absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-[#D87939]/40" />
      <div className="hidden lg:block absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-[#D87939]/40" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D87939] uppercase block mb-6">
          07 Disiplin. Satu Ekosistem. Siap Dieksekusi.
        </span> */}

        <h2 className="font-heading font-extrabold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.02] mb-12">
          {t.cta.heading1}<br />
          {t.cta.heading2}<span className="text-[#D87939]">{t.cta.heading3}</span>
        </h2>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 bg-[#D87939] hover:bg-[#C26527] text-white font-bold text-lg px-10 py-5 rounded-full transition-all shadow-2xl shadow-[#D87939]/30 hover:-translate-y-1 hover:shadow-[#D87939]/50"
        >
          <span>{t.cta.ctaObjective}</span>
          <ArrowRight className="w-5 h-5 animate-[nudge_1.4s_ease-in-out_infinite] group-hover:animate-none group-hover:translate-x-1.5 transition-transform" />
        </a>

        <p className="text-slate-400 text-sm mt-7">
          {t.cta.body}<a href={langPath(lang, '/contact')} className="text-white font-semibold underline decoration-slate-500 underline-offset-4 hover:decoration-white">{t.cta.briefLink}</a>
        </p>

        <div className="flex items-center justify-center gap-8 sm:gap-14 mt-16 pt-10 border-t border-white/10">
          {[
            { label: t.cta.label1 },
            { label: t.cta.label2 },
            { label: t.cta.label3 },
          ].map((item, idx) => (
            <span key={idx} className="font-mono text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-widest">
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </section>
  );
}