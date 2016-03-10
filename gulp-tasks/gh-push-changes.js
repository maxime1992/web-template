'use strict';

module.exports = (gulp, $) => (cb) =>
	$.git.push('origin', 'master', cb);
