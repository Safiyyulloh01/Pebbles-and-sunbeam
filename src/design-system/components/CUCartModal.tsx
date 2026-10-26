import React, { useEffect, useCallback } from 'react';
import { CUProductItem } from './CUProductCard';
import { CUBadge } from './CUBadge';
import { playModalClose, playStepperClick } from '../utils/audio';

export interface CartItem {
  product: CUProductItem;
  quantity: number;
}

interface CUCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

export const CUCartModal: React.FC<CUCartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onCheckout,
}) => {
  const handleClose = useCallback(() => {
    playModalClose();
    onClose();
  }, [onClose]);

  // Escape key & body overflow
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalRawPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const promoDiscount = Math.round(totalRawPrice * 0.15);
  const finalPrice = Math.max(0, totalRawPrice - promoDiscount);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[88vh] my-auto transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F2] border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-black text-xs uppercase px-2.5 py-1 rounded-[8px] bg-[#751485] text-white">
              Pocket CU Cart
            </span>
            <span className="text-xs font-bold text-gray-500">
              ({totalCount} {totalCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart popup"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Items List */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-3.5 flex-1 max-h-[50vh]">
          {items.length > 0 ? (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3 sm:p-3.5 bg-[#F9FAFB] rounded-[16px] border border-gray-200 flex items-center gap-3 hover:border-gray-300 transition-colors"
              >
                <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-white border border-gray-200 shrink-0 flex items-center justify-center p-1">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {product.badge && <CUBadge type={product.badge} size="sm" />}
                    <h4 className="text-xs font-bold text-[#1E1E1E] truncate">
                      {product.name}
                    </h4>
                  </div>
                  <div className="text-xs font-black text-[#751485] mt-1">
                    ₩{(product.price * quantity).toLocaleString()}
                    <span className="text-[10px] text-gray-400 font-normal ml-1.5">
                      (₩{product.price.toLocaleString()} each)
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-300 rounded-[10px] overflow-hidden bg-white shrink-0 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => {
                      playStepperClick();
                      onUpdateQuantity(product.id, -1);
                    }}
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#1E1E1E]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playStepperClick();
                      onUpdateQuantity(product.id, 1);
                    }}
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 text-gray-400">
              <span className="text-4xl">🛒</span>
              <p className="text-sm font-semibold text-gray-600">Your Pocket CU cart is empty</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Browse our featured 1+1 and 2+1 monthly promotions and add your favorite snacks or meals!
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-gray-100 space-y-3.5">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₩{totalRawPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#37D243] font-bold">
                <span>1+1 / 2+1 Bundle Savings</span>
                <span>-₩{promoDiscount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#1E1E1E] pt-2 border-t border-gray-100">
                <span>Total Payment</span>
                <span className="text-[#751485]">₩{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-[14px] hover:bg-gray-50 active:scale-98 transition-all"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={onCheckout}
                className="flex-2 py-3 px-4 bg-[#751485] hover:bg-[#580F63] text-white font-bold text-xs sm:text-sm rounded-[14px] shadow-[0_4px_12px_rgba(117,20,133,0.3)] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Quick Pickup Order</span>
                <span className="text-[10px] bg-white/20 font-semibold px-2 py-0.5 rounded-full">
                  One-QR Pay
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
