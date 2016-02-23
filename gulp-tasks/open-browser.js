module.exports = function (gulp, opn, env, plugins) {
    return function () {
    	return opn('http://localhost:' + env.PORT);
    }
}