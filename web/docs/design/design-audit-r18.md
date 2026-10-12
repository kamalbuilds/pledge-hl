# PLEDGE R18 independent design audit

Design Score: B
AI Slop Score: A

The Wise direction survives scrutiny. Agreement and Create are product interfaces. The rejected term-sheet composition is gone from those routes. R18 is still a B: the mobile action is buried, freshness is presented misleadingly, and the signing preview is an estimate dressed as a simulation. Judges remains a document inside the product shell. Do not spend the next iteration on shadows.

## Scope and method

Independent audit, October 11, 2026. Reviewed all seven supplied R18 images, `DESIGN.md`, `src/App.tsx`, `src/style.css`, `src/index.css`, and the R17 report. Consulted the dialog component and font-loading HTML to resolve specific questions. Applied `/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md`: first impression, system extraction, page-area and trunk tests, ten categories, interaction walkthrough, cross-page consistency, weighted deductions, and impact triage. Classification: APP UI. The binding Wise cards and summary band take precedence over the skill's generic aversion to app cards. Decorative motion is not required here.

Only this report is written. The explicit audit-only request overrides the skill's edits, commits, telemetry, setup writes, outside-review orchestration, and extra artifacts.

Live inspection could not run: `minibhn deepsurge open` failed with SSH `Operation not permitted`; `bhn ls --running` returned no active local browser; curl failed DNS resolution; the web fetch could not access the preview. No executed wallet, clipboard, simulation, modal, keyboard, deployed narrow-viewport, or performance pass is claimed. Screenshot evidence establishes resting appearance; source establishes the conditional defects below. Business and expanded-chart appearance are unobserved.

## First impression

The site communicates **money being sold under an enforceable schedule**. I notice a credible dark financial summary, but its brightest tile tells me zero is available. The first three things my eye goes to are the large pledge headline, the lime zero-availability tile, and then Deposit HYPE on desktop. The third disappears below the mobile fold. One word: **explanatory**.

At 1440px, the summary ends at approximately y=425 and Deposit appears near y=804. At 390px, the header consumes about 190px, the summary ends around y=743, and Today starts around y=768. The viewport crop does not reach the primary action. The full mobile screenshot confirms that four more tiles and a counter explanation precede it. That is a poor first minute for a returning user.

Create is cleaner: an explicit irreversible agreement, a short form, and one review action. Judges is visibly a verification handout: four numbered paragraphs, a raw curl command, then an evidence list. A separate route contains the document problem; it does not eliminate it.

## System and orientation tests

The green-gray canvas, white shadowed cards, dark green band, Figtree/JetBrains pairing, mono financial values, and tinted status pills match v4. Fonts are configured and visually consistent with the supplied images; actual loaded faces were not measured. Radius hierarchy distinguishes bands, cards, insets, inputs, and pills. No serif, annex treatment, decorative icons, rainbow gradient, or generic marketing feature grid appears.

Page areas have clear jobs: summary = agreement totals; Today = eligibility and actions; Schedule = cumulative execution; Sales = fills; Price guard = pricing conditions; Break it = contract checks; Term = dates. Today repeats Price guard values before the action. Below the sticky panel, the desktop right column becomes unused while five left-column cards continue. This is readable zoning, but the long lower page behaves like a card stack rather than a compact workspace.

Trunk test: Agreement and Judges clearly identify product, purpose, navigation, options, and current location. Create has a clear task heading and Back control, but no selected page tab. Business is source-only. Search is inapplicable to the single-agreement workflow. Browser titles fail to distinguish Judges and Business from Agreement.

## Findings

### R18-01 | Medium | A lime zero competes with the only primary action

**Where:** `r18-1440.png`, `r18-390.png`, both full Agreement shots; `src/App.tsx:103`, `src/style.css:21`.

**What:** The most vivid metric is Available to sell today, currently zero. The useful completed-state result, 11.26 USDC proceeds, has less prominence. Lime is used for both a large static tile and Deposit, weakening the action's visual monopoly. Mobile access worsened relative to R17: the summary now ends around 743px instead of roughly 690px.

**Change:** Keep the required four metric cards, but give the completed-state outcome priority and reserve the strongest lime treatment for the actionable control. Move the sole action above repeated price tiles within Today. Do not add a duplicate lime button.

### R18-02 | High | The refresh timestamp is not a refresh timestamp

**Where:** Hero metadata in both Agreement crops; `src/App.tsx:66`, `src/App.tsx:90`, `src/App.tsx:96`, `src/App.tsx:108`.

