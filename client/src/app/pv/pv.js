'use strict';

angular.module('client.pv')

  .controller('PvController',['$scope','PvDataService',function ($scope,PvDataService) {

    $scope.pvTemplate={};
    $scope.pvStatus='INITILIAZED';

    $scope.getPv= function() {
      var promise =PvDataService.getPv($scope.pvTemplate);
      promise.then(function(response) {
         //  do stuff with the template
      //console.log(response.data);
      $scope.pvStatus='FOUND';
      $scope.message='';
      $scope.pvTemplate = response.data;
      console.log($scope.pvTemplate);
      },
      function(error) {
        $scope.message= 'ERROR: ' + error.data;
        $scope.pvStatus='NOTFOUND';
      });

    };
    $scope.savePv = function() {
    };

    $scope.elections = [
      'Legislatives',
      'pres round1',
      'pres round2'
      ];


  }]);
