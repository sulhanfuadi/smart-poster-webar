export type ScanStage =
  | 'idle'
  | 'requesting_camera'
  | 'ready'
  | 'searching'
  | 'found'
  | 'lost'
  | 'error'
  | 'preview';

export interface ScanRuntimeState {
  stage: ScanStage;
  cameraGranted: boolean;
  markerLocked: boolean;
  fallbackActive: boolean;
  errorMessage: string | null;
}

export interface ThemeTokens {
  base: string;
  surface: string;
  text: string;
  muted: string;
  stroke: string;
  accent: string;
}
