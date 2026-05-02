import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/config/content.js',
  'src/lib/arScene.js',
  'src/lib/chatbot.js',
  'src/main.js',
  'README.md',
  'docs/operator-runbook.md',
  'docs/mobile-qa-matrix.md',
  'docs/known-limitations.md',
  'docs/release-checklist.md',
  'public/assets/poster/poster-preview.svg',
  'public/assets/poster/poster-marker-guide.svg',
  'public/assets/markers/custom-marker-reference.svg',
  'public/assets/markers/custom-marker-placeholder.patt',
  'public/assets/branding/brand-thumb.svg',
  'public/assets/models/phone-demo.glb'
];

const missing = files.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.join('\n'));
  process.exit(1);
}

const configText = fs.readFileSync(path.join(root, 'src/config/content.js'), 'utf8');
const requiredConfigSnippets = [
  'Academic WebAR Showcase',
  'narrativeTitle',
  'Alur Demonstrasi',
  "mode: 'local'",
  'Presentation FAQ Assistant',
  'knownLimitations',
  'recommendedTarget',
  'markerSearchTimeoutMs'
];
const missingConfigSnippets = requiredConfigSnippets.filter((snippet) => !configText.includes(snippet));
if (missingConfigSnippets.length) {
  console.error('Config missing snippets:\n' + missingConfigSnippets.join('\n'));
  process.exit(1);
}

const sceneText = fs.readFileSync(path.join(root, 'src/lib/arScene.js'), 'utf8');
const requiredSceneSnippets = [
  'hero-panel',
  'explain-panel',
  'Mulai Demonstrasi AR',
  'chatbot-panel',
  'Panduan Operator',
  'main-marker'
];
const missingSceneSnippets = requiredSceneSnippets.filter((snippet) => !sceneText.includes(snippet));
if (missingSceneSnippets.length) {
  console.error('Scene missing snippets:\n' + missingSceneSnippets.join('\n'));
  process.exit(1);
}

const runtimeText = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8');
const requiredRuntimeSnippets = [
  'setRuntimeStage',
  'setChatbotPending',
  'Mode presentasi: local-first',
  'startMarkerSearchTimer',
  'checkCompatibility'
];
const missingRuntimeSnippets = requiredRuntimeSnippets.filter((snippet) => !runtimeText.includes(snippet));
if (missingRuntimeSnippets.length) {
  console.error('Runtime missing snippets:\n' + missingRuntimeSnippets.join('\n'));
  process.exit(1);
}

const readmeText = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const requiredReadmeSnippets = ['Academic polished', 'local-first', 'Static-first', 'Dokumen handoff'];
const missingReadmeSnippets = requiredReadmeSnippets.filter((snippet) => !readmeText.includes(snippet));
if (missingReadmeSnippets.length) {
  console.error('README missing snippets:\n' + missingReadmeSnippets.join('\n'));
  process.exit(1);
}

console.log('Smoke check passed: soft rebuild structure, academic-polished narrative, and local-first presentation flow are present.');
