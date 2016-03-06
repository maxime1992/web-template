'use strict';

module.exports = (gulp, $) => () => {
	return $.del(['build', 'docs', 'coverage', '.publish', 'complexity_report']);
}
