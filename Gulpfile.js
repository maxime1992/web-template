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
}

function runTask(task) {
	return gulp.task(task, getTask(task));
}

let tasks = [
	'sass',
	'build-zip',
	'clean-zip',
	'clean-js',
	'assets',
	'tests',
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
	'gzip'
];

tasks.map(runTask);

gulp.task('build', gulp.series('clean', 'assets', gulp.parallel('sass', 'scripts'), 'index', 'clean-js', 'gzip'));

gulp.task('serve', gulp.series(gulp.parallel(watch,'livereload','open-browser')));

gulp.task('release', gulp.series(
		'gh-bump-version',
		'gh-changelog',
		'gh-commit-changes',
		'gh-push-changes',
		'gh-create-new-tag',
		'gh-release'
	),
	function (error) {
		if (error) {
			console.log(error.message);
		}

		else {
			console.log('RELEASE FINISHED SUCCESSFULLY');
		}

		callback(error);
	}
);

function watch() {
	gulp.watch('src/**/*.{js,png,jpg,html,json}', gulp.series('assets'));
	gulp.watch('src/scss/**/*.{scss}', gulp.series('sass'));
	gulp.watch('src/index.html', gulp.series('index'));
};
