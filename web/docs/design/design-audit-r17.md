# PLEDGE r17 independent design audit

Design Score: B
AI Slop Score: A

**Verdict:** Keep the v4 Wise direction. The agreement and create pages are product interfaces, and the rejected v3 term-sheet treatment is gone from their main compositions. R17 is a professional-looking B, not a finished financial interface. Mobile still makes the user scroll past a large summary and repeated information to reach the primary action. More seriously, source-defined halted and time-bound states do not consistently govern what the interface promises.

## Scope and method

Reviewed all seven attached screenshots, `src/App.tsx`, `src/style.css`, `src/index.css`, `DESIGN.md`, and `docs/design/design-audit-r16.md`. Applied the requested `/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md` method: first impression, system extraction, page-area test, trunk test, ten-category checklist, flow review, cross-page consistency, and weighted grading. Classified this as APP UI. Functional cards and restrained motion fit the product; decorative imagery would not improve it.

Live inspection was blocked. `minibhn deepsurge open https://v4-review.pledge-ccs.pages.dev` failed with SSH “Operation not permitted”; curl failed DNS resolution; `bhn ls --running` returned no running local browser. Consequently, screenshots establish appearance and source establishes conditional behavior. No executed wallet, simulation, clipboard, explorer-link, modal, performance, or deployed narrow-viewport check is claimed. Business has source evidence only. Expanded-chart appearance is also unobserved.

Only this report was written. The task's explicit audit-only scope overrides the skill's source-fix loop, configuration writes, baseline artifacts, and commits.

## First impression

The site communicates **a token-selling agreement with enforceable constraints**. I notice the dark summary band first, then the large mono totals, then the lime Deposit HYPE button on desktop. These are the correct focal points. The completion card now gets out of the way instead of inflating one fill into a large chart. One word: **operational**.

On the 390px viewport, my experience is different. The navigation takes two rows, the summary ends around y=690, and Today only begins around y=714. At the bottom of the viewport I have barely reached its counter. I still cannot act. The full mobile shot confirms that the primary action follows four more inset values. The page prioritizes explaining itself over letting me use it.

Create is the strongest route. Fields precede the agreement summary on mobile, the lime action is singular, and the irreversible nature of signing is plain. Judges remains a verification handout with a product skin. Moving that handout to a route protects Agreement, but does not remove its document character.

## Observed system and product tests

The screenshots support the intended green-gray canvas, white shadowed cards, dark green band, rounded hierarchy, pill states, and one lime operational action. Source specifies Figtree and JetBrains Mono, 40px desktop summary metrics, 24px mobile metrics, 20px card titles, 24px desktop card padding, and 16px mobile padding. Font loading is configured, but actual loaded faces were not measured. Darker semantic tokens diverge from DESIGN.md; they remain coherent, though the success chip still misses small-text contrast.

- **Does it read as a document anywhere?** Yes: Judges visibly does; Business is a sourced essay in source. Agreement and Create do not. The rules and dates are operational information, not a recurrence of the v3 annex. Judges' numbered clauses still directly conflict with the binding ban.
- **Exactly one primary action?** Yes in the pictured Agreement and Create resting states: Deposit HYPE and Review and sign. Header draft/back controls are secondary. Judges has zero lime actions. That is sensible for a supporting destination, but not literal one-primary-per-page compliance. Source-defined dialogs add their own lime confirmation; background inertness was not inspected live.
- **Statuses chips?** Yes: tinted pills with text and dots. The structure passes. Contrast and state completeness need work.
- **Addresses truncated mono with links?** Yes for the shown contract, team, and transaction references. Mobile can wrap the truncated team address across lines. Its visual treatment passes the requested test; destinations remain unverified. Full addresses inside the copyable curl command are appropriate.
- **Wise fidelity?** Strong. No serif, document rules, rainbow text, decorative circles, generic feature grid, or competing lime metric tile. The supporting-page information architecture remains the exception.

Page-area test: Summary = agreement totals; Today = immediate actions; Schedule = completion/history; Sales = executed fills; Price guard = execution constraints; Try to break it = read-only verification; Term = dates. All have identifiable purposes. Today repeats the order limit and floor subsequently shown in Price guard, making the mobile action path unnecessarily long.

