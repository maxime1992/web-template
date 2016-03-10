'use strict';

module.exports = (gulp, $) => () =>
	gulp.src('.')
		.pipe($.git.add())
		.pipe($.git.commit('chore: Bumped version number', {args: '--no-verify'}));
