import React from 'react';
import { CUBadge, CUBadgeType } from './CUBadge';

export interface CUProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: 'fresh_food' | 'ready_meal' | 'snacks_dessert' | 'beverages' | 'icecream' | 'pb_heyroo';
  categoryLabel: string;
  badge?: CUBadgeType;
  secondaryTag?: CUBadgeType;
  description: string;
  storageType?: 'Chilled' | 'Frozen' | 'Room Temp';
  microwaveTime?: string;
  stockCount: number;
  calories?: string;
  tags?: string[];
}

interface CUProductCardProps {
  product: CUProductItem;
  onSelect?: (product: CUProductItem) => void;
  onAddToCart?: (product: CUProductItem, e: React.MouseEvent) => void;
  onCheckStock?: (product: CUProductItem, e: React.MouseEvent) => void;
  compact?: boolean;
  className?: string;
}

/**
 * Authentic CU Convenience Store Product Card
 * Faithfully mirrors the .prod_list > .prod_item DOM & CSS structure of https://cu.bgfretail.com
 */
export const CUProductCard: React.FC<CUProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onCheckStock,
  compact = false,
  className = '',
}) => {
  const isOutOfStock = product.stockCount <= 0;
  const isLowStock = product.stockCount > 0 && product.stockCount <= 3;

  return (
    <div
      onClick={() => onSelect?.(product)}
      className={`
        group relative flex flex-col bg-white border border-[#E5E7EB] rounded-[18px] overflow-hidden
        transition-all duration-200 ease-out cursor-pointer hover:border-[#751485]/40
        hover:shadow-[0_10px_24px_-4px_rgba(117,20,133,0.12),0_4px_8px_-2px_rgba(0,0,0,0.04)]
        ${className}
      `}
    >
      {/* Top Left Promotion Badge (1+1 / 2+1) */}
      {product.badge && (
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <CUBadge type={product.badge} size={compact ? 'sm' : 'md'} />
        </div>
      )}

      {/* Top Right Status Tag (NEW / BEST / CU Only) */}
      {product.secondaryTag && (
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <CUBadge type={product.secondaryTag} size={compact ? 'sm' : 'md'} />
        </div>
      )}

      {/* Product Image Area: 1:1 Aspect Ratio with Uniform Framing */}
      <div className="relative w-full aspect-square bg-[#F8F9FA] flex items-center justify-center p-2.5 sm:p-3 overflow-hidden border-b border-[#F0F2F5]">
        <div className="w-full h-full rounded-[12px] overflow-hidden bg-white shadow-2xs flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-[#1E1E1E] text-white text-[11px] font-black px-3 py-1.5 rounded-full border border-white/20 shadow-md">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Storage Badge */}
        {product.storageType && (
          <div className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-gray-600 shadow-xs border border-gray-200">
            {product.storageType}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category Chip & Stock indicator */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-bold text-[#751485]">{product.categoryLabel}</span>
            {isLowStock && !isOutOfStock && (
              <span className="text-[#FF4757] font-bold text-[10px] bg-[#FFEAEA] px-1.5 py-0.2 rounded-full">
                Only {product.stockCount} left
              </span>
            )}
          </div>

          {/* Product Name (Clamped to 2 lines for uniform card heights) */}
          <h3
            className="text-[13px] sm:text-[14px] font-bold text-[#1E1E1E] leading-snug line-clamp-2 min-h-[38px] group-hover:text-[#751485] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price Section */}
        <div className="mt-2.5 pt-2 border-t border-[#F3F4F6] flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[14px] text-[#751485] font-black">₩</span>
            <span className="font-['Roboto'] font-black text-[18px] sm:text-[20px] text-[#1E1E1E] tracking-tight">
              {product.price.toLocaleString()}
            </span>

            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through ml-1">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Promotional Unit Value Indicator */}
          {product.badge === 'plus1' && (
            <span className="text-[10px] font-bold text-[#2BB836] bg-[#EBFCEB] px-1.5 py-0.5 rounded">
              ₩{(Math.round(product.price / 2)).toLocaleString()} ea
            </span>
          )}
          {product.badge === 'plus2' && (
            <span className="text-[10px] font-bold text-[#8059EA] bg-[#F2EFFD] px-1.5 py-0.5 rounded">
              ₩{(Math.round((product.price * 2) / 3)).toLocaleString()} ea
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCheckStock?.(product, e);
            }}
            className="text-[11px] font-bold py-1.5 px-2 rounded-[10px] bg-[#F3F4F6] text-gray-700 hover:bg-[#E5E7EB] hover:text-black transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[#751485]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Stock
          </button>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product, e);
            }}
            className={`
              text-[11px] font-bold py-1.5 px-2 rounded-[10px] transition-all flex items-center justify-center gap-1 cursor-pointer
              ${isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#751485] text-white hover:bg-[#580F63] active:scale-95 shadow-[0_2px_6px_rgba(117,20,133,0.25)]'
              }
            `}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
