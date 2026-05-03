import { useMemo, useState } from 'react';
import { hotspots } from '../content/appContent';

export function FeatureHotspots() {
  const [activeId, setActiveId] = useState<(typeof hotspots)[number]['id']>(hotspots[0].id);

  const active = useMemo(() => hotspots.find((h) => h.id === activeId) ?? hotspots[0], [activeId]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-20">
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            onClick={() => setActiveId(hotspot.id)}
            className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs backdrop-blur ${
              activeId === hotspot.id
                ? 'border-blue-500 bg-apple-accent text-white'
                : 'border-apple-stroke bg-white/90 text-apple-text'
            }`}
            style={{ left: `${50 + hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-label={`Show ${hotspot.label} details`}
          >
            {hotspot.label}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute left-3 right-3 top-[13.6rem] z-30">
        <div className="pointer-events-auto rounded-2xl border border-apple-stroke bg-white/92 p-3 shadow-apple backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.11em] text-apple-muted">Feature Focus</p>
          <h3 className="mt-1 text-base font-semibold text-apple-text">{active.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-apple-muted">{active.summary}</p>
        </div>
      </div>
    </>
  );
}
