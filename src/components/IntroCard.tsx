import { useState } from 'react';
import { viewCopy, scanTarget } from '../content/appContent';

export function IntroCard({ onStart, isMobile }: { onStart: () => void; isMobile: boolean }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <article className="mx-auto w-full max-w-xl rounded-apple border border-apple-stroke bg-apple-surface p-6 text-center shadow-apple">
      <p className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{viewCopy.intro.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-apple-text">{viewCopy.intro.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-apple-muted">{viewCopy.intro.subtitle}</p>

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={onStart}
          className="h-12 rounded-full bg-apple-accent px-5 text-sm font-medium text-white"
        >
          {viewCopy.intro.primaryCta}
        </button>
        <button
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className="h-11 rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {viewCopy.intro.helperLabel}
        </button>
      </div>

      {showHelp && <p className="mt-3 text-sm leading-relaxed text-apple-muted">{viewCopy.intro.helperBody}</p>}

      <p className="mt-3 text-sm text-apple-muted">{isMobile ? viewCopy.intro.helperBody : viewCopy.intro.desktopHint}</p>
      <a
        className="mt-2 inline-block text-xs text-apple-accent underline"
        href={scanTarget.referenceImage}
        target="_blank"
        rel="noreferrer"
      >
        Open default MindAR marker reference
      </a>
    </article>
  );
}
