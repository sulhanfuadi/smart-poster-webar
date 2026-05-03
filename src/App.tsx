import { Navigate, Route, Routes } from 'react-router-dom';
import { IntroPage } from './pages/IntroPage';
import { ScanPage } from './pages/ScanPage';
import { AfterScanPage } from './pages/AfterScanPage';
import { routes } from './content/appContent';

export default function App() {
  return (
    <Routes>
      <Route path={routes.intro} element={<IntroPage />} />
      <Route path={routes.scan} element={<ScanPage />} />
      <Route path={routes.afterScan} element={<AfterScanPage />} />
      <Route path="*" element={<Navigate to={routes.intro} replace />} />
    </Routes>
  );
}
