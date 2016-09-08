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

describe('Object Property (Data 2.4.4)', () => {

    describe('Object Type - Activity (2.4.4.1)', () => {

        // defines overwriting data
        var INVALID_IRI = 'ab=c://should.fail.com';
        var INVALID_NUMERIC = 12345;
        var INVALID_OBJECT = {test: 'value'};
        var INVALID_STRING = 'should error';
        var INVALID_INTERACTION_COMPONENT_ID = {
            'id': INVALID_OBJECT,
            'description': {
                'en-US': 'valid'
            }
        };
        var INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE = {
            'id': 'valid',
            'description': INVALID_OBJECT
        };
        var INVALID_INTERACTION_NO_ID = {
            'description': {
                'en-US': 'valid'
            }
        };
        var INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING = {
            'id': 'valid',
            'description': INVALID_STRING
        };
        var VALID_DESCRIPTION = {
            'description': {
                'en-GB': 'An example meeting that happened on a specific occasion with certain people present.',
                'en-US': 'An example meeting that happened on a specific occasion with certain people present.'
            }
        };
        var INVALID_INTERACTION_COMPONENT_DUPLICATE_ID = [
            {
                'id': 'valid'
            },
            {
                'id': 'valid'
            }
        ];
        var VALID_ACTIVITY = {id: 'http://www.example.com/meetings/occurances/34534'};
        var VALID_EXTENSIONS = {
            extensions: {
                'http://example.com/profiles/meetings/extension/location': 'X:\\meetings\\minutes\\examplemeeting.one',
                'http://example.com/profiles/meetings/extension/reporter': {
                    'name': 'Thomas',
                    'id': 'http://openid.com/342'
                }
            }
        };
        var VALID_INTERACTION_COMPONENT = {
            'id': 'valid',
            'description': {
                'en-US': 'valid'
            }
        };
        var VALID_INTERACTION_TYPE = {
            'interactionType': 'fill-in',
            'correctResponsesPattern': [
                'Bob"s your uncle'
            ]
        };
        var VALID_MORE_INFO = {moreInfo: 'http://virtualmeeting.example.com/345256'};
        var VALID_NAME = {
            'name': {
                'en-GB': 'example meeting',
                    'en-US': 'example meeting'
            }
        };
        var VALID_TYPE = {type: 'http://adlnet.gov/expapi/activities/meeting'};

        it('should pass statement activity default template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity default template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement activity choice template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.choice}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement activity likert template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.likert}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement activity matching template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.matching}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement activity performance template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.performance}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement activity sequencing template', (done) => {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.sequencing}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity choice template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.choice}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity likert template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.likert}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity matching template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.matching}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity performance template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.performance}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should pass statement substatement activity sequencing template', (done) => {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.sequencing}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        describe('An "object" property uses the "id" property exactly one time (Multiplicity, Data 2.4.4.1.table1.row2)', () => {

            it('statement activity "id" not provided', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_id}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "id" not provided', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_id}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An "object" property\'s "id" property is an IRI (Type, Data 2.4.4.1.table1.row2)', () => {

            it('statement activity "id" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.default}}'},
                    {id: INVALID_IRI}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "id" is IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.default}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "id" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.default}}'},
                    {id: INVALID_IRI}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "id" is IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.default}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

        });

        describe('An Activity\'s "definition" property is an Object (Type, Data 2.4.4.1.table1.row3)', () => {

            it('statement activity "definition" not object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "definition" not object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition is defined as the contents of a "definition" property object of an Activity (Format, Data 2.4.4.1.table2)', () => {

            it('statement activity "definition" not object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "definition" not object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "name" property is a Language Map (Type, Data 2.4.4.1.table2.row1)', () => {

            it('statement object "name" language map is numeric', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_NUMERIC}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement object "name" language map is string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "name" language map is numeric', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_NUMERIC}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "name" language map is string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "description" property is a Language Map (Type, Data 2.4.4.1.table2.row2)', () => {

            it('statement object "description" language map is numeric', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_NUMERIC}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement object "description" language map is string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "description" language map is numeric', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_NUMERIC}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "description" language map is string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_languages}}'},
                    {definition: INVALID_STRING}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition contains at least one of the following properties: name, description, type, moreInfo, interactionType, or extensions (Format, Data 2.2.4.4.1.table2, Data 2.4.4.1.table3)', () => {

            it('statement activity "definition" missing all properties', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "definition" contains "name"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_NAME}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "description"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_DESCRIPTION}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "type"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_TYPE}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "moreInfo"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_MORE_INFO}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "type"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_TYPE}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "moreInfo"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_MORE_INFO}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "extensions"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_EXTENSIONS}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "definition" contains "interactionType"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_INTERACTION_TYPE}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" missing all properties', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "definition" contains "name"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_NAME}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" contains "description"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_DESCRIPTION}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" contains "type"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_TYPE}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" contains "moreInfo"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_MORE_INFO}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" contains "extensions"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_EXTENSIONS}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "definition" contains "interactionType"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: VALID_INTERACTION_TYPE}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
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
