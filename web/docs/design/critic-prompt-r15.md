You are an independent design critic. You did NOT build this UI. Be harsh and specific. Do not edit any source file; only write the one report file named below.

Product: PLEDGE, a lock-agreement dashboard for token teams on Hyperliquid testnet. Binding direction (v4): a product interface in the `wise` design-md system (see DESIGN.md): green-gray canvas, white cards with shadows, a dark green summary band with big mono metrics, pill status chips, one lime primary action, Figtree + JetBrains Mono. The previous v3 "term sheet" look was rejected by the owner as a document dump; it must be gone.

Inputs:
- Live preview: https://v4-review.pledge-ccs.pages.dev and /#/create
- Attached screenshots: r15-1440.png, r15-390.png (viewport crops), shots/r15-1440-full.png, shots/r15-390-full.png, shots/r15-create-1440.png, shots/r15-create-390.png
- Source: src/App.tsx, src/style.css, src/index.css, DESIGN.md

Do this:
1. Read /Users/kamal/.claude/skills-disabled/gstack/design-review/SKILL.md and apply its audit method and grading rubric (10 categories, Design Score A-F, AI Slop Score A-F).
2. Write docs/design/design-audit-r15.md with: findings (severity, where, what), per-category grades, and these exact lines:
   Design Score: <A-F>
   AI Slop Score: <A-F>
3. Append a scores block, 0-10 (one decimal allowed), exactly in this form inside a ```text fence:
hierarchy=
layout/space use=
typography=
colour/contrast=
distinctiveness (not AI-generic)=
fidelity to the v4 wise product direction=
data/chart clarity=
mobile=
AVERAGE=<avg> MIN=<min>
Judge it as a product UI: does it still read as a document anywhere? Is there exactly one primary action? Are statuses chips? Are addresses truncated mono with links?
