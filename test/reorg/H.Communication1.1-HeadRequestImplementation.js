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

describe('HEAD Request Implementation Requirements (Communication 1.1)', () => {

    it('An LRS accepts HEAD requests (Communication 1.1)', function () {

        it('should succeed GET about with no body', function () {
            return helper.sendRequest('head', helper.getEndpointAbout(), undefined, undefined, 200);
        });

        it('should succeed GET activities with no body', function () {
            var parameters = {
                activityId: 'http://www.example.com/activityId/hashset'
            };
            return helper.sendRequest('head', helper.getEndpointActivities(), parameters, undefined, 200);
        });

        it('should succeed GET activities profile with no body', function () {
            return helper.sendRequest('head', helper.getEndpointActivitiesProfile(), helper.buildActivityProfile(), undefined, 200);
        });

        it('should succeed GET activities state with no body', function () {
            return helper.sendRequest('head', helper.getEndpointActivitiesState(), helper.buildState(), undefined, 200);
        });

        it('should succeed GET agents with no body', function () {
            return helper.sendRequest('head', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200);
        });

        it('should succeed GET agents profile with no body', function () {
            return helper.sendRequest('head', helper.getEndpointAgentsProfile(), helper.buildAgentProfile(), undefined, 200);
        });

        it('should succeed GET statements with no body', function () {
            return helper.sendRequest('head', helper.getEndpointStatements(), undefined, undefined, 200);
        });
    });

    describe('An LRS responds to a HEAD request in the same way as a GET request, but without the message-body (Communication 1.1.s3.b1) **This means run ALL GET tests with HEAD**', function () {

        it('should succeed HEAD about with no body', function () {
            return helper.sendRequest('head', helper.getEndpointAbout(), undefined, undefined, 200)
                .then(function (res) {
                    expect(Object.keys(res.body)).to.have.length(0);
                });
        });

        it('should succeed HEAD activities with no body', function () {
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
                    return helper.sendRequest('head', helper.getEndpointActivities(), parameters, undefined, 200)
                        .then(function (res) {
                            expect(Object.keys(res.body)).to.have.length(0);
                        });
                });
        });

        it('should succeed HEAD activities profile with no body', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return helper.sendRequest('head', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            expect(Object.keys(res.body)).to.have.length(0);
                        })
                });
        });

        it('should succeed HEAD activities state with no body', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return helper.sendRequest('head', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            expect(Object.keys(res.body)).to.have.length(0);
                        })
                });
        });

        it('should succeed HEAD agents with no body', function () {
            return helper.sendRequest('head', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200)
                .then(function (res) {
                    expect(Object.keys(res.body)).to.have.length(0);
                });
        });

        it('should succeed HEAD agents profile with no body', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return helper.sendRequest('head', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            expect(Object.keys(res.body)).to.have.length(0);
                        })
                });
        });

        it('should succeed HEAD statements with no body', function () {
            var statement = helper.buildStatement();
            return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return helper.sendRequest('head', helper.getEndpointStatements(), undefined, undefined, 200)
                        .then(function (res) {
                            expect(Object.keys(res.body)).to.have.length(0);
                        })
                });
        });
    });

    it('An LRS accepts HEAD requests without Content-Length headers (Communication 1.1)', function (done) {

            request(helper.getEndpointAndAuth())
                .head(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
    });

    it('An LRS accepts GET requests without Content-Length headers (Communication 1.1)', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
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
