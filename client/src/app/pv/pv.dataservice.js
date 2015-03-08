'use strict';

angular.module('client.pv',[])
.factory('PvDataService',['$q','$http', function ($q, $http) {
  return{
    getPv :function(id){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pv/preparePv',id);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    },
    savePv : function(template){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pv/createPv',template);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    },
    loadPv: function(template){
      var deferred = $q.defer(),
          httpPromise = $http.post('api/v1/pv/loadPv',template);

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

          httpPromise = $http.post('api/v1/pv/updatePv',template);

      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    }

  }

}]);
