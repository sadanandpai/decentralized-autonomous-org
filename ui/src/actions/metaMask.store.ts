import {
  accountChangeToast,
  connectFailedToast,
  connectToast,
  networkChangeToast,
} from '@/constants/toast.data';

import { create } from 'zustand';
import { createStandaloneToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

const { toast } = createStandaloneToast();

interface MetaMaskStateIntf {
  provider: ethers.providers.Web3Provider | null;
  network: ethers.providers.Network | null;
  account: string | null;

  connectToMetaMask: () => void;
  resetMetaMask: () => void;
}

export const useMetaMaskStore = create<MetaMaskStateIntf>((set, get) => ({
  provider: null,
  network: null,
  account: null,

  connectToMetaMask: async () => {
    if (get().provider) {
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const network = await provider.getNetwork();
      const accounts = await provider.send('eth_requestAccounts', []);

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
}));

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
