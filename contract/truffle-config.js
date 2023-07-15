const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.REACT_APP_MEMONIC;

module.exports = {
  networks: {
    development: {
      host: process.env.REACT_APP_HOST,
      port: process.env.REACT_APP_PORT,
      network_id: process.env.REACT_APP_NETWORK_ID,
    },
    //truffle migrate --network ganache for to deploy to the ethereum ganache local test
    ganache: {
      host: process.env.REACT_APP_HOST,
      port: process.env.REACT_APP_PORT,
      network_id: process.env.REACT_APP_NETWORK_ID,
    },
    //truffle migrate --network rinkeby for to deploy to the ethereum rinkeby testnet
    rinkeby: {
      provider: () =>
        new HDWalletProvider(mnemonic, process.env.REACT_APP_RINKEBY),
      network_id: 4,
      gas: 5500000,
    },

    goerli: {
      provider: () =>
        new HDWalletProvider(mnemonic, process.env.REACT_APP_GOERLI),
      //network_id: 4, change and find the
      gas: 5500000,
    },
    //truffle migrate --network mainnet for to deploy to the ethereum mainnnet not test

    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, process.env.REACT_APP_MAINET),
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