Trunk test: Agreement and Judges pass the applicable identity, purpose, navigation, options, and current-location checks. Create is partial because no page tab is selected, although its heading and Back link explain the task. Search is N/A for this single-agreement workspace, not a missing feature to invent. Business has source-only route identity, not a rendered trunk-test pass.

## Findings

Severity follows the skill: High, Medium, Polish. Screenshot references identify observed surfaces; conditions absent from the screenshots are explicitly source-only extensions.

### R17-01 | High | A halted agreement can still invite a sale

**Where:** Price guard and Today in both full agreement shots; `src/App.tsx:63`, `src/App.tsx:81`, `src/App.tsx:108`, `src/App.tsx:113`.

**What:** In source, `halted` controls the status chip and Price guard but neither Available to sell now nor the sale action. A funded, started, unexpired agreement with allowance can show a positive available amount and an enabled “Trigger today's sale” while the guard says sales halt. The pictured passing-price state does not exhibit this defect; the missing branch is source evidence.

**Why it matters:** The primary control promises an operation the product says is forbidden. A revert is not adequate interface feedback for a predictable condition.

**Change:** Let the price guard govern available-now wording and the action state. Explain which condition must recover before selling resumes.

### R17-02 | Medium | Time-state fixes stop before the rest of the interface

**Where:** Today, Schedule, Term, and hero chips in the full shots; `src/App.tsx:64`, `src/App.tsx:90`, `src/App.tsx:103`, `src/App.tsx:105`, `src/App.tsx:122`, `src/App.tsx:154`.

**What:** Scheduled/ended branches now exist, but the shared panel continues to describe a current window and reset after the term. Schedule still calculates an unclamped day number; a distant future start can yield a negative day, and an expired agreement can exceed “of 30.” Term always says “Selling began” and “Ends in,” even before start or after end. Fully sold outranks Term ended in the hero. These alternate states are source-only, not pictured regressions.

**Change:** Make date labels, day count, and counter explanation follow the same lifecycle as the main action. Preserve both completion and term state when both matter.

### R17-03 | Medium | The mobile primary action is buried beneath duplicated context

**Where:** `r17-390.png`, `shots/r17-390-full.png`; `src/style.css:13`, `src/style.css:85`; `src/App.tsx:104`.

**What:** Today begins roughly 714px down the viewport crop. Deposit sits below the counter, explanation, and four tiles, including prices repeated later. The tall completed-state summary gives zero Available and zero Locked two substantial tiles. Correct ordering has not produced fast access.

**Change:** Bring the action and its eligibility explanation earlier within Today; compact the completed summary and demote repeated price details. Do not add another primary action to compensate.

### R17-04 | Medium | Mobile typography still makes dates and instructions work too hard

**Where:** Both full mobile shots, especially Term and create hints; `src/style.css:64`, `src/style.css:67`, `src/style.css:85`.

**What:** The narrow Term columns fragment full mono timestamps into several lines, burying the difference between start and withdrawal. Create hints are now 14px instead of 12px, an improvement, but important financial explanations and the mobile hero body remain below the audit's 16px body floor. The binding system permits 14px labels; that does not make every instruction a label.

**Change:** Give mobile dates a deliberate hierarchy or full-width rows, retaining timezone information. Promote essential instruction text selectively instead of enlarging every caption.

### R17-05 | Medium | Success chips are below AA small-text contrast

**Where:** Fully sold, Real fills, Sell, and Passes in the supplied agreement shots; `src/style.css:3`, `src/style.css:23`, `src/style.css:25`.

**What:** The 12px green foreground `#1F8A3A` on `#E2F6D5` calculates to approximately **3.86:1**, below 4.5:1. Bold 12px text is not large text. The table-header contrast is fixed: `#4F524D` on `#E8EBE6` is approximately **6.60:1**. Do not confuse that repair with complete contrast compliance.

**Change:** Darken the success-chip foreground sufficiently. Ratios are calculated from source tokens, not deployed pixel samples.

### R17-06 | Medium | The dark-band focus ring disappears into its own surface

**Where:** Hero contract/team links in the agreement crops; `src/style.css:45`.

**What:** Every focused anchor gets an outline of `--band`, the same color as the summary band surrounding those links. The specified outline-to-band contrast is **1:1**. The supplied shots are resting states; the focus defect is source-derived.

