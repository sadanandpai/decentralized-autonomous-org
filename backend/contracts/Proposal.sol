// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "./DaoUser.sol";


contract Proposal {
    DaoUser public dUser;
    uint public proposalId = 0;
    bool public currentActiveProposal = false;
    uint constant MAXIMUM_EXTENSION_COUNT = 2;
    uint constant PROPOSAL_TIME = 1 minutes;
    uint constant EXTENSION_TIME = 30 seconds;

    constructor(address daoUser){
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
       address _owner;
       uint _id;
       ProposalStatus _status;
       string _title;
       string _description;
       string _uploadDocPath;
       uint256 _totalNoOfVotes;
       uint256 _totalNoOfAcceptVotes;
       uint256 _totalNoOfRejectVotes;
       uint256 _endTime;
       uint _extensionCount;
   }

    event NewProposalCreated(uint indexed proposalId, string message);
    mapping(uint => mapping(address => VotingStatus)) public ProposalVotingDetails;

 
    ProposalStruct[] public _proposals;

    modifier canCreateProposal() {
        require(!currentActiveProposal , "Already another Proposal is active");
        _;
        currentActiveProposal = true;
    }

    function createProposal(string calldata _title, string calldata _description, string calldata _uploadDocPath) external canCreateProposal returns (uint) {
        require (dUser.isUserAddressPresent(address(msg.sender)), "User Not registered");
        ProposalStruct memory _proposal;
        _proposal._owner = msg.sender;
        _proposal._title = _title;
        _proposal._description = _description;
        _proposal._uploadDocPath = _uploadDocPath;
        _proposal._status  = ProposalStatus.Active;
        _proposal._id = proposalId++;
        _proposal._totalNoOfRejectVotes = 0;
        _proposal._totalNoOfAcceptVotes = 0;
        _proposal._totalNoOfVotes = 0;
        _proposal._endTime = (block.timestamp + PROPOSAL_TIME) * 1000;
        _proposal._extensionCount = 0;

        _proposals.push(_proposal);
        emit NewProposalCreated(proposalId - 1, "New Proposal Created");
        return proposalId - 1;
    }

    function vote(bool _status, uint _proposalId) external {
        require(
            _proposals.length != 0 && _proposals.length > _proposalId, 
            "Invalid Proposal"
        );
        require (
            dUser.isUserAddressPresent(msg.sender), 
            "User Not registered"
        );
        require(
            _proposals[_proposalId]._status == ProposalStatus.Active,
            "Proposal is not active for voting"
        );
        require(
            _proposals[_proposalId]._owner != msg.sender,
            "Owner can't vote"
        );
        
        require(
           ProposalVotingDetails[_proposalId][msg.sender] == VotingStatus.Pending,
            "You have already voted"
        );

        updateProposalVote(_proposalId, _status);
        processProposalVote(_proposalId);
    }

    function updateProposalVote(uint _proposalId, bool _status) internal {
            if (_status == true){
                ProposalVotingDetails[_proposalId][msg.sender] = VotingStatus.Accept;
                _proposals[_proposalId]._totalNoOfAcceptVotes += 1;
            }      
            else 
            {
                _proposals[_proposalId]._totalNoOfRejectVotes += 1;
                ProposalVotingDetails[_proposalId][msg.sender] = VotingStatus.Reject;
            }
            _proposals[_proposalId]._totalNoOfVotes += 1;
            
    }

    function processProposalVote(uint _proposalId) internal{
        if (_proposals[_proposalId]._endTime >= block.timestamp * 1000){
            if ((dUser.userCount() - 1) == _proposals[_proposalId]._totalNoOfVotes){
                _proposals[_proposalId]._status = calculateVotingResult(_proposalId);
                currentActiveProposal = false;
            }
        } 
        else{
            if (_proposals[_proposalId]._totalNoOfVotes % dUser.userCount() >= 80){
                _proposals[_proposalId]._status = calculateVotingResult(_proposalId);
                currentActiveProposal = false;
            }
            else{
                if (_proposals[_proposalId]._extensionCount <= MAXIMUM_EXTENSION_COUNT){
                    _proposals[_proposalId]._endTime += EXTENSION_TIME;
                    _proposals[_proposalId]._extensionCount += 1;
                }
                else{
                    _proposals[_proposalId]._status = calculateVotingResult(_proposalId);
                    currentActiveProposal = false;
                }
            }
            
        }
    }

    function calculateVotingResult(uint _proposalId) view internal returns (ProposalStatus) {
        if (_proposals[_proposalId]._totalNoOfAcceptVotes == 0){
            return ProposalStatus.Rejected;
        }
        else if(_proposals[_proposalId]._totalNoOfAcceptVotes >= _proposals[_proposalId]._totalNoOfRejectVotes){
            return ProposalStatus.Accepted;
        }
        else{
            return ProposalStatus.Rejected;
        }
    }
}





