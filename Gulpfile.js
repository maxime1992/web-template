var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();
	plugins.del = require('del');
	plugins.path = require('path');
	plugins.paths = require('./gulpfile.paths.js');
	plugins.recess = require('recess');
	plugins.Server = require('karma').Server;
	plugins.pngquant = require('imagemin-pngquant');
	plugins.argv = require('yargs').argv;
	plugins.opn = require('opn');
	plugins.critical = require('critical').stream;
	plugins.fs = require('fs');
	plugins.merge2 = require('merge2');
    plugins.notifier = require('node-notifier');

process.env.NODE_ENV = plugins.argv.production ? 'production' : 'development';
process.env.PORT = plugins.argv.PORT ? plugins.argv.PORT : '8080';

plugins.env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get paths() { return this.isDev ? plugins.paths.dev : plugins.paths.prod; }
};

gulp.task('sass', getTask('sass'));

gulp.task('build-zip', getTask('build-zip'));

gulp.task('clean-zip', getTask('clean-zip'));

gulp.task('assets', getTask('assets'));

gulp.task('tests', getTask('tests'));

gulp.task('xo', getTask('xo'));

gulp.task('clean', getTask('clean-build-docs'));

gulp.task('scripts', getTask('scripts'));

gulp.task('changelog', getTask('changelog'));

gulp.task('index', getTask('index'));

gulp.task('open-browser', getTask('open-browser'));

gulp.task('livereload', getTask('livereload'));

gulp.task('build-doc', getTask('build-doc'));

gulp.task('serve-doc', getTask('serve-doc'));

gulp.task('gzip', getTask('gzip'));

gulp.task('build', gulp.series('clean', 'assets', gulp.parallel('sass', 'scripts'), 'index', 'gzip'));

gulp.task('serve', gulp.series(gulp.parallel(watch,'livereload','open-browser')));


function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

function watch() {
	gulp.watch('src/**/*.{js,png,jpg,html,json}', gulp.series('assets'));
	gulp.watch('src/scss/**/*.{scss}', gulp.series('sass'));
	gulp.watch('src/index.html', gulp.series('index'));
};