**Change:** Use a contrasting focus treatment for links on the band and verify it by keyboard. A global dark outline is insufficient across two surface colors.

### R17-07 | Medium | Stale financial data retains reassuring status without a readable age

**Where:** RPC warning in `r17-390.png`; `src/App.tsx:57`, `src/App.tsx:90`, `src/App.tsx:98`, `src/App.tsx:124`.

**What:** The mobile shot says the last refresh failed while Fully sold remains green and all numbers retain normal weight. Source preserves prior state and history, and the warning explains that choice, but shows no last-successful timestamp or immediate retry action. A completed schedule can remain presented from cached history. Preservation is sensible; unspecified freshness is not enough for a financial decision.

**Change:** Expose when the last successful read happened and a retry control beside the warning. Keep stale values rather than replacing them with misleading zeroes. This is a recovery/freshness issue, not evidence that the pictured values are wrong.

### R17-08 | Medium | Supporting routes still advertise the submission document

**Where:** `shots/r17-judges-1440.png`; `src/App.tsx:21`, `src/App.tsx:178`, `src/App.tsx:193`.

**What:** Judges puts four numbered prose clauses, a wrapped raw command, and an evidence coverage list inside one large card. It unmistakably reads as a handout. Business is a paragraph-led market/revenue explanation in source. Both get equal top-navigation rank with Agreement. This violates the literal no-numbered-clauses direction on Judges and weakens the shell's product identity.

**Change:** Keep evidence separate, but organize verification around direct actions and outcomes. Treat supporting destinations as supporting navigation. Do not hide evidence or replace useful detail with marketing filler.

### R17-09 | Polish | Collapsing the chart fixes space, not the chart's remaining weaknesses

**Where:** Show the schedule chart in both full agreement shots; `src/App.tsx:31`, `src/App.tsx:32`, `src/App.tsx:42`, `src/App.tsx:44`, `src/App.tsx:124`.

**What:** The collapsed completion presentation is a real repair. Source still clips the horizon to the first days and draws filled/ceiling lines that can overlap. Mobile axis text increases to 13 SVG units, approximately 12.4px at the pictured card width, fixing the prior axis-size issue there. The fill annotation remains 12 SVG units, approximately 11.4px. Expanded rendering is not supplied, so this does not receive a fresh visual penalty.

**Change:** Inspect the expanded chart, preserve readable annotation size, and make the comparison/term horizon understandable. Do not reinstate a large default chart for a single completed fill.

### R17-10 | Polish | Unit scale and page titles are still inconsistent

**Where:** Summary metrics in both agreement crops; create/selected navigation in the supplied route shots; `src/App.tsx:17`, `src/App.tsx:93`.

**What:** Available prints HYPE at the same scale as its number; the other metrics demote units. Judges and Business inherit the agreement browser title. Create has no selected navigation item. These are finishing defects, not grounds to reject the visual direction.

**Change:** Standardize units and name browser destinations accurately; make Create's place in navigation explicit.

## R16 regression

| Previous finding | R17 status | Evidence |
| --- | --- | --- |
| R16-01 lifecycle/action | Partially fixed | Scheduled, ended, availability, reset hiding, and withdrawal branches added at App.tsx:79-81 and :103-114. Residual lifecycle copy and halted-action promise remain, R17-01/02. |
| R16-02 oversized completion chart | Fixed for the pictured state | Compact completion row and native disclosure at App.tsx:123-124; full shots confirm reduced footprint. Expanded comparison/horizon unverified, R17-09. |
| R16-03 mobile chart labels | Partially fixed | Axis font becomes 13 SVG units at App.tsx:31. Fill annotation remains 12 units; no expanded shot. |
| R16-04 inset/table contrast | Fixed for the reported defect | Table foreground is now #4F524D, 6.60:1 on its inset. Separate success-chip exception is R17-05. |
| R16-05 navigation targets/arrival | Fixed in source | Tabs now 44px at style.css:74; `go` focuses a tabindex=-1 destination at App.tsx:12. Live keyboard behavior unverified. |
| R16-06 mobile action priority | Partially fixed | Aside now precedes stack in DOM, App.tsx:102/120, matching mobile visuals. Long path to the action remains, R17-03. |
| R16-07 supporting text/date readability | Partially fixed | Muted and check explanations now 16px; hints increase to 14px. Mobile hero, instructions, and fragmented Term timestamps remain, R17-04. |
| R16-08 failure recovery | Fixed for the reported defects in source | Sales consults fillsLoaded/fillsErr at App.tsx:128-129; inconclusive checks retain Retry check at :148. General stale-state freshness remains distinct, R17-07. |
| R16-09 document destinations | Not fixed | Judges still has numbered clauses and a command block; Business still contains an essay. Separation was already present in R16. R17-08. |

