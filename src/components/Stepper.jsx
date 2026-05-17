// src/components/Stepper.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Stepper({ steps = [], activeStep = 0 }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');

  return (
    <div className="w-full flex items-center justify-between select-none">
      {steps.map((step, idx) => {
        const isCompleted = idx < activeStep;
        const isActive = idx === activeStep;
        
        const inlineStyle = !isPreset && (isActive || isCompleted) ? { backgroundColor: globalTheme.base, borderColor: globalTheme.base } : {};
        const inlineTextStyle = !isPreset && isActive ? { color: globalTheme.base } : {};

        return (
          <div key={idx} className="flex-1 flex items-center last:flex-none group">
            <div className="flex flex-col items-center relative">
              <div 
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted || isActive
                    ? isPreset ? `${tailwindClasses.bg} ${tailwindClasses.border} text-white` : 'text-white'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
                style={inlineStyle}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span 
                className={`absolute top-8 text-[10px] font-bold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  isActive ? isPreset ? tailwindClasses.text : 'text-slate-800' : 'text-slate-400'
                }`}
                style={inlineTextStyle}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div 
                className={`flex-1 h-[2px] mx-4 transition-all duration-500 ${
                  isCompleted 
                    ? isPreset ? tailwindClasses.bg : '' 
                    : 'bg-slate-200'
                }`}
                style={isCompleted && !isPreset ? { backgroundColor: globalTheme.base } : {}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}