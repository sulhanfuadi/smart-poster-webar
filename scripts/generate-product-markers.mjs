import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { createCanvas, loadImage } from 'canvas';
import { OfflineCompiler } from '@zenith-xperience/mindar-offline-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const primarySourceRoot = path.resolve(projectRoot, 'public/assets/products/source');
const legacySourceRoot = path.resolve(projectRoot, '../resources/products');
const targetRoot = path.resolve(projectRoot, 'public/assets/markers/products');

const productSources = {
  'apple-iphone': { filename: 'iphone.png', title: 'iPhone', accent: '#2563eb' },
  'apple-macbook': { filename: 'macbook.png', title: 'MacBook', accent: '#7c3aed' },
  'apple-airpods': { filename: 'airpods.png', title: 'AirPods', accent: '#059669' },
  'apple-ipad': { filename: 'ipad.png', title: 'iPad', accent: '#ea580c' },
  'apple-watch': { filename: 'apple-watch.png', title: 'Apple Watch', accent: '#dc2626' },
};

function getSeed(productId) {
  return productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function drawCornerPattern(ctx, x, y, size, seed) {
  const cell = Math.floor(size / 5);
  const matrix = [
    [1, 1, 1, 1, 1],
    [1, 0, (seed + 1) % 2, 0, 1],
    [1, (seed + 2) % 2, 1, (seed + 3) % 2, 1],
    [1, 0, (seed + 4) % 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];

  ctx.fillStyle = '#111111';
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      if (matrix[row][col]) {
        ctx.fillRect(x + col * cell, y + row * cell, cell, cell);
      }
    }
  }
}

function drawTexture(ctx, width, height, seed) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 1;

  const step = 24;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
  for (let index = 0; index < 36; index += 1) {
    const x = ((index * 71 + seed * 13) % (width - 40)) + 20;
    const y = ((index * 53 + seed * 17) % (height - 40)) + 20;
    const radius = ((index + seed) % 4) + 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function createMarkerCanvas(productId, productTitle, accentColor, productImage) {
  const width = 1080;
  const height = 1560;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const seed = getSeed(productId);

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, width, height);

  drawTexture(ctx, width, height, seed);

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 18;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 8;
  ctx.strokeRect(56, 56, width - 112, height - 112);

  const cornerSize = 130;
  drawCornerPattern(ctx, 76, 76, cornerSize, seed);
  drawCornerPattern(ctx, width - 76 - cornerSize, 76, cornerSize, seed + 1);
  drawCornerPattern(ctx, 76, height - 76 - cornerSize, cornerSize, seed + 2);
  drawCornerPattern(ctx, width - 76 - cornerSize, height - 76 - cornerSize, cornerSize, seed + 3);

  ctx.fillStyle = '#111827';
  ctx.textAlign = 'center';
  ctx.font = '700 66px Arial';
  ctx.fillText(productTitle, width / 2, 190);

  ctx.fillStyle = '#374151';
  ctx.font = '400 34px Arial';
  ctx.fillText('AR-Enhanced WebAR Marker', width / 2, 240);

  const frameX = 130;
  const frameY = 300;
  const frameWidth = width - frameX * 2;
  const frameHeight = 940;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(frameX, frameY, frameWidth, frameHeight);

  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 5;
  ctx.strokeRect(frameX, frameY, frameWidth, frameHeight);

  const maxImageWidth = frameWidth - 90;
  const maxImageHeight = frameHeight - 90;
  const scale = Math.min(maxImageWidth / productImage.width, maxImageHeight / productImage.height);
  const renderWidth = productImage.width * scale;
  const renderHeight = productImage.height * scale;
  const renderX = frameX + (frameWidth - renderWidth) / 2;
  const renderY = frameY + (frameHeight - renderHeight) / 2;

  ctx.drawImage(productImage, renderX, renderY, renderWidth, renderHeight);

  ctx.fillStyle = accentColor;
  ctx.fillRect(120, height - 220, width - 240, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 38px Arial';
  ctx.fillText(`Scan Marker • ${productTitle}`, width / 2, height - 162);

  ctx.fillStyle = '#4b5563';
  ctx.font = '400 26px Arial';
  ctx.fillText(`ID: ${productId}`, width / 2, height - 112);

  return canvas;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSourceRoot() {
  const hasPrimary = await exists(primarySourceRoot);
  if (hasPrimary) {
    return primarySourceRoot;
  }

  const hasLegacy = await exists(legacySourceRoot);
  if (hasLegacy) {
    process.stdout.write(`Fallback source root detected: ${legacySourceRoot}\n`);
    return legacySourceRoot;
  }

  throw new Error(
    `No source image folder found. Expected at ${primarySourceRoot} (preferred) or ${legacySourceRoot} (legacy).`
  );
}

async function ensureFile(filePath) {
  if (!(await exists(filePath))) {
    throw new Error(`Missing file: ${filePath}`);
  }
}

async function generateProductTarget(sourceRoot, productId, config) {
  const sourceImagePath = path.join(sourceRoot, config.filename);
  const productDir = path.join(targetRoot, productId);
  const targetMindPath = path.join(productDir, 'target.mind');
  const referencePath = path.join(productDir, 'reference.png');

  await ensureFile(sourceImagePath);
  await fs.mkdir(productDir, { recursive: true });

  const sourceImage = await loadImage(sourceImagePath);
  const markerCanvas = createMarkerCanvas(productId, config.title, config.accent, sourceImage);
  const compiler = new OfflineCompiler();

  process.stdout.write(`Compiling ${productId}...\n`);
  await compiler.compileImageTargets([markerCanvas], () => {});
  const mindData = compiler.exportData();

  await fs.writeFile(targetMindPath, Buffer.from(mindData));
  await fs.writeFile(referencePath, markerCanvas.toBuffer('image/png'));

  const stats = await fs.stat(targetMindPath);
  process.stdout.write(`Done ${productId}: ${stats.size} bytes -> ${targetMindPath}\n`);
}

async function main() {
  const sourceRoot = await resolveSourceRoot();

  process.stdout.write(`Source root: ${sourceRoot}\n`);
  process.stdout.write(`Target root: ${targetRoot}\n\n`);

  for (const [productId, config] of Object.entries(productSources)) {
    await generateProductTarget(sourceRoot, productId, config);
  }

  process.stdout.write('\nAll product markers generated successfully.\n');
}

main().catch((error) => {
  console.error('Marker generation failed:', error.message);
  process.exitCode = 1;
});
