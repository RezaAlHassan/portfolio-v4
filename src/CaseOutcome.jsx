import React from 'react';

// Shared case template: outcome, three metrics and one key decision near the top;
// what didn't work and what's next near the end (CaseReflection).
const cases = {
  zevian: {
    outcome: 'Sunset after 10+ discovery conversations showed that performance changes depend on factors the system could not see. No paying customers.',
    metrics: [['10+', 'discovery conversations'], ['2', 'prototypes: React v1 and the later investigation prototype'], ['3', 'requirements: fit existing tools instead of adding a dashboard, reduce cognitive load, include business context']],
    decision: 'Stopped building. Performance causes sat outside the system’s data, so a second build would have answered the wrong question.',
    alternative: 'Keep developing the investigation prototype.',
    didntWork: 'I spent considerable time polishing the v1 prototype without a customer request or feedback. I demoed the investigation workflow in Figma first and only built it as a prototype later.',
    next: 'Two leads asked for integration with their existing tools. One said business context is needed to explain performance changes. Both shape my next project.',
  },
  orderific: {
    outcome: 'A design system across six connected restaurant apps, with component detachment down from 50% to 20%.',
    metrics: [['50% → 20%', 'component detachment after adding configurable properties'], ['~25%', 'fewer design–engineering review meetings over 8 weeks'], ['4 → 2 weeks', 'designer onboarding (3 designers)']],
    decision: 'Expose common variations as component properties, with shared token rules.',
    alternative: 'Let designers keep detaching components for missing states.',
    didntWork: 'Because of time constraints, I built the RTL screens first with detached components. The dark-mode switch already existed, so turning it on switched every component to its dark variant. RTL had no matching variable property.',
    next: 'Build RTL as a component property first.',
  },
  jayga: {
    outcome: 'Delivered in four months against a six-month deadline.',
    metrics: [['4 vs 6', 'months, about 33% ahead of the deadline'], ['~3×', 'projected revenue per m², assuming each rack level is priced separately'], ['UNDP', 'first client']],
    decision: 'Keep quantity splits on one item card and confirm each grid individually.',
    alternative: 'Batch assignment, which did not fit uneven or partly filled spaces.',
    didntWork: 'I over-emphasised how the design should function. Prototypes moved conversations and gave direction; stepping back from enforcing my exact design produced better results.',
  },
  purno: {
    outcome: '$10K seed funding from Orange Corners, supported by the design prototype.',
    metrics: [['$10K', 'seed funding'], ['3', 'applications: employees, owners and payments'], ['5', 'POS products audited']],
    decision: 'Flatten four nested category levels into one visible level.',
    alternative: 'Keep the nested structure, which made merchants move through each branch during checkout.',
    didntWork: 'I A/B tested multiple variants with the founder, mostly on assumptions. Asking for exact requirements and raising them in conversation would have cut iterations and variants.',
  },
  hrms: {
    outcome: 'Delivered an HRMS prototype and reusable interface system for records, attendance, policies and approvals. Shared components brought the broad concept into one visual language; it remained an early product direction.',
  },
  portfolio: {
    outcome: 'Built a responsive portfolio with a shared visual system and a four-project homepage. Clearer project hierarchy and consistent case layouts replaced separate visual styles.',
  },
};

export default function CaseOutcome({ project }) {
  const { outcome, metrics, decision, alternative } = cases[project];
  return <section className="case-outcome-summary" aria-label="Outcome summary">
    <h2>Outcome</h2>
    <p>{outcome}</p>
    {metrics && <dl className="case-outcome-metrics">
      {metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
    </dl>}
    {decision && <div className="case-key-decision">
      <h2>Key decision</h2>
      <p>{decision}</p>
      <p className="case-key-decision-alt"><span>Rejected:</span> {alternative}</p>
    </div>}
  </section>;
}

export function CaseReflection({ project }) {
  const { didntWork, next } = cases[project];
  if (!didntWork && !next) return null;
  return <section className="case-reflection" aria-label="Reflection">
    {didntWork && <div><h2>What didn’t work</h2><p>{didntWork}</p></div>}
    {next && <div><h2>What’s next</h2><p>{next}</p></div>}
  </section>;
}
