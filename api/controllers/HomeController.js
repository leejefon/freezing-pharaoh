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
		return res.json({
			data: 'Hello World'
		});
	}

	function search (req, res) {
		return res.json({
			status: 'OK',
			data: {
				results: []
			}
		});
	}

    return {
        index: index,
		search: search,

        _config: {}
    };
})();
