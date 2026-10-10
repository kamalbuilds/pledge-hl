# PLEDGE independent design audit: R12

2026-10-11. Agreement and create routes. Report only, no product changes.

Design Score: B
AI Slop Score: A

**R12 repairs the four original complaints. It has a convincing financial-document identity, but mobile create now puts consent before editing. The proof annex still promises a timed verification it has not demonstrated. This is a professional-looking interface with unfinished task design.**

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, design-system extraction, ten-category checklist, interaction-path inspection, cross-page consistency and regression grading. Both routes are **APP UI**. The binding Term sheet direction takes precedence over landing-page prescriptions for decorative imagery or motion.

The user's one-report restriction overrides the skill's source repair loop, setup/configuration writes, extra artifacts, outside review processes and commits. Existing untracked captures were preserved. Only this report was written.

Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, and R11's audit; checked relevant font and RPC declarations. Inspected all six supplied R12 images and the V2 negative reference. The latter exists at `design-research/negative/v2-termsheet-6.5-1440.png` in this workspace.

| Key | Screenshot | Dimensions |
|---|---|---|
| D | [Agreement viewport](r12-1440.png) | 1440 x 900 |
| M | [Agreement viewport](r12-390.png) | 390 x 844 |
| DF | [Agreement full](shots/r12-1440-full.png) | 1440 x 3896 |
| MF | [Agreement full](shots/r12-390-full.png) | 390 x 6547 |
| C | [Create desktop](shots/r12-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r12-create-390.png) | 390 x 1524 |

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) through background Brave using `minibhn deepsurge open`. SSH failed with `Operation not permitted`. Web fetch also failed for the agreement and [create route](https://v3-review.pledge-ccs.pages.dev/#/create). These are access failures here, not evidence of a deployment outage. No user tab was navigated, browser restarted or new screenshot taken. No live clicks, wallet operation, keyboard flow or performance measurement was completed.

Rendered findings refer to the supplied captures. Source-only findings are explicitly marked. Local source does not prove deployment parity.

## First impression and design direction

The site communicates **a signed financial instrument**. I notice a large agreement title, a small actionable inventory strip and an unusually large plot of an exhausted deposit. My first three focal points are **the serif title**, **0 HYPE beside Deposit HYPE**, and **the navy fill dot**. One word: **sober**.

Desktop is composed rather than decorated. The right lede balances the heading, the value table balances the plot, and the status rail contains useful operating information. No disabled slab competes with the agreement. However, enlarging a six-day plateau does not make it six days of evidence. The chart is now big enough; its information density is the weakness.

The mobile agreement has recovered a sensible status-before-clauses order. Mobile create has the opposite problem: I see “You are agreeing to” and a large signing action before I see “Draft a lock agreement.” The first field starts around y=758. A broad responsive rule has substituted a new ordering defect for the old one.

**Page-area test:** masthead = identity/route switch; opening = agreement/inventory; Figure 1 = cumulative ceiling and fills; rail = current status/actions; clauses = binding terms; Annex A = simulated evidence; Annex B = verification; Annex C = economics; create fields = editable terms; create recap = consent. Every area has a clear job. The create recap occupies the wrong position on a phone.

**Trunk test:** agreement **PARTIAL, 4/6**: site, page, sections and options are clear; current section and search are absent. Create **PARTIAL, 4/6** across the full page, but its mobile first viewport obscures page identity below the recap. Search is unnecessary for this scope. Section jumps lack selected-state feedback and do not preserve location in the URL.

**Extracted system:** Newsreader headings, Manrope body/UI, DM Mono quantities/addresses; bone `#FAF8F3`, ink `#1A1D21`, navy `#1F3A5F`, restrained amber, fine rules and 2px controls. CSS uses 13/16/18/26/44px; body line-height is 1.6. The 16px body improves on DESIGN.md's documented 15px. Numbered clauses and the document/rail composition closely follow the references without copying their visual skins.

Calculated contrast from source tokens against bone: ink **15.94:1**, slate **5.65:1**, navy **10.82:1**, amber stroke **3.43:1**, darker amber text **5.57:1**. These are opaque-token calculations, not browser-computed results. The chart deliberately uses darker amber for labels. Body contrast is not the remaining problem.

## Findings

High = major task/trust harm; Medium = meaningful comprehension or completion friction; Polish = refinement. Each scored finding is charged once to its primary category. Recommendations are report-only.

| ID | Severity / category | Where | What and consequence; recommendation |
|---|---|---|---|
| R12-01 | **High / Visual Hierarchy & Composition** | CM, recap at y=98, Review and sign at y=510, title around y=706; `src/style.css:92`, `src/App.tsx:203-219` | **Mobile create asks for agreement before showing the editable agreement.** The recap consumes roughly 530px before the draft title; every input is below the CTA. Editing the final price field leaves the action far above it. An invalid-input message beside that action is also separated from the fields it describes. The shared `.cols>.rail { order:-1 }` repairs agreement status but damages create. Give the two routes different mobile ordering: title and fields before the full consent recap on create. Keep the confirmation dialog. Source also shows visual order differing from DOM focus order; actual keyboard traversal was not tested. |
| R12-02 | **Medium / Spacing & Layout** | D/DF/M, Figure 1; `src/App.tsx:31-38`, `src/style.css:33-34` | **The chart spends most of its area on five future days of the same exhausted deposit.** The flat 0.5 ceiling is truthful, and the new annotation explains the sale. It still gives a very large footprint to one dot and one plateau. On mobile, detailed status remains below the first viewport. Make the visible time window useful to this state, or show compact current status before the figure. Do not invent staircase steps or extend filled values into the future. The real multi-day signature remains undemonstrated by this fixture. |
| R12-03 | **Medium / Content & Microcopy** | D/M, agreement h1 and inventory strip; `src/App.tsx:91-93` | **The largest text says “for 0.5 HYPE of unlocked supply,” while the agreement currently holds zero HYPE.** The supporting strip and chart clarify the historical deposit, so this is not an unsupported amount. It is a weak scan hierarchy: the largest quantity reads as present inventory and the smaller text corrects it. Label the heading quantity as deposited supply, or make the exhausted state explicit beside the heading. |
| R12-04 | **High / Content & Microcopy** | DF/MF, Annex B title and evidence leads; `src/App.tsx:174-179` | **“Verify it on-chain in 60 seconds” remains an unmeasured performance promise.** The path requires explorer inspection, three simulations, a terminal query and interpretation. There is no timed proof in this review. The new lifecycle/network explanations are real improvements, but the lead “The sale really filled” still appears on agreements whose current-address query can return no fills. Scope that lead to historical demo evidence or current sale state. Remove the timed promise unless the whole procedure is measured with a first-time judge. |
| R12-05 | **Medium / Content & Microcopy** | DF/MF, Annex B procedure and provenance list; `src/App.tsx:176-181` | **The evidence is more accessible, but the judge still has to assemble it.** Clause 4 is now linked and the command is copyable. The contract source remains an unlinked `contracts/src/Pledge.sol` path; checking fills still requires a terminal and knowledge of side “A.” The public “not built yet” badge is internal project accounting, not agreement evidence. Link the exact source, provide a direct route to the sale evidence, and express demonstrated testnet/fork scope clearly. Move absent-capability accounting to the private ledger while retaining honest simulation labels. |
| R12-06 | **Medium / Interaction States** | Deposit feedback; `src/App.tsx:84` | **The deposit repair checks that inventory increased, not that the entered amount arrived.** A transfer of `amt` is followed by up to ten balance reads, but any `st.balance > before` produces “amt HYPE locked.” Another deposit or partial increase can satisfy that predicate; a concurrent sale can prevent it despite a successful deposit. The timeout text is appropriately cautious. Confirm the attributable transfer amount, or report only the observed balance change without claiming the entire entered amount is locked. **Source-only residual risk, not a reproduced transfer failure.** |
| R12-07 | **Medium / Interaction States** | Annex B Copy command; `src/App.tsx:178` | **The new copy affordance has no failed-copy state.** `writeText(...).then(...)` handles success but has no rejection handler. If the browser denies clipboard access, the user gets no explanation or alternative selection guidance. Keep “Copied” conditional on success and show a concise failure/recovery message. **Source-only; clipboard behavior was not exercised.** |

Polish, no deductions: `0.63` is an awkward top tick for an actual 0.625 maximum; duplicated 0.5 ceiling values add little after day 1; “all 0.5 HYPE deposited is sold” is grammatical but clumsy; visited links have no distinct treatment; disabled controls use `cursor:default`; inline evidence links do not receive the 44px target treatment given to buttons. Mobile create begins with two closely spaced ink rules, making the recap feel pasted below the masthead. CSS's duplicated `.attrs dd` and form-padding rules require `!important` to override older declarations. This is source maintenance debt, not another visual finding.

## Owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes in the captured agreement** | V2's large grey allowance action is gone. Exhausted inventory is text; Deposit HYPE is an outline action. Create's valid navy signing button is a separate hierarchy problem, not the disabled-button regression. |
| b. Right side empty | **Yes on desktop** | Lede, chart table and populated status rail use the right side purposefully. Create has a substantial terms recap. Blank space below shorter content is acceptable document space. |
| c. Chart small | **Yes** | Figure 1 has a prominent full-content-width section and a readable mobile plot. More enlargement would worsen information density. |
| d. Body too light grey | **Yes** | Main prose uses ink at 16px. Slate is reserved for supporting text and passes the calculated contrast check. Essential mobile recap values are now 16px. |

## R11 closure check

| R11 finding | R12 status |
|---|---|
| R11-01: mobile status after all clauses | **Rendered fixed.** MF places status and actions immediately after Figure 1, before clause 1. The broad ordering repair creates R12-01 on create. |
| R11-02: chart requires reconstructing fully-sold state | **Rendered fixed for this fixture.** The navy annotation explicitly says all 0.5 HYPE deposited is sold; the ceiling label names its quantity. Plateau information density remains R12-02. |
| R11-03: long create, action around y=1304 | **Partly fixed, with a regression.** Action is now around y=510 and form spacing is tighter, but overall height changes only from 1538 to 1524px. The recap moved above the fields rather than resolving the task sequence. R12-01 remains high impact. |
| R11-04: essential mobile recap at 13px | **Rendered fixed.** CM's values/dates are visibly body-size; CSS explicitly sets 16px. |
| R11-05: table disclosure resembles caption | **Rendered fixed affordance.** M shows “+ Show values by day”; source switches the marker when open. Expansion itself was not clicked. |
| R11-06: quote pending is called invalid input | **Source fixed for valid defaults.** `capOk` no longer requires `mid>0`; `priceReady` separately blocks signing and selects a waiting message. Genuine malformed input can still be invalid during quote loading. |
| R11-07: unchecked success feedback | **Substantially source fixed, not fully closed.** Reconcile rejects reverted receipts. Deposit polls inventory with a bounded timeout and cautious fallback. Its amount attribution is still weaker than its success wording, R12-06. |
| R11-08: universal proof claims | **Partly fixed.** Annex B explains term expiry, network failure, demo-only reverted transactions and empty fill history. The unmeasured timing promise and unconditional sale lead remain R12-04. |
| R11-09: fragmented evidence procedure | **Partly fixed.** Clause jump and Copy command exist. Exact source link and direct sale inspection remain absent; public delivery-accounting badge remains. R12-05/07. |

These are screenshot or source closures, not claims of independently reproduced live behavior.

## Annex clarity and honesty

**Annex B is stronger evidence packaging, but still reads like a technical verification assignment.** Bold leads, explorer links, a clause jump and a copy control improve scanning. The separate wallet-test agreement is explicitly identified. Real-testnet and fork-simulated results are distinguished rather than merged into a claim of live multi-day execution. The new network and expiry language corrects important R11 overclaims.

The title still overstates ease. Four evidence steps, address/hash interpretation and a terminal command are not a self-evident 60-second task. Historical proof and current-address proof remain interleaved. The full mobile agreement is **6547px**, about **7.8 supplied viewport heights**, up from 6313px in R11. Annexes are reachable through jumps, but the bottom remains a dense evidence dossier. Preserve provenance; reduce repetitive explanation and bring direct proof links closer to the claims they support.

**Annex C names a payer and a fee basis honestly.** The fee is explicitly proposed and absent from the testnet contract. Gas is distinguished from PLEDGE fees. The global market illustration explicitly disclaims local demand and willingness-to-pay evidence. Its arithmetic is correct: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand. That is hypothetical gross fees, not traction or reachable revenue.

The quoted base vesting and lock charges match [Streamflow's published breakdown](https://streamflow.finance/blog/how-much-does-streamflow-cost), but its subscription plans alter vesting charges. The $0.99 withdrawal charge matches [Sablier's fee documentation](https://docs.sablier.com/concepts/fees), which limits it to specified newer stream releases. The annex omits these qualifications; acceptable as a brief base-price comparison, insufficient as a universal cost comparison. It does correctly distinguish allocation-based fees from proceeds-based fees.

The linked Tokenomist report could not be fetched, so its market totals remain unverified here. Linked transaction receipts and contract properties were not independently checked against chain state. The strongest business content is the payer and fee basis; the long market paragraph is less useful to an agreement reader and should be visually subordinate. This review assesses claim framing, not buyer validation.

## Ten-category grades

Skill computation: start at A; each High deducts one letter step, each Medium half a step; Polish deducts zero. As in R11, A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter while retaining fractions for weighting; overall rounds the weighted deduction to the nearest grade. Provisional A means no confirmed deduction, not a runtime pass.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 1.0: R12-01. Agreement improves; mobile create reverses edit and consent. |
| Typography | 15% | A | 0. Distinct three-font roles, readable body, repaired recap figures. |
| Color & Contrast | 10% | A | 0. Coherent palette; source-token ratios pass relevant thresholds. |
| Spacing & Layout | 15% | B | 0.5: R12-02. Desktop balance works; exhausted plot overuses space. |
| Interaction States | 10% | B | 1.0: R12-06/07. Pending and receipt handling improve; deposit attribution and copy recovery remain. |
| Responsive Design | 10% | A, provisional | 0 additional deductions. Rendered agreement status/table repairs hold at 390px; create ordering charged to hierarchy. Tablet, keyboard order and overflow unmeasured. |
| Motion & Animation | 5% | A, provisional | 0. Quiet 150ms color transitions and reduced-motion suppression suit the document. Runtime unobserved. |
| Content & Microcopy | 10% | C | 2.0: R12-03/04/05. Inventory scan ambiguity, overconfident proof promise and incomplete evidence path. |
| AI Slop Detection | 5% | A | 0. No template feature grid, gradient text, blobs, ornamental icon circles, floating tags or generic funnel. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. Font preconnect/swap and RPC batching exist; perceived load, LCP, CLS and latency were not measured. |

Weighted deduction = **0.525 steps**, rounding to **B**, versus R11's 0.675 under the same convention. That improvement reflects actual repairs, not a claim that all flows are proven. The rubric's generous A starting point and unobserved categories make its overall letter less demanding than the concrete mobile findings.

**AI Slop verdict: A. A recognisable financial document with deliberate typography and semantic restraint.** Its weaknesses are ordering and proof friction, not generic decoration. Do not replace the direction to solve these issues.

Litmus: product unmistakable **yes on agreement, weakened in mobile create's first screen**; strong visual anchor **yes**; understandable from headings **mostly, except historical/current sale scope**; one job per section **yes**; decorative cards needed **no and absent**; motion improves hierarchy **unobserved**; credible without decorative shadows **yes**. No SaaS-grid or stacked-card rejection applies.

## Quick wins, report only

1. Scope rail-first mobile ordering to agreement; retain edit-before-consent ordering on create.
2. Remove the unmeasured 60-second claim and scope the sale lead to current or historical evidence.
3. Link the exact contract source and sale evidence beside the proof claims.
4. Give clipboard rejection an explicit recovery message.

Seven scored findings: two High, five Medium. Zero fixes applied. No invented click narration, goodwill measurement or motion/performance pass.

Blind spot: captures and local source cannot establish live deployment parity, dialog/keyboard accessibility, error recovery, attributable wallet completion, multi-day chart behavior or runtime performance. Market totals and linked chain evidence remain unverified.

## Scores

Independent 0-10 assessment across both routes, separate from the weighted letter rubric. Sum 64.5; mean 8.0625, rounded to one decimal. Mobile remains the weakest dimension despite real repairs.

```text
hierarchy=7.5
layout/space use=7.5
typography=9
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7.5
mobile=6.5
AVERAGE=8.1 MIN=6.5
```
