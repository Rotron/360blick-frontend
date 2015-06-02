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

    .constant('SUPPORTED_INTERACTIONS', {
        'goToScene': {
            title: 'Go to Scene:',
            parameters: [
                'scene',
                'effectIn',
                'effectOut'
            ]
        },
        'goToObject': {
            title: 'Go to Object:',
            parameters: [
                'object'
            ]
        }
    })

    .constant('SUPPORTED_OBJECTS', {
        'primitive': [
            {
                title: '3D Primitives',
                items: [
                    {
                        name: 'Sphere',
                        objecttype: 'SphereGeometry'
                    },
                    {
                        name: 'Cube',
                        objecttype: 'BoxGeometry'
                    },
                    {
                        name: 'Plane',
                        objecttype: 'PlaneGeometry'
                    },
                    {
                        name: 'Cylinder',
                        objecttype: 'CylinderGeometry'
                    }
                ]
            }
//            {
//                title: '2d',
//                items: [
//                    {
//                        name: 'empty1',
//                        objecttype: 'empty1'
//                    },
//                    {
//                        name: 'empty1',
//                        objecttype: 'empty1'
//                    }
//                ]
//            }
        ],
        'media': [
            {
                title: 'Static',
                items: [
                    {
                        name: 'Text',
                        objecttype: 'TextGeometry'
                    }
                ]
            }
        ]
    });