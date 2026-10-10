// E2E on HyperEVM testnet: Playwright + an injected test-key wallet (EIP-1193 shim that signs in Node with viem).
// Usage: node e2e/wallet-flow.mjs <baseUrl> [--video dir]   Writes e2e/results/<ts>.json
import fs from 'node:fs'; import path from 'node:path';
const W = '/Users/kamal/Desktop/solana/cwf/hyperliquid/projects/pledge/web/node_modules/';
const { chromium } = await import('/Users/kamal/Desktop/solana/cwf/hyperliquid/projects/pledge/design/node_modules/playwright/index.mjs');
const { privateKeyToAccount } = await import(W + 'viem/_esm/accounts/index.js');
const { createWalletClient, createPublicClient, http, defineChain } = await import(W + 'viem/_esm/index.js');
const hl = await import('/Users/kamal/Desktop/solana/cwf/hyperliquid/projects/pledge/scripts/node_modules/@nktkas/hyperliquid/esm/mod.js').catch(() => import('/Users/kamal/Desktop/solana/cwf/hyperliquid/projects/pledge/scripts/node_modules/@nktkas/hyperliquid/script/mod.js'));
const K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/';
const acct = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'pledge-e2e-tester.json', 'utf8'))[0].private_key);
const op = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key);
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const tr = http(undefined, { retryCount: 8, retryDelay: 2500 }); const wc = createWalletClient({ account: acct, chain, transport: tr }); const pub = createPublicClient({ chain, transport: tr });
const BASE = process.argv[2]; const vi = process.argv.indexOf('--video'); const VID = vi > 0 ? process.argv[vi + 1] : null;
const out = { started: new Date().toISOString(), base: BASE, tester: acct.address, steps: [] }; const step = (name, o = {}) => { const e = { name, at: new Date().toISOString(), ...o }; out.steps.push(e); console.log(JSON.stringify(e)); };
const txs = [];
async function rpc(method, params) {
  switch (method) {
    case 'eth_requestAccounts': case 'eth_accounts': return [acct.address];
    case 'eth_chainId': return '0x3e6'; case 'net_version': return '998';
    case 'wallet_switchEthereumChain': case 'wallet_addEthereumChain': return null;
    case 'eth_sendTransaction': { const t = params[0]; const h = await wc.sendTransaction({ to: t.to || undefined, data: t.data, value: t.value ? BigInt(t.value) : undefined, gas: t.gas ? BigInt(t.gas) : undefined }); txs.push(h); step('wallet sent tx', { tx: h, to: t.to || 'CREATE' }); return h; }
    case 'eth_signTypedData_v4': { const d = JSON.parse(params[1]); const { EIP712Domain, ...types } = d.types; const sig = await acct.signTypedData({ domain: d.domain, types, primaryType: d.primaryType, message: d.message }); step('wallet signed typed data', { primaryType: d.primaryType }); return sig; }
    case 'personal_sign': return acct.signMessage({ message: { raw: params[0] } });
    default: return pub.request({ method, params });
  }
}
const CH = process.env.CHROME; const b = await chromium.launch({ executablePath: CH });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...(VID ? { recordVideo: { dir: VID, size: { width: 1440, height: 900 } } } : {}) });
await ctx.exposeBinding('__walletRpc', async (_s, method, params) => { try { return { ok: true, v: await rpc(method, params) }; } catch (e) { return { ok: false, e: String(e.shortMessage || e.message || e) }; } });
await ctx.addInitScript(() => { const L = {}; window.ethereum = { isTestKeyWallet: true, request: async ({ method, params }) => { const r = await window.__walletRpc(method, params || []); if (!r.ok) { const err = new Error(r.e); err.code = 4001; throw err; } return r.v; }, on: (e, f) => { (L[e] ||= []).push(f); }, removeListener: () => {} }; });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
const pause = (ms) => p.waitForTimeout(ms);
try {
  // 1. Create
  await p.goto(BASE + '/#/create'); await p.waitForSelector('.create h1');
  const set = async (label, v) => { const i = p.locator('label', { hasText: label }).locator('input'); await i.fill(v); };
  await set('HYPE of filled size', '0.5'); await set('Floor, USDC', '5'); await set('Length in days', '30'); await pause(800);
  await p.getByRole('button', { name: 'Review and sign' }).click(); await pause(1200);
  await p.getByRole('button', { name: 'Sign and deploy on testnet' }).click();
  await p.waitForURL(/#\/p\/0x[0-9a-fA-F]{40}/, { timeout: 120000 }); const addr = p.url().match(/0x[0-9a-fA-F]{40}/)[0]; out.pledge = addr; step('created pledge', { addr, url: p.url() });
  await p.waitForSelector('figure.fig1', { timeout: 60000 }); await pause(2500);
  // 2. Deposit via header button -> dialog
  await p.getByRole('button', { name: 'Deposit HYPE' }).first().click(); await pause(800);
  await p.locator('.dep-l input').fill('0.5'); await pause(800); await p.getByRole('button', { name: /^Lock 0\.5 HYPE$/ }).click();
  await p.waitForSelector('.log li', { timeout: 60000 }); step('deposit log', { text: await p.locator('.log li').first().innerText() });
  for (let i = 0; i < 12; i++) { await pause(5000); await p.reload(); await p.waitForSelector('figure.fig1', { timeout: 60000 }); const t = await p.locator('.avail-v').innerText(); if (!t.startsWith('0 ')) { step('deposit visible', { available: t }); break; } }
  // 3. Operator rests a bid at the contract limit so the IOC can fill (disclosed: operator-provided liquidity on thin testnet book)
  const lim = await pub.readContract({ address: addr, abi: [{ name: 'limitPx8', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint64' }] }], functionName: 'limitPx8' });
  const bidPx = (Number(lim) / 1e8 * 1.001).toPrecision(5); const ex = new hl.ExchangeClient({ wallet: op, transport: new hl.HttpTransport({ isTestnet: true }) });
  const book = await new hl.InfoClient({ transport: new hl.HttpTransport({ isTestnet: true }) }).l2Book({ coin: '@1035' }); const bestBid = Number(book.levels[0][0].px); step('book', { bestBid, limitPx: Number(lim) / 1e8, note: bestBid >= Number(lim) / 1e8 ? 'existing testnet bids are above the contract limit; no operator liquidity needed' : 'operator bid required' });
  const bid = bestBid >= Number(lim) / 1e8 ? { response: { data: { statuses: 'skipped' } } } : await ex.order({ orders: [{ a: 11035, b: true, p: String(Number(bidPx)), s: '0.5', r: false, t: { limit: { tif: 'Gtc' } } }], grouping: 'na' }); step('operator bid (disclosed liquidity)', { limitPx: Number(lim) / 1e8, bidPx, r: JSON.stringify(bid.response?.data?.statuses) });
  // 4. Trigger sale
  await p.getByRole('button', { name: "Trigger today's sale" }).click();
  await p.waitForFunction(() => [...document.querySelectorAll('.log li')].some(l => /Sale/.test(l.textContent)), null, { timeout: 90000 }); step('sale log', { text: await p.locator('.log li').first().innerText() });
  // 5. Confirm fills
  let filled = false; for (let i = 0; i < 12; i++) { await pause(5000); await p.reload(); await p.waitForSelector('figure.fig1', { timeout: 60000 }); const rows = await p.locator('.ledger tbody tr').count(); if (rows > 0) { filled = true; step('fill visible in record of sales', { rows, first: await p.locator('.ledger tbody tr').first().innerText() }); break; } }
  if (!filled) step('NO FILL seen', {});
  try { await p.getByRole('button', { name: 'Reconcile fills' }).click(); await p.waitForFunction(() => [...document.querySelectorAll('.log li')].some(l => /reconcile|Reconcile/.test(l.textContent)), null, { timeout: 90000 }); step('reconcile', { text: await p.locator('.log li').first().innerText() }); } catch (e) { step('reconcile failed', { e: String(e).slice(0, 200) }); }
  await p.reload(); await p.waitForSelector('figure.fig1'); await pause(2000);
  step('state after', { avail: await p.locator('.avail-v').innerText(), now: await p.locator('.now-line').innerText() });
  // 6. Rejections
  for (const n of ['Simulate cancellation', 'Simulate early withdrawal', 'Simulate oversized sale']) { await p.getByRole('button', { name: n }).click(); await p.waitForSelector('.verdict', { timeout: 30000 }); await pause(1500); }
  step('rejections', { verdicts: await p.locator('.verdict').allInnerTexts() });
  try { await ex.cancel({ cancels: (await new hl.InfoClient({ transport: new hl.HttpTransport({ isTestnet: true }) }).openOrders({ user: op.address })).filter(o => o.coin === '@1035').map(o => ({ a: 11035, o: o.oid })) }); step('operator bid cancelled'); } catch { }
} catch (e) { step('FAILED', { e: String(e).slice(0, 400) }); await p.screenshot({ path: 'e2e/results/failure.png', fullPage: true }); }
out.pageErrors = errs; out.txs = txs; fs.mkdirSync('e2e/results', { recursive: true }); const f = `e2e/results/run-${Date.now()}.json`; fs.writeFileSync(f, JSON.stringify(out, null, 1)); console.log('wrote', f);
await ctx.close(); await b.close(); if (VID) console.log('video dir', VID);
