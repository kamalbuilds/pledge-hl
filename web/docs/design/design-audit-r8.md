# PLEDGE independent design audit: R8

2026-10-10. Agreement and create routes. Report only.

Design Score: B
AI Slop Score: A

**The term-sheet identity is convincing. The financial explanation is still less reliable than its typography suggests.** R8 preserves the improvements that answer the owner's four complaints, but does not close the substantive R7 findings. The new annexes add useful context and a serious new defect: their evidence-status column is outside the visible table in both full-page captures. A judge can read the claims while missing whether they were real, simulated or absent. That is a trust problem, not a cosmetic table problem.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area test, trunk test, system extraction, ten-category checklist, flow and cross-route review, impact deductions, weighted grades and quick wins. Both routes are **APP UI**. Annex C is supporting commercial prose inside a financial document, not a reason to apply cinematic landing-page rules.

The explicit one-file, no-fixes instruction takes precedence over the skill's setup writes, configuration changes, source fixes, commits, additional reports and outside-voice workflow. This is my independent review. Source was read because the user explicitly supplied it and requested honesty checks; rendered findings and source-only risks are distinguished below. No implementation files were changed.

Opened all six supplied R8 images and the V2 negative reference. Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md` and the R7 audit. Targeted supporting reads covered the shared table, theme, font declarations and RPC transport.

| Key | Evidence | Native dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r8-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r8-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r8-1440-full.png) | 1440 x 3516 |
| MF | [Agreement mobile full](shots/r8-390-full.png) | 390 x 5702 |
| C | [Create desktop](shots/r8-create-1440.png) | 1440 x 1087 |
| CM | [Create mobile](shots/r8-create-390.png) | 390 x 1668 |
| V2 | [Owner's previous 6.5/10 version](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

The V2 link resolves from this report's directory to `web/design-research/negative/`, not from the workspace root using the prompt's relative path.

Attempted [live agreement](https://v3-review.pledge-ccs.pages.dev/) through the background Brave harness. `minibhn deepsurge open` failed with SSH `Operation not permitted`. The web tool could access neither that URL nor [live create](https://v3-review.pledge-ccs.pages.dev/#/create). These failures do not prove the deployment is down. Screenshots are the visual evidence; local source/deployment parity is unverified. No browser interactions, performance measurements or new captures are claimed.

## First impression, structure and direction

The site communicates **a signed financial instrument**. I notice the ink serif agreement title, the blunt `0 HYPE` available state, then the navy fill dot. Those are the first three things my eye goes to. One word: **sober**. The opening is much better than V2: it gives the exhausted state an explanation and a useful deposit action instead of a dominant disabled rectangle.

Desktop has an intentional composition. The right lede balances the title; the figure spans the document; a value table occupies the figure's right third; the clause rail has actual status and actions. The remaining white tail below the rail is acceptable asymmetry. Filling it with decoration would reduce quality. Sticky behavior was not observed.

Mobile's opening is edited rather than mechanically stacked. The desktop lede disappears, section jumps appear, and the real fill is visible around y=584 in the first viewport. That is a meaningful success. The lower page is less resolved: agreement status follows all six clauses, and the new annexes extend the page to 5702px without joining the section navigation. Create remains a 1668px document whose first review action starts around y=1434, well beyond the first screen.

**Page-area test:** masthead = identity and route switch; opening = agreement identity and current inventory; figure = cumulative ceiling versus fills; clauses = terms and evidence; rail = status and actions; Annex A = simulated checks; Annex B = verification instructions; Annex C = proposed economics; create form = editable terms; create rail = signing recap. Each has a recognizable job. Annex B's table fails to expose its most important distinction.

**Trunk test:** agreement **PARTIAL, 4/6**; create **PARTIAL, 4/6**. Site, page, main sections and options are identifiable. Position is inferred, not actively selected. Search is absent and unnecessary for this two-route scope. Dialog orientation cannot be scored from the supplied screens.

The rendered system matches the binding direction: Newsreader display and clause headings, Manrope prose, DM Mono financial figures; bone `#FAF8F3`, ink body, navy actions/fills, restrained amber allowance/lock marks; hairline rules, numbered clauses, 2px controls and no shadows. This is authored document design, not a generic SaaS kit. The release-staircase signature is compromised by the false hypothetical plateau, not by a lack of decorative character.

