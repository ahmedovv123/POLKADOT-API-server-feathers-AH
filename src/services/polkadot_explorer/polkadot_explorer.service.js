// Initializes the `polkadot_explorer` service on path `/polkadot-explorer`
const { PolkadotExplorer } = require('./polkadot_explorer.class');
const createModel = require('../../models/polkadot_explorer.model');
const hooks = require('./polkadot_explorer.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/polkadot-explorer', new PolkadotExplorer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('polkadot-explorer');

  service.hooks(hooks);
};
