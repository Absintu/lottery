pragma solidity ^0.6.4;


contract Lottery{
  address payable public manager;
  struct Player{
    address payable add;
    uint amount;
  }
  Player[] public players;
  address public lastWinner;
  address payable[] addArray;
  uint public numberOfTickets = 0;

  constructor() public{
    manager = msg.sender;
  }

  function enter() public payable{
    require(msg.value > .01 ether);
    Player memory player = Player({add: msg.sender, amount: msg.value});
    players.push(player);
    addArray.push(msg.sender);
    uint temp = msg.value/(1e16);
    numberOfTickets += temp;
  }

  function random(address payable[] memory _fullAddArray) private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, _fullAddArray))); // ou sha3();
    // Eu poderia melhorar esta funcao injectando o clock da maquina, por ex
    // Esta funcoa nao e muito segura para gerar um numero aleatorio
  }

  function pickWinner() public restricted{
    uint i;
    uint indexFullAddArray=0;
    address payable[] memory fullAddArray = new address payable[](numberOfTickets);
    for(i=0; i<players.length; i++){
      uint j;
      for(j=0.01 ether; j<=players[i].amount; j += 0.01 ether){
        fullAddArray[indexFullAddArray++] = players[i].add;
      }
    }
    uint index = random(fullAddArray) % fullAddArray.length;
    fullAddArray[index].transfer(address(this).balance);
    lastWinner = fullAddArray[index];
    delete fullAddArray;
    delete players;
    numberOfTickets = 0;
  }

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function getPlayers() public view returns(address payable[] memory){
    return addArray;
  }
}
