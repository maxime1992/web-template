'use strict';

let baseLibsJs = [
	'node_modules/angular/angular.js',
	'node_modules/angular-ui-router/release/angular-ui-router.min.js',
	'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'node_modules/angular-sanitize/angular-sanitize.min.js',
	'node_modules/angular-translate/dist/angular-translate.min.js',
	'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
	'node_modules/angular-loading-bar/build/loading-bar.min.js'
];

let baseLibsCss = [
	'node_modules/bootstrap/dist/css/bootstrap.min.css',
	'node_modules/font-awesome/css/font-awesome.min.css',
	'node_modules/angular-loading-bar/build/loading-bar.min.css'
];

module.exports = {
	dev: {
		libs: {
			js: [
				...baseLibsJs,
				'node_modules/angular-mocks/angular-mocks.js',
				'src/assets/app_components/app/app.js',
				'src/assets/app_components/app/factories/langFactory.js',
				'src/assets/app_components/app/mock/mock.js',
				'src/assets/app_components/app/directives/completeBlockDirective.js',
				'src/assets/app_components/app/controllers/generalController.js'
			],
			css: [
				...baseLibsCss
				// Add dev only libs here - eg 'node_modules/analytics-lib/index.css'
			]
		}
	},

	prod: {
		libs: {
			js: [
				...baseLibsJs,
				'node_modules/angular-mocks/angular-mocks.js',
				'src/assets/app_components/app/app.js',
				'src/assets/app_components/app/factories/langFactory.js',
				'src/assets/app_components/app/mock/mock.js',
				'src/assets/app_components/app/directives/completeBlockDirective.js',
				'src/assets/app_components/app/controllers/generalController.js'
			],
			css: [
				...baseLibsCss
				// Add prod only libs here - eg 'node_modules/analytics-lib/index.css'
			]
		}
	}
};
