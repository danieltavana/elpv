'use strict';

angular.module('client.pv')

  .controller('PresController',['$scope','PresDataService',function ($scope,PresDataService) {
    $('html, body').animate({
            scrollTop: 0
        }, 800);
    $scope.pvTemplate={};
    $scope.pvStatus='INITILIAZED';

    $scope.getPv= function() {
      var promise =PresDataService.getPv($scope.pvTemplate);
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
      $scope.pvTemplate.election = 'Presidentielles';
      $scope.signatures.forEach(function(sig, index) {
        if (sig.list) {
          sig.name = sig.list.name;
          delete sig.list;
        }
      });
      $scope.pvTemplate.partySingatures = $scope.signatures;
      $scope.isSaving = true;
      console.log($scope.pvTemplate);
      var promise = PresDataService.savePv($scope.pvTemplate);
      promise.then(function(response){
        $scope.message='Saved successfully';
         $('html, body').animate({
            scrollTop: 0
        }, 800);
        $scope.pvTemplate={};
        $scope.pvStatus='INITILIAZED';
        $scope.isSaving = false;
      },function(error){
        $scope.message='error saving';
        $scope.isSaving = false;
        $('html, body').animate({
            scrollTop: 0
        }, 800);

      });

    };
    $scope.signatures = [{"name":"sebsi"},{"name":"marzouki"}];
    $scope.elections = [
      'Legislatives',
      'pres round1',
      'pres round2'
      ];


  }]);
