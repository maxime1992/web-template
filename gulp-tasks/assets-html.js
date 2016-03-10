'use strict';

module.exports = (gulp, $) => () =>
	$.merge2(
		gulp.src('src/app/views/**/*.html')
			.pipe($.if($.env.isProd, $.htmlmin({collapseWhitespace: true})))
			.pipe(gulp.dest('build/html/views/')),

		gulp.src('node_modules/font-awesome/fonts/**/*')
			.pipe(gulp.dest('build/fonts')),

		gulp.src('node_modules/bootstrap/dist/fonts/**/*')
			.pipe(gulp.dest('build/fonts'))
	)
	.pipe($.size({title: 'copy html assets'}))
	.pipe($.connect.reload());
