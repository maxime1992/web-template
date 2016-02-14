var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ngAnimate', 'ui.router', 'anim-in-out', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate', 'angular-loading-bar']);
var languages = ['en', 'fr'];

(function () {
	// routes configuration
	app.config(function ($compileProvider, $httpProvider, $locationProvider, $stateProvider, $provide, $urlRouterProvider, $translateProvider) {
		// enable debug for dev, changed to false by grunt when going on production
		$compileProvider.debugInfoEnabled(true);

		// enable http caching
		$httpProvider.defaults.cache = true;

		// default redirection :
		// redirect to 'default' state to keep user language
		// and redirect to :lang/home
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
