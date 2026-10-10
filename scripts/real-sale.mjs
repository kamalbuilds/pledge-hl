// PLEDGE v2 funded real sale, HyperEVM/HyperCore TESTNET ONLY. Usage: node real-sale.mjs [--go] [SZ_HYPE=0.5]
// Without --go: preflight only. HL spot min order value is $10, so SZ*limitPx must be >= ~10.5 USDC (0.5 HYPE at ~22).
// Steps: (1) top up Core HYPE from EVM via 0x2222..2222 bridge if short, (2) spotSend SZ HYPE to the pledge contract on Core,
// (3) sell(SZ) from the contract (IOC at oracle-2%), (4) reconcile() in a later block, (5) record Filled + Core fills.
import fs from 'node:fs';
import * as hl from '@nktkas/hyperliquid';
import { createWalletClient, createPublicClient, http, defineChain, parseEther, decodeEventLog } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
const DIR = new URL('.', import.meta.url).pathname; const GO = process.argv.includes('--go');
const SZ = Number(process.argv.find(a => /^\d*\.?\d+$/.test(a)) ?? '0.5'); const SZ8 = BigInt(Math.round(SZ * 1e8));
const account = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const wallet = createWalletClient({ account, chain, transport: http() }); const pub = createPublicClient({ chain, transport: http() });
if ((await pub.getChainId()) !== 998) throw new Error('not testnet');
const transport = new hl.HttpTransport({ isTestnet: true }); const info = new hl.InfoClient({ transport }); const ex = new hl.ExchangeClient({ wallet: account, transport });
const { address } = JSON.parse(fs.readFileSync(DIR + '../deployments/testnet.json', 'utf8'));
const abi = JSON.parse(fs.readFileSync(DIR + '../contracts/out/Pledge.sol/Pledge.json', 'utf8')).abi;
const rd = (fn) => pub.readContract({ address, abi, functionName: fn });
const log = (o) => { const l = JSON.stringify({ t: Date.now(), v: 2, real: true, ...o }, (k, x) => typeof x === 'bigint' ? x.toString() : x); console.log(l); fs.appendFileSync(DIR + '../deployments/runs.jsonl', l + '\n'); };
const coreHype = async (u) => Number((await info.spotClearinghouseState({ user: u })).balances.find(b => b.coin === 'HYPE')?.total ?? 0);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const limit = Number(await rd('limitPx8')) / 1e8, evm = Number(await pub.getBalance({ address: account.address })) / 1e18;
const opCore = await coreHype(account.address), pledgeBal = Number(await rd('balance')) / 1e8, remaining = Number(await rd('remainingToday')) / 1e8;
const pre = { pledge: address, SZ, limitPx: limit, notional: SZ * limit, opCoreHype: opCore, opEvmHype: evm, pledgeCoreHype: pledgeBal, remainingToday: remaining };
const need = Math.max(0, SZ - pledgeBal - opCore); const problems = [];
if (SZ * limit < 10.2) problems.push(`notional ${(SZ * limit).toFixed(2)} < $10 min; raise SZ`);
if (SZ > remaining) problems.push('SZ exceeds remainingToday (cap 0.5/day)');
if (need > 0 && evm - need < 0.02) problems.push(`short ${need.toFixed(3)} HYPE (need it on Core or EVM + ~0.02 gas)`);
log({ step: 'preflight', ...pre, problems });
if (!GO || problems.length) { console.log(problems.length ? 'BLOCKED' : 'preflight ok; rerun with --go'); process.exit(problems.length ? 2 : 0); }
if (need > 0) { // EVM -> Core: native HYPE sent to 0x2222... is credited to the sender's Core spot
  const h = await wallet.sendTransaction({ to: '0x2222222222222222222222222222222222222222', value: parseEther(need.toFixed(8)) });
  log({ step: 'bridge EVM->Core', tx: h, status: (await pub.waitForTransactionReceipt({ hash: h })).status });
  for (let i = 0; i < 30 && (await coreHype(account.address)) < SZ - pledgeBal - 1e-9; i++) await sleep(2000);
}
if (pledgeBal < SZ) {
  const tok = (await info.spotMeta()).tokens.find(t => t.index === 1105);
  const r = await ex.spotSend({ destination: address, token: `HYPE:${tok.tokenId}`, amount: (SZ - pledgeBal).toFixed(8) });
  log({ step: 'spotSend to pledge', resp: r });
  for (let i = 0; i < 30 && Number(await rd('balance')) < Number(SZ8); i++) await sleep(2000);
}
const before = await rd('balance'); const t0 = Date.now();
const h = await wallet.writeContract({ address, abi, functionName: 'sell', args: [SZ8], gas: 400000n });
const rc = await pub.waitForTransactionReceipt({ hash: h }); log({ step: 'sell', tx: h, status: rc.status, block: rc.blockNumber, balBefore: before });
let after = before; for (let i = 0; i < 20 && after === before; i++) { await sleep(1000); after = await rd('balance'); }
log({ step: 'core balance moved', balAfter: after, ms: Date.now() - t0 });
const h2 = await wallet.writeContract({ address, abi, functionName: 'reconcile', gas: 200000n });
const rc2 = await pub.waitForTransactionReceipt({ hash: h2 });
const ev = rc2.logs.map(l => { try { return decodeEventLog({ abi, ...l }); } catch { return null; } }).filter(Boolean);
log({ step: 'reconcile', tx: h2, status: rc2.status, events: ev.map(e => ({ name: e.eventName, args: e.args })), soldToday: await rd('soldToday') });
log({ step: 'core fills', fills: (await info.userFills({ user: address })).slice(0, 5) });
