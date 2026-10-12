# PLEDGE: pitch script (Colosseum brief)

Brief: "Tell us what you're building, and tell us why you're the people to build it."
Spoken by Kamal, first person. About 300 spoken words, under 2 minutes at a normal pace.

---

**What I'm building (0:00 to 1:05)**

Hi, I'm Kamal. I'm building PLEDGE.

When a token unlocks, everyone asks one question: is the team going to dump? Today the answer is a blog post, or a market maker deal nobody can see. In 2025, about 97 billion dollars of tokens unlocked, and about 19 billion of that went to insiders.

PLEDGE turns the promise into a contract on Hyperliquid. The team locks its tokens in PLEDGE. After that, only the contract can sell them. It sells on the Hyperliquid order book, at most a fixed amount per day, never below a floor price. Nobody can cancel it or pull the tokens out early, not even the team.

Hyperliquid's own TWAP orders can be cancelled and stop after 7 days. PLEDGE runs for months and cannot be cancelled.

It works on testnet today. We locked HYPE, the contract sold it, and the order filled on the real testnet book. The team pays a 0.25% fee, only on what actually sells.

**Why me (1:05 to 1:50)**

How I work: I try to break my own product first. My first version let any caller set the sale price, so a griefer could burn the day's allowance with an order that never fills. I found it, made the contract set the price itself, and tested it.

And I can show it, not just say it. On testnet I tried to cancel a live agreement and to pull the tokens out early, and both transactions reverted on chain. The fee is just as checkable: a real sale grossed 11.42 USDC, the contract paid exactly 0.0286 USDC to the fee address, and the team kept the rest. I also broke each of the 12 fee guards on purpose, one at a time, and a test failed every time.

**Ask (1:50 to 2:00)**

I'm looking for the first Hyperliquid teams to pledge their next unlock. Try it at pledge-ccs.pages.dev.

---

## Sources
- Cancel reverts on chain: https://testnet.purrsec.com/tx/0x6c32d94980ccd9ea5a50b2f636ef5fc752e9db5b30ca0991f09292cb50eb5c8c
- Early withdrawal reverts on chain: https://testnet.purrsec.com/tx/0x2ff8266478b4200cebfca82d9184cb1ab04d74ba48fdc34598e4b4fb75c6e5d8
- Fee run: sale https://testnet.purrsec.com/tx/0xbfea58c4c801130b3f2c8ba0a1fa03f066599130cf9ab90e226af5f64ce9264c (gross 11.42124953 USDC), reconcile https://testnet.purrsec.com/tx/0x537163a52f14020554102ef784a095608a2f27e8db4f08290787586426bb2048 (0.02855312 USDC to recipient 0xBBddd45458F99FA46bE10DC31f30533DA7360Aa9; team kept 11.39269641): `deployments/fee-runs.jsonl`
- 12 fee tests, each guard broken on purpose turns a test red: `contracts/test/PledgeFee.t.sol`, `deployments/fee-mutation-checks.txt`
- Caller-set price griefing found and fixed (v1 to v2): README "Build history"
- Unlock sizes ($97.43B in 2025, $18.77B to insiders): https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact
- Live app: https://pledge-ccs.pages.dev · Code: https://github.com/kamalbuilds/pledge-hl
