// TESTNET ONLY: fresh e2e tester key, funded from demo-operator (Core: HYPE + USDC; EVM: gas HYPE).
import fs from 'node:fs'; import * as hl from '@nktkas/hyperliquid'; import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'; import { createWalletClient, createPublicClient, http, parseEther, defineChain } from 'viem';
const K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/'; const op = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key);
const kf = K + 'pledge-e2e-tester.json'; let pk; if (fs.existsSync(kf)) pk = JSON.parse(fs.readFileSync(kf, 'utf8'))[0].private_key; else { pk = generatePrivateKey(); fs.writeFileSync(kf, JSON.stringify([{ address: privateKeyToAccount(pk).address, private_key: pk, network: 'hyperliquid-testnet', purpose: 'PLEDGE e2e tester (fresh, 2026-10-10)' }], null, 1), { mode: 0o600 }); }
const t = privateKeyToAccount(pk).address; const ex = new hl.ExchangeClient({ wallet: op, transport: new hl.HttpTransport({ isTestnet: true }) });
const log = (o) => { const l = JSON.stringify({ t: Date.now(), ...o }); console.log(l); fs.appendFileSync(new URL('../deployments/funding.jsonl', import.meta.url), l + '\n'); };
log({ step: 'tester address', address: t });
if (!process.argv.includes('--evm-only')) {
log({ step: 'spotSend 2 USDC to tester', r: await ex.spotSend({ destination: t, token: 'USDC:0xeb62eee3685fc4c43992febcd9e75443', amount: '2' }) });
log({ step: 'spotSend 0.3 HYPE to tester', r: await ex.spotSend({ destination: t, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: '0.3' }) });
}
const chain = defineChain({ id: 998, name: 'hyperevm-testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const w = createWalletClient({ account: op, chain, transport: http(undefined, { retryCount: 8, retryDelay: 3000 }) }); const pub = createPublicClient({ chain, transport: http(undefined, { retryCount: 8, retryDelay: 3000 }) });
const h = await w.sendTransaction({ to: t, value: parseEther('0.12') }); log({ step: 'EVM 0.12 HYPE gas to tester', tx: h, status: (await pub.waitForTransactionReceipt({ hash: h })).status });
