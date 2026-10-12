# PLEDGE: pitch script (Colosseum brief)

Brief: "Tell us what you're building, and tell us why you're the people to build it."
Spoken by Kamal, first person. About 290 words, under 2 minutes at a normal pace.
Words in [brackets] are placeholders for Kamal to fill in. Do not read the brackets out.

---

**What I'm building (0:00 to 1:05)**

Hi, I'm Kamal. I'm building PLEDGE.

When a token unlocks, everyone asks one question: is the team going to dump? Today the answer is a blog post, or a market maker deal nobody can see. In 2025, about 97 billion dollars of tokens unlocked, and about 19 billion of that went to insiders.

PLEDGE turns the promise into a contract on Hyperliquid. The team locks its tokens in PLEDGE. After that, only the contract can sell them. It sells on the Hyperliquid order book, at most a fixed amount per day, never below a floor price. The contract sets the price from the oracle itself. Nobody can cancel it or pull the tokens out early, not even the team.

Hyperliquid's own TWAP orders can be cancelled and stop after 7 days. PLEDGE cannot be cancelled, and it runs for months.

It works on testnet today. We locked HYPE, the contract sold it, and the order filled on the real testnet book. Cancelling, withdrawing early, and selling under the floor all fail on-chain. The team pays a 0.25% fee on what actually sells. That fee is in the contract and already ran on a real testnet sale.

**Why me (1:05 to 1:50)**

[One line on your background, for example: "I've been building on-chain products since [year]."]

How I work: I try to break my own product before anyone else does. My first version let any caller set the sale price, so a griefer could post an order that never fills and use up the day's allowance. I found that, changed the contract to set the price itself, and wrote tests for it. I also found a limit I had assumed, a 10 dollar minimum order, did not apply to contract orders, so I removed it from the app.

[Optional: one line on why you care about unlocks, for example a project you held through an unlock.]

**Ask (1:50 to 2:00)**

I'm looking for the first Hyperliquid teams to pledge their next unlock. Try it at pledge-ccs.pages.dev.
