# 🏪 NICE TO CU — Digital Design System & Store Locator

> BGF Retail (CU 편의점) Digital Product Design System, Pocket CU O4O Commerce App & Real-Time Store Inventory Locator.

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF4154?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 🌟 Overview

**NICE TO CU** is an interactive, enterprise-grade digital design system and retail commerce web application modeled on **BGF Retail's CU convenience store brand identity**.

It brings the **Pocket CU (포켓CU)** O4O (Online-for-Offline) mobile lifestyle experience to the web, pairing tactile UI components with live convenience store inventory tracking, barcode payments, and promotional workflows.

---

## ✨ Key Features

### 🛍️ 1. CU Market Live App
* **Promotion Engine**: Authentic `1+1`, `2+1`, and discount badge pricing with automatic unit savings calculations.
* **PB Brand Lineups**: Tailored showcases for CU private brands including **HEYROO** (snacks), **get** (premium eco-friendly coffee), and **delaffe** (iced pouch drinks).
* **Virtual Keeping Box (키핑쿠폰)**: Save extra `1+1` promo items to your digital keeper wallet for later in-store redemption.
* **Tactile Audio Feedback**: Subtle auditory micro-interactions for adding items to cart, tab navigation, and checkout confirmation.

### 📍 2. CU Store Map & Stock Locator
* **Live Inventory Search**: Real-time product inventory lookup across regional CU branch stores.
* **Interactive Map View**: Visual store markers with stock availability indicators (In Stock, Low Stock, Out of Stock).
* **Branch Details**: Operating hours, store address, direct phone dialing, and 24-hour service badges.

### 💳 3. Pocket CU One-QR Barcode Checkout
* Integrated payment simulation generating dynamic barcode/QR codes for simultaneous membership accrual, discount coupon redemption, and cash receipt processing.

### 🎨 4. Design System Tokens & Component Library
* **Brand Colors**:
  * **CU Purple** (`#751485`) — Brand core identity symbolizing care and value.
  * **CU Green** (`#9DC92A`) — Brand core identity symbolizing freshness and new service.
  * **CU Lime Green** (`#37D243`) & **CU Violet** (`#8059EA`) — 1+1 and 2+1 promotion badge tokens.
  * **HEYROO Yellow** (`#FFB800`) — Exclusive PB brand identity.
* **Component Catalog**: Volumetric buttons, tactile chips, modal dialogs, product cards, responsive device wrappers (Desktop, Tablet, Mobile frame views).

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
npm install  # or bun install

# Start the Vite development server
npm run dev  # or bun dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
Pebbles-and-sunbeam/
├── src/
│   ├── components/
│   │   ├── CUMarketLiveApp.tsx          # O4O Commerce catalog & cart
│   │   ├── CUStoreMapStockLocator.tsx   # Interactive store inventory locator
│   │   ├── ComponentLibraryView.tsx     # Design system component gallery
│   │   ├── PlaygroundView.tsx           # Interactive token playground
│   │   ├── TokensView.tsx               # Design token specifications
│   │   └── ShowcaseHeader.tsx           # Viewport frame toggle & navigation
│   ├── design-system/
│   │   ├── components/                  # Buttons, Badges, Modals, Product Cards
│   │   ├── cu-tokens.ts                 # Color, typography, and spacing tokens
│   │   └── utils/                       # Haptic audio and sound effects
│   ├── App.tsx                          # App shell & viewport mode switcher
│   └── main.tsx                         # Entry point
├── CU_DESIGN_LIBRARY.md                 # Full Korean design system specification
├── vite.config.ts                       # Vite configuration
└── package.json
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
