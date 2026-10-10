# PLEDGE independent design audit: R9

2026-10-10. Agreement and create routes. Report only; no source changes.

Design Score: B
AI Slop Score: A

**R9 repairs real defects from R8. It still presents financial information more confidently than the interface can justify.** The term-sheet identity works. The mobile price table does not. Annex provenance is now readable, but a failed network request can still become a purportedly successful rejection check. The owner’s four original complaints are fixed in the supplied state; that is not sufficient for an A.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, design-system assessment, ten-category audit, cross-route comparison, regression review, severity deductions and recommendations. Classified both routes as **APP UI**. Cinematic landing-page prescriptions would be inappropriate for this financial document.

The explicit one-report instruction overrides the skill’s setup/configuration writes, source repairs, generated artifacts and commits. I did not build this UI or modify it. I read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, the R8 audit, and supporting table, font and chain code. I opened all six R9 images and the V2 negative reference.

| Key | Screenshot | Native dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r9-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r9-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r9-1440-full.png) | 1440 x 3736 |
| MF | [Agreement mobile full](shots/r9-390-full.png) | 390 x 6188 |
| C | [Create desktop](shots/r9-create-1440.png) | 1440 x 1138 |
| CM | [Create mobile](shots/r9-create-390.png) | 390 x 1646 |
| V2 | [Owner’s 6.5/10 reference](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) through background Brave: `minibhn deepsurge open` failed with SSH `Operation not permitted`. Web fetch could access neither agreement nor [create](https://v3-review.pledge-ccs.pages.dev/#/create). This does not establish that the deployment is down. Supplied screenshots are the rendered evidence; deployment parity, interactions and computed styles remain unverified. Source-only findings below are not presented as reproduced browser failures.

## First impression and structure

The site communicates **a signed financial instrument**. I notice the large ink agreement title, then the blunt `0 HYPE` availability with its deposit action, then the navy fill dot in Figure 1. One word: **sober**. Those are useful focal points. The serif is expressive without making an irreversible financial action feel playful.

Desktop space is composed deliberately: the right lede balances the title, the figure receives the full document width, the day table earns its right column, and the status rail has genuine work to do. The tail of whitespace below the shorter rail is acceptable. The chart’s largely empty lower area is less convincing: a six-day plateau and one completed fill occupy a substantial figure, while the y-axis prioritizes awkward `0.16 / 0.31 / 0.47 / 0.63` ticks over the meaningful `0.5` level.

Mobile starts well. The agreement title stays intact, the actionable availability survives, and the real fill is visible in the first viewport. Below that, document discipline weakens. The price table conceals values, status follows all six clauses, and the annexes stretch the page without joining navigation. CM puts Review and sign around y=1412, despite having only five inputs.

**Page-area test:** masthead = identity/route switch; opening = agreement/inventory; figure = ceiling versus realized fills; clauses = terms/evidence; rail = current status/actions; Annex A = simulated cases; Annex B = verification; Annex C = proposed economics; create = editable terms and signing recap. All areas have identifiable purposes. The problem is access and reliability, not missing section identity.

**Trunk test:** agreement and create are **PARTIAL, 4/6**. Site, page, sections and options are legible. There is no selected section/location indicator or search. Search is unnecessary for this scope, so its absence is not a product recommendation. Dialog orientation is unobserved.

## Binding direction and consistency

Newsreader headings, Manrope body and DM Mono figures are visibly coherent. CSS declares bone `#FAF8F3`, ink `#1A1D21`, slate metadata, navy actions/fills and amber allowance/lock marks. Rules, numbered clauses, 2px controls and no shadows make this recognizable as PLEDGE’s term sheet. No gradients, decorative feature grids, floating tags, ghost numbers, avatar substitutes or ornamental icon furniture appear.

Body prose is 16px ink in source; it reads substantially better than V2. Principal price/sale values now use 16px rather than metadata sizing. Mobile recap values remain 13px, acceptable as supporting information but visibly less confident. `DESIGN.md` still specifies a 15px body step while CSS uses 16px; the implementation is the better choice, but the binding specification is stale.

The release-staircase component now shows only deposit-capped allowance and realized fills. In this exhausted fixture, a one-step plateau is truthful. Do not restore a fictional staircase merely to satisfy the signature description. A genuine multi-day example is needed to demonstrate that part of the direction.

## Findings

High = consequential trust or task defect; Medium = material comprehension or completion friction; Polish = refinement. Each finding is charged once to its primary category. Recommendations are report-only.

| ID | Severity / category | Where | What and consequence |
|---|---|---|---|
| R9-01 | **High / Responsive Design** | MF, clause 3; `src/App.tsx:107`, `src/style.css:50`, shared `TableCell` | **The mobile price table makes its values disappear.** Oracle, order-limit and floor labels are visible while their right-aligned values sit outside the resting viewport; the Price check sentence is cut off. The longer 16px, non-wrapping verdict determines the table’s width and pushes the numeric column away. Horizontal scrolling is a poor discovery requirement for the agreement’s price conditions. Wrap the result and keep each label/value pair visible at 390px. This is the most serious rendered defect. |
| R9-02 | **Medium / Visual Hierarchy & Composition** | D/M, Figure 1; `src/App.tsx:32-46` | **The chart is more honest, but still inefficient to read.** A six-day plateau dominates while the actual `0.5` level is absent from the y-axis ticks. Ceiling and fill coincide, and the navy line stops at now while amber continues into future time; the reader must assemble that distinction from small labels and the legend. Use useful ticks and state directly that the deposited ceiling is fully filled. The empty plot is not grounds for inventing more data. |
| R9-03 | **Medium / Spacing & Layout** | CM, entire form/recap; MF, annex navigation; `src/style.css:46,68-69,83,93`, `src/App.tsx:94,161` | **Mobile still has too much document before the next useful action.** Create shrank only 22px from R8’s 1668px to 1646px; its review action remains below the first screen. The two-column recap ends in a half-width Cancelable rule. Meanwhile agreement grew 486px to 6188px, and neither section jumps nor clause index reaches Annex B/C. Tighten repeated form spacing, finish the recap row, and expose annex destinations. No sticky signing shortcut is necessary. |
| R9-04 | **High / Interaction States** | Agreement-address changes; `src/App.tsx:23,59-65,95` | **A different agreement can inherit the previous agreement’s visual truth.** `Agreement` is reused without an address key; state, fills, `fillsLoaded`, simulation verdicts and action logs are not reset when `addr` changes. Until the next successful reads, a new address can appear beside old terms/fills. If its initial fill fetch fails, `known` can remain true from the previous agreement. Reset identity-bound state or remount per address. **Source-only risk, not reproduced live.** The initial-load repair does not cover this transition. |
| R9-05 | **Medium / Interaction States** | Create price loading/unavailable states; `src/App.tsx:194-195,207,218` | **Minimum-order checking is no longer silently absent on a thrown fetch error, but unchecked states remain ambiguous.** While loading, or when a JSON response lacks a usable positive `@1035` price, `mid` is zero, `minCap` is zero, and signing can remain enabled without the failure message. `midErr` only covers rejected promises. The new checked-price caveat is good; apply equally explicit pending/unavailable language and a deliberate policy to the other paths. **Source-only; unavailable-state appearance unobserved.** |
| R9-06 | **High / Content & Microcopy** | Clause 4 and Annex B; `src/App.tsx:79,113-119,176`, `src/chain.ts:20` | **“Rejected” does not necessarily prove contract rejection.** `attempt()` converts every exception, including transport failure, into `ok:false`; the UI gives it the same destructive Rejected badge as a contract revert. Annex B instructs judges to treat that result as live proof. A printed RPC error reason does not undo the headline’s conclusion. Separate an unavailable check from a confirmed contract rejection. **Source-only error-path finding; the supplied screenshot shows pre-check controls.** |
| R9-07 | **Medium / Content & Microcopy** | Annex C; `src/App.tsx:184-186` | **Cost and revenue framing still exceeds its evidence.** “Buyers and keepers pay nothing” does not distinguish PLEDGE fees from transaction gas. Streamflow’s lock comparison omits its fixed creation fee and compares allocated-token fees to filled-proceeds fees. The market arithmetic is explicitly illustrative, but global unlock value is not proof of reachable HYPE volume or willingness to pay. Narrow the cost claim and label the pricing bases. |
| R9-08 | **Medium / Responsive Design** | Mobile chart, mid-plot last fill; `src/App.tsx:46` | **The label repair is incomplete.** Labeling only the last fill removes repeated-label collisions; flipping the anchor on the right half helps late fills. A long last-fill label originating just left of the midpoint still extends toward the right edge without measured width, wrapping or clamping. The one early-fill capture cannot establish general fit. Keep the mark concise and use the sales record for price detail, or place by available width. **Source-only geometry risk.** |

Polish, no grade deductions: “Values by day” has no obvious expansion marker in M; links lack an explicit visited treatment; disabled controls use `cursor:default`; the create recap’s orphan rule remains; the spec says the navy primary is never disabled, but create renders it disabled for invalid/busy states. The exhausted agreement nevertheless fixes the original disabled-button complaint. These inconsistencies should not be mistaken for evidence that all action states were exercised.

## Owner complaints a-d

| Complaint | Fixed? | Evidence |
|---|---|---|
| a. Disabled button dominated | **Yes, in the captured agreement** | Availability and a useful outline deposit action replace V2’s broad grey disabled rectangle. The create primary has a real purpose. Busy/invalid states unobserved. |
| b. Right side empty | **Yes** | Desktop lede, figure value table and status rail all carry useful content; create has the signing recap. Remaining whitespace is intentional asymmetry. |
| c. Chart small | **Yes** | Figure 1 is a major full-width desktop section and visible in mobile’s opening viewport. Its remaining weakness is interpretation, not size. |
| d. Body too light grey | **Yes** | Main prose and financial values are ink. Slate is supporting metadata. The mobile table failure concerns visibility, not insufficient text contrast. |

## R8 closure check

“Fixed” below means fixed in captures and/or supplied source as stated, not independently exercised on the deployment.

| Previous finding | R9 status |
|---|---|
| R8-01: invisible annex provenance | **Fixed in DF/MF.** A wrapping list replaces the overflowing table; mobile stacks each status above its claim. |
| R8-02: saturated hypothetical plateau | **Fixed in captures/source.** Counterfactual series removed. The remaining plateau is deposit-capped and correct for this fixture. |
| R8-03: coincident three-series marks | **Substantially fixed.** Redundant deposited guide removed and latest fill directly identified. Ceiling/fill overlap remains legitimate, with readability issues in R9-02. |
| R8-04: unknown history becomes chart zeros | **Fixed for first load in source.** Figure is withheld until `fillsLoaded`, clause 1 says “at least,” and sold/proceeds are unknown. Subsequent failures explain last-successful values. Cross-address reuse remains R9-04. Failure states not live-tested. |
| R8-05: elongated mobile create | **Open, slightly improved.** 1646px versus 1668px; five inputs still lead to a late review action. R9-03. |
| R8-06: small financial evidence | **Substantially fixed in source/captures.** Price/sale cells promoted to 16px; annex claims are prose. The larger nowrap verdict creates R9-01. |
| R8-07: exact withdrawal time discarded | **Fixed.** Agreement Term and Ends show date/time/zone; deposit description uses the same formatter. |
| R8-08: “Selling permitted” contradiction | **Fixed wording.** “Price check” scopes the result correctly. Mobile cannot read the full result at rest, R9-01. |
| R8-09: annex scope/cost overclaims | **Partially fixed.** Reverted-transaction language is demo-only; wallet evidence explicitly says separate test agreement; promise now concerns locked supply. “Pay nothing” remains, R9-07. |
| R8-10: price-fetch guard silently disappears | **Partially fixed in source.** Thrown failure gets a warning/reload instruction and successful estimate gets a repricing caveat. Loading/missing-price response remains unchecked, R9-05. |
| R8-11: crowded/late fill labels | **Partially fixed in source.** Only latest fill labeled and right-half anchor flips. Width-aware placement remains absent, R9-08. |

## Annex clarity and honesty

**Annex B’s most serious R8 presentation defect is repaired.** Real-testnet and fork-simulated qualifiers are now adjacent to readable claims at both widths. Separate-wallet evidence is explicitly separate, so `22.538` no longer reads as an unexplained alternative to the demo’s `22.512`. Demo-only reverted-call language is correctly conditional.

The “60 seconds” promise is still unsupported by this audit. The reader must find clause 4 again, run three checks, inspect explorers and execute a terminal command. There is no direct jump to checks or copy command action. Bold lead sentences help scanning, but a verification annex should reduce proof work rather than describe it. The command uses `break-all`, making addresses and JSON awkward to inspect on mobile. Four dense instructions are not a 60-second proof artifact by themselves.

Do not equate the transaction links with independently verified wallet E2E. I did not query their receipts or certify their completion. The universal “sale really filled” heading and real-testnet claim list also remain fixture-like copy on arbitrary agreement routes, including a new agreement with no fills. Historical product proof should be identified as such, rather than reading as current-address evidence. Most seriously, the simulation result model cannot distinguish unavailable proof from a real revert, R9-06.

**Annex C is clear about the proposed fee being absent from the testnet contract.** It names the intended payer and ties the fee to filled proceeds. “Illustration only” is useful qualification. Arithmetic checks: `18.77 billion x 1% x 0.25% = 469,250`, reasonably rounded to 470 thousand. This is hypothetical gross fees, not a measured market or forecast.

The [Streamflow pricing page](https://streamflow.finance/blog/how-much-does-streamflow-cost) supports the vesting percentages and says token locks also cost 0.16 SOL to create. Its percentage is charged on allocated tokens, unlike PLEDGE’s proposed charge on filled proceeds. The comparison needs those bases and the omitted fixed lock fee. The [Sablier fee documentation](https://docs.sablier.com/concepts/fees) supports the 0.99-dollar withdrawal interface fee for applicable versions, separately from gas. Those are pricing references, not evidence of equivalent products or relative total cost.

The linked [Tokenomist report](https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact) was inaccessible through the web tool. Its three market totals remain unverified here. The report supplies no observed buyer willingness to pay. That is a boundary on what the commercial prose proves, not a request to invent traction.

## Interaction, accessibility and performance boundaries

The screenshots show readable controls and specific labels. Source declares focus outlines, 44px mobile action sizing, explicit 150ms color transitions and reduced-motion suppression. Fonts use preconnect and swap. These are declarations, not computed accessibility or performance certification. No keyboard flow, dialog, quote failure, simulation click, wallet transaction, touch response, LCP, CLS or font-flash measurement was possible. RPC batching exists in `src/chain.ts:8`; installation/configuration receives no credit as a measured speed improvement.

Litmus: product unmistakable **yes**; strong anchor **yes**; headlines communicate structure **yes**, but cannot alone certify the financial state; one job per section **yes**; decorative cards necessary **no**, and absent; motion improves hierarchy **unobserved**, restrained static treatment appropriate; premium without shadows **yes**. No fabricated goodwill meter or rendered word count is reported.

## Ten-category grades

Skill deductions: each category starts at A; High costs one letter step, Medium half a step, Polish zero. A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter; fractional deductions remain in the weighted calculation. Overall rounds to the nearest letter. Unobserved runtime categories are explicitly provisional.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 0.5: R9-02. Strong opening; chart interpretation still laborious. |
| Typography | 15% | A | 0. Distinct type roles; principal evidence promoted. Overflow charged to Responsive. |
| Color & Contrast | 10% | A | 0. Captured ink prose and coherent palette; computed contrast unmeasured. |
| Spacing & Layout | 15% | B | 0.5: R9-03. Desktop composed; mobile completion/navigation inefficient. |
| Interaction States | 10% | C | 1.5: R9-04/05. Identity-bound state and unchecked quote paths. Source-only. |
| Responsive Design | 10% | C | 1.5: R9-01/08. Visible price-table failure and residual fill-label fit risk. |
| Motion & Animation | 5% | A, provisional | 0 confirmed deductions; restrained declarations, behavior unobserved. |
| Content & Microcopy | 10% | C | 1.5: R9-06/07. Proof result and cost/economic scope. |
| AI Slop Detection | 5% | A | 0. Specific document identity; no template furniture. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions; runtime measurements unavailable. |

Weighted deduction = **0.60 grade steps**, yielding **B**. R8 was 0.80, also B. R9 improves within the coarse letter band: provenance, history initialization, time precision and chart honesty are materially better. The unchanged headline grade does not erase those repairs, and the repairs do not excuse the remaining trust paths. AI Slop **A** describes specificity, not usability or correctness.

## Priorities, recommendations only

1. Make all price values and the full condition result visible at 390px without horizontal discovery.
2. Separate network failure from confirmed contract rejection; reset agreement-bound state on address changes.
3. Expose quote pending/unavailable states with an explicit signing policy.
4. Bring mobile review closer and link directly to annexes and proof controls.
5. Refine chart ticks, coincident-state explanation and label placement without adding hypothetical data.

No source repairs or new screenshots were produced. Blind spot: supplied successful-state captures and local source cannot prove deployment parity, runtime recovery, keyboard/dialog usability, transaction completion, evidence receipts or performance.

## Scores

Independent dimension scores, separate from the skill’s weighted letter rubric. Arithmetic mean is 8.125, rounded to one decimal.

```text
hierarchy=8
layout/space use=8
typography=9
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=8.5
data/chart clarity=7
mobile=6.5
AVERAGE=8.1 MIN=6.5
```
