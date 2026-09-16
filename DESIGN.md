---
name: Reza Portfolio
description: A clear one-accent editorial portfolio for a founder-designer shaping systems and AI workflows.
colors:
  ink: "#151515"
  paper: "#f3f0e8"
  accent: "#d8ff52"
  surface: "#e8e5dd"
  surface-strong: "#ddd9d0"
  product-paper: "#f8f6ee"
  white: "#ffffff"
  line: "rgba(21, 21, 21, 0.18)"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(58px, 6.4vw, 88px)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(46px, 5vw, 72px)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "46px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  editorial-accent:
    fontFamily: "Instrument Serif, serif"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
rounded:
  focus: "4px"
  control: "5px"
  small: "7px"
  note: "10px"
  window: "13px"
  panel: "14px"
  feature: "16px"
  pill: "99px"
spacing:
  xs: "7px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  gutter: "28px"
  card: "38px"
  section-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 18px"
  button-selected-work:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
  button-primary-mobile:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 18px"
  chip-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 11px"
  chip-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 11px"
  feature-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.feature}"
  project-art:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
---

# Design System: Reza Portfolio

## Overview

**Creative North Star: "The Founder’s Field Notes"**

This is a warm, light editorial portfolio with the directness of a working notebook. Large compact type carries a broader product-design position: Reza shapes clear systems and AI workflows, not only screens. Fine ink rules organize the page, neutral product surfaces make detailed work readable, and a single lime accent marks evidence, active signals, and useful next actions.

The system should feel clear enough to explain complex product decisions and personal enough to show a strong point of view. Zevian is the featured founder product and the only place where motion runs continuously. Other projects remain still until hover, so the page reads calmly before it demonstrates direction, payment choice, or order state.

**Key Characteristics:**

- Warm paper and near-black ink form the main canvas.
- Lime is the only chromatic accent and marks the selected-work CTA, evidence, active signals, and the dot in the bold “REZA A” wordmark.
- The hero states “Product designer for early B2B & AI products” in three tightly spaced lines.
- Bold, tightly set DM Sans headlines receive brief Instrument Serif gestures.
- Thin rules and compact rows create a continuous editorial rhythm.
- Zevian holds the largest and most detailed illustrative product frame.
- “Systems I’ve shaped” presents capability through two concise pieces of system evidence.
- Process and contact copy is practical, direct, and grounded in how the work moves forward.

## Colors

The palette is a one-accent system: warm paper, strong ink, one electric lime signal, and a short neutral surface ladder.

### Primary

- **Signal Lime:** The sole accent. Use it for the “See selected work” CTA, the featured-product tag, evidence scans, active diagram markers, the mark’s signal dot, the mobile navigation action, text selection, and the outer keyboard-focus halo.

### Neutral

- **Editorial Ink:** Main text, major rules, product-window borders, diagram rails, primary navigation actions, and compact dark controls.
- **Warm Paper:** Default page background and paper-like notes inside artifacts.
- **Quiet Surface:** Main featured-card background and every secondary project-art field.
- **Strong Quiet Surface:** A slightly deeper neutral behind the Zevian product window.
- **Product Paper:** Inner interface windows that need separation from the surrounding neutral field.
- **Pure White:** Text on ink controls and small white interface tiles.
- **Soft Ink Line:** Internal dividers where a solid ink rule would be too heavy.

### Named Rules

**The One Signal Rule.** Lime is the only accent color. Do not introduce project-specific hues, gradients, or a multi-color chapter system.

**The Useful Lime Rule.** Every lime use must identify a next action, evidence, an active state, selection, focus, or the personal signal mark.

**The Two-Color Focus Rule.** Every focus-visible state uses an inner ink outline and an outer lime halo, so focus stays clear on both paper and neutral surfaces.

## Typography

**Display Font:** DM Sans (with sans-serif fallback)  
**Body Font:** DM Sans (with sans-serif fallback)  
**Editorial Accent Font:** Instrument Serif (with serif fallback)

