# PLEDGE independent design audit: R13

2026-10-11. Agreement and create routes. Report only.

Design Score: B
AI Slop Score: A

**R13 fixes the owner's four complaints and R12's mobile consent-order regression. It looks like a financial document with an actual design direction. It still devotes too much space to repeating an exhausted state, makes verification harder than the claims suggest, and has recovery gaps behind the polished surface. Keep the direction. Improve the information and task design.**

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, area test, trunk test, system extraction, ten-category audit, flow inspection, cross-page consistency and regression review. Both routes are **APP UI**. The binding Term sheet direction overrides landing-page demands for decorative imagery and animation.

The user's report-only instruction overrides the skill's fix loop, configuration writes, extra reports, outside review processes and commits. No source, screenshot, configuration or other report was changed. Existing modified captures/log were preserved.

Inspected all six R13 captures, `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, and `docs/design/design-audit-r12.md`. Also read the RPC transport and font declarations to assess the batching/performance claims. The V2 negative reference was found at `design-research/negative/v2-termsheet-6.5-1440.png` inside this workspace and inspected.

| Evidence | File | Dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r13-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r13-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r13-1440-full.png) | 1440 x 3879 |
| MF | [Agreement mobile full](shots/r13-390-full.png) | 390 x 6501 |
| C | [Create desktop](shots/r13-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r13-create-390.png) | 390 x 1507 |

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) with background Brave via `minibhn deepsurge open`; SSH returned `Operation not permitted`. Web fetch could access neither agreement nor [create](https://v3-review.pledge-ccs.pages.dev/#/create). These failures establish this review's access limit, not a deployment outage. No browser tab was opened successfully or user tab navigated. No new captures were taken.

Rendered findings use the supplied captures. Source findings are labelled and do not establish deployment parity. No live click, wallet operation, keyboard traversal, tablet check, load measurement or chain-proof reproduction was completed. The skill's live goodwill score and computed-style usage counts are therefore unavailable; inventing them would weaken this audit.

## First impression and system

The site communicates **a signed financial instrument**. I notice the large serif agreement title, the small inventory/action strip, and a very large chart containing one historical fill. My first three focal points are **the title**, **0 HYPE and Deposit HYPE**, and **the navy fill dot**. One word: **sober**.

The header is now honest at a glance: deposited supply is labelled historical and current inventory is zero. The right-hand lede, chart table and status rail make the desktop width useful. Create has the same paper, rules and numbered structure. Its mobile version now starts with the draft and editable fields, then asks for consent. That is a real repair, not a cosmetic one.

The agreement is still over-explained. The headline, inventory strip, figure annotation, status timeline and first clause all restate essentially the same exhausted-deposit fact. The mobile full page is 6501px, approximately 7.7 supplied viewport heights. Much of that length is evidence and terms, but repetition adds work without adding assurance.

**Area test:** masthead = identity/route switch; opening = agreement/current inventory; Figure 1 = cumulative ceiling/fills; status rail = current operating terms/actions; clauses = binding rules; Annex A = simulated checks; Annex B = evidence procedure; Annex C = economics; create fields = editable terms; create recap = consent. All areas have identifiable purposes. The business pitch serves a different reader from the agreement's operating controls and deserves less visual priority.

**Trunk test:** agreement and create are **PARTIAL, 4/6**. Identity, page purpose, major sections and options are clear. There is no section-selected indicator or search. Search is unnecessary for this scope. Scroll jumps do not preserve section location in the URL (`src/App.tsx:98`, `:161`), so they are orientation aids rather than durable navigation.

**Extracted system:** Newsreader headings, Manrope prose/UI, DM Mono quantities and hashes; bone `#FAF8F3`, ink `#1A1D21`, navy `#1F3A5F`, restrained amber; fine rules, 2px controls, no decorative shadows. Source scale is 13/16/18/26/44px. Numbered clauses, the document/rail composition and full-width figure follow the reference DNA without copying another product's skin. Quantities in the main headline remain serif, a minor exception to the binding mono-for-numbers rule.

Opaque source-token contrast against bone: ink **15.94:1**, slate **5.65:1**, navy **10.82:1**, amber stroke **3.43:1**, darker amber text **5.57:1**. These calculations do not measure browser rendering. Amber is appropriately reserved for lock/allowance information, not general decoration. Contrast is good; consequential helper text is still small.

