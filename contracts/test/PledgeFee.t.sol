// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../src/Pledge.sol";
import "../src/PledgeFactory.sol";
import "./Pledge.t.sol"; // Vm, MockCW (applies spotSend to the mocked Core balance), MockBal (per-token), MockPx
contract PledgeFeeTest {
    Vm constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    address constant CW = 0x3333333333333333333333333333333333333333; address constant BAL = address(0x801); address constant PX = address(0x808);
    address constant FEE_TO = address(0xFEE); uint64 constant BASE_USDC = 100e8; // USDC already held by the agreement from earlier sales
    Pledge p; MockCW cw = MockCW(CW); MockBal bal = MockBal(BAL);
    function _terms() internal pure returns (Terms memory) { return Terms(11035, 1035, 1105, 1e8, 20e8, 200, 100, 0, 30); }
    function setUp() public {
        vm.etch(CW, address(new MockCW()).code); vm.etch(PX, address(new MockPx()).code); vm.etch(BAL, address(new MockBal()).code);
        vm.warp(1_800_000_000); vm.roll(100); MockPx(PX).set(25_000_000); bal.set(10e8); bal.setTok(0, BASE_USDC);
        p = new Pledge(address(this), FEE_TO, 25, _terms());
    }
    // submit an IOC for `sz`, then Core fills `soldHype` of it and credits `usdcIn` USDC, then settle in the next block
    function _sale(uint64 sz, uint64 soldHype, uint64 usdcIn) internal {
        p.sell(sz); bal.set(bal.bal(1105) - soldHype); bal.setTok(0, bal.bal(0) + usdcIn); vm.roll(block.number + 1); p.reconcile();
    }
    function _ok(address a, bytes memory d) internal returns (bool ok) { (ok,) = a.call(d); }
    function _fee(uint64 gross) internal pure returns (uint64) { return uint64(uint256(gross) * 25 / 10_000); }

    function test_feeIs25bpsOfFilledProceeds() public {
        uint64 g = 2_940_000_123; // 29.40000123 USDC for 0.6 HYPE; 25 bps = 7_350_000.3075 -> 7_350_000
        p.sell(6e7); bal.set(10e8 - 6e7); bal.setTok(0, BASE_USDC + g); vm.roll(block.number + 1);
        vm.expectEmit(true, false, false, true); emit Pledge.FeeTaken(FEE_TO, g, 7_350_000, g - 7_350_000);
        p.reconcile();
        require(cw.credited(FEE_TO, 0) == 7_350_000, "fee credited to recipient"); require(cw.n() == 2, "IOC + one fee spotSend");
        bytes memory last = cw.last(); require(uint8(last[0]) == 1 && uint8(last[3]) == 6, "spotSend action");
    }
    function test_teamProceedsPlusFeeEqualGross() public {
        uint64 g = 1_234_567_891; _sale(5e7, 5e7, g);
        uint64 fee = cw.credited(FEE_TO, 0); uint64 teamKept = bal.bal(0) - BASE_USDC;
        require(fee == _fee(g) && fee > 0, "fee"); require(teamKept + fee == g, "team + fee == gross");
    }
    function testFuzz_teamProceedsPlusFeeEqualGross(uint64 g) public {
        g = uint64(uint256(g) % (type(uint64).max - BASE_USDC)); _sale(5e7, 5e7, g);
        require(cw.credited(FEE_TO, 0) == _fee(g), "fee"); require((bal.bal(0) - BASE_USDC) + cw.credited(FEE_TO, 0) == g, "exact split");
    }
    function test_noFeeOnUnfilledSale() public {
        _sale(1e8, 0, 50e8); // IOC found no bid; 50 USDC arrived on the account from elsewhere
        require(cw.credited(FEE_TO, 0) == 0 && cw.n() == 1, "no fee spotSend"); require(p.remainingToday() == 1e8, "allowance refunded");
    }
    function test_noFeeOnRefundedRemainder() public {
        uint64 g = 441_000_000; _sale(1e8, 3e7, g); // 0.3 of 1.0 filled; 0.7 refunded
        require(p.remainingToday() == 7e7, "refund"); require(cw.credited(FEE_TO, 0) == _fee(g), "fee on the filled part only");
        require(cw.credited(FEE_TO, 1105) == 0, "no principal token moved"); require(bal.bal(1105) == 10e8 - 3e7, "HYPE principal untouched by fee");
    }
    function test_feeNeverTakenFromHeldBalance() public {
        _sale(5e7, 5e7, 0); // filled, but no new USDC: 100 USDC already held must not be charged
        require(cw.credited(FEE_TO, 0) == 0 && bal.bal(0) == BASE_USDC, "held USDC untouched");
    }
    function test_eachSaleChargedOnItsOwnProceeds() public {
        _sale(5e7, 5e7, 1_000_000_000); vm.warp(block.timestamp + 1 days); _sale(5e7, 5e7, 2_000_000_000);
        require(cw.credited(FEE_TO, 0) == _fee(1_000_000_000) + _fee(2_000_000_000), "25 bps of 10 + 25 bps of 20");
    }
    function test_releaseSettlesFeeBeforeTeamMovesProceeds() public {
        uint64 g = 2_000_000_000; p.sell(5e7); bal.set(10e8 - 5e7); bal.setTok(0, BASE_USDC + g); vm.roll(block.number + 1);
        vm.warp(block.timestamp + 31 days); // nobody called reconcile; the team calls release first
        p.release(0, BASE_USDC + g - _fee(g));
        require(cw.credited(FEE_TO, 0) == _fee(g), "fee paid ahead of the team's withdrawal"); require(cw.n() == 3, "IOC, fee, release");
    }
    function test_releaseBlockedWhileSaleUnsettled() public {
        p.sell(5e7); vm.warp(block.timestamp + 31 days); require(!_ok(address(p), abi.encodeCall(p.release, (1105, 1))), "same-block release");
    }

    function test_feeRecipientCannotBeChanged() public {
        _sale(5e7, 5e7, 1_000_000_000); vm.warp(block.timestamp + 31 days);
        address[3] memory who = [address(this), address(0xBEEF), FEE_TO];
        for (uint i; i < who.length; i++) {
            vm.prank(who[i]); _ok(address(p), abi.encodeCall(p.reconcile, ())); vm.prank(who[i]); _ok(address(p), abi.encodeCall(p.release, (0, 1)));
            vm.prank(who[i]); _ok(address(p), abi.encodeCall(p.cancel, ()));
            vm.prank(who[i]); require(!_ok(address(p), abi.encodeWithSignature("setFeeRecipient(address)", address(0xBEEF))), "setter");
            vm.prank(who[i]); require(!_ok(address(p), abi.encodeWithSignature("updateFeeRecipient(address)", address(0xBEEF))), "setter");
            vm.prank(who[i]); require(!_ok(address(p), abi.encodeWithSignature("setFeeBps(uint64)", uint64(0))), "setter");
            vm.prank(who[i]); require(!_ok(address(p), abi.encodeWithSignature("transferOwnership(address)", address(0xBEEF))), "setter");
        }
        require(p.feeRecipient() == FEE_TO && p.feeBps() == 25, "unchanged after every caller and call");
    }
    function test_factoryFixesRecipientAndBpsForEveryAgreement() public {
        PledgeFactory f = new PledgeFactory(FEE_TO, 25);
        address[2] memory teams = [address(0xBEEF), FEE_TO]; // even the recipient, as a team, cannot choose another recipient
        for (uint i; i < teams.length; i++) {
            vm.prank(teams[i]); Pledge a = f.create(_terms());
            require(a.team() == teams[i] && a.feeRecipient() == FEE_TO && a.feeBps() == 25 && f.isAgreement(address(a)), "agreement carries the factory terms");
        }
    }
    function test_feeBpsCannotExceedCap() public {
        new Pledge(address(this), FEE_TO, MAX_FEE_BPS, _terms()); // the cap itself is allowed
        try new Pledge(address(this), FEE_TO, MAX_FEE_BPS + 1, _terms()) { revert("agreement above cap deployed"); } catch {}
        new PledgeFactory(FEE_TO, MAX_FEE_BPS);
        try new PledgeFactory(FEE_TO, MAX_FEE_BPS + 1) { revert("factory above cap deployed"); } catch {}
        try new PledgeFactory(address(0), 25) { revert("zero recipient"); } catch {}
    }
}