Main prose is 16px ink in source and visibly readable. Slate is secondary. The 13px financial tables are the exception. `DESIGN.md` still records a 15px body step while CSS uses 16px; reconcile the specification to the more readable result. Both routes share masthead, buttons, recap geometry and clause rhythm. Exact timestamps on create become date-only terms on the agreement, a consequential inconsistency.

## Findings

High = consequential trust/state defect. Medium = material interpretation or completion friction. Polish = refinement without grade deduction. Each finding is charged once, to its primary category. Screenshot keys locate the relevant surface; source-only failure cases were not reproduced live.

| ID | Severity / category | Where | What, consequence and specific correction |
|---|---|---|---|
| R8-01 | **High / Responsive Design** | DF and MF, Annex B claim table; `src/App.tsx:180-186`, `src/style.css:89`, shared table cells | **The provenance column is invisible in the captured resting state on desktop and mobile.** Only “Claim” and truncated claim text are visible; “Real or simulated” and its badges are off to the right. The long claim rows produce an overflowing table, with no visible invitation to scroll. Local `.rv td` wrapping competes with the table's `whitespace-nowrap` utility; computed precedence was not measured. Put the evidence status next to or beneath each claim, or make both columns fit with genuine wrapping. A proof table must expose its qualifications without a sideways discovery task. |
| R8-02 | **Medium / Visual Hierarchy & Composition** | D/M, Figure 1 dashed top line; `src/App.tsx:33-35,47` | **The conditional schedule still lies about its shape.** At 0.5 HYPE/day, six days of sufficient deposits permit 3 HYPE, not the displayed 0.8-HYPE plateau. `y()` saturates at the plot maximum, so an off-scale staircase becomes a horizontal ceiling. “Needs more deposits” explains the condition, not the saturation. Omit the quantitative counterfactual or mark an off-scale continuation explicitly. This remains R7-02. |
| R8-03 | **Medium / Visual Hierarchy & Composition** | D/M, actual series and four-key legend | **The visual comparison collapses three marks onto 0.5 HYPE.** Deposited guide, deposit-capped ceiling and cumulative fill share the same height. The short navy segment and fill dot carry nearly all the real information; the legend promises more separation than exists. Remove the redundant deposited guide when it equals the ceiling, and directly identify the coincident ceiling/fill state. Do not add more legend prose. This remains R7-03. |
| R8-04 | **High / Interaction States** | D/M figure and DF/MF clause 1, when first history read fails; `src/App.tsx:36-42,53,68-71,102` | **Unknown history still becomes a numeric historical graphic.** The opening correctly says “at least” and “unknown”, but the empty fill array produces a zero-sold SVG description, zero elapsed-row fills, and a deposit total derived only from present balance/pending. Clause 1 states that total without the lower-bound qualifier. “May be stale” is inaccurate when history has never loaded successfully. Propagate unavailable history through the chart, table and deposit statement. **Source-only failure case; successful captures do not prove recovery.** This remains R7-01. |
| R8-05 | **Medium / Spacing & Layout** | CM, form and signing recap; C for comparison | **Five inputs still require almost two mobile screens before the review action.** CM remains exactly 1668px tall, as in R7. The recap starts near y=1022; Review and sign near y=1434. Large repeated clause spacing, prominent two-line mono timestamps and the orphan half-width Cancelable row make a short form read like two documents. Tighten clause spacing and recap date/time hierarchy while retaining a visible review before signing. Desktop's side-by-side composition already works. |
| R8-06 | **Medium / Typography** | DF/MF sale record, price table and Annex B table; `src/style.css:51` | **Financial evidence is typeset as metadata.** Execution amount, price and time all inherit 13px table text. Those are the facts users came to verify. The mobile sale record is a small compressed block despite usable width. Promote principal amounts/time toward the prose scale; leave hashes, source labels and secondary qualifiers smaller. The new proof table repeats the same mistake. This remains R7-05. |
| R8-07 | **Medium / Content & Microcopy** | DF/MF Term and Ends versus C/CM recap; `src/App.tsx:12,121,141,153,223` | **The signed document discards the exact withdrawal instant.** Create shows time and timezone; agreement shows only `Nov 9, 2026`. A moving countdown is not a durable contractual timestamp. Preserve date, time and zone in the signed term, status and deposit confirmation. This remains R7-06. |
| R8-08 | **Medium / Content & Microcopy** | DF/MF Sale price status; `src/App.tsx:112` | **“Selling permitted” contradicts the exhausted inventory on a scan.** It means the price condition passes, while the opening says nothing is available. Rename this row “Price check” and scope the result to that condition. The new minimum-order warning does not resolve the contradiction. This remains R7-07. |
| R8-09 | **High / Content & Microcopy** | DF/MF Annex B verification claims and Annex C promise; `src/App.tsx:175-193` | **The annexes blur the scope of what their evidence establishes.** Annex B is rendered for every address, yet says the real reverted-call links are beside each check; those links exist only for the demo. Its wallet-flow links always point to a separate fixed test agreement, not necessarily the agreement being viewed. Annex C's “promise not to dump” exceeds an agreement controlling only deposited supply. Scope historical evidence explicitly to the demo/test fixture and the promise to deposited HYPE under its stated cap/floor. Also distinguish “no PLEDGE fee” from “pay nothing”: a keeper's wallet transaction still has gas. These are narrower, defensible statements. The screenshots locate the claims; universal-route behavior and transaction cost exposure are source-supported, not live-tested. |
| R8-10 | **Medium / Interaction States** | C/CM daily-cap field, quote-unavailable state; `src/App.tsx:201-214` | **The new minimum-order guard silently vanishes when its price fetch fails.** `mid` stays zero after an empty catch, `minCap` becomes zero, and a positive cap can pass validation without any indication that executability was not checked. A midpoint estimate also cannot guarantee the contract's oracle-derived limit at signing or later. Distinguish quote loading/unavailable from a checked estimate; make the guard's scope and recheck/retry path explicit. The normal inline error gives a useful reason and threshold, but its loading, failure and blocked-signing appearances are absent from these captures. **Source-only risk.** |
| R8-11 | **Medium / Responsive Design** | M figure under multiple or late fills; `src/App.tsx:49` | **Fill labels still have no collision or edge treatment.** Each is drawn at fill-x plus 12 with a fixed baseline offset. Nearby fills can overlap; right-edge fills can send their labels outside the plot. The one-fill demo conceals this. Use concise marks with the existing record/table for details, or place labels according to available space. **Source-only risk; no crowded/late-fill capture supplied.** This remains R7-08. |

