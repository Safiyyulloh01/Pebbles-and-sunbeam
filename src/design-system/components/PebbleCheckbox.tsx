import React, { useState } from 'react';
import { playCheckboxTick } from '../utils/audio';

export interface PebbleCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  subtext?: string;
  disabled?: boolean;
  color?: 'matcha' | 'clementine' | 'berry';
  className?: string;
}

export const PebbleCheckbox: React.FC<PebbleCheckboxProps> = ({
  checked,
  onChange,
  label,
  subtext,
  disabled = false,
  color = 'matcha',
  className = '',
}) => {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setBouncing(true);
    const nextVal = !checked;
    playCheckboxTick(nextVal);
    onChange(nextVal);
    setTimeout(() => setBouncing(false), 240);
  };

  const activeStyles = {
    matcha: 'bg-[#5BB98C] border-[#439B6F] shadow-[0_3px_0_0_#439B6F,0_4px_10px_rgba(91,185,140,0.3)]',
    clementine: 'bg-[#FF8A50] border-[#E5692A] shadow-[0_3px_0_0_#E5692A,0_4px_10px_rgba(255,138,80,0.3)]',
    berry: 'bg-[#8C7CFF] border-[#6F5EE5] shadow-[0_3px_0_0_#6F5EE5,0_4px_10px_rgba(140,124,255,0.3)]',
  }[color];

  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={`
        inline-flex items-center gap-3 select-none min-h-[44px]
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer group'}
        ${className}
      `}
    >
      <div
        className={`
          relative w-6 h-6 rounded-[10px] flex items-center justify-center shrink-0
          transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          border
          ${checked ? activeStyles : 'bg-[#F0EAE1] border-[#E2D8CC] shadow-[inset_0_2px_4px_rgba(92,60,40,0.06)] group-hover:border-[#FF8A50]/50'}
          ${bouncing ? 'scale-125' : 'scale-100'}
        `}
      >
        <svg
          className={`w-3.5 h-3.5 text-white stroke-[3.5] transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      {(label || subtext) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-sm font-semibold text-[#2D2522] group-hover:text-[#FF8A50] transition-colors leading-snug">
              {label}
            </span>
          )}
          {subtext && (
            <span className="text-xs text-[#786B65] font-normal leading-tight mt-0.5">
              {subtext}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
