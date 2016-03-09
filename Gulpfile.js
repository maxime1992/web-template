'use strict';

let gulp = require('gulp'),
	$ = require('gulp-load-plugins')();
	$.del = require('del');
	$.path = require('path');
	$.paths = require('./gulpfile.paths.js');
	$.recess = require('recess');
	$.Server = require('karma').Server;
	$.pngquant = require('imagemin-pngquant');
	$.argv = require('yargs').argv;
	$.opn = require('opn');
	$.fs = require('fs');
	$.merge2 = require('merge2');
	$.notifier = require('node-notifier');
	$.conventionalGithubReleaser = require('conventional-github-releaser');
	$.critical = require('critical').stream;
	$.plato = require('plato');

process.env.NODE_ENV = $.argv.production ? 'production' : 'development';
process.env.PORT = $.argv.PORT ? $.argv.PORT : '8080';
process.env.RELEASE_MINOR = $.argv.minor ? 'minor' : false;
process.env.RELEASE_MAJOR = $.argv.major ? 'major' : false;
process.env.RELEASE_PATCH = $.argv.patch ? 'patch' : false;

$.env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	RELEASE_MINOR: process.env.RELEASE_MINOR,
	RELEASE_MAJOR: process.env.RELEASE_MAJOR,
	RELEASE_PATCH: process.env.RELEASE_PATCH,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
	get isMinor() { return this.RELEASE_MINOR === 'minor'; },
	get isMajor() { return this.RELEASE_MAJOR === 'major'; },
	get isPatch() { return this.RELEASE_PATCH === 'patch'; },
	get paths() { return this.isDev ? $.paths.dev : $.paths.prod; }
};

function getTask(task) {
	return require(`./gulp-tasks/${task}`)(gulp, $);
};

function runTask(task) {
	return gulp.task(task, getTask(task));
};

let tasks = [
	'plato',
	'sass',
	'build-zip',
	'clean-zip',
	'clean-js',
	'assets-html',
	'assets-js',
	'assets-img',
	'assets-json',
	'unit',
	'xo',
	'gh-release',
	'gh-bump-version',
	'gh-commit-changes',
	'gh-create-new-tag',
	'gh-push-changes',
	'gh-pages',
	'clean',
	'scripts',
	'gh-changelog',
	'index',
	'open-browser',
	'livereload',
	'build-doc',
	'serve-doc',
	'gzip',
	'protractor'
];

tasks.map(runTask);

gulp.task('build', gulp.series('clean', gulp.parallel('assets-html','assets-js','assets-json','assets-img'), gulp.parallel('sass', 'scripts'), 'index', 'clean-js', 'gzip'));

gulp.task('serve', gulp.series(gulp.parallel(watch,'livereload','open-browser')));

gulp.task('e2e', gulp.series('protractor'));

gulp.task('release', gulp.series(
		'gh-bump-version',
		'gh-changelog',
		'gh-commit-changes',
		'gh-push-changes',
		'gh-create-new-tag',
		'gh-release'
));

function watch() {
	gulp.watch('src/**/*.{js}', gulp.series('assets-js','index'));
	gulp.watch('src/**/*.{png,jpg}', gulp.series('assets-img'));
	gulp.watch('src/app/**/*.{html}', gulp.series('assets-html','sass'));
	gulp.watch('src/**/*.{json}', gulp.series('assets-json'));
	gulp.watch('src/scss/**/*.{scss}', gulp.series('sass','index'));
	gulp.watch('src/index.html', gulp.series('index','sass'));
};
