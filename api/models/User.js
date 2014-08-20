/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/19
 */

module.exports = (function(){

    var tableName = 'users';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
