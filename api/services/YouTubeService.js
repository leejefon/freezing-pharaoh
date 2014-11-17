/**
 * YouTubeService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/11/17
 */

var request = require('request');

module.exports = (function(){

    var converterAPI = 'http://youtubeinmp3.com/fetch/?api=advanced&format=JSON'
    var idolAPI = '';

    function searchHistory (query, cb) {

    }

    function convertVideo () {

    }

    return {
        searchHistory: searchHistory,
        convertVideo: convertVideo
    };
})();
