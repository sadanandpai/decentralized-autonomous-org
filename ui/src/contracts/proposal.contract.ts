import { ethers } from 'ethers';
import { useMetaMaskStore } from '@/actions/metaMask.store';

const contractAddress = '0x1eD82155c70A9F5Cb950CE5c406C1165690aD8E2';
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_uploadDocPath',
        type: 'string',
      },
    ],
    name: 'createProposal',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'daoUser',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
    ],
    name: 'NewProposalCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_status',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentActiveProposal',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dUser',
    outputs: [
      {
        internalType: 'contract DaoUser',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'enum Proposal.ProposalStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'uploadDocPath',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'totalNoOfVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalNoOfAcceptVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalNoOfRejectVotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'extensionCount',
            type: 'uint256',
          },
        ],
        internalType: 'struct Proposal.ProposalStruct[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proposalId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposals',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'enum Proposal.ProposalStatus',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uploadDocPath',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'totalNoOfVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalNoOfAcceptVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalNoOfRejectVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'extensionCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ProposalVotingDetails',
    outputs: [
      {
        internalType: 'enum Proposal.VotingStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getProposalContract = () => {
  const signer = useMetaMaskStore.getState().provider?.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
