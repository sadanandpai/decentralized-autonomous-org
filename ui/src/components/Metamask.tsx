import { Button } from "@chakra-ui/react";
import { enrollUser } from "@/actions/DaoUser";
import { ethers } from "ethers";
import { useState } from "react";

function Metamask() {
  const [address, setAddress] = useState<any>("");
  const [balance, setBalance] = useState<any>("");

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log(await provider.getNetwork());

    setAddress(accounts[0]);
    setBalance(
      ethers.utils.formatEther(await provider.getBalance(accounts[0]))
    );
  }

  if (address) {
    return (
      <>
        <div className="text-center my-8">
          <h3 className="text-xl">
            <strong>Address</strong>: {address}
          </h3>
          <h3 className="text-xl">
            <strong>Balance</strong>: {balance}
          </h3>
        </div>

        <Button variant="solid" colorScheme="green" onClick={enrollUser}>
          Enroll me
        </Button>
      </>
    );
  }

  return (
    <Button
      variant="solid"
      colorScheme="green"
      onClick={connectToMetamask}
      className="my-8"
    >
      Connect to Metamask
    </Button>
  );
}

export default Metamask;
