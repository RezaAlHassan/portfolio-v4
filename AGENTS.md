# Agent guide

## Project purpose

This repository contains Reza Al Hassan's product-design portfolio. Preserve factual distinctions between projects, especially:

- Zevian: the current founder product for evidence-backed AI performance signals.
- Zevian HRMS: an earlier, broader HR management concept and interface-system project.

## Portfolio routes

- `/` is a two-link entry page for `/product` and `/design`.
- `/design` keeps the original design homepage and four-cover layout. Its cover order is Zevian, Orderific, Jayga and Purno.
- `/product` has four covers in this order: Zevian, Orderific, Jayga and Purno. Jayga is marked as the featured project. There is no Other work section.
- `/product/jayga`, `/product/zevian`, `/product/purno` and `/product/orderific` put outcomes before process while preserving design decisions and process flows. Do not show a Jayga deferred section.
- `/product/purno` preserves the full Purno design story. `/product/zevian` preserves the full investigation flow and two-stage evolution. `/product/orderific` starts with the measured handover and onboarding comparisons, then covers the first seven months of systems, RTL, audits, hiring and team guidance before the later interface-to-data mapping phase. It shows component properties, documentation, the selected dark-mode Figma frame with its name, LTR/RTL and light/dark examples. Keep images expandable and their claims specific.
- Orderific's early scope was four restaurant management platforms and two HRMS platforms. The 28% development-time result came from a before-and-after handover comparison. The onboarding-time comparison was between Reza's own onboarding and that of new hires after he wrote the Figma guide. Do not present the later field-to-data mapping as the whole project, or call all six platforms restaurant products.
- Product homepage project descriptions have at most three text lines: up to two for the work and one regular-weight metric line. Jayga's ~3× revenue figure is a modelled potential, not a realised result.
- The product cards report two paying Zevian customers, a 28% Orderific development-time reduction and half the onboarding time, Jayga leadership of an eight-person team, and Purno's moderated-test and seed-funding figures. Keep the Zevian customer count distinct from validation of its current prototype. The Jayga team total is broader than the five engineers and founder named in the four-month storage case.
- Jayga ran from November 2023 to August 2025. The storage case shown here is a four-month scope in 2024; keep those dates distinct. The product case reuses the full design-case layout with product-focused copy, research, journey mapping, prioritisation, grid rules and delivery decisions.
- The original `/jayga`, `/zevian`, `/purno` and `/orderific` design cases remain available.

## Commands

- Install dependencies: `npm install`
- Start development: `npm run dev`
- Verify production: `npm run build`

## Source of truth

- Application and copy: `src/main.jsx`
- Styling and responsive rules: `src/styles.css`
- Design principles: `DESIGN.md`
- Structured design tokens: `.impeccable/design.json`
- Public project images: `public/<project>/`
- AI-readable site map: `public/llms.txt`

Do not edit `dist/`; it is generated and ignored by Git.

## Implementation rules

- Use B2-level English and concrete product language.
- Keep the warm-paper, ink, and signal-lime visual system.
- Use DM Sans for UI and body copy. Use Instrument Serif only as a brief editorial gesture.
- Keep project claims tied to visible evidence. Do not invent metrics, customers, research findings, or outcomes.
- Keep all interactions keyboard accessible and support reduced motion.
- Test desktop and mobile layouts after interface changes.
- Reuse `ExpandableImage` for project images that should open in the image viewer.
- Add route-specific title and description data to `pageMetadata` when adding a page.
- Update `public/llms.txt` and this file when routes or project meanings change.

## Portfolio PDF evidence

- The Portfolio 2027 PDF adds Jayga's service ecosystem and journey, and Purno's owner app.
- Purno: 2024, three months, product designer and founder. Jayga: 2024, four months, product lead, five engineers and founder.
- Preserve the PDF diagrams exactly as vector artwork, including whitespace, topology and text outlines; adapt their colours to the portfolio design system. The homepage has four complete covers in a 2x2 grid, stacking on mobile. Use the sharp matching Zevian vector cover, high-resolution Orderific RTL/LTR comparison, full Purno cover and original Jayga warehouse photo. Owner-app screens are supplied separately.
- See PORTFOLIO-REVIEW.md for claims that still need supporting evidence. Do not restore Jayga's order-speed headline without confirming its source.

## Work portfolio audience

- Review site copy for employment and client work. The university PDF is a visual reference, not the authority for the website story.
- Keep ownership, decisions, delivery status and evidence distinct. See WORK-PORTFOLIO-REVIEW.md for unresolved story questions.
- Avoid summary lines and overview cards that repeat nearby headings, project descriptions or later evidence. Keep introductions when they add necessary background, scope, decision reasons or evidence limits.
- All homepage covers use the same fixed height per breakpoint and object-fit: cover; crop instead of stretching or changing individual frame heights.
- Orderific's homepage cover contains the supplied `public/Or-C1.png` through `Or-C4.png` cards in `DraggableMarquee`. Keep the outer cover height and project metadata aligned with the other projects; show inner cards fully, support drag/swipe and keyboard arrows, and reuse ExpandableImage. The strip moves slowly by default, pauses on hover or focus, and has no visible controls. Keep keyboard arrows and Space to pause, and disable automatic motion for reduced-motion users. Zevian also autoplays without visible controls; clicking its cover or pressing Enter/Space pauses or plays it.

- Zevian evolution has two stages: evaluation and patterns; investigation and decision. Do not split these back into four versions.
- Purno owner screens use vector assets under public/purno/owner-*.svg; keep them expandable.
- The homepage hero has one canvas particle detail in `src/Particles.jsx`, alternating Tangled path and Clear flow, opening on Clear flow. It sits beside the headline on desktop and below the supporting copy on smaller screens, with only a Hover hint. It moves only on interaction, supports keyboard shape changes and stays static for reduced motion.

## Product design sprint page

- `/sprint` is the service-focused destination for founders and product leaders; the homepage remains the work portfolio.
- Keep one dominant sprint contact action, compact evidence from Zevian, Purno and Jayga, and a short post-sprint partnership note.
- Keep the sprint scope and starting price clear. Do not imply that prototype or design evidence proves shipped product outcomes.
- The sprint hero uses the Zevian demo video with a pause control. Show Purno screens at full height. Use Jayga's desktop grid-assignment image as the main proof, with the mobile view beside it only when space allows.
