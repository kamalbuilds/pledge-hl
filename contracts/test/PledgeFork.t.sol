// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../src/Pledge.sol";
// FORK-SIMULATED (not real HyperCore): forks HyperEVM testnet 998 and drives the REAL deployed Pledge bytecode.
// anvil/forge cannot execute HyperCore precompiles or CoreWriter, so 0x801/0x808/0x3333 are mocked; the oracle is the
// live testnet spot px read just before the run (LIVE_PX env). The mock CoreWriter decodes the IOC and "fills" it.
interface Vm { function etch(address, bytes calldata) external; function roll(uint256) external; function warp(uint256) external;
  function createSelectFork(string calldata, uint256) external returns (uint256); function envUint(string calldata) external returns (uint256); function envAddress(string calldata) external returns (address); }
contract FBal { uint64 public v; function set(uint64 x) external { v = x; } fallback(bytes calldata) external returns (bytes memory) { return abi.encode(v, uint64(0), uint64(0)); } }
contract FPx { uint64 public v; function set(uint64 x) external { v = x; } fallback(bytes calldata) external returns (bytes memory) { return abi.encode(v); } }
contract FCW { // fills `fillBps` of each sell IOC by debiting the mocked Core balance
  uint64 public fillBps = 10000; uint64 public lastPx; uint64 public lastSz; function setFill(uint64 b) external { fillBps = b; }
  function sendRawAction(bytes calldata d) external {
    if (uint8(d[3]) != 1) return; (, , uint64 px, uint64 sz,,,) = abi.decode(d[4:], (uint32, bool, uint64, uint64, bool, uint8, uint128));
    lastPx = px; lastSz = sz; FBal b = FBal(address(0x801)); b.set(b.v() - sz * fillBps / 10000);
  }
}
contract PledgeForkTest {
  Vm constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
  Pledge p; FBal bal = FBal(address(0x801)); FCW cw = FCW(0x3333333333333333333333333333333333333333);
  function setUp() public {
    vm.createSelectFork("https://rpc.hyperliquid-testnet.xyz/evm", vm.envUint("FORK_BLOCK")); p = Pledge(vm.envAddress("PLEDGE"));
    vm.etch(address(0x801), address(new FBal()).code); vm.etch(address(0x808), address(new FPx()).code); vm.etch(address(cw), address(new FCW()).code);
    cw.setFill(10000); FPx(address(0x808)).set(uint64(vm.envUint("LIVE_PX"))); bal.set(500e8); // "unlimited" pledged HYPE: 500
  }
  event log_named_uint(string, uint256);
  function test_fork_fundedSaleFullFill() public {
    p.sell(5e7); emit log_named_uint("limitPx8", cw.lastPx()); emit log_named_uint("sz8", cw.lastSz());
    vm.roll(block.number + 1); p.reconcile(); require(p.soldToday() == 5e7, "filled counted"); require(p.remainingToday() == 0);
    (bool ok,) = address(p).call(abi.encodeCall(p.sell, (1e6))); require(!ok, "cap hit after real fill");
  }
  function test_fork_griefNeverFillRefunds() public {
    cw.setFill(0); p.sell(5e7); vm.roll(block.number + 1); p.reconcile(); require(p.soldToday() == 0 && p.remainingToday() == 5e7, "refund");
  }
  function test_fork_partialFillThenNextDay() public {
    cw.setFill(4000); p.sell(5e7); vm.roll(block.number + 1); p.reconcile(); require(p.soldToday() == 2e7);
    vm.warp(block.timestamp + 1 days); vm.roll(block.number + 1); cw.setFill(10000); p.sell(5e7); vm.roll(block.number + 1); p.reconcile(); require(p.soldToday() == 5e7);
  }
  function test_fork_crashBelowFloorHalts() public { FPx(address(0x808)).set(5_000_000); (bool ok,) = address(p).call(abi.encodeCall(p.sell, (1e7))); require(!ok, "5.0*0.98 < floor 5"); }
}
