import React from 'react';

export interface PebbleProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  color?: 'clementine' | 'matcha' | 'berry' | 'honeycomb';
  striped?: boolean;
  className?: string;
}

export const PebbleProgressBar: React.FC<PebbleProgressBarProps> = ({
  progress,
  label,
  sublabel,
  showPercentage = true,
  color = 'clementine',
  striped = true,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const colorStyles = {
    clementine: {
      bar: 'bg-[#FF8A50]',
      beadGlow: 'shadow-[0_0_6px_1px_rgba(255,255,255,0.9),0_0_8px_2px_rgba(255,138,80,0.6)]',
    },
    matcha: {
      bar: 'bg-[#5BB98C]',
      beadGlow: 'shadow-[0_0_6px_1px_rgba(255,255,255,0.9),0_0_8px_2px_rgba(91,185,140,0.6)]',
    },
    berry: {
      bar: 'bg-[#8C7CFF]',
      beadGlow: 'shadow-[0_0_6px_1px_rgba(255,255,255,0.9),0_0_8px_2px_rgba(140,124,255,0.6)]',
    },
    honeycomb: {
      bar: 'bg-[#F5A623]',
      beadGlow: 'shadow-[0_0_6px_1px_rgba(255,255,255,0.9),0_0_8px_2px_rgba(245,166,35,0.6)]',
    },
  }[color];

  return (
    <div className={`w-full font-body ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-bold text-[#2D2522] mb-2">
          <span>{label}</span>
          {showPercentage && <span className="font-mono text-[#786B65] tabular-nums">{Math.round(clamped)}%</span>}
        </div>
      )}

      {/* Deep, rounded dugout track (height: 14px, border-radius: 999px) in warm Steamed Rice */}
      <div className="relative w-full h-3.5 bg-[#F0EAE1] rounded-full p-0.5 border border-[#E2D8CC] shadow-[inset_0_2px_4px_rgba(92,60,40,0.08)] overflow-hidden flex items-center">
        {/* Filled bar with rounded pill caps */}
        <div
          className={`
            h-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative flex items-center
            ${colorStyles.bar}
            ${striped ? 'candy-stripes' : ''}
          `}
          style={{ width: `${clamped}%` }}
        >
          {/* Trailing "glow bead" perfectly seated inside the leading pill cap */}
          {clamped >= 3 && (
            <div
              className={`
                absolute right-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFDF9] pointer-events-none z-10
                ${colorStyles.beadGlow}
              `}
            />
          )}
        </div>
      </div>

      {sublabel && (
        <p className="text-[11px] text-[#786B65] mt-1.5 font-medium">
          {sublabel}
        </p>
      )}
    </div>
  );
};
