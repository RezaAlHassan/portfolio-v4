import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PortfolioHeader, PortfolioFooter } from './PortfolioShared';
import { DraggableMarquee } from './DraggableMarquee';
import { ExpandableImage } from './LegacyPortfolio';

const orderificCards = [
  { id: 1, src: '/Or-C1.png', alt: 'Orderific delivery-zone card in English LTR and Arabic RTL', width: 340, height: 403 },
  { id: 2, src: '/Or-C2.png', alt: 'Orderific form controls for title, time, image upload and dine-in status', width: 340, height: 403 },
  { id: 3, src: '/Or-C3.png', alt: 'Orderific Arabic controls for name, category, image upload and online status', width: 340, height: 403 },
  { id: 4, src: '/Or-C4.png', alt: 'Orderific QR template selector, logo scale slider and action buttons', width: 298, height: 402 },
];

const projectTooltips = {
  Zevian: ['Founder', 'Discovery & Prototyping'],
  Jayga: ['Product Lead', 'Workflows & Interface Design'],
  Orderific: ['Product Designer', 'Design Systems'],
  Purno: ['Product Designer', 'POS Design'],
};

function ProjectTooltip({ name, children }) {
  const labels = projectTooltips[name];
  const [visible, setVisible] = useState(false);
  const [domain, setDomain] = useState(false);
  const state = useRef({ pointer: false, focus: false, open: false, dismissed: false });
  const timer = useRef(null);
  const tooltip = useRef(null);
  const anchor = useRef(null);
  const position = (x, y) => {
    anchor.current = { x, y };
    const pill = tooltip.current;
    if (!pill) return;
    const { width, height } = pill.getBoundingClientRect();
    const left = Math.min(x + 16, window.innerWidth - width - 12);
    const top = y + 16 + height > window.innerHeight - 12 ? y - height - 16 : y + 16;
    pill.style.left = `${Math.max(12, left)}px`;
    pill.style.top = `${Math.max(12, top)}px`;
  };
  useLayoutEffect(() => {
    const pill = tooltip.current;
    const labels = [...pill.children];
    const fitLabel = () => {
      const active = labels[pill.dataset.domain ? 1 : 0];
      const styles = window.getComputedStyle(pill);
      pill.style.width = `${active.getBoundingClientRect().width + parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)}px`;
    };
    fitLabel();
    const observer = new ResizeObserver(entries => {
      if (entries.some(entry => entry.target !== pill)) fitLabel();
      if (anchor.current) position(anchor.current.x, anchor.current.y);
    });
    labels.forEach(label => observer.observe(label));
    observer.observe(pill);
    return () => observer.disconnect();
  }, [domain]);
  const positionForFocus = element => {
    const bounds = element.getBoundingClientRect();
    position(bounds.left, Math.min(bounds.bottom, window.innerHeight) - 64);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const show = () => {
    if (state.current.open || state.current.dismissed) return;
    state.current.open = true;
    setDomain(false);
    setVisible(true);
    timer.current = window.setTimeout(() => { setDomain(true); timer.current = null; }, 1000);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    timer.current = null;
    state.current.open = false;
    setVisible(false);
    setDomain(false);
  };
  const leave = () => {
    if (state.current.pointer || state.current.focus) return;
    state.current.dismissed = false;
    hide();
  };
  return <div className="portfolio-cover-interaction" role="group" aria-label={`${name}: ${labels.join(', ')}`}
    onPointerEnter={event => {
      if (event.pointerType === 'touch') return;
      state.current.pointer = true;
      state.current.dismissed = false;
      position(event.clientX, event.clientY);
      show();
    }}
    onPointerMove={event => {
      if (event.pointerType !== 'touch') position(event.clientX, event.clientY);
    }}
    onPointerLeave={event => {
      state.current.pointer = false;
      if (state.current.focus) positionForFocus(event.currentTarget);
      leave();
    }}
    onFocusCapture={event => {
      // Mouse clicks must not leave a cursor pill behind after the pointer exits.
      state.current.focus = !state.current.pointer;
      if (state.current.focus) positionForFocus(event.currentTarget);
      show();
    }}
    onBlurCapture={event => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      state.current.focus = false;
      leave();
    }}
    onKeyDownCapture={event => {
      if (event.key === 'Escape') { state.current.dismissed = true; hide(); }
    }}>
    {children}
    <div ref={tooltip} className="portfolio-project-tooltip" role="tooltip" aria-hidden={!visible} data-visible={visible || undefined} data-domain={domain || undefined}>
      <span aria-hidden={domain}>{labels[0]}</span>
      <span aria-hidden={!domain}>{labels[1]}</span>
    </div>
  </div>;
}

