import type { ScanRuntimeMessages, ScanTargetConfig } from '../../types/app';

const sampleMindTargetUrl =
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind';

export const sampleReferenceImageUrl =
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png';

export const sharedScanTarget: ScanTargetConfig = {
  mindTargetUrl: import.meta.env.VITE_MINDAR_TARGET_URL || sampleMindTargetUrl,
  fallbackMindTargetUrl: sampleMindTargetUrl,
  referenceImageUrl: sampleReferenceImageUrl,
};

export const fallbackSampleScanTarget: ScanTargetConfig = {
  mindTargetUrl: sampleMindTargetUrl,
  fallbackMindTargetUrl: sampleMindTargetUrl,
  referenceImageUrl: sampleReferenceImageUrl,
};

export const baseRuntimeMessages = (foundMessage: string): ScanRuntimeMessages => ({
  idle: 'Ready to start AR scan.',
  requesting_camera: 'Requesting camera permission…',
  ready: 'Camera ready. Initializing tracking…',
  searching: 'Marker not locked yet. Move closer and keep marker fully visible.',
  found: foundMessage,
  lost: 'Marker lost. Re-center the marker to restore tracking.',
  error: 'Camera or AR runtime failed. Use fallback preview flow.',
  preview: 'Preview mode only. Use mobile for full scan validation.',
});

export const commonIntroCopy = {
  eyebrow: 'Academic WebAR Showcase',
  primaryCta: 'Start AR Scan',
  helperLabel: 'How to scan',
  desktopHint: 'Desktop is preview-only. For full camera scan, open this link from Chrome Android or Safari iPhone.',
} as const;

export const commonAfterScanCopy = {
  eyebrow: 'After scan',
  subtitle: 'Move from AR interaction to one clear conversion action.',
  backToScan: 'Back to Scan',
  restart: 'Restart Demo',
} as const;
