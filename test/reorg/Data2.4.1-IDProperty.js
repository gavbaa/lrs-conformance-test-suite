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

describe('Id Property Requirements (Data 2.4.1)', () => {

    templatingSelection.createTemplate('uuids.js');

    it ('An LRS generates the "id" property of a Statement if none is provided (Modify, Data 2.4.1.s2.b1)', function (done){
        this.timeout(0);
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        data = helper.createFromTemplate(templates);
        data = data.statement;
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(data)
        .expect(200)
        .end()
        .get(helper.getEndpointStatements() + '?limit=1')
        .wait(helper.genDelay(stmtTime, null, null))
        .headers(helper.addAllHeaders({}))
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var results = parse(res.body, done);
                expect(results.statements[0].id).to.not.be.undefined;
                done();
            }
            });
    });


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
