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
		YouTubeService.searchHistory({
			query: req.query.q,
			accessToken: req.user.accessToken
		}, function (err, data) {
			return res.json({
				status: 'OK',
				data: data
			});
		});
	}

	function youtube_login (req, res) {

	}

	function youtube_callback (req, res) {
		console.log(req.user);
		return res.redirect('/');
	}

    return {
        index: index,
		search: search,
		youtube_login: youtube_login,
		youtube_callback: youtube_callback,

        _config: {}
    };
})();
