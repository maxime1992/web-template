'use strict';

module.exports = (gulp, $) => {
	return () => {
		return gulp.src('.')
			.pipe($.git.add())
			.pipe($.git.commit('[Prerelease] Bumped version number', {args: '--no-verify'}))
	}
}
