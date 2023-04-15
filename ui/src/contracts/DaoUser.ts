import { ethers } from 'ethers';
import { provider } from '@/actions/Metamask';

const signer = provider?.getSigner();
const contractAddress = '0xe25937256311A1fBB69EDCA6273ABB317fB00dcA';
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'firstName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lastName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    name: 'NewUserAdded',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'firstName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'lastName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
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
        name: 'firstName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'lastName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
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
        name: 'firstName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'lastName',
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

export const DAO_USER_CONTRACT = new ethers.Contract(contractAddress, abi, signer);
