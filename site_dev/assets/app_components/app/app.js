
var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ui.router', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate', 'angular-loading-bar', 'afkl.lazyImage']);

// routes configuration
app.config(['$compileProvider', '$httpProvider', '$locationProvider', '$stateProvider', '$provide', '$urlRouterProvider', '$translateProvider', function($compileProvider, $httpProvider, $locationProvider, $stateProvider, $provide, $urlRouterProvider, $translateProvider) {

	// enable debug for dev, changed to false by grunt when going on production
	$compileProvider.debugInfoEnabled(true);

	// enable http caching
	$httpProvider.defaults.cache = true;

	// define default language code
	var default_lang = 'fr';

	// default redirection
	$urlRouterProvider.otherwise('/'+default_lang+'/home');

	$stateProvider
	.state('home', {
		url: '/:lang/home',
		views: {
			"mainView": 	 { templateUrl: 'assets/app_components/app/views/home.html' },
			"rightMenuView": { templateUrl: 'assets/app_components/app/views/rightMenu.html' }
		},
		params: { lang: default_lang }
	})

	.state('page1', {
		url: '/:lang/page1',
		views: {
			"mainView": 	 { templateUrl: 'assets/app_components/app/views/page1.html' },
			"rightMenuView": { templateUrl: 'assets/app_components/app/views/rightMenu.html' }
		},
		params: { lang: default_lang }
	})

	.state('page2', {
		url: '/:lang/page2',
		views: {
			"mainView": 	 { templateUrl: 'assets/app_components/app/views/page2.html' },
			"rightMenuView": { templateUrl: 'assets/app_components/app/views/rightMenu.html' }
		},
		params: { lang: default_lang }
	})

	.state('page3', {
		url: '/:lang/page3',
		views: {
			"mainView": 	 { templateUrl: 'assets/app_components/app/views/page3.html' },
			"rightMenuView": { templateUrl: 'assets/app_components/app/views/rightMenu.html' }
		},
		params: { lang: default_lang }
	});

	// in order to avoid passing 'lang' parameter to each ui-sref
	// let's custom $state
	$provide.decorator('$state', function($delegate, langFactory) {
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

	// define sanitize strategy and prefered language
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.preferredLanguage(default_lang);

}]);
