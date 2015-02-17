'use strict';

angular.module('client', ['ngAnimate', 'ui.router', 'ui.bootstrap','client.pv'])
  .config(function ($stateProvider,$urlRouterProvider) {

    $stateProvider

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
                      access: 0
                  }
              });
    $urlRouterProvider.otherwise('/home');
  });
