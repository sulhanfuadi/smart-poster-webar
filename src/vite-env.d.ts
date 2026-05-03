/// <reference types="vite/client" />

declare global {
  interface Window {
    MINDAR?: {
      IMAGE?: {
        MindARThree: new (options: {
          container: HTMLElement;
          imageTargetSrc: string;
          uiScanning?: 'yes' | 'no';
          uiLoading?: 'yes' | 'no';
          maxTrack?: number;
        }) => {
          renderer: import('three').WebGLRenderer;
          scene: import('three').Scene;
          camera: import('three').Camera;
          addAnchor: (index: number) => {
            group: import('three').Group;
            onTargetFound?: () => void;
            onTargetLost?: () => void;
          };
          start: () => Promise<void>;
          stop: () => void;
        };
      };
    };
  }
}

export {};
