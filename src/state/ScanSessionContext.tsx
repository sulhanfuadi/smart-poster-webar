import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ScanRuntimeState, ScanStage } from '../types/app';

interface ScanSessionContextValue {
  runtime: ScanRuntimeState;
  setStage: (stage: ScanStage) => void;
  setCameraGranted: (granted: boolean) => void;
  setMarkerLocked: (locked: boolean) => void;
  setFallbackActive: (active: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  resetRuntime: () => void;
}

const initialRuntime: ScanRuntimeState = {
  stage: 'idle',
  cameraGranted: false,
  markerLocked: false,
  fallbackActive: false,
  errorMessage: null,
};

const ScanSessionContext = createContext<ScanSessionContextValue | null>(null);

export function ScanSessionProvider({ children }: { children: ReactNode }) {
  const [runtime, setRuntime] = useState<ScanRuntimeState>(initialRuntime);

  const value = useMemo<ScanSessionContextValue>(
    () => ({
      runtime,
      setStage: (stage) => setRuntime((prev) => ({ ...prev, stage })),
      setCameraGranted: (cameraGranted) => setRuntime((prev) => ({ ...prev, cameraGranted })),
      setMarkerLocked: (markerLocked) => setRuntime((prev) => ({ ...prev, markerLocked })),
      setFallbackActive: (fallbackActive) => setRuntime((prev) => ({ ...prev, fallbackActive })),
      setErrorMessage: (errorMessage) => setRuntime((prev) => ({ ...prev, errorMessage })),
      resetRuntime: () => setRuntime(initialRuntime),
    }),
    [runtime],
  );

  return <ScanSessionContext.Provider value={value}>{children}</ScanSessionContext.Provider>;
}

export function useScanSession() {
  const context = useContext(ScanSessionContext);
  if (!context) {
    throw new Error('useScanSession must be used within ScanSessionProvider');
  }
  return context;
}
