
var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ngRoute', 'ngAnimate', 'ui.bootstrap']);

// routes configuration
app.config(['$compileProvider', '$httpProvider', '$routeProvider', function($compileProvider, $httpProvider, $routeProvider) {

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

}]);
