// TESTNET ONLY: operator buys 0.45 HYPE (>=10 USDC min) and sends 0.5 HYPE to the e2e tester.
import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid'; import { privateKeyToAccount } from 'viem/accounts';
const K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/'; const op = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key); const t = JSON.parse(fs.readFileSync(K + 'pledge-e2e-tester.json', 'utf8'))[0].address;
const tr = new hl.HttpTransport({ isTestnet: true }); const ex = new hl.ExchangeClient({ wallet: op, transport: tr }); const info = new hl.InfoClient({ transport: tr });
const log = (o) => { const l = JSON.stringify({ t: Date.now(), ...o }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n'); };
const bal = async (u) => Object.fromEntries((await info.spotClearinghouseState({ user: u })).balances.map(b => [b.coin, b.total]));
log({ step: 'before', op: await bal(op.address), tester: await bal(t) });
const ask = Number((await info.l2Book({ coin: '@1035' })).levels[1][0].px); const px = (ask * 1.03).toPrecision(5);
log({ step: 'op buy 0.45 HYPE IOC', ask, px, r: JSON.stringify((await ex.order({ orders: [{ a: 11035, b: true, p: String(Number(px)), s: '0.45', r: false, t: { limit: { tif: 'Ioc' } } }], grouping: 'na' })).response.data.statuses) });
log({ step: 'spotSend 0.5 HYPE to tester', r: await ex.spotSend({ destination: t, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: '0.5' }) });
log({ step: 'after', op: await bal(op.address), tester: await bal(t) });
