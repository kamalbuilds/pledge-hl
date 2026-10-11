# PLEDGE independent design audit: R14

2026-10-11. Agreement and create routes. Report only.

Design Score: B
AI Slop Score: A

**The four original complaints are fixed. R14 has a convincing document identity, but still spends its best screen space illustrating an exhausted deposit. Its verification annex asks readers to reconstruct the proof, and its operating controls are less careful than its contractual prose. This is a professional visual direction with unfinished task design.**

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, system extraction, ten-category checklist, flow inspection, cross-page consistency, and regression comparison. Both routes are APP UI. The binding Term sheet direction takes precedence over generic demands for illustrations, success animations or decorative empty states.

The explicit report-only instruction overrides the skill's fixes, additional reports, baseline/configuration writes, telemetry and commits. Only this report was written. No source or supplied capture was changed.

Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, and the complete R13 audit. Inspected all six supplied R14 images and the V2 negative reference. The supplied relative V2 path does not exist from this working directory; the actual reference is `design-research/negative/v2-termsheet-6.5-1440.png`. Also inspected `src/chain.ts`, `index.html`, the latest App diff, and the two evidence files newly named in Annex B.

| Evidence | Capture | Dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r14-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r14-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r14-1440-full.png) | 1440 x 4067 |
| MF | [Agreement mobile full](shots/r14-390-full.png) | 390 x 6716 |
| C | [Create desktop](shots/r14-create-1440.png) | 1440 x 1087 |
| CM | [Create mobile](shots/r14-create-390.png) | 390 x 1436 |

