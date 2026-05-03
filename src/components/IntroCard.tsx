import { useState } from 'react';
import type { ProductConfig } from '../types/app';

interface IntroCardProps {
  onStart: () => void;
  isMobile: boolean;
  product: ProductConfig;
  fallbackNotice?: string | null;
}

export function IntroCard({ onStart, isMobile, product, fallbackNotice }: IntroCardProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <article className="mx-auto w-full max-w-xl rounded-apple border border-apple-stroke bg-apple-surface p-6 text-center shadow-apple">
      {fallbackNotice && (
        <p className="mb-3 rounded-xl border border-amber-200 bg-apple-warningSoft px-3 py-2 text-xs text-amber-800">
          {fallbackNotice}
        </p>
      )}

      <p className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{product.intro.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-apple-text">{product.intro.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-apple-muted">{product.intro.subtitle}</p>

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={onStart}
          className="h-12 rounded-full bg-apple-accent px-5 text-sm font-medium text-white"
        >
          {product.intro.primaryCta}
        </button>
        <button
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className="h-11 rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {product.intro.helperLabel}
        </button>
      </div>

      {showHelp && <p className="mt-3 text-sm leading-relaxed text-apple-muted">{product.intro.helperBody}</p>}

      <p className="mt-3 text-sm text-apple-muted">{isMobile ? product.intro.helperBody : product.intro.desktopHint}</p>
      <a
        className="mt-2 inline-block text-xs text-apple-accent underline"
        href={product.scanTarget.referenceImageUrl}
        target="_blank"
        rel="noreferrer"
      >
        {product.intro.referenceLabel}
      </a>
    </article>
  );
}
