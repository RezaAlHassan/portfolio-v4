import React from 'react';

const outcomes = {
  zevian: 'I designed and built the earlier scoring product with payment and email integrations, reaching two paying customers. Manager feedback led to a new investigation workflow. That React prototype remains in development; its outcomes are not yet validated.',
  jayga: 'Delivered client and admin workflows and a mobile warehouse concept around one shared order record. The rack-pricing model showed up to 3× potential revenue per m²; it was not built, and actual revenue is unknown.',
  purno: 'Delivered a POS design prototype and owner-app flows, expanding a payments brief into a connected retail system. The prototype supported a $10K seed funding pitch; transaction-speed gains remain estimates.',
  orderific: 'Delivered reusable components, responsive layouts and handoff documentation for six connected restaurant apps. Internal comparisons showed 28% less development time after handover changes and half the onboarding time after the Figma guide.',
  hrms: 'Delivered an HRMS prototype and reusable interface system for records, attendance, policies and approvals. Shared components brought the broad concept into one visual language; it remained an early product direction.',
  portfolio: 'Built a responsive portfolio with a shared visual system and a four-project homepage. Clearer project hierarchy and consistent case layouts replaced separate visual styles.',
};

export default function CaseOutcome({ project }) {
  return <section className="case-outcome-summary" aria-label="Outcome summary">
    <h2>Outcome</h2>
    <p>{outcomes[project]}</p>
  </section>;
}
