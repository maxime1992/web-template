'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.del(['build', 'docs']);
	}
}