Polish observations: the mobile “Values by day” disclosure lacks an obvious chevron; the create recap's last half-width rule feels unfinished; links have no explicit visited distinction; disabled controls use `cursor:default`; Annex B/C are absent from both the mobile jumps and clause index. The last point matters more now that mobile has grown from R7's 3796px to 5702px, an increase of 1906px, about 50%. Add direct annex access and a return to terms rather than another decorative panel.

## Original owner complaints a-d

| Complaint | Fixed? | Evidence and qualification |
|---|---|---|
| a. Disabled button dominated | **Yes, in the captured exhausted agreement** | V2's large grey exhaustion action is replaced by availability text, timeline explanation and outline deposit actions. The navy create button has a real purpose. Invalid/busy states remain unobserved. |
| b. Right side empty | **Yes** | D has the explanatory lede and day table; DF has a populated status/action rail. C has a signing recap. White space beneath a shorter rail is intentional document asymmetry, not the previous unused-column problem. |
| c. Chart small | **Yes** | Figure 1 is a major full-width section on desktop; M shows its real fill in the opening viewport. The remaining defects concern meaning, not dimensions. |
| d. Body too light grey | **Yes** | Main prose is ink, including the new annexes. Slate is secondary metadata. Small proof values remain a size/hierarchy problem. |

