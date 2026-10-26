import React, { useState, useEffect, useCallback } from 'react';
import { playModalClose, playModalOpen } from '../utils/audio';

interface CUOneQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CUOneQRModal: React.FC<CUOneQRModalProps> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [activeTab, setActiveTab] = useState<'qr' | 'keeping'>('qr');

  const handleClose = useCallback(() => {
    playModalClose();
    onClose();
  }, [onClose]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(180);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Escape key & body overflow lock
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#DEDEDE] text-center my-auto transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#751485] to-[#8059EA] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs tracking-wide bg-white/20 px-2.5 py-0.5 rounded-full">
              Pocket CU
            </span>
            <span className="font-bold text-sm">One-QR Checkout</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close One-QR modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 bg-[#FAF7F2] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 text-xs font-bold rounded-[12px] transition-colors cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-[#751485] shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Integrated Barcode (One-QR)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('keeping')}
            className={`flex-1 py-2 text-xs font-bold rounded-[12px] transition-colors cursor-pointer ${
              activeTab === 'keeping'
                ? 'bg-white text-[#751485] shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Keeping Coupon (1+1 Free Box)
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'qr' ? (
          <div className="p-6 space-y-4">
            {/* Dynamic Security Barcode Simulation */}
            <div className="bg-[#FAFAFA] p-4 rounded-[20px] border border-gray-200 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-mono">
                <span>Timer:</span>
                <span className="font-bold text-[#FF4757] text-sm">{timeFormatted}</span>
                <span className="text-[10px] text-gray-400">(Dynamic refresh)</span>
              </div>

              {/* Barcode Graphic SVG */}
              <div className="bg-white p-3 rounded-[12px] border border-gray-100 flex flex-col items-center">
                <div className="flex items-center justify-center gap-1 w-full h-16">
                  {/* Simulated Barcode lines */}
                  {[4, 2, 6, 2, 8, 3, 5, 2, 7, 3, 4, 6, 2, 5, 8, 2, 4, 3, 6, 3, 5, 2, 7].map((w, i) => (
                    <div
                      key={i}
                      className="h-full bg-black"
                      style={{ width: `${w * 2}px` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-xs tracking-widest text-gray-700 mt-2 font-bold">
                  8801 0560 3920 1845
                </div>
              </div>

              <p className="text-[11px] text-gray-500">
                Present this single barcode to cashier for payment + CU points + discount coupon all at once.
              </p>
            </div>

            {/* Linked Cards & CU Points */}
            <div className="p-3 bg-purple-50 rounded-[16px] border border-purple-100 flex items-center justify-between text-xs">
              <div className="text-left">
                <span className="text-[10px] text-purple-600 font-bold block">Available CU Points</span>
                <span className="font-black text-sm text-[#751485]">3,450 P</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-bold block">Auto Pay</span>
                <span className="font-semibold text-gray-800">KakaoPay / Toss</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-3 text-left">
            <div className="text-xs font-bold text-gray-600 mb-2">
              Virtual Keeping Box (Stored +1 Items)
            </div>

            <div className="p-3 bg-gray-50 rounded-[14px] border border-gray-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-[#1E1E1E]">get Iced Americano XL</h5>
                <span className="text-[10px] text-gray-500">From 1+1 event · Expires in 28 days</span>
              </div>
              <button
                type="button"
                onClick={() => alert('[Claim] Barcode generated for counter redemption!')}
                className="px-2.5 py-1 bg-[#37D243] text-white text-xs font-bold rounded-[8px]"
              >
                Claim (1)
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-[14px] border border-gray-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-[#1E1E1E]">delaffe Peach Iced Tea</h5>
                <span className="text-[10px] text-gray-500">From 2+1 event · Expires in 14 days</span>
              </div>
              <button
                type="button"
                onClick={() => alert('[Claim] Barcode generated for counter redemption!')}
                className="px-2.5 py-1 bg-[#37D243] text-white text-xs font-bold rounded-[8px]"
              >
                Claim (1)
              </button>
            </div>

            <p className="text-[10px] text-gray-400 pt-2 leading-relaxed">
              Don't want to carry both items now? Keep your +1 gift in the Pocket CU app and claim it at any CU nationwide anytime!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-[#37D243]" />
          <span>Connected to CU POS Network</span>
        </div>
      </div>
    </div>
  );
};
