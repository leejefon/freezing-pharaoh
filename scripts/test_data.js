/**
 * Test DB Sample Data
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = {

    resume_test: [
        {
            _id: new ObjectID("537c0713e478890b0037d97a")
        },
        {
            _id: new ObjectID("537c0713e478890b0f3028c3")
        }
    ],

    blog_test: [
        {
            _id: new ObjectID("537c0713e478890b0037d97b")
        }
    ]
};
