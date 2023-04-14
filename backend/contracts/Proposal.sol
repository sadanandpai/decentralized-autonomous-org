// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./DaoUser.sol";

contract Proposal {
    uint public proposalId = 0;
    bool public currentActiveProposal = false;
    bool public locked;

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
        uint _id;
        proposalStatus _ps;
        string _title;
        string _description;
    }

    // mapping(Proposal => mapping(User => VotingStatus)) public proposals;

    ProposalStruct public proposal;

    modifier canCreateProposal() {
        require(
            !currentActiveProposal && !locked,
            "Already another Proposal is in progress"
        );

        locked = true;
        _;
        locked = false;
        currentActiveProposal = true;
    }

    function createProposal(
        string calldata _title,
        string calldata _description
    ) external canCreateProposal returns (string memory, string memory) {
        // require();
        proposal._title = _title;
        proposal._description = _description;
        proposal._ps = proposalStatus.Active;
        proposal._id = ++proposalId;
        return (_title, _description);
    }
}
