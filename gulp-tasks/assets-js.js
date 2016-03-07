'use strict';

module.exports = (gulp, $) => () =>
	$.merge2(
		gulp.src('src/app/controllers/**/*.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.babel())
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe(gulp.dest('build/js/controllers/')),

		gulp.src('src/app/directives/**/*.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.angularEmbedTemplates())
			.pipe($.flatten())
			.pipe($.babel())
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe(gulp.dest('build/js/directives/')),

		gulp.src('src/app/factories/**/*.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.babel())
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe(gulp.dest('build/js/factories')),

		gulp.src('src/app/filters/**/*.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.babel())
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe(gulp.dest('build/js/filters')),

		gulp.src('src/app/mock/**/*.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.if($.env.isDev, $.babel()))
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe($.if($.env.isDev, gulp.dest('build/js/mocks'))),

		gulp.src('src/app/app.js')
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.if($.env.isProd, $.decomment()))
			.pipe($.babel())
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe(gulp.dest('build/js/'))
	)
	.pipe($.size({title: 'copy js assets'}))
	.pipe($.connect.reload());
