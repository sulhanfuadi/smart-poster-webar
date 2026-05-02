const base = import.meta.env.BASE_URL || '/';

const withBase = (path) => `${base}${path.replace(/^\//, '')}`;

export const appConfig = {
  appName: 'Smart Poster WebAR Showcase',
  appEyebrow: 'Smart Poster WebAR',
  demoMode: true,
  support: {
    recommendedBrowsers: 'Chrome Android atau Safari iPhone terbaru',
    secureContextHint: 'Gunakan HTTPS atau localhost agar browser mengizinkan akses kamera.',
    mobileHint: 'Pegang ponsel vertikal, jaga marker terlihat penuh, dan hindari cahaya terlalu gelap.',
  },
};

export const productContent = {
  productName: 'Astra X1 Pro',
  tagline: 'Smartphone flagship demo untuk mengubah poster statis menjadi pengalaman AR yang hidup.',
  shortSpecs: [
    'Kamera utama 108MP AI Vision',
    'Layar AMOLED 6.7 inci 120Hz',
    'Baterai 5000mAh + fast charge 80W',
  ],
  cta: {
    label: 'Lihat di Marketplace',
    url: 'https://example.com/marketplace/astra-x1-pro',
    contextLabel: 'Demo Marketplace',
  },
  instruction: {
    title: 'Scan poster untuk melihat smartphone dalam AR',
    body: 'Masuk ke mode AR, izinkan kamera, lalu arahkan kamera ke marker poster hingga produk muncul dan stabil.',
    checklist: [
      'Pastikan halaman dibuka lewat HTTPS atau localhost.',
      'Arahkan kamera ke marker sampai frame marker terlihat utuh.',
      'Tap hotspot saat model sudah muncul untuk membaca detail fitur.',
    ],
  },
  states: {
    idle: 'Tekan tombol untuk memulai pengalaman WebAR.',
    loading: 'Meminta izin kamera dan menyiapkan scene AR…',
    cameraGranted: 'Izin kamera diberikan. Arahkan kamera ke marker poster sekarang.',
    cameraDenied: 'Izin kamera ditolak. Muat ulang halaman lalu izinkan akses kamera untuk mencoba lagi.',
    markerSearching: 'Video aktif. Arahkan kamera ke marker poster dan jaga marker tetap terlihat penuh.',
    markerFound: 'Marker terdeteksi. Produk AR aktif dan siap dieksplorasi.',
    markerLost: 'Marker keluar dari frame kamera. Arahkan kembali ke poster untuk menampilkan produk.',
    modelFailed: 'Model 3D final gagal dimuat. Sistem otomatis memakai mockup procedural agar demo tetap jalan.',
    incompatible: 'Browser atau device ini belum memenuhi syarat WebAR yang stabil. Gunakan browser mobile terbaru dengan akses kamera.',
  },
  fallbackMessage:
    'Jika pengalaman AR tidak tampil, cek izin kamera, koneksi HTTPS, dan coba lagi di browser mobile yang direkomendasikan.',
  hotspots: [
    {
      id: 'camera',
      label: 'Kamera',
      title: '108MP AI Vision Camera',
      summary:
        'Sensor utama beresolusi tinggi untuk foto detail, portrait malam, dan video stabil untuk konten harian.',
    },
    {
      id: 'display',
      label: 'Layar',
      title: '6.7” AMOLED 120Hz',
      summary:
        'Visual cerah, warna kontras, dan refresh rate tinggi untuk scroll halus, gaming, dan video premium.',
    },
    {
      id: 'battery',
      label: 'Baterai',
      title: '5000mAh + 80W Fast Charge',
      summary:
        'Daya tahan panjang seharian dengan pengisian cepat untuk mendukung aktivitas mobile intens.',
    },
  ],
};

export const assetManifest = {
  poster: {
    preview: withBase('/assets/poster/poster-preview.svg'),
    markerGuide: withBase('/assets/poster/poster-marker-guide.svg'),
  },
  branding: {
    thumb: withBase('/assets/branding/brand-thumb.svg'),
  },
  marker: {
    mode: 'pattern',
    devFallbackMode: 'preset-hiro',
    patternUrl: withBase('/assets/markers/custom-marker-placeholder.patt'),
    preview: withBase('/assets/markers/custom-marker-reference.svg'),
    hiroPreview: withBase('/assets/markers/marker-hiro-reference.svg'),
  },
  model: {
    mode: 'procedural',
    fallbackMode: 'procedural',
    src: withBase('/assets/models/phone-demo.glb'),
    scale: '0.7 0.7 0.7',
    rotation: '-90 0 0',
    position: '0 0.85 0',
    fallbackPosition: '0 0.85 0',
  },
};
