import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mustExist = [
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'src/content/appContent.ts',
  'src/state/ScanSessionContext.tsx',
  'src/ar/mindarRuntime.ts',
  'src/pages/IntroPage.tsx',
  'src/pages/ScanPage.tsx',
  'src/pages/AfterScanPage.tsx',
  'README.md',
  'docs/release-checklist.md',
  'docs/mobile-qa-matrix.md',
  'docs/operator-runbook.md',
  'docs/known-limitations.md',
  'vercel.json',
];

const missing = mustExist.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.join('\n'));
  process.exit(1);
}

const appText = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const appSnippets = ['routes.scan', 'routes.afterScan', '<Routes>', '<Route'];
const missingApp = appSnippets.filter((snippet) => !appText.includes(snippet));
if (missingApp.length) {
  console.error('App route snippets missing:\n' + missingApp.join('\n'));
  process.exit(1);
}

const runtimeText = fs.readFileSync(path.join(root, 'src/ar/mindarRuntime.ts'), 'utf8');
const runtimeSnippets = ['MindARThree', 'requesting_camera', 'onTargetFound', 'onTargetLost'];
const missingRuntime = runtimeSnippets.filter((snippet) => !runtimeText.includes(snippet));
if (missingRuntime.length) {
  console.error('MindAR runtime snippets missing:\n' + missingRuntime.join('\n'));
  process.exit(1);
}

const contentText = fs.readFileSync(path.join(root, 'src/content/appContent.ts'), 'utf8');
const contentSnippets = ['products', 'defaultProductId', 'getActiveProduct', 'toProductPath'];
const missingContent = contentSnippets.filter((snippet) => !contentText.includes(snippet));
if (missingContent.length) {
  console.error('Content snippets missing:\n' + missingContent.join('\n'));
  process.exit(1);
}

const scanPageText = fs.readFileSync(path.join(root, 'src/pages/ScanPage.tsx'), 'utf8');
const scanPageSnippets = ['useSearchParams', 'getActiveProduct', 'toProductPath', 'mindTargetUrl'];
const missingScanPage = scanPageSnippets.filter((snippet) => !scanPageText.includes(snippet));
if (missingScanPage.length) {
  console.error('Scan page product-query snippets missing:\n' + missingScanPage.join('\n'));
  process.exit(1);
}

const vercelText = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
if (!vercelText.includes('rewrites')) {
  console.error('vercel.json must include SPA rewrites for route-based flow');
  process.exit(1);
}

console.log('Smoke check passed: multi-product query-based AR flow is present.');
