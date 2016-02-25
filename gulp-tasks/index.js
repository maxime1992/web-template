module.exports = function (gulp, plugins) {
    return function () {
    	if (plugins.env.isDev) {
			libsjsModules = plugins.env.paths.libs.js.map(libsjsModules => plugins.path.join('build/libs/', libsjsModules))
			libsjsApp = plugins.env.paths.app.js.map(libsjsApp => plugins.path.join('build/', libsjsApp))

			var source = gulp.src([...libsjsModules, ...libsjsApp,'build/css/all.css'], { read: false });
		}else{
			var source = gulp.src(['build/libs/prod-*.js','build/css/all-*.css'], { read: false });
		}

		return gulp.src('src/index.html')
			.pipe(plugins.inject(source, { addRootSlash: false, ignorePath: 'build' }))
			.pipe(plugins.preprocess({ context: plugins.env }))
			.pipe(plugins.if(plugins.env.isProd,
				plugins.critical({
					inline: true,
					width: 1300,
					height: 900,
					base: 'build/',
					css: plugins.fs.readdirSync('build/css').map(file => `build/css/${file}`)
				})
			))
			.pipe(plugins.if(plugins.env.isProd,plugins.htmlmin({collapseWhitespace: true, minifyJS: true, minifyCSS: true})))
			.pipe(plugins.if(plugins.env.isProd,plugins.notify('Production Build Done')))
			.pipe(gulp.dest('build'))
			.pipe(plugins.connect.reload());
	}
}
