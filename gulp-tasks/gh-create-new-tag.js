'use strict';

module.exports = (gulp, $) => {
	return (cb) => {
		let version = getPackageJsonVersion();

		$.git.tag(version, 'Created Tag for version: ' + version, function (error) {
			if (error) {
				return cb(error);
			}

			$.git.push('origin', 'master', {args: '--tags'}, cb);
		});

		function getPackageJsonVersion() {
			return JSON.parse($.fs.readFileSync('./package.json', 'utf8')).version;
		};
	}
}
