'use strict';

//ownedresources service used for communicating with the ownedresources REST endpoints
angular.module('ownedresources').factory('Ownedresources', ['$resource',
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
angular.module('ownedresources').factory('Resources', ['$resource',
  function ($resource) {
    return $resource('api/resources/:resourceId', {
      ownedresourceId: '@_id'
    }/*, {
      update: {
        method: 'PUT'
      }
    }*/);
  }
]);
