const app = require('../../src/app');

describe('\'polkadot_explorer\' service', () => {
  it('registered the service', () => {
    const service = app.service('polkadot-explorer');
    expect(service).toBeTruthy();
  });
});
