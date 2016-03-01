'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('src/app/languages/*')
			.pipe(gulp.dest('build/languages/'))
			.pipe($.size({title: 'copy json assets'}))
			.pipe($.connect.reload());
	}
}
