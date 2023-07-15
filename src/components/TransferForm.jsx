import { useState } from 'react';
import CamelTokenAbi from 'contracts/CamelToken.json';
import Web3 from 'web3';
//let isinitialized
let account;
const TransferForm = async () => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');
  let CamelTokenContract;

  let provider = window.ethereum;

  const web3 = new Web3(provider);

  if (typeof provider != 'undefined') {
    // Request permission to access the user's MetaMask account
    provider
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        //setAccount(accounts[0]);
        account = accounts[0];
        //setToAddress(account);
        console.log(`connected to : ${account}`);

        web3.eth
          .getBalance(account)
          .then((balancee) => {
            console.log(balancee);
            //Get the balance of the account in wei
            const etherBalance = web3.utils.fromWei(balancee, 'ether');
            //const etherBalance = web3.utils.fromWei(balancee, 'ether'||"usdt");
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

    //const web3 = new Web3(provider);
  }

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

  async function handleSubmit(e) {
    //if(isinitialized) {
    // await TransferForm()
    // }
    e.preventDefault();
    try {
      const receipt = await CamelTokenContract.methods
        .transfer(toAddress, amount)
        .send({ from: account });

      console.log(
        `Transferred ${amount} CAMEL tokens to address ${toAddress}. Transaction hash: ${receipt.transactionHash}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="toAddress">Recipient Address:</label>
        <input
          type="text"
          id="toAddress"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;
