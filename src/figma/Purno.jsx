// Figma HTGPw4wOrTMg6yLfIgRfnL, node 52:834.
import React from 'react';
import { ExpandableImage } from '../LegacyPortfolio';
import { PortfolioHeader, ResponsiveArtifact, NextProject } from '../PortfolioShared';
import PurnoFlow from './PurnoFlow';
import './purno-flow.css';

function Image({ file, alt, width, height, caption, crop = '', framed = false }) {
  return <figure className={`purno-figure ${framed ? 'purno-framed' : ''}`} style={{ width }}>
    <ResponsiveArtifact width={width} height={height}>
      <ExpandableImage src={`/figma/${file}`} alt={alt} caption={caption} className="purno-expand" imageClassName={`purno-image ${crop}`}/>
    </ResponsiveArtifact>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function Heading({ title, children }) {
  return <div className="purno-section-heading"><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Note({ title, children }) {
  return <div className="purno-note"><h3>{title}</h3><p>{children}</p></div>;
}

export default function Purno() {
  return <div className="new-portfolio">
    <PortfolioHeader/>
    <main className="portfolio-width figma-case purno-case">
      <div className="purno-intro">
        <h1>A connected retail system for merchants</h1>
        <p>I designed a retail POS that connects inventory, checkout and payments, with a separate owner experience for sales and business records.</p>
      </div>
      <dl className="purno-details">
        <div><dt>My role</dt><dd>Product Designer &amp; Founder</dd></div>
        <div><dt>Owned</dt><dd>Product ecosystem · UX · Interface design</dd></div>
        <div><dt>Scope</dt><dd>Three months · 2024</dd></div>
      </dl>
      <Image file="bd6d5.png" alt="Purno payment screen and brand cover" width={743} height={518} crop="purno-cover-crop"/>
      <div className="purno-pair purno-context">
        <Note title="Challenge">Connect daily retail tasks in one clear experience for merchants using business software for the first time.</Note>
        <Note title="My contribution">I designed the product ecosystem and complete merchant journey, covering onboarding, inventory, checkout, payments, orders and invoicing.</Note>
      </div>
      <ResponsiveArtifact width={640} height={48}>
        <div className="purno-journey" aria-label="Inventory to cart, order, payment and receipt">
          {['Inventory','Cart','Order','Payment','Receipt'].map((label,i) => <span key={label} style={{ left: [0,147,261,383,537][i] }} className={i === 3 ? 'purno-journey-payment' : ''}>{label}</span>)}
          {[116,229,352,500].map((left,i) => <img key={left} src={`/figma/${i % 2 ? 'c9d9b' : 'd1302'}.svg`} alt="" style={{ left }} width="19" height="8"/>)}
        </div>
      </ResponsiveArtifact>
      <hr className="portfolio-divider"/>

      <Heading title="Research">I compared five POS products and local payment gateways like bKash. The audit informed familiar checkout patterns, shallow navigation and local payment support.</Heading>
      <Image file="81a5e.png" alt="Competitive audit of five POS products and local payment support" width={1076} height={395.878} crop="purno-audit-crop" caption="Competitive analysis" framed/>
      <div className="purno-pair purno-flow-pair">
        <ResponsiveArtifact width={595} height={603}><PurnoFlow/></ResponsiveArtifact>
        <aside className="purno-callout">Purno was built around payments first, then expanded to inventory, a small work tracker and sales insights for the owner.</aside>
      </div>
      <Note title="Flatten the category structure">Reduce four nested levels to one visible level.</Note>
      <Image file="ab917.png" alt="Purno category structure before and after the redesign" width={1046} height={695.59}/>
      <div className="purno-notes">
        <Note title="Explore scan-friendly product cards">Compare five card directions in default and selected states.</Note>
        <Note title="Keep selection visible">Use colour to separate categories, with clear selected states.</Note>
      </div>
      <Image file="0a867.png" alt="Five Purno product-card design explorations and selected states" width={1046} height={683.387}/>
      <hr className="portfolio-divider"/>

      <Heading title="Payment">Cash, card and mobile financial services follow the final cart. Split payment sits above the methods because it changes the amount, not the provider.</Heading>
      <div className="purno-pair purno-payment-pair">
        <Image file="cb268.png" alt="Purno payment methods, split payment and total" width={351} height={765.882} framed/>
        <div className="purno-notes">
          <Note title="Card terminal">Tap or insert, enter PIN, then confirm processing.</Note>
          <Note title="One QR flow for four wallets">Choose a provider, generate Bangla QR, then wait for confirmation. Supported services were bKash, Nagad, Rocket and upay.</Note>
          <Note title="Default selection">The most used payment method is selected automatically.</Note>
        </div>
      </div>
      <div className="purno-image-run">
        <div className="purno-pair">
          <Image file="ef7a7.png" alt="Purno QR code payment screen" width={359.522} height={795.263} framed/>
          <Image file="37a4f.png" alt="Purno mobile payment processing screen" width={368.518} height={795.263} framed/>
          <Image file="01e40.png" alt="Purno mobile financial service provider selection" width={356.301} height={795.263} framed/>
        </div>
        <p className="purno-caption">MFS payment flow</p>
      </div>
      <div className="purno-image-run">
        <div className="purno-pair purno-card-pair">
          <div className="purno-pair purno-terminal-screens">
            <Image file="f8076.png" alt="Purno card payment tap or insert screen" width={326.691} height={705} framed/>
            <Image file="232a3.png" alt="Purno card payment PIN entry screen" width={327} height={708.282} framed/>
          </div>
          <aside className="purno-callout">Connects to POS hardware developed by Purno.</aside>
        </div>
        <p className="purno-caption">Card payment flow</p>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Product scan and receipt">Purno connects payments, custom receipts and a barcode scanner directly inside the product.</Heading>
      <div className="purno-pair purno-scan-pair">
        <Image file="e8013.png" alt="Purno barcode scanning and product search design" width={875.276} height={558.718} caption="Products can be scanned by barcode inside the product."/>
        <Image file="ba630.png" alt="Purno customised printed receipt" width={237} height={663.6} framed/>
      </div>
      <Image file="75dde.png" alt="Purno product selection for different quantity types" width={875} height={600.687} caption="Product selection supports different quantity types."/>
      <hr className="portfolio-divider"/>

      <Heading title="Owner experience">The owner experience brings together sales, top products and payment records, with detail available when a transaction needs checking.</Heading>
      <div className="purno-pair purno-owner-run">
        <Image file="299a1.png" alt="Purno owner daily sales and top products" width={375} height={902} crop="purno-daily-crop" framed/>
        <Image file="afd7b.png" alt="Purno owner transaction details and payment records" width={346.353} height={902.432} framed/>
        <Image file="2d155.png" alt="Purno owner sales report by category" width={374} height={913} crop="purno-report-crop" framed/>
      </div>
      <hr className="portfolio-divider"/>

      <Heading title="Outcomes"/>
      <ul className="purno-outcomes">
        <li>$10K seed funding <span>from the design prototype</span></li>
        <li>~20% faster transaction time <span>estimate for merchants</span></li>
        <li>3 applications <span>for employees, owners and payments</span></li>
        <li>Web portal <span>for quick online business setup</span></li>
      </ul>
      <hr className="portfolio-divider"/>
      <NextProject name="Orderific" href="/orderific"/>
    </main>
  </div>;
}
