'use strict';

angular.module('client', ['ngAnimate', 'ui.router', 'ui.bootstrap','client.pv','client.auth'])
.config(function ($stateProvider,$urlRouterProvider) {

  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'SignupController',
    data: {
      access: 0
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'LoginController',
    data: {
      access: 0
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl',
    data: {
      access: 0
    }
  })
  .state('newpv', {
    url: '/newpv',
    templateUrl: 'app/pv/newpv.html',
    controller: 'PvController',
    data: {
      access: 1
    }
  });
  $urlRouterProvider.otherwise('/home');
});
