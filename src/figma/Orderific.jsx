// Content and assets from Figma HTGPw4wOrTMg6yLfIgRfnL, node 27:1114.
import React from 'react';
import CaseOutcome from '../CaseOutcome';
import InkInterfaceCarousel from '../InkInterfaceCarousel';
import { ExpandableImage } from '../LegacyPortfolio';
import { PortfolioHeader, ResponsiveArtifact, NextProject, CaseStudyLayout } from '../PortfolioShared';

const interfaces = [
  { src: '/orderific/dashboard.png', title: 'Dashboard', alt: 'Orderific BMS dashboard with onboarding, metrics, charts and inventory', description: 'Shared navigation, onboarding, metrics, charts and inventory.' },
  { src: '/orderific/table.png', title: 'Reviews', alt: 'Orderific review tables with filters, status labels and row actions', description: 'Filters, review status and actions use shared table rules.' },
  { src: '/orderific/Loyalty.png', title: 'Loyalty', alt: 'Orderific loyalty setup with reward-type cards and points-system fields', description: 'Choice cards and form fields support loyalty-program setup.' },
  { src: '/orderific/QRcode.png', title: 'QR designer', alt: 'Orderific QR designer with template, pattern, colour, marker and logo controls', description: 'Template, pattern, colour and logo controls in one screen.' },
  { src: '/orderific/pricing.png', title: 'Pricing', alt: 'Orderific Starter, Pro and Multi Outlet plan cards with features and actions', description: 'Shared cards compare plans, features and primary actions.' },
];

function EvidenceImage({ file, alt, width, height, crop = '', framed = false }) {
  return <figure className={`orderific-figure ${framed ? 'orderific-framed' : ''}`} style={{ width }}>
    <ResponsiveArtifact width={width} height={height}>
      <ExpandableImage src={`/figma/${file}`} alt={alt} className="orderific-expand" imageClassName={`orderific-image ${crop}`}/>
    </ResponsiveArtifact>
  </figure>;
}

