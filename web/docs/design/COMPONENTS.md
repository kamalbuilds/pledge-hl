# PLEDGE components (v3)

| Pick | Source | Used for | Restyle |
|---|---|---|---|
| Table | https://ui.shadcn.com/docs/components/table (`uicraft add shadcn/table`) | Figure 1 value table, clause 3 price terms, clause 6 record of sales, Annex A | 13px, DM Mono .num cells, rule borders |
| Dialog | https://ui.shadcn.com/docs/components/dialog (`uicraft add shadcn/dialog`, Radix) | Create: "Review and sign" confirmation | bone surface, 1px ink border, 2px radius, shadow removed |
| Badge | https://ui.shadcn.com/docs/components/badge (`uicraft add shadcn/badge`) | Rejected / Allowed verdicts, real / fork-simulated labels | rounded-full changed to 2px |
| Button | https://ui.shadcn.com/docs/components/button (dependency of Dialog) | Dialog close | transition-all replaced with colour-only |
| Timeline (21st.dev) | https://21st.dev/r/nyxbui/timeline (found with `uicraft 21st timeline`) | meant for the rail's "Today's sale" | not installed, see FALLBACK |

FALLBACK: 21st.dev returned "Marketplace membership required / retrieval_limit_reached (limit 2, resets 2026-10-11 05:30 IST)" on `shadcn add` of nyxbui/timeline, so the rail timeline is a hand-built ol with the same anatomy (16px dot column, 1px connector).
