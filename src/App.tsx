/**
 * NICE TO CU (BGF Retail) Convenience Store Digital Design System
 * 
 * Comprehensive retail design language:
 * - 1+1 / 2+1 promotion badges and unit savings
 * - Retail product card system with uniform 1:1 framing
 * - Live store inventory lookup & interactive map system
 * - Pocket CU One-QR barcode checkout & virtual keeping box
 * - Centered pop-up modal dialogs with backdrop dismissal
 */

import React, { useState } from 'react';
import { ShowcaseHeader, NavTab, ViewportMode } from './components/ShowcaseHeader';
import { CUMarketLiveApp } from './components/CUMarketLiveApp';
import { CUStoreMapStockLocator } from './components/CUStoreMapStockLocator';
import { ComponentLibraryView } from './components/ComponentLibraryView';
import { PlaygroundView } from './components/PlaygroundView';
import { TokensView } from './components/TokensView';
import { CodeExportModal } from './components/CodeExportModal';
import { isPebbleSoundEnabled } from './design-system/utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('cu-market');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [soundActive, setSoundActive] = useState(isPebbleSoundEnabled());
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Responsive frame wrapper styling based on viewport mode
  const getViewportContainerStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[420px] mx-auto border-8 border-[#751485]/20 bg-[#F5F6F8] rounded-[44px] shadow-2xl overflow-hidden min-h-[840px] p-4';
      case 'tablet':
        return 'max-w-[860px] mx-auto border-8 border-[#751485]/15 bg-[#F5F6F8] rounded-[38px] shadow-xl overflow-hidden min-h-[900px] p-6';
      case 'desktop':
      default:
        return 'max-w-7xl mx-auto px-4 sm:px-6';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#F5F6F8] text-[#1E1E1E] selection:bg-[#751485]/20 selection:text-[#751485]">
      {/* Top Navigation Bar */}
      <ShowcaseHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        viewportMode={viewportMode}
        onViewportChange={setViewportMode}
        soundActive={soundActive}
        onToggleSound={() => setSoundActive((prev) => !prev)}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* Device Viewport Simulation Notice */}
      {viewportMode !== 'desktop' && (
        <div className="py-2 px-4 text-center border-b bg-[#F6EDF8] border-[#751485]/20 text-[#751485]">
          <p className="text-xs font-bold">
            {viewportMode === 'mobile' ? 'Mobile Touchscreen (390px) Viewport Simulation' : 'Tablet (820px) Viewport Simulation'} · 44px Minimum Touch Targets Active
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-8">
        <div className={getViewportContainerStyles()}>
          {activeTab === 'cu-market' && <CUMarketLiveApp />}
          {activeTab === 'stock-locator' && <CUStoreMapStockLocator />}
          {activeTab === 'library' && <ComponentLibraryView />}
          {activeTab === 'playground' && <PlaygroundView />}
          {activeTab === 'tokens' && <TokensView />}
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="border-t py-8 text-xs bg-white border-gray-200 text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-[#751485]">CU</span>
            <span className="text-gray-300">·</span>
            <span className="font-bold text-[#1E1E1E]">BGF Retail</span>
            <span className="text-gray-300">·</span>
            <span>Convenience Store Digital Design System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#751485]" />
              <span>CU Purple #751485 (Pantone 267C)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#37D243]" />
              <span>CU Lime #37D243 (1+1)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8059EA]" />
              <span>CU Violet #8059EA (2+1)</span>
            </span>
          </div>

          <div className="text-gray-400 text-[11px]">
            Real-Time Stock Locator · Pocket CU One-QR · 1+1 / 2+1 Promotional Engine
          </div>
        </div>
      </footer>

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}
