import React from 'react';

export type PebbleCardGeometry = 'asymmetric' | 'asymmetric-alt' | 'squircle' | 'squircle-lg' | 'squircle-modal';
export type PebbleCardSurface = 'butter' | 'rice' | 'oat' | 'highlight-clementine' | 'highlight-matcha';

export interface PebbleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  geometry?: PebbleCardGeometry;
  surface?: PebbleCardSurface;
  interactive?: boolean;
  padded?: boolean | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export const PebbleCard: React.FC<PebbleCardProps> = ({
  children,
  geometry = 'asymmetric',
  surface = 'butter',
  interactive = false,
  padded = 'md',
  border = true,
  className = '',
  ...rest
}) => {
  // Geometries specified in Pebble & Sunbeam blueprint
  const geometryStyles: Record<PebbleCardGeometry, string> = {
    // Top-Left: 28px, Top-Right: 18px, Bottom-Right: 28px, Bottom-Left: 14px
    asymmetric: 'rounded-tl-[28px] rounded-tr-[18px] rounded-br-[28px] rounded-bl-[14px]',
    'asymmetric-alt': 'rounded-tl-[18px] rounded-tr-[28px] rounded-br-[14px] rounded-bl-[28px]',
    squircle: 'rounded-[20px]',
    'squircle-lg': 'rounded-[28px]',
    'squircle-modal': 'rounded-[36px]',
  };

  const surfaceStyles: Record<PebbleCardSurface, string> = {
    butter: 'bg-[#FFFDF9] text-[#2D2522]',
    rice: 'bg-[#F0EAE1] text-[#2D2522]',
    oat: 'bg-[#FAF7F2] text-[#2D2522]',
    'highlight-clementine': 'bg-[#FFF5ED] border-[#FF8A50]/30 text-[#2D2522]',
    'highlight-matcha': 'bg-[#F1FAF5] border-[#5BB98C]/30 text-[#2D2522]',
  };

  const paddingStyles: Record<string, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const paddingClass = typeof padded === 'string' ? paddingStyles[padded] : padded ? paddingStyles.md : 'p-0';

  return (
    <div
      className={`
        relative transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        shadow-[0_10px_24px_-4px_rgba(92,60,40,0.07),0_2px_6px_-1px_rgba(92,60,40,0.03)]
        ${border ? 'border border-[#EADBCE]/70' : ''}
        ${geometryStyles[geometry]}
        ${surfaceStyles[surface]}
        ${paddingClass}
        ${interactive ? 'hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(92,60,40,0.11),0_4px_12px_-2px_rgba(92,60,40,0.05)] cursor-pointer active:translate-y-0 active:scale-[0.99]' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
};
