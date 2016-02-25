module.exports = function (gulp, plugins) {
	return function () {
		if(plugins.fs.existsSync(__dirname + '/../build')) {
			var name = require(__dirname + '/../package.json').name;
			var version = require(__dirname + '/../package.json').version;

			var buildDate = new Date();
			var yyyy = buildDate.getFullYear();
			var mm = buildDate.getMonth() < 9 ? "0" + (buildDate.getMonth() + 1) : (buildDate.getMonth() + 1); // getMonth() is zero-based
			var dd  = buildDate.getDate() < 10 ? "0" + buildDate.getDate() : buildDate.getDate();
			var hh = buildDate.getHours() < 10 ? "0" + buildDate.getHours() : buildDate.getHours();
			var min = buildDate.getMinutes() < 10 ? "0" + buildDate.getMinutes() : buildDate.getMinutes();
			var ss = buildDate.getSeconds() < 10 ? "0" + buildDate.getSeconds() : buildDate.getSeconds();

			return gulp.src('build/**/*')
				.pipe(plugins.zip(name + '-' + version + '-' + yyyy + mm + dd + '-' + hh + min + ss + '.zip'))
				.pipe(gulp.dest('.'))

		} else {
			throw new plugins.util.PluginError({
				plugin: 'archive',
				message: 'build directory is empty, you should start gulp build'
			});
		}
	}
}