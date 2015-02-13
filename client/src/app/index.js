'use strict';

angular.module('client', ['ngAnimate', 'ngRoute', 'ui.bootstrap','client.pv'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/newpv', {
        templateUrl: 'app/pv/newpv.html',
        controller: 'PvController'
      })

      .otherwise({
        redirectTo: '/'
      });
  })
;
