# Agent guide

## Project purpose

This repository contains Reza Al Hassan's product-design portfolio. Preserve factual distinctions between projects, especially:

- Zevian: the current founder product for evidence-backed AI performance signals.
- Zevian HRMS: an earlier, broader HR management concept and interface-system project.

## Current Figma redesign (October 2026)

- The homepage Other work section has two compact linked rows: Zevian HRMS and AI workflows. Each shows the work, three keywords and proof. HRMS shows the user-supplied 25k+ Dribbble views, with the Dribbble link inside its case study. Portfolio is no longer listed on the homepage; its existing route stays available.

- The Figma file HTGPw4wOrTMg6yLfIgRfnL is the visual authority for the new homepage (1:2), Zevian case (9:178), Jayga case (32:110), Purno case (52:834), and Orderific case (27:1114).
- `/orderific` uses the exact text and content order from Figma node 27:1114, including supplied spelling and punctuation. Do not rewrite its copy. Keep the wide LTR/RTL image pair horizontally scrollable and every evidence image expandable. The prior case remains at `/archive/orderific`; `/product/orderific` retains its product case.
- `/`, `/design`, and `/product` render the same new homepage: Zevian, Jayga, Orderific, Purno. The image, image-to-text spacing and all text form one native card link and hover area. Zevian uses the earlier `/zevian/demo-loop.mp4` video without play/pause controls; reduced motion pauses playback. Orderific reuses the moving `Or-C1.png`–`Or-C4.png` component cards, drag/swipe, keyboard arrows, Space to pause, hover/focus pause and expandable images. All outer cover heights stay aligned.
- `/purno` uses the new Figma case, with Purno-specific introduction and scope in place of the copied Orderific introduction. The user confirmed the ~20% faster transaction-time figure is an estimate; label it as an estimate and do not present it as measured. The original case remains at `/archive/purno`, and `/product/purno` keeps its existing product case.
- The new pages use an almost-white grey background (`#fafafa`), Outfit, and the exact supplied Figma assets under `public/figma/`. Keep screen assets unchanged so their white surfaces remain distinct from the page. Responsive reading layouts stack on mobile; fixed diagram coordinates are preserved inside ResponsiveArtifact.
- All other live routes use this same system: `/about`, `/ai-workflows`, `/sprint`, `/zevian-hrms`, `/portfolio`, and the four `/product/<project>` cases. They retain their full story and supplied evidence, use shared `PortfolioHeader` and `PortfolioFooter`, and load scoped rules from `src/secondary-pages.css`. `LegacyPortfolio.App` receives `modern` only for live pages. Archive routes keep the earlier typography, colours, navigation and layouts. Zevian's live product case uses a top details row instead of the old sticky sidebar.
- Homepage covers have 8px corners. A cursor-following black pill changes after one second to blue; every label is one word: Zevian AI → Sales, Jayga Service → Logistics, Orderific Systems → Restaurants, Purno UX → Retail. Keep the pill inside the viewport. Keyboard focus uses a position near the cover; Escape dismisses it. Tooltips must not block cover controls, mouse clicks must not leave them behind, and reduced motion disables fades.
- Homepage and case code: `src/PortfolioHome.jsx`, `src/PortfolioShared.jsx`, `src/portfolio.css`, and `src/figma/`. The root `index.html` remains the Vite entry; the build generates complete route HTML.
- The prior source, including uncommitted edits, is saved in `archive/portfolio-before-2026-10-15/`. Its live implementation is retained in `src/LegacyPortfolio.jsx`.
- Previous homepages are at `/archive`, `/archive/design`, and `/archive/product`. Old case pages can be viewed at `/archive/<original route>`. Other existing routes remain available. Archive links return to the current portfolio.
- Project facts and evidence limits below still apply; previous homepage-specific visual rules below describe the archived version.

## Previous portfolio routes

