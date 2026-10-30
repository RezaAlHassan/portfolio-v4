# Portfolio interview audit

## Implementation following the audit

Implemented on 30 October 2026 after the user requested the changes:

- Focused the shared homepage and metadata on B2B/AI product design and the confirmed search for full-time product designer roles. Project descriptions name design contributions; project order remains Zevian, Orderific, Jayga, Purno.
- Added a downloadable corrected Product Designer CV and links from navigation and About. The original supplied CV files remain untouched. Corrected the copied CV's Zevian stages, Jayga dates/team and Purno evidence limits.
- Used the supplied CV to identify Purno as contract work, and separated overall engagement dates from the featured design scope on About. Other engagement types remain unspecified rather than guessed.
- Added sticky left contents navigation with short topic labels and a current-section indicator; on smaller screens it becomes a horizontally scrollable sticky row. Simplified section headings. Moved Jayga's business results below workflow/interface evidence and clarified delivered web work versus the mobile concept.
- Applied the user's correction: Jayga involved four engineers and the founder. Live design/product cases use that context; historical archive content remains unchanged.
- Added existing Orderific component-playground and governance images, with expandable viewing and readable captions. Corrected the component image description and the visible source-copy errors under the new authorisation.
- Clarified current Zevian manager feedback and its design response, without claiming task validation or using the old Zevian reference.
- Applied the user-confirmed Purno unit rule in an accessible interaction example. Labelled it as a retrospective clarification; kept the original image unchanged and available in a disclosure. Existing callouts and diagrams remain.

The following review records the findings before implementation. Unknown employment types, measured current-prototype outcomes and other absent research evidence were not invented. No deployment was requested or performed.

## Second review: HR manager and lead product designer

This is a simulated review of the current local portfolio, including the latest small edits. It is not feedback from actual hiring staff. Work history on the About page and the underlying screen assets were inspected again. The earlier Zevian case remains excluded.

### General HR manager

Review question: Is this person a clear match for the opening, and is there enough credible information to pass them to the design team?

Positive signals:

- Four substantial projects give the application more substance than a single concept.
- The About page includes company names, dates, role titles and a short description for each role. Work history is available, rather than missing.
- Product designer work at AutomatedPros/Orderific gives a clear example of working with an existing organisation and team.
- The computer science background and working prototypes may support roles that require close engineering collaboration.
- Location, email contact and LinkedIn are accessible.

Likely questions:

| Area | Visible issue | What would resolve it |
| --- | --- | --- |
| Target role | Designer and manager share the homepage headline; founder and product lead appear across projects. | State the role sought. Preserve factual past titles and show the wider skills through the work. |
| Employment context | Purno overlaps Jayga; Orderific overlaps Jayga and Zevian. Employment or engagement types are not labelled. | Where accurate, identify contract, part-time, founder or full-time work. Explain concurrent work briefly. Overlap alone is not a problem. |
| Timeline | Purno's About entry covers May 2024–May 2025, while its case covers three months in 2024. | Label overall engagement and case-study scope separately. |
| Hiring level | Team leadership and system work suggest responsibility, but titles and business figures do not establish the level of design independence. | Make ownership, decisions and team context easy to assess. Do not add a senior title without support. |
| Availability | The site states Dhaka and a current founder role, but does not clearly state the desired next role or working arrangement. | Add a current, accurate availability sentence. |
| Verification | The site has no visible CV link, and Jayga shows different engineer counts between homepage and case. | Provide a current CV if available and explain or correct the scope of the team counts. |

Simulated decision: for a B2B product designer opening, there is enough relevant experience to consider passing the application to the design lead. The portfolio makes that decision less straightforward than necessary because role intent and engagement context remain unclear. The site alone cannot establish fit for a particular seniority, country or employment arrangement.

### Lead product designer

Review question: Can this designer make sound interaction decisions, execute them carefully, work with constraints and improve the design through evidence?

Positive signals:

- Purno separates split-payment amounts from provider choice, and designs distinct quantity controls for packaged and bulk products. These are specific interaction decisions.
- Jayga connects physical storage rules to grid assignment and billing. It includes practical system constraints and a temporary Assigned state.
- Orderific demonstrates BMS direction and theme support and connects design work to team handoff.
- Current Zevian makes evidence, uncertainty and manager control central to the workflow. Its earlier-work captions explain real design trade-offs.
- The portfolio distinguishes prototypes, projections and estimates from verified outcomes.

The strongest additional findings from inspecting the actual assets:

