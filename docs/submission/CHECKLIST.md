# PLEDGE: Colosseum Crypto World's Fair submission checklist

Deadline: October 12, 2026 (colosseum.com/worldsfair). Checked Oct 11, 2026.
Sources: https://colosseum.com/hackathon (portal FAQ), https://colosseum.com/worldsfair, https://tr.superteam.fun/colosseum/submission and https://tr.superteam.fun/colosseum/pitch-coach/pitch-brief.md (community guide, not official rules).

| # | Item | Status | Where |
|---|------|--------|-------|
| 1 | Product name | done | PLEDGE |
| 2 | Description, up to 500 chars, one-liner first | done (draft below, paste into form) | this file |
| 3 | Blockchains and tools integrated | done (text below) | this file |
| 4 | GitHub repo, direct link, public | done: created public after a gitleaks scan (26 commits, no leaks) and a check that none of the 4 local testnet keys appear in history | https://github.com/kamalbuilds/pledge-hl |
| 5 | Live product link and access instructions | done | https://pledge-ccs.pages.dev (testnet, chain 998; read-only works with no wallet; signing needs a browser wallet on HyperEVM testnet with test HYPE) |
| 6 | Pitch video, up to 2 min, public, YouTube/Loom/Vimeo | TODO: script done, video not recorded (needs kamal on camera or voiceover) and upload | docs/pitch/pitch-2min.md |
| 7 | Technical demo video, up to 3 min, separate upload | TODO: silent screen capture done (2:32, 1440x900); needs voiceover following the script, then upload and paste link | docs/pitch/demo.mp4, docs/pitch/demo.webm, docs/pitch/DEMO-SCRIPT.md |
| 8 | Team members with backgrounds | TODO: kamal to fill. Rule: one product per person; with BACKED also submitting, no person may appear on both submissions | form |
| 9 | Team location | TODO: kamal to set (the Superteam Türkiye guide says Türkiye; only use that if it applies) | form |
| 10 | Logo (JPEG/PNG/WEBP/GIF, up to 20MB) | TODO: not made | none |
| 11 | Category / track | TODO: pick in the portal (suggest the DeFi or infrastructure track; Hyperliquid ecosystem) | form |
| 12 | Go-to-market, demand validation, distribution | partly done: business model and sourced market figures on the site (Annex C). TODO: no token team has committed; get at least one quote or LOI | site Annex C, README |
| 13 | Disclosure of prior development | TODO: state in the form what existed before the window (git history starts in this repo; contract and research began Oct 9 to 10) | form, git log |
| 14 | X profile | TODO | form |
| 15 | Outside check that every link opens | TODO: someone outside the team opens the repo, live URL and both video links logged out | none |
| 16 | Weekly 1 minute update video | optional, TODO | none |

## Description draft (under 500 chars)
PLEDGE turns a token team's "we won't dump" promise into a contract. The team locks unlocked supply in a HyperEVM contract that can only sell it on the HyperCore spot book: at most a fixed amount per day, never below a floor, never far below the oracle price. No one can cancel or withdraw early, the team included, and anyone can trigger the daily sale. Live on Hyperliquid testnet with real HyperCore fills.

## Chains and tools
HyperEVM testnet (Solidity, Foundry), HyperCore via precompiles (oracle 0x808, spot balance 0x801) and CoreWriter (IOC spot orders, spot transfers), viem, @nktkas/hyperliquid, React + Vite, Cloudflare Pages, Playwright (wallet E2E).

## Proof links for the form
- Wallet E2E agreement: https://testnet.purrsec.com/address/0x9af101c5d73432510e037dc8b05ec35811de91a5
- Sale tx (filled 0.5 HYPE @ 22.538): https://testnet.purrsec.com/tx/0x5f9fb781be281ef3fe5acfb59c05ca45803314ba46ece30e117bb2f7fe051913
- Demo agreement: https://testnet.purrsec.com/address/0x1cf99b8af3745deef01cc1c29708e10d4538e50e
