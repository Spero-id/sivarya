import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { projectsData, categories } from '../data/projects.js';
import { getUi, langPath } from '../i18n/ui.js';

type GridCategory = {
  id: string;
  name: string;
};

type GridProject = {
  id: number | string;
  slug?: string;
  category: string;
  categoryName: Record<string, string>;
  title: string;
  client: string;
  image: string | null;
  aspect?: string;
  summary: Record<string, string>;
  challenge?: Record<string, string> | null;
  strategy?: Record<string, string> | null;
  result?: Record<string, string> | null;
};

type Props = {
  lang?: string;
  projects?: GridProject[];
  categories?: GridCategory[];
};

export default function CaseStudiesGrid({
  lang = 'id',
  projects = projectsData,
  categories: categoriesProp = categories,
}: Props) {
  const t = getUi(lang);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="py-20 bg-white relative" id="works">
      <div className="max-w-7xl mx-auto px-6 pb-10 sm:pb-15 lg:border-b border-b border-slate-400">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1A2E4C] mt-3 mb-4">
            {t.cases.heading}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {t.cases.sub}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categoriesProp.map(cat => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#1A2E4C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filteredProjects.map((proj) => (
            <a
              key={proj.id}
              href={langPath(lang, `/work/${proj.slug || proj.id}`)}
              className="break-inside-avoid mb-6 group block"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="absolute top-3 left-3 font-semibold text-[10px] font-bold bg-white/90 backdrop-blur-sm text-[#1A2E4C] px-2.5 py-1 rounded-md">
                  {proj.categoryName[lang]}
                </span>

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-4 h-4 text-[#1A2E4C]" />
                </div>
              </div>

              <div className="px-1">
                <span className="text-[11px] font-bold text-[#D87939] uppercase tracking-wider block mb-1">
                  {proj.client}
                </span>
                <h3 className="font-heading font-bold text-base text-[#1A2E4C] leading-snug mb-1.5 group-hover:text-[#D87939] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {proj.summary[lang]}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
