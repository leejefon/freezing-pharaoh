/**
 * users_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

var frisby = require('frisby');

var serverUrl = 'http://localhost:1338';

frisby.create('User')
    .put(serverUrl + '/users', {
        email: 'q@q.cc'
    })
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            email: String,
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            email: 'q@q.cc'
        }
    })
    .afterJSON(function (adventurer) {

    })
    .toss();
