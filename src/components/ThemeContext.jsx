// src/components/ThemeContext.jsx
import React, { createContext, useContext } from 'react';

const defaultThemeConfig = {
  base: 'blue',
  success: 'emerald',
  error: 'rose',
  warning: 'amber',
  neutral: 'slate'
};

const ThemeContext = createContext(defaultThemeConfig);

export function ThemeProvider({ value, children }) {
  const unifiedTheme = { ...defaultThemeConfig, ...value };
  return (
    <ThemeContext.Provider value={unifiedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}