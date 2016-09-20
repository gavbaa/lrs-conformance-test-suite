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

describe('Stored Property Requirements (Data 2.4.8)', () => {

    describe('An LRS MUST accept statements with the stored property (Data 2.4.8.s3.b2)', function () {
        this.timeout(0);
        var storedTime = new Date('July 15, 2011').toISOString();
        var template = [
            {statement: '{{statements.default}}'},
            {stored: storedTime}
        ];
        var data = helper.createFromTemplate(template).statement;
        var postId, putId;

        it('using POST', function (done) {
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    postId = res.body[0];
                    var query = '?statementId=' + postId;

                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + query)
                    .wait(helper.genDelay(stmtTime, query, postId))
                    .headers(helper.addAllHeaders())
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            var result = parse(res.body);
                            expect(result).to.have.property('stored');
                            var stmtStored = result.stored;
                            expect(stmtStored).to.not.eql(storedTime);
                            done();
                        }
                    });
                }
            });
        });

        it('using PUT', function (done) {
            putId = helper.generateUUID();
            param = '?statementId=' + putId;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + param)
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(204)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + param)
                    .wait(helper.genDelay(stmtTime, param, putId))
                    .headers(helper.addAllHeaders())
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            var result = parse(res.body);
                            expect(result).to.have.property('stored');
                            var stmtStored = result.stored;
                            expect(stmtStored).to.not.eql(storedTime);
                            done();
                        }
                    });
                }
            });
        });
    });

    describe('A stored property must be a TimeStamp (Data 2.4.8.s2)', function () {
        it('retrieve statements, test a stored property', (done) => {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var result = parse(res.body);
                    var stmts = result.statements;
                    var milliChecker = (num) => {
                        expect(stmts[num]).to.have.property('stored');
                        //formatted iso 8601
                        var chkStored =  moment(stmts[num].stored, moment.ISO_8601);
                        expect(chkStored.isValid()).to.be.true;
                        expect(isNaN(chkStored._pf.parsedDateParts[6])).to.be.false;
                        //precision to milliseconds
                        if ((chkStored._pf.parsedDateParts[6] % 10) > 0) {
                            expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                            done();
                        } else {
                            if (++num < stmts.length) {
                                milliChecker(num);
                            } else {
                                expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                                done();
                            }
                        }
                    }; milliChecker(0);
                }
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
