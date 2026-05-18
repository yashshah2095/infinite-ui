// src/components/Card.jsx
import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return (
    <div className={`p-5 text-xs text-slate-500 leading-relaxed flex-1 ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};