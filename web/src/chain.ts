import { createPublicClient, createWalletClient, custom, defineChain, http, type Address, BaseError, ContractFunctionRevertedError } from 'viem';
import art from './pledge-artifact.json';
import dep from './deployment.json';
export const ABI = art.abi as any; export const BYTECODE = art.bytecode as `0x${string}`;
export const DEMO = dep.address as Address; export const DEMO_TEAM = dep.team as Address; export const DEMO_DEPLOY_TX = dep.deployTx;
export const EXPLORER = 'https://testnet.purrsec.com';
export const hyperevmTestnet = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } }, blockExplorers: { default: { name: 'Purrsec', url: EXPLORER } } });
export const pub = createPublicClient({ chain: hyperevmTestnet, transport: http(undefined, { batch: { batchSize: 20, wait: 16 }, retryCount: 4, retryDelay: 1500 }) });
export const HL_INFO = 'https://api.hyperliquid-testnet.xyz/info';
export type State = { team: Address; cap: bigint; floor: bigint; dev: bigint; start: bigint; end: bigint; sold: bigint; pending: bigint; remaining: bigint; balance: bigint; oracle: bigint; limit: bigint };
const FNS = ['team', 'capPerDay', 'floorPx8', 'maxDevBps', 'startTs', 'endTs', 'soldToday', 'pending', 'remainingToday', 'balance', 'oraclePx8', 'limitPx8'] as const;
export async function readState(address: Address): Promise<State> {
  const r = await Promise.all(FNS.map(fn => pub.readContract({ address, abi: ABI, functionName: fn })));
  const [team, cap, floor, dev, start, end, sold, pending, remaining, balance, oracle, limit] = r as any[];
  return { team, cap, floor, dev, start, end, sold, pending, remaining, balance, oracle, limit };
}
export function revertReason(e: unknown): string {
  if (e instanceof BaseError) { const r = e.walk(x => x instanceof ContractFunctionRevertedError) as ContractFunctionRevertedError | null; if (r?.reason) return r.reason; return e.shortMessage.split('\n').pop() || e.shortMessage; }
  return String(e).slice(0, 140);
}
/** eth_call against the live testnet contract: proves the rule without spending gas. */
export async function attempt(address: Address, account: Address, functionName: string, args: any[]) {
  try { await pub.simulateContract({ address, abi: ABI, functionName, args, account }); return { ok: true, reason: 'would succeed' }; }
  catch (e) { return { ok: false, reason: revertReason(e) }; }
}
export async function wallet() {
  const eth = (window as any).ethereum; if (!eth) throw new Error('No browser wallet found (install MetaMask / Rabby)');
  try { await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x3e6' }] }); }
  catch { await eth.request({ method: 'wallet_addEthereumChain', params: [{ chainId: '0x3e6', chainName: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: ['https://rpc.hyperliquid-testnet.xyz/evm'], blockExplorerUrls: [EXPLORER] }] }); }
  const [account] = await eth.request({ method: 'eth_requestAccounts' });
  return createWalletClient({ account, chain: hyperevmTestnet, transport: custom(eth) });
}
export async function coreFills(user: Address) {
  const r = await fetch(HL_INFO, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'userFills', user }) });
  return (await r.json()) as { coin: string; px: string; sz: string; side: string; time: number; hash: string }[];
}
export const fmt8 = (v: bigint, d = 4) => (Number(v) / 1e8).toLocaleString(undefined, { maximumFractionDigits: d });
export const short = (a: string) => a.slice(0, 6) + '…' + a.slice(-4);
