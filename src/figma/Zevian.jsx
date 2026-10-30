// Figma HTGPw4wOrTMg6yLfIgRfnL, node 9:178. Artwork coordinates stay within ResponsiveArtifact.
import React from 'react';
import './zevian-updates.css';
import CaseOutcome from '../CaseOutcome';
import EvidenceSlider from '../EvidenceSlider';
import { ExpandableImage } from '../LegacyPortfolio';
import { ResponsiveArtifact, PortfolioHeader, NextProject, CaseStudyLayout } from '../PortfolioShared';
const assetPathPrefix = "/figma";
const imgFrame1 = `${assetPathPrefix}/4bf25.png`;
const imgFrame41 = `${assetPathPrefix}/cc76f.png`;
const imgDefaultpath1 = `${assetPathPrefix}/a16dd.png`;
const imgEmployeeContextDecisionMade1 = `${assetPathPrefix}/9599c.png`;
const imgBothCobtextSummary1 = `${assetPathPrefix}/1cd80.png`;
const imgZevianColors1 = `${assetPathPrefix}/9832f.png`;
const imgLine1 = `${assetPathPrefix}/0cfcc.svg`;
const imgArrow1 = `${assetPathPrefix}/d1302.svg`;
const imgArrow2 = `${assetPathPrefix}/c9d9b.svg`;
const imgLine2 = `${assetPathPrefix}/8b9c4.svg`;
const imgLine3 = `${assetPathPrefix}/6456d.svg`;
const imgLine4 = `${assetPathPrefix}/4e940.svg`;
const imgLine5 = `${assetPathPrefix}/7aeaa.svg`;

function ZevianLinks() {
  return <nav className="zevian-earlier-links" aria-label="Zevian prototype and case study links">
    <p>Links</p>
    <div>
      <a href="https://zevian-v3.netlify.app/" target="_blank" rel="noreferrer">Current prototype <span aria-hidden="true">↗</span></a>
      <a href="https://demo.zevian.co/dashboard" target="_blank" rel="noreferrer">Previous prototype <span aria-hidden="true">↗</span></a>
      <a href="https://rezaalhasan.netlify.app/zevian" target="_blank" rel="noreferrer">Previous case study <span aria-hidden="true">↗</span></a>
    </div>
  </nav>;
}

function EarlierDecisions() {
  return <section className="zevian-decisions" aria-labelledby="earlier-decisions-title">
    <header>
      <p className="zevian-stage-label">Earlier version · Evaluation and patterns</p>
      <h2 id="earlier-decisions-title" tabIndex={-1}>Earlier prototype: employee scoring</h2>
      <p>These screens show the scoring product before I changed direction. They are separate from the current investigation prototype.</p>
    </header>
    <EvidenceSlider label="Earlier Zevian prototype" slideLabels={['KPI setup', 'Report', 'Dashboard', 'Ask AI']}>
      <figure>
        <ExpandableImage src="/zevian/archived/kpi-creation.png" alt="Earlier Zevian KPI setup: one long form on the left, followed by a two-step flow with presets and an AI builder" />
        <figcaption>
          <strong>Ask for one decision at a time</strong>
          <span>Managers had to define a goal and its scoring rules in one form. I split setup into two steps and added presets, so they could start with the goal instead of a blank form.</span>
          <small>The trade-off: one more step, with less to decide on each screen.</small>
        </figcaption>
      </figure>
      <figure>
        <ExpandableImage src="/zevian/archived/report-detail.png" alt="Earlier Zevian report detail with an employee score, numeric criteria, report evidence and coaching notes" />
        <figcaption>
          <strong>Review the evidence behind a score</strong>
          <span>The report brought targets, written evidence and coaching notes together, so the manager could review what the score was based on.</span>
          <small>This screen belongs to the earlier evaluation product.</small>
        </figcaption>
      </figure>
      <figure>
        <ExpandableImage src="/zevian/archived/manager-dashboard.png" alt="Earlier Zevian dashboard with one main team score, a reporting status bar and detailed employee numbers below" />
        <figcaption>
          <strong>Give the dashboard a clear starting point</strong>
          <span>The earlier layout repeated status and metrics across several cards. I gave the team score the most weight and brought reporting status into one bar. Detail moved below the summary or a click away.</span>
          <small>This improved the hierarchy, but it did not answer why performance changed. That became the focus of the current prototype.</small>
        </figcaption>
      </figure>
      <figure>
        <ExpandableImage src="/zevian/archived/ask-ai.png" alt="Earlier Zevian Ask AI screen showing selected people and dates, an answer and linked source reports" />
        <figcaption>
          <strong>Keep AI answers connected to their sources</strong>
          <span>The manager chose the people and dates before asking a question. The answer linked back to the reports it used, so the manager could check the source material.</span>
          <small>The current prototype takes this further with evidence, missing context and a manager decision.</small>
        </figcaption>
      </figure>
    </EvidenceSlider>
    <a href="https://rezaalhasan.netlify.app/zevian" target="_blank" rel="noreferrer">Explore the earlier case study <span aria-hidden="true">↗</span></a>
  </section>;
}

