import { appConfig, assetManifest, productContent } from '../config/content';

const hotspotPositions = [
  { x: -0.78, y: 0.9 },
  { x: 0, y: 0.54 },
  { x: 0.78, y: 1.18 },
];

function createMarkerAttributes() {
  if (assetManifest.marker.mode === 'pattern') {
    return `type="pattern" url="${assetManifest.marker.patternUrl}"`;
  }

  return 'preset="hiro"';
}

function createHeroMarkup() {
  const model = assetManifest.model;

  if (model.mode === 'gltf') {
    return `
      <a-entity id="hero-model-root" position="${model.position}" rotation="${model.rotation}" scale="${model.scale}">
        <a-entity id="hero-model" gltf-model="${model.src}"></a-entity>
      </a-entity>
      <a-entity id="hero-fallback" visible="false" position="${model.fallbackPosition}">
        ${createProceduralPhone()}
      </a-entity>
    `;
  }

  return `
    <a-entity id="hero-model-root" position="${model.fallbackPosition}">
      ${createProceduralPhone()}
    </a-entity>
  `;
}

function createProceduralPhone() {
  return `
    <a-entity rotation="-90 0 0">
      <a-box depth="0.12" height="2.2" width="1.15" color="#111827"></a-box>
      <a-box position="0 0.02 0.07" depth="0.01" height="1.92" width="0.96" color="#38bdf8"></a-box>
      <a-ring position="0.32 0.72 -0.065" rotation="90 0 0" radius-inner="0.08" radius-outer="0.13" color="#94a3b8"></a-ring>
      <a-ring position="0.32 0.72 -0.055" rotation="90 0 0" radius-inner="0.03" radius-outer="0.07" color="#0f172a"></a-ring>
      <a-cylinder position="-0.42 -0.92 0.02" rotation="0 0 90" radius="0.025" height="0.18" color="#475569"></a-cylinder>
      <a-text value="${productContent.productName}" position="0 -1.38 0" align="center" width="4" color="#ffffff"></a-text>
    </a-entity>
  `;
}

export function createAppMarkup() {
  const specs = productContent.shortSpecs.map((spec) => `<li>${spec}</li>`).join('');
  const checklist = productContent.instruction.checklist.map((item) => `<li>${item}</li>`).join('');
  const hotspots = productContent.hotspots
    .map(
      (hotspot, index) => `
        <button
          class="hotspot"
          type="button"
          data-hotspot-id="${hotspot.id}"
          style="--x:${hotspotPositions[index]?.x ?? 0}; --y:${hotspotPositions[index]?.y ?? 1};"
          aria-label="Buka info ${hotspot.label}"
        >
          <span>${hotspot.label}</span>
        </button>
      `,
    )
    .join('');

  return `
    <div class="shell">
      <section class="info-panel glass">
        <div class="brand-row">
          <img src="${assetManifest.branding.thumb}" alt="Thumbnail brand demo" class="brand-thumb" />
          <div>
            <p class="eyebrow">${appConfig.appEyebrow}</p>
            <h1>${productContent.productName}</h1>
          </div>
        </div>
        <p class="tagline">${productContent.tagline}</p>
        <ul class="spec-list">${specs}</ul>
        <div class="instruction-list glass-lite">
          <p class="eyebrow">Quick Setup</p>
          <ul>${checklist}</ul>
        </div>
        <div class="action-row">
          <button type="button" class="primary-btn" id="enter-ar-btn">Masuk Mode AR</button>
          <a class="ghost-btn" href="${productContent.cta.url}" target="_blank" rel="noreferrer">${productContent.cta.label}</a>
        </div>
      </section>

      <section class="poster-panel glass">
        <p class="eyebrow">Poster Preview</p>
        <img src="${assetManifest.poster.preview}" alt="Preview poster smart poster" class="poster-preview" />
        <div class="poster-links">
          <a class="marker-link" href="${assetManifest.marker.preview}" target="_blank" rel="noreferrer">Lihat marker custom</a>
          <a class="marker-link" href="${assetManifest.marker.hiroPreview}" target="_blank" rel="noreferrer">Lihat marker Hiro fallback</a>
          <a class="marker-link" href="${assetManifest.poster.markerGuide}" target="_blank" rel="noreferrer">Lihat guide penempatan marker</a>
        </div>
      </section>

      <section class="ar-stage" id="ar-stage" hidden>
        <div class="overlay top-overlay">
          <div class="glass overlay-card status-card">
            <p class="eyebrow">AR Status</p>
            <h2>${productContent.instruction.title}</h2>
            <p id="tracking-status">${productContent.states.idle}</p>
            <p class="support-copy" id="support-copy">${productContent.instruction.body}</p>
            <p class="fallback-copy">${productContent.fallbackMessage}</p>
          </div>

          <div class="glass overlay-card hotspot-card" id="hotspot-card">
            <p class="eyebrow">Feature Highlight</p>
            <h3 id="hotspot-title">Pilih hotspot</h3>
            <p id="hotspot-summary">Tap salah satu hotspot di sekitar produk untuk melihat spesifikasi penting.</p>
            <div class="state-pill-row">
              <span class="state-pill" id="camera-state-pill">Camera pending</span>
              <span class="state-pill" id="marker-state-pill">Marker pending</span>
              <span class="state-pill" id="model-state-pill">Model procedural</span>
            </div>
          </div>
        </div>

        <div class="hotspot-layer" id="hotspot-layer">${hotspots}</div>

        <div class="overlay bottom-overlay">
          <div class="glass cta-bar">
            <span>${productContent.cta.contextLabel}</span>
            <a href="${productContent.cta.url}" target="_blank" rel="noreferrer" class="primary-btn cta-link">${productContent.cta.label}</a>
          </div>
        </div>

        <div class="compat-banner" id="compat-banner" hidden></div>

        <a-scene
          id="ar-scene"
          embedded
          renderer="antialias: true; alpha: true; colorManagement: true;"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          loading-screen="enabled: false"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets timeout="10000"></a-assets>
          <a-marker ${createMarkerAttributes()} id="main-marker">
            ${createHeroMarkup()}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </section>
    </div>
  `;
}
