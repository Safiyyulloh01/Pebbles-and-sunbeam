import React, { useState, useEffect, useCallback } from 'react';
import { CUProductItem } from './CUProductCard';
import { playModalClose, playModalOpen } from '../utils/audio';

interface CUStockModalProps {
  product: CUProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

interface StoreStockItem {
  id: string;
  storeName: string;
  distance: string;
  address: string;
  stock: number;
  open24h: boolean;
  services: string[];
}

export const CUStockModal: React.FC<CUStockModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('Gangnam');

  const handleClose = useCallback(() => {
    playModalClose();
    onClose();
  }, [onClose]);

  // Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen || !product) return;

    playModalOpen();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, product, handleClose]);

  if (!isOpen || !product) return null;

  const sampleStores: StoreStockItem[] = [
    {
      id: 'store-1',
      storeName: 'CU Teheran Main Branch',
      distance: '110m',
      address: '405 Teheran-ro, Gangnam-gu, Seoul (BGF Retail HQ 1F)',
      stock: Math.max(0, product.stockCount + 4),
      open24h: true,
      services: ['24H', 'Quick Pickup', 'Parcel', 'Bakery', 'ATM'],
    },
    {
      id: 'store-2',
      storeName: 'CU Gangnam Station',
      distance: '280m',
      address: '390 Gangnam-daero, Gangnam-gu, Seoul',
      stock: Math.max(0, product.stockCount),
      open24h: true,
      services: ['24H', 'Quick Pickup', 'Parcel', 'Fried Chicken'],
    },
    {
      id: 'store-3',
      storeName: 'CU Yeoksam Star',
      distance: '540m',
      address: '218 Teheran-ro, Gangnam-gu, Seoul',
      stock: 1,
      open24h: true,
      services: ['24H', 'Quick Pickup', 'ATM'],
    },
    {
      id: 'store-4',
      storeName: 'CU Seolleung Center',
      distance: '820m',
      address: '512 Seolleung-ro, Gangnam-gu, Seoul',
      stock: 0,
      open24h: false,
      services: ['Quick Pickup', 'Parcel'],
    },
  ];

  const filteredStores = sampleStores.filter(
    (s) =>
      s.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden border border-[#DEDEDE] flex flex-col max-h-[85vh] my-auto transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF7F2] p-5 border-b border-[#EADBCE]/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#37D243]" />
              <span className="font-bold text-xs text-[#751485]">Live In-Store Stock Lookup</span>
            </div>
            <h3 className="font-bold text-base text-[#1E1E1E] mt-0.5 line-clamp-1">
              {product.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close stock modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search neighborhood or store name..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-[14px] text-xs focus:outline-none focus:border-[#751485] focus:bg-white"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Store List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {filteredStores.map((store) => {
            const hasStock = store.stock > 0;
            return (
              <div
                key={store.id}
                className="p-3.5 rounded-[16px] border border-gray-100 bg-white hover:border-[#751485]/40 hover:shadow-xs transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#1E1E1E]">{store.storeName}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-[#751485]">
                      {store.distance}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">{store.address}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {store.services.map((svc) => (
                      <span
                        key={svc}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stock Indicator */}
                <div className="text-right shrink-0">
                  <div
                    className={`text-sm font-black ${
                      hasStock ? 'text-[#37D243]' : 'text-gray-400'
                    }`}
                  >
                    {hasStock ? `${store.stock} in stock` : '0 in stock'}
                  </div>

                  {hasStock ? (
                    <button
                      type="button"
                      onClick={() => {
                        alert(`[Quick Pickup] Reserved at ${store.storeName}!`);
                        handleClose();
                      }}
                      className="mt-1.5 px-3 py-1 bg-[#751485] hover:bg-[#580F63] text-white text-[10px] font-bold rounded-[8px] transition-colors"
                    >
                      Pickup Here
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-400 block mt-1">Out of Stock</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-100 text-center text-[11px] text-gray-500">
          Real-time POS connected inventory (Refreshed 2 mins ago)
        </div>
      </div>
    </div>
  );
};
