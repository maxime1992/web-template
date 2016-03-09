'use strict';

module.exports = (gulp, $) => (done) =>
	$.Server.start({
		configFile: `${__dirname}/../karma.conf.js`,
		singleRun: true
	}, (exitCode) => {
		done(exitCode);
	});
