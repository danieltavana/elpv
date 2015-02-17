'use strict';
angular.module('client.auth')
.controller('SignupController', [
  '$scope',
  '$state',
  'Auth',
  '$http',
  function($scope, $state, Auth, $http) {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    if (Auth.isAuthenticated()) {
      $state.go('newpv');
    }

    $scope.credentials = {
      identifier: '',
      password: ''
    };

    $scope.signup = function() {
      if ($('.form-register').valid()) {
        Auth.signup($scope.credentials);
      }
    };
  }])
  .controller('LoginController', [
    '$scope',
    '$state',
    'Auth',
    '$http',
    function($scope, $state, Auth, $http) {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      if (Auth.isAuthenticated()) {
        $state.go('newpv');
      }

      $scope.credentials = {
        identifier: '',
        password: ''
      };
      $scope.login = function() {
        if ($('.form-login').valid()) {
          Auth.login($scope.credentials);
        }
      };
    }])
