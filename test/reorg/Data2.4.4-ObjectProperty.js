/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Object Property Requirements (Data 2.4.4)', () => {

    //Data 2.4.4
    templatingSelection.createTemplate('objects.js');
    //Data 2.4.4.1
    templatingSelection.createTemplate("activities.js");
    //Data 2.4.4.3
    templatingSelection.createTemplate('statementrefs.js')
    templatingSelection.createTemplate('substatements.js')

});

    function parse(string, done) {
        var parsed;
        try {
            parsed = JSON.parse(string);
        } catch (error) {
            done(error);
        }
        return parsed;
    }

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
