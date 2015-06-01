app.service('ModalService',['$rootScope', 'btfModal', function($rootScope, btfModal) {

    var modals = {
        'login': btfModal({
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/login.html'
        }),
        'error': btfModal({
            controller: 'ErrorController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/error.html'
        }),
        'confirm': btfModal({
            controller: 'ConfirmController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/confirm.html'
        }),
        'help': btfModal({
            controller: 'HelpController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/help.html'
        }),
        'feedback': btfModal({
            controller: 'FeedbackController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/feedback.html'
        }),
        'newProject': btfModal({
            controller: 'NewProjectController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/newProject.html'
        }),
        'newScene': btfModal({
            controller: 'NewSceneController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/newScene.html'
        }),
        'newSceneTemplate': btfModal({
            controller: 'NewSceneTemplateController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/newSceneTemplate.html'
        }),
        'newAsset': btfModal({
            controller: 'NewAssetController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/newAsset.html'
        }),
        'selectTexture': btfModal({
            controller: 'SelectTextureController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/selectTexture.html'
        }),
        'newInteraction': btfModal({
            controller: 'NewInteractionController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/dialog/newInteraction.html'
        })
    };

    this.openModal = function(modalName, data){
        if(!modals[modalName]){
            console.error('Modal "' + modalName + '" does not exist in ModalService');
        }
        modals[modalName].activate({data: data});
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