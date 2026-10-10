import React, { useState, useRef } from 'react';

export interface PebbleTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export const PebbleTooltip: React.FC<PebbleTooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const showTooltip = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setIsClosing(false);
    setIsRendered(true);
  };

  const hideTooltip = () => {
    if (!isRendered || isClosing) return;
    setIsClosing(true);
    hideTimer.current = window.setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
    }, 130);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isRendered && (
        <div
          role="tooltip"
          className={`
            absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none
            ${isClosing ? 'animate-bubble-out' : 'animate-bubble'}
            whitespace-nowrap
            ${position === 'top' ? 'bottom-full mb-2.5' : 'top-full mt-2.5'}
          `}
        >
          {/* Paper Note Pill */}
          <div className="bg-[#2D2522] text-[#FAF7F2] text-xs font-semibold px-3 py-1.5 rounded-[12px] shadow-[0_6px_16px_rgba(45,37,34,0.35)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A50] animate-pulse" />
            {content}
          </div>

          {/* Soft Triangular Beak */}
          <div
            className={`
              w-2.5 h-2.5 bg-[#2D2522] rotate-45 mx-auto
              ${position === 'top' ? '-mt-1' : '-mb-1 order-first'}
            `}
          />
        </div>
      )}
    </div>
  );
};
