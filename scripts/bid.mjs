// TESTNET ONLY: operator rests a GTC bid so the pledge's IOC has a counterparty above its oracle-band limit. (Disclosed: operator-provided liquidity.)
import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid'; import { privateKeyToAccount } from 'viem/accounts';
const account = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const transport = new hl.HttpTransport({ isTestnet: true }); const ex = new hl.ExchangeClient({ wallet: account, transport }); const info = new hl.InfoClient({ transport });
const [cmd, px, sz] = process.argv.slice(2); let r;
if (cmd === 'place') r = await ex.order({ orders: [{ a: 11035, b: true, p: px, s: sz, r: false, t: { limit: { tif: 'Gtc' } } }], grouping: 'na' });
else { const oo = (await info.openOrders({ user: account.address })).filter(o => o.coin === '@1035'); r = oo.length ? await ex.cancel({ cancels: oo.map(o => ({ a: 11035, o: o.oid })) }) : 'none'; }
const l = JSON.stringify({ t: Date.now(), step: 'bid ' + cmd, px, sz, r }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n');
