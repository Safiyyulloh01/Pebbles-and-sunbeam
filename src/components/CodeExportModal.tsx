import React, { useState } from 'react';
import { PebbleModal, PebbleButton } from '../design-system';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [activeSnippet, setActiveSnippet] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState(false);

  const snippets = {
    tailwind: `// tailwind.config.js / @theme tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        'oat-milk': '#FAF7F2',
        'sweet-butter': '#FFFDF9',
        'dark-truffle': '#2D2522',
        'warm-clay': '#786B65',
        'steamed-rice': '#F0EAE1',
        'clementine': '#FF8A50',
        'clementine-dark': '#E5692A',
        'matcha': '#5BB98C',
        'matcha-dark': '#439B6F',
        'berry': '#8C7CFF',
        'spiced-coral': '#EE5D50',
        'honeycomb': '#F5A623',
        'faded-chalk': '#EADBCE',
      },
      borderRadius: {
        'asym': '28px 18px 28px 14px',
        'asym-alt': '18px 28px 14px 28px',
        'modal': '36px',
        'trench': '20px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
};`,
    css: `/* Pebble & Sunbeam Signature CSS Variables & Shadows */
:root {
  --color-oat-milk: #FAF7F2;
  --color-sweet-butter: #FFFDF9;
  --color-dark-truffle: #2D2522;
  --color-warm-clay: #786B65;
  --color-clementine: #FF8A50;
  --color-matcha: #5BB98C;
  --color-berry: #8C7CFF;
  --color-steamed-rice: #F0EAE1;
  --color-spiced-coral: #EE5D50;
  --color-honeycomb: #F5A623;

  /* Easing */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Marshmallow Button 3D Offset */
.btn-marshmallow {
  box-shadow: 0 4px 0 0 #E5692A, 0 8px 18px -2px rgba(92,60,40,0.15);
  transition: transform 180ms var(--ease-spring), box-shadow 180ms var(--ease-spring);
}
.btn-marshmallow:active {
  transform: translateY(3px) scale(0.94);
  box-shadow: 0 1px 0 0 #E5692A, 0 2px 6px -1px rgba(92,60,40,0.10);
}

/* Warm Ambient Shadows */
.shadow-pebble {
  box-shadow: 0 10px 24px -4px rgba(92, 60, 40, 0.07), 0 2px 6px -1px rgba(92, 60, 40, 0.03);
}`,
    react: `import React, { useState } from 'react';

// Example: Volumetric Marshmallow Button with Squish & Release
export function MarshmallowButton({ children, onClick }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      className={\`
        px-5 py-2.5 rounded-[18px] font-bold text-sm bg-[#FF8A50] text-[#2D2522]
        transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        \${pressed
          ? 'translate-y-[3px] scale-[0.94] shadow-[0_1px_0_0_#E5692A]'
          : 'shadow-[0_4px_0_0_#E5692A,0_8px_16px_rgba(92,60,40,0.12)] hover:scale-[1.01]'
        }
      \`}
    >
      {children}
    </button>
  );
}`,
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippets[activeSnippet]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PebbleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Pebble & Sunbeam Tokens"
      subtitle="Copy ready-to-use configuration for Tailwind, CSS, or React"
      maxWidth="max-w-2xl"
      footer={
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-[#786B65]">
            Licensed under Tender Craft Open UI
          </span>
          <div className="flex gap-2">
            <PebbleButton variant="butter" size="sm" onClick={onClose}>
              Done
            </PebbleButton>
            <PebbleButton variant="clementine" size="sm" onClick={handleCopy}>
              {copied ? 'Copied to Clipboard!' : 'Copy Snippet'}
            </PebbleButton>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Format Selector */}
        <div className="flex gap-2 p-1 bg-[#F0EAE1] rounded-[16px] border border-[#E2D8CC]">
          {[
            { id: 'tailwind' as const, label: 'Tailwind Config' },
            { id: 'css' as const, label: 'CSS Variables & Rules' },
            { id: 'react' as const, label: 'React Component' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSnippet(tab.id)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-[12px] transition-colors ${
                activeSnippet === tab.id ? 'bg-[#FFFDF9] text-[#2D2522] shadow-sm' : 'text-[#786B65]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="relative">
          <pre className="p-4 bg-[#2D2522] text-[#FAF7F2] rounded-[20px] text-xs font-mono overflow-x-auto max-h-[340px] leading-relaxed shadow-inner">
            {snippets[activeSnippet]}
          </pre>
        </div>
      </div>
    </PebbleModal>
  );
};
