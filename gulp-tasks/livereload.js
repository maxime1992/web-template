'use strict';

module.exports = (gulp, $) => () =>
	$.connect.server({
		root: 'build',
		livereload: $.env.isDev,
		port: $.env.PORT
	});

