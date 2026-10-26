import React, { useState } from 'react';
import { CUModal } from '../design-system/components/CUModal';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [activeSnippet, setActiveSnippet] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState(false);

  const snippets = {
    tailwind: `// tailwind.config.js - CU Convenience Store (BGF Retail) Tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        'cu-purple': '#751485', // Pantone 267C Corporate Primary
        'cu-purple-dark': '#580F63',
        'cu-green': '#9DC92A',  // Pantone 368C Brand Secondary
        'cu-lime': '#37D243',   // 1+1 Digital Promotion Lime
        'cu-violet': '#8059EA', // 2+1 Digital Promotion Violet
        'cu-heyroo': '#FFB800', // HEYROO PB Golden Yellow
        'cu-red': '#FF4757',    // NEW / Sale / Fire Alert
        'cu-canvas': '#F5F6F8', // Retail Body Canvas
        'cu-card': '#FFFFFF',   // Product Card Surface
        'cu-border': '#E5E7EB', // Card Border Neutral
      },
      borderRadius: {
        'cu-bubble': '20px 20px 20px 4px', // Speech bubble signature
        'cu-card': '18px',
        'cu-modal': '24px',
      },
      fontFamily: {
        retail: ['Noto Sans KR', 'Roboto', 'sans-serif'],
      },
    },
  },
};`,
    css: `/* CU Convenience Store (BGF Retail) CSS Design Variables */
:root {
  --cu-purple: #751485;
  --cu-purple-dark: #580F63;
  --cu-green: #9DC92A;
  --cu-lime: #37D243;
  --cu-violet: #8059EA;
  --cu-heyroo: #FFB800;
  --cu-red: #FF4757;
  --cu-canvas: #F5F6F8;
  --cu-surface: #FFFFFF;
  --cu-border: #E5E7EB;
  --cu-text-primary: #1E1E1E;
  --cu-text-muted: #666666;

  /* Card Geometry */
  --radius-card: 18px;
  --radius-modal: 24px;
  --radius-bubble: 20px 20px 20px 4px;
}`,
    react: `// React Example: Using CU Design Tokens & Components
import { CUProductCard, CUBadge, CUModal } from '@/design-system';

export function FeaturedPromotions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F5F6F8] p-6">
      <CUProductCard
        product={{
          id: 'yonsei-bread',
          name: 'Yonsei Fresh Milk Cream Bread',
          price: 2900,
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop',
          category: 'snacks_dessert',
          categoryLabel: 'Dessert / Bakery',
          badge: 'plus2',
          secondaryTag: 'cuOnly',
          description: 'Over 80% whipped fresh milk cream by weight!',
          stockCount: 6,
        }}
        onSelect={(p) => console.log('Selected:', p.name)}
        onAddToCart={(p) => console.log('Added to cart:', p.name)}
      />
    </div>
  );
}`,
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippets[activeSnippet]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CUModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      title="Export CU Design Tokens & Code"
      subtitle="Copy ready-to-use Tailwind config, CSS variables, or React code snippets"
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">
            {activeSnippet === 'tailwind' ? 'tailwind.config.js' : activeSnippet === 'css' ? 'tokens.css' : 'React.tsx'}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-[12px] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-[#751485] hover:bg-[#580F63] text-white text-xs font-bold rounded-[12px] shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {copied ? '✓ Copied to Clipboard!' : 'Copy Code Snippet'}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Format Selector */}
        <div className="flex gap-1.5 p-1 bg-gray-100 rounded-[14px]">
          {[
            { id: 'tailwind' as const, label: 'Tailwind Config' },
            { id: 'css' as const, label: 'CSS Variables' },
            { id: 'react' as const, label: 'React Component' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSnippet(tab.id)}
              className={`flex-1 py-2 text-xs font-bold rounded-[10px] transition-all cursor-pointer ${
                activeSnippet === tab.id
                  ? 'bg-white text-[#751485] shadow-xs'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="relative">
          <pre className="p-4 bg-[#1E1E1E] text-[#F5F6F8] rounded-[16px] text-xs font-mono overflow-x-auto max-h-[320px] leading-relaxed shadow-inner">
            {snippets[activeSnippet]}
          </pre>
        </div>
      </div>
    </CUModal>
  );
};
