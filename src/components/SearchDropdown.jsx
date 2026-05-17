// src/components/SearchDropdown.jsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function SearchDropdown({ label, options = [], onSelect, multiple = false, placeholder = "Select or search option...", value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const dropdownRef = useRef(null);

  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'ghost');

  // Sync state values and input text values with incoming controlled props
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const parsedValues = Array.isArray(value) ? value : [value];
      setSelectedItems(parsedValues);
      
      // If single select mode, display the active selected item string inside the text input box
      if (!multiple) {
        setSearchQuery(parsedValues[0] || '');
      }
    } else {
      setSelectedItems([]);
      setSearchQuery('');
    }
  }, [value, multiple]);

  const filteredOptions = useMemo(() => {
    return options.filter(option => {
      const targetText = typeof option === 'string' ? option : (option.label || '');
      return targetText.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [options, searchQuery]);

  useEffect(() => {
    function clickOutsideHandler(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset query text to active item value string if closed out without selections
        if (!multiple && selectedItems.length > 0) {
          setSearchQuery(selectedItems[0]);
        } else if (!multiple) {
          setSearchQuery('');
        }
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [selectedItems, multiple]);

  const handleSelectOption = (option) => {
    const valueText = typeof option === 'string' ? option : (option.label || '');
    
    if (multiple) {
      let updatedSelections;
      if (selectedItems.includes(valueText)) {
        updatedSelections = selectedItems.filter(item => item !== valueText);
      } else {
        updatedSelections = [...selectedItems, valueText];
      }
      setSelectedItems(updatedSelections);
      setSearchQuery('');
      if (onSelect) onSelect(updatedSelections);
    } else {
      setSelectedItems([valueText]);
      setSearchQuery(valueText);
      if (onSelect) onSelect(option);
      setIsOpen(false);
    }
  };

  const removeChip = (itemToRemove) => {
    const updatedSelections = selectedItems.filter(item => item !== itemToRemove);
    setSelectedItems(updatedSelections);
    if (onSelect) onSelect(updatedSelections);
  };

  const customFocusStyle = !isPreset && isOpen
    ? { borderColor: globalTheme.base, boxShadow: `0 0 0 2px ${globalTheme.base}26` }
    : {};

  return (
    <div className="w-full relative flex flex-col gap-1.5 text-left" ref={dropdownRef}>
      {label && <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</label>}

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          placeholder={multiple && selectedItems.length > 0 ? `${selectedItems.length} options selected...` : placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-3.5 py-2 border border-gray-300 bg-white rounded-lg text-sm transition-all focus:outline-none placeholder:text-gray-400 pr-8 ${
            isOpen && isPreset ? `${tailwindClasses.border} ring-2 ${tailwindClasses.ring} ring-offset-1 border-transparent` : ''
          }`}
          style={customFocusStyle}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none select-none">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {/* {multiple && selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5 animate-in">
          {selectedItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md border ${
                isPreset ? `${tailwindClasses.bgLight} ${tailwindClasses.border} ${tailwindClasses.textDark}` : ''
              }`}
              style={!isPreset ? { backgroundColor: `${globalTheme.base}0d`, borderColor: `${globalTheme.base}40`, color: globalTheme.base } : {}}
            >
              <span>{item}</span>
              <button 
                type="button" 
                onClick={() => removeChip(item)}
                className="hover:opacity-60 font-bold ml-1 cursor-pointer focus:outline-none text-[14px] leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )} */}

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full max-h-56 rounded-lg bg-white shadow-xl border border-gray-100 z-50 overflow-y-auto animate-in divide-y divide-gray-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, idx) => {
              const displayLabel = option.label || option;
              const isSelected = selectedItems.includes(displayLabel);
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
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left px-4 py-2.5 text-sm text-gray-700 flex items-center justify-between transition-colors ${
                    isPreset && isHovered ? `bg-gray-50 ${tailwindClasses.text}` : ''
                  }`}
                  style={customHoverStyle}
                >
                  <span className={isSelected ? "font-semibold" : ""}>{displayLabel}</span>
                  {isSelected && (
                    <span className={`text-xs font-bold ${isPreset ? tailwindClasses.text : ''}`} style={!isPreset ? { color: globalTheme.base } : {}}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-xs text-gray-400 font-medium italic bg-gray-50/50">
              No matching records found
            </div>
          )}
        </div>
      )}
    </div>
  );
}