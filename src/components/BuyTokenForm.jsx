//import { useState } from 'react';
//import Web3 from 'web3';
//import CamelTokenAbi from 'contracts/CamelToken.json';

//let CamelTokenContract;
//et account;
//let initialized = false;

//export const BuyTokenForm = async () => {
//const [account, setAccount] = useState('');
// const [network, setNetwork] = useState('');
//const [balance, setBalance] = useState('');
//const [tokenAmount, setTokenAmount] = useState(0);

//const [toAddress, setToAddress] = useState('');
//const [amount, setAmount] = useState(0);

//let provider = window.ethereum;
// const web3 = new Web3(provider);
// if metamask signed in and installed

//if (typeof provider != 'undefined') {
// Request permission to access the user's MetaMask account
// provider
//  .request({
//  method: 'eth_requestAccounts',
//})
//.then((accounts) => {
//setAccount(accounts[0]);
// account = accounts[0];
//console.log(`connected to : ${account}`);

// web3.eth
//  .getBalance(account)
//  .then((balancee) => {
//  console.log(balancee);
//Get the balance of the account in wei
// const etherBalance = web3.utils.fromWei(balancee, 'ether');
//   setBalance(etherBalance);
// console.log(etherBalance);
//  })
// .catch((error) => {
//   console.log(error);
//    return;
//   });

//get network Name

//const networkIdToName = {
// 1: 'Ethereum Mainnet',
// 2: 'Morden (deprecated)',
// 3: 'Ropsten',
// 4: 'Rinkeby',
//  5: 'Goerli',
// 42: 'Kovan',
//  5777: 'Ganache',
// 56: 'Binance Smart Chain (BSC)',
// 137: 'Polygon',
// };

// web3.eth.net
//  .getId()
//  .then((id) => setNetwork(networkIdToName[id] || 'Unknown'))
//  .catch((error) => console.log(error));
//  })
//  .catch((error) => console.log(error));

//window.ethereum.on('accountsChanged', function (account) {
// console.log(`you changed to Account: ${account}`);
// });
//}

//console.log(CamelTokenAbi.abi);

//const networkId = await web3.eth.net.getId();
//console.log(networkId);

//CamelTokenContract = new web3.eth.Contract(
//CamelTokenAbi.abi,
// CamelTokenAbi.networks[networkId].address
//);
//console.log(CamelTokenContract);
//console.log(CamelTokenContract._address);
//console.log(CamelTokenAbi.contractName);

//async function buyToken(amount) {
// try {
// Call the buy method on the contract to buy tokens
// const receipt = await CamelTokenContract.methods
// .buyToken()
// .send({ from: account, value: amount });

// console.log(
//  `Bought ${amount} CAMEL tokens. Transaction hash: ${receipt.transactionHash}`
// );
// } catch (err) {
//   console.log(err);
// }
//}
// buyToken(50);

//async function buyToken(toAddress, amount) {
// try {
// Call the buyToken method on the contract
// const result = await CamelTokenContract.methods
//  .buyToken(toAddress, amount)
// .send({ from: account, value: amount });

// Check if the transaction was successful
//7 if (result.status) {
//  console.log(`Successfully bought ${amount} tokens`);
// } else {
//  console.log(`Transaction failed`);
// }
// } catch (err) {
// console.log(err);
// }
//}

// const handleSubmit = async (event) => {
// event.preventDefault();
// await transferTokens(toAddress, amount);
//await buyToken(toAddress, amount);
////};
//};

//transfer CamelToken function
//export const transferTokens = async (toAddress, amount) => {
//if(!initialized) {
// initialized=true
// BuyTokenForm()
// }
// try {
// Call the transfer method on the contract to transfer tokens
//const receipt = await CamelTokenContract.methods
// .transfer(toAddress, amount)
// .send({ from: account });
//console.log(
//  `Transferred ${amount} CamelTokens to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
//  );
// } catch (err) {
// console.log(err);
//7  }
//};
// Example usage
// transferTokens('0x8D33326452498a2eE53A5fFf72f5C68D603EB2ce', 500);
//};
