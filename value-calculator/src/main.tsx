import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PresentationView } from './components/Embed/PresentationView';
import './index.css';

const params = new URLSearchParams(window.location.search);
const site = params.get('site');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {site ? (
      <PresentationView
        siteId={site}
        theme={params.get('theme') || undefined}
        accent={params.get('accent') || undefined}
      />
    ) : (
      <App />
    )}
  </StrictMode>
);
