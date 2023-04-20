// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './DaoUser.sol';

contract Proposal {
  DaoUser public dUser;
  uint public proposalId = 0;
  bool public currentActiveProposal = false;
  uint constant MAXIMUM_EXTENSION_COUNT = 1;
  uint constant PROPOSAL_TIME = 5 minutes;
  uint constant EXTENSION_TIME = 3 minutes;

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

  modifier canCreateProposal() {
    require(!currentActiveProposal, 'Already another Proposal is active');
    _;
    currentActiveProposal = true;
  }

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

  function getAllProposals() public view returns (ProposalStruct[] memory) {
    return proposals;
  }

  function getProposalVotingDetails(uint _proposalId) public view returns (VotingDetails[] memory) {
    return ProposalVotingDetails[_proposalId];
  }
}
