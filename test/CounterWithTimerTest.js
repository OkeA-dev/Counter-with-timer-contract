const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CounterWithTimerModule", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCounterWithTimer() {
    

    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const CounterWithTimer = await ethers.getContractFactory("CounterWithTimer");
    const counterWithTimer = await CounterWithTimer.deploy();

    return { counterWithTimer, owner};
  }

  describe("Deployment", function () {
    it("should have an initial count of 0", async function () {
      const { counterWithTimer, owner } = await loadFixture(deployCounterWithTimer);
      expect(await counterWithTimer.count()).to.equal(0);
    });

    it("Should increment the count", async function () {
      const { counterWithTimer} = await loadFixture(deployCounterWithTimer);
      const initialCount = await counterWithTimer.count();
      await counterWithTimer.increment();
      expect(await counterWithTimer.count()).to.equal((initialCount + 1n));
      
    });

    it("should decrement the count", async function () {
      const { counterWithTimer} = await loadFixture(deployCounterWithTimer);
      await counterWithTimer.increment();
      const initialCount = await counterWithTimer.count();
      await counterWithTimer.decrement();
      expect(await counterWithTimer.count()).to.equal((initialCount - 1n));
      
    });

    it("Should should set the timer", async function () {
      const { counterWithTimer} = await loadFixture(deployCounterWithTimer);
      const delay = 60; //1 minute
      await counterWithTimer.setTimer(delay);
      expect(await counterWithTimer.getTimeRemaining()).to.be.closeTo(delay, 2);
      
    });

    it("Should block increment and decrement when timer is running", async function () {
      const { counterWithTimer} = await loadFixture(deployCounterWithTimer);
      const delay = 60;
      await counterWithTimer.setTimer(delay);
      await expect( counterWithTimer.increment()).to.be.revertedWith("Timer is still running");
      await expect( counterWithTimer.decrement()).to.be.revertedWith("Timer is still running");
      
    });

    it("Should allow increment after timer expires", async function () {
      const { counterWithTimer} = await loadFixture(deployCounterWithTimer);
      const delay = 2;
      await counterWithTimer.setTimer(delay);
      await ethers.provider.send("evm_increaseTime", [delay + 1]);
      await ethers.provider.send("evm_mine");
      await counterWithTimer.increment();
      expect(await counterWithTimer.getCount()).to.equal(1);

    })



    


    
    
   
  });

  

});
