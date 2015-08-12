'use strict';

// Setting up route
angular.module('resources').config(['$stateProvider',
  function ($stateProvider) {
    // Resources state routing
    $stateProvider
      .state('resources', {
        abstract: true,
        url: '/resources',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('resources.list', {
        url: '',
        templateUrl: 'modules/resources/views/list-resources.client.view.html'
      })
      .state('resources.create', {
        url: '/create',
        templateUrl: 'modules/resources/views/create-resource.client.view.html'
      })
      .state('resources.view', {
        url: '/:resourceId',
        templateUrl: 'modules/resources/views/view-resource.client.view.html'
      })
      .state('resources.edit', {
        url: '/:resourceId/edit',
        templateUrl: 'modules/resources/views/edit-resource.client.view.html'
      });
  }
]);
