'use strict';

module.exports = (gulp, $) => {
	return (cb) => {
		$.git.push('origin', 'master', cb);
	}
}
