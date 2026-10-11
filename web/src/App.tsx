/* Hallmark · pre-emit critique: P5 H5 E4 S5 R4 V4. v3 of direction "Vesting contract / term sheet" (cwf/docs/DESIGN-DIRECTIONS.md) */
import { useEffect, useState, useCallback, useRef } from 'react';
import type { Address } from 'viem';
import { ABI, BYTECODE, DEMO, DEMO_DEPLOY_TX, EXPLORER, readState, attempt, wallet, coreFills, fmt8, short, pub, revertReason, type State } from './chain';
import forkSim from './fork-sim.json';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type Fill = { coin: string; px: string; sz: string; side: string; time: number; hash: string };
const route = () => { const h = location.hash.replace(/^#\/?/, ''); if (h.startsWith('create')) return { page: 'create' as const }; const m = h.match(/^p\/(0x[0-9a-fA-F]{40})/); return { page: 'pledge' as const, addr: (m ? m[1] : DEMO) as Address }; };
const dt = (s: number) => new Date(s * 1000).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });

export default function App() {
  const [r, setR] = useState(route()); useEffect(() => { const f = () => setR(route()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  useEffect(() => { document.title = r.page === 'create' ? 'PLEDGE: draft a new lock agreement' : `PLEDGE: lock agreement ${short(r.addr)}`; }, [r]);
  return <div className="page">
    <header className="mast">
      <a href="#/" className="word">Pledge</a>
      <p className="mast-note">Lock agreements for unlocked supply, enforced by a HyperEVM contract. Testnet 998.</p>
      <a href={r.page === 'create' ? '#/' : '#/create'} className="mast-link">{r.page === 'create' ? 'Back to the demo agreement' : 'Draft a new agreement'}</a>
    </header>
    {r.page === 'create' ? <Create /> : <Agreement key={r.addr} addr={r.addr} />}
    <footer className="foot">{r.page === 'create' ? <p>Deploying creates a new contract on HyperEVM testnet from your connected wallet. Terms are fixed at deployment.</p> : <p>Figures on this page are read live from HyperEVM testnet and HyperCore testnet. Rows marked <span className="sim">fork-simulated</span> ran on a forge fork with HyperCore mocked, and are shown only where a real run was not possible.</p>}</footer>
  </div>;
}

/* Signature component: the release staircase (Figure 1). Amber steps: cumulative HYPE the contract may sell. Navy steps: cumulative filled on HyperCore. Dots: real fills. */
function Staircase({ start, end, cap, deposited, fills, fillsErr }: { start: number; end: number; cap: number; deposited: number; fills: Fill[]; fillsErr?: boolean }) {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440); useEffect(() => { const o = () => setVw(window.innerWidth); window.addEventListener('resize', o); return () => window.removeEventListener('resize', o); }, []); const narrow = vw < 600; const days = Math.max(1, Math.round((end - start) / 86400)), W = narrow ? 360 : 760, H = narrow ? 250 : 330, L = 44, B = 30, T = 16, R = 16;
  const elapsed = Math.max(0, (Date.now() / 1000 - start) / 86400), shown = Math.min(days, Math.max(3, Math.ceil(elapsed) + 2));
  const max = Math.max(deposited, cap, 0.0001) * 1.25;
  const x = (d: number) => L + (d / shown) * (W - L - R), y = (v: number) => T + (1 - Math.min(v, max) / max) * (H - T - B);
  const lim = (v: number) => Math.min(v, deposited); let allow = `M${x(0)},${y(0)}`; for (let d = 0; d < shown; d++) { allow += ` V${y(lim(cap * (d + 1)))} H${x(d + 1)}`; }
  const pts = fills.filter(f => f.side === 'A').map(f => ({ d: (f.time / 1000 - start) / 86400, sz: Number(f.sz), px: f.px })).sort((a, b) => a.d - b.d);
  let cum = 0, sold = `M${x(0)},${y(0)}`; const dots = pts.map(p => { sold += ` H${x(p.d)}`; cum += p.sz; sold += ` V${y(cum)}`; return { ...p, cum }; });
  const today = Math.min(shown, elapsed); sold += ` H${x(today)}`;
  const rows = Array.from({ length: Math.min(shown, 6) }, (_, d) => ({ d: d + 1, allowed: lim(cap * (d + 1)), filled: pts.filter(p => p.d < d + 1).reduce((a, p) => a + p.sz, 0), future: d + 1 > Math.ceil(elapsed) }));
  return <figure className="fig1" aria-labelledby="fig1-cap">
    <div className="fig1-head"><p className="fig1-n">Figure 1</p><h2 id="fig1-cap">Ceiling and fills, HYPE</h2></div>
    <div className="fig1-body">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Up to ${cap} HYPE per day may be sold; ${cum} HYPE sold so far`}>
        {[0, lim(cap * shown) / max / 2, lim(cap * shown) / max, 1].map(f => <g key={f}><line x1={L} x2={W - R} y1={y(max * f)} y2={y(max * f)} className="grid" /><text x={L - 8} y={y(max * f) + 4} className="ax" textAnchor="end">{+(max * f).toFixed(2)}</text></g>)}
        {Array.from({ length: shown + 1 }, (_, d) => d).filter(d => !narrow || d % 2 === 0 || d === shown).map(d => <text key={d} x={x(d)} y={H - 8} className="ax" textAnchor={d === shown ? 'end' : d === 0 ? 'start' : 'middle'}>{d === 0 ? 'start' : 'day ' + d}</text>)}
        <text x={W - R} y={y(lim(cap * shown)) - 8} className="ax depl" textAnchor="end">ceiling {+lim(cap * shown).toFixed(4)} HYPE</text>
        <path d={allow} className="allow" /><path d={sold} className="sold" />
        <line x1={x(today)} x2={x(today)} y1={T} y2={H - B} className="now" /><text x={x(today) + 6} y={T + 10} className="ax">now</text>
        {dots.map((p, i) => <g key={i}><circle cx={x(p.d)} cy={y(p.cum)} r="6" className="dot" />{i === dots.length - 1 && <text x={x(p.d) > W * 0.4 ? x(p.d) - 12 : x(p.d) + 12} textAnchor={x(p.d) > W * 0.4 ? 'end' : 'start'} y={y(p.cum) + 20} className="ax dotl">{i === dots.length - 1 && p.cum >= deposited - 1e-9 ? `all ${+p.cum.toFixed(4)} HYPE deposited is sold` : `${+p.cum.toFixed(4)} HYPE filled`}</text>}</g>)}
      </svg>
      <details className="fig1-tw" open={!narrow}><summary>Show values by day</summary><Table className="fig1-table"><TableHeader><TableRow><TableHead>Day</TableHead><TableHead className="num">Ceiling</TableHead><TableHead className="num">Filled</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map(r => <TableRow key={r.d} className={r.future ? 'future' : ''}><TableCell>{r.d}</TableCell><TableCell className="num">{+r.allowed.toFixed(2)}</TableCell><TableCell className="num">{r.future ? '' : +r.filled.toFixed(4)}</TableCell></TableRow>)}</TableBody></Table></details>
    </div>
    <figcaption><span className="lg"><span className="k allowk" />Ceiling: the most that may have sold, capped by the deposit</span><span className="lg"><span className="k soldk" />Filled on HyperCore</span><span className="lg"><span className="k dotk" />Real HyperCore fill (details in clause 6)</span><span className="src">Source: live testnet reads{fillsErr ? <span className="bad">; fill history is unavailable right now, so fills may be missing</span> : null}.</span></figcaption>
  </figure>;
}

function Countdown({ to }: { to: number }) { const [n, setN] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i); }, []);
  const s = Math.max(0, Math.floor(to - n / 1000)); return <span className="fig">{Math.floor(s / 86400)}d {Math.floor(s % 86400 / 3600)}h {Math.floor(s % 3600 / 60)}m</span>; }

type Try = { label: string; btn: string; fn: string; args: any[]; as: 'team' | 'anyone'; rule: string; tx?: string };
function Agreement({ addr }: { addr: Address }) {
  const [s, setS] = useState<State | null>(null); const [err, setErr] = useState(''); const [fills, setFills] = useState<Fill[]>([]); const [fillsErr, setFillsErr] = useState(false); const [fillsLoaded, setFillsLoaded] = useState(false); const [stale, setStale] = useState(false); const hasState = useRef(false); useEffect(() => { hasState.current = !!s; }, [s]); const [depOpen, setDepOpen] = useState(false); const [depAmt, setDepAmt] = useState('0.5');
  const [tries, setTries] = useState<Record<string, { ok: boolean; reverted?: boolean; reason: string; at: string }>>({}); const [busy, setBusy] = useState(''); const [running, setRunning] = useState(''); const [log, setLog] = useState<string[]>([]);
  const load = useCallback(async () => { try { const [st, f] = await Promise.all([readState(addr), coreFills(addr).then(x => ({ ok: true, x })).catch(() => ({ ok: false, x: [] as Fill[] }))]); setS(st); setFillsErr(!f.ok); if (f.ok) { setFills(f.x); setFillsLoaded(true); } setErr(''); setStale(false); } catch (e) { if (hasState.current) setStale(true); else setErr(revertReason(e)); } }, [addr]);
  useEffect(() => { load(); const i = setInterval(load, 20000); return () => clearInterval(i); }, [load]);
  if (err) return <main className="doc-solo"><p className="bad">Could not read agreement {addr}. {err}</p><button className="btn-outline" onClick={load}>Try again</button></main>;
  if (!s) return <main className="doc-solo"><p>Reading agreement {short(addr)} from HyperEVM testnet.</p></main>;
  const cap = Number(s.cap) / 1e8, sells = fills.filter(f => f.side === 'A'), soldAll = sells.reduce((a, f) => a + Number(f.sz), 0);
  const proceedsN = sells.reduce((a, f) => a + Number(f.sz) * Number(f.px), 0);
  const known = fillsLoaded; const soldTxt = known ? `${+soldAll.toFixed(4)} HYPE` : 'an unknown amount of HYPE'; const procTxt = known ? `${proceedsN.toFixed(2)} USDC` : 'unknown USDC'; const deposited = Number(s.balance) / 1e8 + (known ? soldAll : 0) + Number(s.pending) / 1e8, halted = s.limit < s.floor || s.oracle === 0n, isDemo = addr.toLowerCase() === DEMO.toLowerCase();
  const dayIdx = Math.floor((Date.now() / 1000 - Number(s.start)) / 86400), dayStart = Number(s.start) + dayIdx * 86400, nextDay = dayStart + 86400;
  const todays = sells.filter(f => f.time / 1000 >= dayStart);
  const TRIES: Try[] = [
    { label: 'The team cancels the agreement', btn: 'Simulate cancellation', fn: 'cancel', args: [], as: 'team', rule: 'There is no cancel path.', tx: isDemo ? '0x6c32d94980ccd9ea5a50b2f636ef5fc752e9db5b30ca0991f09292cb50eb5c8c' : undefined },
    { label: 'The team withdraws the balance early', btn: 'Simulate early withdrawal', fn: 'release', args: [1105n, s.balance || 1n], as: 'team', rule: 'Withdrawal opens on the end date.', tx: isDemo ? '0x2ff8266478b4200cebfca82d9184cb1ab04d74ba48fdc34598e4b4fb75c6e5d8' : undefined },
    { btn: 'Simulate oversized sale', label: `Anyone sells ${+(cap * 2).toFixed(2)} HYPE today`, fn: 'sell', args: [s.cap * 2n], as: 'anyone', rule: 'Twice the daily maximum.', tx: isDemo ? '0x605126b87e3a908104ccb495b003bd704582e6eeefc3333dcc453f11214c807f' : undefined },
  ];
  const run = async (t: Try) => { setRunning(t.label); const who = t.as === 'team' ? s.team : '0x000000000000000000000000000000000000dEaD' as Address; const r = await attempt(addr, who, t.fn, t.args); setTries(x => ({ ...x, [t.label]: { ...r, at: new Date().toLocaleTimeString() } })); setRunning(''); };
  const act = async (name: string, f: () => Promise<string>) => { setBusy(name); try { const m = await f(); setLog(l => [m, ...l]); } catch (e) { setLog(l => [name + ' failed: ' + revertReason(e), ...l]); } setBusy(''); load(); };
  const sellSlice = () => act('Sale', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'sell', args: [s.remaining < 50000000n ? s.remaining : 50000000n], gas: 400000n, chain: w.chain, account: w.account! }); const rc = await pub.waitForTransactionReceipt({ hash: h }); return `Sale ${rc.status === 'success' ? 'submitted' : 'reverted'}, tx ${short(h)}`; });
  const reconcile = () => act('Reconcile', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'reconcile', args: [], chain: w.chain, account: w.account! }); const rc = await pub.waitForTransactionReceipt({ hash: h }); if (rc.status !== 'success') throw new Error(`reconcile reverted, tx ${short(h)}`); return `Fills reconciled, tx ${short(h)}`; });
  const deposit = () => act('Deposit', async () => { setDepOpen(false); const amt = depAmt; if (!depOk) throw new Error('enter an amount above 0 with at most 8 decimals');
    const hl = await import('@nktkas/hyperliquid'); const w = await wallet(); const ex = new hl.ExchangeClient({ wallet: w as any, transport: new hl.HttpTransport({ isTestnet: true }) });
    const before = s.balance; await ex.spotSend({ destination: addr, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: amt }); for (let i = 0; i < 10; i++) { await new Promise(r => setTimeout(r, 2000)); const st = await readState(addr).catch(() => null); if (st && st.balance > before) { const inc = Number(st.balance - before) / 1e8; return Math.abs(inc - Number(amt)) < 1e-8 ? `${amt} HYPE locked on HyperCore; contract balance is now ${fmt8(st.balance)} HYPE` : `Sent ${amt} HYPE; the contract balance changed by ${+inc.toFixed(8)} HYPE to ${fmt8(st.balance)} HYPE`; } } return `${amt} HYPE sent; the contract balance has not updated yet, refresh in a minute`; });
  const used = s.remaining === 0n || s.balance === 0n; const depOk = /^\d+(\.\d{1,8})?$/.test(depAmt) && Number(depAmt) > 0 && Number(depAmt) <= 1e6;

  return <main className="agreement">
    <section className="top">
      <div className="top-text">
        <p className="ref">Agreement <a href={`${EXPLORER}/address/${addr}`} target="_blank" rel="noreferrer" className="fig">{short(addr)}</a> on HyperEVM testnet, signed by team <span className="fig">{short(s.team)}</span></p>
        <h1>Lock agreement: {known ? +deposited.toFixed(4) : `at least ${+deposited.toFixed(4)}`} HYPE deposited, {fmt8(s.balance)} still locked</h1>
        <div className="now-line" role="status"><p className="avail"><span className="avail-k">Available to sell now</span> <span className="fig avail-v">{fmt8(s.remaining < s.balance ? s.remaining : s.balance)} HYPE</span> <button className="btn-outline jump" onClick={() => s.balance === 0n ? setDepOpen(true) : document.getElementById('status')?.scrollIntoView()}>{s.balance === 0n ? 'Deposit HYPE' : 'Go to actions'}</button></p><p><span className="fig">{fmt8(s.balance)} HYPE</span> locked now. <span className="fig">{soldTxt}</span> sold for <span className="fig">{procTxt}</span>. {s.balance === 0n ? <>Nothing left to sell until the team deposits more.</> : <>Next allowance in <Countdown to={nextDay} />.</>}{stale && <span className="bad"> The testnet RPC did not answer the last refresh; showing the previous read.</span>}{fillsErr && <span className="bad"> {known ? 'Fill history unavailable right now; sold and proceeds show the last successful read.' : 'Fill history has not loaded yet, so amounts sold are unknown.'}</span>}</p></div>
        <p className="lede">The team placed this supply with a contract that sells it on the HyperCore spot book, at most {cap} HYPE a day, never below ${fmt8(s.floor, 2)}. No one can change or cancel these terms, the team included.</p>
      </div>
      <nav className="jumps" aria-label="Sections">{[['c1', 'Terms'], ['c6', 'Sales'], ['status', 'Status'], ['judges', 'For judges'], ['business', 'Business']].map(([id, t]) => <button key={id} className="btn-text" onClick={() => document.getElementById(id)?.scrollIntoView()}>{t}</button>)}</nav>
      {known ? <Staircase start={Number(s.start)} end={Number(s.end)} cap={cap} deposited={deposited} fills={fills} fillsErr={fillsErr} /> : <figure className="fig1"><div className="fig1-head"><p className="fig1-n">Figure 1</p><h2>Ceiling and fills, HYPE</h2></div><p role="status">{fillsErr ? 'The fill history from HyperCore has not loaded, so this figure is not drawn. It retries every 20 seconds.' : 'Loading the fill history from HyperCore.'}</p></figure>}
    </section>

    <div className="cols">
      <article className="doc">
        <ol className="clauses">
          <li id="c1"><h2>Tokens locked</h2>
            <p><span className="fig">{known ? '' : 'at least '}{+deposited.toFixed(4)} HYPE</span> deposited. <span className="fig">{fmt8(s.balance)} HYPE</span> is still locked on HyperCore (read live from HyperCore), and <span className="fig">{soldTxt}</span> has been sold for <span className="fig">{procTxt}</span>, which the contract holds until the end date.</p></li>
          <li id="c2"><h2>Maximum sale per day</h2>
            <p>At most <span className="fig">{cap} HYPE</span> of <em>filled</em> size in each 24-hour window. Today: <span className="fig">{fmt8(s.sold)}</span> sold, <span className="fig">{fmt8(s.pending)}</span> awaiting fill, <span className="fig">{fmt8(s.remaining)}</span> left. An order that does not fill returns its size to the day's allowance.</p></li>
          <li id="c3"><h2>Sale price</h2>
            <p>Each sale is an immediate-or-cancel order priced by the contract, not by the caller: the oracle price less {Number(s.dev) / 100}%, and never below the floor.</p>
            <Table className="terms"><TableBody>
              <TableRow><TableHead scope="row">Oracle price</TableHead><TableCell className="num">${fmt8(s.oracle, 3)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Order limit</TableHead><TableCell className="num">${fmt8(s.limit, 3)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Floor</TableHead><TableCell className="num">${fmt8(s.floor, 2)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Price check</TableHead><TableCell className={'num ' + (halted ? 'bad' : '')}>{halted ? 'Fails: the order limit is under the floor, so sales halt' : 'Passes: the order limit is above the floor'}</TableCell></TableRow>
            </TableBody></Table></li>
          <li id="c4"><h2>Cannot cancel</h2>
            <p>The contract has no cancel and no early-withdraw path. Each check below simulates the call against the live contract. It is read-only: no wallet, no gas, nothing is sent.</p>
            <div className="attempts">{TRIES.map(t => { const r = tries[t.label]; return <div className="attempt" key={t.label}>
              <div><p className="a-title">{t.label}</p><p className="meta">{t.rule}{t.tx && <> Already reverted on-chain in <a href={`${EXPLORER}/tx/${t.tx}`} target="_blank" rel="noreferrer" className="fig">{short(t.tx)}</a>.</>}</p></div>
              <div className="a-act">{r ? <p className="verdict" role="status"><Badge variant={r.ok || !r.reverted ? 'outline' : 'destructive'}>{r.ok ? 'Allowed' : r.reverted ? 'Rejected by the contract' : 'Could not check (network)'}</Badge> <span className="fig">"{r.reason}"</span> <span className="meta fig">{r.at}</span></p> : <button className="btn-outline" onClick={() => run(t)} disabled={running === t.label} aria-busy={running === t.label}>{running === t.label ? 'Simulating' : t.btn}</button>}</div>
            </div>; })}</div></li>
          <li id="c5"><h2>Term</h2>
            <p>Selling began <span className="fig">{dt(Number(s.start))}</span>. Any remainder can be withdrawn by the team from <span className="fig">{dt(Number(s.end))}</span>, in <Countdown to={Number(s.end)} />.</p></li>
          <li id="c6"><h2>Record of sales</h2>
            {fillsErr && <p className="bad" role="alert">Fill history could not be loaded from HyperCore just now{fills.length ? '; showing the last successful read' : ''}. It retries every 20 seconds.</p>}{fills.length === 0 ? <p>{fillsErr ? 'No fill history available.' : 'No fills yet.'} {fillsErr ? '' : ' The first sale appears here within seconds of filling on HyperCore.'}</p> :
            <Table className="ledger"><TableHeader><TableRow><TableHead>Time</TableHead><TableHead className="hide-sm">Side</TableHead><TableHead className="num hide-sm">Size</TableHead><TableHead className="num hide-sm">Price</TableHead><TableHead className="hide-sm">HyperCore hash</TableHead></TableRow></TableHeader>
              <TableBody>{fills.map(f => <TableRow key={f.hash + f.time}><TableCell className="fig">{new Date(f.time).toLocaleString()}<span className="show-sm">{f.side === 'A' ? 'Sold' : 'Bought'} <span className="fig">{f.sz} HYPE @ {f.px}</span></span><span className="show-sm meta">Real fill, hash <a href={`https://app.hyperliquid-testnet.xyz/explorer/tx/${f.hash}`} target="_blank" rel="noreferrer">{short(f.hash)}</a></span></TableCell><TableCell className="hide-sm">{f.side === 'A' ? 'Sell' : 'Buy'} <Badge variant="outline">real</Badge></TableCell><TableCell className="num hide-sm">{f.sz}</TableCell><TableCell className="num hide-sm">{f.px}</TableCell><TableCell className="fig hide-sm">{short(f.hash)}</TableCell></TableRow>)}</TableBody></Table>}
            <details className="annex"><summary>Annex A. Checks run on a simulated copy of the chain <Badge variant="outline">fork-simulated</Badge></summary>
              <p className="meta">{forkSim.note}</p>
              <Table className="ledger"><TableBody>{forkSim.runs.map((x: any) => <TableRow key={x.name}><TableCell>{x.name}</TableCell><TableCell className="meta">{x.detail}</TableCell><TableCell className="num">{x.pass ? 'Pass' : 'Fail'}</TableCell></TableRow>)}</TableBody></Table></details>
            {isDemo && <p className="meta">Agreement created in tx <a href={`${EXPLORER}/tx/${DEMO_DEPLOY_TX}`} target="_blank" rel="noreferrer" className="fig">{short(DEMO_DEPLOY_TX)}</a>.</p>}</li>
        </ol>
      </article>

      <aside className="rail" id="status" aria-label="Agreement status">
        <h2 className="rail-h">Agreement status</h2>
        <dl className="attrs">
          <div><dt>Locked now</dt><dd className="fig lock">{fmt8(s.balance)} HYPE</dd></div>
          <div><dt>Sold today</dt><dd className="fig">{fmt8(s.sold)} of {cap}</dd></div>
          <div><dt>Cancelable</dt><dd>No, by construction</dd></div>
          <div><dt>Floor</dt><dd className="fig">${fmt8(s.floor, 2)}</dd></div>
          <div><dt>Order limit now</dt><dd className="fig">${fmt8(s.limit, 3)}</dd></div>
          <div><dt>Ends</dt><dd className="fig">{dt(Number(s.end))}</dd></div>
        </dl>
        <h3 className="rail-h3">Today's sale, day {dayIdx + 1}</h3>
        <ol className="tl">
          <li className="done"><span className="tl-dot" /><div><p>Allowance of <span className="fig">{cap} HYPE</span> opened</p><p className="meta fig">{new Date(dayStart * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div></li>
          {todays.map(f => <li className="done" key={f.hash}><span className="tl-dot" /><div><p>Filled <span className="fig">{f.sz} HYPE @ {f.px}</span></p><p className="meta fig">{new Date(f.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div></li>)}
          {s.pending > 0n && <li className="cur"><span className="tl-dot" /><div><p><span className="fig">{fmt8(s.pending)} HYPE</span> awaiting fill</p></div></li>}
          <li className={used ? 'done' : 'cur'}><span className="tl-dot" /><div><p>{used ? (s.balance === 0n ? 'Nothing left to sell' : "Today's allowance is used") : <><span className="fig">{fmt8(s.remaining)} HYPE</span> may still be sold today</>}</p><p className="meta">Next allowance in <Countdown to={nextDay} /></p></div></li>
        </ol>
        <div className="rail-act">
          {used ? <><p className="meta">{s.balance === 0n ? 'Nothing is left to sell. Another sale needs a new deposit and the next allowance.' : 'Selling resumes when the next allowance opens. Anyone may trigger it; the caller only picks the size.'}</p>
              <Dialog open={depOpen} onOpenChange={setDepOpen}><DialogTrigger asChild><button className="btn-outline wide" disabled={!!busy}>{busy === 'Deposit' ? 'Depositing' : 'Deposit HYPE into this agreement'}</button></DialogTrigger>
                <DialogContent className="sign"><DialogHeader><DialogTitle className="sign-t">Lock more HYPE</DialogTitle><DialogDescription className="sign-d">Sent from your HyperCore spot balance to this contract. It cannot be withdrawn before {dt(Number(s.end))}.</DialogDescription></DialogHeader>
                  <label className="dep-l">Amount, HYPE<input inputMode="decimal" value={depAmt} onChange={e => setDepAmt(e.target.value)} aria-invalid={!depOk} /></label>
                  {!depOk && <p className="bad">Enter an amount above 0, at most 8 decimals.</p>}
                  <DialogFooter><DialogClose asChild><button className="btn-text">Go back</button></DialogClose><button className="btn-primary" onClick={deposit} disabled={!depOk}>Lock {depAmt} HYPE</button></DialogFooter></DialogContent></Dialog></>
            : <><button className="btn-primary wide" onClick={sellSlice} disabled={!!busy}>{busy === 'Sale' ? 'Submitting sale' : "Trigger today's sale"}</button><p className="meta">Anyone may trigger it; the caller only picks the size.</p></>}
          <button className="btn-text" onClick={reconcile} disabled={!!busy}>{busy === 'Reconcile' ? 'Reconciling' : 'Reconcile fills'}</button>
          {log.length > 0 && <ul className="log" aria-live="polite">{log.map((l, i) => <li key={i} className="fig">{l}</li>)}</ul>}
        </div>
        <nav className="toc" aria-label="Clauses"><p className="meta">On this agreement</p><ol>{['Tokens locked', 'Maximum sale per day', 'Sale price', 'Cannot cancel', 'Term', 'Record of sales'].map((t, i) => <li key={t}><a href={`#c${i + 1}`} onClick={e => { e.preventDefault(); document.getElementById(`c${i + 1}`)?.scrollIntoView(); }}>{i + 1}. {t}</a></li>)}{[['judges', 'Annex B. For judges'], ['business', 'Annex C. Business model']].map(([id, t]) => <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView(); }}>{t}</a></li>)}</ol></nav>
      </aside>
    </div>
    <Annexes addr={addr} />
  </main>;
}

const E2E = { pledge: '0x9af101c5d73432510e037dc8b05ec35811de91a5', create: '0x1327f21141d54cbb8667c1c7ede7a28b494f48c602eee9e36bdb254a45fa3d57', sale: '0x5f9fb781be281ef3fe5acfb59c05ca45803314ba46ece30e117bb2f7fe051913', reconcile: '0x48b4ea63b122be32ab223c9f05b40936649ca0877f93b2e7a9549cbb59c65bd7' };
function Annexes({ addr }: { addr: Address }) {
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('');
  const curl = `curl -s -X POST https://api.hyperliquid-testnet.xyz/info -H 'content-type: application/json' -d '{"type":"userFills","user":"${addr}"}'`;
  return <section className="annexes">
    <article className="annex-doc" id="judges">
      <p className="fig1-n">Annex B</p><h2>For judges: how to verify it on-chain</h2>
      <ol className="steps">
        <li><p><b>The contract exists and holds the terms.</b> Open <a href={`${EXPLORER}/address/${addr}`} target="_blank" rel="noreferrer" className="fig">{short(addr)}</a> on the HyperEVM testnet explorer. The source is in the project repo at <span className="fig">contracts/src/Pledge.sol</span>, and the explorer's <a href={`${EXPLORER}/address/${addr}`} target="_blank" rel="noreferrer">contract page</a> shows the deployed bytecode; it has no owner, no admin and no withdraw before the end date.</p></li>
        <li><p><b>It cannot be cancelled.</b> Press the three "Simulate" buttons in <a href="#c4" onClick={e => { e.preventDefault(); document.getElementById('c4')?.scrollIntoView(); }}>clause 4</a>. Each one asks the live contract. While the term runs, each comes back "Rejected by the contract". After the end date the team's withdrawal is allowed, as the terms say. "Could not check (network)" means the RPC failed, not the contract. {addr.toLowerCase() === DEMO.toLowerCase() ? ' On this demo agreement the same calls were also sent as real transactions and reverted; the links are next to each check.' : ''}</p></li>
        <li><p><b>Check this agreement's fills on HyperCore.</b> They are also listed in <a href="#c6" onClick={e => { e.preventDefault(); document.getElementById('c6')?.scrollIntoView(); }}>clause 6</a>, read from the same API. Run this and look for side "A" (sell) fills. An agreement that has not sold yet returns an empty list.</p><pre className="code fig">{curl}</pre><button className="btn-outline" onClick={() => (navigator.clipboard ? navigator.clipboard.writeText(curl) : Promise.reject()).then(() => setCopied('ok'), () => setCopied('fail'))}>{copied === 'ok' ? 'Copied' : 'Copy command'}</button>{copied === 'fail' && <p className="bad">The browser blocked copying. Select the command above and copy it by hand.</p>}</li>
        <li><p><b>The full flow works from a wallet.</b> On a separate test agreement, our click-through test drafted a new agreement, deposited 0.5 HYPE, triggered a sale and reconciled it, from a browser wallet on testnet: agreement <a href={`${EXPLORER}/address/${E2E.pledge}`} target="_blank" rel="noreferrer" className="fig">{short(E2E.pledge)}</a>, create <a href={`${EXPLORER}/tx/${E2E.create}`} target="_blank" rel="noreferrer" className="fig">{short(E2E.create)}</a>, sale <a href={`${EXPLORER}/tx/${E2E.sale}`} target="_blank" rel="noreferrer" className="fig">{short(E2E.sale)}</a>, reconcile <a href={`${EXPLORER}/tx/${E2E.reconcile}`} target="_blank" rel="noreferrer" className="fig">{short(E2E.reconcile)}</a>. The fill was 0.5 HYPE at 22.538 against bids already on the testnet book.</p></li>
      </ol>
      <h3 className="rail-h3">What is real and what is simulated</h3><ul className="rvl"><li><span className="rv-b"><Badge variant="outline">real, testnet</Badge></span><span>Contract deployed, terms fixed, cancel and early withdraw revert</span></li><li><span className="rv-b"><Badge variant="outline">real, testnet</Badge></span><span>Deposit of HYPE from HyperCore into the contract</span></li><li><span className="rv-b"><Badge variant="outline">real, testnet</Badge></span><span>Sale as an IOC order on the HyperCore HYPE/USDC book, filled size counted against the daily cap</span></li><li><span className="rv-b"><Badge variant="outline">real, testnet</Badge> (an earlier IOC was cancelled and refunded)</span><span>Unfilled orders return their size to the day's allowance</span></li><li><span className="rv-b"><Badge variant="outline">real, testnet</Badge></span><span>Sale blocked under the floor, sale blocked before the start date, team withdraws the remainder after the end date, anyone (not just the team) can trigger a sale. Txs in the repo: deployments/feature-tests.json and keeper-test.json</span></li><li><span className="rv-b"><Badge variant="outline">fork-simulated</Badge> see Annex A</span><span>The daily allowance resetting across several days, and a price crash below the floor mid-term</span></li><li><span className="rv-b"><Badge variant="outline">planned</Badge></span><span>The 0.25% fee, mainnet, other tokens</span></li></ul>
    </article>
    <article className="annex-doc" id="business">
      <p className="fig1-n">Annex C</p><h2>Business model</h2>
      <p><b>Who pays:</b> the token team or foundation that locks supply. They get a public, checkable promise about how the locked supply will be sold, which they can show to exchanges, market makers and holders. Buyers and keepers pay no PLEDGE fee, only normal network gas.</p>
      <p><b>Fee (proposed, not in the testnet contract):</b> 0.25% of filled sale proceeds, taken in USDC as each sale fills. A team only pays when the plan is working. For comparison, Streamflow charges 0.16 SOL per contract plus 0.19% of the tokens vested, or 0.16 SOL plus 0.5% for a token lock, both on the allocated amount; Sablier's interface charges $0.99 per stream withdrawal. PLEDGE's proposed fee is on filled sale proceeds instead.</p>
      <p><b>Market:</b> Tokenomist counts <span className="fig">$97.43B</span> of tokens unlocked in 2025, of which <span className="fig">$18.77B</span> went to insiders (team and investors), the supply holders worry about most. HYPE itself unlocked about <span className="fig">$496M</span> in 2025. Illustration only: if 1% of insider unlocks were sold through PLEDGE at 0.25%, that is about <span className="fig">$470K</span> a year in fees. This is the global unlock market, not evidence of demand on Hyperliquid or of willingness to pay.</p>
      <p className="meta">Sources: <a href="https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact" target="_blank" rel="noreferrer">Tokenomist 2025 Token Unlocks Review</a>; <a href="https://streamflow.finance/blog/how-much-does-streamflow-cost" target="_blank" rel="noreferrer">Streamflow pricing</a>; <a href="https://docs.sablier.com/concepts/fees" target="_blank" rel="noreferrer">Sablier fees</a>.</p>
    </article>
  </section>;
}

function Create() {
  const [f, setF] = useState({ cap: '0.5', floor: '5', start: '', days: '30', band: '2' }); const [out, setOut] = useState(''); const [busy, setBusy] = useState(false); const [open, setOpen] = useState(false);
    const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value }); const capOk = /^\d+(\.\d{1,2})?$/.test(f.cap) && Number(f.cap) > 0 && Number(f.cap) <= 1e6, floorOk = /^\d+(\.\d{1,8})?$/.test(f.floor) && Number(f.floor) > 0 && Number(f.floor) <= 1e9, bandOk = /^\d+(\.\d{1,2})?$/.test(f.band) && Number(f.band) > 0 && Number(f.band) < 100, daysOk = /^\d+$/.test(f.days) && Number(f.days) >= 1 && Number(f.days) <= 3650, valid = capOk && floorOk && bandOk && daysOk; const ts = (d: Date) => d.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }); const startD = f.start ? new Date(f.start) : new Date(); const endD = new Date(startD.getTime() + Number(f.days || 0) * 86400000);
  const go = async () => { setOpen(false); setBusy(true); setOut('');
    try { const w = await wallet(); const start = f.start ? BigInt(Math.floor(new Date(f.start).getTime() / 1000)) : 0n;
      const cap = BigInt(Math.round(Number(f.cap) * 100)) * 1000000n;
      const h = await w.deployContract({ abi: ABI, bytecode: BYTECODE, args: [11035, 1035, 1105n, cap, BigInt(Math.round(Number(f.floor) * 1e8)), BigInt(Math.round(Number(f.band) * 100)), 100n, start, BigInt(f.days)], chain: w.chain, account: w.account! });
      const r = await pub.waitForTransactionReceipt({ hash: h }); location.hash = '#/p/' + r.contractAddress; }
    catch (e) { setOut(revertReason(e)); } setBusy(false); };
  return <main className="cols create"><article className="doc">
    <p className="ref">Draft agreement for HYPE on the HyperCore HYPE/USDC spot book</p>
    <h1>Draft a lock agreement</h1>
    <p className="lede">Once signed, these terms are fixed in the contract. Nobody can loosen them, the team included.</p>
    <ol className="clauses form">
      <li><h2>Maximum sale per day</h2><label>HYPE of filled size per 24 hours<input inputMode="decimal" value={f.cap} onChange={set('cap')} aria-invalid={!capOk} /></label>{!capOk && <p className="bad">Use a number above 0 with at most 2 decimals.</p>}</li>
      <li><h2>Start</h2><label>Selling begins (leave blank to start now)<input type="datetime-local" value={f.start} onChange={set('start')} /></label></li>
      <li><h2>Term</h2><label>Length in days<input inputMode="numeric" value={f.days} onChange={set('days')} aria-invalid={!daysOk} /></label>{!daysOk && <p className="bad">A whole number of days, 1 to 3650.</p>}</li>
      <li><h2>Sale price</h2><label>Floor, USDC per HYPE<input inputMode="decimal" value={f.floor} onChange={set('floor')} aria-invalid={!floorOk} /></label>{!floorOk && <p className="bad">Above 0, at most 8 decimals.</p>}<label>Largest discount to the oracle, %<input inputMode="decimal" value={f.band} onChange={set('band')} aria-invalid={!bandOk} /></label>{!bandOk && <p className="bad">Above 0 and under 100, at most 2 decimals.</p>}</li>
    </ol>
    {out && <p className="bad">{out}</p>}
  </article>
  <aside className="rail" aria-label="Summary">
    <h2 className="rail-h">You are agreeing to</h2>
    <dl className="attrs"><div><dt>Max sale / day</dt><dd className="fig">{f.cap} HYPE</dd></div><div><dt>Floor</dt><dd className="fig">${f.floor}</dd></div><div><dt>Max discount</dt><dd className="fig">{f.band}%</dd></div><div><dt>Selling starts</dt><dd className="fig">{ts(startD)}</dd></div><div><dt>Withdrawal opens</dt><dd className="fig">{ts(endD)}</dd></div><div><dt>Term</dt><dd className="fig">{f.days} days</dd></div><div className="full"><dt>Cancelable</dt><dd>No. There is no cancel or early withdraw path.</dd></div></dl>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><button className="btn-primary wide" disabled={busy || !valid}>{busy ? 'Deploying' : 'Review and sign'}</button></DialogTrigger>
      <DialogContent className="sign">
        <DialogHeader><DialogTitle className="sign-t">Sign this agreement</DialogTitle><DialogDescription className="sign-d">These terms cannot be changed after deployment.</DialogDescription></DialogHeader>
        <ol className="sign-l"><li>Sell at most <span className="fig">{f.cap} HYPE</span> per day.</li><li>Never below <span className="fig">${f.floor}</span>, and no more than <span className="fig">{f.band}%</span> under the oracle.</li><li>Selling starts <span className="fig">{ts(startD)}</span>. No cancellation, and no withdrawal until <span className="fig">{ts(endD)}</span>.</li></ol>
        <DialogFooter><DialogClose asChild><button className="btn-text">Go back</button></DialogClose><button className="btn-primary" onClick={go}>Sign and deploy on testnet</button></DialogFooter>
      </DialogContent>
    </Dialog>
    {!valid && <p className="bad">Fix the highlighted terms before signing.</p>}<p className="meta">Next: deposit HYPE from your HyperCore spot balance on the agreement page.</p>
  </aside></main>;
}