Attempted background Brave access with `minibhn deepsurge open`. SSH failed with `Operation not permitted`; no tab was opened successfully. Web fetch also could not access either [agreement](https://v3-review.pledge-ccs.pages.dev/) or [create](https://v3-review.pledge-ccs.pages.dev/#/create). These are review access failures, not proof of an outage. Rendered findings therefore use the supplied live captures; source findings do not establish deployment parity.

No live clicks, wallet transactions, keyboard traversal, tablet rendering, loading/error captures or performance measurements were available. No invented flow narration or goodwill scores. Source inspection establishes possible behavior, not experienced response feel.

## First impression, area test and system

The site communicates **a signed financial instrument**. I notice an unusually large chart supporting a very small amount of information. My eye goes first to **the serif agreement title**, then **0 HYPE beside Deposit HYPE**, then **the fill dot and long amber plateau**. One word: **sober**.

The opening is clear about history versus inventory. That is a meaningful improvement over V2. But by the bottom of the first desktop screen, I have learned that everything was sold several times and still have not reached the numbered terms. The diagram has become the dominant object without becoming the most informative object.

Create is more convincing: numbered, editable terms on the left and a consent recap on the right. The mobile order is sensible: edit, review, sign. It is shorter than R13, but part of that shortening comes from deleting an incorrect check, not from improving layout.

**Area test:** masthead = identity and route switch; opening = agreement/inventory; figure = ceiling versus cumulative fills; rail = current state/actions; numbered clauses = constraints; Annex A = simulated checks; Annex B = verification; Annex C = commercial rationale. No unidentified decorative area. The annexes address a judge, while the main document addresses a token team or holder. Their separation is appropriate, but their long prose adds substantial mobile reading cost.

**Trunk test:** both routes are PARTIAL, 4/6. Identity, purpose, sections and choices are understandable. Section navigation has no current-location indicator; there is no search. Search is unnecessary here and receives no deduction. Scroll jumps do not preserve section position in the URL (`src/App.tsx:96`, `:161`).

**Observed/system-supported design:** Newsreader display and clause titles, Manrope body/UI, DM Mono figures; bone `#FAF8F3`, ink `#1A1D21`, navy `#1F3A5F`, restrained amber; fine rules, 2px controls and no shadows. Numbered clauses and document/rail composition carry across both routes. The serif headline quantities are a minor exception to DESIGN.md's mono-for-every-number rule. The source body scale is 16px, despite DESIGN.md's listed 15px scale step.

Calculated opaque token contrast against bone: ink **15.94:1**, slate **5.65:1**, navy **10.82:1**, amber stroke **3.43:1**, amber text **5.57:1**. These are token calculations, not browser pixel measurements. Slate is adequately contrasting; the remaining reading problem is small consequential text. Amber is used for lock/ceiling information, not decoration.

## Findings

Medium means meaningful comprehension, trust or completion friction. Polish does not affect grades. No High defect is established by the available evidence. Each scored finding belongs to one primary category, avoiding double deductions.

| ID | Severity / category | Where | What and consequence |
|---|---|---|---|
| R14-01 | **Medium / Visual Hierarchy & Composition** | D/M opening, DF/MF rail and clause 1; `src/App.tsx:92-94`, `:103`, `:146-155` | **The exhausted state is repeated rather than developed.** Heading: zero still locked. Strip: zero available, zero locked, nothing left. Chart: all deposited supply sold. Rail: nothing left twice. Clause 1 repeats the quantities. On mobile, this consumes the first screen without explaining the immutable commitment. Keep the honest headline, then make supporting content add proceeds, terms or action context. |
| R14-02 | **Medium / Spacing & Layout** | D/M figure; `src/App.tsx:31-48`, `src/style.css:30-34` | **The enlarged chart has become empty space with axes.** A single 0.5 HYPE fill and one capped plateau occupy roughly 780px of plot width and about 300px of plotting height on desktop. The four-day window adds no new event; two future table rows are empty. At 900px height the numbered agreement is below the fold. On the phone, the legend has not even finished by y=844. Size fixes the old complaint, but allocation remains poor. Use a compact exhausted-state figure or add genuinely informative cap context. Do not invent staircase steps. |
| R14-03 | **Medium / Typography** | DF/MF Annex B command and provenance, status action explanation; `src/style.css:15`, `:51`, `:76`, `:89` | **Evidence instructions still rely on 13px text.** The copyable command and filenames are consequential material, not incidental metadata. Mobile wrapping makes the command harder to inspect. Strong ink body text does not repair the small instructions needed to verify it. Promote actionable evidence text while keeping labels and timestamps compact. R13's minimum-order paragraph is gone; this finding does not charge for that deleted paragraph. |
| R14-04 | **Medium / Responsive Design** | M and CM introductions; `src/style.css:93` | **Mobile deletes the best explanation of the commitment.** Agreement loses the concise cap/floor/fixed-terms sentence; create loses the sentence saying nobody can loosen the terms. Later recap, clauses and confirmation retain safeguards, so this is not proof of uninformed signing. A short mobile explanation would preserve meaning without reinstating all desktop prose. |
| R14-05 | **Medium / Interaction States** | Clause 4; `src/App.tsx:77`, `:120-125` | **A network failure removes its own retry button.** Any result replaces the simulation control, including “Could not check (network).” A transient failure requires a page reload and loses other verdicts. Keep Retry available for network errors. Source-only; failure was not induced live. |
| R14-06 | **Medium / Interaction States** | Deposit completion; `src/App.tsx:81-84` | **Balance matching is still presented as transfer attribution.** An equal observed increase produces “HYPE locked”; it does not identify which transfer caused the increase. Concurrent deposits or sales can defeat this predicate. Report the observed balance accurately or attribute completion to the submitted transfer. R13's exact-amount matching improvement remains, but the residual issue is unchanged. Source-only; no concurrent deposit was exercised. |
| R14-07 | **Medium / Interaction States** | Rail's active sale state; `src/App.tsx:71`, `:79`, `:85`, `:153-158` | **The active sale CTA ignores known blocking terms.** `used` checks allowance and balance only. It does not include the already computed floor/oracle halt or start/end dates. A funded agreement with allowance can offer “Trigger today's sale” while the page knows the sale is blocked. Contract rejection protects execution; it does not make this a useful action state. Derive CTA availability and its explanation from the same terms shown in the document. Source-only, absent from the exhausted demo capture. |
| R14-08 | **Medium / Content & Microcopy** | DF/MF Annex B; `src/App.tsx:176-181` | **The proof is described instead of directly packaged.** Contract source is an unlinked repository path; two explorer links point to the same address page; bytecode presence does not prove source correspondence. New feature-test and keeper-test filenames are also plain text. Deposit/refund claims lack adjacent evidence links. Judges must locate a repo and reconcile several agreements. Link exact artifacts and group current-agreement proof separately from historical tests. This is a packaging defect, not a finding of fabricated transactions. |
| R14-09 | **Medium / Content & Microcopy** | DF/MF Annex C; `src/App.tsx:186-188` | **Fee comparisons omit material scope.** Streamflow's base vesting charges depend on subscription treatment; Sablier's withdrawal fee applies to specified newer releases. The paragraph presents the numbers too universally. It then spends more words on global unlock totals and hypothetical revenue than on why this buyer would pay. Keep the proposed-fee disclosure; qualify comparisons and shorten the market illustration. |
| R14-10 | **Medium / Content & Microcopy** | D figure value table, M collapsed values; `src/App.tsx:37`, `:47-48` | **The table looks daily but contains cumulative data.** “Day / Ceiling / Filled” shows 0.5 filled on both days 1 and 2, even though only one 0.5 fill exists. A reader can reasonably read this as two daily fills. The title does not explicitly resolve this. Name cumulative columns or provide daily increments, and explain blank future cells. This is a data interpretation problem independent of chart size. |
| R14-11 | **Medium / Content & Microcopy** | Action explanation; `src/App.tsx:79`, `:154`, `:158` | **The interface says the caller picks the size, but offers no size choice.** Its sale handler sends the smaller of remaining allowance and 0.5 HYPE. The statement can describe the contract API, but beside the UI button it promises a control users do not have. State the actual amount this button submits, or supply the promised choice. Source-only; active sale was not clicked. |

Polish, no deduction: the upper chart tick is the awkward rounded `0.63`; mobile shows days 2 and 4 while hiding day 1 beside “now”; “all 0.5 HYPE deposited is sold” is stiff prose; visited links have no distinct style; disabled controls use `cursor:default`; create's date summary represents blank “start now” as an exact current timestamp even though deployment happens later. Inline proof links and the wordmark are not covered by the mobile 44px button rules; actual rectangles were not measured. None of these warrants decorative repairs.

## Original owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes, captured agreement state** | V2's broad grey “Today's allowance is used” slab is replaced by text and a restrained deposit outline. Create's navy valid-state CTA is appropriate. Invalid/loading states were not captured. |
| b. Right side empty | **Yes, desktop** | Opening lede, figure table and populated status rail have distinct purposes. Create has a useful consent recap. Ordinary blank space below a shorter rail is acceptable. |
| c. Chart small | **Yes in size; not in effectiveness** | Full-width figure with a substantial desktop plot and readable mobile line. R14-02 and R14-10 explain why bigger does not yet mean clearer. |
| d. Body too light grey | **Yes** | Main prose is 16px ink. Calculated slate contrast passes for metadata. Remaining small evidence text is a separate typography issue. |

## R13 closure check

| R13 finding | R14 status |
|---|---|
| 01: repeated exhaustion | **Open.** Same opening, plot and rail repetition; R14-01. |
| 02: empty oversized chart | **Open, wider time window.** Three days in R13 become four in R14. Source derives this from elapsed time, so this is state drift rather than evidence of a layout-code regression. Neither extra day adds a fill; R14-02. |
| 03: consequential 13px text | **Partly resolved by deletion.** Incorrect minimum-order prose is gone. Evidence command and instructions remain small; R14-03. |
| 04: mobile commitment explanation hidden | **Open.** Both ledes still hidden below 480px; R14-04. |
| 05: no retry after simulation network failure | **Open in source.** R14-05. |
| 06: quote/minimum-order validation fails open | **Obsolete, not a regression to restore.** The whole 10 USDC gate was intentionally removed in commit `651dfb1`. Local `deployments/keeper-test.json` records a 0.25 HYPE CoreWriter fill at 22.51, about 5.63 USDC, contradicting the former universal threshold. This recorded evidence was read, not independently replayed on-chain. Do not reintroduce the unsupported threshold to satisfy an old audit. |
| 07: residual deposit attribution | **Open in source.** Exact balance matching remains; attribution still weak, R14-06. |
| 08: judge must assemble proof | **Open, more claims now affected.** The new evidence filenames exist locally but are unlinked in the UI; R14-08. |
| 09: fee scope and oversized market story | **Open.** Same comparison and market prose; R14-09. |

R13's fixes to mobile create ordering, historical-versus-current headline quantities, clipboard rejection handling and untimed verification wording remain. The captured agreement is now 4067px desktop and 6716px mobile, up from R13's 3879px and 6501px. That is about eight mobile viewport heights. Create drops from 1507px to 1436px on mobile. Page length alone is not a failure; repetitive status and indirect proof make the length harder to justify.

## Annex clarity and honesty

**Annex B has better factual scope than proof usability.** Real testnet, fork-simulated and planned behavior are distinguished. The viewed agreement's fills are separated in wording from the historical wallet-test agreement. RPC failures are not called contract rejections, and post-expiry withdrawal is explicitly allowed. These are good honesty decisions.

The new real-testnet row adds floor rejection, pre-start rejection, post-term withdrawal and permissionless triggering. I opened `../deployments/feature-tests.json` and `../deployments/keeper-test.json`. They contain named test agreements, transaction hashes, reverted/success outcomes, and withdrawal before/after balances. The keeper file records different team and caller addresses and filled/reconciled state. The withdrawal record even corrects a previously mislabeled caller. This is substantive local evidence, stronger than an empty “tested” badge, but JSON records are not independent chain verification.

The UI hides those useful artifacts behind plain filenames. Bytecode on an explorer is also not, by itself, proof that the referenced source has no privileged path. Link source correspondence and exact transactions beside each assertion. Leave multi-day resets and mid-term price crashes under simulated evidence until a real proof exists. Nothing here establishes that any claim is fabricated; several claims remain difficult to check from the public page.

**Annex C is candid about proposal versus implementation, but overextended as a commercial argument.** It names a payer, states the proceeds-based fee, and explicitly says that fee is absent from the testnet contract. Global unlock volume is not presented as local demand or willingness to pay. Its hypothetical arithmetic is correct: 18.77 billion x 1% x 0.25% = 469,250, approximately 470 thousand. Correct arithmetic does not make those assumptions evidence of a business.

The [Streamflow fee breakdown](https://streamflow.finance/blog/how-much-does-streamflow-cost) supports the cited base figures but describes subscription reductions/refunds. [Sablier's fee documentation](https://docs.sablier.com/concepts/fees) scopes the withdrawal charge to Lockup v2.0+ and Flow v1.1+. The annex omits those qualifications. The linked Tokenomist report could not be fetched, so its market figures remain unverified in this audit. Recommend a shorter buyer/fee paragraph and qualified comparisons, with the illustration subordinate to the buyer case.

## Ten-category grades

Skill computation: each category starts at A; High subtracts one letter step, Medium half a step, Polish zero. For reproducibility use R13's convention: A=0, B=1, C=2, D=3, F=4 deduction steps. Half-step category results display the weaker adjacent grade; weighted calculation retains fractions. Overall grade rounds to the nearest step. A provisional grade means no established deduction, not a runtime pass.

| Category | Weight | R14 | R13 | Deduction / basis |
|---|---:|---|---|---|
| Visual Hierarchy & Composition | 15% | B | B | 0.5: R14-01. Honest headline, excessive repetition. |
| Typography | 15% | B | B | 0.5: R14-03. Strong type identity, small evidence instructions. |
| Color & Contrast | 10% | A | A | 0. Coherent semantic palette; calculated token contrasts pass. |
| Spacing & Layout | 15% | B | B | 0.5: R14-02. Balanced desktop structure, disproportionate exhausted plot. |
| Interaction States | 10% | C | C | 1.5: R14-05/06/07. Retry, attribution and term-aware action states. |
| Responsive Design | 10% | B | B | 0.5: R14-04. Correct create order; essential ledes removed. |
| Motion & Animation | 5% | A, provisional | A, provisional | 0. Restrained 150ms color transitions and reduced-motion suppression in source; runtime unobserved. |
| Content & Microcopy | 10% | C | B | 2.0: R14-08/09/10/11. Indirect proof, fee scope, cumulative labels and promised size choice. |
| AI Slop Detection | 5% | A | A | 0. No generic feature grid, gradient hero, ornamental pills, blobs or bubbly cards. |
| Performance as Design | 5% | A, provisional | A, provisional | 0 confirmed deductions. HTTP RPC batching and parallel reads remain in `src/chain.ts:8-13`; font preconnect and swap remain in `index.html`. LCP/CLS, latency and actual batching unmeasured. |

Weighted deduction = **0.625 steps**, rounded to **B**. R13 was 0.525. The content downgrade comes from additional specific comprehension defects, not a claim that the unchanged page suddenly became visually worse. The skill's generous A baseline is why these concrete findings matter more than the headline grade.

**AI Slop verdict: A.** The financial-document structure and disciplined type/palette choices are recognisable. It needs clearer editing and operating states, not more visual personality. The ink rail divider is a document boundary, not the blacklist's decorative accent stripe on generic cards.

Cross-page consistency passes visually: same masthead, paper, rules, numbering, type roles and action treatment. No generic card funnel or decorative imagery is needed. The signature chart is recognisable in form, but this captured state does not demonstrate the release-staircase mechanism well.

## Priorities, report only

1. Make the exhausted figure earn its space; explicitly label cumulative values.
2. Cut repeated inventory statements and retain a concise mobile commitment sentence.
3. Package exact proof links beside Annex B's assertions.
4. Keep retry controls and make sale actions respect the displayed blocking terms.
5. Qualify fee comparisons and describe the amount the UI actually submits.

Eleven Medium findings; no source fixes. Do not restore the disproven minimum-order assumption.

Blind spot: supplied captures and local source cannot establish deployed parity, live recovery, wallet completion, keyboard/dialog accessibility, tablet behavior, chain-proof validity or runtime performance.

## Scores

Independent 0-10 visual/task assessment across both routes, separate from the letter rubric. Sum 64.5; average 8.0625 rounded to one decimal. The minimum reflects chart interpretation and space use, not the strength of the visual identity.

```text
hierarchy=8
layout/space use=7
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7
mobile=7.5
AVERAGE=8.1 MIN=7
```
