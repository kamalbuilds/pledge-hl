# PLEDGE independent design audit: r6

2026-10-10. Agreement and create routes. Independent critique, report only.

Design Score: B
AI Slop Score: A

**R6 has a convincing document identity, but the chart still gives hypothetical supply more visual authority than the actual agreement. Mobile is more navigable, not yet well composed.** The four owner complaints are substantially addressed. This deserves a higher visual score than V2's 6.5, but an A would excuse information defects because the typefaces are attractive.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area test, trunk test, inferred system, ten-category checklist, flow review, cross-page consistency, severity deductions and weighted grading. Both routes are app interfaces. A financial term sheet does not need decorative motion, a feature grid or illustrations to pass.

The explicit one-report instruction overrides the skill's setup mutations, additional artifacts, outside-voice workflow, implementation/fix loop and commits. Only this file was written. No source changes, new screenshots or browser installation. Existing working-tree changes were left alone.

Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, the r5 audit and font declarations in `index.html`. Opened all seven images below. Dimensions were checked from the files, not inferred from the chat thumbnails.

| Key | Evidence | Dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r6-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r6-390.png) | 390 x 844 |
| DF | [Agreement desktop full page](shots/r6-1440-full.png) | 1440 x 2569 |
| MF | [Agreement mobile full page](shots/r6-390-full.png) | 390 x 4000 |
| C | [Create desktop](shots/r6-create-1440.png) | 1440 x 1110 |
| CM | [Create mobile](shots/r6-create-390.png) | 390 x 1711 |
| V2 | [Owner's previous 6.5/10 version](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

The [live agreement](https://v3-review.pledge-ccs.pages.dev/) and [live create](https://v3-review.pledge-ccs.pages.dev/#/create) could not be fetched through the web tool. `minibhn deepsurge open` also failed: SSH to the background browser host returned `Operation not permitted`. These are access failures in this environment, not evidence that the deployment is down. Visual judgments use the supplied live captures; behavioral findings use the local source. Deployment/source parity is unverified. Different oracle prices and countdowns across captures are expected for live data and are not counted as design inconsistencies.

## First impression, area test and trunk test

The site communicates **a formal agreement with verifiable financial terms**. I notice the ink serif title, the small outline deposit action, and the amber staircase. The first three things my eye goes to are **the agreement title, the available-now row, then the rising dashed line**. One word: **restrained**.

That last focal point is the problem. The photographed agreement has no inventory left. Its largest graphic climbs toward 3 HYPE anyway. The qualifier makes the statement less misleading on desktop, but the shape still wins the scan. On mobile the qualifier is cut off. The most memorable visual is the least certain quantity.

On create, my eye goes to the title, the first numbered field, and the navy review button in the right summary. That is a sensible desktop sequence. On mobile the review action disappears below a long form and a second rendering of its terms. It feels like reading a document twice before completing it.

**Area test:** masthead = product and route switch; header = agreement identity/current inventory; clauses = binding terms; right rail = current status/actions; create article = editable terms; create rail = signing recap. All are identifiable. Figure 1 is the exception: its title names two series, while the visible plot requires four legend keys, an inventory guide and a counterfactual qualifier to explain itself.

**Trunk test:** agreement **PARTIAL, 4/6**; create **PARTIAL, 4/6**. Product, page, sections and available choices are clear in the full captures. Position is implied by the page title and route link rather than a selected navigation state. Search is absent and unnecessary for this two-route scope. The mobile section jumps improve agreement wayfinding materially. Neither route fails the rubric's three-or-fewer threshold. The create screenshot cannot establish focus order or signing-dialog orientation.

## Inferred system and direction fidelity

The captures visibly use a serif display/clause face, sans prose and mono figures. Source identifies Newsreader, Manrope and DM Mono. Declared tokens are bone `#FAF8F3`, ink `#1A1D21`, slate metadata `#5B6470`, navy `#1F3A5F`, amber allowance/lock graphics `#B7791F`, darker amber labels `#8A5A12`, 2px controls and no shadows. Body is 16px/1.6; metadata 13px; heading sizes 18/26/44px. This is a coherent three-family system, with no obvious excess accent colors.

Numbered clauses, rules, an asymmetric rail and a figure/table/source arrangement follow the Term sheet direction. The reference borrowing is structural: object attributes from Sablier, article navigation from Stripe Docs, and evidence presentation from OWID. No reference brand furniture is copied. Amber stays with lock/allowance information. Navy earns its use on actions and fills.

Body contrast is visibly stronger than V2. Slate is secondary rather than the default prose color. Computed live fonts, pixel contrast and touch bounds were inaccessible; these are screenshot observations and source declarations, not a measured accessibility pass. The static medium suits the product. Adding cinematic effects would weaken the document.

## Findings

High = unreliable interpretation or consequential action. Medium = substantial reading, layout or navigation friction. Polish = refinement without a grade deduction. Each finding is charged to one primary category to avoid double counting.

| ID | Severity / category | Where | What |
|---|---|---|---|
| R6-01 | **High / Interaction States** | Header totals, Figure 1, clause 1; `src/App.tsx:62-70,91-103` | **First history-read failure still becomes false numerical certainty.** R6 adds warnings at the top and chart, which is a real repair. But history starts as an empty array. For the exhausted example, a failed first read yields inferred deposited = 0, sold = 0 and proceeds = 0, changing the title and chart. “May be stale” describes an older known value, not a value never obtained. Clause 1 still presents the derived amounts without a local warning. Unknown historical figures must remain unknown; warnings do not legitimize invented zeros. Source-confirmed failure path, not induced live. |
| R6-02 | **Medium / Visual Hierarchy & Composition** | D/DF/MF: Figure 1; `src/App.tsx:32,45-48` | **The hypothetical staircase is still the visual headline.** It takes five sixths of the plotted vertical range above the actual 0.5-HYPE ceiling. The deposited guide, actual ceiling and fill converge at 0.5, making their separate legend entries difficult to reconcile visually. The direct additional-deposit label helps semantics but does not fix hierarchy. Give the actual state first reading priority and make the conditional series visibly subordinate. A larger plot alone cannot solve this. |
| R6-03 | **Medium / Responsive Design** | M: annotation at the chart's right edge; MF: same plot; `src/App.tsx:46` | **The qualifier explaining the hypothetical line is clipped.** At 390px it reads “only if more H…” and exits the plot. This cuts precisely the sentence needed to avoid misreading the rising supply. Place the complete assumption where it fits, wrap it or move it into the caption. The label has a fixed position near day 4 and no width-aware placement. The plot should not need users to reconstruct its most important caveat from the legend. Screenshot-confirmed. |
| R6-04 | **Medium / Spacing & Layout** | M/MF: header through Figure 1 | **Mobile spends most of the first screen repeating context.** The reference starts near y=130, title near y=198, inventory near y=306, lede near y=454, jumps near y=595, figure near y=663. By the bottom of the 844px viewport, the actual fill and inventory line are still below the fold. The lede repeats the immutability promise while clauses repeat the amounts. Reduce redundant opening copy and excess separation so the state and its evidence can be read together. Keep the numbered document, not every desktop paragraph's vertical footprint. |
| R6-05 | **Medium / Spacing & Layout** | CM: form and summary | **Five inputs produce a 1711px create page.** The summary starts around y=1022 and the primary action around y=1434. Large clause padding, repeated recap values and tall locale timestamps do much of the stretching. Reviewing immutable terms is justified; making that review this elongated is not. Tighten the existing form rhythm and date/time hierarchy rather than adding a sticky action that bypasses the recap. Desktop C uses the side-by-side space much better. |
| R6-06 | **Medium / Content & Microcopy** | DF/MF: clause 5 and Ends; deposit description; `src/App.tsx:12,120-121,141,153` | **The signed agreement drops the exact withdrawal time and timezone shown before signing.** “Nov 9, 2026” does not tell a team when its lock ends that day. A moving countdown does not preserve the term for a later reader. Carry the exact timestamp into the signed term and funding confirmation. This is unresolved r5 N09. Source and captures agree. |
| R6-07 | **Medium / Content & Microcopy** | DF/MF: Sale price table, against headline “0 HYPE” | **“Selling permitted” reads as an operational permission even though nothing can be sold.** It is only a price-condition result in source. The current table fails to name that narrower scope. Label the row as a price check and its result as satisfying the floor. Do not make readers resolve the contradiction through clause 2. Screenshot-confirmed ambiguity, not a claim that the contract permits an invalid sale. |
| R6-08 | **Medium / Responsive Design** | Narrow plot logic; `src/App.tsx:30,44,50`; `src/style.css:91` | **The chart's responsive state is not actually tied to layout changes.** Width is sampled from `window.innerWidth` during render, with no resize subscription. At 600-960px CSS stacks the figure while the code keeps desktop geometry and opens the numerical table. A resize alone need not select the narrow label set. The mobile full capture also shows every day label, whereas the source's narrow branch selects alternating days. Verify direct narrow loads and resize behavior; do not assume these captures prove the source branch ran. This is a source-observed fragility and parity question, not a live-reproduced breakpoint failure. |
| P01 | **Polish / Typography** | D/M prose and C/CM recap | Mono values interrupt otherwise smooth sentences. In CM, timestamp text receives the same weight as quantities and consumes multiple lines. Keep exact values but separate the date, time and zone hierarchy. `DESIGN.md` still records a 15px body step while CSS uses 16px; the implementation's readable size should win. |
| P02 | **Polish / Spacing & Layout** | DF: lower right; C/CM: Cancelable cell | The rail has useful content now, but its lower blank tail remains visible in the full-page composition. The create recap ends with a half-width orphan “Cancelable / No” cell. Use the existing material more deliberately. No filler cards are warranted. Desktop sticky behavior is declared in source but was not observed. |
| P03 | **Polish / Content & Microcopy** | C/CM: footer; `src/App.tsx:24` | The create footer explains live figures and fork-simulated rows that are not present on that route. It looks like a shared disclaimer pasted onto the wrong document. A route-specific source note would be cleaner and more credible. |

Do not treat the now-prominent error warning as proof of a reliable data state. The most serious remaining defect is still about what the figures mean, not how dark they are.

## Owner complaints a-d

| Complaint | Fixed? | Judgment against V2 |
|---|---|---|
| a. Disabled button dominated | **Yes in captured state** | The large gray exhaustion button is gone. Exhaustion is text; deposit is an outline action. Create's navy review action is appropriate. Invalid/busy states were not observed, so this is not a universal state pass. |
| b. Right side empty | **Mostly fixed** | Lede, numerical table and substantial status/action rail give the desktop right side a job. The lower blank tail remains, but the column no longer looks abandoned. |
| c. Chart small | **Yes on desktop; mixed on mobile** | Desktop figure is large and readable. Mobile has a full-width figure but its actual state falls below the first viewport and the assumption label clips. Size is fixed; clarity is not. |
| d. Body text too light gray | **Yes** | Main prose is ink and easy to read. Slate is mainly metadata. Do not darken every secondary label or the hierarchy will flatten. |

## R5 findings: fixed versus remaining

“Fixed in source” below is deliberately narrower than “verified live.”

| R5 ID | R6 status | Evidence |
|---|---|---|
| N01: deposit fragment changes selected agreement | **Fixed in source** | Header is now a button that opens deposit or scrolls without changing the hash (`App.tsx:92`). The mobile jumps also avoid hash changes (`:95`). Custom agreement click-through untested. |
| N02: concealed fill-read failure | **Partly fixed** | Header and chart now warn (`:53,92`); initial missing history still produces zeros, and clause 1 remains unqualified. R6-01. |
| N03: discount/floor precision and finite bounds | **Fixed for the cited input cases in source** | Decimal regexes, positivity and upper bounds reject `2.345`, `Infinity` and sub-8-decimal floors (`:85,169`). Signing and encoded terms were not checked against a real deployment. This closes the cited validator cases, not every numeric edge case. |
| N04: zero deposit bypasses actual ceiling cap | **Fixed in source** | `lim(v)` is now always `Math.min(v, deposited)` (`:34`). Zero deposit gives zero actual ceiling. No unfunded live capture was supplied. |
| N05: hypothetical line dominates | **Partly fixed** | Full desktop annotation names the extra-deposit assumption. Visual dominance and coincident actual lines remain; R6-02. Mobile introduces clipping; R6-03. |
| N06: bloated figure explanation/table | **Mostly fixed** | Short title and one source sentence. Mobile exact-value table is behind “Values by day”; desktop retains it beside the plot (`:40,50-53`). Four legend keys remain justified only if the corresponding lines can be distinguished. |
| N07: mobile price hidden offscreen | **Fixed in captured record and source** | MF shows “Sold 0.5 HYPE @ 22.512” beneath Time, with side and hash retained (`:124-125`). The principal sale information is now visible without horizontal scrolling. Longer records untested. |
| N08: mobile operations buried, no jumps | **Substantially fixed** | M/MF show Terms, Sales, Status and actions. Source preserves the route while scrolling (`:95`). The status block still comes last and the jumps scroll away, but the original access defect has been addressed. |
| N09: signed term lacks timestamp/timezone | **Unfixed** | Clause 5, Ends and deposit description still use date-only `dt`. R6-06. |
| P01: lower rail tail/orphan recap cell | **Unfixed polish** | Both remain visible in DF/C/CM. P02. |
| P02: numeric prose/date density and token mismatch | **Unfixed polish** | P01. Readability is acceptable, refinement remains. |

Bounded `node` checks using the current source predicates printed both accepted and rejected cases: floors `5` and `0.00000001` accepted; `Infinity`, `0` and `0.000000001` rejected; discounts `2` and `2.35` accepted; `2.345`, `Infinity` and `100` rejected. Arithmetic confirmed a zero-deposit day-6 ceiling of zero and the first-read-failure inferred totals of zero. These corroborate source reasoning, not browser, mutation or transaction verification.

## Flow and cross-route consistency

I can see what deposit, simulation and review actions intend from the captures. I cannot narrate a completed click flow: browser access failed. Source puts deposit in a controlled dialog, identifies the simulations as read-only, and separates review from final testnet deployment. Those are suitable patterns. Focus return, keyboard access, wallet/network errors, deployment completion and deposit settlement remain unobserved.

The two routes share typography, spacing, rules and button treatment. The strongest inconsistency is informational: create displays exact timed terms, agreement displays dates. The weak shared footer is another instance of component consistency outrunning content relevance.

There is no visible welcome paragraph, self-congratulatory slogan or generic feature pitch. Most prose is useful agreement content. Repetition, not happy talk, inflates mobile. A live rendered-word count was unavailable, so no fabricated word-count percentage is reported.

## Ten-category grades

The requested rubric starts each category at A; each High deducts one grade step, each Medium half a step, Polish none. Use A=0, B=1, C=2, D=3, F=4. Half-step category positions are displayed as the weaker letter; the overall calculation uses the unrounded deductions. Untested runtime categories are explicitly provisional and contribute no invented findings.

| Category | Weight | Grade | Deduction and reason |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | **B** | 0.5: R6-02. Strong document structure, wrong chart focal point. |
| Typography | 15% | **A** | 0: distinctive three-family hierarchy, 16px prose, tabular figures. P01 is refinement. |
| Color & Contrast | 10% | **A** | 0: restrained, readable captured palette. Computed runtime contrast unmeasured. |
| Spacing & Layout | 15% | **B** | 1: R6-04/R6-05. Desktop uses space well; mobile opening and form overextend. |
| Interaction States | 10% | **B** | 1: R6-01. Error disclosure improved; unknown values still look definitive. Other states unobserved. |
| Responsive Design | 10% | **B** | 1: R6-03/R6-08. Better jumps/records, clipped annotation and brittle chart responsiveness. |
| Motion & Animation | 5% | **A, provisional** | 0 confirmed deductions. Restrained color transitions and reduced-motion rule fit a document. Live feel untested. |
| Content & Microcopy | 10% | **B** | 1: R6-06/R6-07. Timed terms lose precision; price-check wording implies sale availability. |
| AI Slop Detection | 5% | **A** | 0: no gradients, bubbly cards, ornamental icons, equal feature grid or generic hero claims. |
| Performance as Design | 5% | **A, provisional** | 0 confirmed deductions. Source declares font preconnect/swap. No measured LCP, CLS or loading experience; this is not a performance pass. |

Weighted deduction = **0.525 grade steps**, nearest overall grade **B**. R5 was B/A; R6 remains B/A with fewer interaction defects and better mobile access. The headline letter is coarse; it does not imply that nothing improved.

**AI Slop verdict: A. This looks authored. The remaining defects belong to information design and state honesty, not template aesthetics.**

## Priority corrections, report only

1. Replace absent-history numerical totals with an explicitly unknown state, including the title, figure and clause 1.
2. Keep the conditional chart annotation fully visible at 390px and give actual deposited/filled information first visual priority.
3. Preserve exact end time and timezone throughout the signed agreement and deposit confirmation.
4. Reduce the mobile opening and create-page vertical footprint using the existing content and structure.
5. Rename “Selling permitted” to a scoped price-condition result and verify chart behavior across direct loads and resizing.

Blind spot: no live click-through, modal, keyboard/focus, wallet, transaction, induced error, tablet or performance verification was possible; source and captures cannot establish those behaviors.

## Scores

These requested 0-10 scores assess the named design dimensions. They are independent of the rubric's weighted letter calculation. Average is rounded to one decimal from 8.0625.

```text
hierarchy=8
layout/space use=7.5
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=9
data/chart clarity=6.5
mobile=7
AVERAGE=8.1 MIN=6.5
```
