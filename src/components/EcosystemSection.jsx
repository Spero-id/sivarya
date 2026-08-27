import { Award, MonitorSmartphone, Clapperboard, Megaphone, CalendarDays, Plane } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { ui } from '../i18n/ui.js';

const talents = [
  { num: '01', name: { id: 'Teknologi Inovatif', en: 'Innovative Technology' }, desc: { id: 'Web, app & sistem internal', en: 'Web, app & internal systems' } },
  { num: '02', name: { id: 'Kreator Visual', en: 'Visual Creators' }, desc: { id: 'Produksi audiovisual & desain', en: 'Audiovisual production & design' } },
  { num: '03', name: { id: 'Sound Engineer', en: 'Sound Engineer' }, desc: { id: 'Recording & manajemen podcast', en: 'Recording & podcast management' } },
  { num: '04', name: { id: 'Eksekutor Lapangan', en: 'Field Executors' }, desc: { id: 'Event, merchandise & travel', en: 'Event, merchandise & travel' } },
];

const legalFacts = [
  { label: { id: 'Nama Entitas Legal', en: 'Legal Entity Name' }, value: 'PT Sinergi Inovasi Karya' },
  { label: { id: 'Nomor AHU Kemenkumham', en: 'Ministry of Law AHU Number' }, value: 'AHU-A007242.AH.01.31.Tahun 2026.' },
  { label: { id: 'Nomor Induk Berusaha (NIB)', en: 'Business Identification Number (NIB)' }, value: '0307260016204' },
  { label: { id: 'Sertifikasi & Kemitraan', en: 'Certification & Partnership' }, value: 'B2B Enterprise Certified' },
];

const pipelineSteps = [
  { num: '01', title: { id: 'Digital Infra', en: 'Digital Infra' }, desc: { id: 'Website, aplikasi, dan sistem internal yang scalable sejak awal.', en: 'Scalable websites, applications, and internal systems from day one.' }, icon: MonitorSmartphone },
  { num: '02', title: { id: 'Audiovisual & Audio', en: 'Audiovisual & Audio' }, desc: { id: 'Video dan podcast berstandar studio untuk konten brand Anda.', en: 'Studio-standard videos and podcasts for your brand content.' }, icon: Clapperboard },
  { num: '03', title: { id: 'Social Strategy', en: 'Social Strategy' }, desc: { id: 'Distribusi konten terorkestrasi berbasis data untuk growth organik.', en: 'Data-driven orchestrated content distribution for organic growth.' }, icon: Megaphone },
  { num: '04', title: { id: 'Event & Merch', en: 'Event & Merch' }, desc: { id: 'Aktivasi, konferensi, dan merchandise dieksekusi end-to-end.', en: 'Activations, conferences, and merchandise executed end-to-end.' }, icon: CalendarDays },
  { num: '05', title: { id: 'Travel Experience', en: 'Travel Experience' }, desc: { id: 'Perjalanan korporat terkurasi sebagai puncak pengalaman brand.', en: 'Curated corporate journeys as the pinnacle of brand experience.' }, icon: Plane },
];

