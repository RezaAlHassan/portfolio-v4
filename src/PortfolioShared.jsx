import React, { useLayoutEffect, useRef, useState } from 'react';

export function PortfolioHeader() {
  return <header className="portfolio-header portfolio-width">
    <a className="portfolio-wordmark" href="/">Reza A.</a>
    <nav aria-label="Main navigation">
      <a href="/#work">Work</a><a href="/about">About</a>
      <a href="mailto:rezahasan1198@gmail.com">Contact</a><a href="/ai-workflows">AI Workflows</a>
    </nav>
  </header>;
}

export function NextProject({ name, href }) {
  return <a className="next-project-link" href={href}>
    <span>Next project · {name}</span>
    <span className="next-project-arrow" aria-hidden="true">→</span>
  </a>;
}

export function PortfolioFooter({ contained = false }) {
  return <footer className={`portfolio-footer${contained ? '' : ' portfolio-width'}`}>
    <div className="portfolio-identity"><span>Reza Al Hasan</span><div className="portfolio-socials">
      <a href="mailto:rezahasan1198@gmail.com" aria-label="Email Reza"><img src="/figma/6ab84.svg" alt="" width="24" height="24"/></a>
      <a href="https://github.com/RezaAlHassan" target="_blank" rel="noreferrer" aria-label="GitHub"><img src="/figma/71f48.svg" alt="" width="24" height="24"/></a>
      <a href="https://www.linkedin.com/in/reza1198/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="/figma/47de7.svg" alt="" width="24" height="24"/></a>
    </div></div><span className="portfolio-location">Based in Dhaka</span>
  </footer>;
}

// Keep the supplied diagram topology and image crops while fitting small screens.
export function ResponsiveArtifact({ width, height, children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    setScale(Math.min(1, ref.current.clientWidth / width));
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [width]);
  return <div ref={ref} className="responsive-artifact" style={{ width, aspectRatio: `${width} / ${height}` }}>
    <div className="responsive-artifact-inner" style={{ width, height, transform: `scale(${scale})` }}>{children}</div>
  </div>;
}
