'use strict';

module.exports = (gulp, $) => () =>
	gulp.src('src/app/**/*.js')
		.pipe($.ngdocs.process())
		.pipe(gulp.dest('./docs'));