function CurvedConnector({ direction }) {
  return (
    <svg
      className={`hidden lg:block absolute left-full -translate-x-1/2 w-32 h-20 pointer-events-none ${direction === 'down' ? 'lg:top-8' : 'lg:top-[-32px]'
        }`}
      viewBox="0 0 128 80"
      fill="none"
      aria-hidden="true"
    >
      {direction === 'down' ? (
        <>
          <path d="M 2 8 C 42 8, 86 72, 118 72" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 110 64 L 122 72 L 110 80" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M 2 72 C 42 72, 86 8, 118 8" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 110 0 L 122 8 L 110 16" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export default function EcosystemSection({ lang = 'id' }) {
  const t = ui[lang];
  return (
    <section className="py-10 lg:py-10 bg-white relative" id="ecosystem">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-12 lg:gap-10 items-end pb-10 lg:pb-7 mb-7 lg:mb-7">
          <div className="lg:col-span-7">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] text-[#1A2E4C] mt-3 leading-[1.08]">
              Strategic Partner<br />Ecosystem
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-8 text-slate-600 text-base lg:text-lg leading-relaxed mt-5 lg:mt-0">
            {t.eco.introPre}<strong className="text-[#1A2E4C] font-semibold">Strategic Partner</strong>{t.eco.introPost}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:border-t lg:border-l border-t border-slate-200">
          <Reveal className="border-b lg:border-r border-slate-200 lg:col-span-7 p-8 lg:p-12 flex flex-col">
            <span className="font-semibold text-xs tracking-widest text-[#D87939] uppercase">{t.eco.partnershipLabel}</span>
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-[#1A2E4C] mt-3 mb-5">Strategic Partner Vision</h3>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed max-w-xl">
              {t.eco.partnerPre}<strong className="text-[#D87939] font-semibold">Strategic Partner</strong>{t.eco.partnerPost}
            </p>
            <span className="font-semibold text-7xl lg:text-8xl text-[#1A2E4C]/[0.05] leading-none select-none mt-10 lg:mt-auto pt-6">
              01
            </span>
          </Reveal>

          <Reveal delay={120} className="border-b lg:border-r border-slate-200 lg:col-span-5 p-8 lg:p-12">
            <span className="font-semibold text-xs tracking-widest text-[#D87939] uppercase">{t.eco.talentLabel}</span>
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-[#1A2E4C] mt-3 mb-4">Integrated Ecosystem</h3>
            <ul>
              {talents.map((talent) => (
                <li key={talent.num} className="flex items-baseline gap-4 py-3 border-b border-slate-100 last:border-b-0">
                  <span className="font-semibold text-[13px]  text-[#D87939]/60 shrink-0">{talent.num}</span>
                  <div>
                    <span className="block text-sm font-bold text-[#1A2E4C]">{talent.name[lang]}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{talent.desc[lang]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="border-b lg:border-r border-slate-200 lg:col-span-12">
            <div className="relative overflow-hidden bg-[#1A2E4C] text-white p-8 lg:p-14">

              <span className="pointer-events-none select-none absolute -bottom-6 left-2 lg:left-3 font-heading font-extrabold text-white/[0.06] text-6xl lg:text-8xl leading-none tracking-tight whitespace-nowrap">
                PT SINERGI INOVASI KARYA
              </span>

              <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">

                <div className="lg:max-w-xs shrink-0">
                  <span className="text-xs font-semibold tracking-widest text-[#D87939] uppercase block mb-3">
                    {t.eco.legalityLabel}
                  </span>
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white leading-tight mb-4">
                    {t.eco.legalityHeading}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.eco.legalityBody}
                  </p>
                </div>

                <div className="flex-1 border-t border-white/10 lg:border-t-0 lg:border-l lg:pl-14 pt-8 lg:pt-0">
                  <dl className="space-y-0">
                    {legalFacts.map((fact, idx) => (
                      <div
                        key={fact.value}
                        className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-4 border-b border-dashed border-white/15 last:border-b-0"
                      >
                        <dt className="font-semibold text-[10px] text-slate-400 tracking-widest uppercase shrink-0">
                          {fact.label[lang]}
                        </dt>
                        <dd className="font-mono text-[12px] lg:text-sm text-white font-semibold sm:text-right break-words">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
            <div>
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-[#1A2E4C] mt-3">{t.eco.workflowHeading}</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {t.eco.workflowSub}
            </p>
          </div>

          <div className="relative flex flex-col gap-y-9 lg:grid lg:grid-cols-5 lg:gap-y-0 lg:pb-20">
            <div className="absolute left-[32px] top-3 bottom-3 w-px bg-slate-200 lg:hidden" aria-hidden="true" />
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const shifted = idx % 2 === 1;
              return (
                <Reveal
                  key={step.num}
                  delay={idx * 90}
                  className={`relative flex gap-5 lg:block lg:px-3 ${shifted ? 'lg:translate-y-16' : ''}`}
                >
                  {idx < pipelineSteps.length - 1 && (
                    <CurvedConnector direction={idx % 2 === 0 ? 'down' : 'up'} />
                  )}

                  <div className="relative z-10 shrink-0 lg:mx-auto">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#D87939]" strokeWidth={1.75} />
                    </div>
                    <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-[#1A2E4C] text-white font-semibold text-[10px] flex items-center justify-center ring-4 ring-white">
                      {step.num}
                    </span>
                  </div>

                  <div className="lg:mt-6 lg:mx-auto lg:max-w-[180px] lg:text-center">
                    <h4 className="font-bold text-sm text-[#1A2E4C]">{step.title[lang]}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{step.desc[lang]}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
