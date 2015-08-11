'use strict';

// Setting up route
angular.module('resources').config(['$stateProvider',
  function ($stateProvider) {
    // Resources state routing
    $stateProvider
      .state('admin.resources', {
        abstract: true,
        url: '/resources',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.resources.list', {
        url: '',
        templateUrl: 'modules/resources/views/list-resources.client.view.html'
      })
      .state('admin.resources.create', {
        url: '/create',
        templateUrl: 'modules/resources/views/create-resource.client.view.html'
      })
      .state('admin.resources.view', {
        url: '/:resourceId',
        templateUrl: 'modules/resources/views/view-resource.client.view.html'
      })
      .state('admin.resources.edit', {
        url: '/:resourceId/edit',
        templateUrl: 'modules/resources/views/edit-resource.client.view.html'
      });
  }
]);
