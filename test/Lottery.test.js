const lottery = artifacts.require('Lottery');
assert = require('assert');
isAddress = require('web3')

contract('Lottery', async(accounts) => {
    let instance;

    beforeEach( async () => {
        instance = await lottery.deployed();
    });

    it('deploys a contract', async () => {
        await assert.ok(instance.address);
    });

    it('should have as manager the account which deployed', async () => {
        const manager = await instance.manager.call();
        assert.equal(manager, accounts[0]);
    });

    it('allows one account to enter', async ()=>{
        await instance.enter({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await instance.getPlayers({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async ()=>{
        await instance.enter({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether")
        });

        await instance.enter({
            from: accounts[2],
            value: web3.utils.toWei("0.03", "ether")
        });

        await instance.enter({
            from: accounts[3],
            value: web3.utils.toWei("0.02", "ether")
        });

        players = await instance.getPlayers({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(accounts[3], players[3]);
        assert.equal(4, players.length);
    });

    it("requires a minimum amount of ether to enter!", async ()=>{
        try{
            await instance.enter({
                from: accounts[0],
                value: 0
            });
            assert(false);
        } catch(err){
            assert(err);
        }
    });

    it("only manager can call pickWinner", async ()=>{
        try{
            await instance.pickWinner({
                from: accounts[1]
            });
            assert(false);
        } catch (err){
            assert(err);
        }
    });

    it('pickWinner() returns an address', async ()=>{
        await instance.pickWinner({
            from: accounts[0]
        });
        assert.notEqual('0x0000000000000000000000000000000000000000', await instance.lastWinner());
    });
});