**Character:** DM Sans makes the portfolio direct, modern, and easy to scan. Instrument Serif adds one human editorial gesture at a time without becoming a second reading voice. Both families are bundled locally through Fontsource packages, including the variable DM Sans build and regular and italic Instrument Serif cuts; the page does not rely on a remote font service.

### Hierarchy

- **Display** (500, `clamp(58px, 6.4vw, 88px)`, 0.86): Uppercase hero statements with tight tracking and deliberate line breaks. On small screens, use `clamp(45px, 13.8vw, 64px)` with 0.88 line-height.
- **Headline** (500, `clamp(46px, 5vw, 72px)`, 0.94): Major section openings, written and wrapped as short statements.
- **Title** (500, 46px, 1): Project names. Capability links step down to 24px titles.
- **Body** (400, 18px, 1.55): Project explanations and lead copy, normally held between 430px and 520px. Supporting process and contact copy uses 14–17px.
- **Label** (600, 12px, 0.04em): Metadata, tags, and directional actions. Uppercase is reserved for calls to action and interface annotations.
- **Editorial Accent** (400, context-sized, near-solid leading): One short phrase inside the hero or closing invitation.

### Named Rules

**The Serif as Gesture Rule.** Instrument Serif never carries body copy, navigation, tags, or interface labels. It interrupts the sans-serif voice briefly, then gives control back.

**The Tight Hero Rule.** Keep the hero’s 28px top padding, 24px bottom padding, 26px title-to-rule gap, and compact 0.86 display leading. Do not restore a full-viewport hero or loose line spacing.

## Layout

The page uses a centered canvas with a 1420px maximum width and 28px desktop gutters. Thin ink rules link the navigation, hero, project list, process, contact, and footer into one editorial sequence. Spacing is generous between chapters but compact inside project and system rows.

The hero is intentionally short rather than full-screen. Its middle line uses “for” as the brief serif gesture and its closing line names AI products directly. A slim ruled row below the headline pairs a recruiter-friendly role statement with the lime selected-work CTA.

The featured Zevian card uses a 40/60 split and a 520px minimum height, giving the product view the larger share. Selected projects use compact 40/rest rows with a 300px minimum height, 26px vertical padding, and a 248px minimum art field. The capability chapter, “Systems I’ve shaped,” uses two equal links in one row, each about 150px tall, with a single divider rather than large promotional cards.

The process stays on Warm Paper. Its 32/68 split pairs “Useful questions, visible thinking and small tests that move the work forward” with four compact steps in a two-column ruled grid. Contact uses the same 32/68 structure and closes with the direct invitation “Have a messy product problem? Let’s talk.”

At 800px and below, side gutters become 18px, the hero’s middle line loses its offset, the feature and project rows stack, the two capability links become a single column, and the four process steps become one column. The mobile menu opens as a contained ink panel, while the page itself remains light.

**The Artifact Majority Rule.** On desktop, the Zevian and selected-project artifacts receive more width than their explanations.

**The Compact Chapter Rule.** Secondary projects, capability links, process steps, and contact should read as concise evidence, not as separate landing pages.

## Elevation & Depth

The system is flat by default. Rules, neutral tone changes, overlap, and small rotations establish structure before shadow is considered. Shadows appear only inside product artifacts; navigation, project rows, process steps, capability links, and the contact area remain flat.

### Shadow Vocabulary

- **Zevian Product Window:** A broad neutral shadow (`0 20px 42px rgba(21,21,21,.14)`) that lifts the interface from Strong Quiet Surface.
- **Secondary Interface Window:** A tighter shadow (`0 14px 28px rgba(21,21,21,.10)`) for the LTR/RTL and POS windows.
- **Order Ticket:** A light compact shadow (`0 12px 24px rgba(21,21,21,.10)`) for the paper order note.

### Named Rules

