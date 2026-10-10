/**
 * Pebble & Sunbeam ("Tender Craft") Design Tokens
 * 
 * A design language treating UI like soft-molded, matte wooden-and-clay toys
 * bathed in warm morning sunlight.
 */

export const PEBBLE_COLORS = {
  // Foundations
  oatMilk: '#FAF7F2',        // Canvas: Warm off-white base
  sweetButter: '#FFFDF9',    // Surface: Elevated card surfaces and popovers
  darkTruffle: '#2D2522',    // Text Primary: Soft roasted-coffee dark brown
  warmClay: '#786B65',       // Text Muted: Secondary labels, timestamps, placeholders
  steamedRice: '#F0EAE1',    // Soft Base / Wells: Input trenches, hover trays
  steamedRiceDark: '#E2D8CC',// Inner border / dugout track

  // Primary & Accents
  clementine: '#FF8A50',     // Primary Accent: Sun-warmed orange-peach
  clementineDark: '#E5692A', // Primary 3D Ridge
  clementineLight: '#FFE8DC',// Primary soft tint

  matcha: '#5BB98C',         // Fresh Accent: Refreshing herbal mint-green
  matchaDark: '#439B6F',     // Fresh 3D Ridge
  matchaLight: '#E3F5EC',    // Fresh soft tint

  berry: '#8C7CFF',          // Playful Accent: Gentle soft lavender-indigo
  berryDark: '#6F5EE5',      // Playful 3D Ridge
  berryLight: '#ECE9FF',     // Playful soft tint

  // Semantic States
  spicedCoral: '#EE5D50',    // Error / Critical: Warm patient coral
  spicedCoralDark: '#CC4337',// Error 3D Ridge
  spicedCoralLight: '#FDECEB',

  honeycomb: '#F5A623',      // Warning / Notice: Wildflower honey
  honeycombDark: '#D4890F',  // Warning 3D Ridge
  honeycombLight: '#FEF5E7',

  // Chalk & Slumber (Disabled)
  fadedChalk: '#EADBCE',     // Disabled wash (60% opacity)
  slumberText: '#A89B95',    // Faded milk-chocolate tone
} as const;

export const PEBBLE_SHADOWS = {
  // Warm golden-hour ambient occlusion (never harsh black opacity)
  sm: '0 4px 12px -2px rgba(92, 60, 40, 0.06), 0 2px 4px -1px rgba(92, 60, 40, 0.04)',
  md: '0 10px 24px -4px rgba(92, 60, 40, 0.07), 0 2px 6px -1px rgba(92, 60, 40, 0.03)',
  lg: '0 16px 36px -6px rgba(92, 60, 40, 0.09), 0 4px 12px -2px rgba(92, 60, 40, 0.04)',
  tray: '0 20px 40px -8px rgba(92, 60, 40, 0.13), 0 6px 14px -2px rgba(92, 60, 40, 0.05)',
  
  // Volumetric Marshmallow Button 3D Ridges
  buttonClementine: '0 4px 0 0 #E5692A, 0 8px 16px -2px rgba(92, 60, 40, 0.12)',
  buttonClementineActive: '0 1px 0 0 #E5692A, 0 2px 6px -1px rgba(92, 60, 40, 0.08)',
  
  buttonMatcha: '0 4px 0 0 #439B6F, 0 8px 16px -2px rgba(92, 60, 40, 0.12)',
  buttonMatchaActive: '0 1px 0 0 #439B6F, 0 2px 6px -1px rgba(92, 60, 40, 0.08)',
  
  buttonBerry: '0 4px 0 0 #6F5EE5, 0 8px 16px -2px rgba(92, 60, 40, 0.12)',
  buttonBerryActive: '0 1px 0 0 #6F5EE5, 0 2px 6px -1px rgba(92, 60, 40, 0.08)',
  
  buttonButter: '0 4px 0 0 #E2D8CC, 0 8px 16px -2px rgba(92, 60, 40, 0.08)',
  buttonButterActive: '0 1px 0 0 #E2D8CC, 0 2px 6px -1px rgba(92, 60, 40, 0.05)',
  
  buttonCoral: '0 4px 0 0 #CC4337, 0 8px 16px -2px rgba(92, 60, 40, 0.12)',
  buttonCoralActive: '0 1px 0 0 #CC4337, 0 2px 6px -1px rgba(92, 60, 40, 0.08)',
} as const;

export const PEBBLE_CURVES = {
  // Continuous superellipses & Asymmetric hand-cut clay shapes
  squircleSm: '14px',
  squircleMd: '18px',
  squircleLg: '24px',
  squircleModal: '36px',
  trench: '20px',
  
  // Diagonal Asymmetric Clay Cards:
  // Top-Left: 28px, Top-Right: 18px, Bottom-Right: 28px, Bottom-Left: 14px
  asymmetricPrimary: '28px 18px 28px 14px',
  asymmetricAlt: '18px 28px 14px 28px',
} as const;

export const PEBBLE_MOTION = {
  // The Signature Bezier Curve: springy overshoot without lingering
  springBezier: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  springTransition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Motion timing presets
  pressDuration: 180, // ms
  releaseDuration: 220, // ms
  shiverDuration: 250, // ms
  breathingPeriod: 1800, // ms
  doughBouncePeriod: 1100, // ms
} as const;
