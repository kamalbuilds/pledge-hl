import { chromium } from 'playwright';
const [url, out, w = '1440', h = '900', full] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME }); const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url); await p.waitForSelector('figure.fig1, .create h1', { timeout: 45000 }).catch(() => {}); await p.waitForTimeout(3000);
await p.screenshot({ path: out, fullPage: !!full });
console.log(JSON.stringify(await p.evaluate(() => ({ body: getComputedStyle(document.body).fontFamily, h1: document.querySelector('h1') && getComputedStyle(document.querySelector('h1')).fontFamily, title: document.title, overflowX: document.documentElement.scrollWidth > innerWidth }))));
await b.close();
