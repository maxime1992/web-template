'use strict';

module.exports = (gulp, $) => {
	return (cb) => {
		if($.env.isProd){
			return $.del(['build/js']);
		}

		else{
			cb();
		}
	}
}
