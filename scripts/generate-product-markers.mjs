import { generateMvpMarker } from './generate-mvp-marker.mjs';

process.stdout.write('Legacy script alias detected. Running single-marker MVP generator.\n');

generateMvpMarker().catch((error) => {
  console.error('Marker generation failed:', error.message);
  process.exitCode = 1;
});
