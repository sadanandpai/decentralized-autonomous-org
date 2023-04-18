import { ethers } from 'ethers';
import { getProposalContract } from '@/contracts/proposal.contract';

export const fetchProposals = async () => {
  return await getProposalContract().getAllProposals();
};

export const createNewProposal = async (title: string, description: string, docPath = '') => {
  return await getProposalContract().createProposal(title, description, docPath, {
    value: ethers.utils.parseEther('0.1'),
  });
};

export const getVotersList = async (proposalId: number) => {
  return await getProposalContract().getProposalVotingDetails(proposalId);
};

export const voteForProposal = async (status: boolean, proposalId: number) => {
  return await getProposalContract().vote(status, proposalId);
};
