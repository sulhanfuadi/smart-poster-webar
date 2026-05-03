import type { ActiveProductResolution, ThemeTokens } from '../types/app';
import { products } from './products';

export { productIds, products } from './products';

export const routes = {
  intro: '/',
  scan: '/scan',
  afterScan: '/after-scan',
} as const;

export const themeTokens: ThemeTokens = {
  base: '#f5f5f7',
  surface: '#ffffff',
  text: '#1d1d1f',
  muted: '#6e6e73',
  stroke: '#d2d2d7',
  accent: '#0071e3',
};

export const defaultProductId = 'apple-iphone';

export function getActiveProduct(searchParams: URLSearchParams): ActiveProductResolution {
  const rawValue = searchParams.get('product');
  const normalized = rawValue?.trim().toLowerCase() || null;

  if (!normalized) {
    return {
      productId: defaultProductId,
      product: products[defaultProductId],
      requestedProductId: null,
      usedFallback: true,
      fallbackReason: 'missing',
    };
  }

  const product = products[normalized];
  if (product) {
    return {
      productId: normalized,
      product,
      requestedProductId: normalized,
      usedFallback: false,
      fallbackReason: null,
    };
  }

  return {
    productId: defaultProductId,
    product: products[defaultProductId],
    requestedProductId: normalized,
    usedFallback: true,
    fallbackReason: 'invalid',
  };
}

export function toProductPath(path: string, productId: string) {
  const query = new URLSearchParams({ product: productId });
  return `${path}?${query.toString()}`;
}

export function buildProductSearch(productId: string) {
  const query = new URLSearchParams({ product: productId });
  return `?${query.toString()}`;
}

export const operatorGuidance = {
  markerSlow: 'Flatten poster, reduce glare, and keep full marker in frame.',
  markerLost: 'Hold device steady, then re-center marker for lock recovery.',
  cameraDenied: 'Enable camera permission for this origin and reopen scan.',
  sceneDelayed: 'Wait a few seconds or refresh if camera feed remains delayed.',
} as const;

export const appMeta = {
  appName: 'Apple Devices Smart Poster AR Demo',
  supportedMobile: 'Chrome Android / Safari iPhone',
};
