// TESTNET ONLY: perp->spot USDC, new BACKED operator key + 50 USDC, buy ~1 HYPE spot.
import fs from 'node:fs';
import * as hl from '@nktkas/hyperliquid';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
const K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/';
const account = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key);
const transport = new hl.HttpTransport({ isTestnet: true }); const info = new hl.InfoClient({ transport }); const ex = new hl.ExchangeClient({ wallet: account, transport });
const log = (o) => { const l = JSON.stringify({ t: Date.now(), ...o }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n'); };
log({ step: 'perp->spot 100 USDC', r: await ex.usdClassTransfer({ amount: '100', toPerp: false }) });
const kf = K + 'backed-operator-2.json'; let pk;
if (fs.existsSync(kf)) pk = JSON.parse(fs.readFileSync(kf, 'utf8'))[0].private_key; else { pk = generatePrivateKey(); fs.writeFileSync(kf, JSON.stringify([{ address: privateKeyToAccount(pk).address, private_key: pk, network: 'hyperliquid-testnet', purpose: 'BACKED operator (fresh, 2026-10-10)' }], null, 1), { mode: 0o600 }); }
const nb = privateKeyToAccount(pk).address; log({ step: 'new BACKED operator', address: nb });
log({ step: 'spotSend 50 USDC to BACKED op', r: await ex.spotSend({ destination: nb, token: 'USDC:0xeb62eee3685fc4c43992febcd9e75443', amount: '50' }) });
const mid = Number((await info.allMids())['@1035']); const px = (mid * 1.05).toPrecision(5);
log({ step: 'buy 1.1 HYPE IOC', mid, px, r: await ex.order({ orders: [{ a: 11035, b: true, p: String(Number(px)), s: '1.1', r: false, t: { limit: { tif: 'Ioc' } } }], grouping: 'na' }) });
log({ step: 'balances', op: (await info.spotClearinghouseState({ user: account.address })).balances, backed: (await info.spotClearinghouseState({ user: nb })).balances });
