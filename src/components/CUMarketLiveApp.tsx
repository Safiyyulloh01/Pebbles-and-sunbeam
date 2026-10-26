import React, { useState, useMemo } from 'react';
import {
  CUProductCard,
  CUProductItem,
  CUBadge,
  CUBadgeType,
  CUProductDetailModal,
  CUOneQRModal,
  CUStockModal,
  playMatchaChime,
  playTabSwitch,
} from '../design-system';
import { CUCartModal, CartItem } from '../design-system/components/CUCartModal';
import { searchLiveProducts, fetchLivePromotions, checkApiHealth } from '../services/cuApiLive';
import confetti from 'canvas-confetti';

export const CU_SAMPLE_PRODUCTS: CUProductItem[] = [
  {
    id: 'yonsei-cream-bread',
    name: 'Yonsei Fresh Milk Cream Bread',
    price: 2900,
    originalPrice: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'snacks_dessert',
    categoryLabel: 'Dessert / Bakery',
    badge: 'plus2',
    secondaryTag: 'cuOnly',
    description: 'Over 80% whipped fresh milk cream by weight! The viral TikTok and Instagram convenience store sensation.',
    storageType: 'Chilled',
    stockCount: 6,
    calories: '413 kcal',
    tags: ['YonseiMilk', 'CreamBread', 'CUExclusive', 'ViralDessert', 'MustTry'],
  },
  {
    id: 'dubai-chocolate',
    name: 'Dubai Style Pistachio Kataifi Chocolate',
    price: 4000,
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'snacks_dessert',
    categoryLabel: 'Snacks / Chocolate',
    badge: 'new',
    secondaryTag: 'best',
    description: 'Crispy roasted golden kataifi pastry ribbons generously blended with rich, velvety pistachio praline cream.',
    storageType: 'Room Temp',
    stockCount: 2,
    calories: '234 kcal',
    tags: ['DubaiChocolate', 'Pistachio', 'Kataifi', 'TrendingNow', 'NewRelease'],
  },
  {
    id: 'baek-bento',
    name: "Baek's Signature Spicy Platter Bento",
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'fresh_food',
    categoryLabel: 'Fresh Meals',
    badge: 'best',
    description: "Celebrity chef Baek Jong-won's signature spicy stir-fried pork, golden pork cutlet, ham, and savory rolled egg.",
    storageType: 'Chilled',
    microwaveTime: '1000W 1m 40s / 700W 2m',
    stockCount: 8,
    calories: '745 kcal',
    tags: ['BaekJongWon', 'BentoLunch', 'SpicyPork', 'HeartyMeal', 'ValueMeal'],
  },
  {
    id: 'get-coffee-ice',
    name: 'get Iced Americano XL (100% Eco Beans)',
    price: 2000,
    originalPrice: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'beverages',
    categoryLabel: 'get Coffee',
    badge: 'plus1',
    secondaryTag: 'cuOnly',
    description: 'Freshly brewed espresso using 100% Rainforest Alliance Certified eco-friendly Colombian and Brazilian beans.',
    storageType: 'Room Temp',
    stockCount: 25,
    calories: '15 kcal',
    tags: ['getCoffee', 'IcedAmericano', 'EcoBeans', 'Buy1Get1', 'DailyBrew'],
  },
  {
    id: 'delaffe-peach-tea',
    name: 'delaffe Peach Iced Tea + Big Ice Cup Set',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'beverages',
    categoryLabel: 'Pouch Drinks',
    badge: 'plus1',
    description: "CU's signature refreshing delaffe pouch fruit iced tea paired with a chilled 230g Big Ice Cup.",
    storageType: 'Room Temp',
    stockCount: 18,
    calories: '140 kcal',
    tags: ['delaffe', 'BigIceCup', 'PeachIcedTea', 'SummerEssential', '1Plus1'],
  },
  {
    id: 'heyroo-cheese-ramen',
    name: 'HEYROO Rich Cheddar Cheese Cup Ramen',
    price: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'pb_heyroo',
    categoryLabel: 'HEYROO PB',
    badge: 'plus2',
    secondaryTag: 'cuOnly',
    description: 'Savory, creamy cheddar cheese soup seasoning coating springy ramen noodles. An exclusive CU comfort staple.',
    storageType: 'Room Temp',
    microwaveTime: 'Hot Water 4 mins',
    stockCount: 14,
    calories: '480 kcal',
    tags: ['HEYROO', 'CheeseRamen', 'CUExclusive', 'ComfortFood', '2Plus1'],
  },
  {
    id: 'tuna-mayo-gimbap',
    name: 'Rich Tuna Mayo Triangle Gimbap (Onigiri)',
    price: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'fresh_food',
    categoryLabel: 'Fresh Meals',
    badge: 'best',
    description: 'Crisp roasted seaweed wrapper stuffed with seasoned rice and 30% extra rich savory tuna-mayo filling.',
    storageType: 'Chilled',
    microwaveTime: '1000W 20s / 700W 30s',
    stockCount: 12,
    calories: '215 kcal',
    tags: ['TriangleGimbap', 'TunaMayo', 'BestSeller', 'QuickBreakfast'],
  },
  {
    id: 'chicken-gangjeong',
    name: 'Sweet & Spicy Boneless Fried Chicken Cup',
    price: 3900,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'ready_meal',
    categoryLabel: 'Hot Ready Meals',
    badge: 'new',
    description: 'Crispy fried 100% chicken thigh chunks glazed with sticky, sweet-and-spicy Korean honey-chili sauce.',
    storageType: 'Chilled',
    microwaveTime: '1000W 50s / 700W 1m',
    stockCount: 5,
    calories: '390 kcal',
    tags: ['FriedChicken', 'Dakgangjeong', 'LateNightSnack', 'BeerSnack'],
  },
  {
    id: 'banana-milk',
    name: 'Binggrae Banana Flavored Milk 240ml',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'beverages',
    categoryLabel: 'Dairy / Beverages',
    badge: 'plus1',
    description: "Korea's iconic sweet banana milk in its signature hourglass jar shape, loved since 1974.",
    storageType: 'Chilled',
    stockCount: 15,
    calories: '208 kcal',
    tags: ['BananaMilk', 'ClassicKorean', 'IconicBeverage', '1Plus1'],
  },
  {
    id: 'haagen-dazs-vanilla',
    name: 'Haagen-Dazs Vanilla Ice Cream Pint 473ml',
    price: 15900,
    originalPrice: 17900,
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'icecream',
    categoryLabel: 'Ice Cream',
    badge: 'plus2',
    description: 'Pure Madagascar vanilla extract folded with real fresh sweet cream and milk. Premium richness.',
    storageType: 'Frozen',
    stockCount: 4,
    calories: '1000 kcal',
    tags: ['HaagenDazs', 'IceCreamPint', 'Vanilla', '2Plus1Promo'],
  },
  {
    id: 'salad-chicken-breast',
    name: 'Fresh Shredded Chicken Breast Salad',
    price: 4800,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'fresh_food',
    categoryLabel: 'Salads & Greens',
    secondaryTag: 'best',
    description: 'Tender pulled chicken breast over fresh garden greens with rich roasted oriental sesame dressing.',
    storageType: 'Chilled',
    stockCount: 7,
    calories: '185 kcal',
    tags: ['SaladBowl', 'ChickenBreast', 'HealthyDiet', 'FreshFood'],
  },
  {
    id: 'yakgwa-cookie',
    name: 'Neighbor Tongtong-i Chewy Yakgwa Cookie',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&auto=format&fit=crop&q=80',
    category: 'snacks_dessert',
    categoryLabel: 'Bakery / Cookies',
    badge: 'best',
    secondaryTag: 'cuOnly',
    description: 'Collaboration with trendy Apgujeong bakery! Traditional chewy honey yakgwa pastry baked over a rich butter cookie.',
    storageType: 'Room Temp',
    stockCount: 3,
    calories: '479 kcal',
    tags: ['YakgwaCookie', 'KTraditional', 'BakeryCollab', 'CUExclusive'],
  },
];

