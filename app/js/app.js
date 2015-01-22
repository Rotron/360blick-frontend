'use strict';
var app = angular.module('360blickFrontendApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'angularModalService'
    ]);

  app.constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      registerSuccess: 'auth-register-success',
      registerFailed: 'auth-register-failed',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
  });

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $stateProvider
        .state('app', {
            url: "/",
            views: {
                "app": {
                    templateUrl: "views/main.html",
                    controller: "MainController"
                }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "app": {
                    templateUrl: "views/auth/register.html",
                    controller: "RegisterController"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "app": {
                    templateUrl: "views/auth/login.html",
                    controller: "LoginController"
                }
            }
        })
        .state('user', {
            url: "/:username",
            views: {
                "app": {
                    templateUrl: "views/user/user.html",
                    controller: "UserController"
                },
                "userContent@user": {
                    templateUrl: "views/user/gallery.html",
                    controller: "UserGalleryController"
                }
            }
        })
        .state('user.assets', {
            url: "/assets",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/assets.html",
                    controller: "UserAssetsController"
                }
            }
        })
        .state('user.settings', {
            url: "/settings",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/settings.html",
                    controller: "UserSettingsController"
                }
            }
        })
        .state('user.blick', {
            url: "/blick/:blickId",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/blick.html",
                    controller: "UserBlickController"
                }
            }
        });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/app");
  }]);

app.run(['$rootScope', 'AuthService', function($rootScope, AuthService){
    $rootScope.$on('$stateChangeStart', function (event, next) {
        AuthService.showLoginModal();
    });
}]);
