'use strict';

// trades controller
angular.module('trades').controller('tradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trades','Ownedresource',
  function ($scope, $stateParams, $location, Authentication, Trades, Ownedresource) {
    $scope.authentication = Authentication;

    /**
 * List of ownedresources, move functionality to proper controller.
 */
/*exports.list = function (req, res) {
  Ownedresource.find().sort('-created').populate('user', 'username').populate('resource','name').exec(function (err, ownedresources) {
    if (err) {
      return res.status(400).send({
        message: 'error'
      });
    } else {
      res.json(ownedresources);
    }
  });
};*/
    
    
     $scope.create = function (Ownedresource,Authentication) {
      if (confirm('Are you sure you want to take this resource?')) {
        if (Ownedresource) {
          Ownedresource.$takeOne();
          Trades.$create(Ownedresource, Authentication.user);
        }/* else {
        }*/
      }
    };

    
    // Create new trade
/*    $scope.create = function () {
      console.log('teste test test: create invooked!');
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
*/
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
