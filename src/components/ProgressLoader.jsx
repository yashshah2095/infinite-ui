// src/components/ProgressLoader.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function ProgressLoader({ variant = 'circular', value, theme }) {
  const globalTheme = useTheme();
  const activeThemeColor = theme || globalTheme.base;
  const { isPreset, tailwindClasses } = resolveTheme(activeThemeColor, 'solid');

  const bgStyles = isPreset ? tailwindClasses.bg : '';
  const borderStyles = isPreset ? tailwindClasses.border : '';
  const inlineBgStyle = !isPreset ? { backgroundColor: activeThemeColor } : {};

  // FIX: Explicitly map individual sides to protect the transparent cutout gap
  const inlineBorderStyle = !isPreset ? {
    borderLeftColor: activeThemeColor,
    borderRightColor: activeThemeColor,
    borderBottomColor: activeThemeColor,
    borderTopColor: 'transparent'
  } : {};

  // Variant A: Circular Spinner Wheel
  if (variant === 'circular') {
    return (
      <div className="flex items-center justify-center p-2">
        <div 
          className={`w-8 h-8 border-4 border-gray-200 border-t-transparent rounded-full animate-spin ${isPreset ? borderStyles : ''}`}
          style={inlineBorderStyle}
        />
      </div>
    );
  }

  // Variant B: Linear Track Gauge (Handles Infinite Motion or Discrete Completion Steps)
  if (variant === 'linear') {
    const isIndeterminate = value === undefined;
    
    // Indeterminate tracks hold a fixed visual block width that infinitely loops across the frame
    const widthPercent = isIndeterminate ? '40%' : `${Math.min(Math.max(value, 0), 100)}%`;

    return (
      <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden relative">
        <div 
          className={`h-full rounded-full ${bgStyles} ${
            isIndeterminate 
              ? 'absolute top-0 left-0 w-2/5 animate-linear-progress' 
              : 'transition-all duration-300'
          }`}
          style={{ width: widthPercent, ...inlineBgStyle }}
        />
      </div>
    );
  }

  // Variant C: Suspense / Skeleton Content Placeholder Block
  if (variant === 'suspense') {
    return (
      <div className="w-full p-5 border border-gray-200/80 rounded-xl space-y-4 bg-white animate-pulse shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    );
  }

  return null;
}