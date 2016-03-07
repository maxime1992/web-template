'use strict';

module.exports = (gulp, $) => () =>
	$.merge2(
		gulp.src('src/img/**/*')
			.pipe($.if($.env.isProd,$.imagemin({
				progressive: true,
				svgo$: [{removeViewBox: false}],
				use: [$.pngquant()]
			})))
			.pipe(gulp.dest('build/img')),

		gulp.src('node_modules/bootstrap/dist/img/**/*')
			.pipe(gulp.dest('build/libs/node_modules/bootstrap/dist/img'))
	)
	.pipe($.size({title: 'copy img assets'}))
	.pipe($.connect.reload());

