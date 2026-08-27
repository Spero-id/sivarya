import { ArrowRight } from 'lucide-react';
import { ui } from '../i18n/ui.js';

const platforms = [
  { name: 'WhatsApp', color: '#1DB954', images: "/whatsapp-logo-2.png" },
  { name: 'Instagram', color: '#9933CC', images: "/instagram.png" },
  { name: 'Linkedin', color: '#4285F4', images: "/linkedin.png", iconClass: "w-8 h-8 sm:w-11 sm:h-11" },
  { name: 'Gmail', color: '#FF5500', images: "/gmail.png" },
];

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE = import.meta.env.PUBLIC_WHATSAPP_MESSAGE;

export default function Hero({ lang = 'id' }) {
  const t = ui[lang];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;


  return (
    <section className="relative h-screen min-h-[700px]" id="home">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/portfolio_podcast.jpg"
          alt="Podcast recording session"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 30%)',
          }}
        />
      </div>

      <div className="relative z-[3] h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-lg">
            <div className="hero-rise inline-flex items-center gap-2.5 mb-5" style={{ animationDelay: '100ms' }}>
              <span className="text-white/60 text-sm font-medium tracking-wide">
                {t.hero.kicker}
              </span>
            </div>

            <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-[3.5rem] uppercase leading-[1.05] tracking-tight mb-6">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block" style={{ animationDelay: '220ms' }}>{t.hero.line1}</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block" style={{ animationDelay: '360ms' }}>{t.hero.line2}</span>
              </span>
            </h1>

            <p className="hero-rise text-[#D87939] font-semibold sm:text-md leading-relaxed mb-8 max-w-md" style={{ animationDelay: '520ms' }}>
              {t.hero.paragraph}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-rise group inline-flex items-center gap-3 bg-[#1A2E4C] text-white font-semibold px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:gap-4 shadow-lg"
              style={{ animationDelay: '680ms' }}
            >
              <span>{t.hero.ctaObjective}</span>
              <ArrowRight className="w-5 h-5 arrow-nudge group-hover:animate-none group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-4 w-full max-w-3xl px-4">
        <div className="hero-rise" style={{ animationDelay: '880ms' }}>
          <div
            className="rounded-2xl px-5 py-4 sm:px-8 sm:py-4 bg-white shadow-xl"
          >
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {platforms.map(({ name, color, images, iconClass }) => (
                <a
                  key={name}
                  href="#"
                  className="flex items-center gap-1.5 group"
                  aria-label={name}
                >
                  <div className="flex items-center justify-center transition-colors">
                    <img
                      src={images}
                      alt={name}
                      className={iconClass || "w-10 h-10 sm:w-13 sm:h-13"}
                    />
                  </div>
                  <span className="text-[8px] sm:text-[15px] font-semibold text-black group-hover:text-slate-800 transition-colors">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}