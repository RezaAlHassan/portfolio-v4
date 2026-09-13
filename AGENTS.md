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
