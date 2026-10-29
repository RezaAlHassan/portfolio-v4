import React, { useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400-italic.css';
import { ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react';
import '@radix-ui/themes/styles.css';
import './styles.css';
import './ZevianCase.css';
import { ContactButton } from './ContactButton';
import { EvidenceGrid, ComparisonGrid, EvidenceTicker } from './CaseLayouts';
import { Particles } from './Particles';
import { DraggableMarquee } from './DraggableMarquee';
import { PortfolioHeader, PortfolioFooter } from './PortfolioShared';

const PortfolioDesignContext = React.createContext(false);

const projects = [
  {
    title: 'Orderific',
    description: 'Design systems and handoff rules for six connected restaurant apps.',
    metric: '28% less dev time · ½ onboarding time',
    tags: ['Design systems', 'Design tokens', 'Variables', 'RTL/LTR'],
    year: '2025–26',
    visual: 'rtl',
    url: '/orderific',
  },
  {
    title: 'Jayga',
    description: 'Warehouse interfaces for storage, billing and delivery.',
    metric: '~3× projected revenue/m² · led 4 engineers',
    tags: ['Complex workflows', 'Operational tools', 'Systems thinking', 'Field research'],
    year: 'Nov 2023–Aug 2025',
    visual: 'pipeline',
    url: '/jayga',
  },
  {
    title: 'Purno',
    description: 'Retail POS for payments and inventory.',
    metric: '$10K seed · cross-platform POS',
    tags: ['Fintech', 'Multi-platform', 'Prototyping', 'Interface design'],
    year: '2024',
    visual: 'pos',
    url: '/purno',
  },
];

const pageMetadata = {
  '/product': ['Reza Al Hassan — Product manager portfolio', 'Product management work across Jayga, Zevian, Orderific and Purno, led with a design approach.'],
  '/design': ['Reza Al Hassan — Product design portfolio', 'Product design work across B2B software, AI workflows, retail and warehouse operations.'],
  '/product/jayga': ['Jayga — Product case study', 'Product decisions, research, service journeys and storage rules from Jayga, November 2023 to August 2025.'],
  '/product/zevian': ['Zevian — Product case study', 'Discovery and decisions behind a sales performance investigation prototype.'],
  '/product/purno': ['Purno — Product case study', 'Product scope and design decisions behind a retail POS and owner app.'],
  '/product/orderific': ['Orderific — Product and design systems case study', 'Design systems, documented naming rules and handoff across six responsive restaurant apps. BMS also supports LTR, RTL, light and dark modes.'],
  '/': ['Reza Al Hassan — Product and design portfolios', 'Choose the product or design portfolio of Reza Al Hassan.'],
  '/zevian': ['Zevian — Performance investigation case study', 'How Zevian helps sales managers detect performance changes, add context and decide what needs action.'],
  '/zevian-hrms': ['Zevian HRMS — Interface system case study', 'An early HRMS concept and reusable interface system covering attendance, employee records, calendars, approvals and work policies.'],
  '/orderific': ['Orderific — Design system case study', 'Design systems and handoff rules across six responsive restaurant apps, with BMS examples in LTR, RTL, light and dark modes.'],
  '/purno': ['Purno — POS product case study', 'A point-of-sale system connecting shop sales, inventory, payments and daily retail operations.'],
  '/jayga': ['Jayga — Warehouse operations case study', 'A warehouse order system connecting storage, pricing, billing and fulfilment.'],
  '/portfolio': ['Portfolio redesign — Reza Al Hassan', 'How this portfolio moved from moodboards and section studies into one clear editorial design system.'],
  '/ai-workflows': ['AI workflows — Reza Al Hassan', 'How Reza uses AI for research synthesis, prototyping, production code and product exploration while keeping people in control.'],
  '/about': ['About Reza Al Hassan', 'Product designer and founder in Dhaka working on B2B systems, AI workflows and clarity-critical products.'],
  '/sprint': ['2-week product design sprint — Reza Al Hassan', 'A focused two-week design sprint for complex B2B SaaS, AI and operational product workflows. From problem framing to states and engineering handoff.'],
};

const sprintEmail = 'mailto:rezahasan1198@gmail.com?subject=Product%20design%20sprint&body=Hi%20Reza%2C%0A%0AThe%20workflow%20we%20need%20help%20with%20is%3A%20';

const orderificCards = [
  { id: 1, src: '/Or-C1.png', alt: 'Orderific delivery-zone card in English LTR and Arabic RTL', width: 340, height: 403 },
  { id: 2, src: '/Or-C2.png', alt: 'Orderific form controls for title, time, image upload and dine-in status', width: 340, height: 403 },
  { id: 3, src: '/Or-C3.png', alt: 'Orderific Arabic form controls for name, category, image upload and online status', width: 340, height: 403 },
  { id: 4, src: '/Or-C4.png', alt: 'Orderific QR template selector, logo scale slider and action buttons', width: 298, height: 402 },
];

const ImageModalContext = React.createContext(null);

function CaseImageProvider({ children }) {
  const [activeImage, setActiveImage] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!activeImage) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === 'Escape' && setActiveImage(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      previousFocus?.focus?.();
    };
  }, [activeImage]);

  return <ImageModalContext.Provider value={setActiveImage}>
    {children}
    {activeImage && <div className="image-modal" role="dialog" aria-modal="true" aria-label="Full-resolution image viewer" onMouseDown={(event) => event.target === event.currentTarget && setActiveImage(null)}>
      <button ref={closeButtonRef} className="modal-close image-modal-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close full-resolution image"><X/></button>
      <figure className="image-modal-figure">
        <img src={activeImage.src} alt={activeImage.alt}/>
        {activeImage.caption && <figcaption>{activeImage.caption}</figcaption>}
      </figure>
    </div>}
  </ImageModalContext.Provider>;
}

function ExpandableImage({ src, alt, caption = '', loading = 'lazy', decoding = 'async', className = '', imageClassName = '', tabIndex }) {
  const openImage = React.useContext(ImageModalContext);
  return <button className={`image-expand-trigger ${className}`} type="button" tabIndex={tabIndex} onClick={() => openImage({ src, alt, caption })} aria-label={`Expand image: ${alt}`}>
    <img className={imageClassName} src={src} alt={alt} loading={loading} decoding={decoding}/>
  </button>;
}

function Mark({ home = false }) {
  return <a className="mark" href={home ? '/' : '#top'} aria-label={home ? 'Back to home' : 'Back to top'}><span>REZA A</span><i aria-hidden="true" /></a>;
}

function Nav({ caseStudy = false, aboutPage = false, sprintPage = false, portfolio = 'design', processHref = '#process', originalCase = false }) {
  const modern = React.useContext(PortfolioDesignContext);
  const [open, setOpen] = useState(false);
  const portfolioHome = !caseStudy && !aboutPage && !sprintPage;
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  if (modern) return <PortfolioHeader/>;
  return (
    <header className={`nav-shell ${portfolioHome || (caseStudy && !originalCase) ? 'nav-shell--portfolio' : ''}`}>
      <nav className="nav" aria-label="Main navigation">
        <Mark home={caseStudy || aboutPage || sprintPage} />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-menu" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        <div id="main-menu" className={`nav-links ${open ? 'open' : ''}`}>
          {caseStudy && <a href={`/${portfolio}`} onClick={() => setOpen(false)}><ArrowLeft className="nav-back-icon"/> All work</a>}
          {aboutPage && <a href="/design" onClick={() => setOpen(false)}><ArrowLeft className="nav-back-icon"/> All work</a>}
          {sprintPage && <a href="/design" onClick={() => setOpen(false)}><ArrowLeft className="nav-back-icon"/> Portfolio</a>}
          {!caseStudy && !aboutPage && !sprintPage && <a href="#work" onClick={() => setOpen(false)}>Work</a>}
          {!sprintPage && !portfolioHome && (!caseStudy || originalCase) && <a href={portfolio === 'product' ? '/design' : '/product'} onClick={() => setOpen(false)}>{portfolio === 'product' ? 'Design' : 'Product'}</a>}
          {!sprintPage && !portfolioHome && (!caseStudy || originalCase) && <a href="/ai-workflows" onClick={() => setOpen(false)}>AI workflows</a>}
          {caseStudy && originalCase && <a href={processHref} onClick={() => setOpen(false)}>Process</a>}
          {caseStudy && originalCase && <a href="#outcome" onClick={() => setOpen(false)}>Outcome</a>}
          {sprintPage ? <a href="#proof" onClick={() => setOpen(false)}>Proof</a> : aboutPage ? <a href="#interests" onClick={() => setOpen(false)}>Interests</a> : <a href="/about" onClick={() => setOpen(false)}>About</a>}
          {sprintPage || originalCase ? <a className="nav-cta" href={sprintPage ? sprintEmail : 'mailto:rezahasan1198@gmail.com'}>{sprintPage ? 'Discuss a sprint' : 'Let’s talk'} <ArrowUpRight/></a> : <ContactButton/>}
          {portfolioHome && <div className="nav-secondary"><a href={portfolio === 'product' ? '/design' : '/product'} onClick={() => setOpen(false)}>{portfolio === 'product' ? 'Design view' : 'Product view'}</a><a href="/ai-workflows" onClick={() => setOpen(false)}>AI workflows</a></div>}
          {caseStudy && !originalCase && <div className="nav-secondary"><a href={processHref} onClick={() => setOpen(false)}>Process</a><a href="#outcome" onClick={() => setOpen(false)}>Outcome</a></div>}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero hero--particles hero--quiet" id="top">
      <h1>
        <span>Product designer</span>
        <span>for early B2B</span>
        <span>&amp; <em>AI products.</em></span>
      </h1>
      <Particles/>
      <div className="hero-bottom">
        <div className="hero-copy">
          <p>I take early ideas from research and product strategy to reusable components and working prototypes.</p>
        </div>
      </div>
    </section>
  );
}

function ProductHero() {
  return <section className="hero hero--particles hero--quiet" id="top">
    <h1><span>Product Manager</span><span>for complex</span><span>B2B products.</span></h1>
    <Particles/>
    <div className="hero-bottom"><div className="hero-copy"><p>I lead product work with a design-led approach, turning research and business rules into priorities, workflows and decisions teams can build.</p></div></div>
  </section>;
}

function PortfolioEntry() {
  return <main className="portfolio-entry" id="top">
    <div className="portfolio-entry-inner"><span className="entry-mark">REZA A<i aria-hidden="true"/></span><div className="entry-intro"><p>Reza Al Hassan · Dhaka, Bangladesh</p><h1>Choose a <em>portfolio.</em></h1><span>Two views of work across product decisions, interfaces and delivery.</span></div>
      <div className="entry-choices"><a href="/product"><span>01 / Product</span><strong>Product leadership, decisions and delivery.</strong><ArrowUpRight aria-hidden="true"/></a><a href="/design"><span>02 / Design</span><strong>Product design, systems and interface evidence.</strong><ArrowUpRight aria-hidden="true"/></a></div>
    </div>
  </main>;
}

