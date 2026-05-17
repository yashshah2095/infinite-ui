// src/components/Modal.jsx
import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  closeOnOutsideClick = true, 
  closeOnEscape = true 
}) {
  const globalTheme = useTheme();
  
  // Extract global layout configurations targeting the "solid" profile schema mapping
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');

  // Keybind Hook Cycle Event
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  // Custom Inline Object Configs
  const inlineBgStyle = !isPreset ? { backgroundColor: globalTheme.base } : {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Target mask dismissal area background plane layer */}
      <div className="absolute inset-0" onClick={() => closeOnOutsideClick && onClose()} />
      
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        
        {/* REPAINTED HEADER SECTION: Matches Root Active Token */}
        <div 
          className={`px-5 py-4 flex items-center justify-between ${isPreset ? tailwindClasses.bg : ''}`}
          style={inlineBgStyle}
        >
          <h3 className="font-bold text-white text-base tracking-wide">{title}</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="text-white/70 hover:text-white font-bold text-lg focus:outline-none cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* INNER TEXT SCROLL BODY SECTION */}
        <div className="px-5 py-5 text-sm text-slate-600 flex-1 overflow-y-auto leading-relaxed max-h-[60vh]">
          {children}
        </div>

        {/* ACTION GRID FOOTER ALIGNMENTS */}
        {footer && (
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}