module.exports = function (gulp, plugins) {
	return function (cb) {
		plugins.git.push('origin', 'master', cb);
	}
}

