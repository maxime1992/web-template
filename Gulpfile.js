var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var del = require('del'),
    path = require('path'),
    merge = require('merge-stream'),
    paths = require('./gulpfile.paths.js'),
    recess = require('recess'),
    Server = require('karma').Server,
    pngquant = require('imagemin-pngquant'),
    replace = require('gulp-replace'),
    documentation = require('gulp-documentation'),
    embedTemplates = require('gulp-angular-embed-templates'),
    strip = require('gulp-strip-comments'),
    flatten = require('gulp-flatten'),
    merge2 = require('merge2');


process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

var env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get paths() { return this.isDev ? paths.dev : paths.prod; }
};


gulp.task('documentation', function () {
  return gulp.src('src/app/**/*.js')
    .pipe(documentation({ format: 'html' }))
    .pipe(gulp.dest('html-documentation'));
});


gulp.task('build', gulp.series(
	clean,
	sassToCss,
	assets,
	libs,
	index
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

gulp.task('xo', function () {
	return gulp.src('src/**/*.js')
		.pipe(plugins.xo({quiet:true}));
});

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

function clean() {
	return del(['build']);
}

function sassToCss() {
	return gulp.src('src/scss/defaultCss.scss')
		.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
    	.pipe(plugins.sassLint.format())
    	.pipe(plugins.sassLint.failOnError())
		.pipe(plugins.rename({ dirname: '' }))
		.pipe(plugins.size({ title: 'Lint SASS' }))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
		.pipe(plugins.sass())
		.pipe(plugins.size({ title: 'Compile SASS' }))
		.pipe(plugins.if(env.isProd, plugins.minifyCss()))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.write()))
		.pipe(plugins.size({ title: 'Mimify CSS' }))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.connect.reload());
}

function libs() {

		var allLibsJsApp = env.paths.app.js.map((path) => { return `build/${path}` });

		return merge2(
			gulp.src(allLibsJsApp, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.babel())
				.pipe(plugins.size({ title: 'App Libs JS' }))
				.pipe(plugins.if(env.isProd, replace('\'ngMockE2E\',','')))
				.pipe(plugins.if(env.isProd, plugins.uglify()))
				.pipe(plugins.if(env.isDev, gulp.dest('.')))
			,

			gulp.src(env.paths.libs.js, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.size({ title: 'nodeModules Libs JS' }))
				.pipe(plugins.if(env.isDev, gulp.dest('build/libs')))
		)
		.pipe(plugins.if(env.isProd, plugins.concat('prod.js')))
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.if(env.isProd, gulp.dest('build/libs')));
}

function assets() {
	var views = gulp.src('src/app/views/**/*.html')
		.pipe(plugins.if(env.isProd, plugins.htmlmin({collapseWhitespace: true})))
	 	.pipe(gulp.dest('build/html/views/'))

	var controllers = gulp.src('src/app/controllers/**/*.js')
	 	.pipe(gulp.dest('build/js/controllers/'))

	var directives = gulp.src('src/app/directives/**/*.js')
		.pipe(strip())
		.pipe(embedTemplates())
		.pipe(flatten())
	 	.pipe(gulp.dest('build/js/directives/'))

	var factories = gulp.src('src/app/factories/**/*.js')
	 	.pipe(gulp.dest('build/js/factories'))

	var mocks = gulp.src('src/app/mock/**/*.js')
	 	.pipe(gulp.dest('build/js/mocks'))

 	var tests = gulp.src('src/app/tests/**/*.js')
	 	 .pipe(gulp.dest('build/js/tests/'))

	var app = gulp.src('src/app/app.js')
	 	 .pipe(gulp.dest('build/js/'))

	var images = gulp.src('src/img/**/*')
		.pipe(plugins.if(env.isProd,plugins.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
	 	.pipe(gulp.dest('build/img'))

	var languages = gulp.src('src/app/languages/*')
		.pipe(gulp.dest('build/languages/'))

	var fontAwesome = gulp.src('node_modules/font-awesome/fonts/**/*')
		.pipe(plugins.if(env.isProd, gulp.dest('build/fonts')))
		.pipe(plugins.if(env.isDev, gulp.dest('build/fonts')))

	var fontBootstrap = gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(plugins.if(env.isProd, gulp.dest('build/fonts')))
		.pipe(plugins.if(env.isDev, gulp.dest('build/fonts')));

	var imgBoostrap = gulp.src('node_modules/bootstrap/dist/img/**/*')
		.pipe(gulp.dest('build/libs/node_modules/bootstrap/dist/img'))
		.pipe(plugins.connect.reload());

	return merge(views, controllers, directives, factories, mocks, tests, app, images, languages, fontAwesome, fontBootstrap, imgBoostrap);
}

function index() {
	if (env.isDev) {
		libsjsModules = env.paths.libs.js.map(libsjsModules => path.join('build/libs/', libsjsModules))
		libsjsApp = env.paths.app.js.map(libsjsApp => path.join('build/', libsjsApp))

		var source = gulp.src([...libsjsModules, ...libsjsApp,'build/css/defaultCss.css'], { read: false });
	}else{
		var source = gulp.src(['build/libs/prod.js','build/css/defaultCss.css'], { read: false });
	}
	
	
	return gulp.src('src/index.html')
		.pipe(plugins.inject(source, { ignorePath: 'build' }))
		.pipe(plugins.preprocess({ context: env }))
		.pipe(plugins.if(env.isProd,plugins.htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest('build'))
		.pipe(plugins.connect.reload());
}

function xo(){
	return gulp.src('src/assets/app_components/**/*.js')
		.pipe(xo())
}


function watch() {
	gulp.watch('src/**/*.{js,png,jpg,html}', assets);
	gulp.watch('src/scss/**/*.{scss}', sassToCss);
	gulp.watch('src/index.html', index);
}

function livereload() {
	return plugins.connect.server({
		root: 'build',
		livereload: env.isDev,
		port: env.PORT
	});
}
