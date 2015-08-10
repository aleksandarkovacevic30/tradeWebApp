'use strict';

//Resources service used for communicating with the resources REST endpoints
angular.module('resources').factory('Resources', ['$resource',
  function ($resource) {
    return $resource('api/resources/:resourceId', {
      resourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
