var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

var del = require('del'),
	path = require('path'),
	paths = require('./gulpfile.paths.js'),
	recess = require('recess'),
	Server = require('karma').Server,
	pngquant = require('imagemin-pngquant'),
	merge2 = require('merge2'),
	argv = require('yargs').argv,
	opn = require('opn'),
	fs = require('fs');

process.env.NODE_ENV = argv.production ? 'production' : 'development';
process.env.PORT = argv.PORT ? argv.PORT : '8080';

var env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get paths() { return this.isDev ? paths.dev : paths.prod; }
};

gulp.task('sass', require('./gulp-tasks/sass')(gulp, merge2, env, plugins));

gulp.task('build-zip', require('./gulp-tasks/build-zip')(gulp, fs, plugins));

gulp.task('clean-zip', require('./gulp-tasks/clean-zip')(gulp, del, plugins));

gulp.task('assets', require('./gulp-tasks/assets')(gulp, merge2, env, pngquant, plugins));

gulp.task('tests', require('./gulp-tasks/tests')(gulp, Server, plugins));

gulp.task('xo', require('./gulp-tasks/xo')(gulp, plugins));

gulp.task('clean', require('./gulp-tasks/clean-build-docs')(gulp, del, plugins));

gulp.task('scripts', require('./gulp-tasks/scripts')(gulp, env, path, merge2, plugins));

gulp.task('changelog', require('./gulp-tasks/changelog')(gulp, plugins));

gulp.task('index', require('./gulp-tasks/index')(gulp, path, env, plugins));

gulp.task('open-browser', require('./gulp-tasks/open-browser')(gulp, opn, env, plugins));

gulp.task('livereload', require('./gulp-tasks/livereload')(gulp, env, plugins));

gulp.task('build-doc', require('./gulp-tasks/build-doc')(gulp, plugins));

gulp.task('serve-doc', require('./gulp-tasks/serve-doc')(gulp, plugins));

gulp.task('build', gulp.series('clean','sass','assets','scripts','index'));

gulp.task('serve', gulp.series(gulp.parallel(watch,'livereload','open-browser')));

function watch() {
	gulp.watch('src/**/*.{js,png,jpg,html,json}', gulp.series('assets'));
	gulp.watch('src/scss/**/*.{scss}', gulp.series('sass'));
	gulp.watch('src/index.html', gulp.series('index'));
};

