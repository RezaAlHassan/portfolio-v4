# Agent guide

## Project purpose

This repository contains Reza Al Hassan's product-design portfolio. Preserve factual distinctions between projects, especially:

- Zevian: the current founder product for evidence-backed AI performance signals.
- Zevian HRMS: an earlier, broader HR management concept and interface-system project.

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
- All homepage covers use the same fixed height per breakpoint and object-fit: cover; crop instead of stretching or changing individual frame heights.

- Zevian evolution has two stages: evaluation and patterns; investigation and decision. Do not split these back into four versions.
- Purno owner screens use vector assets under public/purno/owner-*.svg; keep them expandable.

## Product design sprint page

- `/sprint` is the service-focused destination for founders and product leaders; the homepage remains the work portfolio.
- Keep one dominant sprint contact action, compact evidence from Zevian, Purno and Jayga, and a short post-sprint partnership note.
- Keep the sprint scope and starting price clear. Do not imply that prototype or design evidence proves shipped product outcomes.
- The sprint hero uses the Zevian demo video with a pause control. Show Purno screens at full height. Use Jayga's desktop grid-assignment image as the main proof, with the mobile view beside it only when space allows.
