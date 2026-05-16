import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { createCanvas, loadImage } from 'canvas';
import { OfflineCompiler } from '@zenith-xperience/mindar-offline-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const markerDir = path.resolve(projectRoot, 'public/assets/markers/mvp/macbook-air');
const referencePath = path.join(markerDir, 'reference.png');
const targetMindPath = path.join(markerDir, 'target.mind');

const sourceCandidates = [
  process.env.MVP_MARKER_SOURCE,
  path.resolve(projectRoot, '../resources/products/macbook-air-poster.png'),
  referencePath,
].filter((value) => typeof value === 'string' && value.trim().length > 0);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSourcePath() {
  for (const candidate of sourceCandidates) {
    const resolvedPath = path.resolve(candidate.trim());
    if (await exists(resolvedPath)) {
      return resolvedPath;
    }
  }

  throw new Error(
    `Source marker image not found. Tried:\n${sourceCandidates
      .map((candidate) => `- ${path.resolve(candidate.trim())}`)
      .join('\n')}`,
  );
}

function toCanvas(image) {
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);
  return canvas;
}

export async function generateMvpMarker() {
  await fs.mkdir(markerDir, { recursive: true });

  const sourcePath = await resolveSourcePath();
  const resolvedSource = path.resolve(sourcePath);
  const resolvedReference = path.resolve(referencePath);

  if (resolvedSource !== resolvedReference) {
    await fs.copyFile(resolvedSource, referencePath);
    process.stdout.write(`Copied marker reference from ${resolvedSource}\n`);
  } else {
    process.stdout.write(`Using existing marker reference at ${resolvedReference}\n`);
  }

  const image = await loadImage(referencePath);
  const markerCanvas = toCanvas(image);

  const compiler = new OfflineCompiler();
  process.stdout.write('Compiling single-image MVP marker target...\n');
  await compiler.compileImageTargets([markerCanvas], () => {});

  const mindData = compiler.exportData();
  await fs.writeFile(targetMindPath, Buffer.from(mindData));

  const referenceStats = await fs.stat(referencePath);
  const targetStats = await fs.stat(targetMindPath);

  process.stdout.write(`Reference ready: ${referencePath} (${referenceStats.size} bytes)\n`);
  process.stdout.write(`Target ready: ${targetMindPath} (${targetStats.size} bytes)\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  generateMvpMarker().catch((error) => {
    console.error('MVP marker generation failed:', error.message);
    process.exitCode = 1;
  });
}
