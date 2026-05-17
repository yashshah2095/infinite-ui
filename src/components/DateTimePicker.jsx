// src/components/DateTimePicker.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function DateTimePicker({ label, value, onChange }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  // Split string into separate date and time blocks gracefully
  const [datePart, timePart] = value ? value.split('T') : ['', ''];

  const handleUpdate = (date, time) => {
    if (date && time) {
      onChange?.(`${date}T${time}`);
    } else if (date) {
      onChange?.(`${date}T00:00`);
    }
  };

  const customFocusStyle = !isPreset ? { focusWithin: { borderColor: globalTheme.base } } : {};

  return (
    <div className="flex flex-col gap-1.5 text-left w-full">
      {label && <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</label>}
      <div 
        className="flex gap-2 items-center border border-slate-200 bg-white rounded-lg p-1.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-offset-1 focus-within:border-transparent focus-within:ring-slate-900/10"
        style={customFocusStyle}
      >
        <input
          type="date"
          value={datePart}
          onChange={(e) => handleUpdate(e.target.value, timePart)}
          className="w-full bg-transparent text-xs font-bold text-slate-700 outline-none p-1 cursor-pointer"
        />
        <div className="w-[1px] h-4 bg-slate-200" />
        <input
          type="time"
          value={timePart}
          onChange={(e) => handleUpdate(datePart, e.target.value)}
          className="w-full bg-transparent text-xs font-bold text-slate-700 outline-none p-1 cursor-pointer"
        />
      </div>
    </div>
  );
}