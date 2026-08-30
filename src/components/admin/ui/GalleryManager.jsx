import { useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { focusRingVisible } from './styles.js';

export default function GalleryManager() {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);

  const addFiles = files => {
    if (!files?.length) return;
    const next = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
    if (inputRef.current) inputRef.current.value = '';
    setImages(prev => [...prev, ...next]);
  };

  const remove = index => {
    setImages(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        id="gallery-input"
        className="sr-only"
        onChange={e => addFiles(e.target.files)}
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((src, i) => (
          <div key={src} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <img src={src} alt={`Foto gallery ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label={`Hapus foto ${i + 1}`}
              onClick={() => remove(i)}
              className={`absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition-colors hover:text-red-600 ${focusRingVisible}`}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Tambah gambar gallery"
          className={`flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 transition-colors hover:border-[#D87939]/50 hover:bg-[#D87939]/5 hover:text-[#D87939] ${focusRingVisible}`}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Tambah</span>
        </button>
      </div>
    </div>
  );
}