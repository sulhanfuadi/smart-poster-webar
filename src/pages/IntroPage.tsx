import { useNavigate } from 'react-router-dom';
import { IntroCard } from '../components/IntroCard';
import { routes } from '../content/appContent';

function isProbablyMobile() {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');
}

export function IntroPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl items-center px-3 py-6">
      <IntroCard onStart={() => navigate(routes.scan)} isMobile={isProbablyMobile()} />
    </div>
  );
}
