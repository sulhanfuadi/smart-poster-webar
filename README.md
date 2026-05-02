# Nova X Vision Smart Poster AR

Aplikasi marker-based static WebAR untuk presentasi akademik: mengubah poster smartphone yang statis menjadi demonstrasi produk yang lebih hidup melalui hotspot AR dan FAQ pendukung presentasi.

## Fokus final
- Academic polished demo, bukan prototipe mentah
- Alur presentasi tunggal: poster → scan AR → hotspot fitur → FAQ singkat → CTA
- Chatbot local-first sebagai jalur demo utama
- Static-first deploy agar presentasi tetap stabil tanpa ketergantungan backend

## Stack
- Vite vanilla
- A-Frame
- AR.js
- FAQ assistant local-first (remote-ready tetap opsional)

## Jalankan project
```bash
npm install
npm run dev
```

## Build dan verifikasi
```bash
npm run build
npm run preview
npm run smoke:test
```

## Source of truth
- `src/config/content.js` untuk branding, narasi, runtime copy, operator guidance, CTA, dan konfigurasi chatbot.
- `src/lib/arScene.js` untuk struktur visual landing, panel presentasi, dan stage AR.
- `src/lib/chatbot.js` untuk FAQ local-first dan fallback aman.
- `src/main.js` untuk orchestrator state runtime AR dan sinkronisasi UI.

## Alur demonstrasi
1. Buka halaman di browser mobile modern melalui HTTPS atau localhost.
2. Tekan `Mulai Demonstrasi AR` dan izinkan kamera.
3. Kunci marker custom pada poster hingga produk AR muncul.
4. Jelaskan fitur lewat hotspot secara berurutan.
5. Gunakan FAQ singkat jika ada pertanyaan audiens.
6. Tutup dengan tombol `Buka Halaman Penawaran`.

## Asset yang dapat diganti
- `public/assets/poster/poster-preview.svg`
- `public/assets/poster/poster-marker-guide.svg`
- `public/assets/markers/custom-marker-reference.svg`
- `public/assets/markers/custom-marker-placeholder.patt`
- `public/assets/branding/brand-thumb.svg`
- `public/assets/models/phone-demo.glb`

## Prinsip chatbot final
- Mode presentasi utama: `local`
- Mode `remote` hanya opsi teknis tambahan
- Jika remote gagal, jawaban harus kembali aman ke FAQ lokal

## Manual QA minimum
- Layout tetap rapi di desktop sempit dan mobile sempit.
- Overlay AR tidak bertabrakan dengan CTA/guidance.
- State permission denied, searching, found, lost berjalan konsisten.
- FAQ lokal menjawab pertanyaan inti (harga, kamera, promo, pembelian).
- Poster preview dan marker guide termuat benar.

## Deploy
- Target rekomendasi: `Vercel`
- Jalur final tetap dianggap lulus pada static-first path
- Endpoint `/api/chatbot` bersifat optional untuk demonstrasi remote-ready

## Dokumen handoff
- `docs/operator-runbook.md`
- `docs/mobile-qa-matrix.md`
- `docs/known-limitations.md`
- `docs/release-checklist.md`
