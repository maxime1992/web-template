module.exports = function (gulp, plugins) {
	return function () {
		return gulp.src('.')
		.pipe(plugins.git.add())
		.pipe(plugins.git.commit('[Prerelease] Bumped version number', {args: '--no-verify'}))
	}
}

