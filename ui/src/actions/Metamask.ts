import { ethers } from 'ethers';

export let provider: ethers.providers.Web3Provider;
export let network: ethers.providers.Network;
export let account: any;

export const connectToMetaMask = async () => {
  try {
    const _provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const _network = await _provider.getNetwork();
    const accounts = await _provider.send('eth_requestAccounts', []);

    provider = _provider;
    network = _network;
    account = accounts[0];

    return true;
  } catch {
    return false;
  }
};

export const getBalance = async () => {
  return ethers.utils.formatEther(await provider.getBalance(account));
};