## R7 closure check

| R7 finding | R8 status |
|---|---|
| R7-01: unknown history becomes chart zeros | **Open.** Opening qualifies it; figure/table/clause still do not. R8-04. |
| R7-02: saturated hypothetical plateau | **Open.** Same top-of-plot plateau. R8-02. |
| R7-03: coincident marks | **Open.** Same guide/ceiling/fill overlap. R8-03. |
| R7-04: elongated mobile create | **Open.** Same 1668px height and late review action. R8-05. |
| R7-05: small financial evidence | **Open, expanded into Annex B.** R8-06. |
| R7-06: signed end time missing | **Open.** Date-only formatter remains. R8-07. |
| R7-07: “Selling permitted” | **Open.** Minimum-order warning is separate. R8-08. |
| R7-08: multi/late-fill labels | **Open in source.** Not exercised by one-fill captures. R8-11. |
| P01: visited links and disabled cursor | **Open in source, polish.** No rendered-state verification. |
| P02: recap orphan and table disclosure | **Open in capture, polish.** |

R8 adds commercial and proof material; it does not materially repair the outstanding R7 design defects. The good B/A identity is preserved, but the report should not imply an improvement merely because the page is longer.

## Annex clarity and honesty

**Annex B has the right intention and the wrong proof hierarchy.** Bold lead statements make the verification sequence scannable. Contract, failed-call and wallet-flow links are more useful than unsupported assertions. However, “verify it on-chain in 60 seconds” requires scrolling back to clause 4, opening explorers and running a terminal command; no timed completion evidence was available. Present a compact claim/evidence/result sequence with direct access to checks. The curl block wraps with `break-all`, which fits the narrow column but makes a command hard to inspect. A copy action or direct read-only fill view would make verification less brittle.

The source explicitly distinguishes real testnet activity, fork simulation and absent deployment/fee capabilities. That is honest information. In the screenshot the status column is hidden, so the honest qualification does not reach the reader. The separate wallet example has a 22.538 fill while the visible demo has 22.512; those need an unmistakable “separate wallet test” label, not an implied second account of the same execution. Links and prose are evidence pointers, not independent verification that transactions completed or a browser click-through occurred. I did not certify those claims.

**Annex C is legible and more transparent than a generic revenue pitch.** It names a payer, gives a specific proposed fee and says that fee is not in the testnet contract. “Illustration only” correctly qualifies the market-share arithmetic. The calculation is sound: 18.77 billion x 1% x 0.25% = 469,250, reasonably rounded to about 470 thousand. That is hypothetical gross fee revenue, not proven demand or an annual forecast. Dollar unlock values are not automatically compatible HYPE sales through this implementation.

