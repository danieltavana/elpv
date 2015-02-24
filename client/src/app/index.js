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
    controller: 'MainCtroller',
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
  })
  .state('pres', {
    url: '/presidentielles',
    templateUrl: 'app/pres/newpres.html',
    controller: 'PresController',
    data: {
      access: 1
    }
  })
  .state('review', {
    url: '/review',
    templateUrl: 'app/review/review.html',
    controller: 'ReviewController',
    data: {
      access: 0
    }
  });
  $urlRouterProvider.otherwise('/home');
});
