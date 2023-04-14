const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Proposal", function () {
  async function deployProposalFixture() {
    const Proposal = await ethers.getContractFactory("Proposal");
    return await Proposal.deploy();
  }

  it("should get deployed", async function () {
    const proposal = await loadFixture(deployProposalFixture);
    expect(proposal).not.to.be.undefined;
  });
});
