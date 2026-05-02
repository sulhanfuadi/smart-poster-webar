import { appConfig, assetManifest, chatbotContent, productContent } from '../config/content';

const hotspotPositions = [
  { x: -0.82, y: 0.88 },
  { x: -0.16, y: 0.48 },
  { x: 0.34, y: 0.8 },
  { x: 0.82, y: 1.14 },
];

function createMarkerAttributes() {
  if (assetManifest.marker.mode === 'pattern') {
    return `type="pattern" url="${assetManifest.marker.patternUrl}"`;
  }

  return 'preset="hiro"';
}

function createProceduralPhone() {
  return `
    <a-box position="0 0 0" depth="0.08" height="1.8" width="0.9" radius="0.08" color="#0f172a"></a-box>
    <a-box position="0 0.02 0.045" depth="0.01" height="1.62" width="0.78" color="#38bdf8"></a-box>
    <a-box position="0 0.64 0.052" depth="0.01" height="0.18" width="0.38" color="#0ea5e9"></a-box>
    <a-cylinder position="-0.24 0.54 0.052" radius="0.06" height="0.01" color="#e2e8f0"></a-cylinder>
    <a-cylinder position="0 0.54 0.052" radius="0.06" height="0.01" color="#bfdbfe"></a-cylinder>
    <a-cylinder position="0.24 0.54 0.052" radius="0.06" height="0.01" color="#e2e8f0"></a-cylinder>
  `;
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
    <a-entity id="hero-model-root" position="${model.fallbackPosition}" rotation="${model.rotation}" scale="${model.scale}">
      <a-entity id="hero-fallback" visible="true">
        ${createProceduralPhone()}
      </a-entity>
    </a-entity>
  `;
}

export function createAppMarkup() {
  const specs = productContent.shortSpecs.map((item) => `<li>${item}</li>`).join('');
  const checklist = productContent.instruction.checklist.map((item) => `<li>${item}</li>`).join('');
  const valueProps = productContent.valueProps.map((item) => `<li>${item}</li>`).join('');
  const quickQuestions = chatbotContent.quickQuestions
    .map(
      (question) => `
        <button class="quick-question" type="button" data-chatbot-question="${question}">${question}</button>
      `,
    )
    .join('');

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
      <section class="hero-panel glass">
        <div class="hero-copy">
          <div class="brand-row">
            <img src="${assetManifest.branding.thumb}" alt="Identitas Nova X Vision" class="brand-thumb" />
            <div>
              <p class="eyebrow">${appConfig.appEyebrow}</p>
              <h1>${productContent.productName}</h1>
            </div>
          </div>
          <p class="tagline">${productContent.tagline}</p>
          <div class="hero-narrative glass-lite">
            <p class="eyebrow">${productContent.narrativeTitle}</p>
            <p>${productContent.narrative}</p>
          </div>
          <ul class="spec-list">${specs}</ul>
          <div class="action-row">
            <button type="button" class="primary-btn" id="enter-ar-btn">Mulai Demonstrasi AR</button>
            <a class="ghost-btn" href="${productContent.cta.url}" target="_blank" rel="noreferrer">${productContent.cta.label}</a>
          </div>
        </div>
        <div class="hero-support">
          <div class="poster-panel glass-lite">
            <p class="eyebrow">Poster Preview</p>
            <img src="${assetManifest.poster.preview}" alt="Preview smart poster Nova X Vision" class="poster-preview" />
            <p class="poster-caption">${productContent.cta.supportingText}</p>
          </div>
          <div class="instruction-list glass-lite">
            <p class="eyebrow">${productContent.instruction.title}</p>
            <ul>${checklist}</ul>
          </div>
        </div>
      </section>

      <section class="explain-panel glass">
        <div class="value-panel glass-lite">
          <p class="eyebrow">Nilai Demonstrasi</p>
          <ul class="value-list">${valueProps}</ul>
        </div>
        <div class="resource-panel glass-lite">
          <p class="eyebrow">Marker & Panduan</p>
          <div class="poster-links">
            <a class="marker-link" href="${assetManifest.marker.preview}" target="_blank" rel="noreferrer">Marker custom</a>
            <a class="marker-link" href="${assetManifest.poster.markerGuide}" target="_blank" rel="noreferrer">Guide penempatan</a>
            <a class="marker-link" href="${assetManifest.marker.hiroPreview}" target="_blank" rel="noreferrer">Fallback Hiro</a>
          </div>
        </div>
        <div class="chatbot-panel glass-lite">
          <div class="chatbot-head">
            <div>
              <p class="eyebrow">${chatbotContent.title}</p>
              <h2>${chatbotContent.personaName}</h2>
            </div>
            <p class="chatbot-subtitle">${chatbotContent.subtitle}</p>
          </div>
          <div class="chatbot-mode-row">
            <span class="state-pill" data-tone="ok" id="chatbot-mode-pill">Mode ${chatbotContent.mode}</span>
          </div>
          <div class="chatbot-log glass" id="chatbot-log" aria-live="polite"></div>
          <p class="chatbot-empty" id="chatbot-empty">${chatbotContent.emptyState}</p>
          <div class="quick-question-list">${quickQuestions}</div>
          <form class="chatbot-form" id="chatbot-form">
            <input id="chatbot-input" class="chatbot-input" type="text" placeholder="${chatbotContent.inputPlaceholder}" />
            <button type="submit" class="primary-btn chatbot-send" id="chatbot-send-btn">${chatbotContent.sendLabel}</button>
          </form>
          <a class="ghost-btn chatbot-cta" href="${chatbotContent.escalation.url}" target="_blank" rel="noreferrer">${chatbotContent.escalation.label}</a>
        </div>
      </section>

      <section class="ar-stage" id="ar-stage" hidden>
        <div class="overlay top-overlay">
          <div class="overlay-card status-card glass">
            <p class="eyebrow">Status Demonstrasi</p>
            <h2 id="tracking-status">${appConfig.statusCopy.idle}</h2>
            <p class="support-copy" id="support-copy">${appConfig.compatibility.cameraHelp}</p>
            <div class="state-pill-row">
              <span class="state-pill" id="runtime-state-pill">Runtime idle</span>
              <span class="state-pill" id="camera-state-pill">Camera idle</span>
              <span class="state-pill" id="marker-state-pill">Marker default ${assetManifest.marker.mode}</span>
              <span class="state-pill" id="model-state-pill">Model ${assetManifest.model.mode}</span>
            </div>
          </div>
          <div class="overlay-card hotspot-card glass">
            <p class="eyebrow">Poin Fitur</p>
            <h3 id="hotspot-title"></h3>
            <p id="hotspot-summary"></p>
          </div>
        </div>

        <div class="overlay operator-overlay">
          <div class="overlay-card guidance-card glass">
            <div class="guidance-head">
              <div>
                <p class="eyebrow">Panduan Operator</p>
                <h3 id="operator-guidance-title">Demonstrasi siap dimulai</h3>
              </div>
              <span class="state-pill" id="fallback-mode-pill">Marker ${assetManifest.marker.mode}</span>
            </div>
            <p class="guidance-copy" id="operator-guidance-copy">${appConfig.operatorGuidance.markerSlow}</p>
          </div>
        </div>

        <div class="hotspot-layer">${hotspots}</div>
        <div class="compat-banner" id="compat-banner" hidden></div>

        <div class="overlay bottom-overlay">
          <div class="cta-bar glass">
            <p>${productContent.cta.supportingText}</p>
            <a class="primary-btn" href="${productContent.cta.url}" target="_blank" rel="noreferrer">${productContent.cta.label}</a>
          </div>
        </div>

        <a-scene
          id="ar-scene"
          embedded
          vr-mode-ui="enabled: false"
          renderer="logarithmicDepthBuffer: true; precision: mediump;"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets>
            <a-asset-item id="phone-model-asset" src="${assetManifest.model.src}"></a-asset-item>
          </a-assets>

          <a-marker id="main-marker" ${createMarkerAttributes()}>
            ${createHeroMarkup()}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </section>
    </div>
  `;
}
