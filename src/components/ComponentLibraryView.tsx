import React, { useState } from 'react';
import {
  CUProductCard,
  CUBadge,
  CUBadgeType,
  CUProductDetailModal,
  CUOneQRModal,
  CUStockModal,
  CUProductItem,
} from '../design-system';
import { CUCartModal, CartItem } from '../design-system/components/CUCartModal';
import { CU_SAMPLE_PRODUCTS } from './CUMarketLiveApp';

export const ComponentLibraryView: React.FC = () => {
  const [detailProduct, setDetailProduct] = useState<CUProductItem | null>(null);
  const [stockProduct, setStockProduct] = useState<CUProductItem | null>(null);
  const [oneQROpen, setOneQROpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: CU_SAMPLE_PRODUCTS[0], quantity: 2 },
    { product: CU_SAMPLE_PRODUCTS[4], quantity: 1 },
  ]);

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const badgeShowcase: { type: CUBadgeType; label: string; desc: string }[] = [
    { type: 'plus1', label: '1+1 Buy 1 Get 1', desc: 'Pantone 368C / Lime Green (#37D243). Doubles purchasing volume.' },
    { type: 'plus2', label: '2+1 Buy 2 Get 1', desc: 'Digital Violet (#8059EA). 33% bundle discount value.' },
    { type: 'new', label: 'NEW Arrival', desc: 'Energy Red (#FF4757). Highlights fresh seasonal releases.' },
    { type: 'best', label: 'BEST Seller', desc: 'CU Corporate Purple (#751485). Top trending convenience items.' },
    { type: 'cuOnly', label: 'CU Exclusive', desc: 'HEYROO Golden Yellow (#FFB800). Private brand specialty.' },
    { type: 'sale', label: 'Direct Sale', desc: 'Discounted retail clearance price badge.' },
    { type: 'hot', label: 'Viral / Hot', desc: 'TikTok & SNS trending snack sensation.' },
  ];

  return (
    <div className="space-y-12 pb-24 font-['Noto_Sans_KR',sans-serif]">
      {/* Intro Hero */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 sm:p-10 shadow-xs">
        <div className="inline-flex items-center gap-2 bg-[#F6EDF8] px-3 py-1 rounded-full text-xs font-bold text-[#751485] mb-3 border border-[#751485]/20">
          <span className="w-2 h-2 rounded-full bg-[#751485]" />
          <span>CU Convenience Store Digital UI System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight">
          CU Component Library & Specs
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
          The complete component architecture for NICE TO CU (BGF Retail). Built on high-contrast retail colors, 1+1 / 2+1 promotion badges, 1:1 square product framing, POS real-time stock indicators, and centered modal overlays with backdrop dismissals.
        </p>
      </div>

      {/* 1. Promotional Badge System */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">01. Promotion System</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Promotional Badges (`CUBadge`)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#37D243] bg-[#EBFCEB] px-3 py-1 rounded-full border border-[#37D243]/30">
            Korean Retail Standard
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
          CU's signature promotional badges are the focal point of the convenience store shopping experience. They feature distinct color identities to help shoppers recognize deals at a glance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {badgeShowcase.map((b) => (
            <div
              key={b.type}
              className="bg-white rounded-[18px] p-4 border border-gray-200 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <CUBadge type={b.type} size="md" />
                <span className="font-mono text-[10px] text-gray-400 font-bold">{b.type}</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E1E1E]">{b.label}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-normal">{b.desc}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-medium">Sizes:</span>
                <CUBadge type={b.type} size="sm" />
                <CUBadge type={b.type} size="md" />
                <CUBadge type={b.type} size="lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Retail Product Card System */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">02. Catalog Anatomy</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Retail Product Card (`CUProductCard`)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#751485] bg-[#F6EDF8] px-3 py-1 rounded-full border border-[#751485]/20">
            Uniform 1:1 Aspect Ratio
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
          Matches CU's official <code className="text-[#751485] font-bold">.prod_item</code> DOM hierarchy. Employs uniform 1:1 square image containers with inner border containment, two-line clamped product typography, live stock indicators, and dual action triggers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Card 1: 1+1 Standard Card */}
          <CUProductCard
            product={CU_SAMPLE_PRODUCTS[3]} // get Coffee 1+1
            onSelect={(p) => setDetailProduct(p)}
            onAddToCart={() => setCartModalOpen(true)}
            onCheckStock={(p) => setStockProduct(p)}
          />

          {/* Card 2: 2+1 Viral Bread */}
          <CUProductCard
            product={CU_SAMPLE_PRODUCTS[0]} // Yonsei bread 2+1
            onSelect={(p) => setDetailProduct(p)}
            onAddToCart={() => setCartModalOpen(true)}
            onCheckStock={(p) => setStockProduct(p)}
          />

          {/* Card 3: NEW Hot Meal */}
          <CUProductCard
            product={CU_SAMPLE_PRODUCTS[1]} // Dubai chocolate
            onSelect={(p) => setDetailProduct(p)}
            onAddToCart={() => setCartModalOpen(true)}
            onCheckStock={(p) => setStockProduct(p)}
          />

          {/* Card 4: Out of Stock Card */}
          <CUProductCard
            product={{
              ...CU_SAMPLE_PRODUCTS[5],
              stockCount: 0,
            }}
            onSelect={(p) => setDetailProduct(p)}
            onAddToCart={() => setCartModalOpen(true)}
            onCheckStock={(p) => setStockProduct(p)}
          />
        </div>
      </section>

      {/* 3. Centered Popup Modals & Overlays */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">03. Overlays & Dialogs</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              Centered Pop-up Modals & Dismissal Architecture
            </h2>
          </div>
          <span className="text-xs font-bold text-[#37D243] bg-[#EBFCEB] px-3 py-1 rounded-full border border-[#37D243]/30">
            Backdrop & Esc Dismissal
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
          All modal dialogs are centered in the viewport with high-contrast backdrop overlays. Clicking anywhere outside the dialog window or pressing the <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-[11px] font-mono">Esc</kbd> key immediately dismisses the modal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Modal Trigger 1: Product Details */}
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="text-2xl mb-1">🔍</div>
              <h4 className="font-bold text-sm text-[#1E1E1E]">Product Detail Pop-up</h4>
              <p className="text-xs text-gray-500 mt-1">
                Microwave guide, storage temperature, nutrition facts, and O4O services.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDetailProduct(CU_SAMPLE_PRODUCTS[0])}
              className="w-full py-2.5 px-3 bg-[#751485] hover:bg-[#580F63] text-white text-xs font-bold rounded-[12px] transition-all cursor-pointer shadow-xs"
            >
              Open Product Modal
            </button>
          </div>

          {/* Modal Trigger 2: Stock Lookup */}
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="text-2xl mb-1">🗺️</div>
              <h4 className="font-bold text-sm text-[#1E1E1E]">Store Stock Lookup Pop-up</h4>
              <p className="text-xs text-gray-500 mt-1">
                Real-time POS connected inventory across nearby branches with distance indicators.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStockProduct(CU_SAMPLE_PRODUCTS[0])}
              className="w-full py-2.5 px-3 bg-[#37D243] hover:bg-[#2BB836] text-white text-xs font-bold rounded-[12px] transition-all cursor-pointer shadow-xs"
            >
              Open Stock Modal
            </button>
          </div>

          {/* Modal Trigger 3: One-QR Barcode */}
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="text-2xl mb-1">📱</div>
              <h4 className="font-bold text-sm text-[#1E1E1E]">Pocket CU One-QR Modal</h4>
              <p className="text-xs text-gray-500 mt-1">
                Single dynamic barcode for payment + CU points + discounts + virtual Keeping Box.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOneQROpen(true)}
              className="w-full py-2.5 px-3 bg-[#8059EA] hover:bg-[#6837F8] text-white text-xs font-bold rounded-[12px] transition-all cursor-pointer shadow-xs"
            >
              Open One-QR Modal
            </button>
          </div>

          {/* Modal Trigger 4: Centered Cart Pop-up */}
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="text-2xl mb-1">🛒</div>
              <h4 className="font-bold text-sm text-[#1E1E1E]">Centered Cart Pop-up</h4>
              <p className="text-xs text-gray-500 mt-1">
                Quick pickup order modal with quantity steppers and promotional discount calculations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCartModalOpen(true)}
              className="w-full py-2.5 px-3 bg-[#1E1E1E] hover:bg-black text-white text-xs font-bold rounded-[12px] transition-all cursor-pointer shadow-xs"
            >
              Open Cart Modal
            </button>
          </div>
        </div>
      </section>

      {/* 4. O4O Service Indicators & Facility Badges */}
      <section className="space-y-4">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider">04. Store Services</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
              O4O (Online-for-Offline) Facility Badges
            </h2>
          </div>
          <span className="text-xs font-bold text-[#8059EA] bg-[#F2EFFD] px-3 py-1 rounded-full border border-[#8059EA]/30">
            Connected Retail
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
          Visual indicator chips for physical convenience store amenities displayed in store locator cards and product detail views.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {[
            { icon: '🕒', label: '24 Hours', desc: 'Open 24/7' },
            { icon: '🛍️', label: 'Quick Pickup', desc: 'Ready in 10m' },
            { icon: '📦', label: 'Parcel Locker', desc: 'Send & Receive' },
            { icon: '🥐', label: 'Fresh Bakery', desc: 'Baked in-store' },
            { icon: '🍗', label: 'Fried Chicken', desc: 'Hot counter' },
            { icon: '🏧', label: 'Global ATM', desc: 'Cash withdraw' },
            { icon: '💊', label: 'OTC Medicine', desc: 'Safety medicine' },
          ].map((svc) => (
            <div
              key={svc.label}
              className="bg-white p-3 rounded-[16px] border border-gray-200 text-center shadow-2xs space-y-1"
            >
              <div className="text-xl">{svc.icon}</div>
              <div className="text-xs font-bold text-[#1E1E1E]">{svc.label}</div>
              <div className="text-[10px] text-gray-400">{svc.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals Instances */}
      <CUProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={() => setCartModalOpen(true)}
        onOpenStockChecker={(p) => {
          setDetailProduct(null);
          setStockProduct(p);
        }}
      />

      <CUStockModal
        product={stockProduct}
        isOpen={!!stockProduct}
        onClose={() => setStockProduct(null)}
      />

      <CUOneQRModal
        isOpen={oneQROpen}
        onClose={() => setOneQROpen(false)}
      />

      <CUCartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          alert('Quick Pickup Order Confirmed!');
          setCartModalOpen(false);
        }}
      />
    </div>
  );
};
