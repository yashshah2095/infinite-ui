# Infinite UI Design System — v1.4 Core

Infinite UI is a lightweight, zero-dependency, schema-driven component laboratory engineered natively with **React 18** and **Tailwind CSS**. It features a centralized dynamic theme context engine, client-side data matrix tracking, viewport-relative overlay handlers, and highly scannable declarative UI patterns.

---

## 🚀 Key Features

*   **Context-Driven Theme Laboratory:** Dynamically transforms individual component styles using atomic Tailwind presets or live user-provided hex color string overrides.
*   **Zero External Dependencies:** Built entirely on native React state hooks and standard web browser layout APIs to keep bundle sizes minimal.
*   **Path-Truncating Breadcrumbs:** Eliminates hardcoded routing jumps by handling path adjustments client-side. Clicking a parent item instantly slices off downstream children arrays dynamically.
*   **Coordinate-Relative Overlays:** Floating popovers like right-click context menus map coordinates accurately via viewport-relative tracking (`clientX/Y`), preventing scroll misalignment bugs.
*   **Data Analytics Grid Matrix:** Features responsive column sorting indicators, row selection state registers, and a built-in memory Blob compiler for instant client-side CSV downloads.

---

## 📂 Project Architecture Mapping

To guarantee zero undefined reference errors across execution channels, maintain your local project tree to match this directory blueprint exactly:

```text
src/
├── components/
│   ├── ThemeContext.jsx      # Global theme state distributor
│   ├── themeEngine.js        # Presets-to-class translation logic
│   ├── Navbar.jsx            # Responsive semantic top navigation bar
│   ├── SidebarNav.jsx        # Vertical scroll-spy index menu
│   ├── Button.jsx            # Action trigger elements (Solid/Outline/Ghost)
│   ├── Input.jsx             # Base text data field captures with validation
│   ├── Dropdown.jsx          # Array-backed multi-select option box
│   ├── SearchDropdown.jsx    # Fuzzy-filtered token chip combobox
│   ├── DataTable.jsx         # Sortable table grid with native CSV exporter
│   ├── ProgressLoader.jsx    # Async circular, linear, and suspense indicators
│   ├── Alert.jsx             # Global system broadcast message panels
│   ├── Accordion.jsx         # Disclosure summary info drawers
│   ├── Tooltip.jsx           # Click/Hover intent overlay indicators
│   ├── FormRenderer.jsx      # Schema-driven multi-column form engine
│   ├── Modal.jsx             # Accessible overlay sheets with click-outside dismiss
│   ├── Dialog.jsx            # Critical transactional confirmation cards
│   ├── ToggleButton.jsx      # Fluid binary state slide switches
│   ├── Breadcrumbs.jsx       # Custom-sliced navigation tree trails
│   ├── Pagination.jsx        # Rigid data boundary boundary page controllers
│   ├── Stepper.jsx           # Milestone pipeline progress trackers
│   ├── Tabs.jsx              # Underlined horizontal layout view swappers
│   ├── ContextMenu.jsx       # ClientX/Y right-click popup capture links
│   └── DateTimePicker.jsx    # Unified context datetime calendar scheduling inputs
├── App.jsx                   # Central sandboxed live playground workspace
└── index.css                 # Master Tailwind CSS framework configuration vectors