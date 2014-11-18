/**
 * Cache
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/11/17
 */

module.exports = (function(){

    var tableName = 'cache';

    var attributes = {
        key: {
            type: 'string',
            required: true
        },
        data: {
            type: 'json',
            required: true
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
