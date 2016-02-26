'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('src/**/*.js')
		.pipe($.xo({quiet:true}));
	}
}
