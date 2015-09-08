'use strict';

// ownedresources controller
angular.module('ownedresources').controller('ownedresourcesController', ['$scope', '$filter', '$stateParams', '$location', 'Authentication', 'Ownedresources','Resources',
  function ($scope, $filter, $stateParams, $location, Authentication, Ownedresources, Resources) {
    $scope.authentication = Authentication;
    
    Ownedresources.query(function (data) {
      $scope.ownedresources = data;
      $scope.buildPager();
    });

    // Create new ownedresource
    $scope.create = function () {
      // Create new ownedresource object
      
      var ownedresource = new Ownedresources({
        resource: this.resource,
        count: this.count
      });

      // Redirect after save
      ownedresource.$save(function (response) {
        $location.path('ownedresources/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.count = 0;
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing ownedresource
    $scope.remove = function (ownedresource) {
      if (ownedresource) {
        ownedresource.$remove();

        for (var i in $scope.ownedresources) {
          if ($scope.ownedresources[i] === ownedresource) {
            $scope.ownedresources.splice(i, 1);
          }
        }
      } else {
        $scope.ownedresource.$remove(function () {
          $location.path('ownedresources');
        });
      }
    };

    // Update existing ownedresource
    $scope.update = function () {
      var ownedresource = $scope.ownedresource;

      ownedresource.$update(function () {
        $location.path('ownedresources/' + ownedresource._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of ownedresources
    $scope.find = function () {
      $scope.ownedresources = Ownedresources.query();
    };

    // Find a list of ownedresources
    $scope.findOwnedresources = function () {
      $scope.ownedresources = Ownedresources.query();
      console.log('test ownedResources here:'+$scope.ownedresources);
      $scope.buildPager();
    };
    
    // Find a list of ownedresources
    $scope.findResources = function () {
      $scope.resourcelist = Resources.query();
    };

    // Find existing ownedresource
    $scope.findOne = function () {
      $scope.ownedresource = Ownedresources.get({
        ownedresourceId: $stateParams.ownedresourceId
      });
    };
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      console.log('check owned:'+$scope.ownedresources);
      $scope.filteredItems = $filter('filter')($scope.ownedresources, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

  }
]);
