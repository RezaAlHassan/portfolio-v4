import React, { useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400-italic.css';
import { ArrowDown, ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react';
import './styles.css';

const projects = [
  {
    title: 'Orderific',
    description: 'Strengthened a shared design system across six restaurant products, with reusable components, theme modes and English LTR / Arabic RTL rules.',
    tags: ['Design systems', 'Design tokens', 'Variables', 'RTL/LTR'],
    year: '2025–26',
    visual: 'rtl',
    url: '/orderific',
  },
  {
    title: 'Purno',
    description: 'Designed a connected retail system for store payments, inventory and owner insights, shaped by local payment habits and usability testing.',
    tags: ['Fintech', 'Multi-platform', 'Prototyping', 'Usability testing'],
    year: '2024',
    visual: 'pos',
    url: '/purno',
  },
  {
    title: 'Jayga',
    description: 'Led service and product design for shared SME storage, connecting customers, admins, warehouse staff and logistics partners.',
    tags: ['Complex workflows', 'Operational tools', 'Systems thinking', 'Field research'],
    year: '2024',
    visual: 'pipeline',
    url: '/jayga',
  },
];

const pageMetadata = {
  '/': ['Reza — Product designer for B2B and AI products', '0→1 product design for B2B SaaS and AI products, combining UX research, product strategy, systems thinking, design systems and prototyping.'],
  '/zevian': ['Zevian — Performance investigation case study', 'How Zevian helps sales managers detect performance changes, add context and decide what needs action.'],
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
          <p>I design 0→1 B2B SaaS and AI products for complex workflows—from UX research and product strategy to design systems and prototypes.</p>
        </div>
        <a href="#work" className="scroll-link">See selected work <ArrowDown /></a>
      </div>
    </section>
  );
}

function SelectedProjects() {
  const selected = [{ title: 'Zevian', year: '2026 / Now', description: 'Designing and prototyping an AI workflow for sales managers to investigate performance changes and decide what needs action.', tags: ['Founder product', 'AI workflow', 'Human-in-the-loop'], url: '/zevian', image: '/zevian/cover-sharp.svg', alt: 'Zevian findings, evidence, context and manager decision' }, ...projects.map(project => ({ ...project, image: project.visual === 'rtl' ? '/orderific/cover-comparison.svg' : project.visual === 'pos' ? '/purno/cover.webp' : '/jayga/warehouse-visit.jpg', alt: project.visual === 'rtl' ? 'Orderific delivery zone screen in English LTR and Arabic RTL' : project.visual === 'pos' ? 'Purno payment cover showing the total and split amount' : 'Checking stock in a Jayga warehouse aisle' }))];
  return <section className="section projects work-section" id="work">
    <div className="projects-title"><h2>Selected projects</h2><p>Product strategy, research and systems thinking across AI products, retail and warehouse operations.</p></div>
    <div className="work-grid">
      {selected.map((project, index) => <a href={project.url} className="work-card" key={project.title}>
        <figure className={`work-cover work-cover--${project.title.toLowerCase()}`}><img src={project.image} alt={project.alt} loading={index === 0 ? 'eager' : 'lazy'}/></figure>
        <div className="work-card-heading"><span>{index === 0 ? 'Founder product' : project.year}</span><ArrowUpRight aria-hidden="true"/></div>
        <h3>{project.title}</h3><p>{project.description}</p>
        <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </a>)}
    </div>
  </section>;
}

function DesignSystems() {
  return (
    <section className="systems-section section">
      <div className="systems-heading"><h2>More design work</h2></div>
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
          <h2>References became design principles.</h2>
          <div className="portfolio-direction">{direction.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="case-section case-wrap" id="outcome">
        <div className="case-index">03 / Result</div>
        <div className="case-content">
          <h2>Consistency came from the small decisions.</h2>
          <div className="overview-grid"><p className="lead">A shared set of spacing, typography, cover and tag rules keeps the site consistent.</p><p>The homepage presents four product case studies in one grid, followed by supporting system work and working methods.</p></div>
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
      <div className="about-top"><div className="about-copy"><p>Available for product design roles across B2B SaaS, AI products and complex operational systems.</p></div><h2>Have a complex product<br/>challenge? <a href="mailto:rezahasan1198@gmail.com">Let’s talk.</a></h2></div>
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

function ZevianCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page zevian-page" id="top">
      <section className="case-hero case-wrap">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1>Know what changed.<br/><em>Understand why.</em></h1>
        <div className="case-hero-bottom"><p>Zevian helps sales managers investigate performance changes before they become pipeline problems.</p><div className="case-tags"><span>Founder-led 0→1</span><span>AI-native</span><span>Human-in-the-loop</span><span>Trust &amp; uncertainty</span><span>Design-to-code</span></div></div>
        <figure className="zevian-hero-product">
          <ExpandableImage src="/Zevian-Findings.png" alt="Zevian findings list with a detailed investigation drawer for a drop in meetings booked" caption="The findings list supports fast scanning; the drawer holds evidence, possible reasons, context and the manager's decision." loading="eager" decoding="sync" />
          <figcaption>List for scanning. Drawer for investigation.</figcaption>
        </figure>
      </section>

      <section className="case-section case-wrap overview" id="overview">
        <div className="case-index">01 / Current product</div>
        <div className="case-content">
          <h2>Dashboards show the number. Zevian helps investigate the change.</h2>
          <p className="lead narrow">When an important metric changes, sales managers connect supporting signals, gather context and decide whether it needs action.</p>
          <dl className="case-meta"><div><dt>Audience</dt><dd>Sales managers</dd></div><div><dt>Role</dt><dd>Founder · Product designer</dd></div><div><dt>Scope</dt><dd>Strategy · UX · UI</dd></div><div><dt>Research</dt><dd>Interviews · Prototype feedback</dd></div><div><dt>Build</dt><dd>Figma · React prototype</dd></div><div><dt>Status</dt><dd>React prototype / ongoing validation</dd></div></dl>
          <div className="zevian-flowchart" aria-label="Zevian workflow from data upload to a saved manager decision">
            <div className="workflow-lane"><span className="workflow-lane-label">Start with existing data</span><div className="flow-node"><strong>Add data</strong><p>CSV, XLSX, CRM or dialer export.</p></div></div>
            <div className="flow-connector" aria-hidden="true"><ArrowDown/></div>
            <div className="workflow-lane automatic-lane"><span className="workflow-lane-label">System prepares</span><ol className="system-flow-nodes">
              <li className="flow-node"><strong>Match records</strong><p>Map clear matches automatically.</p></li>
              <li className="flow-node"><strong>Detect changes</strong><p>Compare outcomes with a recent baseline.</p></li>
              <li className="flow-node"><strong>Link signals</strong><p>Show evidence and possible reasons.</p></li>
            </ol><p className="flow-review-note">Uncertain matches go to the manager for confirmation.</p></div>
            <div className="flow-connector" aria-hidden="true"><ArrowDown/></div>
            <div className="workflow-lane manager-lane"><span className="workflow-lane-label">Manager reviews</span><ol className="manager-flow-nodes">
              <li className="flow-node"><strong>Check the finding</strong><p>Review evidence, risk and confidence.</p></li>
              <li className="flow-node"><strong>Add context</strong><p>Optional. Keep each source visible.</p></li>
              <li className="flow-node decision-node"><strong>Decide and save</strong><p>The manager makes the final call. The system keeps the history.</p></li>
            </ol></div>
          </div>
          <p className="system-principle"><strong>Product principle</strong><span>Move complexity behind the system and ask the manager to review ambiguity, context and decisions.</span></p>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / What discovery changed</div>
        <div className="case-content">
          <h2>Discovery shifted the product from evaluation to investigation.</h2>
          <div className="research-note"><strong>Discovery ran from May to September alongside building and GTM.</strong><p>The interviews, prototype feedback and synthesis represented about 1–2 weeks of focused effort within that period.</p></div>
          <div className="pivot-list">
            <article><span>Evaluation → diagnosis</span><h3>Start with the changed metric.</h3><p>Managers needed support after a metric changed. I replaced employee scoring with recent baselines, meaningful changes and investigation.</p></article>
            <article><span>Coaching → wider causes</span><h3>Managers needed more context than employee input.</h3><p>Lead quality, selling time, campaigns, process changes and data issues can all change an outcome. Zevian surfaces possible reasons and keeps the finding open to new context.</p></article>
            <article><span>Manual setup → exceptions</span><h3>Automate the clear cases.</h3><p>Zevian handles categorisation and clear matches automatically. Managers review ambiguous cases, context and decisions.</p></article>
          </div>
          <blockquote>“Something changed. Why did it change?”<cite>The question that replaced the scoring model</cite></blockquote>
        </div>
      </section>

      <section className="case-section case-wrap evolution">
        <div className="case-index">03 / Product evolution</div>
        <div className="case-content">
          <h2>Each iteration moved more preparation out of the manager's workflow.</h2>
          <p className="lead narrow">Interviews moved the model from employee scoring toward broader context, automatic preparation and exception review.</p>
          <div className="model-evolution model-evolution--two">
            <article><span>V1 / Evaluation and patterns</span><h3>Evaluate performance and guide coaching.</h3><p>KPIs and employee data &rarr; scores or performance findings &rarr; coaching</p><small>Gap: explain the change and consider causes beyond employee performance.</small></article>
            <article className="model-current"><span>V2 / Investigation and decision</span><h3>Prepare the evidence. Review the exceptions.</h3><p>Upload &rarr; auto-match &rarr; finding and possible reasons &rarr; context &rarr; decision &rarr; history</p><small>The system prepares the review; the manager judges the evidence and decides.</small></article>
          </div>
          <div className="before-after"><div><span>Early assumption</span><strong>Managers need a better way to evaluate employees.</strong></div><div><span>Current focus</span><strong>Managers need a faster way to investigate meaningful changes.</strong></div></div>
          <p className="zevian-archive-note"><span>Earlier product evidence</span><span>The <a href="https://rezaalhasan.netlify.app/zevian" target="_blank" rel="noreferrer">archived scoring prototype <ArrowUpRight/></a> shows the product before discovery shifted it toward performance investigation.</span></p>
        </div>
      </section>

      <section className="case-section case-wrap product-story">
        <div className="case-index">04 / Current experience</div>
        <div className="case-content">
          <h2>Zevian handles clear cases first. Managers review exceptions.</h2>
          <p className="lead narrow">Confidence and source labels show which records moved automatically and where human judgment is required.</p>
          <div className="product-evidence">
            <article className="evidence-row evidence-match">
              <div className="evidence-copy"><span>Review matches</span><h3>Resolve uncertain employee matches.</h3><p>Zevian maps clear rows automatically and presents the remaining choices for confirmation.</p></div>
              <figure><ExpandableImage src="/Match-Data.png" alt="Zevian review match screen asking whether J Rahman should link to Joy Rahman or Jamal Rahman" caption="Exception handling for an unresolved employee match."/><figcaption>One uncertain match, with clear choices and a safe skip action.</figcaption></figure>
            </article>
            <article className="evidence-row evidence-findings">
              <div className="evidence-copy"><span>Review findings</span><h3>Use confidence to guide the review.</h3><p>Change, risk, priority, baseline and confidence help managers choose which finding needs context first.</p></div>
              <figure><ExpandableImage src="/Findings-Cropped.png" alt="Zevian findings table showing performance changes, priority, baseline, confidence and context actions" caption="A scan-first table helps managers compare findings before opening the investigation."/><figcaption>Compare the signal, confidence and next action in one row.</figcaption></figure>
            </article>
            <article className="evidence-row evidence-context">
              <div className="evidence-copy"><span>Context states</span><h3>Keep context and decisions separate.</h3><p>Manager and employee notes stay attributable. Employee input requires review, and late context never changes a saved decision by itself.</p></div>
              <figure><div className="wide-image-scroll"><ExpandableImage src="/Zevian-Context.png" alt="Zevian context state progression from no context to manager and employee context with a combined summary" caption="No context, requested, received and reviewed states keep sources and decisions clear."/></div><figcaption>No context → requested → received → reviewed.</figcaption></figure>
            </article>
          </div>
          <div className="trust-rail" aria-label="AI trust decisions"><span>Visible confidence</span><span>Evidence and reasoning</span><span>Possible reasons</span><span>Attributable context</span><span>Manager decision</span><span>Saved history</span></div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">05 / System and build</div>
        <div className="case-content">
          <h2>From product decisions to a testable React prototype.</h2>
          <p className="lead narrow">I translated the product model into interface structure, states and edge cases during a three-day design sprint, then built a React prototype for demos and validation.</p>
          <div className="build-days">
            <article><span>Day 1</span><h3>Structure</h3><p>Defined the four-step workflow: Add data → Review matches → Review findings → Save decisions.</p></article>
            <article><span>Day 2</span><h3>System</h3><p>Defined the list, drawer, context states, confidence, priority and semantic tokens.</p></article>
            <article><span>Day 3</span><h3>Edge cases</h3><p>Documented unresolved matches, late context, mixed sources and decisions made with partial context.</p></article>
          </div>
          <div className="system-evidence">
            <figure><ExpandableImage src="/Zevian-Colors.png" alt="Zevian primitive and semantic colour token system" caption="Primitive colours feed semantic roles for backgrounds, text, actions and product states."/><figcaption>I started with only the essential tokens and components: colour, type, inputs, buttons, links, badges and chips. The system can grow with the product as new workflow needs become clear.</figcaption></figure>
            <div><h3>Attio for scan. Notion for depth.</h3><p>Dense rows make the findings list quick to read. The drawer uses a calmer document structure for evidence, context and decisions.</p><h3>AI as a working partner.</h3><p>I used ChatGPT for research synthesis, product critique, reference analysis, token structure, state exploration and later design-to-code. The product decisions remained grounded in research and product reasoning.</p><h3>Figma to React.</h3><p>I translated the stable direction into a reusable React prototype for demos, product validation and faster state changes.</p></div>
          </div>
          <div className="final-learning"><span>Main learning</span><p>The product became the investigation around a change—and the manager's ability to judge it fairly.</p></div>
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
          <h2>The earlier HRMS<br/>product concept.</h2>
          <div className="overview-grid"><p className="lead">The concept brought attendance, employee records, activities, calendars, approvals and work policies into one system.</p><p>I started with a working prototype. Walking through its flows showed how broad the scope had become and which interface rules could be reused.</p></div>
          <dl className="case-meta"><div><dt>Product</dt><dd>Zevian HRMS concept</dd></div><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Scope</dt><dd>Prototype · UI system</dd></div><div><dt>Foundation</dt><dd>Ant Design</dd></div><div><dt>Method</dt><dd>Atomic Design</dd></div><div><dt>Status</dt><dd>Early product direction</dd></div></dl>
          <div className="hrms-context-note"><strong>Earlier Zevian HRMS concept</strong><p>The Zevian name later moved to a focused product for investigating performance changes and supporting manager decisions. This page documents the earlier HRMS interface and system work.</p></div>
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
          <h2>Reusable rules<br/>for every screen.</h2>
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
          <h2>A testable concept and<br/>reusable interface system.</h2>
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
          <div className="case-tags"><span>Design systems</span><span>Design tokens</span><span>Variables</span><span>RTL/LTR</span><span>Multi-platform</span></div>
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
            <article><span>Components</span><h3>Improve the shared component.</h3><p>Designers could choose the state they needed within the shared component.</p></article>
            <article><span>Direction</span><h3>Build RTL into each component.</h3><p>Each component knows what should move and what should stay in place.</p></article>
            <article><span>Team rules</span><h3>Document the handoff rules.</h3><p>The team could apply the system independently during design and handoff.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Components</div>
        <div className="case-content">
          <h2>Reusable components for product screens.</h2>
          <p className="lead narrow">A review found inconsistent spacing, corners and shadows, plus missing states that forced designers to detach components. I added reusable properties and shared token rules.</p>
          <div className="change-list">
            <div><span>01</span><strong>Add missing options</strong><p>Designers could choose the type, state, help text and content from one panel.</p></div>
            <div><span>02</span><strong>Make components simpler</strong><p>Engineers could quickly see the states and content that each component needed.</p></div>
            <div><span>03</span><strong>Set shared rules first</strong><p>New components used the same spacing, corners, shadows and design tokens.</p></div>
          </div>
          <div className="input-drift-proof">
            <OrderificImage src="/orderific/input-drift.png" alt="Orderific welcome message form with text inputs, time fields, an editor, a switch and action buttons" caption="One real screen brings many input types and states together."/>
            <div><h3>One form defined the shared component rules.</h3><p>Text fields, time fields, an editor, a switch and disabled actions used different spacing, corners and states. Shared rules brought them into one system.</p></div>
          </div>
          <OrderificImage src="/orderific/component-playground.png" alt="Orderific input component playground and properties panel" caption="One place to inspect every input property and state."/>
        </div>
      </section>

      <section className="case-section case-wrap" id="direction">
        <div className="case-index">03 / RTL + themes</div>
        <div className="case-content">
          <h2>RTL rules for movement and fixed elements.</h2>
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
          <h2>Design system governance for the team.</h2>
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

function PurnoCase() {
  return <>
    <Nav caseStudy/>
    <main className="case-page purno-page" id="top">
      <section className="case-hero case-wrap purno-hero">
        <a className="back-link" href="/"><ArrowLeft/> Selected work</a>
        <h1><span>A faster sale</span><span>for a shop owner</span><em>using software for the first time.</em></h1>
        <div className="case-hero-bottom">
          <p>I shaped a loose brief into a cross-platform POS for small shops in Bangladesh, bringing sales, stock and local payment methods into one daily flow.</p>
          <div className="case-tags"><span>Fintech</span><span>Multi-platform</span><span>Prototyping</span><span>Usability testing</span></div>
        </div>
        <div className="purno-stage">
          <div className="stage-note"><span>Merchant app</span><strong>Desktop · tablet · mobile</strong></div>
          <ExpandableImage className="case-stage-image" src="/purno/cover.webp" alt="Purno payment cover showing the total and split amount" caption="Purno payment experience." loading="eager" decoding="sync" />
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>Payments first. A connected retail system next.</h2>
          <div className="overview-grid"><p className="lead">Purno began with payments, then expanded to inventory, a small work tracker and sales insights for the owner.</p><p>The interface was designed for merchants with limited software experience and had to stay clear while a customer waited.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>First product designer</dd></div><div><dt>Team</dt><dd>Product designer / founder</dd></div><div><dt>Timeline</dt><dd>3 months</dd></div><div><dt>Platforms</dt><dd>Desktop · tablet · mobile</dd></div><div><dt>Methods</dt><dd>UX audit · flows · moderated testing</dd></div><div><dt>Stage</dt><dd>Funded MVP</dd></div></dl>
          <div className="orderific-decisions">
            <article><span>Find products</span><h3>Flatten the category structure.</h3><p>Remove three levels of navigation between the merchant and an item.</p></article>
            <article><span>Read at a distance</span><h3>Test cards from across the counter.</h3><p>Make selected items clear at arm’s length during a sale.</p></article>
            <article><span>Take payment</span><h3>Reuse patterns merchants already know.</h3><p>Make card, cash and mobile-wallet flows feel like tools already used at the counter.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap" id="process">
        <div className="case-index">02 / Research + scope</div>
        <div className="case-content">
          <h2>Borrow familiar patterns, then fit them to local retail.</h2>
          <p className="lead narrow">I compared five POS products with bKash to identify familiar checkout patterns to test and assumptions that could slow local merchants down.</p>
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
          <h2>Let the shelf organise the screen.</h2>
          <p className="lead narrow">The original structure nested categories four levels deep. I reduced it to one visible level, then used category colour to help merchants scan the home screen quickly.</p>
          <PurnoImage className="purno-image--wide" src="/purno/categories-redesign.webp" alt="Purno category screen before and after flattening the hierarchy" caption="A four-level structure became one visible category list."/>
          <div className="purno-test-story">
            <div><span>Five versions</span><h3>Product-card testing set the home-screen pattern.</h3><p>I tested five card versions in default and selected states. The chosen state had to remain clear from an arm’s length.</p></div>
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

      <section className="case-section case-wrap" id="owner-experience">
        <div className="case-index">05 / Owner experience</div>
        <div className="case-content">
          <h2>Connect the sale to the owner's next decision.</h2>
          <p className="lead narrow">The checkout answers what happened in one sale. I designed the owner app around three broader questions: how is the business performing, what is selling, and how was a transaction paid? Daily metrics, category reports and transaction details provide different levels of detail.</p>
          <div className="owner-screens">
            <PurnoImage src="/purno/owner-home.svg" alt="Purno owner home with sales metrics, peak time and top-selling products" caption="Monitor daily performance"/>
            <PurnoImage src="/purno/owner-reports.svg" alt="Purno owner reports with category sales and employee sales" caption="Compare sales by category and employee"/>
            <PurnoImage src="/purno/owner-transaction.svg" alt="Purno transaction details showing split payments, customer, employee and branch" caption="Inspect a transaction and its payments"/>
          </div>
        </div>
      </section>

      <section className="case-section case-wrap outcome" id="outcome">
        <div className="case-index">06 / Result</div>
        <div className="case-content">
          <h2>From an open brief to a funded MVP.</h2>
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
        <h1><span>Connecting storage,</span><span>people <em>and systems.</em></span></h1>
        <div className="case-hero-bottom">
          <p>I led product on Jayga’s warehouse system, connecting storage, pricing, billing and delivery across the client, admin and warehouse floor.</p>
          <div className="case-tags"><span>Operational tools</span><span>Systems thinking</span><span>Field research</span><span>Business rules</span></div>
        </div>
        <div className="jayga-stage" aria-label="Jayga admin and warehouse applications">
          <div className="stage-note"><span>Shared storage for SMEs</span><strong>Client / admin / warehouse</strong></div>
          <JaygaImage src="/jayga/admin-requests.png" alt="Jayga admin console showing active warehouse grid requests"/>
          <JaygaImage src="/jayga/delivery-mobile.png" alt="Jayga mobile app showing a warehouse delivery request"/>
        </div>
      </section>

      <section className="case-section case-wrap" id="overview">
        <div className="case-index">01 / Overview</div>
        <div className="case-content">
          <h2>One order record connected the work.</h2>
          <div className="overview-grid"><p className="lead">Warehouse work ran through spreadsheets, handwritten logs and separate handoffs. Orders took days because storage, billing and delivery did not share one record.</p><p>Jayga rents shared warehouse space to businesses that need less than a full facility. I designed the system that linked each customer’s rented space, stock and bill.</p></div>
          <dl className="case-meta"><div><dt>Role</dt><dd>Product lead</dd></div><div><dt>Team</dt><dd>Product lead / 5 engineers / founder</dd></div><div><dt>Timeline</dt><dd>4 months</dd></div><div><dt>Platforms</dt><dd>2 web apps · 1 mobile app</dd></div><div><dt>Methods</dt><dd>Interviews · contextual inquiry</dd></div><div><dt>Tools</dt><dd>Figma · Notion</dd></div></dl>
          <p className="lead narrow">I mapped workflows, defined the grid and billing rules, set the design language and owned the product backlog. I worked with five engineers and the founder, who held the product vision and final decisions.</p>
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
          <JaygaServiceDiagrams/>
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
          <JaygaGridDiagram/>
          <p className="lead narrow">I divided the warehouse into fixed grids with unique IDs. A grid is what a customer rents, where an item is assigned and what the bill is calculated from.</p>
          <div className="grid-rule"><div><span>Problem</span><p>Pricing did not reflect how much rack space was used, and the team could not see which space generated revenue.</p></div><div><span>Product rule</span><p>Assign and confirm one grid before opening the next, limiting errors before another space changes.</p></div></div>
          <div className="jayga-grid-story">
            <div><h3>Keep item history across multiple grids.</h3><p>A quantity can sit across several grids while staying on one item record. Because the live occupancy count was delayed, an “Assigned” tag showed which units had been placed.</p><p className="evidence-note">Next system improvement: replace the temporary tag with a live occupancy count.</p></div>
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
          <h2>Floor confirmation controls record changes.</h2>
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
        <div className="case-index">06 / Delivery and decisions</div>
        <div className="case-content">
          <h2>Own the rules that connect the product and the operation.</h2>
          <p className="lead narrow">I led product logic and end-to-end flows across the client, admin and warehouse experiences. Under a tight timeline, I prioritised decisions that could block engineering and kept lower-risk details open for iteration.</p>
          <p>Flows and prototypes became shared working models for responsibilities, states and edge cases. I mapped workflows, set the design language and owned the backlog; the founder held the product vision and final decisions.</p>
          <div className="learning-grid"><h3>Main learning</h3><p>Operations software becomes useful when the digital record follows the physical work. The grid connected stock, space and billing because it matched how the warehouse actually worked.</p><h3>Next priorities</h3><p>Add the mobile app to the first release, update occupancy live, and strengthen the design system rules across all three apps.</p></div>
          <a className="next-project" href="/portfolio"><span>Next case study</span><strong>Portfolio <ArrowUpRight/></strong></a>
        </div>
      </section>
    </main>
    <About/>
  </>;
}

function AboutMe() {
  const interests = [
    { title: 'Video games', description: 'I love a good single-player story, a difficult level and the feeling of finally getting past it.' },
    { title: 'Football', description: 'I play when I can, follow Manchester United, and keep hoping the next match will be the one.' },
    { title: 'Travelling', description: 'I like wandering around new places, trying food I cannot find at home and taking far too many photos.' },
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
        <div className="interests-head"><h2>Outside work</h2><p>A few things that are simply part of my life.</p></div>
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
      <div><h2>How I work with AI</h2><p>AI-assisted prototyping, research synthesis, design-to-code, production code and the human decisions between them.</p><span>Explore my workflows <ArrowUpRight/></span></div>
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
  else page = <><Nav/><main><Hero/><SelectedProjects/><DesignSystems/><AIWorkflowTeaser/></main><About/></>;
  return <CaseImageProvider>{page}</CaseImageProvider>;
}

if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container.hasChildNodes()) hydrateRoot(container, <App/>);
  else createRoot(container).render(<App/>);
}
