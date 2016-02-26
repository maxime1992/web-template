'use strict';

module.exports = (gulp, $) => {
	return () => {
		let name = require(`${__dirname}/../package.json`).name;
		return $.del([`${name}-*.zip`]);
	}
}
