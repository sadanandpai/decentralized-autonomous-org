require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.GANACHE_PRIVATE_KEY],
    },
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/62c36671929247c28067de709013b0ef",
    //   accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    // },
  },
};
