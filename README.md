# PLEDGE

**A token team's "we won't dump" promise, enforced by a contract on Hyperliquid.**

A team locks unlocked supply in a HyperEVM contract. The contract can only sell it on the HyperCore spot book: at most a fixed amount of *filled* size per day, at an order price the contract computes from the oracle, and never below a floor price. Nobody can cancel the agreement or withdraw early, the team included. Anyone can trigger the daily sale.

- Live app (Hyperliquid testnet): https://pledge-ccs.pages.dev
- Network: HyperEVM testnet (chain 998) and HyperCore testnet
- Demo agreement (v2): [`0x1cf99b8af3745deef01cc1c29708e10d4538e50e`](https://testnet.purrsec.com/address/0x1cf99b8af3745deef01cc1c29708e10d4538e50e)
- Protocol factory, 25 bps fee: [`0x1897afa39e71c2d9bf3a4ad58fca23072b26bab4`](https://testnet.purrsec.com/address/0x1897afa39e71c2d9bf3a4ad58fca23072b26bab4)
- Fee-bearing agreement, created by the factory: [`0xD90dD9b216965463fe00C0e9FEb3b1cCc2ebCd7A`](https://testnet.purrsec.com/address/0xD90dD9b216965463fe00C0e9FEb3b1cCc2ebCd7A)
- Protocol fee recipient: [`0xBBddd45458F99FA46bE10DC31f30533DA7360Aa9`](https://testnet.purrsec.com/address/0xBBddd45458F99FA46bE10DC31f30533DA7360Aa9)

## Why
Unlocks move a lot of supply. Tokenomist counts $97.43B of tokens unlocked in 2025, $18.77B of that to insiders (team and investors), and about $496M of HYPE ([source](https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact)). Today a team's selling plan is a blog post or a private market maker contract. PLEDGE makes the plan public and impossible to break.

## How it works
```
 team wallet ──spotSend HYPE──▶  Pledge contract's HyperCore spot balance
                                     │
 anyone ──sell(size)──▶ Pledge.sol (HyperEVM)
                         │ checks: started? size within today's allowance? oracle limit >= floor? balance?
                         │ price = oracle (precompile 0x808) minus maxDevBps, rounded to Core tick rules
                         └─ CoreWriter (0x3333…3333) ──IOC sell──▶ HyperCore HYPE/USDC book
 anyone ──reconcile()──▶ reads its own Core balance (precompile 0x801); the drop is the filled size.
                         Filled size counts against the day; unfilled size goes back to the allowance.
                         The USDC credited by the fill is the sale's proceeds: 25 bps of it is paid to the protocol
                         fee recipient by a CoreWriter spotSend in the same call; the rest stays with the agreement.
 team ──release()──▶ only after the end date, and only once the last sale has settled and paid its fee: CoreWriter spotSend of the remainder and net USDC proceeds to the team
 cancel() ──▶ always reverts. There is no owner, no admin, no upgrade, no early withdraw.
```
Key design choices:
- **The caller picks only the size, never the price.** A v1 let the caller set the price, so a griefer could post a never-fill order and burn the day. v2 computes the limit itself.
- **The cap counts fills, not orders.** HyperCore actions settle after the EVM block, so the contract measures its own balance drop on the next call. An IOC that does not fill refunds its size.
- **One pending order at a time**, so fills can always be attributed.
- **The fee is measured, not estimated.** It is 25 bps of the USDC the fill credited to the agreement's HyperCore account (net of HyperCore's own taker fee), read from the 0x801 balance before the order and after the fill. Locked principal, USDC the agreement already held, unfilled orders and refunded allowance pay nothing.
- **The fee terms are fixed by the factory.** `PledgeFactory` holds the fee recipient and bps as immutables; every agreement copies them as immutables. The team becomes `msg.sender` and chooses neither. A hard cap of 100 bps is enforced in both contracts.

## Features and evidence
| Feature | Status | Evidence |
|---|---|---|
| Create an agreement with a browser wallet | Real, testnet | Playwright + injected test wallet, create tx `0x1327f211…3d57`, agreement `0x9af101c5…91a5` (`e2e/wallet-flow.mjs`, `e2e/results/`) |
| Deposit HYPE from HyperCore into the agreement | Real, testnet | Same run: signed spotSend of 0.5 HYPE, balance read back from 0x801 |
| Sale as a contract-priced IOC on the HyperCore book | Real, testnet | Sale tx `0x5f9fb781…1913` filled 0.5 HYPE @ 22.538; demo sale `0x6d90c024…8430` filled 0.5 @ 22.512 |
| Anyone, not only the team, can trigger the sale | Real, testnet | Non-team caller sold 0.25 HYPE @ 22.51 on agreement `0x13c15640…9f80`, tx `0x2e546b3d…9e8f` (`deployments/keeper-test.json`) |
| Daily cap counts filled size; a second sale the same day reverts | Real, testnet | reconcile `0x61c9f769…5f03` (soldToday = cap), next sell reverted `0x62eb3c43…62f1` |
| Unfilled order refunds the allowance | Real, testnet | sells `0xe3faafd9…c236`, `0xcf296da8…4a49` got no fill; reconcile `0x896adaa0…8a49` emitted Filled(0, refund 0.5) |
| Sale blocked below the floor price | Real, testnet | Floor $1000 agreement `0x889f8622…5025`, sell reverted "below floor" `0xb06a04b6…0c67` |
| Sale blocked before the start date | Real, testnet | Agreement `0x7df0f2d1…d5a8`, sell reverted "not started" `0x2e19682b…073d` |
| Cancel and early withdrawal always revert | Real, testnet | cancel `0x6c32d949…5c8c`, early release `0x2ff82664…d5d8`; live checks from the page |
| Team withdraws the remainder after the end date | Real, testnet | 0-day agreement `0x03293d05…7dd0`: 0.05 HYPE deposited, release `0x3db895d7…9380` returned it to the team (`deployments/feature-tests.json`) |
| Only the team can release | Unit test | `test_nonTeamCannotRelease` |
| Daily allowance resets, orders filled in part roll into the next day, an oracle drop below the floor halts sales | Fork test | `contracts/test/PledgeFork.t.sol` runs the deployed factory and its agreements on a fork of chain 998 (Annex A on the site) |
| Record of sales read live from HyperCore fills | Real, testnet | Clause 6 on the site, `userFills` API |
| 0.25% protocol fee on realised proceeds, paid to an immutable recipient | Real, testnet | Sale `0xbfea58c4…64c` filled 0.25 HYPE @ 45.717, gross 11.42124953 USDC; reconcile `0x537163a5…2048` paid 0.02855312 USDC; recipient balance 0.50000000 to 0.52855312 USDC, agreement kept 11.39269641 (`deployments/fee-runs.jsonl`) |
| Fee cap, fixed recipient, no fee on unfilled or refunded sales | Unit test, mutation-checked | `contracts/test/PledgeFee.t.sol`: 12 tests, 12 broken guards each turn a test red (`deployments/fee-mutation-checks.txt`) |

Full tx hashes are in `deployments/` (`testnet.json`, `real-sale*.json`, `funding.jsonl`, `feature-tests.json`, `keeper-test.json`) and in `e2e/results/`.

## For judges (about 60 seconds)
1. Open https://pledge-ccs.pages.dev. Everything shown is read live from testnet.
2. In clause 4 press the three "Simulate" buttons. Each one calls the live contract and comes back "Rejected by the contract".
3. Check the fills yourself:
   `curl -s -X POST https://api.hyperliquid-testnet.xyz/info -H 'content-type: application/json' -d '{"type":"userFills","user":"0x9af101c5d73432510e037dc8b05ec35811de91a5"}'`
4. Open any tx above on https://testnet.purrsec.com.

## Business model
- **Who pays:** the token team or foundation that locks supply. They get a public, checkable selling plan to show exchanges, market makers and holders. Buyers and keepers pay no PLEDGE fee, only normal gas.
- **Fee:** 0.25% (25 bps) of realised sale proceeds in USDC, taken inside the call that settles each fill, so the team pays only when the plan works. The recipient and bps are immutable per agreement, set by the factory, capped at 100 bps. On testnet, sale `0xbfea58c4c801130b3f2c8ba0a1fa03f066599130cf9ab90e226af5f64ce9264c` produced 11.42124953 USDC of proceeds; reconcile `0x537163a52f14020554102ef784a095608a2f27e8db4f08290787586426bb2048` sent 0.02855312 USDC to the fee recipient, whose Core balance moved 0.50000000 to 0.52855312 USDC, and the agreement kept 11.39269641 USDC for the team. Proceeds plus fee equal gross exactly, by construction and by test.
- **Comparables:** Streamflow charges 0.16 SOL plus 0.19% of tokens vested, or 0.5% for a token lock ([source](https://streamflow.finance/blog/how-much-does-streamflow-cost)). Sablier's interface charges $0.99 per withdrawal ([source](https://docs.sablier.com/concepts/fees)).
- **Size:** 1% of 2025 insider unlocks ($18.77B) sold through PLEDGE at 0.25% is about $470K a year.

## Repository layout
- `contracts/`: Foundry. `src/Pledge.sol`; `src/PledgeFactory.sol`; `test/Pledge.t.sol` (16 unit tests, mocked precompiles); `test/PledgeFee.t.sol` (12 fee tests, one of them a 256-run fuzz); `test/PledgeFork.t.sol` (4 fork tests against the deployed factory).
- `web/`: React + Vite + viem + shadcn components, deployed on Cloudflare Pages. `docs/design/` has the design references, critiques and UI gate output.
- `scripts/`: testnet deploy (`deploy.mjs`, `deploy-fee.mjs` for the factory), funded sales (`real-sale.mjs`, `real-sale-fee.mjs` with the fee balance-delta check), funding, feature tests, keeper test. All testnet only.
- `e2e/`: Playwright wallet flow with an injected test-key wallet, and the demo recorder.
- `deployments/`: addresses (`testnet.json`, `testnet-fee.json`), tx logs (`runs.jsonl`, `fee-runs.jsonl`), fee mutation checks, fork simulation output.
- `docs/pitch/`: pitch script, demo script, demo recording.

## Setup
```
cd contracts && forge test --no-match-contract PledgeFork                     # 28 unit tests
B=$(($(cast block-number --rpc-url https://rpc.hyperliquid-testnet.xyz/evm)-5))
PX=$(cast call 0x0000000000000000000000000000000000000808 $(cast abi-encode "f(uint32)" 1035) --rpc-url https://rpc.hyperliquid-testnet.xyz/evm)
FORK_BLOCK=$B FACTORY=0x1897afa39e71c2d9bf3a4ad58fca23072b26bab4 LIVE_PX=$(cast to-dec $PX) forge test --match-contract PledgeFork   # 4 fork tests
cd ../web && npm i && npm run dev                                              # app at localhost:5173
```
Scripts read testnet keys from a local `.keys/` folder outside this repo. No keys are committed.

## Build history
- **Spike (outside this repo):** Pledge v1, a cap and floor with a caller-set price, 5 tests and a v1 testnet deploy.
- **This repo (Oct 10 to 11, 2026):** v2 contract (oracle-band price set by the contract, filled-size cap from the Core balance, start time, cancel proof), 16 unit and 4 fork tests, testnet deploys, real funded sales, the web app and three redesigns, the wallet E2E, on-chain feature tests, the site's judge and business sections, and the README.
- **Protocol fee layer (Oct 11, 2026):** `PledgeFactory`, the 25 bps fee on realised proceeds, 12 fee tests with a mutation log, a factory deploy and a funded sale with the recipient balance delta.
