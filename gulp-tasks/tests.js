'use strict';

module.exports = (gulp, $) => {
	return (done) => {
		$.Server.start({
			configFile: `${__dirname}/../karma.conf.js`,
			singleRun: true
		}, () => {
			done();
		});
	}
}
