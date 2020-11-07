pragma solidity ^0.6.4;


contract Lottery{
  address payable public manager;
  address payable[7000] public players;
  address payable public lastWinner;
  uint public numberOfTickets = 0;

  constructor() public{
    manager = msg.sender;
  }

  function enter() public payable{
    require(msg.value >= .01 ether);
    uint temp = msg.value/(1e16);
    for (uint i=0; i<temp; i++)
      players[numberOfTickets++]=msg.sender;
  }

  function random() private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players))); // ou sha3();
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

  function getPlayers() external view returns(address payable[] memory ){
    address payable[] memory p;
    for(uint i=0; i<= numberOfTickets; i++)
      p[i] = players[i];
    return p;
  }
}