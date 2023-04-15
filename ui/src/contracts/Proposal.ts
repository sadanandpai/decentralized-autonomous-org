import { ethers } from 'ethers';
import { provider } from '@/actions/Metamask';

const signer = provider?.getSigner();
const contractAddress = '0xe25937256311A1fBB69EDCA6273ABB317fB00dcA';
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
    ],
    name: 'addUserDetails',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
    ],
    name: 'updateUserDetails',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userDetails',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const PROPOSAL_CONTRACT = new ethers.Contract(contractAddress, abi, signer);