1. Orderific's component section uses public/figma/5b38e.png and public/figma/7079d.png. These show completed forms. Neither exposes Figma properties, a variant matrix, component structure or token bindings. They demonstrate consistent interface use, but do not by themselves prove the component architecture described beside them. Show an existing property/state artifact with its use in a screen. This is a higher-value change than adding more explanatory copy.
2. Purno's quantity asset, public/figma/75dde.png, shows a selected 20gm Pack option for Lay's while the quantity stepper reads 1 kg. A reviewer needs to know whether this transaction is counted in packs or weight. The neighbouring bulk screen uses kg as expected. This visible inconsistency raises a concrete interaction question; inspect and explain the source rule before changing the supplied artwork.
3. Purno's quantity screen is introduced by the short statement that different quantity types are supported. It does not explain the units or why the shortcut increments suit the task. A short rule would make it easier to judge the design, provided there is evidence for that rule.
4. Existing callouts carry useful reasoning but become small inside scaled mobile artifacts. Keep them and bring only the essential decision into readable live text.

| Case | Strongest design signal | Main unresolved design question |
| --- | --- | --- |
| Orderific | Components, BMS RTL/themes and handoff across connected apps. | What was the actual reusable property/state structure, and what changed in one representative component? |
| Purno | Local payment flows, category simplification and task-specific controls. | Are quantity units and shortcuts consistent, and which benefits are intended versus observed? |
| Jayga | A clear operational model translated into assignment, verification and billing. | How did staff feedback change one interaction, and what was implemented versus planned? |
| Zevian | A shift toward evidence and manager control, supported by a React prototype. | What happened when a manager attempted a real investigation task, and what changed next? |

The portfolio provides useful discussion material for a B2B product-design interview. It does not yet make a strong self-contained case for senior-level design through the breadth of projects alone. Greater confidence would come from one well-supported example of handling competing requirements, one visible refinement after feedback and clear ownership of implementation decisions. Unavailable evidence should remain an open question.

### Different priorities for the two readers

HR priorities: target role, timeline and engagement context, current work arrangement, CV and factual consistency.

Design lead priorities: component evidence that matches the claim, coherent interaction rules, readable decisions, feedback-to-change examples and accurate delivery status.

Do not treat a more focused headline as a solution to both reviews. It helps HR understand fit; the design lead still needs concrete evidence. Do not turn either review into a demand for extra process diagrams or invented metrics.

No website implementation changes were made during this second audit.

Reviewed 30 October 2026 for product designer applications.

Compared the previous live homepage and Purno, Jayga and Orderific cases at https://rezaalhasan.netlify.app/ with the newer live pages at https://rezaal.netlify.app/ and the current local implementation. The previous Zevian case was excluded as requested. The current local homepage and four main cases were checked at 1440px and 390px.

## Main finding

The current portfolio has a simpler page structure and brings projects into view sooner. However, it makes the hiring argument less explicit. It describes products and responsibilities more often than it explains a specific piece of design work. The earlier site gave reviewers clearer reasons to see Reza as a product designer and specific decisions to discuss in an interview.

These are likely presentation factors, not proof of the cause of interview results. Application volume, role level, CV, referrals, location requirements and time period have not been compared. The previous URL is a present-day reference, not a preserved snapshot from each successful application.

## Findings, ranked by likely value

### 1. The role is less focused

Previous homepage: “Product Designer, AI and complex B2B systems.” Current homepage: “Product designer and manager.” The current supporting sentence says “complete user experiences” without naming a distinctive design strength. Jayga reinforces strategy and backlog; Zevian reinforces founder work; AI Workflows is a main navigation item.

These capabilities are useful, but the combined presentation asks a hiring reviewer to decide which role Reza wants. For product designer applications, lead with Product Designer and the B2B/AI focus. Show management and technical ability through the projects as supporting strengths. This does not require changing actual project roles.

### 2. Specific craft examples became broad project descriptions

The previous homepage had a Selected craft section with examples such as Orderific's LTR/RTL workflow, Purno's quantity controls and Jayga's invoice flow. Each connected a screen to a design action. The current homepage describes restaurant apps, warehouse operations and retail POS more broadly.

The current covers also serve different purposes: Orderific shows component fragments, Jayga shows research context and Purno shows a branded payment cover. They communicate range, but do not all show a complete design task. The warehouse photo is useful research evidence, but cannot by itself show interaction or interface quality.

Keep the compact four-project grid. Make each project's short description name a design contribution and ensure a strong finished interface is easy to see. A photo or component animation can remain, with an interface example visible early inside its case. No duplicate homepage section is required.

### 3. The cases lost useful reading shortcuts

The earlier cases provided a three-decision summary and section links. The current cases mainly rely on a linear scroll. Their headings often identify topics rather than decisions: Research, Payment, Modes, Owner experience.

In the local desktop rendering, Purno is approximately 9,900px tall and Jayga 9,000px tall. At 390px, Purno is approximately 13,300px tall. Length is not automatically a problem; the lack of shortcuts makes it harder to reach the relevant evidence.

Add a compact set of two or three descriptive section links near the beginning. Link to existing evidence rather than creating a second summary of the whole story. Keep the full case for readers who want depth.

