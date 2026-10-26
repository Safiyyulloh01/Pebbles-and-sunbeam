import React, { useState, useMemo, useEffect } from 'react';
import { CUProductItem, CUBadge } from '../design-system';
import { CU_SAMPLE_PRODUCTS } from './CUMarketLiveApp';
import { checkLiveInventory, checkApiHealth } from '../services/cuApiLive';
import confetti from 'canvas-confetti';

export interface CUStoreLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  mapX: number; // percentage on visual map (0-100)
  mapY: number; // percentage on visual map (0-100)
  isOpen24h: boolean;
  phone: string;
  services: ('24H' | 'Quick Pickup' | 'Parcel' | 'Bakery' | 'Fried Chicken' | 'ATM' | 'Pharmacy')[];
  inventory: Record<string, number>; // productId -> count
}

export const SAMPLE_CU_STORES: CUStoreLocation[] = [
  {
    id: 'store-teheran',
    name: 'CU Teheran Main Branch',
    address: '405 Teheran-ro, Gangnam-gu, Seoul (BGF Retail HQ 1F)',
    distance: '85m',
    lat: 37.5065,
    lng: 127.0534,
    mapX: 48,
    mapY: 42,
    isOpen24h: true,
    phone: '02-528-7000',
    services: ['24H', 'Quick Pickup', 'Parcel', 'Bakery', 'ATM', 'Pharmacy'],
    inventory: {
      'yonsei-cream-bread': 8,
      'dubai-chocolate': 3,
      'baek-bento': 12,
      'get-coffee-ice': 45,
      'delaffe-peach-tea': 28,
      'heyroo-cheese-ramen': 16,
      'tuna-mayo-gimbap': 14,
      'chicken-gangjeong': 6,
      'banana-milk': 22,
      'haagen-dazs-vanilla': 5,
      'salad-chicken-breast': 9,
      'yakgwa-cookie': 4,
    },
  },
  {
    id: 'store-gangnam-st',
    name: 'CU Gangnam Station',
    address: '390 Gangnam-daero, Gangnam-gu, Seoul',
    distance: '320m',
    lat: 37.4979,
    lng: 127.0276,
    mapX: 25,
    mapY: 65,
    isOpen24h: true,
    phone: '02-533-8211',
    services: ['24H', 'Quick Pickup', 'Parcel', 'Fried Chicken', 'ATM'],
    inventory: {
      'yonsei-cream-bread': 4,
      'dubai-chocolate': 0, // Out of stock!
      'baek-bento': 7,
      'get-coffee-ice': 30,
      'delaffe-peach-tea': 15,
      'heyroo-cheese-ramen': 11,
      'tuna-mayo-gimbap': 8,
      'chicken-gangjeong': 5,
      'banana-milk': 18,
      'haagen-dazs-vanilla': 2,
      'salad-chicken-breast': 4,
      'yakgwa-cookie': 0,
    },
  },
  {
    id: 'store-yeoksam-star',
    name: 'CU Yeoksam Star',
    address: '218 Teheran-ro, Gangnam-gu, Seoul',
    distance: '510m',
    lat: 37.5012,
    lng: 127.0375,
    mapX: 38,
    mapY: 52,
    isOpen24h: true,
    phone: '02-562-4419',
    services: ['24H', 'Quick Pickup', 'Bakery', 'ATM'],
    inventory: {
      'yonsei-cream-bread': 1, // Critical!
      'dubai-chocolate': 1, // Critical!
      'baek-bento': 5,
      'get-coffee-ice': 20,
      'delaffe-peach-tea': 12,
      'heyroo-cheese-ramen': 9,
      'tuna-mayo-gimbap': 6,
      'chicken-gangjeong': 2,
      'banana-milk': 10,
      'haagen-dazs-vanilla': 1,
      'salad-chicken-breast': 3,
      'yakgwa-cookie': 2,
    },
  },
  {
    id: 'store-seolleung-center',
    name: 'CU Seolleung Center',
    address: '512 Seolleung-ro, Gangnam-gu, Seoul',
    distance: '680m',
    lat: 37.5051,
    lng: 127.0489,
    mapX: 62,
    mapY: 35,
    isOpen24h: false,
    phone: '02-558-9032',
    services: ['Quick Pickup', 'Parcel', 'Pharmacy'],
    inventory: {
      'yonsei-cream-bread': 0,
      'dubai-chocolate': 0,
      'baek-bento': 2,
      'get-coffee-ice': 14,
      'delaffe-peach-tea': 9,
      'heyroo-cheese-ramen': 5,
      'tuna-mayo-gimbap': 0,
      'chicken-gangjeong': 0,
      'banana-milk': 7,
      'haagen-dazs-vanilla': 0,
      'salad-chicken-breast': 2,
      'yakgwa-cookie': 0,
    },
  },
  {
    id: 'store-posco-tower',
    name: 'CU Posco Tower',
    address: '440 Teheran-ro, Gangnam-gu, Seoul (B1F)',
    distance: '420m',
    lat: 37.5058,
    lng: 127.0565,
    mapX: 72,
    mapY: 55,
    isOpen24h: true,
    phone: '02-568-1209',
    services: ['24H', 'Quick Pickup', 'Bakery', 'Parcel', 'ATM'],
    inventory: {
      'yonsei-cream-bread': 6,
      'dubai-chocolate': 2,
      'baek-bento': 9,
      'get-coffee-ice': 38,
      'delaffe-peach-tea': 20,
      'heyroo-cheese-ramen': 14,
      'tuna-mayo-gimbap': 11,
      'chicken-gangjeong': 4,
      'banana-milk': 19,
      'haagen-dazs-vanilla': 4,
      'salad-chicken-breast': 6,
      'yakgwa-cookie': 3,
    },
  },
  {
    id: 'store-sinnonhyeon',
    name: 'CU Sinnonhyeon Station',
    address: '479 Gangnam-daero, Seocho-gu, Seoul (B1F)',
    distance: '890m',
    lat: 37.5045,
    lng: 127.0252,
    mapX: 18,
    mapY: 30,
    isOpen24h: true,
    phone: '02-544-7811',
    services: ['24H', 'Quick Pickup', 'Parcel', 'Fried Chicken'],
    inventory: {
      'yonsei-cream-bread': 3,
      'dubai-chocolate': 0,
      'baek-bento': 4,
      'get-coffee-ice': 25,
      'delaffe-peach-tea': 16,
      'heyroo-cheese-ramen': 8,
      'tuna-mayo-gimbap': 5,
      'chicken-gangjeong': 7,
      'banana-milk': 14,
      'haagen-dazs-vanilla': 3,
      'salad-chicken-breast': 1,
      'yakgwa-cookie': 1,
    },
  },
];

