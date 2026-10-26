import React, { useState } from 'react';
import {
  CUProductCard,
  CUBadgeType,
  CUProductItem,
  CUProductDetailModal,
  CUOneQRModal,
  CUStockModal,
  playMatchaChime,
  playStepperClick,
} from '../design-system';
import { CUCartModal, CartItem } from '../design-system/components/CUCartModal';
import confetti from 'canvas-confetti';

export const PlaygroundView: React.FC = () => {
  // Configurable Product Knobs
  const [name, setName] = useState('Yonsei Fresh Milk Cream Bread');
  const [price, setPrice] = useState(2900);
  const [badge, setBadge] = useState<CUBadgeType | 'none'>('plus2');
  const [secondaryTag, setSecondaryTag] = useState<CUBadgeType | 'none'>('cuOnly');
  const [categoryLabel, setCategoryLabel] = useState('Dessert / Bakery');
  const [stockCount, setStockCount] = useState(6);
  const [storageType, setStorageType] = useState<'Chilled' | 'Frozen' | 'Room Temp'>('Chilled');
  const [microwaveTime, setMicrowaveTime] = useState('1000W 20s / 700W 30s');
  const [calories, setCalories] = useState('413 kcal');
  const [description, setDescription] = useState(
    'Over 80% whipped fresh milk cream by weight! The viral TikTok and Instagram convenience store sensation.'
  );

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [oneQROpen, setOneQROpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Derived Product Object
  const configuredProduct: CUProductItem = {
    id: 'playground-preview-item',
    name,
    price,
    originalPrice: Math.round(price * 1.15),
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'snacks_dessert',
    categoryLabel,
    badge: badge === 'none' ? undefined : badge,
    secondaryTag: secondaryTag === 'none' ? undefined : secondaryTag,
    description,
    storageType,
    microwaveTime,
    stockCount,
    calories,
    tags: ['CUPlayground', 'LivePreview', 'BGFRetail'],
  };

  const handleAddToCart = () => {
    playMatchaChime();
    setCartItems([{ product: configuredProduct, quantity: 1 }]);
    setCartOpen(true);
  };

  return (
    <div className="space-y-10 pb-24 font-['Noto_Sans_KR',sans-serif]">
      {/* Intro Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 sm:p-10 shadow-xs">
        <div className="inline-flex items-center gap-2 bg-[#F6EDF8] px-3 py-1 rounded-full text-xs font-bold text-[#751485] mb-3 border border-[#751485]/20">
          <span className="w-2 h-2 rounded-full bg-[#751485]" />
          <span>Interactive Testing Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight">
          CU Product & Promotion Studio
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Tweak product parameters in real time and test promotional savings, out-of-stock states, centered modal popups, and Pocket CU checkout workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[24px] border border-gray-200 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-[#1E1E1E] border-b border-gray-100 pb-3 flex items-center justify-between">
            <span>Product Configuration Knobs</span>
            <span className="text-xs font-bold text-[#751485] bg-[#F6EDF8] px-2.5 py-0.5 rounded-full">
              Live Updates
            </span>
          </h2>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Product Title / Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-[12px] text-xs sm:text-sm font-medium focus:outline-none focus:border-[#751485] focus:bg-white transition-all"
              />
            </div>

            {/* Price & Stock Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Retail Price (₩ KRW): <span className="text-[#751485] font-black">₩{price.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={price}
                  onChange={(e) => {
                    playStepperClick();
                    setPrice(Number(e.target.value));
                  }}
                  className="w-full accent-[#751485] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Stock Units: <span className={`font-black ${stockCount === 0 ? 'text-red-500' : 'text-[#37D243]'}`}>{stockCount} ({stockCount === 0 ? 'Out of Stock' : stockCount <= 3 ? 'Low Stock' : 'In Stock'})</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={stockCount}
                  onChange={(e) => {
                    playStepperClick();
                    setStockCount(Number(e.target.value));
                  }}
                  className="w-full accent-[#751485] cursor-pointer"
                />
              </div>
            </div>

            {/* Promotion Badges */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Primary Promotion Badge
              </label>
              <div className="flex flex-wrap gap-2">
                {(['none', 'plus1', 'plus2', 'new', 'best', 'cuOnly', 'sale', 'hot'] as (CUBadgeType | 'none')[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBadge(b)}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                      badge === b
                        ? 'bg-[#751485] text-white border-[#751485] shadow-xs'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {b === 'none' ? 'None' : b === 'plus1' ? '1+1' : b === 'plus2' ? '2+1' : b.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Tag */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Secondary Status Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {(['none', 'new', 'best', 'cuOnly'] as (CUBadgeType | 'none')[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSecondaryTag(t)}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                      secondaryTag === t
                        ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-xs'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {t === 'none' ? 'None' : t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Type */}
            <div className="grid grid-cols-3 gap-3">
              {(['Chilled', 'Frozen', 'Room Temp'] as ('Chilled' | 'Frozen' | 'Room Temp')[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStorageType(st)}
                  className={`py-2 px-3 rounded-[12px] text-xs font-bold border transition-all cursor-pointer ${
                    storageType === st
                      ? 'bg-[#F6EDF8] text-[#751485] border-[#751485]'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {st === 'Chilled' ? '❄️ Chilled' : st === 'Frozen' ? '🧊 Frozen' : '📦 Room Temp'}
                </button>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Product Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-[12px] text-xs font-medium focus:outline-none focus:border-[#751485] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Preview & Action Deck (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Live Card Render
              </span>
              <span className="text-xs font-black text-[#37D243]">
                {stockCount > 0 ? 'Ready for Purchase' : 'Sold Out State'}
              </span>
            </div>

            {/* The Live Rendered Card */}
            <div className="max-w-[280px] mx-auto">
              <CUProductCard
                product={configuredProduct}
                onSelect={() => setDetailOpen(true)}
                onAddToCart={handleAddToCart}
                onCheckStock={() => setStockOpen(true)}
              />
            </div>

            <p className="text-[11px] text-gray-400 text-center">
              Click the card to open Product Detail Pop-up, or click Stock / Add buttons.
            </p>
          </div>

          {/* Quick Modal Launcher Shortcuts */}
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#1E1E1E] block">
              Quick Modal Test Deck
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="p-3 bg-gray-50 hover:bg-[#F6EDF8] hover:text-[#751485] rounded-[12px] border border-gray-200 transition-all text-left cursor-pointer"
              >
                <div className="text-base mb-1">🔍</div>
                <span>Detail Pop-up</span>
              </button>

              <button
                type="button"
                onClick={() => setStockOpen(true)}
                className="p-3 bg-gray-50 hover:bg-[#EBFCEB] hover:text-[#37D243] rounded-[12px] border border-gray-200 transition-all text-left cursor-pointer"
              >
                <div className="text-base mb-1">🗺️</div>
                <span>Stock Finder</span>
              </button>

              <button
                type="button"
                onClick={() => setOneQROpen(true)}
                className="p-3 bg-gray-50 hover:bg-[#F2EFFD] hover:text-[#8059EA] rounded-[12px] border border-gray-200 transition-all text-left cursor-pointer"
              >
                <div className="text-base mb-1">📱</div>
                <span>One-QR Barcode</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCartItems([{ product: configuredProduct, quantity: 2 }]);
                  setCartOpen(true);
                }}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-[12px] border border-gray-200 transition-all text-left cursor-pointer"
              >
                <div className="text-base mb-1">🛒</div>
                <span>Cart Pop-up</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modals Instances */}
      <CUProductDetailModal
        product={configuredProduct}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenStockChecker={() => {
          setDetailOpen(false);
          setStockOpen(true);
        }}
      />

      <CUStockModal
        product={configuredProduct}
        isOpen={stockOpen}
        onClose={() => setStockOpen(false)}
      />

      <CUOneQRModal
        isOpen={oneQROpen}
        onClose={() => setOneQROpen(false)}
      />

      <CUCartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(pid, delta) => {
          setCartItems((prev) =>
            prev
              .map((i) => (i.product.id === pid ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
              .filter(Boolean) as CartItem[]
          );
        }}
        onCheckout={() => {
          confetti();
          alert('Order placed successfully!');
          setCartOpen(false);
        }}
      />
    </div>
  );
};
