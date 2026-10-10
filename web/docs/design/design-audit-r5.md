# PLEDGE independent design audit: r5

2026-10-10. Agreement and create routes. Report only; no implementation changes.

Design Score: B
AI Slop Score: A

**The term sheet has a convincing visual identity. Its financial information and action flow still deserve less trust than its appearance suggests.** R5 addresses the owner's visible complaints. It also improves several r4 findings. However, the new header action can change the agreement being viewed, read failures remain concealed from the headline figures, and the signing recap still accepts values different from the deployed terms. These are more consequential than another typography pass.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, area and trunk tests, inferred system, ten-category audit, flow inspection, cross-route consistency, impact triage and weighted grading. Both routes are **APP UI**. Gradients, full-bleed heroes and cinematic motion would contradict their purpose and binding direction.

The explicit one-file, report-only instruction overrides the skill's fix loop, setup writes, auxiliary reports, commits and source-reading prohibition. I read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, the r4 audit and the font declarations in `index.html`. Existing working-tree changes were left alone.

| Evidence key | Screenshot | Actual dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r5-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r5-390.png) | 390 x 844 |
| DF | [Agreement desktop full page](shots/r5-1440-full.png) | 1440 x 2569 |
| MF | [Agreement mobile full page](shots/r5-390-full.png) | 390 x 4187 |
| C | [Create desktop](shots/r5-create-1440.png) | 1440 x 1110 |
| CM | [Create mobile](shots/r5-create-390.png) | 390 x 1711 |
| V2 | [Owner's previous 6.5/10 version](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

All seven images were opened. The supplied previous-image path did not resolve from the workspace root; `design-research/negative/v2-termsheet-6.5-1440.png` did. The relative link above resolves from this report.

Both [live agreement](https://v3-review.pledge-ccs.pages.dev/) and [live create](https://v3-review.pledge-ccs.pages.dev/#/create) failed through web fetch. `minibhn deepsurge open` failed with SSH “Operation not permitted.” This establishes an access failure here, not a deployment outage. No additional screenshots were captured. Source-based behavior below is explicitly distinguished from screenshot observations; local source parity with the deployment is unverified.

## First impression and orientation

The site communicates **a serious financial agreement**. I notice the unusually restrained serif title and the large amber staircase. The first three things my eye goes to are **the agreement title, the zero-available/deposit row, then the chart**. That sequence is better than V2. One word: **credible**.

The credibility becomes a liability when the chart's most visible feature describes inventory that does not exist. The rising dashed line occupies almost the entire vertical range; the actual agreement's ceiling and fill sit together near the bottom. My eye remembers increasing supply before it remembers an exhausted deposit.

Area test: masthead, agreement identity, current action, clauses, status rail and create summary have immediately identifiable jobs. Figure 1 needs its legend and explanatory paragraph before its distinction between actual capacity and uncapped capacity is clear. The price-table “Selling permitted” status is understandable as a price check, but reads awkwardly beside “0 HYPE available.”

Trunk test: **PARTIAL, 4/6 on each route**. Site, page, major sections and choices are identifiable in the full document. Position within the app is implied rather than explicit; search is absent and unnecessary at this scope. Mobile hides the agreement's clause index. Headlines alone communicate terms, but not the chart's counterfactual assumption or where the long page's operational section sits.

Litmus: brand identifiable **yes**; strong visual anchor **yes**; headlines-only comprehension **partial**; one job per section **mostly**; decorative cards necessary **no, and appropriately absent**; motion improves hierarchy **not applicable to this static document**; premium without shadows **yes**. No instant-rejection template pattern is present.

## Direction and system fidelity

Newsreader display and clause headings, Manrope prose and controls, DM Mono quantities, bone `#FAF8F3`, ink `#1A1D21`, navy `#1F3A5F`, amber lock/allowance graphics and 2px corners form a coherent system. The numbered clauses, hairlines, restrained action rail and large evidence figure support **Term sheet** rather than a generic crypto dashboard. Agreement and create clearly belong to the same product.

Declared body text is 16px with 1.6 line height; metadata is 13px. Source-declared token contrast is approximately ink/bone **15.94:1**, slate/bone **5.65:1**, dark amber text/bone **5.57:1**, solid amber/bone **3.43:1**. These are token calculations, not live pixel measurements. The dashed staircase is now 1.5px at full opacity, resolving the earlier faded graphic. Actual font loading and computed contrast were not measured.

References are used structurally: Sablier's object attributes, Stripe Docs' article navigation and OWID's figure/table/source arrangement. There is no borrowed branded furniture. Amber remains within lock/allowance information. The problem is the prominence and meaning of that information, not palette drift.

## Findings

High affects trustworthy interpretation or safe action. Medium creates substantial reading or navigation friction. Polish receives no grade deduction. Screenshot keys identify the visible surface implicated; they do not pretend to prove unobserved states. Each finding is charged to one primary category.

| ID | Severity / category | Where | What and recommended correction |
|---|---|---|---|
| N01 | **High / Interaction States** | D/M: header “Deposit HYPE”; `src/App.tsx:11,15,97` | **Source-confirmed route collision, not live-clicked.** The shortcut is `href="#status"`, while every hash change is parsed as an app route. `#status` falls back to DEMO. From a custom `#/p/<address>` agreement this changes the selected agreement while offering a deposit action. It also only jumps to a second deposit control instead of opening the promised action. Preserve the current route and either open its deposit dialog directly or perform an explicitly named in-page jump without changing the hash. The clause navigation already prevents the same collision. |
| N02 | **High / Interaction States** | D/M: headline totals and chart; MF/DF: clause 6 error location; `src/App.tsx:62-70,97,122` | **Source-confirmed partial error repair.** Fill failures now preserve the last successful array and show a message, but only in Record of sales, far below the chart. On the first failed history read, the array is still empty: historical sold/proceeds become zero and inferred deposit shrinks. On later failures stale history is mixed with fresh contract state. The headline and figure retain their live-evidence language. Place freshness/error status beside every affected total and figure; withhold unknown historical figures rather than presenting zeros. A warning after six clauses does not qualify the first screen. |
| N03 | **High / Interaction States** | C/CM: sale-price inputs and summary; `src/App.tsx:168-172,183,189,194` | **Source-confirmed remaining recap mismatch.** The cap precision issue is fixed, but discount `2.345` is accepted and shown as `2.345%`, then rounded to `2.35%` for deployment. Floor validation also accepts values below the encoded precision, and `Infinity` passes its positive-number check before conversion fails. The positive-only deposit check has the same finite-number gap (`App.tsx:153-155`). Define finite, representable bounds for each encoded value and show exactly those values in review. This is an irreversible agreement, so “close enough” formatting is not acceptable. |
| N04 | **High / Content & Microcopy** | D/M: ceiling claim and figure; zero-deposit state implicated; `src/App.tsx:34,53` | **Source-confirmed contradiction, absent from supplied populated screenshots.** `lim` caps by inventory only when `deposited > 0`; at zero deposit it returns the full daily schedule. A new, unfunded 0.5-HYPE/day agreement would show a solid ceiling of 3 HYPE on day 6 despite the “capped by deposit” claim. Zero is a real cap. Keep the actual ceiling at zero and identify any uncapped path as hypothetical. Do not declare r4 R01 fully fixed from one funded example. |
| N05 | **Medium / Visual Hierarchy & Composition** | D/M/DF/MF: Figure 1 | The counterfactual staircase is the figure's dominant shape; actual ceiling, deposited-supply guide and fill line overlap at 0.5. This makes the signature recognizable but the actual state hard to compare. Keep the staircase, directly label it “Assumes additional deposits,” and give the funded ceiling/fills priority through labeling or a clearer comparison treatment. “Daily maximum, uncapped” does not name the missing-inventory assumption. |
| N06 | **Medium / Spacing & Layout** | D/M/MF: figure title, table, legend and source paragraph | R5 renames the chart, but still makes the reader process a long title, six nearly identical ceiling rows, four legend entries and three explanatory sentences. Mobile gives all of them separate vertical space before clause 1. Shorten the figure title and keys, label the hypothetical series on the plot, and offer the full numerical table through a clearly named disclosure on narrow screens. Preserve access to exact values. |
| N07 | **Medium / Responsive Design** | MF: Record of sales; `src/App.tsx:123-124`; `src/style.css:92` | Side and hash are restored beneath Time, but **Price remains outside the initially visible narrow table**. The screenshot shows Time and Size, while the source permits horizontal overflow. There is no visible scroll cue. Restoring an offscreen column is incomplete information design. Put size and price together in the compact record, retaining side and hash beneath; keep the desktop table. |
| N08 | **Medium / Responsive Design** | MF: 4187px agreement and bottom status rail; `src/style.css:91` | The new header shortcut improves access in appearance, but the full status/actions remain after six clauses and all simulations, and the local clause index is still hidden. A returning user gets neither a usable section selector nor nearby context for the bottom actions. Add a compact “Terms / Sales / Status” jump mechanism that preserves the agreement route. The new 44px controls help touch accuracy, not orientation. N01 owns the separate routing defect. |
| N09 | **Medium / Content & Microcopy** | DF/MF: clause 5 and status Ends; C/CM for comparison; `src/App.tsx:120,140,152` | Create now displays exact timestamps and timezone, but the signed agreement reverts to date-only dates. The deposit dialog also promises withdrawal “before” a date without the actual time. The countdown helps a current viewer but is a moving relative value, not a durable term. Carry the exact withdrawal timestamp and timezone into the agreement and funding confirmation. This preserves the precision gained in the signing recap. |
| P01 | **Polish / Spacing & Layout** | DF: below short status rail; C/CM: final Cancelable cell | The shorter rail leaves a long empty right tail; the create summary ends in an orphan half-row. The right side is purposeful now, but the full-page composition still feels unresolved. Rebalance existing material or make the final row full width. Do not invent filler widgets. Sticky behavior could improve desktop scrolling; it was not observed. |
| P02 | **Polish / Typography** | D/M: numerical prose; C/CM: timestamp recap; `DESIGN.md` | Mono fragments make numerical sentences choppy, and full locale timestamps dominate otherwise compact summary rows. Keep exact values, but separate date/time hierarchy and avoid awkward quantity breaks. DESIGN.md still records a 15px body scale while CSS uses 16px; update the contract rather than shrinking the implementation. |

Bounded source checks reproduced the route parser's distinction between `#/p/0x1111111111111111111111111111111111111111` and `#status`: the former selects that address, the latter DEMO. Arithmetic checks reproduced `2.345% -> 2.35%` and the zero-deposit day-6 ceiling of 3 HYPE. These checks corroborate source reasoning; they are not browser or transaction tests.

## Owner complaints a-d

| Complaint | Fixed? | Judgment against V2 |
|---|---|---|
| a. Disabled button dominated | **Yes, captured state** | The large gray disabled control is gone. Exhaustion is text; replenishment is an outline action. Create's navy primary earns its emphasis. Invalid/busy runtime states were not viewed. |
| b. Right side empty | **Mostly** | Desktop has a substantive lede, adjacent numeric table and status/action rail. The blank lower tail remains, but this no longer resembles an abandoned column. |
| c. Chart small | **Yes** | The figure is a major page element on desktop and a readable full-width plot on mobile. It now needs clearer actual-versus-hypothetical hierarchy, not more area. |
| d. Body too light gray | **Yes** | Prose is dark ink, with slate reserved mainly for secondary metadata. This is materially better than V2 and should not be “fixed” again. |

## R4 findings: fixed versus remaining

| R4 ID | R5 status | Evidence |
|---|---|---|
| R01: misleading Sellable ceiling | **Partly fixed** | “Ceiling,” cumulative title and subtraction explanation repair the captured funded state. Zero-inventory cap bypass remains; N04. |
| R02: weak state/action emphasis | **Visually fixed; flow regressed** | Available-now row and deposit shortcut are prominent in D/M. Shortcut can change agreement; N01. |
| R03: buried mobile operations | **Partly fixed** | Header access added, but its route handling fails and mobile index remains hidden; N01/N08. |
| R04: repetitive figure explanation | **Partly fixed** | Labels are more accurate, but the title remains long and the mobile table/legend/source stack persists; N06. |
| R05: faded amber staircase | **Fixed in source and appearance** | Full-opacity 1.5px stroke replaces 70%-opacity 1px; D/M and `style.css:37`. Declared contrast now exceeds 3:1. |
| R06: mobile side/hash unavailable | **Fixed for side/hash** | Both appear under Time in MF and `App.tsx:124`. Price is now an offscreen-access problem; N07. |
| R07: invalid terms and cap rounding | **Partly fixed** | Cap rejects more than two decimals; field errors and review gate added. Discount/floor precision and finite bounds remain; N03. |
| R08: read error presented as no fills | **Partly fixed** | Explicit history error, retry and retained prior array added. Top-level historical figures are still unqualified; N02. |
| R09: create timestamp/timezone omitted | **Fixed in shown summary and source recap** | C/CM show date, time and GMT offset; `App.tsx:189,194`. Signed agreement dates remain less precise; N09. |
| R10: native deposit prompt | **Fixed in source; dialog unobserved** | Controlled amount dialog, lock explanation, cancel action and positivity error replace prompt; `App.tsx:151-155`. Balance context and finite validation still need attention. |
| R11: touch sizing only below 480px | **Fixed for specified standalone controls in source** | Rule now covers up to 960px, including annex summary and index links. Inline evidence links remain small; live target bounds unmeasured. |

## Ten-category grades

The skill starts each category at A: High subtracts one grade step, Medium half a step, Polish none. Half grades below are shown as positions between adjacent rubric letters; displayed category grades round toward the weaker letter. Overall weighting uses the unrounded deductions, avoiding double penalties. A=0, B=1, C=2, D=3, F=4.

| Category | Weight | Grade | Deduction / rationale |
|---|---:|---|---|
| Visual Hierarchy & Composition | 15% | **B** | 0.5: N05. Strong document hierarchy, counterfactual dominates figure. |
| Typography | 15% | **A** | 0: purposeful three-family system, readable prose; P02 is polish. |
| Color & Contrast | 10% | **A** | 0: restrained palette; prior meaningful-stroke issue repaired. Live states unmeasured. |
| Spacing & Layout | 15% | **B** | 0.5: N06. P01 is polish. |
| Interaction States | 10% | **D** | 3: N01/N02/N03. Serious route, freshness and review-accuracy gaps. |
| Responsive Design | 10% | **B** | 1: N07/N08. Overflow hides price; long document lacks local navigation. |
| Motion & Animation | 5% | **A, provisional** | 0 confirmed deductions. Restrained transitions and reduced-motion rule are appropriate; feel untested. |
| Content & Microcopy | 10% | **C** | 1.5: N04/N09. Zero-cap claim and timestamp precision remain inconsistent. |
| AI Slop Detection | 5% | **A** | 0: no generic feature grids, bubbly cards, gradients, ornamental icons or canned hero prose. |
| Performance as Design | 5% | **A, provisional** | 0 confirmed deductions. Font preconnect and swap are declared; LCP, CLS and loading experience unknown. This is not a performance pass. |

Weighted deduction: **0.7 grade steps**, nearest overall rubric grade **B**. Provisional categories cannot establish runtime quality. R4 was B/A; R5 remains B/A because visual repairs coexist with consequential residual and new interaction defects. The independent 0-10 scores below assess the requested design dimensions, not transaction reliability.

AI Slop verdict: **A. This looks authored.** It does not look finished in every state. Avoiding template aesthetics is not a substitute for making its terms and actions dependable.

## Quick wins

Recommendations only; no fixes applied. These are plausibly under 30 minutes each in the existing structure, with verification still required:

1. Make the header deposit control open the current agreement's existing dialog; eliminate the fragment-route collision.
2. Add a directly labeled additional-deposits assumption to the dashed staircase and simplify the figure title.
3. Surface fill-history freshness/error next to the headline figures and chart, rather than only in clause 6.
4. Carry exact withdrawal time and timezone into clause 5 and the deposit confirmation.
5. Put mobile fill price beside size in the already existing compact record.

No live flow or measured goodwill score is claimed. Keyboard/focus behavior, modal rendering, wallet actions, error induction, transaction completion, tablet rendering and performance were not exercised. Source checks and screenshots cannot close those gaps.

## Scores

```text
hierarchy=8
layout/space use=7.5
typography=8.5
colour/contrast=9
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=9
data/chart clarity=6.5
mobile=6.5
AVERAGE=8.0 MIN=6.5
```
