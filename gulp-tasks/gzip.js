'use strict';

module.exports = (gulp, $) => () =>
	gulp.src('build/**/*.{js,css,html,json}')
		.pipe($.if($.env.isProd, $.gzip()))
		.pipe(gulp.dest('build'))
		.pipe($.size({ title: 'Gzip' }));
