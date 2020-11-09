const lotteryFactory = artifacts.require('LotteryFactory');
assert = require('assert');
isAddress = require('web3')

contract('LotteryFactory', async(accounts) => {
    let instance;

    beforeEach( async () => {
        instance = await lotteryFactory.deployed();
    });

    it('deploys a factory', async () => {
        await assert.ok(instance.address);
    });

    it('should have as manager the account which deployed', async () => {
        const manager = await instance.manager.call();
        assert.equal(manager, accounts[0]);
    });

    it('creates 3 lottery contracts', async ()=>{
        minAmount = [1*10^8, 1*10^7, 1*10^6]
        await instance.createLottery(minAmount);
        addArray = await instance.getLottery();

        assert.notEqual('undifined', addArray[0]);
        assert.notEqual('0x0000000000000000000000000000000000000000', addArray[0]);
        assert.notEqual('undifined', addArray[1]);
        assert.notEqual('0x0000000000000000000000000000000000000000', addArray[1]);
        assert.notEqual('undifined', addArray[2]);
        assert.notEqual('0x0000000000000000000000000000000000000000', addArray[2]);
    });
});
