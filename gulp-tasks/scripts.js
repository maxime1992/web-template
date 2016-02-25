module.exports = function (gulp, plugins) {
	return function () {
		var allLibsJsApp = plugins.env.paths.app.js.map((path) => { return `build/${path}` });

		return plugins.merge2(
			gulp.src(plugins.env.paths.libs.js, { base: '.' })
			.pipe(plugins.ngAnnotate())
			.pipe(plugins.if(plugins.env.isProd, plugins.stripDebug()))
			.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Annotate and StripDebug NodeModules Libs JS' })))
			.pipe(plugins.if(plugins.env.isDev, plugins.size({ title: 'Annotate NodeModules Libs JS' })))
			.pipe(plugins.if(plugins.env.isDev, gulp.dest('build/libs')))
			,

			gulp.src(allLibsJsApp, { base: '.' })
			.pipe(plugins.ngAnnotate())
			.pipe(plugins.babel())
			.pipe(plugins.if(plugins.env.isProd, plugins.stripDebug()))
			.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Annotate, Babel and StripDebug App Libs JS' })))
			.pipe(plugins.if(plugins.env.idDev, plugins.size({ title: 'Annotate, Babel App Libs JS' })))
			.pipe(plugins.if(plugins.env.isProd, plugins.replace('\'ngMockE2E\',','')))
			.pipe(plugins.if(plugins.env.isProd, plugins.replace('$compileProvider.debugInfoEnabled(true)','$compileProvider.debugInfoEnabled(false)')))
			.pipe(plugins.if(plugins.env.isProd, plugins.uglify()))
			.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Uglify App libs JS' })))
			.pipe(plugins.if(plugins.env.isDev, gulp.dest('.')))
			)
		.pipe(plugins.if(plugins.env.isProd, plugins.concat('prod.js')))
		.pipe(plugins.if(plugins.env.isProd, plugins.uglify()))
		.pipe(plugins.if(plugins.env.isProd, plugins.size({ title: 'Uglify All Libs JS' })))
		.pipe(plugins.if(plugins.env.isProd, plugins.rev()))
		.pipe(plugins.if(plugins.env.isProd, gulp.dest('build/libs')));
	}
}