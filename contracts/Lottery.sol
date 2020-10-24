pragma solidity ^0.5.16;

contract Lottery{
  address public manager;
  address payable[] public players;
  address public lastWinner;

  constructor() public{
    manager = msg.sender;
  }

  function enter() public payable{
    require(msg.value > .01 ether);
    players.push(msg.sender);
  }

  function random() private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players))); // ou sha3();
    // Eu poderia melhorar esta funcao injectando o clock da maquina, por ex
    // Esta funcoa nao e muito segura para gerar um numero aleatorio
  }

  function pickWinner() public restricted{
    uint index = random() % players.length;
    players[index].transfer(address(this).balance);
    lastWinner = players[index];
    players = new address payable[](0);
  }

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function getPlayers() public view returns(address payable[] memory){
    return players;
  }
}
