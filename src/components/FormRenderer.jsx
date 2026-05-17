// src/components/FormRenderer.jsx
import React, { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import SearchDropdown from './SearchDropdown';
import Button from './Button';

export default function FormRenderer({ 
  schema = [], 
  onSubmit, 
  columns = 1, 
  submitLabel = "Submit",
  defaultValues = {} 
}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  // Unified state updater
  const handleChange = (name, val) => {
    setValues(prev => ({ ...prev, [name]: val }));
    // Clear error for this specific field dynamically on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validation Engine
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    schema.forEach(field => {
      const val = values[field.name];
      
      // Check Required logic (handles undefined, null, empty strings, and empty arrays)
      if (field.required && (!val || (Array.isArray(val) && val.length === 0))) {
        newErrors[field.name] = field.errorMessage || 'This field is required.';
        isValid = false;
      } 
      // Check Regex Patterns
      else if (val && field.pattern && !new RegExp(field.pattern).test(val)) {
        newErrors[field.name] = field.errorMessage || 'Invalid format.';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(values);
    }
  };

  // Safely map numbered columns to responsive Tailwind Grid classes
  const gridLayouts = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-4'
  };
  const activeGridClass = gridLayouts[columns] || gridLayouts[1];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className={`grid ${activeGridClass} gap-5 items-start`}>
        {schema.map((field) => {
          const errorMsg = errors[field.name];
          const hasError = !!errorMsg;
          
          // Allow specific fields to span the entire width of the form layout
          const spanClass = field.fullWidth ? 'md:col-span-full' : '';

          if (field.type === 'select') {
            return (
              <div key={field.name} className={`flex flex-col gap-1 ${spanClass}`}>
                <Dropdown
                  label={field.label}
                  options={field.options}
                  multiple={field.multiple}
                  value={values[field.name]}
                  onSelect={(val) => handleChange(field.name, val)}
                  defaultLabel={field.placeholder || "Select option"}
                />
                {hasError && <span className="text-xs text-rose-500 font-semibold animate-in">{errorMsg}</span>}
              </div>
            );
          }

          if (field.type === 'search') {
            return (
              <div key={field.name} className={`flex flex-col gap-1 ${spanClass}`}>
                <SearchDropdown
                  label={field.label}
                  options={field.options}
                  multiple={field.multiple}
                  value={values[field.name]}
                  onSelect={(val) => handleChange(field.name, val)}
                  placeholder={field.placeholder}
                />
                {hasError && <span className="text-xs text-rose-500 font-semibold animate-in">{errorMsg}</span>}
              </div>
            );
          }

          // Default fallback acts as standard Input (text, email, password, etc)
          return (
            <div key={field.name} className={spanClass}>
              <Input
                type={field.type || 'text'}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                error={hasError}
                errorMessage={errorMsg}
                disabled={field.disabled}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <Button type="submit" variant="solid">{submitLabel}</Button>
      </div>
    </form>
  );
}