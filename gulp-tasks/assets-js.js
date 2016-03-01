'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.merge2(
			gulp.src('src/app/controllers/**/*.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.babel())
				.pipe(gulp.dest('build/js/controllers/')),

			gulp.src('src/app/directives/**/*.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.angularEmbedTemplates())
				.pipe($.flatten())
				.pipe($.babel())
				.pipe(gulp.dest('build/js/directives/')),

			gulp.src('src/app/factories/**/*.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.babel())
				.pipe(gulp.dest('build/js/factories')),

			gulp.src('src/app/filters/**/*.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.babel())
				.pipe(gulp.dest('build/js/filters')),

			gulp.src('src/app/mock/**/*.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.if($.env.isDev, $.babel()))
				.pipe($.if($.env.isDev, gulp.dest('build/js/mocks'))),

			gulp.src('src/app/app.js')
				.pipe($.if($.env.isProd, $.stripComments()))
				.pipe($.babel())
				.pipe(gulp.dest('build/js/'))
		)
		.pipe($.size({title: 'copy js assets'}))
		.pipe($.connect.reload());
	}
}
