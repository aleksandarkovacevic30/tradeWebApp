'use strict';

/**
 * Module dependencies.
 */
var ownedresourcesPolicy = require('../policies/ownedresources.server.policy'),
  ownedresources = require('../controllers/ownedresources.server.controller');

module.exports = function (app) {
  // Ownedresources collection routes
  app.route('/api/ownedresources').all(ownedresourcesPolicy.isAllowed)
    .get(ownedresources.list)
    .post(ownedresources.create);

  // Single ownedresource routes
  app.route('/api/ownedresources/:ownedresourceId').all(ownedresourcesPolicy.isAllowed)
    .get(ownedresources.read)
    .put(ownedresources.update)
    .delete(ownedresources.delete);

  // Finish by binding the ownedresource middleware
  app.param('ownedresourceId', ownedresources.ownedresourceByID);
};
