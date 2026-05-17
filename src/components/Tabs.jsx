// src/components/Tabs.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Tabs({ tabs = [], activeTab, onTabChange }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  return (
    <div className="border-b border-slate-200 w-full select-none">
      <nav className="flex gap-6 -mb-[1px]" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          
          const inlineActiveStyle = !isPreset && isActive ? { color: globalTheme.base, borderBottomColor: globalTheme.base } : {};

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange?.(tab.key)}
              className={`py-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer focus:outline-none ${
                isActive
                  ? isPreset ? `${tailwindClasses.text} ${tailwindClasses.border}` : ''
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'
              }`}
              style={inlineActiveStyle}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}