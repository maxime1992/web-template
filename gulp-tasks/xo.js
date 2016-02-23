module.exports = function (gulp, plugins) {
    return function () {
		return gulp.src('src/**/*.js')
			.pipe(plugins.xo({quiet:true}));
    }
}