import React, { useState } from 'react';
import {
  PebbleButton,
  PebbleButtonVariant,
  PebbleButtonSize,
  PebbleCard,
  PebbleInput,
  PebbleToggle,
  PebbleCheckbox,
  PebbleModal,
  PebbleDropdown,
  PebbleProgressBar,
  PebbleSkeleton,
  PebbleSpinner,
  PebbleCallout,
  PebbleTooltip,
  PebbleBadge,
  playSliderTick,
  playMarshmallowSquish,
} from '../design-system';
import confetti from 'canvas-confetti';

export const PlaygroundView: React.FC = () => {
  // Playground state knobs
  const [btnVariant, setBtnVariant] = useState<PebbleButtonVariant>('clementine');
  const [btnSize, setBtnSize] = useState<PebbleButtonSize>('md');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnText, setBtnText] = useState('Fresh Sourdough');

  // Input state
  const [inputValue, setInputValue] = useState('Morning Cinnamon Brioche');
  const [inputError, setInputError] = useState('');
  const [shiverCount, setShiverCount] = useState(0);

  // Toggle & Checkbox
  const [toggleVal, setToggleVal] = useState(true);
  const [toggleColor, setToggleColor] = useState<'matcha' | 'clementine' | 'berry'>('matcha');
  const [checkVal1, setCheckVal1] = useState(true);
  const [checkVal2, setCheckVal2] = useState(false);

  // Dropdown
  const [dropdownVal, setDropdownVal] = useState('brioche');

  // Progress Bar
  const [progressVal, setProgressVal] = useState(68);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  // Celebrate
  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF8A50', '#5BB98C', '#8C7CFF', '#F5A623', '#FAF7F2'],
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Playground Header Banner */}
      <div className="bg-[#FFFDF9] border border-[#EADBCE]/70 rounded-[28px] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A50] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A50]">
                Interactive Sandbox
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2D2522] tracking-tight">
              Pebble & Sunbeam Playground
            </h1>
            <p className="text-xs sm:text-sm text-[#786B65] mt-1.5 max-w-2xl leading-relaxed">
              Tender Craft in motion: tap, squish, shiver, and toggle. Experience how continuous squircles, volumetric marshmallow offsets, and jelly easing banish digital glare.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <PebbleButton
              variant="matcha"
              size="md"
              onClick={triggerCelebration}
              icon={
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 6.6 6.6 2.4-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z"/>
                </svg>
              }
            >
              Test Matcha Confetti
            </PebbleButton>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Controls & Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Controls & Property Knobs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <PebbleCard geometry="asymmetric" padded="md" className="space-y-6">
            <div className="border-b border-[#F0EAE1] pb-3">
              <h3 className="font-display font-bold text-base text-[#2D2522]">
                Interactive Knobs & States
              </h3>
              <p className="text-xs text-[#786B65]">Tweak properties to observe organic micro-interactions</p>
            </div>

            {/* Button Knobs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                Button Variant
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['clementine', 'matcha', 'berry', 'butter', 'coral', 'chalk'] as PebbleButtonVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setBtnVariant(v)}
                    className={`
                      px-2.5 py-1.5 rounded-[12px] text-xs font-bold capitalize transition-all border
                      ${btnVariant === v
                        ? 'bg-[#2D2522] text-[#FAF7F2] border-[#2D2522] shadow-sm'
                        : 'bg-[#F0EAE1] text-[#786B65] border-[#E2D8CC] hover:text-[#2D2522]'
                      }
                    `}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Knobs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                Button Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['sm', 'md', 'lg'] as PebbleButtonSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setBtnSize(s)}
                    className={`
                      px-2.5 py-1.5 rounded-[12px] text-xs font-bold uppercase transition-all border
                      ${btnSize === s
                        ? 'bg-[#2D2522] text-[#FAF7F2] border-[#2D2522]'
                        : 'bg-[#F0EAE1] text-[#786B65] border-[#E2D8CC]'
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* State Toggles */}
            <div className="pt-2 border-t border-[#F0EAE1] space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                State Flags
              </label>
              <div className="flex flex-col gap-2.5">
                <PebbleCheckbox
                  checked={btnDisabled}
                  onChange={setBtnDisabled}
                  label="Chalk & Slumber (Disabled)"
                  subtext="Volumetric ridge flattens completely into surface"
                />
                <PebbleCheckbox
                  checked={btnLoading}
                  onChange={setBtnLoading}
                  label="Loading State"
                  subtext="Shows embedded spinning indicator"
                />
              </div>
            </div>

            {/* Shiver Error Trigger */}
            <div className="pt-2 border-t border-[#F0EAE1] space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                Validation Test
              </label>
              <div className="flex gap-2">
                <PebbleButton
                  variant="coral"
                  size="sm"
                  onClick={() => {
                    setInputError('A pinch more flour is needed!');
                    setShiverCount((c) => c + 1);
                  }}
                >
                  Trigger Jelly Shiver
                </PebbleButton>
                <PebbleButton
                  variant="butter"
                  size="sm"
                  onClick={() => setInputError('')}
                >
                  Clear Error
                </PebbleButton>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="pt-2 border-t border-[#F0EAE1] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#786B65]">
                <span>Progress Level</span>
                <span className="font-mono text-[#2D2522]">{progressVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progressVal}
                onChange={(e) => {
                  playSliderTick();
                  setProgressVal(Number(e.target.value));
                }}
                className="w-full accent-[#FF8A50] cursor-pointer"
              />
            </div>
          </PebbleCard>
        </div>

        {/* Right Column: Live Tactile Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Button Canvas */}
          <PebbleCard geometry="asymmetric-alt" padded="lg" className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div>
                <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wide">
                  Live Marshmallow Button
                </span>
                <h3 className="font-display font-bold text-lg text-[#2D2522]">
                  Tactile Volumetric Button
                </h3>
              </div>
              <PebbleBadge color="clementine" doodle="sparkle">
                3D Lower Ridge
              </PebbleBadge>
            </div>

            <div className="py-6 flex flex-col items-center justify-center gap-4 bg-[#FAF7F2] rounded-[24px] border border-[#EADBCE]/50 p-6 min-h-[160px]">
              <PebbleButton
                variant={btnVariant}
                size={btnSize}
                disabled={btnDisabled}
                loading={btnLoading}
                tooltipNotice="Unlock morning oven pass first"
                onClick={() => {
                  triggerCelebration();
                }}
              >
                {btnText}
              </PebbleButton>

              <p className="text-xs text-[#786B65] text-center max-w-sm">
                Press down and release. Notice the <span className="font-semibold text-[#2D2522]">scale(0.94)</span> sink and <span className="font-semibold text-[#2D2522]">scale(1.03)</span> elastic rebound.
              </p>
            </div>
          </PebbleCard>

          {/* Trench Input & Shiver Validation */}
          <PebbleCard geometry="asymmetric" padded="lg" className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div>
                <span className="text-xs font-bold text-[#EE5D50] uppercase tracking-wide">
                  Scooped Trench
                </span>
                <h3 className="font-display font-bold text-lg text-[#2D2522]">
                  Input Field & Playful Shiver
                </h3>
              </div>
              <PebbleBadge color="coral" doodle="ring">
                Elastic Shiver
              </PebbleBadge>
            </div>

            <PebbleInput
              label="Baking Batch Recipe"
              placeholder="e.g. Sourdough country loaf"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              error={inputError}
              triggerShiver={shiverCount > 0}
              helperText="Soft scooped trench with warm Steamed Rice well (#F0EAE1)"
              icon={
                <svg className="w-5 h-5 text-[#786B65]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              onClear={() => setInputValue('')}
            />
          </PebbleCard>

          {/* Wobble Bloom Toggle & Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PebbleCard geometry="squircle" padded="md" className="space-y-4">
              <span className="text-xs font-bold text-[#5BB98C] uppercase tracking-wide">
                Wobble Bloom Switch
              </span>
              <h4 className="font-display font-bold text-base text-[#2D2522]">
                Organic Motion Toggle
              </h4>
              <p className="text-xs text-[#786B65]">
                Switch head stretches horizontally (<code className="text-[#2D2522]">scaleX(1.25)</code>) and pops with spring inertia.
              </p>

              <div className="pt-2">
                <PebbleToggle
                  checked={toggleVal}
                  onChange={setToggleVal}
                  color={toggleColor}
                  label={toggleVal ? 'Warm Oven Active' : 'Oven Resting'}
                  description="Preheated at 220°C"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#F0EAE1]">
                {(['matcha', 'clementine', 'berry'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setToggleColor(c)}
                    className={`px-2 py-1 rounded-[8px] text-[11px] font-bold capitalize ${toggleColor === c ? 'bg-[#2D2522] text-[#FAF7F2]' : 'bg-[#F0EAE1] text-[#786B65]'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </PebbleCard>

            <PebbleCard geometry="squircle" padded="md" className="space-y-4">
              <span className="text-xs font-bold text-[#8C7CFF] uppercase tracking-wide">
                Detached Confectionery Tray
              </span>
              <h4 className="font-display font-bold text-base text-[#2D2522]">
                180° Backflip Chevron
              </h4>
              <p className="text-xs text-[#786B65]">
                Trigger has scooped trench; circular chevron backflips 180° on open.
              </p>

              <PebbleDropdown
                label="Select Morning Pastry"
                value={dropdownVal}
                onChange={setDropdownVal}
                options={[
                  { value: 'brioche', label: 'Honeycomb Brioche', hint: '$4.50' },
                  { value: 'sourdough', label: 'Sea Salt Sourdough', hint: '$6.00' },
                  { value: 'matcha', label: 'Cardamom Matcha Bun', hint: '$4.80' },
                  { value: 'tart', label: 'Berry Cream Tart', hint: '$5.20' },
                ]}
              />
            </PebbleCard>
          </div>

          {/* Progress Bar & Spinners */}
          <PebbleCard geometry="asymmetric" padded="lg" className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div>
                <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wide">
                  Rhythmic Loading
                </span>
                <h3 className="font-display font-bold text-lg text-[#2D2522]">
                  Dugout Progress & Squishy Dough Drop
                </h3>
              </div>
              <PebbleBadge color="honeycomb" doodle="dot">
                Organic Physics
              </PebbleBadge>
            </div>

            <PebbleProgressBar
              progress={progressVal}
              label="Morning Hearth Fermentation"
              sublabel="Deep dugout track (12px height) with animated candy-striping and trailing glow bead"
              color="clementine"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0EAE1]">
              <div className="bg-[#FAF7F2] p-4 rounded-[20px] flex flex-col items-center justify-center min-h-[140px]">
                <PebbleSpinner size="md" color="clementine" label="Squishy Dough Drop" />
                <span className="text-[11px] text-[#786B65] mt-2 text-center">
                  Morphs between sphere, egg, and squashed oval
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-[20px] flex flex-col justify-center space-y-2.5">
                <span className="text-xs font-bold text-[#786B65]">Breathing Pebble (Skeleton):</span>
                <PebbleSkeleton variant="title" />
                <PebbleSkeleton variant="text" />
                <PebbleSkeleton variant="text" width="65%" />
                <span className="text-[11px] text-[#786B65] mt-1">
                  1.8s calming ambient sunbeam sweep
                </span>
              </div>
            </div>
          </PebbleCard>

          {/* Modal Demo Button */}
          <div className="flex justify-center p-4 bg-[#FFFDF9] rounded-[24px] border border-[#EADBCE]/70">
            <PebbleButton
              variant="clementine"
              size="lg"
              onClick={() => setModalOpen(true)}
              icon={
                <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              }
            >
              Open "Golden Dim" Modal & Sheet
            </PebbleButton>
          </div>
        </div>
      </div>

      {/* Modal & Sheet Demonstration */}
      <PebbleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Artisan Bakery Box"
        subtitle="A cozy peek inside your freshly baked selection"
        footer={
          <>
            <PebbleButton variant="butter" size="sm" onClick={() => setModalOpen(false)}>
              Keep Browsing
            </PebbleButton>
            <PebbleButton
              variant="clementine"
              size="sm"
              onClick={() => {
                setModalOpen(false);
                triggerCelebration();
              }}
            >
              Confirm Order
            </PebbleButton>
          </>
        }
      >
        <div className="space-y-4">
          <PebbleCallout
            variant="honeycomb"
            title="Warm Morning Delivery"
            description="All loaves are delivered in beeswax wrap with sourdough starter instructions."
          />

          <div className="bg-[#FAF7F2] p-4 rounded-[20px] space-y-2 border border-[#EADBCE]/50">
            <div className="flex justify-between text-sm font-bold text-[#2D2522]">
              <span>Sea Salt Oat Sourdough</span>
              <span>$6.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2D2522]">
              <span>Honeycomb Brioche (2x)</span>
              <span>$9.00</span>
            </div>
            <div className="border-t border-[#E2D8CC] pt-2 flex justify-between font-bold text-[#2D2522]">
              <span>Total</span>
              <span className="text-[#FF8A50]">$15.00</span>
            </div>
          </div>

          <p className="text-xs text-[#786B65]">
            Notice the <span className="font-semibold text-[#2D2522]">Golden Dim</span> cocoa backdrop blur (<code className="text-[#2D2522]">rgba(45,37,34,0.35)</code>) and plump 36px squircle radius!
          </p>
        </div>
      </PebbleModal>
    </div>
  );
};
