// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const transactions = sequelizeClient.define('transactions', {
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSigned: {
      type: DataTypes.BOOLEAN,
      field: 'issigned'
    },
    recipient: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.STRING
    },
    method: {
      type: DataTypes.STRING
    },
    nonce: {
      type: DataTypes.STRING
    },
    signature: {
      type: DataTypes.STRING
    },
    sender: {
      type: DataTypes.STRING
    },
    block_hash: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  transactions.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return transactions;
};
