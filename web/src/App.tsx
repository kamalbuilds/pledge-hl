/* Hallmark · macrostructure: product dashboard · theme: wise-inspired v4 (docs/design/DESIGN.md) */
import { useEffect, useState, useCallback, useRef } from 'react';
import type { Address } from 'viem';
import { ABI, BYTECODE, DEMO, DEMO_DEPLOY_TX, EXPLORER, readState, attempt, wallet, coreFills, fmt8, short, pub, revertReason, type State } from './chain';
import forkSim from './fork-sim.json';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

type Fill = { coin: string; px: string; sz: string; side: string; time: number; hash: string };
const route = () => { const h = location.hash.replace(/^#\/?/, ''); if (h.startsWith('create')) return { page: 'create' as const }; if (h.startsWith('judges')) return { page: 'judges' as const, addr: DEMO as Address }; if (h.startsWith('business')) return { page: 'business' as const, addr: DEMO as Address }; const m = h.match(/^p\/(0x[0-9a-fA-F]{40})/); return { page: 'pledge' as const, addr: (m ? m[1] : DEMO) as Address }; };
const dt = (s: number) => new Date(s * 1000).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
const go = (id: string) => { const el = document.getElementById(id); if (!el) return; el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); };
const Addr = ({ a, kind = 'address' }: { a: string; kind?: 'address' | 'tx' }) => <a className="link mono" href={`${EXPLORER}/${kind}/${a}`} target="_blank" rel="noreferrer" title={a}>{short(a)}</a>;

export default function App() {
  const [r, setR] = useState(route()); useEffect(() => { const f = () => setR(route()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  useEffect(() => { document.title = r.page === 'create' ? 'PLEDGE: new lock agreement' : `PLEDGE: agreement ${short(r.addr)}`; }, [r]);
  return <div className="shell">
    <header className="topbar">
      <a href="#/" className="brand"><span className="brand-mark" aria-hidden>P</span>Pledge</a>
      <nav className="tabs" aria-label="Pages">{([['#/', 'Agreement', 'pledge'], ['#/judges', 'For judges', 'judges'], ['#/business', 'Business', 'business']] as const).map(([h, t, p]) => <a key={p} href={h} className={'tab' + (r.page === p ? ' on' : '')} aria-current={r.page === p ? 'page' : undefined}>{t}</a>)}</nav>
      {r.page === 'create' ? <a href="#/" className="btn btn-secondary">Back to demo agreement</a> : <a href="#/create" className="btn btn-secondary">Draft a new agreement</a>}
    </header>
    {r.page === 'create' ? <Create /> : r.page === 'judges' ? <main><Judges addr={DEMO as Address} /></main> : r.page === 'business' ? <main><Business /></main> : <Agreement key={r.addr} addr={r.addr} />}
    <footer className="foot">Hyperliquid testnet · HyperEVM 998 + HyperCore. All figures are read live from Hyperliquid testnet. Anything fork-simulated is labeled as such.</footer>
  </div>;
}

function Chart({ start, end, cap, deposited, fills }: { start: number; end: number; cap: number; deposited: number; fills: Fill[] }) {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440); useEffect(() => { const o = () => setVw(window.innerWidth); addEventListener('resize', o); return () => removeEventListener('resize', o); }, []);
  const narrow = vw < 600, fs = narrow ? 13 : 12, days = Math.max(1, Math.round((end - start) / 86400)), W = narrow ? 340 : 720, H = narrow ? 200 : 220, L = 44, B = 28, T = 16, R = 16;
  const elapsed = Math.max(0, (Date.now() / 1000 - start) / 86400), shown = Math.min(days, Math.max(3, Math.ceil(elapsed) + 2));
  const max = Math.max(deposited, cap, 0.0001) * 1.25; const x = (d: number) => L + (d / shown) * (W - L - R), y = (v: number) => T + (1 - Math.min(v, max) / max) * (H - T - B);
  const lim = (v: number) => Math.min(v, deposited); let allow = `M${x(0)},${y(0)}`; for (let d = 0; d < shown; d++) allow += ` V${y(lim(cap * (d + 1)))} H${x(d + 1)}`;
  const pts = fills.filter(f => f.side === 'A').map(f => ({ d: (f.time / 1000 - start) / 86400, sz: Number(f.sz), px: f.px })).sort((a, b) => a.d - b.d);
  let cum = 0, sold = `M${x(0)},${y(0)}`; const dots = pts.map(p => { sold += ` H${x(p.d)}`; cum += p.sz; sold += ` V${y(cum)}`; return { ...p, cum }; }); const today = Math.min(shown, elapsed); sold += ` H${x(today)}`;
  const ticks = [0, lim(cap * shown) / 2, lim(cap * shown)];
  return <figure className="fig1 chart" style={{ margin: 0 }}>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Ceiling ${+lim(cap * shown).toFixed(4)} HYPE; ${+cum.toFixed(4)} HYPE filled`}>
      {ticks.map(v => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="grid-l" /><text x={L - 8} y={y(v) + 4} className="ax" fontSize={fs} textAnchor="end">{+v.toFixed(2)}</text></g>)}
      {Array.from({ length: shown + 1 }, (_, d) => d).filter(d => !narrow || d % 2 === 0 || d === shown).map(d => <text key={d} x={x(d)} y={H - 6} className="ax" fontSize={fs} textAnchor={d === shown ? 'end' : d === 0 ? 'start' : 'middle'}>{d === 0 ? 'start' : 'day ' + d}</text>)}
      <path d={allow} className="allow" /><path d={sold} className="sold" />
      <line x1={x(today)} x2={x(today)} y1={T} y2={H - B} className="now" /><text x={x(today) + 6} y={T + 12} className="ax" fontSize={fs}>now</text>
      {dots.map((p, i) => <g key={i}><circle cx={x(p.d)} cy={y(p.cum)} r="6" className="dot" />{i === dots.length - 1 && <text x={x(p.d) > W * 0.4 ? x(p.d) - 12 : x(p.d) + 12} textAnchor={x(p.d) > W * 0.4 ? 'end' : 'start'} y={y(p.cum) + 22} className="lbl" dy={-30}>{p.cum >= deposited - 1e-9 ? `all ${+p.cum.toFixed(4)} HYPE sold` : `${+p.cum.toFixed(4)} HYPE filled`}</text>}</g>)}
    </svg>
    <figcaption className="legend"><span><i style={{ background: '#3F7A1F' }} />Ceiling: most that may have sold</span><span><i style={{ background: '#0E0F0C' }} />Filled on HyperCore</span><span><i style={{ background: '#9FE870', height: 8, width: 8, borderRadius: 4 }} />Real fill</span></figcaption>
  </figure>;
}

function Countdown({ to }: { to: number }) { const [n, setN] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i); }, []);
  const s = Math.max(0, Math.floor(to - n / 1000)); return <span className="mono">{Math.floor(s / 86400)}d {Math.floor(s % 86400 / 3600)}h {Math.floor(s % 3600 / 60)}m</span>; }

type Try = { label: string; btn: string; fn: string; args: any[]; as: 'team' | 'anyone'; rule: string; tx?: string };
function Agreement({ addr }: { addr: Address }) {
  const [s, setS] = useState<State | null>(null); const [err, setErr] = useState(''); const [fills, setFills] = useState<Fill[]>([]); const [fillsErr, setFillsErr] = useState(false); const [fillsLoaded, setFillsLoaded] = useState(false); const [stale, setStale] = useState(false); const hasState = useRef(false); useEffect(() => { hasState.current = !!s; }, [s]); const [depOpen, setDepOpen] = useState(false); const [depAmt, setDepAmt] = useState('0.5');
  const [tries, setTries] = useState<Record<string, { ok: boolean; reverted?: boolean; reason: string; at: string }>>({}); const [busy, setBusy] = useState(''); const [running, setRunning] = useState(''); const [log, setLog] = useState<string[]>([]);
  const load = useCallback(async () => { try { const [st, f] = await Promise.all([readState(addr), coreFills(addr).then(x => ({ ok: true, x })).catch(() => ({ ok: false, x: [] as Fill[] }))]); setS(st); setFillsErr(!f.ok); if (f.ok) { setFills(f.x); setFillsLoaded(true); } setErr(''); setStale(false); } catch (e) { if (hasState.current) setStale(true); else setErr(revertReason(e)); } }, [addr]);
  useEffect(() => { load(); const i = setInterval(load, 20000); return () => clearInterval(i); }, [load]);
  if (err) return <main className="card" role="alert"><div className="card-h"><h2>Could not read this agreement</h2><span className="chip bad">RPC error</span></div><p className="mono">{short(addr)}: {err}</p><div style={{ marginTop: 16 }}><button className="btn btn-secondary" onClick={load}>Try again</button></div></main>;
  if (!s) return <main className="band" aria-busy="true"><p className="sub">Reading agreement <span className="mono">{short(addr)}</span> from HyperEVM testnet.</p><div className="metrics">{[0, 1, 2, 3].map(i => <div className="metric" key={i}><div className="k">Loading</div><div className="v">…</div></div>)}</div></main>;
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
  const nowS = Date.now() / 1000, before = nowS < Number(s.start), ended = nowS >= Number(s.end);
  const release = () => act('Withdraw', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'release', args: [1105n, s.balance], chain: w.chain, account: w.account! }); const rc = await pub.waitForTransactionReceipt({ hash: h }); if (rc.status !== 'success') throw new Error(`withdraw reverted, tx ${short(h)}`); return `Remainder withdrawn to the team, tx ${short(h)}`; });
  const avail = before || ended ? 0n : s.remaining < s.balance ? s.remaining : s.balance; const fullySold = s.balance === 0n && known && soldAll > 0; const pct = cap > 0 ? Math.min(100, Number(s.sold) / 1e8 / cap * 100) : 0;
  return <main>
    <section className="band" aria-label="Summary">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <p className="addr">Lock agreement <Addr a={addr} /> · team <Addr a={s.team} /></p>
          <h1>{known ? +deposited.toFixed(4) : `≥ ${+deposited.toFixed(4)}`} HYPE pledged, sold on a schedule</h1>
          <p className="sub">At most {cap} HYPE a day on the HyperCore book, never below ${fmt8(s.floor, 2)}. Nobody can cancel it, the team included.</p>
        </div>
        <div className="chips">{fullySold ? <span className="chip ok">Fully sold</span> : ended ? <span className="chip neutral">Term ended</span> : before ? <span className="chip warn">Scheduled</span> : s.balance === 0n ? <span className="chip warn">Awaiting deposit</span> : halted ? <span className="chip bad">Halted: under floor</span> : <span className="chip ok">Active</span>}<span className="chip dark">Not cancelable</span><span className="chip dark">Testnet</span></div>
      </div>
      <div className="metrics now-line" role="status">
        <div className="metric"><div className="k">Available to sell now</div><div className="v avail-v">{fmt8(avail)} HYPE</div></div>
        <div className="metric"><div className="k">Locked now</div><div className="v">{fmt8(s.balance)}<small>HYPE</small></div></div>
        <div className="metric"><div className="k">Sold to date</div><div className="v">{known ? +soldAll.toFixed(4) : '?'}<small>HYPE</small></div></div>
        <div className="metric"><div className="k">Gross sale proceeds</div><div className="v">{known ? proceedsN.toFixed(2) : '?'}<small>USDC</small></div></div>
      </div>
      {(stale || fillsErr) && <p className="sub" role="alert">{stale ? 'The testnet RPC did not answer the last refresh; showing the previous read. ' : ''}{fillsErr ? (known ? 'Fill history is unavailable right now; sold and proceeds show the last good read.' : 'Fill history has not loaded yet, so amounts sold are unknown.') : ''}</p>}
    </section>

    <div className="grid">
      <aside className="panel card" id="status" aria-label="Actions">
        <div className="card-h"><h2>{ended ? 'Term ended' : before ? 'Not started' : 'Today'}</h2>{!ended && !before && <span className="chip neutral">Resets in <Countdown to={nextDay} /></span>}</div>
        <div id="c2"><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}><span>Counted toward the current window</span><span className="mono">{fmt8(s.sold)} / {cap} HYPE</span></div><div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Share of today's cap sold"><span style={{ width: pct + '%' }} /></div></div>
        <p className="muted" style={{ marginTop: 6 }}>The counter resets on the first call after 24 hours.</p><dl className="kv"><div><dt>Left in window</dt><dd>{fmt8(s.remaining)} HYPE</dd></div><div><dt>Awaiting fill</dt><dd>{fmt8(s.pending)} HYPE</dd></div><div><dt>Order limit</dt><dd>${fmt8(s.limit, 3)}</dd></div><div><dt>Floor</dt><dd>${fmt8(s.floor, 2)}</dd></div></dl>
        {todays.length > 0 && <ul className="log" aria-label="Today's fills">{todays.map(f => <li key={f.hash}>Filled {f.sz} HYPE @ {f.px} · {new Date(f.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>)}</ul>}
        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          {ended ? <button className="btn btn-primary wide" onClick={release} disabled={!!busy || s.balance === 0n}>{busy === 'Withdraw' ? 'Withdrawing' : s.balance === 0n ? 'Nothing left to withdraw' : 'Withdraw remainder (team)'}</button> : (used || before) ? <Dialog open={depOpen} onOpenChange={setDepOpen}><DialogTrigger asChild><button className="btn btn-primary wide" disabled={!!busy}>{busy === 'Deposit' ? 'Depositing' : 'Deposit HYPE'}</button></DialogTrigger>
              <DialogContent className="sign"><DialogHeader><DialogTitle>Lock more HYPE</DialogTitle><DialogDescription>Sent from your HyperCore spot balance to this contract. It cannot be withdrawn before {dt(Number(s.end))}.</DialogDescription></DialogHeader>
                <label className="field dep-l">Amount, HYPE<input inputMode="decimal" value={depAmt} onChange={e => setDepAmt(e.target.value)} aria-invalid={!depOk} /></label>
                {!depOk && <p className="err">Enter an amount above 0, at most 8 decimals.</p>}
                <DialogFooter><DialogClose asChild><button className="btn btn-ghost">Go back</button></DialogClose><button className="btn btn-primary" onClick={deposit} disabled={!depOk}>Lock {depAmt} HYPE</button></DialogFooter></DialogContent></Dialog>
            : <button className="btn btn-primary wide" onClick={sellSlice} disabled={!!busy}>{busy === 'Sale' ? 'Submitting sale' : "Trigger today's sale"}</button>}
          <p className="muted">{ended ? 'The term is over. Only the team wallet can withdraw what is left.' : before ? <>Selling starts {dt(Number(s.start))}. You can deposit now.</> : used ? (s.balance === 0n ? 'Nothing left to sell. Selling needs a new deposit.' : "Today's allowance is used. Selling resumes at the next reset.") : 'Anyone may trigger it. The caller picks only the size.'}</p>
          <button className="btn btn-ghost" onClick={reconcile} disabled={!!busy}>{busy === 'Reconcile' ? 'Reconciling' : 'Reconcile fills'}</button>
        </div>
        {log.length > 0 && <ul className="log" aria-live="polite">{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
        <nav className="secnav" aria-label="Sections"><p className="muted">Jump to</p><div>{[['c1', 'Schedule'], ['c6', 'Sales'], ['c3', 'Price'], ['c4', 'Break it']].map(([id, t]) => <button key={id} className="navpill" onClick={() => go(id)}>{t}</button>)}</div></nav>
      </aside>
      <div className="stack">
        <section className="card" id="c1" aria-labelledby="h-sched">
          <div className="card-h"><div><h2 id="h-sched">Sale schedule</h2><p className="muted">Cumulative HYPE, first days of the term</p></div><span className="chip neutral">Day {dayIdx + 1} of {Math.round((Number(s.end) - Number(s.start)) / 86400)}</span></div>
          {fullySold ? <div className="done-row"><div><b className="mono">{+soldAll.toFixed(4)} / {+deposited.toFixed(4)} HYPE</b><span>All deposited HYPE sold, in {sells.length} fill{sells.length === 1 ? '' : 's'}</span></div><div className="bar"><span style={{ width: '100%' }} /></div></div> : null}
          {known ? (fullySold ? <details className="more"><summary>Show the schedule chart</summary><Chart start={Number(s.start)} end={Number(s.end)} cap={cap} deposited={deposited} fills={fills} /></details> : <Chart start={Number(s.start)} end={Number(s.end)} cap={cap} deposited={deposited} fills={fills} />) : <figure className="fig1" style={{ margin: 0 }}><p className="muted" role="status">{fillsErr ? 'Fill history has not loaded, so the chart is not drawn. Retrying every 20 seconds.' : 'Loading fill history from HyperCore.'}</p></figure>}
        </section>

        <section className="card" id="c6" aria-labelledby="h-sales">
          <div className="card-h"><h2 id="h-sales">Sales on HyperCore</h2>{fillsErr ? <span className="chip warn">History unavailable</span> : <span className="chip ok">Real fills</span>}</div>
          {fills.length === 0 ? <p className="muted" role="status">{fillsErr ? 'Fill history could not be loaded. Retrying every 20 seconds.' : !fillsLoaded ? 'Loading fill history from HyperCore.' : 'No fills yet. The first sale appears here seconds after it fills.'}</p> :
            <><ul className="fill-list show-sm" aria-label="Sales">{fills.map(f => <li key={f.hash + f.time}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className={'chip ' + (f.side === 'A' ? 'ok' : 'neutral')}>{f.side === 'A' ? 'Sell' : 'Buy'}</span><b className="mono">{f.sz} HYPE</b><span className="muted">@ {f.px} USDC</span></div><div className="muted mono">{new Date(f.time).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · <a className="link" href={`https://app.hyperliquid-testnet.xyz/explorer/tx/${f.hash}`} target="_blank" rel="noreferrer">{short(f.hash)}</a></div></li>)}</ul><Table className="dtable ledger hide-sm"><TableHeader><TableRow><TableHead>Time</TableHead><TableHead className="hide-sm">Side</TableHead><TableHead className="num">Size HYPE</TableHead><TableHead className="num">Price USDC</TableHead><TableHead className="hide-sm">Hash</TableHead></TableRow></TableHeader>
              <TableBody>{fills.map(f => <TableRow key={f.hash + f.time}><TableCell className="mono">{new Date(f.time).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell><TableCell className="hide-sm"><span className={'chip ' + (f.side === 'A' ? 'ok' : 'neutral')}>{f.side === 'A' ? 'Sell' : 'Buy'}</span></TableCell><TableCell className="num">{f.sz}</TableCell><TableCell className="num">{f.px}</TableCell><TableCell className="hide-sm"><a className="link mono" href={`https://app.hyperliquid-testnet.xyz/explorer/tx/${f.hash}`} target="_blank" rel="noreferrer">{short(f.hash)}</a></TableCell></TableRow>)}</TableBody></Table></>}
          <details className="more" style={{ marginTop: 12 }}><summary>Fork-simulated checks <span className="chip warn" style={{ marginLeft: 8 }}>fork-simulated</span></summary>
            <p className="muted">{forkSim.note}</p>
            <Table className="dtable"><TableBody>{forkSim.runs.map((x: any) => <TableRow key={x.name}><TableCell>{x.name}</TableCell><TableCell className="muted hide-sm">{x.detail}</TableCell><TableCell className="num"><span className={'chip ' + (x.pass ? 'ok' : 'bad')}>{x.pass ? 'Pass' : 'Fail'}</span></TableCell></TableRow>)}</TableBody></Table></details>
        </section>

        <section className="card" id="c3" aria-labelledby="h-price">
          <div className="card-h"><h2 id="h-price">Price guard</h2>{halted ? <span className="chip bad">Fails: sales halt</span> : <span className="chip ok">Passes</span>}</div>
          <p>Each sale is an immediate-or-cancel order priced by the contract, never by the caller: the oracle less {Number(s.dev) / 100}%, and never below the floor.</p>
          <div className="stat3"><div><b>${fmt8(s.oracle, 3)}</b><span>Oracle (0x808)</span></div><div><b>${fmt8(s.limit, 3)}</b><span>Order limit</span></div><div><b>${fmt8(s.floor, 2)}</b><span>Floor</span></div></div>
        </section>

        <section className="card" id="c4" aria-labelledby="h-break">
          <div className="card-h"><h2 id="h-break">Try to break it</h2><span className="chip neutral">Live, read-only</span></div>
          <p className="muted" style={{ marginBottom: 12 }}>Each check simulates the call against the live contract. No wallet, no gas.</p>
          <div className="checks">{TRIES.map(t => { const r = tries[t.label]; return <div className="check" key={t.label}>
            <div><p className="t">{t.label}</p><p className="r">{t.rule}{t.tx && <> Already reverted on-chain: <Addr a={t.tx} kind="tx" />.</>}</p></div>
            {r ? <div className="verdict" role="status"><span className={'chip ' + (r.ok ? 'warn' : r.reverted ? 'bad' : 'neutral')}>{r.ok ? 'Allowed' : r.reverted ? 'Rejected by the contract' : 'Could not check (network)'}</span><span className="mono">"{r.reason}" · {r.at}</span>{!r.ok && !r.reverted && <button className="btn btn-secondary" onClick={() => run(t)} disabled={running === t.label}>Retry check</button>}</div>
              : <button className="btn btn-secondary" onClick={() => run(t)} disabled={running === t.label} aria-busy={running === t.label}>{running === t.label ? 'Simulating' : t.btn}</button>}
          </div>; })}</div>
        </section>

        <section className="card" id="c5" aria-labelledby="h-term">
          <div className="card-h"><h2 id="h-term">Term</h2><span className="chip neutral">Ends in <Countdown to={Number(s.end)} /></span></div>
          <div className="kv" style={{ margin: 0 }}><div><dt>Selling began</dt><dd>{dt(Number(s.start))}</dd></div><div><dt>Team may withdraw from</dt><dd>{dt(Number(s.end))}</dd></div></div>
          {isDemo && <p className="muted" style={{ marginTop: 12 }}>Created in tx <Addr a={DEMO_DEPLOY_TX} kind="tx" />.</p>}
        </section>
              </div>

    </div>
  </main>;
}

const E2E = { pledge: '0x9af101c5d73432510e037dc8b05ec35811de91a5', create: '0x1327f21141d54cbb8667c1c7ede7a28b494f48c602eee9e36bdb254a45fa3d57', sale: '0x5f9fb781be281ef3fe5acfb59c05ca45803314ba46ece30e117bb2f7fe051913', reconcile: '0x48b4ea63b122be32ab223c9f05b40936649ca0877f93b2e7a9549cbb59c65bd7' };
function Judges({ addr }: { addr: Address }) {
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('');
  const curl = `curl -s -X POST https://api.hyperliquid-testnet.xyz/info -H 'content-type: application/json' -d '{"type":"userFills","user":"${addr}"}'`;
  const RV: [string, string, string][] = [
    ['ok', 'Real, testnet', 'Create, deposit, IOC sale filled on HyperCore, filled-size daily cap, unfilled order refund'],
    ['ok', 'Real, testnet', 'Cancel and early withdraw revert; sale blocked under the floor and before the start; team release after the end; anyone can trigger a sale'],
    ['warn', 'Fork-simulated', 'Daily allowance resetting across several days, price crash mid-term'],
    ['neutral', 'Planned', '0.25% fee, mainnet, other tokens'],
  ];
  return <>
    <section className="band" style={{ marginBottom: 24 }}><div style={{ display: 'grid', gap: 8 }}><p className="addr">Hyperliquid testnet evidence</p><h1>Verify PLEDGE on-chain</h1><p className="sub">Four checks against the live demo agreement, plus what is real and what is simulated.</p></div></section>
    <section className="card" id="judges" aria-labelledby="h-j">
      <div className="card-h"><h2 id="h-j">For judges: verify on-chain</h2><span className="chip ok">About 60 seconds</span></div>
      <ol className="steps">
        <li><p><b>The contract holds the terms.</b> Open <Addr a={addr} /> on the testnet explorer. No owner, no admin, no early withdraw. Source: contracts/src/Pledge.sol in the repo.</p></li>
        <li><p><b>It cannot be cancelled.</b> Press the three buttons in "Try to break it" on the <a className="link" href="#/">agreement page</a>. While the term runs, each one is rejected by the contract.</p></li>
        <li><div><p><b>Check the fills yourself.</b> Look for side "A" (sell). A new agreement returns an empty list.</p><pre className="code">{curl}</pre>
          <button className="btn btn-secondary" onClick={() => (navigator.clipboard ? navigator.clipboard.writeText(curl) : Promise.reject()).then(() => setCopied('ok'), () => setCopied('fail'))}>{copied === 'ok' ? 'Copied' : 'Copy command'}</button>{copied === 'fail' && <p className="err">The browser blocked copying. Select the command and copy it by hand.</p>}</div></li>
        <li><p><b>The full wallet flow ran on testnet.</b> Separate test agreement <Addr a={E2E.pledge} />: create <Addr a={E2E.create} kind="tx" />, sale <Addr a={E2E.sale} kind="tx" /> (0.5 HYPE @ 22.538), reconcile <Addr a={E2E.reconcile} kind="tx" />.</p></li>
      </ol>
      <div className="rv">{RV.map(([c, l, t]) => <div key={t}><span className={'chip ' + c}>{l}</span><span>{t}</span></div>)}</div>
    </section>
  </>;
}

function Business() {
  return <>
    <section className="band" style={{ marginBottom: 24 }}><div style={{ display: 'grid', gap: 8 }}><p className="addr">Who pays and how big</p><h1>Business model</h1><p className="sub">The token team pays a planned fee on filled sales. Market figures are sourced.</p></div></section>
    <section className="card" id="business" aria-labelledby="h-b">
      <div className="card-h"><h2 id="h-b">Business model</h2><span className="chip neutral">Fee planned</span></div>
      <div className="stat3"><div><b>$97.43B</b><span>Tokens unlocked in 2025</span></div><div><b>$18.77B</b><span>Of that to insiders</span></div><div><b>0.25%</b><span>Planned fee on filled proceeds</span></div></div>
      <p><b>The token team pays</b>, only when a sale fills. Buyers and keepers pay no PLEDGE fee, only gas. For comparison, Streamflow charges 0.16 SOL plus 0.19% of tokens vested (0.5% for a lock); Sablier charges $0.99 per withdrawal. Illustration only: 1% of insider unlocks at 0.25% is about $470K a year; this is the global market, not proof of demand on Hyperliquid. The fee is not in the testnet contract.</p>
      <p className="muted" style={{ marginTop: 12 }}>Sources: <a className="link" href="https://www.tokenomist.ai/research/2025-token-unlocks-review-a-complete-breakdown-of-emissions-insider-vesting-and-market-impact" target="_blank" rel="noreferrer">Tokenomist</a> · <a className="link" href="https://streamflow.finance/blog/how-much-does-streamflow-cost" target="_blank" rel="noreferrer">Streamflow</a> · <a className="link" href="https://docs.sablier.com/concepts/fees" target="_blank" rel="noreferrer">Sablier</a></p>
    </section>
  </>;
}

function Create() {
  const [f, setF] = useState({ cap: '0.5', floor: '5', start: '', days: '30', band: '2' }); const [out, setOut] = useState(''); const [busy, setBusy] = useState(false); const [open, setOpen] = useState(false);
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value }); const capOk = /^\d+(\.\d{1,2})?$/.test(f.cap) && Number(f.cap) > 0 && Number(f.cap) <= 1e6, floorOk = /^\d+(\.\d{1,8})?$/.test(f.floor) && Number(f.floor) > 0 && Number(f.floor) <= 1e9, bandOk = /^\d+(\.\d{1,2})?$/.test(f.band) && Number(f.band) > 0 && Number(f.band) < 100, daysOk = /^\d+$/.test(f.days) && Number(f.days) >= 1 && Number(f.days) <= 3650, valid = capOk && floorOk && bandOk && daysOk;
  const ts = (d: Date) => d.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }); const startD = f.start ? new Date(f.start) : new Date(); const endD = new Date(startD.getTime() + Number(f.days || 0) * 86400000);
  const deploy = async () => { setOpen(false); setBusy(true); setOut('');
    try { const w = await wallet(); const start = f.start ? BigInt(Math.floor(new Date(f.start).getTime() / 1000)) : 0n; const cap = BigInt(Math.round(Number(f.cap) * 100)) * 1000000n;
      const h = await w.deployContract({ abi: ABI, bytecode: BYTECODE, args: [11035, 1035, 1105n, cap, BigInt(Math.round(Number(f.floor) * 1e8)), BigInt(Math.round(Number(f.band) * 100)), 100n, start, BigInt(f.days)], chain: w.chain, account: w.account! });
      const r = await pub.waitForTransactionReceipt({ hash: h }); location.hash = '#/p/' + r.contractAddress; }
    catch (e) { setOut(revertReason(e)); } setBusy(false); };
  return <main className="create">
    <section className="band"><div style={{ display: 'grid', gap: 8 }}><p className="addr">New agreement · HYPE on the HyperCore HYPE/USDC book</p><h1>Pledge your unlock</h1><p className="sub">Set the terms once. After signing nobody can loosen them, you included.</p></div></section>
    <div className="grid">
      <section className="card" aria-labelledby="h-terms">
        <div className="card-h"><h2 id="h-terms">Terms</h2><span className="chip neutral">Fixed at deploy</span></div>
        <div className="form-grid">
          <label className="field">HYPE of filled size per 24 hours<input inputMode="decimal" value={f.cap} onChange={set('cap')} aria-invalid={!capOk} />{!capOk ? <span className="err">Above 0, at most 2 decimals.</span> : <span className="hint">The daily cap counts filled size only.</span>}</label>
          <label className="field">Length in days<input inputMode="numeric" value={f.days} onChange={set('days')} aria-invalid={!daysOk} />{!daysOk ? <span className="err">A whole number, 1 to 3650.</span> : <span className="hint">The team can withdraw any remainder after this.</span>}</label>
          <label className="field">Floor, USDC per HYPE<input inputMode="decimal" value={f.floor} onChange={set('floor')} aria-invalid={!floorOk} />{!floorOk ? <span className="err">Above 0, at most 8 decimals.</span> : <span className="hint">Sales halt below this price.</span>}</label>
          <label className="field">Largest discount to the oracle, %<input inputMode="decimal" value={f.band} onChange={set('band')} aria-invalid={!bandOk} />{!bandOk ? <span className="err">Above 0 and under 100.</span> : <span className="hint">Sets the order limit under the oracle.</span>}</label>
          <label className="field" style={{ gridColumn: '1/-1' }}>Selling begins<input type="datetime-local" value={f.start} onChange={set('start')} /><span className="hint">Leave blank to start now.</span></label>
        </div>
        {out && <p className="err" role="alert">{out}</p>}
      </section>
      <aside className="panel card" aria-label="Summary">
        <div className="card-h"><h2>You are agreeing to</h2><span className="chip neutral">Not cancelable</span></div>
        <dl className="kv"><div><dt>Max sale / day</dt><dd>{f.cap} HYPE</dd></div><div><dt>Floor</dt><dd>${f.floor}</dd></div><div><dt>Max discount</dt><dd>{f.band}%</dd></div><div><dt>Term</dt><dd>{f.days} days</dd></div><div style={{ gridColumn: '1/-1' }}><dt>Selling starts</dt><dd>{ts(startD)}</dd></div><div style={{ gridColumn: '1/-1' }}><dt>Withdrawal opens</dt><dd>{ts(endD)}</dd></div></dl>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="btn btn-primary wide" disabled={busy || !valid}>{busy ? 'Deploying' : 'Review and sign'}</button></DialogTrigger>
          <DialogContent className="sign"><DialogHeader><DialogTitle>Sign this agreement</DialogTitle><DialogDescription>These terms cannot be changed after deployment.</DialogDescription></DialogHeader>
            <ol className="sign-l"><li>Sell at most <b className="mono">{f.cap} HYPE</b> per day.</li><li>Never below <b className="mono">${f.floor}</b>, at most <b className="mono">{f.band}%</b> under the oracle.</li><li>Starts <b className="mono">{ts(startD)}</b>. No cancel, no withdrawal until <b className="mono">{ts(endD)}</b>.</li></ol>
            <DialogFooter><DialogClose asChild><button className="btn btn-ghost">Go back</button></DialogClose><button className="btn btn-primary" onClick={deploy}>Sign and deploy on testnet</button></DialogFooter></DialogContent></Dialog>
        {!valid && <p className="err">Fix the highlighted terms before signing.</p>}
        <p className="muted" style={{ marginTop: 12 }}>Next: deposit HYPE from your HyperCore spot balance on the agreement page.</p>
      </aside>
    </div>
  </main>;
}
