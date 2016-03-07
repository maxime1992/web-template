'use strict';

module.exports = (gulp, $) => () =>
	$.opn(`http://localhost:${$.env.PORT}/index.html`);
