import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function PortfolioHeader() {
  return <header className="portfolio-header portfolio-width">
    <a className="portfolio-wordmark" href="/">Reza A.</a>
    <nav aria-label="Main navigation">
      <a href="/#work">Work</a><a href="/about">About</a>
      <a href="mailto:rezahasan1198@gmail.com">Contact</a>
    </nav>
  </header>;
}

export function CaseDecisionNav({ items }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const reached = items.filter(item => {
        const target = document.getElementById(item.href.slice(1));
        return target && target.getBoundingClientRect().top <= 160;
      });
      setActive(reached.at(-1)?.href || '');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items]);
  return <nav className="case-decision-nav" aria-label="Key design decisions">
    <ul>{items.map(({ href, label }) => <li key={href}><a href={href} aria-current={active === href ? 'location' : undefined}>{label}</a></li>)}</ul>
  </nav>;
}

export function CaseStudyLayout({ items, children }) {
  return <div className="portfolio-width case-study-layout">
    <CaseDecisionNav items={items}/>
    <div className="case-study-content">{children}</div>
  </div>;
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
    </div></div><span className="portfolio-location">Dhaka</span>
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
