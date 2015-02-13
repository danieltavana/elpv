'use strict';

angular.module('client.pv')

  .controller('PvController',['$scope','PvDataService',function ($scope,PvDataService) {

    $scope.getPv= function() {
      var promise =PvDataService.getPv($scope.pvTemplate);
      promise.then(function(response) {
         //  do stuff with the template

      },
      function(error) {
        $scope.message= 'ERROR: ' + error.data;

      });

    };
    $scope.savePv = function() {
    };
    $scope.pvTemplate={};
    $scope.pvStatus='INITILIAZED';

    $scope.elections = [
      'Legislatives',
      'pres round1',
      'pres round2'
      ];


  }]);
