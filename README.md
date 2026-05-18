# Infinite UI Core

A clean, high-performance, and fully accessible React component library optimized for rapid dashboard development. Built with native WAI-ARIA compliance guidelines and beautifully styled using next-generation Tailwind CSS tokens.

---

## 🚀 Key Features

- Zero Boilerplate: Pre-compiled production styles mean you get full design features instantly without messing up your local bundler setups.
- Hybrid Layout Architectures: Fluid interaction hooks mapping perfectly across both microfrontends and monolithic platforms.
- Open Core Model: Standard UI primitives are 100% free and open-source, with advanced enterprise pipelines structurally safeguarded for licensed environments.

---

## 📦 Installation

Install the core library using your preferred package manager:

npm install infinite-ui-core

or

yarn add infinite-ui-core

## 🌐 Live Demo

👉 [Click Here](https://infinite-ui-weld.vercel.app/)

---

## 🔧 Step-by-Step Setup

### 1. Import the Pre-Compiled Stylesheet

Add this at the top of your root entry file (src/main.jsx or src/index.js):

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Core library styles
import 'infinite-ui-core/dist/style.css';

// Your custom styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

No Tailwind Required: Your project does NOT need Tailwind CSS. All styles are pre-packaged and ready to use.

---

## 🧩 Usage Example

// src/App.jsx
import React, { useState } from 'react';
import { Button, ToggleButton, Card, Breadcrumbs } from 'infinite-ui-core';

export default function App() {
  const [syncActive, setSyncActive] = useState(false);

  const crumbs = [
    { label: 'Dashboard' },
    { label: 'Cluster Allocations' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      
      <Breadcrumbs items={crumbs} separator="→" />

      <Card style={{ marginTop: '16px' }}>
        <Card.Header>
          <h3 style={{ margin: 0, fontWeight: 'bold' }}>
            Remote Node Management
          </h3>
        </Card.Header>

        <Card.Body>
          <p>
            Toggle the engine state parameters to sync remote container agents.
          </p>

          <ToggleButton
            id="engine-sync"
            label="Enforce Engine Sync Pipeline"
            checked={syncActive}
            onChange={setSyncActive}
          />
        </Card.Body>

        <Card.Footer>
          <Button
            variant={syncActive ? 'solid' : 'outline'}
            onClick={() => alert('Execution Sequence Dispatched')}
          >
            Execute Runtime Protocol
          </Button>
        </Card.Footer>
      </Card>

    </div>
  );
}

---

## 🗂️ Component Directory Status

Core UI Primitives (Available Now)

- Button  
- ToggleButton  
- Card  
- Breadcrumbs  
- Pagination  
- ContextMenu  
- Stepper  
- Tabs  
- Modal & Dialog  
- Dropdown & SearchDropdown  
- Tooltip  
- DataTable  
- ProgressLoader  
- Alert  
- Input  

Enterprise Modules (Locked / Requires Token)

- FormRenderer  
- Toast  
- Drawer  
- FileUploader  
- DateTimePicker  

Attempting to use enterprise modules without proper licensing will display a Module Lock placeholder UI.

---

## 🛠️ Troubleshooting

Failed to resolve import:

Run:

npm run dev -- --force

---

Component styles appear blank:

Ensure this is added:

import 'infinite-ui-core/dist/style.css';