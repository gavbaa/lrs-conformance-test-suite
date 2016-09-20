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

describe('Versioning Requirements (Communication 3.3)', () => {

    describe('An LRS MUST set the X-Experience-API-Version header to the latest patch version (Communication 3.3.s3.b2)', function () {
        it('should respond with header "version" set to "1.0.3"', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .wait(helper.genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .expect('x-experience-api-version', '1.0.3', done);
        });
    });

    describe('An LRS will not modify Statements based on a "version" before "1.0.1" (Communication 3.3.s3.b4)', function () {
        it('should not convert newer version format to prior version format', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .wait(helper.genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(helper.isEqual(data.actor, statement.actor)).to.be.true;
                        expect(helper.isEqual(data.object, statement.object)).to.be.true;
                        expect(helper.isEqual(data.verb, statement.verb)).to.be.true;
                        done();
                    }
                });
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API (Format, Communication 3.3.s4.b1, Communication 3.3.s3.b7, Communication 2.8.s5.b4)', function () {
        it('should pass when About GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointAbout())
                .expect(200, done);
        });

        it('should fail when Statement GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .expect(400, done);
        });

        it('should fail when Statement POST without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .json(data).expect(400, done);
        });

        it('should fail when Statement PUT without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .json(data).expect(400, done);
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