## Findings

Medium = meaningful comprehension, trust or completion friction. Polish = refinement. No Critical or High defect is established by the available rendered evidence. Each scored issue is charged once to its primary category; source risks are not described as reproduced failures.

| ID | Severity / category | Where | What, consequence and report-only recommendation |
|---|---|---|---|
| R13-01 | **Medium / Visual Hierarchy & Composition** | D/M opening; DF/MF status and clause 1; `src/App.tsx:93-95`, `:107`, `:143-155` | **Exhaustion is repeated instead of progressively explained.** The title now distinguishes deposited and locked amounts correctly, but the strip repeats zero locked, and the plot and rail repeat everything sold/nothing left. In M, this consumes precious first-screen space. Keep the heading distinction; let the adjacent strip state proceeds and the next useful action rather than repeat the heading. Each later section should add evidence or a term. |
| R13-02 | **Medium / Spacing & Layout** | D/M Figure 1; `src/App.tsx:31-48`, `src/style.css:33` | **The big chart is still mostly empty plotting space.** Shortening six days to three helps, but there is one fill and a deposit-capped plateau across all three days. The three-row table repeats the same ceiling twice with empty future-fill cells. A signature chart should explain the mechanism, not merely occupy enough pixels to close the old complaint. Make this exhausted state more compact or explain the deposit cap directly; reserve a substantial staircase for a state with meaningful steps. Do not fabricate steps. |
| R13-03 | **Medium / Typography** | C/CM maximum-sale helper; DF/MF evidence/code; `src/style.css:15`, `:83`, `:89`; `src/App.tsx:208` | **Decision-critical prose is treated as metadata.** The minimum-order caveat is a three-line 13px paragraph on a phone. It explains whether the immutable daily cap can produce executable orders, not optional background. Command text and provenance explanations also demand close reading at 13px. Keep labels compact, but promote consequential warnings and instructions to body size. The ink body is strong; small slate prose is the remaining readability problem. |
| R13-04 | **Medium / Responsive Design** | M/CM opening; `src/style.css:93`, `src/App.tsx:96`, `:206` | **Mobile removes the explanation of the commitment.** Both route ledes are hidden below 480px. M retains the amounts but loses the compact explanation of daily cap, floor and fixed terms; CM loses the direct warning that terms cannot be loosened. Later clauses/recap and the source-defined confirmation dialog retain safeguards, so this is not evidence of uninformed signing. Keep a short mobile version of the commitment sentence instead of deleting it. |
| R13-05 | **Medium / Interaction States** | Clause 4 simulations; `src/App.tsx:77`, `:121-125` | **A failed network check consumes its own retry control.** Once a result exists, the simulation button is replaced by a verdict, including “Could not check (network).” There is no visible rerun control. A judge encountering transient RPC trouble must reload and lose the other results. Retain a retry action for network failures. **Source-only; no network failure was triggered live.** |
| R13-06 | **Medium / Interaction States** | Create quote failure/minimum-order gate; `src/App.tsx:195-196`, `:208`, `:219` | **Minimum-order validation fails open when its quote fails.** `priceReady = mid > 0 || midErr` permits signing after a price-fetch error, with a warning and no minimum-cap check. The warning is honest, but a user can still deploy fixed terms whose daily allowance is too small to execute at the current price. Provide quote retry and distinguish checked from unchecked review states before irreversible deployment. This does not mean a successful quote guarantees future execution; the existing repricing caveat correctly says otherwise. **Source-only.** |
| R13-07 | **Medium / Interaction States** | Deposit confirmation; `src/App.tsx:84` | **Balance matching is still weaker than transfer attribution.** R13 only says the entered amount is locked when the observed increase matches it, and reports the actual change otherwise. That repairs the previous obvious overstatement. A concurrent deposit of the same amount can still satisfy the success predicate, and a concurrent sale can conceal a completed transfer. Attribute completion to the transfer, or restrict success language to the observed balance. **Residual source risk, not a reproduced deposit error.** |
| R13-08 | **Medium / Content & Microcopy** | DF/MF Annex B; `src/App.tsx:176-181` | **The judge must assemble the proof.** The exact contract source is a plain repository path, both explorer links lead to the same address page, and bytecode presence alone does not establish that the linked project source is what was deployed. Current agreement evidence and a separate wallet-test agreement are labelled but interleaved. Link the exact source and deployed-code verification evidence; group current-agreement proof separately from historical workflow proof. The terminal command is a useful alternative, not a substitute for a direct inspection path. No claim is labelled false merely because live verification was inaccessible. |
| R13-09 | **Medium / Content & Microcopy** | DF/MF Annex C; `src/App.tsx:186-188` | **The comparison omits fee scope and the market paragraph overpowers the buyer case.** Streamflow's quoted vesting price depends on plan/interface, and Sablier's quoted withdrawal charge applies to specified newer releases. The annex states both too universally. Its revenue illustration is explicitly hypothetical, but detailed global totals and projected fees receive more space than the reason a team would pay. Qualify the comparisons and subordinate the illustration. Preserve the payer, fee basis and clear proposed-fee label. |

