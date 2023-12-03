//  there are three step involve to deploy a any contract 
 //1 imports
 //2 async main function 
 //3 main for call the function 

// we add prettier and our solidity prettier plugins , so we should  not write a semo colums(yarn add --dev prettier prettier-plugin-solidity) 

 // imports 

 //const { ethers } = require("hardhat")
 //const { ethers } = require("ethers");

 

  //we are  pulling in ethers we can actually immediately grab a  conrtact factory using ether

 //now if we pulled right from ethers the package ethers does not know about this contract folder and ethers doen not know we have already compiled simplestorage .sol  and its our artifacts 

 // hardhat on other hand  does know  about the contract folders and does know that its already compiled .

// async main function
/*
 async function main(){
  const storagefactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract .....")
  const simplestorage = await storagefactory.deploy();
  await simplestorage.deployed();
  console.log("simple storage Contract deployed to:", simplestorage.address);

 }
 //so any time we run the scripts withoout specifying a network ,it  automatically uses fake hardhat network 
 // and this fake hardhat network comes automatically with an RPC  url and a private key .

 // in any scripts we run we can chose whatever network we want to work with 

 

 

 //main for call the function 
 main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  */

  
/*
  async function main() {
    const storageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("deploying contract ...");
// set gas price
    //const gasPrice = ethers.parseUnits()("20", "gwei");

    // Deploy the contract
    const simpleStorageContract = await storageFactory.deploy({ gasPrice });
    await simpleStorageContract.deployed();

    // Get the contract's address
    console.log("Simple Storage contract deployed to:", simpleStorageContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

    */

// imports
const { ethers,run,network } = require("hardhat")

//run allow us to run any hardhat task 

// async main
async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address()}`)
  //so we want to say if the network dot config dot chainid  is 11155111 so if we are on  sepolia then we can go head and verify
  // but we also want to make sure we only verify if our etherscan api key exists
 // what happens when we deploy to our hardhat network?
 if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
  console.log("Waiting for block confirmations...")
  await simpleStorage.deployTransaction.wait(6)
  await verify(simpleStorage.address() , [])

 }

 // we starting intreact with the contract . 
 const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

//for verifying our contract   we use hardhat package name (yarn add --dev @nomiclabs/hardhat-etherscan)
// now that we have  this package we can go to our hardhat dot config  and  add this packGE (require("@nomiclabs/hardhat-etherscan"))

// in order for us to use this verification we actually need API key from ether scan 

// this is basically a password for  allowing us to use the ether sacn api 

// etherscn website and do sing up and creat a api key 
//jab creat ho jayaega to copy kar lo api key ko  and add kar dotenv file me jakar


const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}



// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })