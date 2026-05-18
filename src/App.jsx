// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

// Context & Theme Strategy Architecture
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import SidebarNav from './components/SidebarNav';
import Button from './components/Button';
import Alert from './components/Alert';
import Dropdown from './components/Dropdown';
import Accordion from './components/Accordion';
import DataTable from './components/DataTable';
import ProgressLoader from './components/ProgressLoader';
import Input from './components/Input';
import SearchDropdown from './components/SearchDropdown';
import Tooltip from './components/Tooltip';
import FormRenderer from './components/FormRenderer';
import Modal from './components/Modal';
import Dialog from './components/Dialog';

// UI Elements Extension Pack
import ToggleButton from './components/ToggleButton';
import Breadcrumbs from './components/Breadcrumbs';
import Pagination from './components/Pagination';
import Stepper from './components/Stepper';
import Tabs from './components/Tabs';
import ContextMenu from './components/ContextMenu';
import DateTimePicker from './components/DateTimePicker';

// NEW COMPONENTS (v1.5 Pack Injections)
import Card from './components/Card';
import Toast from './components/Toast';
import Drawer from './components/Drawer';
import FileUploader from './components/FileUploader';

// ============================================================================
// 1. IMMUTABLE STATIC DATA SCHEMAS (DEFINED OUTSIDE RE-RENDER CORE LOOP)
// ============================================================================

const presetProfiles = {
  classicBlue: { name: "Classic Blue (Preset)", base: 'blue', success: 'emerald', error: 'rose', warning: 'amber', neutral: 'slate' },
  neonViolet: { name: "Neon Violet (Preset)", base: 'violet', success: 'emerald', error: 'rose', warning: 'amber', neutral: 'slate' }
};

const tableColumns = [
  { header: 'ID', accessor: 'id' }, 
  { header: 'Service Module', accessor: 'name' }, 
  { header: 'Priority Metric', accessor: 'rank' }
];

const tableData = [
  { id: '#409', name: 'Authentication Edge Pipeline', rank: 3 }, 
  { id: '#401', name: 'Context Native Routing Layer', rank: 1 }, 
  { id: '#405', name: 'Bulk Memory Cache Compactor', rank: 2 }
];

const accordionItems = [
  { title: 'How does interactive table sorting and data export work?', content: 'Clicking header cells triggers mathematical useMemo loops that sort datasets client-side cleanly.' }
];

const demoFormSchema = [
  { name: 'username', label: 'Service Account Name', type: 'text', required: true, placeholder: 'e.g. Jenkins-Agent' },
  { name: 'adminEmail', label: 'Primary Owner Email', type: 'text', required: true, pattern: '^\\S+@\\S+\\.\\S+$', errorMessage: 'Must be a valid email string.', placeholder: 'admin@system.io' }
];

// UPDATED: Dynamic status indicators mapped directly onto target component indexes
const sidebarNavLinks = [
  { label: "Theme Laboratory", id: "theme-lab", icon: "⚛️" },
  { label: "Toggle Buttons", id: "toggle", icon: "🎛️" },
  { label: "Breadcrumbs Path", id: "breadcrumbs", icon: "🗺️" },
  { label: "Pagination Bars", id: "pagination", icon: "🔢" },
  { label: "Workflow Steppers", id: "stepper", icon: "🪜" },
  { label: "Horizontal Tabs", id: "tabs", icon: "🔖" },
  { label: "ContextMenu (Locked)", id: "contextmenu", icon: "🔒", locked: true }, // LOCKED
  { label: "Date & Time Pickers", id: "datetime", icon: "📅" },
  { label: "Overlay Canvas", id: "overlays", icon: "💎" },
  { label: "Form Renderer (Locked)", id: "forms", icon: "🔒", locked: true },   // LOCKED
  { label: "Dropdowns & Selection", id: "dropdowns", icon: "🥞" },
  { label: "Tooltip Overlays", id: "tooltips", icon: "💬" },
  { label: "Base Field Inputs", id: "inputs", icon: "✏️" },
  { label: "Data Analytics Matrix", id: "datatable", icon: "📊" },
  { label: "Progress Feed Loaders", id: "loaders", icon: "⏳" },
  { label: "UI Button Elements", id: "buttons", icon: "🔘" },
  { label: "Global Notifications", id: "alerts", icon: "🚨" },
  { label: "Structured Cards", id: "cards", icon: "🎴" },
  { label: "Toast Banners (Locked)", id: "toasts", icon: "🔒", locked: true },    // LOCKED
  { label: "Side Drawers (Locked)", id: "drawers", icon: "🔒", locked: true },    // LOCKED
  { label: "File Uploaders (Locked)", id: "uploaders", icon: "🔒", locked: true } // LOCKED
];