- `/` is a two-link entry page for `/product` and `/design`.
- `/design` keeps the original design homepage and four-cover layout. Its cover order is Zevian, Orderific, Jayga and Purno. A short, full-width AI workflows teaser follows the main covers, then an Other work section shows Zevian HRMS and Portfolio as image cards. The HRMS card uses the work-policy crop.
- `/design` metric lines show Zevian's 10+ discovery conversations and React prototype; Jayga's modelled ~3× revenue per m² and leadership of four engineers; and Purno's $10K seed funding and cross-platform POS. The Jayga case still reports work with five engineers in the 2024 storage scope; verify how these team counts relate before changing the case.
- `/product` has four covers in this order: Jayga, Zevian, Orderific and Purno. Jayga is marked as the featured project. There is no Other work section.
- The `/product` hero leads with Product Manager and mentions design once as a design-led approach in supporting copy. Keep `/design` clearly design-focused.
- `/product/jayga`, `/product/zevian`, `/product/purno` and `/product/orderific` put outcomes before process while preserving design decisions and process flows. Do not show a Jayga deferred section.
- `/product/purno` preserves the full Purno design story. `/product/zevian` preserves the full investigation flow and two-stage evolution. `/product/orderific` starts with the measured handover and onboarding comparisons, then covers the first seven months of systems, RTL, audits, hiring and team guidance before the later interface-to-data mapping phase. It shows component properties, documentation, the selected dark-mode Figma frame with its name, LTR/RTL and light/dark examples. Keep images expandable and their claims specific.
- Orderific was one omnichannel restaurant management platform with six connected apps, not HRMS work. Five apps are currently named: BMS (the main brand management system), CP (MCP), MSP kitchen management, WSP delivery tracking and WCP Smartmenu payments. Do not invent the sixth name. Device views were BMS desktop/tablet, CP (MCP) tablet/mobile, MSP desktop/tablet, WSP desktop/tablet/mobile and WCP Smartmenu desktop/tablet. BMS also supported light/dark modes and English LTR/Arabic RTL; do not imply that every app had those modes. Reza's main work was design systems, standard file and frame naming, and documentation that prepared files for automated development. The 28% development-time result came from a before-and-after handover comparison. The onboarding-time comparison was between Reza's own onboarding and that of new hires after he wrote the Figma guide. Do not present the later field-to-data mapping as the whole project.
- Product homepage project descriptions have at most three text lines: up to two for the work and one regular-weight metric line. Jayga's ~3× revenue figure is a modelled potential, not a realised result.
- The product cards report two paying Zevian customers, a 28% Orderific development-time reduction and half the onboarding time, Jayga leadership of an eight-person team, and Purno's seed-funding figure. Keep the Zevian customer count distinct from validation of its current prototype. The Jayga team total is broader than the five engineers and founder named in the four-month storage case.
- Purno's card variants are design explorations. Moderated testing did not happen; do not claim a measured transaction-speed improvement. Zevian's earlier evaluation prototype uses one borderless ticker row of large expandable KPI, report, dashboard and Ask AI images, labelled "Earlier prototype: employee scoring", plus a link to the archived case study. Support drag, arrow keys, Space to pause, hover/focus pause and a static, horizontally scrollable row for reduced motion. The current section is labelled "Current: investigation and diagnosis". Keep these separate from Zevian HRMS.
- Jayga ran from November 2023 to August 2025. The storage case shown here is a four-month scope in 2024; keep those dates distinct. The product case reuses the full design-case layout with product-focused copy, research, journey mapping, prioritisation, grid rules and delivery decisions.
- The original `/jayga`, `/zevian`, `/purno` and `/orderific` design cases remain available.

## Commands

- Install dependencies: `npm install`
- Start development: `npm run dev`
- Verify production: `npm run build`

## Source of truth

- Routing and metadata: `src/main.jsx`; new case content in `src/figma/`, retained stories and archive content in `src/LegacyPortfolio.jsx`
- Active design system: `src/portfolio.css`, `src/PortfolioShared.jsx` and `src/secondary-pages.css`
- Original layout rules: `src/styles.css` and `src/ZevianCase.css`, with live-page overrides scoped to `.portfolio-secondary`
- Design principles: `DESIGN.md`
- Structured design tokens: `.impeccable/design.json`
- Public project images: `public/<project>/`
- AI-readable site map: `public/llms.txt`

