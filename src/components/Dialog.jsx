// src/components/Dialog.jsx
import React, { useEffect } from 'react';
import Button from './Button';

export default function Dialog({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  onConfirm, 
  confirmLabel = "Confirm Action", 
  cancelLabel = "Cancel", 
  closeOnOutsideClick = true, 
  closeOnEscape = true 
}) {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={() => closeOnOutsideClick && onClose()} />
      
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 w-full max-w-sm relative z-10 p-5 text-left animate-in zoom-in-95 duration-150 space-y-4">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 text-base">{title}</h4>
          {description && (
            <p className="text-xs text-slate-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose}>{cancelLabel}</Button>
          <Button variant="solid" onClick={() => { onConfirm?.(); onClose(); }}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}