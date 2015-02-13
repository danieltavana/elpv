'use strict';

angular.module('client.pv',[])
.factory('PvDataService',['$q','$http', function ($q, $http) {
  return{
    getPv :function(id){
      var deferred = $q.defer(),
          httpPromise = $http.post('/api/v1/pv/preparePV',id);
      httpPromise.then(function(response) {
        deferred.resolve(response);
        }, function(error) {
           deferred.reject(error);
        });

      return deferred.promise;
    }

  }

}]);
