var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

var del = require('del'),
	path = require('path'),
	merge = require('merge-stream'),
	paths = require('./gulpfile.paths.js'),
	recess = require('recess'),
	Server = require('karma').Server,
	pngquant = require('imagemin-pngquant'),
	merge2 = require('merge2'),
	argv = require('yargs').argv;


process.env.NODE_ENV = argv.production ? 'production' : 'development';
process.env.PORT = argv.PORT ? argv.PORT : '8080';

var env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get paths() { return this.isDev ? paths.dev : paths.prod; }
};


gulp.task('build-doc', function () {
  return gulp.src('src/app/**/*.js')
    .pipe(plugins.ngdocs.process())
    .pipe(gulp.dest('./docs'));
});

gulp.task('serve-doc', function () {
  return plugins.connect.server({
		root: 'docs',
		livereload: true,
		port: 8181
	});
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

function clean() {
	return del(['build', 'docs']);
}

function sassToCss() {
	return merge2(
			gulp.src('src/scss/libs.scss')
				.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
				.pipe(plugins.sassLint.format())
				.pipe(plugins.sassLint.failOnError())
				.pipe(plugins.rename({ dirname: '' }))
				.pipe(plugins.size({ title: 'Lint libs SASS' }))
				.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
				.pipe(plugins.sass())
				.pipe(plugins.size({ title: 'Compile Libs SASS' }))
				.pipe(plugins.uncss({
					html: ['src/index.html', 'src/app/**/*.html'],
					uncssrc : '.uncssrc'
				}))
				.pipe(plugins.size({ title: 'Uncss Libs CSS' }))
				.pipe(plugins.if(env.isProd, plugins.minifyCss()))
				.pipe(plugins.if(env.isDev, plugins.sourcemaps.write()))
				.pipe(plugins.size({ title: 'Minify Libs CSS' })),

			gulp.src('src/scss/apps.scss')
				.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
				.pipe(plugins.sassLint.format())
				.pipe(plugins.sassLint.failOnError())
				.pipe(plugins.rename({ dirname: '' }))
				.pipe(plugins.size({ title: 'Lint Apps SASS' }))
				.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
				.pipe(plugins.sass())
				.pipe(plugins.size({ title: 'Compile Apps SASS' }))
				.pipe(plugins.if(env.isProd, plugins.minifyCss()))
				.pipe(plugins.if(env.isDev, plugins.sourcemaps.write()))
				.pipe(plugins.size({ title: 'Minify Apps CSS' }))
		)
		.pipe(plugins.concat('defaultCss.css'))
		.pipe(gulp.dest('build/css/'))
		.pipe(plugins.connect.reload());
}

function libs() {
		var allLibsJsApp = env.paths.app.js.map((path) => { return `build/${path}` });

		return merge2(
			gulp.src(env.paths.libs.js, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.if(env.isProd, plugins.stripDebug()))
				.pipe(plugins.size({ title: 'Annotate and StripDebug NodeModules Libs JS' }))
				.pipe(plugins.if(env.isDev, gulp.dest('build/libs')))
			,

			gulp.src(allLibsJsApp, { base: '.' })
				.pipe(plugins.ngAnnotate())
				.pipe(plugins.babel())
				.pipe(plugins.if(env.isProd, plugins.stripDebug()))
				.pipe(plugins.size({ title: 'Annotate , Babel and StripDebug App Libs JS' }))
				.pipe(plugins.if(env.isProd, plugins.replace('\'ngMockE2E\',','')))
				.pipe(plugins.if(env.isProd, plugins.uglify()))
				.pipe(plugins.if(env.isDev, gulp.dest('.')))
				.pipe(plugins.size({ title: 'Uglify App libs JS' }))
		)
		.pipe(plugins.if(env.isProd, plugins.concat('prod.js')))
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.size({ title: 'Uglify All Libs JS' }))
		.pipe(plugins.if(env.isProd, gulp.dest('build/libs')));
}

function assets() {
	var views = gulp.src('src/app/views/**/*.html')
		.pipe(plugins.if(env.isProd, plugins.htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest('build/html/views/'))

	var controllers = gulp.src('src/app/controllers/**/*.js')
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/controllers/'))

	var directives = gulp.src('src/app/directives/**/*.js')
		.pipe(plugins.stripComments())
		.pipe(plugins.angularEmbedTemplates())
		.pipe(plugins.flatten())
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/directives/'))

	var factories = gulp.src('src/app/factories/**/*.js')
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/factories'))

	var filters = gulp.src('src/app/filters/**/*.js')
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/filters'))

	var mocks = gulp.src('src/app/mock/**/*.js')
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/mocks'))

	var tests = gulp.src('src/app/tests/**/*.js')
		.pipe(plugins.babel())
		.pipe(gulp.dest('build/js/tests/'))

	var app = gulp.src('src/app/app.js')
		.pipe(plugins.babel())
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
		.pipe(gulp.dest('build/fonts'));

	var fontBootstrap = gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('build/fonts'))

	var imgBoostrap = gulp.src('node_modules/bootstrap/dist/img/**/*')
		.pipe(gulp.dest('build/libs/node_modules/bootstrap/dist/img'))
		.pipe(plugins.connect.reload());

	return merge(views, controllers, directives, factories, filters, mocks, tests, app, images, languages, fontAwesome, fontBootstrap, imgBoostrap);
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
	gulp.watch('src/**/*.{js,png,jpg,html,json}', assets);
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
