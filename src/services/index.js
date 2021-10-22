const transactions = require('./transactions/transactions.service.js')
const polkadotExplorer = require('./polkadot_explorer/polkadot_explorer.service.js')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(transactions)
  app.configure(polkadotExplorer)
}
