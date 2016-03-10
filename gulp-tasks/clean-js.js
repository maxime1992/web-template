'use strict';

module.exports = (gulp, $) => (cb) => {
	if($.env.isProd){
		return $.del(['build/js']);
	}

	cb();
}
