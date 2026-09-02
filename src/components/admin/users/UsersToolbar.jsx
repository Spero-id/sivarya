import { Search } from 'lucide-react';
import { inputCls } from '../ui/styles.js';

export default function UsersToolbar({ search, onSearch }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Cari nama, username, email..."
          aria-label="Cari user"
          className={`${inputCls} pl-10`}
        />
      </div>
    </div>
  );
}