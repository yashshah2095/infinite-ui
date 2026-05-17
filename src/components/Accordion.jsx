// src/components/Accordion.jsx
import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'outline');

  return (
    <div className="w-full border rounded-xl bg-white shadow-sm overflow-hidden divide-y divide-gray-200">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="w-full">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className={`w-full px-5 py-4 flex justify-between items-center text-left font-semibold text-sm ${isOpen && isPreset ? `${tailwindClasses.bgLight} ${tailwindClasses.text}` : 'text-gray-800'}`}
              style={isOpen && !isPreset ? { color: globalTheme.base, backgroundColor: `${globalTheme.base}0d` } : {}}
            >
              {item.title} <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && <div className="px-5 py-4 bg-gray-50/50 border-t text-sm text-gray-600">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}