export const CUStoreMapStockLocator: React.FC = () => {
  // Selected product to inspect live inventory for
  const [selectedProductId, setSelectedProductId] = useState<string>('yonsei-cream-bread');
  // Selected store on map
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store-teheran');
  // Filters
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [open24hOnly, setOpen24hOnly] = useState<boolean>(false);
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [restockAlertSent, setRestockAlertSent] = useState<boolean>(false);

  // Live Inventory State from dedicated CU API (port 8787)
  const [liveStores, setLiveStores] = useState<CUStoreLocation[] | null>(null);
  const [isLiveChecking, setIsLiveChecking] = useState<boolean>(false);
  const [matchedLiveProduct, setMatchedLiveProduct] = useState<any>(null);
  const [isApiActive, setIsApiActive] = useState<boolean>(true);
  const [useLiveStock, setUseLiveStock] = useState<boolean>(false);

  useEffect(() => {
    checkApiHealth().then((ok) => setIsApiActive(ok));
  }, []);

  const handleFetchLiveInventory = async (productTerm: string) => {
    setIsLiveChecking(true);
    setUseLiveStock(true);
    try {
      const result = await checkLiveInventory(productTerm);
      if (result && result.stores && result.stores.length > 0) {
        setMatchedLiveProduct(result.product);
        const mappedStores: CUStoreLocation[] = result.stores.map((s, idx) => ({
          id: `live-store-${idx}`,
          name: s.storeName,
          address: s.address,
          distance: `${s.distanceM}m`,
          lat: 37.4979,
          lng: 127.0276,
          mapX: 20 + ((idx * 16) % 64),
          mapY: 20 + ((idx * 22) % 62),
          isOpen24h: Boolean(s.services?.open24h),
          phone: s.phone || '02-500-0000',
          services: [
            s.services?.open24h ? '24H' : null,
            'Quick Pickup',
            s.services?.parcel ? 'Parcel' : null,
            s.services?.bakery ? 'Bakery' : null,
            s.services?.friedChicken ? 'Fried Chicken' : null,
            s.services?.atm ? 'ATM' : null,
          ].filter(Boolean) as any,
          inventory: {
            [selectedProductId]: s.stock !== null ? s.stock : 0,
          },
        }));
        setLiveStores(mappedStores);
        if (mappedStores.length > 0) {
          setSelectedStoreId(mappedStores[0].id);
        }
      }
    } catch (e) {
      console.warn('Failed to query live stock:', e);
    } finally {
      setIsLiveChecking(false);
    }
  };

  const handleResetToMockStores = () => {
    setUseLiveStock(false);
    setLiveStores(null);
    setMatchedLiveProduct(null);
    setSelectedStoreId(SAMPLE_CU_STORES[0].id);
  };

  // Active product reference
  const activeProduct = useMemo(
    () => CU_SAMPLE_PRODUCTS.find((p) => p.id === selectedProductId) || CU_SAMPLE_PRODUCTS[0],
    [selectedProductId]
  );

  // Active store base list
  const activeStoresPool = useLiveStock && liveStores ? liveStores : SAMPLE_CU_STORES;

  // Filtered stores
  const filteredStores = useMemo(() => {
    return activeStoresPool.filter((store) => {
      const stock = store.inventory[selectedProductId] || 0;
      if (inStockOnly && stock <= 0) return false;
      if (open24hOnly && !store.isOpen24h) return false;
      if (serviceFilter !== 'all' && !store.services.includes(serviceFilter as any)) return false;
      return true;
    });
  }, [activeStoresPool, selectedProductId, inStockOnly, open24hOnly, serviceFilter]);

  // Active selected store
  const activeStore = useMemo(
    () => activeStoresPool.find((s) => s.id === selectedStoreId) || activeStoresPool[0] || SAMPLE_CU_STORES[0],
    [activeStoresPool, selectedStoreId]
  );

  const activeStoreStock = activeStore.inventory[selectedProductId] || 0;

  const handleReservePickup = (store: CUStoreLocation) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#751485', '#37D243', '#8059EA'],
    });
    alert(
      `🎉 [Quick Pickup Reserved]\nStore: ${store.name}\nProduct: ${activeProduct.name}\nTotal: ₩${activeProduct.price.toLocaleString()}\n\nPresent your One-QR at the counter within 15 minutes!`
    );
  };

  const handleRestockAlert = () => {
    setRestockAlertSent(true);
    alert(
      `🔔 [Restock Alert Subscribed]\nYou will receive an instant Pocket CU push notification when '${activeProduct.name}' is restocked at ${activeStore.name}!`
    );
  };

  return (
    <div className="space-y-6 pb-20 font-['Noto_Sans_KR',sans-serif]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#751485] via-[#8059EA] to-[#37D243] rounded-[24px] p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#37D243] animate-pulse" />
              <span>Pocket CU O4O Real-Time Inventory Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Live Store Stock Locator & Map Explorer
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl">
              Locate exact real-time item quantities, 24/7 store hours, and instant counter pickup readiness across neighborhood CU convenience stores on an interactive map.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-[18px] border border-white/20">
            <div className="text-center px-2">
              <span className="text-[11px] text-white/80 block">Active Stores</span>
              <span className="font-bold text-lg">6 Stores</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <span className="text-[11px] text-white/80 block">Search Radius</span>
              <span className="font-bold text-lg text-[#FFDE00]">1.0 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Selector Bar (Quick Switch between viral products) */}
      <div className="bg-white rounded-[20px] p-4 border border-[#DEDEDE] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#751485] uppercase tracking-wider flex items-center gap-1.5">
              <span>📦</span> Select Item to Check Stock (Viral Lineup)
            </span>
            <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-[11px] font-bold">
              <span className={`w-2 h-2 rounded-full ${isApiActive ? 'bg-[#37D243] animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-gray-700">{isApiActive ? 'CU API Port 8787 Active' : 'Offline Mode'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleFetchLiveInventory(activeProduct.name)}
              disabled={isLiveChecking}
              className="px-3.5 py-1.5 bg-[#751485] text-white rounded-[12px] text-xs font-bold hover:bg-[#5E0F6B] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{isLiveChecking ? '⏳' : '⚡'}</span>
              <span>{isLiveChecking ? 'Checking CU Shelves...' : 'Check Live Branch Shelves'}</span>
            </button>

            {useLiveStock && (
              <button
                type="button"
                onClick={handleResetToMockStores}
                className="px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-[12px] text-xs font-semibold hover:bg-gray-200 transition-all"
              >
                Reset to Mocks
              </button>
            )}
          </div>
        </div>

        {useLiveStock && matchedLiveProduct && (
          <div className="bg-[#EBF7EE] border border-[#37D243]/30 rounded-[14px] p-2.5 text-xs text-[#22752A] flex items-center justify-between">
            <span className="font-semibold">
              Live Pocket CU Match: <strong>{matchedLiveProduct.name}</strong> (Barcode: {matchedLiveProduct.itemCode})
            </span>
            <span className="text-[11px] font-bold bg-[#37D243] text-white px-2 py-0.5 rounded-md">
              Real Branch Inventory
            </span>
          </div>
        )}

        {/* Product Carousel Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CU_SAMPLE_PRODUCTS.map((prod) => {
            const isSelected = prod.id === selectedProductId;
            return (
              <button
                key={prod.id}
                onClick={() => {
                  setSelectedProductId(prod.id);
                  setRestockAlertSent(false);
                }}
                className={`
                  flex items-center gap-2.5 p-2 rounded-[14px] border transition-all text-left whitespace-nowrap shrink-0
                  ${isSelected
                    ? 'bg-[#F6EDF8] border-[#751485] shadow-xs ring-2 ring-[#751485]/20'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                  }
                `}
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-10 h-10 object-cover rounded-[8px] border border-gray-100"
                />
                <div>
                  <div className="flex items-center gap-1">
                    {prod.badge && <CUBadge type={prod.badge} size="sm" />}
                    <span className="text-xs font-bold text-[#1E1E1E] max-w-[130px] truncate">
                      {prod.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#751485]">
                    ₩{prod.price.toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Interface: Left Interactive Map / Right Store Availability Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Interactive Visual Map System */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Map Controls Header */}
          <div className="bg-white rounded-[16px] p-3 border border-[#DEDEDE] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1E1E1E] flex items-center gap-1">
                <span>📍</span> Location: Teheran-ro Corridor, Gangnam
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Within 1.0 km</span>
            </div>

            {/* Filter Switches */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#37D243] focus:ring-[#37D243] w-3.5 h-3.5"
                />
                <span>In-Stock Only</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={open24hOnly}
                  onChange={(e) => setOpen24hOnly(e.target.checked)}
                  className="rounded text-[#751485] focus:ring-[#751485] w-3.5 h-3.5"
                />
                <span>24-Hour Only</span>
              </label>

              {/* Zoom Buttons */}
              <div className="flex items-center border border-gray-200 rounded-[8px] overflow-hidden">
                <button
                  onClick={() => setMapZoom((z) => Math.min(1.4, z + 0.1))}
                  className="px-2 py-0.5 hover:bg-gray-100 font-bold"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={() => setMapZoom((z) => Math.max(0.8, z - 0.1))}
                  className="px-2 py-0.5 hover:bg-gray-100 font-bold"
                  title="Zoom Out"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative w-full h-[460px] sm:h-[520px] bg-[#E8ECF1] rounded-[22px] overflow-hidden border border-[#D5DCE4] shadow-inner select-none">
            {/* Map Roads & Geography Canvas (SVG Styling) */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `scale(${mapZoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease',
              }}
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DCE1E7" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="#F1F4F8" />
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Parks & River Features */}
              <path
                d="M -10,350 Q 200,320 400,380 T 800,360 L 800,550 L -10,550 Z"
                fill="#E1EBDC"
                opacity="0.8"
              />
              <path
                d="M 500,40 Q 600,80 750,50 L 800,0 L 450,0 Z"
                fill="#E1EBDC"
                opacity="0.8"
              />

              {/* Major Roads / Boulevards (Teheran-ro & Gangnam-daero) */}
              <line x1="-50" y1="260" x2="850" y2="240" stroke="#FFFFFF" strokeWidth="24" />
              <line x1="-50" y1="260" x2="850" y2="240" stroke="#FBD982" strokeWidth="14" />

              <line x1="200" y1="-50" x2="180" y2="550" stroke="#FFFFFF" strokeWidth="24" />
              <line x1="200" y1="-50" x2="180" y2="550" stroke="#FBD982" strokeWidth="14" />

              <line x1="500" y1="-50" x2="520" y2="550" stroke="#FFFFFF" strokeWidth="18" />
              <line x1="500" y1="-50" x2="520" y2="550" stroke="#E6ECF2" strokeWidth="10" />

              {/* Minor avenues */}
              <line x1="-50" y1="120" x2="850" y2="100" stroke="#FFFFFF" strokeWidth="10" />
              <line x1="-50" y1="380" x2="850" y2="390" stroke="#FFFFFF" strokeWidth="10" />
              <line x1="360" y1="-50" x2="350" y2="550" stroke="#FFFFFF" strokeWidth="12" />
              <line x1="680" y1="-50" x2="670" y2="550" stroke="#FFFFFF" strokeWidth="12" />

              {/* Metro Station Markers */}
              <circle cx="190" cy="250" r="10" fill="#2BB836" stroke="white" strokeWidth="3" />
              <circle cx="510" cy="245" r="10" fill="#2BB836" stroke="white" strokeWidth="3" />
              <circle cx="355" cy="248" r="10" fill="#2BB836" stroke="white" strokeWidth="3" />
            </svg>

            {/* Metro Station Text Labels */}
            <div className="absolute top-[230px] left-[130px] bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 shadow-xs border border-gray-200 pointer-events-none">
              Gangnam Station (Line 2 / Shinbundang)
            </div>
            <div className="absolute top-[228px] left-[320px] bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 shadow-xs border border-gray-200 pointer-events-none">
              Yeoksam Station (Line 2)
            </div>
            <div className="absolute top-[225px] left-[480px] bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 shadow-xs border border-gray-200 pointer-events-none">
              Seolleung Station (Line 2 / Bundang)
            </div>

            {/* Search Radius Circle Around BGF HQ */}
            <div
              className="absolute w-80 h-80 rounded-full border-2 border-[#751485]/30 bg-[#751485]/5 pointer-events-none"
              style={{
                left: '48%',
                top: '42%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Interactive CU Store Pins on the Map */}
            {filteredStores.map((store) => {
              const isSelected = store.id === selectedStoreId;
              const stock = store.inventory[selectedProductId] || 0;
              const hasStock = stock > 0;
              const isLow = stock > 0 && stock <= 2;

              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStoreId(store.id)}
                  style={{
                    left: `${store.mapX}%`,
                    top: `${store.mapY}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  className="absolute cursor-pointer group z-20 transition-all duration-200"
                >
                  {/* Pin Callout Balloon */}
                  <div
                    className={`
                      relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border transition-all
                      ${isSelected
                        ? 'bg-[#751485] text-white border-white scale-110 ring-4 ring-[#751485]/30 z-30'
                        : 'bg-white text-[#1E1E1E] border-gray-300 hover:scale-105'
                      }
                    `}
                  >
                    {/* CU Logo Brand Badge */}
                    <span
                      className={`
                        w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center shrink-0
                        ${isSelected ? 'bg-white text-[#751485]' : 'bg-[#751485] text-white'}
                      `}
                    >
                      CU
                    </span>

                    {/* Store Title */}
                    <span className="text-xs font-bold whitespace-nowrap">
                      {store.name.replace('CU ', '')}
                    </span>

                    {/* Stock Pill Indicator */}
                    <span
                      className={`
                        text-[10px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap
                        ${!hasStock
                          ? isSelected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'
                          : isLow
                          ? isSelected ? 'bg-orange-400 text-white' : 'bg-[#FFEAEA] text-[#FF4757]'
                          : isSelected ? 'bg-[#37D243] text-black font-extrabold' : 'bg-[#EBFCEB] text-[#2BB836]'
                        }
                      `}
                    >
                      {!hasStock ? 'Sold Out' : `${stock} left`}
                    </span>
                  </div>

                  {/* Pin Arrow Tip */}
                  <div
                    className={`
                      w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto
                      ${isSelected ? 'border-t-[#751485]' : 'border-t-white drop-shadow-xs'}
                    `}
                  />

                  {/* Pin Shadow on Ground */}
                  <div className="w-3 h-1 bg-black/20 rounded-full mx-auto mt-0.5 blur-[1px]" />
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-[12px] border border-gray-200 shadow-md text-[11px] space-y-1">
              <div className="font-bold text-gray-700 text-[10px] uppercase tracking-wider mb-1">
                Stock Status Legend
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#37D243]" />
                <span className="text-gray-600">Ample (3+ in stock)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFA000]" />
                <span className="text-gray-600">Low Stock (1-2 left)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                <span className="text-gray-600">Sold Out (Restock Pending)</span>
              </div>
            </div>

            {/* Current Centering Indicator */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs font-bold text-[#751485] flex items-center gap-1.5 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#751485] animate-ping" />
              <span>Location: In front of BGF Retail HQ</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Store Detail & Inventory Breakdown Deck */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          {/* Active Store Availability Card */}
          <div className="bg-white rounded-[22px] p-5 border border-[#DEDEDE] shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[#1E1E1E]">
                    {activeStore.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F6EDF8] text-[#751485]">
                    {activeStore.distance}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {activeStore.address}
                </p>
                <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-2">
                  <span>📞 {activeStore.phone}</span>
                  <span>·</span>
                  <span className={activeStore.isOpen24h ? 'text-green-600 font-bold' : 'text-gray-500'}>
                    {activeStore.isOpen24h ? '🟢 Open 24/7' : '🟡 07:00 ~ 24:00 Daily'}
                  </span>
                </div>
              </div>

              {/* Service Badges */}
              <div className="flex flex-col items-end gap-1">
                {activeStore.isOpen24h && (
                  <span className="text-[10px] font-black bg-[#751485] text-white px-2 py-0.5 rounded-full">
                    24H
                  </span>
                )}
                <span className="text-[10px] font-bold bg-[#EBFCEB] text-[#2BB836] px-2 py-0.5 rounded-full">
                  Quick Pickup Ready
                </span>
              </div>
            </div>

            {/* Store Amenities / Services Offered */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold block mb-1.5">
                Available Store Services:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeStore.services.map((svc, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-[8px] bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    ✓ {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Selected Product Stock Card at this specific store */}
            <div className="p-4 rounded-[16px] bg-[#FAF7F2] border border-[#EADBCE]/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#751485]">
                  Live Store Stock for '{activeProduct.name}'
                </span>
                <span
                  className={`
                    text-xs font-bold px-2.5 py-1 rounded-full
                    ${activeStoreStock <= 0
                      ? 'bg-red-100 text-red-600'
                      : activeStoreStock <= 2
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-[#EBFCEB] text-[#2BB836]'
                    }
                  `}
                >
                  {activeStoreStock <= 0
                    ? 'Currently Out of Stock'
                    : activeStoreStock <= 2
                    ? `Low Stock (${activeStoreStock} left)`
                    : `${activeStoreStock} items available`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.name}
                  className="w-14 h-14 object-cover rounded-[10px] border border-gray-200 bg-white"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#1E1E1E] line-clamp-1">
                    {activeProduct.name}
                  </div>
                  <div className="text-xs text-[#751485] font-bold mt-0.5">
                    ₩{activeProduct.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {activeProduct.storageType} · {activeProduct.categoryLabel}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {activeStoreStock > 0 ? (
                  <button
                    onClick={() => handleReservePickup(activeStore)}
                    className="col-span-2 py-2.5 bg-[#751485] hover:bg-[#580F63] text-white font-bold text-xs rounded-[12px] shadow-sm transition-all active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <span>🛍️</span>
                    <span>Reserve Quick Pickup at This Branch</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRestockAlert}
                    disabled={restockAlertSent}
                    className="col-span-2 py-2.5 bg-[#FF4757] hover:bg-[#E03040] disabled:bg-gray-400 text-white font-bold text-xs rounded-[12px] shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🔔</span>
                    <span>{restockAlertSent ? 'Restock Notification Active' : 'Get Push Alert When Restocked'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Route / Directions & Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`[Directions] Walking route to ${activeStore.name} (${activeStore.distance}, approx. 2 mins).`)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-[#1E1E1E] font-bold text-xs rounded-[10px] transition-colors flex items-center justify-center gap-1"
              >
                <span>🗺️</span>
                <span>Directions ({activeStore.distance})</span>
              </button>
              <button
                onClick={() => alert(`[Call] Dialing ${activeStore.phone}...`)}
                className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-[10px] transition-colors"
                title="Call Branch"
              >
                📞 Call
              </button>
            </div>
          </div>

          {/* Full In-Store Inventory Matrix at Active Store */}
          <div className="bg-white rounded-[22px] p-5 border border-[#DEDEDE] shadow-sm space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E1E1E] flex items-center gap-1">
                <span>📋</span> Full Inventory Matrix: {activeStore.name}
              </span>
              <span className="text-[11px] text-gray-400">Synced 1m ago</span>
            </div>

            <div className="overflow-y-auto max-h-[220px] space-y-1.5 pr-1 no-scrollbar flex-1">
              {CU_SAMPLE_PRODUCTS.map((prod) => {
                const stock = activeStore.inventory[prod.id] || 0;
                const isSelected = prod.id === selectedProductId;

                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`
                      p-2 rounded-[10px] border flex items-center justify-between cursor-pointer transition-all text-xs
                      ${isSelected
                        ? 'bg-[#F6EDF8] border-[#751485] font-bold'
                        : 'bg-[#F9FAFB] border-gray-100 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate max-w-[170px] text-[#1E1E1E]">
                        {prod.name}
                      </span>
                    </div>

                    <span
                      className={`
                        font-bold px-2 py-0.5 rounded-full text-[11px]
                        ${stock <= 0
                          ? 'bg-red-50 text-red-500'
                          : stock <= 2
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-green-50 text-green-600'
                        }
                      `}
                    >
                      {stock <= 0 ? 'Out of Stock' : `${stock} in stock`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
