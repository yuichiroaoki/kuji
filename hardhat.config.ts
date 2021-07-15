import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import '@typechain/hardhat'

import "./tasks/fund-link";
import "./tasks/balance";
import "./tasks/block-number";
import "./tasks/accounts";


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const local: import('hardhat/config').HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
    },
  },
};

const main: import('hardhat/config').HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    // hardhat: {
    //   forking: {
    //     url: process.env.ALCHEMY_MAINNET_RPC_URL,
    //     blockNumber: 12821544
    //   }
    // },
    kovan: {
      url: process.env.ALCHEMY_KOVAN_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
}

const config = process.env.ALCHEMY_KOVAN_RPC_URL ? main : local;

module.exports = config;