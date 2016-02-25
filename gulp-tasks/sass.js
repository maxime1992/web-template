module.exports = function (gulp, plugins) {
	return function () {
		return plugins.merge2(
			gulp.src('src/scss/libs.scss')
			.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
			.pipe(plugins.sassLint.format())
			.pipe(plugins.sassLint.failOnError())
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(plugins.size({ title: 'Lint libs SASS' }))
			.pipe(plugins.if(plugins.env.isDev, plugins.sourcemaps.init()))
			.pipe(plugins.sass())
			.pipe(plugins.size({ title: 'Compile Libs SASS' }))
			.pipe(plugins.uncss({
				html: ['src/index.html', 'src/app/**/*.html'],
				uncssrc : '.uncssrc'
			}))
			.pipe(plugins.size({ title: 'Uncss Libs CSS' }))
			.pipe(plugins.if(plugins.env.isProd, plugins.cssnano()))
			.pipe(plugins.if(plugins.env.isDev, plugins.sourcemaps.write()))
			.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Minify Libs CSS' }))),

			gulp.src('src/scss/apps.scss')
			.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
			.pipe(plugins.sassLint.format())
			.pipe(plugins.sassLint.failOnError())
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(plugins.size({ title: 'Lint Apps SASS' }))
			.pipe(plugins.if(plugins.env.isDev, plugins.sourcemaps.init()))
			.pipe(plugins.sass())
			.pipe(plugins.size({ title: 'Compile Apps SASS' }))
			.pipe(plugins.if(plugins.env.isProd, plugins.cssnano()))
			.pipe(plugins.if(plugins.env.isDev, plugins.sourcemaps.write()))
			.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Minify Apps CSS' })))
			)
		.pipe(plugins.concat('all.css'))
		.pipe(plugins.if(plugins.env.isProd, plugins.rev()))
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.connect.reload());
	}
}