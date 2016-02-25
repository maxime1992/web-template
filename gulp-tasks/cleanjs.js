module.exports = function (gulp, plugins) {
	return function () {
		if(plugins.env.isProd){
			return plugins.del(['build/js']);
		}else{
			return plugins.del(['nothing']);
		}
	}
}