// Import the necessary modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proposal Contract", function () {
  let daoUser;
  let proposal;
  describe('createProposal', function () {
    // Deploy the contracts before each test
    beforeEach(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      // Deploy DaoUser contract
      const DaoUser = await ethers.getContractFactory("DaoUser");
      daoUser = await DaoUser.deploy();
      // Deploy Proposal contract
      const Proposal = await ethers.getContractFactory("Proposal");
      proposal = await Proposal.deploy(daoUser.address);
      await proposal.deployed();
      // add a user to the contract
      await daoUser.addUserDetails("John", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
    });

    it("Should create a new proposal", async function () {
      
      // Call createProposal function to create a new proposal
      const title = 'Test Proposal';
      const description = 'Test proposal description';
      const uploadDocPath = 'https://test-doc-path';
      const tx = await proposal.createProposal(title, description, uploadDocPath, { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });

      // Check the emitted event
      const receipt = await tx.wait();
      expect(receipt.events[0].event).to.equal('NewProposalCreated');
      expect(receipt.events[0].args.proposalId).to.equal(0);

      // Check that the proposal was created successfully
      const proposals = await proposal.getAllProposals();
      expect(proposals[0].owner).to.equal(owner.address);
      expect(proposals[0].title).to.equal(title);
      expect(proposals[0].description).to.equal(description);
      expect(proposals[0].uploadDocPath).to.equal(uploadDocPath);
      expect(proposals[0].status).to.equal(0); // ProposalStatus.Active
      expect(proposals[0].id).to.equal(0);
    });

    it('should not allow creation of proposal when another is active', async function () {

      const title = 'Test Proposal';
      const description = 'Test proposal description';
      const uploadDocPath = 'https://test-doc-path';
      await proposal.createProposal(title, description, uploadDocPath, { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });

      await expect(proposal.createProposal(title, description, uploadDocPath, { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 })).to.be.revertedWith(
        'Already another Proposal is active'
      );
    });

    it('should not allow creation of proposal by unregistered user', async function () {
      const title = 'Test Proposal';
      const description = 'Test proposal description';
      const uploadDocPath = 'https://test-doc-path';
      await expect(proposal.connect(addr1).createProposal(title, description, uploadDocPath, { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 })).to.be.revertedWith(
        'User Not registered'
      );
    });
  });
  describe('vote', function () {
    // Deploy the contracts before each test
    beforeEach(async function () {
      [owner, addr1, addr2, addr3] = await ethers.getSigners();
      // Deploy DaoUser contract
      const DaoUser = await ethers.getContractFactory("DaoUser");
      daoUser = await DaoUser.deploy();
      // Deploy Proposal contract
      const Proposal = await ethers.getContractFactory("Proposal");
      proposal = await Proposal.deploy(daoUser.address);
      await proposal.deployed();
      // add users to the contract
      await daoUser.addUserDetails("John", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
      await daoUser.connect(addr1).addUserDetails("Jane", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
      await daoUser.connect(addr2).addUserDetails("Joe", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
      //create a proposal
      await proposal.createProposal('Test Proposal', 'Test proposal description', 'uploadDocPath', { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
    });

    it("should allow a registered user to vote on an active proposal", async function() {
      const proposalId = 0;
      await proposal.vote(true, proposalId);
      const votingDetails = await proposal.ProposalVotingDetails(proposalId, 0);
      expect(votingDetails.user).to.equal(owner.address);
      expect(votingDetails.vS).to.equal(1); // 1 is the VotingStatus.Accept value
    });

    it("should reject votes from unregistered users", async function() {
      const proposalId = 0;
      await expect(proposal.connect(addr3).vote(true, proposalId)).to.be.revertedWith("User Not registered");
    });

    it("should reject votes on invalid proposals", async function() {
      await expect(proposal.vote(true, 1)).to.be.revertedWith("Invalid Proposal");
    });

    it("should reject votes from users who have already voted", async function() {
      const proposalId = 0;
      await proposal.vote(true, proposalId);
      await expect(proposal.vote(false, proposalId)).to.be.revertedWith("You have already voted");
    });
  });
});
