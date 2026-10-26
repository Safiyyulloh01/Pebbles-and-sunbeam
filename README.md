# 🎨 Pebble & Sunbeam — "Tender Craft" Design System

> A tactile, warm-hearted design language treating web UI like soft-molded, matte wooden-and-clay toys bathed in morning sunlight.

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF4154?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 🌾 Philosophy: "Tender Craft"

Most digital design systems chase cold glassmorphism, aggressive neobrutalism, or sterile corporate minimalism. 

**Pebble & Sunbeam** takes inspiration from hand-carved wooden blocks, sun-warmed river pebbles, and unglazed ceramic clay:
* **Organic Squircles**: Continuous superellipses and diagonal asymmetric clay curves (`28px 18px 28px 14px`) rather than rigid circular fillets.
* **Volumetric Marshmallow Buttons**: Soft 3D extruded ridges that physically depress under your finger with springy dough overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
* **Warm Ambient Occlusion**: Layered golden-hour earth shadows (`rgba(92, 60, 40, ...)`) rather than lifeless black drop shadows.
* **Tactile Audio Feedback**: Synthesized organic wood-click and pebble-drop sounds synthesized directly via the Web Audio API.

---

## ✨ Features

### 🍞 1. Morning Harvest Showcase App
An end-to-end artisan bakery & farm pantry application built entirely with Pebble & Sunbeam components:
* Organic card grids with asymmetric clay framing.
* Interactive cart tray and volumetric checkout.
* Multi-viewport framing: inspect how the design system responds across **Mobile (420px)**, **Tablet (860px)**, and **Desktop**.

### 🧩 2. Complete Component Catalog
Pre-built, accessible, tactile React components:
* **Buttons**: `PebbleButton` (Clementine, Matcha, Berry, Sweet Butter, Spiced Coral) with extruded 3D base ridges.
* **Surfaces**: `PebbleCard` (symmetric & asymmetric clay cuts), `PebbleModal` (squircle sheet dialogs), `PebbleCallout`.
* **Inputs & Controls**: `PebbleInput` (dugout trench style), `PebbleCheckbox`, `PebbleToggle` (marshmallow slider), `PebbleDropdown`.
* **Feedback**: `PebbleProgressBar` (carved groove track), `PebbleBadge`, `PebbleTooltip`, `PebbleSkeleton`, `PebbleSpinner`.

### 🎛️ 3. Interactive Design Tokens Playground
* Live interactive color ramps:
  * **Oat Milk** (`#FAF7F2`) & **Sweet Butter** (`#FFFDF9`) base surfaces
  * **Dark Truffle** (`#2D2522`) roasted-coffee typography
  * **Clementine** (`#FF8A50`), **Matcha** (`#5BB98C`), and **Berry** (`#8C7CFF`) primary accents
* Live curve editor and shadow tester.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v18+) or [Bun](https://bun.sh)

### Installation

```bash
# Clone the repository
git clone https://github.com/safiydev/Pebbles-and-sunbeam.git
cd Pebbles-and-sunbeam

# Install dependencies
bun install  # or npm install

# Start development server
bun dev      # or npm run dev
```

Open `http://localhost:3000` to interact with the design system.

---

## 📁 Repository Structure

```
Pebbles-and-sunbeam/
├── src/
│   ├── components/
│   │   ├── MorningHarvestApp.tsx     # Full artisan pantry reference application
│   │   ├── ComponentLibraryView.tsx  # Interactive component showcase
│   │   ├── PlaygroundView.tsx        # Token & physics experimentation sandbox
│   │   ├── TokensView.tsx            # Design token reference sheets
│   │   ├── ShowcaseHeader.tsx        # Viewport framing & audio toggle
│   │   └── CodeExportModal.tsx       # Export Tailwind / CSS snippets
│   ├── design-system/
│   │   ├── components/               # PebbleButton, PebbleCard, PebbleModal, etc.
│   │   ├── tokens.ts                 # Colors, curves, shadows, motion presets
│   │   └── utils/audio.ts            # Web Audio API organic sound synthesizer
│   ├── App.tsx                       # Main application shell
│   ├── index.css                     # Custom squircle utilities & Tailwind setup
│   └── main.tsx                      # Vite React entry point
├── package.json
└── vite.config.ts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
