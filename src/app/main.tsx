import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { AppProviders } from '@/app/providers';

async function prepare() {
  if (import.meta.env.VITE_API_MOCKING === 'true') {
    const { worker } = await import('../mocks/browser');
    return worker.start();
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  );
});