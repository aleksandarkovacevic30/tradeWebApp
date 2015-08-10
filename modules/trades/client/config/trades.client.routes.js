'use strict';

// Setting up route
angular.module('trades').config(['$stateProvider',
  function ($stateProvider) {
    // trades state routing
    $stateProvider
      .state('trades', {
        abstract: true,
        url: '/trades',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('trades.list', {
        url: '',
        templateUrl: 'modules/trades/views/list-trades.client.view.html'
      })
      .state('trades.create', {
        url: '/create',
        templateUrl: 'modules/trades/views/create-trade.client.view.html'
      })
      .state('trades.view', {
        url: '/:tradeId',
        templateUrl: 'modules/trades/views/view-trade.client.view.html'
      })
      .state('trades.edit', {
        url: '/:tradeId/edit',
        templateUrl: 'modules/trades/views/edit-trade.client.view.html'
      });
  }
]);
