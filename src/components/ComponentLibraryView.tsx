import React, { useState } from 'react';
import {
  PebbleButton,
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
  PebbleEmptyState,
} from '../design-system';

export const ComponentLibraryView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownVal, setDropdownVal] = useState('tea');
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      {/* Intro Hero */}
      <div className="bg-[#FFFDF9] border border-[#EADBCE]/70 rounded-[28px] p-6 sm:p-10 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A50] mb-2 inline-block">
          Specification Catalog
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2D2522] tracking-tight">
          Pebble & Sunbeam Component Anatomy
        </h1>
        <p className="text-sm sm:text-base text-[#786B65] mt-2 max-w-3xl leading-relaxed">
          The complete architectural system. Squircles, asymmetric continuous curvature, marshmallow depth, and morning bakery warmth designed to feel like tactile wooden and clay objects.
        </p>
      </div>

      {/* 1. Shape Language: Squircles & Asymmetric Cards */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wider">01. Geometry</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Squircles & Asymmetric Accent Cards
            </h2>
          </div>
          <PebbleBadge color="clementine" doodle="sparkle">Continuous Curvature</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Standard 12px radii look robotic. Pebble & Sunbeam adopts continuous superellipses and diagonal corner asymmetry (Top-Left: 28px, Top-Right: 18px, Bottom-Right: 28px, Bottom-Left: 14px) mimicking hand-sanded sea pebbles and paper cutouts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Primary Asymmetric */}
          <PebbleCard geometry="asymmetric" padded="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF8A50]">Primary Diagonal Asymmetry</span>
              <span className="text-[11px] font-mono text-[#786B65]">28 / 18 / 28 / 14</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#2D2522]">Hand-Sanded Sea Pebble</h3>
            <p className="text-xs text-[#786B65]">
              Subtle diagonal differences trigger the playful, handcrafted impression of clay tiles without breaking layout alignment.
            </p>
            <div className="pt-2">
              <PebbleBadge color="rice">Subtle Playfulness</PebbleBadge>
            </div>
          </PebbleCard>

          {/* Card 2: Alt Asymmetric */}
          <PebbleCard geometry="asymmetric-alt" padded="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5BB98C]">Inverse Asymmetry</span>
              <span className="text-[11px] font-mono text-[#786B65]">18 / 28 / 14 / 28</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#2D2522]">Balanced Mirroring</h3>
            <p className="text-xs text-[#786B65]">
              Provides rhythm across adjacent grid columns so cards do not feel like robotic identical clones.
            </p>
            <div className="pt-2">
              <PebbleBadge color="matcha">Rhythmic Flow</PebbleBadge>
            </div>
          </PebbleCard>

          {/* Card 3: Deep Plump Squircle */}
          <PebbleCard geometry="squircle-lg" padded="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7CFF]">Continuous Squircle</span>
              <span className="text-[11px] font-mono text-[#786B65]">28px Continuous</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#2D2522]">Soft Molded Clay</h3>
            <p className="text-xs text-[#786B65]">
              Rounded without abrupt tangent transitions, framing content with peaceful tactile warmth.
            </p>
            <div className="pt-2">
              <PebbleBadge color="berry">Calm & Cozy</PebbleBadge>
            </div>
          </PebbleCard>
        </div>
      </section>

      {/* 2. Marshmallow Buttons & Tactile Offsets */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF8A50] uppercase tracking-wider">02. Controls</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Volumetric "Marshmallow" Buttons
            </h2>
          </div>
          <PebbleBadge color="clementine" doodle="ring">Pseudo-3D Offset</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Buttons avoid harsh black drop shadows. They feature a soft, tinted lower-edge ridge (2px to 4px pseudo-3D offset) and a signature Squish & Release animation (<code className="text-[#2D2522]">scale(0.94)</code> on press, <code className="text-[#2D2522]">scale(1.03)</code> rebound on release).
        </p>

        <PebbleCard geometry="asymmetric" padded="lg" className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <PebbleButton variant="clementine" size="md">Clementine Pop</PebbleButton>
            <PebbleButton variant="matcha" size="md">Matcha Leaf</PebbleButton>
            <PebbleButton variant="berry" size="md">Berry Cream</PebbleButton>
            <PebbleButton variant="butter" size="md">Sweet Butter</PebbleButton>
            <PebbleButton variant="coral" size="md">Spiced Coral</PebbleButton>
            <PebbleButton variant="chalk" size="md" disabled tooltipNotice="Resting until unlocked">
              Chalk & Slumber
            </PebbleButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0EAE1]">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2D2522]">Small (min 40px)</span>
              <p className="text-xs text-[#786B65]">Compact badges & toolbars</p>
              <div className="pt-1">
                <PebbleButton variant="clementine" size="sm">Small Action</PebbleButton>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2D2522]">Medium (min 46px)</span>
              <p className="text-xs text-[#786B65]">Standard primary controls</p>
              <div className="pt-1">
                <PebbleButton variant="matcha" size="md">Medium Action</PebbleButton>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2D2522]">Large (min 52px)</span>
              <p className="text-xs text-[#786B65]">Hero & checkout CTAs</p>
              <div className="pt-1">
                <PebbleButton variant="berry" size="lg">Hero Action</PebbleButton>
              </div>
            </div>
          </div>
        </PebbleCard>
      </section>

      {/* 3. Input Bars & Scooped Trenches */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#EE5D50] uppercase tracking-wider">03. Fields</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Soft Scooped Trench Inputs
            </h2>
          </div>
          <PebbleBadge color="coral" doodle="dot">Gentle Shiver</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Deep 20px squircle radius with a warm slightly darker cream background (#F0EAE1 Steamed Rice) gently pressed into the surface like a shallow pocket. Validation errors trigger a rapid, elastic jelly shiver (3 shakes over 250ms with ±1.5° rotation) rather than an aggressive red flash.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PebbleCard geometry="squircle" padded="md" className="space-y-4">
            <h4 className="font-display font-bold text-sm text-[#2D2522]">Resting & Focused Trench</h4>
            <PebbleInput
              label="Recipient Name"
              placeholder="e.g. Clara Meadowbrook"
              helperText="Inset shadow creates a physical pocket depth"
              defaultValue="Clara Meadowbrook"
            />
            <PebbleInput
              label="Morning Pickup Note"
              placeholder="Leave beside bakery door..."
              defaultValue="Please slice into 12 slices"
            />
          </PebbleCard>

          <PebbleCard geometry="squircle" padded="md" className="space-y-4">
            <h4 className="font-display font-bold text-sm text-[#2D2522]">Validation Shiver State</h4>
            <PebbleInput
              label="Postal Code (Validation Test)"
              defaultValue="ABC"
              error="Postal code must be 5 digits (e.g. 94102)"
              triggerShiver={true}
            />
            <div className="p-3 bg-[#FDF2F0] rounded-[16px] border border-[#EE5D50]/30 text-xs text-[#786B65]">
              <strong className="text-[#EE5D50]">Playful Shiver:</strong> Notice the gentle ±1.5° rotation and soft coral border bloom guiding the user like a patient friend.
            </div>
          </PebbleCard>
        </div>
      </section>

      {/* 4. Wobble Bloom Toggles & Checkboxes */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#5BB98C] uppercase tracking-wider">04. Switches</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Wobble Bloom" Toggles & Checkboxes
            </h2>
          </div>
          <PebbleBadge color="matcha" doodle="sparkle">Tactile Elasticity</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Cause-and-effect in physical objects: toggles stretch horizontally on transition (<code className="text-[#2D2522]">scaleX(1.2)</code>) before blooming into a circle with an energetic jiggle. Checkboxes bloom with a bouncy matcha checkmark.
        </p>

        <PebbleCard geometry="asymmetric" padded="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-[#2D2522]">Wobble Bloom Switches</h4>
              <div className="space-y-3">
                <PebbleToggle
                  checked={toggle1}
                  onChange={setToggle1}
                  color="matcha"
                  label="Artisan Sourdough Starter"
                  description="Feed daily with warm spring water"
                />
                <PebbleToggle
                  checked={toggle2}
                  onChange={setToggle2}
                  color="clementine"
                  label="Golden Sunbeam Toasting"
                  description="Double baked for crisp crust"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-[#2D2522]">Squircle Checkboxes</h4>
              <div className="space-y-3">
                <PebbleCheckbox
                  checked={check1}
                  onChange={setCheck1}
                  color="matcha"
                  label="Biodegradable Beeswax Wrap"
                  subtext="Keeps moisture sealed for 5 days"
                />
                <PebbleCheckbox
                  checked={check2}
                  onChange={setCheck2}
                  color="berry"
                  label="Pantry Recipe Cards"
                  subtext="Includes morning brioche secrets"
                />
              </div>
            </div>
          </div>
        </PebbleCard>
      </section>

      {/* 5. Modals, Sheets & Floating Trays */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8C7CFF] uppercase tracking-wider">05. Overlays</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Golden Dim" Modals & Pebble Notches
            </h2>
          </div>
          <PebbleBadge color="berry">Cozy Lunchbox</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Backdrop uses warm cocoa tint (<code className="text-[#2D2522]">rgba(45,37,34,0.35)</code>) with heavy blur. Desktop modals float as plump 36px squircles; mobile views transform into bottom sheets with an indented pebble notch carved into the rim.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PebbleCard geometry="squircle" padded="md" className="space-y-4">
            <h4 className="font-display font-bold text-sm text-[#2D2522]">Interactive Modal Dialog</h4>
            <p className="text-xs text-[#786B65]">
              Arrives with slight anticipation recoil: popping in at scale(0.92) and springing up with cheerful overshoot.
            </p>
            <PebbleButton variant="clementine" size="md" onClick={() => setModalOpen(true)}>
              Launch Golden Dim Modal
            </PebbleButton>
          </PebbleCard>

          <PebbleCard geometry="squircle" padded="md" className="space-y-4">
            <h4 className="font-display font-bold text-sm text-[#2D2522]">Floating Dropdown Tray</h4>
            <p className="text-xs text-[#786B65]">
              Detached 8px floating gap, internal confectionery spacing, and 180° backflipping chevron.
            </p>
            <PebbleDropdown
              value={dropdownVal}
              onChange={setDropdownVal}
              options={[
                { value: 'tea', label: 'Herbal Mint Tea', hint: 'Matcha infusion' },
                { value: 'coffee', label: 'Dark Truffle Roast', hint: 'Espresso blend' },
                { value: 'milk', label: 'Oat Milk Pitcher', hint: 'Steamed warm' },
              ]}
            />
          </PebbleCard>
        </div>
      </section>

      {/* 6. Progress & Loading: Breathing Pebble & Squishy Dough Drop */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider">06. Motion States</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Loading: Breathing Pebble & Dough Drop
            </h2>
          </div>
          <PebbleBadge color="honeycomb" doodle="ring">1.8s Pulse</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          No sterile grey spinners. Waiting feels rhythmic and relaxing, like baking dough or watching ripples in a puddle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Squishy Dough Drop */}
          <PebbleCard geometry="asymmetric" padded="md" className="flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs font-bold text-[#FF8A50]">Squishy Dough Drop</span>
            <PebbleSpinner size="lg" color="clementine" />
            <p className="text-xs text-[#786B65]">
              Compresses on floor contact (<code className="text-[#2D2522]">scale(1.2, 0.8)</code>), then shoots up elongated (<code className="text-[#2D2522]">scale(0.85, 1.15)</code>).
            </p>
          </PebbleCard>

          {/* Breathing Pebble Skeleton */}
          <PebbleCard geometry="asymmetric-alt" padded="md" className="space-y-3">
            <span className="text-xs font-bold text-[#5BB98C]">Breathing Pebble Skeleton</span>
            <div className="space-y-2 pt-2">
              <PebbleSkeleton variant="badge" />
              <PebbleSkeleton variant="title" />
              <PebbleSkeleton variant="text" />
              <PebbleSkeleton variant="text" width="80%" />
            </div>
            <p className="text-xs text-[#786B65] pt-2">
              Steamed Rice squircle placeholder with warm buttery sunbeam sweep across a 1.8s breathing cycle.
            </p>
          </PebbleCard>

          {/* Dugout Track Progress */}
          <PebbleCard geometry="squircle" padded="md" className="space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#8C7CFF]">Dugout Progress Track</span>
              <p className="text-xs text-[#786B65] mt-1 mb-4">
                Height: 12px, border-radius: 999px, candy-striping, trailing glow bead.
              </p>
              <PebbleProgressBar progress={72} label="Proving Chamber" color="clementine" />
              <div className="mt-3">
                <PebbleProgressBar progress={45} label="Oven Heat" color="matcha" />
              </div>
            </div>
            <PebbleBadge color="rice">Continuous Feedback</PebbleBadge>
          </PebbleCard>
        </div>
      </section>

      {/* 7. Error, Warning, Success & Notice Callouts */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#EE5D50] uppercase tracking-wider">07. Feedback</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              Gentle Guidance & Notice Badges
            </h2>
          </div>
          <PebbleBadge color="coral" doodle="sparkle">Gentle Colors</PebbleBadge>
        </div>
        <p className="text-xs sm:text-sm text-[#786B65] leading-relaxed max-w-3xl">
          Never shout in violent #FF0000. Errors guide gently like an observant friend. Uses Wild Persimmon / Spiced Coral (#EE5D50), Honeycomb Yellow (#F5A623), and Matcha Leaf (#5BB98C) with friendly hand-drawn iconography.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PebbleCallout
            variant="coral"
            title="Slight Temperature Dip"
            description="The oven door was opened during preheat. Add 3 minutes to fermentation time."
          />
          <PebbleCallout
            variant="honeycomb"
            title="Fresh Batch in 15 Minutes"
            description="Country sourdough is browning nicely. You will receive a warm bakery chime."
          />
          <PebbleCallout
            variant="matcha"
            title="Golden Loaf Perfected"
            description="Crust reached optimal caramelization. Crumb is airy and tender."
          />
        </div>
      </section>

      {/* 8. Paper Note Tooltips & Clean Canvas Empty States */}
      <section className="space-y-4">
        <div className="border-b border-[#EADBCE]/80 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#786B65] uppercase tracking-wider">08. Finishing Touches</span>
            <h2 className="font-display text-2xl font-bold text-[#2D2522]">
              "Paper Notes" & "Clean Canvas"
            </h2>
          </div>
          <PebbleBadge color="rice">Micro Polish</PebbleBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <PebbleCard geometry="squircle" padded="lg" className="space-y-6 text-center">
            <span className="text-xs font-bold text-[#786B65] uppercase tracking-wide">
              Paper Note Tooltips
            </span>
            <p className="text-xs text-[#786B65] max-w-xs mx-auto">
              Teeny floating speech pills with a soft triangular beak and Dark Truffle background inflating like a tiny bubble.
            </p>

            <div className="flex justify-center gap-4 py-4">
              <PebbleTooltip content="Harvested at sunrise">
                <PebbleButton variant="butter" size="sm">Hover for Paper Note</PebbleButton>
              </PebbleTooltip>

              <PebbleTooltip content="Milled from whole spelt">
                <PebbleButton variant="matcha" size="sm">Flour Heritage</PebbleButton>
              </PebbleTooltip>
            </div>
          </PebbleCard>

          <PebbleEmptyState
            title="A Quiet Corner..."
            description="All morning orders are tucked away in their linen baskets. Nothing left to do but watch the sunbeam dance."
            actionText="Bake New Batch"
            onAction={() => alert('New artisan batch prepared!')}
          />
        </div>
      </section>

      {/* Modal Dialog Instance */}
      <PebbleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Pebble & Sunbeam Modal"
        subtitle="36px continuous squircle with Golden Dim cocoa blur"
        footer={
          <PebbleButton variant="clementine" size="sm" onClick={() => setModalOpen(false)}>
            Close Modal
          </PebbleButton>
        }
      >
        <p className="text-sm text-[#786B65] leading-relaxed">
          This modal demonstrates the Tender Craft spatial atmosphere. The 2px semi-translucent warm border <code className="text-[#2D2522]">rgba(255,255,255,0.6)</code> captures morning ambient light, and the cocoa dim keeps the room feeling welcoming.
        </p>
      </PebbleModal>
    </div>
  );
};
