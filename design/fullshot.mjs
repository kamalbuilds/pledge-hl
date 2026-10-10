// Full-page capture that refuses unstyled renders: waits for the app stylesheet (bone background) and retries.
import { chromium } from 'playwright'; const [url, out, w, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME }); const p = await b.newPage({ viewport: { width: +w, height: +h } });
const u = url.includes('#') ? url.replace('#', `?v=${Date.now()}#`) : url + `?v=${Date.now()}`;
let ok = false; for (let i = 0; i < 4 && !ok; i++) {
  await p.goto(u, { waitUntil: 'networkidle' }).catch(() => {}); await p.waitForSelector('figure.fig1, .create h1', { timeout: 40000 }).catch(() => {}); await p.waitForTimeout(3000);
  ok = await p.evaluate(() => getComputedStyle(document.body).backgroundColor === 'rgb(250, 248, 243)' && document.documentElement.scrollWidth <= innerWidth + 1);
  if (!ok) console.error('unstyled or overflowing render, retry', i, await p.evaluate(() => [getComputedStyle(document.body).backgroundColor, document.documentElement.scrollWidth]));
}
console.log(ok ? 'styled' : 'FAILED-STYLE', (await p.evaluate(() => document.querySelector('main')?.innerText || '')).slice(0, 80).replace(/\n/g, ' | '));
await p.screenshot({ path: out, fullPage: true }); await b.close(); process.exit(ok ? 0 : 2);
