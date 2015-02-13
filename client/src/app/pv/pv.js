'use strict';

angular.module('client.pv')

  .controller('PvController',['$scope','PvDataService',function ($scope,PvDataService) {

    $scope.getPv= function() {

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
