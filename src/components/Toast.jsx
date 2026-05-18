// src/components/Toast.jsx
import React, { useEffect } from 'react';

export default function Toast({ 
  message, 
  variant = 'info', 
  isOpen, 
  onClose, 
  duration = 4000 
}) {
  useEffect(() => {
    if (!isOpen) return;
    const trackingTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(trackingTimer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    info: 'bg-slate-900 border-slate-800 text-white',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800'
  };

  return (
    <div 
      role="alert"
      aria-live="assertive"
      className={`fixed bottom-5 right-5 z-50 min-w-[280px] max-w-sm p-4 rounded-xl border shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 ${variantStyles[variant]}`}
    >
      <div className="flex-1 text-xs font-bold leading-normal">
        {message}
      </div>
      <button 
        type="button" 
        onClick={onClose}
        className="opacity-60 hover:opacity-100 text-xs font-bold transition-opacity cursor-pointer focus:outline-none"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}