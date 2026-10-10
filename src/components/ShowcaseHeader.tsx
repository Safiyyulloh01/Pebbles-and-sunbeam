import React from 'react';
import { isPebbleSoundEnabled, setPebbleSoundEnabled, playMarshmallowSquish, playTabSwitch } from '../design-system/utils/audio';

export type NavTab = 'playground' | 'library' | 'live-app' | 'tokens';
export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface ShowcaseHeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  soundActive: boolean;
  onToggleSound: () => void;
  onOpenExport: () => void;
}

export const ShowcaseHeader: React.FC<ShowcaseHeaderProps> = ({
  activeTab,
  onTabChange,
  viewportMode,
  onViewportChange,
  soundActive,
  onToggleSound,
  onOpenExport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADBCE]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => {
            playTabSwitch();
            onTabChange('playground');
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display font-bold text-xl sm:text-2xl text-[#2D2522] tracking-tight group-hover:text-[#FF8A50] transition-colors whitespace-nowrap">
            Pebble & Sunbeam
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          {[
            { id: 'playground' as NavTab, label: 'Playground' },
            { id: 'library' as NavTab, label: 'Component Library' },
            { id: 'live-app' as NavTab, label: 'Morning Harvest (Live App)' },
            { id: 'tokens' as NavTab, label: 'Tokens & Motion' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playTabSwitch();
                  onTabChange(item.id);
                }}
                className={`
                  px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all duration-150 whitespace-nowrap
                  ${isActive
                    ? 'bg-[#FFFDF9] text-[#2D2522] shadow-[0_2px_8px_rgba(92,60,40,0.08)] border border-[#EADBCE]/80'
                    : 'text-[#786B65] hover:text-[#2D2522] hover:bg-[#F0EAE1]/60'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & Touch Device Viewport Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device viewport frame switcher for testing tablet & mobile ergonomics */}
          <div className="hidden sm:flex items-center p-1 bg-[#F0EAE1] rounded-[16px] border border-[#E2D8CC]">
            <button
              onClick={() => {
                playTabSwitch();
                onViewportChange('desktop');
              }}
              title="Desktop viewport (100%)"
              className={`p-1.5 rounded-[12px] transition-colors ${viewportMode === 'desktop' ? 'bg-[#FFFDF9] text-[#2D2522] shadow-sm' : 'text-[#786B65] hover:text-[#2D2522]'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={() => {
                playTabSwitch();
                onViewportChange('tablet');
              }}
              title="Tablet viewport (820px)"
              className={`p-1.5 rounded-[12px] transition-colors ${viewportMode === 'tablet' ? 'bg-[#FFFDF9] text-[#2D2522] shadow-sm' : 'text-[#786B65] hover:text-[#2D2522]'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="2" width="16" height="20" rx="3" strokeWidth="2" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => {
                playTabSwitch();
                onViewportChange('mobile');
              }}
              title="Mobile touchscreen viewport (390px)"
              className={`p-1.5 rounded-[12px] transition-colors ${viewportMode === 'mobile' ? 'bg-[#FFFDF9] text-[#2D2522] shadow-sm' : 'text-[#786B65] hover:text-[#2D2522]'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="6" y="2" width="12" height="20" rx="2.5" strokeWidth="2" />
                <line x1="10" y1="4" x2="14" y2="4" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="18" r="0.75" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Tactile Audio Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundActive;
              setPebbleSoundEnabled(next);
              onToggleSound();
              if (next) playMarshmallowSquish();
            }}
            title={soundActive ? 'Tactile Sound: ON (click to mute)' : 'Tactile Sound: OFF'}
            className={`
              p-2 rounded-[14px] border transition-all text-xs font-semibold flex items-center gap-1.5
              ${soundActive
                ? 'bg-[#FFFDF9] text-[#FF8A50] border-[#FF8A50]/40 shadow-sm'
                : 'bg-[#F0EAE1] text-[#786B65] border-[#E2D8CC]'
              }
            `}
          >
            {soundActive ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
            <span className="hidden md:inline">{soundActive ? 'SFX On' : 'Muted'}</span>
          </button>

          {/* Export Code CTA Button */}
          <button
            onClick={onOpenExport}
            className="px-3.5 py-2 text-xs font-bold text-[#FFFDF9] bg-[#FF8A50] hover:bg-[#f67c40] rounded-[16px] shadow-[0_3px_0_0_#E5692A,0_6px_12px_rgba(92,60,40,0.12)] transition-all active:translate-y-0.5 active:shadow-[0_1px_0_0_#E5692A] whitespace-nowrap"
          >
            Export Tokens
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller (when screen < 1024px) */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-[#EADBCE]/50 bg-[#FAF7F2]">
        {[
          { id: 'playground' as NavTab, label: 'Playground' },
          { id: 'library' as NavTab, label: 'Component Library' },
          { id: 'live-app' as NavTab, label: 'Morning Harvest (Live App)' },
          { id: 'tokens' as NavTab, label: 'Tokens & Motion' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              px-3 py-1.5 text-xs font-semibold rounded-[12px] whitespace-nowrap transition-colors
              ${activeTab === item.id ? 'bg-[#FFFDF9] text-[#2D2522] border border-[#EADBCE]' : 'text-[#786B65]'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
