/**
 * YouTubeService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/11/17
 */

var request = require('request');
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = (function(){

    var converterAPI = 'http://youtubeinmp3.com/fetch/?video=';
    var youtubeAPI = 'https://gdata.youtube.com/feeds/api';
    var idolAPI = 'https://api.idolondemand.com/1/api/async';
    var idolAPIsync = 'https://api.idolondemand.com/1/api/sync';
    var statusCheckUrl = 'https://api.idolondemand.com/1/job/status/';

    function search (params, cb) {
        request.get({
            url: idolAPIsync + '/findrelatedconcepts/v1',
            qs: {
                text: params.query,
                apikey: process.env.IDOL_API_KEY
            }
        }, function (err, response, body) {
            var results = JSON.parse(body).entities.slice(0, 5).map(function (entry) { return entry.text; }).join(' ');

            // Since text search not enabled in db, query all then filter
            Cache.find({
                user: params.ytUserId
                // $or: [
                    // { user: params.ytUserId },
                    // { 'data.all': { $text: { $search: results } } },
                // ]
            }, function (err, data) {
                return cb(null, data.filter(function (item) {
                    var regex = new RegExp(params.query, "i");
                    return regex.test(item.data.all);
                }));
            });
        });
    }

    function populateHistory (params, cb) {
        request.get({
            url: youtubeAPI + '/users/default/watch_history?v=2&alt=json',
            headers: {
                Authorization: 'Bearer ' + params.accessToken
            }
        }, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                var videos = JSON.parse(body);

                // return cb(null, videos);

                return cb(null, videos.feed.entry.map(function (entry) {
                    var v = {
                        title: entry.title.$t,
                        link: entry.content.src,
                        thumbnail: entry.media$group.media$thumbnail[0].url,
                        desc: entry.media$group.media$description.$t,
                        author: entry.media$group.media$credit[0].yt$display,
                        transcribedText: ''
                    };

                    v.all = v.title + ' ' + v.desc + ' ' + v.author + ' ' + v.transcribedText;

                    Cache.findOrCreate({
                        key: entry.id.$t,
                    }, {
                        user: entry.author[0].yt$userId.$t,
                        key: entry.id.$t,
                        data: v
                    }, function (err, data) {
                        // do nothing
                    });

                    // transcribeYouTube(v);
                    return v;
                }));
            }
        });
    }

    function transcribeYouTube (video, cb) {
        var file = fs.createWriteStream('.tmp/public/' + video.title + ".mp3");

        var curl = spawn('curl', ['-L', video.link]);

        curl.stdout.on('data', function(data) { file.write(data); });

        curl.stdout.on('end', function(data) {
            file.end();
        });

        curl.on('exit', function(code) {
            if (code !== 0) {
                console.log('Failed: ' + code);
                return cb({ err: 'err' });
            }
            return cb(null, { good: 'good' });
        });
    }

    function transcribeVideo (video, cb) {
        request.get({
            url: idolAPI + '/recognizespeech/v1',
            qs: {
                url: process.env.PROJECT_URL + '/videos/' + video.title + ".mp3",
                apikey: process.env.IDOL_API_KEY
            }
        }, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                // Note: since we are using async, we will get an jobid
                var result = JSON.parse(body);
                return cb(null, result);
            }
        });
    }

    function transcribeStatusCheck (jobId, cb) {
        request.get({
            url: statusCheckUrl + jobId,
            qs: {
                apikey: process.env.IDOL_API_KEY
            }
        }, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                // TODO: check if it's finished, store in cache
                var result = JSON.parse(body);
                return cb(null, result);
            }
        });
    }

    return {
        search: search,
        populateHistory: populateHistory,
        transcribeYouTube: transcribeYouTube,
        transcribeVideo: transcribeVideo,
        transcribeStatusCheck: transcribeStatusCheck
    };
})();
