module.exports = function (gulp, env, path, merge2, plugins) {
    return function () {
		var allLibsJsApp = env.paths.app.js.map((path) => { return `build/${path}` });

		return merge2(
			gulp.src(env.paths.libs.js, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.if(env.isProd, plugins.stripDebug()))
				.pipe(plugins.if(env.isProd, plugins.size({ title: 'Annotate and StripDebug NodeModules Libs JS' })))
				.pipe(plugins.if(env.isDev, plugins.size({ title: 'Annotate NodeModules Libs JS' })))
				.pipe(plugins.if(env.isDev, gulp.dest('build/libs')))
			,

			gulp.src(allLibsJsApp, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.babel())
				.pipe(plugins.if(env.isProd, plugins.stripDebug()))
				.pipe(plugins.if(env.isProd, plugins.size({ title: 'Annotate, Babel and StripDebug App Libs JS' })))
				.pipe(plugins.if(env.idDev, plugins.size({ title: 'Annotate, Babel App Libs JS' })))
				.pipe(plugins.if(env.isProd, plugins.replace('\'ngMockE2E\',','')))
				.pipe(plugins.if(env.isProd, plugins.uglify()))
				.pipe(plugins.if(env.isProd, plugins.size({ title: 'Uglify App libs JS' })))
				.pipe(plugins.if(env.isDev, gulp.dest('.')))
		)
		.pipe(plugins.if(env.isProd, plugins.concat('prod.js')))
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.if(env.isProd, plugins.size({ title: 'Uglify All Libs JS' })))
		.pipe(plugins.if(env.isProd, plugins.rev()))
		.pipe(plugins.if(env.isProd, gulp.dest('build/libs')));
	}
}