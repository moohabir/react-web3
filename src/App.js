import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import CamelTokenAbi from 'contracts/CamelToken.json';
import IUSDT from 'contracts/IUSDT.json';
import { ConnectAccount } from './ConnectAccount';
import TokenInfo from './components/TokenInfo';
import Header from './Header/Header';
import TransferForm from './components/TransferForm';

//const promise = TransferForm();
//import { BuyTokenForm, transferTokens } from './components/BuyTokenForm';

console.log(CamelTokenAbi);
//console.log(IusdtAbi);
//console.log(CamelTokenAbi.abi);
//
let CamelTokenContract;
let IusdtContract;
let networkId;
//let fromAddress;
let account;

export default function App() {
  let provider = window.ethereum;
  const [data, setData] = useState(null);
  //const [account, setAccount] = useState('');
  const web3 = new Web3(provider);

  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromAddress, setFromAddress] = useState('');
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
          setFromAddress(accounts[0]);
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
  //const web3 = new Web3(provider);

  //const networkId = web3.eth.net.getId();

  //console.log(networkId);

  CamelTokenContract = new web3.eth.Contract(
    CamelTokenAbi.abi,
    CamelTokenAbi.networks[5777].address
  );

  console.log(IUSDT);
  console.log(IUSDT.abi);
  console.log(IUSDT.address);
  const usdtInstance = new web3.eth.Contract(IUSDT.abi, IUSDT.address);
  console.log(usdtInstance);
  console.log(usdtInstance._address);

  console.log(CamelTokenContract);
  console.log(CamelTokenContract._address);
  console.log(CamelTokenAbi.contractName);

  // si fiican uma shaqanayso lkn buy function baan aad u rabaa si la iiga iibsan karo cameltoken from smart contract
  async function handleSubmit(e) {
    //if(isinitialized) {
    // await TransferForm()
    // }
    e.preventDefault();
    try {
      const receipt = await CamelTokenContract.methods
        .transfer(toAddress, amount)
        .send({
          //from: '0x8D33326452498a2eE53A5fFf72f5C68D603EB2ce',
          from: account,
          value: amount * 1000000000000000000,
          gas: 200000,
        });

      console.log(
        `Transferred ${amount} CAMEL tokens from address of (0x8D33326452498a2eE53A5fFf72f5C68D603EB2ce) to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  //wuu shaqeeyey waa balancega accountga ku jira sida kan la mint gareeyey maaha total supply
  async function GetContractBalance() {
    try {
      const balance = await CamelTokenContract.methods
        .balances('0x8D33326452498a2eE53A5fFf72f5C68D603EB2ce')
        .call();
      console.log(`the contract balance is ${balance} CamelTokens`);
    } catch (err) {
      console.log(err);
    }
  }

  //wuu shaqeeyey
  async function GetTotalSupply() {
    try {
      const supply = await CamelTokenContract.methods.totalSupply().call();
      console.log(`Total supply is ${supply}`);
    } catch (err) {
      console.log(err);
    }
  }

  // minting wuu shaqaynayay awal sidoo kale lkn total supply ayaa sii siyaadaya oo aan fixed ahayn totalSuppöy*=amount after mint in contract
  //laga saxo inay tahy bay u badan tahay
  async function MintTokens(toAddress, amount) {
    try {
      const receipt = await CamelTokenContract.methods
        .mint(toAddress, amount)
        .send({
          from: account,
          gas: 200000,
        });
      console.log(
        `Minted ${amount} CAMEL tokens to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
      );
    } catch (err) {
      console.log(err);
    }
  }
  //example usage
  //MintTokens(
  // '0x8D33326452498a2eE53A5fFf72f5C68D603EB2ce',
  // 1000000
  //).then((mentedTokens) => console.log(mentedTokens));

  useEffect(() => {
    GetContractBalance();
    GetTotalSupply();
  }, []);

  async function buy(amount) {
    try {
      //const accounts = await web3.eth.getAccounts();
      await CamelTokenContract.methods.buy().send({
        from: '0x2112De1735c4A245F03E6c5D5314a749d92cF59a',
        value: web3.utils.toWei(amount, 'ether'),
      });
      console.log('Successfully bought tokens');
    } catch (error) {
      console.error(error);
    }
    //const buyedTokens = await (0.1,400)
    //console.log(buyedTokens)
  }

  const handleBuy = async () => {
    await buy(amount);
  };

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

      {/*<transferToken form />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="to"
          placeholder="Address"
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit">Transfer Token</button>
  </form>*/}

      {/*<MintToken form />*/}
      <form onSubmit={MintTokens}>
        <input
          type="text"
          name="toAddress"
          placeholder="Address"
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit">Mint Token</button>
      </form>
      {/*<buy Token />*/}
      <form onSubmit={handleBuy}>
        <input
          type="text"
          placeholder="Amount"
          //value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit">Buy Token</button>
      </form>
      <TokenInfo />
    </div>
  );
}
