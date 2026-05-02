function normalizeText(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const faq = [
  {
    id: 'price',
    intents: ['harga', 'price', 'berapa', 'biaya', 'budget'],
    question: 'Berapa perkiraan harga produk ini?',
    answer:
      'Estimasi harga demo Nova X Vision 5G dimulai dari Rp9.999.000, tergantung varian memori dan promo kanal penjualan.',
  },
  {
    id: 'camera',
    intents: ['kamera', 'foto', 'video', '200mp', 'night', 'portrait'],
    question: 'Apa keunggulan kameranya?',
    answer:
      'Keunggulan utamanya ada pada kamera 200MP, AI Night Portrait, dan stabilisasi cerdas untuk detail produk, konten harian, dan low-light.',
  },
  {
    id: 'display',
    intents: ['layar', 'screen', 'amoled', '144hz', 'display', 'visual'],
    question: 'Bagaimana kualitas layarnya?',
    answer:
      'Layarnya AMOLED 6.78 inci 144Hz HDR, cocok untuk visual cerah, scrolling halus, gaming, dan streaming premium.',
  },
  {
    id: 'buy',
    intents: ['beli', 'buy', 'marketplace', 'checkout', 'pesan', 'order'],
    question: 'Bagaimana cara membeli setelah scan poster?',
    answer:
      'Setelah eksplorasi AR selesai, pengguna dapat menekan CTA penawaran untuk diarahkan ke halaman penjualan atau marketplace resmi.',
  },
];

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const question = typeof request.body?.question === 'string' ? request.body.question : '';
  const normalizedQuestion = normalizeText(question);
  const match = faq.find((entry) => entry.intents.some((intent) => normalizedQuestion.includes(intent)));

  if (!match) {
    response.status(200).json({
      answer:
        'Endpoint remote siap, tetapi pertanyaan ini belum punya jawaban khusus. Sistem seharusnya aman kembali ke FAQ lokal di sisi client.',
      source: 'remote-stub-fallback',
      matchedQuestion: '',
    });
    return;
  }

  response.status(200).json({
    answer: match.answer,
    source: 'remote-stub',
    matchedQuestion: match.question,
  });
}
