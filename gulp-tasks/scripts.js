'use strict';

module.exports = (gulp, $) => {
	return () => {
		let allLibsJsApp = $.env.paths.app.js.map((path) => { return `build/${path}` });

		return $.merge2(
			gulp.src($.env.paths.libs.js, {base: '.'})
				.pipe($.plumber())
				.pipe($.ngAnnotate())
				.pipe($.if($.env.isProd, $.stripDebug()))
				.pipe($.if($.env.isProd, $.size({title: 'Annotate and StripDebug NodeModules Libs JS'})))
				.pipe($.if($.env.isDev, $.size({title: 'Annotate NodeModules Libs JS'})))
				.pipe($.if($.env.isDev, gulp.dest('build/libs')))
				,

			gulp.src(allLibsJsApp, {base: '.'})
				.pipe($.plumber())
				.pipe($.ngAnnotate())
				.pipe($.babel())
				.pipe($.if($.env.isProd,$.complexity({
					breakOnErrors: false,
					errorsOnly: false,
					cyclomatic: [5],
					halstead: [15],
					maintainability: 100,
					hideComplexFunctions: true,
				})))
				.pipe($.if($.env.isProd, $.stripDebug()))
				.pipe($.if($.env.isProd, $.size({title: 'Annotate, Babel and StripDebug App Libs JS'})))
				.pipe($.if($.env.idDev, $.size({title: 'Annotate, Babel App Libs JS'})))
				.pipe($.if($.env.isProd, $.replace('\'ngMockE2E\',','')))
				.pipe($.if($.env.isProd, $.replace('$compileProvider.debugInfoEnabled(true)','$compileProvider.debugInfoEnabled(false)')))
				.pipe($.if($.env.isProd, $.uglify()))
				.pipe($.if($.env.isProd, $.size({title: 'Uglify App libs JS'})))
				.pipe($.if($.env.isDev, gulp.dest('.')))
			)
			.pipe($.plumber())
			.pipe($.if($.env.isProd, $.concat('prod.js')))
			.pipe($.if($.env.isProd, $.uglify()))
			.pipe($.if($.env.isProd, $.size({title: 'Uglify All Libs JS'})))
			.pipe($.if($.env.isProd, $.rev()))
			.pipe($.if($.env.isProd, gulp.dest('build/libs')));
	}
}
