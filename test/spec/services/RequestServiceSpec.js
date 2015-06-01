'use strict';

describe('Service: RequestService', function() {

    beforeEach(module('360blickFrontendApp'));

    var RequestService, ENV_CONFIG, scope;

    beforeEach(inject(['RequestService', 'ENV_CONFIG', '$rootScope', function (_RequestService, _ENV_CONFIG, $rootScope) {
        scope = $rootScope.$new();
        RequestService = _RequestService;
        ENV_CONFIG = _ENV_CONFIG;
    }]));

    xdescribe('getFullActionUrl', function() {

        it('return valid url', function(){
            var url = RequestService.getFullActionUrl('user');
            expect(url).toEqual(ENV_CONFIG.api + '/user.json');
        });

    });

});