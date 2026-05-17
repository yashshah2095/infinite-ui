// src/components/ContextMenu.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ContextMenu({ options = [], children }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    
    // FIXED: Swapped pageX/pageY out for clientX/clientY to align with fixed viewport coordinates
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  useEffect(() => {
    const closeMenu = () => setVisible(false);
    
    // Closes the panel on standard left clicks or when the window frame alters scale
    document.addEventListener('click', closeMenu);
    window.addEventListener('resize', closeMenu);
    
    return () => {
      document.removeEventListener('click', closeMenu);
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <div onContextMenu={handleContextMenu} className="w-full h-full">
      {children}
      {visible && (
        <div
          ref={menuRef}
          className="fixed rounded-lg bg-white shadow-xl border border-slate-100 z-50 py-1.5 w-44 animate-in fade-in zoom-in-95 duration-100 text-left"
          style={{ top: position.y, left: position.x }}
        >
          {options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { opt.onClick?.(); setVisible(false); }}
              className="w-full px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-between bg-transparent border-none outline-none cursor-pointer"
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}