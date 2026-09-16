import React, { useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400-italic.css';
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import './styles.css';

const projects = [
  {
    title: 'Orderific',
    description: 'Built a shared component system that helped six restaurant products stay consistent across English LTR and Arabic RTL.',
    tags: ['Design system', 'RTL/LTR', '6 products'],
    year: '2025–26',
    visual: 'rtl',
    url: '/orderific',
  },
  {
    title: 'Purno',
    description: 'Turned a loose scope into a POS workflow that connects shop sales, stock and local payment methods.',
    tags: ['POS', 'Retail workflow', 'Payments'],
    year: '2024–25',
    visual: 'pos',
    url: '/purno',
  },
  {
    title: 'Jayga',
    description: 'Designed one warehouse workflow across storage, pricing, billing and fulfilment for three connected apps.',
    tags: ['Warehouse ops', 'Product lead', '3 apps'],
    year: '2023–25',
    visual: 'pipeline',
    url: '/jayga',
  },
];

const pageMetadata = {
  '/': ['Reza — Product designer for B2B and AI products', 'Portfolio of Reza Al Hassan, a product designer with a CS background who turns complex B2B and AI workflows into clear, buildable products.'],
  '/zevian': ['Zevian — AI performance workflow case study', 'How Zevian turns weekly work reports into evidence-backed performance signals that managers can review and question.'],
  '/zevian-hrms': ['Zevian HRMS — Interface system case study', 'An early HRMS concept and reusable interface system covering attendance, employee records, calendars, approvals and work policies.'],
  '/orderific': ['Orderific — Design system case study', 'A shared component system across six restaurant products with RTL, LTR and theme-mode support.'],
  '/purno': ['Purno — POS product case study', 'A point-of-sale system connecting shop sales, inventory, payments and daily retail operations.'],
  '/jayga': ['Jayga — Warehouse operations case study', 'A warehouse order system connecting storage, pricing, billing and fulfilment.'],
  '/portfolio': ['Portfolio redesign — Reza Al Hassan', 'How this portfolio moved from moodboards and section studies into one clear editorial design system.'],
  '/ai-workflows': ['AI workflows — Reza Al Hassan', 'How Reza uses AI for research synthesis, prototyping, production code and product exploration while keeping people in control.'],
  '/about': ['About Reza Al Hassan', 'Product designer and founder in Dhaka working on B2B systems, AI workflows and clarity-critical products.'],
};

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

function ExpandableImage({ src, alt, caption = '', loading = 'lazy', decoding = 'async', className = '' }) {
  const openImage = React.useContext(ImageModalContext);
  return <button className={`image-expand-trigger ${className}`} type="button" onClick={() => openImage({ src, alt, caption })} aria-label={`Expand image: ${alt}`}>
    <img src={src} alt={alt} loading={loading} decoding={decoding}/>
  </button>;
}

function Mark({ home = false }) {
  return <a className="mark" href={home ? '/' : '#top'} aria-label={home ? 'Back to home' : 'Back to top'}><span>REZA A</span><i aria-hidden="true" /></a>;
}

function Nav({ caseStudy = false, aboutPage = false }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Main navigation">
        <Mark home={caseStudy || aboutPage} />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-menu" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        <div id="main-menu" className={`nav-links ${open ? 'open' : ''}`}>
          {caseStudy && <a href="/" onClick={() => setOpen(false)}><ArrowLeft className="nav-back-icon"/> All work</a>}
          {aboutPage && <a href="/" onClick={() => setOpen(false)}><ArrowLeft className="nav-back-icon"/> All work</a>}
          {!caseStudy && !aboutPage && <a href="#work" onClick={() => setOpen(false)}>Work</a>}
          <a href="/ai-workflows" onClick={() => setOpen(false)}>AI workflows</a>
          {caseStudy && <a href="#process" onClick={() => setOpen(false)}>Process</a>}
          {caseStudy && <a href="#outcome" onClick={() => setOpen(false)}>Outcome</a>}
          {aboutPage ? <a href="#interests" onClick={() => setOpen(false)}>Interests</a> : <a href="/about" onClick={() => setOpen(false)}>About</a>}
          <a className="nav-cta" href="mailto:rezahasan1198@gmail.com">Let’s talk <ArrowUpRight /></a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <h1>
        <span>PRODUCT DESIGNER</span>
        <span><em>for</em> EARLY B2B</span>
        <span>&amp; AI PRODUCTS.</span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-copy">
          <p>I turn messy workflows into clear MVPs, interfaces and product decisions — with a CS background and founder-level ownership.</p>
        </div>
        <a href="#work" className="scroll-link">See selected work <ArrowDown /></a>
      </div>
    </section>
  );
}

