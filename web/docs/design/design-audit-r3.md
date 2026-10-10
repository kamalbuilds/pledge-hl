# PLEDGE independent design audit, round 2

Date: 2026-10-10. Scope: agreement and draft-agreement routes. Report only; no UI changes.

Design Score: B
AI Slop Score: A

The redesign has a convincing visual identity. It is still too easy to misunderstand the agreement's supply and next executable action. Enlarging the signature chart has enlarged its semantic problem. Desktop is substantially better than v2; mobile is a stacked document that needs stronger prioritization.

## Evidence and method

Applied the requested `/Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md`: first impression, area and trunk tests, system extraction, ten-category checklist, flow review, cross-route consistency, and weighted grading. The user's report-only scope overrides the skill's source-editing, extra-artifact, and setup workflows. Source inspection was explicitly requested and supplements screenshot evidence.

Evidence keys:

- D: [desktop viewport](r3-1440.png), 1440 x 900.
- M: [mobile viewport](r3-390.png), 390 x 844.
- DF: [desktop full page](shots/r3-1440-full.png), 1440 x 2414.
- MF: [mobile full page](shots/r3-390-full.png), 390 x 3783.
- C: [create desktop](shots/r3-create-1440.png), 1440 x 1110.
- V2: [previous version](../../design-research/negative/v2-termsheet-6.5-1440.png).

Live access attempted for `https://v3-review.pledge-ccs.pages.dev` and `/#/create`. Web fetch reported inaccessible URLs; local curl failed DNS resolution; `minibhn` failed with an SSH permission error. No local browser session was running. These failures do not establish that the site is down. Screenshots establish appearance at capture time, not current deployment behavior. No wallet action, modal interaction, live font extraction, performance measurement, or tablet rendering was verified.

## First impression and orientation

I see a serious agreement document. My eye goes first to the large serif agreement title, then the amber staircase, then its navy fill annotation. I do not see the current executable action in either viewport capture. One word: **credible**. The credibility makes ambiguous financial labels more consequential.

The masthead, agreement identity, figure, numbered clauses, status rail, and draft form all have identifiable purposes. The figure's distinction between theoretical allowance and available supply does not resolve in a two-second scan. The real-versus-simulated annex requires specialist knowledge.

Agreement trunk test: **PARTIAL, 4/6**. Site, page, sections, and local options are identifiable across the full page. Position within the app is only implied by the masthead link; search is absent. Search is unnecessary for this single-agreement scope and receives no penalty. Create trunk test: **PARTIAL, 4/6**, with similarly limited global orientation.

## Binding direction and extracted system

The screenshots support the intended Newsreader display, Manrope prose, and DM Mono data pairing; runtime font loading remains unverified. Source declares bone `#FAF8F3`, ink `#1A1D21`, slate `#5B6470`, navy `#1F3A5F`, amber `#B7791F`, 2px corners, no shadows, and a 13/15/18/26/44px scale. Numbered clauses, hairline rules, asymmetrical columns, restrained buttons, and the staircase form a coherent Term sheet identity across both routes.

The three references are used structurally: Sablier's attribute rail, Stripe Docs' clause navigation, and OWID's figure/table/source organization. This is a recognizable document interface, not a generic SaaS landing page. The chart/table's meaning needs the same precision as its typography.

## Findings

Impact follows the skill: **High** materially obstructs understanding or action; **Medium** causes meaningful friction; **Polish** does not lower grades. Categories below are the primary category used for scoring, so the same finding is not deducted twice.

