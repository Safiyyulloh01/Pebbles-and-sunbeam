import React from 'react';

export interface PebbleSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  color?: 'clementine' | 'matcha' | 'berry';
  className?: string;
}

export const PebbleSpinner: React.FC<PebbleSpinnerProps> = ({
  size = 'md',
  label,
  color = 'clementine',
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-12', blob: 'w-6 h-6', baseline: 'w-10' },
    md: { box: 'w-16 h-16', blob: 'w-9 h-9', baseline: 'w-14' },
    lg: { box: 'w-24 h-24', blob: 'w-14 h-14', baseline: 'w-20' },
  }[size];

  const colorStyles = {
    clementine: {
      blob: 'bg-[#FF8A50] shadow-[0_4px_12px_rgba(255,138,80,0.35)]',
      highlight: 'bg-[#FFE2D1]',
      floor: 'bg-[#E2D8CC]',
    },
    matcha: {
      blob: 'bg-[#5BB98C] shadow-[0_4px_12px_rgba(91,185,140,0.35)]',
      highlight: 'bg-[#E3F5EC]',
      floor: 'bg-[#D2E7DB]',
    },
    berry: {
      blob: 'bg-[#8C7CFF] shadow-[0_4px_12px_rgba(140,124,255,0.35)]',
      highlight: 'bg-[#ECE9FF]',
      floor: 'bg-[#DDD8FA]',
    },
  }[color];

  return (
    <div className={`inline-flex flex-col items-center justify-center font-body ${className}`}>
      {/* Container with baseline */}
      <div className={`relative flex flex-col items-center justify-end ${sizeMap.box}`}>
        {/* Squishy Dough Drop */}
        <div
          className={`
            ${sizeMap.blob} rounded-full animate-dough relative z-10
            ${colorStyles.blob}
          `}
        >
          {/* Gentle sunlight reflection shine */}
          <span
            className={`
              absolute top-1 left-1.5 w-2 h-2 rounded-full opacity-70
              ${colorStyles.highlight}
            `}
          />
        </div>

        {/* Tactile Floor ripple baseline */}
        <div
          className={`
            ${sizeMap.baseline} h-1 rounded-full opacity-60 mt-1
            ${colorStyles.floor}
          `}
        />
      </div>

      {label && (
        <span className="text-xs font-semibold text-[#786B65] mt-2 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};
