/**
 * CU Live API Client for React Frontend
 * Connects directly to our dedicated local CU API server (http://localhost:8787)
 * with graceful fallback to offline data if the server is unreachable.
 */

import type { CUProductItem, CUBadgeType } from '../design-system';
import type { CUStoreLocation } from '../components/CUStoreMapStockLocator';

const API_BASE = 'http://localhost:8787';

export interface CuApiHealth {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

function mapBadge(badgeStr?: string): CUBadgeType | undefined {
  if (!badgeStr) return undefined;
  const b = badgeStr.trim();
  if (b.includes('1+1') || b.includes('plus1')) return 'plus1';
  if (b.includes('2+1') || b.includes('plus2')) return 'plus2';
  if (b.toUpperCase().includes('NEW') || b.includes('신상품')) return 'new';
  if (b.toUpperCase().includes('BEST') || b.includes('인기')) return 'best';
  if (b.includes('할인') || b.includes('콤보')) return 'sale';
  if (b.includes('단독') || b.includes('PB') || b.includes('HEYROO')) return 'cuOnly';
  return undefined;
}

/**
 * Search products from our dedicated CU reverse-engineered API
 */
export async function searchLiveProducts(keyword: string): Promise<CUProductItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products?keyword=${encodeURIComponent(keyword)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const rawProducts = data.products || [];

    return rawProducts.map((p: any, idx: number): CUProductItem => ({
      id: `cu-live-${p.itemCode || idx}`,
      name: p.name,
      price: p.price,
      originalPrice: p.discountPrice && p.discountPrice < p.price ? p.price : undefined,
      imageUrl: p.imageUrl || 'https://via.placeholder.com/300?text=CU',
      category: p.category?.middle || 'general',
      categoryLabel: p.category?.detail || p.category?.large || 'CU Product',
      badge: mapBadge(p.eventBadge),
      secondaryTag: p.isExclusive ? 'cuOnly' : p.isNew ? 'new' : undefined,
      description: p.description || `${p.name} available at CU convenience stores.`,
      storageType: p.category?.large?.includes('냉장') ? 'Chilled' : 'Room Temp',
      stockCount: 5,
      barcode: p.itemCode,
      tags: [p.category?.large, p.category?.middle, p.eventBadge].filter(Boolean),
    }));
  } catch (err) {
    console.warn('Live product search failed, falling back:', err);
    return [];
  }
}

/**
 * Fetch monthly 1+1, 2+1, or PB exclusive promotions from CU
 */
export async function fetchLivePromotions(
  type: '1plus1' | '2plus1' | 'pb_exclusive' = '1plus1',
): Promise<CUProductItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/promotions?type=${type}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const rawItems = data.items || [];

    return rawItems.map((item: any, idx: number): CUProductItem => {
      const defaultBadge: CUBadgeType =
        type === '1plus1' ? 'plus1' : type === '2plus1' ? 'plus2' : 'cuOnly';
      return {
        id: `cu-promo-${item.id || idx}`,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl || 'https://via.placeholder.com/300?text=CU',
        category: 'promo',
        categoryLabel: type === '1plus1' ? '1+1 Deal' : type === '2plus1' ? '2+1 Deal' : 'CU Exclusive PB',
        badge: mapBadge(item.badge) || defaultBadge,
        secondaryTag: item.tag === 'BEST' ? 'best' : item.tag === 'NEW' ? 'new' : undefined,
        description: `Official CU ${type.toUpperCase()} promotional event product.`,
        storageType: 'Room Temp',
        stockCount: Math.floor(Math.random() * 8) + 2,
        tags: [type === '1plus1' ? '1+1 Deal' : '2+1 Deal', 'CU Special'],
      };
    });
  } catch (err) {
    console.warn('Live promotions fetch failed, falling back:', err);
    return [];
  }
}

/**
 * Check real-time on-shelf inventory by branch
 */
export async function checkLiveInventory(
  keyword: string,
  lat = 37.4979,
  lng = 127.0276,
): Promise<{
  product: any;
  stores: Array<{
    storeName: string;
    distanceM: number;
    address: string;
    phone: string;
    stock: number | null;
    services?: any;
  }>;
}> {
  try {
    const res = await fetch(
      `${API_BASE}/api/inventory?keyword=${encodeURIComponent(keyword)}&lat=${lat}&lng=${lng}`,
      { signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Live inventory check failed:', err);
    return { product: null, stores: [] };
  }
}

/**
 * Fetch physical stores around coordinates with amenities
 */
export async function fetchLiveStores(
  lat = 37.4979,
  lng = 127.0276,
): Promise<CUStoreLocation[]> {
  try {
    const res = await fetch(`${API_BASE}/api/stores?lat=${lat}&lng=${lng}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const rawStores = data.stores || [];

    return rawStores.map((s: any, idx: number): CUStoreLocation => {
      const servicesList: ('24H' | 'Quick Pickup' | 'Parcel' | 'Bakery' | 'Fried Chicken' | 'ATM' | 'Pharmacy')[] = [];
      if (s.services?.open24h) servicesList.push('24H');
      if (s.pickupYn) servicesList.push('Quick Pickup');
      if (s.services?.parcel) servicesList.push('Parcel');
      if (s.services?.bakery) servicesList.push('Bakery');
      if (s.services?.friedChicken) servicesList.push('Fried Chicken');
      if (s.services?.atm) servicesList.push('ATM');

      return {
        id: `cu-store-${s.storeCode || idx}`,
        name: s.storeName,
        address: s.address,
        distance: `${s.distanceM}m`,
        lat: s.latitude,
        lng: s.longitude,
        mapX: 20 + ((idx * 17) % 60),
        mapY: 25 + ((idx * 23) % 55),
        isOpen24h: Boolean(s.services?.open24h),
        phone: s.phone || '02-500-0000',
        services: servicesList.length > 0 ? servicesList : ['24H', 'Quick Pickup'],
        inventory: {},
      };
    });
  } catch (err) {
    console.warn('Live store query failed:', err);
    return [];
  }
}
