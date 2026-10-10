import React, { useState, useRef } from 'react';
import { playMarshmallowSquish, playMarshmallowRelease } from '../utils/audio';

export type PebbleButtonVariant = 'clementine' | 'matcha' | 'berry' | 'butter' | 'coral' | 'chalk';
export type PebbleButtonSize = 'sm' | 'md' | 'lg';

export interface PebbleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PebbleButtonVariant;
  size?: PebbleButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  tooltipNotice?: string;
  onTapSound?: boolean;
}

export const PebbleButton: React.FC<PebbleButtonProps> = ({
  children,
  variant = 'clementine',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  tooltipNotice,
  onTapSound = true,
  className = '',
  onClick,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [recoil, setRecoil] = useState(false);
  const [showRestingTooltip, setShowRestingTooltip] = useState(false);
  const pressStartTime = useRef<number>(0);
  const releaseTimer = useRef<number | null>(null);

  const handlePointerDown = () => {
    if (disabled || loading) return;
    if (releaseTimer.current) {
      clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
    }
    pressStartTime.current = Date.now();
    setIsPressed(true);
    setRecoil(false);
    if (onTapSound) {
      const tone = size === 'lg' ? 'low' : size === 'sm' ? 'high' : 'mid';
      playMarshmallowSquish(tone);
    }
  };

  const handlePointerUpOrLeave = (isLeaving = false) => {
    if (disabled || loading || !isPressed) return;
    
    // Ensure minimum visual tactile squish window (110ms) so mobile touchscreen taps don't skip animations
    const elapsed = Date.now() - pressStartTime.current;
    const minHoldDuration = 110;
    const remainingTime = Math.max(0, minHoldDuration - elapsed);

    releaseTimer.current = window.setTimeout(() => {
      setIsPressed(false);
      if (!isLeaving) {
        setRecoil(true);
        if (onTapSound) playMarshmallowRelease();
        setTimeout(() => setRecoil(false), 220);
      }
    }, remainingTime);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      // Gentle soft bounce back for unavailable controls
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 140);
      return;
    }
    onClick?.(e);
  };

  // Size styling ensuring minimum 44px touch targets on mobile
  const sizeStyles: Record<PebbleButtonSize, string> = {
    sm: 'text-xs font-semibold px-4 py-2 min-h-[42px] rounded-[16px]',
    md: 'text-sm font-semibold px-5 py-2.5 min-h-[46px] rounded-[18px]',
    lg: 'text-base font-bold px-7 py-3.5 min-h-[52px] rounded-[22px]',
  };

  // Volumetric pseudo-3D ridges and colors
  const variantStyles: Record<PebbleButtonVariant, {
    base: string;
    shadowIdle: string;
    shadowActive: string;
    text: string;
  }> = {
    clementine: {
      base: 'bg-[#FF8A50] text-[#2D2522]',
      shadowIdle: 'shadow-[0_4px_0_0_#E5692A,0_8px_18px_-2px_rgba(92,60,40,0.15)]',
      shadowActive: 'shadow-[0_1px_0_0_#E5692A,0_2px_6px_-1px_rgba(92,60,40,0.10)]',
      text: 'text-[#2D2522]',
    },
    matcha: {
      base: 'bg-[#5BB98C] text-[#FFFDF9]',
      shadowIdle: 'shadow-[0_4px_0_0_#439B6F,0_8px_18px_-2px_rgba(92,60,40,0.14)]',
      shadowActive: 'shadow-[0_1px_0_0_#439B6F,0_2px_6px_-1px_rgba(92,60,40,0.10)]',
      text: 'text-[#FFFDF9]',
    },
    berry: {
      base: 'bg-[#8C7CFF] text-[#FFFDF9]',
      shadowIdle: 'shadow-[0_4px_0_0_#6F5EE5,0_8px_18px_-2px_rgba(92,60,40,0.14)]',
      shadowActive: 'shadow-[0_1px_0_0_#6F5EE5,0_2px_6px_-1px_rgba(92,60,40,0.10)]',
      text: 'text-[#FFFDF9]',
    },
    butter: {
      base: 'bg-[#FFFDF9] text-[#2D2522] border border-[#EADBCE]/70',
      shadowIdle: 'shadow-[0_4px_0_0_#E2D8CC,0_8px_16px_-2px_rgba(92,60,40,0.08)]',
      shadowActive: 'shadow-[0_1px_0_0_#E2D8CC,0_2px_4px_-1px_rgba(92,60,40,0.05)]',
      text: 'text-[#2D2522]',
    },
    coral: {
      base: 'bg-[#EE5D50] text-[#FFFDF9]',
      shadowIdle: 'shadow-[0_4px_0_0_#CC4337,0_8px_18px_-2px_rgba(92,60,40,0.14)]',
      shadowActive: 'shadow-[0_1px_0_0_#CC4337,0_2px_6px_-1px_rgba(92,60,40,0.10)]',
      text: 'text-[#FFFDF9]',
    },
    chalk: {
      base: 'bg-[#EADBCE]/60 text-[#A89B95] border border-[#DFD5C8]/50 shadow-none cursor-default',
      shadowIdle: 'shadow-none',
      shadowActive: 'shadow-none',
      text: 'text-[#A89B95]',
    },
  };

  const currentVariant = disabled ? variantStyles.chalk : variantStyles[variant];

  // Motion transform calculations
  let transformClass = '';
  if (disabled) {
    transformClass = isPressed ? 'scale-[0.98]' : 'scale-100';
  } else if (isPressed) {
    transformClass = 'translate-y-[3px] scale-[0.94]';
  } else if (recoil) {
    transformClass = 'translate-y-0 scale-[1.03]';
  } else {
    transformClass = 'translate-y-0 scale-100 hover:scale-[1.01]';
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => disabled && setShowRestingTooltip(true)}
      onMouseLeave={() => setShowRestingTooltip(false)}
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={() => handlePointerUpOrLeave(false)}
        onPointerLeave={() => handlePointerUpOrLeave(true)}
        onPointerCancel={() => handlePointerUpOrLeave(true)}
        onClick={handleClick}
        disabled={disabled && !tooltipNotice}
        aria-disabled={disabled}
        className={`
          relative inline-flex items-center justify-center gap-2 font-display select-none
          transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          outline-none focus-visible:ring-4 focus-visible:ring-[#FF8A50]/40
          whitespace-nowrap touch-manipulation
          ${sizeStyles[size]}
          ${currentVariant.base}
          ${isPressed || disabled ? currentVariant.shadowActive : currentVariant.shadowIdle}
          ${transformClass}
          ${className}
        `}
        style={{
          WebkitTapHighlightColor: 'transparent',
        }}
        {...rest}
      >
        {loading && (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-1" />
        )}
        {icon && !loading && <span className="shrink-0 flex items-center">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
      </button>

      {/* Gentle "Chalk & Slumber" indicator speech bubble tooltip */}
      {disabled && tooltipNotice && showRestingTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none animate-bubble">
          <div className="bg-[#2D2522] text-[#FAF7F2] text-xs font-medium px-3 py-1.5 rounded-[12px] shadow-lg whitespace-nowrap flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF8A50]" />
            {tooltipNotice}
          </div>
          <div className="w-2 h-2 bg-[#2D2522] rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
};
