// TESTNET ONLY (HyperEVM 998). Deploys PledgeFactory (protocol fee recipient + 25 bps fixed in the factory), then one agreement through it:
// HYPE/USDC spot @1035, cap 0.25 HYPE/day, floor $5, band 2%, 30 days. Writes deployments/testnet-fee.json.
import fs from 'node:fs';
import { createWalletClient, createPublicClient, http, defineChain, decodeEventLog } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
const D = new URL('.', import.meta.url).pathname, K = '/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/';
const account = privateKeyToAccount(JSON.parse(fs.readFileSync(K + 'demo-operator.json', 'utf8'))[0].private_key);
const feeRecipient = JSON.parse(fs.readFileSync(K + 'pledge-e2e-tester.json', 'utf8'))[0].address; // activated Core account that receives protocol fees
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const w = createWalletClient({ account, chain, transport: http(undefined, { retryCount: 8, retryDelay: 1500 }) }), pub = createPublicClient({ chain, transport: http(undefined, { retryCount: 8, retryDelay: 1500 }) });
if ((await pub.getChainId()) !== 998) throw new Error('not testnet');
const art = (n) => JSON.parse(fs.readFileSync(D + `../contracts/out/${n}.sol/${n}.json`, 'utf8'));
const F = art('PledgeFactory'), P = art('Pledge'), FEE_BPS = 25n;
const fh = await w.deployContract({ abi: F.abi, bytecode: F.bytecode.object, args: [feeRecipient, FEE_BPS] });
const fr = await pub.waitForTransactionReceipt({ hash: fh }); if (fr.status !== 'success') throw new Error('factory deploy failed');
const terms = { asset: 11035, spotIndex: 1035, token: 1105n, capPerDay: 25000000n, floorPx8: 500000000n, maxDevBps: 200n, pxMul: 100n, startTs: 0n, days_: 30n };
const ch = await w.writeContract({ address: fr.contractAddress, abi: F.abi, functionName: 'create', args: [terms] });
const cr = await pub.waitForTransactionReceipt({ hash: ch }); if (cr.status !== 'success') throw new Error('create failed');
const ev = cr.logs.map(l => { try { return decodeEventLog({ abi: F.abi, ...l }); } catch { return null; } }).find(e => e?.eventName === 'AgreementCreated');
const agreement = ev.args.agreement;
const rd = (address, abi, functionName) => pub.readContract({ address, abi, functionName });
const out = { chainId: 998, factory: fr.contractAddress, factoryDeployTx: fh, factoryBlock: fr.blockNumber.toString(), agreement, createTx: ch, createBlock: cr.blockNumber.toString(), team: account.address,
  feeRecipient: await rd(agreement, P.abi, 'feeRecipient'), feeBps: Number(await rd(agreement, P.abi, 'feeBps')), factoryFeeRecipient: await rd(fr.contractAddress, F.abi, 'feeRecipient'), factoryFeeBps: Number(await rd(fr.contractAddress, F.abi, 'feeBps')),
  isAgreement: await pub.readContract({ address: fr.contractAddress, abi: F.abi, functionName: 'isAgreement', args: [agreement] }),
  params: { asset: 11035, spotIndex: 1035, token: 1105, capPerDay: '0.25 HYPE', floor: '$5.00', bandBps: 200, days: 30 }, gasUsed: { factory: fr.gasUsed.toString(), create: cr.gasUsed.toString() } };
fs.writeFileSync(D + '../deployments/testnet-fee.json', JSON.stringify(out, null, 2)); console.log(JSON.stringify(out));
