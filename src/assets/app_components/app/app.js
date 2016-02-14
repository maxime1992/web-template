var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ngAnimate', 'ui.router', 'anim-in-out', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate', 'angular-loading-bar']);
var languages = ['en', 'fr'];

(function () {
	/**
	* @name appConfig
	* @param {String} $compileProvider
	* @param {String} $httpProvider
	* @param {String} $locationProvider
	* @param {String} $stateProvider
	* @param {String} $provide
	* @param {String} $urlRouterProvider
	* @param {String} $translateProvider
	* @example 
	* Enable / Disable debug for dev
	* $compileProvider.debugInfoEnabled(true);
	* $compileProvider.debugInfoEnabled(false);
	*
	* Enable/ Disable http caching
	* $httpProvider.defaults.cache = true;
	* $httpProvider.defaults.cache = true;
	* @returns {undefinded} nothing
	*/
	app.config(function ($compileProvider, $httpProvider, $locationProvider, $stateProvider, $provide, $urlRouterProvider, $translateProvider) {
		$compileProvider.debugInfoEnabled(true);

		$httpProvider.defaults.cache = true;

		$stateProvider
		.state('home', {
			url: '/home',
			views: {
				mainView: {templateUrl: '/html/views/home.html'},
				rightMenuView: {templateUrl: '/html/views/rightMenu.html'}
			}
		})

		.state('page1', {
			url: '/page1',
			views: {
				mainView: {templateUrl: '/html/views/page1.html'},
				rightMenuView: {templateUrl: '/html/views/rightMenu.html'}
			}
		})

		.state('page2', {
			url: '/page2',
			views: {
				mainView: {templateUrl: '/html/views/page2.html'},
				rightMenuView: {templateUrl: '/html/views/rightMenu.html'}
			}
		})

		.state('page3', {
			url: '/page3',
			views: {
				mainView: {templateUrl: '/html/views/page3.html'},
				rightMenuView: {templateUrl: '/html/views/rightMenu.html'}
			}
		});


		// default redirection to /home
		$urlRouterProvider.otherwise('/home');

		// load languages from json files (when needed)
		$translateProvider.useStaticFilesLoader({
			prefix: 'languages/',
			suffix: '.json'
		});

		// handle multiple locales for one language
		$translateProvider.registerAvailableLanguageKeys(languages, {
			'en_*': 'en',
			'fr_*': 'fr'
		});

		// define sanitize strategy and prefered language
		$translateProvider.useSanitizeValueStrategy('escape');

		// $translateProvider.preferredLanguage(defaultLang);
		$translateProvider.determinePreferredLanguage();
	});
})();
