import type { ScanRuntimeState } from '../types/app';

function pillTone(value: boolean, warning = false) {
  if (value) return 'bg-apple-successSoft text-green-800 border-green-300';
  if (warning) return 'bg-apple-warningSoft text-amber-800 border-amber-300';
  return 'bg-white text-apple-text border-apple-stroke';
}

export function RuntimePills({ runtime }: { runtime: ScanRuntimeState }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <span className={`rounded-full border px-3 py-1 text-xs ${pillTone(runtime.cameraGranted, true)}`}>
        Camera {runtime.cameraGranted ? 'granted' : 'pending'}
      </span>
      <span className={`rounded-full border px-3 py-1 text-xs ${pillTone(runtime.markerLocked, true)}`}>
        Marker {runtime.markerLocked ? 'locked' : 'searching'}
      </span>
      <span className={`rounded-full border px-3 py-1 text-xs ${pillTone(!runtime.fallbackActive)}`}>
        Fallback {runtime.fallbackActive ? 'on' : 'off'}
      </span>
      <span className="rounded-full border border-apple-stroke bg-white px-3 py-1 text-xs text-apple-text">
        Stage {runtime.stage}
      </span>
    </div>
  );
}
