import { Layers, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { getUi } from '../i18n/ui.js';

const pillars = [
  {
    num: "01",
    title: { id: "Tri-Pilar Integrasi Strategis", en: "Tri-Pillar Strategic Integration" },
    desc: {
      id: "Integrasi tanpa batas antara Technology, Visual Content, dan Live Experiences dalam satu ekosistem yang terorkestrasi presisi.",
      en: "Seamless integration between Technology, Visual Content, and Live Experiences in one precisely orchestrated ecosystem.",
    },
    icon: Layers
  },
  {
    num: "02",
    title: { id: "Legalitas & Kemitraan B2B Terpercaya", en: "Trusted Legality & B2B Partnership" },
    desc: {
      id: "PT Sinergi Inovasi Karya adalah entitas legal resmi bersertifikasi Kemenkumham untuk kemitraan B2B yang aman.",
      en: "PT Sinergi Inovasi Karya is an officially legal entity certified by the Ministry of Law and Human Rights for safe B2B partnerships.",
    },
    icon: ShieldCheck
  },
  {
    num: "03",
    title: { id: "Single Point of Orchestration", en: "Single Point of Orchestration" },
    desc: {
      id: "Hilangkan kompleksitas mengelola banyak vendor terpisah. Sivarya menangani end-to-end execution dengan standar kualitas konsisten.",
      en: "Eliminate the complexity of managing multiple separate vendors. Sivarya handles end-to-end execution with consistent quality standards.",
    },
    icon: Zap
  },
  {
    num: "04",
    title: { id: "Data-Driven & High Impact", en: "Data-Driven & High Impact" },
    desc: {
      id: "Setiap strategi dirancang berbasis analitik data, riset audiens mendalam, serta eksekusi kreatif bernilai estetika tinggi untuk ROI terukur.",
      en: "Every strategy is designed based on data analytics, in-depth audience research, and high-aesthetic creative execution for measurable ROI.",
    },
    icon: BarChart3
  }
];

export default function WhySivarya({ lang = 'id' }) {
  const t = getUi(lang);

  return (
    <section className="py-28 bg-white" id="why-sivarya">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1A2E4C] mt-3 mb-4">
            {t.why.heading}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t.why.sub1}
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t.why.sub2}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-stretch">

          <div className="border-t border-slate-200">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative border-b border-slate-200 py-8 pl-6 sm:pl-8 -ml-6 sm:-ml-8 pr-4 transition-colors duration-300 hover:bg-[#D87939]/[0.04]"
                >
                  <span className="absolute left-0 top-8 bottom-8 w-[3px] bg-[#D87939] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                  <div className="flex items-start gap-6 sm:gap-10">
                    <span className="font-semibold text-sm sm:text-base text-[#D87939]/50 group-hover:text-[#D87939] transition-colors pt-1.5 shrink-0 w-8">
                      {item.num}
                    </span>

                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1A2E4C] mb-2">
                        {item.title[lang]}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                        {item.desc[lang]}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-[#D87939] group-hover:bg-[#D87939] transition-colors">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-0">
            <img
              src="/images/portfolio_audiovisual.jpg"
              alt="Sivarya creative team"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E4C]/90 via-[#1A2E4C]/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <span className="font-medium text-[10px] text-[#D87939] tracking-widest uppercase block mb-3">
                {t.why.philosophyLabel}
              </span>
              <p className="font-heading font-bold text-lg text-white leading-snug mb-8">
                {t.why.quote}
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "7", label: t.why.statPillars },
                  { value: "100%", label: "End-to-End" },
                  { value: "B2B", label: "Enterprise" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#D87939] backdrop-blur-sm rounded-xl py-4 text-center">
                    <span className="font-heading font-extrabold text-xl text-white block leading-none mb-1">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold text-[#1A2E4C] uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}