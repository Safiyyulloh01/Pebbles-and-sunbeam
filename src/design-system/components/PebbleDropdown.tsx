import React, { useState, useRef, useEffect } from 'react';
import { playDropdownWhoosh, playWobblePop } from '../utils/audio';

export interface PebbleDropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  hint?: string;
}

export interface PebbleDropdownProps {
  label?: string;
  options: PebbleDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const PebbleDropdown: React.FC<PebbleDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  const closeDropdown = () => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    playDropdownWhoosh(false);
    setTimeout(() => {
      setIsOpen(false);
      setIsRendered(false);
      setIsClosing(false);
    }, 160);
  };

  const openDropdown = () => {
    setIsRendered(true);
    setIsClosing(false);
    setIsOpen(true);
    playDropdownWhoosh(true);
  };

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isClosing]);

  const handleSelect = (val: string) => {
    playWobblePop(true);
    onChange(val);
    closeDropdown();
  };

  return (
    <div ref={dropdownRef} className={`relative font-body text-left ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-[#786B65] uppercase tracking-wider mb-1.5 ml-1">
          {label}
        </label>
      )}

      {/* Trigger Bar: Scooped pill trench with embedded circular backflipping chevron */}
      <button
        type="button"
        onClick={handleToggle}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-2.5 min-h-[46px]
          bg-[#F0EAE1] hover:bg-[#EAE4DC] border border-[#E2D8CC]
          rounded-[20px] shadow-[inset_0_2px_4px_rgba(92,60,40,0.05)]
          transition-all duration-200 outline-none
          focus-visible:ring-4 focus-visible:ring-[#FF8A50]/20
        `}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="text-base shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`text-sm font-semibold ${selectedOption ? 'text-[#2D2522]' : 'text-[#A89B95]'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        {/* Embedded circular backflipping chevron button */}
        <span
          className={`
            w-7 h-7 rounded-full bg-[#FFFDF9] text-[#786B65] flex items-center justify-center
            shadow-[0_2px_4px_rgba(92,60,40,0.1)] border border-[#E2D8CC]/50 shrink-0
            transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isOpen ? 'rotate-180 scale-105' : 'rotate-0 scale-100'}
          `}
        >
          <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Floating Menu Tray: 8px floating gap with entrance & exit animation */}
      {isRendered && (
        <div
          className={`
            absolute left-0 right-0 top-full mt-2 z-40
            bg-[#FFFDF9] border border-[#EADBCE]/80
            rounded-[22px] p-2
            shadow-[0_16px_36px_-6px_rgba(92,60,40,0.15),0_4px_12px_-2px_rgba(92,60,40,0.06)]
            ${isClosing ? 'animate-sprout-out' : 'animate-sprout'}
            flex flex-col gap-1
          `}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`
                  relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-[16px]
                  text-left text-sm font-semibold transition-all duration-150
                  ${isSelected ? 'bg-[#F0EAE1] text-[#2D2522]' : 'text-[#786B65] hover:text-[#2D2522] hover:bg-[#FAF7F2]'}
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon && <span className="text-base">{opt.icon}</span>}
                  <span className="truncate">{opt.label}</span>
                  {opt.hint && (
                    <span className="text-xs font-normal text-[#A89B95] ml-1">
                      {opt.hint}
                    </span>
                  )}
                </div>

                {/* Selected indicator: Matcha-green dot nestled inside a micro-squircle */}
                {isSelected && (
                  <span className="w-5 h-5 rounded-[8px] bg-[#E3F5EC] flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#5BB98C]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
