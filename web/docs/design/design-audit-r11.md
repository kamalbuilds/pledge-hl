# PLEDGE independent design audit: R11

2026-10-11. Agreement and create routes. Independent review, report only.

Design Score: B
AI Slop Score: A

**R11 repairs the owner's four complaints and restores a credible mobile document. It still makes the phone user read a desktop document in sequence, and its proof annex promises more than every agreement can demonstrate.** The visual identity is strong. The remaining work is task hierarchy and evidence discipline, not another aesthetic direction.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, inferred design system, ten-category checklist, interaction-path source inspection, cross-route consistency and regression grading. Both routes are **APP UI**. The binding term-sheet direction takes precedence over inappropriate landing-page prescriptions for decorative motion or imagery.

The explicit one-report restriction overrides the skill's repair loop, setup/configuration writes, extra reports, outside-voice artifacts and commits. No source file was edited. Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, both previous audits, and supporting chain/font declarations. Inspected the six supplied R11 captures and the V2 negative reference. The V2 image exists at `design-research/negative/v2-termsheet-6.5-1440.png` relative to this workspace.

| Key | Capture | Dimensions |
|---|---|---|
| D | [Agreement viewport](r11-1440.png) | 1440 x 900 |
| M | [Agreement viewport](r11-390.png) | 390 x 844 |
| DF | [Agreement full](shots/r11-1440-full.png) | 1440 x 3758 |
| MF | [Agreement full](shots/r11-390-full.png) | 390 x 6313 |
| C | [Create desktop](shots/r11-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r11-create-390.png) | 390 x 1538 |

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) with background Brave through `minibhn deepsurge open`. SSH failed with `Operation not permitted`. Web fetch could access neither agreement nor [create](https://v3-review.pledge-ccs.pages.dev/#/create). This is an access failure here, not proof of a deployment outage. No user-owned tab was navigated or browser restarted. Rendered findings use supplied captures; source-only findings are marked explicitly. No browser flow, performance measurement or funded-wallet operation was completed.

## First impression and direction

The site communicates **a signed financial instrument**. I notice the large ink agreement title, then the `0 HYPE` availability beside Deposit HYPE, then the navy fill dot in Figure 1. In one word: **sober**. These are useful focal points. The opening explains a specific agreement instead of selling a vague protocol.

Desktop now has a composed asymmetry: the right lede balances the title, a day table balances the enlarged plot, and the status rail carries actual attributes, a timeline, actions and navigation. Whitespace below the shorter rail is legitimate document space. The chart's much larger empty region is less useful: one exhausted deposit becomes a six-day plateau, so enlargement fixes size more than information yield.

Mobile's first screen is coherent again. Typography, bone background, line-only SVG, navy/amber distinction and a usable deposit action survive. But the full page is 6313px tall, about 7.5 times the supplied viewport height. Current status follows all six clauses. Create takes 1538px and places its review action around y=1304. The phone user receives a long reading exercise before the full operational context.

**Page-area test:** masthead = identity/route switch; opening = agreement/inventory; figure = allowance ceiling and realized fills; clauses = terms and evidence; rail = present state/actions; Annex A = simulated checks; Annex B = proof procedure; Annex C = proposed economics; create = editable terms and signing recap. Every area has a purpose. Access order is the weakness.

**Trunk test:** both routes are partial, 4/6 under the skill: site, page, sections and available actions are clear; selected section/location and search are absent. Search is unnecessary at this scope. Section jumps are helpful, but do not show the active location or persist a destination in the URL.

The inferred system matches the binding direction: Newsreader headings, Manrope prose, DM Mono quantities/addresses, bone `#FAF8F3`, ink `#1A1D21`, navy `#1F3A5F`, restrained amber, fine rules, numbered clauses and 2px controls. Source declares 16px body text, 13px metadata, 18px section headings and 44px desktop titles. No shadows, gradients or ornamental furniture compete with the agreement. Contrast is judged from tokens and captures, not browser-computed measurements.

The staircase is a plateau because the entire 0.5 HYPE deposit sold on day one. That is honest for this fixture. It does not demonstrate the multi-day signature behavior. Do not invent steps to make the current data prettier; show genuine multi-day evidence separately when available. `DESIGN.md` still lists a 15px body scale, whereas CSS uses 16px; the implementation is the preferable choice.

## Findings

High = major task/trust harm; Medium = meaningful comprehension or completion friction; Polish = refinement. Each finding is deducted once from its primary category. Recommendations are report-only.

| ID | Severity / category | Where | What and consequence; specific recommendation |
|---|---|---|---|
| R11-01 | **High / Visual Hierarchy & Composition** | MF, status after clause 6; `src/App.tsx:99,133`, `src/style.css:92` | **Mobile puts the operational summary after the entire contract.** The opening deposit shortcut mitigates this exhausted fixture, but daily progress, order limit, end date and the complete action area remain below six clauses. At a narrow viewport the rail simply becomes the next block. Put compact status and relevant actions ahead of the long clauses; retain detailed terms below. This is task hierarchy, not a request for more sticky chrome. |
| R11-02 | **Medium / Visual Hierarchy & Composition** | D/M, Figure 1; `src/App.tsx:43-53` | **The chart now has useful ticks, but makes the reader reconstruct the fully-sold state.** Amber ceiling and navy fills coincide at 0.5; the navy line ends at now while amber continues through day 6. The labels are legible, yet “all deposited” describes the ceiling, not explicitly the exhausted inventory. State “All 0.5 HYPE deposited has sold” with the figure. Preserve the truthful plateau and blank future fills. The chart is no longer small; its information yield is the issue. |
| R11-03 | **Medium / Spacing & Layout** | CM, form/recap; `src/style.css:46,83,93` | **Five inputs still need roughly 1300px before Review and sign.** Large clause gaps, the opening offset and the full repeated recap consume nearly two screens before the action. R11 has not improved R10's 1538px create height. Tighten repeated vertical spacing while keeping the explicit irreversible-terms recap and confirmation. Do not remove consent information to save pixels. |
| R11-04 | **Medium / Typography** | CM, essential recap figures/dates; `src/style.css:93` | **The signing recap demotes the financial commitment to metadata size.** Mobile `.attrs dd` is 13px, so amount, floor and withdrawal timestamp are smaller than the input values immediately above. These are the terms the user is about to sign. Promote the essential values to body size; keep labels and ancillary evidence at metadata size. Main agreement prose is correctly dark and readable. |
| R11-05 | **Medium / Responsive Design** | M, “Values by day”; `src/style.css:28,92`, `src/App.tsx:50` | **The mobile table disclosure looks like a plain caption.** There is no explicit chevron, plus sign or text cue that values are hidden. The source supplies a 44px summary target, which fixes tap size but not discoverability. Use an unmistakable disclosure marker and expose its open/closed state. The screenshot proves the resting appearance, not whether expansion works. |
| R11-06 | **Medium / Interaction States** | Create quote-pending path; `src/App.tsx:194-195,207,225` | **Waiting for the price is presented as invalid user input.** Until price resolves, valid default `0.5` has `capOk=false`: the UI can show “Checking today's HYPE price” alongside “Use a number above 0...” and “Fix the highlighted terms.” The network dependency is not the user's mistake. Distinguish pending validation from malformed input. Missing-price and thrown-error paths now warn explicitly. **Source-only; pending state was not captured.** |
| R11-07 | **Medium / Interaction States** | Deposit/reconcile feedback; `src/App.tsx:81-84` | **Success text still outruns checked state.** Reconcile says “Fills reconciled” without inspecting receipt status. Deposit says HYPE is locked immediately after `spotSend`, without asserting destination inventory. A refresh is initiated but its result does not gate either success message. Show submission separately, then confirm the actual post-condition. **Source-only risk, not a reproduced failed transaction.** |
| R11-08 | **High / Content & Microcopy** | DF/MF, Annex B; `src/App.tsx:173-180` | **Proof claims are unconditional on a page that supports different agreements.** “Each one ... comes back Rejected” ignores network failure and legitimate withdrawal after the end date. “The sale really filled” asks for fills at the current address even when a new agreement has none. “Verify ... in 60 seconds” is unmeasured despite requiring explorer inspection, three checks and a terminal command. Scope current-address proof to current state, identify historical demo proof explicitly, and remove the timed promise unless measured. Improved result classification does not repair this annex wording. |
| R11-09 | **Medium / Content & Microcopy** | MF/DF, Annex B proof procedure; `src/App.tsx:175-177,180` | **The evidence section still makes the judge assemble the evidence.** The contract source is a text path, not a link; the simulation instruction sends the reader back to clause 4 without a direct jump; the curl command is wrapped but has no copy affordance. “Not built yet” puts internal delivery accounting in the public agreement. Link the actual source and check controls, provide a copyable command, and state demonstrated testnet/fork scope clearly. Relocate absent-scope accounting to the private ledger without hiding simulation provenance. |

Polish, no deductions: links lack an explicit visited treatment; disabled controls use `cursor:default`; section jumps have no selected state; amber is confined to lock/allowance semantics; the design specification's “primary is never disabled” language needs to be scoped to exhausted agreement actions because create correctly disables invalid signing. These are not grounds to weaken validation.

## Owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes, in the captured agreement** | V2's large grey allowance button is replaced by available inventory, explicit exhausted supply and useful outline deposit controls. Busy/invalid states were not exercised. |
| b. Right side empty | **Yes on desktop** | Opening lede, figure table and status rail each carry useful content. Create has an explicit signing recap. Blank space below a shorter rail is acceptable. |
| c. Chart small | **Yes** | Full-width Figure 1 is prominent on desktop and legible in mobile's first screen. It now needs clearer interpretation, not further enlargement. |
| d. Body too light grey | **Yes** | Main prose and financial values use ink. Slate is supporting metadata. Small recap text remains a typography issue, not the original washed-out body treatment. |

## R9 and R10 closure checks

“Rendered fixed” means visible in the supplied R11 captures. “Source fixed” is narrower and does not claim a live interaction test.

| R9 finding | R11 status |
|---|---|
| R9-01: mobile price values disappear | **Rendered fixed.** MF shows oracle, order limit, floor and a wrapping Price check verdict within the 390px document; CSS explicitly permits wrapping. |
| R9-02: awkward chart ticks/overlap | **Partly fixed.** 0.25/0.5/0.63 ticks and short fill label are visible. Coincident marks remain legitimate; interpretation remains R11-02. |
| R9-03: long create/orphan rule/absent annex jumps | **Partly fixed.** Cancelable spans the recap; For judges/Business jumps and desktop annex links are visible. Create is shorter than R9 but unchanged from R10; R11-03 remains. |
| R9-04: address-bound state leaks | **Source fixed.** `Agreement key={r.addr}` remounts state on address changes. No runtime transition exercised. |
| R9-05: unchecked quote states ambiguous | **Substantially source fixed.** Pending blocks signing; missing/invalid price is warned; failed lookup permits explicitly warned signing. Pending-as-invalid messaging remains R11-06. |
| R9-06: network failure becomes Rejected | **Source classification fixed.** `attempt()` distinguishes `ContractFunctionRevertedError`; UI says “Could not check (network)” otherwise. Annex guarantee remains R11-08. |
| R9-07: fee/cost/market overclaims | **Rendered copy fixed.** Gas is distinguished from PLEDGE fees; fixed competitor charges and allocated-versus-filled bases are disclosed; global totals are explicitly not evidence of local demand. External facts unverified. |
| R9-08: long fill annotation clipping | **Substantially fixed for supplied fixture.** Short `0.5 filled` fits; source switches anchor earlier. Late/multiple fills and large quantities remain untested. |

| R10 finding | R11 status |
|---|---|
| R10-01: unstyled mobile agreement | **Rendered fixed.** MF is a styled 390px document. Treat R10's unstyled capture as a capture failure, not proof that the deployed product regressed. |
| R10-02: 1374px-wide mobile document | **Capture defect absent.** MF is actually 390px wide; command wraps. Browser `scrollWidth` remains unmeasured. |
| R10-03: black filled chart triangle | **Rendered fixed.** Line-only navy/amber series appear in both mobile captures. |
| R10-04: desktop chart tick/label mismatch | **Repairs now visible.** Meaningful ticks and short label agree with source. Remaining interpretation issue is R11-02. |
| R10-05: stretched mobile create | **Open.** Same 1538px height and late review action; R11-03. |
| R10-06: small supporting financial text | **Open for recap.** R11-04. Core agreement table values are readable. |
| R10-07: universal proof claims | **Open.** R11-08. |
| R10-08: stale business copy | **Rendered fixed.** Corrected gas and fee-base language is now visible. |
| R10-09: pending means invalid | **Open in source.** R11-06. |
| R10-10: premature success messages | **Open in source.** R11-07. |

## Annex clarity and honesty

**Annex B has useful evidence, but an overconfident title and too much verification labor.** Bold evidence leads are scannable. Exact explorer links, an address-specific query and the explicit separate wallet-test agreement are stronger than generic assertions. The provenance list distinguishes real testnet execution from fork-simulated schedules, floor halts and withdrawal. On mobile those labels now remain readable; the command no longer expands the capture.

However, product-wide historical evidence and evidence about the current agreement are interleaved. The no-cancellation rule, early-withdrawal rule and oversized-sale rule should not be flattened into “each comes back Rejected” regardless of lifecycle. The newly correct network verdict makes this stale instruction more conspicuous. A new agreement can have no fills while inheriting a heading asserting a real sale. Those are honesty defects, not copy polish.

**Annex C is materially more honest than the earlier render.** It names a payer, describes a proposed fee and explicitly says it is absent from the testnet contract. Costs distinguish gas from PLEDGE fees. Competitor fee bases are disclosed rather than implied equivalent. The market paragraph calls its revenue calculation illustrative and explicitly separates global unlock totals from demand and willingness to pay.

The arithmetic is internally consistent: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand. It remains hypothetical gross fees, not observed revenue, reachable volume or buyer validation. The long market paragraph is the least scannable part of the annex; foreground the payer and proposed fee, and visually subordinate the illustration. External pricing, market totals and linked transaction receipts were not independently validated. No financial or demand claim is certified by this review.

## Ten-category grades

Skill computation: start at A; each High deducts one step, each Medium half a step; Polish deducts zero. A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter, retaining fractions for weighting. Overall rounds the weighted deduction to the nearest grade. Provisional A means no confirmed deduction, not a tested pass.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | C | 1.5: R11-01/02. Strong opening, poor mobile status order and residual chart interpretation. |
| Typography | 15% | B | 0.5: R11-04. Distinctive three-font system, essential mobile recap too small. |
| Color & Contrast | 10% | A | 0. Ink prose, coherent palette and directly labeled series. Computed contrast unmeasured. |
| Spacing & Layout | 15% | B | 0.5: R11-03. Desktop composed; mobile create remains stretched. |
| Interaction States | 10% | B | 1.0: R11-06/07. Pending blame and unchecked success feedback, source-only. |
| Responsive Design | 10% | B | 0.5: R11-05. Mobile styling/table fit restored; disclosure affordance weak. Ordering charged to hierarchy. |
| Motion & Animation | 5% | A, provisional | 0. Explicit 150ms color transitions and reduced-motion suppression in CSS; runtime unobserved. Quiet motion suits a financial document. |
| Content & Microcopy | 10% | C | 1.5: R11-08/09. Universal proof guarantees and fragmented verification path. Economics substantially improved. |
| AI Slop Detection | 5% | A | 0. No template feature grid, gradient typography, decorative blobs, floating tags, emoji furniture or generic funnel. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. Font preconnect/swap and RPC batching exist; LCP, CLS, font flash and response latency unmeasured. |

Weighted deduction = **0.675 steps**, rounded to **B**. R9 was 0.60 and R10 was 0.875 under the prior reports' convention. These are not comparable measured product scores: R10's capture failure distorted its rendered assessment. R11 is visibly healthier than the R10 evidence, while several substantive R9/R10 concerns remain.

AI Slop verdict: **A. A specific financial document with an editorial point of view.** Its weak spots are access order and evidentiary claims, not generic decoration.

Litmus: product unmistakable **yes**; strong visual anchor **yes**; structure understandable from headings **yes**; each section has a job **yes**; decorative cards necessary **no**, and absent; motion improves hierarchy **unobserved**; credible without shadows **yes**. No generic SaaS-grid rejection applies.

Interaction-flow assessment is source-only. I cannot narrate clicks or assign a measured goodwill score to flows I could not perform. Priority: scope proof claims, bring mobile current status forward, correct pending/success feedback, then tighten create spacing and promote recap values. Nine findings, zero fixes applied.

Blind spot: supplied captures and local source cannot prove deployment parity, dialog/keyboard accessibility, error recovery, multi-day chart behavior, wallet completion, external factual claims or runtime performance. No new screenshots, tests, product changes or additional report files were produced.

## Scores

Independent 0-10 dimensions across both routes, separate from the weighted rubric. Sum 63; mean 7.875, rounded to one decimal.

```text
hierarchy=8
layout/space use=7
typography=8
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7
mobile=6.5
AVERAGE=7.9 MIN=6.5
```
