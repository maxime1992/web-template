'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('src/app/**/*.js')
			.pipe($.ngdocs.process())
			.pipe(gulp.dest('./docs'));
	}
}
