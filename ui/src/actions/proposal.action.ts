import { getProposalContract } from '@/contracts/proposal.contract';

export const fetchProposals = async () => {
  return [
    {
      id: '12',
      title: 'Request to open Web3 Coaching',
      description:
        'There is a need for building a web3 community. I request a fund of 5000$ to open this as a part of DAO organization',
      result: '64% Yes',
    },
    {
      id: '14',
      title: 'Renovation of old buildings',
      description: 'Old Buildings need to be utilized after renovation. Fund needed is 10000$',
      result: '32% Yes',
    },
  ];

  // try {
  //   await getProposalContract.getProposals();
  // } catch {
  //   console.log('Something went wrong');
  // }
};
