# PLEDGE r16 independent design audit

Design Score: B
AI Slop Score: A

**Verdict:** The agreement workspace has crossed from a submission document into a product interface. The r15 rejection should not be repeated unchanged. However, this is not an A-grade financial interface: lifecycle states are incomplete, the chart remains disproportionately large for its information, and mobile typography still makes important details work too hard. Approve the visual direction, not the claim that the interface is finished.

## Scope and evidence

Independent audit of all seven supplied images, `src/App.tsx`, `src/style.css`, `src/index.css`, `DESIGN.md`, and the previous r15 report. Applied the requested design-review skill's first impression, system extraction, page-area and trunk tests, ten-category checklist, flow walkthrough, regression comparison, and weighted grading. Classified as APP UI; functional cards, quiet motion, and absence of marketing illustrations are appropriate here.

Visual judgments concern the supplied r16 screenshots. Source establishes implementation conditions, not deployed behavior. The preview could not be opened: `minibhn deepsurge open` failed with SSH “Operation not permitted”; direct curl failed DNS resolution; `bhn ls --running` found no local session. No executed click-through, computed-style extraction, console inspection, performance measurement, or explorer destination check is claimed. Business has source evidence only, with no supplied screenshot. No additional screenshots were captured.

Audit-only instructions override the skill's source-fix loop, extra artifacts, configuration writes, and commit workflow. Only this report was written.

## First impression and rendered direction

I see a token agreement with a measurable selling rule, not a pitch deck. My first three focal points are the pledge headline, the large mono financial metrics, and the lime Deposit HYPE action. Removing the lime zero tile materially improves that sequence. One word: **operational**.

The desktop summary band is confident and legible. White cards, green-gray canvas, soft shadows, pill controls, and dark green establish the Wise direction without copying a logo. The 40px mono metrics finally have the intended weight. On mobile, the same band is tall: at 390px, Today starts near y=668 and its primary action is below the 844px crop. The action-first ordering helps, but the first screen is still mostly context.

The create page now follows edit, review, sign. It is the strongest composition of the set. The judges page is unmistakably a verification handout: numbered prose, a curl block, transaction references, and a coverage list. Separating it fixes the dashboard audience switch; it does not magically turn that destination into a product screen.

Observed/source-supported system: Figtree headings and UI, JetBrains Mono metrics and addresses; 40/20px desktop heading levels, 24/20px mobile; canvas `#F2F5EF`, white surfaces, dark band `#163300`, lime `#9FE870`; 24px desktop card padding, 16px mobile; differentiated card/input/pill radii. Semantic colors are darker than the literal DESIGN.md token block, plausibly to improve contrast. That is a contract divergence, not evidence of palette incoherence. Actual loaded font faces could not be measured.

## Findings

Severity uses the skill's High / Medium / Polish scale. Recommendations are audit findings, not edits made.

### R16-01 | High | Lifecycle labels and the primary action ignore time

**Where:** `src/App.tsx:78`, `src/App.tsx:88`, `src/App.tsx:140`, `src/App.tsx:145`.

**What:** The hero selects Active from balance and price alone. There is no before-start or ended branch. The main action selects Deposit versus Trigger today's sale from remaining allowance and balance alone. A funded future-start agreement can read Active and Available to sell now; an ended agreement can retain a sale/deposit posture and a Today reset countdown. The Term card supplies dates elsewhere, but users should not have to reconcile contradictory states themselves.

**Impact:** A financial interface promises an action at the wrong time. This is more serious than imperfect spacing. The supplied demo does not demonstrate those states; the missing conditions are visible in source.

**Recommendation:** Make the lifecycle govern status, availability wording, countdown, and action together. Show scheduled and ended states explicitly. Do not infer a functioning post-term withdrawal flow from the displayed end date.

### R16-02 | Medium | The completed-state chart spends too much space saying one thing

**Where:** Both full agreement screenshots; `src/App.tsx:32`, `src/App.tsx:42`, `src/App.tsx:102`; `src/style.css:54`.

