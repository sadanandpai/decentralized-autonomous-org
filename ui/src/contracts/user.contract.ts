import { ethers } from 'ethers';
import { useMetaMaskStore } from '@/actions/metaMask.store';

const contractAddress = '0x8Cb095eD34A75dc03B27eb91EE6168Ba2ca3dfDb';
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
      {
        indexed: false,
        internalType: 'string',
        name: 'pic',
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
      {
        internalType: 'string',
        name: 'pic',
        type: 'string',
      },
    ],
    name: 'addUserDetails',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllUsers',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
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
          {
            internalType: 'string',
            name: 'pic',
            type: 'string',
          },
        ],
        internalType: 'struct DaoUser.User[]',
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
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'isUserAddressPresent',
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
      {
        internalType: 'string',
        name: 'pic',
        type: 'string',
      },
    ],
    name: 'updateUserDetails',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'userCount',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userDetails',
    outputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
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
      {
        internalType: 'string',
        name: 'pic',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getDaoUserContract = () => {
  const signer = useMetaMaskStore.getState().provider?.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
