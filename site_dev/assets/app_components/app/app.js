var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ngAnimate', 'ui.router', 'anim-in-out', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate', 'angular-loading-bar', 'afkl.lazyImage']);
var languages = ['en', 'fr'];

(function () {
	'use strict';

	// routes configuration
	app.config(['$compileProvider', '$httpProvider', '$locationProvider', '$stateProvider', '$provide', '$urlRouterProvider', '$translateProvider', function ($compileProvider, $httpProvider, $locationProvider, $stateProvider, $provide, $urlRouterProvider, $translateProvider) {
		// enable debug for dev, changed to false by grunt when going on production
		$compileProvider.debugInfoEnabled(true);

		// enable http caching
		$httpProvider.defaults.cache = true;

		// default redirection :
		// redirect to 'default' state to keep user language
		// and redirect to :lang/home
		$stateProvider
		.state('home', {
			url: '/:lang/home',
			views: {
				mainView: {templateUrl: 'assets/app_components/app/views/home.html'},
				rightMenuView: {templateUrl: 'assets/app_components/app/views/rightMenu.html'}
			}
		})

		.state('page1', {
			url: '/:lang/page1',
			views: {
				mainView: {templateUrl: 'assets/app_components/app/views/page1.html'},
				rightMenuView: {templateUrl: 'assets/app_components/app/views/rightMenu.html'}
			}
		})

		.state('page2', {
			url: '/:lang/page2',
			views: {
				mainView: {templateUrl: 'assets/app_components/app/views/page2.html'},
				rightMenuView: {templateUrl: 'assets/app_components/app/views/rightMenu.html'}
			}
		})

		.state('page3', {
			url: '/:lang/page3',
			views: {
				mainView: {templateUrl: 'assets/app_components/app/views/page3.html'},
				rightMenuView: {templateUrl: 'assets/app_components/app/views/rightMenu.html'}
			}
		})

		// default redirection :
		// redirect to home with the current language
		.state('default', {
			url: '/default',
			controllerProvider: ['$rootScope', '$state', '$translate', '$location', 'langFactory', function ($rootScope, $state, $translate, $location, langFactory) {
				// save lang in factory
				langFactory.setLang($translate.preferredLanguage());

				// go to default state --> 'home'
				$state.go('home');
			}]
		});

		// in order to avoid passing 'lang' parameter to each ui-sref
		// let's custom $state
		$provide.decorator('$state', function ($delegate, langFactory) {
			// locally use 'state' name
			var state = $delegate;

			// extend this object with new function
			// 'baseGo', which in fact, will keep the reference
			// to the original 'go' function
			state.baseGo = state.go;

			// here comes our new 'go' decoration
			var go = function (to, params, options) {
				params = params || {};

				params.lang = langFactory.getLang();

				// return processing to the 'baseGo' - original
				this.baseGo(to, params, options);
			};

			// assign new 'go', right now decorating the old 'go'
			state.go = go;

			return $delegate;
		});

		// load languages from json files (when needed)
		$translateProvider.useStaticFilesLoader({
			prefix: 'assets/app_components/app/languages/',
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
	}]);

	// run
	app.run(['$rootScope', '$location', '$state', '$translate', 'langFactory', function ($rootScope, $location, $state, $translate, langFactory) {
		// in order to avoid basic redirection if URL does not exists
		// and to set language based on browser lang if lang is not set in
		// the URL, let's handle redirections here
		$rootScope.$watch(function () {
			return $location.path();
		},
		function () {
			var fullUrl = $location.path().substring(1).split('/') || [];
			var lang = fullUrl.shift() || '';
			var url = fullUrl.join('/') || '';

			// if lang URL is not null
			// and is not available
			if (lang !== '' && languages.indexOf(lang) === -1) {
				// save default lang in factory
				langFactory.setLang($translate.preferredLanguage());

				// go to current URL (lang has been set, so it will be current URL prefixed by lang)
				// if url empty because it is in lang and lang is not available
				if (url === '') {
					$state.go(lang);
				}

				// else go to complete url
				else {
					$state.go(lang + '/' + url);
				}
			}

			// if lang is set and is available
			// BUT URL is not correct --> Disabled because i don't know how to check if URL is valid (?)
			// and without this condition it's impossible to switch languages
			// else if (lang !== '' && languages.indexOf(lang) === 1) {
			// 	$state.go('default');
			// }

			// if empty URL, redirect to default state
			else if (lang === '') {
				$state.go('default');
			}
		});
	}]);
})();
