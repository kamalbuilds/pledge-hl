# PLEDGE independent design audit: R13

2026-10-11. Agreement and create routes. Independent report only.

Design Score: B
AI Slop Score: A

**R13 fixes the owner's four complaints and R12's worst regression. It now looks like a deliberate financial document. It still makes one exhausted deposit occupy an oversized analytical stage, repeats its headline state, and sends judges through prose and a terminal to assemble proof. The direction is strong; the information design is not finished.**

## Method and evidence

Applied the requested [gstack design-review method](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, area and trunk tests, inferred system, ten-category checklist, task-path inspection, cross-page consistency, regression review and weighted grading. Both routes are **APP UI**. The binding Term sheet direction overrides landing-page instructions for imagery, gradients and multiple animations. Quietness is appropriate here.

The user's report-only restriction overrides the skill's repair loop, additional artifacts, configuration writes, outside reviewers and commits. Only this report was written. Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, R12's audit, and relevant font/RPC declarations. Source inspection supplements the rendered audit as explicitly requested; it does not establish deployed parity.

| Key | Evidence | Size |
|---|---|---|
| D | [Agreement desktop viewport](r13-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r13-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r13-1440-full.png) | 1440 x 3879 |
| MF | [Agreement mobile full](shots/r13-390-full.png) | 390 x 6501 |
| C | [Create desktop](shots/r13-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r13-create-390.png) | 390 x 1507 |
| V2 | [Owner's 6.5/10 negative reference](../../design-research/negative/v2-termsheet-6.5-1440.png) | Desktop viewport |

Inspected all seven images. V2's actual local location is `design-research/negative/v2-termsheet-6.5-1440.png`, so its relative link above resolves within this workspace.

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) through background Brave with `minibhn deepsurge open`. SSH returned `Operation not permitted`. Web fetch could not access either that URL or [create](https://v3-review.pledge-ccs.pages.dev/#/create). These are review-access failures, not proof that the site is down. No browser was restarted, user tab navigated, new screenshot produced, or wallet action attempted. Interaction, keyboard and performance judgments below are explicitly bounded by this access failure.

## First impression and system

The site communicates **an enforceable agreement with a depleted balance**. I notice that the large serif heading now distinguishes deposited supply from inventory still locked. My first three focal points are the heading, the **0 HYPE / Deposit HYPE** strip, and the navy dot at the beginning of the chart. One word: **sober**.

Desktop has a real composition: title and explanation, figure and table, clauses and operating rail. The right side is useful. The large amount of white space inside Figure 1 is less convincing: almost the entire plot exists to show that nothing else can happen without another deposit. The enlarged chart solves size, not usefulness.

Mobile create finally starts with the draft title and editable fields, then the full recap and signing action. That is the right sequence. Mobile agreement remains a long read: 6501px, about 7.7 supplied viewport heights. Navigation jumps help, but the useful status rail is still below the initial chart and its legend.

**Area test:** masthead = identity and route switch; agreement opening = identity, inventory and next action; figure = cumulative ceiling versus fills; rail = current status and actions; clauses = binding terms; Annex A = simulated checks; Annex B = verification procedure; Annex C = proposed economics; create fields = drafting; create recap = consent. All areas have identifiable jobs. The opening performs its inventory explanation repeatedly.

**Trunk test:** agreement PARTIAL, 4/6; create PARTIAL, 4/6. Site, page, major sections and options are clear across the full captures. Current-section feedback and search are absent. Search is unnecessary at this scope and attracts no deduction. Scroll-only navigation does not preserve or announce current location.

**Inferred system:** Newsreader display/section titles, Manrope body/UI, DM Mono quantities and addresses; bone `#FAF8F3`, ink `#1A1D21`, slate `#5B6470`, navy `#1F3A5F`, amber allowance/lock state; fine rules, 2px controls, no decorative shadows. Main body is 16px/1.6, desktop h1 44px, mobile h1 26px. Three font roles are justified by the document, not gratuitous styling. These rendered proportions match the source declarations, but loaded-font identity was not measured live.

Source-token contrast against bone is approximately ink 15.9:1, slate 5.6:1, navy 10.8:1, amber stroke 3.4:1 and darker amber text 5.6:1. Body colour is fixed. Readability problems now concern small type and information density rather than light grey prose. Amber stays within lock/allowance semantics.

## Findings

High = substantial task or trust harm; Medium = meaningful comprehension or completion friction; Polish = refinement. Nine Medium findings, no confirmed High finding. Each deduction is charged once to its primary category. Suggestions are report-only.

| ID | Severity / category | Where | What, consequence and specific recommendation |
|---|---|---|---|
| R13-01 | **Medium / Spacing & Layout** | D, Figure 1 around y=458-757; M around y=507-711; DF/MF | **An exhausted deposit gets three days of nearly empty plot.** Only one fill and one plateau exist. Two future table rows repeat the same ceiling and omit filled values. Large scale makes this state look analytically richer than it is and postpones clauses/status. Use a shorter exhausted-state time window or a shallower plot while retaining the genuine cumulative ceiling. Do not invent steps or future fills. R12-02 survives in a reduced three-day form. |
| R13-02 | **Medium / Content & Microcopy** | D/M, figure title, axes, table and legend; `src/App.tsx:31-48` | **The chart's quantities are not explicitly identified as cumulative.** “Ceiling” and “Filled” can be read as daily values beside rows labelled Day. The table actually sums fills up to each day and repeats the deposit-capped total. The diagram also gives no calendar date for “start.” The current one-fill fixture conceals this ambiguity. Name the columns “Cumulative ceiling” and “Cumulative filled,” give the start date once, and distinguish future rows with text rather than blank cells alone. The 0.63 top tick is rounding of 0.625, not a meaningful contract threshold. |
| R13-03 | **Medium / Typography** | DF/MF, clause 3 table headers, clause 4 explanations and Annex B command; C/CM, minimum-order note; `src/style.css:15,49,87` | **Operational explanations are typeset like expendable metadata.** Main prose is 16px, but input constraints, minimum-order caveats, rejection evidence and the verification command use 13px. A judge or signer must read these to understand whether the mechanism works. Promote explanatory prose to body size; keep timestamps, source captions and hashes compact. Do not globally enlarge every label. This is a size failure, not a contrast failure. |
| R13-04 | **Medium / Responsive Design** | CM, draft heading and fields; compare C's explicit permanence paragraph; `src/style.css:93` | **The mobile form hides the plain-language warning that signed terms cannot be loosened.** Desktop says this immediately below the title. Mobile omits that paragraph and only reaches the no-cancellation recap much later. The confirmation dialog retains an explicit warning in source, so this is not a claim of unconsented signing. Keep one short permanence sentence near the mobile title rather than hiding the entire lede. |
| R13-05 | **Medium / Content & Microcopy** | DF/MF, Annex B, first and third evidence steps; `src/App.tsx:176-179` | **The proof procedure still makes the judge locate and interpret evidence.** `contracts/src/Pledge.sol` is an unlinked repository path. The explorer address appears twice without a direct verified-source link. Clause 6 is linked, but the independent check is a wrapped terminal command plus knowledge of side “A.” Link the exact repository file and the relevant explorer source/read surface if available. Put the current agreement's direct fill evidence before the optional command. Retain the command as a reproducibility fallback. Removing “60 seconds” repairs honesty, not usability. |
| R13-06 | **Medium / Content & Microcopy** | DF/MF, Annex C fee paragraph and market block; `src/App.tsx:186-188` | **The comparison implies more pricing completeness than it provides.** Streamflow's quoted vesting fee is its free-plan/SDK case, while subscriptions change that treatment. Sablier's withdrawal charge has release-specific scope. The same paragraph switches from “proposed” to “A team only pays,” which can sound like implemented billing. Label the competitor figures as scoped examples and use conditional language for PLEDGE's proposed fee. The huge unlock totals are honest illustration, but dominate a section that contains no demonstrated purchase decision. Shorten the illustration; lead with payer and charge basis. |
| R13-07 | **Medium / Interaction States** | MF, inline transaction/source links in clauses and annexes; DF's small clause index; `src/style.css:92` | **Evidence links remain small targets even though standalone controls were enlarged.** The mobile 44px rule covers buttons and named navigation classes, not inline hash/source links. In the capture these remain single small lines among dense text. Missed taps are likely precisely where a judge needs evidence. Give key proof destinations their own comfortably spaced link rows. Live hit-box measurements were unavailable; this finding is supported by rendered link density and the source selectors, not a completed touch test. |
| R13-08 | **Medium / Interaction States** | M, Terms/Sales/Status/For judges/Business; DF, clause index; `src/App.tsx:96,163,177-178` | **Section navigation scrolls without managing focus or retaining location.** Source handlers call `scrollIntoView()` and prevent the anchor default; mobile jumps are buttons. A keyboard or assistive-technology user can remain focused at the old navigation while the viewport moves, and the URL cannot restore the section. Retain route-safe section state and move focus to the destination heading. Do not simply assign `#c4`, because this app already uses the hash for routing. **Source-confirmed risk at the screenshot-visible controls; actual keyboard behavior was not exercised.** |
| R13-09 | **Medium / Visual Hierarchy & Composition** | D/M opening; DF/MF status and clause 1 | **The exhausted state is explained repeatedly before useful detail.** The h1 says 0.5 deposited/0 locked; the strip repeats zero available; the next paragraph repeats locked/sold/nothing left; the chart annotation repeats all sold; clause 1 repeats the accounting again. The h1 repair is correct, but lower-level duplication now dilutes it. Keep the h1, action strip and proceeds fact; remove the redundant inventory sentence. Preserve full accounting in clause 1. On desktop this also removes the stranded final “more.” line. |

Polish, no deductions: “all 0.5 HYPE deposited is sold” is awkward; “All deposited HYPE sold” is cleaner. Figure 1's “now” guide passes through the mobile annotation, reducing clarity. Visited links have no distinct styling. The create date value breaks across two lines with a long timezone string. Desktop sale hashes are plain text while mobile hashes are links, an inconsistent proof affordance. `.attrs dd` and form-padding overrides contain conflicting older declarations and `!important`; that is maintenance debt, not evidence that the rendered result is broken.

## Owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes, captured agreement** | V2's large grey allowance slab is gone. Inventory exhaustion is text; Deposit HYPE is an outline action. No disabled primary dominates D or M. Create's enabled signing action is appropriate. Pending/busy states were not observed live. |
| b. Right side empty | **Yes, desktop** | D/DF have the supporting explanation, day table and populated status/timeline rail. C has a useful consent recap. Space below a shorter rail is legitimate document whitespace, not automatically a defect. |
| c. Chart small | **Yes** | Figure 1 is a major full-width section with a large plot and adjacent table; mobile is legible at native viewport scale. R13-01 is the opposite problem: excessive footprint for this dataset. |
| d. Body too light grey | **Yes** | Main narrative and terms use ink. Slate supports metadata and retains sufficient token contrast. R13-03 concerns operational text size, not recurrence of the grey-body failure. |

These closures do not award credit for alternate loaded, pending, multi-day or wallet states absent from the supplied captures.

## R12 closure check

| Prior finding | R13 status |
|---|---|
| R12-01: mobile consent before editing | **Fixed in CM.** Draft title and fields precede recap; signing follows it around y=1273. Source scopes rail-first ordering to `.cols:not(.create)`. No repeated keyboard test was possible. |
| R12-02: oversized exhausted-deposit chart | **Partly fixed.** Window now shows three days rather than six; plateau still consumes most of the analytical space. R13-01. |
| R12-03: heading implies present inventory | **Fixed in D/M.** “0.5 HYPE deposited, 0 still locked” is explicit and accurate for this fixture. |
| R12-04: 60-second promise and universal sale lead | **Fixed in visible copy.** Annex B now says “how to verify it on-chain”; its fill lead is agreement-specific and explains the empty-list case. This does not establish that the linked evidence is correct. |
| R12-05: fragmented evidence procedure | **Partly fixed.** The absent-capability badge is removed; real/fork provenance remains clear. Exact source link is still missing; judge still assembles the procedure. R13-05. |
| R12-06: deposit increase reported as full entered amount | **Source wording substantially fixed.** The full locked-amount claim now requires a matching balance increase; a differing increase reports sent amount and observed delta separately. Timeout remains cautious. Concurrent equal-sized deposits and concurrent sales still prevent reliable attribution. No actual transfer was reproduced. |
| R12-07: no clipboard failure state | **Source fixed.** Both rejection and absent Clipboard API set a failed state with manual-copy guidance. Screenshot shows the control, not the failed/success states; live closure remains unverified. |

## Annex clarity and honesty

**Annex B:** Its title is now appropriately modest. Bold leads divide contract existence, rejection checks, fills and a separate wallet run. The distinction between this agreement and the separate tested agreement is explicit. Real-testnet badges and fork-simulated scope remain visible. The footer explicitly says HyperCore was mocked in the forge fork. This is materially better than blending those results into a claim of live multi-day execution.

The paragraph about rejected calls explains term expiry and network failure. Good. It still asks a judge to trust the attached labels until they follow several links, run simulations and inspect JSON. The command is independently useful, but not a substitute for direct proof destinations. A deployed bytecode page alone does not establish correspondence with the unlinked repository source. The linked historical wallet transactions and claimed fill were not independently opened successfully in this audit; they remain claims with pointers, not newly verified results.

**Annex C:** Payer and fee basis are concrete. The proposed fee is explicitly absent from the testnet contract. Gas is distinguished from protocol fees. The market paragraph explicitly refuses to treat global unlock volume as Hyperliquid demand or willingness to pay. That qualification is honest and should survive any shortening.

The illustrative arithmetic is correct: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand. It proves multiplication, not revenue potential. Tokenomist's linked page could not be fetched, so the underlying market totals were not independently confirmed.

Checked the two accessible first-party pricing sources. [Streamflow's published breakdown](https://streamflow.finance/blog/how-much-does-streamflow-cost) supports the quoted base fees but distinguishes free-plan/SDK vesting from subscription treatment. [Sablier's fee documentation](https://docs.sablier.com/concepts/fees) supports the withdrawal price and limits it to Lockup v2.0+ and Flow v1.1+. Those scopes are missing from the annex. Comparing fees on allocated tokens with fees on realised sale proceeds is useful as a basis comparison; it does not show which service is cheaper for a particular team.

## Ten-category grading

Skill rubric: start at A; High deducts one letter step, Medium half a step, Polish zero. A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter while retaining fractions for weighting. Overall rounds weighted deduction to the nearest letter step, matching R12's stated convention. Provisional A means no confirmed deduction, not a runtime pass.

| Category | Weight | Grade | Deduction and basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 0.5: R13-09. State is accurate but repeated across competing summaries. |
| Typography | 15% | B | 0.5: R13-03. Strong font roles; operational prose remains 13px. |
| Color & Contrast | 10% | A | 0. Coherent semantic palette and adequate source-token contrast. |
| Spacing & Layout | 15% | B | 0.5: R13-01. Useful desktop rail; plot footprint exceeds exhausted-state information. |
| Interaction States | 10% | B | 1.0: R13-07/08. Small evidence targets and scroll-only focus/location handling. Copy recovery improved. |
| Responsive Design | 10% | B | 0.5: R13-04. Correct create sequence; mobile hides early permanence explanation. Tablet/other widths unobserved. |
| Motion & Animation | 5% | A, provisional | 0. Source specifies restrained colour transitions and reduced-motion handling; live motion unobserved. No deduction for lack of decorative animation. |
| Content & Microcopy | 10% | C | 1.5: R13-02/05/06. Cumulative semantics, fragmented proof and under-scoped economics comparison. |
| AI Slop Detection | 5% | A | 0. No generic feature grid, gradient typography, floating tags, decorative icon circles, bubbly cards or funnel rhythm. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. RPC batching/retries and font preconnect/swap exist. No measured LCP, CLS, response latency or font flash. |

Weighted deduction = **0.525 letter steps**, therefore **B**. R12 also computed 0.525: that numerical tie does not mean no progress. R13 resolves serious old findings while this review identifies residual typography, navigation and chart-semantic friction. Do not treat two differently scoped audits as a controlled quantitative experiment.

**AI Slop verdict: A. The numbered financial instrument, serif/mono roles, hairline rules and meaningful rail make the product recognisable. Its problems are repeated information and proof friction. Changing the visual direction would discard its best work.**

Litmus checks: product unmistakable **YES**; strong visual anchor **YES**; understandable from headlines **YES, with cumulative chart semantics needing body explanation**; each section one job **YES**; cards necessary **NO, decorative cards correctly absent**; motion improves hierarchy **UNOBSERVED**; credible without shadows **YES**. No applicable SaaS-grid, decorative-image or stacked-card hard rejection. The first screen offers a clear action.

No invented interaction narration, word-count percentage or goodwill meter: screenshots do not record a completed user journey.

## Quick wins, report only

1. Remove the redundant inventory sentence under the h1; retain sale proceeds and next action.
2. Name chart/table values as cumulative and add the start date.
3. Link the exact contract source and make key evidence links separately tappable.
4. Restore a one-sentence permanence warning above mobile create fields.
5. Qualify competitor price examples and keep proposed-fee sentences conditional.

Zero fixes applied. No product files changed. No build/test suite was needed for a prose-only audit; the report structure and score arithmetic were checked.

Blind spot: supplied captures and local source cannot establish deployment parity, linked on-chain proof, clipboard/dialog/keyboard behavior, wallet completion, multi-day chart correctness, tablet layout or runtime performance.

## Scores

Independent 0-10 assessment across both routes, separate from the letter rubric. Eight scores sum to 66.5; mean 8.3125, rounded to one decimal. Chart clarity and mobile remain the weakest dimensions.

```text
hierarchy=8.5
layout/space use=8
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7.5
mobile=7.5
AVERAGE=8.3 MIN=7.5
```
