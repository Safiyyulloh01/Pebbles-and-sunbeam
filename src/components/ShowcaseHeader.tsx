import React from 'react';
import { setPebbleSoundEnabled, playMarshmallowSquish, playTabSwitch } from '../design-system/utils/audio';

export type NavTab = 'cu-market' | 'stock-locator' | 'library' | 'playground' | 'tokens';
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
  const navItems = [
    { id: 'cu-market' as NavTab, label: '🏪 Store Catalog', badge: 'LIVE' },
    { id: 'stock-locator' as NavTab, label: '🗺️ Stock Locator & Map', badge: 'NEW' },
    { id: 'library' as NavTab, label: '🧩 Component Library' },
    { id: 'playground' as NavTab, label: '⚡ Playground' },
    { id: 'tokens' as NavTab, label: '🎨 Design Tokens' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-[#751485]/15 shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Official CU Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playTabSwitch();
              onTabChange('cu-market');
            }}
            className="text-left group cursor-pointer focus:outline-none flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="bg-[#751485] text-white px-2.5 py-0.5 rounded-[10px] text-lg font-black tracking-tight shadow-2xs">
                CU
              </span>
              <span className="font-extrabold text-lg text-[#1E1E1E] tracking-tight group-hover:text-[#751485] transition-colors">
                BGF Retail
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playTabSwitch();
                  onTabChange(item.id);
                }}
                className={`
                  px-3.5 py-1.5 text-xs font-bold rounded-[12px] transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 cursor-pointer
                  ${isActive
                    ? 'bg-[#751485] text-white shadow-[0_2px_8px_rgba(117,20,133,0.25)]'
                    : 'text-gray-600 hover:text-[#751485] hover:bg-gray-100'
                  }
                `}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                      item.badge === 'LIVE'
                        ? 'bg-[#37D243] text-white'
                        : 'bg-[#8059EA] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & Touch Device Viewport Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Device viewport frame switcher */}
          <div className="hidden sm:flex items-center p-1 bg-gray-100 rounded-[14px] border border-gray-200">
            <button
              type="button"
              onClick={() => {
                playTabSwitch();
                onViewportChange('desktop');
              }}
              title="Desktop viewport (100%)"
              className={`p-1.5 rounded-[10px] transition-colors cursor-pointer ${viewportMode === 'desktop' ? 'bg-white text-[#751485] shadow-xs font-bold' : 'text-gray-500 hover:text-black'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                playTabSwitch();
                onViewportChange('tablet');
              }}
              title="Tablet viewport (820px)"
              className={`p-1.5 rounded-[10px] transition-colors cursor-pointer ${viewportMode === 'tablet' ? 'bg-white text-[#751485] shadow-xs font-bold' : 'text-gray-500 hover:text-black'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="2" width="16" height="20" rx="3" strokeWidth="2" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                playTabSwitch();
                onViewportChange('mobile');
              }}
              title="Mobile viewport (390px)"
              className={`p-1.5 rounded-[10px] transition-colors cursor-pointer ${viewportMode === 'mobile' ? 'bg-white text-[#751485] shadow-xs font-bold' : 'text-gray-500 hover:text-black'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="6" y="2" width="12" height="20" rx="3" strokeWidth="2" />
                <line x1="10" y1="18" x2="14" y2="18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundActive;
              setPebbleSoundEnabled(next);
              onToggleSound();
              if (next) playMarshmallowSquish();
            }}
            title={soundActive ? 'Tactile Sound: ON (click to mute)' : 'Tactile Sound: OFF'}
            className={`
              p-2 rounded-[12px] border transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer
              ${soundActive
                ? 'bg-white text-[#751485] border-[#751485]/40 shadow-xs'
                : 'bg-gray-100 text-gray-500 border-gray-200'
              }
            `}
          >
            {soundActive ? (
              <svg className="w-4 h-4 text-[#37D243]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
            <span className="hidden sm:inline text-[11px] font-bold">{soundActive ? 'SFX On' : 'Muted'}</span>
          </button>

          {/* Export Code CTA Button */}
          <button
            type="button"
            onClick={onOpenExport}
            className="px-3.5 py-2 text-xs font-bold rounded-[12px] shadow-sm transition-all active:scale-95 whitespace-nowrap bg-[#751485] hover:bg-[#580F63] text-white shadow-[0_2px_8px_rgba(117,20,133,0.3)] cursor-pointer"
          >
            Export Tokens
          </button>
        </div>
      </div>

      {/* Horizontal Nav Bar for Mobile / Smaller Displays */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-gray-100 bg-white no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`
              px-3 py-1.5 text-xs font-bold rounded-[10px] whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 cursor-pointer
              ${activeTab === item.id
                ? 'bg-[#751485] text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
              }
            `}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${item.badge === 'LIVE' ? 'bg-[#37D243] text-white' : 'bg-[#8059EA] text-white'}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};
