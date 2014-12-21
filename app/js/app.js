'use strict';

angular
  .module('360blickFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('app', {
            url: "/",
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
                },
                "userContent@user": {
                    templateUrl: "views/user/gallery.html",
                    controller: "UserGalleryCtrl"
                }
            }
        })
        .state('user.assets', {
            url: "/assets",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/assets.html",
                    controller: "UserAssetsCtrl"
                }
            }
        })
        .state('user.settings', {
            url: "/settings",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/settings.html",
                    controller: "UserSettingsCtrl"
                }
            }
        })
        .state('user.blick', {
            url: "/blick/:blickId",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/blick.html",
                    controller: "UserBlickCtrl"
                }
            }
        })

    ;

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/app");
  }]);
