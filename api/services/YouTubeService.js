/**
 * YouTubeService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/11/17
 */

var request = require('request');
var http = require('http');
var fs = require('fs');

module.exports = (function(){

    var converterAPI = 'http://youtubeinmp3.com/fetch/?video=';
    var youtubeHistoryAPI = 'https://gdata.youtube.com/feeds/api/users/default/watch_history?v=2&alt=json';
    var idolAPI = 'https://api.idolondemand.com/1/api/async';

    function search (params, cb) {
        Cache.find({
            data: {
                like: params.query
            }
        }, function (err, data) {
            return cb(null, data);
        });
    }

    function populateHistory (params, cb) {
        request.get({
            url: youtubeHistoryAPI,
            headers: {
                Authorization: 'Bearer ' + params.accessToken
            }
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var videos = JSON.parse(body);
                return cb(null, videos.feed.entry.map(function (entry) {
                    var v = {
                        title: entry.title.$t,
                        link: entry.content.src
                    };

                    convertVideo(v);
                    return v;
                }));
            }
        })
    }

    function convertVideo (video) {
        var file = fs.createWriteStream('/.tmp/downloads/' + video.title + ".mp3");
        var request = http.get(converterAPI + video.link, function (response) {
            response.pipe(file);
            return transcribeVideo(video);
        });
    }

    function transcribeVideo (video) {
        request.get({
            url: idolAPI,
            qs: {
                url: process.env.PROJECT_URL + '/downloads/' + video.title + ".mp3",
                apikey: process.env.IDOL_API_KEY
            }
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var content = JSON.parse(body);
                Cache.create({
                    key: video.title,
                    data: content.document
                }, function (err, data) {

                });
            }
        });
    }

    return {
        populateHistory: populateHistory,
        convertVideo: convertVideo
    };
})();
