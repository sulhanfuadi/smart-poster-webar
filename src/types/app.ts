export type ScanStage =
  | 'idle'
  | 'requesting_camera'
  | 'ready'
  | 'searching'
  | 'found'
  | 'lost'
  | 'error'
  | 'preview';

export interface ScanRuntimeState {
  stage: ScanStage;
  cameraGranted: boolean;
  markerLocked: boolean;
  fallbackActive: boolean;
  errorMessage: string | null;
}

export interface ThemeTokens {
  base: string;
  surface: string;
  text: string;
  muted: string;
  stroke: string;
  accent: string;
}

export interface ScanRuntimeMessages {
  idle: string;
  requesting_camera: string;
  ready: string;
  searching: string;
  found: string;
  lost: string;
  error: string;
  preview: string;
}

export interface ScanTargetConfig {
  mindTargetUrl: string;
  fallbackMindTargetUrl?: string;
  referenceImageUrl: string;
}

export interface ProductArModelConfig {
  url: string;
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface ProductHotspot {
  id: string;
  label: string;
  title: string;
  summary: string;
  x: number;
  y: number;
}

export interface ProductIntroCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  helperLabel: string;
  helperBody: string;
  desktopHint: string;
  referenceLabel: string;
}

export interface ProductScanCopy {
  title: string;
  back: string;
  continue: string;
  fallbackHelp: string;
  guidance: string;
  runtimeMessages: ScanRuntimeMessages;
}

export interface ProductAfterScanCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  offerLabel: string;
  backToScan: string;
  restart: string;
}

export interface ProductConfig {
  id: string;
  name: string;
  intro: ProductIntroCopy;
  scan: ProductScanCopy;
  afterScan: ProductAfterScanCopy;
  scanTarget: ScanTargetConfig;
  arModel?: ProductArModelConfig;
  offerCTA: {
    url: string;
    label: string;
  };
  hotspots: ProductHotspot[];
}

export interface ActiveProductResolution {
  productId: string;
  product: ProductConfig;
  requestedProductId: string | null;
  usedFallback: boolean;
  fallbackReason: 'missing' | 'invalid' | null;
}
