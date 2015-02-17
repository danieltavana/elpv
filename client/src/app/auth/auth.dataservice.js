'use strict';

angular.module('client.auth')
.factory('Auth',
[
  '$http', '$state', 'Storage',
  function($http, $state, Storage) {
    return {
      authorize: function(access) {
        var stUser=Storage.get('user');
        if (!stUser){
          if (access >0){
            event.preventDefault();
            $state.go('anon.login');
            return false;
          }
          else
          return true;
        }
        else{
          switch (access) {
            case 0 : return true;
            case 1 :  var user = JSON.parse(stUser);
            if(user.role=='staff')
            return true;
            else
            return false;
            default : return false;
          }

        }

      },
      isAuthenticated: function() {
        return Storage.get('auth_token');
      },
      login: function(credentials) {
        console.log('authlogin');
        return  $http
        .post('/api/v1/user/login', credentials)
        .success(function(response) {
          // due to the waterlock restriction we intercept the auth/login
          $http
          .post('/api/v1/auth/login', credentials)
          .success(function(response) {
            Storage.set('user', JSON.stringify(response));
            $http
            .post('/api/v1/user/jwt', credentials)
            .success(function(response) {
              Storage.set('auth_token', JSON.stringify(response));
              $state.go('user.newpv');
            });
          })
          .error(function(data, status, headers, config) {
            alert ("mot de passe incorrect ");
          });

        })
        .error(function(data, status, headers, config) {
          alert ("utilisateur inexistant ");
        })
        ;

      },
      signup: function(credentials) {
        console.log('signing up');
        return $http
        .post('/api/v1/user/signup', credentials)
        .success(function(response) {
          // due to the waterlock restriction we intercept the auth/login
          $http
          .post('/api/v1/auth/login', credentials)
          .success(function(response) {
            Storage.set('user', JSON.stringify(response));
            $http
            .post('/api/v1/user/jwt', credentials)
            .success(function(response) {
              Storage.set('auth_token', JSON.stringify(response));
              $state.go('user.newpv');
            });
          });
        })
        .error(function(data, status, headers, config) {
          alert ("utilisateur existant ");
        });
        return true;
      },

      logout: function() {
        Storage.unset('auth_token');
        Storage.unset('user');
        $state.go('anon.login');
      }
    };
  }
]
);
