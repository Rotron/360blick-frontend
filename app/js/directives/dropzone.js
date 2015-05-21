app.directive('dropzone',['AssetStoreService', function(AssetStoreService) {
    return {
        restrict: 'E',
        scope: {
            uploadData: '='
        },
        link: function(scope, element) {
            element.addClass('dropzone');
            AssetStoreService.create(scope, element);
        }
    }
}]);