| ID | Severity / category | Where and evidence | What is wrong and specific correction |
|---|---|---|---|
| F01 | High / Content | D, M, DF: Figure 1 and its value table; `src/App.tsx:31-53` | The heading says what the contract “may sell,” and the table reaches 3 HYPE despite only 0.5 HYPE deposited. This is an uncapped cumulative allowance curve, not an executable supply schedule. The parenthetical in the legend cannot repair the main claim. Name it “Cumulative allowance,” distinguish available supply explicitly, and label the vertical axis “HYPE, cumulative.” Show the deposit-capped quantity if retaining “May sell.” |
| F02 | High / Content | DF/MF: zero locked balance beside the next-allowance timeline and action explanation; `src/App.tsx:149` | “Selling resumes when the next allowance opens” promises activity when there is zero HYPE left to sell. The term sheet must distinguish time eligibility from inventory. State that another sale requires a deposit and the next allowance. Give the exhausted-supply condition equal prominence to the used-allowance condition. |
| F03 | Medium / Content | C: “You are agreeing to” summary; `src/App.tsx:184,189` | Start is editable but absent from both the summary and signing recap. The recap's “no withdrawal for 30 days” is ambiguous when selling starts in the future. Include the selected start and withdrawal date before signing. The omission is visible in C; modal wording is source evidence only. |
| F04 | Medium / Content | DF/MF: clause prose, source line, annex and footer | `precompile 0x801`, `0x808`, `userFills`, “Funded paths that could not run for real,” and “forge fork” compete with agreement terms. These are useful verification details, but currently require the token-team reader to translate implementation vocabulary. Keep evidence links; make reader-facing labels explicit and put the implementation explanation inside the annex. No generic welcome or promotional filler is visible. |
| F05 | Medium / Hierarchy | D/M viewport compared with DF/MF | The huge figure dominates before the reader learns “0 HYPE locked now.” On desktop the status rail only begins at the bottom of the first viewport; on mobile neither status nor an agreement action appears in the first 844px. Put a compact current-state statement near the title. Preserve the figure's importance without hiding the operational state. |
| F06 | Medium / Hierarchy | C: maximum-sale input followed by floor, discount, start and term | “30 days” is a headline commitment in the right summary, but editing it requires reaching the last clause below the 900px fold. Bring start and term closer to the daily cap, or tighten form spacing so the core commitments can be reviewed together. The current hierarchy favors a long price section over the agreement's dates. |
| F07 | Medium / Spacing & Layout | MF: chart, full status/timeline/actions/index, then clause 1 | The rail becomes a substantial chapter before the document. The first numbered clause is delayed by the entire status rail, and the index adds another block before the terms it points to. Show compact status and the relevant action first; collapse the timeline and index behind clearly named controls. |
| F08 | Medium / Spacing & Layout | M/MF: chart legend | The amber swatch occupies its own line above its description. The navy dot is separated from “Real fill,” while the source text trails over additional lines. These are flex siblings rather than complete legend entries (`src/App.tsx:53`, `src/style.css:40`). Group each symbol with its label; put source attribution on its own line. |
| F09 | Medium / Typography | D/M/DF/MF: prose and compact controls; `src/style.css:4,7,92` | Body prose is 15px, including mobile. It misses the audit's 16px body minimum. The font pairing is strong, but long clauses and technical numbers are unnecessarily small. Raise prose to 16px while retaining 13px for genuine metadata. |
| F10 | High / Color & Contrast | D/M/MF: deposited annotation and “0 HYPE” status; `src/style.css:3,37,70` | Amber on bone calculates to **3.43:1**. That is sufficient for the chart stroke, but fails 4.5:1 for the small amber annotation and 15px locked-balance text. Use ink for the small labels or a darker amber text token. Ink is 15.94:1, slate 5.65:1, and navy 10.82:1 on bone. Ratios are calculated from declared tokens, not runtime samples. |
| F11 | High / Responsive | M/MF: chart and record-of-sales section; `src/style.css:92` | The exact chart value table disappears below 480px. The sales table shows Time, Side and Size while Price and Hash sit offscreen without a visible horizontal-scroll cue. The narrow screen loses the clearest numerical reading and hides verification data. Offer a compact value-table disclosure and visibly indicate horizontal overflow or render each fill as a labeled record. |
| F12 | High / Responsive | MF shows rail before clauses; `src/style.css:91` applies the same rule to create | Agreement stacking is already long; create inherits the same `order:-1` rail rule. Source predicts that mobile users encounter “Review and sign” and default commitments before the draft heading and editable inputs. This is an inappropriate reading order for an irreversible agreement. Keep create's heading and form before its signing summary. Mobile create was not supplied or live-rendered; this is a source-confirmed ordering rule, not a claimed screenshot observation. |
| F13 | High / Interaction States | DF/MF: three “Attempt it” controls under “Cannot cancel”; `src/App.tsx:78,116` | Identical vague controls beneath dangerous-sounding operations leave the reader to infer whether a click simulates a call, requests a wallet signature, or submits a transaction. Say “Simulate cancellation,” “Simulate early withdrawal,” and “Simulate excess sale,” if those are the actual behaviors. Establish the safety and consequence before the click, not after a rejection badge. Under the skill's mindless-choice test, this is high impact. |
| F14 | Medium / Interaction States | M/MF: masthead link, outline actions and clause index; `src/style.css:21,61,63,77` | Many controls do not meet the 44px target-height criterion. The 13px text buttons and tightly spaced index are particularly unforgiving on mobile. Add target padding without making the ink heavier. Exact live bounds were not measured; screenshots and declared styles establish the concern. |
| F15 | Medium / Interaction States | DF/MF: “Attempt it,” “Reconcile fills”; `src/App.tsx:78-79,116,152` | Source provides no pending presentation for attempts. Transaction busy state dims controls without changing their labels; the visible activity log arrives after completion. A silent wait is especially weak for a proof interaction. Add a local pending label and status announcement. This is a state-coverage finding from source, not a measured latency claim. |

