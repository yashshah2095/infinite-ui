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

// ============================================================================
// 1. IMMUTABLE STATIC DATA SCHEMAS & PRESETS (DEFINED OUTSIDE CORE SCOPE)
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

const sandboxNavbarLinks = [
  { label: 'Status Feeds', href: '#' }, 
  { label: 'Cluster Metrics', href: '#' }
];

const demoFormSchema = [
  { name: 'username', label: 'Service Account Name', type: 'text', required: true, placeholder: 'e.g. Jenkins-Agent' },
  { name: 'adminEmail', label: 'Primary Owner Email', type: 'text', required: true, pattern: '^\\S+@\\S+\\.\\S+$', errorMessage: 'Must be a valid email string.', placeholder: 'admin@system.io' }
];

const sidebarNavLinks = [
  { label: "Theme Laboratory", id: "theme-lab", icon: "⚛️" },
  { label: "Toggle Buttons", id: "toggle", icon: "🎛️" },
  { label: "Breadcrumbs Path", id: "breadcrumbs", icon: "🗺️" },
  { label: "Pagination Bars", id: "pagination", icon: "🔢" },
  { label: "Workflow Steppers", id: "stepper", icon: "🪜" },
  { label: "Horizontal Tabs", id: "tabs", icon: "🔖" },
  { label: "ContextMenu Anchor", id: "contextmenu", icon: "🖱️" },
  { label: "Date & Time Pickers", id: "datetime", icon: "📅" },
  { label: "Top Navigation", id: "topnav", icon: "🪟" },
  { label: "Overlay Canvas", id: "overlays", icon: "💎" },
  { label: "Dynamic Form Renderer", id: "forms", icon: "📝" },
  { label: "Dropdowns & Selection", id: "dropdowns", icon: "🥞" },
  { label: "Tooltip Overlays", id: "tooltips", icon: "💬" },
  { label: "Base Field Inputs", id: "inputs", icon: "✏️" },
  { label: "Data Analytics Matrix", id: "datatable", icon: "📊" },
  { label: "Progress Feed Loaders", id: "loaders", icon: "⏳" }
];

// --- INTERACTIVE DOCUMENTATION SNIPPET COMPONENT ---
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
        <div className="relative mt-3 rounded-xl bg-gray-950 p-4 font-mono text-xs text-gray-200 border border-gray-900 shadow-xl overflow-hidden animate-in mercantile-fade duration-150">
          <div className="flex justify-between items-center pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] tracking-wider font-bold text-gray-600 uppercase">Dynamic React Code</span>
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
// 2. MASTER APPLICATION CONTAINER ASSEMBLY
// ============================================================================

