# PLEDGE: irrevocable slow-sell for unlocked supply on Hyperliquid

A token team locks unlocked supply in a HyperEVM contract. The contract can only sell it on the HyperCore spot book: at most
`capPerDay` of **filled** size per day, at an IOC limit the contract computes (oracle from precompile 0x808, minus a max band),
and never below `floorPx8`. There is no cancel path and no early withdraw. "We won't dump" becomes something the chain enforces.

Track: Colosseum World's Fair, Hyperliquid. Network: HyperEVM testnet (998) + HyperCore testnet.

## Layout
- `contracts/`: Foundry. `src/Pledge.sol`, with `test/Pledge.t.sol` (16 unit tests, mocked precompiles) and `test/PledgeFork.t.sol` (4 fork tests).
- `web/`: Vite + React + viem. Pages: create a pledge (`#/create`), and a public pledge page (`#/p/<address>`) showing locked supply,
  sold today vs cap (hourglass), the price guard, the sell history, and "Try to break it" (live eth_call: cancel, early release, 2× cap, dust lot -> rejected).
- `scripts/deploy.mjs`: testnet deploy plus three on-chain rejected attempts. `scripts/real-sale.mjs`: the funded real sale (preflight; `--go`).
- `deployments/`: testnet addresses, tx log, fork-sim output.

## Run
```
cd contracts && forge test --no-match-contract PledgeFork          # unit
FORK_BLOCK=<recent> PLEDGE=<addr> LIVE_PX=<0x808 value> forge test --match-contract PledgeFork -vv   # fork-sim
cd web && npm i && npm run dev
```

## Real vs simulated
| What | Status |
|---|---|
| Demo pledge `0x1cf99b8af3745deef01cc1c29708e10d4538e50e` (deploy tx `0x1a666b8f…79e7`) | REAL testnet |
| Live oracle and limit read via 0x808 (22.512 -> 22.061) | REAL testnet |
| Rejected on-chain: 2× cap sell `0x605126b8…807f`, cancel `0x6c32d949…5c8c`, early release `0x2ff82664…d5d8` | REAL testnet |
| Funded sale: full fill, never-fill refund, partial fill + next day, oracle crash below floor | FORK-SIMULATED (forge fork of 998, HyperCore mocked). Tenderly has no HyperEVM network |
| A real HyperCore fill from the contract | NOT YET. Testnet funds blocked (the faucet needs a mainnet deposit, and the min order is $10 ≈ 0.5 HYPE) |

## Built before vs during the event
- Before the build sprint (Oct 10 spike): Pledge v1 (cap + floor, caller-set price), 5 tests, v1 testnet deploy.
- During (Oct 10): v2 griefing fix (contract-set oracle-band price, filled-size cap via 0x801 balance delta), start time, `cancel()` proof,
  16 unit + 4 fork tests, testnet redeploy, web app, scripts, this README.

## Known limits
- The lock covers only the tokens inside the pledge. The team can still sell from other wallets.
- Spot only, one token per pledge (HYPE/USDC @1035 in the demo). Sale proceeds (USDC) stay in the contract until `release` after the end date.
- On testnet the 0x808 oracle (≈22.5) can differ from the book mid (≈26). A sell IOC fills at the best bid at or above the limit.