export default function Zevian(){return <div className="new-portfolio"><PortfolioHeader/><CaseStudyLayout items={[{ href: '#zevian-direction', label: 'Direction' },{ href: '#zevian-evidence', label: 'Evidence' },{ href: '#zevian-context', label: 'Context' },{ href: '#earlier-decisions-title', label: 'Earlier work' },{ href: '#zevian-foundations', label: 'Foundations' }]}><main className="figma-case"><div data-node-id="9:179" className="fd-1">
        <div data-node-id="9:180" className="fd-2">
          <h1 data-node-id="9:181" className="fd-3">
            Helping sales managers understand performance changes
          </h1>
          <p data-node-id="9:182" className="fd-4 case-lead">
            I moved the product from AI scoring toward evidence-led investigation, keeping the manager in control of the decision.
          </p>
        </div>
        <div data-node-id="12:270" data-flow="row" className="fd-5">
          <div data-node-id="12:257" className="fd-6">
            <p data-node-id="12:254" className="fd-7">
              My role
            </p>
            <p data-node-id="12:255" className="fd-8">
              Solo Founder
            </p>
          </div>
          <div data-node-id="12:266" className="fd-9">
            <p data-node-id="12:267" className="fd-10">
              Ownership
            </p>
            <p data-node-id="12:268" className="fd-11">
              Discovery, design, AI-assisted build
            </p>
          </div>
          <div data-node-id="12:277" className="fd-12">
            <p data-node-id="12:278" className="fd-13">
              Evidence
            </p>
            <p data-node-id="12:279" className="fd-14">
              10+ conversations, React prototype
            </p>
          </div>
          <ZevianLinks/>
        </div>
                <div data-node-id="12:286" className="fd-15">
          <div data-node-id="9:184" data-flow="row" className="fd-16">
            <ResponsiveArtifact width={742.716} height={526.559}><div data-node-id="9:186" className="fd-17">
              <div className="fd-18">
                <ExpandableImage src={imgFrame1} className="figma-expand" imageClassName="fd-19" alt="Zevian findings, evidence and manager context" />
              </div>
            </div></ResponsiveArtifact>
          </div>
          <p data-node-id="12:285" className="fd-20 case-caption">
            Finding, evidence, and manager context
          </p>
        </div>
        <CaseOutcome project="zevian"/>
        <div data-node-id="12:295" data-flow="row" className="fd-21">
          <div data-node-id="12:290" className="fd-22">
            <h2 data-node-id="12:287" className="fd-23 case-context-heading">
              Problem
            </h2>
            <p data-node-id="12:289" className="fd-24 case-copy">
              A performance change needs explanation. A score alone does not provide the context needed to act.
            </p>
          </div>
          <div data-node-id="12:300" className="fd-25">
            <h2 data-node-id="12:301" className="fd-26 case-context-heading">My responsibility</h2>
            <p data-node-id="12:302" className="fd-27 case-copy">
              Challenged the scoring model, set a new direction, and designed a workflow from finding to human decision.
            </p>
          </div>
        </div>
        <hr className="portfolio-divider" />
        <div data-node-id="12:307" className="fd-28">
          <h2 id="zevian-direction" tabIndex={-1} data-node-id="12:304" className="fd-29">
            Product direction
          </h2>
          <p data-node-id="12:306" className="fd-30 case-lead">
            Manager feedback exposed two gaps: dashboard numbers lacked context, and AI scores were hard to trust. I removed the dashboard from the current workflow and brought findings, source evidence and manager context together.
          </p>
        </div>
        <div data-node-id="12:314" className="fd-31">
          <h2 data-node-id="12:315" className="fd-32">
            Assumption I changed
          </h2>
          <p data-node-id="12:316" className="fd-33 case-copy">
            The early idea used employee reports and KPIs to produce AI scores. The new direction gives managers findings, evidence, and room to add context.
          </p>
        </div>
        <div data-node-id="19:8" data-flow="row" className="fd-34">
          <div data-node-id="17:463" data-flow="row" className="fd-35">
            <div data-node-id="17:462" className="fd-36">
              <div data-node-id="12:359" className="fd-37">
                <p data-node-id="12:357" className="fd-38">
                  Early assumption
                </p>
                <ResponsiveArtifact width={599} height={48}><div data-node-id="12:341" className="fd-39">
                  <div data-node-id="12:324" className="fd-40">
                    <p data-node-id="12:325" className="fd-41">
                      Set KPIs
                    </p>
                  </div>
                  <div data-node-id="12:326" className="fd-42">
                    <p data-node-id="12:327" className="fd-43">
                      Set Employee reports
                    </p>
                  </div>
                  <div data-node-id="12:329" className="fd-44">
                    <p data-node-id="12:330" className="fd-45">
                      AI Scores
                    </p>
                  </div>
                  <div data-node-id="12:332" className="fd-46">
                    <p data-node-id="12:333" className="fd-47">
                      Coaching
                    </p>
                  </div>
                  <div data-node-id="12:335" className="fd-48">
                    <div className="fd-49">
                      <img alt="" src={imgArrow1} className="fd-50" />
                    </div>
                  </div>
                  <div data-node-id="12:338" className="fd-51">
                    <div className="fd-52">
                      <img alt="" src={imgArrow1} className="fd-53" />
                    </div>
                  </div>
                  <div data-node-id="12:336" className="fd-54">
                    <div className="fd-55">
                      <img alt="" src={imgArrow1} className="fd-56" />
                    </div>
                  </div>
                </div></ResponsiveArtifact>
              </div>
              <p data-node-id="17:464" className="fd-57 case-copy">
                In discovery conversations, one manager said they did not trust AI scores. Another described investigating why those patterns occurred as the bigger challenge.
              </p>
              <div data-node-id="12:360" className="fd-58">
                <p data-node-id="12:361" className="fd-59">
                  New direction
                </p>
                <ResponsiveArtifact width={640} height={48}><div data-node-id="12:362" className="fd-60">
                  <div data-node-id="12:363" className="fd-61">
                    <p data-node-id="12:364" className="fd-62">
                      Collects data
                    </p>
                  </div>
                  <div data-node-id="12:365" className="fd-63">
                    <p data-node-id="12:366" className="fd-64">
                      Add context
                    </p>
                  </div>
                  <div data-node-id="12:367" className="fd-65">
                    <p data-node-id="12:368" className="fd-66">
                      Manager decides
                    </p>
                  </div>
                  <div data-node-id="12:371" className="fd-67">
                    <div className="fd-68">
                      <img alt="" src={imgArrow2} className="fd-69" />
                    </div>
                  </div>
                  <div data-node-id="12:373" className="fd-70">
                    <div className="fd-71">
                      <img alt="" src={imgArrow2} className="fd-72" />
                    </div>
                  </div>
                  <div data-node-id="12:375" className="fd-73">
                    <p data-node-id="12:376" className="fd-74">
                      Findings
                    </p>
                  </div>
                  <div data-node-id="12:378" className="fd-75">
                    <div className="fd-76">
                      <img alt="" src={imgArrow2} className="fd-77" />
                    </div>
                  </div>
                </div></ResponsiveArtifact>
              </div>
              <p data-node-id="12:434" className="fd-78">
                The system prepares the evidence. The manager judges what it means.
              </p>
            </div>
          </div>
          <div data-node-id="19:4" className="fd-79">
            <p data-node-id="19:6" className="fd-80 case-copy">
              I recorded calls with Fireflies and organised the transcripts in Google Drive. I used ChatGPT to help group feedback, then reviewed it against the interviews before changing the product.
            </p>
          </div>
        </div>
        <hr className="portfolio-divider" />
        <div data-node-id="12:437" className="fd-81">
          <h2 id="zevian-evidence" tabIndex={-1} data-node-id="12:438" className="fd-82">
            Evidence and control
          </h2>
          <p data-node-id="12:439" className="fd-83 case-lead">
            A finding should help a manager investigate. The interface separates what changed, possible reasons, and the decision.
          </p>
        </div>
        <div data-node-id="17:448" data-flow="row" className="fd-84">
          <ResponsiveArtifact width={547} height={778.147}><div data-node-id="12:443" className="fd-85">
            <div className="fd-86">
              <ExpandableImage src={imgFrame41} className="figma-expand" imageClassName="fd-87" alt="Zevian finding with evidence and uncertainty" />
            </div>
          </div></ResponsiveArtifact>
          <div data-node-id="17:453" className="fd-88">
            <div data-node-id="17:449" className="fd-89">
              <h3 data-node-id="17:450" className="fd-90 case-subheading">
                Evidence
              </h3>
              <p data-node-id="17:451" className="fd-91 case-copy">
                Show the change and supporting signals before suggesting a possible cause.
              </p>
            </div>
            <div data-node-id="17:454" className="fd-92">
              <h3 data-node-id="17:455" className="fd-93 case-subheading">
                Uncertainty
              </h3>
              <p data-node-id="17:456" className="fd-94 case-copy">
                Label missing context so a possible reason is not mistaken for an established fact.
              </p>
            </div>
            <div data-node-id="17:458" className="fd-95">
              <h3 data-node-id="17:459" className="fd-96 case-subheading">{`Human context and judgment `}</h3>
              <p data-node-id="17:460" className="fd-97 case-copy">
                Let the manager add context and choose what happens next.
              </p>
            </div>
            <div data-node-id="17:444" className="fd-98">
              <h3 data-node-id="17:445" className="fd-99 case-subheading">
                Traceability
              </h3>
              <p data-node-id="17:446" className="fd-100 case-copy">
                Store the action alongside the evidence and context used to make it.
              </p>
            </div>
          </div>
        </div>
        <div data-node-id="24:220" className="fd-101">
          <h2 id="zevian-context" tabIndex={-1} data-node-id="24:221" className="fd-102">
            Edge cases
          </h2>
          <p data-node-id="24:222" className="fd-103 case-lead">
            A finding changes when a manager or employee adds context. The record keeps the evidence, context and decision together.
          </p>
        </div>
        <div data-node-id="27:1072" className="fd-104">
          <ResponsiveArtifact width={642} height={300.551}><div data-node-id="27:1066" data-name="defaultpath 1" className="fd-105">
            <ExpandableImage src={imgDefaultpath1} className="figma-expand" imageClassName="fd-106" alt="Default finding state" />
          </div></ResponsiveArtifact>
          <p data-node-id="27:1070" className="fd-107 case-caption">
            Default state
          </p>
        </div>
        <div data-node-id="27:1069" data-flow="row" className="fd-108">
          <div data-node-id="27:1075" className="fd-109">
            <ResponsiveArtifact width={515} height={257.119}><div data-node-id="27:1065" data-name="employee-context-decision made 1" className="fd-110">
              <ExpandableImage src={imgEmployeeContextDecisionMade1} className="figma-expand" imageClassName="fd-111" alt="Employee context and recorded decision" />
            </div></ResponsiveArtifact>
            <p data-node-id="27:1073" className="fd-112 case-caption">
              Employee context and decision made
            </p>
          </div>
          <div data-node-id="27:1078" className="fd-113">
            <ResponsiveArtifact width={515} height={305.185}><div data-node-id="27:1067" data-name="both-cobtext-summary 1" className="fd-114">
              <ExpandableImage src={imgBothCobtextSummary1} className="figma-expand" imageClassName="fd-115" alt="Both contexts updated and summary generated" />
            </div></ResponsiveArtifact>
            <p data-node-id="27:1076" className="fd-116 case-caption">{`Both contexts added and summary updated `}</p>
          </div>
        </div>
        <hr className="portfolio-divider" />
        <EarlierDecisions/>
        <hr className="portfolio-divider" />
        <div data-node-id="27:1081" className="fd-117">
          <h2 id="zevian-foundations" tabIndex={-1} data-node-id="27:1082" className="fd-118">
            Design foundations
          </h2>
          <p data-node-id="27:1083" className="fd-119 case-lead">
            I defined tokens and interaction states in Figma, then used Claude Code and Codex to build and revise the React investigation prototype.
          </p>
        </div>
        <div data-node-id="27:1092" data-flow="row" className="fd-120">
          <div data-node-id="27:1088" className="fd-121 zevian-foundations-evidence">
            <ExpandableImage src={imgZevianColors1} className="zevian-foundations-image" alt="Zevian primitive and semantic tokens" />
            <p data-node-id="27:1086" className="fd-124 case-caption">
              Primitive and semantic tokens
            </p>
          </div>
          <div data-node-id="27:1095" className="fd-125">
            <div data-node-id="27:1089" className="fd-126">
              <p data-node-id="27:1090" className="fd-127 case-copy">{`I used ChatGPT with Figma to create tokens, then brought the design into the React build with Codex. `}</p>
            </div>
            <p data-node-id="27:1093" className="fd-128 case-copy">
              Notion informed the drawer pattern and Attio informed the visual language. I am exploring a Gmail-style list to make findings easier to scan.
            </p>
          </div>
        </div>
        <hr className="portfolio-divider" />
        <div data-node-id="27:1096" className="fd-129">
          <h2 data-node-id="27:1097" className="fd-130">
            What changed and what comes next
          </h2>
          <p data-node-id="27:1098" className="fd-131 case-copy">{`Manager feedback changed the problem I was solving: a score was not enough to explain a performance change. The current prototype brings findings, evidence and context together. Next, I need to test whether managers can use it to choose a useful next action. The earlier product’s paying customers do not validate this new workflow.`}</p>
        </div>
        <hr className="portfolio-divider" />
        <NextProject name="Jayga" href="/jayga"/>
      </div></main></CaseStudyLayout></div>;}