Do not edit `dist/`; it is generated and ignored by Git.

## Implementation rules

- Use B2-level English and concrete product language.
- Keep the warm-paper, ink and signal-lime visual system, with light neutral surfaces around evidence.
- Homepages and project detail pages share calm sentence-case headlines and smaller section titles. Homepage cards omit tag pills; detail pages keep scope tags as plain text. Use neutral narrative panels with small lime markers, and preserve diagram colours and evidence.
- Use three shared case layouts: story sections with one aligned reading column, two-column evidence grids and two-column comparisons. Stack grids on mobile. Preserve product flows and supplied vector diagrams as artifacts within these layouts.
- Jayga and Purno design and product cases keep their original layouts, navigation and image arrangements, while sharing the portfolio's sentence-case headings, body styles, labels, captions and metric typography. The newer shared case layouts, image-height caps and paired-text rules do not apply to them.
- Zevian uses the case-study layout from `mariedvorzak.at/case-studies/multiplicity-pilot/`: a fixed top navigation, a sticky 320px project-details sidebar, a 64px gutter, a 620px reading column and wider image runs. At 900px and below, project details stack above the story. Preserve the portfolio fonts and warm-paper colours. The story remains current product, discovery, current experience, two-stage evolution, then system and build; the product route puts outcomes first. Show raw images without added borders, backgrounds or framing. Use runs of images with brief captions between short text blocks; avoid repeated explanations and numbered notes. Detailed research and AI methods stay in closed accordions. Keep the earlier prototype in its separate borderless single-row archive.
- Keep case-content images at a reasonable height: at most 500px on desktop and 420px on mobile, using contain and the shared image viewer. Vertically centre desktop explanations beside their images. Metric labels sit below their values.
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
- Zevian's current React prototype was built with Claude Code and Codex and iterated on manager feedback. It remains in development, with CRM and outreach integration work to find sales-pipeline issues; no public link is supplied for it. `https://demo.zevian.co/dashboard` shows the earlier employee-scoring prototype. Its archived case study is at `https://rezaalhasan.netlify.app/zevian`.
- Keep Zevian's detailed AI methods inside closed native accordions, with a short visible summary for each stage. Earlier build: shadcn and Datadog libraries, SQL scripts, Supabase, production/local/test branches, Antigravity, Codex, Claude Code and automated tests set up with Google's Jules. Current design method: Figma tokens and component-based pages guide the AI build beyond common SaaS dashboard templates.
- Zevian manager feedback is paraphrased: unclear dashboard numbers led to removing the dashboard and narrowing the current workflow; pattern investigation was already part of one manager's job and a bigger problem for another; distrust of AI decisions informed visible evidence and manager control. These are qualitative feedback and design decisions, not measured validation outcomes.
- Zevian research synthesis used Fireflies for interview transcripts, organised in a dedicated Google Drive folder connected to ChatGPT. The discovery section has one closed accordion containing the research method and all feedback-to-design changes, with a short visible summary of both methodology and major changes.
- Purno owner screens use vector assets under public/purno/owner-*.svg; keep them expandable.
- The homepage hero has one canvas particle detail in `src/Particles.jsx`, opening on a grain portrait made from Reza's supplied photo, then cycling through Tangled path and Clear flow. The portrait uses sampled ink dots from `src/portrait-points.json`. It sits beside the headline on desktop and below the supporting copy on smaller screens, without a visible hint or selected-work hero button. On first entering view, the dots fade in and gather into the portrait over about 1.5 seconds. After that, it moves only on interaction, supports keyboard shape changes and stays static for reduced motion, which also skips the entrance animation.

## Product design sprint page

- `/sprint` is the service-focused destination for founders and product leaders; the homepage remains the work portfolio.
- Keep one dominant sprint contact action, compact evidence from Zevian, Purno and Jayga, and a short post-sprint partnership note.
- Keep the sprint scope and starting price clear. Do not imply that prototype or design evidence proves shipped product outcomes.
- The sprint hero uses the Zevian demo video with a pause control. Show Purno screens at full height. Use Jayga's desktop grid-assignment image as the main proof, with the mobile view beside it only when space allows.
