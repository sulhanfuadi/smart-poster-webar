const BASE_URL = import.meta.env.BASE_URL || '/';

function withBase(path) {
  return `${BASE_URL.replace(/\/$/, '')}${path}`;
}

export const appConfig = {
  appName: 'Nova X Vision Smart Poster AR',
  appEyebrow: 'Academic WebAR Showcase',
  appDescription:
    'Smart poster smartphone berbasis marker untuk presentasi akademik yang menyatukan visual poster, eksplorasi AR, dan FAQ penjualan ringan dalam satu alur yang rapi.',
  supportUrl: 'https://example.com/nova-x-vision-5g',
  deploy: {
    recommendedTarget: 'Vercel',
    requiresHttps: true,
    previewUrlHint: 'Deploy ke HTTPS agar kamera browser mobile bisa aktif penuh.',
  },
  runtime: {
    markerSearchTimeoutMs: 12000,
    markerLostCooldownMs: 2200,
    sceneReadyTimeoutMs: 7000,
    chatbotRequestTimeoutMs: 4500,
  },
  compatibility: {
    cameraHelp:
      'Gunakan browser mobile modern melalui HTTPS atau localhost, lalu izinkan akses kamera agar mode AR dapat dimulai.',
    markerHelp:
      'Arahkan kamera ke marker custom pada poster dan jaga marker tetap terang, rata, serta terlihat penuh di frame.',
    fallbackHelp:
      'Jika model final belum dipakai atau gagal dimuat, mockup procedural tetap menjaga presentasi berjalan stabil.',
    desktopHint:
      'Desktop cocok untuk preview alur tampilan, tetapi uji marker dan kamera tetap harus dilakukan di mobile modern.',
  },
  operatorGuidance: {
    cameraDenied:
      'Jika izin kamera ditolak, aktifkan kembali permission browser untuk origin ini lalu buka ulang mode AR.',
    markerSlow:
      'Jika marker belum terkunci, dekatkan kamera sekitar 20–35 cm, ratakan poster, dan kurangi pantulan cahaya.',
    markerLost:
      'Jika objek hilang, tahan perangkat lebih stabil selama 1–2 detik lalu pastikan seluruh marker kembali masuk frame.',
    sceneDelayed:
      'Jika scene terasa lambat siap, tunggu beberapa detik atau refresh halaman. Saat demo, tutup tab berat lain di perangkat.',
    devFallback:
      'Untuk troubleshooting, marker Hiro fallback dapat dipakai untuk memverifikasi jalur AR dasar.',
    remoteFallback:
      'Jika jalur remote gagal, chatbot harus tetap kembali aman ke FAQ lokal tanpa mengganggu alur presentasi.',
  },
  statusCopy: {
    idle: 'Siapkan poster lalu masuk ke mode AR saat presenter siap memulai demonstrasi.',
    requestingCamera: 'Aplikasi sedang meminta izin kamera. Setelah diizinkan, arahkan perangkat ke marker pada poster.',
    cameraReady: 'Kamera aktif. Sekarang arahkan poster ke marker custom untuk memunculkan produk.',
    sceneLoading: 'Mode AR sedang disiapkan sebelum tracking marker dimulai.',
    sceneDelayed: 'Scene AR belum sepenuhnya stabil. Tunggu sebentar atau refresh bila kamera belum responsif.',
    markerSearching: 'Marker belum terkunci. Dekatkan kamera dan pastikan marker terlihat penuh.',
    markerSearchTimeout: 'Marker belum terbaca setelah beberapa detik. Gunakan panduan operator agar proses locking lebih cepat.',
    markerFound: 'Marker terkunci. Produk AR siap dipresentasikan bersama hotspot fiturnya.',
    markerLost: 'Marker sempat hilang. Kembalikan marker ke dalam frame agar objek stabil lagi.',
    cameraDenied: 'Akses kamera belum diberikan. Aktifkan izin kamera untuk melanjutkan demonstrasi AR.',
    unsupported: 'Perangkat atau browser ini belum ideal untuk WebAR penuh. Gunakan fallback visual dan CTA untuk melanjutkan presentasi.',
    modelFallback: 'Mockup procedural dipakai sebagai jalur aman presentasi karena model final tidak aktif atau gagal dimuat.',
    chatbotRemoteLoading: 'Asisten sedang mencoba mengambil jawaban dari endpoint remote-ready.',
    chatbotRemoteFallback: 'Jalur remote tidak tersedia, jadi chatbot kembali memakai FAQ lokal.',
  },
  knownLimitations: [
    'Tracking marker paling akurat tetap membutuhkan browser mobile modern dan origin HTTPS.',
    'Desktop preview tidak mewakili akurasi tracking kamera secara penuh.',
    'Marker glossy, blur, atau terlalu kecil akan menurunkan stabilitas lock secara signifikan.',
    'Mode remote chatbot bersifat opsional; presentasi utama tidak bergantung padanya.',
  ],
};

