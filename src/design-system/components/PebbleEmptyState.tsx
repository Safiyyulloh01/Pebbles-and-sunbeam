import React from 'react';
import { PebbleButton } from './PebbleButton';

export interface PebbleEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const PebbleEmptyState: React.FC<PebbleEmptyStateProps> = ({
  title = 'All tucked away!',
  description = 'A quiet corner with nothing left to do. Time to enjoy the morning sunbeam or brew a fresh cup of tea.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center p-8 sm:p-12
        bg-[#FFFDF9] border border-[#EADBCE]/70 rounded-[32px]
        shadow-[0_10px_24px_-4px_rgba(92,60,40,0.06)]
        font-body max-w-md mx-auto
        ${className}
      `}
    >
      {/* Hand-drawn Pebble Buddies vector illustration */}
      <div className="relative w-40 h-32 mb-5 flex items-center justify-center select-none">
        {/* Warm morning sunbeam glow background */}
        <div className="absolute w-28 h-28 rounded-full bg-[#FFE8DC]/60 blur-xl animate-pulse" />

        <svg viewBox="0 0 200 160" className="w-full h-full relative z-10 overflow-visible">
          {/* Ground shadow */}
          <ellipse cx="100" cy="142" rx="70" ry="10" fill="#E2D8CC" opacity="0.6" />

          {/* Big Pebble Buddy (Warm terracotta-clementine clay) */}
          <path
            d="M 50 135 C 40 100, 50 60, 95 65 C 130 70, 140 110, 130 138 C 105 145, 65 145, 50 135 Z"
            fill="#FF8A50"
            className="transition-transform duration-300 hover:scale-105"
          />
          {/* Big Pebble Face (smiling, cozy eyes) */}
          <circle cx="80" cy="98" r="3.5" fill="#2D2522" />
          <circle cx="106" cy="100" r="3.5" fill="#2D2522" />
          <path d="M 88 110 Q 94 116 100 110" stroke="#2D2522" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Rosy blush cheeks */}
          <circle cx="73" cy="104" r="4.5" fill="#EE5D50" opacity="0.4" />
          <circle cx="113" cy="106" r="4.5" fill="#EE5D50" opacity="0.4" />

          {/* Little Pebble Buddy (Matcha clay snuggled beside) */}
          <path
            d="M 115 138 C 110 115, 120 95, 145 98 C 168 100, 172 125, 165 140 C 150 144, 125 144, 115 138 Z"
            fill="#5BB98C"
            className="transition-transform duration-300 hover:scale-105"
          />
          {/* Little Pebble Face */}
          <circle cx="135" cy="116" r="2.5" fill="#2D2522" />
          <circle cx="152" cy="118" r="2.5" fill="#2D2522" />
          <path d="M 140 126 Q 144 130 148 126" stroke="#2D2522" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="130" cy="121" r="3" fill="#EE5D50" opacity="0.3" />

          {/* Tiny gentle butter sunbeam sparkle floating above */}
          <path
            d="M 140 45 L 143 55 L 153 58 L 143 61 L 140 71 L 137 61 L 127 58 L 137 55 Z"
            fill="#F5A623"
            opacity="0.9"
            className="animate-bounce"
          />
        </svg>
      </div>

      <h3 className="font-display font-bold text-lg text-[#2D2522] tracking-tight">
        {title}
      </h3>

      <p className="text-xs text-[#786B65] mt-2 mb-6 font-medium leading-relaxed max-w-xs">
        {description}
      </p>

      {actionText && onAction && (
        <PebbleButton variant="butter" size="sm" onClick={onAction}>
          {actionText}
        </PebbleButton>
      )}
    </div>
  );
};
