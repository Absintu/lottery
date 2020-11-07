pragma solidity ^0.6.4;


contract LotteryDA{
  address payable public manager;
  address payable[] public players;
  address payable public lastWinner;
  uint public numberOfTickets = 0;

  constructor() public{
    manager = msg.sender;
  }

  function enter() public payable{
    require(msg.value >= .01 ether);
    uint temp = msg.value/(1e16);
    for (uint i=0; i<temp; i++)
      players.push(msg.sender);
    numberOfTickets += temp;
  }

  function random() private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players))); // ou sha3();
    // Eu poderia melhorar esta funcao injectando o clock da maquina, por ex
    // Esta funcoa nao e muito segura para gerar um numero aleatorio
  }

  function pickWinner() external restricted{
    uint index = random() % players.length;
    lastWinner = players[index];
    lastWinner.transfer(address(this).balance);
    numberOfTickets = 0;
  }

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function getPlayers() public view returns(address payable[] memory){
    return players;
  }
}