**What:** `updated` is constructed from the current time during rendering, not recorded on a successful fetch. A failed refresh that changes `stale` can therefore display a newer timestamp beside older data. Fill history and contract reads also lack separate last-successful times. The screenshot proves that the trust label is prominent; source proves its meaning is false. The footer's blanket “All figures are read live” is too broad for retained reads.

**Change:** Store actual successful-read times, distinguish contract and fill freshness, and put Retry beside the stale warning. Preserve old values with an honest age. This is a trust defect, not a cosmetic timestamp format issue.

### R18-03 | Medium | The halted button is repaired, but the metric still promises availability

**Where:** Available tile and Price guard in both full Agreement shots; `src/App.tsx:72`, `src/App.tsx:91`, `src/App.tsx:103`, `src/App.tsx:124`.

**What:** The sale button now correctly disables on `halted`. However, `avail` excludes only scheduled and ended states. A funded halted agreement can still display positive “Available to sell today” and its USD consequence above a disabled sale control. The pictured passing-price state does not exhibit this branch.

**Change:** Make executable availability obey the price guard, or explicitly call the value an allowance and separately state that execution is blocked. Do not let the lead metric and action disagree.

### R18-04 | Medium | Time-state language remains internally inconsistent

**Where:** Today, Schedule, Term in full Agreement shots; `src/App.tsx:73`, `src/App.tsx:100`, `src/App.tsx:114`, `src/App.tsx:115`, `src/App.tsx:133`, `src/App.tsx:165`.

**What:** Source still calculates unclamped “Day X of Y,” describes a current window after the term, and says “Selling began” before a future start. “Ends in 0d 0h 0m” replaces a useful ended date. Fully sold suppresses Term ended in the summary chip. These alternate states are source-only findings.

**Change:** Use one lifecycle to govern labels, counter explanations, day bounds, and dates. Keep completion and withdrawal eligibility independently visible when both matter.

### R18-05 | Medium | Mobile dates and instructions are compressed instead of designed

**Where:** `shots/r18-390-full.png`, `shots/r18-create-390.png`; `src/style.css:64`, `src/style.css:67`, `src/style.css:92`.

**What:** Term's two narrow columns fragment each mono timestamp into multiple lines. The date/time/timezone compete at the same weight. Create hints and mobile summary instructions are 14px; important financial instruction is being treated as caption text. The available metric also gives HYPE the number's full scale while the other metrics demote their units.

**Change:** Use full-width mobile date rows with a clear date/time hierarchy. Promote essential instructions to 16px. Standardize number/unit treatment. This does not require enlarging every chip or label.

### R18-06 | High | “Simulated outcome” overstates a price estimate

**Where:** Create screenshots establish the Review and sign entry; unpictured dialog in `src/App.tsx:218`, `src/App.tsx:244`; deposit entry in Agreement shots and dialog at `src/App.tsx:122`.

**What:** Create fetches `allMids` and multiplies the result by cap. That is a market-mid estimate, not the contract oracle named in the preview and not a simulated sale. Failure is silently swallowed and leaves zero, so the preview can show approximately $0 without saying price is unavailable. No funding amount exists yet. Deposit's minimum-day estimate does not explain whether enough selling windows remain before the end. “Any remainder returns to you” also suggests automatic return, while the interface elsewhere requires team withdrawal.

**Change:** Label the scenario as an estimate with its actual source and age; suppress USD estimates when unavailable. Separate maximum permitted sales from expected fills. Show remaining-term capacity and explicitly say the team can withdraw the remainder after the end. A plain-language preview is present in source, but accuracy is not optional.

### R18-07 | Medium | Transaction feedback is complete only for Create

**Where:** Deposit/Reconcile area in full Agreement shots; source-only active states at `src/App.tsx:13`, `src/App.tsx:81`, `src/App.tsx:86`, `src/App.tsx:128`, `src/App.tsx:217`.

**What:** Create has wallet, pending, confirmed, and failed chips with a linked hash. Agreement uses a busy label and a mono text log. Deposit's balance-poll timeout becomes “sent; ... refresh in a minute” and returns through the ordinary completion path. There is no persistent pending/confirmed chip or linked transaction in that flow. The user's money state requires reading a log.

**Change:** Give deposit, sale, reconcile, and withdrawal the same explicit feedback vocabulary. Keep a timed-out balance observation pending/unresolved until a post-condition confirms it. This is a source finding; no transaction was executed for this review.

### R18-08 | Medium | Judges is still the rejected document pattern on a separate route

**Where:** `shots/r18-judges-1440.png`; `src/App.tsx:189`, `src/App.tsx:191`, `src/App.tsx:201`.

