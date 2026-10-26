import React from 'react';
import { CU_BADGES, CU_COLORS } from '../cu-tokens';

export type CUBadgeType = 'plus1' | 'plus2' | 'new' | 'best' | 'cuOnly' | 'sale';

interface CUBadgeProps {
  type: CUBadgeType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

/**
 * Authentic CU Convenience Store Promo Badge
 * Matches .badge > span from https://cu.bgfretail.com
 * - 1+1: Vibrant Lime Green #37D243 (Buy 1 Get 1)
 * - 2+1: Signature Violet #8059EA (Buy 2 Get 1)
 * - NEW: Energetic Red #FF4757 (New Arrival)
 * - BEST: Amber Orange #FF9800 (Best Seller)
 * - CU Only: Deep Purple #751485 with Gold accent (Exclusive PB)
 */
export const CUBadge: React.FC<CUBadgeProps> = ({
  type,
  size = 'md',
  className = '',
  onClick,
}) => {
  const badgeMeta = CU_BADGES[type];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 min-w-[36px] h-[20px]',
    md: 'text-[13px] px-2.5 py-0.5 min-w-[48px] h-[26px]',
    lg: 'text-[14px] px-3.5 py-1 min-w-[56px] h-[30px]',
  }[size];

  const getBadgeStyle = () => {
    switch (type) {
      case 'plus1':
        return 'bg-[#37D243] text-white shadow-[0_2px_8px_rgba(55,210,67,0.35)]';
      case 'plus2':
        return 'bg-[#8059EA] text-white shadow-[0_2px_8px_rgba(128,89,234,0.35)]';
      case 'new':
        return 'bg-[#FF4757] text-white shadow-[0_2px_8px_rgba(255,71,87,0.3)]';
      case 'best':
        return 'bg-[#FF9800] text-white shadow-[0_2px_8px_rgba(255,152,0,0.3)]';
      case 'cuOnly':
        return 'bg-[#751485] text-[#FFB800] font-black border border-[#FFB800]/40 shadow-[0_2px_8px_rgba(117,20,133,0.3)]';
      case 'sale':
        return 'bg-[#EF4444] text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)]';
      default:
        return 'bg-[#751485] text-white';
    }
  };

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-bold tracking-tight rounded-[30px]
        select-none whitespace-nowrap transition-transform duration-150 hover:scale-105 active:scale-95
        ${sizeClasses}
        ${getBadgeStyle()}
        ${className}
      `}
      title={`${badgeMeta.label} (${badgeMeta.englishLabel})`}
    >
      {type === 'cuOnly' ? (
        <span className="flex items-center gap-0.5">
          <span className="text-[10px] text-white font-normal mr-0.5">CU</span>
          <span>Only</span>
        </span>
      ) : (
        badgeMeta.label
      )}
    </span>
  );
};
