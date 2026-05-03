import { runtimeMessages, operatorGuidance, viewCopy } from '../content/appContent';
import type { ScanRuntimeState } from '../types/app';
import { RuntimePills } from './RuntimePills';

export function ScanHUD({ runtime, isMobile }: { runtime: ScanRuntimeState; isMobile: boolean }) {
  const message = runtimeMessages[runtime.stage] ?? runtimeMessages.idle;

  return (
    <div className="pointer-events-none absolute left-3 right-3 top-3 z-30 space-y-2">
      <div className="pointer-events-auto rounded-2xl border border-apple-stroke bg-white/92 p-3 shadow-apple backdrop-blur">
        <p className="text-[11px] uppercase tracking-[0.11em] text-apple-muted">Scan Status</p>
        <h2 className="mt-1 text-base font-semibold text-apple-text">{message}</h2>
        <p className="mt-1 text-sm leading-relaxed text-apple-muted">
          {runtime.stage === 'lost' ? operatorGuidance.markerLost : operatorGuidance.markerSlow}
        </p>
        <RuntimePills runtime={runtime} />
      </div>

      {!isMobile && (
        <div className="pointer-events-auto rounded-2xl border border-red-200 bg-apple-dangerSoft p-3 text-sm text-red-700">
          {viewCopy.intro.desktopHint}
        </div>
      )}
    </div>
  );
}
