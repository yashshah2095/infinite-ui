// src/components/Alert.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

const icons = {
  success: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  error: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  warning: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
};

export default function Alert({ title, children, status = 'neutral', theme }) {
  const globalTheme = useTheme();
  
  // Resolve mapping value based on status or manual fallback overrides
  const targetColor = theme || globalTheme[status] || globalTheme.neutral;
  const { isPreset, tailwindClasses, inlineStyles } = resolveTheme(targetColor, 'outline');

  const containerClasses = isPreset 
    ? `p-4 rounded-xl border flex gap-3 ${tailwindClasses.border} ${tailwindClasses.bgLight} ${tailwindClasses.textDark}`
    : `p-4 rounded-xl border flex gap-3`;

  return (
    <div className={containerClasses} style={!isPreset ? inlineStyles : {}}>
      {icons[status] && <div className={isPreset ? tailwindClasses.text : ''} style={!isPreset ? { color: targetColor } : {}}>{icons[status]}</div>}
      <div className="flex flex-col gap-0.5">
        {title && <h4 className="font-bold text-sm leading-none">{title}</h4>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}