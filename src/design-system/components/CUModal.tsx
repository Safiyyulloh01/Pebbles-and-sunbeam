import React, { useEffect, useCallback } from 'react';
import { playModalOpen, playModalClose } from '../utils/audio';

export interface CUModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // e.g. 'max-w-md', 'max-w-xl', 'max-w-2xl'
  showCloseButton?: boolean;
}

export const CUModal: React.FC<CUModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg',
  showCloseButton = true,
}) => {
  const handleClose = useCallback(() => {
    playModalClose();
    onClose();
  }, [onClose]);

  // Handle Escape key and body scroll lock
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-[24px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh] my-auto transform transition-all duration-200 scale-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (if title or close button provided) */}
        {(title || showCloseButton) && (
          <div className="px-6 py-4.5 border-b border-gray-100 bg-[#FAF7F2] flex items-center justify-between gap-3">
            <div>
              {title && (
                <div className="font-extrabold text-base sm:text-lg text-[#1E1E1E] leading-snug">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="text-xs text-gray-500 mt-0.5 leading-normal">
                  {subtitle}
                </div>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
