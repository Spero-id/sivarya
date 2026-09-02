export function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatCompact(value) {
  value = Number(value) || 0;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace('.', ',')} jt`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace('.', ',')} rb`;
  return String(value);
}

export function getInitials(name, fallback = 'AD') {
  return (
    (name || '').trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() ||
    fallback
  );
}