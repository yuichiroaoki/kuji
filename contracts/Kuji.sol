// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Kuji is VRFConsumerBase, Ownable {
    using SafeMath for uint256;

    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;
    uint16 public constant WINNING_NUMBER = 7;

    event NumberChanged(bytes32 requestId, uint256 randomness);

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088 // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10**18; // 0.1 LINK (Varies by network)
    }

    function getLinkBalance() public view returns (uint256 linkBalance) {
        return LINK.balanceOf(address(this));
    }

    /**
     * Requests randomness
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        emit NumberChanged(requestId, randomness);
        randomResult = randomness.mod(100).add(1);
    }

        /**
         * @notice Withdraw LINK from this contract.
         * @dev this is an example only, and in a real contract withdrawals should
         * happen according to the established withdrawal pattern: 
         * https://docs.soliditylang.org/en/v0.4.24/common-patterns.html#withdrawal-from-contracts
         * @param to the address to withdraw LINK to
         * @param value the amount of LINK to withdraw
         */
        function withdrawLINK(address to, uint256 value) public onlyOwner {
            require(LINK.transfer(to, value), "Not enough LINK");
        }
}
