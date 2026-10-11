# PLEDGE design contract (v4, product interface)

Written before code, Oct 11 2026. Replaces the v3 "term sheet" direction, which kamal rejected as a document dump.

## System pick
`wise` from ~/.config/design-md/INDEX.md ("money on a schedule"): white cards on a soft green-gray canvas, a heavy near-black display sans, one vivid lime voltage for the primary action, pill buttons and chips, semantic green / amber / red. BACKED uses a custom dark "night ledger", so this is deliberately the opposite: light, rounded, consumer-fintech. Logged in hyperliquid/DESIGN-PICKS.md.

## Contract (binding)
1. Direction: a fintech dashboard for one lock agreement. A dark summary band with big metrics on top, then cards: a chart card, a sales table card, a rules card with live "try to break it" checks, and a sticky action panel with exactly one lime primary action.
2. Fonts: Figtree (display 800, UI 400/500/600) and JetBrains Mono (addresses, hashes, amounts, tabular numbers). Loaded from Google Fonts:
   `https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap`
   No serif anywhere. Not Inter, Roboto, Arial or system-ui.
3. Palette (CSS variables, see token block). One accent (lime) plus semantic success, warn and danger.
4. Spacing: 4px base, scale 4/8/12/16/24/32/48. Type scale: 12/14/16/20/28/40/56.
5. Layout: app shell, max width 1200px, 12-column grid. At 1440: summary band full width, then 8 columns of cards plus a 4-column sticky action panel. At 390: one column, action panel right after the summary band.

## Token block
```css
:root{
  --canvas:#F2F5EF;      /* page tier */
  --surface:#FFFFFF;     /* cards */
  --surface-2:#E8EBE6;   /* insets, table header, inputs */
  --band:#163300;        /* summary band (Wise ink-deep) */
  --ink:#0E0F0C; --body:#454745; --mute:#6B6D69; --line:#DDE2D8;
  --primary:#9FE870; --primary-hover:#B8F28F; --on-primary:#0E0F0C;
  --positive:#2EAD4B; --positive-bg:#E2F6D5;
  --warn:#B86700; --warn-bg:#FFF4CC;
  --danger:#D03238; --danger-bg:#FBE5E6;
  --radius-card:16px; --radius-input:10px; --radius-pill:9999px;
  --shadow-card:0 1px 2px rgba(14,15,12,.06),0 8px 24px rgba(14,15,12,.06);
  --font-display:"Figtree",ui-sans-serif,sans-serif; --font-sans:"Figtree",ui-sans-serif,sans-serif; --font-mono:"JetBrains Mono",ui-monospace,monospace;
}
```

## Components
- Summary band: 4 metrics (Locked now, Sold to date, Available today, Proceeds), each a 40px mono number over a 12px label, plus status chips (Active / Halted, Not cancelable).
- Status chips: pill, tinted background, text label and a dot, never color alone.
- Cards: white, 16px radius, card shadow, 24px padding, a 20px title row with an optional chip.
- Table: shadcn Table restyled: 12px uppercase header on surface-2, 12px cell padding, row hover, right-aligned tabular numbers, mono hashes truncated `0x1cf9…e50e` with an explorer link.
- Buttons: primary = lime pill (one per page); secondary = white pill with border; ghost = text pill. All 44px tall minimum.
- Chart: area-less step chart in a card. Lime-deep ceiling line, ink fill line, lime dots for real fills.

## Bans
No numbered clauses, no "Figure 1", no annex document styling, no paragraphs where a metric fits, no square-only corners, no plain links as actions.