**What:** The largest desktop operational card contains one early fill and an almost entirely flat line. The ceiling and filled paths coincide until now, so the comparison advertised by the legend is hidden precisely where the actual history exists. “First days of the term” now names the clipped horizon, but there is no route to the full 30-day schedule. The chart is still a large completion statement pretending to be a schedule view.

**Recommendation:** Use a more compact completed-state presentation, or make the plotted comparison and term horizon inspectable. Preserve the honest cumulative-HYPE subtitle and actual fill marker.

### R16-03 | Medium | Mobile chart text still falls below its declared size

**Where:** `shots/r16-390-full.png`; `src/App.tsx:31`, `src/App.tsx:41`; `src/style.css:55`.

**What:** A 340-unit SVG fits approximately 324 CSS pixels inside the 390px card. Nominal 12px axis text therefore renders around 11.4px. The separate narrow geometry and fewer ticks are improvements, but do not meet the skill's 12px caption floor. The mini “now” label and values remain weak beside 20px card headings.

**Recommendation:** Size labels for their rendered dimensions, not the SVG coordinate system. Retain the reduced tick count. No claim is made about 375px or tablet rendering without those views.

### R16-04 | Medium | Small inset text still has a contrast exception

**Where:** Desktop sales header; `src/style.css:47`.

**What:** Table headings retain `#6B6D69` on `#E8EBE6`, approximately 4.35:1, below 4.5:1 for 12px text. The changed key-value labels use darker `#4F524D` and resolve the r15 issue for those labels. The darker chart ceiling resolves its previous low-contrast stroke.

**Recommendation:** Correct the remaining inset foregrounds. Do not darken every caption indiscriminately. Ratios are calculated from specified source colors, not live pixel samples.

### R16-05 | Medium | Secondary navigation remains below the binding target minimum

**Where:** Top tabs in all supplied routes; `src/style.css:74`; `src/App.tsx:21`.

**What:** Page links are 40px high; DESIGN.md requires actions at least 44px. Their 4px container padding is not itself a link hit area. Jump buttons are now 44px and wrap correctly, which fixes the old hidden-overflow problem. However, local jumps still neither move focus nor identify the reached section (`src/App.tsx:12`, `src/App.tsx:155`).

**Recommendation:** Make the page-link hit areas meet 44px and give local jumps a clear arrival behavior. Current-page styling and `aria-current` are already correct for Agreement, Judges, and Business.

### R16-06 | Medium | Mobile action placement is correct but not fast

**Where:** `r16-390.png`, `shots/r16-390-full.png`; `src/style.css:13`, `src/style.css:84`.

**What:** The brand/header, second navigation row, description, statuses, and four metrics consume approximately 650px before the action panel. Then its counter and four more insets precede Deposit. In a fully sold agreement, that is substantial scanning before the only primary action. CSS also moves Today before the stack while DOM order keeps the stack first (`src/App.tsx:99`, `src/App.tsx:139`), so keyboard and assistive reading order do not follow the visible mobile priority.

**Recommendation:** Tighten the completed-state summary and keep visual and semantic action priority aligned. Do not undo the separate create-page ordering fix.

### R16-07 | Medium | Supporting financial text is persistently smaller than the body contract

**Where:** `src/style.css:33`, `src/style.css:52`, `src/style.css:64`, `src/style.css:67`; mobile Term card.

**What:** Operational explanations are 15px, rejection explanations 14px, form labels 14px, and hints 12px. The skill calls for 16px body text. Caption sizing is legitimate for units and metadata, but instructions explaining resets or irreversible inputs should not all be demoted. The narrow Term tiles wrap one timestamp across several mono lines, making a simple date comparison look like a data dump.

**Recommendation:** Promote essential explanation text selectively and simplify the mobile timestamp hierarchy. Keep full timezone information available; do not solve wrapping by silently discarding it.

### R16-08 | Medium | Failure feedback does not consistently offer recovery

