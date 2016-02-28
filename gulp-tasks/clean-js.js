'use strict';

module.exports = (gulp, $) => {
	return () => {
		if($.env.isProd){
			return $.del(['build/js']);
		}else{
			return $.del(['nothing']);
		}
	}
}
