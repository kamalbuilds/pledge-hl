# PLEDGE r15 independent design audit

Design Score: C
AI Slop Score: B

The first screen is a credible fintech interface. The complete dashboard is still a submission document dressed in fintech cards. The v3 visual skin is gone; its document-first information architecture survives. Do not approve this as a completed v4 product interface.

## Scope and method

Reviewed the six supplied screenshots, `DESIGN.md`, `src/App.tsx`, `src/style.css`, and `src/index.css`. Followed the requested gstack design-review method: first impression, rendered system, page-area/trunk checks, ten-category audit, flow review, cross-page consistency, severity triage, and weighted grading. An independent read-only consistency reviewer corroborated the mobile ordering, appendix content, lime competition, status semantics, and team-link exception.

Classified as **APP UI**. The binding contract explicitly requires cards, so necessary chart, sales, and action containers are not violations merely because they are cards. The failure is turning unrelated submission prose into equally prominent workspace cards.

Audit-only scope supersedes the skill's fix loop, ancillary report files, configuration writes, and commits. No source edits were made. Live navigation could not run: remote `minibhn` SSH returned “Operation not permitted”; direct preview curl failed DNS resolution; no local harness session was running. Interaction observations below are screenshot/source walkthroughs, not executed click-throughs. Performance and deployed behavior remain unverified.

## First impression

I see a locked token agreement with a definite selling rule. My eye goes first to the large pledge headline, second to the lime **0 HYPE** tile, and third to the **Deposit HYPE** button. The second focal point is a noninteractive zero. That is wasted emphasis in an action-oriented interface.

At 1440, the dark summary band, mono amounts, white cards, green-gray canvas, and single lime button establish the intended system immediately. At 390, the top remains readable and the dashboard action panel correctly moves ahead of the chart. Then the page continues for **4563 pixels** through proof instructions and a business pitch. One word: **appendix**.

The create route is visually cleaner. Its mobile layout reverses the task: I see a complete agreement summary and signing button before I see the controls that define the agreement.

## Findings

### F01 · High · The document dump survives in the main workspace

**Where:** Both full dashboard screenshots; `src/App.tsx:163`, `src/App.tsx:173`, `src/App.tsx:184`; `src/style.css:60`.

**What:** “For judges: verify on-chain” contains numbered instructions, a wrapped curl command, test transaction references, coverage prose, and planned capabilities. “Business model” adds market totals, competitor fees, a revenue illustration, and a bibliography. None helps a token team operate this agreement. They occupy the same white-card tier as live sales and controls. This directly conflicts with `DESIGN.md:44`, which bans annex document styling and numbered clauses.

**Impact:** The dashboard changes audience halfway down. Repeating card title, chip, insets, paragraph, next card produces a generic stacked report and a large unused right column below the short action panel. This is the skill's stacked-card rejection pattern in the lower workspace, not a rejection of the required functional cards.

**Recommendation:** Move judge evidence and commercial explanation to separate destinations. Keep operational rules, term, fills, and actions in the agreement workspace. Removing shadows would expose this content problem even more clearly.

### F02 · High · Mobile create asks for commitment before configuration

**Where:** `shots/r15-create-390.png`; `src/style.css:80`; `src/App.tsx:205`, `src/App.tsx:216`.

**What:** The global `.panel { order:-1 }` applies to create as well as the dashboard. The signing CTA sits around y=650; editable Terms begin around y=785. A user can review and sign defaults without first encountering a single input. After changing the final field, they must scroll back to submit. CSS visual order also differs from DOM reading and keyboard order.

**Recommendation:** Preserve action-first ordering for the agreement dashboard. On create, place Terms before the summary and signing CTA. A financial commitment flow should follow edit, review, sign.

### F03 · High · Financial labels exceed the data being displayed

**Where:** Summary band; `src/App.tsx:65`, `src/App.tsx:88`, `src/App.tsx:94`. Supporting runtime wiring: `src/chain.ts:10`.

**What:** “Proceeds held” is the sum of sell-fill size multiplied by fill price. It is not a read of the current USDC balance and does not establish net proceeds after fees or withdrawals. The screenshot's 11.26 proves a displayed gross calculation, not custody. “Fully sold” is selected whenever HYPE balance is zero, including an unfunded agreement with no sales.

**Recommendation:** Label the calculation “Gross sale proceeds” unless an actual balance is read. Distinguish “Awaiting deposit” from “Fully sold” using fill history. These are presentation defects established by source, not claims that the pictured contract currently holds a different amount.

### F04 · High · The chart is oversized on desktop and undersized in meaning on mobile

**Where:** Sale schedule in both dashboard screenshots; `src/App.tsx:30`, `src/App.tsx:35`, `src/App.tsx:39`; `src/style.css:55`, `src/style.css:56`.

