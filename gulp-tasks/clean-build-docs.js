module.exports = function (gulp, plugins) {
    return function () {
		return plugins.del(['build', 'docs']);
    }
}