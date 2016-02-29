'use strict';

module.exports = (gulp, $) => {
	return () => {
		if ($.env.isMinor || $.env.isMajor || $.env.isPatch) {
			return gulp.src(['./package.json'])
				.pipe($.if($.env.isMinor, $.bump({type: 'minor'})))
				.pipe($.if($.env.isMajor, $.bump({type: 'major'})))
				.pipe($.if($.env.isPatch, $.bump({type: 'patch'})))
				.pipe(gulp.dest('./'));
		}

		else {
			throw new $.util.PluginError({
				plugin: 'bump-version',
				message: 'You should use only --minor or --major or --patch parameters'
			});
		}
	}
}