**The Artifact Only Rule.** Shadows belong to product windows and working notes, never to structural sections or ordinary content rows.

## Shapes

Thin ink borders are the main form language. Editorial structure stays square and line-led. Actions, tags, and the language switch use full pills; product artifacts use gently rounded corners from 7px to 16px. Circles are reserved for the wordmark’s lime signal, window controls, and diagram markers.

**The Meaningful Curve Rule.** Use a curve to identify a control, product window, physical note, or signal. Do not place each section inside a rounded container.

## Components

### Buttons

- **Primary navigation action:** A compact Editorial Ink pill with Pure White text, `13px 18px` padding, and a label-arrow relationship. In the open mobile menu, it becomes Signal Lime with Editorial Ink text.
- **Selected-work action:** A Signal Lime pill with Editorial Ink text, `10px 14px` padding, and a downward arrow. It anchors the hero’s ruled support row and is the clearest path into the portfolio evidence.
- **Hover:** Directional arrows move a few pixels in the direction they point over 300–350ms using the shared editorial easing.
- **Focus:** Use a 2px Editorial Ink outline, a 3px outline offset, and a 5px Signal Lime outer halo. The focus corner is gently rounded (`4px`).

### Chips

- **Project Tags:** Transparent pills with a 1px Editorial Ink border and `7px 11px` padding.
- **Featured Tag:** Signal Lime with Editorial Ink text and no extra outline.
- **State:** These chips describe work; they are not filters and have no selected state.

### Cards / Containers

- **Featured Card:** A Quiet Surface container with Editorial Ink text, a 16px radius, and a 40/60 desktop split. Its visual half uses Strong Quiet Surface.
- **Project Art:** Every secondary project uses the same Quiet Surface field with a 14px radius and a soft ink border. Product-specific meaning comes from the inner diagram, not from different background colors.
- **Inner Windows:** Product Paper, a 1px ink border, and 12–13px corners. Shadows follow the Artifact Only Rule.

### Navigation

- **Desktop:** A 64px row with a bottom ink rule, a bold “REZA A” wordmark with a neon-lime dot, plain text links, and one ink pill action.
- **States:** Plain links draw a thin underline from left to right over 350ms. The action arrow moves diagonally on hover. Keyboard focus always uses the two-color ink-and-lime treatment.
- **Mobile:** At 800px and below, links move into a full-width ink panel below the 58px row. The main action becomes lime for contrast.

### Zevian Evidence Window

Zevian is the signature component and the only continuously animated area. A slightly rotated Product Paper window sits on Strong Quiet Surface. The interface is clearly labelled “Illustrative product view” and asks “What needs attention?” Three evidence rows connect a topic to its current reading: Collaboration / Recurring theme, Delivery pace / New signal, and Role clarity / Stable. A three-cell metadata strip records Source / Weekly report, Override / Available, and Confidence / Medium. This detail makes the preview feel like product evidence rather than generic dashboard decoration.

A lime band scans one evidence row at a time over six seconds with 1.3-second offsets. On card hover, the window settles to zero rotation and grows by 2.5% over 700ms.

### Case-study Patterns

- **Editorial Hero:** Open with a back link, an uppercase outcome-led title with one brief serif gesture, a ruled summary row, role and stage tags, and one large product artifact. The case-study hero may be more expansive than the portfolio hero, but it keeps the same tight leading and warm-paper canvas.
- **Indexed Sections:** Use a `22/78` desktop split with a sticky numbered label on the left and the narrative on the right. Each chapter begins with an ink rule and a short statement headline. On mobile, the index becomes static and sits above its content.
- **Evidence and Product Diagrams:** Explain decisions with simple surfaces, rails, arrows, source chips, quotes, and small interface previews. Pair each diagram with the claim it proves; do not use product UI as decoration. Lime marks the active evidence, confidence, or key research note.
- **Trust Bento:** Use an asymmetric two-column grid when one trust principle needs priority. The main proof card spans two rows in Editorial Ink; supporting safeguards stay on Quiet Surface. Keep confidence, evidence, overrides, history, and human responsibility explicit.
- **Outcomes:** Present a maximum of three verified measures in a ruled row, followed by learning and next-step copy. Label evidence honestly—interview feedback, willingness to try, and paying customers are not interchangeable—and end with a simple next-project link.

