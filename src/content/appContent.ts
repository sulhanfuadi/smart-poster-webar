import type { ActiveProductResolution, ProductConfig, ThemeTokens } from '../types/app';

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

const defaultMindTargetUrl =
  import.meta.env.VITE_MINDAR_TARGET_URL ||
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind';

const defaultReferenceImageUrl =
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png';

export const products: Record<string, ProductConfig> = {
  'apple-iphone': {
    id: 'apple-iphone',
    name: 'Apple iPhone Demo',
    intro: {
      eyebrow: 'Academic WebAR Showcase',
      title: 'Scan the iPhone poster. Start the demo instantly.',
      subtitle: 'An AR-first flow that turns static smartphone poster storytelling into live interaction.',
      primaryCta: 'Start AR Scan',
      helperLabel: 'How to scan',
      helperBody:
        'Use a modern mobile browser over HTTPS, allow camera access, and keep the marker fully visible in frame.',
      desktopHint:
        'Desktop is preview-only. For full camera scan, open this link from Chrome Android or Safari iPhone.',
      referenceLabel: 'Open iPhone marker reference',
    },
    scan: {
      title: 'iPhone AR Scan Session',
      back: 'Back',
      continue: 'Continue',
      fallbackHelp: 'Need fallback help?',
      guidance: 'Point to the iPhone poster marker, reduce glare, and hold stable for 1–2 seconds.',
      runtimeMessages: {
        idle: 'Ready to start AR scan.',
        requesting_camera: 'Requesting camera permission…',
        ready: 'Camera ready. Initializing tracking…',
        searching: 'Marker not locked yet. Move closer and keep marker fully visible.',
        found: 'Marker locked. Present the iPhone feature story now.',
        lost: 'Marker lost. Re-center the marker to restore tracking.',
        error: 'Camera or AR runtime failed. Use fallback preview flow.',
        preview: 'Preview mode only. Use mobile for full scan validation.',
      },
    },
    afterScan: {
      eyebrow: 'After scan',
      title: 'Complete the iPhone handoff',
      subtitle: 'Move from AR interaction to one clear conversion action.',
      offerLabel: 'Open iPhone Offer Page',
      backToScan: 'Back to Scan',
      restart: 'Restart Demo',
    },
    scanTarget: {
      mindTargetUrl: defaultMindTargetUrl,
      fallbackMindTargetUrl:
        'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind',
      referenceImageUrl: defaultReferenceImageUrl,
    },
    offerCTA: {
      url: 'https://example.com/apple-iphone-offer',
      label: 'Open iPhone Offer Page',
    },
    hotspots: [
      {
        id: 'camera',
        label: 'Camera',
        title: 'Pro Camera System',
        summary: 'Portrait depth control, stable video, and reliable low-light output.',
        x: -34,
        y: 24,
      },
      {
        id: 'display',
        label: 'Display',
        title: 'High-Refresh Display',
        summary: 'Smooth motion, color accuracy, and bright outdoor readability.',
        x: -10,
        y: 45,
      },
      {
        id: 'performance',
        label: 'Performance',
        title: 'Flagship Silicon',
        summary: 'Fast app switching, efficient sustained performance, and lower thermal spikes.',
        x: 16,
        y: 38,
      },
      {
        id: 'battery',
        label: 'Battery',
        title: 'All-Day Battery',
        summary: 'Long endurance and fast top-up flow for high-mobility usage.',
        x: 36,
        y: 55,
      },
    ],
  },
  'apple-macbook': {
    id: 'apple-macbook',
    name: 'Apple MacBook Demo',
    intro: {
      eyebrow: 'Academic WebAR Showcase',
      title: 'Scan the MacBook poster. Start the demo instantly.',
      subtitle: 'A focused AR flow for laptop product storytelling from poster to guided interaction.',
      primaryCta: 'Start AR Scan',
      helperLabel: 'How to scan',
      helperBody:
        'Use HTTPS on mobile, allow camera access, and keep the marker flat in frame for stable tracking.',
      desktopHint:
        'Desktop is preview-only. For full camera scan, open this link from Chrome Android or Safari iPhone.',
      referenceLabel: 'Open MacBook marker reference',
    },
    scan: {
      title: 'MacBook AR Scan Session',
      back: 'Back',
      continue: 'Continue',
      fallbackHelp: 'Need fallback help?',
      guidance: 'Point to the MacBook poster marker, reduce reflections, and hold still briefly.',
      runtimeMessages: {
        idle: 'Ready to start AR scan.',
        requesting_camera: 'Requesting camera permission…',
        ready: 'Camera ready. Initializing tracking…',
        searching: 'Marker not locked yet. Move closer and keep marker fully visible.',
        found: 'Marker locked. Present the MacBook feature story now.',
        lost: 'Marker lost. Re-center the marker to restore tracking.',
        error: 'Camera or AR runtime failed. Use fallback preview flow.',
        preview: 'Preview mode only. Use mobile for full scan validation.',
      },
    },
    afterScan: {
      eyebrow: 'After scan',
      title: 'Complete the MacBook handoff',
      subtitle: 'Move from AR interaction to one clear conversion action.',
      offerLabel: 'Open MacBook Offer Page',
      backToScan: 'Back to Scan',
      restart: 'Restart Demo',
    },
    scanTarget: {
      mindTargetUrl:
        'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/band.mind',
      fallbackMindTargetUrl: defaultMindTargetUrl,
      referenceImageUrl: defaultReferenceImageUrl,
    },
    offerCTA: {
      url: 'https://example.com/apple-macbook-offer',
      label: 'Open MacBook Offer Page',
    },
    hotspots: [
      {
        id: 'chip',
        label: 'Chip',
        title: 'Apple Silicon Performance',
        summary: 'Fast compile cycles, efficient multitasking, and consistent sustained speed.',
        x: -30,
        y: 30,
      },
      {
        id: 'display',
        label: 'Display',
        title: 'Liquid Retina Display',
        summary: 'Sharp detail, accurate color, and high brightness for design and media tasks.',
        x: -8,
        y: 44,
      },
      {
        id: 'battery',
        label: 'Battery',
        title: 'Long Battery Runtime',
        summary: 'Extended work sessions with less dependency on charging stops.',
        x: 18,
        y: 48,
      },
      {
        id: 'portability',
        label: 'Portable',
        title: 'Lightweight Build',
        summary: 'Portable chassis for campus presentations and mobile productivity.',
        x: 34,
        y: 58,
      },
    ],
  },
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
