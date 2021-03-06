'use strict';

angular.module('client.pv')

  .controller('PvController',['$scope','PvDataService',function ($scope,PvDataService) {
    $('html, body').animate({
            scrollTop: 0
        }, 800);
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
    $scope.isSaving = false;
    $scope.savePv = function() {
      $scope.pvTemplate.election = 'Legislatives';
      $scope.signatures.forEach(function(sig, index) {
        if (sig.list) {
          sig.name = sig.list.name;
          delete sig.list;
        }
      });
      $scope.pvTemplate.partySingatures = $scope.signatures;
      $scope.isSaving = true;
      console.log($scope.pvTemplate);
      var promise = PvDataService.savePv($scope.pvTemplate);
      promise.then(function(response){
        $scope.message='Saved successfully';
         $('html, body').animate({
            scrollTop: 0
        }, 800);

      },function(error){
        $scope.message='error saving';
        $scope.isSaving = false;
        $('html, body').animate({
            scrollTop: 0
        }, 800);

      });

    };
    $scope.loadPv = function(){
      console.log('loading');
      var promise = PvDataService.loadPv($scope.pvTemplate);
      promise.then (function(response){
        $scope.pvStatus='FOUND';
        $scope.message='';

        $scope.pvTemplate = response.data;


        $scope.pvTemplate.circ=response.data.circonscriptionId;
        $scope.pvTemplate.deleg=response.data.delegationId;
        $scope.pvTemplate.subDeleg=response.data.subDelegationId;
        $scope.pvTemplate.center=response.data.centerID;
        $scope.pvTemplate.station=response.data.stationId;
        delete $scope.pvTemplate.circonscriptionId;
        delete $scope.pvTemplate.delegationId;
        delete $scope.pvTemplate.subDelegationId;
        delete $scope.pvTemplate.centerID;
        delete $scope.pvTemplate.stationId;
        console.log($scope.pvTemplate);
        },
      function(error) {
          $scope.message= 'ERROR: ' + error.data;
          $scope.pvStatus='NOTFOUND';
      });
    };
    $scope.updatePv = function(id){
      var promise = PvDataService.updatePv($scope.pvTemplate);
      promise.then (function(response){
        $scope.pvStatus='FOUND';
        $scope.message='';
        $scope.pvTemplate = response.data;
        $scope.pvTemplate.circ=response.data.circonscriptionId;
        $scope.pvTemplate.deleg=response.data.delegationId;
        $scope.pvTemplate.subDeleg=response.data.subDelegationId;
        $scope.pvTemplate.center=response.data.centerID;
        $scope.pvTemplate.station=response.data.stationId;

        $('html, body').animate({
                scrollTop: 0
            }, 800);
        $scope.pvTemplate={};
        $scope.message= 'Updated ';
        $scope.pvStatus='NOTFOUND';

        },
      function(error) {
        $('html, body').animate({
                scrollTop: 0
            }, 800);
        $scope.pvTemplate={};
          $scope.message= 'ERROR: ' + error.data;
          $scope.pvStatus='NOTFOUND';
       });

    };
    $scope.signatures = [];
    $scope.elections = [
      'Legislatives',
      'pres round1',
      'pres round2'
      ];


  }]);
