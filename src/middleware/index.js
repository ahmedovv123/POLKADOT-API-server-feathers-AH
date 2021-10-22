const apiConnection = require('../../nodeConnection');

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});

module.exports =  function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  
  ///////////////// TRANSACTIONS //////////////////////

  app.get('/api/transactions/count', async function (req, res) {
    const result  = await app.service('transactions').find({query: { $limit: 1} });
    res.send(result);
  })

  app.get('/api/transactions/block/:blockHash', async function (req, res) {
    const blockHash = req.params.blockHash;
    const result  = await app.service('transactions').find({query: { block_hash: blockHash} });
    res.send(result);
  })

  app.get('/api/transactions/hash/:transactionHash', async function (req, res) {
    const transactionHash = req.params.transactionHash;
    const result  = await app.service('transactions').find({query: { hash: transactionHash} });
    res.send(result);
  })

  app.get('/api/transactions/:x/:n', async function (req, res) {
    const x = req.params.x;
    const n = req.params.n;
    const result  = await app.service('transactions').find({query: {
      id: {
        $lt: n,
        $gte: n - x
      },
      $limit: x
    } });
    res.send(result);
  })

  ///////////////// ACCOUNTS //////////////////////

  app.get('/api/accounts/transactions/count/:accountId', async function (req, res) {
    const accountId = req.params.accountId
    const result  = await app.service('transactions').find({
      query: { 
        $or: [
          {sender: accountId},
          {recipient: accountId}
        ],
        $limit: 0
      }
    })
    res.send(result);
  })

  app.get('/api/accounts/transactions/:accountId', async function (req, res) {
    const accountId = req.params.accountId
    const result  = await app.service('transactions').find({
      query: { 
        $or: [
          {sender: accountId},
          {recipient: accountId}
        ],
        $limit: 50
      }
    })
    res.send(result);
  })

  app.get('/api/accounts/balance/:accountId', async function (req, res) {
    const accountId = req.params.accountId
    const result = await connectApi.then(api => api.query.system.account(accountId));
    res.send(result);
  })


  ///////////////// BLOCKS //////////////////////

  app.get('/api/blocks', async function (req, res) {
    const result = await connectApi.then(api => api.rpc.chain.getBlock())
    res.send(result);
  })

  app.get('/api/blocks/num/:blockNumber', async function (req, res) {
    const blockNumber = req.params.blockNumber;
    const result = await connectApi.then(api => api.rpc.chain.getBlockHash(blockNumber));
    res.send(result);
  })

  app.get('/api/blocks/hash/:blockHash', async function (req, res) {
    const blockHash = req.params.blockHash;
    const result = await connectApi.then(api => api.rpc.chain.getBlock(blockHash));
    res.send(result);
  })

  app.get('/api/blocks/:x/:n', async function (req, res) {
    const x = req.params.x;
    const n = req.params.n;

    const result = await connectApi.then( async api => {
        let i = 1;
        let blocks = [];
        
        while (i <= x)  {
            let tempBlock = await api.rpc.chain.getBlockHash(n-i);
            blocks.push(tempBlock);
            i++;
        }

        return blocks;
    })
    
    res.send(result);
  })



  
}