**Where:** `src/App.tsx:60`, `src/App.tsx:107`, `src/App.tsx:127`, `src/App.tsx:128`.

**What:** Before fills finish loading, the sales card can say “No fills yet” because its empty state does not consult `fillsLoaded`. Its Real fills chip remains green during unavailable history. After a simulation network failure, a result replaces its button with “Could not check (network)” and offers no retry in that row. The agreement-level loading and stale-data messages are better than this local feedback.

**Recommendation:** Separate waiting, genuinely empty, stale, and unavailable history. Retain or restore a retry action after inconclusive simulations. These are source walkthrough findings; their latency was not measured.

### R16-09 | Polish | Documents are isolated, but remain first-class app destinations

**Where:** `shots/r16-judges-1440.png`; `src/App.tsx:175`, `src/App.tsx:187`, `src/App.tsx:193`; top navigation.

**What:** The judges route still uses numbered instructions and a command dump, violating the literal “No numbered clauses” contract. Business remains a sourced market/revenue paragraph inside a card. Both occupy the same top navigation tier as the actual agreement. This is acceptable audience separation for a demo, but the whole shell still advertises a submission package alongside a workspace.

**Recommendation:** Treat these as explicitly supporting destinations. If literal no-document compliance is required across all routes, redesign the judges checklist into direct verification actions. Do not remove operational controls just because they contain rules. The dashboard's collapsed fork evidence is contained and labeled, not a recurrence of the full appendix dump.

### R16-10 | Polish | Metric units and route identity need a final consistency pass

**Where:** Summary metrics; `src/App.tsx:91`; `src/App.tsx:17`.

**What:** Available prints HYPE at the same large size as its number while the other three metrics demote their units. Judges and Business also inherit an agreement browser title. Create has no selected top-level tab, though its headline and Back link establish its purpose.

**Recommendation:** Use the same numeric/unit hierarchy and identify each browser destination accurately. These are finishing defects, not reasons to reject the system.

## r15 regression: F01 through F10

| Previous finding | r16 status | Evidence and remaining issue |
| --- | --- | --- |
| F01 document dump | Fixed in agreement; residual on supporting routes | Separate hash routes at App.tsx:24. Judges/Business no longer extend the operational stack. R16-09 covers their remaining document character. |
| F02 mobile create ordering | Fixed | `.create .panel { order:0 }` and supplied create-mobile screenshot put fields before review/sign. |
| F03 financial labels | Fixed for the reported defects | Gross sale proceeds is explicit; Fully sold requires known positive sales as well as zero balance. Lifecycle and unavailable-history handling remain separate issues. |
| F04 chart | Partially fixed | Cumulative quantity and clipped horizon named; darker ceiling; narrow geometry and fewer ticks. Flat-state waste, overlap, and small labels remain. |
| F05 lime competition / metric scale | Fixed | Static lime tile removed; desktop metrics are 40px mono. Mobile uses 24px. |
| F06 status semantics / inset contrast | Partially fixed | Fully sold is success; Not cancelable is neutral on create. KV labels darkened. Table-header muted inset text still misses 4.5:1. |
| F07 readability / targets | Partially fixed | Jump and disclosure controls now 44px. Top tabs are 40px; supporting text still undersized. |
| F08 mobile fill side / team link | Fixed | Mobile Sell/Buy chip preserved; team uses linked mono Addr with full-address title. |
| F09 hidden navigation | Mostly fixed | Page routes, visible selected state, wrapping operational jumps. Local jump arrival remains unspecified. |
| F10 reduced motion | Fixed in source | `go` checks preference; CSS disables transitions under reduced motion. Live behavior untested. |

## Ten-category grades

Use A=0, B=1, C=2, D=3, F=4 deduction units, consistent with r15. Start at A; High deducts one unit, Medium half, Polish none. Round half-grade categories toward the weaker grade. Findings can affect multiple categories where their consequences differ.

