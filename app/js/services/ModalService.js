app.service('ModalService',['$rootScope', 'btfModal', function($rootScope, btfModal) {

    var modals = {
        'login': btfModal({
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/login.html'
        }),
        'help': btfModal({
            controller: 'HelpController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/help.html'
        }),
        'feedback': btfModal({
            controller: 'FeedbackController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/feedback.html'
        }),
        'newProject': btfModal({
            controller: 'NewProjectController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/newProject.html'
        }),
        'newScene': btfModal({
            controller: 'NewSceneController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/newScene.html'
        }),
        'newSceneTemplate': btfModal({
            controller: 'NewSceneTemplateController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/newSceneTemplate.html'
        })
    };

    this.openModal = function(modalName){
        if(!modals[modalName]){
            console.error('Modal "' + modalName + '" does not exist in ModalService');
        }
        modals[modalName].activate();
    };
    this.closeModal = function(modalName){
        if(!modals[modalName]){
            console.error('Modal does not exist in ModalService');
        }
        modals[modalName].deactivate();
    };

    $rootScope.openModal = this.openModal;
    $rootScope.closeModal = this.closeModal;


}]);