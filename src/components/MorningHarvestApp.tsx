import React, { useState } from 'react';
import {
  PebbleButton,
  PebbleCard,
  PebbleInput,
  PebbleToggle,
  PebbleCheckbox,
  PebbleModal,
  PebbleProgressBar,
  PebbleSpinner,
  PebbleCallout,
  PebbleBadge,
  PebbleTooltip,
  playMatchaChime,
  playStepperClick,
  playTabSwitch,
  playShiver,
} from '../design-system';
import confetti from 'canvas-confetti';

interface BakeryItem {
  id: string;
  name: string;
  category: 'bread' | 'brioche' | 'pastry' | 'pantry';
  price: number;
  description: string;
  dietary: string;
  badgeColor: 'clementine' | 'matcha' | 'berry' | 'honeycomb';
  bakingTime: string;
  iconSvg: React.ReactNode;
}

const BAKERY_ITEMS: BakeryItem[] = [
  {
    id: 'sourdough',
    name: 'Sea Salt Oat Sourdough',
    category: 'bread',
    price: 6.50,
    description: '36-hour slow fermentation with rolled organic oats and Maldon crystal salt. Crisp caramel crust.',
    dietary: 'Wild Sourdough · Vegan',
    badgeColor: 'clementine',
    bakingTime: 'Sunrise Batch 6:00 AM',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF8A50]">
        <path d="M12 4C7 4 3 8 3 13c0 4 3.5 7 9 7s9-3 9-7c0-5-4-9-9-9zm-4 9c0-1 .5-2 1.5-2.5.8.6 1.5 1.5 1.5 2.5s-.7 2-1.5 2.5C8.5 15 8 14 8 13zm7 0c0-1-.5-2-1.5-2.5-.8.6-1.5 1.5-1.5 2.5s.7 2 1.5 2.5c1-.5 1.5-1.5 1.5-2.5z" />
      </svg>
    ),
  },
  {
    id: 'brioche',
    name: 'Honeycomb Sunbeam Brioche',
    category: 'brioche',
    price: 4.80,
    description: 'Puffed golden dough folded with raw wildflower honeycomb butter and Madagascar vanilla sugar.',
    dietary: 'Sweet Butter · Raw Honey',
    badgeColor: 'honeycomb',
    bakingTime: 'Sunrise Batch 6:30 AM',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#F5A623]">
        <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5l3-5z" />
      </svg>
    ),
  },
  {
    id: 'matcha-twist',
    name: 'Cardamom Matcha Swirl',
    category: 'pastry',
    price: 5.20,
    description: 'First-harvest Uji matcha cream swirled with crushed organic green cardamom pods and almond glaze.',
    dietary: 'Uji Matcha · Stone-ground',
    badgeColor: 'matcha',
    bakingTime: 'Fresh 7:00 AM',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#5BB98C]">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
      </svg>
    ),
  },
  {
    id: 'berry-tart',
    name: 'Wild Berry Cream Galette',
    category: 'pastry',
    price: 5.60,
    description: 'Rustic hand-pleated spelt crust bursting with mountain blueberries, blackberries, and vanilla mascarpone.',
    dietary: 'Spelt Flour · Berries',
    badgeColor: 'berry',
    bakingTime: 'Fresh 7:30 AM',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#8C7CFF]">
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="2" fill="#FAF7F2" />
        <circle cx="14" cy="14" r="2" fill="#FAF7F2" />
      </svg>
    ),
  },
  {
    id: 'rye-loaf',
    name: 'Heritage Sprouted Rye',
    category: 'bread',
    price: 7.00,
    description: 'Dark, earthy caraway rye with dense crumb, wholesome roasted sunflower seeds, and golden flax.',
    dietary: 'High Fiber · Seeded',
    badgeColor: 'clementine',
    bakingTime: 'Sunrise Batch 6:00 AM',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF8A50]">
        <path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.88V20h2.34v-1.12c3.31-.54 5.83-3.41 5.83-6.88z" />
      </svg>
    ),
  },
  {
    id: 'honey-butter',
    name: 'Cultured Honey Butter Jar',
    category: 'pantry',
    price: 8.50,
    description: 'Slow-churned grass-fed cream whipped with mountain clover honey and smoked sea salt crystals.',
    dietary: 'Grass-fed · Small Batch',
    badgeColor: 'honeycomb',
    bakingTime: 'Pantry Ready',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#F5A623]">
        <path d="M5 6h14v2H5V6zm2 4h10v10H7V10z" />
      </svg>
    ),
  },
];