function ZevianVisual() {
  return (
    <div className="zevian-visual" role="img" aria-label="Illustrative Zevian interface highlighting evidence-backed scoring, manager overrides and live customer use">
      <div className="product-window">
        <div className="window-bar"><span>Zevian</span><div><i /><i /><i /></div></div>
        <div className="window-body">
          <div className="side-rail"><b>Z</b><i/><i/><i/><i/></div>
          <div className="analysis-panel">
            <span className="tiny-label">ILLUSTRATIVE PRODUCT VIEW</span>
            <h3>What needs attention?</h3>
            <div className="signal-row evidence"><span>Collaboration</span><b>Recurring theme</b></div>
            <div className="signal-row evidence"><span>Delivery pace</span><b>New signal</b></div>
            <div className="signal-row evidence"><span>Role clarity</span><b>Stable</b></div>
            <div className="evidence-meta"><span><small>Source</small>Weekly report</span><span><small>Override</small>Available</span><span><small>Confidence</small>Medium</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Featured() {
  return (
    <section className="section featured" id="work">
      <div className="section-head"><h2>One product,<br/>from the inside.</h2><p>Founder-led product design for a manager workflow with visible evidence, confidence and human control.</p></div>
      <a className="feature-card" href="/zevian">
        <div className="feature-copy">
          <div className="feature-top"><span className="tag">Founder product · AI workflow</span><span>2026—Now</span></div>
          <div><h3>Zevian</h3><p>Helps managers understand what changed in team performance, review the evidence and prepare for better coaching conversations.</p><div className="feature-tags"><span>Founder-led</span><span>B2B SaaS</span><span>AI trust</span><span>React prototype</span></div></div>
          <div className="feature-link">View case study <ArrowUpRight /></div>
        </div>
        <ZevianVisual />
      </a>
    </section>
  );
}

function ProjectVisual({ type }) {
  if (type === 'rtl') return (
    <div className="project-art rtl-art" aria-hidden="true">
      <div className="direction-label"><span>LTR</span><span>RTL</span></div>
      <div className="rtl-window rtl-ltr"><aside><i/><i/><i/></aside><div className="rtl-content"><b>Delivery zones</b><span/><span/><span/></div></div>
      <div className="rtl-window rtl-rtl" dir="rtl"><aside><i/><i/><i/></aside><div className="rtl-content"><b>مناطق التوصيل</b><span/><span/><span/></div></div>
      <div className="language-switch"><span>EN</span><b>LTR / RTL</b><span>AR</span></div>
    </div>
  );
  if (type === 'pos') return (
    <div className="project-art pos-art" aria-hidden="true">
      <div className="pos-window"><div className="pos-items"><small>ILLUSTRATIVE POS VIEW</small><span>Tea</span><span>Rice · 2kg</span><span>Soap</span></div><div className="pos-cart"><small>CART · 3 ITEMS</small><b>৳ 1,240</b><div className="pay-methods"><span>Cash</span><span>Card</span><span>Mobile</span></div></div></div>
      <div className="receipt"><b>PAID</b><span>Purno POS</span></div>
    </div>
  );
  return (
    <div className="project-art pipeline-art" aria-hidden="true">
      <div className="pipeline"><span>Order</span><span>Storage</span><span>Billing</span><span>Fulfilled</span><i/></div>
      <div className="order-ticket"><small>ILLUSTRATIVE ORDER</small><b>Ready to move</b><span>8 items</span></div>
    </div>
  );
}

function SelectedProjects() {
  return (
    <section className="section projects">
      <div className="projects-title"><h2>Selected projects</h2><p>Clear product work across design systems, retail and warehouse operations.</p></div>
      <div className="project-list">
        {projects.map((p) => <a href={p.url} className="project-row" key={p.title}>
          <div className="project-meta"><span>{p.year}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></div>
          <ProjectVisual type={p.visual}/>
        </a>)}
      </div>
    </section>
  );
}

function DesignSystems() {
  return (
    <section className="systems-section section">
      <div className="systems-heading"><h2>Briefs</h2></div>
      <div className="system-cases">
        <a href="/portfolio" className="system-case orderific-system">
          <span>Portfolio</span><h3>Redesigned the portfolio through moodboard-led exploration, clearer storytelling and a consistent editorial system.</h3><ArrowUpRight />
        </a>
        <a href="/zevian-hrms" className="system-case hrms-system">
          <span>Zevian HRMS</span><h3>Refined an existing theme-mode system using light/dark variable modes across HR dashboards, records and reports.</h3><ArrowUpRight />
        </a>
      </div>
    </section>
  );
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
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1>A portfolio built<br/><em>through iteration.</em></h1>
        <div className="case-hero-bottom"><p>I rebuilt the portfolio around a clearer project hierarchy and one editorial system, using moodboards to test the visual direction.</p><div className="case-tags"><span>Portfolio</span><span>Visual direction</span><span>Design system</span><span>2026</span></div></div>
        <div className="case-stage portfolio-stage"><PortfolioVisual/></div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Context</div>
        <div className="case-content">
          <h2>Start with a feeling.<br/>Build toward a system.</h2>
          <div className="overview-grid"><p className="lead">I tested each reference as a section or interaction, then kept only the patterns that supported a consistent hierarchy and rhythm.</p><p>I kept the useful qualities—editorial spacing, clear type and stronger project visuals—then removed extra containers and gradients.</p></div>
          <dl className="case-meta"><div><dt>Project</dt><dd>Personal portfolio</dd></div><div><dt>Role</dt><dd>Designer · Developer</dd></div><div><dt>Approach</dt><dd>Moodboard-led iteration</dd></div><div><dt>Focus</dt><dd>Story · Hierarchy · Systems</dd></div><div><dt>Output</dt><dd>Responsive website</dd></div><div><dt>Status</dt><dd>Current redesign</dd></div></dl>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Direction</div>
        <div className="case-content">
          <h2>The references became principles, not templates.</h2>
          <div className="portfolio-direction">{direction.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="case-section case-wrap" id="outcome">
        <div className="case-index">03 / Result</div>
        <div className="case-content">
          <h2>Consistency came from the small decisions.</h2>
          <div className="overview-grid"><p className="lead">A small set of spacing, divider, tag and project-row rules now holds the site together.</p><p>The homepage separates featured work, selected projects and system work in one scan path.</p></div>
          <p className="portfolio-archive-note">Previous version: <a href="https://rezaalhasan.netlify.app/" target="_blank" rel="noreferrer">View the earlier portfolio <ArrowUpRight/></a></p>
          <a className="next-project" href="/zevian"><span>Next case study</span><strong>Zevian <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function About() {
  return (
    <footer className="about section" id="about">
      <div className="about-top"><div className="about-copy"><p>Available for product design roles and B2B system-heavy projects.</p></div><h2>Have a messy product<br/>problem? <a href="mailto:rezahasan1198@gmail.com">Let’s talk.</a></h2></div>
      <div className="footer-row"><Mark/><span>Based in Dhaka · Working worldwide</span><div><a href="mailto:rezahasan1198@gmail.com">Email Reza</a><a href="https://www.linkedin.com/in/reza1198/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/rezaa.hassan/" target="_blank" rel="noreferrer">Instagram</a></div><span>© 2026</span></div>
    </footer>
  );
}

function FlowArrow({ className = '' }) {
  return <svg className={`flow-arrow ${className}`} viewBox="0 0 96 28" aria-hidden="true" focusable="false">
    <path d="M2 14H86" />
    <path d="m76 4 10 10-10 10" />
  </svg>;
}

function MergeArrow({ className = '' }) {
  return <svg className={`merge-arrow ${className}`} viewBox="0 0 104 72" aria-hidden="true" focusable="false">
    <path d="M3 11h15c18 0 20 25 39 25h36" />
    <path d="M3 61h15c18 0 20-25 39-25" />
    <path d="m82 26 11 10-11 10" />
  </svg>;
}

function ResearchFlow() {
  return <div className="research-flow" aria-label="Research inputs converge into patterns, then become product rules">
    <div className="flow-stack flow-inputs">
      <span className="flow-caption">Listen</span>
      <div className="flow-node"><small>Manager interviews</small><strong>Issues surface late</strong></div>
      <div className="flow-node"><small>Survey responses</small><strong>Reasons and fairness matter</strong></div>
    </div>
    <MergeArrow/>
    <div className="flow-node flow-node--focus"><small>Synthesise</small><strong>Find repeated needs</strong></div>
    <FlowArrow/>
    <div className="flow-node flow-node--decision"><small>Decide</small><strong>Define product rules</strong></div>
  </div>;
}

function AskPreview() {
  return <figure className="ask-preview" aria-label="Example of Ask Zevian answering from cited reports">
    <div className="ask-top"><strong>Ask Zevian</strong><small>Illustrative example · 12 reports</small></div>
    <p>Who may need coaching this week?</p>
    <div className="thinking-line"><i aria-hidden="true"/><span>Reading submitted reports</span></div>
    <div className="answer-block"><div className="answer-head"><strong>Two patterns need a closer look.</strong><div className="answer-confidence"><small>Confidence</small><b>Medium</b><span>Recent evidence is limited</span></div></div><p className="answer-evidence">Fahim missed the activity target twice. Nabila’s delivery pace fell for three weeks.</p><b>Suggested action: review follow-up timing before the next 1:1.</b></div>
    <div className="source-chips"><span>Fahim · Week 32</span><span>Nabila · Week 32</span></div>
    <figcaption>Sources stay visible under every answer.</figcaption>
  </figure>;
}

function ZevianCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page" id="top">
      <section className="case-hero case-wrap">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1>Performance signals<br/><em>people can question.</em></h1>
        <div className="case-hero-bottom"><p>I founded Zevian to turn weekly work reports into source-linked performance signals that managers can review, question and override.</p><div className="case-tags"><span>Founder project</span><span>AI product</span><span>B2B SaaS</span><span>Early live product</span></div></div>
        <div className="case-stage"><ZevianVisual/></div>
      </section>

      <section className="case-section case-wrap overview" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Make the weeks between reviews visible.</h2>
          <p className="lead narrow">Managers often rely on memory until review time. Zevian shows weekly changes, links them to evidence and keeps the final decision with the manager.</p>
          <dl className="case-meta"><div><dt>Audience</dt><dd>Remote sales managers</dd></div><div><dt>Role</dt><dd>Founder · Product designer</dd></div><div><dt>Work</dt><dd>Discovery · Strategy · Interaction · Trust</dd></div><div><dt>Tools</dt><dd>React · Supabase · AI prototyping</dd></div><div><dt>Stage</dt><dd>Live founder project</dd></div><div><dt>Product</dt><dd>Evolving with real use</dd></div></dl>
          <div className="principles"><article><b>01</b><h3>Check the context</h3><p>Review the business context before assessing the work.</p></article><article><b>02</b><h3>Show the evidence</h3><p>Link every signal to its source material.</p></article><article><b>03</b><h3>Keep managers in control</h3><p>Managers review the context and make the final decision.</p></article></div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Process</div>
        <div className="case-content">
          <h2>Discovery shaped the product rules.</h2>
          <div className="research-note"><strong>8 prototype-led discovery sessions · 16 survey responses</strong><p>I sourced and contacted sales managers, then used each session to question the product assumptions and improve the flow.</p></div>
          <div className="overview-grid"><p className="lead">My first prototype treated the employee submission as the main explanation for a performance dip.</p><p>Managers showed me that they also use their own observations, call analytics, peer feedback and operational changes. I refined the prototype after each session, then kept the MVP focused on this core evidence-gathering flow.</p></div>
          <div className="discovery-insight">Managers often notice a problem only after the monthly numbers fall.<span>Pattern across discovery</span></div>
          <ResearchFlow/>
          <table className="decision-table">
            <thead><tr><th scope="col">Discovery signal</th><th scope="col">What it meant</th><th scope="col">Product rule</th></tr></thead>
            <tbody><tr><td data-label="Discovery signal">Managers notice issues late</td><td data-label="What it meant">Weekly visibility gap</td><td data-label="Product rule"><strong>Surface attention areas before review</strong></td></tr>
            <tr><td data-label="Discovery signal">Managers asked how each score was made</td><td data-label="What it meant">Trust gap</td><td data-label="Product rule"><strong>Show evidence, reasoning and confidence</strong></td></tr>
            <tr><td data-label="Discovery signal">Coaching varies by manager</td><td data-label="What it meant">Inconsistent follow-up</td><td data-label="Product rule"><strong>Add coaching need to each signal</strong></td></tr>
            <tr><td data-label="Discovery signal">Context changes performance</td><td data-label="What it meant">Human judgment needed</td><td data-label="Product rule"><strong>Add override and audit history</strong></td></tr>
            <tr><td data-label="Discovery signal">Inputs can be gamed</td><td data-label="What it meant">Reports can be optimized</td><td data-label="Product rule"><strong>Flag gaming and lower confidence</strong></td></tr></tbody>
          </table>
          <div className="iteration-strip"><div><small>Early idea</small><strong>“Give me a score”</strong></div><FlowArrow/><div><small>Testing showed</small><strong>A score hid the reason</strong></div><FlowArrow/><div className="iteration-result"><small>Current direction</small><strong>“Show me what needs attention”</strong></div></div>
        </div>
      </section>

      <section className="case-section case-wrap experience">
        <div className="case-index">03 / Product experience</div>
        <div className="case-content">
          <h2>Start with attention. Move into evidence.</h2>
          <p className="lead narrow">The dashboard flags a change, report detail shows the source and Ask Zevian supports follow-up questions.</p>
          <div className="experience-grid">
            <article className="dashboard-preview"><div className="dash-top"><strong>What needs attention?</strong></div><div className="attention-signals"><div><span>Delivery pace</span><b className="active">New signal</b></div><div><span>Collaboration</span><b>Recurring</b></div><div><span>Role clarity</span><b>Stable</b></div></div><div className="attention-row"><span>Review suggested</span><strong>2 reports</strong></div></article>
            <article className="score-preview"><div className="score-title"><strong>Signal detail</strong><span className="signal-confidence">Medium confidence</span></div><p>Delivery pace is slowing</p><div className="signal-details"><div><small>Evidence</small><span>Late follow-ups in 3 reports</span></div><div><small>Coaching need</small><span>Review timing this week</span></div></div><div className="manager-check"><Check/><span>Manager reviews final action</span></div></article>
            <article className="ask-card"><AskPreview/></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap trust">
        <div className="case-index">04 / Trust layer</div>
        <div className="case-content">
          <h2>Managers review every AI suggestion.</h2>
          <p className="lead narrow">Because these signals affect people, Zevian shows uncertainty and records every manager decision.</p>
          <div className="trust-grid">
            <article className="trust-main"><span className="confidence-pill">Evidence stays visible</span><h3>One recommendation,<br/>with its source attached.</h3><p>Every recommendation links back to the report, KPI history and manager-defined criteria.</p><div className="proof-line"><Check/><span>Evidence found in Week 32 report</span></div><details><summary>View retrieval detail</summary><p>Managers can open the retrieved inputs and check why a signal appeared.</p></details></article>
            <article><span>Confidence flag</span><h3>Show when review is needed.</h3><p>Limited or suspicious evidence lowers confidence and asks for manager review.</p><div className="mini-record"><b>Confidence</b><span>Medium</span><b>Reason</b><span>Limited recent evidence</span></div></article>
            <article><span>Manager override</span><h3>Change it—with a reason.</h3><div className="mini-record"><b>AI suggestion</b><span>Needs coaching</span><b>Manager changed to</b><span>Watch next week</span><b>Reason</b><span>New territory assigned</span></div></article>
            <article><span>Audit trail</span><h3>Keep what changed and why.</h3><div className="mini-record"><b>Changed by</b><span>Manager</span><b>Previous → New</b><span>Needs coaching → Watch</span><b>Reason</b><span>Saved</span></div></article>
            <article><span>Gaming protection</span><h3>Flag writing made for the AI.</h3><p>Repeated target terms without matching evidence lower confidence and trigger manager review.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">05 / Outcome</div>
        <div className="case-content">
          <h2>Early validation, with retention still unknown.</h2>
          <div className="outcome-numbers"><article><strong>4.4 / 5</strong><span>Average usefulness rating from five managers</span></article><article><strong>4 of 5</strong><span>Participants who said they would try it at the tested price</span></article><article><strong>2</strong><span>Early paying customers from direct outreach</span></article></div>
          <div className="learning-grid"><h3>Main learning</h3><p>A score alone was not useful. Managers needed the source, the exception and control over the final action.</p><h3>Next</h3><p>Collect enough usage data to understand retention and improve the path from a signal to a useful coaching conversation.</p></div>
          <a className="next-project" href="/orderific"><span>Next case study</span><strong>Orderific <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
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
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1>An HR system<br/><em>given one language.</em></h1>
        <div className="case-hero-bottom"><p>I refined an early HRMS concept and working prototype into a reusable interface system for employee records, attendance, policies and approvals.</p><div className="case-tags"><span>Early concept</span><span>HRMS</span><span>Design system</span><span>Prototype</span></div></div>
        <div className="hrms-stage" aria-label="Zevian HRMS interface overview">
          <span className="hrms-stage-note">Early product concept · interface studies</span>
          <HrmsImage className="hrms-stage-policy" src="/zevian-hrms/interface-policy.png" alt="Cropped view of the Zevian work modality policy setup screen" />
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Context</div>
        <div className="case-content">
          <h2>A concept before<br/>the focused product.</h2>
          <div className="overview-grid"><p className="lead">The concept brought attendance, employee records, activities, calendars, approvals and work policies into one system.</p><p>I started with a working prototype. Walking through its flows showed how broad the scope had become and which interface rules could be reused.</p></div>
          <dl className="case-meta"><div><dt>Product</dt><dd>Zevian HRMS concept</dd></div><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Scope</dt><dd>Prototype · UI system</dd></div><div><dt>Foundation</dt><dd>Ant Design</dd></div><div><dt>Method</dt><dd>Atomic Design</dd></div><div><dt>Status</dt><dd>Early product direction</dd></div></dl>
          <div className="hrms-context-note"><strong>This is not the current Zevian.</strong><p>The Zevian name later moved to a different, focused product for source-linked performance signals. This page documents the earlier HRMS interface and system work.</p></div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Interface work</div>
        <div className="case-content">
          <h2>Keep dense admin work<br/>easy to scan.</h2>
          <p className="lead narrow">Status, navigation and the next action had to remain visible on information-heavy screens. Policy setup, for example, turned long rules into reviewable steps.</p>
          <div className="hrms-interface-grid">
            <HrmsImage className="hrms-interface-wide" src="/zevian-hrms/interface-policy.png" alt="Zevian work modality policy setup screen" caption="Policy setup turns a long rule into clear, reviewable steps." />
            <HrmsImage src="/zevian-hrms/interface-employee.png" alt="Zevian employee overview panel over attendance timesheets" caption="Employee context stays close to attendance records." />
            <HrmsImage src="/zevian-hrms/interface-calendar.png" alt="Zevian calendar with activities and event legend" caption="A shared calendar keeps activities and status visible." />
          </div>
        </div>
      </section>

      <section className="case-section case-wrap hrms-system-section">
        <div className="case-index">03 / System</div>
        <div className="case-content">
          <h2>Refine the rules<br/>before adding screens.</h2>
          <div className="overview-grid"><p className="lead">Built on Ant Design and organised with Atomic Design, the library gave inputs, buttons, avatars and navigation one set of rules.</p><p>Semantic variables carried those rules across light and dark themes, dashboards, records and reports.</p></div>
          <div className="hrms-system-proof">
            <HrmsImage className="hrms-system-main" src="/zevian-hrms/inputs.png" alt="Zevian design system input fields, selectors, toggles and states" caption="Inputs and states" />
            <div className="hrms-system-stack">
              <HrmsImage src="/zevian-hrms/buttons-avatars.png" alt="Zevian design system buttons, chips and avatars" caption="Buttons and avatars" />
              <HrmsImage src="/zevian-hrms/sidebar.png" alt="Zevian design system expanded and collapsed sidebar variants" caption="Navigation" />
            </div>
          </div>
          <HrmsThemeMap/>
        </div>
      </section>

      <section className="case-section case-wrap" id="outcome">
        <div className="case-index">04 / Result</div>
        <div className="case-content">
          <h2>The broad scope became<br/>easier to test and reduce.</h2>
          <div className="hrms-outcome">
            <article><strong>Working prototype</strong><p>The team could walk through the concept and question its scope.</p></article>
            <article><strong>Reusable UI rules</strong><p>Core controls and navigation gave dashboards, records and reports the same starting point.</p></article>
            <article><strong>Clearer product boundary</strong><p>The flows exposed how broad the HRMS concept had become.</p></article>
          </div>
          <div className="hrms-links"><a href="https://zevian.netlify.app/" target="_blank" rel="noreferrer">Open early prototype <ArrowUpRight/></a><a href="https://dribbble.com/shots/26808801-Zevian-HRMS-B2B-SaaS-Dashboard" target="_blank" rel="noreferrer">View on Dribbble <ArrowUpRight/></a></div>
          <div className="hrms-pivot"><span>What changed next</span><p>The broad HRMS concept led to a narrower product direction under the Zevian name.</p></div>
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
    <figcaption>{caption}</figcaption>
  </figure>;
}

function OrderificCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page orderific-page" id="top">
      <section className="case-hero case-wrap orderific-hero">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1>One system.<br/>Six products.<br/><em>Two directions.</em></h1>
        <div className="case-hero-bottom">
          <p>I strengthened one design system across six restaurant products, adding RTL rules, refining light and dark themes, and documenting handoff checks.</p>
          <div className="case-tags"><span>Design system</span><span>RTL</span><span>Dark mode</span><span>Governance</span></div>
        </div>
        <div className="orderific-stage">
          <div className="stage-note"><span>Shared component set</span><strong>6 platforms</strong></div>
          <ExpandableImage className="case-stage-image" src="/orderific/cover.png" alt="Orderific restaurant dashboard assembled from the shared design system" caption="Orderific’s shared component system across restaurant products." loading="eager" decoding="sync" />
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Four system initiatives across six products.</h2>
          <div className="overview-grid"><p className="lead">As Orderific grew across six restaurant products, components drifted and direction rules were inconsistent. The team needed one system for component states, RTL and theme modes.</p><p>Across the system work, I looked for where the team repeated effort or needed clearer rules.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Collaboration</dt><dd>Designers · PMs · engineers</dd></div><div><dt>Scope</dt><dd>Components · RTL · Theming</dd></div><div><dt>Leadership</dt><dd>Hiring · Mentoring · QA</dd></div><div><dt>Period</dt><dd>2025–26</dd></div><div><dt>Context</dt><dd>Six restaurant products</dd></div></dl>
          <div className="orderific-decisions">
            <article><span>Components</span><h3>Improve one component, not every screen.</h3><p>Designers could choose the state they needed without breaking the component.</p></article>
            <article><span>Direction</span><h3>Build RTL into each component.</h3><p>Each component knows what should move and what should stay in place.</p></article>
            <article><span>Team rules</span><h3>Write down the handoff rules.</h3><p>The team could follow the system without asking me each time.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Components</div>
        <div className="case-content">
          <h2>Build better components before making more screens.</h2>
          <p className="lead narrow">A review found inconsistent spacing, corners and shadows, plus missing states that forced designers to detach components. I added reusable properties and shared token rules.</p>
          <div className="change-list">
            <div><span>01</span><strong>Add missing options</strong><p>Designers could choose the type, state, help text and content from one panel.</p></div>
            <div><span>02</span><strong>Make components simpler</strong><p>Engineers could quickly see the states and content that each component needed.</p></div>
            <div><span>03</span><strong>Set shared rules first</strong><p>New components used the same spacing, corners, shadows and design tokens.</p></div>
          </div>
          <div className="input-drift-proof">
            <OrderificImage src="/orderific/input-drift.png" alt="Orderific welcome message form with text inputs, time fields, an editor, a switch and action buttons" caption="One real screen brings many input types and states together."/>
            <div><h3>One form exposed the component drift.</h3><p>Text fields, time fields, an editor, a switch and disabled actions used different spacing, corners and states. Shared rules brought them back into one system.</p></div>
          </div>
          <OrderificImage src="/orderific/component-playground.png" alt="Orderific input component playground and properties panel" caption="One place to inspect every input property and state."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="direction">
        <div className="case-index">03 / RTL + themes</div>
        <div className="case-content">
          <h2>Some parts should move. Others should stay in place.</h2>
          <div className="direction-rule"><div><span>Move</span><p>Navigation, reading order, text alignment and direction controls.</p></div><div><span>Stay in place</span><p>Maps, charts, the logo and the phone country field.</p></div></div>
          <p className="lead narrow">Direction became a component property, so designers could start in RTL without rebuilding layouts or remembering each rule.</p>
          <div className="direction-images">
            <OrderificImage className="orderific-image--rtl" src="/orderific/rtl-comparison.png" alt="Orderific delivery zone interface shown in LTR and RTL" caption="The same delivery zone screen in both directions."/>
            <div className="theme-mode-block">
              <div className="theme-mode-note"><strong>Refined light and dark themes with Figma variable modes.</strong><p>Both themes use the same components and layout. Only the token values change, so states and actions stay consistent.</p></div>
              <div className="theme-mode-pair">
                <OrderificImage src="/orderific/reports-light.png" alt="Orderific reports interface in light mode" caption="Light mode"/>
                <OrderificImage className="orderific-image--dark" src="/orderific/dark-mode.png" alt="Orderific reports interface in dark mode" caption="Dark mode"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="governance">
        <div className="case-index">04 / Team + governance</div>
        <div className="case-content">
          <h2>Help the team use the system without me.</h2>
          <div className="governance-grid">
            <div><p className="lead">I hired and mentored two junior designers, trained QA, and documented recurring handoff decisions for engineers.</p><ul><li>How files and components should be organised</li><li>Three levels of design tokens</li><li>One clear source for every component</li><li>Checks for states, content, RTL and dark mode</li></ul></div>
            <OrderificImage src="/orderific/governance.png" alt="A page from the Orderific design rules document" caption="The guide made system checks a normal part of handoff."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">05 / System result</div>
        <div className="case-content">
          <h2>One shared system for design and handoff.</h2>
          <div className="outcome-numbers orderific-outcomes"><article><strong>1 shared set</strong><span>Used across six restaurant products</span></article><article><strong>3</strong><span>Token layers: global, alias and component</span></article><article><strong>2 directions</strong><span>LTR and RTL across light and dark themes</span></article></div>
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

function PurnoCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page purno-page" id="top">
      <section className="case-hero case-wrap purno-hero">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1><span>A faster sale</span><span>for a shop owner</span><em>using software for the first time.</em></h1>
        <div className="case-hero-bottom">
          <p>I shaped a loose brief into a cross-platform POS for small shops in Bangladesh, bringing sales, stock and local payment methods into one daily flow.</p>
          <div className="case-tags"><span>First product designer</span><span>POS</span><span>Fintech</span><span>Bangladesh</span></div>
        </div>
        <div className="purno-stage">
          <div className="stage-note"><span>Merchant app</span><strong>Desktop · tablet · mobile</strong></div>
          <ExpandableImage className="case-stage-image" src="/purno/cover.webp" alt="Purno POS shown across desktop, tablet and mobile devices" caption="Purno POS across desktop, tablet and mobile." loading="eager" decoding="sync" />
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Payments and sales did not connect.</h2>
          <div className="overview-grid"><p className="lead">Shop owners handled payments, stock and sales in separate tools. Purno brought them into one system.</p><p>The interface was designed for merchants with limited software experience and had to stay clear while a customer waited.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>First product designer</dd></div><div><dt>Team</dt><dd>Founder · engineers · shop owners</dd></div><div><dt>Timeline</dt><dd>2 months</dd></div><div><dt>Platforms</dt><dd>Desktop · tablet · mobile</dd></div><div><dt>Methods</dt><dd>UX audit · flows · moderated testing</dd></div><div><dt>Stage</dt><dd>Funded MVP</dd></div></dl>
          <div className="purno-decisions">
            <article><span>Find products</span><h3>Flatten the category structure.</h3><p>Remove three levels of navigation between the merchant and an item.</p></article>
            <article><span>Read at a distance</span><h3>Test cards from across the counter.</h3><p>Make selected items clear at arm’s length, not only close to the screen.</p></article>
            <article><span>Take payment</span><h3>Reuse patterns merchants already know.</h3><p>Make card, cash and mobile-wallet flows feel like tools already used at the counter.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Research + scope</div>
        <div className="case-content">
          <h2>Borrow familiar patterns, then fit them to local retail.</h2>
          <p className="lead narrow">I compared five POS products with bKash to identify familiar checkout patterns to test and assumptions that could slow local merchants down.</p>
          <div className="purno-research-pair">
            <PurnoImage src="/purno/competitive-audit.webp" alt="Comparative UX audit of six retail and payment products" caption="Comparative UX audit across retail and payment products."/>
            <PurnoImage src="/purno/user-flows.webp" alt="Purno user flows for login, registration and payment" caption="Dependency mapping set the order: inventory, cart, then each payment method."/>
          </div>
          <div className="purno-principle"><strong>Design standard</strong><p>Less to remember. Less to read. Fewer levels to move through while a customer is waiting.</p></div>
        </div>
      </section>

      <section className="case-section case-wrap" id="inventory">
        <div className="case-index">03 / Inventory</div>
        <div className="case-content">
          <h2>Let the shelf organise the screen.</h2>
          <p className="lead narrow">The original structure nested categories four levels deep. I reduced it to one visible level, then used category colour to help merchants scan the home screen quickly.</p>
          <PurnoImage className="purno-image--wide" src="/purno/categories-redesign.webp" alt="Purno category screen before and after flattening the hierarchy" caption="A four-level structure became one visible category list."/>
          <div className="purno-test-story">
            <div><span>Five versions</span><h3>The product card came before the home screen.</h3><p>I tested five card versions in default and selected states. The chosen state had to remain clear from an arm’s length.</p></div>
            <PurnoImage src="/purno/product-card-testing.webp" alt="Five product card versions in default and selected states" caption="Top row: default. Bottom row: selected."/>
          </div>
          <div className="purno-result-band"><strong>~20% faster</strong><p>Transaction time in moderated testing after colour-coded cards replaced emoji category chips.</p></div>
          <PurnoImage className="purno-image--wide" src="/purno/home-redesign.webp" alt="Purno home screen before and after colour-coded product cards" caption="Colour became a working category cue instead of decoration."/>
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
            <strong>Three payment types, one checkout</strong>
            <p>Split payment stays above Cash, Card and MFS because it changes the total, not the provider.</p>
          </div>
          <div className="payment-method-story">
            <div className="payment-method-copy"><span>Card payment</span><h3>Make the phone behave like a familiar card terminal.</h3><p>The flow follows a familiar order: tap or insert, enter a four-digit PIN, then wait for confirmation.</p></div>
            <div className="payment-screens">
              <PurnoImage src="/purno/payment-card-tap.webp" alt="Purno card payment screen asking the customer to tap or insert a card" caption="Tap or insert"/>
              <PurnoImage src="/purno/payment-card-pin.webp" alt="Purno four-digit card PIN keypad" caption="Enter PIN"/>
              <PurnoImage src="/purno/payment-card-processing.webp" alt="Purno card payment processing screen" caption="Confirm processing"/>
            </div>
          </div>
          <div className="payment-method-story payment-method-story--reverse">
            <div className="payment-method-copy"><span>Mobile financial services</span><h3>Keep every local wallet inside one repeatable flow.</h3><p>bKash, Nagad, Rocket and Upay use one provider picker and Bangla QR flow. The usual provider stays first, with the others one line away.</p></div>
            <div className="payment-screens">
              <PurnoImage src="/purno/payment-mfs-provider.webp" alt="Purno mobile wallet provider picker" caption="Pick a wallet"/>
              <PurnoImage src="/purno/payment-mfs-qr.webp" alt="Purno generated Bangla QR payment screen" caption="Generate QR"/>
              <PurnoImage src="/purno/payment-mfs-processing.webp" alt="Purno mobile wallet payment processing screen" caption="Wait for scan"/>
            </div>
          </div>
          <PurnoImage className="purno-image--wide" src="/purno/transaction-redesign.webp" alt="Purno transaction detail before and after redesign" caption="The closed transaction record was cut back to the questions a merchant still needs answered."/>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">05 / Result</div>
        <div className="case-content">
          <h2>From an unfinished scope to a funded MVP.</h2>
          <div className="outcome-numbers purno-outcomes"><article><strong>$10k</strong><span>Seed funding raised after a pitch supported by the designed MVP</span></article><article><strong>~20%</strong><span>Faster transactions in moderated testing</span></article><article><strong>3</strong><span>Designed for desktop, tablet and mobile</span></article></div>
          <div className="learning-grid"><h3>Main learning</h3><p>Localisation goes beyond translation. Menu depth, reading distance and payment habits determine whether a POS works at a busy counter.</p><h3>Evidence note</h3><p>The speed result comes from moderated tests of the colour-coded cards. The funding relates to the MVP pitch, not long-term product impact.</p></div>
          <a className="next-project" href="/jayga"><span>Next case study</span><strong>Jayga <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function JaygaImage({ src, alt, caption, className = '' }) {
  return <figure className={`jayga-image ${className}`}>
    <ExpandableImage src={src} alt={alt} caption={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function JaygaCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page jayga-page" id="top">
      <section className="case-hero case-wrap jayga-hero">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1><span>Three days</span><span>became <em>2–3 hours.</em></span></h1>
        <div className="case-hero-bottom">
          <p>I led product on Jayga’s warehouse system, connecting storage, pricing, billing and delivery across the client, admin and warehouse floor.</p>
          <div className="case-tags"><span>Product lead</span><span>Warehouse operations</span><span>Service design</span><span>2023–25</span></div>
        </div>
        <div className="jayga-stage" aria-label="Jayga admin and warehouse applications">
          <div className="stage-note"><span>Measured result</span><strong>3 days → 2–3 hours</strong></div>
          <JaygaImage src="/jayga/admin-requests.png" alt="Jayga admin console showing active warehouse grid requests"/>
          <JaygaImage src="/jayga/delivery-mobile.png" alt="Jayga mobile app showing a warehouse delivery request"/>
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>One order record connected the work.</h2>
          <div className="overview-grid"><p className="lead">Warehouse work ran through spreadsheets, handwritten logs and separate handoffs. Orders took days because storage, billing and delivery did not share one record.</p><p>Jayga rents shared warehouse space to businesses that need less than a full facility. I designed the system that linked each customer’s rented space, stock and bill.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>Product lead</dd></div><div><dt>Team</dt><dd>8 people</dd></div><div><dt>Timeline</dt><dd>4 months · 2 months design</dd></div><div><dt>Platforms</dt><dd>2 web apps · 1 mobile app</dd></div><div><dt>Methods</dt><dd>Interviews · contextual inquiry</dd></div><div><dt>Tools</dt><dd>Figma · Notion</dd></div></dl>
          <div className="jayga-decisions">
            <article><span>Billable unit</span><h3>Model the grid.</h3><p>A grid became the shared unit for storage, pricing and billing.</p></article>
            <article><span>Shared record</span><h3>Enter each fact once.</h3><p>Client, admin and floor staff do different work on the same order record.</p></article>
            <article><span>Field insight</span><h3>Price the rack level.</h3><p>Research found unused vertical space. The accepted pricing idea remains a projection, not a shipped result.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Core system</div>
        <div className="case-content">
          <h2>Three apps. One warehouse record.</h2>
          <p className="lead narrow">A client starts an order, an admin confirms space and billing, and warehouse staff verify the stock—all on the same record.</p>
          <JaygaImage className="jayga-image--wide" src="/jayga/order-flow.png" alt="Jayga order flow across client, admin and warehouse applications" caption="The order status travels from the client to the admin and warehouse floor."/>
          <div className="jayga-apps">
            <article><span>Web · Client</span><h3>Client dashboard</h3><p>Starts orders and shows used space, open requests and the running daily bill.</p></article>
            <article><span>Web · Admin</span><h3>Admin console</h3><p>Handles requests, grid assignment, payments, billing and operational oversight.</p></article>
            <article><span>Mobile · Floor</span><h3>Warehouse Manager</h3><p>Guides stock assignment and confirms counts from the warehouse aisle.</p></article>
          </div>
          <div className="jayga-screen-pair">
            <JaygaImage src="/jayga/admin-requests.png" alt="Jayga admin console with warehouse grid requests" caption="Admin: every request with its warehouse, item, duration and status."/>
            <JaygaImage src="/jayga/client-dashboard.png" alt="Jayga client dashboard with warehouse usage and order details" caption="Client: used space, open requests and the current bill."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="grids">
        <div className="case-index">03 / Grid logic</div>
        <div className="case-content">
          <h2>Make physical space work like product data.</h2>
          <p className="lead narrow">I divided the warehouse into fixed grids with unique IDs. A grid is what a customer rents, where an item is assigned and what the bill is calculated from.</p>
          <div className="grid-rule"><div><span>Problem</span><p>Pricing did not reflect how much rack space was used, and the team could not see which space generated revenue.</p></div><div><span>Product rule</span><p>Assign and confirm one grid before opening the next, limiting errors before another space changes.</p></div></div>
          <div className="jayga-grid-story">
            <div><h3>Split one item without losing its history.</h3><p>A quantity can sit across several grids while staying on one item record. Because the live occupancy count was delayed, an “Assigned” tag showed which units had been placed.</p><p className="evidence-note">Hindsight: the tag was a workaround. A live occupancy count would be the stronger system.</p></div>
            <JaygaImage src="/jayga/assign-grids.png" alt="Jayga interface for splitting an item quantity across warehouse grids" caption="Quantity splits stay on one item card, with each grid confirmed separately."/>
          </div>
          <JaygaImage className="jayga-image--wide" src="/jayga/payment-summary.png" alt="Jayga client payment summary with assigned grids, quantity and advance due" caption="Before payment, every split becomes one checkable summary."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="research">
        <div className="case-index">04 / Field research</div>
        <div className="case-content">
          <h2>The warehouse changed the pricing idea.</h2>
          <div className="jayga-field">
            <JaygaImage src="/jayga/warehouse-visit.jpg" alt="A warehouse aisle observed during Jayga field research" caption="Contextual inquiry showed stock laid flat while rack space stayed unused."/>
            <div><p className="lead">A warehouse visit revealed unused vertical space. I proposed rack-level pricing so each level could be filled and priced separately.</p><div className="projection-note"><span>Modelled, not measured</span><strong>~3× revenue per m²</strong><p>Stakeholders approved the pricing idea for future work, but it was not built. The actual revenue change is unknown.</p></div></div>
          </div>
          <div className="research-summary">
            <div><span>23 businesses surveyed</span><h3>Price, distance, security and retrieval shaped the storage choice.</h3><p>I compared six customer groups by demand, storage cost, item value and growth potential.</p></div>
            <JaygaImage src="/jayga/opportunity-matrix.png" alt="Jayga opportunity matrix comparing customer segments by cost and demand" caption="The matrix pointed toward NGOs and raw-material businesses before general ecommerce storage."/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="delivery">
        <div className="case-index">05 / Delivery + billing</div>
        <div className="case-content">
          <h2>The floor confirms reality before the record changes.</h2>
          <p className="lead narrow">A delivery starts in the admin console, reaches the warehouse aisle on mobile, and lists the grids to pull from. If the physical count does not match, a person checks it before the delivery continues.</p>
          <div className="warehouse-flow">
            <JaygaImage src="/jayga/delivery-request.png" alt="Jayga admin interface for selecting stored items for delivery" caption="Admin selects the client, items and quantities."/>
            <FlowArrow/>
            <JaygaImage src="/jayga/assignment-mobile.png" alt="Jayga mobile list of grids used for a delivery" caption="The floor app lists the source grids."/>
            <FlowArrow/>
            <JaygaImage src="/jayga/count-mobile.png" alt="Jayga mobile screen confirming a physical stock count" caption="Staff confirm the count or report a mismatch."/>
          </div>
          <div className="billing-story">
            <div><span>Billing follows the stock</span><h3>Empty a grid. Lower the bill.</h3><p>Invoices use the dates, duration and space already stored on the order. When warehouse staff confirm that a grid is empty, the client stops paying for it.</p></div>
            <div className="billing-images"><JaygaImage src="/jayga/invoice.png" alt="Jayga invoice generator with live invoice preview" caption="Admin review before sending."/><JaygaImage src="/jayga/billing.png" alt="Jayga client billing dashboard with upcoming and due invoices" caption="Upcoming and due bills on the client side."/></div>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">06 / Measured result</div>
        <div className="case-content">
          <h2>Order processing fell from three days to 2–3 hours.</h2>
          <div className="outcome-numbers jayga-outcomes single-outcome"><article><strong>3 days → 2–3 hrs</strong><span>Measured order-processing time before and after the system was used</span></article></div>
          <div className="learning-grid"><h3>Main learning</h3><p>Operations software becomes useful when the digital record follows the physical work. The grid connected stock, space and billing because it matched how the warehouse actually worked.</p><h3>Hindsight</h3><p>The mobile app should have been in the first release, and occupancy should have updated live. By phase two, the light design system also needed stronger rules across all three apps.</p></div>
          <a className="next-project" href="/portfolio"><span>Next case study</span><strong>Portfolio <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function AboutMe() {
  const interests = [
    { title: 'Video games', description: 'A way to relax, explore new worlds and enjoy systems that make learning feel natural.' },
    { title: 'Football', description: 'I enjoy both playing and watching football. Manchester United is the team I follow.' },
    { title: 'Travelling', description: 'New places give me fresh perspectives and a better sense of how differently people experience everyday life.' },
  ];

  return <>
    <Nav aboutPage/>
    <main className="about-page" id="top">
      <header className="about-hero section">
        <h1>Hello, I’m Reza.<br/><em>I shape ideas into<br/>working products.</em></h1>
        <div className="about-intro">
          <p>I’m a product designer and founder based in Dhaka. With a computer science background, I turn early ideas, complex workflows and messy information into products people can understand and use.</p>
          <p>I enjoy the space between design and working software: finding the real problem, shaping the system, building enough to test it and improving the result through evidence.</p>
        </div>
      </header>

      <section className="about-values section">
        <p>What guides my work</p>
        <h2>Clarity over decoration.<br/>Evidence over assumption.<br/>Progress over perfection.</h2>
      </section>

      <section className="interests-section section" id="interests">
        <div className="interests-head"><h2>Outside work</h2><p>A few things that keep me curious, competitive and open to new perspectives.</p></div>
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
        <a className="back-link" href="/"><ArrowLeft/> Back to selected work</a>
        <h1>AI helps me move<br/>faster. <em>I keep the<br/>direction human.</em></h1>
        <div className="workflow-intro"><p>I use AI across product design, research and development—not as a shortcut to a finished answer, but as a way to explore, test and improve the work.</p><span>My working system · always evolving</span></div>
        <WorkflowVisual type="loop"/>
      </header>

      <section className="workflow-methods section" id="process">
        <div className="workflow-methods-head"><h2>Processes I use</h2><p>Each method has one job: make the next product decision clearer, faster or easier to test.</p></div>
        <div className="workflow-list">
          {workflowMethods.map((method, index) => <article className={`workflow-row workflow-row--${method.visual}`} key={method.title}>
            <span className="workflow-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="workflow-copy"><h3>{method.title}</h3><p>{method.description}</p></div>
            {index === 0 ? <div className="workflow-first-note"><span>Repeated until the decision holds up</span></div> : <WorkflowVisual type={method.visual}/ >}
          </article>)}
        </div>
      </section>

      <section className="workflow-learning section" id="outcome">
        <p>Learning more...</p>
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
      <div><h2>How I work with AI</h2><p>Iteration loops, research synthesis, production code and the human decisions between them.</p><span>Explore my workflows <ArrowUpRight/></span></div>
      <WorkflowVisual type="loop"/>
    </a>
  </section>;
}

export function App({ initialPath = null }) {
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
  if (path === '/zevian') page = <ZevianCase/>;
  else if (path === '/zevian-hrms') page = <ZevianHrmsCase/>;
  else if (path === '/orderific') page = <OrderificCase/>;
  else if (path === '/purno') page = <PurnoCase/>;
  else if (path === '/jayga') page = <JaygaCase/>;
  else if (path === '/portfolio') page = <PortfolioCase/>;
  else if (path === '/ai-workflows') page = <AIWorkflows/>;
  else if (path === '/about') page = <AboutMe/>;
  else page = <><Nav/><main><Hero/><Featured/><SelectedProjects/><DesignSystems/><AIWorkflowTeaser/></main><About/></>;
  return <CaseImageProvider>{page}</CaseImageProvider>;
}

if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container.hasChildNodes()) hydrateRoot(container, <App/>);
  else createRoot(container).render(<App/>);
}
