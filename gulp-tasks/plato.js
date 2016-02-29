'use strict';

module.exports = (gulp, $) => {
	return (cb) => {
		let files = [
		  'build/**/*.js',
		];

		let outputDir = 'complexity_report';

		let options = {
		  title: 'Report'
		};

		return $.plato.inspect(files, outputDir, options, cb());
	}
}
