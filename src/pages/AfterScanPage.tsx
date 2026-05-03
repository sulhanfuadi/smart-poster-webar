import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AfterScanCTA } from '../components/AfterScanCTA';
import { getActiveProduct, routes, toProductPath } from '../content/appContent';
import { useScanSession } from '../state/ScanSessionContext';

function buildFallbackNotice(reason: 'missing' | 'invalid' | null, requestedProductId: string | null, productName: string) {
  if (reason === 'invalid' && requestedProductId) {
    return `Product "${requestedProductId}" is not found. Using default: ${productName}.`;
  }

  if (reason === 'missing') {
    return `No product selected in URL. Using default: ${productName}.`;
  }

  return null;
}

export function AfterScanPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetRuntime } = useScanSession();

  const resolution = useMemo(() => getActiveProduct(searchParams), [searchParams]);

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl items-center px-3 py-6">
      <AfterScanCTA
        product={resolution.product}
        scanPath={toProductPath(routes.scan, resolution.productId)}
        fallbackNotice={
          resolution.usedFallback
            ? buildFallbackNotice(resolution.fallbackReason, resolution.requestedProductId, resolution.product.name)
            : null
        }
        onRestart={() => {
          resetRuntime();
          navigate(toProductPath(routes.intro, resolution.productId));
        }}
      />
    </div>
  );
}
