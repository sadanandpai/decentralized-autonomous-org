import { accountChangeToast, networkChangeToast } from '@/constants/toast';

import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

export let provider: ethers.providers.Web3Provider | null = null;
export let network: ethers.providers.Network | null;
export let account: string | null;

const { toast } = createStandaloneToast();

export const connectToMetaMask = async () => {
  if (provider) {
    return true;
  }

  try {
    const _provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const _network = await _provider.getNetwork();
    const accounts = await _provider.send('eth_requestAccounts', []);

    provider = _provider;
    network = _network;
    account = accounts[0];

    (window as any).ethereum.on('chainChanged', handleChainChanged);
    (window as any).ethereum.on('accountsChanged', handleAccountChanged);

    return true;
  } catch {
    return false;
  }
};

const resetMetaMask = () => {
  provider = null;
  network = null;
  account = null;

  (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
  (window as any).ethereum.removeListener('accountsChanged', handleAccountChanged);
};

const handleChainChanged = () => {
  resetMetaMask();
  Router.push('/');
  toast(networkChangeToast);
};

const handleAccountChanged = () => {
  resetMetaMask();
  Router.push('/');
  toast(accountChangeToast);
};

export const getBalance = async () => {
  return ethers.utils.formatEther(await provider!.getBalance(account!));
};
