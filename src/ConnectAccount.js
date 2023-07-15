import { useState } from 'react';
import Web3 from 'web3';
import CamelTokenAbi from 'contracts/CamelToken.json';
import { transferTokens } from './components/BuyTokenForm';

let CamelTokenContract;

export const ConnectAccount = async () => {
  //const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');
  let account;

  let provider = window.ethereum;
  // if metamask signed in and installed
  if (typeof provider != 'undefined') {
    // Request permission to access the user's MetaMask account
    provider
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        account = accounts[0];
        console.log(account);

        // const balance =await  Web3.eth.getBalance(currentAccount);
        // Get the balance of the account in wei
        //const etherBalance = await Web3.utils.fromWei(balance, 'ether');
        //setBalance(etherBalance);
        //get network type
        //const networks = Web3.eth.net.getNetworkType();
        //setNetwork(networks);
      })
      .catch((error) => console.log(error));

    window.ethereum.on('accountsChanged', function (account) {
      console.log(`you changed to Accunt: ${account}`);
    });
  }
  const web3 = new Web3(provider);

  console.log(CamelTokenAbi.abi);

  const networkId = await web3.eth.net.getId();
  console.log(networkId);

  CamelTokenContract = new web3.eth.Contract(
    CamelTokenAbi.abi,
    CamelTokenAbi.networks[networkId].address
  );
  console.log(CamelTokenContract);
  console.log(CamelTokenContract._address);
  console.log(CamelTokenAbi.contractName);

  // get contract balance
  async function getBalance() {
    try {
      // Call the balanceOf method on the contract to get the balance of the specified address
      const balance = await CamelTokenContract.methods
        .balanceOf(account)
        .call();

      // Display the balance
      console.log(
        `The CamelToken Address ${account}:has Balance of : ${balance}`
      );
    } catch (err) {
      console.log(err);
    }
  }
  getBalance();

  //mint C of contract
  //async function mintTokens(toAddress, amount) {
  // try {
  // Call the mint method on the contract to mint tokens
  //  const receipt = await CamelTokenContract.methods
  //  .mint(toAddress, amount)
  //   .send({ from: account });
  //console.log(
  //  `Minted ${amount} CAMEL tokens to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
  // );
  // } catch (err) {
  //   console.log(err);
  // }
  //}

  //example usage
  //const mintedTokens = await mintTokens(
  // '0x8d33326452498a2ee53a5fff72f5c68d603eb2ce',
  // 100000000000
  // );
  //console.log(mintedTokens);

  //transfer CamelToken function
  async function transferTokens(toAddress, amount) {
    try {
      //Call the transfer method on the contract to transfer tokens
      const receipt = await CamelTokenContract.methods
        .transfer(toAddress, amount)
        .send({ from: account });
      console.log(
        `Transferred ${amount} CamelTokens to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  // Example usage
  transferTokens('0xCcCD7571D1650D42D7Bc140334B37989f079f929', 1000);

  //buyToken function contractgaan kuma jirto smart contractgiisa waa in lagusoo daro si loo iibsan karo
  //methodka buy ama buyToken() kuu yahayna waa in la hubiyo
  //async function buyToken(amount) {
  //try {
  // Call the buy method on the contract to buy tokens
  //const receipt = await CamelTokenContract.methods
  // .buy()
  // .send({ from: account, value: amount });

  //console.log(
  //  `Bought ${amount} CAMEL tokens. Transaction hash: ${receipt.transactionHash}`
  // );
  // } catch (err) {
  //   console.log(err);
  // }
  // }
  // buyToken(50);

  return <div>ConnectAccount component</div>;
};
