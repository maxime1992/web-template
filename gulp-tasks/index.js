'use strict';

module.exports = (gulp, $) => () => {
	let source;

	if ($.env.isDev) {
		let libsjsModules = $.env.paths.libs.js.map(libsjsModules => $.path.join('build/libs/', libsjsModules));
		let libsjsApp = $.env.paths.app.js.map(libsjsApp => $.path.join('build/', libsjsApp));

		source = gulp.src([...libsjsModules, ...libsjsApp, 'build/css/all.css'], {read: false});
	}

	else{
		source = gulp.src(['build/libs/prod-*.js', 'build/css/all-*.css'], {read: false});
	}

	return gulp.src('src/index.html')
		.pipe($.inject(source, {addRootSlash: false, ignorePath: 'build'}))
		.pipe($.preprocess({context: $.env}))
		.pipe($.if($.env.isProd,
			$.critical({
				inline: true,
				width: 1300,
				height: 900,
				base: 'build',
				pathPrefix: './',
				css: $.fs.readdirSync('build/css').map(file => `build/css/${file}`)
			})
		))
		.pipe($.if($.env.isProd,$.htmlmin({collapseWhitespace: true, minifyJS: true, minifyCSS: true})))
		.pipe($.if($.env.isProd,$.notify('Production Build Done')))
		.pipe(gulp.dest('build'))
		.pipe($.connect.reload());
	
}
