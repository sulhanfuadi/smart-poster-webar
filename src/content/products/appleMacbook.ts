import type { ProductConfig } from '../../types/app';
import { baseRuntimeMessages, buildMvpScanTarget, commonAfterScanCopy, commonIntroCopy } from './shared';

export const appleMacbook: ProductConfig = {
  id: 'apple-macbook',
  name: 'MacBook Air MVP',
  intro: {
    ...commonIntroCopy,
    title: 'Scan this MacBook Air poster / Scan poster MacBook Air ini.',
    subtitle:
      'Marker-based single-image MVP for product storytelling and conversion / MVP marker-based satu gambar untuk storytelling produk dan konversi.',
    helperBody:
      'Use HTTPS on mobile, allow camera access, and keep the whole poster visible / Gunakan HTTPS di mobile, izinkan kamera, dan jaga seluruh poster tetap terlihat.',
    referenceLabel: 'Open marker reference / Buka referensi marker',
  },
  scan: {
    title: 'MacBook Air AR Scan / Scan AR MacBook Air',
    back: 'Back / Kembali',
    continue: 'Continue / Lanjut',
    fallbackHelp: 'Need fallback help? / Butuh bantuan fallback?',
    guidance:
      'Point camera to the same MacBook Air poster, reduce glare, hold steady / Arahkan kamera ke poster yang sama, kurangi pantulan cahaya, tahan stabil.',
    runtimeMessages: baseRuntimeMessages(
      'Marker locked. Continue to detail and conversion / Marker terkunci. Lanjut ke detail dan konversi.',
    ),
  },
  afterScan: {
    ...commonAfterScanCopy,
    title: 'Conversion Handoff / Handoff Konversi',
  },
  scanTarget: buildMvpScanTarget(),
  arModel: {
    url: '/assets/models/apple-macbook/model.glb',
    scale: [0.9, 0.9, 0.9],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  actions: [
    {
      id: 'detail',
      label: 'Detail / Detail Produk',
      url: 'https://www.apple.com/macbook-air/',
      style: 'secondary',
    },
    {
      id: 'contact',
      label: 'Contact / Hubungi',
      url: 'https://wa.me/6285291105501?text=Halo%2C%20saya%20tertarik%20dengan%20demo%20AR%20MacBook%20Air.%20Boleh%20minta%20info%20lanjutan%3F',
      style: 'outline',
    },
    {
      id: 'buy',
      label: 'Buy / Beli',
      url: 'https://www.apple.com/shop/buy-mac/macbook-air',
      style: 'primary',
    },
  ],
  mediaPreviews: [
    {
      id: '2d',
      label: '2D',
      headline: '2D Info Card / Kartu Info 2D',
      description:
        'This placeholder simulates static product information layered after scan / Placeholder ini mensimulasikan informasi produk statis setelah scan.',
      points: [
        'Chip: Apple Silicon class performance / Performa kelas Apple Silicon',
        'Battery: up to 18 hours claim (marketing placeholder) / Klaim hingga 18 jam',
        'Display: high-resolution retina class panel / Panel kelas retina resolusi tinggi',
      ],
    },
    {
      id: '3d',
      label: '3D',
      headline: '3D Preview Placeholder / Placeholder Pratinjau 3D',
      description:
        'Final 3D model can be plugged in later without changing conversion flow / Model 3D final bisa dipasang nanti tanpa ubah alur konversi.',
      points: [
        'Current state uses fallback mesh in AR runtime / Saat ini memakai fallback mesh',
        'Model path remains `/assets/models/apple-macbook/model.glb` / Jalur model tetap sama',
        'Safe for MVP demo while asset is still pending / Aman untuk demo MVP saat aset belum final',
      ],
    },
  ],
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
};
