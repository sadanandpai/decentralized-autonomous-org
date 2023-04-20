import { ethers } from 'ethers';
import { useMetaMaskStore } from '@/stores/metaMask.store';

const contractAddress = '0x187F362e55747800a8f275b17873A2CF2FE3a5E0';
const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'daoUser',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'ProposalUserAddresses',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'ProposalVotingDetails',
    outputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'enum Proposal.VotingStatus',
        name: 'vS',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
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
    stateMutability: 'payable',
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
            internalType: 'address payable',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'getProposalVotingDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'enum Proposal.VotingStatus',
            name: 'vS',
            type: 'uint8',
          },
        ],
        internalType: 'struct Proposal.VotingDetails[]',
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
        internalType: 'address payable',
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
    stateMutability: 'payable',
    type: 'function',
  },
];

export const proposalEventFilter = {
  address: contractAddress,
  topics: ['0xd3fa56f4c3009761856942df45fd80d620a3a7d29984823c5e0625403fb2f75d'],
};
export const logParser = new ethers.utils.Interface(abi);

export const getProposalContract = () => {
  const signer = useMetaMaskStore.getState().provider?.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
