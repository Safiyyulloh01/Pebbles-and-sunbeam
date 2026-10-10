import React, { useState, forwardRef } from 'react';
import { playShiver } from '../utils/audio';

export interface PebbleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  triggerShiver?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
}

export const PebbleInput = forwardRef<HTMLInputElement, PebbleInputProps>(({
  label,
  helperText,
  error,
  icon,
  iconRight,
  triggerShiver,
  onClear,
  fullWidth = true,
  disabled = false,
  className = '',
  value,
  onChange,
  ...rest
}, ref) => {
  const [shivering, setShivering] = useState(false);

  // Trigger playful shiver when error arrives or triggerShiver is toggled
  React.useEffect(() => {
    if (triggerShiver || error) {
      setShivering(true);
      playShiver();
      const timer = setTimeout(() => setShivering(false), 260);
      return () => clearTimeout(timer);
    }
  }, [triggerShiver, error]);

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} font-body text-left`}>
      {label && (
        <label className="block text-xs font-semibold text-[#786B65] uppercase tracking-wider mb-1.5 ml-1">
          {label}
        </label>
      )}

      <div
        className={`
          relative flex items-center transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          rounded-[20px] bg-[#F0EAE1]
          border border-[#E2D8CC]
          shadow-[inset_0_2px_4px_0_rgba(92,60,40,0.06),inset_0_1px_2px_0_rgba(92,60,40,0.04)]
          ${disabled ? 'opacity-60 bg-[#EADBCE]/50 border-[#DFD5C8]/50 cursor-not-allowed' : 'focus-within:border-[#FF8A50] focus-within:ring-4 focus-within:ring-[#FF8A50]/20 focus-within:bg-[#F6F1EA]'}
          ${error ? 'border-[#EE5D50] ring-4 ring-[#EE5D50]/20 bg-[#FDF2F0]' : ''}
          ${shivering ? 'animate-shiver' : ''}
          ${className}
        `}
      >
        {icon && (
          <span className="pl-4 pr-1 text-[#786B65] shrink-0 flex items-center select-none">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full bg-transparent px-4 py-3 min-h-[46px]
            text-[#2D2522] placeholder-[#A89B95] text-sm font-medium
            outline-none rounded-[20px]
            ${icon ? 'pl-2' : 'pl-4'}
            ${iconRight || onClear || value ? 'pr-2' : 'pr-4'}
          `}
          {...rest}
        />

        {onClear && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 mr-2 text-[#786B65] hover:text-[#2D2522] hover:bg-[#E2D8CC]/60 rounded-full transition-colors"
            title="Clear text"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {iconRight && (
          <span className="pr-4 pl-1 text-[#786B65] shrink-0 flex items-center">
            {iconRight}
          </span>
        )}
      </div>

      {/* Helper text or Error message */}
      {(error || helperText) && (
        <div className="mt-1.5 ml-1 text-xs flex items-center gap-1.5 font-medium">
          {error ? (
            <span className="text-[#EE5D50] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE5D50]" />
              {error}
            </span>
          ) : (
            <span className="text-[#786B65]">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

PebbleInput.displayName = 'PebbleInput';
