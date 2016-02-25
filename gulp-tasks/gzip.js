module.exports = function (gulp, plugins) {
	return function () {
		return gulp.src('build/**/*.{js,css,html,json}')
			.pipe(plugins.if(plugins.env.isProd, plugins.gzip()))
			.pipe(gulp.dest('build'))
			.pipe(plugins.size({ title: 'GZIP' }));
	}
}
