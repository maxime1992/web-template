'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.connect.server({
			root: 'build',
			livereload: $.env.isDev,
			port: $.env.PORT
		});
	}
}
