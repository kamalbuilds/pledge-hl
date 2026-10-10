# PLEDGE: 3 minute demo script

Live URL: https://pledge-ccs.pages.dev (Hyperliquid testnet, chain 998). Recording: docs/pitch/demo.mp4 and docs/pitch/demo.webm (1440x900).

## 0:00 to 0:30, the agreement
Open the home page. It is the demo agreement, read live from the contract. Point at the heading: how much was deposited and how much is still locked. Point at Figure 1: the ceiling is the most the contract may have sold, the navy line is what really filled on HyperCore.

## 0:30 to 1:00, the terms
Scroll the clauses. Clause 2 is the daily maximum. Clause 3 is the price rule: an order limit set from the oracle, never under the floor. Clause 6 is the record of sales, with the real fill.

## 1:00 to 1:45, try to break it
In clause 4, press "Simulate cancellation", "Simulate early withdrawal" and "Simulate oversized sale". Each asks the live contract and comes back "Rejected by the contract". Say: no one can cancel this, the team included.

## 1:45 to 2:30, make a new one
Click "Draft a new agreement". Show the five terms and the 10 USDC minimum order check, then press "Review and sign" to show the confirmation. In the recording we stop here and do not sign. Say: our click-through test did the full flow from a browser wallet on testnet: create, deposit 0.5 HYPE, sale filled, reconcile. The links are in Annex B.

## 2:30 to 3:00, for judges and business
Scroll to Annex B: how to verify on-chain, and what is real versus simulated. Then Annex C: the team pays 0.25% of filled proceeds, with sourced market figures.

## What is real and what is simulated
Real on testnet: contract, deposit, sale fill on HyperCore, filled size cap, refund of unfilled orders, the three rejections. Fork simulated: multi day schedules, floor halts, end of term withdrawal (Annex A). Not built: mainnet, the fee.
