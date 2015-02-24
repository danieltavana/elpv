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
    }

  }

}]);
