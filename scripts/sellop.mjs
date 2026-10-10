// TESTNET ONLY: operator sells 0.45 HYPE IOC into the deep 22.5 bids (restores USDC; spot px returns near the book).
import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid'; import { privateKeyToAccount } from 'viem/accounts';
const account = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const ex = new hl.ExchangeClient({ wallet: account, transport: new hl.HttpTransport({ isTestnet: true }) });
const r = await ex.order({ orders: [{ a: 11035, b: false, p: '22.4', s: '0.45', r: false, t: { limit: { tif: 'Ioc' } } }], grouping: 'na' });
const l = JSON.stringify({ t: Date.now(), step: 'operator sell 0.45 HYPE IOC', r }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n');
