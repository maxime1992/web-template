'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('.')
			.pipe($.git.add())
			.pipe($.git.commit('chore: Bumped version number', {args: '--no-verify'}));
	}
}
