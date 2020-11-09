pragma solidity ^0.6.4;


contract Lottery{
  address payable public manager;
  mapping (uint =>  address payable) players;
  address payable public lastWinner;
  uint public numberOfTickets = 0;
  uint minAmount;

  constructor(address payable _manager, uint _minAmount) public{
    manager = _manager;
    minAmount = _minAmount;
  }

  function enter() public payable{
    require(msg.value >= minAmount);
    // Calculates the step to incrise aka value of each ticker: 0.01 ether, 0.1 ether, etc
    uint temp = msg.value/((1e16)*minAmount);
    for (uint i=0; i<temp; i++)
      players[numberOfTickets++]=msg.sender;
  }

  function random() private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, numberOfTickets))); // ou sha3();
    // Eu poderia melhorar esta funcao injectando o clock da maquina, por ex
    // Esta funcoa nao e muito segura para gerar um numero aleatorio
  }

  function pickWinner() external restricted{
    uint index = random() % numberOfTickets;
    lastWinner = players[index];
    lastWinner.transfer(address(this).balance);
    numberOfTickets = 0;
  }

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function getPlayers() public view returns(uint){
    return numberOfTickets;
  }
}