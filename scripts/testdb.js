/**
 * Test DB Setup Script
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var MongoClient = require('mongodb').MongoClient;
var iniparser = require('iniparser');
var _ = require('underscore');
var test_data = require('./test_data.js');

process.on('SIGINT', function() {
    process.exit(0);
});

iniparser.parse('.env', function(err, data){
    if (err) {
        console.log(err);
        process.exit(0);
    }

    if (data.NODE_ENV !== 'development') {
        console.log("The script is for development only!");
        process.exit(0);
    }

    var command = process.argv[2] || 'clean';

    MongoClient.connect(data.MONGOHQ_URL, function (err, db) {
        if (err) {
            throw err;
        }

        if (command === 'clean') {
            db.collections(function (err, collections) {
                _.each(collections, function (collection) {
                    var collectionName = collection.collectionName;
                    if (collectionName.endsWith('_test')) {
                        collection.drop(function(){
                            console.log('Dropped ' + collectionName);
                        });
                    }
                });
            });
        } else {
            _.each(test_data, function (collectionData, collectionName) {
                db.createCollection(collectionName, {strict:true}, function (err, collection) {
                    collection.insert(collectionData, function (err) {
                        console.log('Loaded ' + collectionName);
                    });
                });
            });
        }
    });
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
