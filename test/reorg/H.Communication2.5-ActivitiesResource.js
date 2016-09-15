/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Activities Resource Requirements (Communication 2.5)', () => {

    it('An LRS has an Activities API with endpoint "base IRI" + /activities" (Communication 2.5, Implicit) **Implicit** (in that it is not named this by the spec)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var parameters = {
            activityId: data.statement.object.id
        }
        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
            });
    });

    it('An LRS\'s Activities API accepts GET requests (Communication 2.5)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var parameters = {
            activityId: data.statement.object.id
        }
        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
            });
    });

    it('An LRS\'s Activities API upon processing a successful GET request returns the complete Activity Object (Communication 2.5.s1)', function () {
        var templates = [
            {statement: '{{statements.object_activity}}'},
            {object: '{{activities.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        statement.object.id = 'http://www.example.com/verify/complete/34534';

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
        .then(function () {
            var parameters = {
                activityId: statement.object.id
            };
            return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200)
            .then(function (res) {
                var activity = res.body;
                expect(activity).to.be.ok;
                expect(activity).to.eql(statement.object);
            });
        });
    });

    it('An LRS\'s Activities API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication.md#2.5.s1.table1.row1)', function () {
        return helper.sendRequest('get', helper.getEndpointActivities(), undefined, undefined, 400);
    });

    it('An LRS\'s Activities API rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.5.s1.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "since" with type ' + type, function () {
                var parameters = helper.buildActivity();
                parameters.since = type;
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 400);
            });
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

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