R16-10, although outside the requested R16-01 through R16-09 range, also remains: unit scale and destination title, R17-10.

## Ten-category grading

Start at A; High deducts one letter unit, Medium half, Polish zero. Map A=0, B=1, C=2, D=3, F=4; half grades round toward the weaker grade, consistent with R16. A finding can affect multiple categories when its consequences differ. Numeric scores below are separate product judgments.

| Category | Weight | R16 | R17 | Deduction evidence |
| --- | ---: | :---: | :---: | --- |
| Visual Hierarchy & Composition | 15% | B | B | R17-03, R17-08: 1 unit |
| Typography | 15% | B | B | R17-04: 0.5 units |
| Color & Contrast | 10% | B | B | R17-05, R17-06: 1 unit |
| Spacing & Layout | 15% | B | B | R17-03, R17-04 date layout: 1 unit |
| Interaction States | 10% | C | C | R17-01 High; R17-02, R17-07 Medium: 2 units |
| Responsive Design | 10% | C | B | R17-03, R17-04: 1 unit |
| Motion & Animation | 5% | A | A* | No demonstrated defect; named transitions and reduced-motion handling in source |
| Content & Microcopy | 10% | C | C | R17-01 High; R17-02, R17-08 Medium: 2 units |
| AI Slop Detection | 5% | A | A | No demonstrated blacklist pattern; functional repeated cards are appropriate |
| Performance as Design | 5% | A* | A* | Provisional starting grade, no measured performance pass |

Weighted displayed-grade deduction is **1.10**, yielding **B**. Excluding unmeasured performance and renormalizing gives approximately **1.16**, still B. A* is explicitly provisional: motion feel, LCP, CLS, font swap, refresh duration, and load transitions were not observed live. Font swap/preconnect configuration alone cannot prove performance.

AI Slop A means the UI avoids generator defaults. It does not mean original enough to be recognizable without its wordmark. The memorable elements are the green financial summary and mono totals; the rest is competent fintech scaffolding.

## Flow and cross-page review

Source walkthroughs, not executed interactions:

1. **Deposit:** The pictured lime action opens an amount dialog with a dated lock warning and numeric validation. This is a coherent money flow. Stale balance freshness remains unclear before acting.
2. **Create:** The pictured fields lead to the summary and Review and sign, then a final confirmation in source. Inline numeric errors exist. No wallet/deployment outcome or actual modal composition was observed.
3. **Verification:** The pictured read-only buttons provide contract checks; source adds recovery for inconclusive network responses. Judges asks users to leave its page, navigate to Agreement, and locate those controls instead of offering a direct section destination.

No fabricated click timing or goodwill measurement is reported. The skill's heuristic goodwill ledger for the source walkthrough is **70 → 80** for specific primary actions, **80 → 85** for explicit irreversible terms, **85 → 75** for two ambiguous state/freshness decisions, finishing **75/100**. This is an editorial heuristic, not user research.

Shared header, card styling, footer, and palette are consistent across supplied routes. Content density is not: Judges abruptly becomes prose-heavy. No obvious welcome/filler copy appears in the screenshots; financial rules and evidence are useful content. A happy-talk word-count percentage is unmeasured without deployed DOM extraction. Long instructions are concentrated on Judges, where the interaction they compensate for is fragmented verification.

**Priority:** Correct the halted action and lifecycle language first. Then shorten mobile access to the sole primary action and repair success-chip/focus contrast. Keep the compact completion card and create ordering. Another shadow or radius revision would not address the remaining problems.

The following average is the arithmetic mean of the eight requested product dimensions.

```text
hierarchy=8.0
layout/space use=8.0
typography=8.0
colour/contrast=8.5
distinctiveness (not AI-generic)=8.0
fidelity to the v4 wise product direction=9.0
data/chart clarity=7.5
mobile=7.0
AVERAGE=8.0 MIN=7.0
```
