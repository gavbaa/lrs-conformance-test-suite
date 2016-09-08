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

describe('Content Type (Communication 1.5)', () => {

    describe('An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, Communication 1.5)', function () {
        var data;
        var attachment;

        before('create attachment templates', function () {
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt"
                        }
                    ]
                }
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;

            attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        });

        it('should succeed when attachment uses "fileUrl" and request content-type is "application/json"', function (done) {
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(200, done);
        });

        it('should fail when attachment uses "fileUrl" and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(JSON.stringify(data)).expect(400, done);
        });

        it('should succeed when attachment is raw data and request content-type is "multipart/mixed"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(200, done);
        });

        it('should fail when attachment is raw data and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (Communication 1.5.1.s1.b2)', function () {
        it('should fail when passing statement attachments and missing attachment"s binary', function (done) {
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt"
                        },
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a"
                        }
                    ]
                }
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (Communication 1.5.2.s2.b2, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('A Boundary is defined as the value of the body header named "boundary" (Definition, Communication 1.5.2.s2.b2, RFC 1341)', function () {
        it('should fail if boundary not provided in header', function (done) {
            var header = {'Content-Type': 'multipart/mixed;'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (Communication 1.5.2.s2.b2, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, Communication 1.5.2.s2.b2.b1)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, Communication 1.5.2.s2.b2.b1)', function () {
        it('should fail when statements separated into multiple parts', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_statement_parts.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (Communication 1.5.2.s2.b2.b3", "Communication 1.5.2.s1.b4)', function () {
        it('should fail when attachments missing header "X-Experience-API-Hash"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_no_x_experience_api_hash.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });

        it('should fail when attachments header "X-Experience-API-Hash" does not match "sha2"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_no_match_sha2.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
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
