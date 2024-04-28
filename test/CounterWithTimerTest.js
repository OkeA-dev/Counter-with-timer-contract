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
    it("Initial count is set to 0", async function () {
      const { counterWithTimer, owner } = await loadFixture(deployCounterWithTimer);
      expect(await counterWithTimer.count()).to.equal(0);
    });

    it("Increment the count", async function () {
      const { counterWithTimer, owner } = await loadFixture(deployCounterWithTimer);
      expect(await counterWithTimer.increment()).to.be.reverted;
    });
    
    
   
  });

  

});
