module.exports = function (gulp, plugins) {
    return function () {
		return gulp.src('CHANGELOG.md', {
			buffer: false
		})

		.pipe(plugins.conventionalChangelog({
			preset: 'angular'
		}))

		.pipe(gulp.dest('./'));
	}
}