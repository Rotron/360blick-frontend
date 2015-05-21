'use strict';
angular.module('constants', [])

    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        logoutFailed: 'auth-logout-failed',
        registerSuccess: 'auth-register-success',
        registerFailed: 'auth-register-failed',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('SUPPORTED_OBJECTS', [
        {
            title: '3D Primitives',
            items: [
                'sphere',
                'cube',
                'plane',
                'cylinder'
            ]
        }, {
            title: '2D Primitives',
            items: [
                'empty',
                'empty'
            ]
        }, {
            title: 'Models',
            items: [
                'empty',
                'empty'
            ]
        }
    ]);