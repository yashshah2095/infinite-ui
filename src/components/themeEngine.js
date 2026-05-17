// src/components/themeEngine.js
import { themeMap } from './themeMap';

export function resolveTheme(themeInput, variant = 'solid') {
  const isPreset = !!themeMap[themeInput];
  const activePreset = isPreset ? themeMap[themeInput] : themeMap.blue;

  if (isPreset) {
    return { isPreset: true, tailwindClasses: activePreset, inlineStyles: {} };
  }

  const inlineStyles = {};
  if (variant === 'solid') {
    inlineStyles.backgroundColor = themeInput;
    inlineStyles.color = '#ffffff';
  } else if (variant === 'outline') {
    inlineStyles.borderColor = themeInput;
    inlineStyles.color = themeInput;
    inlineStyles.backgroundColor = `${themeInput}0d`; 
  } else if (variant === 'ghost') {
    inlineStyles.color = themeInput;
  }

  return { isPreset: false, tailwindClasses: activePreset, inlineStyles };
}