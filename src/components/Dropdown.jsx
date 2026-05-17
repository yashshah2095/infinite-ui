// src/components/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function Dropdown({ label, options = [], onSelect, multiple = false, defaultLabel = "Select Option", value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const dropdownRef = useRef(null);

  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  // Sync internal state with external incoming value prop
  useEffect(() => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        setSelectedItems(value);
      } else {
        setSelectedItems([value]);
      }
    } else {
      setSelectedItems([]);
    }
  }, [value]);

  // Dismiss on outside clicks
  useEffect(() => {
    function clickOutsideHandler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, []);

  const handleSelect = (option) => {
    const valueText = typeof option === 'string' ? option : (option.label || option);
    
    if (multiple) {
      let updatedSelections;
      if (selectedItems.includes(valueText)) {
        updatedSelections = selectedItems.filter(item => item !== valueText);
      } else {
        updatedSelections = [...selectedItems, valueText];
      }
      setSelectedItems(updatedSelections);
      if (onSelect) onSelect(updatedSelections);
    } else {
      setSelectedItems([valueText]);
      if (onSelect) onSelect(option);
      setIsOpen(false);
    }
  };

  const buttonDisplayLabel = multiple 
    ? selectedItems.length > 0 
      ? `${selectedItems.length} selected` 
      : defaultLabel
    : selectedItems[0] || defaultLabel;

  return (
    <div className="relative inline-block text-left flex flex-col gap-1.5" ref={dropdownRef}>
      {label && <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border rounded-lg bg-white shadow-sm flex items-center justify-between gap-4 text-sm font-medium hover:bg-gray-50 border-gray-300 transition-colors cursor-pointer min-w-[160px]"
      >
        <span>{buttonDisplayLabel}</span>
        <span className="text-xs text-gray-400">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-48 rounded-lg bg-white shadow-lg border z-50 overflow-hidden animate-in divide-y divide-gray-50">
          {options.map((opt, idx) => {
            const itemText = typeof opt === 'string' ? opt : (opt.label || opt);
            const isSelected = selectedItems.includes(itemText);
            const isHovered = hoveredIdx === idx;

            const customHoverStyle = !isPreset && isHovered 
              ? { color: globalTheme.base, backgroundColor: `${globalTheme.base}0d` } 
              : {};

            return (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-4 py-2.5 text-sm text-gray-700 flex items-center justify-between transition-colors ${
                  isPreset && isHovered ? `bg-gray-50 ${tailwindClasses.text}` : ''
                }`}
                style={customHoverStyle}
              >
                <span className={isSelected ? "font-semibold" : ""}>{itemText}</span>
                {isSelected && (
                  <span className={`text-xs font-bold ${isPreset ? tailwindClasses.text : ''}`} style={!isPreset ? { color: globalTheme.base } : {}}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}