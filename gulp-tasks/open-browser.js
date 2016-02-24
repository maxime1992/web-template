module.exports = function (gulp, plugins) {
    return function () {
    	return plugins.opn('http://localhost:' + plugins.env.PORT);
    }
}