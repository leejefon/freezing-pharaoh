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
		if (req.user) {
			// YouTubeService.populateHistory({
			// 	accessToken: req.user.accessToken
			// }, function (err, data) {
			//
			// });
		}

		return res.view();
	}

	function search (req, res) {
		YouTubeService.search({
			query: req.query.q
		}, function (err, data) {
			return res.json(data);
		});
	}

	function subtitle (req, res) {
		YouTubeService.getSubtitle({
			youtubeId: req.query.v,
			accessToken: req.user.accessToken
		}, function (err, data) {
			if (err) {
				return res.json(err);
			}

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
		subtitle: subtitle,
		transcribe: transcribe,
		transcribe_status_check: transcribe_status_check,

		youtube_login: youtube_login,
		youtube_callback: youtube_callback,

        _config: {}
    };
})();
