// src/components/Breadcrumbs.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Breadcrumbs({ items = [], separator = "/", onCrumbClick }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  return (
    <nav className="flex text-xs font-bold text-slate-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          
          return (
            <li key={idx} className="inline-flex items-center">
              {/* Divider element rendering */}
              {idx > 0 && <span className="mx-2 text-slate-400 select-none">{separator}</span>}
              
              {isLast ? (
                <span className="text-slate-800 tracking-wide">{item.label}</span>
              ) : (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // Supports individual item onClick callbacks or a global prop channel emitter
                    if (item.onClick) {
                      item.onClick(item, idx);
                    } else if (onCrumbClick) {
                      onCrumbClick(item, idx);
                    }
                  }}
                  className={`hover:underline transition-colors focus:outline-none cursor-pointer bg-transparent border-none p-0 font-bold ${
                    isPreset ? tailwindClasses.text : ''
                  }`}
                  style={!isPreset ? { color: globalTheme.base } : {}}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}