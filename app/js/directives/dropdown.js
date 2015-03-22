app.directive('dropdown',['$document', function($document) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
            $document.bind('click', function(event){
//                var targetInElement = element.find(event.target)[0];
//                console.log(targetInElement);
//                scope.active = false;
            });
        },
        templateUrl: function(elem,attrs) {
            return 'partials/dropdown/' + attrs.templateName + '.html';
        }
    }
}]);