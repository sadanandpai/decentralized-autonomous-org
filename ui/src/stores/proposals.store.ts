import { connectFailedToast } from '@/constants/toast.data';
import { create } from 'zustand';
import { createStandaloneToast } from '@chakra-ui/react';
import { fetchProposals } from '@/actions/proposal.action';

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
      const proposals: any = Array.from(await fetchProposals());

      set({
        proposals: proposals.reverse(),
        activeProposal: proposals[0]?.status === 0 ? proposals[0] : null,
      });
    } catch (e) {
      toast(connectFailedToast);
    }
  },
}));
