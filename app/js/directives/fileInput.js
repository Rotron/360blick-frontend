app.directive('fileInput', ['$timeout', 'RequestService', function ($timeout, RequestService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/fileInput.html',
        replace: true,
        scope: {
            value: '=',
            label: '@',
            classSuffix: '@',
            uploadData: '='
        },
        link: function($scope, elem, attrs) {
            $scope.isFocused = false;

/*            $scope.onChange = function() {
            };

            $scope.onBlur = function() {
                $scope.isFocused = false;
            };

            $scope.setFocus = function() {
                elem[0].querySelector('input').focus();
                $scope.isFocused = true;
            };*/

            $scope.upload = function(files, event) {

                angular.forEach(files, function(file) {
                    var data = $scope.uploadData;
                    var fileReader = new FileReader();

                    fileReader.readAsBinaryString(file);
                    fileReader.onload = function(event) {
                        RequestService.upload('projects/assets/create', data, file, function(res) {
                                console.log(res);
                            }, function(error) {
                                console.log(error);
                            }, function(progressPercentage, event) {
                                console.log('Progress: ' + progressPercentage, event.config.file.name);
                            }
                        );
                    };
                });

            };
        }
    };
}]);