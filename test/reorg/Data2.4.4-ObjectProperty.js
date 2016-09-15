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

describe('Object Property Requirements (Data 2.4.4)', () => {

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

        describe('An LRS generates an "objectType" property of "Activity" to any "object" property if none is provided (Modify, Data 2.4.4.s2)', () => {

            it('statement activity without "objectType" is valid', (done) => {
                var templates = [
                    {statement: '{{statements.no_object}}'},
                    {object: VALID_ACTIVITY}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity without "objectType" is valid', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.no_object}}'},
                    {object: VALID_ACTIVITY}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

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

        describe('An Activity Definition\'s "type" property is an IRI (Type, Data 2.4.4.1.s2.table1.row3)', () => {

            it('statement activity "type" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {type: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "type" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {type: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "moreinfo" property is an IRL (Type, Data 2.4.4.1.s2.table1.row4)', () => {

            it('statement activity "moreInfo" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {moreInfo: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "moreInfo" not IRI', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {moreInfo: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "extension" property is an Object (Type, Data 2.4.4.1.s2.table1.row5)', () => {

            it('statement activity "extension" invalid string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {extensions: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "extension" invalid string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.no_definition}}'},
                    {definition: {extensions: INVALID_STRING}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition contains at least one of the following properties: name, description, type, moreInfo, interactionType, or extensions (Format, Data 2.4.4.1.s2)', () => {

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

        describe('An Activity Definition\'s "interactionType" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other” (Data 2.4.4.1.s8.table1.row1)', () => {

            it('statement activity "interactionType" can be used with "true-false"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.true_false}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "interactionType" can be used with "choice"', (done) => {
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

            it('statement activity "interactionType" can be used with "fill-in"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.fill_in}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "interactionType" can be used with "long-fill-in"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.long_fill_in}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "interactionType" can be used with "matching"', (done) => {
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

            it('statement activity "interactionType" can be used with "performance"', (done) => {
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

            it('statement activity "interactionType" can be used with "sequencing"', (done) => {
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

            it('statement activity "interactionType" can be used with "likert"', (done) => {
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

            it('statement activity "interactionType" can be used with "numeric"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.numeric}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "interactionType" can be used with "other"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.other}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "interactionType" can be used with "true-false"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.true_false}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "interactionType" can be used with "choice"', (done) => {
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

            it('statement substatement activity "interactionType" can be used with "fill-in"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.fill_in}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "interactionType" can be used with "long-fill-in"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.long_fill_in}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "interactionType" can be used with "matching"', (done) => {
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

            it('statement substatement activity "interactionType" can be used with "performance"', (done) => {
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

            it('statement substatement activity "interactionType" can be used with "sequencing"', (done) => {
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

            it('statement substatement activity "interactionType" can be used with "likert"', (done) => {
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

            it('statement substatement activity "interactionType" can be used with "numeric"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.numeric}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "interactionType" can be used with "other"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.other}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

        });

        describe('An Activity Definition\'s "correctResponsesPattern" property is an array of Strings (Data 2.4.4.1.s8.table1.row2)', () => {

            it('statement activity "correctResponsesPattern" is an array of strings', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.numeric}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "correctResponsesPattern" is an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: INVALID_OBJECT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "correctResponsesPattern" is an array of object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: [INVALID_OBJECT]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "correctResponsesPattern" is an array of number', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: [12345]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "correctResponsesPattern" is an array of strings', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.numeric}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "correctResponsesPattern" is an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: INVALID_OBJECT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "correctResponsesPattern" is an array of object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: [INVALID_OBJECT]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "correctResponsesPattern" is an array of number', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.numeric}}'},
                    {definition: {correctResponsesPattern: [12345]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "choices" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3)', () => {

            it('statement activity "choices" uses choice is an array of interaction components', (done) => {
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

            it('statement activity "choices" uses choice is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses choice is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses choice is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses choice is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses sequencing is an array of interaction components', (done) => {
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

            it('statement activity "choices" uses sequencing is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses sequencing is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses sequencing is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "choices" uses sequencing is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses choice is an array of interaction components', (done) => {
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

            it('statement substatement activity "choices" uses choice is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses choice is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses choice is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses choice is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses sequencing is an array of interaction components', (done) => {
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

            it('statement substatement activity "choices" uses sequencing is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses sequencing is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses sequencing is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choices" uses sequencing is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "scale" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3)', () => {

            it('statement activity "scale" uses likert is an array of interaction components', (done) => {
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

            it('statement activity "scale" uses likert is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "scale" uses likert is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "scale" uses likert is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "scale" uses likert is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "scale" uses likert is an array of interaction components', (done) => {
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

            it('statement substatement activity "scale" uses likert is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "scale" uses likert is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "scale" uses likert is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "scale" uses likert is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "source" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3)', () => {

            it('statement activity "source" uses matching is an array of interaction components', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_source}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "source" uses matching is an array of interaction components', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "source" uses matching is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "source" uses matching is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "source" uses matching is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "source" uses matching is an array of interaction components', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_source}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "source" uses matching is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "source" uses matching is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "source" uses matching is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "source" uses matching is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_source}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "target" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3)', () => {

            it('statement activity "target" uses matching is an array of interaction components', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_target}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement activity "target" uses matching is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "target" uses matching is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "target" uses matching is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "target" uses matching is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "target" uses matching is an array of interaction components', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_target}}'}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
            });

            it('statement substatement activity "target" uses matching is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "target" uses matching is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "target" uses matching is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "target" uses matching is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_target}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Activity Definition\'s "steps" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3)', () => {

            it('statement activity "steps" uses performance is an array of interaction components', (done) => {
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

            it('statement activity "steps" uses performance is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "steps" uses performance is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "steps" uses performance is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "steps" uses performance is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "steps" uses performance is an array of interaction components', (done) => {
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

            it('statement substatement activity "steps" uses performance is not an array', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: VALID_INTERACTION_COMPONENT}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "steps" uses performance is an array of non string ID', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "steps" uses performance is an array of non object description', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "steps" uses performance is an array of non description language', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Interaction Component is an Object (Data 2.4.4.1.s14)', () => {

            it('statement activity "choice choices" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement activity "likert scale" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching source" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching target" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement activity "performance steps" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement activity "sequencing choices" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choice choices" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "likert scale" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching source" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching target" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "performance steps" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "sequencing choices" is not an object', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_STRING]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(400, done);
            });

        });

        describe('Interaction Component contains an "id" property (Multiplicity, Data 2.4.4.1.s15.table1.row1)', () => {

            it('statement activity "choice choices" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice_no_choices}}'},
                    {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "likert scale" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert_no_scale}}'},
                    {definition: {scale: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching source" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_no_source}}'},
                    {definition: {source: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching target" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching_no_target}}'},
                    {definition: {target: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "performance steps" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance_no_steps}}'},
                    {definition: {steps: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "sequencing choices" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing_no_choices}}'},
                    {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choice choices" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice_no_choices}}'},
                    {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "likert scale" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert_no_scale}}'},
                    {definition: {scale: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching source" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_no_source}}'},
                    {definition: {source: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching target" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching_no_target}}'},
                    {definition: {target: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "performance steps" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance_no_steps}}'},
                    {definition: {steps: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "sequencing choices" missing "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing_no_choices}}'},
                    {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('An Interaction Component\'s "id" property is a String (Type, Data 2.4.4.1.s15.table1.row1)', () => {

            it('statement activity "choice choices id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "likert scale id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching source id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "matching target id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "performance steps id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity "sequencing choices id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "choice choices id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "likert scale id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching source id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "matching target id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "performance steps id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity "sequencing choices id" not a string', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

        });

        describe('Within an array of Interaction Components, the "id" property is unique (Multiplicty, Data 2.4.4.1.s16.b1)', () => {

            it('statement activity choice "choices" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity likert "scale" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity matching "source" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity matching "target" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity performance "steps" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement activity sequencing "choices" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity choice "choices" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.choice}}'},
                    {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity likert "scale" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.likert}}'},
                    {definition: {scale: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity matching "source" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {source: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity matching "target" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.matching}}'},
                    {definition: {target: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity performance "steps" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.performance}}'},
                    {definition: {steps: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
            });

            it('statement substatement activity sequencing "choices" cannot use same "id"', (done) => {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.activity}}'},
                    {object: '{{activities.sequencing}}'},
                    {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                ];
                var data = helper.createFromTemplate(templates).statement;

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
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
