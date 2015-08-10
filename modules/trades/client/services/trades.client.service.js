'use strict';

//trades service used for communicating with the trades REST endpoints
angular.module('trades').factory('trades', ['$resource',
  function ($resource) {
    return $resource('api/trades/:tradeId', {
      tradeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
