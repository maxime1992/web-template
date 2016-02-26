'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.connect.server({
			root: 'docs',
			livereload: true,
			port: 8181
		});
	}
}
