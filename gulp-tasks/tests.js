module.exports = function (gulp, Server, plugins) {
    return function (done) {
		Server.start({
			configFile: __dirname + '/../karma.conf.js',
			singleRun: true
		}, function() {
			done();
		});
    }
}