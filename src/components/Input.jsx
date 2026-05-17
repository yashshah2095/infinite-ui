// src/components/Input.jsx
import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Input({ label, error, errorMessage, theme, disabled, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const globalTheme = useTheme();
  
  // Rule mapping: If input is failing, default automatically to the system error color node (preset or custom hex)
  const activeThemeColor = error 
    ? (globalTheme.error || 'rose') 
    : (theme || globalTheme.base);
    
  const { isPreset, tailwindClasses } = resolveTheme(activeThemeColor, 'outline');

  const baseInputStyles = "w-full px-3.5 py-2 border rounded-lg text-sm transition-all focus:outline-none placeholder:text-gray-400";
  
  // Set explicit system cursors alongside native background shading
  const stateStyles = disabled 
    ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed select-none" 
    : "bg-white text-gray-800 border-gray-300";

  // Compile runtime layout styles for arbitrary hex parameters
  const customInlineStyle = {};
  if (!isPreset && !disabled) {
    if (error || isFocused) {
      customInlineStyle.borderColor = activeThemeColor;
      if (isFocused) {
        customInlineStyle.boxShadow = `0 0 0 2px ${activeThemeColor}26`; // 15% opacity ring overlay
      }
    }
  }

  // Bind Tailwind presets natively during active focusing cycles
  const presetClasses = isPreset && (isFocused || error)
    ? `${tailwindClasses.border} ${isFocused ? `ring-2 ${tailwindClasses.ring} ring-offset-1 border-transparent` : ''}`
    : '';

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
          {label}
        </label>
      )}
      
      <input
        disabled={disabled}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => !disabled && setIsFocused(false)}
        className={`${baseInputStyles} ${stateStyles} ${presetClasses}`}
        style={customInlineStyle}
        {...props}
      />

      {error && errorMessage && (
        <span 
          className={`text-xs font-semibold animate-in ${isPreset ? tailwindClasses.text : ''}`}
          style={!isPreset ? { color: activeThemeColor } : {}}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}