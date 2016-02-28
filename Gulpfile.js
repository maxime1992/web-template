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

$.env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,

	get isDev() { return this.NODE_ENV === 'development'; },
	get isProd() { return this.NODE_ENV === 'production'; },
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
	'cleanjs',
	'assets',
	'tests',
	'xo',
	'gh-release',
	'gh-bump-version',
	'gh-commit-changes',
	'gh-create-new-tag',
	'gh-push-changes',
	'gh-pages',
	'clean-build-docs',
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

gulp.task('build', gulp.series('clean-build-docs', 'assets', gulp.parallel('sass', 'scripts'), 'index', 'cleanjs', 'gzip'));

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
