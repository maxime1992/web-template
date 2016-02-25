module.exports = function (gulp, plugins) {
	return function () {
		var name = require(__dirname + '/../package.json').name;
		return plugins.del([name + '-*' + '.zip']);
	}
}