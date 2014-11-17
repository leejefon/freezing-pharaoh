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
		return res.json({
			status: 'OK',
			data: {
				results: []
			}
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
