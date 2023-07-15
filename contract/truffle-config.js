const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic =
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777',
    },
    //truffle migrate --network ganache for to deploy to the ethereum ganache local test
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777',
    },
    //truffle migrate --network rinkeby for to deploy to the ethereum rinkeby testnet
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://rinkeby.infura.io/v3/05cf6524087d4ee185185808c234a891'
        ),
      network_id: 4,
      gas: 5500000,
    },

    goerli: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://gocerli.infura.io/v3/05cf6524087d4ee185185808c234a891'
        ),
      //network_id: 4, change and find the 
      gas: 5500000,
    },
    //truffle migrate --network mainnet for to deploy to the ethereum mainnnet not test

    mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://mainnet.infura.io/v3/05cf6524087d4ee185185808c234a891'
        ),
      network_id: 1,
      gas: 7500000,
      gasPrice: 1000000000,
    },
  },
  compilers: {
    solc: {
      version: '0.8.9',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 20,
    },
  },
};
