'use strict';

let baseLibsJs = [
	'node_modules/angular/angular.js',
	'node_modules/angular-ui-router/release/angular-ui-router.min.js',
	'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'node_modules/angular-sanitize/angular-sanitize.min.js',
	'node_modules/angular-translate/dist/angular-translate.min.js',
	'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
	'node_modules/angular-loading-bar/build/loading-bar.min.js',
	'node_modules/angular-animate/angular-animate.min.js',
	'node_modules/angular-ui-router-anim-in-out/anim-in-out.js',
	'js/app.js',
	'js/factories/langFactory.js',
	'js/directives/completeBlockDirective.js',
	'js/controllers/generalController.js'
];

let baseLibsJsNodeModules = baseLibsJs.filter((path) => { return path.startsWith('node_modules'); });

let baseLibsJsNotNodeModules = baseLibsJs.filter((path) => { return !path.startsWith('node_modules'); });

module.exports = {
	dev: {
		libs: {
			js: [
				...baseLibsJsNodeModules,
				'node_modules/angular-mocks/angular-mocks.js',
			]
		},
		app: {
			js: [
				...baseLibsJsNotNodeModules,
				'js/mocks/mock.js'
			]
		}
	},

	prod: {
		libs: {
			js: [
				...baseLibsJsNodeModules,
				
			]
		},
		app:{
			js: [
				...baseLibsJsNotNodeModules,
				
			]
		}
	}
};
