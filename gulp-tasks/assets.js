'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.merge2(
			gulp.src('src/app/views/**/*.html')
				.pipe($.if($.env.isProd, $.htmlmin({collapseWhitespace: true})))
				.pipe(gulp.dest('build/html/views/')),

			gulp.src('src/app/controllers/**/*.js')
				.pipe($.babel())
				.pipe(gulp.dest('build/js/controllers/')),

			gulp.src('src/app/directives/**/*.js')
				.pipe($.stripComments())
				.pipe($.angularEmbedTemplates())
				.pipe($.flatten())
				.pipe($.babel())
				.pipe(gulp.dest('build/js/directives/')),

			gulp.src('src/app/factories/**/*.js')
				.pipe($.babel())
				.pipe(gulp.dest('build/js/factories')),

			gulp.src('src/app/filters/**/*.js')
				.pipe($.babel())
				.pipe(gulp.dest('build/js/filters')),

			gulp.src('src/app/mock/**/*.js')
				.pipe($.if($.env.isDev, $.babel()))
				.pipe($.if($.env.isDev, gulp.dest('build/js/mocks'))),

			gulp.src('src/app/app.js')
				.pipe($.babel())
				.pipe(gulp.dest('build/js/')),

			gulp.src('src/img/**/*')
				.pipe($.if($.env.isProd,$.imagemin({
					progressive: true,
					svgo$: [{removeViewBox: false}],
					use: [$.pngquant()]
				})))
				.pipe(gulp.dest('build/img')),

			gulp.src('src/app/languages/*')
				.pipe(gulp.dest('build/languages/')),

			gulp.src('node_modules/font-awesome/fonts/**/*')
				.pipe(gulp.dest('build/fonts')),

			gulp.src('node_modules/bootstrap/dist/fonts/**/*')
				.pipe(gulp.dest('build/fonts')),

			gulp.src('node_modules/bootstrap/dist/img/**/*')
				.pipe(gulp.dest('build/libs/node_modules/bootstrap/dist/img'))
		)
		.pipe($.size({title: 'copy all assets'}))
		.pipe($.connect.reload());
	}
}
