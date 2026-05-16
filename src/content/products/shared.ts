import type { ScanRuntimeMessages, ScanTargetConfig } from '../../types/app';

const sampleMindTargetUrl =
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind';

export const sampleReferenceImageUrl =
  'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png';

export const mvpMarkerPaths = {
  mindTargetUrl: '/assets/markers/mvp/macbook-air/target.mind',
  referenceImageUrl: '/assets/markers/mvp/macbook-air/reference.png',
} as const;

export function buildMvpScanTarget(): ScanTargetConfig {
  return {
    mindTargetUrl: mvpMarkerPaths.mindTargetUrl,
    fallbackMindTargetUrl: import.meta.env.VITE_MINDAR_TARGET_URL || sampleMindTargetUrl,
    referenceImageUrl: mvpMarkerPaths.referenceImageUrl,
  };
}

export const fallbackSampleScanTarget: ScanTargetConfig = {
  mindTargetUrl: sampleMindTargetUrl,
  fallbackMindTargetUrl: sampleMindTargetUrl,
  referenceImageUrl: sampleReferenceImageUrl,
};

export const baseRuntimeMessages = (foundMessage: string): ScanRuntimeMessages => ({
  idle: 'Ready to start AR scan / Siap memulai scan AR.',
  requesting_camera: 'Requesting camera permission / Meminta izin kamera…',
  ready: 'Camera ready. Initializing tracking / Kamera siap. Inisialisasi tracking…',
  searching: 'Marker not locked yet. Move closer / Marker belum terkunci. Dekatkan kamera.',
  found: foundMessage,
  lost: 'Marker lost. Re-center marker / Marker hilang. Posisikan ulang marker.',
  error: 'Camera or AR runtime failed / Kamera atau runtime AR gagal.',
  preview: 'Preview mode only. Use mobile / Mode pratinjau. Gunakan perangkat mobile.',
});

export const commonIntroCopy = {
  eyebrow: 'Academic WebAR Showcase / Demo Akademik WebAR',
  primaryCta: 'Start AR Scan / Mulai Scan AR',
  helperLabel: 'How to scan / Cara scan',
  desktopHint:
    'Desktop is preview-only. For full camera scan, open this link from Chrome Android or Safari iPhone. / Desktop hanya pratinjau.',
} as const;

export const commonAfterScanCopy = {
  eyebrow: 'After scan / Setelah scan',
  subtitle: 'Move from AR interaction to one clear conversion action / Lanjut ke aksi konversi yang jelas.',
  actionsHeading: 'Quick Actions / Aksi Cepat',
  mediaHeading: 'Dummy 2D/3D Preview',
  backToScan: 'Back to Scan / Kembali ke Scan',
  restart: 'Restart Demo / Ulangi Demo',
} as const;
