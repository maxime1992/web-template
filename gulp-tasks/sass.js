'use strict';

module.exports = (gulp, $) => () =>
	$.merge2(
		gulp.src('src/scss/libs.scss')
			.pipe($.sassLint({config: '.sass-lint.yml'}))
			.pipe($.sassLint.format())
			.pipe($.sassLint.failOnError())
			.pipe($.rename({dirname: ''}))
			.pipe($.size({title: 'Lint libs SASS'}))
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.plumber())
			.pipe($.sass())
			.pipe($.size({title: 'Compile Libs SASS'}))
			.pipe($.uncss({
				html: ['src/index.html', 'src/app/**/*.html'],
				uncssrc : '.uncssrc'
			}))
			.pipe($.size({title: 'Uncss Libs CSS'}))
			.pipe($.if($.env.isProd, $.cssnano()))
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe($.if($.env.isProd, $.size({title: 'Minify Libs CSS'}))),

		gulp.src('src/scss/apps.scss')
			.pipe($.sassLint({config: '.sass-lint.yml'}))
			.pipe($.sassLint.format())
			.pipe($.sassLint.failOnError())
			.pipe($.rename({dirname: ''}))
			.pipe($.size({title: 'Lint Apps SASS'}))
			.pipe($.if($.env.isDev, $.sourcemaps.init()))
			.pipe($.plumber())
			.pipe($.sass())
			.pipe($.size({title: 'Compile Apps SASS'}))
			.pipe($.if($.env.isProd, $.cssnano()))
			.pipe($.if($.env.isDev, $.sourcemaps.write()))
			.pipe($.if($.env.isProd, $.size({title: 'Minify Apps CSS'})))
		)
		.pipe($.concat('all.css'))
		.pipe($.if($.env.isProd, $.rev()))
		.pipe($.autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(gulp.dest('build/css/'))
		.pipe($.connect.reload());