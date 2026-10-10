import React, { useState } from 'react';
import { playModalClose } from '../utils/audio';

export type PebbleCalloutVariant = 'coral' | 'honeycomb' | 'matcha' | 'berry';

export interface PebbleCalloutProps {
  variant?: PebbleCalloutVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const PebbleCallout: React.FC<PebbleCalloutProps> = ({
  variant = 'honeycomb',
  title,
  description,
  action,
  onDismiss,
  className = '',
}) => {
  const [isDismissing, setIsDismissing] = useState(false);

  const handleDismiss = () => {
    if (!onDismiss || isDismissing) return;
    setIsDismissing(true);
    playModalClose();
    setTimeout(() => {
      onDismiss();
    }, 180);
  };

  const variantStyles = {
    coral: {
      card: 'bg-[#FDF2F0] border-[#EE5D50]/40 text-[#2D2522]',
      iconBg: 'bg-[#EE5D50] text-[#FFFDF9] shadow-[0_2px_6px_rgba(238,93,80,0.3)]',
      badge: 'Spiced Coral',
      icon: (
        // Acorn / gentle soft caution badge
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.5 2 6 5 6 8c0 5 6 12 6 12s6-7 6-12c0-3-2.5-6-6-6zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      ),
    },
    honeycomb: {
      card: 'bg-[#FEF8ED] border-[#F5A623]/40 text-[#2D2522]',
      iconBg: 'bg-[#F5A623] text-[#FFFDF9] shadow-[0_2px_6px_rgba(245,166,35,0.3)]',
      badge: 'Honeycomb Honey',
      icon: (
        // Smiling sunbeam patch
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    matcha: {
      card: 'bg-[#F1FAF5] border-[#5BB98C]/40 text-[#2D2522]',
      iconBg: 'bg-[#5BB98C] text-[#FFFDF9] shadow-[0_2px_6px_rgba(91,185,140,0.3)]',
      badge: 'Matcha Fresh',
      icon: (
        // Clover / tea leaf
        <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    berry: {
      card: 'bg-[#F4F2FF] border-[#8C7CFF]/40 text-[#2D2522]',
      iconBg: 'bg-[#8C7CFF] text-[#FFFDF9] shadow-[0_2px_6px_rgba(140,124,255,0.3)]',
      badge: 'Berry Cream',
      icon: (
        // Sparkle star
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l2.4 6.6 6.6 2.4-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z"/>
        </svg>
      ),
    },
  }[variant];

  return (
    <div
      className={`
        relative p-4 sm:p-5 rounded-tl-[24px] rounded-tr-[16px] rounded-br-[24px] rounded-bl-[14px]
        border shadow-[0_4px_16px_rgba(92,60,40,0.05)]
        flex items-start gap-3.5
        ${isDismissing ? 'animate-sprout-out' : 'animate-sprout'}
        ${variantStyles.card}
        ${className}
      `}
    >
      {/* Friendly Organic Icon Badge */}
      <div className={`w-9 h-9 rounded-[14px] shrink-0 flex items-center justify-center ${variantStyles.iconBg}`}>
        {variantStyles.icon}
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h4 className="font-display font-bold text-sm tracking-tight text-[#2D2522]">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-[#786B65] mt-1 font-medium leading-relaxed">
            {description}
          </p>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>

      {onDismiss && (
        <button
          onClick={handleDismiss}
          className="text-[#786B65] hover:text-[#2D2522] p-1 rounded-full hover:bg-black/5 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
