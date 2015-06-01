app.directive('interaction',[function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/editor/interaction.html',
        scope: {
            item: "="
        },
        link: function(scope) {

        }
    };
}]);