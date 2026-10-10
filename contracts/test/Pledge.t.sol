// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../src/Pledge.sol";
interface Vm { function etch(address, bytes calldata) external; function warp(uint256) external; function roll(uint256) external; function prank(address) external; }
contract MockCW { uint256 public n; bytes public last; function sendRawAction(bytes calldata d) external { n++; last = d; } }
contract MockPx { uint64 public v; function set(uint64 x) external { v = x; } fallback(bytes calldata) external returns (bytes memory) { return abi.encode(v); } }
contract MockBal { uint64 public v; function set(uint64 x) external { v = x; } fallback(bytes calldata) external returns (bytes memory) { return abi.encode(v, uint64(0), uint64(0)); } }
contract PledgeTest {
    Vm constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    address constant CW = 0x3333333333333333333333333333333333333333; address constant BAL = address(0x801); address constant PX = address(0x808);
    Pledge p;
    function setUp() public {
        vm.etch(CW, address(new MockCW()).code); vm.etch(PX, address(new MockPx()).code); vm.etch(BAL, address(new MockBal()).code);
        vm.warp(1_800_000_000); vm.roll(100);
        MockPx(PX).set(25_000_000); // 25.000000 (6 dec) -> px8 25e8
        MockBal(BAL).set(10e8);
        // cap 1.0 HYPE/day, floor 20, band 2%, pxMul 100, 30 days
        p = new Pledge(11035, 1035, 1105, 1e8, 20e8, 200, 100, 0, 30);
    }
    function _ok(bytes memory d) internal returns (bool ok) { (ok,) = address(p).call(d); }
    function _next() internal { vm.roll(block.number + 1); }
    function test_limitIsOracleMinusBand() public { require(p.limitPx8() == 2450000000, "24.5"); }
    function test_withinCapSendsAtContractPrice() public { require(_ok(abi.encodeCall(p.sell, (5e7)))); require(MockCW(CW).n() == 1); require(p.pending() == 5e7); }
    function test_unfilledIOCRefundsCap() public {
        require(_ok(abi.encodeCall(p.sell, (1e8)))); _next(); // nothing filled: balance unchanged
        require(_ok(abi.encodeCall(p.sell, (1e8))), "cap must be refunded"); require(p.soldToday() == 0);
    }
    function test_filledCountsAndCaps() public {
        require(_ok(abi.encodeCall(p.sell, (6e7)))); MockBal(BAL).set(10e8 - 6e7); _next();
        require(!_ok(abi.encodeCall(p.sell, (5e7))), "over cap after fill"); p.reconcile(); require(p.soldToday() == 6e7);
        require(_ok(abi.encodeCall(p.sell, (4e7))));
    }
    function test_partialFill() public {
        require(_ok(abi.encodeCall(p.sell, (1e8)))); MockBal(BAL).set(10e8 - 3e7); _next(); p.reconcile();
        require(p.soldToday() == 3e7); require(p.remainingToday() == 7e7);
    }
    function test_depositNotCountedAsFill() public { require(_ok(abi.encodeCall(p.sell, (5e7)))); MockBal(BAL).set(20e8); _next(); p.reconcile(); require(p.soldToday() == 0); }
    function test_oneOrderPerBlock() public { require(_ok(abi.encodeCall(p.sell, (1e7)))); require(!_ok(abi.encodeCall(p.sell, (1e7)))); }
    function test_oracleBelowFloorBlocks() public { MockPx(PX).set(20_300_000); require(!_ok(abi.encodeCall(p.sell, (1e7))), "20.3*0.98<20"); }
    function test_noOracleBlocks() public { MockPx(PX).set(0); require(!_ok(abi.encodeCall(p.sell, (1e7)))); }
    function test_lotSize() public { require(!_ok(abi.encodeCall(p.sell, (1e5)))); }
    function test_capResetsNextDay() public {
        require(_ok(abi.encodeCall(p.sell, (1e8)))); MockBal(BAL).set(9e8); _next(); vm.warp(block.timestamp + 1 days);
        require(_ok(abi.encodeCall(p.sell, (1e8))), "new day");
    }
    function test_sigFigRounding() public { MockPx(PX).set(123_456_789); require(p.limitPx8() == 12098000000, "120.98"); }
    function test_teamCannotReleaseEarly() public { require(!_ok(abi.encodeCall(p.release, (1105, 1)))); vm.warp(block.timestamp + 31 days); require(_ok(abi.encodeCall(p.release, (1105, 1)))); }
    function test_nonTeamCannotRelease() public { vm.warp(block.timestamp + 31 days); vm.prank(address(0xBEEF)); require(!_ok(abi.encodeCall(p.release, (1105, 1)))); }
    function test_cancelAlwaysReverts() public { require(!_ok(abi.encodeCall(p.cancel, ()))); }
    function test_notStartedBlocks() public {
        Pledge q = new Pledge(11035, 1035, 1105, 1e8, 20e8, 200, 100, uint64(block.timestamp + 1 days), 30);
        (bool ok,) = address(q).call(abi.encodeCall(q.sell, (1e7))); require(!ok); vm.warp(block.timestamp + 1 days);
        (ok,) = address(q).call(abi.encodeCall(q.sell, (1e7))); require(ok, "started");
        require(q.endTs() == q.startTs() + 30 days);
    }
}
