import { getProposalContract } from '@/contracts/proposal.contract';

export const fetchProposals = async () => {
  return await getProposalContract().getAllProposals();
};

export const createNewProposal = async (title: string, description: string, docPath = '') => {
  return await getProposalContract().createProposal(title, description, docPath);
};

export const getMyVote = async (proposalId: number, account: string) => {
  return await getProposalContract().ProposalVotingDetails(proposalId, account);
};

export const voteForProposal = async (status: boolean, proposalId: number) => {
  return await getProposalContract().vote(status, proposalId);
};
