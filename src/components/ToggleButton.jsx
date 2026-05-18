// src/components/ToggleButton.jsx
import React from 'react';

export default function ToggleButton({ 
  label, 
  checked = false, 
  disabled = false, 
  onChange,
  id = "toggle-switch" // Added fallback unique ID for label mapping
}) {
  return (
    <label 
      htmlFor={id}
      className={`flex items-center gap-3 select-none transition-all ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      }`}
    >
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="sr-only peer"
          // --- ACCESSIBILITY INJECTIONS ---
          role="switch"
          aria-checked={checked}
          aria-label={label || "Toggle switch"}
        />
        <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer transition-colors duration-200 peer-checked:bg-slate-900 peer-focus:ring-2 peer-focus:ring-slate-300" />
        <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-4 shadow-sm" />
      </div>
      {label && <span className="text-xs font-bold text-slate-600">{label}</span>}
    </label>
  );
}