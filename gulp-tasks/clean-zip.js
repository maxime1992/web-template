'use strict';

module.exports = (gulp, $) => () => {
	let name = require(`${__dirname}/../package.json`).name;
	
	return $.del([`${name}-*.zip`]);
}
