'use strict';

module.exports = (gulp, $) => () => {
	if($.fs.existsSync($.path.join(__dirname, '..', 'build'))) {
		let name = require($.path.join(__dirname, '..', 'package.json')).name;
		let version = require($.path.join(__dirname, '..', 'package.json')).version;

		let buildDate = new Date();
		let yyyy = buildDate.getFullYear();
		// getMonth() is zero-based
		let mm = buildDate.getMonth() < 9 ? `0${buildDate.getMonth() + 1}` : (buildDate.getMonth() + 1);
		let dd  = buildDate.getDate() < 10 ? `0${buildDate.getDate()}` : buildDate.getDate();
		let hh = buildDate.getHours() < 10 ? `0${buildDate.getHours()}` : buildDate.getHours();
		let min = buildDate.getMinutes() < 10 ? `0${buildDate.getMinutes()}` : buildDate.getMinutes();
		let ss = buildDate.getSeconds() < 10 ? `0${buildDate.getSeconds()}` : buildDate.getSeconds();

		return gulp.src('build/**/*')
			.pipe($.zip(`${name}-${version}-${yyyy}${mm}${dd}-${hh}${min}${ss}.zip`))
			.pipe(gulp.dest('.'));
	}

	throw new $.util.PluginError({
		plugin: 'archive',
		message: 'Build directory is empty, you should start gulp build'
	});
}

