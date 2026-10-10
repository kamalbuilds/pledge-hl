import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid'; import { privateKeyToAccount } from 'viem/accounts';
const account = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const transport = new hl.HttpTransport({ isTestnet: true }); const info = new hl.InfoClient({ transport }); const ex = new hl.ExchangeClient({ wallet: account, transport });
const mid = Number((await info.allMids())['@1035']); const px = '29.5';
let r; try { r = await ex.order({ orders: [{ a: 11035, b: true, p: px, s: '1.1', r: false, t: { limit: { tif: 'Ioc' } } }], grouping: 'na' }); } catch (e) { r = { err: e.message }; }
const l = JSON.stringify({ t: Date.now(), step: 'buy 1.1 HYPE IOC', mid, px, r }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n');
console.log(JSON.stringify((await info.spotClearinghouseState({ user: account.address })).balances.slice(0,3)));
console.log(JSON.stringify((await info.spotClearinghouseState({ user: '0x263F74859F6c932Db0B4F11165580AE58984D8cc' })).balances));
