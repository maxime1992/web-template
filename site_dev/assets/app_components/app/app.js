
var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate']);

// routes configuration
app.config(['$compileProvider', '$httpProvider', '$routeProvider', '$translateProvider', function($compileProvider, $httpProvider, $routeProvider, $translateProvider) {

	// enable debug for dev, changed to false by grunt when going on production
	$compileProvider.debugInfoEnabled(true);

	// enable http caching
	$httpProvider.defaults.cache = true;

	// $routeProvider

	// 	.when('/CUSTOM_URL', {
	// 		templateUrl : 'assets/app_components/app/views/CUSTOM_PAGE.html'
	// 	})

	// 	// default redirection
	// 	.otherwise({
	// 		redirectTo: '/CUSTOM_DEFAULT_URL'
	// 	});

	$translateProvider.translations('en', {
		TITLE: 'Hello',
		FOO: 'This is a paragraph.'
	});

	$translateProvider.translations('fr', {
		TITLE: 'Salut',
		FOO: 'Ceci est un paragraphe'
	});

	$translateProvider.useSanitizeValueStrategy('sanitize');
	$translateProvider.preferredLanguage('en');

}]);
