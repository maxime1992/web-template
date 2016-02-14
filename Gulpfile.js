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
    documentation = require('gulp-documentation');


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
  return gulp.src('src/assets/app_components/app/**/*.js')
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
	return gulp.src('src/assets/app_components/**/*.js')
		.pipe(plugins.xo({quiet:true}));
});

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

function clean() {
	return del(['build']);
}

function sassToCss() {
	return gulp.src('src/assets/app_components/css/defaultCss.scss')
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
	var libsjs = gulp.src(env.paths.libs.js, { base: '.' })
		.pipe(plugins.if(env.isProd, plugins.concat('prod.js')))
		.pipe(plugins.if(env.isProd, replace('\'ngMockE2E\',','')))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.size({ title: 'libsjsDev' }))
		.pipe(gulp.dest('build/libs'));

	var libscss = gulp.src(env.paths.libs.css, { base: '.' })
		.pipe(plugins.if(env.isProd, plugins.concat('prod.css')))
		.pipe(plugins.if(env.isProd, plugins.minifyCss()))
		.pipe(plugins.size({ title: 'libs css' }))
		.pipe(gulp.dest('build/libs'));

	return merge(libsjs, libscss);
}

function assets() {

	var views = gulp.src('src/assets/app_components/app/views/**/*.html')
		.pipe(plugins.if(env.isProd, plugins.htmlmin({collapseWhitespace: true})))
	 	.pipe(gulp.dest('build/html/views/'))
	 	.pipe(plugins.connect.reload());

	var controllers = gulp.src('src/assets/app_components/app/controllers/**/*.js')
	 	.pipe(gulp.dest('build/js/controllers/'))
	 	.pipe(plugins.connect.reload());

	var directives = gulp.src('src/assets/app_components/app/directives/*.js')
	 	.pipe(gulp.dest('build/js/directives/'))
	 	.pipe(plugins.connect.reload());

	var directivesViews = gulp.src('src/assets/app_components/app/directives/views/**/*.html')
	 	.pipe(gulp.dest('build/html/directives/views'))
	 	.pipe(plugins.connect.reload());

	var factories = gulp.src('src/assets/app_components/app/factories/**/*.js')
	 	.pipe(gulp.dest('build/js/factories'))
	 	.pipe(plugins.connect.reload());

	var mocks = gulp.src('src/assets/app_components/app/mock/**/*.js')
	 	.pipe(gulp.dest('build/js/mocks'))
	 	.pipe(plugins.connect.reload());

 	var tests = gulp.src('src/assets/app_components/app/tests/**/*.js')
	 	 .pipe(gulp.dest('build/js/tests/'))
	 	 .pipe(plugins.connect.reload());

	var app = gulp.src('src/assets/app_components/app/app.js')
	 	 .pipe(gulp.dest('build/js/'))
	 	 .pipe(plugins.connect.reload());

	var images = gulp.src('src/assets/app_components/img/**/*')
		.pipe(plugins.if(env.isProd,plugins.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
	 	.pipe(gulp.dest('build/img'))
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

	return merge(views, controllers, directives, directivesViews, factories, mocks, tests, app, images, languages, fontAwesome, fontBootstrap, imgBoostrap);
}

function index() {

	if (env.isDev) {
		libsjsModules = env.paths.libs.js.map(libsjsModules => path.join('build/libs/', libsjsModules))
		libsjsApp = env.paths.app.js.map(libsjsApp => path.join('build/', libsjsApp))
		libscssModules = env.paths.libs.css.map(libscssModules => path.join('build/libs/', libscssModules))
		libscssApp = env.paths.app.css.map(libscssApp => path.join('build/', libscssApp))

		var source = gulp.src([...libsjsModules, ...libsjsApp, ...libscssModules, ...libscssApp], { read: false });
	}else{
		var source = gulp.src(['build/libs/prod.js','build/libs/prod.css','build/css/defaultCss.css'], { read: false });
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
	gulp.watch('src/assets/app_components/**/*.{js,png,jpg,html}', assets);
	gulp.watch('src/assets/app_components/css/**/*.{scss}', sassToCss);
	gulp.watch('src/index.html', index);
}

function livereload() {
	return plugins.connect.server({
		root: 'build',
		livereload: env.isDev,
		port: env.PORT
	});
}
