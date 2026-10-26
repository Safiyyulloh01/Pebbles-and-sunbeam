import React, { useState, useEffect, useCallback } from 'react';
import { CUProductItem } from './CUProductCard';
import { CUBadge } from './CUBadge';
import { playModalClose, playModalOpen } from '../utils/audio';

interface CUProductDetailModalProps {
  product: CUProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CUProductItem, quantity: number) => void;
  onOpenStockChecker: (product: CUProductItem) => void;
}

export const CUProductDetailModal: React.FC<CUProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenStockChecker,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens for a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product?.id]);

  const handleClose = useCallback(() => {
    playModalClose();
    onClose();
  }, [onClose]);

  // Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen || !product) return;

    playModalOpen();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, product, handleClose]);

  if (!isOpen || !product) return null;

  const isOutOfStock = product.stockCount <= 0;
  const totalPrice = product.price * quantity;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col my-auto transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs uppercase px-2.5 py-0.5 rounded-[6px] bg-[#751485] text-white">
              NICE TO CU
            </span>
            <span className="text-xs font-semibold text-[#666]">{product.categoryLabel}</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close product details"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Main Visual & Info Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Product Image Area */}
            <div className="relative bg-[#F8F9FA] rounded-[20px] p-4 flex items-center justify-center border border-gray-100 min-h-[240px]">
              <div className="w-full aspect-square max-h-[220px] rounded-[16px] overflow-hidden bg-white shadow-xs flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <CUBadge type={product.badge} size="lg" />
                </div>
              )}

              {product.secondaryTag && (
                <div className="absolute top-4 right-4">
                  <CUBadge type={product.secondaryTag} size="md" />
                </div>
              )}

              {product.storageType && (
                <div className="absolute bottom-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 text-[#444] shadow-sm border border-gray-200">
                  {product.storageType === 'Chilled' ? '❄️ Chilled (0~10℃)' : product.storageType === 'Frozen' ? '🧊 Frozen (-18℃)' : '📦 Room Temp'}
                </div>
              )}
            </div>

            {/* Right: Product Meta & Pricing */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E] tracking-tight leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Block */}
                <div className="mt-4 p-3.5 bg-[#FAF7F2] rounded-[16px] border border-[#EADBCE]/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-gray-500">Retail Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[#751485]">₩</span>
                      <span className="text-2xl font-['Roboto'] font-black text-[#751485]">
                        {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {product.badge === 'plus1' && (
                    <div className="mt-2 text-xs font-bold text-[#2BB836] flex items-center justify-between pt-2 border-t border-gray-200/60">
                      <span>1+1 Promotion</span>
                      <span>₩{(Math.round(product.price / 2)).toLocaleString()} each (Buy 1 Get 1 Free)</span>
                    </div>
                  )}

                  {product.badge === 'plus2' && (
                    <div className="mt-2 text-xs font-bold text-[#8059EA] flex items-center justify-between pt-2 border-t border-gray-200/60">
                      <span>2+1 Promotion</span>
                      <span>₩{(Math.round((product.price * 2) / 3)).toLocaleString()} each (Buy 2 Get 1 Free)</span>
                    </div>
                  )}
                </div>

                {/* Tags Pill List */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-[#555] hover:bg-[#751485]/10 hover:text-[#751485] cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Convenience Metadata Box */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs space-y-1.5 text-gray-600">
                {product.microwaveTime && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <span>⚡</span> Microwave Guide
                    </span>
                    <span className="font-bold text-[#1E1E1E]">{product.microwaveTime}</span>
                  </div>
                )}
                {product.calories && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">🔥 Energy / Calories</span>
                    <span className="font-bold text-[#1E1E1E]">{product.calories}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">📍 In-Store Availability</span>
                  <span className={`font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Out of stock at this location' : `${product.stockCount} in stock`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* O4O (Online-for-Offline) Service Actions Bar */}
          <div className="bg-[#FAF7F2] p-4 rounded-[18px] border border-[#EADBCE]/80">
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wide block mb-2.5">
              Pocket CU Connected Services (O4O)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => onOpenStockChecker(product)}
                className="p-2.5 bg-white rounded-[12px] border border-gray-200 text-center hover:border-[#751485] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="text-base">🔍</div>
                <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">Stock Finder</div>
                <div className="text-[10px] text-gray-500">Live nearby stores</div>
              </button>

              <button
                type="button"
                onClick={() => alert(`[Quick Pickup] Order placed for ${product.name} to pick up at counter.`)}
                className="p-2.5 bg-white rounded-[12px] border border-gray-200 text-center hover:border-[#751485] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="text-base">🛍️</div>
                <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">Counter Pickup</div>
                <div className="text-[10px] text-gray-500">Ready in 10 mins</div>
              </button>

              <button
                type="button"
                onClick={() => alert(`[Pre-Order] Reservation confirmed for ${product.name}.`)}
                className="p-2.5 bg-white rounded-[12px] border border-gray-200 text-center hover:border-[#751485] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="text-base">📅</div>
                <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">Pre-Order</div>
                <div className="text-[10px] text-gray-500">Reserve viral items</div>
              </button>

              <button
                type="button"
                onClick={() => alert(`[Express Delivery] 30-min instant delivery booked for ${product.name}.`)}
                className="p-2.5 bg-white rounded-[12px] border border-gray-200 text-center hover:border-[#751485] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="text-base">🛵</div>
                <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">30-Min Delivery</div>
                <div className="text-[10px] text-gray-500">Direct to doorstep</div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Quantity and Add to Cart */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-300 rounded-[12px] overflow-hidden bg-gray-50">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              className="px-3 py-2 text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition-colors font-bold text-sm cursor-pointer"
            >
              -
            </button>
            <span className="px-4 py-2 text-sm font-bold text-[#1E1E1E] min-w-[36px] text-center bg-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
              disabled={quantity >= product.stockCount || isOutOfStock}
              className="px-3 py-2 text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition-colors font-bold text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Total & Action Button */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="text-right">
              <span className="text-[11px] text-gray-500 block">Total Price</span>
              <span className="font-['Roboto'] font-black text-xl text-[#751485]">
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className={`
                px-6 py-3 rounded-[14px] font-bold text-sm transition-all shadow-md cursor-pointer
                ${isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#751485] text-white hover:bg-[#580F63] active:scale-95 shadow-[0_4px_12px_rgba(117,20,133,0.3)]'
                }
              `}
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
