import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ScanSessionProvider } from './state/ScanSessionContext';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScanSessionProvider>
        <App />
      </ScanSessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
