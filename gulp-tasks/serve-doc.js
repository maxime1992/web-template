'use strict';

module.exports = (gulp, $) => {
	return () => {
		$.opn(`http://localhost:${$.env.PORT}/index.html`);
		return $.connect.server({
			root: 'docs',
			livereload: false,
			port: $.env.PORT
		});
	}
}