function SelectedProjects({ portfolio = 'design' }) {
  const [demoPaused, setDemoPaused] = useState(false);
  const demoRef = useRef(null);
  const demoManualPlay = useRef(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { if (reducedMotion.matches) { demoManualPlay.current = false; demoRef.current?.pause(); } };
    update();
    reducedMotion.addEventListener('change', update);
    return () => reducedMotion.removeEventListener('change', update);
  }, []);
  const designSelected = [{ title: 'Zevian', year: '2026 / Now', description: 'AI investigation for sales managers.', metric: '10+ discovery conversations · React prototype', tags: ['Founder product', 'AI workflow', 'Human-in-the-loop'], url: '/zevian', image: '/zevian/cover-sharp.svg', alt: 'Zevian findings, evidence, context and manager decision' }, ...projects.map(project => ({ ...project, image: project.visual === 'rtl' ? '/orderific/cover-comparison.svg' : project.visual === 'pos' ? '/purno/cover.webp' : '/jayga/warehouse-visit.jpg', alt: project.visual === 'rtl' ? 'Orderific delivery zone screen in English LTR and Arabic RTL' : project.visual === 'pos' ? 'Purno payment cover showing the total and split amount' : 'Checking stock in a Jayga warehouse aisle' }))];
  const selected = portfolio === 'product' ? [
    { title: 'Jayga', year: 'Nov 2023–Aug 2025 · Product lead', metric: '~3× revenue/m² potential · 8-person team led', description: 'Turned warehouse operations into grid, billing and delivery workflows.', tags: ['Product rules', 'Service flows', 'Operational tools'], url: '/product/jayga', image: '/jayga/warehouse-visit.jpg', alt: 'Checking stock in a Jayga warehouse aisle' },
    { title: 'Zevian', year: '2026 · Founder product', metric: '10+ discovery conversations · 2 paying customers', description: 'Shifted AI performance insights to manager-led investigation.', tags: ['Discovery', 'AI workflow', 'Interaction design'], url: '/product/zevian', image: '/zevian/cover-sharp.svg', alt: 'Zevian findings, evidence, context and manager decision' },
    { title: 'Orderific', year: '2025–26 · Product designer', metric: '28% less development time · ½ onboarding time', description: 'Scaled design systems for six connected restaurant apps.', tags: ['Design systems', 'RTL design', 'Technical delivery'], url: '/product/orderific', visual: 'rtl', image: '/orderific/cover-comparison.svg', alt: 'Orderific interface components in English LTR and Arabic RTL' },
    { title: 'Purno', year: '2024 · Product designer', metric: '$10K seed · desktop, tablet and mobile', description: 'Designed POS workflows across sales, inventory and operations.', tags: ['POS flows', 'Interface design', 'Payments'], url: '/product/purno', image: '/purno/cover.webp', alt: 'Purno payment cover showing the total and split amount' },
  ] : designSelected;
  const toggleDemo = () => {
    if (!demoRef.current) return;
    if (demoRef.current.paused) { demoManualPlay.current = true; demoRef.current.play().catch(() => setDemoPaused(true)); }
    else demoRef.current.pause();
  };
  return <section className={`section projects work-section ${portfolio === 'product' ? 'work-section--product' : 'work-section--design'}`} id="work">
    <div className="projects-title"><h2>{portfolio === 'product' ? 'Product work' : 'Selected projects'}</h2></div>
    <div className="work-grid">
      {selected.map((project, index) => <article className={`work-card work-card--${project.title.toLowerCase()}`} key={project.title}>
        {project.title === 'Orderific' && <figure className="work-cover work-cover--orderific work-cover--marquee"><DraggableMarquee items={orderificCards} speed={1} renderItem={(item, { duplicate }) => <ExpandableImage src={item.src} alt={item.alt} tabIndex={duplicate ? -1 : undefined}/>}/></figure>}
        {project.title === 'Zevian' && <figure className="work-cover work-cover--zevian">
          <img src="/Full-Zevian.png" alt={project.alt} loading="eager"/>
          <video ref={demoRef} autoPlay muted loop playsInline preload="metadata" poster="/Full-Zevian.png" aria-hidden="true" onPlay={() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !demoManualPlay.current) demoRef.current.pause();
            else setDemoPaused(false);
          }} onPause={() => setDemoPaused(true)}><source src="/zevian/demo-loop.mp4" type="video/mp4"/></video>
          <button className="demo-toggle" type="button" onClick={toggleDemo} aria-label={demoPaused ? 'Play Zevian preview' : 'Pause Zevian preview'}/>
        </figure>}
        <a href={project.url} className="work-card-link">
          {project.title !== 'Orderific' && project.title !== 'Zevian' && <figure className={`work-cover work-cover--${project.title.toLowerCase()}`}>
            <img src={project.image} alt={project.alt} loading={index === 0 ? 'eager' : 'lazy'}/>
          </figure>}
          <div className="work-card-heading"><span>{portfolio === 'design' && index === 0 ? 'Founder product' : project.year}</span><ArrowUpRight aria-hidden="true"/></div>
          <h3>{project.title}{portfolio === 'product' && project.title === 'Jayga' && <span className="work-featured-label">Featured project</span>}</h3>
          <p className="work-description"><span className="work-summary">{project.description}</span><span className="work-metric">{project.metric}</span></p>
        </a>
      </article>)}
    </div>
  </section>;
}

function DesignSystems() {
  return (
    <section className="section projects work-section other-work-section" id="other-work">
      <div className="projects-title"><h2>Other work</h2></div>
      <div className="work-grid">
        <article className="work-card">
          <a href="/zevian-hrms" className="work-card-link">
            <figure className="work-cover other-work-cover other-work-cover--hrms">
              <img src="/zevian-hrms/policy-cover.png" alt="Zevian HRMS work modality policy screen" loading="lazy"/>
            </figure>
            <div className="work-card-heading"><span>Earlier interface system</span><ArrowUpRight aria-hidden="true"/></div>
            <h3>Zevian HRMS</h3>
            <p className="work-description"><span className="work-summary">Theme modes and reusable components for an HR management concept.</span></p>
          </a>
        </article>
        <article className="work-card">
          <a href="/portfolio" className="work-card-link">
            <figure className="work-cover other-work-cover other-work-cover--portfolio" aria-hidden="true">
              <div className="portfolio-cover-sheet">
                <div className="portfolio-cover-masthead"><span>REZA A</span><span>PRODUCT DESIGN</span></div>
                <strong>Ideas into<br/><em>clear systems.</em></strong>
                <div className="portfolio-cover-choices"><span>01 / Product</span><span>02 / Design</span></div>
              </div>
            </figure>
            <div className="work-card-heading"><span>Personal project</span><ArrowUpRight aria-hidden="true"/></div>
            <h3>Portfolio</h3>
            <p className="work-description"><span className="work-summary">Moodboards and iteration shaped a clearer editorial portfolio.</span></p>
          </a>
        </article>
      </div>
    </section>
  );
}

function JaygaProductCase() {
  return <JaygaCase portfolio="product"/>;
}

function OrderificAppMap() {
  return <details className="case-accordion orderific-app-accordion"><summary>6 connected apps</summary><div className="orderific-app-map" aria-label="Named apps in the Orderific restaurant platform">
    <div className="orderific-app-map-head" aria-hidden="true"><span>App</span><span>Role in the platform</span></div>
    <article><h3>BMS <small>Brand management system</small></h3><div>
      <ul className="orderific-app-features">
        <li><strong>Sales and stock</strong><span>Orders, menus, ingredients, inventory and suppliers</span></li>
        <li><strong>Guest service</strong><span>Tables, rooms, reservations, QR codes, reviews and delivery</span></li>
        <li><strong>Growth and team</strong><span>Marketing, coupons, discounts, loyalty and teams</span></li>
      </ul>
      <ul className="orderific-app-modes"><li>Desktop · tablet</li><li>Light · dark</li><li>English LTR · Arabic RTL</li></ul>
    </div></article>
    <article><h3>CP (MCP)</h3><div><p>People place orders, book reservations, pay and join events. Restaurant owners manage events.</p><ul className="orderific-app-modes"><li>Tablet · mobile</li></ul></div></article>
    <article><h3>MSP <small>Kitchen management</small></h3><div><p>Orders go straight to the kitchen app, using menus and ingredient setup from BMS.</p><ul className="orderific-app-modes"><li>Desktop · tablet</li></ul></div></article>
    <article><h3>WSP <small>Delivery tracking</small></h3><div><p>Merchants and delivery staff confirm and update deliveries. Merchants set delivery settings.</p><ul className="orderific-app-modes"><li>Desktop · tablet · mobile</li></ul></div></article>
    <article><h3>WCP Smartmenu <small>Payments</small></h3><div><p>Handles payment setup and payments in the Smartmenu flow.</p><ul className="orderific-app-modes"><li>Desktop · tablet</li></ul></div></article>
  </div></details>;
}

function ProductOrderificCase() {
  return <><Nav caseStudy portfolio="product" processHref="#first-seven-months"/>
    <main className="case-page product-case product-orderific-page" id="top">
      <section className="case-hero case-wrap"><a className="back-link" href="/product"><ArrowLeft/> Product work</a><p className="product-case-kicker">2025–26 · Product designer · Design and engineering</p><h1>Make complex systems<br/><em>easier to build.</em></h1><div className="case-hero-bottom"><p>I worked across six apps in one restaurant management platform, improving design systems, file naming and handoff for automated development.</p><div className="case-tags"><span>Handover</span><span>Design systems</span><span>RTL/LTR</span><span>Team guidance</span><span>Data mapping</span></div></div></section>

      <section className="case-section case-wrap product-outcome case-story-section" id="outcome"><div className="case-index">01 / Measured results</div><div className="case-content"><h2>Two internal comparisons.</h2><p className="lead narrow">I compared development time before and after changing handover. For onboarding, I compared my own time with that of new hires after I wrote a Figma guide for designers and QA.</p><ComparisonGrid className="orderific-result-pair"><div><strong>28%</strong><span>less development time after handover changes</span></div><div><strong>½</strong><span>the onboarding time after the Figma guide</span></div></ComparisonGrid></div></section>

      <section className="case-section case-wrap case-story-section" id="first-seven-months"><div className="case-index">02 / First seven months</div><div className="case-content"><h2>Build the system, then help the team use it.</h2><p className="lead narrow">As development began, my work moved from design systems and handoff to reviews, hiring and team support.</p><ol className="orderific-phase-list"><li><span>01 / Handover</span><div><h3>Prepare files for development.</h3><p>I improved handoff, set standard frame and component names, and documented rules for automated development.</p></div></li><li><span>02 / RTL</span><div><h3>Design Arabic flows for restaurant management.</h3><p>I set RTL rules for navigation, reading order and components while keeping English screens in the same system.</p></div></li><li><span>03–04 / Audit</span><div><h3>Review 56 mapping projects with a two-person design team.</h3><p>I checked screens and naming rules, guided junior designers, and worked through conflicts with engineers as development started.</p></div></li><li><span>05 / Hiring</span><div><h3>Help select the next designers.</h3><p>I took part in junior-designer interviews and design tests.</p></div></li><li><span>06 / Team delivery</span><div><h3>Keep prototypes, tasks and system assets aligned.</h3><p>I guided prototyping, managed design tasks and onboarding, and fixed asset differences across the design systems.</p></div></li><li><span>07 / Guidance</span><div><h3>Make the system easier to learn and check.</h3><p>I wrote the Figma guide for designers and QA, prepared ICP research, and made icon use more consistent.</p></div></li></ol></div></section>

      <section className="case-section case-wrap case-story-section" id="design-system">
        <div className="case-index">03 / Design system evidence</div>
        <div className="case-content">
          <h2>Properties and names for handoff.</h2>
          <p className="lead narrow">Standard frame names and written rules helped engineers and automated tools identify the right interface across the app suite.</p>
          <ComparisonGrid className="product-decision-list"><article><span>Identification</span><h3>Unique frame names</h3><p>Use one naming pattern so automated tools and people can find the same screen.</p></article><article><span>Components</span><h3>Reusable input states</h3><p>Keep input type, helper text, content and state inside component properties.</p></article><article><span>Governance</span><h3>Rules before handoff</h3><p>Document token layers, component states, RTL behaviour and review checks.</p></article></ComparisonGrid>
          <EvidenceGrid className="product-other-proof"><figure><ExpandableImage src="/orderific/component-playground.png" alt="Orderific input component playground showing type, state, helper and variable mode properties" caption="The component playground exposes input properties and states used across screens."/><figcaption>Reusable component properties</figcaption></figure><figure><ExpandableImage src="/orderific/governance.png" alt="Orderific documentation page about token structure and naming conventions" caption="Documentation for token layers and naming rules."/><figcaption>Documentation and naming rules</figcaption></figure></EvidenceGrid>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="scale">
        <div className="case-index">04 / Product scale</div>
        <div className="case-content">
          <h2>RTL, themes and device rules.</h2>
          <p className="lead narrow">One restaurant management platform connected six apps, each with responsive views for its users. BMS held the main business setup and also supported light and dark modes and English LTR and Arabic RTL.</p>
          <ComparisonGrid className="orderific-scale-facts"><div><span>1</span><p>connected restaurant management platform</p></div><div><span>6</span><p>apps in the omnichannel suite</p></div><div><span>2</span><p>BMS directions: LTR and RTL</p></div></ComparisonGrid>
          <OrderificAppMap/>
          <EvidenceGrid className="orderific-scale-images">
            <figure className="orderific-scale-images--wide"><ExpandableImage src="/orderific/rtl-comparison.png" alt="Orderific delivery zone in English LTR and Arabic RTL" caption="The delivery-zone screen in LTR and RTL."/><figcaption>Direction: LTR and RTL</figcaption></figure>
            <figure><ExpandableImage src="/orderific/reports-light.png" alt="Orderific reports screen in light mode" caption="Reports in light mode."/><figcaption>Light mode</figcaption></figure>
            <figure><ExpandableImage src="/orderific/dark-mode.png" alt="Selected Figma frame outlined in blue, with a visible frame name above a dark-mode Orderific reports screen" caption="The selected dark-mode Figma frame shows the blue outline and its unique frame name."/><figcaption>Dark mode · selected frame and name</figcaption></figure>
          </EvidenceGrid>
          <a className="product-other-link" href="/orderific">See the design system case study <ArrowUpRight/></a>
        </div>
      </section>
      <section className="case-section case-wrap case-story-section" id="mapping"><div className="case-index">05 / Later database mapping</div><div className="case-content"><h2>Connect form fields to business data.</h2><p className="lead narrow">The automated tool could recognise an input field, but it could not know what that field meant to the business. I linked it to the right database value and worked with engineers to fix mismatches. This came after the earlier design mapping work.</p><ol className="orderific-mapping-flow"><li><span>01</span><strong>Design the screen</strong><p>Use clear components, states and unique frame names.</p></li><li><span>02</span><strong>Detect fields</strong><p>The tool identifies inputs and other interface objects.</p></li><li><span>03</span><strong>Connect the data</strong><p>Link each field to its business value in the database.</p></li><li><span>04</span><strong>Check the build</strong><p>Fix mismatches across the screen, components and data with engineers.</p></li></ol><figure className="product-case-figure"><ExpandableImage src="/orderific/input-drift.png" alt="Orderific form with input fields and a guideline table of business codes" caption="A product form shows interface fields beside business codes. The mapper itself is not shown."/><figcaption>Interface fields and business values in one product screen.</figcaption></figure></div></section>
    </main><About portfolio="product"/>
  </>;
}

