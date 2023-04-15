// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "./DaoUser.sol";


contract Proposal {
    uint public proposalId = 0;
    bool public currentActiveProposal = false;
    uint constant MAXIMUM_EXTENSION_COUNT = 4;
    uint constant PROPOSAL_TIME = 30 minutes;
    uint constant EXTENSION_TIME = 2 minutes;

    enum VotingStatus {
        Pending,
        Accept,
        Reject
    }

    enum proposalStatus {
        Active,
        Accepted,
        Rejected,
        Expired
    }

   struct ProposalStruct {
       address _owner;
        uint _id;
       proposalStatus _status;
       string _title;
       string _description;
       uint256 _totalNoOfVotes;
       uint256 _totalNoOfAcceptVotes;
       uint256 _totalNoOfRejectVotes;
       uint256 _EndTime;
       bool _exists;
       uint _extensionCount;
   }

    event NewProposalCreated(uint indexed proposalId, string message);
    mapping(uint => mapping(address => VotingStatus)) public ProposalVotingDetails;

 
    ProposalStruct[] public _proposals;

    modifier canCreateProposal() {
        require(!currentActiveProposal , "Already another Proposal is in progress");
        _;
        currentActiveProposal = true;
    }

    function createProposal(string calldata _title, string calldata _description ) external canCreateProposal returns (uint) {
        ProposalStruct memory _proposal;
        _proposal._owner = msg.sender;
        _proposal._title = _title;
        _proposal._description = _description;
        _proposal._status  = proposalStatus.Active;
        _proposal._id = proposalId++;
        _proposal._totalNoOfRejectVotes = 0;
        _proposal._totalNoOfAcceptVotes = 0;
        _proposal._totalNoOfVotes = 0;
        _proposal._exists = true;
        _proposal._EndTime = (block.timestamp + PROPOSAL_TIME) * 1000;
        _proposal._extensionCount = 0;

        _proposals.push(_proposal);
        emit NewProposalCreated(proposalId - 1, "New Proposal Created");
        return proposalId - 1;
    }

    function vote(bool _status, uint _proposalId) external {

        require(
            _proposals[_proposalId]._exists, 
            "Invalid Proposal"
        );

        require(
            _proposals[_proposalId]._status == proposalStatus.Active,
            "Proposal is not active for voting"
        );
        require(
            _proposals[_proposalId]._owner != msg.sender,
            "Owner can't vote"
        );
        
        require(
           ProposalVotingDetails[_proposalId][msg.sender] == VotingStatus.Pending,
            "you have already voted"
        );

        // check time period 
        if (_proposals[_proposalId]._EndTime >= block.timestamp * 1000){
            updateProposalVote(_proposalId,_status, msg.sender);
        } 
        // else {
        //     // add 80% check as well
        //     if 
        //     if (_proposals[_proposalId]._extensionCount < MAXIMUM_EXTENSION_COUNT){

        //     }

        // }
    }

    function updateProposalVote(uint _proposalId, bool _status, address sender) internal {
            if (_status == true){
                ProposalVotingDetails[_proposalId][sender] = VotingStatus.Accept;
                _proposals[_proposalId]._totalNoOfAcceptVotes += 1;
            }      
            else 
            {
                _proposals[_proposalId]._totalNoOfRejectVotes += 1;
                ProposalVotingDetails[_proposalId][sender] = VotingStatus.Reject;
            }
            _proposals[_proposalId]._totalNoOfVotes += 1;
            
            console.log("MUNISH1");
            DaoUser daouser = DaoUser(sender);
            console.log(daouser.userCount());
            if (daouser.userCount() == _proposals[_proposalId]._totalNoOfVotes){
                console.log("MUNISH2");
                _proposals[_proposalId]._status = calculateVotingResult(_proposalId);
                currentActiveProposal = false;
            }
            
    }

    function calculateVotingResult(uint _proposalId) view internal returns (proposalStatus) {
        if (_proposals[_proposalId]._totalNoOfAcceptVotes >= _proposals[_proposalId]._totalNoOfRejectVotes){
            return proposalStatus.Accepted;
        }
        else{
            return proposalStatus.Rejected;
        }
    }
}







