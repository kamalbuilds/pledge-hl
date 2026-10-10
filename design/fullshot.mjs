import { chromium } from 'playwright'; const [url, out, w, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME }); const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url); await p.waitForSelector('figure.fig1, .create h1', { timeout: 40000 }).catch(() => {}); await p.waitForTimeout(3000);
console.log((await p.evaluate(() => document.querySelector('main')?.innerText || '')).slice(0, 120).replace(/\n/g, ' | ')); await p.screenshot({ path: out, fullPage: true }); await b.close();
