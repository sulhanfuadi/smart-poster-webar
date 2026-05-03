import { Link } from 'react-router-dom';
import { offerCTA, routes, viewCopy } from '../content/appContent';

export function AfterScanCTA({ onRestart }: { onRestart: () => void }) {
  return (
    <article className="mx-auto w-full max-w-xl rounded-apple border border-apple-stroke bg-white p-6 shadow-apple">
      <p className="text-[11px] uppercase tracking-[0.12em] text-apple-muted">{viewCopy.afterScan.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-apple-text">{viewCopy.afterScan.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-apple-muted">{viewCopy.afterScan.subtitle}</p>

      <div className="mt-6 grid gap-3">
        <a
          href={offerCTA.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-12 items-center justify-center rounded-full bg-apple-accent px-5 text-sm font-medium text-white"
        >
          {offerCTA.label}
        </a>
        <Link
          to={routes.scan}
          className="flex h-11 items-center justify-center rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {viewCopy.afterScan.backToScan}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="h-11 rounded-full border border-apple-stroke bg-apple-bg px-5 text-sm text-apple-text"
        >
          {viewCopy.afterScan.restart}
        </button>
      </div>
    </article>
  );
}
