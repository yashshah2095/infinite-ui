// src/components/Button.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Button({ children, onClick, variant = 'solid', theme, disabled, ...props }) {
  const globalTheme = useTheme();
  const activeThemeColor = theme || globalTheme.base; // Local prop overrides global context
  
  const { isPreset, tailwindClasses, inlineStyles } = resolveTheme(activeThemeColor, variant);

  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 flex items-center gap-2 text-sm";
  const cursorStyles = disabled ? "opacity-50 cursor-not-allowed select-none" : "cursor-pointer active:scale-[0.98]";

  const variants = {
    solid: isPreset ? `${tailwindClasses.bg} ${disabled ? '' : tailwindClasses.bgHover} text-white ${tailwindClasses.ring}` : 'text-white',
    outline: isPreset ? `border ${tailwindClasses.border} ${tailwindClasses.text} ${tailwindClasses.bgLight} ${tailwindClasses.ring}` : 'border',
    ghost: isPreset ? `${tailwindClasses.text} ${disabled ? '' : 'hover:bg-gray-50'}` : ''
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`${baseStyles} ${cursorStyles} ${variants[variant]}`}
      style={!isPreset && !disabled ? inlineStyles : disabled && !isPreset ? { backgroundColor: '#e2e8f0', color: '#94a3b8' } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}