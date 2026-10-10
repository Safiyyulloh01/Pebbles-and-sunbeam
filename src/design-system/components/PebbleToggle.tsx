import React, { useState } from 'react';
import { playWobblePop } from '../utils/audio';

export interface PebbleToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  color?: 'matcha' | 'clementine' | 'berry';
  className?: string;
}

export const PebbleToggle: React.FC<PebbleToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  color = 'matcha',
  className = '',
}) => {
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (disabled) return;
    setAnimating(true);
    const nextVal = !checked;
    playWobblePop(nextVal);
    onChange(nextVal);
    setTimeout(() => setAnimating(false), 240);
  };

  const colorStyles = {
    matcha: {
      trackOn: 'bg-[#5BB98C] border-[#439B6F]',
      headShadow: 'shadow-[0_2px_4px_0_rgba(67,155,111,0.3)]',
    },
    clementine: {
      trackOn: 'bg-[#FF8A50] border-[#E5692A]',
      headShadow: 'shadow-[0_2px_4px_0_rgba(229,105,42,0.3)]',
    },
    berry: {
      trackOn: 'bg-[#8C7CFF] border-[#6F5EE5]',
      headShadow: 'shadow-[0_2px_4px_0_rgba(111,94,229,0.3)]',
    },
  }[color];

  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
      className={`
        inline-flex items-center gap-3.5 select-none
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer group'}
        ${className}
      `}
    >
      {/* Switch Track (Scooped dugout pill, perfectly centered in Y axis and overflow contained) */}
      <div
        className={`
          relative w-14 h-8 rounded-full p-1 transition-colors duration-220 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          border flex items-center overflow-hidden shrink-0
          shadow-[inset_0_2px_4px_0_rgba(92,60,40,0.08)]
          ${checked ? colorStyles.trackOn : 'bg-[#F0EAE1] border-[#E2D8CC]'}
        `}
      >
        {/* Switch Head (Volumetric butter button with wobble bloom, contained strictly within track) */}
        <div
          className={`
            w-6 h-6 rounded-full bg-[#FFFDF9] shrink-0
            shadow-[0_2px_5px_0_rgba(92,60,40,0.18),0_1px_1px_0_rgba(92,60,40,0.1)]
            transition-all duration-220 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            flex items-center justify-center
            ${checked ? 'translate-x-[22px]' : 'translate-x-0'}
            ${animating ? 'scale-x-[1.14] scale-y-[0.88]' : 'scale-100'}
          `}
        >
          {/* Subtle micro dot inside head, centered in both axes */}
          <span
            className={`
              w-2 h-2 rounded-full transition-colors duration-200 shrink-0
              ${checked ? (color === 'matcha' ? 'bg-[#5BB98C]' : color === 'clementine' ? 'bg-[#FF8A50]' : 'bg-[#8C7CFF]') : 'bg-[#E2D8CC]'}
            `}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-sm font-bold text-[#2D2522] group-hover:text-[#FF8A50] transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#786B65] font-medium leading-relaxed">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
