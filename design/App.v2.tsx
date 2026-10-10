/* Hallmark · pre-emit critique: P4 H4 E4 S5 R4 V5. Direction "Vesting contract / term sheet" (cwf/docs/DESIGN-DIRECTIONS.md) */
import { useEffect, useState, useCallback, useRef } from 'react';
import type { Address } from 'viem';
import { ABI, BYTECODE, DEMO, DEMO_DEPLOY_TX, EXPLORER, readState, attempt, wallet, coreFills, fmt8, short, pub, revertReason, type State } from './chain';
import forkSim from './fork-sim.json';

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
    <footer className="foot"><p>Figures on this page are read live from HyperEVM testnet and HyperCore testnet. Rows marked <span className="sim">fork-simulated</span> ran on a forge fork with HyperCore mocked, and are shown only where a real run was not possible.</p></footer>
  </div>;
}

/* Signature component: the release staircase. Amber steps = cumulative supply the contract may sell; navy steps = cumulative filled; dots = real HyperCore fills. */
function Staircase({ start, end, cap, deposited, fills }: { start: number; end: number; cap: number; deposited: number; fills: Fill[] }) {
  const days = Math.max(1, Math.round((end - start) / 86400)), W = 340, H = 220, L = 34, B = 26, T = 10, R = 8;
  const elapsed = Math.max(0, (Date.now() / 1000 - start) / 86400), shown = Math.min(days, Math.max(4, Math.ceil(elapsed) + 3));
  const max = Math.max(cap * shown, deposited, 0.0001);
  const x = (d: number) => L + (d / shown) * (W - L - R), y = (v: number) => T + (1 - Math.min(v, max) / max) * (H - T - B);
  let allow = `M${x(0)},${y(0)}`; for (let d = 0; d < shown; d++) allow += ` V${y(cap * (d + 1))} H${x(d + 1)}`;
  const pts = fills.filter(f => f.side === 'A').map(f => ({ d: (f.time / 1000 - start) / 86400, sz: Number(f.sz), px: f.px })).sort((a, b) => a.d - b.d);
  let cum = 0, sold = `M${x(0)},${y(0)}`; const dots = pts.map(p => { sold += ` H${x(p.d)}`; cum += p.sz; sold += ` V${y(cum)}`; return { ...p, cum }; });
  const today = Math.min(shown, elapsed); sold += ` H${x(today)}`;
  const ticks = Array.from({ length: shown + 1 }, (_, d) => d);
  return <figure className="stair">
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Release staircase: up to ${cap} per day may be sold; ${cum} sold so far`}>
      {[0, 0.5, 1].map(f => <g key={f}><line x1={L} x2={W - R} y1={y(max * f)} y2={y(max * f)} className="grid" /><text x={L - 6} y={y(max * f) + 4} className="ax" textAnchor="end">{+(max * f).toFixed(1)}</text></g>)}
      {ticks.map(d => <text key={d} x={x(d)} y={H - 8} className="ax" textAnchor={d === shown ? 'end' : 'middle'}>{d === 0 ? 'start' : 'day ' + d}</text>)}
      {deposited > 0 && <g><line x1={L} x2={W - R} y1={y(deposited)} y2={y(deposited)} className="dep" /><text x={W - R} y={y(deposited) - 5} className="ax depl" textAnchor="end">deposited {+deposited.toFixed(4)}</text></g>}
      <path d={allow} className="allow" /><path d={sold} className="sold" />
      <line x1={x(today)} x2={x(today)} y1={T} y2={H - B} className="now" />
      {dots.map((p, i) => <g key={i}><circle cx={x(p.d)} cy={y(p.cum)} r="4.5" className="dot" /><text x={x(p.d) + 8} y={y(p.cum) + 14} className="ax dotl">{p.sz} @ {p.px}</text></g>)}
    </svg>
    <figcaption><span className="k allowk" />allowed to date <span className="k soldk" />filled on HyperCore <span className="k dotk" />real fill</figcaption>
  </figure>;
}

function Countdown({ to }: { to: number }) { const [n, setN] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i); }, []);
  const s = Math.max(0, Math.floor(to - n / 1000)); return <span className="fig">{Math.floor(s / 86400)}d {Math.floor(s % 86400 / 3600)}h {Math.floor(s % 3600 / 60)}m</span>; }

type Try = { label: string; fn: string; args: any[]; as: 'team' | 'anyone'; rule: string; tx?: string };
function Agreement({ addr }: { addr: Address }) {
  const [s, setS] = useState<State | null>(null); const [err, setErr] = useState(''); const [fills, setFills] = useState<Fill[]>([]);
  const [tries, setTries] = useState<Record<string, { ok: boolean; reason: string; at: string }>>({}); const [busy, setBusy] = useState(''); const [log, setLog] = useState<string[]>([]);
  const load = useCallback(async () => { try { const [st, f] = await Promise.all([readState(addr), coreFills(addr).catch(() => [])]); setS(st); setFills(f); setErr(''); } catch (e) { setErr(String(e)); } }, [addr]);
  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, [load]);
  if (err) return <main className="doc"><p className="bad">Could not read agreement {addr}. {err}</p></main>;
  if (!s) return <main className="doc"><p className="quiet">Reading agreement {short(addr)} from HyperEVM testnet.</p></main>;
  const cap = Number(s.cap) / 1e8, soldAll = fills.filter(f => f.side === 'A').reduce((a, f) => a + Number(f.sz), 0);
  const deposited = Number(s.balance) / 1e8 + soldAll + Number(s.pending) / 1e8, halted = s.limit < s.floor || s.oracle === 0n, isDemo = addr.toLowerCase() === DEMO.toLowerCase();
  const proceeds = fills.filter(f => f.side === 'A').reduce((a, f) => a + Number(f.sz) * Number(f.px), 0);
  const TRIES: Try[] = [
    { label: 'The team cancels the agreement', fn: 'cancel', args: [], as: 'team', rule: 'There is no cancel path.', tx: isDemo ? '0x6c32d94980ccd9ea5a50b2f636ef5fc752e9db5b30ca0991f09292cb50eb5c8c' : undefined },
    { label: 'The team withdraws the balance early', fn: 'release', args: [1105n, s.balance || 1n], as: 'team', rule: 'Withdrawal opens on the end date.', tx: isDemo ? '0x2ff8266478b4200cebfca82d9184cb1ab04d74ba48fdc34598e4b4fb75c6e5d8' : undefined },
    { label: `Anyone sells ${+(cap * 2).toFixed(2)} HYPE today`, fn: 'sell', args: [s.cap * 2n], as: 'anyone', rule: 'Twice the daily maximum.', tx: isDemo ? '0x605126b87e3a908104ccb495b003bd704582e6eeefc3333dcc453f11214c807f' : undefined },
  ];
  const run = async (t: Try) => { const who = t.as === 'team' ? s.team : '0x000000000000000000000000000000000000dEaD' as Address; const r = await attempt(addr, who, t.fn, t.args); setTries(x => ({ ...x, [t.label]: { ...r, at: new Date().toLocaleTimeString() } })); };
  const act = async (name: string, f: () => Promise<string>) => { setBusy(name); try { const m = await f(); setLog(l => [m, ...l]); } catch (e) { setLog(l => [name + ' failed: ' + revertReason(e), ...l]); } setBusy(''); load(); };
  const sellSlice = () => act('Sale', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'sell', args: [s.remaining < 50000000n ? s.remaining : 50000000n], gas: 400000n, chain: w.chain, account: w.account! }); const rc = await pub.waitForTransactionReceipt({ hash: h }); return `Sale ${rc.status === 'success' ? 'submitted' : 'reverted'}, tx ${short(h)}`; });
  const reconcile = () => act('Reconcile', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'reconcile', args: [], chain: w.chain, account: w.account! }); await pub.waitForTransactionReceipt({ hash: h }); return `Fills reconciled, tx ${short(h)}`; });
  const deposit = () => act('Deposit', async () => { const amt = prompt('HYPE to lock from your HyperCore spot balance. This cannot be undone.', '0.5'); if (!amt) throw new Error('cancelled');
    const hl = await import('@nktkas/hyperliquid'); const w = await wallet(); const ex = new hl.ExchangeClient({ wallet: w as any, transport: new hl.HttpTransport({ isTestnet: true }) });
    await ex.spotSend({ destination: addr, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: amt }); return `${amt} HYPE locked on HyperCore`; });

  return <main className="sheet">
    <article className="doc">
      <p className="ref">Agreement <a href={`${EXPLORER}/address/${addr}`} target="_blank" rel="noreferrer" className="fig">{short(addr)}</a>, HyperEVM testnet. Team <span className="fig">{short(s.team)}</span>.</p>
      <h1>Lock agreement for {+deposited.toFixed(4)} HYPE of unlocked supply</h1>
      <p className="lede">The team has placed this supply with a contract that sells it on the HyperCore spot book under the terms below. No party, the team included, can change or cancel them.</p>

      <ol className="clauses">
        <li><h2>Tokens locked</h2>
          <p><span className="fig">{+deposited.toFixed(4)} HYPE</span> deposited. <span className="fig">{fmt8(s.balance)} HYPE</span> remains locked on HyperCore (read through precompile 0x801); <span className="fig">{+soldAll.toFixed(4)} HYPE</span> has been sold for <span className="fig">{proceeds.toFixed(2)} USDC</span>, held by the contract.</p>
          <button className="text" onClick={deposit} disabled={!!busy}>Deposit more HYPE (team)</button></li>
        <li><h2>Maximum sale per day</h2>
          <p>At most <span className="fig">{cap} HYPE</span> of <em>filled</em> size per 24 hours. Today: <span className="fig">{fmt8(s.sold)}</span> sold, <span className="fig">{fmt8(s.pending)}</span> awaiting fill, <span className="fig">{fmt8(s.remaining)}</span> left. An order that does not fill returns its size to the day's allowance.</p></li>
        <li><h2>Sale price</h2>
          <p>Each sale is an immediate-or-cancel order priced by the contract, not the caller: the oracle price less {Number(s.dev) / 100}%, and never below the floor.</p>
          <table className="terms"><tbody>
            <tr><th scope="row">Oracle (precompile 0x808)</th><td className="fig">${fmt8(s.oracle, 3)}</td></tr>
            <tr><th scope="row">Order limit</th><td className="fig">${fmt8(s.limit, 3)}</td></tr>
            <tr><th scope="row">Floor</th><td className="fig">${fmt8(s.floor, 2)}</td></tr>
            <tr><th scope="row">Status</th><td className={halted ? 'bad' : ''}>{halted ? 'Halted. The limit is under the floor.' : 'Selling permitted.'}</td></tr>
          </tbody></table></li>
        <li><h2>Cannot cancel</h2>
          <p>The contract has no cancel or early-withdraw path. Each attempt below is run now against the live contract.</p>
          <div className="attempts">{TRIES.map(t => { const r = tries[t.label]; return <div className="attempt" key={t.label}>
            <div><p className="a-title">{t.label}</p><p className="quiet">{t.rule}{t.tx && <> Previously reverted on-chain in <a href={`${EXPLORER}/tx/${t.tx}`} target="_blank" rel="noreferrer" className="fig">{short(t.tx)}</a>.</>}</p></div>
            <div className="a-act">{r ? <p className={'verdict ' + (r.ok ? '' : 'rej')} role="status"><span className="fig">{r.ok ? 'Allowed' : 'Rejected'}</span> “{r.reason}” <span className="quiet fig">{r.at}</span></p> : <button className="text" onClick={() => run(t)}>Attempt it</button>}</div>
          </div>; })}</div></li>
        <li><h2>Term</h2>
          <p>Selling began <span className="fig">{dt(Number(s.start))}</span>. Withdrawal of any remainder opens <span className="fig">{dt(Number(s.end))}</span>, in <Countdown to={Number(s.end)} />.</p></li>
        <li><h2>Record of sales</h2>
          {fills.length === 0 ? <p className="quiet">No fills yet for this agreement.</p> :
          <table className="ledger"><thead><tr><th>Time</th><th>Side</th><th>Size</th><th>Price</th><th>HyperCore hash</th></tr></thead>
            <tbody>{fills.map(f => <tr key={f.hash + f.time}><td className="fig">{new Date(f.time).toLocaleString()}</td><td>{f.side === 'A' ? 'Sell' : 'Buy'}</td><td className="fig">{f.sz}</td><td className="fig">{f.px}</td><td className="fig">{short(f.hash)}</td></tr>)}</tbody></table>}
          <details className="annex"><summary>Annex A. Funded paths, <span className="sim">fork-simulated</span></summary>
            <p className="quiet">{forkSim.note}</p>
            <table className="ledger"><tbody>{forkSim.runs.map((x: any) => <tr key={x.name}><td>{x.name}</td><td className="quiet">{x.detail}</td><td className="fig">{x.pass ? 'Pass' : 'Fail'}</td></tr>)}</tbody></table></details>
          {isDemo && <p className="quiet">Agreement created in tx <a href={`${EXPLORER}/tx/${DEMO_DEPLOY_TX}`} target="_blank" rel="noreferrer" className="fig">{short(DEMO_DEPLOY_TX)}</a>.</p>}</li>
      </ol>
    </article>

    <aside className="schedule" aria-label="Schedule">
      <p className="s-head">Schedule</p>
      <p className="big fig">{cap}<span className="unit"> HYPE / day</span></p>
      <p className="quiet">maximum sale, filled size</p>
      <Staircase start={Number(s.start)} end={Number(s.end)} cap={cap} deposited={deposited} fills={fills} />
      <dl className="s-list">
        <div><dt>Sold today</dt><dd className="fig">{fmt8(s.sold)} of {cap}</dd></div>
        <div><dt>Locked</dt><dd className="fig lock">{fmt8(s.balance)} HYPE</dd></div>
        <div><dt>Ends</dt><dd className="fig">{dt(Number(s.end))}</dd></div>
      </dl>
      <button className="primary" onClick={sellSlice} disabled={!!busy || s.remaining === 0n}>{s.remaining === 0n ? "Today's allowance is used" : "Trigger today's sale"}</button>
      <button className="text" onClick={reconcile} disabled={!!busy}>Reconcile fills</button>
      <p className="quiet small">Anyone may trigger a sale. The caller chooses only the size.</p>
      {log.length > 0 && <ul className="log" aria-live="polite">{log.map((l, i) => <li key={i} className="fig">{l}</li>)}</ul>}
    </aside>
  </main>;
}

function Create() {
  const [f, setF] = useState({ cap: '0.5', floor: '5', start: '', days: '30', band: '2' }); const [out, setOut] = useState(''); const [busy, setBusy] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null); const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  const go = async () => { dlg.current?.close(); setBusy(true); setOut('');
    try { const w = await wallet(); const start = f.start ? BigInt(Math.floor(new Date(f.start).getTime() / 1000)) : 0n;
      const cap = BigInt(Math.round(Number(f.cap) * 100)) * 1000000n;
      const h = await w.deployContract({ abi: ABI, bytecode: BYTECODE, args: [11035, 1035, 1105n, cap, BigInt(Math.round(Number(f.floor) * 1e8)), BigInt(Math.round(Number(f.band) * 100)), 100n, start, BigInt(f.days)], chain: w.chain, account: w.account! });
      const r = await pub.waitForTransactionReceipt({ hash: h }); location.hash = '#/p/' + r.contractAddress; }
    catch (e) { setOut(revertReason(e)); } setBusy(false); };
  return <main className="sheet one"><article className="doc">
    <p className="ref">Draft. HYPE on the HyperCore HYPE/USDC spot book.</p>
    <h1>Draft a lock agreement</h1>
    <p className="lede">Once signed, these terms are fixed in the contract. Nobody can loosen them, the team included.</p>
    <ol className="clauses form">
      <li><h2>Maximum sale per day</h2><label>HYPE of filled size per 24 hours<input inputMode="decimal" value={f.cap} onChange={set('cap')} /></label></li>
      <li><h2>Sale price</h2><label>Floor, USDC per HYPE<input inputMode="decimal" value={f.floor} onChange={set('floor')} /></label><label>Largest discount to the oracle, %<input inputMode="decimal" value={f.band} onChange={set('band')} /></label></li>
      <li><h2>Start</h2><label>Selling begins (leave blank for now)<input type="datetime-local" value={f.start} onChange={set('start')} /></label></li>
      <li><h2>Term</h2><label>Length in days<input inputMode="numeric" value={f.days} onChange={set('days')} /></label></li>
    </ol>
    <button className="primary" onClick={() => dlg.current?.showModal()} disabled={busy}>{busy ? 'Deploying' : 'Review and sign'}</button>{out && <p className="bad">{out}</p>}
    <dialog ref={dlg} className="sign" aria-labelledby="sign-h"><h2 id="sign-h">You are agreeing to</h2>
      <ol><li>Sell at most <span className="fig">{f.cap} HYPE</span> per day.</li><li>Never below <span className="fig">${f.floor}</span>, at no more than <span className="fig">{f.band}%</span> under the oracle.</li><li>No cancellation and no withdrawal for <span className="fig">{f.days}</span> days.</li></ol>
      <div className="sign-row"><button className="text" onClick={() => dlg.current?.close()}>Go back</button><button className="primary" onClick={go}>Sign and deploy on testnet</button></div></dialog>
  </article></main>;
}
