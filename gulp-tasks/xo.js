'use strict';

module.exports = (gulp, $) => () => 
	gulp.src('src/**/*.js')
		.pipe($.xo({quiet:true}));