| Category | Weight | r15 | r16 | Deduction evidence |
| --- | ---: | :---: | :---: | --- |
| Visual Hierarchy & Composition | 15% | D | B | R16-02, R16-06: 1 unit |
| Typography | 15% | C | B | R16-03, R16-07: 1 unit |
| Color & Contrast | 10% | B | B | R16-04: 0.5 units |
| Spacing & Layout | 15% | C | B | R16-02, R16-06: 1 unit |
| Interaction States | 10% | C | C | R16-01 High; R16-05, R16-08 Medium: 2 units |
| Responsive Design | 10% | D | C | R16-03, R16-05, R16-06: 1.5 units |
| Motion & Animation | 5% | B | A | No demonstrated defect; purposeful short feedback and preference handling in source |
| Content & Microcopy | 10% | D | C | R16-01 High, R16-08 Medium: 1.5 units |
| AI Slop Detection | 5% | B | A | No demonstrated blacklist pattern; repeated functional cards are required by the binding system |
| Performance as Design | 5% | A* | A* | Provisional starting grade only; not a performance pass |

Weighted displayed-grade deduction is **1.15**, giving **B**. Excluding unmeasured performance and renormalizing gives approximately 1.21, still B. AI Slop A means the supplied UI avoids the recognizable generator defaults. It does not mean exceptional originality or flawless usability.

Performance blind spot: font swap and preconnect are present in index.html; LCP, CLS, FOUT, refresh delays, busy-state duration, and live responsiveness were not measured.

## Product tests and flow review

- **Does it still read as a document anywhere?** Yes, on Judges and source-defined Business. The agreement now reads as an app. Its Price guard and Term cards explain actionable constraints; their prose alone does not make them an appendix.
- **Exactly one primary action?** Yes on the pictured agreement and create resting views: Deposit HYPE and Review and sign. The header draft/back links are secondary. Judges has zero lime actions; that is a legitimate supporting page, but fails a literal one-per-every-page interpretation. Dialog layering was not observed live.
- **Statuses chips?** Yes, text plus dot and tint. Structure passes; lifecycle completeness does not.
- **Addresses truncated mono with links?** Yes for the shown agreement, team, fill hashes, and evidence transactions. Destination validity and focus contrast on the dark band were not verified.
- **Wise v4 fidelity?** Strong. Correct canvas, surfaces, shadows, dark band, fonts specified, large desktop metrics, pill states, and sole lime operational action. Numbered evidence prose remains a literal contract exception.

Page-area test: Summary, Schedule, Sales, Price guard, Checks, Term, and Today all have identifiable jobs. Judges has one audience but several verification methods. Business is exposition rather than a task surface.

Trunk test: Agreement and Judges identify brand, major routes, current route, and local purpose. Create identifies its task through the headline and Back link but has no selected nav item. Search is N/A for a single-agreement interface. Agreement/Judges pass applicable items; Create is partial. No fabricated missing-search penalty.

Source flow walkthroughs: Deposit offers amount validation and a dated irreversible-lock warning before confirmation. Create now presents fields before summary and a final signing dialog; invalid numeric terms disable review. Simulation promises read-only checks but its inconclusive result loses the retry action. These walkthroughs establish intended presentation, not executed wallet, clipboard, simulation, or transaction outcomes.

No obvious welcome/filler copy appears in the supplied product screenshots. Most prose explains money, constraints, or evidence. A whole-page happy-talk percentage would be misleading without deployed DOM extraction; no count is claimed.

**Priority:** Fix lifecycle presentation and recovery first. Then reduce the completed chart's footprint and improve mobile action/readability. Do not spend another revision merely changing shadows or adding decorative assets.

The requested numeric scores are independent product-design judgments, not conversions of the letter rubric. Average is the arithmetic mean of eight dimensions.

```text
hierarchy=8.0
layout/space use=7.5
typography=8.0
colour/contrast=8.0
distinctiveness (not AI-generic)=8.0
fidelity to the v4 wise product direction=8.5
data/chart clarity=6.5
mobile=7.0
AVERAGE=7.6875 MIN=6.5
```
