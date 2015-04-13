'use strict';
var app = angular.module('360blickFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'angularFileUpload',
    'btford.modal',
    'templatesx',
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

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $stateProvider
        .state('app', {
            url: "/",
            views: {
                "app": {
                    templateUrl: "landingpage/index.html",
                    controller: "LandingpageController"
                }
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('gettingStarted', {
            url: "/getting-started",
            views: {
                "app": {
                    templateUrl: "gettingStarted/index.html",
                    controller: "GettingStartedController"
                }
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('documentation', {
            url: "/documentation",
            views: {
                "app": {
                    templateUrl: "documentation/index.html",
                    controller: "DocumentationController"
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
                    templateUrl: "auth/register.html",
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
                    templateUrl: "auth/login.html",
                    controller: "LoginController"
                }
            },
            data: {
                authorizedRoles: false
            }
        })
        .state('user.scenetemplates', {
            url: "/scenetemplates",
            views: {
                "app": {
                    templateUrl: "user/index.html",
                    controller: "UserController"
                },
                "userContent@user": {
                    templateUrl: "sceneTemplates/sceneTemplates.html",
                    controller: "SceneTemplatesController"
                },
                "subNavigation@user": {
                    templateUrl: "subNavigation/projects.html",
                    controller: "UserProjectsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('template', {
            url: "/:username/template/:templateId",
            views: {
                "app": {
                    templateUrl: "editor/editor.html",
                    controller: "EditorController"
                },
                "subNavigation@template": {
                    templateUrl: "subNavigation/editor.html",
                    controller: "EditorController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('user', {
            url: "/:username",
            views: {
                "app": {
                    templateUrl: "user/index.html",
                    controller: "UserController"
                },
                "userContent@user": {
                    templateUrl: "user/projects.html",
                    controller: "UserProjectsController"
                },
                "subNavigation@user": {
                    templateUrl: "subNavigation/projects.html",
                    controller: "UserProjectsController"
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
                    templateUrl: "user/settings.html",
                    controller: "UserSettingsController"
                },
                "subNavigation@user": {
                    templateUrl: "subNavigation/settings.html",
                    controller: "UserSettingsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.settings.account', {
            url: "/account",
            views: {
                "userContent@user": {
                    templateUrl: "user/accountSettings.html",
                    controller: "AccountSettingsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.project', {
            url: "/project/:projectId",
            views: {
                "userContent@user": {
                    templateUrl: "project/index.html",
                    controller: "ProjectController"
                },
                "projectContent@user.project": {
                    templateUrl: "project/scenes.html",
                    controller: "ProjectScenesController"
                },
                "subNavigation@user": {
                    templateUrl: "subNavigation/project.html",
                    controller: "ProjectController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.project.scenes', {
            url: "/scenes",
            views: {
                "projectContent@user.project": {
                    templateUrl: "project/scenes.html",
                    controller: "ProjectScenesController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.project.assets', {
            url: "/assets",
            views: {
                "projectContent@user.project": {
                    templateUrl: "project/assets.html",
                    controller: "ProjectAssetsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('user.project.settings', {
            url: "/settings",
            views: {
                "projectContent@user.project": {
                    templateUrl: "project/settings.html",
                    controller: "ProjectSettingsController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        })
        .state('editor', {
            url: "/:username/project/:projectId/scenes/:sceneId",
            views: {
                "app": {
                    templateUrl: "editor/editor.html",
                    controller: "EditorController"
                },
                "subNavigation@editor": {
                    templateUrl: "subNavigation/editor.html",
                    controller: "EditorController"
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");
}]);

app.run(['$rootScope', 'AuthService', 'EventService', 'SessionService', 'USER_ROLES', 'AUTH_EVENTS', 'ModalService',
    function ($rootScope, AuthService, EventService, SessionService, USER_ROLES, AUTH_EVENTS, ModalService) {

        $rootScope.editorControllerLoaded = false;

        AuthService.reloadLocalCredentials();

//        console.log(SessionService.getUser());

        $rootScope.currentUser = SessionService.getUser().nick;
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = AuthService.isAuthorized;
        $rootScope.isAdmin = SessionService.isAdmin;

        $rootScope.sidebarMenu = { isActive: true };
        // debugging
        $rootScope.console = console;

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
