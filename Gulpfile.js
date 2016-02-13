var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var del = require('del'),
    path = require('path'),
    merge = require('merge-stream'),
    paths = require('./gulpfile.paths.js'),
    recess = require('recess'),
    Server = require('karma').Server,
    pngquant = require('imagemin-pngquant'),
    replace = require('gulp-replace');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

var env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get paths() { return this.isDev ? paths.dev : paths.prod; }
};

gulp.task('build', gulp.series(
	clean,
	lessToCss,
	libs,
	assets,
	index,
	delete_folder_build_src
));

gulp.task('tests', function(done) {
  return new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
});

gulp.task('serve', gulp.series(
	gulp.parallel(watch, livereload)
));

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

function clean() {
	return del(['build']);
}

function lessToCss() {
	return gulp.src('src/assets/app_components/css/defaultCss.less')
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
		.pipe(plugins.less())
		.pipe(plugins.size({ title: 'compile less' }))
		.pipe(plugins.if(env.isProd, plugins.minifyCss()))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.write()))
		.pipe(plugins.size({ title: 'minify CSS' }))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.connect.reload());
}

function libs() {
	var libsjsNoBabel = gulp.src([...env.paths.libs.js], { base: '.' })
		.pipe(plugins.if(env.isProd, plugins.concat('libs.js')))
		.pipe(plugins.if(env.isProd, replace('\'ngMockE2E\',','')))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.size({ title: 'libsjsNoBabel' }))
		.pipe(gulp.dest('build/libs'));


	var libsjsBabels = gulp.src([...env.paths.libs.js,'!node_modules/**'], { base: '.' })
		.pipe(plugins.babel())
		.pipe(plugins.size({ title: 'libsjsBabel' }))
		.pipe(gulp.dest('build/libs'));


	var libscss = gulp.src(env.paths.libs.css, { base: '.' })
		.pipe(plugins.if(env.isProd, plugins.concat('libs.css')))
		.pipe(plugins.if(env.isProd, plugins.minifyCss()))
		.pipe(plugins.size({ title: 'libs css' }))
		.pipe(gulp.dest('build/libs'));

	return merge(libsjsNoBabel, libsjsBabels, libscss);
}

function assets() {

	var views = gulp.src('src/assets/app_components/app/views/*')
		.pipe(plugins.if(env.isProd, plugins.htmlmin({collapseWhitespace: true})))
	 	.pipe(gulp.dest('build/views/'))
	 	.pipe(plugins.connect.reload());

	var directives = gulp.src('src/assets/app_components/app/directives/views/*')
	 	.pipe(gulp.dest('build/directives/views'))
	 	.pipe(plugins.connect.reload());

	var images = gulp.src('src/assets/app_components/img/**/*')
		.pipe(plugins.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
	 	.pipe(gulp.dest('build/img'))
	 	.pipe(plugins.connect.reload());

 	var tests = gulp.src('src/assets/app_components/app/tests/**/*')
	 	 .pipe(gulp.dest('build/tests/'))
	 	 .pipe(plugins.connect.reload());

	var languages = gulp.src('src/assets/app_components/app/languages/*')
		.pipe(gulp.dest('build/languages/'))
		.pipe(plugins.connect.reload());

	var fontAwesome = gulp.src('node_modules/font-awesome/fonts/**/*')
		.pipe(plugins.if(env.isProd, gulp.dest('build/fonts')))
		.pipe(plugins.if(env.isDev, gulp.dest('build/libs/node_modules/font-awesome/fonts')))

	var fontBootstrap = gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(plugins.if(env.isProd, gulp.dest('build/fonts')))
		.pipe(plugins.if(env.isDev, gulp.dest('build/libs/node_modules/bootstrap/dist/fonts')));

	var imgBoostrap = gulp.src('src/node_modules/bootstrap/dist/img/**/*')
		.pipe(gulp.dest('build/libs/node_modules/bootstrap/dist/img'))
		.pipe(plugins.connect.reload());

	return merge(views, directives, images, languages, fontAwesome, fontBootstrap, imgBoostrap);
}

function index() {
	var css = ['build/css/defaultCss.css'];
	var libsjs = ['build/libs/libs.js'];
	var libscss = ['build/libs/libs.css'];

	if (env.isDev) {
		libsjs = env.paths.libs.js.map(libjs => path.join('build/libs/', libjs))
		libscss = env.paths.libs.css.map(libcss => path.join('build/libs/', libcss))
	}
	
	var source = gulp.src([...css, ...libsjs, ...libscss], { read: false });
	return gulp.src('src/index.html')
		.pipe(plugins.inject(source, { ignorePath: 'build' }))
		.pipe(plugins.preprocess({ context: env }))
		.pipe(plugins.if(env.isProd,plugins.htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest('build'))
		.pipe(plugins.connect.reload());
}

function delete_folder_build_src(){
	if (env.isProd) {
		return del(['build/libs/src']);
	}
	
	// change to say , return nothing in this case
	if (env.isDev) {
		return del(['nothing']);
	}
}

function delete_folder(){
	return del(['build/libs/build']);
}

function watch() {
	gulp.watch('src/assets/app_components/**/*.{js,png,jpg,html}', assets);
	gulp.watch('src/assets/app_components/css/**/*.{less}', lessToCss);
	gulp.watch('src/index.html', index);
}

function livereload() {
	return plugins.connect.server({
		root: 'build',
		livereload: env.isDev,
		port: env.PORT
	});
}
