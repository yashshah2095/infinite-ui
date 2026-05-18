// src/components/DateTimePicker.jsx
import React from 'react';

export default function DateTimePicker({ label, value, disabled = false, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
      {label && (
        <label className={`text-[11px] font-black uppercase tracking-wider ${
          disabled ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {label}
        </label>
      )}
      <input
        type="datetime-local"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full px-3 py-2 text-xs font-medium rounded-lg border shadow-sm outline-none transition-all ${
          disabled 
            ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed select-none' 
            : 'bg-white border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'
        }`}
      />
    </div>
  );
}