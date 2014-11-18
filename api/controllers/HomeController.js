/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/11/17
 */

module.exports = (function(){

	function index (req, res) {
		return res.view();
	}

	function search (req, res) {
		YouTubeService.search({
			query: req.query.q,
			ytUserId: req.user.username
		}, function (err, data) {
			return res.json(data);
		});
	}

	function search_result (req, res) {
		YouTubeService.search({
			query: req.query.q,
			ytUserId: req.user.username
		}, function (err, data) {
			return res.view({
				results: data
			});
		});
	}

	function populate_videos (req, res) {
		YouTubeService.populateHistory({
			accessToken: req.user.accessToken
		}, function (err, data) {
			return res.json(data);
		});
	}

	function transcribe (req, res) {
		YouTubeService.transcribeVideo({
			title: req.query.title
		}, true, function (err, data) {
			return res.json(data);
		});
	}

	function transcribe_status_check (req, res) {
		YouTubeService.transcribeStatusCheck(req.param('jobid'), function (err, data) {
			return res.json(data);
		});
	}

	function youtube_login (req, res) {

	}

	function youtube_callback (req, res) {
		return res.redirect('/');
	}

    return {
        index: index,
		search: search,
		search_result: search_result,
		populate_videos: populate_videos,

		transcribe: transcribe,
		transcribe_status_check: transcribe_status_check,

		youtube_login: youtube_login,
		youtube_callback: youtube_callback,

        _config: {}
    };
})();
