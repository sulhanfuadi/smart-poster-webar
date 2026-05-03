import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IntroCard } from '../components/IntroCard';
import { getActiveProduct, routes, toProductPath } from '../content/appContent';

function isProbablyMobile() {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');
}

function buildFallbackNotice(reason: 'missing' | 'invalid' | null, requestedProductId: string | null, productName: string) {
  if (reason === 'invalid' && requestedProductId) {
    return `Product "${requestedProductId}" is not found. Using default: ${productName}.`;
  }

  if (reason === 'missing') {
    return `No product selected in URL. Using default: ${productName}.`;
  }

  return null;
}

export function IntroPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resolution = useMemo(() => getActiveProduct(searchParams), [searchParams]);

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl items-center px-3 py-6">
      <IntroCard
        onStart={() => navigate(toProductPath(routes.scan, resolution.productId))}
        isMobile={isProbablyMobile()}
        product={resolution.product}
        fallbackNotice={
          resolution.usedFallback
            ? buildFallbackNotice(resolution.fallbackReason, resolution.requestedProductId, resolution.product.name)
            : null
        }
      />
    </div>
  );
}
