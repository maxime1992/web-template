module.exports = function (gulp, plugins) {
	return function () {
		return gulp.src(['./package.json'])
		.pipe(plugins.bump({type: "patch"}))
		.pipe(gulp.dest('./'));
	}
}