export default function App() {
  const [activeProfileKey, setActiveProfileKey] = useState('classicBlue');
  const [userCustomTheme, setUserCustomTheme] = useState({
    base: '#6366F1', success: '#10B981', error: '#EF4444', warning: '#F59E0B', neutral: '#64748B'
  });

  // Structural Pop-up Overlay State Hooks
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('theme-lab');

  // Interactive Primitive Component States
  const [toggleActive, setToggleActive] = useState(true);
  const [paginationPage, setPaginationPage] = useState(1);
  const [stepperIndex, setStepperIndex] = useState(1);
  const [tabKey, setTabKey] = useState('alpha');
  const [pickedDateTime, setPickedDateTime] = useState('2026-05-17T14:30');

  const [dropdownMultiple, setDropdownMultiple] = useState(true);
  const [searchMultiple, setSearchMultiple] = useState(true);
  const [inputProps, setInputProps] = useState({ error: false, disabled: false });
  const [buttonProps, setButtonProps] = useState({ variant: 'solid', disabled: false });
  const [alertStatus, setAlertStatus] = useState('success');
  const [tableSelectable, setTableSelectable] = useState(true);
  const [tooltipVariant, setTooltipVariant] = useState('info');
  const [tooltipDirection, setTooltipDirection] = useState('top');
  const [formColumns, setFormColumns] = useState(2);
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarRounded, setNavbarRounded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [demoProgress, setDemoProgress] = useState(65);
  const [currentTableSelection, setCurrentTableSelection] = useState([]);
  const [selectedClusters, setSelectedClusters] = useState(['AWS us-east-1 (N. Virginia)']);
  const [selectedRoles, setSelectedRoles] = useState(['DevOps-Engineer']);
  const [submittedFormData, setSubmittedFormData] = useState(null);

  const activeThemeConfig = activeProfileKey === 'userCustom' 
    ? { name: "Your Custom Theme", ...userCustomTheme }
    : presetProfiles[activeProfileKey];

  const handleCustomColorChange = (key, hexValue) => {
    setUserCustomTheme(prev => ({ ...prev, [key]: hexValue }));
    setActiveProfileKey('userCustom');
  };

  const headerNavigationLinks = [
    { label: '📚 Core Documentation Hub', id: 'docs', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: '📧 Contact Engineering Team', id: 'contact', onClick: () => setIsContactModalOpen(true) }
  ];

  const dynamicSnippets = {
    toggle: `<ToggleButton label="Sync Engine" checked={${toggleActive}} onChange={setToggleActive} />`,
    breadcrumbs: `<Breadcrumbs items={crumbs} separator="→" onCrumbClick={handleTruncate} />`,
    pagination: `<Pagination currentPage={${paginationPage}} totalPages={5} onPageChange={setPaginationPage} />`,
    stepper: `<Stepper steps={steps} activeStep={${stepperIndex}} />`,
    tabs: `<Tabs tabs={tabs} activeTab="${tabKey}" onTabChange={setTabKey} />`,
    contextmenu: `<ContextMenu options={options}>Right-Click Area</ContextMenu>`,
    datetime: `<DateTimePicker label="Run Frame Trigger" value="${pickedDateTime}" onChange={setPickedDateTime} />`,
    navbar: `<Navbar brandName="Sandbox" sticky={${navbarSticky}} rounded={${navbarRounded}} />`,
    overlays: `<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />`,
    form: `<FormRenderer schema={demoFormSchema} columns={${formColumns}} onSubmit={handleSubmit} />`,
    dropdowns: `<SearchDropdown multiple={${searchMultiple}} />\n<Dropdown multiple={${dropdownMultiple}} />`,
    input: `<Input error={${inputProps.error}} disabled={${inputProps.disabled}} />`,
    datatable: `<DataTable title="Matrix" selectable={${tableSelectable}} />`,
    loaders: `<ProgressLoader variant="linear" value={${demoProgress}} />`,
    button: `<Button variant="${buttonProps.variant}" disabled={${buttonProps.disabled}} />`,
    alerts: `<Alert status="${alertStatus}" title="Broadcast" />`
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
        
        {/* Global Page Header Link Row */}
        <Navbar brandName="Infinite UI" links={headerNavigationLinks} activeView="docs" />

        <div className="max-w-5xl mx-auto mt-10 px-4">
          
          {/* THE MASTER COMPONENT CANVAS GRAPH REPOSITORY */}
          <div className="flex gap-8 relative z-10">
            <SidebarNav links={sidebarNavLinks} activeSection={activeSection} onSectionClick={(id) => setActiveSection(id)} />

            <main className="flex-1 space-y-6 max-w-3xl">
              
              {/* THEME LAB */}
              <section id="theme-lab" className="scroll-mt-28 bg-white/85 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-md space-y-6">
                <div className="flex flex-col text-left gap-1">
                  <h3 className="font-bold text-slate-800 text-lg">Theme Engine Interactive Lab</h3>
                  <p className="text-xs text-slate-500">Modify global parameters below to watch context transformations live.</p>
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

              {/* TOGGLE BUTTON SWITCH */}
              <section id="toggle" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Toggle Button Switch Component</h3>
                <div className="flex justify-center p-6 bg-slate-50/50 rounded-xl border border-dashed"><ToggleButton label="Synchronize Remote Node Registry Channels" checked={toggleActive} onChange={setToggleActive} /></div>
                <CodeViewer codeString={dynamicSnippets.toggle} />
              </section>

              {/* BREADCRUMBS */}
              <section id="breadcrumbs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Breadcrumbs Path Navigation</h3>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed flex justify-center">
                  <Breadcrumbs items={[{ label: 'Dashboard' }, { label: 'Cluster Allocations' }, { label: 'Profile Metrics' }]} separator="→" onCrumbClick={(item, idx) => alert(`Crumb: ${item.label} [Index ${idx}]`)} />
                </div>
                <CodeViewer codeString={dynamicSnippets.breadcrumbs} />
              </section>

              {/* PAGINATION */}
              <section id="pagination" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Data Index Pagination</h3>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed"><Pagination currentPage={paginationPage} totalPages={5} onPageChange={setPaginationPage} /></div>
                <CodeViewer codeString={dynamicSnippets.pagination} />
              </section>

              {/* STEPPER */}
              <section id="stepper" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Linear Workflow Stepper Progress Panel</h3>
                <div className="bg-slate-50 p-3 rounded-lg border flex gap-3 text-xs font-bold justify-center mb-2">
                  <Button variant="outline" onClick={() => setStepperIndex(prev => Math.max(0, prev - 1))}>Back</Button>
                  <Button variant="solid" onClick={() => setStepperIndex(prev => Math.min(2, prev + 1))}>Next Step</Button>
                </div>
                <div className="p-8 bg-slate-50/50 rounded-xl border border-dashed pt-4 pb-12"><Stepper steps={[{ label: 'Compilation Build' }, { label: 'Integration Tests' }, { label: 'Production Push' }]} activeStep={stepperIndex} /></div>
                <CodeViewer codeString={dynamicSnippets.stepper} />
              </section>

              {/* TABS */}
              <section id="tabs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Segmented Horizontal Active View Tabs</h3>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed space-y-4">
                  <Tabs tabs={[{ label: 'Alpha Target Core', key: 'alpha' }, { label: 'Beta Mirror Shards', key: 'beta' }]} activeTab={tabKey} onTabChange={setTabKey} />
                </div>
                <CodeViewer codeString={dynamicSnippets.tabs} />
              </section>

              {/* CONTEXT MENU */}
              <section id="contextmenu" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Mouse Capture Right-Click ContextMenu</h3>
                <div className="p-1 border border-dashed rounded-xl bg-slate-50/50">
                  <ContextMenu options={[{ label: '🔄 Reload Cluster Core', onClick: () => alert('Triggering reload...') }]}>
                    <div className="h-24 flex items-center justify-center text-xs font-bold text-slate-400 font-mono bg-white rounded-lg border shadow-inner cursor-context-menu select-none">🎯 Right-Click inside this boundary area box</div>
                  </ContextMenu>
                </div>
                <CodeViewer codeString={dynamicSnippets.contextmenu} />
              </section>

              {/* DATE TIME PICKER */}
              <section id="datetime" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Unified Scheduling Date & Time Picker</h3>
                <div className="p-6 bg-slate-50/50 rounded-xl border border-dashed max-w-sm mx-auto"><DateTimePicker label="Automated Pipeline Run Frame Trigger" value={pickedDateTime} onChange={setPickedDateTime} /></div>
                <CodeViewer codeString={dynamicSnippets.datetime} />
              </section>

              {/* TOP NAV SANDBOX */}
              <section id="topnav" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Top Navigation Responsive Header</h3>
                <div className="bg-slate-50 p-3 rounded-lg border flex flex-wrap gap-6 text-xs text-slate-600 font-semibold mb-4 text-left">
                  <label className="flex items-center gap-2 cursor-pointer select-none"><input type="checkbox" checked={navbarSticky} onChange={(e) => setNavbarSticky(e.target.checked)} className="rounded border-slate-300 shadow-none focus:ring-0" /><span>sticky={navbarSticky.toString()}</span></label>
                  <label className="flex items-center gap-2 cursor-pointer select-none"><input type="checkbox" checked={navbarRounded} onChange={(e) => setNavbarRounded(e.target.checked)} className="rounded border-slate-300 shadow-none focus:ring-0" /><span>rounded={navbarRounded.toString()}</span></label>
                </div>
                <div className="py-2 px-1 border border-dashed rounded-xl bg-slate-50/50"><Navbar brandName="Sandbox Component" links={sandboxNavbarLinks} sticky={navbarSticky} rounded={navbarRounded} /></div>
                <CodeViewer codeString={dynamicSnippets.navbar} />
              </section>

              {/* OVERLAYS CANVAS */}
              <section id="overlays" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Overlay Layers (Modal / Dialog Component Sheets)</h3>
                <div className="flex flex-wrap justify-center gap-4 py-4 bg-slate-50/40 border border-dashed rounded-xl">
                  <Button variant="solid" onClick={() => setIsModalOpen(true)}>✨ Open Standard Modal</Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(true)}>🔒 Intercept Action Dialog</Button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Operational Core Status" footer={<Button variant="outline" onClick={() => setIsModalOpen(false)}>Dismiss View</Button>}><p>Active infrastructure data monitoring layers are processing parameters live down on localized container pipelines maps.</p></Modal>
                <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Purge Volatiles?" description="This completely wipes staging cache nodes immediately." confirmLabel="Execute Purge" cancelLabel="Abort" onConfirm={() => alert('Purged.')} />
                <CodeViewer codeString={dynamicSnippets.overlays} />
              </section>

              {/* FORM RENDERER */}
              <section id="forms" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Schema-Driven Form Renderer</h3>
                <div className="py-2"><FormRenderer schema={demoFormSchema} columns={formColumns} submitLabel="Provision Cloud Account" onSubmit={(data) => setSubmittedFormData(data)} /></div>
                {submittedFormData && (
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-xs font-mono text-left text-emerald-400 animate-in">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(submittedFormData, null, 2)}</pre>
                  </div>
                )}
                <CodeViewer codeString={dynamicSnippets.form} />
              </section>

              {/* DROPDOWNS */}
              <section id="dropdowns" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Dropdowns & Selections Playground</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <SearchDropdown label="Target Deployment Cluster" options={['AWS us-east-1 (N. Virginia)', 'GCP europe-west1 (Belgium)']} multiple={searchMultiple} value={selectedClusters} onSelect={(val) => setSelectedClusters(Array.isArray(val) ? val : [val])} />
                  <Dropdown label="Assign IAM Security Roles" options={['Admin-Root-Access', 'DevOps-Engineer']} multiple={dropdownMultiple} value={selectedRoles} onSelect={(val) => setSelectedRoles(Array.isArray(val) ? val : [val])} />
                </div>
                <CodeViewer codeString={dynamicSnippets.dropdowns} />
              </section>

              {/* TOOLTIPS */}
              <section id="tooltips" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Tooltip Overlay</h3>
                <div className="flex justify-center p-12 bg-slate-50/40 border border-dashed rounded-xl my-4">
                  <Tooltip content={`Aligned overlay mounted on side: "${tooltipDirection}"`} variant={tooltipVariant} direction={tooltipDirection}>
                    <div className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-sm hover:border-slate-300 transition-all"><span>{tooltipVariant === 'info' ? 'ℹ️ Trigger Matrix (Click)' : '🎯 Positioning Target (Hover)'}</span></div>
                  </Tooltip>
                </div>
                <CodeViewer codeString={dynamicSnippets.tooltip} />
              </section>

              {/* INPUT FIELDS */}
              <section id="inputs" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Base Data Field Inputs</h3>
                <div className="max-w-md py-2 text-left mx-auto"><Input label="Playground Asset Key Input" placeholder="Enter alphanumeric token..." error={inputProps.error} disabled={inputProps.disabled} errorMessage="Validation failed." /></div>
                <CodeViewer codeString={dynamicSnippets.input} />
              </section>

              {/* DATA TABLE MATRIX */}
              <section id="datatable" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Interactive Data Analytics Matrix</h3>
                <div className="space-y-4 text-left"><Accordion items={accordionItems} /><DataTable title="Microfrontend Context Allocation Matrix" columns={tableColumns} data={tableData} selectable={tableSelectable} onSelectionChange={(selectedRows) => setCurrentTableSelection(selectedRows)} /></div>
                <CodeViewer codeString={dynamicSnippets.datatable} />
              </section>

              {/* PROGRESS LOADERS */}
              <section id="loaders" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Async Progress Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="flex"><ProgressLoader variant="circular" /></div>
                    <ProgressLoader variant="linear" value={demoProgress} />
                  </div>
                  <ProgressLoader variant="suspense" />
                </div>
                <CodeViewer codeString={dynamicSnippets.loaders} />
              </section>

              {/* BUTTONS TIER */}
              <section id="buttons" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-left">Core UI Button Elements Workspace</h3>
                <div className="flex justify-center p-4"><Button variant={buttonProps.variant} disabled={buttonProps.disabled}>Playground Action</Button></div>
                <CodeViewer codeString={dynamicSnippets.button} />
              </section>

              {/* SYSTEM ALERTS */}
              <section id="alerts" className="scroll-mt-28 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 border-b pb-2 text-left">Global Notification Feeds Playground</h3>
                <div className="py-2 text-left"><Alert status={alertStatus} title="System Broadcast Notification">The monitoring agent has intercepted an asynchronous process sequence transition signal cluster.</Alert></div>
                <CodeViewer codeString={dynamicSnippets.alerts} />
              </section>

            </main>
          </div>
        </div>

        {/* ============================================================================
            3. THE OVERLAY CONTACT ENGINEERING MODAL COMPONENT CANVAS 
           ============================================================================ */}
        <Modal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
          title="Contact Engineering Team"
        >
          <div className="space-y-4 text-left py-1">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Have questions about integrating Infinite UI components, scaling custom context presets, or managing microfrontend decoupled applications? Drop us a line directly.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-1.5 shadow-inner">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Support Mailbox</span>
              <a 
                href="mailto:support@infiniteui.io"
                className="text-sm font-black text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer select-all"
              >
                support@infiniteui.io
              </a>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                ⏱️ Response SLA: Under 24 operational hours
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" onClick={() => setIsContactModalOpen(false)}>
                Dismiss Window
              </Button>
            </div>
          </div>
        </Modal>

      </div>
    </ThemeProvider>
  );
}