'use strict';

//ownedresources service used for communicating with the ownedresources REST endpoints
angular.module('ownedresources').factory('ownedresources', ['$resource',
  function ($resource) {
    return $resource('api/ownedresources/:ownedresourceId', {
      ownedresourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
