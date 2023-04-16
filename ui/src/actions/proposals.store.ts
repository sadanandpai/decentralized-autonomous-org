import { connectFailedToast } from '@/constants/toast.data';
import { create } from 'zustand';
import { createStandaloneToast } from '@chakra-ui/react';
import { fetchProposals } from './proposal.action';

const { toast } = createStandaloneToast();

interface ProposalsStateIntf {
  proposals: any;
  activeProposal: any;
  getProposals: () => void;
}

export const useProposalsStore = create<ProposalsStateIntf>((set) => ({
  proposals: [],
  activeProposal: null,

  getProposals: async () => {
    try {
      const proposals = await fetchProposals();
      set({
        proposals: proposals.reverse(),
        activeProposal: proposals.at(-1),
      });
    } catch {
      toast(connectFailedToast);
    }
  },
}));
