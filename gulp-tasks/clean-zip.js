'use strict';

module.exports = (gulp, $) => () => {
	let name = require($.path.join(__dirname, '..', 'package.json')).name;

	return $.del([`${name}-*.zip`]);
}

