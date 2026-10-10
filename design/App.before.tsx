import { useEffect, useState, useCallback } from 'react';
import type { Address } from 'viem';
import { ABI, BYTECODE, DEMO, DEMO_TEAM, DEMO_DEPLOY_TX, EXPLORER, readState, attempt, wallet, coreFills, fmt8, short, pub, revertReason, type State } from './chain';
import forkSim from './fork-sim.json';

const route = () => { const h = location.hash.replace(/^#\/?/, ''); if (h.startsWith('create')) return { page: 'create' as const }; const m = h.match(/^p\/(0x[0-9a-fA-F]{40})/); return { page: 'pledge' as const, addr: (m ? m[1] : DEMO) as Address }; };

export default function App() {
  const [r, setR] = useState(route()); useEffect(() => { const f = () => setR(route()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  return <div className="shell">
    <header className="top"><a href="#/" className="brand"><span className="seal">⌛</span> PLEDGE</a>
      <nav><a href="#/">Demo pledge</a><a href="#/create">Create a pledge</a><span className="muted">HyperEVM testnet · 998</span></nav></header>
    {r.page === 'create' ? <Create /> : <PledgePage addr={r.addr} />}
    <footer>Unlocked supply, sold slowly, by a contract the team can't call off. Testnet demo. On-chain data is live; anything marked <b className="tag sim">FORK-SIMULATED</b> ran on a forge fork with HyperCore mocked.</footer>
  </div>;
}

function Hourglass({ locked, cap, sold }: { locked: number; cap: number; sold: number }) {
  const p = cap > 0 ? Math.min(1, sold / cap) : 0;
  return <div className="glass" aria-label="sold today vs daily cap">
    <svg viewBox="0 0 120 200" width="120" height="200">
      <path d="M10 6h100M10 194h100M18 6c0 60 84 64 84 94S18 134 18 194M102 6c0 60-84 64-84 94s84 34 84 94" className="frame" />
      <clipPath id="top"><path d="M18 6c0 60 42 64 42 94 0-30 42-34 42-94z" /></clipPath>
      <clipPath id="bot"><path d="M60 100c0 30-42 34-42 94h84c0-60-42-64-42-94z" /></clipPath>
      <rect clipPath="url(#top)" x="0" y={6 + 94 * p} width="120" height={94 * (1 - p)} className="sand" />
      <rect clipPath="url(#bot)" x="0" y={194 - 94 * p} width="120" height={94 * p} className="sand dim" />
    </svg>
    <div className="glasscap"><b>{(p * 100).toFixed(0)}%</b> of today's cap used<br /><span className="muted">{locked.toLocaleString()} HYPE still locked</span></div>
  </div>;
}

function Countdown({ to }: { to: number }) { const [n, setN] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i); }, []);
  const s = Math.max(0, Math.floor(to - n / 1000)); return <span className="mono">{Math.floor(s / 86400)}d {Math.floor(s % 86400 / 3600)}h {Math.floor(s % 3600 / 60)}m {s % 60}s</span>; }

type Try = { label: string; fn: string; args: any[]; as?: 'team' | 'anyone'; why: string; tx?: string };
function PledgePage({ addr }: { addr: Address }) {
  const [s, setS] = useState<State | null>(null); const [err, setErr] = useState(''); const [fills, setFills] = useState<any[]>([]);
  const [tries, setTries] = useState<Record<string, { ok: boolean; reason: string; at: string }>>({}); const [busy, setBusy] = useState(''); const [log, setLog] = useState<string[]>([]);
  const load = useCallback(async () => { try { setS(await readState(addr)); setFills(await coreFills(addr).catch(() => [])); setErr(''); } catch (e) { setErr(String(e)); } }, [addr]);
  useEffect(() => { load(); const i = setInterval(load, 8000); return () => clearInterval(i); }, [load]);
  if (err) return <main><p className="err">Couldn't read pledge {addr}: {err}</p></main>;
  if (!s) return <main><p className="muted">Reading the contract on HyperEVM testnet…</p></main>;
  const cap = Number(s.cap) / 1e8, sold = Number(s.sold) / 1e8, locked = Number(s.balance) / 1e8;
  const halted = s.limit < s.floor || s.oracle === 0n; const isDemo = addr.toLowerCase() === DEMO.toLowerCase();
  const TRIES: Try[] = [
    { label: 'Team cancels the pledge', fn: 'cancel', args: [], as: 'team', why: 'There is no cancel path. The function exists only to prove it reverts.', tx: isDemo ? '0x6c32d94980ccd9ea5a50b2f636ef5fc752e9db5b30ca0991f09292cb50eb5c8c' : undefined },
    { label: 'Team withdraws everything early', fn: 'release', args: [1105n, s.balance || 1n], as: 'team', why: 'release() unlocks only after the end date.', tx: isDemo ? '0x2ff8266478b4200cebfca82d9184cb1ab04d74ba48fdc34598e4b4fb75c6e5d8' : undefined },
    { label: `Dump 2× the daily cap (${(cap * 2).toFixed(2)} HYPE)`, fn: 'sell', args: [s.cap * 2n], as: 'anyone', why: 'Each sale is checked against what has already filled today.', tx: isDemo ? '0x605126b87e3a908104ccb495b003bd704582e6eeefc3333dcc453f11214c807f' : undefined },
    { label: 'Sell a dust lot (0.001 HYPE)', fn: 'sell', args: [100000n], as: 'anyone', why: 'Sizes must fit the 0.01 lot size.' },
  ];
  const run = async (t: Try) => { const who = t.as === 'team' ? s.team : '0x000000000000000000000000000000000000dEaD' as Address; const r = await attempt(addr, who, t.fn, t.args); setTries(x => ({ ...x, [t.label]: { ...r, at: new Date().toLocaleTimeString() } })); };
  const act = async (name: string, f: () => Promise<string>) => { setBusy(name); try { const m = await f(); setLog(l => [m, ...l]); } catch (e) { setLog(l => ['✗ ' + name + ': ' + revertReason(e), ...l]); } setBusy(''); load(); };
  const sellSlice = () => act('sell', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'sell', args: [s.remaining < 50000000n ? s.remaining : 50000000n], gas: 400000n, chain: w.chain, account: w.account! }); const rc = await pub.waitForTransactionReceipt({ hash: h }); return `${rc.status === 'success' ? '✓' : '✗ reverted'} sell tx ${short(h)}`; });
  const reconcile = () => act('reconcile', async () => { const w = await wallet(); const h = await w.writeContract({ address: addr, abi: ABI, functionName: 'reconcile', args: [], chain: w.chain, account: w.account! }); await pub.waitForTransactionReceipt({ hash: h }); return `✓ reconcile tx ${short(h)}`; });
  const deposit = () => act('deposit', async () => { const amt = prompt('HYPE to lock from your HyperCore spot balance into this pledge (irreversible):', '0.5'); if (!amt) throw new Error('cancelled');
    const hl = await import('@nktkas/hyperliquid'); const w = await wallet(); const ex = new hl.ExchangeClient({ wallet: w as any, transport: new hl.HttpTransport({ isTestnet: true }) });
    const r = await ex.spotSend({ destination: addr, token: 'HYPE:0x7317beb7cceed72ef0b346074cc8e7ab', amount: amt }); return '✓ deposited on HyperCore: ' + JSON.stringify(r.response?.type ?? r); });
  return <main>
    <section className="hero">
      <div><p className="eyebrow">Pledge · {short(addr)} · <a href={`${EXPLORER}/address/${addr}`} target="_blank">explorer ↗</a> <span className="tag live">LIVE TESTNET</span></p>
        <h1>{locked > 0 ? <>{locked.toLocaleString()} HYPE</> : <>Unfunded pledge</>} <em>can only leave at {cap} HYPE/day.</em></h1>
        <p className="lede">Team <span className="mono">{short(s.team)}</span> locked this supply. The contract sells it on the HyperCore spot book at a price it sets itself, never below <b>${fmt8(s.floor, 2)}</b>, and the team can't cancel. The lock ends in <Countdown to={Number(s.end)} />.</p>
        <div className="actions"><button onClick={sellSlice} disabled={!!busy}>Trigger today's slice (anyone)</button><button className="ghost" onClick={reconcile} disabled={!!busy}>Reconcile fills</button><button className="ghost" onClick={deposit} disabled={!!busy}>Deposit HYPE (team)</button></div>
        {log.length > 0 && <ul className="log">{log.map((l, i) => <li key={i} className="mono">{l}</li>)}</ul>}
      </div>
      <Hourglass locked={locked} cap={cap} sold={sold} />
    </section>

    <section className="grid">
      <Card k="Locked on HyperCore" v={`${fmt8(s.balance)} HYPE`} n="read via precompile 0x801" />
      <Card k="Sold today / cap" v={`${fmt8(s.sold)} / ${fmt8(s.cap)}`} n={s.pending > 0n ? `${fmt8(s.pending)} awaiting fill` : 'counts filled size only'} />
      <Card k="Left today" v={`${fmt8(s.remaining)} HYPE`} n="unfilled orders give it back" />
      <Card k="Started" v={new Date(Number(s.start) * 1000).toLocaleString()} n={`ends ${new Date(Number(s.end) * 1000).toLocaleDateString()}`} />
    </section>

    <section className="guard"><h2>Price guard</h2>
      <div className="rail"><Tick label="floor" v={fmt8(s.floor, 2)} cls="floor" /><Tick label={`limit (oracle −${Number(s.dev) / 100}%)`} v={fmt8(s.limit, 3)} cls="limit" /><Tick label="oracle (0x808)" v={fmt8(s.oracle, 3)} cls="oracle" /></div>
      <p className={halted ? 'err' : 'ok'}>{halted ? '■ HALTED: the oracle-based limit is below the floor, so the contract refuses to sell.' : '● SELLING ALLOWED: any keeper can trigger a slice. The caller picks only the size; the contract sets the price.'}</p>
    </section>

    <section><h2>Try to break it <span className="muted small">live eth_call against the testnet contract</span></h2>
      <div className="tries">{TRIES.map(t => { const r = tries[t.label]; return <div key={t.label} className={'try ' + (r ? (r.ok ? 'pass' : 'blocked') : '')}>
        <div><b>{t.label}</b><p className="muted small">{t.why}</p>{t.tx && <a className="small" href={`${EXPLORER}/tx/${t.tx}`} target="_blank">reverted on-chain: {short(t.tx)} ↗</a>}</div>
        <div className="tryr"><button onClick={() => run(t)}>Try it</button>{r && <span className="mono stamp">{r.ok ? 'ALLOWED' : 'REJECTED'} · "{r.reason}" · {r.at}</span>}</div></div>; })}</div>
    </section>

    <section><h2>Sell history <span className="tag live">REAL · HyperCore fills</span></h2>
      {fills.length === 0 ? <p className="muted">No real fills yet. This pledge is unfunded on testnet (the faucet needs a mainnet deposit). The funded path below ran on a fork.</p> :
        <table><thead><tr><th>time</th><th>side</th><th>size</th><th>px</th></tr></thead><tbody>{fills.map(f => <tr key={f.hash + f.time}><td>{new Date(f.time).toLocaleString()}</td><td>{f.side === 'A' ? 'sell' : 'buy'}</td><td>{f.sz}</td><td>{f.px}</td></tr>)}</tbody></table>}
      <h3>Funded sale path <span className="tag sim">FORK-SIMULATED</span></h3>
      <p className="muted small">{forkSim.note}</p>
      <table><thead><tr><th>scenario</th><th>what happened</th><th>result</th></tr></thead><tbody>{forkSim.runs.map((x: any) => <tr key={x.name}><td>{x.name}</td><td>{x.detail}</td><td className={x.pass ? 'ok' : 'err'}>{x.pass ? 'PASS' : 'FAIL'}</td></tr>)}</tbody></table>
    </section>
    {isDemo && <p className="muted small">Demo pledge deployed in tx <a href={`${EXPLORER}/tx/${DEMO_DEPLOY_TX}`} target="_blank">{short(DEMO_DEPLOY_TX)}</a> by {short(DEMO_TEAM)}.</p>}
  </main>;
}
const Card = ({ k, v, n }: { k: string; v: string; n: string }) => <div className="card"><p className="muted small">{k}</p><p className="big mono">{v}</p><p className="muted small">{n}</p></div>;
const Tick = ({ label, v, cls }: { label: string; v: string; cls: string }) => <div className={'tick ' + cls}><span className="mono">${v}</span><span className="small">{label}</span></div>;

