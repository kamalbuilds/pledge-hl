// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "./Pledge.sol";
/// Creates PLEDGE agreements. The protocol fee recipient and fee bps are fixed at factory deployment (bps <= MAX_FEE_BPS)
/// and copied into every agreement as immutables. The caller cannot choose either; the caller becomes the team.
contract PledgeFactory {
    address public immutable feeRecipient; uint64 public immutable feeBps;
    mapping(address => bool) public isAgreement;
    event AgreementCreated(address indexed team, address indexed agreement, address feeRecipient, uint64 feeBps);
    constructor(address feeRecipient_, uint64 feeBps_) {
        require(feeRecipient_ != address(0), "recipient"); require(feeBps_ <= MAX_FEE_BPS, "fee cap");
        feeRecipient = feeRecipient_; feeBps = feeBps_;
    }
    function create(Terms calldata t) external returns (Pledge p) {
        p = new Pledge(msg.sender, feeRecipient, feeBps, t);
        isAgreement[address(p)] = true; emit AgreementCreated(msg.sender, address(p), feeRecipient, feeBps);
    }
}