### 4. Existing annotations are too small during a quick mobile review

Purno's home comparison is a 1046px-wide artifact displayed in roughly 350px of mobile content. Its baked-in callout text scales to about one third of the original size. Jayga's grid assignment has the same general problem. Expandable images provide access to detail, but the initial scan still needs readable reasoning.

Preserve the supplied artwork. Put the single most important decision in live text beside it. Show a focused detail crop where useful while keeping the complete expandable image. The latest small edits help here, but do not address the broader reading structure.

### 5. Ownership and design judgment are present, but not always paired

Jayga's top details say Product Lead and Product strategy and backlog, while its design language and grid decisions appear later. Purno lists a broad ecosystem and complete journey, but the screen-level design choices are more useful evidence of craft. Orderific is the strongest direct design-system match, though the newer version gives fewer concrete component-to-screen examples than the old case.

For each case, make one decision easy to follow from task to constraint, choice and evidence. Do not force five labelled blocks onto every section. Use existing callouts and concise captions. Separate an intended benefit from observed feedback or a measured result.

### 6. Editorial inconsistencies weaken attention to detail

- The homepage says Jayga led four engineers; the case names five engineers and the founder. They may describe different scopes, but the connection is not explained.
- Purno's home comparison was labelled as five product-card explorations. The latest local edit fixes the nearby text and alt description; the live version still contains the mismatch.
- The live Other work row reads “SQL ? Supabase ? Automations.”
- Orderific includes “Challange,” “needs., along with references,” and an incomplete sentence about data mismatch. Its text currently follows the user's exact-copy Figma requirement. Log these for a source-copy update; do not silently rewrite them.
- Purno's supplied image states a transaction-time improvement without the current estimate qualification. Keep an explicit adjacent qualification; do not alter the supplied image.

These do not establish why an application failed. They are visible friction in a portfolio meant to show design care.

### 7. Hiring context is less explicit

The previous homepage stated the desired roles and openness to remote work or relocation with sponsorship. The current footer states Based in Dhaka, with contact and social links. Contact remains available, but the intended hiring arrangement is less clear.

Add one current, accurate sentence about the target role and work arrangement near contact. Do not assume availability or relocation preferences are unchanged without confirmation.

## What to retain

- The current simple grid, consistent typography and early access to work.
- The full supplied visual evidence and expandable images.
- Honest distinctions between shipped work, prototypes, estimates and projections.
- Zevian's separation of the earlier scoring product from the current investigation prototype.
- Research photos, service diagrams and business context when they explain a design decision.

The earlier Purno moderated-testing claim and Jayga processing-speed headline should not return. They made the old story sound stronger, but conflict with the project's current evidence rules. Replace unsupported impact with specific, defensible design work.

## Recommended order of work

1. Focus the homepage on product design and make each description name a design contribution.
2. Keep Orderific second as requested. Make its component-to-interface evidence easy to reach; make Purno's interaction detail visible early in its case.
3. Add two or three decision links to each long case, using existing sections.
4. Check the important annotation at mobile size and add only the live-text explanation needed for the initial scan.
5. Resolve the team-count scope and editorial errors, respecting the Orderific Figma copy requirement.
6. Review all changes on the deployed site before judging their effect.

## Deployment difference

At review time, the newer live homepage still lists Zevian, Jayga, Orderific, Purno. The local source lists Zevian, Orderific, Jayga, Purno. The live cases also lack the local shared outcome summaries and latest minimal text edits. Findings about those local additions should not be treated as explanations for past live-site results.

## How to assess the changes

Ask a few product-design hiring reviewers to scan the homepage and one case briefly, then explain the target role, strongest design skill, one decision, ownership and delivery status in their own words. Use this as a comprehension check, not a statistical test.

Track comparable applications by portfolio version, role, seniority, region, source, referral status and interview outcome. If available, inspect homepage-to-case visits and contact activity with appropriate analytics. A small number of interview outcomes cannot separate a portfolio effect from application and market differences.

## Sources

- Previous homepage: https://rezaalhasan.netlify.app/
- Previous Purno: https://rezaalhasan.netlify.app/purno/
- Previous Jayga: https://rezaalhasan.netlify.app/jayga/
- Previous Orderific: https://rezaalhasan.netlify.app/orderific/
- Newer live homepage and corresponding case routes: https://rezaal.netlify.app/
- Local source: src/PortfolioHome.jsx, src/PortfolioShared.jsx, src/CaseOutcome.jsx, src/figma/Purno.jsx, src/figma/Jayga.jsx, src/figma/Orderific.jsx, src/figma/Zevian.jsx and related styles.
- Evidence limits: AGENTS.md, PORTFOLIO-REVIEW.md and WORK-PORTFOLIO-REVIEW.md.