**The Claim-to-Proof Rule.** Every case-study visual must clarify a product decision, user signal, safeguard, or outcome stated beside it.

**The Honest Outcome Rule.** Separate observed use, research intent, and commercial results; never combine them into a stronger claim than the evidence supports.

### Project Rows

Each secondary project is a compact editorial row with year, title, description, tags, and one neutral artifact field. The row is still at rest; its product demonstration runs only while the row is hovered.

- **Orderific:** English LTR and Arabic RTL interface layouts crossfade and slide during hover, showing one component system working across both directions.
- **Purno:** The POS window lifts and cash, card, and mobile payment states pulse in sequence during hover, supporting the retail, inventory, and payment story.
- **Jayga:** The order marker moves through Order, Storage, Billing, and Fulfilled, while the ticket shifts horizontally during hover, showing a connected warehouse order flow.

### Capability Links

The “Systems I’ve shaped” section contains exactly two compact links: Orderific and Zevian HRMS. Each link is a ruled text row with a small uppercase product label, a 24px practical summary, and an arrow. The supporting line, “Rules that help teams ship with less rework,” frames these as capability evidence rather than a separate design-system gallery.

### Process and Contact

The process is a light four-step grid: Find the real problem, Shape the system, Build to learn, and Use AI with intent. Each step uses a small number, a 20px title, and concise 14px supporting copy. The language emphasizes product context, behaviour patterns, rules, states, edge cases, early prototypes, and human control of AI.

The contact footer is one merged light section. It identifies Reza as a product designer and founder in Dhaka working on B2B systems, AI workflows, and clarity-critical products, then uses the large problem-led CTA “Have a messy product problem? Let’s talk.”

### Motion and Reduced Motion

Use the shared editorial easing (`cubic-bezier(.16,1,.3,1)`) for CSS transitions and product demonstrations. Only Zevian’s evidence scan runs continuously. Navigation, feature settling, secondary projects, capability links, and contact links respond to hover or focus only.

Under `prefers-reduced-motion: reduce`, remove every CSS animation and transition, restore automatic scrolling, and hide the duplicate RTL layer so the static LTR version remains legible.

## Do's and Don'ts

### Do:

- **Do** state the broad capability clearly: product design that shapes clear systems and AI workflows.
- **Do** preserve the hero’s tight vertical rhythm and deliberate three-line wrap.
- **Do** use Signal Lime on the selected-work CTA, evidence, active signals, the personal mark, selection, and focus.
- **Do** keep Zevian’s illustrative label, three evidence readings, and three metadata cells visible.
- **Do** frame Orderific and Zevian HRMS as “Systems I’ve shaped.”
- **Do** keep process and contact copy specific, practical, and problem-led.
- **Do** load DM Sans and Instrument Serif from the bundled Fontsource packages.
- **Do** keep Zevian as the only continuously animated product demonstration.
- **Do** disable all animation and transition when reduced motion is requested.

### Don't:

- **Don't** narrow the hero back to interface or screen design alone.
- **Don't** make the hero fill the viewport or loosen its headline rhythm.
- **Don't** turn the Zevian product preview into anonymous dashboard decoration or remove its illustrative disclosure.
- **Don't** reintroduce coral, lilac, project-specific color fields, gradients, or a multi-color story system.
- **Don't** turn capability links into large promotional cards.
- **Don't** use Instrument Serif for body copy, navigation, tags, or interface labels.
- **Don't** load typography from a remote font CDN.
- **Don't** add continuously running motion outside the Zevian evidence scan.
