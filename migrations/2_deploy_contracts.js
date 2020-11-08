// Fetch the Storage contract data from the Storage.json file
const Lottery = artifacts.require("Lottery");
const LotteryDA = artifacts.require("LotteryDA");
const LotteryFA = artifacts.require("LotteryFA");

// JavaScript export
module.exports = function(deployer) {
    // Deployer is the Truffle wrapper for deploying
    // contracts to the network

    // Deploy the contract to the network
    deployer.deploy(Lottery);
    deployer.deploy(LotteryDA);
    deployer.deploy(LotteryFA);
}
