// src/components/Pagination.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        ◀
      </button>
      {pages.map(page => {
        const isActive = page === currentPage;
        const inlineActiveStyle = !isPreset && isActive ? { backgroundColor: globalTheme.base, borderColor: globalTheme.base } : {};

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all ${
              isActive 
                ? isPreset ? `${tailwindClasses.bg} ${tailwindClasses.border} text-white` : 'text-white'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            style={inlineActiveStyle}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        ▶
      </button>
    </div>
  );
}