function PortfolioVisual() {
  return <div className="portfolio-visual" role="img" aria-label="Portfolio design process moving from moodboards through section studies to a consistent editorial system">
    <div className="portfolio-process">
      <div className="portfolio-process-step"><small>01 / Collect</small><strong>Moodboards</strong><span>Spacing · Type · Tone</span></div>
      <FlowArrow/>
      <div className="portfolio-process-step"><small>02 / Translate</small><strong>Section studies</strong><span>Layout · Content · Rhythm</span></div>
      <FlowArrow/>
      <div className="portfolio-process-step portfolio-process-result"><small>03 / Unify</small><strong>One system</strong><span>Clear · Personal · Scannable</span></div>
    </div>
  </div>;
}

function PortfolioCase() {
  const direction = [
    ['01', 'Editorial hierarchy', 'Calm spacing and clear levels separate context, decisions and results.'],
    ['02', 'Product evidence', 'Each visual explains product logic instead of decorating the page.'],
    ['03', 'Fewer patterns', 'One set of rows, tags and rules keeps attention on the work.'],
    ['04', 'Purposeful motion', 'Animation appears only when it makes an interaction clearer.'],
  ];

  return <>
    <Nav caseStudy/>
    <main className="case-page portfolio-case" id="top">
      <section className="case-hero case-wrap">
        <a className="back-link" href="/design"><ArrowLeft/> Selected work</a>
        <h1>A portfolio built<br/><em>through iteration.</em></h1>
        <div className="case-hero-bottom"><p>I rebuilt the portfolio around a clearer project hierarchy and one editorial system, using moodboards to test the visual direction.</p><div className="case-tags"><span>Portfolio</span><span>Visual direction</span><span>Design system</span><span>2026</span></div></div>
        <div className="case-stage portfolio-stage"><PortfolioVisual/></div>
      </section>

      <section className="case-section case-wrap case-story-section" id="overview">
        <div className="case-index">01 / Context</div>
        <div className="case-content">
          <h2>A clearer project hierarchy.</h2>
          <p className="lead narrow">I tested references as sections and interactions, keeping editorial spacing, clear type and stronger project visuals. I removed extra containers and gradients.</p>
          <dl className="case-meta"><div><dt>Project</dt><dd>Personal portfolio</dd></div><div><dt>Role</dt><dd>Designer · Developer</dd></div><div><dt>Approach</dt><dd>Moodboard-led iteration</dd></div><div><dt>Focus</dt><dd>Story · Hierarchy · Systems</dd></div><div><dt>Output</dt><dd>Responsive website</dd></div><div><dt>Status</dt><dd>Current redesign</dd></div></dl>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="process">
        <div className="case-index">02 / Direction</div>
        <div className="case-content">
          <h2>References became layout rules.</h2>
          <div className="portfolio-direction">{direction.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="outcome">
        <div className="case-index">03 / Result</div>
        <div className="case-content">
          <h2>One visual system across four cases.</h2>
          <p className="lead narrow">A shared set of spacing, typography, cover and tag rules keeps the site consistent.</p>
          <p className="portfolio-archive-note">Previous version: <a href="https://rezaalhasan.netlify.app/" target="_blank" rel="noreferrer">View the earlier portfolio <ArrowUpRight/></a></p>
          <a className="next-project" href="/zevian"><span>Next case study</span><strong>Zevian <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function About({ portfolio = 'design' }) {
  const modern = React.useContext(PortfolioDesignContext);
  if (modern) return <PortfolioFooter/>;
  return (
    <footer className="about section" id="about">
      <div className="about-top"><div className="about-copy"><p>{portfolio === 'product' ? 'Available for product manager roles.' : 'Available for product design roles.'}</p></div><h2>Have a complex product<br/>challenge? <a href="mailto:rezahasan1198@gmail.com">Let’s talk.</a></h2></div>
      <div className="footer-row"><Mark/><span>Based in Dhaka · Working worldwide</span><div><a href="mailto:rezahasan1198@gmail.com">Email Reza</a><a href="https://www.linkedin.com/in/reza1198/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/RezaAlHassan" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.instagram.com/rezaa.hassan/" target="_blank" rel="noreferrer">Instagram</a></div><span>© 2026</span></div>
    </footer>
  );
}

function FlowArrow({ className = '' }) {
  return <svg className={`flow-arrow ${className}`} viewBox="0 0 96 28" aria-hidden="true" focusable="false">
    <path d="M2 14H86" />
    <path d="m76 4 10 10-10 10" />
  </svg>;
}

function ZevianEvidence({ src, alt, caption }) {
  return <figure className="zevian-evidence">
    <div className="zevian-evidence-media"><ExpandableImage src={src} alt={alt} caption={caption}/></div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

function ZevianCase({ portfolio = 'design' }) {
  const modern = React.useContext(PortfolioDesignContext);
  return <>
    {modern ? <PortfolioHeader/> : <header className="zevian-reference-nav">
      <nav aria-label="Main navigation">
        <div className="zevian-reference-links"><a href={`/${portfolio}`}>Portfolio</a><a href="/about">Information</a></div>
        <div className="zevian-reference-identity"><ContactButton/><a href="/" className="zevian-reference-name">Reza Al Hassan <span aria-hidden="true">✳</span> <span>Product &amp; Design</span></a></div>
      </nav>
    </header>}
    <main className="case-page zevian-page zevian-reference-layout" id="top">
      <aside className="zevian-reference-sidebar" aria-label="Project details">
        <h1>Zevian</h1>
        <dl className="zevian-project-meta">
          <div><dt>Product</dt><dd>Founder product</dd></div>
          <div><dt>Role</dt><dd>Founder · Product designer</dd></div>
          <div><dt>Scope</dt><dd>Strategy · UX · UI</dd></div>
          <div><dt>Research</dt><dd>Interviews · Prototype feedback</dd></div>
          <div><dt>Current stage</dt><dd>React prototype<br/>Ongoing validation</dd></div>
        </dl>
        <a className="zevian-sidebar-next" href={portfolio === 'product' ? '/product/orderific' : '/orderific'}>Next project <ArrowUpRight/></a>
      </aside>
      <div className="zevian-reference-content">
        <section className="case-hero case-wrap">
          <p className="zevian-reference-description">Zevian helps sales managers investigate performance changes before they become pipeline problems. It brings the change, evidence, possible reasons and context together so managers can decide what needs action.</p>
        </section>

      {portfolio === 'product' && <section className="case-section case-wrap product-outcome case-story-section" id="outcome">
        <div className="case-index">Outcome / current stage</div>
        <div className="case-content"><h2>A new direction, shown in a working prototype.</h2><p className="lead narrow">Discovery moved Zevian away from employee scoring toward manager-led investigation. Zevian has two paying customers; the current prototype remains in development and under validation.</p></div>
      </section>}

      <section className="case-section case-wrap overview case-story-section" id="overview">
        <div className="case-index">01 / Current product</div>
        <div className="case-content">
          <h2>From a change to a manager’s decision.</h2>
          <p className="lead narrow">The system prepares the evidence. Managers review uncertain matches, add context and decide what needs action. Current development connects CRM and outreach platforms to find sales-pipeline issues.</p>
          <div className="zevian-flowchart" aria-label="Zevian workflow from data upload to a saved manager decision">
            <div className="workflow-lane"><span className="workflow-lane-label">Start with existing data</span><div className="flow-node"><strong>Add data</strong><p>CSV, XLSX, CRM or dialer export.</p></div></div>
            <div className="workflow-lane automatic-lane"><span className="workflow-lane-label">System prepares</span><ol className="system-flow-nodes">
              <li className="flow-node"><strong>Match records</strong><p>Map clear matches automatically.</p></li>
              <li className="flow-node"><strong>Detect changes</strong><p>Compare outcomes with a recent baseline.</p></li>
              <li className="flow-node"><strong>Link signals</strong><p>Show evidence and possible reasons.</p></li>
            </ol><p className="flow-review-note">Uncertain matches go to the manager for confirmation.</p></div>
            <div className="workflow-lane manager-lane"><span className="workflow-lane-label">Manager reviews</span><ol className="manager-flow-nodes">
              <li className="flow-node"><strong>Check the finding</strong><p>Review evidence, risk and confidence.</p></li>
              <li className="flow-node"><strong>Add context</strong><p>Optional. Keep each source visible.</p></li>
              <li className="flow-node decision-node"><strong>Decide and save</strong><p>The manager makes the final call. The system keeps the history.</p></li>
            </ol></div>
          </div>
        </div>
      </section>

      <div className="zevian-reference-lead-image">
        <ZevianEvidence src="/Full-Zevian.png" alt="Zevian findings list and investigation drawer showing a drop in meetings booked, supporting signals and missing context" caption="Scan the change. Open the evidence. Decide with context."/>
      </div>

      <section className="case-section case-wrap case-story-section" id="process">
        <div className="case-index">02 / Discovery changes</div>
        <div className="case-content">
          <h2>Discovery changed what the product needed to explain.</h2>
          <p className="zevian-method-summary">I combined 10+ discovery conversations and prototype feedback with AI-assisted transcript synthesis. Feedback shifted the product toward focused investigation, visible evidence and manager control.</p>
          <details className="zevian-method"><summary>Research method and feedback-to-design changes</summary><div className="zevian-method-body zevian-method-body--research">
          <h4>Interviews, prototype feedback and synthesis.</h4>
          <p>Discovery ran from May to September alongside building and GTM, with about 1–2 weeks spent on interviews, prototype feedback and synthesis.</p>
          <h4>Transcript and AI workflow.</h4>
          <p>I used Fireflies to create interview transcripts, uploaded them to Google Drive and kept them organised in a dedicated folder. I connected the folder to ChatGPT for research synthesis.</p>
          <div className="pivot-list">
            <article><h3>Replace the dashboard with a focused review.</h3><p>One manager struggled to understand what the dashboard numbers meant. I removed the dashboard from the current prototype and narrowed the workflow to reviewing a finding, its evidence and context.</p></article>
            <article><h3>Support investigation, not just pattern detection.</h3><p>One manager said investigating patterns was already part of their job; another described investigation as the bigger problem. I shifted from employee scoring to helping managers understand a change through recent baselines and supporting signals.</p></article>
            <article><h3>Keep the decision with the manager.</h3><p>One manager said they did not trust AI decisions. I kept evidence, confidence and possible reasons visible, with the manager making the final call.</p></article>
            <article><h3>Look beyond employee input.</h3><p>Lead quality, campaigns, process changes and data issues can also affect results. Zevian keeps possible reasons open for review.</p></article>
            <article><h3>Automate clear matches.</h3><p>Zevian handles clear data matches and categorisation. Managers review uncertain cases and make the final decision.</p></article>
          </div>
          <blockquote>“Something changed. Why did it change?”<cite>The question that replaced the scoring model</cite></blockquote>
          </div></details>
        </div>
      </section>

      <section className="case-section case-wrap product-story case-story-section">
        <div className="case-index">03 / Current experience</div>
        <div className="case-content">
          <h2>Current: investigation and diagnosis</h2>
          <div className="zevian-image-sequence">
            <ZevianEvidence src="/Pick-Zevian.png" alt="Zevian asks who J Rahman should be linked to, with Joy Rahman selected, Jamal Rahman, a new employee option and a skip action" caption="Review an uncertain match."/>
            <ZevianEvidence src="/Findings-closeup.png" alt="Selected Zevian finding beside the investigation drawer with meetings booked down 22 percent, supporting signals, low confidence and missing context" caption="Open a finding and review its evidence."/>
            <ZevianEvidence src="/Closeup-context-355.png" alt="Close-up of Zevian context states, including no context, employee context received and manager decision options" caption="Review attributable context and choose an action."/>
            <ZevianEvidence src="/Zevian-Colors.png" alt="Zevian primitive and semantic colour token system" caption="Primitive colours feed semantic roles for product states."/>
          </div>
          <div className="zevian-visual-reflection"><h3>From unclear numbers to a focused review.</h3><p>A manager's difficulty with dashboard numbers led me to remove the dashboard. Distrust of AI decisions informed visible evidence, confidence and context, with the manager making the final call.</p><p className="zevian-reference-note">Layout references: Attio for scanning rows; Notion for reading detail.</p></div>
        </div>
      </section>



      <section className="case-section case-wrap evolution case-story-section">
        <div className="case-index">04 / Product evolution</div>
        <div className="case-content">
          <h2>From evaluation to investigation.</h2>
          <ComparisonGrid className="model-evolution model-evolution--two">
            <article><span>Earlier prototype: employee scoring</span><h3>Evaluate performance and guide coaching.</h3><p>KPIs and employee data &rarr; scores or performance findings &rarr; coaching</p><small>Gap: explain the change and consider causes beyond employee performance.</small></article>
            <article className="model-current"><span>Current: investigation and diagnosis</span><h3>Prepare the evidence. Review the exceptions.</h3><p>Upload &rarr; auto-match &rarr; finding and possible reasons &rarr; context &rarr; decision &rarr; history</p><small>The system prepares the review; the manager judges the evidence and decides.</small></article>
          </ComparisonGrid>
          <div className="zevian-archive-intro"><h3>Earlier prototype: employee scoring</h3><p>The first prototype scored employees and detected patterns based on KPIs set by the manager. Discovery shifted the focus to investigating changes and their possible causes.</p></div>
          <div className="zevian-prototype-actions" aria-label="Earlier prototype links"><a href="https://demo.zevian.co/dashboard" target="_blank" rel="noreferrer">Open earlier prototype <ArrowUpRight/></a><a href="https://rezaalhasan.netlify.app/zevian" target="_blank" rel="noreferrer">Read earlier case study <ArrowUpRight/></a></div>
          <EvidenceTicker className="zevian-archive-gallery" label="Earlier prototype: employee scoring">
            <figure><ExpandableImage src="/zevian/archived/kpi-creation.png" alt="Archived Zevian KPI setup, showing a long scoring form beside a later two-step version" caption="KPI setup in the earlier evaluation prototype."/><figcaption><strong>Set scoring rules</strong><span>The manager defined what success meant before reports could be evaluated.</span></figcaption></figure>
            <figure><ExpandableImage src="/zevian/archived/report-detail.png" alt="Archived Zevian report detail with an employee score, numeric criteria, report evidence and coaching notes" caption="Scored report in the earlier evaluation prototype."/><figcaption><strong>Review a scored report</strong><span>The report tied a score to targets, written evidence and coaching notes.</span></figcaption></figure>
            <figure><ExpandableImage src="/zevian/archived/manager-dashboard.png" alt="Archived Zevian manager dashboard with a team average score, reporting status and AI team summary" caption="Manager dashboard in the earlier evaluation prototype."/><figcaption><strong>Read the team view</strong><span>The dashboard led with a team score and reporting summary.</span></figcaption></figure>
            <figure><ExpandableImage src="/zevian/archived/ask-ai.png" alt="Archived Zevian Ask AI screen annotated to show the selected people and dates, an answer grounded in report text and linked source reports" caption="Ask AI in the earlier evaluation prototype, with scope and source reports visible."/><figcaption><strong>Ask AI about the reports</strong><span>The manager chose the people and dates. The answer linked back to the reports it used.</span></figcaption></figure>
          </EvidenceTicker>
          <p className="zevian-method-summary">I used AI agents to build and maintain the earlier prototype, then iterated on manager feedback.</p>
          <details className="zevian-method"><summary>Earlier prototype: AI build and testing workflow</summary><div className="zevian-method-body">
            <h4>Combine UI libraries.</h4><p>I combined shadcn with the Datadog library and set up the libraries for the employee-scoring prototype.</p>
            <h4>Connect the data and manage environments.</h4><p>I built SQL scripts, connected the prototype to Supabase and maintained production, local and test branches.</p>
            <h4>Use agents across development and testing.</h4><p>I worked with Antigravity, Codex and Claude Code on the build, and used Google's Jules to set up automated tests.</p>
            <h4>Iterate on manager feedback.</h4><p>Manager feedback informed changes to the prototype. The earlier demo shows employee scoring and pattern detection based on manager-set KPIs.</p>
          </div></details>

        </div>
      </section>



      <section className="case-section case-wrap outcome case-story-section" id={portfolio === 'product' ? undefined : 'outcome'}>
        <div className="case-index">05 / System and build</div>
        <div className="case-content">
          <h2>From product decisions to a testable React prototype.</h2>
          <p className="lead narrow">During a three-day design sprint, I defined the interface structure, states and edge cases for the investigation workflow.</p>


          <p className="zevian-method-summary">I set the visual direction in Figma before the AI-assisted build, starting with colour, type, inputs, buttons, links, badges and chips. The system can grow with new workflow needs.</p>
          <details className="zevian-method"><summary>Current prototype: design method and AI workflow</summary><div className="zevian-method-body">
            <h4>Three-day design sprint.</h4>
<ComparisonGrid className="build-days">
            <article><span>Day 1</span><h3>Structure</h3><p>Defined the four-step workflow: Add data → Review matches → Review findings → Save decisions.</p></article>
            <article><span>Day 2</span><h3>System</h3><p>Defined the list, drawer, context states, confidence, priority and semantic tokens.</p></article>
            <article><span>Day 3</span><h3>Edge cases</h3><p>Documented unresolved matches, late context, mixed sources and decisions made with partial context.</p></article>
          </ComparisonGrid>
            <h4>Start with a design foundation.</h4><p>I designed tokens in a Figma file and a few pages with components to guide the build. This gave the AI concrete references instead of relying on the common SaaS dashboard layouts it often produces with shadcn variants.</p>
            <h4>Use AI to explore, then make the decisions.</h4><p>I used ChatGPT for product critique, reference analysis, token structure and state exploration. I kept product decisions grounded in research and my own judgment.</p>
            <h4>Bring the design into React.</h4><p>I used Claude Code and Codex to build the React investigation prototype from the design direction. The prototype remains in development.</p>
            <h4>Develop the sales-pipeline workflow.</h4><p>Current work includes CRM and outreach integrations to bring sales-pipeline signals into the investigation workflow. Validation continues as the product develops.</p>
          </div></details>
          <div className="final-learning"><span>Main learning</span><p>The product became the investigation around a change—and the manager's ability to judge it fairly.</p></div>
          <a className="next-project" href={portfolio === 'product' ? '/product/orderific' : '/orderific'}><span>Next case study</span><strong>Orderific <ArrowUpRight/></strong></a>
        </div>
      </section>
      </div>
    </main>
    <About portfolio={portfolio}/>
  </>;
}

function HrmsImage({ src, alt, caption, className = '' }) {
  return <figure className={`hrms-image ${className}`}>
    <ExpandableImage src={src} alt={alt} caption={caption} loading="eager" decoding="sync" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function HrmsThemeMap() {
  const tokens = [
    ['Canvas', '#F7F8FA', '#14161A'],
    ['Surface', '#FFFFFF', '#202329'],
    ['Text', '#20242C', '#F2F3F5'],
    ['Action', '#151515', '#D8FF52'],
  ];

  return <div className="hrms-theme-map" aria-label="Representative light and dark theme variable mapping">
    <div className="hrms-theme-head"><strong>One semantic layer</strong><span>Representative variable map</span></div>
    <div className="hrms-theme-columns" aria-hidden="true"><span>Role</span><span>Light</span><span>Dark</span></div>
    {tokens.map(([name, light, dark]) => <div className="hrms-token-row" key={name}>
      <strong>{name}</strong>
      <span><i style={{backgroundColor: light}}/>{light}</span>
      <span><i style={{backgroundColor: dark}}/>{dark}</span>
    </div>)}
    <div className="hrms-theme-foot"><span>Dashboard</span><span>Records</span><span>Reports</span><b>Same component rules</b></div>
  </div>;
}

function ZevianHrmsCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page hrms-page" id="top">
      <section className="case-hero case-wrap hrms-hero">
        <a className="back-link" href="/design"><ArrowLeft/> Selected work</a>
        <h1>An HR system<br/><em>given one language.</em></h1>
        <div className="case-hero-bottom"><p>I refined an early HRMS concept and working prototype into a reusable interface system for employee records, attendance, policies and approvals.</p><div className="case-tags"><span>Early concept</span><span>HRMS</span><span>Design system</span><span>Prototype</span></div></div>
        <div className="hrms-stage" aria-label="Zevian HRMS interface overview">
          <span className="hrms-stage-note">Early product concept · interface studies</span>
          <HrmsImage className="hrms-stage-policy" src="/zevian-hrms/interface-policy.png" alt="Cropped view of the Zevian work modality policy setup screen" />
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="overview">
        <div className="case-index">01 / Context</div>
        <div className="case-content">
          <h2>A broad HRMS<br/>prototype.</h2>
          <div className="overview-grid"><p className="lead">The concept brought attendance, employee records, activities, calendars, approvals and work policies into one system.</p><p>I started with a working prototype. Walking through its flows showed how broad the scope had become and which interface rules could be reused.</p></div>
          <dl className="case-meta"><div><dt>Product</dt><dd>Zevian HRMS concept</dd></div><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Scope</dt><dd>Prototype · UI system</dd></div><div><dt>Foundation</dt><dd>Ant Design</dd></div><div><dt>Method</dt><dd>Atomic Design</dd></div><div><dt>Status</dt><dd>Early product direction</dd></div></dl>
          <div className="hrms-context-note"><strong>Earlier Zevian HRMS concept</strong><p>The Zevian name later moved to a focused product for investigating performance changes and supporting manager decisions. This page documents the earlier HRMS interface and system work.</p></div>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="process">
        <div className="case-index">02 / Interface work</div>
        <div className="case-content">
          <h2>Status and next actions<br/>on dense screens.</h2>
          <p className="lead narrow">Policy setup turned long work rules into reviewable steps. Employee and calendar views kept context close to the task.</p>
          <EvidenceGrid className="hrms-interface-grid">
            <HrmsImage className="hrms-interface-wide" src="/zevian-hrms/interface-policy.png" alt="Zevian work modality policy setup screen" caption="Work modality policy setup." />
            <HrmsImage src="/zevian-hrms/interface-employee.png" alt="Zevian employee overview panel over attendance timesheets" caption="Employee context stays close to attendance records." />
            <HrmsImage src="/zevian-hrms/interface-calendar.png" alt="Zevian calendar with activities and event legend" caption="A shared calendar keeps activities and status visible." />
          </EvidenceGrid>
        </div>
      </section>

      <section className="case-section case-wrap hrms-system-section case-story-section">
        <div className="case-index">03 / System</div>
        <div className="case-content">
          <h2>One system for<br/>light and dark.</h2>
          <div className="overview-grid"><p className="lead">Built on Ant Design and organised with Atomic Design, the library gave inputs, buttons, avatars and navigation one set of rules.</p><p>Semantic variables carried those rules across light and dark themes, dashboards, records and reports.</p></div>
          <EvidenceGrid className="hrms-system-proof">
            <HrmsImage className="hrms-system-main" src="/zevian-hrms/inputs.png" alt="Zevian design system input fields, selectors, toggles and states" caption="Inputs and states" />
            <div className="hrms-system-stack">
              <HrmsImage src="/zevian-hrms/buttons-avatars.png" alt="Zevian design system buttons, chips and avatars" caption="Buttons and avatars" />
              <HrmsImage src="/zevian-hrms/sidebar.png" alt="Zevian design system expanded and collapsed sidebar variants" caption="Navigation" />
            </div>
          </EvidenceGrid>
          <HrmsThemeMap/>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="outcome">
        <div className="case-index">04 / Result</div>
        <div className="case-content">
          <h2>Prototype and UI rules.</h2>
          <ComparisonGrid className="hrms-outcome">
            <article><strong>Working prototype</strong><p>The team could walk through the concept and question its scope.</p></article>
            <article><strong>Reusable UI rules</strong><p>Core controls and navigation gave dashboards, records and reports the same starting point.</p></article>
            <article><strong>Clearer product boundary</strong><p>The flows exposed how broad the HRMS concept had become.</p></article>
          </ComparisonGrid>
          <div className="hrms-links"><a href="https://zevian.netlify.app/" target="_blank" rel="noreferrer">Open early prototype <ArrowUpRight/></a><a href="https://dribbble.com/shots/26808801-Zevian-HRMS-B2B-SaaS-Dashboard" target="_blank" rel="noreferrer">25k+ views on Dribbble <ArrowUpRight/></a></div>
          <a className="next-project" href="/zevian"><span>See the current product</span><strong>Zevian <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function OrderificImage({ src, alt, caption, className = '' }) {
  return <figure className={`orderific-image ${className}`}>
    <ExpandableImage src={src} alt={alt} caption={caption} loading="eager" decoding="sync" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function OrderificCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page orderific-page" id="top">
      <section className="case-hero case-wrap orderific-hero">
        <a className="back-link" href="/design"><ArrowLeft/> Selected work</a>
        <h1>One platform.<br/>Six connected apps.<br/><em>Two directions.</em></h1>
        <div className="case-hero-bottom">
          <p>I strengthened design systems across six responsive restaurant apps. BMS also needed LTR and RTL layouts and light and dark modes. I documented naming and handoff rules for development.</p>
          <div className="case-tags"><span>Design systems</span><span>Design tokens</span><span>Variables</span><span>RTL/LTR</span><span>Multi-platform</span></div>
        </div>
        <div className="orderific-stage">
          <div className="stage-note"><span>Restaurant management platform</span><strong>6 connected apps</strong></div>
          <ExpandableImage className="case-stage-image" src="/orderific/cover.png" alt="Orderific restaurant dashboard assembled from the shared design system" caption="Orderific’s shared component system across restaurant products." loading="eager" decoding="sync" />
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Components drifted across products.</h2>
          <p className="lead narrow">BMS held the core restaurant setup. Customer, kitchen, delivery and Smartmenu apps used that shared context. The six apps needed consistent components and files that engineers and automated tools could identify.</p>
          <dl className="case-meta"><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Collaboration</dt><dd>Designers · PMs · engineers</dd></div><div><dt>Scope</dt><dd>Components · RTL · Theming</dd></div><div><dt>Leadership</dt><dd>Hiring · Mentoring · QA</dd></div><div><dt>Period</dt><dd>2025–26</dd></div><div><dt>Context</dt><dd>1 platform · 6 apps</dd></div></dl>
          <OrderificAppMap/>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="process">
        <div className="case-index">02 / Components</div>
        <div className="case-content">
          <h2>Keep states inside components.</h2>
          <p className="lead narrow">A review found inconsistent spacing, corners and shadows, plus missing states that forced designers to detach components. I added reusable properties and shared token rules.</p>
          <div className="change-list">
            <div><span>01</span><strong>Add missing options</strong><p>Designers could choose the type, state, help text and content from one panel.</p></div>
            <div><span>02</span><strong>Make components simpler</strong><p>Engineers could quickly see the states and content that each component needed.</p></div>
            <div><span>03</span><strong>Set shared rules first</strong><p>New components used the same spacing, corners, shadows and design tokens.</p></div>
          </div>
          <div className="input-drift-proof case-story-stack">
            <OrderificImage src="/orderific/input-drift.png" alt="Orderific welcome message form with text inputs, time fields, an editor, a switch and action buttons"/>
            <div><h3>Input drift.</h3><p>Text fields, time fields, an editor, a switch and disabled actions used different spacing, corners and states. Shared rules brought them into one system.</p></div>
          </div>
          <OrderificImage src="/orderific/component-playground.png" alt="Orderific input component playground and properties panel" caption="Input type, state, helper text and theme mode in one Figma panel."/>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="direction">
        <div className="case-index">03 / RTL + themes</div>
        <div className="case-content">
          <h2>Mirror navigation. Keep maps fixed.</h2>
          <ComparisonGrid className="direction-rule"><div><span>Move</span><p>Navigation, reading order, text alignment and direction controls.</p></div><div><span>Stay in place</span><p>Maps, charts, the logo and the phone country field.</p></div></ComparisonGrid>
          <p className="lead narrow">In BMS, direction became a component property, so designers could start in RTL without rebuilding layouts or remembering each rule. The same screens adapted to tablet and desktop.</p>
          <EvidenceGrid className="direction-images">
            <OrderificImage className="orderific-image--rtl" src="/orderific/rtl-comparison.png" alt="Orderific delivery zone interface shown in LTR and RTL" caption="Delivery zone in English LTR and Arabic RTL."/>
            <div className="theme-mode-block">
              <div className="theme-mode-note case-story-stack"><strong>Refined BMS light and dark themes with Figma variable modes.</strong><p>Both themes use the same components and layout. Only the token values change, so states and actions stay consistent.</p></div>
              <EvidenceGrid className="theme-mode-pair">
                <OrderificImage src="/orderific/reports-light.png" alt="Orderific reports interface in light mode" caption="Light mode"/>
                <OrderificImage className="orderific-image--dark" src="/orderific/dark-mode.png" alt="Orderific reports interface in dark mode" caption="Dark mode"/>
              </EvidenceGrid>
            </div>
          </EvidenceGrid>
        </div>
      </section>

      <section className="case-section case-wrap case-story-section" id="governance">
        <div className="case-index">04 / Team + governance</div>
        <div className="case-content">
          <h2>Names and checks for design, QA and engineering.</h2>
          <div className="governance-grid case-story-stack">
            <div><p className="lead">I hired and mentored two junior designers, trained QA, and documented naming and handoff rules so files were ready for engineers and automated development.</p><ul><li>Standard names for files, frames and components</li><li>Three levels of design tokens</li><li>One clear source for every component</li><li>Checks for states, content, RTL and dark mode</li></ul></div>
            <OrderificImage src="/orderific/governance.png" alt="A page from the Orderific design rules document" caption="Guide page with component and handoff checks."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome case-story-section" id="outcome">
        <div className="case-index">05 / System result</div>
        <div className="case-content">
          <h2>One shared system for design and handoff.</h2>
          <ComparisonGrid className="outcome-numbers orderific-outcomes"><article><strong>6 apps</strong><span>One connected restaurant management platform</span></article><article><strong>3</strong><span>Token layers: global, alias and component</span></article><article><strong>BMS</strong><span>LTR and RTL, light and dark, tablet and desktop</span></article></ComparisonGrid>
          <div className="learning-grid"><h3>Main learning</h3><p>The library became useful only when component rules, documentation and review checks worked together.</p></div>
          <a className="next-project" href="/purno"><span>Next case study</span><strong>Purno <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function PurnoImage({ src, alt, caption, className = '' }) {
  return <figure className={`purno-image ${className}`}>
    <ExpandableImage src={src} alt={alt} caption={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function SourceDiagram({ src, alt, className = '' }) {
  return <figure className={`source-diagram ${className}`}>
    <ExpandableImage src={src} alt={alt} caption="Product workflow and responsibilities."/>
    <figcaption>Open diagram at full size <ArrowUpRight aria-hidden="true"/></figcaption>
  </figure>;
}

function PurnoCoreFlow() {
  return <SourceDiagram className="purno-core-flow" src="/purno/core-flow.svg" alt="Purno core flow: Store app with Inventory, Cart, Order and Payment in a vertical flow, branching into Card, MFS and Cash, then Receipt. Owner app with Sales Tracking, Top Selling, Payment Methods and Work."/>;
}

function JaygaServiceDiagrams() {
  return <div className="service-diagrams">
    <SourceDiagram src="/jayga/ecosystem.svg" alt="Jayga ecosystem: the Jayga system at the centre, surrounded by Customer SMEs, Admin Team, Payments, Storage Grids, Logistics partners and Warehouse Team with their responsibilities."/>
    <SourceDiagram src="/jayga/service-journey.svg" alt="Jayga service journey: Book, Receive, Entry, Assign, Store, Monitor, Retrieve and Deliver across Client, Admin, Warehouse Team, System and Logistics Partner lanes."/>
  </div>;
}

function JaygaGridDiagram() {
  return <SourceDiagram src="/jayga/grid-model.svg" alt="Warehouse and grid: map twenty 50-square-metre grids, then place items for two users and bill by occupied space and per-grid price."/>;
}

function JaygaManagementFramework() {
  return <figure className="jayga-management-framework" id="management-framework">
    <figcaption><span>Roles and decisions</span><p>The founder held the vision and final decisions. I owned workflows, wireframes and the backlog, working with the senior engineer to define the build. We set logic and workflows first, then built and iterated.</p></figcaption>
    <p className="jayga-management-scroll-hint">Scroll to see all roles <span aria-hidden="true">→</span></p>
    <div className="jayga-management-scroll" role="region" aria-label="Jayga management diagram, scroll horizontally to view all roles" tabIndex={0}>
      <svg className="jayga-management-diagram" viewBox="0 0 760 680" role="img" aria-labelledby="jayga-management-title jayga-management-desc">
        <title id="jayga-management-title">Jayga lean-agile product management diagram</title>
        <desc id="jayga-management-desc">The founder connects to the product lead through the roadmap. The product lead collaborates with the senior engineer and motivates the team. The senior engineer works with the development team. Each role lists its responsibilities.</desc>
        <defs><marker id="jayga-management-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="currentColor" strokeWidth="1.5"/></marker></defs>
        <path className="jayga-management-link" d="M144 310 V98 H285 V140" markerEnd="url(#jayga-management-arrow)"/>
        <path className="jayga-management-link" d="M460 140 V98 H616 V310" markerEnd="url(#jayga-management-arrow)"/>
        <path className="jayga-management-link" d="M382 278 V350 H534" markerEnd="url(#jayga-management-arrow)"/>
        <path className="jayga-management-link" d="M616 474 V526" markerEnd="url(#jayga-management-arrow)"/>
        <g className="jayga-management-label"><rect x="164" y="76" width="80" height="29" rx="14"/><text x="204" y="95" textAnchor="middle">Roadmap</text></g>
        <g className="jayga-management-label"><rect x="500" y="76" width="97" height="29" rx="14"/><text x="548.5" y="95" textAnchor="middle">Collaborate</text></g>
        <g className="jayga-management-label"><rect x="397" y="327" width="82" height="29" rx="14"/><text x="438" y="346" textAnchor="middle">Motivate</text></g>
        <g className="jayga-management-node"><rect x="50" y="310" width="188" height="164" rx="12"/><text className="jayga-management-role" x="70" y="346">Founder</text><text x="70" y="376"><tspan x="70">Talks to customers</tspan><tspan x="70" dy="21">Product vision</tspan><tspan x="70" dy="21">Final decisions</tspan></text></g>
        <g className="jayga-management-node jayga-management-node--lead"><rect x="285" y="140" width="190" height="138" rx="12"/><text className="jayga-management-role" x="305" y="176">Product lead</text><text x="305" y="205"><tspan x="305">Map workflows · wireframes</tspan><tspan x="305" dy="21">Set design language</tspan><tspan x="305" dy="21">Own product backlog</tspan></text></g>
        <g className="jayga-management-node"><rect x="522" y="310" width="188" height="164" rx="12"/><text className="jayga-management-role" x="542" y="346">Senior engineer</text><text x="542" y="376"><tspan x="542">Develop and manage</tspan><tspan x="542" dy="21">Define workflow</tspan><tspan x="542" dy="21">with product lead</tspan></text></g>
        <g className="jayga-management-node"><rect x="522" y="526" width="188" height="106" rx="12"/><text className="jayga-management-role" x="542" y="563">Development team</text><text x="542" y="593">Develop</text></g>
      </svg>
    </div>
    <p className="jayga-management-principle">Logic and workflow first <span aria-hidden="true">→</span> build and iterate</p>
  </figure>;
}

function PurnoCase({ portfolio = 'design' }) {
  return <>
    <Nav caseStudy originalCase portfolio={portfolio}/>
    <main className="original-case-page purno-page" id="top">
      <section className="case-hero case-wrap purno-hero">
        <a className="back-link" href={`/${portfolio}`}><ArrowLeft/> {portfolio === 'product' ? 'Product work' : 'Selected work'}</a>
        <h1><span>A faster sale</span><span>for a shop owner</span><em>using software for the first time.</em></h1>
        <div className="case-hero-bottom">
          <p>I shaped a loose brief into a cross-platform POS for small shops in Bangladesh, bringing sales, stock and local payment methods into one daily flow.</p>
          <div className="case-tags"><span>Fintech</span><span>Multi-platform</span><span>Prototyping</span><span>Interface design</span></div>
        </div>
        <div className="purno-stage">
          <div className="stage-note"><span>Merchant app</span><strong>Desktop · tablet · mobile</strong></div>
          <ExpandableImage className="case-stage-image" src="/purno/cover.webp" alt="Purno payment cover showing the total and split amount" caption="Purno payment experience." loading="eager" decoding="sync" />
        </div>
      </section>

      {portfolio === 'product' && <section className="case-section case-wrap product-outcome" id="outcome">
        <div className="case-index">Outcome / evidence</div>
        <div className="case-content"><h2>A designed MVP supported a $10k seed pitch.</h2><p className="lead narrow">I turned a payments brief into connected store and owner flows. The funding is a business milestone, not evidence of product adoption.</p></div>
      </section>}

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Payments first. A connected retail system next.</h2>
          <div className="overview-grid"><p className="lead">Purno began with payments, then expanded to inventory, a small work tracker and sales insights for the owner.</p><p>The interface was designed for merchants with limited software experience and had to stay clear while a customer waited.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>First product designer</dd></div><div><dt>Team</dt><dd>Product designer / founder</dd></div><div><dt>Timeline</dt><dd>3 months</dd></div><div><dt>Platforms</dt><dd>Desktop · tablet · mobile</dd></div><div><dt>Methods</dt><dd>UX audit · flows · interface exploration</dd></div><div><dt>Stage</dt><dd>Funded MVP</dd></div></dl>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Research + scope</div>
        <div className="case-content">
          <h2>Compare POS and local payment patterns.</h2>
          <p className="lead narrow">I compared five POS products with bKash to identify familiar checkout patterns and assumptions that could slow local merchants down.</p>
          <div className="purno-audit">
            <PurnoImage src="/purno/competitive-audit.webp" alt="Comparative UX audit of six retail and payment products" caption="Comparative UX audit across retail and payment products."/>
          </div>
          <PurnoCoreFlow/>
          <div className="purno-principle"><strong>Design standard</strong><p>Quick to learn. Easy to scan. Shallow navigation while a customer is waiting.</p></div>
        </div>
      </section>

      <section className="case-section case-wrap" id="inventory">
        <div className="case-index">03 / Inventory</div>
        <div className="case-content">
          <h2>Flatten the category menu.</h2>
          <p className="lead narrow">The audit and flow work pointed to a need for shallow navigation at the counter. The original structure nested categories four levels deep. I reduced it to one visible level, then explored colour as a way to make the home screen easier to scan.</p>
          <PurnoImage className="purno-image--wide" src="/purno/categories-redesign.webp" alt="Purno category screen before and after flattening the hierarchy" caption="Category navigation before and after."/>
          <div className="purno-test-story">
            <div><span>Five explorations</span><p>I compared card layouts in their default and selected states. The chosen direction uses colour to separate categories while keeping the selected state visible from a distance.</p></div>
            <PurnoImage src="/purno/product-card-testing.webp" alt="Five Purno product card explorations in default and selected states" caption="Top row: default. Bottom row: selected."/>
          </div>
          <PurnoImage className="purno-image--wide" src="/purno/home-redesign.webp" alt="Purno home screen before and after colour-coded product cards" caption="The home screen moved from emoji category chips to colour-coded product cards."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="payments">
        <div className="case-index">04 / Payments</div>
        <div className="case-content">
          <h2>One checkout. Several ways to pay.</h2>
          <p className="lead narrow">Cash, card and mobile financial services sit together after the cart is final. Each flow borrows a pattern merchants already know: a card terminal, a provider picker or a clear receipt.</p>
          <div className="sale-flow" aria-label="Purno core sale flow">
            <PurnoImage src="/purno/find-product.webp" alt="Purno product selection screen" caption="Find the product"/>
            <FlowArrow/>
            <PurnoImage src="/purno/take-payment.webp" alt="Purno payment method screen" caption="Choose payment"/>
            <FlowArrow/>
            <PurnoImage src="/purno/receipt.webp" alt="Purno completed sale receipt" caption="Close the sale"/>
          </div>
          <div className="payment-method-intro">
            <strong>Split payment</strong>
            <p>Split payment stays above Cash, Card and MFS because it changes the total, not the provider.</p>
          </div>
          <div className="payment-method-story">
            <div className="payment-method-copy"><span>Card payment</span><h3>Make the phone behave like a familiar card terminal.</h3></div>
            <div className="payment-screens">
              <PurnoImage src="/purno/payment-card-tap.webp" alt="Purno card payment screen asking the customer to tap or insert a card" caption="Tap or insert"/>
              <PurnoImage src="/purno/payment-card-pin.webp" alt="Purno four-digit card PIN keypad" caption="Enter PIN"/>
              <PurnoImage src="/purno/payment-card-processing.webp" alt="Purno card payment processing screen" caption="Confirm processing"/>
            </div>
          </div>
          <div className="payment-method-story payment-method-story--reverse">
            <div className="payment-method-copy"><span>Mobile financial services</span><h3>One QR flow for four wallets.</h3><p>bKash, Nagad, Rocket and Upay share a provider picker. The usual provider stays first, and each choice leads to a Bangla QR payment.</p></div>
            <div className="payment-screens">
              <PurnoImage src="/purno/payment-mfs-provider.webp" alt="Purno mobile wallet provider picker" caption="Pick a wallet"/>
              <PurnoImage src="/purno/payment-mfs-qr.webp" alt="Purno generated Bangla QR payment screen" caption="Generate QR"/>
              <PurnoImage src="/purno/payment-mfs-processing.webp" alt="Purno mobile wallet payment processing screen" caption="Wait for scan"/>
            </div>
          </div>
          <PurnoImage className="purno-image--wide" src="/purno/transaction-redesign.webp" alt="Purno transaction detail before and after redesign" caption="The closed transaction record was cut back to the questions a merchant still needs answered."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="owner-experience">
        <div className="case-index">05 / Owner experience</div>
        <div className="case-content">
          <h2>Sales, top products and payment records.</h2>
          <div className="owner-screens">
            <PurnoImage src="/purno/owner-home.svg" alt="Purno owner home with sales metrics, peak time and top-selling products" caption="Monitor daily performance"/>
            <PurnoImage src="/purno/owner-reports.svg" alt="Purno owner reports with category sales and employee sales" caption="Compare sales by category and employee"/>
            <PurnoImage src="/purno/owner-transaction.svg" alt="Purno transaction details showing split payments, customer, employee and branch" caption="Inspect a transaction and its payments"/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id={portfolio === 'product' ? undefined : 'outcome'}>
        <div className="case-index">06 / Result</div>
        <div className="case-content">
          <h2>{portfolio === 'product' ? 'What made the flow work at the counter.' : 'From an open brief to a funded MVP.'}</h2>
          {portfolio !== 'product' && <div className="outcome-numbers purno-outcomes"><article><strong>$10k</strong><span>Seed funding raised after a pitch supported by the designed MVP</span></article><article><strong>3</strong><span>Designed for desktop, tablet and mobile</span></article></div>}
          {portfolio === 'product' ? <p className="lead narrow">Shallow menus, clear product cards and familiar local payment choices shaped the intended counter flow.</p> : <div className="learning-grid"><h3>Main learning</h3><p>Localisation goes beyond translation. Menu depth, reading distance and payment habits shape a POS for a busy counter.</p><h3>Funding</h3><p>The designed MVP supported the seed pitch. Funding does not show how the product performed after launch.</p></div>}
          <a className="next-project" href="/jayga"><span>Next case study</span><strong>Jayga <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About portfolio={portfolio}/>
  </>;
}

function JaygaImage({ src, alt, caption, className = '' }) {
  return <figure className={`jayga-image ${className}`}>
    <ExpandableImage src={src} alt={alt} caption={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function JaygaCase({ portfolio = 'design' }) {
  const isProduct = portfolio === 'product';
  return <>
    <Nav caseStudy originalCase portfolio={isProduct ? 'product' : undefined} processHref={isProduct ? '#research' : undefined}/>
    <main className={`original-case-page jayga-page ${isProduct ? 'jayga-page--product' : ''}`} id="top">
      <section className="case-hero case-wrap jayga-hero">
        <a className="back-link" href={isProduct ? '/product' : '/design'}><ArrowLeft/> {isProduct ? 'Product work' : 'Selected work'}</a>
        {isProduct && <p className="product-case-kicker">Nov 2023–Aug 2025 · Product lead · Featured project</p>}
        <h1>{isProduct ? <><span>Making storage</span><span>work <em>as a product.</em></span></> : <><span>Connecting storage,</span><span>people <em>and systems.</em></span></>}</h1>
        <div className="case-hero-bottom">
          <p>{isProduct ? 'I turned warehouse research into priorities and product rules for space, stock, delivery and billing.' : 'I led product on Jayga’s warehouse system, connecting storage, pricing, billing and delivery across the client, admin and warehouse floor.'}</p>
          <div className="case-tags"><span>Product leadership</span><span>Service design</span><span>Field research</span><span>Business rules</span></div>
        </div>
        <div className="jayga-stage" aria-label="Jayga admin and warehouse applications">
          <div className="stage-note"><span>Shared storage for SMEs</span><strong>Client / admin / warehouse</strong></div>
          <JaygaImage src="/jayga/admin-requests.png" alt="Jayga admin console showing active warehouse grid requests"/>
          <JaygaImage src="/jayga/delivery-mobile.png" alt="Jayga mobile app showing a warehouse delivery request"/>
        </div>
      </section>

      {isProduct && <section className="case-section case-wrap product-outcome" id="outcome"><div className="case-index">01 / Outcome and status</div><div className="case-content"><h2>One order record connected space, stock and billing.</h2><p className="lead narrow">The 2024 storage work produced client and admin flows and a mobile floor concept. It also led to a rack-pricing model with up to 3× potential revenue per m². The model was approved for future work but was not built; actual revenue is unknown.</p></div></section>}

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">{isProduct ? '02 / Scope and role' : '01 / Overview'}</div>
        <div className="case-content">
          <h2>Replace scattered handoffs.</h2>
          <div className="overview-grid"><p className="lead">Warehouse teams used spreadsheets and handwritten logs. Storage, billing and delivery had no shared order record, so orders took days.</p><p>Jayga rents shared warehouse space to businesses that need less than a full facility. I designed the system that linked each customer’s rented space, stock and bill.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>Product lead</dd></div><div><dt>Team</dt><dd>{isProduct ? '8-person team · 5 engineers' : 'Product lead / 5 engineers / founder'}</dd></div><div><dt>Project period</dt><dd>Nov 2023–Aug 2025</dd></div><div><dt>Experiences</dt><dd>2 web views · 1 mobile design</dd></div><div><dt>Methods</dt><dd>Interviews · contextual inquiry</dd></div><div><dt>Storage scope</dt><dd>2024 · 4 months</dd></div></dl>
          <p className="lead narrow">{isProduct ? 'I led the eight-person team and owned the backlog, working with five engineers on grid and billing rules. The founder held the product vision and final decisions. This case covers four months of storage work within the longer Jayga project.' : 'I mapped workflows, defined the grid and billing rules, set the design language and owned the product backlog. I worked with five engineers and the founder, who held the product vision and final decisions.'}</p>
          <JaygaManagementFramework/>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">{isProduct ? '03 / Service journey' : '02 / Core system'}</div>
        <div className="case-content">
          <h2>Trace each order across teams.</h2>
          <p className="lead narrow">{isProduct ? 'The service journey covered booking through delivery across the client, admin, warehouse team and logistics partner. It identified the handoffs that needed one shared record.' : 'A client starts an order, an admin confirms space and billing, and warehouse staff verify the stock—all on the same record.'}</p>
          <JaygaServiceDiagrams/>
          <div className="jayga-apps">
            <article><span>Web · Client</span><h3>Client dashboard</h3><p>Starts orders and shows used space, open requests and the running daily bill.</p></article>
            <article><span>Web · Admin</span><h3>Admin console</h3><p>Handles requests, grid assignment, payments, billing and operational oversight.</p></article>
            <article><span>Mobile · Floor</span><h3>Warehouse Manager</h3><p>{isProduct ? 'Designed for stock assignment and count confirmation on the warehouse floor; planned for a later release.' : 'Guides stock assignment and confirms counts from the warehouse aisle.'}</p></article>
          </div>
          <div className="jayga-screen-pair">
            <JaygaImage src="/jayga/admin-requests.png" alt="Jayga admin console with warehouse grid requests" caption="Admin: every request with its warehouse, item, duration and status."/>
            <JaygaImage src="/jayga/client-dashboard.png" alt="Jayga client dashboard with warehouse usage and order details" caption="Client: used space, open requests and the current bill."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="grids">
        <div className="case-index">{isProduct ? '04 / Product rules' : '03 / Grid logic'}</div>
        <div className="case-content">
          <h2>Grid IDs connect stock and billing.</h2>
          <JaygaGridDiagram/>
          <p className="lead narrow">{isProduct ? 'I chose fixed grid IDs so the team could assign stock and charge for the space it used. Grid assignment and floor checks came before a live space count.' : 'I divided the warehouse into fixed grids with unique IDs. A grid is what a customer rents, where an item is assigned and what the bill is calculated from.'}</p>
          <div className="jayga-grid-story">
            <div><h3>Split one item across grids.</h3><p>Each split stays on the item record. Because live occupancy was delayed, an “Assigned” tag showed which units had been placed.</p><p className="evidence-note">Next system improvement: replace the temporary tag with a live occupancy count.</p></div>
            <JaygaImage src="/jayga/assign-grids.png" alt="Jayga interface for splitting an item quantity across warehouse grids" caption="Grid assignment with the temporary Assigned marker."/>
          </div>
          <JaygaImage className="jayga-image--wide" src="/jayga/payment-summary.png" alt="Jayga client payment summary with assigned grids, quantity and advance due" caption="Before payment, every split becomes one checkable summary."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="research">
        <div className="case-index">{isProduct ? '05 / Research and opportunity' : '04 / Field research'}</div>
        <div className="case-content">
          <h2>A pricing model from unused rack space.</h2>
          <div className="jayga-field">
            <JaygaImage src="/jayga/warehouse-visit.jpg" alt="A warehouse aisle observed during Jayga field research" caption="Warehouse field visit."/>
            <div><p className="lead">I proposed rack-level pricing so each level could be filled and priced separately.</p><div className="projection-note"><span>Modelled, not measured</span><strong>~3× revenue per m²</strong><p>Stakeholders approved the pricing idea for future work, but it was not built. The actual revenue change is unknown.</p></div></div>
          </div>
          <div className="research-summary">
            <div><span>23 businesses surveyed</span><h3>Prioritise NGOs and raw-material businesses.</h3><p>I compared six customer groups by demand, cost, item value and growth. Survey answers on price, distance, security and retrieval shaped the first customer focus.</p></div>
            <JaygaImage src="/jayga/opportunity-matrix.png" alt="Jayga opportunity matrix comparing customer segments by cost and demand" caption="Six customer groups compared by storage cost and demand."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="delivery">
        <div className="case-index">{isProduct ? '06 / Delivery decisions' : '05 / Delivery + billing'}</div>
        <div className="case-content">
          <h2>{isProduct ? 'Make stock checks part of the delivery flow.' : 'Floor confirmation controls record changes.'}</h2>
          <p className="lead narrow">{isProduct ? 'I designed a flow from the admin request to a planned mobile floor check. Staff would see the source grids and confirm the physical count. A mismatch would stop the flow for a person to review before the order record changed.' : 'A delivery starts in the admin console, reaches the warehouse aisle on mobile, and lists the grids to pull from. If the physical count does not match, a person checks it before the delivery continues.'}</p>
          <div className="warehouse-flow">
            <JaygaImage src="/jayga/delivery-request.png" alt="Jayga admin interface for selecting stored items for delivery" caption="Admin selects the client, items and quantities."/>
            <FlowArrow/>
            <JaygaImage src="/jayga/assignment-mobile.png" alt="Jayga mobile list of grids used for a delivery" caption={isProduct ? 'Mobile concept: show staff the source grids.' : 'The floor app lists the source grids.'}/>
            <FlowArrow/>
            <JaygaImage src="/jayga/count-mobile.png" alt="Jayga mobile screen confirming a physical stock count" caption={isProduct ? 'Mobile concept: confirm the count or report a mismatch.' : 'Staff confirm the count or report a mismatch.'}/>
          </div>
          <div className="billing-story">
            <div><h3>Empty a grid. Lower the bill.</h3><p>Invoices use the dates, duration and space already stored on the order. When warehouse staff confirm that a grid is empty, the client stops paying for it.</p></div>
            <div className="billing-images"><JaygaImage src="/jayga/invoice.png" alt="Jayga invoice generator with live invoice preview" caption="Admin review before sending."/><JaygaImage src="/jayga/billing.png" alt="Jayga client billing dashboard with upcoming and due invoices" caption="Upcoming and due bills on the client side."/></div>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id={isProduct ? 'reflection' : 'outcome'}>
        <div className="case-index">{isProduct ? '07 / Leadership and next steps' : '06 / Delivery and decisions'}</div>
        <div className="case-content">
          <h2>{isProduct ? 'Use interfaces to align the team on workable rules.' : 'Own the rules that connect the product and the operation.'}</h2>
          {isProduct ? <p className="lead narrow">The next steps were a live space count and the planned mobile floor app, using the same rules as the web views.</p> : <><p className="lead narrow">I led product logic and end-to-end flows across the client, admin and warehouse experiences. Under a tight timeline, I prioritised decisions that could block engineering and kept lower-risk details open for iteration.</p><p>Flows and prototypes became shared working models for responsibilities, states and edge cases. I mapped workflows, set the design language and owned the backlog; the founder held the product vision and final decisions.</p></>}
          <div className="learning-grid"><h3>Main learning</h3><p>Managing a complex system with the team meant treating interfaces as the source of truth. They gave us a shared way to discuss the underlying logic and shape workflows that were technically feasible, met business goals and served user needs.</p>{!isProduct && <><h3>Next priorities</h3><p>Bring the planned mobile floor app into a later release, update occupancy live, and strengthen the design system rules across the three experiences.</p></>}</div>
          <a className="next-project" href={isProduct ? '/product/purno' : '/portfolio'}><span>Next case study</span><strong>{isProduct ? 'Purno' : 'Portfolio'} <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About portfolio={isProduct ? 'product' : undefined}/>
  </>;
}

function AboutMe() {
  const modern = React.useContext(PortfolioDesignContext);
  const experience = [
    { company: 'Zevian', role: 'Founder · Designer and manager', duration: 'Feb 2026 – Present', summary: 'Building AI tools that help managers investigate sales performance.' },
    { company: 'AutomatedPros · Orderific', role: 'Product designer', duration: 'Jun 2025 – Aug 2026', summary: 'Scaled design systems and improved handover across six restaurant apps.' },
    { company: 'Purno', role: 'Product designer', duration: 'May 2024 – May 2025', summary: 'Designed a retail POS connecting checkout, inventory and reporting.' },
    { company: 'Jayga', role: 'Product lead', duration: 'Nov 2023 – Aug 2025', summary: 'Led product strategy and workflows across client, admin and warehouse tools.' },
  ];
  const interests = [
    { title: 'Video games', description: 'I love a good single-player story, a difficult level and the feeling of finally getting past it.' },
    { title: 'Football', description: 'I play when I can, follow Manchester United, and keep hoping the next match will be the one.' },
    { title: 'Travelling', description: 'I like wandering around new places, trying food I cannot find at home and taking far too many photos.' },
  ];

  return <>
    <Nav aboutPage/>
    <main className="about-page" id="top">
      <header className="about-hero section">
        <div className="about-hero-heading">
          <h1>Hello, I’m Reza.<br/><em>I shape ideas into<br/>working products.</em></h1>
          <img className="about-portrait" src="/reza-and-cat.jpg" alt="Reza holding his cat" width="1152" height="2048" decoding="async"/>
        </div>
        <div className="about-intro">
          <p>I’m a product designer and founder in Dhaka, with a computer science background.</p>
          <p>I enjoy the space between design and working software: finding the real problem, shaping the system, building enough to test it and improving the result through evidence.</p>
        </div>
      </header>

      {modern && <>
        <section className="about-background section" aria-labelledby="about-experience-title">
          <h2 id="about-experience-title">Experience</h2>
          <ul className="about-experience-list">
            {experience.map(({ company, role, duration, summary }) => <li key={company}>
              <div><h3>{company}</h3><p className="about-duration">{duration}</p></div>
              <p className="about-role">{role}</p>
              <p>{summary}</p>
            </li>)}
          </ul>
        </section>
        <section className="about-background section" aria-labelledby="about-education-title">
          <h2 id="about-education-title">Education</h2>
          <div className="about-education-grid">
            <div><h3>Independent University, Bangladesh</h3><p>Bachelor of Computer Science</p></div>
            <div><h3>The AI-Driven Product Designer</h3><p>LinkedIn</p></div>
            <div><h3>Data-Driven Product Management</h3><p>LinkedIn</p></div>
            <div><h3>Project Management Professional</h3><p>Google</p></div>
          </div>
        </section>
      </>}

      <section className="personality-highlight section">
        <div>
          <h2>INTJ</h2>
          <p>I like time to think, getting absorbed in new ideas and the quiet satisfaction of figuring something out. This profile explains a lot about how I am.</p>
        </div>
        <a href="https://www.16personalities.com/intj-careers" target="_blank" rel="noreferrer">Read the profile <ArrowUpRight/></a>
      </section>

      <section className="about-values section">
        <p>What guides my work</p>
        <h2>Clarity over decoration.<br/>Evidence over assumption.<br/>Progress over perfection.</h2>
      </section>

      <section className="interests-section section" id="interests">
        <div className="interests-head"><h2>Outside work</h2></div>
        <div className="interest-list">
          {interests.map((interest, index) => <article className="interest-row" key={interest.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </article>)}
        </div>
      </section>
    </main>
    <About/>
  </>;
}

const workflowMethods = [
  {
    title: 'Audit and iteration loop',
    description: 'I move between Claude and GPT to audit prototypes, question weak decisions and improve each round. I add my own direction wherever product judgment is needed.',
    visual: 'loop',
  },
  {
    title: 'Variant exploration',
    description: 'I create several versions of a journey, flow or interface, then compare them and select the strongest direction. When useful, I personalize the result for a specific user or context.',
    visual: 'variants',
  },
  {
    title: 'SQL, Supabase and auth',
    description: 'I generate and review SQL scripts, run them in Supabase, and build authentication and update flows. Each iteration improves the schema, permissions and product behaviour.',
    visual: 'database',
  },
  {
    title: 'Git to production',
    description: 'I use Git to keep changes traceable, test work in small commits and push production-ready code without losing earlier decisions.',
    visual: 'git',
  },
  {
    title: 'Code back into design',
    description: 'I use Codex to read working code and create a structured prompt with exact layout, component, state and token details. I bring it into Figma Make, extract the design tokens and continue from the existing product instead of starting again.',
    visual: 'code-design',
  },
  {
    title: 'Research synthesis',
    description: 'I turn scattered research into useful frames such as personas, SWOT analysis, competitor reviews and feature benchmarks—only when they help answer the product question.',
    visual: 'research',
  },
  {
    title: 'Living knowledge base',
    description: 'I connect Drive, Docs and Sheets into a shared knowledge base. New findings update the source sheet, so future analysis starts with better context.',
    visual: 'knowledge',
  },
  {
    title: 'Breaking the template feel',
    description: 'I use design skills, plugins, mood boards and personal references to remove generic AI patterns. The goal is work that feels specific to the product, not generated by default.',
    visual: 'craft',
  },
  {
    title: 'Prompt refinement and review',
    description: 'I pass prompts and outputs between Claude Code and Codex to find gaps, sharpen instructions and review the result from a second perspective.',
    visual: 'prompt',
  },
];

function WorkflowVisual({ type }) {
  if (type === 'loop') return <div className="workflow-visual loop-visual" aria-hidden="true">
    <div className="loop-track"><i/><i/><i/><i/></div>
    <div className="loop-labels"><span>Prototype</span><span>AI audit</span><span>My decision</span><span>Improve</span></div>
    <div className="loop-cursor">Reviewing</div>
  </div>;
  if (type === 'variants') return <div className="workflow-visual variant-visual" aria-hidden="true">
    {[0,1,2].map((item) => <div className="variant-frame" key={item}><b>0{item + 1}</b><i/><i/><i/><span>{item === 1 ? 'Selected' : 'Compare'}</span></div>)}
  </div>;
  if (type === 'database') return <div className="workflow-visual database-visual" aria-hidden="true">
    <div className="code-sheet"><span>create policy</span><b>authenticated users</b><span>update profile</span><span>returning *</span></div>
    <div className="db-status"><i/><strong>Supabase</strong><span>Policy passed</span></div>
  </div>;
  if (type === 'git') return <div className="workflow-visual git-visual" aria-hidden="true">
    <div className="git-rail"><i/><i/><i/><i/></div><div className="git-copy"><span>shape flow</span><span>review change</span><span>test build</span><strong>production</strong></div>
  </div>;
  if (type === 'code-design') return <div className="workflow-visual code-design-visual" aria-hidden="true">
    <div className="code-design-flow">
      <span><small>Input</small><strong>Working code</strong></span><i/>
      <span className="code-design-active"><small>Codex</small><strong>Structured prompt</strong></span><i/>
      <span><small>Build</small><strong>Figma Make</strong></span>
    </div>
    <div className="token-strip"><small>Extract tokens</small><span>Colour</span><span>Type</span><span>Space</span><span>Radius</span><strong>Continue in Figma</strong></div>
  </div>;
  if (type === 'research') return <div className="workflow-visual research-visual" aria-hidden="true">
    <div className="research-inputs"><span>Interviews</span><span>Market</span><span>Usage</span><span>Competitors</span></div><div className="research-output"><small>SYNTHESIS</small><strong>One product direction</strong><span>Evidence attached</span></div>
  </div>;
  if (type === 'knowledge') return <div className="workflow-visual knowledge-visual" aria-hidden="true">
    <span>Drive</span><i/><span>Docs</span><i/><span>Sheets</span><div>New finding added</div>
  </div>;
  if (type === 'craft') return <div className="workflow-visual craft-visual" aria-hidden="true">
    <div className="template-side"><i/><i/><i/></div><ArrowUpRight/><div className="crafted-side"><strong>Specific</strong><span>Context</span><span>Voice</span><span>Product logic</span></div>
  </div>;
  return <div className="workflow-visual prompt-visual" aria-hidden="true">
    <span>Claude Code</span><i>Prompt</i><strong>Review + direction</strong><i>Refined</i><span>Codex</span>
  </div>;
}

function AIWorkflows() {
  return <>
    <Nav caseStudy/>
    <main className="workflow-page" id="top">
      <header className="workflow-hero section">
        <a className="back-link" href="/design"><ArrowLeft/> Back to selected work</a>
        <h1>AI helps me move<br/>faster. <em>I keep the<br/>direction human.</em></h1>
        <div className="workflow-intro"><p>I use AI across product design, research and development—not as a shortcut to a finished answer, but as a way to explore, test and improve the work.</p><span>My working system · always evolving</span></div>
        <WorkflowVisual type="loop"/>
      </header>

      <section className="workflow-methods section" id="process">
        <div className="workflow-methods-head"><h2>Processes I use</h2></div>
        <div className="workflow-list">
          {workflowMethods.map((method, index) => <article className={`workflow-row workflow-row--${method.visual}`} key={method.title}>
            <span className="workflow-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="workflow-copy"><h3>{method.title}</h3><p>{method.description}</p></div>
            {index === 0 ? <div className="workflow-first-note"><span>Repeated until the decision holds up</span></div> : <WorkflowVisual type={method.visual}/ >}
          </article>)}
        </div>
      </section>

      <section className="workflow-learning section" id="outcome">
        <h2>The tools will change.<br/><em>The habit stays:</em> question,<br/>test and improve.</h2>
        <a href="mailto:rezahasan1198@gmail.com">Compare workflows with me <ArrowUpRight/></a>
      </section>
    </main>
    <About/>
  </>;
}

function AIWorkflowTeaser() {
  return <section className="workflow-teaser section">
    <a href="/ai-workflows">
      <div><h2>How I work with AI</h2><p>AI-assisted prototyping, research synthesis, design-to-code, production code and the human decisions between them.</p><span>Explore my workflows <ArrowUpRight/></span></div>
      <WorkflowVisual type="loop"/>
    </a>
  </section>;
}

const sprintProof = [
  {
    name: 'Zevian', kind: 'AI product · current prototype', href: '/zevian',
    problem: 'From signal to decision',
    detail: 'Managers can check the evidence, add context and decide what to do.',
    images: [{ src: '/Full-Zevian.png', alt: 'Zevian findings list and investigation drawer with supporting signals, missing context and manager actions', caption: 'Investigation drawer · prototype' }],
  },
  {
    name: 'Purno', kind: 'Retail · payments', href: '/purno',
    problem: 'A simpler sale at the counter',
    detail: 'Find a product, choose a payment method and finish the sale.',
    images: [
      { src: '/purno/find-product.webp', alt: 'Purno product selection screen', caption: 'Find a product during a sale.' },
      { src: '/purno/take-payment.webp', alt: 'Purno payment method selection screen', caption: 'Choose the next payment step.' },
    ],
  },
  {
    name: 'Jayga', kind: 'Storage · operations', href: '/jayga',
    problem: 'Stock assigned to the right grids',
    detail: 'One view shows each item, its grid and the quantity to verify.',
    images: [
      { src: '/jayga/assign-grids.png', alt: 'Jayga desktop grid assignment interface with item quantities, assigned status, available grids and design annotations', caption: 'Desktop: assign item quantities to available grids.' },
      { src: '/jayga/assignment-mobile.png', alt: 'Jayga mobile grid assignment screen showing items, grids, quantities and a confirm action', caption: 'Mobile: verify each assignment.' },
    ],
  },
];

function SprintPage() {
  const modern = React.useContext(PortfolioDesignContext);
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) videoRef.current?.pause();
  }, []);
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play().catch(() => setVideoPaused(true));
    else videoRef.current.pause();
  };
  const steps = [
    ['01', 'Understand', 'Find the real problem.'],
    ['02', 'Structure', 'Map the key flow.'],
    ['03', 'Design', 'Make the new screens.'],
    ['04', 'Handle states', 'Cover errors and edge cases.'],
    ['05', 'Hand off', 'Give engineers clear specs.'],
  ];
  return <>
    <Nav sprintPage/>
    <main className="sprint-page" id="top">
      <section className="sprint-hero section" aria-labelledby="sprint-title">
        <div className="sprint-hero-copy">
          <span className="sprint-kicker">2-week product design sprint</span>
          <h1 id="sprint-title">I make complex flows <em>clearer.</em></h1>
          <p>For B2B SaaS and AI teams with one important workflow that needs fixing.</p>
          <div className="sprint-hero-action"><a className="sprint-button" href={sprintEmail}>Start a 2-week sprint <ArrowUpRight/></a><span>One defined problem · Starting at $2,000</span></div>
        </div>
        <figure className="sprint-hero-proof">
          <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/Full-Zevian.png" aria-label="Zevian prototype showing a manager review a performance finding and its supporting evidence" onPlay={() => setVideoPaused(false)} onPause={() => setVideoPaused(true)}><source src="/zevian/demo-loop.mp4" type="video/mp4"/></video>
          <figcaption><span>Zevian prototype</span><span>Signal → evidence → context → decision</span><button type="button" onClick={toggleVideo} aria-label={videoPaused ? 'Play Zevian preview' : 'Pause Zevian preview'}>{videoPaused ? 'Play video' : 'Pause video'}</button></figcaption>
        </figure>
      </section>

      <section className="sprint-section section" id="proof" aria-labelledby="proof-title">
        <div className="sprint-section-head"><span>Selected work / 01</span><div><h2 id="proof-title">Real product problems. Clearer flows.</h2></div></div>
        <div className="sprint-proof-list">{sprintProof.map(item => <article className={`sprint-proof sprint-proof--${item.name.toLowerCase()}`} key={item.name}>
          <div className="sprint-proof-copy"><span>{item.kind}</span><h3>{item.name}</h3><strong>{item.problem}</strong><p>{item.detail}</p><a href={item.href}>View full case study <ArrowUpRight/></a></div>
          <div className={`sprint-proof-images sprint-proof-images--${item.images.length}`}>{item.images.map(image => <figure key={image.src}><ExpandableImage src={image.src} alt={image.alt} caption={image.caption}/><figcaption>{image.caption}</figcaption></figure>)}</div>
        </article>)}</div>
      </section>

      <section className="sprint-section sprint-offer section" id="sprint" aria-labelledby="offer-title">
        <div className="sprint-section-head"><span>The sprint / 02</span><div><h2 id="offer-title">One problem, start to handoff.</h2></div></div>
        <ol className="sprint-steps">{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        <div className="sprint-scope"><div><span>What you get</span><p>A clear flow, polished UI, key states, a useful prototype and a handoff your engineers can use. We agree on the scope first.</p></div><div><span>Time and price</span><p>About two weeks. Starts at $2,000; most scopes are $2,000–$3,000.</p></div></div>
      </section>

      <section className="sprint-partnership section" aria-labelledby="partnership-title"><span>After the sprint</span><div><h2 id="partnership-title">Need help after the sprint?</h2><p>I can stay with your team for new features, design updates and engineering support.</p></div></section>

      <section className="sprint-close section" aria-labelledby="close-title"><span>Start with the hard part</span><h2 id="close-title">Have a messy product flow? <em>Let’s make it clearer.</em></h2><p>Send me the workflow. I’ll tell you if a sprint can help.</p><a className="sprint-button" href={sprintEmail}>Discuss a sprint <ArrowUpRight/></a></section>
    </main>
    {modern ? <PortfolioFooter/> : <footer className="sprint-footer section"><div className="footer-row"><Mark/><span>Based in Dhaka · Working worldwide</span><div><a href="/">Portfolio</a><a href="mailto:rezahasan1198@gmail.com">Email Reza</a><a href="https://www.linkedin.com/in/reza1198/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/RezaAlHassan" target="_blank" rel="noreferrer">GitHub</a></div><span>© 2026</span></div></footer>}
  </>;
}

export function App({ initialPath = null, modern = false }) {
  const path = (initialPath ?? window.location.pathname).replace(/\/$/, '');
  useEffect(() => {
    const [title, description] = pageMetadata[path || '/'] || pageMetadata['/'];
    document.title = title;
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = description;
  }, [path]);
  let page;
  if (path === '' || path === '/') page = <PortfolioEntry/>;
  else if (path === '/product') page = <><Nav portfolio="product"/><main><ProductHero/><SelectedProjects portfolio="product"/></main><About portfolio="product"/></>;
  else if (path === '/design') page = <><Nav/><main><Hero/><SelectedProjects/><AIWorkflowTeaser/><DesignSystems/></main><About/></>;
  else if (path === '/product/jayga') page = <JaygaProductCase/>;
  else if (path === '/product/zevian') page = <ZevianCase portfolio="product"/>;
  else if (path === '/product/purno') page = <PurnoCase portfolio="product"/>;
  else if (path === '/product/orderific') page = <ProductOrderificCase/>;
  else if (path === '/zevian') page = <ZevianCase/>;
  else if (path === '/zevian-hrms') page = <ZevianHrmsCase/>;
  else if (path === '/orderific') page = <OrderificCase/>;
  else if (path === '/purno') page = <PurnoCase/>;
  else if (path === '/jayga') page = <JaygaCase/>;
  else if (path === '/portfolio') page = <PortfolioCase/>;
  else if (path === '/ai-workflows') page = <AIWorkflows/>;
  else if (path === '/about') page = <AboutMe/>;
  else if (path === '/sprint') page = <SprintPage/>;
  else page = <PortfolioEntry/>;
  return <PortfolioDesignContext.Provider value={modern}><CaseImageProvider>{page}</CaseImageProvider></PortfolioDesignContext.Provider>;
}


export { CaseImageProvider, ExpandableImage, pageMetadata };
