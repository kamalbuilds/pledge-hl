# PLEDGE independent design audit: r4

Date: 2026-10-10. Scope: agreement and create routes. Independent critique; no source changes.

Design Score: B
AI Slop Score: A

**The visual direction works. The information design still asks too much of the reader.** This is a credible term sheet with a distinctive figure, not a template landing page. But “Sellable” still means something different from “available to sell,” mobile buries the operational controls, and the signing flow lacks the guardrails its irreversible language promises. Those are the next problems to solve. Another round of serif and hairline polishing would miss them.

## Method and evidence

Applied the requested [design-review skill](/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md): first impression, page-area and trunk tests, system extraction, ten-category checklist, flow review, cross-page consistency, impact-based weighted grading, and regression review. Classified both routes as **app UI**, so cinematic landing-page rules do not apply. The explicit report-only request overrides the skill's fixing, setup, extra-artifact and source-prohibition instructions. No implementation, installation, baseline file, screenshot or external publication was produced.

Screenshot evidence:

| Key | Capture | Dimensions |
|---|---|---|
| D | [Agreement desktop viewport](r4-1440.png) | 1440 x 900 |
| M | [Agreement mobile viewport](r4-390.png) | 390 x 844 |
| DF | [Agreement desktop full page](shots/r4-1440-full.png) | 1440 x 2525 |
| MF | [Agreement mobile full page](shots/r4-390-full.png) | 390 x 4092 |
| C | [Create desktop](shots/r4-create-1440.png) | 1440 x 1110 |
| CM | [Create mobile](shots/r4-create-390.png) | 390 x 1659 |
| V2 | [Owner's previous 6.5/10 version](../../design-research/negative/v2-termsheet-6.5-1440.png) | 1440 x 900 |

The supplied `../../design-research/...` path did not resolve from the workspace root; the same image exists at `web/design-research/negative/` and was opened there. The report link resolves from this report's directory.

Read `src/App.tsx`, `src/style.css`, `DESIGN.md`, `docs/design/REFERENCES.md`, and the previous `design-audit-r3.md`. Targeted inspection of the table component, theme and font declarations clarified rendering decisions. Source line references below describe the current local files, not independently verified deployed code.

Attempted both [live agreement](https://v3-review.pledge-ccs.pages.dev/) and [live create](https://v3-review.pledge-ccs.pages.dev/#/create) via web fetch; both were inaccessible through that tool. `minibhn deepsurge open` failed with an SSH “Operation not permitted” error. These failures do not prove the deployment is down. Screenshots establish appearance at capture time. Live computed styles, font loading, keyboard behavior, simulation results, form validation, wallet flows, transaction completion, tablet rendering, LCP and CLS were not exercised. Source-only findings are identified explicitly.

## First impression, areas and orientation

I see an agreement I would take seriously. My eye goes first to the large serif title, then the amber staircase, then the navy real-fill annotation. The current-balance sentence helps, but the figure remains much more visually prominent than the fact that there is nothing left to sell. One word: **credible**. That credibility makes imprecise financial labels costly.

The masthead, agreement identity, terms, status and draft summary have clear jobs. The figure fails the two-second area test: it contains an exhausted deposit, historical fills and a hypothetical future staircase under one “Sellable allowance” heading. I can identify the parts after reading the legend. I cannot immediately tell which quantity is executable now.

Agreement trunk test: **PARTIAL, 4/6**. Site, page, sections and options are identifiable across the full desktop document. Position in the app is implied; search is absent. Create: **PARTIAL, 4/6**, with the same weak global position cues. Search is unnecessary at this scope and incurs no deduction. On mobile the agreement's clause navigation disappears, reducing local wayfinding precisely where the page becomes longest.

The headlines-only scan communicates a lock agreement, daily cap, price, cancellation rule and term. It does not communicate where to deposit, why a sale cannot run now, or what the chart's cumulative values mean. The page passes the brand and visual-anchor tests; it only partly passes the action test. Numbered clauses earn their space. Decorative cards, shadows and motion would add nothing.

## Binding direction and system fidelity

The visible serif/sans/mono pairing, bone canvas, navy controls, thin rules, numbered clauses and release staircase strongly support the **Term sheet** direction. Newsreader, Manrope and DM Mono are declared; successful runtime font loading is unverified. The source uses bone `#FAF8F3`, ink `#1A1D21`, slate `#5B6470`, navy `#1F3A5F`, amber `#B7791F`, darker amber text `#8A5A12`, and 2px corners. Body prose is now 16px with 1.6 line height; metadata is 13px. Mobile titles are 26px, desktop titles 44px.

The reference borrowing is disciplined: Sablier contributes object attributes, Stripe Docs contributes document navigation, and OWID contributes figure/table/source organization. Their branded furniture is absent. Across agreement and create, type, rules, input treatment, numbered clauses and action styling belong to one system.

Amber is largely confined to deposit/allowance state. However, the hypothetical uncapped path uses the same amber as deposited supply, making a counterfactual look like part of the lock's actual schedule. Pattern differentiation helps; the weak stroke and wording undermine it.

## Findings

High materially affects understanding or safe action. Medium creates meaningful friction. Polish records a smaller defect without a grade deduction. Each finding is charged to one primary category only.

| ID | Severity / category | Where | What and recommended correction |
|---|---|---|---|
| R01 | **High / Content & Microcopy** | D/M/DF/MF: Figure 1 heading, legend and Day/Sellable/Filled table. `src/App.tsx:34-53` | Capping the curve at 0.5 repairs the old exaggerated-supply problem, but the table still says **0.5 Sellable on every future day after all 0.5 has sold**. This is maximum cumulative fills supported by the deposit, not additional sellable inventory. The subtraction is left to the reader. Use “Maximum cumulative fills” and “Cumulative filled,” plus an explicit “Available now: 0 HYPE.” State that the dashed staircase assumes more inventory. Source also bypasses the cap when `deposited` is zero (`lim` at line 34), contradicting “capped by the deposit” for that state. |
| R02 | **Medium / Visual Hierarchy & Composition** | D/M: current-state sentence below title; DF/MF: action rail | The new state sentence is useful, but it is a paragraph of three facts with no route to the next action. “Nothing left to sell” receives less visual weight than the hypothetical staircase. A team scanning the header knows the balance but must hunt for depositing. Give “0 HYPE available” a distinct, compact status treatment and place a clearly named deposit shortcut beside it. Keep the large figure. |
| R03 | **Medium / Responsive Design** | MF: Agreement status, deposit and reconciliation after clause 6. `src/style.css:91-92`; `src/App.tsx:98-157` | Removing rail-first stacking fixes the previous reading-order problem by creating another: operational controls now sit after the entire agreement and simulation section on a **4092px page**. The mobile clause index is also hidden. A returning team member must pass the document to replenish supply. Put compact state/action access near the header, keep the full rail below, and provide a short jump to terms or status. Do not move the whole rail back above clause 1. |
| R04 | **Medium / Spacing & Layout** | D/M/DF/MF: Figure 1 title and legend | The figure explains itself three times: a long heading, a long legend, and a six-row table. Mobile pays for all three in sequence. “Sellable so far: daily maximum, capped by the deposit” is a sentence attached to a tiny swatch, not an efficient key. Shorten the title and series names once R01 is resolved. Keep the numeric table available; remove explanatory repetition rather than deleting exact values again. |
| R05 | **Medium / Color & Contrast** | D/M: dashed uncapped staircase. `src/style.css:37` | The signature staircase's rising part is a 1px amber stroke at 70% opacity. Composited against bone, its declared contrast is about **2.28:1**, below the 3:1 criterion for meaningful chart graphics. It is visibly faint in both viewport images. The darkened amber text is fixed, but the central visual still looks like a fading guide. Give this meaningful series sufficient contrast and thickness, with dashes and a direct label preserving its hypothetical status. |
| R06 | **Medium / Responsive Design** | MF: Record of sales. `src/App.tsx:123-124`; `src/style.css:92` | Mobile now preserves Price, which is a real improvement. It achieves this by hiding both Side and HyperCore hash. There is no disclosure or record detail to recover them. The reader loses the sell/buy qualifier and identifier on the screen most likely to be used for sharing proof. Add a compact expandable record with side and full/copyable hash. Do not restore an unmarked overflowing desktop table. |
| R07 | **High / Interaction States** | C/CM: irreversible draft inputs and Review and sign. `src/App.tsx:164-179,187-191` | **Source-confirmed, not click-tested:** numeric fields have input hints but no validity gate, bounds or field-level error presentation before review/sign. A text input with `inputMode` is not validation. The cap displayed verbatim in the recap is rounded to two decimals in the deployment arguments, so a draft of `0.005` HYPE can describe different terms from the submitted `0.01`. Invalid entries can travel toward the wallet before failing or being rounded. Prevent review until terms are valid and representable; show the exact deployable values and errors beside their fields. A polished signature recap must be accurate. |
| R08 | **High / Interaction States** | DF/MF: live chart, totals and Record of sales. `src/App.tsx:64,68-70,122` | **Source-confirmed error-state gap:** failure of the fill-history read becomes `[]`, which is presented as “No fills yet.” The same array feeds sold totals, proceeds and inferred deposited supply. The chart's proof language can therefore survive a failed read while its historical evidence disappears. Show “Fill history could not be loaded,” preserve or clearly mark the last successful data, and provide retry. Do not assert an empty history from a failed request. This failure was not induced on the preview. |
| R09 | **Medium / Content & Microcopy** | C/CM: Selling starts and Withdrawal opens summary; source signing recap at `src/App.tsx:185,190` | The input chooses a **date and time**, but the summary only shows a date. Withdrawal precision remains date-only even in the signing recap. An irreversible lock ending at 23:00 is not equivalent to one ending at 00:00; locale formatting also conceals the timezone assumption. Show exact start and withdrawal timestamps with timezone in the summary and recap. The omission is source-confirmed; the modal was not rendered in the supplied images. |
| R10 | **Medium / Interaction States** | DF/MF: Deposit HYPE into this agreement. `src/App.tsx:82-84` | **Source-confirmed flow discontinuity:** the carefully styled document hands its irreversible funding step to a native `prompt`. That removes the amount, source balance and consequence from the document's review structure; cancellation is then handled as a failure. Use the existing dialog pattern for a validated amount and an explicit lock confirmation. No new component system is needed. The prompt was not opened live. |
| R11 | **Medium / Interaction States** | D/DF/C: compact links and outline controls; tablet rule at `src/style.css:61,63,77,91-92` | The 44px minimum-height fix applies only below 480px and excludes the annex summary and inline evidence links. At 481-960px the layout becomes mobile-like while controls retain compact desktop sizing. Do not equate the 390px fix with complete touch coverage. Apply touch sizing to standalone controls across the stacked layout. Inline prose links are a separate, less severe concern. Exact runtime bounds were not measured. |
| P01 | **Polish / Spacing & Layout** | DF: blank right column below the status rail; C: Cancelable summary cell | The right side is populated, but the long document still leaves a large static blank tail. The create summary ends with an orphan half-row. These are minor composition defects, not reasons to invent more widgets. Live sticky behavior might reduce the desktop impression while scrolling; it was not tested. |
| P02 | **Polish / Typography and system maintenance** | D/DF/C: numeric sentences; `DESIGN.md` versus `src/style.css:4` | Mono values give prose an uneven texture when many numbers occur in one sentence. Keep mono for data and avoid breaking short quantities into unnecessary visual fragments. Also update the binding scale: DESIGN.md still says 15px body while the implementation correctly uses 16px. This is documentation drift, not a reason to shrink the type again. |

Contrast calculations use declared sRGB tokens, not pixel samples: ink/bone **15.94:1**, slate/bone **5.65:1**, dark amber text/bone **5.57:1**, solid amber/bone **3.43:1**, 70%-opacity amber/bone **2.28:1**. The original small-amber-text failure is resolved. The remaining deduction concerns the graphic stroke.

## Owner complaints a-d

| Complaint | Fixed? | Assessment |
|---|---|---|
| a. Disabled button dominated | **Yes, in the captured agreement state** | The broad gray disabled CTA from V2 is gone. Used allowance is expressed as timeline text; deposit is outline and reconciliation is text. The create primary is appropriately prominent. Other runtime states were not exercised. |
| b. Right side empty | **Mostly** | Desktop now has a lede, chart table and a meaningful status/action rail. This is purposeful space use. DF still has a blank tail beneath the shorter rail, and the first desktop viewport only reaches its heading. It is improved, not fully resolved across the whole scroll. |
| c. Chart small | **Yes** | It is now a substantial signature figure and remains readable at 390px. The problem has moved from size to semantics and the faint hypothetical series. Enlargement should not be confused with clarity. |
| d. Body too light gray | **Yes** | Clauses and lede use dark ink at 16px; slate is mostly metadata. Dark amber now meets small-text contrast. There is no case for darkening the whole interface further. |

## Previous audit: F01-F15 regression check

The previous file is named `design-audit-r3.md` but calls itself “round 2.” This comparison uses its finding IDs, not that inconsistent heading.

| Previous finding | Status in r4 | Evidence / remaining issue |
|---|---|---|
| F01: uncapped chart falsely implied available supply | **Partly fixed** | Solid line/table are capped at 0.5 and the dashed series is distinguished. “Sellable” still labels cumulative capacity rather than remaining inventory; R01. |
| F02: promised selling resumes despite zero inventory | **Fixed in captured state** | Rail now explicitly requires a new deposit and the next allowance; header states nothing is left. `App.tsx:92,150`. |
| F03: start absent from summary and recap | **Fixed for inclusion** | Both dates appear in summary and start appears in signing recap. Timestamp/timezone precision is a new residual issue, R09. |
| F04: implementation vocabulary in core prose | **Mostly fixed** | Precompile addresses and `userFills` are removed from core clauses/source label. Annex uses a plain-language heading. Footer still says “forge fork,” “mocked” and “fork-simulated”; secondary evidence jargon remains. |
| F05: state hidden behind figure | **Fixed for state visibility** | Current locked/sold/proceeds/exhausted condition is directly below the title in D and M. Action prominence remains weaker, R02. |
| F06: term/date inputs too late in create | **Fixed** | Cap, start, term, then sale price. Desktop term is visible before the lower price fields. |
| F07: mobile rail delayed clause 1 | **Fixed for the original defect** | Terms now precede the rail and the index is hidden. This creates the opposite operational-access problem, R03. |
| F08: separated legend symbols and labels | **Fixed** | Each swatch-label pair is grouped, source has its own line. Long labels still cost space, R04. |
| F09: 15px body | **Fixed** | Body token is 16px, including mobile. |
| F10: low-contrast small amber text | **Fixed** | `--amber-text:#8A5A12` yields 5.57:1 on bone. Faint graph stroke is a distinct residual issue, R05. |
| F11: missing mobile chart table and hidden price/hash | **Partly fixed** | Chart table and sales Price are visible in MF. Hash is deliberately removed with no alternate access; R06. |
| F12: mobile create summary/signing before inputs | **Fixed** | CM shows heading, four editable clauses, summary, then primary. Removed rail `order:-1` rule confirms it. |
| F13: vague dangerous-sounding “Attempt it” controls | **Fixed for labels and explanation** | Named “Simulate…” controls plus read-only/no-wallet/no-gas explanation. Actual RPC outcomes remain untested. |
| F14: small touch targets | **Partly fixed** | Main mobile controls now have 44px minimum height below 480px. Stacked tablet controls and other standalone targets remain incomplete; R11. |
| F15: absent pending feedback | **Fixed in source** | Simulation says “Simulating” with `aria-busy`; deposit, sale, reconcile and deployment have pending labels. Runtime announcement/focus behavior remains unverified. |

## Ten-category rubric grades

Each category starts at A. High costs one grade step; Medium costs half; Polish costs none. Steps are A=0, B=1, C=2, D=3, F=4, capped at F. Half-step category grades display the lower letter. Overall uses the unrounded weighted steps and rounds to the nearest letter. Findings are not charged twice.

| Category | Weight | Deductions | Grade | Assessment |
|---|---:|---|---|---|
| Visual Hierarchy & Composition | 15% | R02: 1 Medium = 0.5 | **B** | Clear title/figure/state sequence; next operational action is weakly prioritized. |
| Typography | 15% | None | **A** | Distinctive three-family roles, readable prose and restrained scale. Actual font loading unverified. |
| Color & Contrast | 10% | R05: 1 Medium = 0.5 | **B** | Body and amber labels repaired; meaningful dashed chart series remains faint. |
| Spacing & Layout | 15% | R04: 1 Medium = 0.5 | **B** | Coherent document grid; figure labeling consumes avoidable space. |
| Interaction States | 10% | R07/R08: 2 High; R10/R11: 2 Medium = 3 | **D, provisional** | Source reveals validation, data-error and funding-flow gaps. Direct interaction was unavailable. |
| Responsive Design | 10% | R03/R06: 2 Medium = 1 | **B** | Create order and tables improved; mobile actions and proof detail are still poorly served. |
| Motion & Animation | 5% | None established | **A, provisional** | Explicit 150ms color transitions and reduced-motion handling fit a term sheet. No runtime motion audit. |
| Content & Microcopy | 10% | R01: 1 High; R09: 1 Medium = 1.5 | **C** | Much clearer language; cumulative versus executable supply and exact dates still need precision. |
| AI Slop Detection | 5% | None | **A** | No generic cards, gradients, decorative icons, rounded furniture or promotional filler. |
| Performance as Design | 5% | None established | **A, provisional** | Preconnect and font swap declared. LCP, CLS and perceived loading are unknown. A is the rubric's starting point, not a performance pass. |

Weighted deduction: **0.75 grade steps**, yielding **B**. Previous overall B remains B despite substantial repairs because several newly exposed interaction gaps are consequential. Previous Typography B becomes A, Responsive C becomes B, Content D becomes C; source-based Interaction States C becomes D. The eight numeric scores below assess visual/product quality independently, not a conversion from letters.

AI-slop verdict: **authored financial document**. There is no evidence of the skill's template-pattern cluster. The figure's complexity is domain-specific, although it still needs editing. Do not decorate away its ambiguity.

## Flow review and priorities

**Review an agreement:** The identity, balance and terms now scan well. I can understand the current exhausted state from the header. To act on it on mobile, I must travel through the chart, table and six clauses. The main goodwill drain is that distance, followed by “Sellable” requiring mental subtraction. Simulation labels now tell me what a click does. No simulated flow completion is claimed.

**Draft and sign:** The mobile sequence finally respects the decision: edit before sign. Desktop's summary is strong and the primary is clear. The remaining trust problem is whether the displayed terms are the exact terms the wallet will submit. The source does not justify assuming they are. Validation, precision and exact timestamps belong before the irreversible step.

**Deposit and reconcile:** The controls are visually subordinate in the right way, but source shows a native amount prompt and transaction feedback that needs live verification. The screens do not establish wallet/error recovery quality or a completed deposit. No numerical goodwill score is assigned to interactions that were not experienced.

No generic happy talk was observed. Most words describe terms, state or evidence. There is repetition in the figure/header/rail, not marketing fluff. An exact visible-word percentage would require a rendered DOM and disclosure state, so none is invented.

Candidate quick wins, likely under 30 minutes each before verification:

1. Rename cumulative chart/table measures and state zero currently available explicitly.
2. Restore contrast to the dashed series without making it look like committed inventory.
3. Include exact start/end times and timezone in summary and recap.
4. Add a header jump to agreement actions on mobile.
5. Shorten legend entries after their meaning is corrected.

The validation and failed-history states require targeted failure tests, not just screenshots. Those should precede another visual polish pass.

## Scores

Independent 0-10 scores; unweighted average across the eight requested dimensions. These assess the supplied r4 surface and source evidence, with live-operation uncertainty stated above.

```text
hierarchy=8
layout/space use=7.5
typography=9
colour/contrast=8
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=9
data/chart clarity=6.5
mobile=7
AVERAGE=8.0 MIN=6.5
```