export const MorningHarvestApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({
    sourdough: 1,
    brioche: 2,
  });
  const [isLinenWrap, setIsLinenWrap] = useState(true);
  const [isPreSliced, setIsPreSliced] = useState(false);
  const [pickupNote, setPickupNote] = useState('Please pack in morning sunshine basket');
  const [noteError, setNoteError] = useState('');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Cart operations
  const updateQty = (id: string, delta: number) => {
    playStepperClick(delta > 0);
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartTotalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = BAKERY_ITEMS.find((i) => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Reward progress: Free Morning Cinnamon Twist at $25
  const rewardThreshold = 25;
  const rewardProgress = Math.min(100, (cartSubtotal / rewardThreshold) * 100);

  // Filter items
  const filteredItems = BAKERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (!pickupNote.trim()) {
      playShiver();
      setNoteError('Please provide a gentle pickup note or name');
      return;
    }
    setNoteError('');
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      playMatchaChime();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#5BB98C', '#FF8A50', '#8C7CFF', '#F5A623', '#FAF7F2'],
      });
    }, 1400);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Bakery Hero Banner */}
      <div className="bg-[#FFFDF9] border border-[#EADBCE]/70 squircle-asym p-6 sm:p-10 shadow-pebble flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-left">
          <div className="flex items-center gap-2 mb-2">
            <PebbleBadge color="honeycomb" doodle="sparkle">Morning Hearth</PebbleBadge>
            <span className="text-xs text-[#786B65] font-semibold">Oven Fire at 5:00 AM</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2D2522] tracking-tight">
            Morning Harvest Bakery & Pantry
          </h1>
          <p className="text-sm text-[#786B65] mt-2 leading-relaxed">
            Slow wild sourdoughs, golden honeycomb brioches, and stone-ground matcha pastries molded with tender craft and baked in morning sunlight.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <PebbleButton
              variant="clementine"
              size="md"
              onClick={() => setCartModalOpen(true)}
              icon={
                <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
            >
              View Bakery Basket ({cartTotalCount})
            </PebbleButton>

            <span className="text-xs text-[#786B65] font-semibold">
              Free delivery on orders over $25
            </span>
          </div>
        </div>

        {/* Tactile Bakery Basket Progress Widget */}
        <div className="w-full md:w-80 bg-[#FAF7F2] p-5 rounded-[24px] border border-[#EADBCE]/80 shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D2522]">Complimentary Treat</span>
            <span className="text-xs font-mono font-bold text-[#FF8A50]">
              ${cartSubtotal.toFixed(2)} / $25.00
            </span>
          </div>

          <PebbleProgressBar
            progress={rewardProgress}
            color="matcha"
            showPercentage={false}
          />

          <p className="text-[11px] text-[#786B65] leading-tight">
            {cartSubtotal >= rewardThreshold
              ? '🎉 Unlocked! A warm Cinnamon Brioche will be placed in your basket!'
              : `Add $${(rewardThreshold - cartSubtotal).toFixed(2)} more to unlock a complimentary morning pastry.`
            }
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F0EAE1] rounded-[20px] border border-[#E2D8CC] overflow-x-auto">
          {[
            { id: 'all', label: 'All Breads & Pastries' },
            { id: 'bread', label: 'Sourdough Loaves' },
            { id: 'brioche', label: 'Sweet Brioche' },
            { id: 'pastry', label: 'Matcha & Fruit' },
            { id: 'pantry', label: 'Pantry Jars' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playTabSwitch();
                  setSelectedCategory(cat.id);
                }}
                className={`
                  px-3.5 py-2 text-xs font-bold rounded-[16px] whitespace-nowrap transition-all duration-180
                  ${isActive
                    ? 'bg-[#FFFDF9] text-[#2D2522] shadow-[0_2px_6px_rgba(92,60,40,0.08)] border border-[#EADBCE]'
                    : 'text-[#786B65] hover:text-[#2D2522]'
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Trench */}
        <div className="w-full sm:w-72">
          <PebbleInput
            placeholder="Search sourdough, matcha..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            icon={
              <svg className="w-4 h-4 text-[#786B65]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Bakery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const qty = cart[item.id] || 0;
          const isEven = index % 2 === 0;

          return (
            <PebbleCard
              key={item.id}
              geometry={isEven ? 'asymmetric' : 'asymmetric-alt'}
              padded="md"
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-[18px] bg-[#FAF7F2] border border-[#EADBCE]/80 flex items-center justify-center shrink-0 shadow-sm">
                    {item.iconSvg}
                  </div>

                  <div className="text-right">
                    <span className="font-display text-lg font-extrabold text-[#2D2522]">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="text-[11px] font-mono text-[#786B65]">{item.bakingTime}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-[#2D2522] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#786B65] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-1">
                  <PebbleBadge color={item.badgeColor} doodle="dot">
                    {item.dietary}
                  </PebbleBadge>
                </div>
              </div>

              {/* Action Stepper Row */}
              <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                {qty === 0 ? (
                  <PebbleButton
                    variant="butter"
                    size="sm"
                    className="w-full"
                    onClick={() => updateQty(item.id, 1)}
                    icon={
                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    }
                  >
                    Add to Basket
                  </PebbleButton>
                ) : (
                  <div className="w-full flex items-center justify-between bg-[#F0EAE1] p-1 rounded-[18px] border border-[#E2D8CC]">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-8 h-8 rounded-[12px] bg-[#FFFDF9] text-[#2D2522] font-bold text-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <span className="font-display font-bold text-sm text-[#2D2522] px-2">
                      {qty} in basket
                    </span>

                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-8 h-8 rounded-[12px] bg-[#FF8A50] text-[#FFFDF9] font-bold text-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </PebbleCard>
          );
        })}
      </div>

      {/* Floating Bottom Basket Bar for Mobile & Touch Ergonomics */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30 max-w-lg mx-auto">
          <div className="bg-[#2D2522] text-[#FAF7F2] p-4 rounded-[28px] shadow-[0_12px_32px_rgba(45,37,34,0.35)] flex items-center justify-between gap-4 animate-sprout">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#FF8A50] text-[#2D2522] font-display font-extrabold text-sm flex items-center justify-center">
                {cartTotalCount}
              </span>
              <div>
                <span className="text-xs font-semibold text-[#E2D8CC] block">Morning Basket</span>
                <span className="font-display font-bold text-sm text-white">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <PebbleButton
              variant="clementine"
              size="sm"
              onClick={() => setCartModalOpen(true)}
            >
              Checkout Now
            </PebbleButton>
          </div>
        </div>
      )}

      {/* Checkout Modal & Bottom Sheet */}
      <PebbleModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        title={orderConfirmed ? 'Order Confirmed!' : 'Morning Basket Checkout'}
        subtitle={orderConfirmed ? 'Warm pastries are being packed' : 'Review your fresh items and preferences'}
        footer={
          orderConfirmed ? (
            <PebbleButton
              variant="clementine"
              size="md"
              className="w-full"
              onClick={() => {
                setOrderConfirmed(false);
                setCart({});
                setCartModalOpen(false);
              }}
            >
              Back to Morning Pantry
            </PebbleButton>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <PebbleButton
                variant="butter"
                size="sm"
                onClick={() => setCartModalOpen(false)}
              >
                Keep Shopping
              </PebbleButton>

              <PebbleButton
                variant="clementine"
                size="md"
                loading={isCheckingOut}
                disabled={isCheckingOut || cartTotalCount === 0}
                onClick={handleCheckout}
              >
                {isCheckingOut ? 'Baking in Progress...' : `Complete Order ($${cartSubtotal.toFixed(2)})`}
              </PebbleButton>
            </div>
          )
        }
      >
        {orderConfirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E3F5EC] text-[#5BB98C] mx-auto flex items-center justify-center shadow-inner">
              <svg className="w-8 h-8 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="font-display text-xl font-extrabold text-[#2D2522]">
              Freshly Baked with Care
            </h3>
            <p className="text-xs text-[#786B65] max-w-sm mx-auto leading-relaxed">
              Your order has been received at the hearth. Your loaf will be wrapped in linen paper and prepared for your morning pick-up.
            </p>

            <PebbleCallout
              variant="matcha"
              title="Complimentary Treat Included"
              description="A warm Honeycomb Brioche twist was added to your parcel as a morning gift!"
            />
          </div>
        ) : isCheckingOut ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <PebbleSpinner size="lg" color="clementine" label="Proving and Wrapping..." />
            <p className="text-xs text-[#786B65] text-center max-w-xs">
              Molding the dough and sending your batch to the hearth ovens...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basket items list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                Selected Items
              </h4>

              {Object.keys(cart).length === 0 ? (
                <p className="text-xs text-[#786B65] italic py-4">Your basket is resting empty.</p>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = BAKERY_ITEMS.find((i) => i.id === id);
                  if (!item) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-[18px] border border-[#EADBCE]/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-[12px] bg-[#FFFDF9] flex items-center justify-center shrink-0">
                          {item.iconSvg}
                        </span>
                        <div>
                          <span className="font-display font-bold text-sm text-[#2D2522] block">
                            {item.name}
                          </span>
                          <span className="text-xs text-[#786B65]">
                            ${item.price.toFixed(2)} × {qty}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(id, -1)}
                          className="w-7 h-7 rounded-full bg-[#E2D8CC] text-[#2D2522] text-xs font-bold hover:bg-[#D5C9BB]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#2D2522] w-5 text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(id, 1)}
                          className="w-7 h-7 rounded-full bg-[#FF8A50] text-[#FFFDF9] text-xs font-bold hover:bg-[#e5692a]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Customization Toggles */}
            <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#786B65]">
                Tender Craft Options
              </h4>
              <div className="space-y-2">
                <PebbleToggle
                  checked={isLinenWrap}
                  onChange={setIsLinenWrap}
                  color="matcha"
                  label="Linen Beeswax Wrap"
                  description="Sustainable zero-plastic insulation keep crust crisp"
                />
                <PebbleToggle
                  checked={isPreSliced}
                  onChange={setIsPreSliced}
                  color="clementine"
                  label="Warm Hearth Slicing"
                  description="Pre-sliced into 12 even morning breakfast slices"
                />
              </div>
            </div>

            {/* Pickup Note Scoop Trench */}
            <div className="space-y-2 pt-2 border-t border-[#F0EAE1]">
              <PebbleInput
                label="Pickup Instruction Note"
                value={pickupNote}
                onChange={(e) => setPickupNote(e.target.value)}
                error={noteError}
                placeholder="e.g. Leave on bakery porch bench"
                helperText="Required for morning packing"
              />
            </div>

            {/* Subtotal & Free Treat callout */}
            <div className="p-4 bg-[#F0EAE1] rounded-[20px] flex items-center justify-between">
              <span className="font-display font-bold text-sm text-[#2D2522]">Order Total</span>
              <span className="font-display font-extrabold text-lg text-[#FF8A50]">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </PebbleModal>
    </div>
  );
};
