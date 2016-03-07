'use strict';

module.exports = (gulp, $) => (cb) => {
	let files = [
		'build/js/**/*.js',
	];

	let outputDir = 'complexity_report';

	let options = {
		title: 'Report'
	};

	$.plato.inspect(files, outputDir, options, cb());
}
