import { Phone, Mail, ShieldCheck, Globe, Share2, Video } from 'lucide-react';
import { getUi, langPath } from '../i18n/ui.js';

const pillarSlugs = ['digital-infra', 'audiovisual', 'podcast', 'social-media', 'event-management', 'merchandise', 'travel-management'];

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

export default function Footer({ lang = 'id' }) {
  const t = getUi(lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 pt-20 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href={langPath(lang, '/')} className="flex items-center gap-3 mb-5">
              <img src="/sivarya_logo.png" alt="Sivarya Logo" className="h-10 w-auto" />
            </a>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>

            
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-[#1A2E4C] text-base mb-5">{t.footer.mainNav}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href={langPath(lang, '/#home')} className="text-slate-600 hover:text-[#D87939] font-medium transition-colors">{t.footer.navHome}</a></li>
              <li><a href={langPath(lang, '/#expertise')} className="text-slate-600 hover:text-[#D87939] font-medium transition-colors">{t.footer.navExpertise}</a></li>
              <li><a href={langPath(lang, '/#works')} className="text-slate-600 hover:text-[#D87939] font-medium transition-colors">{t.footer.navCases}</a></li>
              <li><a href={langPath(lang, '/#ecosystem')} className="text-slate-600 hover:text-[#D87939] font-medium transition-colors">{t.footer.navEcosystem}</a></li>
              <li><a href={langPath(lang, '/#contact')} className="text-slate-600 hover:text-[#D87939] font-medium transition-colors">{t.footer.navLetsTalk}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-[#1A2E4C] text-base mb-5">{t.footer.pillarsTitle}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {t.footer.pillarLinks.map((name, i) => (
                <li key={i}>
                  <a
                    href={langPath(lang, `/#expertise`)}
                    className="text-slate-600 hover:text-[#D87939] font-medium transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-[#1A2E4C] text-base mb-5">Headquarters</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Jl. Ratu Bidadari 3 no 2, Ciputat, Tangerang Selatan, Indonesia.
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D87939] shrink-0" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1A2E4C] hover:text-[#D87939] transition-colors">+62 851-1051-1403</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D87939] shrink-0" />
                <a href="mailto:halosivarya@gmail.com" className="font-bold text-[#1A2E4C] hover:text-[#D87939] transition-colors">halosivarya@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {currentYear} <strong className="text-[#1A2E4C] font-bold">{t.footer.copyright}</strong>. All rights reserved. Built with precision.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#1A2E4C] flex items-center justify-center hover:bg-[#D87939] hover:text-white hover:border-[#D87939] transition-all shadow-sm" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#1A2E4C] flex items-center justify-center hover:bg-[#D87939] hover:text-white hover:border-[#D87939] transition-all shadow-sm" aria-label="Social Media">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#1A2E4C] flex items-center justify-center hover:bg-[#D87939] hover:text-white hover:border-[#D87939] transition-all shadow-sm" aria-label="Video Channel">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
