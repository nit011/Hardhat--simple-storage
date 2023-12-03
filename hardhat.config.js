require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
//require("@nomiclabs/hardhat-etherscan")
//we have a @nomicfoundation/hardhat-toolbox so we remove  @nomiclabs/hardhat-etherscan
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */

// for readability ,we usally like to add them as variables 

 const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
 // once we are going to be pulling that SEPOLIA_RPC_URL from our environment variable 
 // in order to pull that  environment variable  we are going to need to use that dot env package .
 // so to add pacage run this command (yarn add -- dev dotenv)
 // now this means we should be able to pull our SEPOLIA_RPC_URL from our dot env file
 const PRIVATE_KEY =  process.env.PRIVATE_KEY
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
 const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY


module.exports = {

  defaultNetwork: "hardhat",
// we are going to add a network section  

  networks:{
    sepolia:{
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },

  solidity: "0.8.19",

  // we are going to creat a new section in a module.exports,and tell hardhat that we have this etherscan api key 

  etherscan:{
    apikey:ETHERSCAN_API_KEY,
  },

  //yarn add hardhat-gas-reporter --save-dev   using this install gas reporter 

  gasReporter:{
    enable: true,
    outputFile:"gas-report.tx",
    nocolors:true,
    currency:"USD",
    coinmarketcap: COINMARKETCAP_API_KEY
    // GO COINMARKET website and creat a apikey like etherscan and copy it and paste 
  }
};
