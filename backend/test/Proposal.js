// Import the necessary modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proposal Contract", function () {
  let daoUser;
  let proposal;
  let owner, addr1, addr2;
  // Deploy the contracts before each test
  beforeEach(async function () {
    // Deploy DaoUser contract
    const DaoUser = await ethers.getContractFactory("DaoUser");
    daoUser = await DaoUser.deploy();

    // Deploy Proposal contract
    const Proposal = await ethers.getContractFactory("Proposal");
    proposal = await Proposal.deploy(daoUser.address);
    await proposal.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should create a new proposal", async function () {
    //Register user
    await daoUser.addUserDetails('Test', 'User', 'test@gmail.com', 'pic');

    // Call createProposal function to create a new proposal
    const title = 'Test Proposal';
    const description = 'Test proposal description';
    const uploadDocPath = 'https://test-doc-path';
    const tx = await proposal.createProposal(title, description, uploadDocPath);

    // Check the emitted event
    const receipt = await tx.wait();
    expect(receipt.events[0].event).to.equal('NewProposalCreated');
    expect(receipt.events[0].args.proposalId).to.equal(0);

    // Check that the proposal was created successfully
    const proposals = await proposal.getAllProposals();
    expect(proposals[0].owner).to.equal(await ethers.provider.getSigner(0).getAddress());
    expect(proposals[0].title).to.equal(title);
    expect(proposals[0].description).to.equal(description);
    expect(proposals[0].uploadDocPath).to.equal(uploadDocPath);
    expect(proposals[0].status).to.equal(0);
    expect(proposals[0].id).to.equal(0);
  });

  it('should not allow creation of proposal when another is active', async function () {
    //Register user
    await daoUser.addUserDetails('Test', 'User', 'test@gmail.com', 'pic');

    const title = 'Test Proposal';
    const description = 'Test proposal description';
    const uploadDocPath = 'https://test-doc-path';
    await proposal.createProposal(title, description, uploadDocPath);

    await expect(proposal.createProposal(title, description, uploadDocPath)).to.be.revertedWith(
      'Already another Proposal is active'
    );
  });

  it('should not allow creation of proposal by unregistered user', async function () {
    const title = 'Test Proposal';
    const description = 'Test proposal description';
    const uploadDocPath = 'https://test-doc-path';

    await expect(proposal.createProposal(title, description, uploadDocPath)).to.be.revertedWith(
      'User Not registered'
    );
  });
});
