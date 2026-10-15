import React, { useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App as LegacyApp, CaseImageProvider, pageMetadata as legacyMetadata } from './LegacyPortfolio';
import PortfolioHome from './PortfolioHome';
import Zevian from './figma/Zevian';
import Jayga from './figma/Jayga';
import Purno from './figma/Purno';
import Orderific from './figma/Orderific';
import './portfolio.css';
import './figma/cases.css';
import './figma/purno.css';
import './figma/orderific.css';
import './secondary-pages.css';

const homeMetadata = ['Reza Al Hassan — Product designer and manager', 'I shape B2B products from early research to complete user experiences. Selected work in AI, warehouse operations, design systems and retail.'];
export const pageMetadata = {
  ...legacyMetadata,
  '/': homeMetadata, '/design': homeMetadata, '/product': homeMetadata,
  '/zevian': ['Zevian — Performance investigation case study', 'From AI scoring to evidence-led investigation, with findings, supporting signals and manager control.'],
  '/jayga': ['Jayga — Storage, billing and delivery', 'Product workflows, research and grid rules connecting client, admin and warehouse experiences.'],
  '/purno': ['Purno — Retail POS and owner experience', 'Research, category explorations, checkout, payment flows and owner screens for a connected retail system.'],
  '/orderific': ['Orderific — A shared system for connected apps', 'Components, RTL, themes, collaboration and handoff across a restaurant management platform with six connected apps.'],
  '/archive': ['Archived portfolio — Reza Al Hassan', 'The previous product and design portfolio.'],
  '/archive/design': ['Archived design portfolio — Reza Al Hassan', 'The previous design portfolio homepage.'],
  '/archive/product': ['Archived product portfolio — Reza Al Hassan', 'The previous product portfolio homepage.'],
};
export function App({ initialPath = null }) {
  const path = (initialPath ?? window.location.pathname).replace(/\/$/, '') || '/';
  const metadata = pageMetadata[path];
  useEffect(() => {
    document.body.style.background = metadata && !path.startsWith('/archive') ? '#fafafa' : '';
    if (!metadata) return;
    document.title = metadata[0];
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata[1]);
  }, [path, metadata]);
  if (path === '/archive' || path.startsWith('/archive/')) return <LegacyApp initialPath={path.replace(/^\/archive/, '') || '/'} />;
  if (['/', '/design', '/product'].includes(path)) return <CaseImageProvider><PortfolioHome/></CaseImageProvider>;
  if (path === '/zevian') return <CaseImageProvider><Zevian/></CaseImageProvider>;
  if (path === '/jayga') return <CaseImageProvider><Jayga/></CaseImageProvider>;
  if (path === '/purno') return <CaseImageProvider><Purno/></CaseImageProvider>;
  if (path === '/orderific') return <CaseImageProvider><Orderific/></CaseImageProvider>;
  return <div className="new-portfolio portfolio-secondary"><LegacyApp initialPath={path} modern/></div>;
}
if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const matchesRoute = !container.dataset.route || container.dataset.route === currentPath;
  if (container.hasChildNodes() && matchesRoute) hydrateRoot(container, <App/>);
  else createRoot(container).render(<App/>);
}
