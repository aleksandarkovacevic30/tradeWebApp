'use strict';

// Setting up route
angular.module('ownedresources').config(['$stateProvider',
  function ($stateProvider) {
    // ownedresources state routing
    $stateProvider
      .state('ownedresources', {
        abstract: true,
        url: '/ownedresources',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('ownedresources.list', {
        url: '',
        templateUrl: 'modules/ownedresources/views/list-ownedresources.client.view.html'
      })
      .state('ownedresources.listRes', {
        url: '/all',
        templateUrl: 'modules/ownedresources/views/list-resources.client.view.html'
      })
      .state('ownedresources.create', {
        url: '/create',
        templateUrl: 'modules/ownedresources/views/create-ownedresource.client.view.html'
      })
      .state('ownedresources.view', {
        url: '/:ownedresourceId',
        templateUrl: 'modules/ownedresources/views/view-ownedresource.client.view.html'
      })
      .state('ownedresources.edit', {
        url: '/:ownedresourceId/edit',
        templateUrl: 'modules/ownedresources/views/edit-ownedresource.client.view.html'
      });
  }
]);
