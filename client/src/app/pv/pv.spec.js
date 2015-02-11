'use strict';

describe('client.pv module ', function() {

  // injecting the pv module
  beforeEach(module('client.pv'));

  describe ('client.pv controller', function() {
    var $controller,
        pvDataService,
        scope,
        $httpBackend,
        pvRequestHandler;

    beforeEach(inject(function(_$controller_,_pvDataService_,$rootScope) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      pvDataService=_pvDataService_;
      scope= $rootScope.$new();
    }));

    describe('controller functions ', function() {

      it('controller should be defined', function() {
        var controller = $controller('pvController',{$scope:scope});
        expect(controller).toBeDefined();

      });
      it('scope functions should be  defined', function() {
        var controller = $controller('pvController',{$scope:scope});
        expect(scope.getPv).toBeDefined();
        expect(scope.savePv).toBeDefined();
        expect(scope.pvTemplate).toBeDefined();

      });
      it('should initialize pv status and update it whenever a function is called', function() {
        var controller = $controller('pvController',{$scope:scope});
        expect(scope.pvStatus).toEqual('INITILIAZED');
        spyOn(pvDataService, 'getPv').and.returnValue(null);
        scope.getPv();
        expect(pvDataService.getPv).toHaveBeenCalled();
        expect(scope.pvStatus).toEqual('NOTFOUND')

      })
    });

    describe('dataservice mocks', function() {

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        pvRequestHandler = $httpBackend.when('POST', '/api/v1/preparePV',{circ:1,deleg:1,subDeleg:1,center:1,station:1})
                              .respond({id: '12345'});
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should fetch pv', function() {
        $httpBackend.expectPOST('/api/v1/preparePV',{circ:1,deleg:1,subDeleg:1,center:1,station:1});
        pvDataService.getPv(1,2,3,4,5);
        $httpBackend.flush();
      });

      it('should fail to get a pv that doesnt exist', function() {

        var controller = $controller('pvController',{$scope:scope});
        // Notice how you can change the response even after it was set
        pvRequestHandler.respond(400, '');
        $httpBackend.expectPOST('/api/v1/preparePV',{circ:1,deleg:1,subDeleg:1,center:1,station:1});
        pvDataService.getPv(1,2,3,4,5);
        $httpBackend.flush();
        expect(scope.pvStatus).toEqual('NOTFOUND');
      });



    });


  });



});
