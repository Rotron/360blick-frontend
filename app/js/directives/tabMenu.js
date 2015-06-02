app.directive('tabMenu',[function(){
    return {
        restrict:'A',
        require: 'ngModel',
        scope: { modelValue: '=ngModel' },  // modelValue for $watch
        link:function(scope, element, attr, ngModel){

            // Links collection
            var links=element.find('[href]');

            // Add click listeners
            links.on('click',function(e){
                e.preventDefault();
                ngModel.$setViewValue( angular.element(this).attr('href') );
                scope.$apply();
            });

            // State handling (set active) on model change
            scope.$watch('modelValue',function(){
                for(var i=0,l=links.length;i<l;++i){
                    var link = angular.element(links[i]);
                    link.attr('href') === scope.modelValue ?
                        link.addClass('active') : link.removeClass('active')
                }
            })
        }
    }
}]);