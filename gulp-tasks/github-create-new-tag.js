module.exports = function (gulp, plugins) {
	return function (cb) {
		var version = getPackageJsonVersion();
		plugins.git.tag(version, 'Created Tag for version: ' + version, function (error) {
			if (error) {
				return cb(error);
			}
			plugins.git.push('origin', 'master', {args: '--tags'}, cb);
		});

		function getPackageJsonVersion () {
			return JSON.parse(plugins.fs.readFileSync('./package.json', 'utf8')).version;
		};
	}
}

