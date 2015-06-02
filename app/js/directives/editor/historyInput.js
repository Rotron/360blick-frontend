app.directive('historyInput',['HistoryService', '$timeout', function(HistoryService, $timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        replace: false,
        scope: {
            ngModel: '='
        },
        link: function(scope, element, attrs) {

            scope.writeToHistory = function() {

                //get editorObject of which the property was changed
                scope.$emit('getEditorObject', function(editorObject) {
                    scope.editorObject = editorObject
                });

                //cancel timeout to prevent duplicated writing to history
                $timeout.cancel( scope.timer );

                if(scope.oldValue != scope.ngModel || scope.oldValue == 'undefined') {
                    HistoryService.queue({
                        message: scope.editorObject.name + ' changed',
                        uuid: scope.editorObject.uuid,
                        data: scope.oldValue,
                        callback: function() {
                            scope.ngModel = this.data;
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

            /**
             * write to history after 2s when a value was changed
             */
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
