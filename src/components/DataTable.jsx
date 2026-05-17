// src/components/DataTable.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { resolveTheme } from './themeEngine';

export default function DataTable({ columns = [], data = [], title = "Data Repository", onSelectionChange, selectable = true }) {
  const globalTheme = useTheme();
  const { isPreset, tailwindClasses } = resolveTheme(globalTheme.base, 'outline');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());

  // Wipe selections cleanly if the parent kills selectability at runtime
  useEffect(() => {
    if (!selectable) {
      setSelectedRowIds(new Set());
      if (onSelectionChange) onSelectionChange([]);
    }
  }, [selectable]);

  // 1. Sorting Processing Logic Loop
  const processedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (accessor) => {
    let direction = 'asc';
    if (sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: accessor, direction });
  };

  // 2. Selection Mechanics with Parent Callback Emitters
  const handleSelectAll = (e) => {
    if (!selectable) return;
    let nextSelections = new Set();
    if (e.target.checked) {
      nextSelections = new Set(processedData.map((row, idx) => row.id || idx));
    }
    setSelectedRowIds(nextSelections);
    
    if (onSelectionChange) {
      const selectedRows = processedData.filter((row, idx) => nextSelections.has(row.id || idx));
      onSelectionChange(selectedRows);
    }
  };

  const handleSelectRow = (rowId) => {
    if (!selectable) return;
    const nextSelections = new Set(selectedRowIds);
    if (nextSelections.has(rowId)) {
      nextSelections.delete(rowId);
    } else {
      nextSelections.add(rowId);
    }
    setSelectedRowIds(nextSelections);
    
    if (onSelectionChange) {
      const selectedRows = processedData.filter((row, idx) => nextSelections.has(row.id || idx));
      onSelectionChange(selectedRows);
    }
  };

  const isAllSelected = processedData.length > 0 && selectedRowIds.size === processedData.length;
  const hasSelections = selectable && selectedRowIds.size > 0;

  // 3. Blob-driven CSV Builder Engine
  const downloadCSV = () => {
    const targetRows = hasSelections 
      ? processedData.filter((row, idx) => selectedRowIds.has(row.id || idx))
      : processedData;

    const csvHeaders = columns.map(col => `"${col.header}"`).join(',');
    const csvRows = targetRows.map(row => 
      columns.map(col => `"${String(row[col.accessor] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    
    const csvStringContent = [csvHeaders, ...csvRows].join('\n');
    const dataBlob = new Blob([csvStringContent], { type: 'text/csv;charset=utf-8;' });
    const blobBlobUrl = URL.createObjectURL(dataBlob);
    
    const virtualLink = document.createElement("a");
    virtualLink.setAttribute("href", blobBlobUrl);
    virtualLink.setAttribute("download", `export_${Date.now()}.csv`);
    document.body.appendChild(virtualLink);
    virtualLink.click();
    document.body.removeChild(virtualLink);
    URL.revokeObjectURL(blobBlobUrl);
  };

  const accentTextStyle = !isPreset ? { color: globalTheme.base } : {};
  const transparentBgStyle = !isPreset ? { backgroundColor: `${globalTheme.base}0d` } : {};

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
      
      {/* TOOLBAR */}
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-col text-left">
          <span className="font-bold text-gray-800 text-sm">{title}</span>
          {hasSelections && (
            <span className="text-xs text-gray-400 font-medium mt-0.5 animate-in">
              Selected <span className={`font-bold ${isPreset ? tailwindClasses.text : ''}`} style={accentTextStyle}>{selectedRowIds.size}</span> items
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={downloadCSV}
          className={`px-3 py-1.5 text-xs font-bold rounded-md border flex items-center gap-1.5 transition-all cursor-pointer ${
            isPreset 
              ? `${tailwindClasses.border} ${tailwindClasses.text} ${tailwindClasses.bgLight} hover:bg-white` 
              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
          }`}
          style={!isPreset ? { borderColor: globalTheme.base, color: globalTheme.base } : {}}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {hasSelections ? 'Export Selection (CSV)' : 'Export Full CSV'}
        </button>
      </div>

      {/* VIEWPORT FRAME */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={isPreset ? tailwindClasses.bgLight : ''} style={transparentBgStyle}>
            <tr className="border-b border-gray-200">
              {/* Optional Checkbox Header Segment */}
              {selectable && (
                <th className="px-5 py-3.5 w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 cursor-pointer focus:ring-0"
                  />
                </th>
              )}
              {columns.map((col, idx) => {
                const isSortingThis = sortConfig.key === col.accessor;
                return (
                  <th 
                    key={idx}
                    onClick={() => handleSort(col.accessor)}
                    className={`px-6 py-3.5 font-bold text-xs uppercase tracking-wider select-none cursor-pointer hover:bg-gray-900/5 transition-colors ${
                      isPreset ? tailwindClasses.textDark : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{col.header}</span>
                      <span className="text-[10px] opacity-40 font-mono">
                        {isSortingThis ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {processedData.map((row, rIdx) => {
              const rowIdentifier = row.id || rIdx;
              const isRowChecked = selectable && selectedRowIds.has(rowIdentifier);

              return (
                <tr 
                  key={rowIdentifier} 
                  className={`transition-colors ${isRowChecked ? (isPreset ? tailwindClasses.bgLight : '') : 'hover:bg-gray-50/50'}`}
                  style={isRowChecked ? transparentBgStyle : {}}
                >
                  {/* Optional Checkbox Cell Segment */}
                  {selectable && (
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={isRowChecked}
                        onChange={() => handleSelectRow(rowIdentifier)}
                        className="rounded border-gray-300 cursor-pointer focus:ring-0"
                  />
                    </td>
                  )}
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="px-6 py-4 text-gray-600 font-medium">
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}