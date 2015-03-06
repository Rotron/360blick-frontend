'use strict';
var app = angular.module('360blickFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'btford.modal',
    'templates',
    'mdo-angular-cryptography'
]);

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    logoutFailed: 'auth-logout-failed',
    registerSuccess: 'auth-register-success',
    registerFailed: 'auth-register-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'USER_ROLES',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, USER_ROLES) {

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
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "app": {
                    templateUrl: "views/auth/register.html",
                    controller: "RegisterController"
                }
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "app": {
                    templateUrl: "views/auth/login.html",
                    controller: "LoginController"
                }
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('editor', {
            url: "/editor",
            views: {
                "app": {
                    templateUrl: "views/editor/editor.html",
                    controller: "EditorController"
                }
            }
        })
        .state('user', {
            url: "/:username",
            views: {
                "app": {
                    templateUrl: "views/user/index.html",
                    controller: "UserController"
                },
                "userContent@user": {
                    templateUrl: "views/user/gallery.html",
                    controller: "UserGalleryController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.assets', {
            url: "/assets",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/assets.html",
                    controller: "UserAssetsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.settings', {
            url: "/settings",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/settings.html",
                    controller: "UserSettingsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.blick', {
            url: "/blick/:blickId",
            views: {
                "userContent@user": {
                    templateUrl: "views/user/blick.html",
                    controller: "UserBlickController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");
}]);

app.run(['$rootScope', 'AuthService', 'EventService', 'USER_ROLES', 'AUTH_EVENTS',
    function ($rootScope, AuthService, EventService, USER_ROLES, AUTH_EVENTS) {

        $rootScope.currentUser = null;
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = AuthService.isAuthorized;

        $rootScope.setCurrentUser = function (user) {
            $rootScope.currentUser = user;
        };

        AuthService.reloadLocalCredentials();

        $rootScope.$on('$stateChangeStart', function (event, next, nextParams) {

            var authorizedRoles = next.data.authorizedRoles;

            if (authorizedRoles === false) {
                return;
            }

            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {next: next, params: nextParams});
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, {next: next, params: nextParams});
                }
            }
         });
}]);