function Create() {
  const [f, setF] = useState({ cap: '0.5', floor: '5', start: '', days: '30', band: '2' }); const [out, setOut] = useState(''); const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  const go = async () => { setBusy(true); setOut('');
    try { const w = await wallet(); const start = f.start ? BigInt(Math.floor(new Date(f.start).getTime() / 1000)) : 0n;
      const cap = BigInt(Math.round(Number(f.cap) * 100)) * 1000000n;
      const h = await w.deployContract({ abi: ABI, bytecode: BYTECODE, args: [11035, 1035, 1105n, cap, BigInt(Math.round(Number(f.floor) * 1e8)), BigInt(Math.round(Number(f.band) * 100)), 100n, start, BigInt(f.days)], chain: w.chain, account: w.account! });
      const r = await pub.waitForTransactionReceipt({ hash: h }); location.hash = '#/p/' + r.contractAddress; }
    catch (e) { setOut(revertReason(e)); } setBusy(false); };
  return <main className="create"><p className="eyebrow">New pledge · HYPE/USDC spot on HyperCore</p><h1>Make your unlock <em>a promise the chain keeps.</em></h1>
    <p className="lede">Once deployed, nobody can raise these numbers, including you. Read them twice.</p>
    <div className="form">
      <label>Daily sell cap (HYPE)<input value={f.cap} onChange={set('cap')} /></label>
      <label>Price floor (USDC)<input value={f.floor} onChange={set('floor')} /></label>
      <label>Max discount to oracle (%)<input value={f.band} onChange={set('band')} /></label>
      <label>Selling starts (blank = now)<input type="datetime-local" value={f.start} onChange={set('start')} /></label>
      <label>Lock length (days)<input value={f.days} onChange={set('days')} /></label>
    </div>
    <div className="summary mono">Sells at most {f.cap} HYPE per day, at oracle −{f.band}%, never below ${f.floor}, for {f.days} days. No cancel. No early withdraw.</div>
    <button onClick={go} disabled={busy}>{busy ? 'Deploying…' : 'Deploy irrevocable pledge (testnet)'}</button>{out && <p className="err">{out}</p>}
    <p className="muted small">Next step: deposit HYPE from your HyperCore spot balance on the pledge page. The contract only ever sells through HyperCore's CoreWriter (0x3333…3333).</p></main>;
}
