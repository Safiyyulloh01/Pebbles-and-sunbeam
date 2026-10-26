import React, { useState } from 'react';
import { CU_COLORS } from '../design-system/cu-tokens';

export const TokensView: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const cuColorTokens = [
    { role: 'Brand Primary', name: 'Pantone 267C Purple', hex: '#751485', vibe: 'Official CU corporate purple brand color', dark: false },
    { role: 'Brand Secondary', name: 'Pantone 368C Green', hex: '#9DC92A', vibe: 'Official CU secondary green leaf accent', dark: true },
    { role: 'Digital Promotion', name: 'Digital Lime Green', hex: '#37D243', vibe: '1+1 Buy 1 Get 1 Free primary badge color', dark: true },
    { role: 'Digital Promotion', name: 'Digital Violet', hex: '#8059EA', vibe: '2+1 Buy 2 Get 1 Free primary badge color', dark: false },
    { role: 'PB Specialty', name: 'HEYROO Golden Yellow', hex: '#FFB800', vibe: 'CU Private Brand (PB) character mascot & snacks', dark: true },
    { role: 'Alert / Hot', name: 'Energy Red', hex: '#FF4757', vibe: 'NEW arrivals, flash sales, and low stock warnings', dark: false },
    { role: 'Canvas Base', name: 'Retail Off-White Canvas', hex: '#F5F6F8', vibe: 'High-comfort retail background eliminating glare', dark: true },
    { role: 'Surface Card', name: 'Pure White Surface', hex: '#FFFFFF', vibe: 'Crisp product card and popover container background', dark: true },
    { role: 'Border Tone', name: 'Retail Border Neutral', hex: '#E5E7EB', vibe: 'Subtle gray border defining product card bounds', dark: true },
    { role: 'Text Primary', name: 'High-Contrast Charcoal', hex: '#1E1E1E', vibe: 'Crisp readable product names and header text', dark: false },
    { role: 'Text Secondary', name: 'Muted Slate Gray', hex: '#666666', vibe: 'Category chips, storage conditions, and timestamps', dark: false },
  ];

  return (
    <div className="space-y-12 pb-24 font-['Noto_Sans_KR',sans-serif]">
      {/* Intro Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 sm:p-10 shadow-xs">
        <div className="inline-flex items-center gap-2 bg-[#F6EDF8] px-3 py-1 rounded-full text-xs font-bold text-[#751485] mb-3 border border-[#751485]/20">
          <span className="w-2 h-2 rounded-full bg-[#751485]" />
          <span>CU BGF Retail Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight">
          CU Design Tokens & Brand System
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Standardized digital brand guidelines for NICE TO CU convenience stores. Includes Pantone corporate colors, digital promotional accents, typography, and geometry. Click any token to copy its value.
        </p>
      </div>

      {/* 1. Official Brand Color Palette */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">Palette</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Official Brand & Promotional Palette
            </h2>
          </div>
          <span className="text-xs font-bold text-[#751485] bg-[#F6EDF8] px-3 py-1 rounded-full border border-[#751485]/20">
            Pantone 267C & 368C
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cuColorTokens.map((item) => (
            <div
              key={item.name}
              onClick={() => copyToClipboard(item.hex, item.name)}
              className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-3">
                  <span>{item.role}</span>
                  <span className="font-mono font-bold">{item.hex}</span>
                </div>

                <div
                  className="w-full h-24 rounded-[14px] mb-3 border border-black/5 flex items-end p-3 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: item.hex }}
                >
                  <span
                    className={`text-xs font-mono font-black ${
                      item.dark ? 'text-black' : 'text-white'
                    }`}
                  >
                    {item.hex}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#1E1E1E]">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-normal">{item.vibe}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-3 text-[11px] text-[#751485] font-bold">
                {copiedToken === item.name ? '✓ Copied Hex!' : 'Click to copy'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Promotional Logic Tokens */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">Promotional Engine</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Promotion Value Hierarchy
            </h2>
          </div>
          <span className="text-xs font-bold text-[#37D243] bg-[#EBFCEB] px-3 py-1 rounded-full border border-[#37D243]/30">
            Korean Retail Mechanics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[20px] p-6 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#37D243] text-white font-black text-xs px-2.5 py-1 rounded-full">
                1+1 Promotion
              </span>
              <span className="font-mono text-xs text-gray-400">50% Effective Value</span>
            </div>
            <h4 className="font-bold text-base text-[#1E1E1E]">Buy 1 Get 1 Free</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Customer receives 2 units for the price of 1. If only 1 unit is taken immediately, the remaining unit can be banked into the Pocket CU Keeping Box.
            </p>
            <div className="p-3 bg-[#EBFCEB] rounded-[12px] text-xs font-bold text-[#2BB836]">
              Calculation: ₩ Price / 2 per unit
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#8059EA] text-white font-black text-xs px-2.5 py-1 rounded-full">
                2+1 Promotion
              </span>
              <span className="font-mono text-xs text-gray-400">33.3% Effective Value</span>
            </div>
            <h4 className="font-bold text-base text-[#1E1E1E]">Buy 2 Get 1 Free</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Customer purchases 2 units and receives the 3rd unit free. High volume driver across beverages, ramens, and confectionery.
            </p>
            <div className="p-3 bg-[#F2EFFD] rounded-[12px] text-xs font-bold text-[#8059EA]">
              Calculation: (₩ Price * 2) / 3 per unit
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#FFB800] text-[#751485] font-black text-xs px-2.5 py-1 rounded-full">
                CU Only (PB)
              </span>
              <span className="font-mono text-xs text-gray-400">Exclusive Line</span>
            </div>
            <h4 className="font-bold text-base text-[#1E1E1E]">HEYROO & delaffe Exclusive</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Exclusive items developed by BGF Retail available only at CU stores. Premium margin driver and viral social media draw.
            </p>
            <div className="p-3 bg-amber-50 rounded-[12px] text-xs font-bold text-[#B45309]">
              Specialty: HEYROO snacks & delaffe pouch drinks
            </div>
          </div>
        </div>
      </section>

      {/* 3. Geometry & Corner Radii Tokens */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">Geometry</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Corner Curvature & Speech-Bubble Shapes
            </h2>
          </div>
          <span className="text-xs font-bold text-[#751485] bg-[#F6EDF8] px-3 py-1 rounded-full border border-[#751485]/20">
            NICE TO CU Bubble
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-2xs space-y-3">
            <div className="w-16 h-16 bg-[#751485] rounded-[20px] rounded-tl-[4px] flex items-center justify-center text-white font-black text-xs shadow-xs">
              CU
            </div>
            <h4 className="font-bold text-sm text-[#1E1E1E]">NICE TO CU Speech Bubble</h4>
            <p className="text-xs text-gray-500">
              Top-left corner is pinched to 4px while other corners are rounded to 20px, mimicking a friendly comic dialogue bubble.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-2xs space-y-3">
            <div className="w-24 h-10 bg-[#37D243] rounded-full flex items-center justify-center text-white font-black text-xs shadow-xs">
              1+1 PILL
            </div>
            <h4 className="font-bold text-sm text-[#1E1E1E]">Promotional Pill Shape</h4>
            <p className="text-xs text-gray-500">
              100% continuous pill curves (radius: 9999px) used for 1+1, 2+1, and secondary status badges.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[20px] border border-gray-200 shadow-2xs space-y-3">
            <div className="w-20 h-16 bg-gray-100 rounded-[18px] border border-gray-300 flex items-center justify-center text-gray-600 font-bold text-xs">
              Card
            </div>
            <h4 className="font-bold text-sm text-[#1E1E1E]">Retail Card Curve</h4>
            <p className="text-xs text-gray-500">
              18px corner radius framing the product card structure, maintaining balance between modern softness and grid density.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
