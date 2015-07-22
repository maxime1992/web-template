
var app = angular.module('CUSTOM_NAME_OF_THE_APP', ['ngMockE2E', 'ui.router', /*'ngAnimate',*/ 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate']);

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
	// let's custom $state by adding
	$provide.decorator('$state', function($delegate, langFactory) {
		// let's locally use 'state' name
		var state = $delegate;

		// let's extend this object with new function 
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

	$translateProvider.translations('en', {
		PAGE_1: 'This is the first page',
		PAGE_2: 'This is the second page',
		PAGE_3: 'This is the third page',
		BODY_TITLE: 'Hello',
		LOREM_1: 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation. "Lorem ipsum" also approximates a typical distribution of spaces in English.'
	});

	$translateProvider.translations('fr', {
		PAGE_1: 'Première page',
		PAGE_2: 'Deuxième page',
		PAGE_3: 'Troisième page',
		BODY_TITLE: 'Salut',
		LOREM_1: 'Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d\'attente. L\'avantage de le mettre en latin est que l\'opérateur sait au premier coup d\'oeil que la page contenant ces lignes n\'est pas valide, et surtout l\'attention du client n\'est pas dérangée par le contenu, il demeure concentré seulement sur l\'aspect graphique.'
	});

	// define sanitize strategy and prefered language
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.preferredLanguage(default_lang);

}]);
