'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('./build/**/*')
			.pipe($.ghPages());
	}
}
