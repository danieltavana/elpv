'use strict';

angular.module('client.pv')
.factory('PresDataService',['$q','$http', function ($q, $http) {
  return{
    getPv :function(id){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pres/preparePv',id);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    },
    savePv : function(template){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pres/createPv',template);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    },
    loadPv: function(template){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pres/loadPv',template);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    },
    updatePv: function(template){
      delete template.circ;
      delete template.deleg;
      delete template.subDeleg;
      delete template.center;
      delete template.station;



      var deferred = $q.defer(),

          httpPromise = $http.post('api/v1/pres/updatePv',template);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    }

  }

}]);