export const CUMarketLiveApp: React.FC = () => {
  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPromo, setSelectedPromo] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'popular' | 'lowPrice' | 'highPrice'>('popular');

  // Live CU API State
  const [liveProducts, setLiveProducts] = useState<CUProductItem[] | null>(null);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  const [isApiActive, setIsApiActive] = useState<boolean>(true);
  const [liveMode, setLiveMode] = useState<'curated' | '1plus1' | '2plus1' | 'pb' | 'search'>('curated');

  // Check API health on mount
  React.useEffect(() => {
    checkApiHealth().then((ok) => setIsApiActive(ok));
  }, []);

  const handleFetchPromo = async (type: '1plus1' | '2plus1' | 'pb') => {
    setIsLiveLoading(true);
    setLiveMode(type);
    playTabSwitch();
    const items = await fetchLivePromotions(type === 'pb' ? 'pb_exclusive' : type);
    if (items.length > 0) {
      setLiveProducts(items);
    }
    setIsLiveLoading(false);
  };

  const handleLiveCatalogSearch = async (term: string) => {
    if (!term.trim()) return;
    setIsLiveLoading(true);
    setLiveMode('search');
    playTabSwitch();
    const items = await searchLiveProducts(term);
    if (items.length > 0) {
      setLiveProducts(items);
    }
    setIsLiveLoading(false);
  };

  const handleResetToCurated = () => {
    setLiveMode('curated');
    setLiveProducts(null);
    playTabSwitch();
  };

  // Modals (all centered popups with backdrop & escape dismissal)
  const [detailProduct, setDetailProduct] = useState<CUProductItem | null>(null);
  const [stockProduct, setStockProduct] = useState<CUProductItem | null>(null);
  const [oneQROpen, setOneQROpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: CU_SAMPLE_PRODUCTS[0], quantity: 2 },
    { product: CU_SAMPLE_PRODUCTS[3], quantity: 2 },
  ]);

  // Categories definition
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'fresh_food', label: '🍱 Fresh Meals' },
    { id: 'beverages', label: '☕ Beverages & Coffee' },
    { id: 'snacks_dessert', label: '🍰 Snacks & Desserts' },
    { id: 'ready_meal', label: '🍗 Hot Ready Meals' },
    { id: 'icecream', label: '🍦 Ice Cream' },
    { id: 'pb_heyroo', label: '🌟 HEYROO PB' },
  ];

  // Promotion filters
  const promoFilters = [
    { id: 'all', label: 'All Promotions' },
    { id: 'plus1', label: '1+1 Buy 1 Get 1', badge: 'plus1' as CUBadgeType },
    { id: 'plus2', label: '2+1 Buy 2 Get 1', badge: 'plus2' as CUBadgeType },
    { id: 'new', label: 'NEW Arrivals', badge: 'new' as CUBadgeType },
    { id: 'best', label: 'BEST Sellers', badge: 'best' as CUBadgeType },
    { id: 'cuOnly', label: 'CU Exclusive (PB)', badge: 'cuOnly' as CUBadgeType },
  ];

  // Base list depending on live API vs curated
  const activeBaseProducts = liveProducts && liveMode !== 'curated' ? liveProducts : CU_SAMPLE_PRODUCTS;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return activeBaseProducts.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Promo filter
      if (selectedPromo !== 'all') {
        if (selectedPromo === 'plus1' && item.badge !== 'plus1') return false;
        if (selectedPromo === 'plus2' && item.badge !== 'plus2') return false;
        if (selectedPromo === 'new' && item.badge !== 'new' && item.secondaryTag !== 'new') return false;
        if (selectedPromo === 'best' && item.badge !== 'best' && item.secondaryTag !== 'best') return false;
        if (selectedPromo === 'cuOnly' && item.badge !== 'cuOnly' && item.secondaryTag !== 'cuOnly') return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCat = item.categoryLabel?.toLowerCase().includes(query);
        if (!matchesName && !matchesTags && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'lowPrice') return a.price - b.price;
      if (sortOption === 'highPrice') return b.price - a.price;
      return 0;
    });
  }, [activeBaseProducts, selectedCategory, selectedPromo, searchQuery, sortOption]);

  // Cart operations
  const handleAddToCart = (product: CUProductItem, quantity = 1) => {
    playMatchaChime();
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const handleCheckout = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#751485', '#37D243', '#8059EA', '#FFB800', '#FFFFFF'],
    });
    alert(`🎉 [Pocket CU Quick Pickup Order]\nTotal: ₩${totalCartPrice.toLocaleString()}\nOrder Confirmed! Pickup Ticket: CU-${Math.floor(1000 + Math.random() * 9000)}`);
    setCartItems([]);
    setCartModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20 font-['Noto_Sans_KR',sans-serif]">
      {/* CU Brand Banner */}
      <div className="bg-gradient-to-r from-[#751485] via-[#6837F8] to-[#37D243] rounded-[24px] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background bubble accents */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-32 h-32 bg-[#37D243]/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#37D243] animate-ping" />
              <span>NICE TO CU · BGF Retail</span>
              <span className="text-white/60">|</span>
              <span className="text-[#FFDE00]">Real-Time Store Inventory Live</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-2">
              <span>NICE TO CU</span>
              <span className="text-xs bg-[#FFB800] text-[#751485] font-black px-2 py-0.5 rounded-[8px]">
                Convenience Store Life
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-white/90 mt-2 max-w-xl leading-relaxed">
              Explore 1+1 and 2+1 monthly promotions, viral sensation bakery items, and exclusive HEYROO treats! Check live neighborhood stock and checkout with Pocket CU One-QR.
            </p>
          </div>

          {/* Quick Action Pills: One-QR & Cart Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playTabSwitch();
                setOneQROpen(true);
              }}
              className="px-4 py-3 bg-white text-[#751485] hover:bg-gray-50 active:scale-95 transition-all rounded-[16px] font-black text-xs sm:text-sm shadow-md flex items-center gap-2 border border-white/50 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#8059EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span>One-QR Checkout</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playTabSwitch();
                setCartModalOpen(true);
              }}
              className="relative px-4 py-3 bg-[#37D243] text-white hover:bg-[#2BB836] active:scale-95 transition-all rounded-[16px] font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>View Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-[#751485] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CU Official Live API Feed Selector */}
      <div className="bg-gradient-to-r from-[#29103C] to-[#451B63] rounded-[20px] p-4 text-white border border-[#67B73A]/30 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${isApiActive ? 'bg-[#37D243] animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-bold">{isApiActive ? 'CU Live Network (Port 8787)' : 'Offline Mocks'}</span>
          </div>
          <span className="text-xs text-white/80 hidden sm:inline">
            Active Feed: <strong className="text-[#FFDE00] uppercase">{liveMode === 'curated' ? 'Curated Showcase' : liveMode === '1plus1' ? 'Live 1+1 Promotions' : liveMode === '2plus1' ? 'Live 2+1 Promotions' : liveMode === 'pb' ? 'CU PB Exclusives' : 'Live Search'}</strong>
          </span>
          {isLiveLoading && (
            <span className="text-xs bg-[#37D243]/20 text-[#37D243] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="animate-spin inline-block">⏳</span> Fetching live data...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={handleResetToCurated}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${liveMode === 'curated' ? 'bg-white text-[#751485] shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            Curated View
          </button>
          <button
            type="button"
            onClick={() => handleFetchPromo('1plus1')}
            disabled={isLiveLoading}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all flex items-center gap-1.5 ${liveMode === '1plus1' ? 'bg-[#37D243] text-gray-950 shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            <span>🎁</span>
            <span>Live 1+1 Deals</span>
          </button>
          <button
            type="button"
            onClick={() => handleFetchPromo('2plus1')}
            disabled={isLiveLoading}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all flex items-center gap-1.5 ${liveMode === '2plus1' ? 'bg-[#FFB800] text-gray-950 shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            <span>✌️</span>
            <span>Live 2+1 Deals</span>
          </button>
          <button
            type="button"
            onClick={() => handleFetchPromo('pb')}
            disabled={isLiveLoading}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all flex items-center gap-1.5 ${liveMode === 'pb' ? 'bg-[#8059EA] text-white shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            <span>🌟</span>
            <span>CU PB Exclusives</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Control Deck */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#E5E7EB] shadow-xs space-y-4">
        {/* Search bar + Sort controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLiveCatalogSearch(searchQuery);
                }}
                placeholder="Search products (e.g. Yonsei, Cream, Ramen, Coffee, 연세우유)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-[14px] text-xs sm:text-sm focus:outline-none focus:border-[#751485] focus:bg-white transition-all"
              />
              <svg
                className="w-4 h-4 absolute left-3.5 top-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleLiveCatalogSearch(searchQuery)}
              disabled={isLiveLoading || !searchQuery.trim()}
              className="px-3.5 py-2.5 bg-[#751485] text-white rounded-[14px] text-xs font-bold hover:bg-[#5E0F6B] disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
              title="Query official Pocket CU search catalog"
            >
              <span>🔎</span>
              <span className="hidden sm:inline">Live CU Search</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort:</span>
            <div className="inline-flex p-1 bg-gray-100 rounded-[12px] text-xs">
              <button
                type="button"
                onClick={() => setSortOption('popular')}
                className={`px-3 py-1 rounded-[8px] font-bold transition-all cursor-pointer ${sortOption === 'popular' ? 'bg-white text-[#751485] shadow-xs' : 'text-gray-600'}`}
              >
                Popular
              </button>
              <button
                type="button"
                onClick={() => setSortOption('lowPrice')}
                className={`px-3 py-1 rounded-[8px] font-bold transition-all cursor-pointer ${sortOption === 'lowPrice' ? 'bg-white text-[#751485] shadow-xs' : 'text-gray-600'}`}
              >
                Price: Low to High
              </button>
              <button
                type="button"
                onClick={() => setSortOption('highPrice')}
                className={`px-3 py-1 rounded-[8px] font-bold transition-all cursor-pointer ${sortOption === 'highPrice' ? 'bg-white text-[#751485] shadow-xs' : 'text-gray-600'}`}
              >
                Price: High to Low
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs Scrollbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  playTabSwitch();
                  setSelectedCategory(cat.id);
                }}
                className={`
                  px-3.5 py-2 rounded-[12px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer
                  ${isActive
                    ? 'bg-[#751485] text-white shadow-[0_2px_8px_rgba(117,20,133,0.25)]'
                    : 'bg-[#F5F6F8] text-[#555] hover:bg-gray-200 hover:text-[#1E1E1E]'
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Promo Filters Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-100 no-scrollbar">
          <span className="text-[11px] text-gray-500 font-semibold whitespace-nowrap">Promotions:</span>
          {promoFilters.map((promo) => {
            const isActive = selectedPromo === promo.id;
            return (
              <button
                key={promo.id}
                type="button"
                onClick={() => {
                  playTabSwitch();
                  setSelectedPromo(promo.id);
                }}
                className={`
                  px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer
                  ${isActive
                    ? 'bg-[#1E1E1E] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                  }
                `}
              >
                {promo.badge && <CUBadge type={promo.badge} size="sm" />}
                <span>{promo.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <div>
          Showing <strong className="text-[#751485] font-bold">{filteredProducts.length}</strong> items in catalog
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#37D243]" />
          <span>CU Teheran HQ Branch Stock Status</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.map((prod) => (
            <CUProductCard
              key={prod.id}
              product={prod}
              onSelect={(p) => setDetailProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onCheckStock={(p) => setStockProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[20px] p-12 text-center border border-gray-200 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-base text-[#1E1E1E]">No Products Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            No items matched your selected filters or search query. Try clearing the filters or searching with another keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPromo('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#751485] text-white text-xs font-bold rounded-[10px] hover:bg-[#580F63] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Centered Cart Popup Modal (Replaced the slide drawer) */}
      <CUCartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onCheckout={handleCheckout}
      />

      {/* Product Detail Pop-up Modal */}
      <CUProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onOpenStockChecker={(p) => {
          setDetailProduct(null);
          setStockProduct(p);
        }}
      />

      {/* In-Store Stock Checker Modal */}
      <CUStockModal
        product={stockProduct}
        isOpen={!!stockProduct}
        onClose={() => setStockProduct(null)}
      />

      {/* Pocket CU One-QR Modal */}
      <CUOneQRModal
        isOpen={oneQROpen}
        onClose={() => setOneQROpen(false)}
      />
    </div>
  );
};
