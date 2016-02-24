module.exports = function (gulp, plugins) {
    return function (done) {
		plugins.Server.start({
			configFile: __dirname + '/../karma.conf.js',
			singleRun: true
		}, function() {
			done();
		});
    }
}