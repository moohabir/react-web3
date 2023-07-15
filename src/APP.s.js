import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import CamelTokenAbi from 'contracts/CamelToken.json';
import { ConnectAccount } from './ConnectAccount';
import TokenInfo from './components/TokenInfo';
import Header from './Header/Header';
import TransferForm from './components/TransferForm';

//const promise = TransferForm();
//import { BuyTokenForm, transferTokens } from './components/BuyTokenForm';

console.log(CamelTokenAbi);
//console.log(CamelTokenAbi.abi);
//
let CamelTokenContract;
let account = '';
let networkId;
//let fromAddress;
let provider = window.ethereum;
//let web3 = new Web3(provider);

export default function App() {
  const [data, setData] = useState(null);
  //const [account, setAccount] = useState('');

  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');
  const [toAddress, setToAddress] = useState('');
  //const [fromAddress, setFromAddress] = useState('');
  const [amount, setAmount] = useState(0);

  //const [transfered, setTransfered] = useState(false);

  const ConnectWallet = async () => {
    // if metamask signed in and installed
    if (typeof provider != 'undefined') {
      // Request permission to access the user's MetaMask account
      provider
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts) => {
          //setAccount(accounts[0]);
          account = accounts[0];
          //setFromAddress(accounts[0]);
          //setToAddress(account);
          console.log(`connected to : ${account}`);

          web3.eth
            .getBalance(account)
            .then((balancee) => {
              console.log(balancee);
              //Get the balance of the account in wei
              const etherBalance = web3.utils.fromWei(balancee, 'ether');
              setBalance(etherBalance);
              console.log(etherBalance);
            })
            .catch((error) => console.log(error));

          //get network Name

          const networkIdToName = {
            1: 'Ethereum Mainnet',
            2: 'Morden (deprecated)',
            3: 'Ropsten',
            4: 'Rinkeby',
            5: 'Goerli',
            42: 'Kovan',
            5777: 'Ganache',
            56: 'Binance Smart Chain (BSC)',
            137: 'Polygon',
          };

          web3.eth.net
            .getId()
            .then((id) => setNetwork(networkIdToName[id] || 'Unknown'))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      window.ethereum.on('accountsChanged', function (account) {
        console.log(`you changed to Account: ${account}`);
      });
    }
  };
  const web3 = new Web3(provider);

  //const networkId = web3.eth.net.getId();

  //console.log(networkId);

  CamelTokenContract = new web3.eth.Contract(
    CamelTokenAbi.abi,
    CamelTokenAbi.networks[5777].address
  );
  console.log(CamelTokenContract);
  console.log(CamelTokenContract._address);
  console.log(CamelTokenAbi.contractName);

  async function handleSubmit(e) {
    //if(isinitialized) {
    // await TransferForm()
    // }
    e.preventDefault();
    try {
      const receipt = await CamelTokenContract.methods
        .transfer(toAddress, amount)
        .send();

      console.log(
        `Transferred ${amount} CAMEL tokens from ${account} to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Header />
      <div>
        <h2>Your Connected Account is :{account}</h2>
        <span>
          (Netwok : {network} : Balance:{balance})
        </span>
      </div>

      <br />
      <button onClick={ConnectWallet}>Connect Wallet</button>

      {/*<BuyTokenForm />*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="to"
          placeholder="Address"
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit">Buy Token</button>
      </form>
      {/*<TransferToken />*/}
      {/*<form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit">Buy Token</button>
</form>*/}
      <TokenInfo />
    </div>
  );
}
