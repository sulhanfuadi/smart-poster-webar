import './style.css';
import { appConfig, assetManifest, productContent } from './config/content';
import { createAppMarkup } from './lib/arScene';

const app = document.querySelector('#app');
app.innerHTML = createAppMarkup();

document.title = appConfig.appName;

const arStage = document.querySelector('#ar-stage');
const enterArButton = document.querySelector('#enter-ar-btn');
const trackingStatus = document.querySelector('#tracking-status');
const supportCopy = document.querySelector('#support-copy');
const compatBanner = document.querySelector('#compat-banner');
const hotspotTitle = document.querySelector('#hotspot-title');
const hotspotSummary = document.querySelector('#hotspot-summary');
const marker = document.querySelector('#main-marker');
const scene = document.querySelector('#ar-scene');
const cameraStatePill = document.querySelector('#camera-state-pill');
const markerStatePill = document.querySelector('#marker-state-pill');
const modelStatePill = document.querySelector('#model-state-pill');
const heroModel = document.querySelector('#hero-model');
const heroFallback = document.querySelector('#hero-fallback');

const hotspotMap = new Map(productContent.hotspots.map((item) => [item.id, item]));

const runtimeState = {
  arStageOpen: false,
  markerFound: false,
  cameraGranted: false,
  modelReady: assetManifest.model.mode !== 'gltf',
  fallbackActive: assetManifest.model.mode !== 'gltf',
};

function updateTrackingStatus(message) {
  trackingStatus.textContent = message;
}

function updateSupportCopy(message) {
  supportCopy.textContent = message;
}

function setPill(element, label, tone = 'neutral') {
  element.textContent = label;
  element.dataset.tone = tone;
}

function setCompatibilityMessage(message) {
  compatBanner.textContent = message;
  compatBanner.hidden = false;
}

function hideCompatibilityMessage() {
  compatBanner.hidden = true;
}

function setHotspot(id) {
  const active = hotspotMap.get(id);
  if (!active) return;
  hotspotTitle.textContent = active.title;
  hotspotSummary.textContent = active.summary;

  document.querySelectorAll('[data-hotspot-id]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.hotspotId === id);
  });
}

function openArStage() {
  if (runtimeState.arStageOpen) return;
  runtimeState.arStageOpen = true;
  arStage.hidden = false;
  document.body.classList.add('ar-active');
  updateTrackingStatus(productContent.states.loading);
  updateSupportCopy(productContent.instruction.body);
  document.querySelector('#ar-stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function isMobileLike() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkCompatibility() {
  const secureContextOk = window.isSecureContext || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const mediaOk = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const mobileOk = isMobileLike();

  if (!secureContextOk || !mediaOk || !mobileOk) {
    setCompatibilityMessage(`${productContent.states.incompatible} ${appConfig.support.secureContextHint} ${appConfig.support.mobileHint}`);
    updateTrackingStatus(productContent.states.incompatible);
    updateSupportCopy(`${appConfig.support.recommendedBrowsers}. ${appConfig.support.secureContextHint}`);
    return false;
  }

  hideCompatibilityMessage();
  return true;
}

function activateProceduralFallback(reasonMessage = productContent.states.modelFailed) {
  runtimeState.fallbackActive = true;
  runtimeState.modelReady = false;
  if (heroFallback) {
    heroFallback.setAttribute('visible', 'true');
  }
  setPill(modelStatePill, 'Model fallback active', 'warning');
  updateTrackingStatus(reasonMessage);
}

function initModelHandling() {
  if (assetManifest.model.mode !== 'gltf' || !heroModel) {
    setPill(modelStatePill, 'Model procedural', 'ok');
    return;
  }

  setPill(modelStatePill, 'Model loading', 'neutral');

  heroModel.addEventListener('model-loaded', () => {
    runtimeState.modelReady = true;
    runtimeState.fallbackActive = false;
    if (heroFallback) {
      heroFallback.setAttribute('visible', 'false');
    }
    setPill(modelStatePill, 'Model ready', 'ok');
  });

  heroModel.addEventListener('model-error', () => {
    activateProceduralFallback();
  });
}

enterArButton.addEventListener('click', async () => {
  openArStage();

  if (!checkCompatibility()) {
    setPill(cameraStatePill, 'Camera unsupported', 'warning');
    return;
  }

  setPill(cameraStatePill, 'Camera requesting', 'neutral');
  setPill(markerStatePill, 'Marker pending', 'neutral');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    stream.getTracks().forEach((track) => track.stop());
    runtimeState.cameraGranted = true;
    setPill(cameraStatePill, 'Camera granted', 'ok');
    updateTrackingStatus(productContent.states.cameraGranted);
    updateSupportCopy(appConfig.support.mobileHint);
  } catch (error) {
    console.error(error);
    runtimeState.cameraGranted = false;
    setPill(cameraStatePill, 'Camera denied', 'warning');
    updateTrackingStatus(productContent.states.cameraDenied);
    setCompatibilityMessage(`${productContent.states.cameraDenied} ${appConfig.support.secureContextHint}`);
  }
});

scene?.addEventListener('loaded', () => {
  updateTrackingStatus(productContent.states.idle);
  setPill(cameraStatePill, 'Camera pending', 'neutral');

  const markerModeLabel = assetManifest.marker.mode === 'pattern' ? 'Marker custom' : 'Marker Hiro';
  setPill(markerStatePill, `${markerModeLabel} ready`, 'neutral');
  initModelHandling();
});

marker?.addEventListener('markerFound', () => {
  runtimeState.markerFound = true;
  setPill(markerStatePill, 'Marker found', 'ok');
  updateTrackingStatus(productContent.states.markerFound);
});

marker?.addEventListener('markerLost', () => {
  runtimeState.markerFound = false;
  setPill(markerStatePill, 'Marker lost', 'warning');
  updateTrackingStatus(productContent.states.markerLost);
});

window.addEventListener('camera-error', () => {
  setPill(cameraStatePill, 'Camera error', 'warning');
  updateTrackingStatus(productContent.states.cameraDenied);
  setCompatibilityMessage(`${productContent.states.cameraDenied} ${appConfig.support.secureContextHint}`);
});

window.addEventListener('arjs-video-loaded', () => {
  if (!runtimeState.cameraGranted) {
    updateTrackingStatus(productContent.states.markerSearching);
    setPill(cameraStatePill, 'Camera stream ready', 'ok');
  } else {
    updateTrackingStatus(runtimeState.markerFound ? productContent.states.markerFound : productContent.states.markerSearching);
  }
  updateSupportCopy(appConfig.support.mobileHint);
});

window.addEventListener('resize', () => {
  if (document.body.classList.contains('ar-active') && !runtimeState.markerFound) {
    updateSupportCopy('Sesuaikan posisi kamera dan jaga seluruh marker tetap masuk ke dalam frame.');
  }
});

document.querySelectorAll('[data-hotspot-id]').forEach((button, index) => {
  button.addEventListener('click', () => setHotspot(button.dataset.hotspotId));
  if (index === 0) setHotspot(button.dataset.hotspotId);
});

checkCompatibility();
