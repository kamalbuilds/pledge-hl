// Overlap test: scrolls each route in steps at 1440/768/390, screenshots each step,
// and fails if any two visible text boxes intersect (excluding ancestor/descendant pairs).
// usage: node e2e/overlap.mjs <baseUrl> [outDir]
const { chromium } = await import(new URL('../design/node_modules/playwright/index.mjs', import.meta.url).href);
import fs from 'node:fs';
const base = process.argv[2] || 'https://pledge-ccs.pages.dev', out = process.argv[3] || 'docs/design/overlap';
fs.mkdirSync(out, { recursive: true });
const routes = ['/', '/#/create', '/#/judges', '/#/business'], widths = [[1440, 900], [768, 1024], [390, 844]];
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
let total = 0; const report = [];
for (const [w, h] of widths) for (const r of routes) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.goto(base + r + (r.includes('?') ? '' : ''), { waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(r === '/' ? 6000 : 2500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const name = r.replace(/[^a-z]/g, '') || 'agreement';
  for (let y = 0, i = 0; y < H; y += Math.floor(h * 0.8), i++) {
    await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(250);
    await p.screenshot({ path: `${out}/${name}-${w}-s${i}.png` });
    const hits = await p.evaluate(() => {
      const els = [...document.querySelectorAll('body *')].filter(e => {
        if (!(e instanceof HTMLElement || e instanceof SVGElement)) return false;
        const hasText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!hasText) return false; const d = e.closest('details:not([open])'); if (d && !e.closest('summary')) return false; const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.opacity === '0' || cs.display === 'none') return false;
        const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.bottom > 0 && b.top < innerHeight;
      });
      const rects = e => { if (e instanceof SVGElement) return [e.getBoundingClientRect()]; const rg = document.createRange(); rg.selectNodeContents(e); const rs = [...rg.getClientRects()].filter(x => x.width > 1 && x.height > 1); return rs.length ? rs : [e.getBoundingClientRect()]; };
      const R = els.map(e => [e, rects(e)]); const out = [];
      for (let a = 0; a < R.length; a++) for (let b = a + 1; b < R.length; b++) {
        const [ea, A] = R[a], [eb, B] = R[b]; if (ea.contains(eb) || eb.contains(ea)) continue;
        let ix = 0, iy = 0; for (const ra of A) for (const rb of B) { const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top); if (x > 2 && y > 2 && x * y > ix * iy) { ix = x; iy = y; } }
        if (ix > 2 && iy > 2) out.push(`${(ea.textContent || '').trim().slice(0, 30)} <> ${(eb.textContent || '').trim().slice(0, 30)} (${Math.round(ix)}x${Math.round(iy)})`);
      }
      return [...new Set(out)];
    });
    hits.forEach(x => report.push(`${name} ${w} s${i}: ${x}`)); total += hits.length;
  }
  await p.close();
}
await browser.close();
fs.writeFileSync(`${out}/report.txt`, report.join('\n') + `\n${total} overlap(s)\n`);
console.log(report.join('\n')); console.log(`${total} overlap(s)`); process.exit(total ? 1 : 0);
