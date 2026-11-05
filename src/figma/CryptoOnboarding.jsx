import React from 'react';
import { ExpandableImage } from '../LegacyPortfolio';
import { PortfolioHeader, PortfolioFooter, CaseStudyLayout, NextProject } from '../PortfolioShared';
import './crypto-onboarding.css';

const source = 'https://www.figma.com/design/7RaNmBNxyonaXduNGPBs8q/Crypto.com-Clearer-onboarding-UX-quest?node-id=12-804';
const topics = [
  { href: '#crypto-context', label: 'Context' },
  { href: '#crypto-decisions', label: 'Decisions' },
  { href: '#crypto-findings', label: 'Findings' },
  { href: '#crypto-next', label: 'Next test' },
];

function Screen({ file, alt, title, children, node }) {
  return <figure className="crypto-screen" data-figma-node={node}>
    <ExpandableImage src={`/crypto-onboarding/${file}.png`} alt={alt} className="crypto-screen-image"/>
    <figcaption><h3>{title}</h3><p>{children}</p></figcaption>
  </figure>;
}

export default function CryptoOnboarding() {
  return <div className="new-portfolio">
    <PortfolioHeader/>
    <CaseStudyLayout items={topics}>
      <main className="figma-case orderific-case crypto-case">
        <div className="orderific-intro">
          <p className="crypto-eyebrow">Crypto.com · Onboarding redesign</p>
          <h1>Making Crypto.com onboarding easier to follow</h1>
          <p>A focused redesign of expectations, progress and the setup sequence, informed by a review of 11 platforms.</p>
        </div>
        <dl className="orderific-details">
          <div><dt>Project</dt><dd>UX redesign exercise</dd></div>
          <div><dt>Scope</dt><dd>Onboarding · Progress · Identity checks</dd></div>
          <div><dt>Research</dt><dd>11 platforms reviewed · 2 early sessions</dd></div>
        </dl>
        <section className="case-outcome-summary" aria-labelledby="crypto-early-title">
          <h2 id="crypto-early-title">Early testing suggests clearer progress</h2>
          <p>P01 identified his stage using the stepper, but could not fully recall what remained. P02 identified his position more confidently in the redesign. The guided sessions support progress visibility; satisfaction, completion time and abandonment have not been measured.</p>
        </section>

        <section className="crypto-section" aria-labelledby="crypto-context">
          <div className="orderific-section-heading">
            <h2 id="crypto-context">Context</h2>
            <p>I reviewed onboarding flows across 11 platforms and selected Crypto.com. The captured flow revealed requirements gradually, gave little visibility into overall progress and requested nationality after showing “Verification Successful.”</p>
          </div>
          <p className="crypto-copy">The design question was how to make the required checks and remaining work easier to understand. This case presents a redesign exercise and early interview feedback.</p>
          <a className="crypto-source" href={source} target="_blank" rel="noreferrer">View the source flow in Figma ↗</a>
        </section>
        <hr className="portfolio-divider"/>

        <section className="crypto-section" aria-labelledby="crypto-decisions">
          <div className="orderific-section-heading">
            <h2 id="crypto-decisions">Decisions</h2>
            <p>I made three focused changes: an opening expectations screen, a stepper on the setup screens and earlier nationality collection.</p>
          </div>
          <div className="crypto-evidence-grid">
            <Screen file="expectations" node="3:2009" title="Set expectations upfront" alt="Redesigned introduction listing contact details, passcode, identity checks and review before account setup begins">The opening screen lists the required checks and asks users to have a photo ID ready. It explains that review follows submission.</Screen>
            <Screen file="progress" node="12:548" title="Keep progress visible" alt="Redesigned email screen with the first segment of a four-stage progress indicator highlighted">A four-stage stepper gives users a reference for their position. This is the element P01 used to identify his current stage.</Screen>
          </div>
          <div className="crypto-evidence-row">
            <Screen file="nationality" node="19:1651" title="Collect nationality earlier" alt="Nationality selection screen from the redesigned flow">The nationality screen is included earlier in the proposed sequence.</Screen>
            <div className="orderific-note">
              <h3>Finish setup in one sequence</h3>
              <p>I moved nationality into initial setup and removed three follow-up screens. With the new expectations screen, the redesigned flow has two fewer screens overall. The required verification checks remain.</p>
              <p>P02 preferred this change after it was explained. That is a stated preference, not evidence that users independently understood the new sequence.</p>
            </div>
          </div>
          <p className="crypto-copy">Coinbase informed the stage overview, while Solflare informed the short security explanations. AI supported research, early design generation and documentation; I manually refined the key screens to match Crypto.com.</p>
          <div className="crypto-evidence-grid">
            <Screen file="id-recovery" node="12:836" title="Explain how to recover" alt="ID-photo recovery screen explaining the photo issue, retake guidance and saved details">The proposed recovery screen explains why the photo needs a retake, gives photo guidance and states which details are already saved. This behaviour has not been validated by the supplied findings.</Screen>
            <Screen file="complete" node="12:1041" title="Confirm completion" alt="Redesigned verification success screen confirming setup is complete and account access is available">The final state says verification and setup are complete. It documents the intended end of the redesign, not a shipped product result.</Screen>
          </div>
        </section>
        <hr className="portfolio-divider"/>

        <section className="crypto-section" aria-labelledby="crypto-findings">
          <div className="orderific-section-heading">
            <h2 id="crypto-findings">Findings</h2>
            <p>I conducted two early, guided sessions with participants familiar with account setup or crypto apps.</p>
          </div>
          <div className="crypto-findings">
            <div><h3>Progress was easier to identify</h3><p>P01 identified the current stage using the stepper, but could not fully recall what remained. P02 identified his position more confidently in the redesign.</p></div>
            <div><h3>Completion created an expectation</h3><p>P02 expected the homepage after verification. He preferred earlier nationality collection after the changes were explained. That final preference followed an explanation, so it does not show unassisted understanding of the new sequence.</p></div>
            <div><h3>Limited value from the introduction</h3><p>The expectations screen offered limited additional value to these experienced participants. These guided sessions do not show how a beginner would understand or complete the flow.</p></div>
          </div>
        </section>
        <hr className="portfolio-divider"/>

        <section className="crypto-section" aria-labelledby="crypto-next">
          <div className="orderific-section-heading">
            <h2 id="crypto-next">Next test</h2>
            <p>The redesign simplifies the sequence and provides clearer progress information. Next, I would test with a beginner and compare both versions without guidance.</p>
          </div>
          <div className="crypto-findings">
            <div><h3>Target · 30% higher satisfaction</h3><p>Use the same satisfaction question and rating scale after each version. Compare the original flow with the redesign. The 30% figure is a target to test, not an achieved result.</p></div>
            <div><h3>Proposed comparison</h3><p>Compare unassisted completion, progress understanding and satisfaction across both versions. Give participants the same setup task and vary which version they see first. Check whether they can identify their stage and what remains. Ask for ratings before explaining the changes.</p></div>
            <div><h3>Hypothesis · Lower abandonment</h3><p>Upfront expectations may reduce abandonment. This has not been measured. A later test would need completion and drop-off data from comparable onboarding starts; interview preference alone cannot confirm it.</p></div>
          </div>
          <p className="crypto-copy">The next learning question: can users understand the sequence without explanation, and does that clarity improve satisfaction after completing it?</p>
        </section>
        <NextProject name="Zevian HRMS" href="/zevian-hrms"/>
      </main>
    </CaseStudyLayout>
    <PortfolioFooter/>
  </div>;
}
