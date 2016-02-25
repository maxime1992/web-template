module.exports = function (gulp, plugins) {
	return function () {
		return plugins.connect.server({
			root: 'build',
			livereload: plugins.env.isDev,
			port: plugins.env.PORT
		});
	}
}