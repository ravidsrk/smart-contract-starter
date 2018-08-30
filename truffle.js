require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const Wallet = require('ethereumjs-wallet')

const rinkebyPrivateKey = new Buffer(process.env['RINKEBY_PRIVATE_KEY'], 'hex')
const rinkebyWallet = Wallet.fromPrivateKey(rinkebyPrivateKey)
const rinkebyProvider = new HDWalletProvider(
  rinkebyWallet,
  'https://rinkeby.infura.io/'
)

const ropstenPrivateKey = new Buffer(process.env['ROPSTEN_PRIVATE_KEY'], 'hex')
const ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey)
const ropstenProvider = new HDWalletProvider(
  ropstenWallet,
  'https://ropsten.infura.io/'
)

module.exports = {
  migrations_directory: './migrations',
  networks: {
    test: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 6.5e6,
      gasPrice: 5e9,
      websockets: true
    },
    ropsten: {
      network_id: 3,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () => ropstenProvider
    },
    rinkeby: {
      network_id: 4,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () => rinkebyProvider
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  },
  mocha: {
    reporter: 'mocha-multi-reporters',
    useColors: true,
    enableTimeouts: false,
    reporterOptions: {
      configFile: './mocha-smart-contracts-config.json'
    }
  }
}
