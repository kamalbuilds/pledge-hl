// Playwright port of ui-craft scripts/refshot.py (bhn deepsurge hung). Same contract: refuses error/challenge/blank pages (exit 2), writes <out>.tokens.json.
import { chromium } from 'playwright'; import fs from 'node:fs';
const a = process.argv.slice(2).filter(x => !x.startsWith('--')); const FULL = process.argv.includes('--full');
const [url, out, W = '1440', H = '900'] = a; const tokOut = out.replace(/\.png$/, '.tokens.json');
const BAD = ["can't be reached", 'access denied', 'just a moment', 'verify you are human', 'attention required', 'page not found', 'enable javascript', 'this site can', 'took too long'];
const b = await chromium.launch({ executablePath: process.env.CHROME });
const p = await b.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' });
try { await p.goto(url, { waitUntil: 'load', timeout: 45000 }); await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2500); }
catch (e) { console.log(JSON.stringify({ ok: false, url, reason: 'nav: ' + e.message.slice(0, 80) })); process.exit(2); }
const tok = await p.evaluate(() => { const pick = el => { if (!el) return null; const s = getComputedStyle(el); return { text: (el.innerText || el.value || '').trim().slice(0, 60), font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, tracking: s.letterSpacing, leading: s.lineHeight, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, padding: s.padding, border: s.border, transform: s.textTransform }; };
  const q = sel => pick([...document.querySelectorAll(sel)].find(e => e.offsetParent !== null && (e.innerText || '').trim())); const fonts = new Set(); document.fonts.forEach(f => { if (f.status === 'loaded') fonts.add(f.family.replace(/"/g, '')); });
  return { title: document.title, h1: q('h1'), h2: q('h2'), h3: q('h3'), body: pick(document.body), p: q('p'), a: q('a'), button: q('button, [role=button]'), input: pick(document.querySelector('input')), loadedFonts: [...fonts], htmlBg: getComputedStyle(document.documentElement).backgroundColor, bodyText: (document.body.innerText || '').slice(0, 400), textLen: (document.body.innerText || '').length, height: document.documentElement.scrollHeight }; });
const low = (tok.title + ' ' + tok.bodyText).toLowerCase(); const bad = BAD.find(x => low.includes(x)); if (bad || tok.textLen < 80) { console.log(JSON.stringify({ ok: false, url, reason: bad || 'blank/short text' })); process.exit(2); }
await p.screenshot({ path: out, fullPage: FULL }); fs.writeFileSync(tokOut, JSON.stringify({ url, viewport: [+W, +H], ...tok }, null, 1));
console.log(JSON.stringify({ ok: true, url, out, title: tok.title, fonts: tok.loadedFonts.slice(0, 5), h1: tok.h1 && [tok.h1.font.slice(0, 40), tok.h1.size] })); await b.close();
