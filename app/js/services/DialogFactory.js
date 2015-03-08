/*
 * @license
 * angular-modal v0.4.0
 * (c) 2013 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';

angular.module('btford.modal', []).
    factory('btfModal', function ($animate, $compile, $rootScope, $controller, $q, $http, $templateCache) {
        return function modalFactory (config) {
            if (!(!config.template ^ !config.templateUrl)) {
                throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
            }

            var template      = config.template,
                controller    = config.controller || angular.noop,
                controllerAs  = config.controllerAs,
                container     = angular.element(config.container || document.body),
                element       = null,
                dialogCounter = 0,
                html,
                scope;

            if (config.template) {
                var deferred = $q.defer();
                deferred.resolve(config.template);
                html = deferred.promise;
            } else {
                var deferred = $q.defer();
                deferred.resolve($templateCache.get(config.templateUrl));
                html = deferred.promise;
            }

            function activate (locals) {
                return html.then(function (html) {
                    if (!element) {
                        attach(html, locals);
                    }
                });
            }

            function setDialogCounter(value) {
                dialogCounter = value;

                if(dialogCounter > 0) {
                    angular.element(document.querySelectorAll('body, html')).addClass('is-fixed');
                } else {
                    angular.element(document.querySelectorAll('body, html')).removeClass('is-fixed');
                }
            }

            function attach (html, locals) {
                element = angular.element(html);
                if (element.length === 0) {
                    throw new Error('The template contains no elements; you need to wrap text nodes')
                }
                $animate.enter(element, container);
                scope = $rootScope.$new();
                scope.closeIt = deactivate;
                if (locals) {
                    for (var prop in locals) {
                        scope[prop] = locals[prop];
                    }
                }
                var ctrl = $controller(controller, { $scope: scope });
                if (controllerAs) {
                    scope[controllerAs] = ctrl;
                }
                $compile(element)(scope);

                setDialogCounter(++dialogCounter);
            }

            function deactivate () {
                setDialogCounter(--dialogCounter);

                var deferred = $q.defer();
                if (element) {
                    $animate.leave(element, function () {
                        scope.$destroy();
                        element = null;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }

            function active () {
                return !!element;
            }

            return {
                activate: activate,
                deactivate: deactivate,
                active: active
            };
        };
    });
