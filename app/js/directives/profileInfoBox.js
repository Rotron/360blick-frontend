app.directive('profileInfoBox', ['SessionService', 'ENV_CONFIG', 'AuthService', '$state', '$rootScope', function (SessionService, ENV_CONFIG, AuthService, $state, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'partials/profileInfoBox.html',
        replace: true,
        link: function(scope, elem, attrs) {
            scope.user = {
                email: SessionService.email,
                nick: SessionService.nick,
                profile_image: ENV_CONFIG.assets + SessionService.profileImage
            };

            $rootScope.$on('updatedUserImage', function(event, data) {
                scope.user.profile_image = ENV_CONFIG.assets + data.profile_image;
            });

            scope.goUserState = function() {
                $state.go('user', {username: SessionService.nick});
            };
            scope.goSettingsState = function() {
                $state.go('user.settings', {username: SessionService.nick});
            };

            var dropdownActions = {
                'projects': scope.goUserState,
                'settings': scope.goSettingsState,
                'logout': AuthService.logout
            };

            scope.onDropdownSelect = function(id, item) {
                dropdownActions[id](item);
            };

            scope.options = {
                items: [
                    {
                        id: 'projects',
                        title: 'Projects',
                        icon: 'fa-folder-open'
                    }, {
                        id: 'settings',
                        title: 'Settings',
                        icon: 'fa-gear'
                    }, {
                        id: 'logout',
                        title: 'Logout',
                        icon: 'fa-sign-out'
                    }
                ]
            };
        }
    };
}]);