// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const User = await hre.ethers.getContractFactory("DaoUser");
  const Proposal = await hre.ethers.getContractFactory("Proposal");

  // here we deploy the contract
  const user = await User.deploy();

  // wait for the contract to deploy
  await user.deployed();

  // print the address of the deployed contract
  console.log(`DaoUser is deployed to ${user.address}`);


  const proposal = await Proposal.deploy(user.address);

  await proposal.deployed();
  console.log(`Proposal is deployed to ${proposal.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
