# PLEDGE independent design audit: R10

2026-10-11. Agreement and create routes. Report only. No source repairs.

Design Score: B
AI Slop Score: A

**Desktop has a credible term-sheet identity. The supplied mobile agreement is visibly broken. R10 cannot be accepted as a responsive product.** A weighted B is not a release recommendation: this rubric allows the attractive desktop to offset a severe mobile failure. The separate mobile score below is 1.5/10.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, inferred design system, page-area and trunk tests, ten-category checklist, cross-route consistency, R9 regression review and impact deductions. Both routes are **APP UI**. Decorative motion, photographic heroes and landing-page prescriptions would undermine this financial document.

The user's one-report restriction takes precedence over the skill's source fixes, setup writes, extra artifacts and commits. This is an independent assessment of existing work. I read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, the R9 audit, and supporting table, entry-point, font and chain code. I inspected all six R10 screenshots and the V2 negative reference. The latter exists at `design-research/negative/v2-termsheet-6.5-1440.png`, rather than the supplied relative path from the project root.

| Key | Evidence | Actual image dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r10-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r10-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r10-1440-full.png) | 1440 x 3736 |
| MF | [Agreement mobile full](shots/r10-390-full.png) | **1374 x 4707** |
| C | [Create desktop](shots/r10-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r10-create-390.png) | 390 x 1538 |
| V2 | [Owner's 6.5/10 reference](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

The nominal 390px full agreement capture is actually 1374px wide. Do not interpret its scaled-down text as a designed small font: the image viewer scales an oversized document to fit. M independently demonstrates the unstyled rendering at native viewport size.

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) using background Brave, `minibhn deepsurge open`. SSH failed with `Operation not permitted`. Web fetch could access neither agreement nor [create](https://v3-review.pledge-ccs.pages.dev/#/create). This establishes an access failure here, not a deployment outage. No user tab was navigated, and no browser profile was restarted.

**There is also a material source/capture mismatch.** D shows ticks `0.16 / 0.31 / 0.47 / 0.63` and the long `filled 0.5 HYPE, last at 22.512` annotation. Local `src/App.tsx:43,48` specifies meaningful ceiling ticks and the short `0.5 filled` annotation. DF omits annex links from the rail and says buyers/keepers pay nothing; local source includes annex links and qualifies network gas. Thus neither capture freshness nor local source alone proves that all repairs reached the reviewed deployment. Grades assess the supplied rendered state; source repairs receive qualified closure below.

## First impression, structure and direction

The desktop site communicates **a signed financial agreement**. I notice the large ink title, then `0 HYPE` with the deposit action, then Figure 1's navy fill dot. In one word: **sober**. Those are sensible focal points. The title has a controlled two-line break, and the explanatory right column gives the opening a composed asymmetry.

The mobile agreement communicates **an unstyled HTML fallback**. My eye goes to the default bold serif heading, then the tiny native buttons, then an unexplained black triangle. In one word: **broken**. This is not an austere interpretation of the direction. The bone canvas, deliberate font roles, rules, numbered-clause treatment and data-series encoding have disappeared together.

CM proves that the mobile create composition can retain the intended identity: bone surface, expressive heading, aligned numbered fields, underlined inputs, two-column recap and one navy review action. The two routes currently look like separate products on a phone.

Page-area test: masthead identifies the product and route switch; opening identifies the agreement and available inventory; figure compares allowance and fills; clauses explain restrictions; rail gives status and actions; Annex A holds simulated checks; Annex B presents proof; Annex C describes economics. Every area has a recognizable job on desktop. Mobile loses their visual separation and delays status until after all six clauses.

Trunk test: **PARTIAL** for both routes. Site, page and section purposes are clear; current section is not indicated, and dialog orientation is unobserved. Search is unnecessary at this scope. No measured click-flow or goodwill score is invented from static pictures.

Desktop largely follows the binding Newsreader / Manrope / DM Mono direction. Bone, ink, navy, sparse amber, 2px controls and numbered clauses are coherent. The enlarged plot is now a real document figure. A single plateau is honest for an exhausted 0.5 HYPE deposit; inventing future unlocked supply to make a prettier staircase would be worse. The signature component needs a genuine multi-day fixture to demonstrate its staircase behavior, not decorative extra steps.

## Findings

High = major trust/task harm; Medium = meaningful comprehension or completion friction; Polish = refinement. Each finding is charged once to its primary category. R10-01 is a blocking High, despite the rubric's limited deduction per finding. Recommendations describe the repair needed; none was implemented.

| ID | Severity / category | Where | What, consequence and recommendation |
|---|---|---|---|
| R10-01 | **High, blocking / Responsive Design** | M and MF, whole agreement | **The mobile agreement has lost its styling.** White background, browser-default blue links and bold serif typography, native buttons, ordinary list indentation, visible desktop/mobile duplicate sale content and concatenated legend text replace the intended interface. This affects financial readability and touch use across the route. CM remains styled, so a global design decision cannot explain it. Diagnose the deployed stylesheet/capture state and repeat agreement verification at 390px before claiming mobile success. Local CSS contains mobile rules; that does not explain why these captures lack them. |
| R10-02 | **High / Spacing & Layout** | MF, Annex B command; `src/App.tsx:170,177`, `src/style.css:89` | **The 390px agreement document expands to 1374px.** Its unwrapped curl command visibly runs far beyond the prose column. The image width is 3.52 times the intended viewport; it is consistent with serious horizontal overflow, though the capture tool's viewport configuration is unavailable. Local `.code` wrapping exists, but is absent in the rendering. Keep the proof command within the document and verify actual scroll width at the narrow viewport. This is not an acceptable way to make a mobile page appear shorter. |
| R10-03 | **High / Visual Hierarchy & Composition** | M, Figure 1; compare D; `src/App.tsx:46`, `src/style.css:35` | **The figure becomes a black filled triangle.** With SVG path styling absent, default fill visually closes the staircase path into an area. That suggests a slope/area where the real data is a horizontal 0.5 ceiling and a completed fill. Navy/amber identity, line distinction and fill annotation are lost. Restore line-only rendering and verify that a single fill cannot look like cumulative linear growth. A readable axis cannot rescue a false visual shape. |
| R10-04 | **Medium / Visual Hierarchy & Composition** | D/DF, Figure 1 | **Desktop still wastes interpretation effort.** The important 0.5 level is absent from the captured ticks; ceiling and fill coincide; most of the large plot is empty. The reader must join legend, annotation and table to infer that the entire deposit is sold. Local useful-tick/short-label repairs are promising but not visible here. Show the meaningful tick and a concise fully-filled state, retaining truthful future blanks. Keep the plot large enough to read, without adding invented data. |
| R10-05 | **Medium / Spacing & Layout** | CM, form and recap; `src/style.css:83,93` | **Mobile create is improved but still stretched.** Five inputs take the user through roughly 900px before the recap begins; Review and sign starts around y=1304. Total height is 1538px, down 108px from R9's 1646px. Full-width Cancelable now fixes the orphan rule. Reduce repeated clause/input spacing further while preserving the explicit recap and confirmation. An irreversible financial action should remain deliberate; a sticky shortcut is not required. |
| R10-06 | **Medium / Typography** | CM, signing recap; DF, proof/economics metadata; `src/style.css:15,89,93` | **Supporting financial content is still small.** CM renders amount/date recap values at 13px, while explanation copy and proof labels also carry substantial work at metadata size. DM Mono preserves alignment but does not make small dates easier to read. Promote essential recap figures and time boundaries above metadata sizing. Desktop prose itself is properly dark and readable. |
| R10-07 | **High / Content & Microcopy** | Annex B, both full agreement captures; `src/App.tsx:173-180` | **The proof copy promises outcomes that depend on agreement state.** “Each one ... comes back Rejected” disregards unavailable checks and post-term successful withdrawal. “The sale really filled” queries the current address even when it is a newly created agreement with no fill. Historical wallet proof is correctly called a separate agreement, but the universal heading and claim list still read as proof of the current document. Make current-address evidence conditional and identify historical product proof separately. The “60 seconds” claim is unmeasured and implausible as a universal promise for explorer inspection, three checks and a terminal command. |
| R10-08 | **Medium / Content & Microcopy** | DF, Annex C; compare `src/App.tsx:184-186` | **The rendered business annex retains the old overclaims.** DF says buyers/keepers pay nothing and gives an incomplete Streamflow lock-cost comparison. Local copy now distinguishes PLEDGE fees from gas, includes fixed fees and allocated-versus-filled bases, and explicitly denies that global unlock totals demonstrate demand. Those are good repairs, but they are not visible in DF. Publish and inspect the corrected copy before crediting closure. External pricing/current market totals were not independently revalidated in this audit. |
| R10-09 | **Medium / Interaction States** | Create quote pending/failure paths; `src/App.tsx:194-195,207,218` | **Pending minimum-order checking is treated like bad user input.** `capOk` is false until price resolves, so the initially valid 0.5 can get both “Checking today's HYPE price” and “Use a number above 0...” plus “Fix the highlighted terms.” That blames the user for a network dependency. Missing-price responses now get an explicit error, and signing while pending is blocked. Separate pending validation from invalid input. After failure, signing is allowed with the explicit unchecked warning; that is a policy choice, not proof of a successful check. Source-only; no failure-state capture supplied. |
| R10-10 | **Medium / Interaction States** | Deposit/reconcile feedback; `src/App.tsx:81-84` | **Success messages can outrun the verified operation.** Reconcile ignores receipt status before saying “Fills reconciled”; deposit immediately says the amount is locked after `spotSend`, without confirming destination inventory. The subsequent refresh is not a checked post-condition. Distinguish submission from confirmed state, and treat a reverted receipt as failure. These are source-only feedback risks, not reproduced failed transactions. |

Polish, zero deductions: links lack an explicit visited treatment; disabled controls use `cursor:default`; the design spec still calls body text 15px while CSS uses 16px; the “primary is never disabled” rule is contradicted by valid create pending/invalid disabling. Narrow the spec to the exhausted agreement action rather than weakening form validation. Native small controls in M are covered by R10-01, not counted again as separate deductions.

## Owner complaints a-d

| Original complaint | Fixed? | Evidence and qualification |
|---|---|---|
| a. Disabled button dominated | **Yes in the captured agreement** | V2's large disabled allowance button is replaced with availability, explicit exhausted inventory and useful deposit controls. Create has an appropriate review action. Pending/busy states were not exercised. |
| b. Right side empty | **Yes on desktop** | Right lede, figure value table and status rail contain useful content. C uses the right side for signing terms. MF's enormous empty right area is overflow, not intentional whitespace. |
| c. Chart small | **Yes on desktop; mobile effectiveness fails** | D's plot has substantial width and height. M's plot is visible but corrupt: more pixels do not make the black triangle informative. |
| d. Body too light grey | **Yes for main prose** | D/C/CM use ink for body content. M is dark too, but via browser defaults. Contrast repair cannot be credited as mobile design fidelity. Metadata and signing recap remain small. |

The owner complaints are mostly resolved in the intended desktop composition. They are not a sufficient acceptance checklist for the current rendered mobile route.

## R9 closure check

| Previous finding | R10 status |
|---|---|
| R9-01: mobile price values disappear | **Local repair, rendered closure unproven.** `.terms td,.terms th` now wrap and the native table in MF shows values. The agreement is unstyled, so this does not demonstrate that the styled 390px table fits. |
| R9-02: awkward chart ticks/overlap | **Partially fixed in source; open in desktop capture.** Local ceiling/midpoint ticks replace quarter-scale ticks, but D still shows the latter. Coincident series remain legitimate. R10-03/04. |
| R9-03: long mobile create, orphan rule, missing annex navigation | **Partially fixed.** CM shrinks to 1538px and Cancelable spans the recap. M exposes For judges/Business jumps; local rail includes both annexes, while DF's rail does not. Review remains late, R10-05. |
| R9-04: state leaks between agreement addresses | **Fixed in local source, not runtime-tested.** `Agreement key={r.addr}` at line 23 remounts identity-bound state. No credit for a live address-transition test that did not happen. |
| R9-05: unchecked quote states ambiguous | **Substantially repaired in source.** Nonpositive/missing price sets `midErr`; pending is explicit and blocks signing; failed lookup is explicit and allows warned signing. New pending-as-invalid copy remains R10-09. |
| R9-06: network error reported as rejection | **Fixed in local result classification; annex wording remains open.** `attempt()` distinguishes `ContractFunctionRevertedError`; UI says “Could not check (network)” otherwise. Annex B still guarantees Rejected. No live negative-path exercise. |
| R9-07: fee/cost/market overclaims | **Fixed in local copy, not in supplied desktop rendering.** Gas, fixed fees, pricing bases and demand boundary are explicit locally. DF retains old text. R10-08. |
| R9-08: long latest-fill annotation can clip | **Substantially repaired in source.** Short label plus earlier anchor switch reduces risk. D retains the old long label; M renders no readable latest-fill annotation. Multiple/late-fill fit remains untested. |

R10 adds useful repairs but introduces a much worse captured mobile surface than R9. Do not mark the whole revision improved based on local code alone.

## Annex clarity and honesty

**Annex B:** the four bold evidence leads are scannable on desktop, and the provenance list distinguishes testnet execution from mocked HyperCore/fork checks. Exact links and an address-specific command are useful proof material. However, a source path printed as text is not a usable source link; judges must return to clause 4 to run checks; there is no direct proof-control jump or copy command action. On mobile the command blows out the page and provenance becomes an ordinary dense bullet list. The proof section describes work the judge must do, rather than packaging a reliably short verification path.

The explicit separate-wallet-agreement sentence is honest scope. The unconditional sale/rejection claims are not safe on every agreement. “Not built yet” is candid, but mixes delivery status into the agreement's judge-facing document and violates the supplied public-surface discipline. Keep the public proof focused on demonstrated testnet scope and place absent-scope accounting in the private ledger. Do not hide simulated status or broaden a claim.

**Annex C:** intended payer, proposed proceeds-based fee and comparison sources have clear roles. The fee is expressly absent from the testnet contract, which avoids claiming implemented revenue collection. Local amended copy is considerably more honest than DF: costs distinguish gas, comparisons identify fee bases, and global-market arithmetic is explicitly not evidence of local demand or willingness to pay.

The illustration is arithmetically sound: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand. It is a hypothetical gross-fee scenario, not a forecast, addressable-market measurement or observed buyer commitment. I did not verify the linked market totals, current competitor prices or the claimed wallet transaction receipts. No claim about those was certified by merely opening this source.

## Ten-category grades

Skill computation: A starts at zero deductions; each High costs one step, each Medium half a step; Polish costs zero. A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter, retaining fractional deductions for weighting. Overall uses nearest letter, matching the prior audit's convention. No extra credit is given for improvements not visible in the reviewed render.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | C | 1.5: R10-03/04. Desktop opening works; chart misrepresents data on mobile. |
| Typography | 15% | B | 0.5: R10-06. Strong intended three-font system; essential recap content undersized. Whole-route style loss charged to Responsive. |
| Color & Contrast | 10% | A | 0 confirmed independent deductions. Ink prose works; mobile loss of semantic series color belongs to R10-01/03. Computed contrast unmeasured. |
| Spacing & Layout | 15% | C | 1.5: R10-02/05. Huge agreement overflow and overlong create. |
| Interaction States | 10% | B | 1.0: R10-09/10. Improved rejection discrimination; validation and finality feedback still misleading. Source-only. |
| Responsive Design | 10% | B, **blocking defect** | 1.0: R10-01. This is the rubric's mechanical one-High deduction, not an endorsement of mobile. The rendered route would fail a release gate. |
| Motion & Animation | 5% | A, provisional | 0 observed deductions. CSS declares restrained color transitions and reduced-motion suppression; runtime unobserved. No theatrical motion needed. |
| Content & Microcopy | 10% | C | 1.5: R10-07/08. Universal proof claims and stale rendered economics. |
| AI Slop Detection | 5% | A | 0. No feature-card grid, rainbow text, floating pills, decorative icon furniture or template funnel. Broken default HTML is a delivery defect, not evidence of AI slop. |
| Performance as Design | 5% | A, provisional | 0 confirmed performance deductions. Font preconnect/swap and RPC batching exist; LCP, CLS, font flash and response time were not measured. Mobile style loss already charged once. |

Weighted deduction = **0.875 steps**, rounded to **B**. R9 was 0.60, also B. The unchanged letter conceals a meaningful regression, and the rubric under-penalizes a single route-wide failure. The dimension scores below make that visible. Provisional A means no observed deduction, not a measured pass.

AI Slop verdict: **A. A distinctive financial document, with a broken mobile delivery.** These are separate judgments.

Litmus: product unmistakable **yes**; strong visual anchor **desktop yes, mobile misleading**; headline scan communicates structure **yes**; each section has a job **yes**; decorative cards necessary **no**, and absent; motion improves hierarchy **unobserved**; premium without shadows **desktop yes, mobile no**. No generic SaaS-grid hard rejection applies. Specificity does not establish usability.

## Priority order, recommendations only

1. Restore and verify the styled agreement at a real 390px viewport, including line-only SVG rendering and bounded document width.
2. Reconcile local source with the deployed revision, then inspect chart, table, navigation and annex copy together.
3. Make proof claims conditional on current agreement state and distinguish historical wallet evidence.
4. Correct pending validation copy and confirm destination/receipt state before success feedback.
5. Tighten mobile create rhythm and promote the recap's essential values.

Blind spot: live access failed. Supplied captures and local source cannot prove deployment parity, interaction recovery, keyboard/dialog accessibility, wallet completion, external pricing or runtime performance. No product code, new screenshots, tests, fixes or extra reports were produced.

## Scores

Independent 0-10 scores across both routes and viewports, separate from weighted letter grades. Mobile agreement failure materially lowers layout, fidelity and chart clarity despite strong desktop craft. Sum 43.5; mean 5.4375, rounded to one decimal.

```text
hierarchy=7
layout/space use=5
typography=6
colour/contrast=7
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=5
data/chart clarity=3
mobile=1.5
AVERAGE=5.4 MIN=1.5
```
