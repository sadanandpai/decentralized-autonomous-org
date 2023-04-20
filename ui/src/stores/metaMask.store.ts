import {
  accountChangeToast,
  connectFailedToast,
  connectToast,
  getInfoToast,
  getSuccessToast,
  networkChangeToast,
} from '@/constants/toast.data';
import { logParser, proposalEventFilter } from '@/contracts/proposal.contract';

import { create } from 'zustand';
import { createStandaloneToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

const { toast } = createStandaloneToast();

interface MetaMaskStateIntf {
  provider: ethers.providers.Web3Provider | null;
  network: ethers.providers.Network | null;
  account: string | null;
  isNewUser: boolean;

  connectToMetaMask: () => void;
  resetMetaMask: () => void;
  setIsNewUser: (isNewUser: boolean) => void;
}

export const useMetaMaskStore = create<MetaMaskStateIntf>((set, get) => ({
  provider: null,
  network: null,
  account: null,
  isNewUser: true,

  connectToMetaMask: async () => {
    if (get().provider) {
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const network = await provider.getNetwork();
      const accounts = await provider.send('eth_requestAccounts', []);

      provider.removeListener(proposalEventFilter, serverEventHandler);
      provider.on(proposalEventFilter, serverEventHandler);

      set({
        provider,
        network,
        account: accounts[0],
      });

      (window as any).ethereum.on('chainChanged', handleChainChanged);
      (window as any).ethereum.on('accountsChanged', handleAccountChanged);

      toast(connectToast);
    } catch (e) {
      toast(connectFailedToast);
    }
  },

  resetMetaMask: () => {
    set({
      provider: null,
      network: null,
      account: null,
    });

    (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
    (window as any).ethereum.removeListener('accountsChanged', handleAccountChanged);
  },

  setIsNewUser: (isNewUser: boolean) => {
    set({
      isNewUser,
    });
  },
}));

const serverEventHandler = (log: any) => {
  const data = logParser.parseLog(log);

  switch (data?.topic) {
    case '0xd3fa56f4c3009761856942df45fd80d620a3a7d29984823c5e0625403fb2f75d':
      toast(
        getInfoToast({
          title: 'New proposal is created at org',
          description: 'Title: ' + data?.args?.message,
        })
      );
      break;
  }
};

const handleChainChanged = () => {
  useMetaMaskStore.getState().resetMetaMask();
  toast(networkChangeToast);
  window.location.href = '/';
};

const handleAccountChanged = () => {
  useMetaMaskStore.getState().resetMetaMask();
  toast(accountChangeToast);
  window.location.href = '/';
};

export const getBalance = async () => {
  const store = useMetaMaskStore.getState();
  return ethers.utils.formatEther(await store.provider!.getBalance(store.account!));
};