**What:** A 30-day agreement is presented through a roughly four-day chart without naming that clipped horizon. One immediate 0.5 HYPE fill gives a flat top line and a large empty plotting area. Ceiling and sold lines overlap, making the principal comparison largely invisible. The y-axis does not explicitly identify cumulative HYPE. Mobile retains the geometry and scales SVG text below its nominal 12px size rather than designing a readable small chart.

**Measured:** The ceiling stroke `#7BC24F` on white has approximately **2.17:1** contrast, below the 3:1 graphical-object benchmark. These calculations use specified colors, not a live pixel sample.

**Recommendation:** Name the quantity and visible horizon, preserve readable mobile labels, and give a completed agreement a compact completion-oriented view. Do not spend the main workspace's largest card on an almost empty flat line.

### F05 · Medium · The hero highlights the least useful number and undershoots the metric contract

**Where:** Both dashboard crops; `src/App.tsx:91`; `src/style.css:19`, `src/style.css:21`, `src/style.css:81`; `DESIGN.md:36`.

**What:** The static Available tile consumes a larger lime area than the actionable button. Its value is zero in this state. Metrics are 28px desktop and 20px mobile, versus the contract's 40px mono desktop metrics. The headline dominates while operational numbers read as supporting text.

**Recommendation:** Reserve the strongest lime emphasis for the action; restore stronger desktop numeric hierarchy. There is exactly one primary button in the resting view, but there is not one uncontested primary visual target.

### F06 · Medium · Status meaning changes between routes, and small inset text misses contrast

**Where:** `src/App.tsx:88`, `src/App.tsx:217`; `src/style.css:25`, `src/style.css:36`, `src/style.css:63`.

**What:** “Not cancelable” is a neutral dark chip on the agreement and a red danger chip on create. The same permanent property changes from assurance to apparent error. “Fully sold” uses amber warning styling. Inset labels use `#6B6D69` on `#E8EBE6`, approximately **4.35:1**, below 4.5:1 for small text. White-card captions with that foreground are approximately 5.23:1 and pass; do not indiscriminately condemn every muted label.

**Recommendation:** Use one semantic treatment for immutable terms, reserve red for actual failure, and darken inset labels. Preserve the existing text-plus-dot chips.

### F07 · Medium · Readability and touch targets are weaker than the main buttons suggest

**Where:** `src/style.css:33`, `src/style.css:52`, `src/style.css:58`, `src/style.css:67`, `src/style.css:71`; `src/App.tsx:177`.

**What:** Explanation text is frequently 14px and form hints/legend text 12px. Those are not all decorative captions: they explain resets, locking, and pricing. Section navigation buttons are explicitly 36px high; the inline “Try to break it” action is 28px. These violate the 44px action minimum in `DESIGN.md:40` even though the main buttons meet it.

**Recommendation:** Prioritize readable operational explanations and enlarge undersized controls. Do not add larger decorative elements while shrinking the information needed to use the product.

### F08 · Medium · The mobile fills view drops transaction meaning; the team identity is not inspectable

**Where:** `src/App.tsx:84`, `src/App.tsx:109`, `src/App.tsx:110`.

**What:** Desktop fills show Sell/Buy chips; the replacement mobile list drops side entirely even though it maps the same fills. The surrounding title “Sales” is not a substitute if a buy row is returned. Agreement addresses and transaction hashes use truncated mono explorer links, but the principal team address is a plain mono span with no link or full-address tooltip.

**Recommendation:** Preserve the side chip on mobile or explicitly filter to sells. Use the existing linked `Addr` presentation for the team. Do not claim all addresses are linked today.

### F09 · Medium · Navigation hides its options and does not establish arrival

**Where:** Today panel in full screenshots; `src/App.tsx:14`, `src/App.tsx:156`; `src/style.css:71`.

**What:** Jump-to buttons live in a horizontally scrolling row with the scrollbar hidden. “For judges” is clipped and Business is offscreen without an explicit overflow affordance. Clicks only scroll; they do not update URL state or indicate the selected destination. The row looks like tabs but behaves like document anchors. It strengthens the appendix impression.

**Recommendation:** Expose the operational destinations and indicate arrival. If retaining document destinations elsewhere, name them as links rather than burying them in a disguised tab strip.

### F10 · Medium · Motion ignores reduced-motion preference

**Where:** `src/App.tsx:14`; `src/style.css:38`.

**What:** Section navigation always requests smooth scrolling. No preference check is present for that explicit JavaScript behavior. CSS contains short, purposeful button feedback, which is appropriate for an app; extra cinematic animation is not required.

**Recommendation:** Respect reduced motion for navigation. Do not add animation merely to satisfy a marketing-page checklist.

