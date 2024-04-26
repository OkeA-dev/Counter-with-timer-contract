// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract CounterWithTimer {
    uint256 private count;
    uint256 private nextAuctionTime;

    event CounterIncremented(uint256 count);
    event CounterDecremented(uint256 count);
    event TimerSet(uint256 delay);

    constructor() {
        count = 0;
        nextAuctionTime = block.timestamp;
    }

    function increment() public {
        require(block.timestamp >= nextAuctionTime, "Timer is still running");
        count++;
        emit CounterIncremented(count);
    }

    function decrement() public {
        require(block.timestamp >= nextAuctionTime, "Timer is still running");
        count--;
        emit CounterDecremented(count);
    }

    function setTimer(uint256 delay) public {
        nextAuctionTime = block.timestamp + delay;
        emit TimerSet(delay);
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function getTimeRemaining() public view returns (uint256) {
        if(block.timestamp >= nextAuctionTime) {
            return 0
        }
        return nextAuctionTime - block.timestamp;
    }
}