**What:** Numbered prose clauses directly violate DESIGN.md's ban. The instruction to leave Judges and find three buttons on Agreement creates avoidable navigation work. Business is likewise a paragraph-led explanation in source. Giving these supporting destinations equal shell rank with Agreement makes the app feel partly like a submission packet.

**Change:** Structure evidence around direct verification actions and concise outcomes, with a direct destination for Break it. Keep the useful command in disclosure. Demote supporting navigation. Moving text to another route is containment, not a full document-pattern fix.

### R18-09 | Medium | Chart tooltip exists, but excludes touch and keyboard discovery

**Where:** Show the schedule chart in both full Agreement shots; unpictured expanded chart at `src/App.tsx:45`, `src/App.tsx:53`, `src/style.css:57`.

**What:** Axes, gridlines, step lines, fill dots, and a contextual tooltip now exist in source. Tooltip access is mouse-only. There is no focusable data target or pointer/touch handler. The chart still uses only the first days, and its latest annotation remains 12 SVG units, smaller after mobile scaling. Expanded appearance cannot be graded as visually repaired from these screenshots.

**Change:** Support pointer/tap and focus access, offer a readable static equivalent, and inspect overlapping ceiling/filled lines and annotation placement at 390px. Keep the compact completed-state default.

### R18-10 | Medium | AA text contrast is repaired; full accessibility is not established

**Where:** Success pills and form inputs in supplied shots; `src/style.css:3`, `src/style.css:65`, `src/style.css:78`; chart and inline links in Agreement source.

**What:** Success text `#17692E` on `#E2F6D5` is approximately **5.93:1**, fixing R17. Amber text is **6.01:1**. The band focus ring is now lime, approximately **9.45:1** against the band. However, input outlines `#DDE2D8` on white are approximately **1.32:1** and are the principal visible field boundary. That misses the 3:1 non-text requirement where the boundary identifies the control. Inline address links do not have 44px touch targets, and visited links have no distinct treatment required by the audit method. The skill's blanket 44px rule is stricter than WCAG AA target-size exceptions; do not conflate them.

**Change:** Strengthen input boundaries or provide another clearly perceivable control treatment. Audit focus, targets, visited states, and chart access across actual rendered states. Ratios here are calculated from source tokens, not sampled deployed pixels; no blanket AA pass is justified.

## R17 disposition

| Prior finding | R18 status | Evidence |
| --- | --- | --- |
| R17-01 halted action | Partially fixed | Sale disabled on halted; executable-availability metric still ignores it. |
| R17-02 lifecycle consistency | Not fixed | Unclamped day and incompatible Term/window wording persist. |
| R17-03 mobile action access | Not fixed, visually worse | Summary grows to approximately 743px; CTA still below counter and four tiles. |
| R17-04 mobile typography/dates | Not fixed | Narrow timestamp columns and 14px instructions persist. |
| R17-05 success-chip contrast | Fixed in source and consistent with shots | Darkened foreground gives 5.93:1. |
| R17-06 band focus contrast | Fixed in source | Band-specific lime outline replaces invisible dark outline; keyboard execution unobserved. |
| R17-07 stale-data recovery | Not fixed | No successful-read age or immediate retry; render-time timestamp makes trust worse. |
| R17-08 supporting document routes | Not fixed | Judges remains numbered prose; Business remains paragraph-led in source. |
| R17-09 chart weaknesses | Partially fixed | Tooltip added; mobile/touch access and expanded rendering remain unresolved. |
| R17-10 units/titles/create location | Not fixed | Full-size Available unit, inherited supporting-page title, no selected Create tab. |

Two complete source repairs, two partial repairs, six unresolved findings. These are evidence-qualified dispositions, not executed regression passes.

## Owner-rule scorecard

| Rule | Judgment |
| --- | --- |
| Lead with primary metric/action | Partial: clear metrics, but the completed-state zero leads and mobile action is below the fold. |
| Every number shows consequence | Improved: summary has USD, percentage-of-cap/deposit, and average sale price. Not universal: Today allowance/pending and Create cap omit comparable USD context. Dates need meaning, not extra currency. |
| Semantic colors plus one accent | Pass palette; partial emphasis. Lime static metric competes with lime action. |
| Exactly one primary action | Pass pictured Agreement and Create resting states. Modal confirmation becomes the active primary via Radix modal structure in source. Judges/Business have zero lime actions, a reasonable supporting-page exception rather than literal compliance. |
| Statuses are chips | Pass resting states and Create transaction source. Agreement transaction feedback is the exception. |
| Truncated mono addresses with links | Pass visible contract, team, and transaction references. Full address in copyable curl is appropriate. Destinations not opened. |
| Plain-language summary and simulated outcome before signing | Partial: summary and numerical preview exist in source; the claimed simulation is arithmetic using a different price source. |
| Pending/confirmed states | Partial: Create implements both; Agreement money actions do not use them consistently. |
| Explorer links, timestamps, network badge | Partial: strong visible links/badge; timestamp semantics fail. |
| Clear zoning and metric cards | Pass desktop composition; mobile prioritization and long lower stack need work. |
| Chart axes/gridlines/tooltip | Present in source; expanded appearance unobserved, touch/keyboard tooltip access fails. |
| WCAG AA contrast | Text-chip repair passes calculated contrast; control boundary remains weak. Full AA compliance unverified. |

