import React from 'react';

export type PebbleBadgeColor = 'clementine' | 'matcha' | 'berry' | 'honeycomb' | 'coral' | 'rice';

export interface PebbleBadgeProps {
  children: React.ReactNode;
  color?: PebbleBadgeColor;
  doodle?: 'sparkle' | 'ring' | 'dot' | 'none';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PebbleBadge: React.FC<PebbleBadgeProps> = ({
  children,
  color = 'rice',
  doodle = 'none',
  interactive = false,
  onClick,
  className = '',
}) => {
  const colorStyles = {
    clementine: 'bg-[#FFE8DC] text-[#D45417] border-[#FF8A50]/40',
    matcha: 'bg-[#E3F5EC] text-[#347E5A] border-[#5BB98C]/40',
    berry: 'bg-[#ECE9FF] text-[#5B46D9] border-[#8C7CFF]/40',
    honeycomb: 'bg-[#FEF5E7] text-[#B87000] border-[#F5A623]/40',
    coral: 'bg-[#FDECEB] text-[#BF3327] border-[#EE5D50]/40',
    rice: 'bg-[#F0EAE1] text-[#2D2522] border-[#E2D8CC]',
  }[color];

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-xs font-bold font-body
        border select-none transition-transform
        ${colorStyles}
        ${interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
        ${className}
      `}
    >
      {doodle === 'dot' && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />
      )}

      {doodle === 'sparkle' && (
        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8 8 2.5-8 2.5L12 21l-2.5-8L1.5 10.5 9.5 8 12 0z" />
        </svg>
      )}

      {doodle === 'ring' && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}

      <span>{children}</span>
    </span>
  );
};
