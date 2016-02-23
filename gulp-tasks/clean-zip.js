module.exports = function (gulp, del, plugins) {
    return function () {
    	var name = require(__dirname + '/../package.json').name;
		return del([name + '-*' + '.zip']);
	}
}