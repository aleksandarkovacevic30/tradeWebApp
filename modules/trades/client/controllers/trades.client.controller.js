'use strict';

// trades controller
angular.module('trades').controller('tradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trades',
  function ($scope, $stateParams, $location, Authentication, Trades) {
    $scope.authentication = Authentication;

    // Create new trade
    $scope.create = function () {
      // Create new trade object
      var trade = new Trades({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      trade.$save(function (response) {
        $location.path('trades/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing trade
    $scope.remove = function (trade) {
      if (trade) {
        trade.$remove();

        for (var i in $scope.trades) {
          if ($scope.trades[i] === trade) {
            $scope.trades.splice(i, 1);
          }
        }
      } else {
        $scope.trade.$remove(function () {
          $location.path('trades');
        });
      }
    };

    // Update existing trade
    $scope.update = function () {
      var trade = $scope.trade;

      trade.$update(function () {
        $location.path('trades/' + trade._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of trades
    $scope.find = function () {
      $scope.trades = Trades.query();
    };

    // Find existing trade
    $scope.findOne = function () {
      $scope.trade = Trades.get({
        tradeId: $stateParams.tradeId
      });
    };
  }
]);
