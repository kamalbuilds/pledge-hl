// TESTNET ONLY (HyperEVM 998). Real on-chain checks for claims not covered by the wallet E2E:
// (a) not-started blocks sale, (b) floor halts sale, (c) end-of-term release returns the remainder to the team.
import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid';
import { createWalletClient, createPublicClient, http, defineChain } from 'viem'; import { privateKeyToAccount } from 'viem/accounts';
const D = new URL('.', import.meta.url).pathname; const K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/';
const t = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'pledge-e2e-tester.json', 'utf8'))[0].private_key);
const op = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key);
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const tr = http(undefined, { retryCount: 8, retryDelay: 2500 }); const w = createWalletClient({ account: t, chain, transport: tr }), pub = createPublicClient({ chain, transport: tr });
const art = JSON.parse(fs.readFileSync(D + '../contracts/out/Pledge.sol/Pledge.json', 'utf8')); const abi = art.abi;
const htr = new hl.HttpTransport({ isTestnet: true }); const info = new hl.InfoClient({ transport: htr });
const out = []; const log = (o) => { const l = { t: new Date().toISOString(), ...o }; out.push(l); console.log(JSON.stringify(l)); };
const deploy = async (label, args) => { const h = await w.deployContract({ abi, bytecode: art.bytecode.object, args }); const r = await pub.waitForTransactionReceipt({ hash: h }); log({ step: 'deploy ' + label, tx: h, address: r.contractAddress }); return r.contractAddress; };
const send = async (label, address, fn, args) => { const h = await w.writeContract({ address, abi, functionName: fn, args, gas: 400000n }); const st = (await pub.waitForTransactionReceipt({ hash: h })).status; let reason = ''; if (st !== 'success') { try { await pub.simulateContract({ address, abi, functionName: fn, args, account: t.address }); } catch (e) { reason = e.shortMessage?.split('\n').pop() || String(e).slice(0, 120); } } log({ step: label, fn, tx: h, status: st, reason }); return st; };
const now = Math.floor(Date.now() / 1000); const ci = process.argv.indexOf('--c'); const C = ci > 0 ? process.argv[ci + 1] : null; const prev = fs.existsSync(D + '../deployments/feature-tests.json') ? JSON.parse(fs.readFileSync(D + '../deployments/feature-tests.json', 'utf8')) : []; if (C) out.push(...prev);
if (!C) {
// (a) start in 1 day -> sell reverts "not started"
const a = await deploy('not-started (start +1 day)', [11035, 1035, 1105n, 50000000n, 500000000n, 200n, 100n, BigInt(now + 86400), 30n]);
await send('sell before start', a, 'sell', [10000000n]);
// (b) floor $1000 >> oracle ~22 -> sell reverts "below floor"
const b = await deploy('floor $1000', [11035, 1035, 1105n, 50000000n, 100000000000n, 200n, 100n, 0n, 30n]);
await send('sell under floor', b, 'sell', [10000000n]);
}
// (c) term 0 days -> release allowed right away; deposit 0.05 HYPE then release it back
if (process.argv.includes('--fund')) { const ex = new hl.ExchangeClient({ wallet: op, transport: htr }); log({ step: 'op spotSend 1.5 USDC to tester', r: await ex.spotSend({ destination: t.address, token: 'USDC:0xeb62eee3685fc4c43992febcd9e75443', amount: '1.5' }) }); }
const c = C || await deploy('term 0 days (ends immediately)', [11035, 1035, 1105n, 50000000n, 500000000n, 200n, 100n, 0n, 0n]); if (C) log({ step: 'deploy term 0 days (ends immediately)', tx: '0x158cb63c7e158610ce43e7be53afb2dd7bec4c1a4556855b2d1212b4b19937c1', address: C });
const tex = new hl.ExchangeClient({ wallet: t, transport: htr });
log({ step: 'deposit 0.05 HYPE', r: await tex.spotSend({ destination: c, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: '0.05' }) });
await new Promise(r => setTimeout(r, 6000));
const bal = await pub.readContract({ address: c, abi, functionName: 'balance' }); log({ step: 'contract balance after deposit (sz8 wei)', bal: bal.toString() });
const hypeBefore = (await info.spotClearinghouseState({ user: t.address })).balances.find(x => x.coin === 'HYPE')?.total;
await send('non-team release (expect revert)', c, 'release', [1105n, bal]).catch(e => log({ step: 'non-team release', err: String(e).slice(0, 100) }));
await send('team release after end', c, 'release', [1105n, bal]);
await new Promise(r => setTimeout(r, 6000));
log({ step: 'team HYPE on Core before/after release', before: hypeBefore, after: (await info.spotClearinghouseState({ user: t.address })).balances.find(x => x.coin === 'HYPE')?.total, contractAfter: (await pub.readContract({ address: c, abi, functionName: 'balance' })).toString() });
fs.writeFileSync(D + '../deployments/feature-tests.json', JSON.stringify(out, null, 1));
