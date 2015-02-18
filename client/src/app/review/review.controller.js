angular.module('client.pv')

.controller('ReviewController',['$scope','PvDataService','$http',function ($scope,PvDataService,$http) {
  $scope.serverParams = {
    name: 'SOUSSE',
    circ: 20
  };
  $scope.circoptions = [{
    name: 'SOUSSE',
    circ: 20
  }, {
    name: 'TUNIS1',
    circ: 1
  }, {
    name: 'TUNIS2',
    circ: 2
  }, {
    name: 'BEN AROUS',
    circ: 3
  }, {
    name: 'ARIANA',
    circ: 4
  }, {
    name: 'MANOUBA',
    circ: 5
  }, {
    name: 'JENDOUBA',
    circ: 6
  }, {
    name: 'KEF',
    circ: 7
  }, {
    name: 'SILINANA',
    circ: 8
  }, {
    name: 'BIZERTE',
    circ: 9
  }, {
    name: 'BEJA',
    circ: 10
  }, {
    name: 'NABEUL1',
    circ: 11
  }, {
    name: 'NABEUL2',
    circ: 12
  }, {
    name: 'ZAGHOUANE',
    circ: 13
  }, {
    name: 'KAIROUAN',
    circ: 14
  }, {
    name: 'KASSERINE',
    circ: 15
  }, {
    name: 'SIDI BOUZID',
    circ: 16
  }, {
    name: 'GAFSA',
    circ: 17
  }, {
    name: 'TOZEUR',
    circ: 18
  }, {
    name: 'KEBELLI',
    circ: 19
  }, {
    name: 'MAHDIA',
    circ: 21
  }, {
    name: 'MONASTIR',
    circ: 22
  }, {
    name: 'SFAX1',
    circ: 23
  }, {
    name: 'SFAX2',
    circ: 24
  }, {
    name: 'GABES',
    circ: 25
  }, {
    name: 'MEDENINE',
    circ: 26
  }, {
    name: 'TATAOUINE',
    circ: 27
  }];


  $scope.getpvs = function() {
    console.log($scope.serverParams);
    $http.post('/suivi', $scope.serverParams)
    .success(function(data) {

      $scope.pvlist = data;
      $scope.missedNumber = $scope.pvlist.nopv.length;
      $scope.errorNumber = $scope.pvlist.twopv.length;
      $scope.oneNumber = $scope.pvlist.onepv.length;



    })
    .error(function(data) {
      $scope.errorMsg = data;
    });


  };
  $scope.savePv = function(pv) {
    pv.corrected = true;
    console.log(pv);


    $http.post('/updatepv', pv)
    .success(function(data) {
      alert('PV mis a jour ');
      //$("#" + pv.id).parents('.pv-row').remove();;
    
    })
    .error(function(data) {
      alert('############ ERREUR ############');
      console.log('error');
    });

  };

  $scope.getDetails = function(pv, index, parent) {
    console.log(index);
    console.log(parent);
    var par={};
    par.pv = pv;
    $http.post('/pvdetails' , par)
    .success(function(data) {
      console.log('fetched');
      $scope.pvlist.twopv[parent][index].lists = data.lists;
      $scope.pvlist.twopv[parent][index].lists.sort(function(a, b) {
        if (a.candidateName < b.candidateName) {
        return -1;
        } else if (a.candidateName > b.candidateName) {
        return 1;
        }
        return 0;
        });
      $scope.pvlist.twopv[parent][index].listcount =  data.lists.length;

    })
    .error(function(data) {

    });



  };
}]);
