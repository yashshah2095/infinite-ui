// src/index.js
import './index.css';
// FIXED: Export the named layout tokens instead of hunting for a default export
export { ThemeProvider, useTheme } from './components/ThemeContext';

// The rest of your component default exports remain exactly the same:
export { default as SidebarNav } from './components/SidebarNav';
export { default as Button } from './components/Button';
export { default as Alert } from './components/Alert';
export { default as Dropdown } from './components/Dropdown';
export { default as Accordion } from './components/Accordion';
export { default as DataTable } from './components/DataTable';
export { default as ProgressLoader } from './components/ProgressLoader';
export { default as Input } from './components/Input';
export { default as SearchDropdown } from './components/SearchDropdown';
export { default as Tooltip } from './components/Tooltip';
// export { default as FormRenderer } from './components/FormRenderer';
export { default as Modal } from './components/Modal';
export { default as Dialog } from './components/Dialog';
export { default as ToggleButton } from './components/ToggleButton';
export { default as Breadcrumbs } from './components/Breadcrumbs';
export { default as Pagination } from './components/Pagination';
export { default as Stepper } from './components/Stepper';
export { default as Tabs } from './components/Tabs';
// export { default as ContextMenu } from './components/ContextMenu';
export { default as DateTimePicker } from './components/DateTimePicker';
export { default as Card } from './components/Card';
// export { default as Toast } from './components/Toast';
// export { default as Drawer } from './components/Drawer';
// export { default as FileUploader } from './components/FileUploader';