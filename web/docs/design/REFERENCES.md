# PLEDGE references: hallmark study DNA cards

Protocol: ~/.agents/skills/hallmark/references/study.md, run in image mode on our own captures, plus measured computed tokens from refshot-pw.mjs (a Playwright port of ui-craft refshot.py, used because bhn deepsurge hung on `status`). The full 11-reference research is in ../../design-research/REFS.md. These three are the north star and two secondaries.

## 1. Sablier stream detail (north star): ref-sablier-stream-1440.png, ref-sablier-stream-390.png, ref-sablier-stream-tokens.json
URL: https://app.sablier.com/vesting/stream/LK-1-2/ (a product screen showing one LORDS vesting stream)
```json
{"source_mode":"image","source":"public-reference","refusal":"ok","macrostructure":"Object Detail (figure + attribute rail)","macrostructure_alt":"Stat-Led",
 "hero":{"archetype":"H4-Stat-Led","knobs":{"figure":"001.2000M with dimmed leading zeros","position":"left 60%"}},
 "nav":{"archetype":"N2","knobs":{"layout":"left app tabs, centred logo, right chain + connect"}},"footer":{"archetype":"none (app)"},
 "display_role":"geometric sans","display_face":"Urbanist 30px w600 lh 32px","body_role":"geometric sans","body_face":"Urbanist 14px w600","label_role":"small sans","pairing_logic":"single family",
 "paper_band":"dark <30","paper_value":"near-black navy","paper_hue":"neutral-cool","accent_hue_band":"orange","accent_footprint":"recurring 5-15%",
 "density":"medium","asymmetry":"asymmetric-grid","treatments":["dark-elevation-lightness","neon ring gauge"],"reveal":"number-tick","anti_patterns":["glow ring","orange gradient CTA"]}
```
Diagnosis: you sent me an Object Detail page. A stat-led figure sits on the left. A right rail holds a two-column attribute grid (Shape, Status, Vested, Cancelability, Chain, Started) under a "Stream #LK-1-2" title with back, share and copy-URL actions. The type is one geometric sans (Urbanist, 30px/600 title, 14px body) on a dark cool surface, with an orange accent at a recurring footprint. Treatments: dark elevation and a neon ring gauge. DNA we take: **one agreement per page, a right attribute rail that always has content, and "Cancelability" as a first-class attribute.** We skip the dark surface, the glow ring and the orange.

## 2. Stripe Docs article (secondary): ref-stripe-docs-1440.png, ref-stripe-docs-390.png, ref-stripe-docs-tokens.json
URL: https://docs.stripe.com/billing/subscriptions/billing-cycle
```json
{"source_mode":"image","source":"public-reference","refusal":"ok","macrostructure":"Reference Document (left nav, prose column, right in-page rail)","macrostructure_alt":"Long-form",
 "hero":{"archetype":"H1-Marquee","knobs":{"scale":"small 32px","subtitle":"24px w400"}},"nav":{"archetype":"N1","knobs":{"tabs":"product tabs row"}},"footer":{"archetype":"Ft2"},
 "display_role":"neutral grotesque","display_face":"system -apple-system 32px w700 lh 40px rgb(26,31,54)","body_role":"neutral grotesque","body_face":"13-16px rgb(60,66,87)","label_role":"monospace chips for code terms","pairing_logic":"single family + mono",
 "paper_band":"light >85","paper_value":"#FFFFFF","paper_hue":"neutral-cool","accent_hue_band":"indigo","accent_footprint":"small <=5%",
 "density":"dense","asymmetry":"asymmetric-grid","treatments":["inline callout box","hairline rules"],"reveal":"none","anti_patterns":["none visible"]}
```
Diagnosis: a three-column reference document. A prose column of about 640px sits between a left section nav and a right "On this page" rail. The type is a single grotesque with mono chips for terms, on white paper with a small indigo accent. Inline callout boxes carry the asides. DNA we take: **a prose column of numbered clauses with a sticky right rail (status, today's sale, action, clause index), so the right side is never empty, and mono for every on-chain figure.** We skip the indigo and the system font.

## 3. Our World in Data grapher (secondary): ref-owid-1440.png, ref-owid-390.png, ref-owid-tokens.json
URL: https://ourworldindata.org/grapher/share-of-population-urban
```json
{"source_mode":"image","source":"public-reference","refusal":"ok","macrostructure":"Figure Page (chart is the page, value table beside it, source line under it)","macrostructure_alt":"Data Story",
 "hero":{"archetype":"H1-Marquee","knobs":{"title":"Playfair Display 25px w600","subtitle":"Lato 15px rgb(91,91,91)"}},"nav":{"archetype":"N1"},"footer":{"archetype":"Ft4 (source + download)"},
 "display_role":"high-contrast serif","display_face":"Playfair Display 25px w600","body_role":"humanist sans","body_face":"Lato 15px","label_role":"uppercase tracked grotesque 12px w900","pairing_logic":"two families",
 "paper_band":"light >85","paper_value":"#FFFFFF","paper_hue":"neutral","accent_hue_band":"cyan-blue","accent_footprint":"flood >15% inside the figure only",
 "density":"dense","asymmetry":"left-biased","treatments":["value table beside chart","source line","tabs Table/Map/Line"],"reveal":"none","anti_patterns":["none visible"]}
```
Diagnosis: a figure page. The chart takes about 70% of the width at 1440, with a sortable value table on the right and a source line plus quiet text buttons (Download, Share) underneath. A serif title (Playfair 25px) pairs with a humanist sans body (Lato 15px). DNA we take: **the release staircase becomes "Figure 1" at full content width: a 760px plot, a value table of day / may sell / filled, and a source line naming the contract reads and HyperCore userFills.** That answers "the chart is small". We skip the choropleth palette.

Candidate catalog cousin: hallmark "Ledger/Archive". We keep the binding DESIGN-DIRECTIONS "Term sheet" tokens instead.
