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
const dt = (s: number) => new Date(s * 1000).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export default function App() {
  const [r, setR] = useState(route()); useEffect(() => { const f = () => setR(route()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  useEffect(() => { document.title = r.page === 'create' ? 'PLEDGE: draft a new lock agreement' : `PLEDGE: lock agreement ${short(r.addr)}`; }, [r]);
  return <div className="page">
    <header className="mast">
      <a href="#/" className="word">Pledge</a>
      <p className="mast-note">Lock agreements for unlocked supply, enforced by a HyperEVM contract. Testnet 998.</p>
      <a href={r.page === 'create' ? '#/' : '#/create'} className="mast-link">{r.page === 'create' ? 'Back to the demo agreement' : 'Draft a new agreement'}</a>
    </header>
    {r.page === 'create' ? <Create /> : <Agreement addr={r.addr} />}
    <footer className="foot">{r.page === 'create' ? <p>Deploying creates a new contract on HyperEVM testnet from your connected wallet. Terms are fixed at deployment.</p> : <p>Figures on this page are read live from HyperEVM testnet and HyperCore testnet. Rows marked <span className="sim">fork-simulated</span> ran on a forge fork with HyperCore mocked, and are shown only where a real run was not possible.</p>}</footer>
  </div>;
}

/* Signature component: the release staircase (Figure 1). Amber steps: cumulative HYPE the contract may sell. Navy steps: cumulative filled on HyperCore. Dots: real fills. */
function Staircase({ start, end, cap, deposited, fills, fillsErr }: { start: number; end: number; cap: number; deposited: number; fills: Fill[]; fillsErr?: boolean }) {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440); useEffect(() => { const o = () => setVw(window.innerWidth); window.addEventListener('resize', o); return () => window.removeEventListener('resize', o); }, []); const narrow = vw < 600; const days = Math.max(1, Math.round((end - start) / 86400)), W = narrow ? 360 : 760, H = narrow ? 250 : 330, L = 44, B = 30, T = 16, R = 16;
  const elapsed = Math.max(0, (Date.now() / 1000 - start) / 86400), shown = Math.min(days, Math.max(6, Math.ceil(elapsed) + 5));
  const max = Math.max(deposited, cap, 0.0001) * 1.6;
  const x = (d: number) => L + (d / shown) * (W - L - R), y = (v: number) => T + (1 - Math.min(v, max) / max) * (H - T - B);
  const lim = (v: number) => Math.min(v, deposited); let ghost = `M${x(0)},${y(0)}`, allow = ghost; for (let d = 0; d < shown; d++) { ghost += ` V${y(cap * (d + 1))} H${x(d + 1)}`; allow += ` V${y(lim(cap * (d + 1)))} H${x(d + 1)}`; }
  const pts = fills.filter(f => f.side === 'A').map(f => ({ d: (f.time / 1000 - start) / 86400, sz: Number(f.sz), px: f.px })).sort((a, b) => a.d - b.d);
  let cum = 0, sold = `M${x(0)},${y(0)}`; const dots = pts.map(p => { sold += ` H${x(p.d)}`; cum += p.sz; sold += ` V${y(cum)}`; return { ...p, cum }; });
  const today = Math.min(shown, elapsed); sold += ` H${x(today)}`;
  const rows = Array.from({ length: Math.min(shown, 6) }, (_, d) => ({ d: d + 1, allowed: lim(cap * (d + 1)), filled: pts.filter(p => p.d < d + 1).reduce((a, p) => a + p.sz, 0), future: d + 1 > Math.ceil(elapsed) }));
  return <figure className="fig1" aria-labelledby="fig1-cap">
    <div className="fig1-head"><p className="fig1-n">Figure 1</p><h2 id="fig1-cap">Ceiling and fills, HYPE</h2></div>
    <div className="fig1-body">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Up to ${cap} HYPE per day may be sold; ${cum} HYPE sold so far`}>
        {[0, 0.25, 0.5, 0.75, 1].map(f => <g key={f}><line x1={L} x2={W - R} y1={y(max * f)} y2={y(max * f)} className="grid" /><text x={L - 8} y={y(max * f) + 4} className="ax" textAnchor="end">{+(max * f).toFixed(2)}</text></g>)}
        {Array.from({ length: shown + 1 }, (_, d) => d).filter(d => !narrow || d % 2 === 0 || d === shown).map(d => <text key={d} x={x(d)} y={H - 8} className="ax" textAnchor={d === shown ? 'end' : d === 0 ? 'start' : 'middle'}>{d === 0 ? 'start' : 'day ' + d}</text>)}
        {deposited > 0 && <g><line x1={L} x2={W - R} y1={y(deposited)} y2={y(deposited)} className="dep" /><text x={W - R} y={y(deposited) - 6} className="ax depl" textAnchor="end">deposited {+deposited.toFixed(4)} HYPE</text></g>}
        <path d={ghost} className="ghost" clipPath="url(#plot)" /><clipPath id="plot"><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath><text x={W - R} y={T + 16} textAnchor="end" className="ax ghostl">dashed: needs more deposits</text><path d={allow} className="allow" /><path d={sold} className="sold" />
        <line x1={x(today)} x2={x(today)} y1={T} y2={H - B} className="now" /><text x={x(today) + 6} y={T + 10} className="ax">now</text>
        {dots.map((p, i) => <g key={i}><circle cx={x(p.d)} cy={y(p.cum)} r="6" className="dot" /><text x={x(p.d) + 12} y={y(p.cum) + 18} className="ax dotl">real fill: {p.sz} HYPE @ {p.px}</text></g>)}
      </svg>
      <details className="fig1-tw" open={!narrow}><summary>Values by day</summary><Table className="fig1-table"><TableHeader><TableRow><TableHead>Day</TableHead><TableHead className="num">Ceiling</TableHead><TableHead className="num">Filled</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map(r => <TableRow key={r.d} className={r.future ? 'future' : ''}><TableCell>{r.d}</TableCell><TableCell className="num">{+r.allowed.toFixed(2)}</TableCell><TableCell className="num">{r.future ? '' : +r.filled.toFixed(4)}</TableCell></TableRow>)}</TableBody></Table></details>
    </div>
    <figcaption><span className="lg"><span className="k allowk" />Ceiling (deposit-capped)</span><span className="lg"><span className="k ghostk" />If more is deposited</span><span className="lg"><span className="k soldk" />Filled on HyperCore</span><span className="lg"><span className="k dotk" />Real fill</span><span className="src">Ceiling is the most that can have filled by that day. Source: live testnet reads{fillsErr ? <span className="bad">; fill history is currently unavailable, figures may be stale</span> : null}.</span></figcaption>
  </figure>;
}

function Countdown({ to }: { to: number }) { const [n, setN] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i); }, []);
  const s = Math.max(0, Math.floor(to - n / 1000)); return <span className="fig">{Math.floor(s / 86400)}d {Math.floor(s % 86400 / 3600)}h {Math.floor(s % 3600 / 60)}m</span>; }

type Try = { label: string; btn: string; fn: string; args: any[]; as: 'team' | 'anyone'; rule: string; tx?: string };
function Agreement({ addr }: { addr: Address }) {
  const [s, setS] = useState<State | null>(null); const [err, setErr] = useState(''); const [fills, setFills] = useState<Fill[]>([]); const [fillsErr, setFillsErr] = useState(false); const [fillsLoaded, setFillsLoaded] = useState(false); const [depOpen, setDepOpen] = useState(false); const [depAmt, setDepAmt] = useState('0.5');
  const [tries, setTries] = useState<Record<string, { ok: boolean; reason: string; at: string }>>({}); const [busy, setBusy] = useState(''); const [running, setRunning] = useState(''); const [log, setLog] = useState<string[]>([]);
  const load = useCallback(async () => { try { const [st, f] = await Promise.all([readState(addr), coreFills(addr).then(x => ({ ok: true, x })).catch(() => ({ ok: false, x: [] as Fill[] }))]); setS(st); setFillsErr(!f.ok); if (f.ok) { setFills(f.x); setFillsLoaded(true); } setErr(''); } catch (e) { setErr(String(e)); } }, [addr]);
  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, [load]);
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
  const reconcile = () => act('Reconcile', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'reconcile', args: [], chain: w.chain, account: w.account! }); await pub.waitForTransactionReceipt({ hash: h }); return `Fills reconciled, tx ${short(h)}`; });
  const deposit = () => act('Deposit', async () => { setDepOpen(false); const amt = depAmt; if (!depOk) throw new Error('enter an amount above 0 with at most 8 decimals');
    const hl = await import('@nktkas/hyperliquid'); const w = await wallet(); const ex = new hl.ExchangeClient({ wallet: w as any, transport: new hl.HttpTransport({ isTestnet: true }) });
    await ex.spotSend({ destination: addr, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: amt }); return `${amt} HYPE locked on HyperCore`; });
  const used = s.remaining === 0n || s.balance === 0n; const depOk = /^\d+(\.\d{1,8})?$/.test(depAmt) && Number(depAmt) > 0 && Number(depAmt) <= 1e6;

  return <main className="agreement">
    <section className="top">
      <div className="top-text">
        <p className="ref">Agreement <a href={`${EXPLORER}/address/${addr}`} target="_blank" rel="noreferrer" className="fig">{short(addr)}</a> on HyperEVM testnet, signed by team <span className="fig">{short(s.team)}</span></p>
        <h1>Lock agreement for {known ? +deposited.toFixed(4) : `at least ${+deposited.toFixed(4)}`} HYPE of unlocked supply</h1>
        <div className="now-line" role="status"><p className="avail"><span className="avail-k">Available to sell now</span> <span className="fig avail-v">{fmt8(s.remaining < s.balance ? s.remaining : s.balance)} HYPE</span> <button className="btn-outline jump" onClick={() => s.balance === 0n ? setDepOpen(true) : document.getElementById('status')?.scrollIntoView()}>{s.balance === 0n ? 'Deposit HYPE' : 'Go to actions'}</button></p><p><span className="fig">{fmt8(s.balance)} HYPE</span> locked now. <span className="fig">{soldTxt}</span> sold for <span className="fig">{procTxt}</span>. {s.balance === 0n ? <>Nothing left to sell until the team deposits more.</> : <>Next allowance in <Countdown to={nextDay} />.</>}{fillsErr && <span className="bad"> {known ? 'Fill history unavailable right now; sold and proceeds show the last successful read.' : 'Fill history has not loaded yet, so amounts sold are unknown.'}</span>}</p></div>
        <p className="lede">The team placed this supply with a contract that sells it on the HyperCore spot book, at most {cap} HYPE a day, never below ${fmt8(s.floor, 2)}. No one can change or cancel these terms, the team included.</p>
      </div>
      <nav className="jumps" aria-label="Sections">{[['c1', 'Terms'], ['c6', 'Sales'], ['status', 'Status and actions']].map(([id, t]) => <button key={id} className="btn-text" onClick={() => document.getElementById(id)?.scrollIntoView()}>{t}</button>)}</nav>
      <Staircase start={Number(s.start)} end={Number(s.end)} cap={cap} deposited={deposited} fills={fills} fillsErr={fillsErr} />
    </section>

    <div className="cols">
      <article className="doc">
        <ol className="clauses">
          <li id="c1"><h2>Tokens locked</h2>
            <p><span className="fig">{+deposited.toFixed(4)} HYPE</span> deposited. <span className="fig">{fmt8(s.balance)} HYPE</span> is still locked on HyperCore (read live from HyperCore), and <span className="fig">{soldTxt}</span> has been sold for <span className="fig">{procTxt}</span>, which the contract holds until the end date.</p></li>
          <li id="c2"><h2>Maximum sale per day</h2>
            <p>At most <span className="fig">{cap} HYPE</span> of <em>filled</em> size in each 24-hour window. Today: <span className="fig">{fmt8(s.sold)}</span> sold, <span className="fig">{fmt8(s.pending)}</span> awaiting fill, <span className="fig">{fmt8(s.remaining)}</span> left. An order that does not fill returns its size to the day's allowance.</p></li>
          <li id="c3"><h2>Sale price</h2>
            <p>Each sale is an immediate-or-cancel order priced by the contract, not by the caller: the oracle price less {Number(s.dev) / 100}%, and never below the floor.</p>
            <Table className="terms"><TableBody>
              <TableRow><TableHead scope="row">Oracle price</TableHead><TableCell className="num">${fmt8(s.oracle, 3)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Order limit</TableHead><TableCell className="num">${fmt8(s.limit, 3)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Floor</TableHead><TableCell className="num">${fmt8(s.floor, 2)}</TableCell></TableRow>
              <TableRow><TableHead scope="row">Status</TableHead><TableCell className={'num ' + (halted ? 'bad' : '')}>{halted ? 'Halted: limit is under the floor' : 'Selling permitted'}</TableCell></TableRow>
            </TableBody></Table></li>
          <li id="c4"><h2>Cannot cancel</h2>
            <p>The contract has no cancel and no early-withdraw path. Each check below simulates the call against the live contract. It is read-only: no wallet, no gas, nothing is sent.</p>
            <div className="attempts">{TRIES.map(t => { const r = tries[t.label]; return <div className="attempt" key={t.label}>
              <div><p className="a-title">{t.label}</p><p className="meta">{t.rule}{t.tx && <> Already reverted on-chain in <a href={`${EXPLORER}/tx/${t.tx}`} target="_blank" rel="noreferrer" className="fig">{short(t.tx)}</a>.</>}</p></div>
              <div className="a-act">{r ? <p className="verdict" role="status"><Badge variant={r.ok ? 'outline' : 'destructive'}>{r.ok ? 'Allowed' : 'Rejected'}</Badge> <span className="fig">"{r.reason}"</span> <span className="meta fig">{r.at}</span></p> : <button className="btn-outline" onClick={() => run(t)} disabled={running === t.label} aria-busy={running === t.label}>{running === t.label ? 'Simulating' : t.btn}</button>}</div>
            </div>; })}</div></li>
          <li id="c5"><h2>Term</h2>
            <p>Selling began <span className="fig">{dt(Number(s.start))}</span>. Any remainder can be withdrawn by the team from <span className="fig">{dt(Number(s.end))}</span>, in <Countdown to={Number(s.end)} />.</p></li>
          <li id="c6"><h2>Record of sales</h2>
            {fillsErr && <p className="bad" role="alert">Fill history could not be loaded from HyperCore just now{fills.length ? '; showing the last successful read' : ''}. It retries every 10 seconds.</p>}{fills.length === 0 ? <p>{fillsErr ? 'No fill history available.' : 'No fills yet.'} {fillsErr ? '' : ' The first sale appears here within seconds of filling on HyperCore.'}</p> :
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
        <nav className="toc" aria-label="Clauses"><p className="meta">On this agreement</p><ol>{['Tokens locked', 'Maximum sale per day', 'Sale price', 'Cannot cancel', 'Term', 'Record of sales'].map((t, i) => <li key={t}><a href={`#c${i + 1}`} onClick={e => { e.preventDefault(); document.getElementById(`c${i + 1}`)?.scrollIntoView(); }}>{i + 1}. {t}</a></li>)}</ol></nav>
      </aside>
    </div>
  </main>;
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
    <dl className="attrs"><div><dt>Max sale / day</dt><dd className="fig">{f.cap} HYPE</dd></div><div><dt>Floor</dt><dd className="fig">${f.floor}</dd></div><div><dt>Max discount</dt><dd className="fig">{f.band}%</dd></div><div><dt>Selling starts</dt><dd className="fig">{ts(startD)}</dd></div><div><dt>Withdrawal opens</dt><dd className="fig">{ts(endD)}</dd></div><div><dt>Term</dt><dd className="fig">{f.days} days</dd></div><div><dt>Cancelable</dt><dd>No</dd></div></dl>
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
