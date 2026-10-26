/**
 * CU Convenience Store (BGF Retail) Official & Digital Design Tokens
 * 
 * Based on deep architectural analysis of:
 * - https://cu.bgfretail.com
 * - BGF Retail Corporate Identity & CU Brand Identity (Pantone 267C & 368C)
 * - Pocket CU Mobile Application & O4O Platform
 */

export const CU_COLORS = {
  // Official Corporate Brand Identity (Pantone Standard)
  purplePrimary: '#751485',    // Pantone 267C - "Core Value & Cherishing Customers"
  purpleDeep: '#580F63',       // Deep purple shade for active states & high contrast
  purpleLight: '#F6EDF8',      // Soft pastel purple tint for backgrounds and chips
  purpleHover: '#8C1F9E',      // Interactive hover state

  greenPrimary: '#9DC92A',     // Pantone 368C - "Freshness & Innovation"
  greenDigital: '#37D243',     // Digital 1+1 Badge Vibrant Lime Green (Web & App Production)
  greenDark: '#2BB836',        // Darker green for borders and high-visibility text
  greenLight: '#EBFCEB',       // Soft green tint for badges and banner backgrounds

  // Digital Secondary & Promotion Badges
  violetPlus2: '#8059EA',      // Digital 2+1 Promotion Badge (Pocket CU signature)
  violetDark: '#6837F8',       // Deep violet ridge & active state
  violetLight: '#F2EFFD',      // Soft violet background tint

  heyrooYellow: '#FFB800',     // HEYROO (CU PB Private Brand mascot) vibrant yellow
  heyrooYellowDark: '#E5A500', // Warm amber ridge
  heyrooYellowLight: '#FFF9E6',// Light yellow background for PB banners

  alertRed: '#FF4757',         // Hot / New / Sale badge & Urgent stock notice
  alertRedLight: '#FFF0F2',    // Subtle red background
  alertRedDark: '#E03040',

  // Sub Colors (BGF Retail Guidelines)
  darkBeige: '#D8CEBF',        // Warm organic natural beige accent
  lightBeige: '#FAF6F0',       // Background canvas warm beige alternative
  grayText: '#777777',         // Secondary metadata, SKU, timestamps
  grayBorder: '#DCDCDC',       // Default UI card border
  grayLight: '#F5F5F5',        // Hover trays & input wells

  // Digital Canvas & Surface
  canvas: '#F5F6F8',           // Crisp modern retail background
  surface: '#FFFFFF',          // High-contrast clean white product card surface
  textPrimary: '#1E1E1E',      // Primary crisp charcoal-black readability
  textSecondary: '#5A5A5A',    // Product subtitles and categories
  textMuted: '#8E8E93',        // Barcode numbers, legal notes, inactive tabs
  borderSubtle: '#EFEFEF',     // Subtle dividers
  borderCard: '#DEDEDE',       // Authentic CU product card border
} as const;

export const CU_BADGES = {
  plus1: {
    label: '1+1',
    englishLabel: 'Buy 1 Get 1 Free',
    bg: '#37D243',
    textColor: '#FFFFFF',
    description: 'Buy 1, Get 1 Free promotion',
  },
  plus2: {
    label: '2+1',
    englishLabel: 'Buy 2 Get 1 Free',
    bg: '#8059EA',
    textColor: '#FFFFFF',
    description: 'Buy 2, Get 1 Free promotion',
  },
  new: {
    label: 'NEW',
    englishLabel: 'New Arrival',
    bg: '#FF4757',
    textColor: '#FFFFFF',
    description: 'New product release',
  },
  best: {
    label: 'BEST',
    englishLabel: 'Best Seller',
    bg: '#FF9800',
    textColor: '#FFFFFF',
    description: 'Best-selling trending item',
  },
  cuOnly: {
    label: 'CU Only',
    englishLabel: 'HEYROO / PB Exclusive',
    bg: '#751485',
    accent: '#FFB800',
    textColor: '#FFFFFF',
    description: 'Exclusive CU PB & HEYROO item',
  },
  sale: {
    label: 'SALE',
    englishLabel: 'Special Discount',
    bg: '#EF4444',
    textColor: '#FFFFFF',
    description: 'Special discount price',
  },
} as const;

export const CU_TYPOGRAPHY = {
  fontFamilies: {
    primary: "'Noto Sans KR', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    numeric: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    brand: "'Outfit', 'Noto Sans KR', sans-serif",
  },
  sizes: {
    priceHero: '24px',
    priceWon: '18px',
    productTitle: '16px',
    badgeText: '13px',
    meta: '12px',
  },
  weights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
} as const;

export const CU_SHADOWS = {
  card: '0 4px 16px -2px rgba(117, 20, 133, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
  cardHover: '0 12px 28px -4px rgba(117, 20, 133, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
  modal: '0 24px 48px -12px rgba(117, 20, 133, 0.18), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
  oneQR: '0 16px 36px -6px rgba(128, 89, 234, 0.2), 0 6px 12px -2px rgba(0, 0, 0, 0.05)',
  buttonPrimary: '0 4px 12px rgba(117, 20, 133, 0.25)',
  buttonGreen: '0 4px 12px rgba(55, 210, 67, 0.25)',
} as const;

export const CU_CURVES = {
  cardDesktop: '16px',       // Authentic CU .prod_item border-radius: 16px
  cardMobile: '12px',        // Authentic CU mobile .prod_item border-radius: 12px
  pillBadge: '30px',         // Authentic CU .badge > span border-radius: 30px
  speechBubble: '24px 24px 24px 4px', // Nice to CU conversational speech bubble motif
  button: '14px',
  modal: '28px',
} as const;
