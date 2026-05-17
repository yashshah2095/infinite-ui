// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Navbar({ brandName = "Infinite UI", links = [], activeView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');

  const inlineBgStyle = !isPreset ? { backgroundColor: globalTheme.base } : {};

  return (
    <header 
      className={`z-50 text-white shadow-lg sticky top-0 w-full transition-all duration-300 overflow-hidden ${
        isPreset ? tailwindClasses.bg : ''
      }`}
      style={inlineBgStyle}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* BRAND & NAVIGATION LINKS */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-6 h-6 rounded-md bg-white text-slate-900 flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
              ∞
            </div>
            <span className="font-black tracking-wider text-sm uppercase">{brandName}</span>
          </div>

          {/* DESKTOP LINKS — Swapped from <a> to <button> to allow click-state intercepting */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link, idx) => {
              const isActive = activeView === link.id;
              return (
                <button 
                  key={idx} 
                  type="button"
                  onClick={() => {
                    if (link.onClick) {
                      link.onClick();
                    }
                  }}
                  className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer outline-none ${
                    isActive ? 'bg-white/20 shadow-inner text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTROLS BADGE */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest bg-black/15 px-2.5 py-1 rounded-md border border-white/5">
            v1.4 Core Active
          </span>
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 hover:bg-white/10 rounded-md transition-colors text-lg focus:outline-none"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-1 bg-black/10 animate-in slide-in-from-top-2">
          {links.map((link, idx) => (
            <button 
              key={idx} 
              type="button"
              onClick={() => { 
                link.onClick?.(); 
                setMobileMenuOpen(false); 
              }}
              className="text-xs font-bold py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors text-left w-full text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}