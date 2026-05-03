import { Link } from 'react-router-dom';
import type { ProductConfig } from '../types/app';

interface AfterScanCTAProps {
  onRestart: () => void;
  product: ProductConfig;
  scanPath: string;
  fallbackNotice?: string | null;
}

export function AfterScanCTA({ onRestart, product, scanPath, fallbackNotice }: AfterScanCTAProps) {
  return (
    <article className="mx-auto w-full max-w-xl rounded-apple border border-apple-stroke bg-white p-6 shadow-apple">
      {fallbackNotice && (
        <p className="mb-3 rounded-xl border border-amber-200 bg-apple-warningSoft px-3 py-2 text-xs text-amber-800">
          {fallbackNotice}
        </p>
      )}

      <p className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{product.afterScan.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-apple-text">{product.afterScan.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-apple-muted">{product.afterScan.subtitle}</p>

      <div className="mt-6 grid gap-3">
        <a
          href={product.offerCTA.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-12 items-center justify-center rounded-full bg-apple-accent px-5 text-sm font-medium text-white"
        >
          {product.offerCTA.label}
        </a>
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
