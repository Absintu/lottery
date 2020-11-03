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
  address payable[] public fullAddArray;

  constructor() public{
    manager = msg.sender;
  }

  function enter() public payable{
    require(msg.value > .01 ether);
    Player memory player = Player({add: msg.sender, amount: msg.value});
    players.push(player);
    addArray.push(msg.sender);
  }

  function random() private view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, now, fullAddArray))); // ou sha3();
    // Eu poderia melhorar esta funcao injectando o clock da maquina, por ex
    // Esta funcoa nao e muito segura para gerar um numero aleatorio
  }

  function pickWinner() public restricted{
    uint i;
    for(i=0; i<players.length; i++){
      uint j;
      for(j=0.01 ether; j<=players[i].amount; j += 0.01 ether){
        fullAddArray.push(players[i].add);
      }
    }
    uint index = random() % fullAddArray.length;
    fullAddArray[index].transfer(address(this).balance);
    lastWinner = fullAddArray[index];
    delete fullAddArray;
    delete players;
  }

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function getPlayers() public view returns(address payable[] memory){
    return addArray;
  }

  function getPlayerss() public view returns(address){
    return players[1].add;
  }

  function getFullAdd() public view returns(address payable[] memory){
    return fullAddArray;
  }
}
