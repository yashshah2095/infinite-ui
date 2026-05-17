// src/components/Tooltip.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Tooltip({ content, children, variant = 'hover', direction = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'solid');
  const containerRef = useRef(null);

  const isInfo = variant === 'info';

  // Interaction handlers
  const handleTriggerClick = (e) => {
    if (isInfo) {
      e.stopPropagation();
      setIsVisible((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!isInfo) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isInfo) setIsVisible(false);
  };

  useEffect(() => {
    if (!isInfo || !isVisible) return;
    function clickOutsideHandler(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [isInfo, isVisible]);

  // 1. Static Layout Tailwind Class Maps
  const directionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
    right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-x-transparent border-t-4 border-x-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-b-4 border-x-4",
    left: "left-full top-1/2 -translate-y-1/2 border-y-transparent border-l-4 border-y-4",
    right: "right-full top-1/2 -translate-y-1/2 border-y-transparent border-r-4 border-y-4"
  };

  // 2. Adaptive Custom Hex Inline Style Mapper
  const getCustomArrowStyle = () => {
    if (isPreset) return {};
    const color = globalTheme.base;
    switch (direction) {
      case 'top': return { borderTopColor: color };
      case 'bottom': return { borderBottomColor: color };
      case 'left': return { borderLeftColor: color };
      case 'right': return { borderRightColor: color };
      default: return {};
    }
  };

  const inlineBgStyle = !isPreset ? { backgroundColor: globalTheme.base } : {};
  const presetBgClass = isPreset ? tailwindClasses.bg : 'bg-slate-900';

  return (
    <div 
      ref={containerRef}
      className="relative inline-block cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTriggerClick}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute text-center px-3 py-1.5 text-xs text-white rounded-md shadow-md z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 ${directionClasses[direction]} ${presetBgClass}`}
          style={inlineBgStyle}
        >
          <span className="font-medium">{content}</span>
          
          {/* Arrow Glyph Element */}
          <div 
            className={`absolute w-0 h-0 ${arrowClasses[direction]} ${isPreset ? 'text-current' : ''}`}
            style={getCustomArrowStyle()}
          />
        </div>
      )}
    </div>
  );
}