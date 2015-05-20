app.directive('historyInput',['HistoryService', '$timeout', function(HistoryService, $timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function(scope, element, attrs) {

            scope.writeToHistory = function() {
                $timeout.cancel( scope.timer );
                if(scope.oldValue != scope.ngModel) {
                    HistoryService.queue({
                        message: 'test',
                        old: scope.oldValue,
                        cb: function() {
                            scope.ngModel = this.old;
                        }
                    });
                    scope.oldValue = scope.ngModel;
                }
            };

            /**
             * save old value before input
             */
            element.bind('focus', function() {
                scope.oldValue = scope.ngModel;
            });

            element.bind('change', function() {
                $timeout.cancel( scope.timer );
                scope.timer = $timeout(scope.writeToHistory, 2000);
            });

            element.bind('blur', scope.writeToHistory);

            /**
             * destroy timer when element is removed
             */
            scope.$on('$destroy', function() {
                    $timeout.cancel( scope.timer );
                }
            );

        }
    }
}]);
