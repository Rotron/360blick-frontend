'use strict';

describe('Service: RequestService', function() {

    beforeEach(module('360blickFrontendApp'));

    var RequestService, ENV_CONFIG, scope;

    beforeEach(inject(function (_RequestService_, _ENV_CONFIG_, $rootScope) {
        scope = $rootScope.$new();

        RequestService = _RequestService_;
        ENV_CONFIG = _ENV_CONFIG_;
    }));

    describe('getFullActionUrl', function() {

        it('should return valid url', function(){
            var url = RequestService.getFullActionUrl('user');
            expect(url).toEqual(ENV_CONFIG.api + '/user.json');
        });

    });

});