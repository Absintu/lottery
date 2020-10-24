import Web3 from 'web3'

let web3 = new Web3(window.ethereum);

if (window.ethereum) {
   try {
       console.log('entrou')
       let web3Provider = new Web3(window.ethereum)
       web3 = new Web3(web3Provider)
       window.ethereum.enable().then(function() {
          // User has allowed account access to DApp...
      });
   } catch(e) {
      // User has denied account access to DApp...
      // alert('Cant use window.ethereum !');
   }
}
// Legacy DApp Browsers
else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
}
// Non-DApp Browsers
else {
    alert('You have to install MetaMask !');
}

export default web3;