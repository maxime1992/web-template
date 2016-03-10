'use strict';

module.exports = (gulp, $) => () =>
	gulp.src('CHANGELOG.md', {buffer: false})
		.pipe($.conventionalChangelog({
			preset: 'angular'
		}))
		.pipe(gulp.dest('./'));
