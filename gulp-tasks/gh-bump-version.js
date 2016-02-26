'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src(['./package.json'])
			.pipe($.bump({type: 'patch'}))
			.pipe(gulp.dest('./'));
	}
}
