import { useEffect } from 'react';
import { Building2, Target, Lightbulb, TrendingUp, X, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const waText = encodeURIComponent(
    `Halo Sivarya, saya tertarik dengan case study "${project.title}" (${project.client}) dan ingin mendiskusikan konsultasi untuk proyek serupa.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const ctaLabel = project.ctaText || `Konsultasikan Proyek ${project.categoryName} Serupa`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#1A2E4C]/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100/80 transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-7 sm:pb-5 border-b border-slate-100 bg-white relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1 pr-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-[#D87939] bg-[#D87939]/10 border border-[#D87939]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D87939] animate-pulse" />
              {project.categoryName}
            </span>

            <h2
              id="case-study-title"
              className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A2E4C] leading-tight mt-2.5"
            >
              {project.title}
            </h2>

            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
              <span className="text-[#1A2E4C] font-semibold">{project.client}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal case study"
            className="flex-shrink-0 p-2 text-slate-400 hover:text-[#1A2E4C] hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D87939]/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-6 space-y-6 flex-1 bg-white">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm bg-slate-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E4C]/30 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 transition-colors hover:border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#1A2E4C]/10 flex items-center justify-center text-[#1A2E4C]">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A2E4C]">
                  The Client
                </span>
              </div>
              <p className="text-[#1A2E4C] font-bold text-sm sm:text-base mb-1">
                {project.client}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {project.clientContext || project.summary}
              </p>
            </div>

            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 transition-colors hover:border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-rose-500/10 flex items-center justify-center text-rose-600">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A2E4C]">
                  The Challenge
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 transition-colors hover:border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A2E4C]">
                  Our Strategy
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {project.strategy}
              </p>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#D87939]/12 via-amber-500/8 to-orange-50 border-2 border-[#D87939]/40 rounded-xl p-4 sm:p-5 shadow-md">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-28 h-28 bg-[#D87939]/15 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#D87939] text-white flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D87939]">
                      The Result
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wide bg-[#D87939] text-white px-2.5 py-0.5 rounded-full shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" />
                    Dampak Terukur
                  </span>
                </div>

                <p className="text-[#1A2E4C] font-semibold text-xs sm:text-sm sm:text-base leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 hidden sm:block">
            Ingin hasil dan solusi serupa untuk organisasi Anda?
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D87939] hover:bg-[#C26527] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#D87939]/25 hover:shadow-[#D87939]/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