// ============================================================================
// 2. REUSABLE ARCHITECTURAL SUB-COMPONENTS (VISUALIZERS & SHIELDS)
// ============================================================================

function LockedSectionPlaceholder({ title }) {
  return (
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-2 shadow-inner animate-in fade-in duration-200">
      <div className="w-10 h-10 bg-slate-100 border rounded-xl flex items-center justify-center text-sm shadow-xs select-none">🔒</div>
      <p className="text-xs font-black text-slate-700 uppercase tracking-wider mt-1">Enterprise Module Lock</p>
      <p className="text-[11px] text-slate-400 max-w-xs font-semibold leading-relaxed">
        This package feature is restricted under your current license profile parameters. Contact engineering support to request access tokens.
      </p>
    </div>
  );
}

function CodeViewer({ codeString }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const executeCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full mt-4 border-t border-slate-100 pt-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer select-none"
      >
        <span>{isOpen ? '🔽 Hide Implementation Code' : '👁️ Show Implementation Code'}</span>
      </button>

      {isOpen && (
        <div className="relative mt-3 rounded-xl bg-gray-950 p-4 font-mono text-xs text-gray-200 border border-gray-900 shadow-xl overflow-hidden animate-in fade-in zoom-in-98 duration-150">
          <div className="flex justify-between items-center pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] tracking-wider font-bold text-gray-600 uppercase">Dynamic Accessible React Code</span>
            <button
              type="button"
              onClick={executeCopy}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-all cursor-pointer ${
                copied ? 'bg-emerald-950 border-emerald-500/30 text-emerald-400' : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="overflow-x-auto leading-relaxed max-h-72 whitespace-pre text-gray-300">
            <code>{codeString.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. CENTRAL APPLICATION MOUNT WORKSPACE
// ============================================================================

export default function App() {
  const [activeProfileKey, setActiveProfileKey] = useState('classicBlue');
  const [userCustomTheme, setUserCustomTheme] = useState({
    base: '#6366F1', success: '#10B981', error: '#EF4444', warning: '#F59E0B', neutral: '#64748B'
  });

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('theme-lab');

  // Interactive Playground Props Registers
  const [toggleActive, setToggleActive] = useState(true);
  const [toggleDisabled, setToggleDisabled] = useState(false);
  const [breadcrumbSeparator, setBreadcrumbSeparator] = useState('→');
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationTotal, setPaginationTotal] = useState(5);
  const [stepperIndex, setStepperIndex] = useState(1);
  const [tabKey, setTabKey] = useState('alpha');
  const [pickedDateTime, setPickedDateTime] = useState('2026-05-17T14:30');
  const [dateTimeDisabled, setDateTimeDisabled] = useState(false);

  const [modalDismissOutside, setModalDismissOutside] = useState(true);
  const [modalDismissEscape, setModalDismissEscape] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formColumns, setFormColumns] = useState(2);
  const [dropdownMultiple, setDropdownMultiple] = useState(true);
  const [searchMultiple, setSearchMultiple] = useState(true);
  const [tooltipVariant, setTooltipVariant] = useState('info');
  const [tooltipDirection, setTooltipDirection] = useState('top');
  
  const [inputProps, setInputProps] = useState({ error: false, disabled: false });
  const [buttonProps, setButtonProps] = useState({ variant: 'solid', disabled: false });
  const [alertStatus, setAlertStatus] = useState('success');
  const [tableSelectable, setTableSelectable] = useState(true);
  const [demoProgress, setDemoProgress] = useState(65);

  // v1.5 Interactive Canvas States
  const [cardShowFooter, setCardShowFooter] = useState(true);

  // Auxiliary Selection Repositories
  const [currentTableSelection, setCurrentTableSelection] = useState([]);
  const [selectedClusters, setSelectedClusters] = useState(['AWS us-east-1 (N. Virginia)']);
  const [selectedRoles, setSelectedRoles] = useState(['DevOps-Engineer']);

  const activeThemeConfig = activeProfileKey === 'userCustom' 
    ? { name: "Your Custom Theme", ...userCustomTheme }
    : presetProfiles[activeProfileKey];

  const handleCustomColorChange = (key, hexValue) => {
    setUserCustomTheme(prev => ({ ...prev, [key]: hexValue }));
    setActiveProfileKey('userCustom');
  };

  const headerNavigationLinks = [
    { label: '📧 Contact Engineering Team', id: 'contact', onClick: () => setIsContactModalOpen(true) }
  ];

  // Dynamic calculation mapping hooks converting state values to text snippets
  const dynamicSnippets = {
    toggle: `<ToggleButton \n  id="secure-toggle"\n  label="Sync Pipeline Engine" \n  checked={${toggleActive}} \n  disabled={${toggleDisabled}} \n  onChange={setToggleActive} \n  role="switch"\n  aria-checked={${toggleActive}}\n/>`,
    breadcrumbs: `<Breadcrumbs items={crumbs} separator="${breadcrumbSeparator}" onCrumbClick={handleTruncate} role="navigation" />`,
    pagination: `<Pagination currentPage={${paginationPage}} totalPages={${paginationTotal}} onPageChange={setPaginationPage} />`,
    stepper: `<Stepper steps={steps} activeStep={${stepperIndex}} />`,
    tabs: `<Tabs tabs={tabs} activeTab="${tabKey}" onTabChange={setTabKey} role="tablist" />`,
    datetime: `<DateTimePicker label="Automated Run Trigger" value="${pickedDateTime}" disabled={${dateTimeDisabled}} onChange={setPickedDateTime} />`,
    overlays: `<Modal id="app-modal" isOpen={isModalOpen} closeOnOutsideClick={${modalDismissOutside}} closeOnEscape={${modalDismissEscape}} onClose={() => setIsModalOpen(false)} role="dialog" aria-modal="true" />`,
    dropdowns: `<SearchDropdown label="Deployment Clusters" multiple={${searchMultiple}} value={selectedClusters} />`,
    tooltip: `<Tooltip content="Overlay Label" variant="${tooltipVariant}" direction="${tooltipDirection}" id="tip-id">\n  <button aria-describedby="tip-id">Hover Target</button>\n</Tooltip>`,
    input: `<Input label="Asset Key" error={${inputProps.error}} disabled={${inputProps.disabled}} aria-invalid={${inputProps.error}} />`,
    datatable: `<DataTable title="Context Assignment Grid" selectable={${tableSelectable}} columns={columns} data={data} role="grid" />`,
    loaders: `<ProgressLoader variant="linear" value={${demoProgress}} role="progressbar" />`,
    button: `<Button variant="${buttonProps.variant}" disabled={${buttonProps.disabled}}>Execute Protocol</Button>`,
    alerts: `<Alert status="${alertStatus}" role="alert">Asynchronous sequence mapping transition captured.</Alert>`,
    cards: `<Card>\n  <Card.Header>\n    <h4 className="font-bold text-slate-800">Cluster Metrics Node</h4>\n  </Card.Header>\n  <Card.Body>\n    <p>Core node execution limits parsing parameters smoothly.</p>\n  </Card.Body>\n  ${cardShowFooter ? '<Card.Footer>\n    <button className="text-xs font-bold text-blue-600">Reboot Core</button>\n  </Card.Footer>' : ''}\n</Card>`
  };

  // Intersection Observer Scroll Spy Sync Effect
  useEffect(() => {
    const sectionIds = sidebarNavLinks.map(link => link.id);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null, rootMargin: '-120px 0px -65% 0px', threshold: 0
    });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider value={activeThemeConfig}>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 transition-colors duration-200 relative scroll-smooth">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] max-w-7xl h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl pointer-events-none select-none z-0" />
        
        <Navbar brandName="Infinite UI" links={headerNavigationLinks} activeView="docs" />

        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="flex gap-8 relative z-10">
            <SidebarNav links={sidebarNavLinks} activeSection={activeSection} onSectionClick={(id) => setActiveSection(id)} />

            <main className="flex-1 space-y-6 max-w-3xl">
              
              {/* LABORATORY */}
              <section id="theme-lab" className="scroll-mt-28 bg-white/85 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-md space-y-6">
                <div className="flex flex-col text-left gap-1">
                  <h3 className="font-bold text-slate-800 text-lg">Theme Engine Interactive Lab</h3>
                  <p className="text-xs text-slate-500">Modify design parameters below to watch structural component tokens transform live across the environment workspace.</p>
                </div>
                <div className="flex flex-wrap gap-2 border-b pb-4 border-slate-100">
                  {Object.keys(presetProfiles).map((key) => (
                    <button type="button" key={key} onClick={() => setActiveProfileKey(key)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${activeProfileKey === key ? 'bg-slate-900 text-white border-transparent shadow-sm' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}>{presetProfiles[key].name}</button>
                  ))}
                  <button type="button" onClick={() => setActiveProfileKey('userCustom')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${activeProfileKey === 'userCustom' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-md' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}>✨ Active Live Custom Theme</button>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(userCustomTheme).map((colorKey) => (
                      <div key={colorKey} className="flex flex-col gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-sm">
                        <label className="text-[11px] font-bold capitalize text-slate-600 text-left">{colorKey}</label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={userCustomTheme[colorKey]} onChange={(e) => handleCustomColorChange(colorKey, e.target.value)} className="w-8 h-8 rounded border border-slate-300 cursor-pointer overflow-hidden p-0" />
                          <span className="text-[10px] font-mono font-bold text-slate-400">{userCustomTheme[colorKey]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TOGGLE BUTTON */}
              <section id="toggle" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Toggle Button Switch Component</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={toggleActive} onChange={(e) => setToggleActive(e.target.checked)} className="rounded border-slate-300" /><span>checked={toggleActive.toString()}</span></label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={toggleDisabled} onChange={(e) => setToggleDisabled(e.target.checked)} className="rounded border-slate-300" /><span>disabled={toggleDisabled.toString()}</span></label>
                </div>
                <div className="flex justify-center p-6 bg-slate-50/50 rounded-xl border border-dashed">
                  <ToggleButton id="secure-toggle-switch" label="Synchronize Remote Node Registry Channels" checked={toggleActive} disabled={toggleDisabled} onChange={setToggleActive} />
                </div>
                <CodeViewer codeString={dynamicSnippets.toggle} />
              </section>

              {/* BREADCRUMBS */}
              <section id="breadcrumbs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Breadcrumbs Path Navigation</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap items-center gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-2">
                    <span>separator =</span>
                    <select value={breadcrumbSeparator} onChange={(e) => setBreadcrumbSeparator(e.target.value)} className="bg-white border rounded px-2 py-1 text-xs outline-none">
                      <option value="→">"→"</option>
                      <option value="/">"/"</option>
                      <option value="::">"::"</option>
                    </select>
                  </label>
                </div>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed flex justify-center">
                  <Breadcrumbs items={[{ label: 'Dashboard' }, { label: 'Cluster Allocations' }, { label: 'Profile Metrics' }]} separator={breadcrumbSeparator} onCrumbClick={(item) => alert(`Crumb: ${item.label}`)} />
                </div>
                <CodeViewer codeString={dynamicSnippets.breadcrumbs} />
              </section>

              {/* PAGINATION */}
              <section id="pagination" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Data Index Pagination</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap items-center gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5"><span>currentPage = {paginationPage}</span></label>
                  <label className="flex items-center gap-2">
                    <span>totalPages =</span>
                    <input type="number" min="1" max="20" value={paginationTotal} onChange={(e) => setPaginationTotal(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 bg-white border rounded px-1.5 py-0.5 text-center outline-none" />
                  </label>
                </div>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed">
                  <Pagination currentPage={paginationPage} totalPages={paginationTotal} onPageChange={setPaginationPage} />
                </div>
                <CodeViewer codeString={dynamicSnippets.pagination} />
              </section>

              {/* STEPPER */}
              <section id="stepper" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Linear Workflow Stepper Progress Panel</h3>
                <div className="bg-slate-50 p-3 rounded-lg border flex flex-wrap gap-3 text-xs font-bold justify-center mb-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider self-center text-left flex-1 md:flex-none">State Knobs:</span>
                  <Button variant="outline" onClick={() => setStepperIndex(prev => Math.max(0, prev - 1))}>Decrement Back</Button>
                  <Button variant="solid" onClick={() => setStepperIndex(prev => Math.min(2, prev + 1))}>Increment Next Step</Button>
                </div>
                <div className="p-8 bg-slate-50/50 rounded-xl border border-dashed pt-4 pb-12">
                  <Stepper steps={[{ label: 'Compilation Build' }, { label: 'Integration Tests' }, { label: 'Production Push' }]} activeStep={stepperIndex} />
                </div>
                <CodeViewer codeString={dynamicSnippets.stepper} />
              </section>

              {/* TABS */}
              <section id="tabs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Segmented Horizontal Active View Tabs</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex gap-2 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">State:</span>
                  <span className="font-mono">activeTab = "{tabKey}"</span>
                </div>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed space-y-4">
                  <Tabs tabs={[{ label: 'Alpha Target Core', key: 'alpha' }, { label: 'Beta Mirror Shards', key: 'beta' }]} activeTab={tabKey} onTabChange={setTabKey} />
                </div>
                <CodeViewer codeString={dynamicSnippets.tabs} />
              </section>

              {/* CONTEXT MENU (LOCKED) */}
              <section id="contextmenu" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-400 border-b pb-2 text-left">Mouse Capture ContextMenu</h3>
                <LockedSectionPlaceholder />
              </section>

              {/* DATE PICKERS */}
              <section id="datetime" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Unified Scheduling Date & Time Picker</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={dateTimeDisabled} onChange={(e) => setDateTimeDisabled(e.target.checked)} className="rounded border-slate-300" /><span>disabled={dateTimeDisabled.toString()}</span></label>
                </div>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed max-w-sm mx-auto">
                  <DateTimePicker label="Automated Pipeline Run Frame Trigger" value={pickedDateTime} disabled={dateTimeDisabled} onChange={setPickedDateTime} />
                </div>
                <CodeViewer codeString={dynamicSnippets.datetime} />
              </section>

              {/* OVERLAYS */}
              <section id="overlays" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Overlay Layers (Modal / Dialog Canvas)</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={modalDismissOutside} onChange={(e) => setModalDismissOutside(e.target.checked)} className="rounded border-slate-300" /><span>closeOnOutsideClick={modalDismissOutside.toString()}</span></label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={modalDismissEscape} onChange={(e) => setModalDismissEscape(e.target.checked)} className="rounded border-slate-300" /><span>closeOnEscape={modalDismissEscape.toString()}</span></label>
                </div>
                <div className="flex flex-wrap justify-center gap-4 py-4 bg-slate-50/40 border border-dashed rounded-xl">
                  <Button variant="solid" onClick={() => setIsModalOpen(true)}>✨ Open Standard Modal Sheet</Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(true)}>🔒 Intercept Action Dialog</Button>
                </div>
                <Modal id="laboratory-modal" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Operational Core Status" closeOnOutsideClick={modalDismissOutside} closeOnEscape={modalDismissEscape} footer={<Button variant="outline" onClick={() => setIsModalOpen(false)}>Dismiss View</Button>}><p className="text-xs text-slate-500 text-left">Active data logs layers processing parameters cleanly.</p></Modal>
                <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Purge Volatiles?" description="This completely wipes staging cache nodes immediately." confirmLabel="Execute Purge" cancelLabel="Abort" closeOnOutsideClick={modalDismissOutside} closeOnEscape={modalDismissEscape} onConfirm={() => alert('Purged.')} />
                <CodeViewer codeString={dynamicSnippets.overlays} />
              </section>

              {/* FORM RENDERER (LOCKED) */}
              <section id="forms" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-400 border-b pb-2 text-left">Schema-Driven Form Renderer</h3>
                <LockedSectionPlaceholder />
              </section>

              {/* DROPDOWNS */}
              <section id="dropdowns" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Dropdowns & Selections Playground</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={searchMultiple} onChange={(e) => setSearchMultiple(e.target.checked)} className="rounded border-slate-300" /><span>SearchDropdown multiple={searchMultiple.toString()}</span></label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={dropdownMultiple} onChange={(e) => setDropdownMultiple(e.target.checked)} className="rounded border-slate-300" /><span>Dropdown multiple={dropdownMultiple.toString()}</span></label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <SearchDropdown label="Target Deployment Cluster" options={['AWS us-east-1 (N. Virginia)', 'GCP europe-west1 (Belgium)']} multiple={searchMultiple} value={selectedClusters} onSelect={(val) => setSelectedClusters(Array.isArray(val) ? val : [val])} />
                  <Dropdown label="Assign IAM Security Roles" options={['Admin-Root-Access', 'DevOps-Engineer']} multiple={dropdownMultiple} value={selectedRoles} onSelect={(val) => setSelectedRoles(Array.isArray(val) ? val : [val])} />
                </div>
                <CodeViewer codeString={dynamicSnippets.dropdowns} />
              </section>

              {/* TOOLTIPS */}
              <section id="tooltips" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Tooltip Overlay Layer</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs grid grid-cols-1 md:grid-cols-2 gap-3 text-left font-medium text-slate-600">
                  <label className="flex items-center gap-2">
                    <span>direction =</span>
                    <select value={tooltipDirection} onChange={(e) => setTooltipDirection(e.target.value)} className="bg-white border rounded px-1.5 py-0.5 outline-none text-xs">
                      <option value="top">"top"</option>
                      <option value="bottom">"bottom"</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    <span>variant =</span>
                    <select value={tooltipVariant} onChange={(e) => setTooltipVariant(e.target.value)} className="bg-white border rounded px-1.5 py-0.5 outline-none text-xs">
                      <option value="info">"info"</option>
                      <option value="success">"success"</option>
                    </select>
                  </label>
                </div>
                <div className="flex justify-center p-12 bg-slate-50/40 border border-dashed rounded-xl my-4">
                  <Tooltip content="Overlay label framework token mapping vector" variant={tooltipVariant} direction={tooltipDirection}>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-sm hover:border-slate-300 transition-all select-none">
                      <span>🎯 Position Check Anchor</span>
                    </div>
                  </Tooltip>
                </div>
                <CodeViewer codeString={dynamicSnippets.tooltip} />
              </section>

              {/* INPUTS */}
              <section id="inputs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Base Data Field Inputs</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={inputProps.error} onChange={(e) => setInputProps(prev => ({ ...prev, error: e.target.checked }))} className="rounded border-slate-300" /><span>error={inputProps.error.toString()}</span></label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={inputProps.disabled} onChange={(e) => setInputProps(prev => ({ ...prev, disabled: e.target.checked }))} className="rounded border-slate-300" /><span>disabled={inputProps.disabled.toString()}</span></label>
                </div>
                <div className="max-w-md py-2 text-left mx-auto">
                  <Input label="Playground Asset Key Input" placeholder="Enter alphanumeric token..." error={inputProps.error} disabled={inputProps.disabled} errorMessage="Validation threshold constraint failure." />
                </div>
                <CodeViewer codeString={dynamicSnippets.input} />
              </section>

              {/* DATATABLE */}
              <section id="datatable" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Data Analytics Matrix</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={tableSelectable} onChange={(e) => setTableSelectable(e.target.checked)} className="rounded border-slate-300" /><span>selectable={tableSelectable.toString()}</span></label>
                </div>
                <div className="space-y-4 text-left">
                  <Accordion items={accordionItems} />
                  <DataTable title="Microfrontend Context Allocation Matrix" columns={tableColumns} data={tableData} selectable={tableSelectable} onSelectionChange={(rows) => setCurrentTableSelection(rows)} />
                </div>
                <CodeViewer codeString={dynamicSnippets.datatable} />
              </section>

              {/* LOADERS */}
              <section id="loaders" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Async Progress Feed Loaders</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap items-center gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-2 flex-1 max-w-xs">
                    <span>value = {demoProgress}%</span>
                    <input type="range" min="0" max="100" value={demoProgress} onChange={(e) => setDemoProgress(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer appearance-none" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-5">
                    <div className="flex justify-center"><ProgressLoader variant="circular" /></div>
                    <ProgressLoader variant="linear" value={demoProgress} />
                  </div>
                  <ProgressLoader variant="suspense" />
                </div>
                <CodeViewer codeString={dynamicSnippets.loaders} />
              </section>

              {/* BUTTONS */}
              <section id="buttons" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Core UI Button Elements Workspace</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs grid grid-cols-1 md:grid-cols-2 gap-3 text-left font-medium text-slate-600">
                  <label className="flex items-center gap-2">
                    <span>variant =</span>
                    <select value={buttonProps.variant} onChange={(e) => setButtonProps(prev => ({ ...prev, variant: e.target.value }))} className="bg-white border rounded px-1.5 py-0.5 text-xs font-bold outline-none">
                      <option value="solid">"solid"</option>
                      <option value="outline">"outline"</option>
                      <option value="ghost">"ghost"</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={buttonProps.disabled} onChange={(e) => setButtonProps(prev => ({ ...prev, disabled: e.target.checked }))} className="rounded border-slate-300" /><span>disabled={buttonProps.disabled.toString()}</span></label>
                </div>
                <div className="flex justify-center p-4">
                  <Button variant={buttonProps.variant} disabled={buttonProps.disabled}>Playground Action</Button>
                </div>
                <CodeViewer codeString={dynamicSnippets.button} />
              </section>

              {/* ALERTS */}
              <section id="alerts" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 border-b pb-2 text-left">Global Notification Feeds Playground</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex flex-wrap items-center gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-2">
                    <span>status =</span>
                    <select value={alertStatus} onChange={(e) => setAlertStatus(e.target.value)} className="bg-white border rounded px-1.5 py-0.5 outline-none text-xs font-bold">
                      <option value="success">"success"</option>
                      <option value="info">"info"</option>
                      <option value="warning">"warning"</option>
                    </select>
                  </label>
                </div>
                <div className="py-2 text-left">
                  <Alert status={alertStatus} title="System Broadcast Runtime Channel Notification">
                    The underlying container agent has intercepted a microfrontend asynchronous signal state modification transition.
                  </Alert>
                </div>
                <CodeViewer codeString={dynamicSnippets.alerts} />
              </section>

              {/* CARDS FRAMEWORK */}
              <section id="cards" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Structured Card Layout Compound Blocks</h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-xs flex gap-4 text-left font-medium text-slate-600">
                  <span className="font-bold text-slate-400 uppercase tracking-wider pr-2">Props:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none"><input type="checkbox" checked={cardShowFooter} onChange={(e) => setCardShowFooter(e.target.checked)} className="rounded border-slate-300" /><span>render Card.Footer={cardShowFooter.toString()}</span></label>
                </div>
                <div className="py-4 px-12 bg-slate-50/50 rounded-xl border border-dashed max-w-sm mx-auto">
                  <Card>
                    <Card.Header><span className="font-black text-slate-700 text-xs tracking-tight">Active Cluster Metric Node</span></Card.Header>
                    <Card.Body><p className="text-slate-500">Core execution profiles are streaming allocation variables downwards cleanly.</p></Card.Body>
                    {cardShowFooter && <Card.Footer><Button variant="outline">Initialize Hot Reboots</Button></Card.Footer>}
                  </Card>
                </div>
                <CodeViewer codeString={dynamicSnippets.cards} />
              </section>

              {/* TOAST SYSTEM (LOCKED) */}
              <section id="toasts" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-400 border-b pb-2 text-left">Toast Event Banners</h3>
                <LockedSectionPlaceholder />
              </section>

              {/* DRAWERS PANEL (LOCKED) */}
              <section id="drawers" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-400 border-b pb-2 text-left">Sliding Sidebar Drawers</h3>
                <LockedSectionPlaceholder />
              </section>

              {/* FILE UPLOADER (LOCKED) */}
              <section id="uploaders" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-400 border-b pb-2 text-left">Drag & Drop Binary Uploaders</h3>
                <LockedSectionPlaceholder />
              </section>

            </main>
          </div>
        </div>

        {/* CONTACT MODAL */}
        <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact Engineering Team">
          <div className="space-y-4 text-left py-1">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Have questions about integrating components or managing context models? Reach out directly.</p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-1.5 shadow-inner">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Support Mailbox</span>
              <a href="mailto:support@infiniteui.io" className="text-sm font-black text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer select-all">support@infiniteui.io</a>
              <span className="text-[10px] font-semibold text-slate-400 mt-1">⏱️ Response SLA: Under 24 operational hours</span>
            </div>
            <div className="pt-2 flex justify-end"><Button variant="outline" onClick={() => setIsContactModalOpen(false)}>Dismiss Window</Button></div>
          </div>
        </Modal>

      </div>
    </ThemeProvider>
  );
}