Polish, no deduction: the 0.625 chart ceiling rounds to an awkward `0.63`; M hides the day-1 tick despite displaying days 2 and 3; “all 0.5 HYPE deposited is sold” is stiff; blank future table cells could explicitly mean future; visited links lack distinct styling; disabled controls use `cursor:default`; the short wordmark and inline evidence links lack the mobile target sizing assigned to buttons. Tablet overflow and exact target rectangles were not measured. The summary and fields repeat long dates, but that repetition supports consent and should not be removed indiscriminately.

## Owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes, captured agreement** | V2's broad grey “Today's allowance is used” slab is gone. Exhaustion is text and Deposit HYPE is a restrained outline action. The valid navy create CTA is appropriate. Invalid/loading create states were not captured. |
| b. Right side empty | **Yes, desktop** | The lede, figure value table and populated status rail perform distinct jobs. Create has a useful terms recap. Remaining space below a shorter rail is normal document space, not a reason to add decoration. |
| c. Chart small | **Yes** | Figure 1 occupies a full-width section, with a roughly 780px desktop plot and readable phone plot. Size is solved. State-specific information density remains R13-02. |
| d. Body too light grey | **Yes** | Main prose is 16px ink. Slate metadata has adequate calculated contrast. The separate problem is small consequential helper text, R13-03. |

## R12 closure check

| Previous finding | R13 status |
|---|---|
| R12-01: mobile create consent before editing | **Rendered fixed.** CM shows the draft title around y=145, fields from y=198, recap around y=878 and action around y=1273. CSS scopes rail-first ordering to `.cols:not(.create)`. The action is lower again because the sequence is now correct. |
| R12-02: oversized six-day exhausted plateau | **Partly fixed.** Captures now show three days; source chooses an elapsed-relative window. One dot and a plateau still dominate, R13-02. |
| R12-03: headline quantity reads as current stock | **Rendered fixed.** “0.5 HYPE deposited, 0 still locked” explicitly distinguishes history and inventory. New repetition is R13-01, not the old ambiguity. |
| R12-04: timed verification promise and unconditional sale lead | **Rendered/source fixed in wording.** The title removes the time claim; the lead says to check this agreement's fills and explicitly allows an empty list. Live proof itself was not reproduced. |
| R12-05: fragmented evidence and public delivery-accounting badge | **Partly fixed.** The absent-capability badge is gone, real/fork scope remains explicit, and the fill query is copyable. Exact source linkage and direct proof packaging remain R13-08. The replacement real-testnet refund claim has not been independently checked. |
| R12-06: any increase claims the entire deposit locked | **Substantially source fixed.** Exact matching is required for that message; otherwise actual balance change is reported. Transfer attribution remains R13-07. |
| R12-07: clipboard rejection unhandled | **Source fixed.** Clipboard absence/rejection selects a failure state and instructs manual copying. No live clipboard denial was exercised. |

## Annex clarity and honesty

**Annex B is more honest, but still not an efficient proof surface.** Removing the timing promise and scoping fills to the viewed agreement are substantial improvements. The expiry and RPC explanations avoid pretending every failed simulation proves a contractual restriction. The separate wallet-test agreement is explicitly named. Real testnet results and fork-simulated multi-day/withdrawal checks remain differentiated.

The source-path problem remains. A reader should not need to locate a repository, navigate its tree, then decide whether source and bytecode match. The wallet-flow paragraph links deployment, sale and reconciliation but supplies no direct deposit transaction/reference beside its deposit claim. The refund row now says an earlier IOC was cancelled and refunded without linking that instance there. Those are proof-packaging gaps, not established fabrications. Transaction validity, source correspondence, the deposit and refund were not independently established in this review.

