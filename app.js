'use strict';

angular
  .module('360blickFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: "/app",
            views: {
                "app": {
                    templateUrl: "views/main.html",
                    controller: "MainCtrl"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "app": {
                    templateUrl: "views/login.html",
                    controller: "LoginCtrl"
                }
            }
        })
//        .state('user', {
//            url: "/user"
//        })
        .state('user', {
            url: "/user/:username",
            views: {
                "app": {
                    templateUrl: "views/user.html",
                    controller: "UserCtrl"
                }
            }
        })

    ;

    $urlRouterProvider.otherwise("/app");
  }]);
