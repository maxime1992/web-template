'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('CHANGELOG.md', {buffer: false})
			.pipe($.conventionalChangelog({
				preset: 'angular'
			}))
			.pipe(gulp.dest('./'));
	}
}
