// src/components/ToggleButton.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function ToggleButton({ checked, onChange, label }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');

  // Apply the custom hex color dynamically to the track if no system preset is used
  const trackInlineStyle = !isPreset && checked ? { backgroundColor: globalTheme.base } : {};

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        {/* Hidden Input controls the 'peer' states */}
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange?.(e.target.checked)} 
          className="sr-only peer" 
        />
        
        {/* TRACK: Fills with primary color when checked, slate-200 when off */}
        <div 
          className={`w-11 h-6 rounded-full transition-colors duration-300 ${
            checked 
              ? (isPreset ? tailwindClasses.bg : '') 
              : 'bg-slate-200'
          }`}
          style={trackInlineStyle}
        />
        
        {/* DOT / HANDLE: Glides to the right and drops its border when checked */}
        <div 
          className="absolute top-[2px] left-[2px] bg-white border border-slate-300 peer-checked:border-transparent rounded-full h-5 w-5 transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"
        />
      </div>
      
      {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
    </label>
  );
}