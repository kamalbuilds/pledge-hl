# PLEDGE design research (2026-10-10, captured with design/refshot-pw.mjs, a Playwright port of ui-craft refshot.py, because bhn deepsurge status hung)

Domain references (vesting, locks, token supply, trading on Hyperliquid): sablier, sablier-stream, streamflow, hyperliquid, uniswap, carta.
Out-of-domain references by problem shape ("a promise with numbered terms that is checked against a record"): legislation, ycdocs, stripe-docs, owid, flighty.
Rejected: tokenomist.ai (homepage and /arbitrum both covered by a partner modal), cryptorank.io (Cloudflare "just a moment" challenge), pulley.com (shutdown modal covers the page), hyperliquid gitbook (404).

## sablier-stream (north star, product screen)
What it is: a single vesting stream detail page, Stream #LK-1-2 (LORDS). The move worth stealing: one object per page. A big streamed-amount figure ("001.2000M", leading zeros dimmed) sits on the left, and a right rail holds an attribute grid of Shape / Status / Vested / Cancelability / Chain / Started, with "Cancelability: Can be canceled" shown as a first-class attribute. h1 Urbanist 30px w600 leading 32px; body text rgb(225,228,234) on near-black; buttons 15px w600 with a 6px radius. Numbers are the hero, the attributes are labels plus values, and the primary action is absent because the stream runs itself. NOT to take: the neon ring gauge, orange glow and dark theme (BACKED owns dark). PNG: refs/sablier-stream-1440.png, refs/sablier-stream-390.png

## sablier (domain, list screen)
What it is: the Vesting app index before a wallet connects. Steal: breadcrumb "Vesting > All # Onchain token vesting. Funds are locked upfront." as a one-line contract statement under a 30px Urbanist w600 h1. The empty state is an explicit "Connect to view your streams" panel with one primary and one secondary action, not a skeleton. Body 14px. NOT to take: the 3D lock and clock illustrations, the orange gradient button glow, or the two equal promo cards. PNG: refs/sablier-1440.png, refs/sablier-390.png

## legislation (outside, statute page)
What it is: legislation.gov.uk Companies Act 2006, section 1. Steal: law as a navigable document. Breadcrumb "UK Public General Acts > 2006 c. 46 > Part 1 > Section 1", tabs for Content / Explanatory Notes, a left rail "What Version: Latest available (Revised) / Original (As enacted)", and a "Changes over time" timeline with a dated node (01/10/2009). h1 Roboto 30.72px w300, h2 17px w500, p 16px w300 leading 23.2px, buttons 3px radius on rgb(5,115,235). Numbered sections are the structure, not decoration. NOT to take: Roboto (banned as display), the busy cookie banner, or the government blue. PNG: refs/legislation-1440.png, refs/legislation-390.png

## ycdocs (outside, legal-instrument landing)
What it is: Y Combinator's SAFE documents page. Steal: a legal instrument presented with confidence. h1 Source Serif 4 72px w500 leading 82.8px colour rgb(22,20,15) on warm white; body Outfit 18px w300 leading 30.6px; one dark pill CTA "Send a SAFE" (bg rgb(34,34,34), radius 4px). Left-aligned "What is a SAFE" definitions read like clauses. NOT to take: the w200/w300 light grey body text (kamal's exact complaint: too light) or the centred hero. PNG: refs/ycdocs-1440.png, refs/ycdocs-390.png

## stripe-docs (outside, reference document with a right rail)
What it is: Stripe Docs "Set the subscription billing renewal date". Steal: a three-column document. Left nav, a 640px prose column with h1 32px w700 leading 40px rgb(26,31,54) and body 13-16px rgb(60,66,87), and a right "On this page" rail that is never empty, plus inline callout boxes ("Use the Accounts v2 API..."). Code terms in a tinted mono chip. The right rail is the answer to "the right side is empty". NOT to take: Stripe's blurple (#635BFF family) or its exact chrome. PNG: refs/stripe-docs-1440.png, refs/stripe-docs-390.png

## owid (outside, data figure with source)
What it is: an Our World in Data grapher, "Share of population living in urban areas, 2025". Steal: the chart is the page. Title Playfair Display 25px w600, subtitle Lato 15px rgb(91,91,91), the figure fills about 70% of the width at 1440, and a right table lists exact values with tabular figures. Tabs Table / Map / Line / Bar, a source line under the figure, and "Download" / "Share" as quiet text buttons. Answer to "the chart is small": give the staircase the full content width. NOT to take: the choropleth palette or the 12px w900 tracked caps h2. PNG: refs/owid-1440.png, refs/owid-390.png

## streamflow (domain, vesting/distribution platform)
What it is: Streamflow's homepage (Solana vesting, airdrops, staking). Steal very little. It is the template we must not become: centred hero, h1 Inter 56px w500 tracking -1.12px in pale cyan rgb(185,238,255) on black, a "70% of STREAM supply burned" pill above the h1, and a logo wall. Logged as the domain's default look and a negative example. PNG: refs/streamflow-1440.png, refs/streamflow-390.png

## hyperliquid (domain, venue)
What it is: app.hyperliquid.xyz/trade, the HYPE-USDC spot book where PLEDGE actually sells. Steal: the order book's 12px OurFont with tabular figures, and the explicit fill rows. Our record of sales should look as exact as their trade history (price, size, time). Background rgb(15,26,30), teal button rgb(80,210,193) with an 8px radius. NOT to take: the teal (banned for PLEDGE), the dark terminal density (that is BACKED's direction). PNG: refs/hyperliquid-1440.png, refs/hyperliquid-390.png

## uniswap (domain, single action)
What it is: app.uniswap.org/swap. Steal: one task, with the number input as the hero. Basel 36px w485 placeholder "0" at rgba(19,19,19,.35) in a centred 480px card, everything else neutral, one pink primary. For PLEDGE: the one primary action (deposit / trigger a sale) should be a real control, never a dominant disabled block. That was kamal's first complaint about v2. NOT to take: the pink, the centred card layout, or the 16-24px radii. PNG: refs/uniswap-1440.png, refs/uniswap-390.png

## carta (domain, cap tables / private capital)
What it is: carta.com homepage. Steal: the serif plus grotesk pairing for financial seriousness. h1 SangBleu Versailles 72px w400 leading 86.4px tracking -2.16px rgb(26,26,26), body Plus Jakarta Sans 16px w400 leading 24px, with near-black text at full strength (rgb(26,26,26), not grey). The line-drawn orbit diagram is data-like rather than decorative. NOT to take: the "Trusted by 50,000 companies" logo wall or the cookie bar. PNG: refs/carta-1440.png, refs/carta-390.png

## flighty (outside, "a term that returns": the live status of a scheduled thing)
What it is: flighty.com. Steal: status over time as a vertical timeline of states (scheduled, departed, delayed) beside a phone frame, each row a status chip plus a time. h1 system-ui 65px w700 tracking -1px. For PLEDGE, the daily sale is a scheduled event with a status: allowed, submitted, filled, refunded. NOT to take: the phone mockup hero or the system font. PNG: refs/flighty-1440.png, refs/flighty-390.png
