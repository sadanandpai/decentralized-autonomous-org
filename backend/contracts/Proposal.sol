// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './DaoUser.sol';

/**
 * @title Proposal Contract
 * @dev Contract for creating and voting on proposals
 */
contract Proposal {
  DaoUser public dUser;
  uint public proposalId = 0;
  bool public currentActiveProposal = false;
  uint constant MAXIMUM_EXTENSION_COUNT = 1;
  uint constant PROPOSAL_TIME = 5 minutes;
  uint constant EXTENSION_TIME = 3 minutes;

  /**
   * @dev Constructor function
   * @param daoUser Address of the DaoUser contract
   */
  constructor(address daoUser) payable {
    dUser = DaoUser(daoUser);
  }

  enum VotingStatus {
    Pending,
    Accept,
    Reject
  }

  enum ProposalStatus {
    Active,
    Accepted,
    Rejected
  }

  struct ProposalStruct {
    address payable owner;
    uint id;
    ProposalStatus status;
    string title;
    string description;
    string uploadDocPath;
    uint256 totalNoOfVotes;
    uint256 totalNoOfAcceptVotes;
    uint256 totalNoOfRejectVotes;
    uint256 endTime;
    uint extensionCount;
  }

  struct VotingDetails {
    address user;
    VotingStatus vS;
  }

  event NewProposalCreated(uint indexed proposalId, string proposalTitle);
  mapping(uint => VotingDetails[]) public ProposalVotingDetails;
  mapping(uint => address[]) public ProposalUserAddresses;

  ProposalStruct[] public proposals;

  /**
   * @dev Modifier to check if a new proposal can be created
   */
  modifier canCreateProposal() {
    require(!currentActiveProposal, 'Already another Proposal is active');
    _;
    currentActiveProposal = true;
  }

  /**
   * @dev Creates a new proposal
   * @param _title Title of the proposal
   * @param _description Description of the proposal
   * @param _uploadDocPath Path of the uploaded document for the proposal
   * @return The ID of the new proposal
   */
  function createProposal(
    string calldata _title,
    string calldata _description,
    string calldata _uploadDocPath
  ) external payable canCreateProposal returns (uint) {
    require(msg.value == 0.1 * 10 ** 18, 'New proposal charge should be 0.1 ETH');
    require(dUser.isUserAddressPresent(address(msg.sender)), 'User Not registered');
    ProposalStruct memory proposal;
    proposal.owner = payable(msg.sender);
    proposal.title = _title;
    proposal.description = _description;
    proposal.uploadDocPath = _uploadDocPath;
    proposal.status = ProposalStatus.Active;
    proposal.id = proposalId++;
    proposal.endTime = (block.timestamp + PROPOSAL_TIME) * 1000;
    proposals.push(proposal);

    emit NewProposalCreated(proposalId - 1, proposal.title);
    return proposalId - 1;
  }

  /**
  * @dev Allows a user to vote on a proposal
  * @param _status The vote status (true for accept, false for reject)
  * @param _proposalId The ID of the proposal to vote on
  */
  function vote(bool _status, uint _proposalId) external {
    require(proposals.length != 0 && proposals.length > _proposalId, 'Invalid Proposal');
    require(dUser.isUserAddressPresent(msg.sender), 'User Not registered');
    require(
      proposals[_proposalId].status == ProposalStatus.Active,
      'Proposal is not active for voting'
    );

    address[] memory proposalUserAddresses = ProposalUserAddresses[_proposalId];
    for (uint256 pUA = 0; pUA < proposalUserAddresses.length; pUA++) {
      require(proposalUserAddresses[pUA] != msg.sender, 'You have already voted');
    }

    updateProposalVote(_proposalId, _status);
    processProposalVote(_proposalId);
  }

  /**
  * @dev Updates the vote status of a proposal and stores the voting details.
  * @param _proposalId ID of the proposal to be voted on.
  * @param _status Status of the vote (true for accept, false for reject).
  */
  function updateProposalVote(uint _proposalId, bool _status) internal {
    //   VotingDetails[] votingDetails;
    VotingDetails memory vD;
    vD.user = msg.sender;

    if (_status == true) {
      vD.vS = VotingStatus.Accept;
      ProposalVotingDetails[_proposalId].push(vD);
      proposals[_proposalId].totalNoOfAcceptVotes += 1;
    } else {
      vD.vS = VotingStatus.Reject;
      ProposalVotingDetails[_proposalId].push(vD);
      proposals[_proposalId].totalNoOfRejectVotes += 1;
    }
    proposals[_proposalId].totalNoOfVotes += 1;
    ProposalUserAddresses[_proposalId].push(msg.sender);
  }

  /**
  * @dev Processes the votes for a given proposal and updates its status accordingly.
  * @param _proposalId The ID of the proposal to process.
  */
  function processProposalVote(uint _proposalId) internal {
    if (
      proposals[_proposalId].endTime >= block.timestamp * 1000 &&
      proposals[_proposalId].extensionCount == 0
    ) {
      if (dUser.userCount() == proposals[_proposalId].totalNoOfVotes) {
        proposals[_proposalId].status = calculateVotingResult(_proposalId);
        currentActiveProposal = false;
      }
    } else {
      if (((8000 * dUser.userCount()) / 100) <= (proposals[_proposalId].totalNoOfVotes * 100)) {
        proposals[_proposalId].status = calculateVotingResult(_proposalId);
        currentActiveProposal = false;
      } else {
        if (proposals[_proposalId].extensionCount <= MAXIMUM_EXTENSION_COUNT) {
          proposals[_proposalId].endTime += (EXTENSION_TIME * 1000);
          proposals[_proposalId].extensionCount += 1;
        } else {
          proposals[_proposalId].status = calculateVotingResult(_proposalId);
          currentActiveProposal = false;
        }
      }
    }
  }

  /**
  * @dev Calculates the voting result for a given proposal based on the number of accept and reject votes.
  * @param _proposalId The ID of the proposal to calculate the voting result for.
  */
  function calculateVotingResult(uint _proposalId) internal returns (ProposalStatus) {
    if (proposals[_proposalId].totalNoOfAcceptVotes == 0) {
      return ProposalStatus.Rejected;
    } else if (
      proposals[_proposalId].totalNoOfAcceptVotes >= proposals[_proposalId].totalNoOfRejectVotes
    ) {
      payable(proposals[_proposalId].owner).transfer(0.1 * 10 ** 18);
      return ProposalStatus.Accepted;
    } else {
      return ProposalStatus.Rejected;
    }
  }
  
  /**
  * @dev Returns an array of all the proposals that have been created in the contract.
  * @return An array of ProposalStruct that contains details of all the proposals.
  */
  function getAllProposals() public view returns (ProposalStruct[] memory) {
    return proposals;
  }

  /**
  * @dev Gets the voting details for a specific proposal.
  * @param _proposalId The ID of the proposal.
  * @return An array of VotingDetails representing the voting details for the proposal.
  */
  function getProposalVotingDetails(uint _proposalId) public view returns (VotingDetails[] memory) {
    return ProposalVotingDetails[_proposalId];
  }
}
