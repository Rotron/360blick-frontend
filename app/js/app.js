'use strict';

angular
  .module('360blickFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

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
        .state('user', {
            url: "/:username",
            views: {
                "app": {
                    templateUrl: "views/user/user.html",
                    controller: "UserCtrl"
                }
            }
        })
        .state('user.view', {
            url: "/view",
            views: {
                "app@": {
                    templateUrl: "views/user/view.html",
                    controller: "UserViewCtrl"
                }
            }
        })
        .state('user.profile', {
            url: "/profile",
            views: {
                "app@": {
                    templateUrl: "views/user/profile.html",
                    controller: "UserProfileCtrl"
                }
            }
        })

    ;

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/app");
  }]);
