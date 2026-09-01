import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_WIDTH = 176;
const MENU_HEIGHT = 136;
const MENU_GAP = 6;

export default function RowMenu({ anchorEl, onClose, children }) {
  const [pos, setPos] = useState(null);
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const openUp = window.innerHeight - rect.bottom < MENU_HEIGHT + MENU_GAP;
    let left = rect.right - MENU_WIDTH;
    left = Math.max(8, Math.min(left, window.innerWidth - MENU_WIDTH - 8));
    setPos({ left, top: openUp ? rect.top - MENU_HEIGHT - MENU_GAP : rect.bottom + MENU_GAP });
  }, [anchorEl]);

  useEffect(() => {
    window.addEventListener('scroll', onClose, true);
    window.addEventListener('resize', onClose);
    return () => {
      window.removeEventListener('scroll', onClose, true);
      window.removeEventListener('resize', onClose);
    };
  }, [onClose]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      style={{ position: 'fixed', top: pos.top, left: pos.left, width: MENU_WIDTH }}
      className="z-50 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
}