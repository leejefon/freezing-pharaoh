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

    var converterAPI = 'http://youtubeinmp3.com/fetch/?api=advanced&format=JSON';
    var youtubeHistoryAPI = 'https://gdata.youtube.com/feeds/api/users/default/watch_history?v=2';
    var idolAPI = 'https://api.idolondemand.com/1/api/async';

    function searchHistory (params, cb) {
        request.get({
            url: youtubeHistoryAPI,
            headers: {
                Authorization: 'Bearer ' + params.accessToken
            }
        }, function (err, response, body) {
            if (!error && response.statusCode == 200) {
                var videos = JSON.parse(body);
                return cb(null, videos);
            }
        })
    }

    function convertVideo () {

    }

    return {
        searchHistory: searchHistory,
        convertVideo: convertVideo
    };
})();
