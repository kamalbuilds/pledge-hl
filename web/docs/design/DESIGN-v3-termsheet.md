# PLEDGE DESIGN.md (v3, 2026-10-10)

Direction: "Term sheet" from /Users/kamal/Desktop/solana/cwf/docs/DESIGN-DIRECTIONS.md, restructured from docs/design/REFERENCES.md (Sablier stream detail + Stripe Docs + OWID figure page).

Macrostructure: Agreement Document. The page runs top to bottom as:
- masthead;
- a header row: reference line, h1, and the lede to the right;
- **Figure 1**, the release staircase at full content width, with a value table;
- two columns: numbered clauses (max 700px) and a sticky **status rail** (380px, ink left rule).

The rail holds an attribute grid (Locked now, Sold today, Cancelable, Floor, Order limit, Ends) and a "Today's sale" timeline (allowance opened, fills, pending, allowance left or used, next-allowance countdown). Below those sit the action and the clause index.

Tokens:
- Surface: bone #FAF8F3.
- Ink #1A1D21 for all body text. v2 used slate for prose, which was the "too light gray" complaint.
- Slate #5B6470 only for 13px metadata (5.6:1 on bone).
- Navy #1F3A5F for the accent, actions and the filled line.
- Amber #B7791F for the lock state and the allowance line only.
- Rule #DDD7CA; red #8A2E1F for rejections.
- Radius 2px everywhere. No shadows.

Type: Newsreader 400/500 for display, clause titles and the figure title. Manrope 400/600 for body and UI. DM Mono 400/500 for every number, address and hash, with tabular figures. Scale: 13 / 15 / 18 / 26 / 44.

Action rule (fixes "the disabled button dominates"): the primary is never rendered disabled. When today's allowance is used, the timeline says so, and the rail offers an outline "Deposit HYPE" button plus a text "Reconcile fills" link. The navy primary "Trigger today's sale" appears only when a sale is possible.

Components: shadcn Table, Dialog, Badge and Button, restyled to these tokens. See docs/design/COMPONENTS.md.

Motion: colour transitions of 150ms only, disabled under prefers-reduced-motion. Banned: glass, gradients, glow, radii over 2px, centred hero, three equal cards, em dashes in copy.
