import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProductAction, ProductConfig } from '../types/app';

interface AfterScanCTAProps {
  onRestart: () => void;
  product: ProductConfig;
  scanPath: string;
  fallbackNotice?: string | null;
}

function actionClass(style: ProductAction['style']) {
  if (style === 'primary') {
    return 'bg-apple-accent text-white border border-apple-accent';
  }

  if (style === 'secondary') {
    return 'bg-apple-bg text-apple-text border border-apple-stroke';
  }

  return 'bg-white text-apple-text border border-apple-stroke';
}

export function AfterScanCTA({ onRestart, product, scanPath, fallbackNotice }: AfterScanCTAProps) {
  const initialMedia = product.mediaPreviews[0];
  const [activeMediaId, setActiveMediaId] = useState<string>(initialMedia?.id ?? '2d');

  const activeMedia = useMemo(
    () => product.mediaPreviews.find((preview) => preview.id === activeMediaId) ?? initialMedia,
    [activeMediaId, initialMedia, product.mediaPreviews],
  );

  return (
    <article className="mx-auto w-full max-w-2xl rounded-apple border border-apple-stroke bg-white p-6 shadow-apple">
      {fallbackNotice && (
        <p className="mb-3 rounded-xl border border-amber-200 bg-apple-warningSoft px-3 py-2 text-xs text-amber-800">
          {fallbackNotice}
        </p>
      )}

      <p className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{product.afterScan.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-apple-text">{product.afterScan.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-apple-muted">{product.afterScan.subtitle}</p>

      <section className="mt-6">
        <h2 className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{product.afterScan.actionsHeading}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {product.actions.map((action) => (
            <a
              key={action.id}
              href={action.url}
              target="_blank"
              rel="noreferrer"
              className={`flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium ${actionClass(action.style)}`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </section>

      {activeMedia && (
        <section className="mt-6">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{product.afterScan.mediaHeading}</h2>

          <div className="mt-3 inline-flex rounded-full border border-apple-stroke bg-apple-bg p-1">
            {product.mediaPreviews.map((preview) => (
              <button
                key={preview.id}
                type="button"
                onClick={() => setActiveMediaId(preview.id)}
                className={`h-9 min-w-16 rounded-full px-4 text-sm ${
                  activeMediaId === preview.id ? 'bg-apple-accent text-white' : 'text-apple-text'
                }`}
              >
                {preview.label}
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-apple-stroke bg-apple-bg p-4">
            <h3 className="text-base font-semibold text-apple-text">{activeMedia.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-apple-muted">{activeMedia.description}</p>
            <ul className="mt-3 space-y-2 text-sm text-apple-text">
              {activeMedia.points.map((point) => (
                <li key={point} className="rounded-lg bg-white px-3 py-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          to={scanPath}
          className="flex h-11 items-center justify-center rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {product.afterScan.backToScan}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="h-11 rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {product.afterScan.restart}
        </button>
      </div>
    </article>
  );
}
