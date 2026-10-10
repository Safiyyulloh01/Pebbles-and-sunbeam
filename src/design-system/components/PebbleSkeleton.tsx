import React from 'react';

export interface PebbleSkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'button' | 'badge';
  width?: string;
  height?: string;
  className?: string;
}

export const PebbleSkeleton: React.FC<PebbleSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-[10px]',
    title: 'h-7 w-3/4 rounded-[14px]',
    avatar: 'w-12 h-12 rounded-full shrink-0',
    card: 'h-40 w-full squircle-asym',
    button: 'h-11 w-32 rounded-[18px]',
    badge: 'h-6 w-16 rounded-[12px]',
  }[variant];

  return (
    <div
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
      }}
      className={`
        skeleton-breathing border border-[#EADBCE]/50 shrink-0
        ${variantStyles}
        ${className}
      `}
      aria-hidden="true"
    />
  );
};
