'use strict';

module.exports = (gulp, $) => () =>
	gulp.src('./build/**/*')
		.pipe($.ghPages());
	
