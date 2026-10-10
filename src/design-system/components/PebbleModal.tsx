import React, { useState, useEffect, useCallback } from 'react';
import { playModalOpen, playModalClose } from '../utils/audio';

export interface PebbleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isBottomSheetMobile?: boolean;
  maxWidth?: string;
}

export const PebbleModal: React.FC<PebbleModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  isBottomSheetMobile = true,
  maxWidth = 'max-w-lg',
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    playModalClose();
    setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
      onClose();
    }, 180);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
      playModalOpen();
      document.body.style.overflow = 'hidden';
    } else if (isRendered && !isClosing) {
      triggerClose();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRendered) triggerClose();
    };
    if (isRendered) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRendered, triggerClose]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* "Golden Dim" Backdrop with entrance & closing fade */}
      <div
        onClick={triggerClose}
        className={`fixed inset-0 bg-[#2D2522]/35 backdrop-blur-md ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet Window with entrance & closing sprout animations */}
      <div
        className={`
          relative w-full ${maxWidth} bg-[#FFFDF9] text-[#2D2522]
          border-2 border-white/60
          shadow-[0_24px_50px_-12px_rgba(92,60,40,0.22),0_8px_20px_-4px_rgba(92,60,40,0.12)]
          ${isClosing ? 'animate-sprout-out' : 'animate-sprout'}
          z-10 my-auto
          ${isBottomSheetMobile ? 'max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:rounded-t-[36px] max-sm:rounded-b-none max-sm:border-b-0 max-sm:max-w-none max-sm:my-0' : ''}
          rounded-[36px] overflow-hidden flex flex-col
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Pebble Notch (indented carved groove affordance) */}
        {isBottomSheetMobile && (
          <div className="sm:hidden pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#E2D8CC] shadow-[inset_0_1px_2px_rgba(92,60,40,0.15)]" />
          </div>
        )}

        {/* Modal Header */}
        {(title || subtitle) && (
          <div className="px-7 pt-6 pb-3 flex items-start justify-between border-b border-[#F0EAE1]">
            <div>
              {title && (
                <h3 className="font-display text-xl font-bold text-[#2D2522] tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#786B65] mt-1 font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={triggerClose}
              className="w-9 h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D8CC] text-[#786B65] hover:text-[#2D2522] flex items-center justify-center transition-colors active:scale-95 ml-3 shrink-0"
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="px-7 py-5 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="px-7 py-4 bg-[#FAF7F2] border-t border-[#F0EAE1] flex items-center justify-end gap-3 rounded-b-[36px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
