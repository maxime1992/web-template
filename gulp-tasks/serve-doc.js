module.exports = function (gulp, plugins) {
	return function () {
		return plugins.connect.server({
			root: 'docs',
			livereload: true,
			port: 8181
		});
	}
}