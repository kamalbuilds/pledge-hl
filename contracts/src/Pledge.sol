// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
interface ICoreWriter { function sendRawAction(bytes calldata data) external; }
uint64 constant MAX_FEE_BPS = 100; // hard cap on any agreement's protocol fee: 1%
struct Terms { uint32 asset; uint32 spotIndex; uint64 token; uint64 capPerDay; uint64 floorPx8; uint64 maxDevBps; uint64 pxMul; uint64 startTs; uint64 days_; }
/// PLEDGE v2: a token team locks unlocked supply here. The contract can only sell it on the HyperCore spot book,
/// at most capPerDay (sz8) of FILLED size per 24h, at a contract-computed IOC limit = oracle * (1 - maxDevBps),
/// never below floorPx8. The caller picks only the size, never the price. The team cannot cancel or withdraw early.
/// v1 griefing fixed: (a) caller can't pick a floor or never-fill price, (b) the cap counts fills measured from the
/// contract's own Core balance delta (0x801), so an unfilled IOC refunds the cap on the next call.
/// Protocol fee: feeBps of each sale's realised USDC proceeds (the contract's Core USDC balance delta across the fill)
/// is sent by CoreWriter spotSend to feeRecipient inside reconcile(). Both are immutable per agreement, feeBps <= MAX_FEE_BPS.
/// Nothing is taken from locked principal, and an unfilled order moves no USDC so it pays no fee.
contract Pledge {
    address constant CW = 0x3333333333333333333333333333333333333333;
    address constant SPOT_BAL = 0x0000000000000000000000000000000000000801;
    address constant SPOT_PX = 0x0000000000000000000000000000000000000808;
    uint64 constant USDC_TOKEN = 0;
    address public immutable team; address public immutable feeRecipient; uint64 public immutable feeBps; uint32 public immutable asset; uint32 public immutable spotIndex; uint64 public immutable token;
    uint64 public immutable capPerDay; uint64 public immutable floorPx8; uint64 public immutable maxDevBps; uint64 public immutable pxMul; uint64 public immutable endTs; uint64 public immutable startTs; uint64 public immutable createdTs;
    uint64 public dayStart; uint64 public soldToday; // filled size counted in the current day
    uint64 public pending; uint64 public pendingBlock; uint64 public lastBal; uint64 public lastUsdc; // last submitted IOC awaiting reconcile
    event Sold(uint64 sz8, uint64 px8, uint64 oraclePx8);
    event Created(address indexed team, uint32 asset, uint64 capPerDay, uint64 floorPx8, uint64 startTs, uint64 endTs);
    event Filled(uint64 filled8, uint64 refunded8, uint64 soldToday);
    event FeeTaken(address indexed recipient, uint64 gross8, uint64 fee8, uint64 net8); // USDC, 8 decimals
    constructor(address team_, address feeRecipient_, uint64 feeBps_, Terms memory t) {
        require(t.maxDevBps < 10_000, "dev"); require(feeBps_ <= MAX_FEE_BPS, "fee cap"); require(feeRecipient_ != address(0), "recipient");
        team = team_; feeRecipient = feeRecipient_; feeBps = feeBps_; asset = t.asset; spotIndex = t.spotIndex; token = t.token; capPerDay = t.capPerDay;
        floorPx8 = t.floorPx8; maxDevBps = t.maxDevBps; pxMul = t.pxMul; createdTs = uint64(block.timestamp); startTs = t.startTs > block.timestamp ? t.startTs : uint64(block.timestamp); endTs = startTs + t.days_ * 1 days; dayStart = startTs;
        emit Created(team, asset, capPerDay, floorPx8, startTs, endTs);
    }
    function balanceOf(uint64 tok) internal view returns (uint64 total) {
        (bool ok, bytes memory out) = SPOT_BAL.staticcall(abi.encode(address(this), tok)); require(ok, "bal"); (total,,) = abi.decode(out, (uint64, uint64, uint64));
    }
    function balance() public view returns (uint64) { return balanceOf(token); }
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
            if (f > 0) takeFee();
        }
        if (block.timestamp >= dayStart + 1 days && pending == 0) { dayStart = uint64(block.timestamp); soldToday = 0; }
    }
    /// Fee on realised proceeds only: the USDC credited to this Core account since the order was submitted.
    function takeFee() internal {
        uint64 u = balanceOf(USDC_TOKEN); uint64 gross = u > lastUsdc ? u - lastUsdc : 0; uint64 fee = uint64(uint256(gross) * feeBps / 10_000);
        if (fee > 0) ICoreWriter(CW).sendRawAction(abi.encodePacked(uint8(1), uint24(6), abi.encode(feeRecipient, USDC_TOKEN, fee)));
        emit FeeTaken(feeRecipient, gross, fee, gross - fee);
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
        lastBal = b; lastUsdc = balanceOf(USDC_TOKEN); pending = sz8; pendingBlock = uint64(block.number);
        ICoreWriter(CW).sendRawAction(abi.encodePacked(uint8(1), uint24(1), abi.encode(asset, false, px, sz8, false, uint8(3), uint128(0))));
        emit Sold(sz8, px, o);
    }
    /// Remainder returns to team only after the pledge ends.
    function release(uint64 token_, uint64 wei_) external {
        require(msg.sender == team, "team"); require(block.timestamp >= endTs, "pledge active");
        reconcile(); require(pending == 0, "pending fill"); // a settled sale pays its fee before the team can move proceeds
        ICoreWriter(CW).sendRawAction(abi.encodePacked(uint8(1), uint24(6), abi.encode(team, token_, wei_)));
    }
}
