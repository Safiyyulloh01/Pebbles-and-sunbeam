/**
 * Pebble & Sunbeam ("Tender Craft") Design System & Application
 * 
 * Treats UI like soft-molded, matte wooden-and-clay toys bathed in morning sunlight.
 */

import React, { useState } from 'react';
import { ShowcaseHeader, NavTab, ViewportMode } from './components/ShowcaseHeader';
import { PlaygroundView } from './components/PlaygroundView';
import { ComponentLibraryView } from './components/ComponentLibraryView';
import { MorningHarvestApp } from './components/MorningHarvestApp';
import { TokensView } from './components/TokensView';
import { CodeExportModal } from './components/CodeExportModal';
import { isPebbleSoundEnabled } from './design-system/utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('playground');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [soundActive, setSoundActive] = useState(isPebbleSoundEnabled());
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Responsive frame wrapper styling based on viewport mode
  const getViewportContainerStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[410px] mx-auto border-8 border-[#2D2522]/15 rounded-[44px] shadow-2xl overflow-hidden min-h-[820px] bg-[#FAF7F2] p-4';
      case 'tablet':
        return 'max-w-[840px] mx-auto border-8 border-[#2D2522]/10 rounded-[38px] shadow-xl overflow-hidden min-h-[900px] bg-[#FAF7F2] p-6';
      case 'desktop':
      default:
        return 'max-w-7xl mx-auto px-4 sm:px-6';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2522] flex flex-col font-body selection:bg-[#FF8A50]/20 selection:text-[#2D2522]">
      {/* 3-Zone Top Bar */}
      <ShowcaseHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        viewportMode={viewportMode}
        onViewportChange={setViewportMode}
        soundActive={soundActive}
        onToggleSound={() => setSoundActive((prev) => !prev)}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* Device Viewport Simulation Notice (when tablet or mobile mode is active) */}
      {viewportMode !== 'desktop' && (
        <div className="bg-[#FFE8DC] border-b border-[#FF8A50]/30 py-2 px-4 text-center">
          <p className="text-xs font-bold text-[#D45417]">
            Viewing in {viewportMode === 'mobile' ? 'Mobile Touchscreen (390px)' : 'Tablet Touchscreen (820px)'} mode · Minimum 44px touch targets & pebble notches active
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-10">
        <div className={getViewportContainerStyles()}>
          {activeTab === 'playground' && <PlaygroundView />}
          {activeTab === 'library' && <ComponentLibraryView />}
          {activeTab === 'live-app' && <MorningHarvestApp />}
          {activeTab === 'tokens' && <TokensView />}
        </div>
      </main>

      {/* Clean Footer (No mechanical tickers or telemetry) */}
      <footer className="border-t border-[#EADBCE]/80 bg-[#FFFDF9] py-8 text-center text-xs text-[#786B65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-[#2D2522]">Pebble & Sunbeam</span>
            <span className="text-[#A89B95]">·</span>
            <span>Tender Craft Design Language</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Oat Milk #FAF7F2</span>
            <span>·</span>
            <span>Dark Truffle #2D2522</span>
            <span>·</span>
            <span>Clementine Pop #FF8A50</span>
          </div>

          <div className="text-[#A89B95]">
            Hand-sanded squircles & volumetric marshmallow UI
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
