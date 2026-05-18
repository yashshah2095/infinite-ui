// src/components/FileUploader.jsx
import React, { useState, useRef } from 'react';

export default function FileUploader({ label, onFileSelect, accept = "*", maxBytes = 5242880 }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;
    if (file.size > maxBytes) {
      alert(`Asset rejection: Over payload size limit (${(maxBytes / 1024 / 1024).toFixed(0)}MB maximum).`);
      return;
    }
    setFileName(file.name);
    if (onFileSelect) onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{label}</span>}
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current.click(); }}
        role="button"
        tabIndex={0}
        aria-label="Upload configuration registry asset file"
        className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all outline-none focus:ring-2 focus:ring-slate-100 ${
          isDragActive 
            ? 'border-slate-900 bg-slate-50/80 shadow-inner' 
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => e.target.files && processFile(e.target.files[0])}
        />
        
        <span className="text-xl">📁</span>
        <div className="text-center">
          <p className="text-xs font-bold text-slate-700">
            {fileName ? `✓ Selected: ${fileName}` : 'Drag & Drop files here'}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
            {fileName ? 'Click frame to replace asset file' : `or click to browse local devices (Max ${(maxBytes / 1024 / 1024).toFixed(0)}MB)`}
          </p>
        </div>
      </div>
    </div>
  );
}