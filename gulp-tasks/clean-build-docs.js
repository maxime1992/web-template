module.exports = function (gulp, del, plugins) {
    return function () {
		return del(['build', 'docs']);
    }
}