**Annex C is candid about the proposed fee and hypothetical revenue.** It names the token team/foundation as payer and distinguishes sale-proceeds fees from allocation fees. It does not present the global market illustration as traction or local willingness to pay. The arithmetic is correct: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand.

The linked [Streamflow fee breakdown](https://streamflow.finance/blog/how-much-does-streamflow-cost) supports the base vesting/lock charges but describes subscription-dependent vesting treatment. [Sablier's fee documentation](https://docs.sablier.com/concepts/fees) supports the withdrawal charge specifically for Lockup v2.0+ and Flow v1.1+. These qualifications are omitted from Annex C. The linked Tokenomist report could not be fetched, so market totals are unverified here. The proposed fee is visibly distinguished from current contract behavior; no demand validation follows from naming a payer.

## Ten-category grades

Skill rule: start at A; High deducts one letter step, Medium half a step, Polish zero. Use the same convention as R12: A=0, B=1, C=2, D=3, F=4; half-step category labels display the weaker letter while weighting retains fractions. Round the overall weighted deduction to the nearest letter step. Provisional A means no confirmed deduction, not a runtime pass.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 0.5: R13-01. Correct state labelling, excessive repetition. |
| Typography | 15% | B | 0.5: R13-03. Strong type identity, consequential 13px prose. |
| Color & Contrast | 10% | A | 0. Coherent semantic palette; calculated relevant token contrasts pass. |
| Spacing & Layout | 15% | B | 0.5: R13-02. Desktop balance repaired; exhausted figure remains oversized. |
| Interaction States | 10% | C | 1.5: R13-05/06/07. Network retry, unchecked quote consent and residual attribution. |
| Responsive Design | 10% | B | 0.5: R13-04. Correct create ordering, commitment explanation deleted on phones. |
| Motion & Animation | 5% | A, provisional | 0. Source defines restrained 150ms color transitions and reduced-motion suppression. Runtime unobserved. |
| Content & Microcopy | 10% | B | 1.0: R13-08/09. Proof linkage and comparison scope. |
| AI Slop Detection | 5% | A | 0. No generic card funnel, gradient hero, blobs, floating pills, ornamental icons or bubbly surfaces. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. RPC HTTP batching, parallel reads and font preconnect/swap exist. LCP, CLS, rendered batch behavior and latency were not measured. |

Weighted deduction = **0.525 steps**, rounded to **B**. R12 also scored B at 0.525. Equal aggregate does not mean equal defects: R13 fixes the main ordering and wording problems; this audit identifies smaller remaining risks in mobile explanation, helper typography and recovery. The skill's generous A baseline makes the concrete findings more useful than the headline alone.

**AI Slop verdict: A.** A recognisable financial document with deliberate type roles and restrained semantic colour. Its weakness is editorial and operational friction, not a generic template.

Litmus: product unmistakable **YES**; strong visual anchor **YES**; understandable by headlines **YES**, with repetition; one job per section **YES**; cards necessary **NO**, decorative cards absent; motion improves hierarchy **UNVERIFIED**; credible without shadows **YES**. No hard-rejection grid, stacked-card workspace or weak-action hero is established.

## Quick wins, report only

1. Keep one concise statement of current inventory in the opening; make the supporting strip add proceeds/action context.
2. Restore a short fixed-terms sentence on mobile and promote the minimum-order caveat to body text.
3. Retain Retry after simulation network errors; offer quote retry before unchecked review.
4. Link the exact source and proof artifacts beside Annex B's claims.
5. Qualify Annex C's fee comparisons and visually subordinate its hypothetical market illustration.

Nine Medium findings, zero source fixes. None of the recommended changes was implemented.

Blind spot: supplied captures and local source cannot establish deployment parity, live completion/recovery, dialog/keyboard accessibility, multi-day chart behavior, chain-proof validity or runtime performance.

## Scores

Independent 0-10 visual/task assessment across both routes, separate from the weighted letter rubric. Sum 66.5; mean 8.3125, rounded to one decimal. Remaining chart density and page length constrain the minimum.

```text
hierarchy=8
layout/space use=7.5
typography=9
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7.5
mobile=8
AVERAGE=8.3 MIN=7.5
```
