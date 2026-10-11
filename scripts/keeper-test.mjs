// TESTNET ONLY. A non-team address (demo-operator) triggers sell() on a pledge whose team is the e2e tester: proves the keeper call is permissionless.
import fs from 'node:fs'; import { createWalletClient, createPublicClient, http, defineChain } from 'viem'; import { privateKeyToAccount } from 'viem/accounts';
const D = new URL('.', import.meta.url).pathname; const op = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const tr = http(undefined, { retryCount: 8, retryDelay: 2500 }); const w = createWalletClient({ account: op, chain, transport: tr }), pub = createPublicClient({ chain, transport: tr });
const abi = JSON.parse(fs.readFileSync(D + '../contracts/out/Pledge.sol/Pledge.json', 'utf8')).abi; const P = '0x13c156409c57076550077313970ec125bca59f80';
const rd = async (fn) => (await pub.readContract({ address: P, abi, functionName: fn })).toString();
const out = { pledge: P, team: await rd('team'), caller: op.address, before: { balance: await rd('balance'), soldToday: await rd('soldToday') } };
const h = await w.writeContract({ address: P, abi, functionName: 'sell', args: [25000000n], gas: 400000n }); out.sellTx = h; out.sellStatus = (await pub.waitForTransactionReceipt({ hash: h })).status;
await new Promise(r => setTimeout(r, 8000));
const h2 = await w.writeContract({ address: P, abi, functionName: 'reconcile', args: [], gas: 200000n }); out.reconcileTx = h2; const rc = await pub.waitForTransactionReceipt({ hash: h2 }); out.reconcileStatus = rc.status;
out.after = { balance: await rd('balance'), soldToday: await rd('soldToday'), pending: await rd('pending'), remainingToday: await rd('remainingToday') };
out.note = 'Order is 0.25 HYPE (~5.6 USDC), under HyperCore 10 USDC minimum, so Core rejects it and reconcile refunds the cap. Proves: non-team caller, contract-set price, unfilled refund.';
fs.writeFileSync(D + '../deployments/keeper-test.json', JSON.stringify(out, null, 1)); console.log(JSON.stringify(out));
