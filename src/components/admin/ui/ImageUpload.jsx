import { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, X, AlertCircle } from 'lucide-react';

export default function ImageUpload({ label = 'Upload cover image', helper, previewSrc, onChange }) {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(previewSrc ? 'preview' : 'empty');
  const [src, setSrc] = useState(previewSrc || null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async file => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setStatus('error');
        return;
      }
      setSrc(data.url);
      setStatus('preview');
      onChange?.({ status: 'preview', src: data.url });
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    if (inputRef.current) inputRef.current.value = '';
    setStatus('empty');
    setSrc(null);
    onChange?.({ status: 'empty', src: null });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        id={label.replace(/\s+/g, '-').toLowerCase()}
        onChange={e => handleFile(e.target.files?.[0])}
      />

      {status === 'empty' && (
        <label
          htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
          onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50 px-6 text-center transition-colors focus-within:ring-2 focus-within:ring-[#D87939]/40 ${
            dragOver ? 'border-[#D87939] bg-[#D87939]/5' : 'border-slate-300 hover:border-[#D87939]/50 hover:bg-white'
          }`}
        >
          <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D87939] shadow-sm">
            <UploadCloud className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-[#1A2E4C]">{label}</p>
          <p className="mt-1 text-xs text-slate-500">Klik untuk memilih file, atau seret ke sini</p>
          {helper && <p className="mt-2 text-xs text-slate-400">{helper}</p>}
        </label>
      )}

      {status === 'loading' && (
        <div className="flex min-h-[220px] animate-pulse items-center justify-center rounded-xl border border-slate-200 bg-slate-100">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-[#D87939]" aria-hidden="true" />
            Mengunggah gambar...
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 text-center">
          <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-600 shadow-sm">
            <AlertCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-red-700">Upload gagal</p>
          <p className="mt-1 text-xs text-red-600">Pastikan file berupa gambar (JPG, PNG, WebP).</p>
          <label
            htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
          >
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            Coba lagi
          </label>
        </div>
      )}

      {status === 'preview' && src && (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <img src={src} alt="Pratinjau cover" className="aspect-[16/9] w-full object-cover" />
          <button
            type="button"
            onClick={reset}
            aria-label="Hapus gambar"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <label
            htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
            className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-2 bg-[#1A2E4C]/80 py-2.5 text-xs font-semibold text-white opacity-100 transition-opacity hover:bg-[#1A2E4C]/90"
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Ganti gambar
          </label>
        </div>
      )}
    </div>
  );
}