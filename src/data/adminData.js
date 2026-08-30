import { projectsData } from './projects.js';

export const portfolioStatus = {
  'proj-1': 'published',
  'proj-2': 'published',
  'proj-3': 'draft',
  'proj-4': 'published',
  'proj-5': 'published',
  'proj-6': 'published',
  'proj-7': 'draft',
};

export const portfolioViews = {
  'proj-1': 124800,
  'proj-2': 98200,
  'proj-3': 0,
  'proj-4': 21490,
  'proj-5': 612300,
  'proj-6': 38500,
  'proj-7': 0,
};

export const portfolioYear = {
  'proj-1': 2025,
  'proj-2': 2026,
  'proj-3': 2026,
  'proj-4': 2025,
  'proj-5': 2026,
  'proj-6': 2024,
  'proj-7': 2026,
};

export const portfolioFeatured = {
  'proj-1': true,
  'proj-2': false,
  'proj-3': false,
  'proj-4': false,
  'proj-5': true,
  'proj-6': false,
  'proj-7': false,
};

export const portfolioUpdated = {
  'proj-1': '12 Jun 2026',
  'proj-2': '20 Mei 2026',
  'proj-3': '8 Agu 2026',
  'proj-4': '3 Apr 2026',
  'proj-5': '15 Jul 2026',
  'proj-6': '22 Feb 2026',
  'proj-7': '28 Agu 2026',
};

export const portfolioItems = projectsData.map(project => ({
  ...project,
  status: portfolioStatus[project.id],
  views: portfolioViews[project.id],
  year: portfolioYear[project.id],
  featured: portfolioFeatured[project.id],
  updatedAt: portfolioUpdated[project.id],
}));

export function formatCompact(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.', ',')} jt`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.', ',')} rb`;
  }
  return String(value);
}

export const dashboardStats = [
  { key: 'total', label: 'Total Portfolio', value: '7', hint: 'Semua proyek' },
  { key: 'published', label: 'Published', value: '5', hint: 'Tayang di situs' },
  { key: 'draft', label: 'Draft', value: '2', hint: 'Menunggu review' },
  { key: 'views', label: 'Total Views', value: formatCompact(portfolioItems.reduce((sum, p) => sum + p.views, 0)), hint: 'Semua waktu' },
];

export const recentActivity = [
  { id: 1, type: 'publish', text: 'Menerbitkan "Bank Mandiri Cinematic Brand Campaign"', time: '2 jam lalu' },
  { id: 2, type: 'edit', text: 'Memperbarui "Global Tech Summit & Brand Activation 2026"', time: '5 jam lalu' },
  { id: 3, type: 'draft', text: 'Menyimpan draft "Sivarya Tech Leadership Podcast Series"', time: 'Kemarin' },
  { id: 4, type: 'view', text: 'Traffic portfolio naik 18% dibanding minggu lalu', time: 'Kemarin' },
  { id: 5, type: 'edit', text: 'Mengganti cover "Indofood Executive Gifting & Custom Kit"', time: '3 hari lalu' },
];

export const notifications = [
  { id: 1, title: '\u201CGlobal Tech Summit 2026\u201D telah diterbitkan', time: 'Baru saja' },
  { id: 2, title: 'Draft \u201CPodcast Series\u201D menunggu review Anda', time: '1 jam lalu' },
  { id: 3, title: 'Laporan kinerja bulan Juli siap dilihat', time: 'Kemarin' },
];