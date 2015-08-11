'use strict';

(function () {
  // Ownedresources Controller Spec
  describe('Ownedresources Controller Tests', function () {
    // Initialize global variables
    var OwnedresourcesController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Ownedresources,
      mockOwnedresource;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Ownedresources_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Ownedresources = _Ownedresources_;

      // create mock ownedresource
      mockOwnedresource = new Ownedresources({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Ownedresource about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ownedresources controller.
      OwnedresourcesController = $controller('OwnedresourcesController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one ownedresource object fetched from XHR', inject(function (Ownedresources) {
      // Create a sample ownedresources array that includes the new ownedresource
      var sampleOwnedresources = [mockOwnedresource];

      // Set GET response
      $httpBackend.expectGET('api/ownedresources').respond(sampleOwnedresources);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.ownedresources).toEqualData(sampleOwnedresources);
    }));

    it('$scope.findOne() should create an array with one ownedresource object fetched from XHR using a ownedresourceId URL parameter', inject(function (Ownedresources) {
      // Set the URL parameter
      $stateParams.ownedresourceId = mockOwnedresource._id;

      // Set GET response
      $httpBackend.expectGET(/api\/ownedresources\/([0-9a-fA-F]{24})$/).respond(mockOwnedresource);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.ownedresource).toEqualData(mockOwnedresource);
    }));

    describe('$scope.craete()', function () {
      var sampleOwnedresourcePostData;

      beforeEach(function () {
        // Create a sample ownedresource object
        sampleOwnedresourcePostData = new Ownedresources({
          title: 'An Ownedresource about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Ownedresource about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Ownedresources) {
        // Set POST response
        $httpBackend.expectPOST('api/ownedresources', sampleOwnedresourcePostData).respond(mockOwnedresource);

        // Run controller functionality
        scope.create();
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the ownedresource was created
        expect($location.path.calls.mostRecent().args[0]).toBe('ownedresources/' + mockOwnedresource._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/ownedresources', sampleOwnedresourcePostData).respond(400, {
          message: errorMessage
        });

        scope.create();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock ownedresource in scope
        scope.ownedresource = mockOwnedresource;
      });

      it('should update a valid ownedresource', inject(function (Ownedresources) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/ownedresources\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update();
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/ownedresources/' + mockOwnedresource._id);
      }));

      it('should set scope.error to error response message', inject(function (Ownedresources) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/ownedresources\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(ownedresource)', function () {
      beforeEach(function () {
        // Create new ownedresources array and include the ownedresource
        scope.ownedresources = [mockOwnedresource, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/ownedresources\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockOwnedresource);
      });

      it('should send a DELETE request with a valid ownedresourceId and remove the ownedresource from the scope', inject(function (Ownedresources) {
        expect(scope.ownedresources.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.ownedresource = mockOwnedresource;

        $httpBackend.expectDELETE(/api\/ownedresources\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to ownedresources', function () {
        expect($location.path).toHaveBeenCalledWith('ownedresources');
      });
    });
  });
}());
