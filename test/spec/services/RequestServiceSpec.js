'use strict';

describe('Service: RequestService', function() {

    beforeEach(module('360blickFrontendApp'));

    var RequestService, ENV_CONFIG, scope;

    beforeEach(inject(['RequestService', 'ENV_CONFIG', '$rootScope', function (RequestServ, env_conf, $rootScope) {
        scope = $rootScope.$new();

        RequestService = RequestServ;
        ENV_CONFIG = env_conf;
    }]));

    describe('getFullActionUrl', function() {

        it('return valid url', function(){
            var url = RequestService.getFullActionUrl('user');
            expect(url).toEqual(ENV_CONFIG.api + '/user.json');
        });

    });

});