## Ten-category grades

Applied the skill's deduction model: start at A, subtract one grade for a High finding and half a grade for a Medium finding in each affected category. Shared findings can affect more than one category. Half-grade results are rounded toward the weaker grade for this approval audit. A=0, B=1, C=2, D=3, F=4 deduction units; no E category is used.

| Category | Weight | Grade | Deduction evidence |
| --- | ---: | :---: | --- |
| Visual Hierarchy & Composition | 15% | D | F01 High, F02 High, F05 Medium: 2.5 units |
| Typography | 15% | C | F04 High, F05 Medium, F07 Medium: 2 units |
| Color & Contrast | 10% | B | F04 Medium contrast component, F06 Medium: 1 unit |
| Spacing & Layout | 15% | C | F01 High, F09 Medium: 1.5 units |
| Interaction States | 10% | C | F02 High, F07 Medium, F09 Medium: 2 units |
| Responsive Design | 10% | D | F02 High, F04 High, F08 Medium: 2.5 units |
| Motion & Animation | 5% | B | F10 Medium: 0.5 units |
| Content & Microcopy | 10% | D | F01 High, F03 High, F08 Medium: 2.5 units |
| AI Slop Detection | 5% | B | F01 High repeated-card/document rhythm: 1 unit |
| Performance as Design | 5% | A* | No demonstrated defect; provisional starting grade only, not a performance pass |

The weighted result using the displayed grades is 2.05 deduction units, rounded to **C**. Excluding the unmeasured performance category and renormalizing still yields **C**. The typography is real, the palette coherent, and decoration restrained. The AI Slop B penalizes report-like card cadence, not imaginary purple gradients or generic fonts.

*Performance evidence is limited to source: Google Fonts uses `display=swap` and both origins are preconnected. LCP, CLS, font flash, refresh latency, and loading transitions were not measured. A* must not be used as evidence that those checks passed.*

## Product-direction verdicts

- **Still a document anywhere? Yes.** Judge verification and Business model are an appendix in the product route. White cards do not change their purpose.
- **Exactly one primary action? Yes in each pictured resting route.** Deposit HYPE and Review and sign are the respective sole lime buttons. The lime Available tile competes visually. Open-dialog presentation was not observed.
- **Statuses are chips? Yes.** Text, dot, pill shape, and tint are consistent structurally. Their color semantics are inconsistent.
- **Addresses truncated mono with links? Partly.** Agreement and transaction links pass; team address fails the link requirement. Destination availability was not verified.
- **Wise v4 fidelity? Strong at the top, incomplete as a whole.** Correct palette, fonts, cards, band, pill controls, and desktop 8:4 layout. Metric scale, mobile create ordering, and persistent appendix content fail the contract.

## Trunk and litmus checks

Dashboard trunk: PLEDGE identity, agreement context, local actions, and operational sections are visible. A selected navigation destination is absent. Search is unnecessary for a single-agreement workspace and is marked N/A, not treated as a missing feature. Create trunk: identity and purpose pass; mobile task order fails.

| Litmus | Answer |
| --- | --- |
| Product unmistakable in the first screen? | Yes |
| One strong visual anchor? | Yes, the dark summary band |
| Understandable from headlines alone? | No, the lower route changes audience |
| Each section has one job? | No, judge verification mixes instructions, commands, coverage, and plans |
| Cards necessary? | Partly, functional containers earn them; pitch appendices do not |
| Motion improves hierarchy? | No demonstrated hierarchy benefit; button feedback is useful |
| Premium without shadows? | Top mostly yes; full dashboard no |

## Flow review and quick wins

Source walkthrough: dashboard to Deposit presents a specific amount dialog and date warning, with a clear Lock action. Create defaults to plausible values and offers a confirmation dialog, but mobile exposes signing before editing. Simulation buttons promise clear read-only checks; no live result was exercised. These observations do not prove wallet or transaction success.

The highest-impact small fixes are to scope mobile panel reordering to the dashboard, link the team address, give immutable terms consistent status colors, raise jump-button height, and respect reduced motion. Each is a narrow change suitable for a short fix cycle. Removing appendix content from this route and correcting financial data labels take priority over cosmetic polish, but routing and balance wiring need separate implementation verification.

The requested numeric scores are an independent product-design assessment, not a conversion of the skill's letter grades. Average is the arithmetic mean of the eight dimensions.

```text
hierarchy=6.0
layout/space use=5.5
typography=7.0
colour/contrast=7.5
distinctiveness (not AI-generic)=7.0
fidelity to the v4 wise product direction=6.5
data/chart clarity=4.5
mobile=5.0
AVERAGE=6.125 MIN=4.5
```
