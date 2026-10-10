// TESTNET ONLY (HyperEVM 998). Deploys a demo Pledge: HYPE/USDC spot @1035, cap 0.5 HYPE/day, floor $5, band 2%, 30 days.
import fs from 'node:fs';
import { createWalletClient, createPublicClient, http, defineChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
const D = new URL('.', import.meta.url).pathname;
const account = privateKeyToAccount(JSON.parse(fs.readFileSync('/Users/kamal/Desktop/solana/cwf/hyperliquid/.keys/demo-operator.json', 'utf8'))[0].private_key);
const chain = defineChain({ id: 998, name: 'HyperEVM Testnet', nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] } } });
const w = createWalletClient({ account, chain, transport: http() }), pub = createPublicClient({ chain, transport: http() });
if ((await pub.getChainId()) !== 998) throw new Error('not testnet');
const art = JSON.parse(fs.readFileSync(D + '../contracts/out/Pledge.sol/Pledge.json', 'utf8'));
const hash = await w.deployContract({ abi: art.abi, bytecode: art.bytecode.object, args: [11035, 1035, 1105n, 50000000n, 500000000n, 200n, 100n, 0n, 30n] });
const r = await pub.waitForTransactionReceipt({ hash });
const out = { chainId: 998, address: r.contractAddress, deployTx: hash, block: r.blockNumber.toString(), team: account.address, params: { asset: 11035, spotIndex: 1035, token: 1105, capPerDay: '0.5 HYPE', floor: '$5.00', bandBps: 200, days: 30 } };
fs.writeFileSync(D + '../deployments/testnet.json', JSON.stringify(out, null, 2)); console.log(JSON.stringify(out));
// on-chain rejected attempts for the evidence log
for (const [fn, args] of [['sell', [60000000n]], ['cancel', []], ['release', [1105n, 1n]]]) {
  const h = await w.writeContract({ address: r.contractAddress, abi: art.abi, functionName: fn, args, gas: 300000n });
  console.log(JSON.stringify({ fn, tx: h, status: (await pub.waitForTransactionReceipt({ hash: h })).status }));
}
