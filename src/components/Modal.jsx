// src/components/Modal.jsx
import React, { useEffect } from 'react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  id = "accessible-modal" // Unique scoping namespace
}) {
  // Prevent background scrolling while modal is active
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop Layer */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Sheet Window Container */}
      <div 
        className="relative bg-white w-full max-w-md rounded-2xl border border-slate-200/80 p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
        // --- ACCESSIBILITY INJECTIONS ---
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-body`}
      >
        {/* Header Block */}
        <div className="flex items-center justify-between pb-1">
          <h3 id={`${id}-title`} className="font-black text-slate-800 tracking-tight text-base">
            {title}
          </h3>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog window"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Body Content Wrapper */}
        <div id={`${id}-body`} className="text-xs text-slate-500 leading-relaxed">
          {children}
        </div>

        {/* Operational Footer Actions Grid */}
        {footer && (
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}