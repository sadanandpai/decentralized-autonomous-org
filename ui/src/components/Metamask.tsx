import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

function Metamask() {
  const [address, setAddress] = useState<any>("");

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log(await provider.getNetwork());
    setAddress(accounts[0]);
  }

  if (address) {
    return (
      <div className="text-center">
        <h2>Welcome to metamask!!!</h2>
        <h3>{address}</h3>
      </div>
    );
  }

  return (
    <Button variant="solid" colorScheme="green" onClick={connectToMetamask}>
      Connect to Metamask
    </Button>
  );
}

export default Metamask;