function Heading({ title, children, id }) {
  return <div className="orderific-section-heading"><h2 id={id} tabIndex={id ? -1 : undefined}>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Note({ title, children, level = 'h3' }) {
  const Tag = level;
  return <div className="orderific-note"><Tag>{title}</Tag><p>{children}</p></div>;
}

export default function Orderific() {
  return <div className="new-portfolio">
    <PortfolioHeader/>
    <CaseStudyLayout items={[{ href: '#orderific-components', label: 'Components' },{ href: '#orderific-interfaces', label: 'Interfaces' },{ href: '#orderific-direction', label: 'RTL' },{ href: '#orderific-themes', label: 'Themes' },{ href: '#orderific-handoff', label: 'Handoff' }]}>
    <main className="figma-case orderific-case">
      <div className="orderific-intro">
        <h1>A shared system for connected apps</h1>
        <p>I strengthened components, language support, and handoff rules across a restaurant management platform with six connected apps.</p>
      </div>
      <dl className="orderific-details">
        <div><dt>My role</dt><dd>Product Designer</dd></div>
        <div><dt>Owned</dt><dd>Components · RTL · Themes · Handoff</dd></div>
        <div><dt>Team</dt><dd>Designers · PMs · Engineers</dd></div>
      </dl>
      <CaseOutcome project="orderific"/>
            <EvidenceImage file="6b1f7.png" alt="Orderific BMS dashboard and connected restaurant management tools" width={743} height={605} crop="orderific-cover-crop" framed/>
      <div className="orderific-pair orderific-context">
        <Note level="h2" title="Challenge">Components had drifted across products. Missing states and inconsistent rules made reuse and handoff harder. RTL and tablet layouts for many apps were not present.</Note>
        <Note level="h2" title="My contribution">Improved reusable components, refined BMS direction and theme support, and documented rules for the team. All apps had responsive layouts.</Note>
      </div>
      <hr className="portfolio-divider"/>

      <Heading id="orderific-components" title="Reusing components">Different spacing, corners, and missing states pushed designers to detach components. I added reusable properties and shared token rules.</Heading>
      <figure className="case-supporting-evidence">
        <ExpandableImage src="/orderific/component-playground.png" className="case-evidence-image" alt="Orderific component playground with input type, state, content, helper and variable-mode properties"/>
        <figcaption>Type, state, content and helper settings are exposed in one panel. The cards below show shared controls across LTR, RTL and QR customisation.</figcaption>
      </figure>
      <div className="orderific-component-strip" role="region" aria-label="Four component cards; scroll horizontally to see all cards" tabIndex={0}>
        <ExpandableImage src="/orderific/components.png" className="orderific-component-cards" alt="Four Orderific component cards: LTR and RTL delivery zones, English form controls, Arabic form controls and QR customisation"/>
      </div>
      <div className="orderific-notes">
        <Note title="Add missing states">Make common variations available through component properties.</Note>
        <Note title="Set shared visual rules">Use the same spacing, corners, shadows, and token structure.</Note>
        <Note title="Make handoff explicit">Help engineers identify the content and states each component needs, along with references.</Note>
      </div>
      <hr className="portfolio-divider"/>

      <Heading id="orderific-interfaces" title="Interfaces">The same component rules carry through dashboards, review tables, setup forms and pricing.</Heading>
      <InkInterfaceCarousel slides={interfaces} label="Orderific full interfaces"/>
      <hr className="portfolio-divider"/>

      <Heading id="orderific-direction" title="RTL">Direction became a component property in BMS. Navigation and reading order adapt, while maps and other fixed content keep their orientation.</Heading>
      <div className="orderific-rtl-run" role="region" aria-label="BMS LTR and RTL layout comparison" tabIndex={0}>
        <EvidenceImage file="37126.png" alt="Orderific BMS delivery zone layout in English LTR" width={851} height={604} crop="orderific-direction-crop"/>
        <EvidenceImage file="5c0d5.png" alt="Orderific BMS delivery zone layout in Arabic RTL" width={851} height={604} crop="orderific-direction-crop"/>
      </div>
      <hr className="portfolio-divider"/>

      <Heading id="orderific-themes" title="Themes">Figma variable modes let BMS use the same components in light and dark themes. Token values change while layout and interaction states stay consistent.</Heading>
      <div className="orderific-pair orderific-mode-run">
        <EvidenceImage file="6fb8a.png" alt="Orderific BMS sidebar in dark mode" width={147} height={553}/>
        <EvidenceImage file="85823.png" alt="Orderific BMS sidebar in light mode" width={140.689} height={552.507} framed/>
      </div>
      <hr className="portfolio-divider"/>

      <Heading id="orderific-handoff" title="Handoff">I documented naming and handoff rules, trained QA, and hired and mentored two junior designers to help the team apply the system consistently. I regularly worked with product managers and engineers to clarify what UI fields meant and how they connected to business rules.</Heading>
      <div className="orderific-pair orderific-collaboration">
        <figure className="orderific-document">
          <div className="orderific-design-rules">
            <h3>Design rules</h3>
            <ul>{['File and frame names','Component changes','Icon library','Tokens','Handoff stage','Designing edge cases','Responsive states'].map(rule => <li key={rule}>{rule}</li>)}</ul>
          </div>
          <figcaption>Shared rules for design and handoff.</figcaption>
        </figure>
        <p>The backend team maintained a data model with around 220 tables. I helped resolve mismatches and unclear links between interface fields and business data.</p>
      </div>
      <figure className="case-supporting-evidence">
        <ExpandableImage src="/orderific/governance.png" className="case-evidence-image" alt="Orderific documentation showing global, alias and component token layers with naming examples"/>
        <figcaption>The guide connects shared values to semantic and component tokens, with examples the team can follow.</figcaption>
      </figure>
      <hr className="portfolio-divider"/>

      <Heading title="System deliverables"/>
      <ul className="orderific-deliverables">
        <li>6 connected apps <span>~3–4 responsive layouts per app</span></li>
        <li>3 token layers</li>
        <li>LTR and RTL <span>for BMS</span></li>
        <li>Light and dark themes <span>for BMS</span></li>      </ul>
      <hr className="portfolio-divider"/>
      <Heading title="Team development">One of the two junior designers I mentored was promoted.</Heading>
      <NextProject name="Purno" href="/purno"/>
    </main>
    </CaseStudyLayout>
  </div>;
}
