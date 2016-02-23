module.exports = function (gulp, path, env, plugins) {
    return function () {
    	if (env.isDev) {
			libsjsModules = env.paths.libs.js.map(libsjsModules => path.join('build/libs/', libsjsModules))
			libsjsApp = env.paths.app.js.map(libsjsApp => path.join('build/', libsjsApp))

			var source = gulp.src([...libsjsModules, ...libsjsApp,'build/css/all.css'], { read: false });
		}else{
			var source = gulp.src(['build/libs/prod-*.js','build/css/all-*.css'], { read: false });
		}

		return gulp.src('src/index.html')
			.pipe(plugins.inject(source, { addRootSlash: false, ignorePath: 'build' }))
			.pipe(plugins.preprocess({ context: env }))
			.pipe(plugins.if(env.isProd,plugins.htmlmin({collapseWhitespace: true})))
			.pipe(gulp.dest('build'))
			.pipe(plugins.connect.reload());
	}
}