The [Streamflow pricing page](https://streamflow.finance/blog/how-much-does-streamflow-cost) supports the quoted vesting rates and states token locks also have a 0.16 SOL creation fee, omitted from the lock comparison here. Its percentage fee is based on tokens allocated, whereas PLEDGE proposes charging filled proceeds. The [Sablier fee documentation](https://docs.sablier.com/concepts/fees) supports a 0.99-dollar interface withdrawal fee for applicable contract versions, separate from gas. These are useful pricing references, not like-for-like proof that PLEDGE is cheaper.

The linked Tokenomist report was inaccessible through the web tool. The three market totals remain **unverified in this audit**, not false. No customer willingness-to-pay evidence is supplied. “Who pays” describes the intended buyer, not an observed customer. The existing scope qualifies the proposed fee well; qualify the supply promise and cost language equally carefully.

## Interaction, consistency and hard-rule checks

Labels expose deposit, simulation and signing actions clearly. Source separates read-only simulation from wallet operations and review from final deployment. I did not click these flows, so I cannot claim response feel, successful feedback, validation placement under failure, keyboard focus, dialog usability or transaction completion. No goodwill score or observed word-count statistic is invented.

No visual hard-rejection pattern appears: no generic feature grid, card mosaic, decorative blob, rainbow text, floating pill, ghost number or placeholder avatar. Litmus checks: product unmistakable **yes**; strong visual anchor **yes**; structure understandable by headlines **yes**, with financial-state qualifications requiring prose; one job per section **yes**; decorative cards necessary **no**, and absent; motion improves hierarchy **unobserved**, static restraint appropriate here; premium without shadows **yes**.

Source declares focused controls, 44px mobile action sizing, specific 150ms color transitions and reduced-motion suppression. These are declarations, not computed accessibility certification. Color roles are coherent in captures. Font preconnect and swap exist. RPC batching/retries are configured in `src/chain.ts:8`, but no before/after latency, batching behavior, LCP, CLS, font-flash or runtime-error measurements were available. Give batching no visual-quality credit until measured.

## Ten-category grades

Applied the skill's mechanical deductions: start at A; High costs one letter step; Medium costs half a step; Polish costs none. Use A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter; weighted calculation retains their fractional deductions. Overall rounds to the nearest grade. Unobserved runtime categories are provisional, not passed.

| Category | Weight | Grade | Deduction and basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 1.0: R8-02/03. Strong opening; unreliable comparative chart. |
| Typography | 15% | B | 0.5: R8-06. Distinctive type roles; core evidence too small. |
| Color & Contrast | 10% | A | 0. Captured prose/palette repaired; live computed contrast unmeasured. |
| Spacing & Layout | 15% | B | 0.5: R8-05. Desktop composed; mobile form still excessive. |
| Interaction States | 10% | C | 1.5: R8-04/10. Unknown history and unavailable minimum-order quote mishandled in source. |
| Responsive Design | 10% | C | 1.5: R8-01/11. Hidden annex provenance; unresolved general fill-label placement. |
| Motion & Animation | 5% | A, provisional | 0 confirmed deductions. Document restraint appropriate; behavior unobserved. |
| Content & Microcopy | 10% | C | 2.0: R8-07/08/09. Lost time precision, conflicting state wording and evidence-scope overclaims. |
| AI Slop Detection | 5% | A | 0. Recognizable document identity without template furniture. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. No runtime performance evidence; batching is not a measured result. |

Weighted deduction = **0.80 grade steps**, overall **B**. R7 was 0.55 steps, also B. The coarse grade conceals a regression in proof presentation and added honesty concerns. AI Slop remains **A**: the design is specific, but specificity cannot compensate for ambiguous financial information.

## Quick wins, recommendations only

1. Make Annex B status visible beside every claim at both widths. Remove forced cell non-wrapping and verify the actual rendered column widths. This is the highest-priority small repair.
2. Replace “Selling permitted” with a result explicitly scoped to the price condition.
3. Reuse exact date/time/zone formatting in the agreement and deposit confirmation.
4. Label the separate wallet test and demo-only reverted evidence; narrow “not to dump” to deposited supply and “pay nothing” to protocol fees.
5. Remove the saturated hypothetical series and keep an explicit additional-deposit condition until its off-scale continuation is designed honestly.

These are plausible small edits; verification is additional. Unknown-history propagation, quote failure handling and crowded fill labels need deliberate state checks, not a cosmetic pass. No fixes were made.

Blind spot: successful-state screenshots and local source cannot prove deployment parity, failure recovery, tablet/resize behavior, keyboard/dialog flows, transaction receipts, historical proof claims or performance.

## Scores

These eight 0-10 scores assess design dimensions separately from the skill's weighted letter rubric. Their mean is 7.6875, rounded to one decimal. The lower chart/mobile scores reflect interpretation and provenance defects, not a demand for more decoration.

```text
hierarchy=8
layout/space use=7.5
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=5.5
mobile=5.5
AVERAGE=7.7 MIN=5.5
```
