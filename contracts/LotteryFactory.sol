pragma solidity ^0.6.4;

import "./Lottery.sol";

contract LotteryFactory{
    Lottery[] public lotteryAdd;
    event LotteryCreated(Lottery lottery);

    address payable public manager;

    constructor() public {
        manager = msg.sender;
    }

    function createLottery(uint[] memory minAmount) public {
        Lottery lotteryGold = new Lottery(manager, minAmount[0]);
        Lottery lotterySilver = new Lottery(manager, minAmount[1]);
        Lottery lotteryBronze = new Lottery(manager, minAmount[2]);

        lotteryAdd.push(lotteryGold);
        emit LotteryCreated(lotteryGold);
        lotteryAdd.push(lotterySilver);
        emit LotteryCreated(lotterySilver);
        lotteryAdd.push(lotteryBronze);
        emit LotteryCreated(lotteryBronze);
    }

    function getLottery() external view returns (Lottery[] memory) {
        return lotteryAdd;
    }
}