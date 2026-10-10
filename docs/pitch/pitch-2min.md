# PLEDGE: 2 minute pitch

## The problem (20s)
When a token unlocks, holders fear one thing: the team or an investor dumps it all at once. Today the only answer is a promise in a blog post or a market maker contract nobody can see. Tokenomist counts $97.43B of tokens unlocked in 2025, $18.77B of it to insiders. HYPE alone unlocked about $496M.

## What PLEDGE is (30s)
PLEDGE is a lock agreement for unlocked supply, enforced by a contract on HyperEVM. The team deposits tokens. The contract can only sell them on the HyperCore spot book, at most a fixed amount per day, never below a floor price, and never more than a set distance below the oracle price. No one can cancel it or withdraw early, the team included. Anyone can trigger the daily sale.

## Why it is credible (30s)
It is live on Hyperliquid testnet, not a mockup. Real sales filled on HyperCore, including 0.5 HYPE at 22.538 USDC from a browser wallet test. The contract counts filled size, not requested size, so an unfilled order gives its allowance back. Cancel, early withdraw and oversized sales all revert, and anyone can check that from the page in one click.

## Who pays (20s)
The token team pays. We propose 0.25% of filled sale proceeds, so they only pay when the plan works. Streamflow charges 0.19% to 0.5% of the tokens just to vest or lock them. Buyers and keepers pay no PLEDGE fee, only normal gas.

## What is next (20s)
Mainnet deploy, the fee in the contract, support for any HyperCore spot token, and a public list of all active agreements so exchanges and holders can see who has pledged. Try it at https://pledge-ccs.pages.dev.

Sources: https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact , https://streamflow.finance/blog/how-much-does-streamflow-cost
