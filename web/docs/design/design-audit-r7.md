# PLEDGE independent design audit: R7

2026-10-10. Agreement and create routes. Report only.

Design Score: B
AI Slop Score: A

**R7 is a convincing term sheet with an under-resolved financial figure.** The mobile opening is materially better. The chart no longer lets imaginary inventory dwarf the real fill. But shrinking the hypothetical staircase into an artificial plateau is not a complete information-design repair. The typography earns trust faster than the data presentation earns it.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, inferred system, ten-category checklist, flow review, cross-page consistency, impact deductions and weighted grading. Classified both routes as **APP UI**. A financial document does not need decorative motion, illustrations or a marketing hero to pass.

The explicit one-report instruction overrides setup writes, additional artifacts, outside-voice dispatch, fixes and commits. No source files were edited. Existing changes were left alone.

Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, `docs/design/design-audit-r6.md` and font declarations in `index.html`. Opened all six R7 captures and the V2 negative reference. Dimensions were read from the image files.

| Key | Capture | Dimensions |
|---|---|---|
| D | [Agreement viewport](r7-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r7-390.png) | 390 x 844 |
| DF | [Agreement desktop full](shots/r7-1440-full.png) | 1440 x 2569 |
| MF | [Agreement mobile full](shots/r7-390-full.png) | 390 x 3796 |
| C | [Create desktop](shots/r7-create-1440.png) | 1440 x 1087 |
| CM | [Create mobile](shots/r7-create-390.png) | 390 x 1668 |
| V2 | [Previous 6.5/10 version](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

The V2 path resolves relative to this report's directory; it does not resolve from the workspace root as written in the prompt.

Attempted the [live agreement](https://v3-review.pledge-ccs.pages.dev/) and [live create](https://v3-review.pledge-ccs.pages.dev/#/create) through the web tool. Both were inaccessible. `minibhn deepsurge open` failed with SSH `Operation not permitted`. These failures do not establish that the deployment is down. Visual conclusions use the supplied live captures. Source-only concerns are marked explicitly. Local source/deployment parity is unverified.

## First impression and orientation

The site communicates **a signed financial instrument**, with a restrained, credible document identity. I notice the large ink serif title and the blunt “0 HYPE” available-now state. My eye goes to **the agreement title, the deposit row, then the real-fill dot and horizontal ceiling**. One word: **sober**.

Desktop is substantially more composed than V2. The right lede balances the title without turning into a second headline. The figure/table pairing gives the right side a specific job. The lower rail contains useful status and action material. The full-page blank area below that rail is acceptable document asymmetry, although the stationary capture cannot prove the sticky rail follows the reader.

On mobile I can read the state and see its fill evidence in the first screen. That was not true in R6. The fill is around y=584 and the plot finishes near y=734. The figure begins near y=440 instead of R6's roughly y=663. Removing the repeated lede was a good editorial decision.

Create is stronger on desktop than mobile. The right signing recap works as a review surface. At 390px I read five inputs, then nearly the same values again, before reaching the button around y=1434. The page looks considered, but completion still feels unnecessarily distant.

**Page-area test:** masthead = product/route switch; agreement opening = identity and current inventory; figure = cumulative ceiling versus fills; clauses = binding terms; rail = current status and actions; create article = editable terms; create rail = signing recap. Every area has an identifiable purpose. The figure's four legend keys are harder to map to visible marks than the title suggests.

**Trunk test:** both routes **PARTIAL, 4/6**. Product, page, sections and choices are clear; position is implied rather than selected in navigation. Search is absent and unnecessary for this scope. Agreement's section jumps provide useful mobile wayfinding. The supplied screenshots cannot establish dialog orientation or keyboard navigation.

## Direction and cross-route consistency

The rendered identity follows the binding direction: Newsreader display/clause headings, Manrope prose, DM Mono figures; bone `#FAF8F3`, ink, navy actions/fills, amber lock/allowance information; hairline rules, numbered clauses and restrained controls. Source declares 2px radii and no shadows. There is no gradient, decorative card grid, floating pill, ghost numbering or placeholder-avatar furniture.

The Sablier reference contributes object attributes, Stripe contributes document navigation, and OWID contributes figure/table/source organization. The result has its own coherent identity. Three typefaces are justified by three roles. The release-staircase signature is weaker in this exhausted example because the actual line is flat; forcing an invented staircase to make it look distinctive would be worse.

Main prose is visibly ink and source declares 16px/1.6. Metadata is 13px slate. The dates in the signing recap receive excessive mono prominence relative to their labels. `DESIGN.md` still lists a 15px body step while CSS uses 16px; preserve the more readable implementation and reconcile the specification later.

Navigation and button styling carry across routes. The create footer now describes deployment rather than unrelated simulated records. The significant remaining inconsistency is that create specifies exact timed terms while the signed document only specifies dates.

## Findings

High = trust or consequential-state defect. Medium = material reading, interpretation or completion friction. Polish = refinement, no grade deduction. Each issue is charged to one primary category.

| ID | Severity / category | Where | What and specific correction |
|---|---|---|---|
| R7-01 | **High / Interaction States** | History-unavailable state; `src/App.tsx:36-42,53,68-71,91-103` | **Unknown history is repaired in the headline but still becomes definitive chart data.** Source now says “at least” and “unknown” in the opening. However, an initial history failure passes an empty fill array and the known current balance/pending amount as `deposited` to the figure. The figure announces 0 sold, plots a numerical ceiling, and outputs 0 filled for elapsed rows. Clause 1 also states the derived deposited amount without its lower-bound qualifier. “Figures may be stale” is wrong when no successful history exists. Carry the known/unknown distinction into the figure, table and clause; unavailable history must not render as zero historical activity. **Source-only failure path, not induced live.** |
| R7-02 | **Medium / Visual Hierarchy & Composition** | D/M, top dashed line; `src/App.tsx:32-35,47` | **The hypothetical series now depicts an artificial 0.8-HYPE plateau.** At 0.5 HYPE/day its six-day conditional total would reach 3 HYPE. Source clamps every y-coordinate to the 0.8 plot maximum, so the line reaches the top during day 1 and then runs flat through day 6. This is coordinate saturation, not the schedule. The complete annotation fixes the condition, but does not explain the false plateau. Either omit the quantitative counterfactual or render its off-scale continuation explicitly. Do not present the plot boundary as a financial ceiling. **Visible in both viewport captures; mechanism confirmed in source.** |
| R7-03 | **Medium / Visual Hierarchy & Composition** | D/M Figure 1 actual marks and legend | **Three marks occupy the same 0.5-HYPE height.** Deposited guide, ceiling and cumulative fill overlap until “now”; the navy segment is short and the amber line continues to the right. Four legend keys imply a more legible comparison than the plot delivers. The dot and direct fill label rescue this one-fill example. Directly identify the coincident ceiling/fill state, and remove the redundant deposited guide when it equals the ceiling. Adding more legend prose will not separate coincident lines. |
| R7-04 | **Medium / Spacing & Layout** | CM, inputs through review button; `src/style.css:42-45,82-84`; `src/App.tsx:180-199` | **The mobile create page remains overextended.** It is 1668px tall, only 43px shorter than R6. The recap starts near y=1022 and Review and sign near y=1434. Repeated large clause spacing, two-line mono timestamps and an orphan half-width “Cancelable / No” row make a small form feel like two documents. Tighten the existing vertical rhythm and date/time hierarchy while preserving the recap before signing. Desktop's side-by-side treatment already works. |
| R7-05 | **Medium / Typography** | MF sales record and price table, D exact-value table; `src/style.css:46-49`; `src/App.tsx:124-125` | **Primary financial evidence is styled as metadata.** All table cells are 13px, including executed size, price and sale time. Those values are core content, not captions. In MF the sale record becomes a small narrow block despite the available width. Keep source labels and hashes quiet, but promote principal amounts/time toward the 16px prose scale. Attractive body typography does not excuse small proof data. |
| R7-06 | **Medium / Content & Microcopy** | DF/MF Term and Ends; C/CM timed recap; `src/App.tsx:12,121,141,153,190` | **The signed document loses the exact withdrawal time and timezone.** Create shows “09:43 PM GMT+5:30”; agreement shows only “Nov 9, 2026”. A moving countdown is not a durable record of a contractual instant. Preserve date, time and zone in the signed term, rail and deposit confirmation. This remains R6-06. |
| R7-07 | **Medium / Content & Microcopy** | DF/MF Sale price table; `src/App.tsx:112` | **“Selling permitted” contradicts the page's exhausted state on a scan.** It reports only the price condition, while 0 HYPE is available. Label the row “Price check” and use a result scoped to the floor condition. Readers should not have to infer that “permitted” and “nothing left to sell” concern different checks. This remains R6-07. |
| R7-08 | **Medium / Responsive Design** | Figure with multiple/late fills; `src/App.tsx:48-49` | **The mobile annotation repair covers the dashed line, not fill labels.** Every fill still gets a single unwrapped label at x(fill)+12. Multiple nearby fills compete for the same baseline, and a fill near the right edge has no label-width check, alternate anchor or outside-plot detail treatment. The supplied one-fill example cannot reveal this. Use concise marks and the existing values/record surface, or make label placement conditional on available space. **Source-only risk; no multi-fill or late-fill capture supplied.** |
| P01 | **Polish / Interaction States** | Links and disabled controls; `src/style.css:9,61` | No explicit visited-link distinction is declared, contrary to the skill's universal rule. Disabled buttons use `cursor:default`, not its prescribed `not-allowed`. These are not the old dominating-disabled-action problem. Actual browser visited behavior and busy-state appearance were not observed. |
| P02 | **Polish / Spacing & Layout** | C/CM recap and M below chart | The orphan cancellation cell has a half-width bottom rule. “Values by day” does not visibly advertise disclosure as clearly as the Annex does. Finish the recap's geometry and make the table toggle unmistakable without adding another card or decorative control. |

## Owner complaints a-d

| Complaint | Fixed? | Judgment against V2 |
|---|---|---|
| a. Disabled button dominated | **Yes, in captured exhausted state** | The gray full-width exhaustion button is gone. Availability is text; deposit is an outline action. The navy create action has a real task. Busy/invalid states remain unobserved. |
| b. Right side empty | **Yes, substantially** | Right lede, exact-value table and status/action rail all have jobs. Blank space beneath a shorter rail is not evidence that the whole column is unused. Sticky behavior is unverified. |
| c. Chart small | **Yes** | Desktop has a broad plot beside its table. Mobile uses the available width and now shows the fill within the first viewport. The remaining objections concern interpretation, not size. |
| d. Body text too light gray | **Yes** | Main prose is ink and readable. Slate is secondary. Small financial table values remain a typography issue, not a reason to darken all metadata. |

## R6 findings: closure check

| R6 ID | R7 status | Evidence |
|---|---|---|
| R6-01: failed first history read becomes zeros | **Partly fixed in source** | Opening now distinguishes unknown sold/proceeds and a lower-bound deposit total. Figure and clause 1 still do not preserve that distinction. R7-01. No live failure test. |
| R6-02: hypothetical staircase dominates | **Hierarchy substantially fixed; quantitative repair incomplete** | Actual 0.5 is now the main mark, with a subdued dashed series above. Its unmarked coordinate saturation creates a new plateau defect. R7-02/R7-03. |
| R6-03: clipped conditional annotation at 390px | **Fixed in capture and source** | Full “dashed: needs more deposits” fits, right anchored. |
| R6-04: bloated mobile opening hides actual fill | **Fixed in capture** | Lede removed below 480px, opening tightened. Figure begins near y=440 and fill is visible near y=584. |
| R6-05: overlong mobile create page | **Still open** | 1711px becomes 1668px; first action remains around y=1434. R7-04. |
| R6-06: exact signed end time missing | **Still open** | `dt()` still produces date only. R7-06. |
| R6-07: misleading “Selling permitted” | **Still open** | Same visible row wording. R7-07. |
| R6-08: chart width sampled without resize subscription | **Partly fixed in source** | Resize listener now exists and 390px captures show alternating day labels. CSS still stacks below 960px while chart geometry/table-open state switches below 600px. No 600-960px or resize capture: full breakpoint closure unverified. |
| P01: mono rhythm and spec/body-size mismatch | **Still open, polish** | Timestamp prominence and 15px/16px specification mismatch persist. |
| P02: rail tail and orphan recap cell | **Partly resolved as composition** | Useful rail content makes the blank tail defensible. Recap orphan cell remains. |
| P03: unrelated shared create footer | **Fixed in capture and source** | Create footer now describes contract deployment and fixed terms. |

## Interaction, hard rules and blind spots

I can identify deposit, simulation and review actions from their labels. Source separates read-only simulation from wallet actions and review from final deployment. I cannot honestly narrate clicking them: live browser access failed. No goodwill meter or rendered-word count is fabricated. There is no visible welcome pitch or self-congratulatory filler; repeated contract values cause the mobile length.

No hard-rejection pattern is present in the supplied screens. Litmus checks: product clear **yes**; strong visual anchor **yes**; headline scan explains structure **yes**, but current state still requires prose; one job per section **yes**; decorative cards necessary **no**, and absent; motion improves hierarchy **unobserved**, restraint appropriate; premium without shadows **yes**, already shadow-free.

Source declares focus treatment, larger mobile controls, 150ms property-specific color transitions and reduced-motion suppression. These declarations do not establish computed touch bounds, keyboard/focus behavior or response feel. Font preconnect and swap are present; LCP, CLS, font loading and runtime errors were not measured.

## Ten-category grades

Applied the skill's deductions: start at A, High costs one grade step, Medium half a step, Polish none. Use A=0, B=1, C=2, D=3, F=4. Half-step categories display the weaker letter; weighted total uses unrounded deductions. Runtime categories with no observation are provisional, not passed.

| Category | Weight | Grade | Deduction / basis |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | B | 1.0: R7-02/R7-03. Strong document hierarchy, unresolved chart semantics. |
| Typography | 15% | B | 0.5: R7-05. Distinctive families and readable prose; proof values too small. |
| Color & Contrast | 10% | A | 0. Restrained captured palette; computed live contrast unmeasured. |
| Spacing & Layout | 15% | B | 0.5: R7-04. Agreement improved; create mobile still elongated. |
| Interaction States | 10% | B | 1.0: R7-01. Unknown history still yields definitive financial graphics. |
| Responsive Design | 10% | B | 0.5: R7-08. Narrow opening repaired; general fill-label placement unresolved. |
| Motion & Animation | 5% | A, provisional | 0 confirmed deductions. Static document and restrained transitions appropriate; feel untested. |
| Content & Microcopy | 10% | B | 1.0: R7-06/R7-07. Timed-term precision and price-state wording remain wrong. |
| AI Slop Detection | 5% | A | 0. Authored document structure; none of the obvious template patterns. |
| Performance as Design | 5% | A, provisional | 0 confirmed deductions. Font loading hints present; no measured runtime performance. |

Weighted deduction = **0.55 grade steps**, nearest overall grade **B**. The same coarse B/A as R6 does not imply no improvement: mobile composition improved, while this review also charges small evidence typography and the now-visible saturated-series defect. An A for avoiding AI slop is not an A for financial clarity.

## Quick wins, recommendations only

1. Rename the price-condition row and result. Small copy edit; removes an immediate contradiction.
2. Show exact end time and zone in the agreement and deposit confirmation. Reuse the existing timestamp treatment.
3. Remove the misleading saturated conditional line, retaining a plain additional-deposit condition. Smaller and more honest than extending the graphic.
4. Increase principal sale/price table values while keeping hashes and labels secondary.
5. Tighten mobile create clause gaps and separate recap date/time emphasis. Preserve review before signing.

Each is plausibly a small edit under 30 minutes; verification time is additional. Unknown-history propagation and multiple-fill annotation need deliberate state/data checks rather than cosmetic treatment.

Blind spot: supplied successful-state captures and local source cannot prove live parity, failure recovery, resize/tablet behavior, dialogs, keyboard access, wallet/transaction completion or performance. No fixes were made.

## Scores

These 0-10 design-dimension scores are separate from the skill's weighted letter calculation. The eight-score mean is 8.1875, rounded to one decimal.

```text
hierarchy=8
layout/space use=7.5
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=9
data/chart clarity=7
mobile=7.5
AVERAGE=8.2 MIN=7
```
