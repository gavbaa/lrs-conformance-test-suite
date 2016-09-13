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

describe('Actor Property Requirements (Data 2.4.2)', () => {

    // defines overwriting data
    var INVALID_OBJECT = {key: 'value'};
    var INVALID_OBJECTTYPE_NUMERIC = {objectType: 123};
    var INVALID_OBJECTTYPE_OBJECT = {objectType: INVALID_OBJECT};
    var INVALID_OBJECTTYPE_NAME_NUMERIC = {name: 123};
    var INVALID_OBJECTTYPE_NAME_OBJECT = {name: INVALID_OBJECT};
    var INVALID_MAIL_TO_EMAIL = 'mailto:should.fail.com';
    var INVALID_MAIL_TO_IRI = 'http://should.fail.com';
    var INVALID_URI = 'ab=c://should.fail.com';
    var INVALID_ACCOUNT_HOMEPAGE_IRL = {account: {homePage: INVALID_URI}};
    var INVALID_ACCOUNT_NAME_IRL = {account: {name: INVALID_OBJECT}};

    describe('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, Data 2.4.2.1.s2.b1)', () => {

        it('statement actor without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement actor "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement actor "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement actor "openid" should pass', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.openid}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement authority without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement authority "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement authority "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement authority "openid" should pass', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.openid}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement context instructor "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement context instructor "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement context instructor "openid" should pass', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.openid}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement as agent without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as agent "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement as agent "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement as agent "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement as agent "openid" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.openid}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s agent without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s agent "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s agent "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s agent "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "account" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.account}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s context instructor "mbox" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s context instructor "mbox_sha1sum" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox_sha1sum}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('statement substatement"s context instructor "openid" should pass', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.openid}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

    });

    describe('An "objectType" property is a String (Type, Data 2.4.2.1.s2.table1.row1)', () => {

        it('statement actor "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as agent with "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as agent with "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s agent "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s agent "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "objectType" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NUMERIC
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "objectType" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_OBJECT
            ];
            data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

    });

    describe('A "name" property is a String (Type, Data 2.4.2.1.s2.table1.row2)', () => {

        it('statement actor "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as agent with "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as agent with "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s agent "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s agent "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "name" should fail numeric', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_NUMERIC
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "name" should fail object', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.default}}'},
                INVALID_OBJECTTYPE_NAME_OBJECT
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

    });

    describe('An "mbox" property is an IRI (Type, Data 2.4.2.3.s3.table1.row1)', () => {

        it('statement actor "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement actor "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement authority "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement authority "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement context team "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "agent mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context team "group mbox" not IRI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_IRI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .json(data)
            .expect(400, done);
        });

    });

    describe('An "mbox" property has the form "mailto:email address" (Syntax, Data 2.4.2.3.s3.table1.row1)', () => {

        it('statement actor "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context team "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "agent mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context team "group mbox" not mailto:email address', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox}}'},
                {mbox: INVALID_MAIL_TO_EMAIL}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

    });

    describe('An "mbox_sha1sum" property is a String (Type, Data 2.4.2.3.s3.table1.row2)', () => {

        it('statement actor "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context team "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "agent mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context team "group mbox_sha1sum" not string', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_mbox_sha1sum}}'},
                {mbox_sha1sum: INVALID_OBJECT}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

    });

    describe('An "openid" property is a URI (Type, Data 2.4.2.3.s3.table1.row3)', () => {

        it('statement actor "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement actor "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.actor}}'},
                {actor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement authority "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.authority}}'},
                {authority: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context instructor "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement context team "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement as "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_actor}}'},
                {object: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.actor}}'},
                {actor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "agent openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{agents.openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context instructor "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('statement substatement"s context team "group openid" not URI', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.instructor}}'},
                {instructor: '{{groups.identified_openid}}'},
                {openid: INVALID_URI}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(addAllHeaders({}))
            .json(data)
            .expect(400, done);
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