## Ten-category grades

Each category starts at A. High findings deduct 1 unit, Medium deduct 0.5; Polish deducts zero. Related findings count in each affected category. Fractional deductions are rounded upward to the next whole-letter deduction for displayed grades; A=0, B=1, C=2, D=3, F=4+. This explicit conservative rounding avoids half-letter ambiguity in the skill.

| Category | Weight | Grade | Deduction and rationale |
| --- | ---: | :---: | --- |
| Visual Hierarchy & Composition | 15% | B | 1.0: R18-01, R18-08. |
| Typography | 15% | B | 0.5: R18-05. |
| Color & Contrast | 10% | B | 0.5: R18-10; repaired success and band focus earn no penalty. |
| Spacing & Layout | 15% | B | 1.0: R18-01, R18-05 date layout. |
| Interaction States | 10% | C | 2.0: R18-03, R18-04, R18-07, R18-09. |
| Responsive Design | 10% | C | 1.5: R18-01, R18-05, R18-09. |
| Motion & Animation | 5% | A* | No demonstrated defect; bounded named transitions and reduced-motion handling in source. |
| Content & Microcopy | 10% | D | 3.0: R18-02 High, R18-06 High, R18-04 Medium, R18-08 Medium. |
| AI Slop Detection | 5% | A | No demonstrated blacklist pattern; recurring financial cards are appropriate to the binding direction. |
| Performance as Design | 5% | A* | Unmeasured starting grade; not a speed or stability pass. |

Weighted displayed-grade deduction = **1.25**, rounded to B. Excluding unmeasured performance and renormalizing gives **1.32**, also B. A* means provisional: no LCP, CLS, font-swap, modal-motion, or refresh-duration measurement. Overall letter remains B versus R17; content trust and mobile readiness remain weaker than the visual polish suggests.

AI Slop A means generator cliches are absent. It does not mean a proprietary identity. Remove the Pledge wordmark and much of this is recognizable consumer-fintech scaffolding. The schedule and execution constraints must provide the distinctiveness; ornamental additions would weaken it.

Litmus: product unmistakable = yes; strong anchor = yes; headlines alone explain page = yes on Agreement/Create, partial on Judges; each area has one job = mostly yes; cards necessary = yes for metrics/actions, less so for isolated dates; motion improves comprehension = source suggests modest feedback, unobserved; works without shadows = yes, zoning survives.

The app-specific rejection pattern is the long mobile stack of read-only cards. It is a real weakness, not grounds to discard the owner-selected card system. There is no generic marketing hero/features/testimonials sequence or happy-talk introduction. Word-count percentage is unmeasured without deployed DOM extraction. Instructions on Judges compensate for a fragmented verification flow.

## Priority and quick wins

First fix truthful freshness and the estimate's unavailable-price branch. Then make the lead metric obey eligibility and bring the sole mobile action forward. Larger work: unify transaction feedback and make chart inspection available without a mouse.

Quick wins, each plausibly under 30 minutes of implementation before verification:

1. Capture the successful contract-read timestamp instead of formatting render time.
2. Put the primary action and eligibility sentence before Today's duplicate price tiles.
3. Use full-width mobile Term date rows.
4. Label the Create arithmetic as a price estimate and show unavailable instead of $0 on fetch failure.
5. Strengthen field borders and give Judges/Business accurate browser titles.

No changes or fixes were applied. Blind spot: signing dialogs, alternate lifecycle states, expanded charts, and deployed behavior were not visually or interactively exercised.

The following eight scores are product judgments, distinct from the skill's weighted ten-category letter grade. Their arithmetic mean is 7.75, displayed to one decimal as 7.8.

```text
hierarchy=7.5
layout/space use=7.5
typography=8.0
colour/contrast=8.5
distinctiveness (not AI-generic)=8.0
fidelity to the v4 wise product direction=8.5
data/chart clarity=7.5
mobile=6.5
AVERAGE=7.8 MIN=6.5
```
