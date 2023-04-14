const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("User", function () {
  async function deployUserFixture() {
    const User = await ethers.getContractFactory("DaoUser");
    return await User.deploy();
  }

  it("should get deployed", async function () {
    const user = await loadFixture(deployUserFixture);
    expect(user).not.to.be.undefined;
  });
});
