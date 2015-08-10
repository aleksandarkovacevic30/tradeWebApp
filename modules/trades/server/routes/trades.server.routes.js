'use strict';

/**
 * Module dependencies.
 */
var tradesPolicy = require('../policies/trades.server.policy'),
  trades = require('../controllers/trades.server.controller');

module.exports = function (app) {
  // Trades collection routes
  app.route('/api/trades').all(tradesPolicy.isAllowed)
    .get(trades.list)
    .post(trades.create);

  // Single trade routes
  app.route('/api/trades/:tradeId').all(tradesPolicy.isAllowed)
    .get(trades.read)
    .put(trades.update)
    .delete(trades.delete);

  // Finish by binding the trade middleware
  app.param('tradeId', trades.tradeByID);
};