export const productContent = {
  productName: 'Nova X Vision 5G',
  tagline:
    'Poster smartphone yang semula statis diubah menjadi pengalaman AR interaktif untuk membantu penjelasan fitur, memperkuat kesan visual, dan mendukung niat beli.',
  narrativeTitle: 'Dari poster statis menjadi presentasi produk yang hidup',
  narrative:
    'Demo ini menunjukkan bagaimana marker-based WebAR dapat menambah vividness dan informativeness pada media poster, sementara FAQ ringan membantu menjawab pertanyaan penting tanpa membuat alur presentasi menjadi rumit.',
  valueProps: [
    'Static WebAR tanpa instalasi aplikasi tambahan',
    'Hotspot fitur untuk membantu penjelasan kamera, layar, performa, dan baterai',
    'FAQ pendukung presentasi untuk pertanyaan pembelian yang paling umum',
  ],
  shortSpecs: ['6.78” AMOLED 144Hz HDR', '200MP AI Camera', '12GB RAM + 512GB', '5200mAh + 100W Hyper Charge'],
  instruction: {
    title: 'Alur Demonstrasi',
    checklist: [
      'Buka halaman ini dari browser mobile modern dengan HTTPS atau localhost.',
      'Tekan “Mulai Demonstrasi AR” lalu izinkan akses kamera.',
      'Arahkan kamera ke marker custom pada poster sampai tracking terkunci.',
      'Gunakan hotspot untuk menjelaskan nilai produk secara singkat dan terarah.',
      'Tutup dengan FAQ singkat lalu arahkan audiens ke CTA penawaran.',
    ],
  },
  cta: {
    label: 'Buka Halaman Penawaran',
    url: 'https://example.com/nova-x-vision-5g',
    supportingText:
      'Setelah interaksi AR selesai, CTA ini menjadi jembatan paling sederhana dari presentasi menuju intent pembelian.',
  },
  hotspots: [
    {
      id: 'camera',
      label: 'Kamera',
      title: '200MP Ultra Detail Camera',
      summary:
        'Menekankan kemampuan kamera untuk detail tinggi, portrait malam, dan konten visual yang relevan bagi pengguna aktif.',
    },
    {
      id: 'display',
      label: 'Layar',
      title: 'AMOLED 144Hz HDR Display',
      summary:
        'Menjelaskan pengalaman visual yang terang, mulus, dan nyaman untuk hiburan maupun penggunaan intensif.',
    },
    {
      id: 'performance',
      label: 'Performa',
      title: 'Flagship 5G Performance',
      summary:
        'Mendukung narasi rasional tentang multitasking, konektivitas, dan kesiapan perangkat untuk beban kerja berat.',
    },
    {
      id: 'battery',
      label: 'Baterai',
      title: '5200mAh + 100W Hyper Charge',
      summary:
        'Membantu audiens memahami manfaat praktis: lebih tahan lama, lebih cepat diisi, dan lebih siap untuk mobilitas.',
    },
  ],
};

export const chatbotContent = {
  mode: 'local',
  remoteReady: true,
  providerLabel: 'Presentation FAQ Assistant',
  personaName: 'NOVA Assistant',
  title: 'FAQ Pendukung Presentasi',
  subtitle: 'Asisten singkat untuk menjawab pertanyaan paling umum setelah audiens melihat pengalaman AR.',
  greeting:
    'Halo! Saya bisa membantu menjawab pertanyaan singkat tentang harga, kamera, promo, dan cara melanjutkan ke penawaran produk.',
  emptyState: 'Gunakan pertanyaan cepat atau ketik pertanyaan singkat Anda.',
  inputPlaceholder: 'Tanya soal harga, kamera, promo, atau langkah pembelian…',
  sendLabel: 'Kirim',
  quickQuestions: [
    'Berapa perkiraan harga produk ini?',
    'Apa keunggulan kameranya?',
    'Ada promo atau bonus pembelian?',
    'Bagaimana cara membeli setelah scan poster?',
  ],
  escalation: {
    label: 'Lanjut ke penawaran produk',
    url: 'https://example.com/nova-x-vision-5g',
    helperText: 'Gunakan tombol ini saat audiens siap berpindah dari eksplorasi ke intent pembelian.',
  },
  integration: {
    endpoint: '/api/chatbot',
    transport: 'http',
    requestShape: 'POST { question } -> { answer, source, matchedQuestion? }',
    timeoutMs: 4500,
    notes: 'Mode presentasi utama tetap local-first. Jalur remote hanya bonus teknis bila dibutuhkan di kemudian hari.',
  },
  fallbackResponse:
    'Saya belum punya jawaban khusus untuk itu. Coba tanya tentang harga, kamera, promo, atau cara melanjutkan pembelian.',
  faq: [
    {
      id: 'price',
      intents: ['harga', 'price', 'berapa', 'biaya', 'budget'],
      question: 'Berapa perkiraan harga produk ini?',
      answer:
        'Untuk kebutuhan demonstrasi, Nova X Vision 5G diposisikan sebagai smartphone flagship dengan estimasi harga mulai dari Rp9.999.000, tergantung varian memori dan promo penjualan.',
    },
    {
      id: 'camera',
      intents: ['kamera', 'foto', 'video', '200mp', 'night', 'portrait'],
      question: 'Apa keunggulan kameranya?',
      answer:
        'Keunggulan utamanya ada pada kamera 200MP, AI Night Portrait, dan stabilisasi cerdas sehingga cocok untuk detail tinggi, konten harian, dan kondisi low-light.',
    },
    {
      id: 'promo',
      intents: ['promo', 'bonus', 'diskon', 'hadiah', 'preorder', 'cashback'],
      question: 'Ada promo atau bonus pembelian?',
      answer:
        'Dalam skenario kampanye, promo dapat berupa bonus TWS, cashback marketplace, cicilan 0%, atau bundling kuota data selama periode peluncuran.',
    },
    {
      id: 'buy',
      intents: ['beli', 'buy', 'marketplace', 'checkout', 'pesan', 'order'],
      question: 'Bagaimana cara membeli setelah scan poster?',
      answer:
        'Setelah eksplorasi AR selesai, audiens dapat langsung menekan tombol “Buka Halaman Penawaran” untuk diarahkan ke halaman penjualan atau marketplace resmi.',
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
    scale: '0.82 0.82 0.82',
    rotation: '-90 0 0',
    position: '0 0.9 0',
    fallbackPosition: '0 0.9 0',
  },
};
