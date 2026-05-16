import { useNavigate } from 'react-router-dom';
import { AfterScanCTA } from '../components/AfterScanCTA';
import { mvpProduct, routes } from '../content/appContent';
import { useScanSession } from '../state/ScanSessionContext';

export function AfterScanPage() {
  const navigate = useNavigate();
  const { resetRuntime } = useScanSession();

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl items-center px-3 py-6">
      <AfterScanCTA
        product={mvpProduct}
        scanPath={routes.scan}
        onRestart={() => {
          resetRuntime();
          navigate(routes.intro);
        }}
      />
    </div>
  );
}
