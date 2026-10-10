// Records docs/pitch/demo.webm at 1440x900 following DEMO-SCRIPT.md against the live URL. Read-only: no transactions are signed.
import fs from 'node:fs';
const { chromium } = await import('/Users/kamal/Desktop/solana/cwf/hyperliquid/projects/pledge/design/node_modules/playwright/index.mjs');
const URL = process.argv[2] || 'https://pledge-ccs.pages.dev'; const dir = 'docs/pitch/rec'; fs.rmSync(dir, { recursive: true, force: true });
const b = await chromium.launch({ executablePath: process.env.CHROME });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir, size: { width: 1440, height: 900 } } });
const p = await ctx.newPage(); const w = (ms) => p.waitForTimeout(ms);
const to = async (sel, ms = 3500) => { await p.locator(sel).first().evaluate(e => e.scrollIntoView({ behavior: 'smooth', block: 'start' })); await w(ms); };
await p.goto(URL + `/?v=${Date.now()}`, { waitUntil: 'networkidle' }); await p.waitForSelector('figure.fig1'); await w(9000);   // 0:00 agreement + figure
await to('#c1', 6000); await to('#c2', 6000); await to('#c3', 7000); await to('#c6', 8000);                                // 0:30 terms
await to('#c4', 3000);
for (const n of ['Simulate cancellation', 'Simulate early withdrawal', 'Simulate oversized sale']) { await p.getByRole('button', { name: n }).click(); await w(5000); } // 1:00 rejections
await w(8000);
await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })); await w(2000);
await p.getByRole('link', { name: 'Draft a new agreement' }).first().click(); await p.waitForSelector('.create h1'); await w(8000); // 1:45 create
await p.locator('label', { hasText: 'HYPE of filled size' }).locator('input').fill('0.1'); await w(5000);
await p.locator('label', { hasText: 'HYPE of filled size' }).locator('input').fill('0.5'); await w(4000);
await p.getByRole('button', { name: 'Review and sign' }).click(); await w(9000); await p.keyboard.press('Escape'); await w(2000);
await p.goto(URL + '/'); await p.waitForSelector('figure.fig1'); await w(3000);
await to('#judges', 16000); await to('#business', 14000);                                                                    // 2:30 annexes
const v = p.video(); await ctx.close(); await b.close(); fs.renameSync(await v.path(), 'docs/pitch/demo.webm'); fs.rmSync(dir, { recursive: true, force: true });
console.log('docs/pitch/demo.webm');
