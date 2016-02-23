module.exports = function (gulp, env, plugins) {
    return function () {
		return plugins.connect.server({
			root: 'build',
			livereload: env.isDev,
			port: env.PORT
		});
	}
}