function ZevianCover() {
  const videoRef = useRef(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (reduced.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    update();
    reduced.addEventListener('change', update);
    return () => reduced.removeEventListener('change', update);
  }, []);
  return <div className="portfolio-cover zevian portfolio-video-cover">
    <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/Full-Zevian.png" aria-hidden="true"
      onPlay={() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) videoRef.current.pause();
      }}>
      <source src="/zevian/demo-loop.mp4" type="video/mp4"/>
    </video>
  </div>;
}

const projects = [
  { name: 'Zevian', description: 'Designed an evidence-led investigation workflow for managers.', metric: '10+ discovery conversations · React prototype', image: '/figma/d8846.png', className: 'zevian', href: '/zevian', alt: 'Zevian review findings and performance evidence' },
  { name: 'Orderific', description: 'Reusable components, RTL and themes for restaurant apps.', metric: '28% less dev time · ½ onboarding time', href: '/orderific' },
  { name: 'Jayga', description: 'Designed grid assignment, storage and billing workflows.', metric: '3× projected revenue · Product lead', image: '/figma/9a696.png', className: 'jayga', href: '/jayga', alt: 'Reza researching storage workflows at the Jayga warehouse' },
  { name: 'Purno', description: 'Designed checkout, local payments and inventory flows.', metric: '$10K seed · 20% faster transactions', image: '/figma/bd6d5.png', className: 'purno', href: '/purno', alt: 'Purno point of sale payment screen' },
];

export default function PortfolioHome() {
  return <div className="new-portfolio">
    <PortfolioHeader/>
    <main className="portfolio-width portfolio-home" id="work">
      <div className="portfolio-intro">
        <h1>Product designer for B2B and AI products</h1>
        <p>I turn complex workflows into clear interfaces, reusable systems and working prototypes.</p>
      </div>
      <section className="portfolio-projects" aria-label="Selected projects">
        {projects.map(project => <article className="portfolio-project" key={project.name}>
          <ProjectTooltip name={project.name}>
          {project.name === 'Zevian' ? <ZevianCover/> : project.name === 'Orderific' ? <div className="portfolio-cover orderific">
            <DraggableMarquee items={orderificCards} speed={1} renderItem={(item, { duplicate }) => <ExpandableImage src={item.src} alt={item.alt} tabIndex={duplicate ? -1 : undefined}/>}/>
          </div> : <div className={`portfolio-cover ${project.className || ''}`}>
            {project.image && <img src={project.image} alt={project.alt} loading={project.name === 'Zevian' || project.name === 'Jayga' ? 'eager' : 'lazy'}/>}
          </div>}
          <div className="portfolio-project-copy">
            <h2><a className="portfolio-project-link" href={project.href}>{project.name}</a></h2>
            <p>{project.description}</p><p className="project-metric">{project.metric}</p>
          </div>
          </ProjectTooltip>
        </article>)}
      </section>
      <section className="portfolio-more" aria-labelledby="other-work-title">
        <h2 id="other-work-title">Other work</h2>
        <a className="portfolio-work-row" href="/zevian-hrms">
          <h3>Zevian HRMS <span>— Interface system</span></h3>
          <p className="portfolio-work-keywords">HR tools · Design systems · Prototyping</p>
          <p className="portfolio-work-proof">25k+ views on Dribbble</p>
          <img src="/figma/13a84.svg" alt="" width="20" height="20"/>
        </a>
        <a className="portfolio-work-row" href="/ai-workflows">
          <h3>AI workflows <span>— Design and build</span></h3>
          <p className="portfolio-work-keywords">Research · Prototyping · Development</p>
          <p className="portfolio-work-proof">SQL · Supabase · Automations</p>
          <img src="/figma/13a84.svg" alt="" width="20" height="20"/>
        </a>
      </section>
      <PortfolioFooter contained/>
    </main>
  </div>;
}
