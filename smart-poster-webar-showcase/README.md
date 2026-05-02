# Smart Poster WebAR Showcase

Marker-based static WebAR demo untuk mengubah poster smartphone menjadi pengalaman AR ringan berbasis browser, dengan struktur yang lebih siap untuk demo nyata dan penggantian aset final.

## Stack
- Vite vanilla
- A-Frame
- AR.js

## Quick start
```bash
npm install
npm run dev
```

Build production:
```bash
npm run build
npm run preview
```

Smoke check:
```bash
npm run smoke:test
```

## Flow operator
- Buka landing page.
- Tekan `Masuk Mode AR`.
- Izinkan akses kamera.
- Arahkan kamera ke marker custom.
- Saat marker terkunci, produk muncul di atas poster.
- Tap hotspot untuk membaca detail fitur.
- Gunakan CTA untuk membuka marketplace.

## Source of truth
- `src/config/content.js` berisi app config, copy, CTA, marker config, model config, dan state message.
- `src/lib/arScene.js` berisi kontrak scene AR, marker mode, dan hero product rendering.
- `src/main.js` berisi state runtime, permission handling, marker handling, dan model fallback handling.

## Asset pipeline
- `public/assets/poster/poster-preview.svg` untuk preview poster pada landing page.
- `public/assets/poster/poster-marker-guide.svg` untuk guide peletakan marker pada desain poster final.
- `public/assets/markers/custom-marker-reference.svg` untuk placeholder visual marker custom.
- `public/assets/markers/custom-marker-placeholder.patt` untuk file pattern AR.js yang nantinya diganti dengan marker final.
- `public/assets/models/phone-demo.glb` untuk slot model 3D final.

## Cara ganti aset final
1. Ubah nama produk, CTA, state message, dan hotspot di `src/config/content.js`.
2. Ganti poster preview di `public/assets/poster/poster-preview.svg`.
3. Buat marker final dari desain poster, lalu overwrite `public/assets/markers/custom-marker-placeholder.patt`.
4. Jika sudah punya visual marker reference, ganti `public/assets/markers/custom-marker-reference.svg`.
5. Ganti `public/assets/models/phone-demo.glb` dengan model final.
6. Ubah `assetManifest.model.mode` menjadi `gltf` di `src/config/content.js` agar scene mencoba memuat model final.
7. Sesuaikan `scale`, `rotation`, dan `position` model di config jika orientasi model belum pas.

## Marker mode
- Default saat ini adalah `pattern`, sehingga project sudah siap migrasi ke marker custom.
- Fallback dev mode disimpan sebagai `preset-hiro` di config bila Anda perlu kembali ke marker bawaan untuk troubleshooting.

## Mobile demo checklist
- Jalankan lewat HTTPS atau `localhost`.
- Gunakan Chrome Android atau Safari iPhone terbaru.
- Pastikan marker cukup besar, kontras, dan tidak tertutup teks/elemen lain.
- Hindari pantulan cahaya berlebih pada poster.
- Jika model final gagal dimuat, app otomatis kembali ke mockup procedural.

## Deploy
Project ini siap untuk static hosting dan sudah memakai `base: './'` agar lebih aman bila dipasang di subpath. Tetap gunakan origin aman untuk akses kamera.
