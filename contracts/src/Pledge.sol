// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
interface ICoreWriter { function sendRawAction(bytes calldata data) external; }
/// PLEDGE v2: a token team locks unlocked supply here. The contract can only sell it on the HyperCore spot book,
/// at most capPerDay (sz8) of FILLED size per 24h, at a contract-computed IOC limit = oracle * (1 - maxDevBps),
/// never below floorPx8. The caller picks only the size, never the price. The team cannot cancel or withdraw early.
/// v1 griefing fixed: (a) caller can't pick a floor or never-fill price, (b) the cap counts fills measured from the
/// contract's own Core balance delta (0x801), so an unfilled IOC refunds the cap on the next call.
contract Pledge {
    address constant CW = 0x3333333333333333333333333333333333333333;
    address constant SPOT_BAL = 0x0000000000000000000000000000000000000801;
    address constant SPOT_PX = 0x0000000000000000000000000000000000000808;
    address public immutable team; uint32 public immutable asset; uint32 public immutable spotIndex; uint64 public immutable token;
    uint64 public immutable capPerDay; uint64 public immutable floorPx8; uint64 public immutable maxDevBps; uint64 public immutable pxMul; uint64 public immutable endTs; uint64 public immutable startTs; uint64 public immutable createdTs;
    uint64 public dayStart; uint64 public soldToday; // filled size counted in the current day
    uint64 public pending; uint64 public pendingBlock; uint64 public lastBal; // last submitted IOC awaiting reconcile
    event Sold(uint64 sz8, uint64 px8, uint64 oraclePx8);
    event Created(address indexed team, uint32 asset, uint64 capPerDay, uint64 floorPx8, uint64 startTs, uint64 endTs);
    event Filled(uint64 filled8, uint64 refunded8, uint64 soldToday);
    constructor(uint32 asset_, uint32 spotIndex_, uint64 token_, uint64 capPerDay_, uint64 floorPx8_, uint64 maxDevBps_, uint64 pxMul_, uint64 startTs_, uint64 days_) {
        require(maxDevBps_ < 10_000, "dev"); team = msg.sender; asset = asset_; spotIndex = spotIndex_; token = token_; capPerDay = capPerDay_;
        floorPx8 = floorPx8_; maxDevBps = maxDevBps_; pxMul = pxMul_; createdTs = uint64(block.timestamp); startTs = startTs_ > block.timestamp ? startTs_ : uint64(block.timestamp); endTs = startTs + days_ * 1 days; dayStart = startTs;
        emit Created(team, asset, capPerDay, floorPx8, startTs, endTs);
    }
    function balance() public view returns (uint64 total) {
        (bool ok, bytes memory out) = SPOT_BAL.staticcall(abi.encode(address(this), token)); require(ok, "bal"); (total,,) = abi.decode(out, (uint64, uint64, uint64));
    }
    function oraclePx8() public view returns (uint64 px) {
        (bool ok, bytes memory out) = SPOT_PX.staticcall(abi.encode(spotIndex)); require(ok, "px"); px = abi.decode(out, (uint64)) * pxMul;
    }
    /// IOC limit: oracle minus band, truncated to 5 significant figures and 6 decimals (szDecimals 2) for Core tick rules.
    function limitPx8() public view returns (uint64 px) {
        px = uint64(uint256(oraclePx8()) * (10_000 - maxDevBps) / 10_000); uint64 d = 0; uint64 t = px; while (t > 0) { d++; t /= 10; }
        uint64 q = d > 5 ? uint64(10 ** (d - 5)) : 1; if (q < 100) q = 100; px = px / q * q;
    }
    /// Settle the previous IOC from the Core balance delta. Core actions apply after the EVM block, so only later blocks reconcile.
    function reconcile() public {
        if (pending > 0 && block.number > pendingBlock) {
            uint64 b = balance(); uint64 f = lastBal > b ? lastBal - b : 0; if (f > pending) f = pending;
            emit Filled(f, pending - f, soldToday + f); soldToday += f; pending = 0;
        }
        if (block.timestamp >= dayStart + 1 days && pending == 0) { dayStart = uint64(block.timestamp); soldToday = 0; }
    }
    /// The team can never cancel: there is deliberately no cancel/withdraw path. This always reverts, for the demo.
    function cancel() external pure { revert("irrevocable: no cancel"); }
    function remainingToday() external view returns (uint64) { uint64 u = soldToday + pending; return u >= capPerDay ? 0 : capPerDay - u; }
    /// Permissionless keeper call: caller chooses size only.
    function sell(uint64 sz8) external {
        require(block.timestamp >= startTs, "not started"); reconcile(); require(pending == 0, "pending fill");
        require(sz8 > 0 && sz8 % 1e6 == 0, "lot"); // szDecimals 2
        require(soldToday + sz8 <= capPerDay, "daily cap");
        uint64 o = oraclePx8(); require(o > 0, "no oracle"); uint64 px = limitPx8(); require(px >= floorPx8, "below floor");
        uint64 b = balance(); require(b >= sz8, "balance");
        lastBal = b; pending = sz8; pendingBlock = uint64(block.number);
        ICoreWriter(CW).sendRawAction(abi.encodePacked(uint8(1), uint24(1), abi.encode(asset, false, px, sz8, false, uint8(3), uint128(0))));
        emit Sold(sz8, px, o);
    }
    /// Remainder returns to team only after the pledge ends.
    function release(uint64 token_, uint64 wei_) external {
        require(msg.sender == team, "team"); require(block.timestamp >= endTs, "pledge active");
        ICoreWriter(CW).sendRawAction(abi.encodePacked(uint8(1), uint24(6), abi.encode(team, token_, wei_)));
    }
}
