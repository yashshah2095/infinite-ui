// src/components/Drawer.jsx
import React, { useEffect } from 'react';

export default function Drawer({ 
  isOpen, 
  onClose, 
  title, 
  children,
  id = "system-drawer" 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sliding Sheet Panel */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="px-5 h-16 border-b border-slate-100 flex items-center justify-between">
          <h3 id={`${id}-title`} className="font-black text-slate-800 tracking-tight text-sm uppercase">
            {title}
          </h3>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close configuration panel"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-slate-500 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}