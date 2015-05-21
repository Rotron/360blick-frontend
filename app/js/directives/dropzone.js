app.directive('dropzone',['AssetStoreService', function(AssetStoreService) {
    return {
        restrict: 'E',
        scope: {
            uploadData: '='
        },
        link: function(scope, element) {
            element.addClass('dropzone');
            AssetStoreService.createData(scope, element);
        }
    }
}]);