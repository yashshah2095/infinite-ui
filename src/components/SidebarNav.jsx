// src/components/SidebarNav.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function SidebarNav({ links = [], activeSection, onSectionClick }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  return (
    <aside className="w-60 hidden md:block shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 text-left">
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
            Components API
          </h4>
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = activeSection === link.id;

              // 1. Theme Configuration Resolution Mapping
              const activeTextClass = isPreset ? tailwindClasses.text : 'text-slate-800';
              const activeBgClass = isPreset ? tailwindClasses.bgLight : '';
              
              const inlineActiveStyle = !isPreset ? {
                color: globalTheme.base,
                backgroundColor: `${globalTheme.base}0d` // Premium 5% opacity tint
              } : {};

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    // Prevent default jumping to let scroll-smooth anchor animations fire
                    e.preventDefault();
                    onSectionClick(link.id);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-all border border-transparent select-none group ${
                    isActive 
                      ? `${activeTextClass} ${activeBgClass}` 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'
                  }`}
                  style={isActive ? inlineActiveStyle : {}}
                >
                  {/* Optional Icon Slot Rendering */}
                  {link.icon && (
                    <span className={`w-4 h-4 transition-colors flex items-center justify-center ${
                      isActive ? '' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      {link.icon}
                    </span>
                  )}
                  <span className="truncate">{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200/60 mx-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Active Frame</span>
          <span className="text-xs font-bold text-slate-700 block truncate">{globalTheme.name}</span>
        </div>
      </div>
    </aside>
  );
}