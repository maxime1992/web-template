module.exports = function (gulp, plugins) {
	return function () {
		return plugins.merge2(
			gulp.src('src/app/views/**/*.html')
				.pipe(plugins.if(plugins.env.isProd, plugins.htmlmin({collapseWhitespace: true})))
				.pipe(gulp.dest('build/html/views/')),

			gulp.src('src/app/controllers/**/*.js')
				.pipe(plugins.babel())
				.pipe(gulp.dest('build/js/controllers/')),

			gulp.src('src/app/directives/**/*.js')
				.pipe(plugins.stripComments())
				.pipe(plugins.angularEmbedTemplates())
				.pipe(plugins.flatten())
				.pipe(plugins.babel())
				.pipe(gulp.dest('build/js/directives/')),

			gulp.src('src/app/factories/**/*.js')
				.pipe(plugins.babel())
				.pipe(gulp.dest('build/js/factories')),

			gulp.src('src/app/filters/**/*.js')
				.pipe(plugins.babel())
				.pipe(gulp.dest('build/js/filters')),

			gulp.src('src/app/mock/**/*.js')
				.pipe(plugins.if(plugins.env.isDev, plugins.babel()))
				.pipe(plugins.if(plugins.env.isDev, gulp.dest('build/js/mocks'))),

			gulp.src('src/app/app.js')
				.pipe(plugins.babel())
				.pipe(gulp.dest('build/js/')),

			gulp.src('src/img/**/*')
				.pipe(plugins.if(plugins.env.isProd,plugins.imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [plugins.pngquant()]
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
		.pipe(plugins.size({ title: 'copy all assets' }))
		.pipe(plugins.connect.reload());
	}
}