## Previous owner complaints

| Complaint | Fixed? | Assessment |
|---|---|---|
| a. Disabled button dominated | **Yes, in the supplied agreement state** | V2's broad filled gray disabled block is gone. Used allowance is communicated by the timeline; deposit is an outline action and reconciliation a text action. Busy and other runtime states were not exercised. |
| b. Right side empty | **Yes for the desktop composition; partly for the whole document** | Lede, figure table and populated status rail use the right side purposefully. DF still has a large blank region below the rail during later clauses. Sticky positioning may help while scrolling, but its live behavior was not verified. Mobile pays for the added rail content with excessive pre-clause length. |
| c. Chart small | **Yes for size; no for clarity** | Figure 1 is now the dominant full-width section, with a substantial plot and desktop table. It is comfortably visible at 390px. Its uncapped allowance and missing mobile table remain problems. |
| d. Body too light gray | **Yes for prose** | Clauses and lede are now dark ink. Slate is mostly reserved for metadata. The remaining color failure is amber small text, not gray body text. |

## Ten-category grades

Each category starts at A; High deducts one grade step and Medium half a step. Polish does not deduct. For displaying whole letters, half grades round toward the lower grade. Numeric steps are A=0, B=1, C=2, D=3, F=4, capped at F. The weighted overall score uses unrounded steps, then the nearest whole grade. This rounding convention makes the skill's unspecified half-grade display explicit.

| Category | Weight | Deductions | Grade | Rationale |
|---|---:|---|---|---|
| Visual Hierarchy & Composition | 15% | F05, F06: 2 Medium | B | Strong title/figure hierarchy, weaker state/action and date hierarchy. |
| Typography | 15% | F09: 1 Medium | B | Excellent family selection; body sizing needs correction. |
| Color & Contrast | 10% | F10: 1 High | B | Restrained, coherent palette; amber small text fails AA. |
| Spacing & Layout | 15% | F07, F08: 2 Medium | B | Desktop grid works; mobile rail and legend consume avoidable space. |
| Interaction States | 10% | F13: 1 High; F14, F15: 2 Medium | C | Unclear proof-action consequences, small targets, weak pending communication. |
| Responsive Design | 10% | F11, F12: 2 High | C | Mobile loses exact values and inherits a problematic signing order. |
| Motion & Animation | 5% | None observed | A | Restrained 150ms color transitions and reduced-motion rule fit the document. Runtime behavior unverified. |
| Content & Microcopy | 10% | F01, F02: 2 High; F03, F04: 2 Medium | D | Supply, eligibility and signing dates need more precise language. |
| AI Slop Detection | 5% | None observed | A | No gradients, decorative icon circles, bubbly cards, generic hero promises or template feature grid. |
| Performance as Design | 5% | No established defect | A, provisional | Font preconnects and swap are declared. LCP, CLS, font flash and responsiveness are unknown. Starting at A is rubric bookkeeping, not performance certification. |

Weighted deduction: **1.175 grade steps**, yielding **B**. The overall letter is provisional because performance and live interactions could not be inspected. A high visual identity grade does not cancel the content defects.

AI-slop verdict: **authored document, not generated-template furniture**. The restraint is real. Do not add decoration to repair the remaining gaps; fix the meaning and reading order.

## Flow review and quick wins

Agreement review: identity is clear, Figure 1 offers a useful proof artifact, but inventory and allowance conflict in the reader's first scan. Deposit/reconcile controls are discoverable only later. Attempt controls need explicit simulation language. No click-through completion is claimed.

Draft and sign: the desktop form carries the same visual system and a clear primary action. The summary omits a user-editable commitment, and the source's mobile ordering puts signing ahead of editing. Wallet connection, errors, dialog focus, and deployment completion remain untested.

Candidate quick wins, estimated under 30 minutes each excluding transaction verification:

1. Relabel theoretical cumulative allowance and give the chart a unit label.
2. Replace unconditional “Selling resumes” with supply-aware wording.
3. Group legend keys with labels; separate the source line.
4. Use ink or contrast-compliant amber for small state text.
5. Name each proof action's actual operation and simulation behavior.

The next review should prioritize chart interpretation, mobile create order, and a signed-out click-through of proof actions. It should not spend another round polishing rules and serif headings while those remain unresolved.

## Scores

These 0-10 scores are an independent product-design assessment, not a conversion of letter grades. Average is unweighted across the eight requested dimensions.

```text
hierarchy=8
layout/space use=7.5
typography=8
colour/contrast=7
distinctiveness (not AI-generic)=9
fidelity to the Term sheet direction=9
data/chart clarity=5
mobile=5.5
AVERAGE=7.4 MIN=5
```
