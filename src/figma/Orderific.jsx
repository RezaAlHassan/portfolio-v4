// Content and assets from Figma HTGPw4wOrTMg6yLfIgRfnL, node 27:1114.
import React from 'react';
import { ExpandableImage } from '../LegacyPortfolio';
import { PortfolioHeader, ResponsiveArtifact, NextProject } from '../PortfolioShared';

function EvidenceImage({ file, alt, width, height, crop = '', framed = false }) {
  return <figure className={`orderific-figure ${framed ? 'orderific-framed' : ''}`} style={{ width }}>
    <ResponsiveArtifact width={width} height={height}>
      <ExpandableImage src={`/figma/${file}`} alt={alt} className="orderific-expand" imageClassName={`orderific-image ${crop}`}/>
    </ResponsiveArtifact>
  </figure>;
}

function Heading({ title, children }) {
  return <div className="orderific-section-heading"><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Note({ title, children }) {
  return <div className="orderific-note"><h3>{title}</h3><p>{children}</p></div>;
}

export default function Orderific() {
  return <div className="new-portfolio">
    <PortfolioHeader/>
    <main className="portfolio-width figma-case orderific-case">
      <div className="orderific-intro">
        <h1>A shared system for connected apps</h1>
        <p>I strengthened components, language support, and handoff rules across a restaurant management platform with six connected apps.</p>
      </div>
      <dl className="orderific-details">
        <div><dt>My role</dt><dd>Product Designer</dd></div>
        <div><dt>Owned</dt><dd>Components · RTL · Themes · Handoff</dd></div>
        <div><dt>Team</dt><dd>Designers · PMs · Engineers</dd></div>
      </dl>
      <EvidenceImage file="6b1f7.png" alt="Orderific BMS dashboard and connected restaurant management tools" width={743} height={605} crop="orderific-cover-crop" framed/>
      <div className="orderific-pair orderific-context">
        <Note title="Challange">Components had drifted across products. Missing states and inconsistent rules made reuse and handoff harder. RTL and Tablet layouts for many apps were not present</Note>
        <Note title="My contribution">Improved reusable components, refined BMS direction and theme support, and documented rules for the team. All apps had responsive states</Note>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Making components easier to reuse">Different spacing, corners, and missing states pushed designers to detach components. I added reusable properties and shared token rules</Heading>
      <div className="orderific-pair orderific-component-run">
        <EvidenceImage file="5b38e.png" alt="Orderific reusable input component properties and states" width={534.074} height={412} framed/>
        <EvidenceImage file="7079d.png" alt="Orderific input components with shared visual rules" width={534.926} height={432.493} framed/>
      </div>
      <div className="orderific-notes">
        <Note title="Add missing states">Make common variations available through component properties.</Note>
        <Note title="Set shared visual rules">Use the same spacing, corners, shadows, and token structure.</Note>
        <Note title="Make handoff explicit">Help engineers identify the content and states each component needs., along with references</Note>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="RTL Layout">Direction became a component property in BMS. Navigation and reading order adapt, while maps and other fixed content keep their orientation.</Heading>
      <div className="orderific-direction-labels"><span>LTR</span><span>RTL</span></div>
      <div className="orderific-rtl-run" role="region" aria-label="BMS LTR and RTL layout comparison" tabIndex={0}>
        <EvidenceImage file="37126.png" alt="Orderific BMS delivery zone layout in English LTR" width={851} height={604} crop="orderific-direction-crop"/>
        <EvidenceImage file="5c0d5.png" alt="Orderific BMS delivery zone layout in Arabic RTL" width={851} height={604} crop="orderific-direction-crop"/>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Modes">Figma variable modes let BMS use the same components in light and dark themes. Token values change while layout and interaction states stay consistent - with a switch</Heading>
      <div className="orderific-pair orderific-mode-run">
        <EvidenceImage file="6fb8a.png" alt="Orderific BMS sidebar in dark mode" width={147} height={553}/>
        <EvidenceImage file="85823.png" alt="Orderific BMS sidebar in light mode" width={140.689} height={552.507} framed/>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Collaboration and handoff">I documented naming and handoff rules, trained QA, and hired and mentored two junior designers to help the team apply the system consistently. I regularly engaged with product managers and engineers to discuss technical tradeoffs such as what certain UI fields mean, how to apply them and assigning business meaning.</Heading>
      <div className="orderific-pair orderific-collaboration">
        <figure className="orderific-document">
          <div className="orderific-design-rules">
            <h3>Design rules</h3>
            <ul>{['Files and frames names','Component changes','Icon library','Tokens','Handoff stage','Designing edge cases','Responsive states'].map(rule => <li key={rule}>{rule}</li>)}</ul>
          </div>
          <figcaption>A central doc was maintained</figcaption>
        </figure>
        <p>A ~220 table data table was maintained by the backend team. I was the point of contact for when data mismatch or ambiguity on the tech team’s side</p>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Final deliverable"/>
      <ul className="orderific-deliverables">
        <li>6 connected apps <span>~ 3-4 responsive states for each app</span></li>
        <li>3 token layers</li>
        <li>2 directions and themes <span>for the BMS application</span></li>
        <li>1 of 2 designers mentored promoted</li>
      </ul>
      <hr className="portfolio-divider"/>
      <NextProject name="Purno" href="/purno"/>
    </main>
  </div>;
}
