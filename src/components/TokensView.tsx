import React, { useState } from 'react';
import { PebbleCard, PebbleBadge, PebbleButton, PEBBLE_COLORS, PEBBLE_SHADOWS, PEBBLE_CURVES } from '../design-system';

export const TokensView: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [bounceActive, setBounceActive] = useState(false);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const paletteTable = [
    { role: 'Canvas', name: 'Oat Milk', hex: '#FAF7F2', vibe: 'Warm off-white base. Eliminates harsh digital glare.', textDark: true },
    { role: 'Surface', name: 'Sweet Butter', hex: '#FFFDF9', vibe: 'Elevated card surfaces and popovers.', textDark: true },
    { role: 'Text Primary', name: 'Dark Truffle', hex: '#2D2522', vibe: 'Soft roasted-coffee dark brown; never use #000000.', textDark: false },
    { role: 'Text Muted', name: 'Warm Clay', hex: '#786B65', vibe: 'Secondary labels, timestamps, and placeholders.', textDark: false },
    { role: 'Primary Accent', name: 'Clementine Pop', hex: '#FF8A50', vibe: 'Energetic sun-warmed orange-peach for primary CTAs.', textDark: true },
    { role: 'Fresh Accent', name: 'Matcha Leaf', hex: '#5BB98C', vibe: 'Refreshing herbal mint-green for success states & toggles.', textDark: false },
    { role: 'Playful Accent', name: 'Berry Cream', hex: '#8C7CFF', vibe: 'Gentle lavender-indigo for tags, badges, and highlights.', textDark: false },
    { role: 'Soft Base / Wells', name: 'Steamed Rice', hex: '#F0EAE1', vibe: 'Input field backgrounds, disabled containers, and hover trays.', textDark: true },
    { role: 'Error / Critical', name: 'Spiced Coral', hex: '#EE5D50', vibe: 'Warm patient coral for alerts and shiver validation.', textDark: false },
    { role: 'Warning / Notice', name: 'Honeycomb Yellow', hex: '#F5A623', vibe: 'Rich wildflower honey for warnings and notices.', textDark: true },
    { role: 'Chalk & Slumber', name: 'Faded Chalk', hex: '#EADBCE', vibe: 'Resting flat tone for unavailable controls.', textDark: true },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Intro Header */}
      <div className="bg-[#FFFDF9] border border-[#EADBCE]/70 rounded-[28px] p-6 sm:p-10 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A50] mb-2 inline-block">
          Design Foundation
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2D2522] tracking-tight">
          Palette, Typography & Motion Tokens
        </h1>
        <p className="text-sm sm:text-base text-[#786B65] mt-2 max-w-3xl leading-relaxed">
          Grounding digital interfaces in milk-tinted pastels, warm espresso darks, and organic cubic-bezier springs. Click any token to copy its value to your clipboard.
        </p>
      </div>

      {/* 1. Palette: Morning Bakery & Wild Garden */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wider">Palette</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Morning Bakery & Wild Garden"
            </h2>
          </div>
          <PebbleBadge color="matcha">Zero Harsh Primary Glare</PebbleBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paletteTable.map((item) => (
            <div
              key={item.name}
              onClick={() => copyToClipboard(item.hex, item.name)}
              className="bg-[#FFFDF9] rounded-[22px] p-4 border border-[#EADBCE]/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div
                  className="w-full h-20 rounded-[16px] shadow-inner flex items-end p-2.5 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: item.hex }}
                >
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-[8px] ${
                      item.textDark ? 'bg-black/10 text-[#2D2522]' : 'bg-white/20 text-white'
                    }`}
                  >
                    {item.hex}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#786B65] uppercase tracking-wide">
                      {item.role}
                    </span>
                    {copiedToken === item.name && (
                      <span className="text-[10px] font-bold text-[#5BB98C] bg-[#E3F5EC] px-2 py-0.5 rounded-full animate-bounce">
                        Copied!
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#2D2522]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#786B65] mt-1 leading-relaxed">
                    {item.vibe}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Custom Typography Profile: Humanist Neo-Chubby */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8C7CFF] uppercase tracking-wider">Typography</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Humanist Neo-Chubby" Profile
            </h2>
          </div>
          <PebbleBadge color="berry">Wide Buoyant Counters</PebbleBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PebbleCard geometry="asymmetric" padded="lg" className="space-y-4">
            <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wider">Display / Headings</span>
            <h3 className="font-display text-3xl font-extrabold text-[#2D2522] tracking-tight leading-tight">
              Warm Morning Light on Hand-Molded Clay
            </h3>
            <p className="text-xs text-[#786B65] leading-relaxed">
              Gentle ink traps, subtly rounded stem terminals, oversized x-height, and wide smiling counter-spaces ('o', 'e', 'a') conveying welcoming honesty. Letter-spacing: <code className="text-[#2D2522]">-0.015em</code>.
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-[16px] border border-[#EADBCE]/60 text-xs font-mono text-[#2D2522]">
              font-family: 'Outfit', sans-serif;
            </div>
          </PebbleCard>

          <PebbleCard geometry="asymmetric-alt" padded="lg" className="space-y-4">
            <span className="text-xs font-bold text-[#5BB98C] uppercase tracking-wider">Body & UI Prose</span>
            <p className="font-body text-base text-[#2D2522] leading-relaxed">
              Clean, highly readable neo-grotesque with warm curved tails. Loose line-heights (<code className="text-[#2D2522]">1.6</code>) ensure long paragraphs feel breezy and unhurried.
            </p>
            <p className="text-xs text-[#786B65]">
              Numbers in tables and badges use tabular numerals (<code className="text-[#2D2522]">tabular-nums</code>) for rock-solid visual vertical alignment.
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-[16px] border border-[#EADBCE]/60 text-xs font-mono text-[#2D2522]">
              font-family: 'Plus Jakarta Sans', sans-serif;
            </div>
          </PebbleCard>
        </div>
      </section>

      {/* 3. Animation Language: The Signature Spring Curve */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wider">Physics</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Tactile Elasticity & Jelly Micro-Interactions"
            </h2>
          </div>
          <PebbleBadge color="clementine" doodle="ring">Mass & Inertia</PebbleBadge>
        </div>

        <PebbleCard geometry="asymmetric" padded="lg" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-[#2D2522]">
                The Signature Bezier Curve
              </h3>
              <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed">
                Kids love physical cause-and-effect. Poking dough deforms, bounces, and settles. Standard linear eases are banned; we enforce an energetic spring overshoot:
              </p>

              <div
                onClick={() => copyToClipboard('cubic-bezier(0.34, 1.56, 0.64, 1)', 'bezier')}
                className="p-3.5 bg-[#FAF7F2] rounded-[16px] border border-[#EADBCE] font-mono text-sm text-[#FF8A50] font-bold cursor-pointer hover:bg-[#F0EAE1] transition-colors flex items-center justify-between"
              >
                <span>cubic-bezier(0.34, 1.56, 0.64, 1)</span>
                <span className="text-xs text-[#786B65] font-normal">
                  {copiedToken === 'bezier' ? 'Copied!' : 'Click to copy'}
                </span>
              </div>

              <div className="flex gap-3">
                <PebbleButton
                  variant="clementine"
                  size="md"
                  onClick={() => {
                    setBounceActive(false);
                    setTimeout(() => setBounceActive(true), 10);
                  }}
                >
                  Test Spring Physics
                </PebbleButton>
              </div>
            </div>

            {/* Interactive Spring Motion Visualizer */}
            <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EADBCE]/70 flex flex-col items-center justify-center min-h-[220px]">
              <div className="relative w-48 h-32 flex items-center justify-center">
                {/* Visualizer Track */}
                <div className="w-full h-1 bg-[#E2D8CC] rounded-full absolute bottom-4" />

                {/* Bouncing Marshmallow Ball with smooth physics-accurate multi-phase bounce */}
                <div
                  onAnimationEnd={() => setBounceActive(false)}
                  className={`
                    w-16 h-16 rounded-full bg-[#FF8A50] text-[#FFFDF9] font-bold flex items-center justify-center
                    shadow-[0_8px_20px_rgba(255,138,80,0.35)] cursor-pointer select-none
                    ${bounceActive ? 'animate-ball-bounce' : 'hover:scale-105 active:scale-95 transition-transform'}
                  `}
                  onClick={() => {
                    setBounceActive(false);
                    setTimeout(() => setBounceActive(true), 10);
                  }}
                >
                  <span className="text-xs font-display font-bold">Squish!</span>
                </div>
              </div>
              <span className="text-xs text-[#786B65] mt-2">
                Simulates real mass, dough inertia & spring overshoot
              </span>
            </div>
          </div>
        </PebbleCard>
      </section>

      {/* 4. Warm Shadow Tinting Guidelines */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#786B65] uppercase tracking-wider">Lighting</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Warm Shadow Tinting (Never Black Opacity)
            </h2>
          </div>
          <PebbleBadge color="rice">Golden-Hour Occlusion</PebbleBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFFDF9] p-6 rounded-[24px] border border-[#EADBCE]/70 space-y-3">
            <div className="flex items-center gap-2 text-[#EE5D50] text-xs font-bold">
              <span>✕</span> Banned: Sterile Black Drops
            </div>
            <p className="text-xs text-[#786B65]">
              <code className="text-[#2D2522]">box-shadow: 0 10px 20px rgba(0,0,0,0.1)</code> creates sterile grey gloom, like an overcast office cubicle.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-[24px] border border-[#5BB98C]/40 space-y-3 shadow-pebble">
            <div className="flex items-center gap-2 text-[#5BB98C] text-xs font-bold">
              <span>✓</span> Pebble & Sunbeam Ambient Occlusion
            </div>
            <p className="text-xs text-[#786B65]">
              <code className="text-[#2D2522]">box-shadow: 0 10px 24px -4px rgba(92,60,40,0.07)</code>. Tinted with Oat Milk and Truffle for a warm, cozy room bathed in morning sunlight.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
