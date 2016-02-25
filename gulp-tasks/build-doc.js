module.exports = function (gulp, plugins) {
	return function () {
		return gulp.src('src/app/**/*.js')
			.pipe(plugins.ngdocs.process())
			.pipe(gulp.dest('./docs'));
	}
}