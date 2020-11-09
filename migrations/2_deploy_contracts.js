// Fetch the Storage contract data from the Storage.json file
const LotteryFactory = artifacts.require("LotteryFactory");
const Lottery = artifacts.require("Lottery");
const LotteryDA = artifacts.require("LotteryDA");
const LotteryFA = artifacts.require("LotteryFA");

// JavaScript export
module.exports = function(deployer, network, accounts) {
    // Deployer is the Truffle wrapper for deploying
    // contracts to the network

    // Deploy the contract to the network
    deployer.deploy(LotteryFactory);
    deployer.deploy(Lottery, accounts[0], web3.utils.toWei("0.01", "ether")); // value in finney
    deployer.deploy(LotteryDA);
    deployer.deploy(LotteryFA);
}
