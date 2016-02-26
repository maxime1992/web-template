'use strict';

module.exports = (gulp, $) => {
	return () => {
		return $.opn(`http://localhost:${$.env.PORT}`);
	}
}
